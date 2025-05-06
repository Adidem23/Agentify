const { processQuery } = require('../Agentservers/githubServer.js')
const { processLocalMongoDB } = require('../Agentservers/localMongoDB.js')
const { processJiraServerQueries}= require('../Agentservers/jiraServer.js')

const DBChatsMetadata = require('../models/Dbchats.js');
const GithubChatsMetadata = require('../models/GithubAgentchats.js');
const JIRAChatsMetadata = require('../models/JiraAgentChats.js')



exports.BreatingMessage = (req, res) => {
    res.send("<h1>Hola Amigos!! Agentify is Ready to Serve you!!</h1>");
}

exports.getGithubAgentResponse = async (req, res) => {
    const userQuery = req.body.query;
    console.log(userQuery);
    try {
        const response = await processQuery(userQuery);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.getLocalMongoDbSearch = async (req, res) => {
    const userQuery = req.body.query;
    console.log(userQuery);
    try {
        const response = await processLocalMongoDB(userQuery);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getJIRASeverResponse= async (req, res) => {
    const userQuery = req.body.query;
    console.log(userQuery);
    try {
        const response = await processJiraServerQueries(userQuery);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// Chats Storage Logic Starts 

function generateTitleFromPrompt(prompt) {
    const trimmed = prompt.trim();
    const firstSentence = trimmed.split(/[.?!]/)[0]; // Split on sentence-ending punctuation
    return firstSentence.slice(0, 50) + (firstSentence.length > 50 ? '...' : '');
}


exports.SaveDBChatMetadata = async (req, res) => {
    const user = req.body.user;
    const userEmail = req.body.userEmail;
    const title = req.body.title;

    const newTitle = generateTitleFromPrompt(title);

    try {
        const chatMetadata = new DBChatsMetadata({
            user: user,
            userEmail: userEmail,
            title: newTitle
        });
        await chatMetadata.save();
        res.send({ message: 'DBAgent metadata saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

exports.getDBChatMetadata = async (req, res) => {
    try {
        const chatMetadata = await DBChatsMetadata.find({});
        res.send(chatMetadata);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.SaveGithubChatMetadata = async (req, res) => {
    const user = req.body.user;
    const userEmail = req.body.userEmail;
    const title = req.body.title;

    const newTitle = generateTitleFromPrompt(title);

    try {
        const chatMetadata = new GithubChatsMetadata({
            user: user,
            userEmail: userEmail,
            title: newTitle
        });
        await chatMetadata.save();
        res.send({ message: 'GithubAgent metadata saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
exports.getGithubChatMetadata = async (req, res) => {
    try {
        const chatMetadata = await GithubChatsMetadata.find({});
        res.send(chatMetadata);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.SaveJIRAChatMetadata = async (req, res) => {

    const user = req.body.user;
    const userEmail = req.body.userEmail;
    const title = req.body.title;

    const newTitle = generateTitleFromPrompt(title);

    try {
        const chatMetadata = new JIRAChatsMetadata({
            user: user,
            userEmail: userEmail,
            title: newTitle
        });
        await chatMetadata.save();
        res.send({ message: 'JIRA metadata saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getJIRAChatMetadata = async (req, res) => {
    try {
        const chatMetadata = await JIRAChatsMetadata.find({});
        res.send(chatMetadata);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}