import { HandlerInput, RequestHandler } from "ask-sdk";

export const launchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput: HandlerInput) {
    const speechText = 'どうぞ。';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('ltd-integration', speechText)
      .getResponse();
  },
};
