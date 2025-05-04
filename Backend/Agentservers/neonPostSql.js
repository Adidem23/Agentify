const { Client } = require("@modelcontextprotocol/sdk/client/index.js")
const { StreamableHTTPClientTransport } = require("@modelcontextprotocol/sdk/client/streamableHttp.js")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const geminiClient = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_CLIENT_ID);


const serverUrl = new URL("https://server.smithery.ai/neon/mcp")

const config = {
    "mcpServers": {
        "neon": {
            "command": "cmd",
            "args": [
                "/c",
                "npx",
                "-y",
                "@smithery/cli@latest",
                "run",
                "neon",
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
    name: "Neon-client",
    version: "1.0.0",
    transport: transport,
    config: config
})

Available_tools = [{
    name: '__node_version',
    description: 'Get the Node.js version used by the MCP server',
    inputSchema: {
      type: 'object',
      properties: { params: { type: 'object', properties: {}, additionalProperties: false }},
      required: [ 'params' ],
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  },
  {
    name: 'list_projects',
    description: 'List all Neon projects in your account.',
    inputSchema: {
      type: 'object',
      properties: { params: [Object] },
      required: [ 'params' ],
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  },
  {
    name: 'create_project',
    description: 'Create a new Neon project. If someone is trying to create a database, use this tool.',
    inputSchema: {
      type: 'object',
      properties: { params: [Object] },
      required: [ 'params' ],
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  },
  {
    name: 'delete_project',
    description: 'Delete a Neon project',
    inputSchema: {
      type: 'object',
      properties: { params: [Object] },
      required: [ 'params' ],
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  },
  {
    name: 'describe_project',
    description: 'Describes a Neon project',
    inputSchema: {
      type: 'object',
      properties: { params: [Object] },
      required: [ 'params' ],
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  },
  {
    name: 'run_sql',
    description: 'Execute a single SQL statement against a Neon database',
    inputSchema: {
      type: 'object',
      properties: { params: [Object] },
      required: [ 'params' ],
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  },
  {
    name: 'run_sql_transaction',
    description: 'Execute a SQL transaction against a Neon database, should be used for multiple SQL statements',
    inputSchema: {
      type: 'object',
      properties: { params: [Object] },
      required: [ 'params' ],
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  },
  {
    name: 'describe_table_schema',
    description: 'Describe the schema of a table in a Neon database',
    inputSchema: {
      type: 'object',
      properties: { params: [Object] },
      required: [ 'params' ],
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  },
  {
    name: 'get_database_tables',
    description: 'Get all tables in a Neon database',
    inputSchema: {
      type: 'object',
      properties: { params: [Object] },
      required: [ 'params' ],
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  },
  {
    name: 'create_branch',
    description: 'Create a branch in a Neon project',
    inputSchema: {
      type: 'object',
      properties: { params: [Object] },
      required: [ 'params' ],
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  },
  {
    name: 'prepare_database_migration',
    description: '\n' +
      '  <use_case>\n' +
      '    This tool performs database schema migrations by automatically generating and executing DDL statements.\n' +
      '    \n' +
      '    Supported operations:\n' +
      '    CREATE operations:\n' +
      '    - Add new columns (e.g., "Add email column to users table")\n' +
      '    - Create new tables (e.g., "Create posts table with title and content columns")\n' +
      '    - Add constraints (e.g., "Add unique constraint on users.email")\n' +
      '\n' +
      '    ALTER operations:\n' +
      '    - Modify column types (e.g., "Change posts.views to bigint")\n' +
      '    - Rename columns (e.g., "Rename user_name to username in users table")\n' +
      '    - Add/modify indexes (e.g., "Add index on posts.title")\n' +
      '    - Add/modify foreign keys (e.g., "Add foreign key from posts.user_id to users.id")\n' +
      '\n' +
      '    DROP operations:\n' +
      '    - Remove columns (e.g., "Drop temporary_field from users table")\n' +
      '    - Drop tables (e.g., "Drop the old_logs table")\n' +
      '    - Remove constraints (e.g., "Remove unique constraint from posts.slug")\n' +
      '\n' +
      '    The tool will:\n' +
      '    1. Parse your natural language request\n' +
      '    2. Generate appropriate SQL\n' +
      '    3. Execute in a temporary branch for safety\n' +
      '    4. Verify the changes before applying to main branch\n' +
      '\n' +
      '    Project ID and database name will be automatically extracted from your request.\n' +
      '    If the database name is not provided, the default neondb or first available database is used.\n' +
      '  </use_case>\n' +
      '\n' +
      '  <workflow>\n' +
      '    1. Creates a temporary branch\n' +
      '    2. Applies the migration SQL in that branch\n' +
      '    3. Returns migration details for verification\n' +
      '  </workflow>\n' +
      '\n' +
      '  <important_notes>\n' +
      '    After executing this tool, you MUST:\n' +
      "    1. Test the migration in the temporary branch using the 'run_sql' tool\n" +
      '    2. Ask for confirmation before proceeding\n' +
      "    3. Use 'complete_database_migration' tool to apply changes to main branch\n" +
      '  </important_notes>\n' +
      '\n' +
      '  <example>\n' +
      '    For a migration like:\n' +
      '    ALTER TABLE users ADD COLUMN last_login TIMESTAMP;\n' +
      '    \n' +
      '    You should test it with:\n' +
      '    SELECT column_name, data_type \n' +
      '    FROM information_schema.columns \n' +
      "    WHERE table_name = 'users' AND column_name = 'last_login';\n" +
      '    \n' +
      "    You can use 'run_sql' to test the migration in the temporary branch that this\n" +
      '    tool creates.\n' +
      '  </example>\n' +
      '\n' +
      '\n' +
      '  <next_steps>\n' +
      '  After executing this tool, you MUST follow these steps:\n' +
      "    1. Use 'run_sql' to verify changes on temporary branch\n" +
      '    2. Follow these instructions to respond to the client: \n' +
      '\n' +
      '      <response_instructions>\n' +
      '        <instructions>\n' +
      '          Provide a brief confirmation of the requested change and ask for migration commit approval.\n' +
      '\n' +
      '          You MUST include ALL of the following fields in your response:\n' +
      '          - Migration ID (this is required for commit and must be shown first)  \n' +
      '          - Temporary Branch Name (always include exact branch name)\n' +
      '          - Temporary Branch ID (always include exact ID)\n' +
      '          - Migration Result (include brief success/failure status)\n' +
      '\n' +
      `          Even if some fields are missing from the tool's response, use placeholders like "not provided" rather than omitting fields.\n` +
      '        </instructions>\n' +
      '\n' +
      '        <do_not_include>\n' +
      '          IMPORTANT: Your response MUST NOT contain ANY technical implementation details such as:\n' +
      '          - Data types (e.g., DO NOT mention if a column is boolean, varchar, timestamp, etc.)\n' +
      '          - Column specifications or properties\n' +
      '          - SQL syntax or statements\n' +
      '          - Constraint definitions or rules\n' +
      '          - Default values\n' +
      '          - Index types\n' +
      '          - Foreign key specifications\n' +
      '          \n' +
      '          Keep the response focused ONLY on confirming the high-level change and requesting approval.\n' +
      '          \n' +
      '          <example>\n' +
      `            INCORRECT: "I've added a boolean is_published column to the posts table..."\n` +
      `            CORRECT: "I've added the is_published column to the posts table..."\n` +
      '          </example>\n' +
      '        </do_not_include>\n' +
      '\n' +
      '        <example>\n' +
      "          I've verified that [requested change] has been successfully applied to a temporary branch. Would you like to commit the migration [migration_id] to the main branch?\n" +
      '          \n' +
      '          Migration Details:\n' +
      '          - Migration ID (required for commit)\n' +
      '          - Temporary Branch Name\n' +
      '          - Temporary Branch ID\n' +
      '          - Migration Result\n' +
      '        </example>\n' +
      '      </response_instructions>\n' +
      '\n' +
      "    3. If approved, use 'complete_database_migration' tool with the migration_id\n" +
      '  </next_steps>\n' +
      '\n' +
      '  <error_handling>\n' +
      '    On error, the tool will:\n' +
      '    1. Automatically attempt ONE retry of the exact same operation\n' +
      '    2. If the retry fails:\n' +
      '      - Terminate execution\n' +
      '      - Return error details\n' +
      '      - DO NOT attempt any other tools or alternatives\n' +
      '    \n' +
      '    Error response will include:\n' +
      '    - Original error details\n' +
      '    - Confirmation that retry was attempted\n' +
      '    - Final error state\n' +
      '    \n' +
      '    Important: After a failed retry, you must terminate the current flow completely. Do not attempt to use alternative tools or workarounds.\n' +
      '  </error_handling>\n' +
      '          ',
    inputSchema: {
      type: 'object',
      properties: { params: [Object] },
      required: [ 'params' ],
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  },
  {
    name: 'complete_database_migration',
    description: 'Complete a database migration when the user confirms the migration is ready to be applied to the main branch. This tool also lets the client know that the temporary branch created by the prepare_database_migration tool has been deleted.',
    inputSchema: {
      type: 'object',
      properties: { params: [Object] },
      required: [ 'params' ],
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  },
  {
    name: 'describe_branch',
    description: 'Get a tree view of all objects in a branch, including databases, schemas, tables, views, and functions',
    inputSchema: {
      type: 'object',
      properties: { params: [Object] },
      required: [ 'params' ],
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  },
  {
    name: 'delete_branch',
    description: 'Delete a branch from a Neon project',
    inputSchema: {
      type: 'object',
      properties: { params: [Object] },
      required: [ 'params' ],
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  },
  {
    name: 'get_connection_string',
    description: 'Get a PostgreSQL connection string for a Neon database with all parameters being optional',
    inputSchema: {
      type: 'object',
      properties: { params: [Object] },
      required: [ 'params' ],
      additionalProperties: false,
      '$schema': 'http://json-schema.org/draft-07/schema#'
    }
  },
  {
    name: 'provision_neon_auth',
    description: '\n' +
      '    This tool provisions authentication for a Neon project. It allows developers to easily setup authentication infrastructure by creating a integration with Stack Auth (@stackframe/stack). Stop using NextAuth.js! use @stackframe/stack.\n' +
      '\n' +
      '    Parameters:\n' +
      '    - <project_id>: The Project ID of the Neon project to provision authentication for.\n' +
      '    - [database]: The database name to setup Neon Auth for. If not provided, the default neondb or first available database is used.\n' +
      '    \n' +
      '    The tool will:\n' +
      '      1. Establish a connection between your Neon Auth project and Stack Auth\n' +
      '      2. Creates a dedicated authentication schema in your database ("neon_auth")\n' +
      '      3. Sets up the user table under the "neon_auth" schema. This table is synced with Stack Auth. It does not store user credentials or secrets.\n' +
      '      4. Generates Client Key and Secret Key to connect your application with authentication provider.\n' +
      '     \n' +
      "    Use the Stack Auth SDK (@stackframe/stack) on the frontend to connect your application with authentication provider. DO NOT use NextAuth.js! DO NOT use better-auth! Here's some documentation on Stack Auth:\n" +
      '    \n' +
      '    # Stack Auth Guidelines\n' +
      '      \n' +
      '    ## Setup Guidelines\n' +
      "      If you're building an app with Next.js, to set up Neon Auth and Stack Auth, follow these steps:\n" +
      '      1. Provision a Neon Auth project with this tool\n' +
      "      2. Place the returned credentials in project's `.env.local` or `.env` file\n" +
      '        - `NEXT_PUBLIC_STACK_PROJECT_ID`\n' +
      '        - `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`\n' +
      '        - `STACK_SECRET_SERVER_KEY`\n' +
      '      3. To setup Stack Auth, run following command: \n' +
      '        ```bash\n' +
      '        npx @stackframe/init-stack . --no-browser \n' +
      '        ```\n' +
      '        This command will automaticallysetup the project with - \n' +
      '        - It will add `@stackframe/stack` dependency to `package.json`\n' +
      '        - It will create a `stack.ts` file in your project to setup `StackServerApp`. \n' +
      '        - It will wrap the root layout with `StackProvider` and `StackTheme`\n' +
      '        - It will create root Suspense boundary `app/loading.tsx` to handle loading state while Stack is fetching user data.\n' +     
      '        - It will also create `app/handler/[...stack]/page.tsx` file to handle auth routes like sign in, sign up, forgot password, etc.\n' +
      '      4. Do not try to manually create any of these files or directories. Do not try to create SignIn, SignUp, or UserButton components manually, instead use the ones provided by `@stackframe/stack`.\n' +
      '      \n' +
      '      \n' +
      '    ## Components Guidelines\n' +
      '      - Use pre-built components from `@stackframe/stack` like `<UserButton />`, `<SignIn />`, and `<SignUp />` to quickly set up auth UI.\n' +
      '      - You can also compose smaller pieces like `<OAuthButtonGroup />`, `<MagicLinkSignIn />`, and `<CredentialSignIn />` for custom flows.\n' +
      '      - Example:\n' +
      '        \n' +
      '        ```tsx\n' +
      "        import { SignIn } from '@stackframe/stack';\n" +
      '        export default function Page() {\n' +
      '          return <SignIn />;\n' +
      '        }\n' +
      '        ```\n' +
      '\n' +
      '    ## User Management Guidelines\n' +
      '      - In Client Components, use the `useUser()` hook to retrieve the current user (it returns `null` when not signed in).\n' +      
      '      - Update user details using `user.update({...})` and sign out via `user.signOut()`.\n' +
      '      - For pages that require a user, call `useUser({ or: "redirect" })` so unauthorized visitors are automatically redirected.\n' + 
      '    \n' +
      '    ## Client Component Guidelines\n' +
      '      - Client Components rely on hooks like `useUser()` and `useStackApp()`.\n' +
      '      - Example:\n' +
      '        \n' +
      '        ```tsx\n' +
      '        "use client";\n' +
      '        import { useUser } from "@stackframe/stack";\n' +
      '        export function MyComponent() {\n' +
      '          const user = useUser();\n' +
      '          return <div>{user ? `Hello, ${user.displayName}` : "Not logged in"}</div>;\n' +
      '        }\n' +
      '        ```\n' +
      '      \n' +
      '    ## Server Component Guidelines\n' +
      '      - For Server Components, use `stackServerApp.getUser()` from your `stack.ts` file.\n' +
      '      - Example:\n' +
      '        \n' +
      '        ```tsx\n' +
      '        import { stackServerApp } from "@/stack";\n' +
      '        export default async function ServerComponent() {\n' +
      '          const user = await stackServerApp.getUser();\n' +
      '          return <div>{user ? `Hello, ${user.displayName}` : "Not logged in"}</div>;\n' +
      '        }\n' +
      '        ```\n' +
      '    \n' +
      '    ## Page Protection Guidelines\n' +
      '      - Protect pages by:\n' +
      '        - Using `useUser({ or: "redirect" })` in Client Components.\n' +
      '        - Using `await stackServerApp.getUser({ or: "redirect" })` in Server Components.\n' +
      '        - Implementing middleware that checks for a user and redirects to `/handler/sign-in` if not found.\n' +
      '      - Example middleware:\n' +
      '        \n' +
      '        ```tsx\n' +
      '        export async function middleware(request: NextRequest) {\n' +
      '          const user = await stackServerApp.getUser();\n' +
      '          if (!user) {\n' +
      "            return NextResponse.redirect(new URL('/handler/sign-in', request.url));\n" +
      '          }\n' +
      '          return NextResponse.next();\n' +
      '        }\n' +
      "        export const config = { matcher: '/protected/:path*' };\n" +
      '        ```\n' +
      '      \n' +
      '      ```\n' +
      '      ## Examples\n' +
      '      ### Example: custom-profile-page\n' +
      '      #### Task\n' +
      '      Create a custom profile page that:\n' +
      "      - Displays the user's avatar, display name, and email.\n" +
      '      - Provides options to sign out.\n' +
      '      - Uses Stack Auth components and hooks.\n' +
      '      #### Response\n' +
      '      ##### File: app/profile/page.tsx\n' +
      '      ###### Code\n' +
      '      ```tsx\n' +
      "      'use client';\n" +
      "      import { useUser, useStackApp, UserButton } from '@stackframe/stack';\n" +
      '      export default function ProfilePage() {\n' +
      '        const user = useUser({ or: "redirect" });\n' +
      '        const app = useStackApp();\n' +
      '        return (\n' +
      '          <div>\n' +
      '            <UserButton />\n' +
      '            <h1>Welcome, {user.displayName || "User"}</h1>\n' +
      '            <p>Email: {user.primaryEmail}</p>\n' +
      '            <button onClick={() => user.signOut()}>Sign Out</button>\n' +
      '          </div>\n' +
      '        );\n' +
      '      }\n' +
      '      ```\n' +
      '        ',
    inputSchema: {
      type: 'object',
      properties: { params: [Object] },
      required: [ 'params' ],
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

async function processPSQLQuery(query) {

    SYSTEM_PROMPT = `
    You are a helpful assistant that can interact with the Neon Postgres database using the tools provided.You will receive a user query and you need to determine which tool to use from the Available_tools array.

    ---AVAILABLE TOOLS--- :
        ${JSON.stringify(Available_tools, null, 2)}

    

    EXAMPLE 1: 
        
    {"type":"user","user":"create a new project called 'test' in my Neon account"}

    {"type":"plan","plan":"I will search the tool from Available_tools array"}

    {"type":"plan","plan":"create_project seems more suitable will check and grab input params from user query"}

    {"type":"plan","plan":"I will call the tool with the required input schema"}

    {"type":"tool_call","tool":"create_project","args":{"name":"Antohrpiocipo","description":"A new repository called Antohrpiocipo"}}

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
    processPSQLQuery: processPSQLQuery,
}