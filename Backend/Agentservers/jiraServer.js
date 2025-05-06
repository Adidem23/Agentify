const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');
require('dotenv').config();

const JIRA_DOMAIN = process.env.JIRA_DOMAIN;
const JIRA_API_KEY = process.env.JIRA_API_KEY;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

const client = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_CLIENT_ID);

const URL_TO_POST_REQUEST = `${JIRA_DOMAIN}/rest/api/3/issue`;

const auth = btoa(`${JIRA_EMAIL}:${JIRA_API_KEY}`);

async function createJiraTicket(summary) {

    const body = {
        "fields": {
            "project": {
                "key": `${JIRA_PROJECT_KEY}`
            },
            "summary": summary.summary,
            "description": {
                "type": "doc",
                "version": 1,
                "content": [
                    {
                        "type": 'paragraph',
                        "content": [
                            {
                                "text": "A new issue has been created.",
                                "type": "text"
                            }
                        ]
                    }
                ]
            },
            "issuetype": {
                "name": "Task"
            }
        }
    };

    const response = await axios.post(URL_TO_POST_REQUEST,  body, {
        headers: {
            'Authorization': `Basic ${auth}`
        }
    });

    console.log('Issue created successfully:', response.data);

    return response.data;

}


async function getParticularJiraTicket(key) {

    console.log('Key:', key);

    const URL_TO_GET_REQUEST = `${JIRA_DOMAIN}/rest/api/3/issue/${key.key}`;

    const response = await axios.get(URL_TO_GET_REQUEST, {
        headers: {
            'Authorization': `Basic ${auth}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });


    const formattedTicket = {
        id: response.data.id,
        key: response.data.key,
        summary: response.data.fields.summary,
        status: response.data.fields.status.name,
        createdAt: response.data.fields.created,
        updatedAt: response.data.fields.updated
    }

    return formattedTicket;

}


async function getALLJiraTicketsInProject() {

    const URL_TO_GET_REQUEST = `${JIRA_DOMAIN}/rest/api/3/search?maxResults=100`;

    const allTickets = await axios.get(URL_TO_GET_REQUEST, {
        headers: {
            'Authorization': `Basic ${auth}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    const FORMATTED_RETURN_OBJECT = [];

    for (const ticket of allTickets.data.issues) {
        const formattedTicket = {
            id: ticket.id,
            key: ticket.key,
            summary: ticket.fields.summary,
            status: ticket.fields.status.name,
            createdAt: ticket.fields.created,
            updatedAt: ticket.fields.updated
        }
        FORMATTED_RETURN_OBJECT.push(formattedTicket);
    }

    console.log('All tickets in the project are:', FORMATTED_RETURN_OBJECT);

    return FORMATTED_RETURN_OBJECT;

}

async function deleteJiraTicket(key) {

    const URL_TO_GET_REQUEST = `${JIRA_DOMAIN}/rest/api/3/issue/${key.key}`;

    const Deleted_Ticket = await axios.delete(URL_TO_GET_REQUEST, {
        headers: {
            'Authorization': `Basic ${auth}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    console.log('Ticket deleted successfully:', Deleted_Ticket.data);

    return Deleted_Ticket.data;

}

const JIRA_Server_Tools = {
    createJiraTicket: createJiraTicket,
    getParticularJiraTicket: getParticularJiraTicket,
    getALLJiraTicketsInProject: getALLJiraTicketsInProject,
    deleteJiraTicket: deleteJiraTicket
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

async function processJiraServerQuries(query) {

    SYSTEM_PROMPT = `
    You are an JIRA Server manager . You can perform some tasks such as You can manage JIRA Server of user .
    Your JIRA Server workflow is described below:
    1. You can create a JIRA ticket with a summary and description.
    2. You can get a particular JIRA ticket by its key.
    3. You can get all JIRA tickets in a project.
    4. You can delete a JIRA ticket by its key.
    5. You can update a JIRA ticket by its key, summary, and description.
   
    Available tools:
    1. createJiraTicket(summary): Create a JIRA ticket with a summary.
    2. getParticularJiraTicket(key): Get a particular JIRA ticket by its key.
    3. getALLJiraTicketsInProject(): Get all JIRA tickets in a project.
    4. deleteJiraTicket(key): Delete a JIRA ticket by its key.
    5. updateJiraTicket(key,updated Summary , updated Description): Update a JIRA ticket by its key, summary, and description.
    
    Example 1 : 

    {"type":"user","user":"Create a JIRA ticket with summary "NewIssue""}

    {"type":"plan","plan":"I have to look into all the available tools"}

    {"type":"plan","plan":"I have to look for resembling toole to create a JIRA ticket"}

    {"type:"plan","plan":"I will use the createJiraTicket tool and call it with the summary and description"}

    {"type":"action","function":"createJiraTicket","input":{"summary":"NewIssue"}}

    {"type":"plan","plan":"I will wait untill I get observation from the createJiraTicket function"}

    {"type":"observation","observation":"{
    "id": "10007",
    "key": "SCRUM-3",
    "self": "https://adityasuryawanshiagentify.atlassian.net/rest/api/3/issue/10007"
    }"}

    {"type":"output","output":"JIRA ticket created successfully with ID: 10007 and Key: SCRUM-3"}
    
    `

    const model = client.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: SYSTEM_PROMPT });

    const chat = model.startChat({ history: [] });

    const answer = await chat.sendMessage(query);
    const FinalResponse = extractJsonObjects(answer.response.text());

    for (const answer of FinalResponse) {
        if (answer.type === "output") {
            return answer.output;
        }

        if (answer.type === "action") {
            const tool = JIRA_Server_Tools[answer.function];
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
    processJiraServerQueries: processJiraServerQuries
}
