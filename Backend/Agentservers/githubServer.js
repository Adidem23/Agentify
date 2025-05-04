const { Client } = require("@modelcontextprotocol/sdk/client/index.js")
const { StreamableHTTPClientTransport } = require("@modelcontextprotocol/sdk/client/streamableHttp.js")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const geminiClient = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_CLIENT_ID);


const serverUrl = new URL("https://server.smithery.ai/@smithery-ai/github/mcp")

const config = {
    "mcpServers": {
        "github": {
            "command": "cmd",
            "args": [
                "/c",
                "npx",
                "-y",
                "@smithery/cli@latest",
                "run",
                "@smithery-ai/github",
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
serverUrl.searchParams.set("api_key",process.env.SMITHERY_API_KEY)


const transport = new StreamableHTTPClientTransport(serverUrl)

const client = new Client({
    name: "github-client",
    version: "1.0.0",
    transport: transport,
    config: config
})

Available_tools = [{
    name: 'create_or_update_file',
    description: 'Create or update a single file in a GitHub repository',
    inputSchema: {
        type: 'object',
        properties: {
            owner: [Object],
            repo: [Object],
            path: [Object],
            content: [Object],
            message: [Object],
            branch: [Object],
            sha: [Object]
        },
        required: ['owner', 'repo', 'path', 'content', 'message', 'branch'],
        additionalProperties: false,
        '$schema': 'http://json-schema.org/draft-07/schema#'
    }
},
{
    name: 'search_repositories',
    description: 'Search for GitHub repositories',
    inputSchema: {
        type: 'object',
        properties: { query: [Object], page: [Object], perPage: [Object] },
        required: ['query'],
        additionalProperties: false,
        '$schema': 'http://json-schema.org/draft-07/schema#'
    }
},
{
    name: 'create_repository',
    description: 'Create a new GitHub repository in your account',
    inputSchema: {
        type: 'object',
        properties: {
            name: [Object],
            description: [Object],
            private: [Object],
            autoInit: [Object]
        },
        required: ['name'],
        additionalProperties: false,
        '$schema': 'http://json-schema.org/draft-07/schema#'
    }
},
{
    name: 'get_file_contents',
    description: 'Get the contents of a file or directory from a GitHub repository',
    inputSchema: {
        type: 'object',
        properties: {
            owner: [Object],
            repo: [Object],
            path: [Object],
            branch: [Object]
        },
        required: ['owner', 'repo', 'path'],
        additionalProperties: false,
        '$schema': 'http://json-schema.org/draft-07/schema#'
    }
},
{
    name: 'push_files',
    description: 'Push multiple files to a GitHub repository in a single commit',
    inputSchema: {
        type: 'object',
        properties: {
            owner: [Object],
            repo: [Object],
            branch: [Object],
            files: [Object],
            message: [Object]
        },
        required: ['owner', 'repo', 'branch', 'files', 'message'],
        additionalProperties: false,
        '$schema': 'http://json-schema.org/draft-07/schema#'
    }
},
{
    name: 'create_issue',
    description: 'Create a new issue in a GitHub repository',
    inputSchema: {
        type: 'object',
        properties: {
            owner: [Object],
            repo: [Object],
            title: [Object],
            body: [Object],
            assignees: [Object],
            milestone: [Object],
            labels: [Object]
        },
        required: ['owner', 'repo', 'title'],
        additionalProperties: false,
        '$schema': 'http://json-schema.org/draft-07/schema#'
    }
},
{
    name: 'create_pull_request',
    description: 'Create a new pull request in a GitHub repository',
    inputSchema: {
        type: 'object',
        properties: {
            owner: [Object],
            repo: [Object],
            title: [Object],
            body: [Object],
            head: [Object],
            base: [Object],
            draft: [Object],
            maintainer_can_modify: [Object]
        },
        required: ['owner', 'repo', 'title', 'head', 'base'],
        additionalProperties: false,
        '$schema': 'http://json-schema.org/draft-07/schema#'
    }
},
{
    name: 'fork_repository',
    description: 'Fork a GitHub repository to your account or specified organization',
    inputSchema: {
        type: 'object',
        properties: { owner: [Object], repo: [Object], organization: [Object] },
        required: ['owner', 'repo'],
        additionalProperties: false,
        '$schema': 'http://json-schema.org/draft-07/schema#'
    }
},
{
    name: 'create_branch',
    description: 'Create a new branch in a GitHub repository',
    inputSchema: {
        type: 'object',
        properties: {
            owner: [Object],
            repo: [Object],
            branch: [Object],
            from_branch: [Object]
        },
        required: ['owner', 'repo', 'branch'],
        additionalProperties: false,
        '$schema': 'http://json-schema.org/draft-07/schema#'
    }
},
{
    name: 'list_commits',
    description: 'Get list of commits of a branch in a GitHub repository',
    inputSchema: {
        type: 'object',
        properties: {
            owner: [Object],
            repo: [Object],
            sha: [Object],
            page: [Object],
            perPage: [Object]
        },
        required: ['owner', 'repo'],
        additionalProperties: false,
        '$schema': 'http://json-schema.org/draft-07/schema#'
    }
},
{
    name: 'list_issues',
    description: 'List issues in a GitHub repository with filtering options',
    inputSchema: {
        type: 'object',
        properties: {
            owner: [Object],
            repo: [Object],
            direction: [Object],
            labels: [Object],
            page: [Object],
            per_page: [Object],
            since: [Object],
            sort: [Object],
            state: [Object]
        },
        required: ['owner', 'repo'],
        additionalProperties: false,
        '$schema': 'http://json-schema.org/draft-07/schema#'
    }
},
{
    name: 'update_issue',
    description: 'Update an existing issue in a GitHub repository',
    inputSchema: {
        type: 'object',
        properties: {
            owner: [Object],
            repo: [Object],
            issue_number: [Object],
            title: [Object],
            body: [Object],
            assignees: [Object],
            milestone: [Object],
            labels: [Object],
            state: [Object]
        },
        required: ['owner', 'repo', 'issue_number'],
        additionalProperties: false,
        '$schema': 'http://json-schema.org/draft-07/schema#'
    }
},
{
    name: 'add_issue_comment',
    description: 'Add a comment to an existing issue',
    inputSchema: {
        type: 'object',
        properties: {
            owner: [Object],
            repo: [Object],
            issue_number: [Object],
            body: [Object]
        },
        required: ['owner', 'repo', 'issue_number', 'body'],
        additionalProperties: false,
        '$schema': 'http://json-schema.org/draft-07/schema#'
    }
},
{
    name: 'search_code',
    description: 'Search for code across GitHub repositories',
    inputSchema: {
        type: 'object',
        properties: {
            q: [Object],
            order: [Object],
            page: [Object],
            per_page: [Object]
        },
        required: ['q'],
        additionalProperties: false,
        '$schema': 'http://json-schema.org/draft-07/schema#'
    }
},
{
    name: 'search_issues',
    description: 'Search for issues and pull requests across GitHub repositories',
    inputSchema: {
        type: 'object',
        properties: {
            q: [Object],
            order: [Object],
            page: [Object],
            per_page: [Object],
            sort: [Object]
        },
        required: ['q'],
        additionalProperties: false,
        '$schema': 'http://json-schema.org/draft-07/schema#'
    }
},
{
    name: 'search_users',
    description: 'Search for users on GitHub',
    inputSchema: {
        type: 'object',
        properties: {
            q: [Object],
            order: [Object],
            page: [Object],
            per_page: [Object],
            sort: [Object]
        },
        required: ['q'],
        additionalProperties: false,
        '$schema': 'http://json-schema.org/draft-07/schema#'
    }
},
{
    name: 'get_issue',
    description: 'Get details of a specific issue in a GitHub repository.',
    inputSchema: {
        type: 'object',
        properties: { owner: [Object], repo: [Object], issue_number: [Object] },
        required: ['owner', 'repo', 'issue_number'],
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

async function processQuery(query) {

    SYSTEM_PROMPT = ` You are a GitHub assistant. You can help users with various tasks related to GitHub repositories, issues, and pull requests. Your tasks include creating repositories, managing files, forking repositories, and more. You can also search for code, issues, and users on GitHub.
        
    EveryTime when user will make query just search the tool from Available_tools array and then call the tool with proper schema which is out there.

    ---AVAILABLE TOOLS--- :
        ${JSON.stringify(Available_tools, null, 2)}

    for example : if the user asks to create a new repository, you can use the 'create_repository' tool. If the user wants to search for code, you can use the 'search_code' tool. Make sure to follow the input schema provided for each tool.

    EXAMPLE 1: 
        
    {"type":"user","user":"create a new repository called 'Antohrpiocipo' on AthuWarrior GitHub"}

    {"type":"plan","plan":"I will search the tool from Available_tools array"}

    {"type":"plan","plan":"create_repository seems more suitable will check and grab input params from user query"}

    {"type":"plan","plan":"I will call the tool with the required input schema"}

    {"type":"tool_call","tool":"create_repository","args":{"name":"Antohrpiocipo","description":"A new repository called Antohrpiocipo"}}

    {"type":"plan","plan":"I will wait untill I get observation from the create_repository function"}

    { type:"observation","observation":"{
    "id": 975705639,
    "node_id": "R_kgDOOigWJw",
    "name": "adityais",
    "full_name": "AthuWarrior/adityais",
    "private": false,
    "owner": {
        "login": "AthuWarrior",
        "id": 142767219,
        "node_id": "U_kgDOCIJ0cw",
        "avatar_url": "https://avatars.githubusercontent.com/u/142767219?v=4",
        "url": "https://api.github.com/users/AthuWarrior",
        "html_url": "https://github.com/AthuWarrior",
        "type": "User"
    },
    "html_url": "https://github.com/AthuWarrior/adityais",
    "description": "A repository for personal projects and experiments",
    "fork": false,
    "url": "https://api.github.com/repos/AthuWarrior/adityais",
    "created_at": "2025-04-30T18:58:12Z",
    "updated_at": "2025-04-30T18:58:12Z",
    "pushed_at": "2025-04-30T18:58:12Z",
    "git_url": "git://github.com/AthuWarrior/adityais.git",
    "ssh_url": "git@github.com:AthuWarrior/adityais.git",
    "clone_url": "https://github.com/AthuWarrior/adityais.git",
    "default_branch": "main"
    }" }

    {"type":"output","output": "Great! I've successfully created a new GitHub repository for you with the following details:
    Name:Antuorpiocipo
    URL: https://github.com/AthuWarrior/Antuorpiocipo
    Visibility: Public
    Description: A repository for personal projects and experiments"}


    EXAMPLE 2: 

    {"type":"user","user":"I have friend of mine with GitHub username Adidem23 and don't tell him i want to stalk his account and get all the repositories he has created. Can you help me with that?"}

    {"type":"plan","plan":"I will try to get context of what user is saying and then I will search the tool from Available_tools array"}

    {"type":"plan","plan":"User Want to get details of his friends GitHub account first and he is using the username Adidem23"}

    {"type":"plan","plan":"I will search the tool from Available_tools array"}

    {"type":"plan","plan":"First I have to call search_users tool to get the user details and then I will call search_repositories tool to get the repositories of that user"}

    {"type":"tool_call","tool":"search_users","args":{"q":"Adidem23"}} 

    {"type":"plan","plan":"I will wait untill I get observation from the search_users function"}

    { type:"observation","observation":"{
     text: '{\n' +
        '  "total_count": 1,\n' +
        '  "incomplete_results": false,\n' +
        '  "items": [\n' +
        '    {\n' +
        '      "login": "Adidem23",\n' +
        '      "id": 124609794,\n' +
        '      "node_id": "U_kgDOB21lAg",\n' +
        '      "avatar_url": "https://avatars.githubusercontent.com/u/124609794?v=4",\n' +
        '      "gravatar_id": "",\n' +
        '      "url": "https://api.github.com/users/Adidem23",\n' +
        '      "html_url": "https://github.com/Adidem23",\n' +
        '      "followers_url": "https://api.github.com/users/Adidem23/followers",\n' +
        '      "following_url": "https://api.github.com/users/Adidem23/following{/other_user}",\n' +
        '      "gists_url": "https://api.github.com/users/Adidem23/gists{/gist_id}",\n' +
        '      "starred_url": "https://api.github.com/users/Adidem23/starred{/owner}{/repo}",\n' +
        '      "subscriptions_url": "https://api.github.com/users/Adidem23/subscriptions",\n' +
        '      "organizations_url": "https://api.github.com/users/Adidem23/orgs",\n' +
        '      "repos_url": "https://api.github.com/users/Adidem23/repos",\n' +
        '      "events_url": "https://api.github.com/users/Adidem23/events{/privacy}",\n' +
        '      "received_events_url": "https://api.github.com/users/Adidem23/received_events",\n' +
        '      "type": "User",\n' +
        '      "user_view_type": "public",\n' +
        '      "site_admin": false,\n' +
        '      "score": 1\n' +
        '    }\n' +
        '  ]\n' +
        '}'
    }
    
    }" }

    {"type":"plan","plan":"I will call search_repositories tool to get the repositories of that user"}

    {"type":"tool_call","tool":"search_repositories","args":{"query":"user:Adidem23"}} 

    {"type":"plan","plan":"I will wait untill I get observation from the search_repositories  function"}

    { type:"observation","observation":"{
 content: [
    {
      type: 'text',
      text: '{\n' +
        '  "total_count": 1,\n' +
        '  "incomplete_results": false,\n' +
        '  "items": [\n' +
        '    {\n' +
        '      "id": 731271058,\n' +
        '      "node_id": "R_kgDOK5ZPkg",\n' +
        '      "name": "Adidem23",\n' +
        '      "full_name": "Adidem23/Adidem23",\n' +
        '      "private": false,\n' +
        '      "owner": {\n' +
        '        "login": "Adidem23",\n' +
        '        "id": 124609794,\n' +
        '        "node_id": "U_kgDOB21lAg",\n' +
        '        "avatar_url": "https://avatars.githubusercontent.com/u/124609794?v=4",\n' +
        '        "url": "https://api.github.com/users/Adidem23",\n' +
        '        "html_url": "https://github.com/Adidem23",\n' +
        '        "type": "User"\n' +
        '      },\n' +
        '      "html_url": "https://github.com/Adidem23/Adidem23",\n' +
        '      "description": "This is My Special Repository Where I have my Readme File ",\n' +
        '      "fork": false,\n' +
        '      "url": "https://api.github.com/repos/Adidem23/Adidem23",\n' +
        '      "created_at": "2023-12-13T17:51:48Z",\n' +
        '      "updated_at": "2025-01-24T06:56:02Z",\n' +
        '      "pushed_at": "2025-01-24T06:55:59Z",\n' +
        '      "git_url": "git://github.com/Adidem23/Adidem23.git",\n' +
        '      "ssh_url": "git@github.com:Adidem23/Adidem23.git",\n' +
        '      "clone_url": "https://github.com/Adidem23/Adidem23.git",\n' +
        '      "default_branch": "main"\n' +
        '    }\n' +
        '  ]\n' +
        '}'
    }
  ]
    }"}

    {"type":"output","output":"Great! I've successfully retrieved the repositories of your friend Adidem23. Here are the details:\n\nRepository Name: Adidem23\nDescription: This is My Special Repository Where I have my Readme File \nURL:git://github.com/Adidem23/Adidem23.git"}

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

   await transport.close()
}


module.exports ={
    processQuery: processQuery,
}