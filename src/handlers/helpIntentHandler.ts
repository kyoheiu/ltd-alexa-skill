import { HandlerInput, RequestHandler } from "ask-sdk";

export const helpIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput: HandlerInput) {
    const speechText = 'このスキルではセルフホストのtodoアプリにタスクを追加できます。';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('ヘルプ', speechText)
      .getResponse();
  },
};
