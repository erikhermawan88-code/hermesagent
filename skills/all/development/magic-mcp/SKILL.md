---
name: magic-mcp
description: AI-powered UI component generator via natural language — 21st.dev Magic MCP
---

# magic-mcp

Magic MCP Server dari [21st.dev](https://21st.dev/magic) — AI-powered UI component generator.

## Status
**FREE during beta** (but requires API key from [21st.dev/magic/console](https://21st.dev/magic/console))

## What it does
Generate polished UI components via natural language. Works with Cursor, Windsurf, Cline, Claude Code.

## Install

### CLI (one command)
```bash
npx @21st-dev/cli@latest install claude --api-key <YOUR_API_KEY>
```

### Manual MCP config
For Claude Code, add to `~/.claude/mcp_config.json`:
```json
{
  "mcpServers": {
    "magic": {
      "command": "npx",
      "args": ["-y", "@21st-dev/magic@latest", "API_KEY=***"]
    }
  }
}
```

For Cursor: `~/.cursor/mcp.json`
For Windsurf: `~/.codeium/windsurf/mcp_config.json`

## Usage in IDE
Type `/ui` followed by component description:
```
/ui create a modern navigation bar with responsive design
/ui create a pricing table with 3 tiers
/ui create a contact form with floating labels
```

## API Key
Get free key at: https://21st.dev/magic/console

## Notes
- Self-hosted — no data shared with 3rd parties
- Components are customizable React/TS
- Currently in beta, all features free
