import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from "fs";

async function main() {
    const envContent = fs.readFileSync('.env.local', 'utf16le');
    const match = envContent.match(/APIFY_API_TOKEN=(.+)/);
    const apifyKey = match ? match[1].trim() : process.env.APIFY_API_TOKEN;
    if (!apifyKey) throw new Error("No APIFY_API_TOKEN");

    const transport = new StdioClientTransport({
        command: process.platform === 'win32' ? 'npx.cmd' : 'npx',
        args: [
            "-y",
            "mcp-remote",
            "https://mcp.apify.com/?tools=stealth_mode/jiji-product-search-scraper",
            "--header",
            `Authorization: Bearer ${apifyKey}`
        ]
    });

    const client = new Client({ name: "karswap", version: "1.0.0" }, { capabilities: {} });
    await client.connect(transport);

    console.log("Connected. Calling tool...");
    try {
        const response = await client.callTool({
            name: "stealth_mode-slash-jiji-product-search-scraper",
            arguments: {
                search: "Toyota Corolla 2020",
                maxItems: 3
            }
        });
        console.log("Response:", JSON.stringify(response, null, 2));
    } catch (e) {
        console.error("Error calling tool:", e);
    }

    await transport.close();
}

main().catch(console.error);
