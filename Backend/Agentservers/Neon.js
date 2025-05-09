const { Client } = require("@modelcontextprotocol/sdk/client/index.js")
const { StreamableHTTPClientTransport } = require("@modelcontextprotocol/sdk/client/streamableHttp.js")

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
serverUrl.searchParams.set("api_key", "303f8ce0-afb1-4113-abfc-2864464e3d12")


const transport = new StreamableHTTPClientTransport(serverUrl)

const client = new Client({
     name: "Neon-Client",
     version: "1.0.0",
     transport: transport,
     config: config
})

async function callTransport() {

     await client.connect(transport)

     // const result = await client.listTools();

     // result.tools.forEach((tool) => {
     //      console.log(tool.name);
     //      console.log(tool.inputSchema);
     //      console.log(tool.inputSchema.properties.params);
     // })

     // const result = await client.callTool({
     //      name: "create_project",
     //      arguments: {
     //          params:{
     //           "name":"Test_2.0"
     //          }
     //      }
     // });

     //  const result = await client.callTool({
     //      name: "run_sql",
     //      arguments: {
     //          params:{
     //           "sql":"CREATE DATABASE test_db",
     //           "projectId":"dry-cake-47645260"
     //          }
     //      }
     // });

     // const result = await client.callTool({
     //      name: "describe_table_schema",
     //      arguments: {
     //           params: {
     //                "tableName": "test_db",
     //                "projectId": "dry-cake-47645260"
     //           }
     //      }
     // });


     console.log(result)

}
callTransport()