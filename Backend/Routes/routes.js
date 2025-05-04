const express = require('express');
const Router = express.Router();
const AgentifyController = require('../Controllers/index.js');

Router.get('/',AgentifyController.BreatingMessage);
Router.post('/getGithubAgentResponse',AgentifyController.getGithubAgentResponse);
Router.post('/getExaWebSearchResponse',AgentifyController.getExaWebSearchResponse);
Router.post('/getLocalMongoDbSearch',AgentifyController.getLocalMongoDbSearch);
Router.post('/getPQSQLExecution',AgentifyController.getPQSQLExecution);

module.exports = Router;