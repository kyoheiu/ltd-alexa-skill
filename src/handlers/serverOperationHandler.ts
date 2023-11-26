import { HandlerInput, RequestHandler, getSlot, getSlotValue } from "ask-sdk";
import { EC2 } from 'aws-sdk';

const getSlotResolutionId = (handlerInput: HandlerInput, slotName: string): string | null => {
  return getSlot(handlerInput.requestEnvelope, slotName)?.resolutions?.resolutionsPerAuthority?.[0].values[0].value.id || null
}

const OPERATIONS = {
  START: 'start',
  STOP: 'stop',
  STATUS: 'status'
}

const SERVERS = {
  POKEMON: 'pokemon',
  SURVIVAL: 'survival'
}

const STATUS_TEXT_MAP = {
  'running': '起動中',
  'stopped': '停止中',
  'pending': '起動中',
  'stopping': '停止中',
  'unknown': '不明',
}

const SERVER_NAME_MAP = {
  [SERVERS.POKEMON]: process.env.POKEMON_SERVER_INSTANCE_ID || '',
  [SERVERS.SURVIVAL]: process.env.SURVIVAL_SERVER_INSTANCE_ID || '',
}

type OperationArg = {
  serverId: string,
  serverName: string
}

const OPERATION_MAP = {
  [OPERATIONS.START]: async ({ serverId, serverName }: OperationArg) => {
    await new EC2().startInstances({ InstanceIds: [serverId] }).promise()
    return `${serverName}のサーバーを起動しました。時間を守って遊んでくださいね。`
  },
  [OPERATIONS.STOP]: async ({ serverId, serverName }: OperationArg) => {
    await new EC2().stopInstances({ InstanceIds: [serverId] }).promise()
    return `${serverName}のサーバーを停止しました。楽しかったですか？お疲れ様でした。`
  },
  [OPERATIONS.STATUS]: async ({ serverId, serverName }: OperationArg) => {
    const result = await new EC2().describeInstances({ InstanceIds: [serverId] }).promise()
    const status = result.Reservations?.[0].Instances?.[0].State?.Name || 'unknown'
    return `${serverName}のサーバーは${STATUS_TEXT_MAP[status]}です。`
  },
}

export const serverOperationHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'ServerOperationIntent';
  },
  async handle(handlerInput: HandlerInput) {

    const serverName = getSlotResolutionId(handlerInput, 'ServerName')
    const operationName = getSlotResolutionId(handlerInput, 'OperationName')

    if (!serverName || !operationName) {
      throw new Error('サーバー名または操作名が取得できませんでした。')
    }

    const serverId = SERVER_NAME_MAP[serverName]
    const operation = OPERATION_MAP[operationName]

    const resultText = await operation({
      serverId,
      serverName
    })

    const responseBuilder = handlerInput.responseBuilder
      .speak(resultText)
      .withSimpleCard("実行結果", resultText);

    if (operationName === OPERATIONS.STATUS) {
      responseBuilder.reprompt("他に操作はありますか？");
    } else {
      responseBuilder.withShouldEndSession(true)
    }

    return responseBuilder.getResponse();
  },
};
