const dialogflow = require('dialogflow');
const config = require('./config/nutritionkey')

const sessionClient = new dialogflow.SessionsClient({keyFilename: "D:/medibot1/medibot1/nutrition-bot-nevn-d8d67c4e8678.json"});
const sessionPath = sessionClient.sessionPath(config.googleProjectID,config.dialogFlowSessionId);
module.exports = { 
        textquery : async function(MSG,parameters) {
        const request = {
        session: sessionPath,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text:MSG,
            // The language used by the client (en-US)
            languageCode: config.dialogFlowSessionLanguageCode,
          },
        },
        queryParams : {
          payload : {
            data : parameters
          }
        }
      }
      let self = module.exports
      let responses = await sessionClient.detectIntent(request)
      responses = await self.handleAction(responses)
      return responses
      },


      
      handleAction : function(responses){
          return responses;
      }
      

    }
   
