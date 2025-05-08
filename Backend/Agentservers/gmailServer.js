const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const axios = require('axios');
const nodemailer = require('nodemailer');
dotenv.config();

const geminiClient = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_CLIENT_ID);

const CLIENT_ID = process.env.GOOGLE_SHELL_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_SHELL_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_SHELL_REFRESH_TOKEN;

async function getAccessToken() {
    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', null, {
            params: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                refresh_token: REFRESH_TOKEN,
                grant_type: 'refresh_token'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data.access_token;

    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
    }
}


async function FetchAllEmails() {

    const Access_Token = await getAccessToken();

    const Allmails = await axios.get("https://gmail.googleapis.com/gmail/v1/users/me/messages", {
        headers: {
            Authorization: `Bearer ${Access_Token}`
        },
        params: {
            q: "category:primary",
        }
    });

    const emailPromises = Allmails.data.messages.slice(0, 5).map(async (message) => {
        const particularEmail = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`, {
            headers: { Authorization: `Bearer ${Access_Token}` }
        });

        const headers = particularEmail.data.payload.headers;
        return {
            FROM: headers.find((h) => h.name === "From")?.value || "Unknown Sender",
            Date: headers.find((h) => h.name === "Date")?.value || "Unknown Date",
            Subject: headers.find((h) => h.name === "Subject")?.value || "No Subject",
            peekText: particularEmail.data.snippet
        };
    });

    const AllEmails_Object = await Promise.all(emailPromises);
    return AllEmails_Object;
}

async function SendaMail(inputobj) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_USER_EMAIL,
            pass: process.env.GOOGLE_GMAIL_SECRET_CODE,
        },
    });

    await transporter.sendMail({
        from: 'adityasuryawanshi5451@gmail.com',
        to: `${inputobj.rec_address}`,
        subject: `${inputobj.subject}`,
        text: `${inputobj.text}`,
    });

    return "Email has been replied Successfully"

}

const GMAIL_SERVER_TOOLS = {
    FetchAllEmails: FetchAllEmails,
    SendaMail: SendaMail
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


async function processGMAILSERVERResponse(query) {

    SYSTEM_PROMPT = `

   You can manage your users Gmail by feteching Users gmails. You must strictly follow the JSON output format.You are Gmail assistant with START , PLAN , ACTION , Obsevation  and Output State . Wait for  the user prompt and first PLAN using available tools . After Planning , take ACTION with apporriate tools and wait for the observation based on Action . Once you get observations , Returns the AI output based on START prompt and observations.

   For Working with Gmail related tasks you can prefer below Available tools

   Available tools for Gmail :
  - FetchAllEmails() : Fetches latest Emails of the user
  - SendaMail(rec_address, subject, text) : send a Mail to rec_address

   Example 1:
  START
  {"type":"user","user":"Fetch my latest Emails from my Inboxes"}

  {"type":"plan","plan":"I will try to fetch Emails from user inbox using available tools"}

  {"type":"plan","plan":"I will call FetchAllEmails() function from available tools"}

  {"type":"action","function":"FetchAllEmails","input":""}

  {"type":"plan","plan":"I will wait for the observation from the FetchAllEmails function"}

  {"type":"observation","observation":[

  {
  FROM: 'Coding Ninjas <mailer@certifications.codingninjas.com>',
  Date: 'Wed, 05 Mar 2025 07:39:12 +0000',
  id:"19567e9120d360f5",
  Subject: 'Update: Confirm your spot for E&ICT, IIT Guwahati data analytics certification program',  
  peekText: 'Click to know more Follow us: YouTube LinkedIn Instagram Facebook You&#39;re receiving this email because you signed up with https://www.codingninjas.com/ Question? Contact contact@codingninjas.com or'
},

{
  FROM: 'LMU Graduate Admission <graduateadmission@lmu.edu>',
  Date: 'Wed, 05 Mar 2025 20:04:42 +0000 (UTC)',
  id:"19567e9120d36056y",
  Subject: 'Important Reminder: RSVP for Grad Open House Week',
  peekText: 'LMU Graduate Admission Dear Aditya, Our faculty and staff are eagerly making final preparations for our Graduate Programs Open House Week, taking place Tuesday, March 18 through Friday, March 21. You'
}
  
]}

  {"type":"plan","plan":"I will retrive observation data and summarize it to the user"}

  {"type":"output","output":"
  You have 2 emails from the Coding Ninjas and LMU Graduate Admission bot has subject as 
  Update: Confirm your spot for E&ICT, IIT Guwahati data analytics certification program and 
  Important Reminder: RSVP for Grad Open House Week respectively
  "}


  Example 2: 
  START
  {"type":"user","user":"send a mail to graduateadmission@lmu.edu with subject 'Application in UNI' and with text'I want to Apply to UNI'"}

  {"type":"plan","plan":"I will SendaMail Function from available gmail tools"}
  
  {"type":"action","function":"sendEmail","input":"{rec_address:'graduateadmission@lmu.edu', subject:'Application in UNI' , text:'I want to Apply to UNI' }"}

  {"type":"plan","plan":"I will wait for the observation"}

  {"type":"observation","observation":""Email has been replied Successfully""}

  {"type":"output","output":"Replied to your Email Successfully"}
`

    const model = geminiClient.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: SYSTEM_PROMPT });

    const chat = model.startChat({ history: [] });

    const answer = await chat.sendMessage(query);
    const FinalResponse = extractJsonObjects(answer.response.text());
    
    for (const answer of FinalResponse) {
        if (answer.type === "output") {
            return answer.output;
        }

        if (answer.type === "action") {
            const tool = GMAIL_SERVER_TOOLS[answer.function];
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
    processGMAILSERVERResponse: processGMAILSERVERResponse
}