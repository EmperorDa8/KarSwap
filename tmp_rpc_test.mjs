import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

async function main() {
    const envContent = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf16le');
    const match = envContent.match(/APIFY_API_TOKEN=(.+)/);
    const apifyKey = match ? match[1].trim() : process.env.APIFY_API_TOKEN;
    if (!apifyKey) throw new Error("No APIFY_API_TOKEN");

    const child = spawn('npx', [
        '-y',
        'mcp-remote',
        'https://mcp.apify.com/?tools=stealth_mode/jiji-product-search-scraper',
        '--header',
        `Authorization: Bearer ${apifyKey}`
    ], { shell: true });

    let messageId = 1;

    // Initialize MCP
    child.stdin.write(JSON.stringify({
        jsonrpc: "2.0",
        id: messageId++,
        method: "initialize",
        params: {
            protocolVersion: "2024-11-05",
            capabilities: {},
            clientInfo: { name: "test", version: "1.0.0" }
        }
    }) + '\n');

    child.stdout.on('data', (data) => {
        const str = data.toString();
        console.log("Output:", str);

        // When initialized, send initialized notification and tool call
        if (str.includes('"initialized"')) {
            child.stdin.write(JSON.stringify({
                jsonrpc: "2.0",
                method: "notifications/initialized"
            }) + '\n');

            child.stdin.write(JSON.stringify({
                jsonrpc: "2.0",
                id: messageId++,
                method: "tools/call",
                params: {
                    name: "stealth_mode-jiji-product-search-scraper",
                    arguments: {
                        search: "Toyota Corolla"
                    }
                }
            }) + '\n');
        }
    });

    child.stderr.on('data', (data) => {
        console.error("Error:", data.toString());
    });
}

main().catch(console.error);
