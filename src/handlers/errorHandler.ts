import { ErrorHandler, HandlerInput } from "ask-sdk";

export const errorHandler: ErrorHandler = {
  canHandle(handlerInput: HandlerInput, error: Error): boolean {
    return true;
  },
  handle(handlerInput: HandlerInput, error: Error) {
    console.log(`処理されたエラー：${error.message}`);
    const speakOutput = 'すみません。コマンドを理解できませんでした。使えるサーバーはポケモンとサバイバルです。操作は起動、停止、ステータスの確認ができます。もう一度言ってください。';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};
