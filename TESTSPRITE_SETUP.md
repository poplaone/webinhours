# TestSprite MCP Setup Guide

## 1. Get your API Key
Ensure you have your TestSprite API Key ready.

## 2. Configure your MCP Client
Add the following configuration to your MCP Client's settings file (e.g., `claude_desktop_config.json` for Claude Desktop).

```json
{
  "mcpServers": {
    "TestSprite": {
      "command": "npx",
      "args": [
        "-y",
        "@testsprite/testsprite-mcp@latest"
      ],
      "env": {
        "API_KEY": "YOUR_ACTUAL_API_KEY_HERE"
      }
    }
  }
}
```

> [!NOTE]
> The `-y` flag is added to `args` to automatically proceed with the `npx` installation without prompting for confirmation.

## 3. Verify Installation
1. Restart your MCP Client (e.g., Claude Desktop).
2. Open a new chat.
3. Type: `Help me test this project with TestSprite`.
4. If the agent responds with TestSprite's testing flow, the integration is successful.
