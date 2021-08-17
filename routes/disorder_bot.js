const mongoose = require('mongoose');
const path = require("path");
const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const auth = require("../middleware/auth");
const bodyparser = require('body-parser');
//app.use(express.json())
//const sessionId = uuid.v4()
//const dialogflow = require('dialogflow')
//const config = require('../config/disorderkey')
//const structjson = require('./structjson.js')
const chatbot = require('../disorderdialogflow')


//CORS code
router.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

router.use(bodyparser.urlencoded({
  extended : false
}))

router.post('/',async(req,res)=>{
   //textQuery(req.body.MSG,req.body.parameters).then(message=>{
     //res.send({reply:message});

   let responses = await chatbot.textquery(req.body.MSG, req.body.parameters)
      let result = responses[0].queryResult;
    res.send({Reply : result.fulfillmentText});
    
   })

// handling the get request for nutribot

router.get('/',auth,(req,res)=>{
  //send the static page from the static directory where all the static files have been put.
  //check if the user is logged in or not
  res.sendFile(path.join(__dirname,'../public/index.html'),(err)=>{
      if(err){
          res.writeHead(404);
          res.end(" file not found");
      }
  });
})

module.exports = router

//const sessionClient = new dialogflow.SessionsClient({keyFilename: "D:/medibot1/medibot1/disorder-bot-oqds-932ccf090ab0.json"});
//const sessionPath = sessionClient.sessionPath(config.googleProjectID,config.dialogFlowSessionId);





//router.post('/textquery',async(req,res)=>{
  //    let responses = await textQuery(req.body.text, req.body.parameters)
    //  const result = responses[0].queryResult;
    //res.send(result.fulfillmentText);
//})

//need to define the schema and model for the nutrition also as we need to query the documens from here only.



  
/*eventQuery = async function(event,parameters) {
  const request = {
      session: sessionPath,
      queryInput: {
        event: {
          // The query to send to the dialogflow agent
          name:event,
          parameters : structjson.jsontoStructProto(parameters),
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
      
  }
    let responses = await sessionClient.detectIntent(request)
    return responses;

}*/
