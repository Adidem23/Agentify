const express = require('express');
const Router = express.Router();
const AgentifyController = require('../Controllers/index.js');

Router.get('/',AgentifyController.BreatingMessage);
Router.post('/getGithubAgentResponse',AgentifyController.getGithubAgentResponse);
Router.post('/getLocalMongoDbSearch',AgentifyController.getLocalMongoDbSearch);
Router.post('/saveDBChatMetadata',AgentifyController.SaveDBChatMetadata);
Router.get('/getDBChatMetadata',AgentifyController.getDBChatMetadata);
Router.post('/saveGithubChatMetadata',AgentifyController.SaveGithubChatMetadata);   
Router.get('/getGithubChatMetadata',AgentifyController.getGithubChatMetadata);


module.exports = Router;