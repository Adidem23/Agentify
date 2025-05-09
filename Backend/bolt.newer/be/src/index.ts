require("dotenv").config();
import express from "express";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { basePrompt as nodeBasePrompt } from "./defaults/node";
import { basePrompt as reactBasePrompt } from "./defaults/react";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";  // Make sure to import the correct package // Import Gemini SDK
const app = express();
app.use(cors());
app.use(express.json());


const genAI = new GoogleGenerativeAI("");



app.post("/template", async (req, res) => {
    const prompt = req.body.prompt;
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash', systemInstruction: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra" });
    console.log("i am in template");
    try {
          
        const result = await model.generateContent({
            contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: prompt,
                    }
                  ],
                }
            ],
            generationConfig: {
              maxOutputTokens: 200,
              temperature: 0.1,
            }
        });
      // const result = await model.generateContent( prompt, generationConfig: { maxOutputTokens: 1000, temperature: 0});


      let answer = result.response.text().trim();  // Trim leading/trailing spaces

// Optional: Clean up any extra symbols, unwanted characters, or newlines
      answer = answer.replace(/[^a-zA-Z0-9 ]/g, "").trim();
       
        if (answer === "react") {
            res.json({
                prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
                uiPrompts: [reactBasePrompt],
            });
            return;
        }

        if (answer === "node") {
            res.json({
                prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
                uiPrompts: [nodeBasePrompt],
            });
            return;
        }

        res.status(403).json({ message: "You can't access this" });
    } catch (error) {
        console.error("Error in generating content:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/chat", async (req, res) => {
    const messages = req.body.messages;
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash', systemInstruction: getSystemPrompt() });
    console.log(messages);
    try {

        const result = await model.generateContent({
            contents: messages,
            generationConfig: {
              maxOutputTokens: 8000,
            }
        });

        res.json({
            response: result.response.text(),
        });
    } catch (error) {
        console.error("Error in chat:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
