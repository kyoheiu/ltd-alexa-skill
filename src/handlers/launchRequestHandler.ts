import { HandlerInput, RequestHandler } from "ask-sdk";

export const launchRequestHandler : RequestHandler = {
  canHandle(handlerInput : HandlerInput) : boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput : HandlerInput) {
    const speechText = 'はい。マイクラサーバーへの操作を指示してください';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('マイクラサーバー', speechText)
      .getResponse();
  },
};
