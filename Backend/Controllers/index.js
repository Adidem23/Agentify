const { processQuery } = require('../Agentservers/githubServer.js')
const { processLocalMongoDB } = require('../Agentservers/localMongoDB.js')
const { processJiraServerQueries } = require('../Agentservers/jiraServer.js')
const { processGMAILSERVERResponse } = require('../Agentservers/gmailServer.js')
const { Pinecone } = require('@pinecone-database/pinecone')
const { v4: uuidv4 } = require("uuid");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();


const DBChatsMetadata = require('../models/Dbchats.js')
const GithubChatsMetadata = require('../models/GithubAgentchats.js')
const JIRAChatsMetadata = require('../models/JiraAgentChats.js')
const GmailChatsMetadata = require('../models/Gmailchats.js')

const pineconeInstance = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
})

const geminiClient = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_CLIENT_ID);

const generateEmbeddings = async (text) => {
    const model = geminiClient.getGenerativeModel({ model: "gemini-embedding-exp-03-07" });
    const result = await model.embedContent(text);
    const embedding = result.embedding;
    return embedding.values;
}

exports.BreatingMessage = (req, res) => {
    res.send("<h1>Hola Amigos!! Agentify is Ready to Serve you!!</h1>");
}

exports.getGithubAgentResponse = async (req, res) => {
    const userQuery = req.body.query;
    console.log(userQuery);

    const Pinecone_UPSERT_OBJECT = [{
        id: uuidv4(),
        values: await generateEmbeddings(userQuery),
        metadata: {
            type: "query",
            text: req.body.query,
            timestamp: new Date().toISOString(),
        }
    }]

    const index = pineconeInstance.Index('github-index')
    await index.upsert(Pinecone_UPSERT_OBJECT);
    console.log(" Vectors has been inserted in Github Index ");

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

    const Pinecone_UPSERT_OBJECT = [{
        id: uuidv4(),
        values: await generateEmbeddings(userQuery),
        metadata: {
            type: "query",
            text: req.body.query,
            timestamp: new Date().toISOString(),
        }
    }]

    const index = pineconeInstance.Index('mongodb-index')
    await index.upsert(Pinecone_UPSERT_OBJECT);
    console.log(" Vectors has been inserted in MongoDB Index ");

    try {
        const response = await processLocalMongoDB(userQuery);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getJIRASeverResponse = async (req, res) => {
   
    const userQuery = req.body.query;
    console.log(userQuery);

    const Pinecone_UPSERT_OBJECT = [{
        id: uuidv4(),
        values: await generateEmbeddings(userQuery),
        metadata: {
            type: "query",
            text: req.body.query,
            timestamp: new Date().toISOString(),
        }
    }]

    const index = pineconeInstance.Index('jira-index')
    await index.upsert(Pinecone_UPSERT_OBJECT);
    console.log(" Vectors has been inserted in JIRA Index ");

    try {
        const response = await processJiraServerQueries(userQuery);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getGMAILSERVERResponse = async (req, res) => {
    const userQuery = req.body.query;
    console.log(userQuery);

    const Pinecone_UPSERT_OBJECT = [{
        id: uuidv4(),
        values: await generateEmbeddings(userQuery),
        metadata: {
            type: "query",
            text: req.body.query,
            timestamp: new Date().toISOString(),
        }
    }]

    const index = pineconeInstance.Index('gmail-index')
    await index.upsert(Pinecone_UPSERT_OBJECT);
    console.log(" Vectors has been inserted in GMAIL Index ");

    try {
        const response = await processGMAILSERVERResponse(userQuery);
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

exports.saveGmailChatMetadata = async (req, res) => {

    const user = req.body.user;
    const userEmail = req.body.userEmail;
    const title = req.body.title;

    const newTitle = generateTitleFromPrompt(title);


    try {
        const chatMetadata = new GmailChatsMetadata({
            user: user,
            userEmail: userEmail,
            title: newTitle
        });

        await chatMetadata.save();
        res.send({ message: 'Gmail metadata saved successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.getGmailChatMetadata = async (req, res) => {
    try {
        const chatMetadata = await GmailChatsMetadata.find({});
        res.send(chatMetadata);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
