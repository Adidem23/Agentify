const express = require('express');
const Router = express.Router();
const AgentifyController = require('../Controllers/index.js');

Router.get('/',AgentifyController.BreatingMessage);

// Agentify Server Logic Starts
Router.post('/getGithubAgentResponse',AgentifyController.getGithubAgentResponse);
Router.post('/getLocalMongoDbSearch',AgentifyController.getLocalMongoDbSearch);
Router.post('/getJIRASeverResponse',AgentifyController.getJIRASeverResponse);
Router.post('/getGMAILSERVERResponse',AgentifyController.getGMAILSERVERResponse);


// Chats Storage Logic Starts
Router.post('/saveDBChatMetadata',AgentifyController.SaveDBChatMetadata);
Router.get('/getDBChatMetadata',AgentifyController.getDBChatMetadata);
Router.post('/saveGithubChatMetadata',AgentifyController.SaveGithubChatMetadata);   
Router.get('/getGithubChatMetadata',AgentifyController.getGithubChatMetadata);
Router.post('/SaveJIRAChatMetadata',AgentifyController.SaveJIRAChatMetadata);
Router.get('/getJIRAChatMetadata',AgentifyController.getJIRAChatMetadata);
Router.post('/saveGmailChatMetadata',AgentifyController.saveGmailChatMetadata);
Router.get('/getGmailChatMetadata',AgentifyController.getGmailChatMetadata);

module.exports = Router;