import { HandlerInput, RequestHandler } from "ask-sdk";

export const helpIntentHandler : RequestHandler = {
  canHandle(handlerInput : HandlerInput) : boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput : HandlerInput) {
    const speechText = 'このスキルでは登録されているマイクラサーバーを操作できます。登録されているサーバーはポケモンとサバイバルです。操作は起動、停止、ステータスの確認ができます。';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('ヘルプ', speechText)
      .getResponse();
  },
};
