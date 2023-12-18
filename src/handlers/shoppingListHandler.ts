import { HandlerInput, RequestHandler, getSlot, getSlotValue } from "ask-sdk";

export const shoppingListHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'ShoppingListIntent';
  },
  async handle(handlerInput: HandlerInput) {

    const thingToBuy = getSlotValue(handlerInput.requestEnvelope, 'thingToBuy');
    console.log(thingToBuy);

    if (!thingToBuy) {
      throw new Error('アイテム名を取得できませんでした。')
    }

    const res = await fetch(process.env.LTD_URL ?? "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.LTD_API_TOKEN ?? ""
      },
      body: JSON.stringify({
        "value": thingToBuy,
        "ou": "people"
      })
    });
    const resultText = res.ok ? `${thingToBuy}を追加しました。` : `リストに追加できませんでした。`;

    const responseBuilder = handlerInput.responseBuilder
      .speak(resultText)
      .withSimpleCard("実行結果", resultText);

    responseBuilder.withShouldEndSession(true)

    return responseBuilder.getResponse();
  },
};
