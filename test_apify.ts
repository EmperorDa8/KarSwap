import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    let apifyKey = '';
    try {
        const envContent = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf-8');
        const match = envContent.match(/APIFY_API_TOKEN=(.+)/);
        if (match && match[1]) {
            apifyKey = match[1].trim();
        }
    } catch (e) {
        console.error('Could not read .env.local:', e);
        process.exit(1);
    }

    console.log('Testing Apify MCP connection...');

    const transport = new StdioClientTransport({
        command: "npx.cmd",
        args: [
            "-y",
            "mcp-remote",
            "https://mcp.apify.com/?tools=stealth_mode/jiji-product-search-scraper",
            "--header",
            `Authorization: Bearer ${apifyKey}`
        ]
    });

    const client = new Client({ name: "test-client", version: "1.0.0" }, { capabilities: {} });
    await client.connect(transport);

    try {
        console.log('Listing tools...');
        const tools = await client.listTools();
        console.log('Available tools:', JSON.stringify(tools, null, 2));

        if (tools.tools.length > 0) {
            const toolName = tools.tools[0].name;
            console.log(`Calling tool: ${toolName}...`);
            const response = await client.callTool({
                name: toolName,
                arguments: {
                    search: "Toyota Camry 2022",
                    maxItems: 2
                }
            });
            console.log('Tool response:', JSON.stringify(response, null, 2));
        }
    } catch (err) {
        console.error('Error during test:', err);
    } finally {
        await transport.close();
    }
}

main();
