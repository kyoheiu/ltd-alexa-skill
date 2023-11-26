import { SkillBuilders } from 'ask-sdk';
import { Handler } from 'aws-lambda';
import { serverOperationHandler } from './handlers/serverOperationHandler';
import { launchRequestHandler } from './handlers/launchRequestHandler';
import { helpIntentHandler } from './handlers/helpIntentHandler';
import { cancelAndStopIntentHandler } from './handlers/cancelAndStopIntentHandler';
import { errorHandler } from './handlers/errorHandler';

let skill: any;

export const handler: Handler = async (event, context) => {
  console.log(`REQUEST++++${JSON.stringify(event)}`);
  if (!skill) {
    skill = SkillBuilders.custom()
      .addRequestHandlers(
        launchRequestHandler,
        serverOperationHandler,
        helpIntentHandler,
        cancelAndStopIntentHandler,
      )
      .addErrorHandlers(errorHandler)
      .create();
  }

  const response = await skill.invoke(event, context);
  console.log(`RESPONSE++++${JSON.stringify(response)}`);

  return response;
};
