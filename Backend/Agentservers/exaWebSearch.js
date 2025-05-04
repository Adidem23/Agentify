const { Client } = require("@modelcontextprotocol/sdk/client/index.js")
const { StreamableHTTPClientTransport } = require("@modelcontextprotocol/sdk/client/streamableHttp.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const geminiClient = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_CLIENT_ID);

const serverUrl = new URL("https://server.smithery.ai/exa/mcp")

const config = {
    "mcpServers": {
        "exa": {
            "command": "cmd",
            "args": [
                "/c",
                "npx",
                "-y",
                "@smithery/cli@latest",
                "run",
                "exa",
                "--key",
                "303f8ce0-afb1-4113-abfc-2864464e3d12",
                "--profile",
                "profound-marmot-7sCaHq"
            ]
        }
    }
}



const configString = JSON.stringify(config)

serverUrl.searchParams.set("config", btoa(configString))
serverUrl.searchParams.set("api_key", process.env.SMITHERY_API_KEY)


const transport = new StreamableHTTPClientTransport(serverUrl)

const client = new Client({
    name: "Exa-Search-Client",
    version: "1.0.0",
    transport: transport,
    config: config
})

Available_tools = [
    {
        name: 'web_search',
        description: 'Search the web using Exa AI - performs real-time web searches and can scrape content from specific URLs. Supports configurable result counts and returns the content from the most relevant websites.',
        inputSchema: {
            type: 'object',
            properties: { query: [Object], numResults: [Object] },
            required: ['query'],
            additionalProperties: false,
            '$schema': 'http://json-schema.org/draft-07/schema#'
        }
    }
]


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


async function processWebQuery(query) {

    SYSTEM_PROMPT = ` You are a helpful assistant that can perform web searches using Exa AI. You can also use the tools available to you to assist the user with their queries.
    You can use the following tools to perform tasks and provide information to the user. Each tool has a specific input schema that you need to follow when calling it. The tools are as follows:

    ---AVAILABLE TOOLS--- :
        ${JSON.stringify(Available_tools, null, 2)}


    EXAMPLE 1: 
        
    {"type":"user","user":"Find recent blog posts or documentation updates from 2024 comparing Google’s Gemini SDK and OpenAI’s GPT API for integrating language models into production apps. Include links and key takeaways from each source"}

    {"type":"plan","plan":"I will call the web_search tool to find recent blog posts or documentation updates comparing Google’s Gemini SDK and OpenAI’s GPT API."}

    {"type":"plan","plan":"I will call the tool with the required input schema"}

    {"type":"tool_call","tool":"web_search","args":{"query":"Find recent blog posts or documentation updates from 2024 comparing Google’s Gemini SDK and OpenAI’s GPT API for integrating language models into production apps","numResults":5}}

    {"type":"plan","plan":"I will wait untill I get observation from the create_repository function"}

    { type:"observation","observation":"{
  content: [
    {
      type: 'text',
      text: '{\n' +
        '  "requestId": "ef521ef39844a77343137068a20814f2",\n' +
        '  "autopromptString": "Find recent blog posts or documentation updates from 2024 comparing Google’s Gemini SDK and OpenAI’s GPT API for integrating language models into production apps. Include links and key takeaways from each source.",\n' +
        '  "autoDate": "2024-01-01T00:00:00.000Z",\n' +
        '  "resolvedSearchType": "neural",\n' +
        '  "results": [\n' +
        '    {\n' +
        '      "id": "https://medium.com/@akhil.chibber/comparative-analysis-of-gemini-api-and-openais-gpt-4b88ba3c366c",\n' +
        '      "title": "Comparative Analysis of Gemini API and OpenAI’s GPT",\n' +
        '      "url": "https://medium.com/@akhil.chibber/comparative-analysis-of-gemini-api-and-openais-gpt-4b88ba3c366c",\n' +
        '      "publishedDate": "2024-01-04T13:47:40.000Z",\n' +
        '      "author": "Akhil Chhibber",\n' +
        '      "score": 0.414612352848053,\n' +
        '      "text": "In this Blog, we delve into the competitive world of AI language models, focusing on a detailed comparison between the Gemini API and OpenAI GPT-4 API. Our journey will be guided by 10 crucial parameters, chosen to evaluate these cutting-edge technologies. Through this comparison, we aim to uncover each API’s strengths and weaknesses, providing you with a clear perspective on which one excels in specific areas. Our approach uses scientific analysis, ensuring an unbiased and comprehensive examination. By the end, we offer a well-rounded view that not only highlights each API’s capabilities but also helps you make an informed decision about which API stands out as the superior choice for your unique requirements. I. Brief Overview of Language Model APIs: 1. Geminim API: The Gemini API, developed by Google, is uniquely engineered to understand, process, and integrate various types of data including text, code, audio, images, and video, making it highly versatile for complex AI applications. Available in three variants Gemini Ultra, Gemini Pro, and Gemini Nano, it caters to a range of requirements from complex data center tasks to efficient mobile applications. Gemini has demonstrated superior performance on numerous benchmarks, surpassing human expertise in the MMLU benchmark and in multimodal tasks. Its reasoning abilities, rooted in its multimodal training, enable it to extract and synthesize information fromdiverse sources, offering breakthrough potentials in various fields. This makes Gemini not just a language model, but a comprehensive multimodal AI tool, pushing the boundaries of AI.​ 2. OpenAI API: OpenAI’s GPT--4 API, the latest in the series of Generative Pre-Trained Transformers, is celebrated for its ability to generate text that is human-like in both coherence and context. GPT-4’s expertise extends across a diverse range of applications, from producing creative and engaging writing to solving complex analytical problems and even assisting in programming. It’s the product of training on a vast and diverse dataset, which equips it with a detailed understanding of the subtle aspects of language. OpenAI has made GPT-4 readily accessible through a well-designed API, broadening its appeal to a wide range of users including developers, content creators, and researchers. GPT-4 is not just a model but a benchmark in the field, continuously evolving and setting new standards in natural language processing. II. List of Parameters for deciding the suitable API: Text Generation Quality Understanding Context Customization and Flexibility Ease of Integration Response Time and Efficiency Scalability Language Support Cost and Pricing Model Data Privacy and Security Community and Support Parameter 1: Text Generation Quality Winner: OpenAI API For the parameter of “Text Generation Quality”, OpenAI’s GPT-4 API is the clear winner. GPT-4 is renowned for its high-quality text generation, producing exceptionally coherent, nuanced, and contextually relevant tex",\n' +
        '      "image": "https://miro.medium.com/v2/resize:fit:1200/1*jed8segEtVr8PL32PFT3AQ.png",\n' +
        '      "favicon": "https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19"\n' +
        '    },\n' +
        '    {\n' +
        '      "id": "https://drdasari.medium.com/gemini-vs-gpt-4-which-ai-giant-reigns-supreme-52e9386d2bfd",\n' +
        '      "title": "Gemini vs. GPT-4: Which AI Giant Reigns Supreme? - Dr. Veera B Dasari, PhD., PMP. - Medium",\n' +
        '      "url": "https://drdasari.medium.com/gemini-vs-gpt-4-which-ai-giant-reigns-supreme-52e9386d2bfd",\n' +
        '      "publishedDate": "2024-11-12T00:12:14.000Z",\n' +
        '      "author": "Dr. Veera B Dasari, PhD., PMP.",\n' +
        '      "score": 0.4077226519584656,\n' +
        '      "text": "A Comprehensive Comparison of Model Architectures, Use Cases, Future Trends, and Practical Tips In the fast-paced world of artificial intelligence, choosing the right AI platform is key to creating successful applications. OpenAI’s GPT-4 and Google’s Gemini are two advanced AI models that offer powerful capabilities in natural language processing, multimodal support, and deep contextual understanding. This article provides a comprehensive comparison of these AI giants, covering their technical foundations, performance, use cases, ethical considerations, and future trends. With practical examples, developer tips, and visual aids, this guide will help you decide which API best fits your project’s needs. This table provides a quick overview of the key differences between GPT-4 and Gemini, helping readers identify the most suitable model for their unique project requirements. Enhanced Technical Comparisons Model Architectures: GPT-4 vs. Gemini GPT-4: OpenAI’s GPT-4 uses a transformer-based…",\n' +
        '      "image": "https://miro.medium.com/v2/resize:fit:661/1*4RdD_00qfH9haVIJ9nZqJg.png",\n' +
        '      "favicon": "https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19"\n' +
        '    },\n' +
        '    {\n' +
        '      "id": "https://medium.com/google-cloud/developers-guide-to-getting-started-with-gemini-2-0-flash-on-vertex-ai-6b4fe3c6899f",\n' +
        '      "title": "Developer’s guide to getting started with Gemini 2.0 Flash on Vertex AI",\n' +
        '      "url": "https://medium.com/google-cloud/developers-guide-to-getting-started-with-gemini-2-0-flash-on-vertex-ai-6b4fe3c6899f",\n' +
        '      "publishedDate": "2024-12-12T17:12:53.000Z",\n' +
        '      "author": "E. Huizenga",\n' +
        '      "score": 0.4019829034805298,\n' +
        '      "text": "Gemini 2.0 has arrived, bringing next-level capabilities built for this new agentic era. Gemini 2.0 Flash is now available as an experimental preview through Vertex AI Gemini API, Vertex AI Studio, Google AI Studio, and the Gemini Developer API. This new model introduces significant advancements: Speed and performance: Gemini 2.0 Flash has a significantly improved time to first token (TTFT) over Gemini 1.5 Flash. New modalities: Gemini 2.0 introduces native image generation and controllable text-to-speech capabilities, enabling image editing, localized artwork creation, and expressive storytelling. Quality: The model maintains or improves on quality compared to larger models like Gemini 1.5 Pro (see image below). Source image: Introducing Gemini 2.0 blog Multimodal Live API: This new API helps you create real-time vision and audio streaming applications with tool use. Improved agentic experiences: Gemini 2.0 delivers improvements to multimodal understanding, coding, complex instruction following, and function calling. These improvements work together to support better agentic experiences. In this blog post, you will learn how you can use Gemini 2.0 Flash on Google Cloud with Vertex AI and the all-new streamlined Google Gen AI SDK, making it easier than ever to build with these powerful models. We’ll dive deeper into some of these exciting new functionalities, explore practical code examples, and share advanced notebooks for you to continue your learning journey. For those interested in exploring Gemini 2.0 Flash via Google AI Studio or the Gemini Developer API, please have a look at the Gemini 2.0 Cookbook. Want to skip the blog and go straight notebooks that show how to use Gemini 2.0 Flash with the Vertex AI Gemini API? Go to the the Generative AI on Vertex AI cookbook. Make sure you bookmark it for easy access later! Google Gen AI SDK Want to integrate Gemini 2.0 Flash into your application? The Google Gen AI SDK is your go-to tool. The new Google Gen AI SDK provides a unified interface to Gemini 2.0 through both the Gemini Developer API and the Vertex AI Gemini API, and is currently available for Python and Go With a few exceptions, code that runs on one platform will run on both. This allows you to migrate your application to Vertex AI without the hassle of rewriting your code, saving you time and effort. Importantly, the Google Gen AI SDK isn’t limited to just the latest models; you can also leverage the capabilities of Gemini 1.5 models. This choice allows developers to select the model that best fits their specific performance, latency and cost requirements. Getting started with Gemini 2.0 Flash with the Google Gen AI SDK Let’s have a look at how you can get started with Gemini 2.0 Flash using the Gemini API on Vertex AI which you can access through the Google Gen AI SDK. In this example we will use the Python SDK. Initialize the Google Gen AI SDK First you will need to install the google-genai Python SDK in your development environment: ",\n' +
        '      "image": "https://miro.medium.com/v2/resize:fit:1200/1*szKqds28bpXwN-vWGESVIg.png",\n' +
        '      "favicon": "https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19"\n' +
        '    },\n' +
        '    {\n' +
        '      "id": "https://cloud.google.com/blog/products/ai-machine-learning/experimentation-to-production-with-gemini-and-vertex-ai",\n' +
        '      "title": "Gemini model updates, moving Gen AI to production with Vertex AI",\n' +
        '      "url": "https://cloud.google.com/blog/products/ai-machine-learning/experimentation-to-production-with-gemini-and-vertex-ai",\n' +
        '      "publishedDate": "2024-09-24T16:09:00.000Z",\n' +
        '      "author": "Saurabh Tiwary",\n' +
        '      "score": 0.40627777576446533,\n' +
        '      "text": "You might have seen the recent stat on how 61% of enterprises are running generative AI use cases in'... 6624 more characters
    }
  ]
}" }

    {"type":"output","output":"Here are the recent blog posts and documentation updates comparing Google’s Gemini SDK and OpenAI’s GPT API for integrating language models into production apps:
    
    1.  Comparative Analysis of Gemini API and OpenAI’s GPT (https://medium.com/@akhil.chibber/comparative-analysis-of-gemini-api-and-openais-gpt-4b88ba3c366c):
        Published on 2024-01-04 by Akhil Chhibber. This blog provides a detailed comparison of the Gemini API and OpenAI GPT-4 API, focusing on their strengths and weaknesses in various areas.

    2. Gemini vs. GPT-4: Which AI Giant Reigns Supreme? (https://drdasari.medium.com/gemini-vs-gpt-4-which-ai-giant-reigns-supreme-52e9386d2bfd):
        Published on 2024-11-12 by Dr. Veera B Dasari, PhD., PMP. This article provides a comprehensive comparison of these AI giants, covering their technical foundations, performance, use cases, ethical considerations, and future trends.     

    "}

   `

    const model = geminiClient.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: SYSTEM_PROMPT });

    const chat = model.startChat({ history: [] });

    const answer = await chat.sendMessage(query);
    const FinalResponse = extractJsonObjects(answer.response.text());

    for (const answer of FinalResponse) {

        if (answer.type === "output") {
            console.log("Final Response:", answer.output);
            return answer.output;
        }

        if (answer.type === "tool_call") {
            const toolName = answer.tool;
            const toolArgs = answer.args;
            const tool = Available_tools.find(tool => tool.name === toolName);

            if (tool) {

                await client.connect(transport);

                const observation = await client.callTool({
                    name: toolName,
                    arguments: toolArgs
                });

                const response = {
                    type: "observation",
                    observation: observation
                };

                console.log("Tool response:", response.observation);


                const newAnswer = await chat.sendMessage(JSON.stringify(response))
                const newFinalResponse = extractJsonObjects(newAnswer.response.text())
                for (ans of newFinalResponse) {
                    if (ans.type === "output") {
                        console.log("Final Response:", ans.output);
                        return ans.output;
                    }
                }

            }
        }


    }

}


module.exports = {
    processWebQuery: processWebQuery
}