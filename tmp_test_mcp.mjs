import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from 'fs';
import path from 'path';

process.env.DEBUG = '*';

async function main() {
    const envContent = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf16le');
    const match = envContent.match(/APIFY_API_TOKEN=(.+)/);
    const apifyKey = match ? match[1].trim() : process.env.APIFY_API_TOKEN;
    if (!apifyKey) throw new Error("No APIFY_API_TOKEN");

    const transport = new StdioClientTransport({
        command: "npx",
        args: [
            "-y",
            "@apify/actors-mcp-server",
            "--tools",
            "stealth_mode/jiji-product-search-scraper"
        ],
        env: {
            ...process.env,
            APIFY_TOKEN: apifyKey
        }
    });

    const client = new Client({ name: "test-client", version: "1.0.0" }, { capabilities: {} });
    await client.connect(transport);

    const tools = await client.listTools();
    console.log(JSON.stringify(tools, null, 2));

    await transport.close();
}

main().catch(console.error);
