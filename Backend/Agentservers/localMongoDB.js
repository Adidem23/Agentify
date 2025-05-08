const { GoogleGenerativeAI } = require("@google/generative-ai");
const TODODB = require('../localDBModel/models/index');
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/DatabaseAI');

const client = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_CLIENT_ID);

function AddTODO(title) {

    const todo = new TODODB({
        title: title,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    todo.save()

    return todo;

}

async function getAllTODO() {
    const Data = await TODODB.find();
    return Data;
}

const tools = {
    AddTODO: AddTODO,
    getAllTODO: getAllTODO,
}


function extractJsonObjects(input) {
    const cleaned = input.replace(/```json|```/g, '').trim();
    const jsonMatches = cleaned.match(/\{(?:[^{}]|{[^{}]*})*\}/g);
    if (!jsonMatches) return [];
    return jsonMatches.map(json => {
        try {
            return JSON.parse(json);
        } catch (error) {
            console.error("Error parsing JSON:", error, json);
            return null;
        }
    }).filter(obj => obj !== null);

}


async function processLocalMongoDB(query) {

  
    const SYSTEM_PROMPT = `
    
    Your name is Falio . You are an TO-DO-LIST manager . You can perform some tasks such as You can manage TO-DO List of user .  
    
    Your To-Do list Manager workflow is described below: 
    You can manage your to-do list by adding, deleting, and updating tasks. You must strictly follow the JSON output format.You are AI assistant with START , PLAN , ACTION , Obsevation  and Output State . Wait for  the user prompt and first PLAN using available tools . After Planning , take ACTION with apporriate tools and wait for the observation based on Action . Once ypu get observations , Returns the AI output based on START prompt and observations.

    Todo DB Schema : 
    title: {
        type: String
    }
    createdAt: {
        type: Date,
        default: Date.now   
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

    Available tools :
    AddTODO(title) : Add a new todo item and returns the added todo item.
    getAllTODO() : returns all the todo items.

    Example 1:
    START
    {"type":"user","user":"Add a task for shopping"}

    {"type":"plan","plan":"I will try to get more context on what the user wants to shop for"}

    {"type":"output","output":"What do you want to shop for?"}

    {"type":"user","user":"I want to shop for Grocries"}

    {"type":"plan","plan":"I will use AddTODO function to add a new todo in DB"}

    {"type":"action","function":"AddTODO","input":"Shopping and Buy Groceries"}

    {"type":"plan","plan":"I will wait for the observation from the AddTODO function"}

    {"type":"observation","observation":"Data has been Added: Shopping and Buy Groceries"}

    {"type":"output","output":"New item has been added in to do list"}


    Example 2:
    START
    {"type":"user","user":"I want to see my to do list"}

    {"type":"plan","plan":"I will use getAllTODO function to get all the todo items"}

    {"type":"action","function":"getAllTODO","input":""}

    {"type":"plan","plan":"I will wait untill I get observation from the getAllTODO function"}

    {"type":"observation","observation":"[{
  "_id": {
    "$oid": "67b0b1814b86b6c852fe9d69"
  },
  "title": "Play Asphalt 8: Airborne",
  "createdAt": {
    "$date": "2025-02-15T15:23:45.174Z"
  },
  "updatedAt": {
    "$date": "2025-02-15T15:23:45.174Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67b0b5a069749b07a94e8101"
  },
  "title": "listening music",
  "createdAt": {
    "$date": "2025-02-15T15:41:20.013Z"
  },
  "updatedAt": {
    "$date": "2025-02-15T15:41:20.013Z"
  },
  "__v": 0
},
{
  "_id": {
    "$oid": "67b0b5a069749b07a94e8101"
  },
  "title": "Shopping and Buy Groceries",
  "createdAt": {
    "$date": "2025-02-15T15:41:20.013Z"
  },
  "updatedAt": {
    "$date": "2025-02-15T15:41:20.013Z"
  },
  "__v": 0
},
]"}

   {"type":"output","output":"Your to do list is :
   - Play Asphalt 8: Airborne
   - listening Music
   - Shopping and Buy Groceries received from observation"
   }

    `;

    const model = client.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: SYSTEM_PROMPT });

    const chat = model.startChat({ history: [] });

    const answer = await chat.sendMessage(query);
    const FinalResponse = extractJsonObjects(answer.response.text());

    for (const answer of FinalResponse) {
        if (answer.type === "output") {
            return answer.output;
        }

        if (answer.type === "action") {
            const tool = tools[answer.function];
            if (!tool) {
                console.error("Tool not found: ", answer.function);
                break;
            }
            const observation = await tool(answer.input);

            const response = {
                type: "observation",
                observation: observation
            };

            const newAnswer = await chat.sendMessage(JSON.stringify(response))
            const newFinalResponse = extractJsonObjects(newAnswer.response.text())
            for (ans of newFinalResponse) {
                if (ans.type === "output") {
                    return ans.output;
                }
            }
        }
    }

}

module.exports = {
    processLocalMongoDB: processLocalMongoDB
}