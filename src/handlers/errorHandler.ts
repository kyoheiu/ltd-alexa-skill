import { ErrorHandler, HandlerInput } from "ask-sdk";

export const errorHandler: ErrorHandler = {
  canHandle(handlerInput: HandlerInput, error: Error): boolean {
    return true;
  },
  handle(handlerInput: HandlerInput, error: Error) {
    console.log(`Error: ${error.message}`);
    const speakOutput = 'すみません、わかりませんでした。';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};
