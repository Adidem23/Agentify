const express = require('express');
const Router = express.Router();
const AgentifyController = require('../Controllers/index.js');


Router.get('/',AgentifyController.BreatingMessage);
Router.post('/getGithubAgentResponse',AgentifyController.getGithubAgentResponse);


module.exports = Router;