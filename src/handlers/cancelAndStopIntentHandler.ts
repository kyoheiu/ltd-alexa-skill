import { HandlerInput, RequestHandler } from "ask-sdk";

export const cancelAndStopIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput: HandlerInput) {
    const speechText = 'またどうぞ。';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('またどうぞ。', speechText)
      .withShouldEndSession(true)
      .getResponse();
  },
};
