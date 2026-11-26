# Client connections · verified from official sources 28 October 2026

## Contents

1. Shared boundaries
2. ChatGPT and Claude web
3. Codex
4. Claude Code
5. Gemini CLI
6. Cursor
7. VS Code / Copilot
8. xAI / Grok API
9. Stdio bridge and verification

## 1. Shared boundaries

Endpoint for all examples: `https://canvas.jadisatu.cloud/mcp`. Choose **Streamable HTTP**, not an invented SSE endpoint. The owner approves OAuth DCR + PKCE for one board, or supplies a single-board token via the `JADISATU_CANVAS_TOKEN` environment variable. The client process must receive that environment variable; another terminal or local host does not automatically pass it to a GUI, container, or remote host.

Examples are snippets to **merge** into an existing configuration, not commands to overwrite files. Do not run them as an automatic installation. No new tokens, accounts, or connections are created by this documentation. Inspecting sources/schemas is not a real login test across all UIs. Gemini web and Grok web are not equivalent to their CLI/API.

## 2. ChatGPT and Claude web · OAuth

**ChatGPT:** add a custom MCP server/plugin with the URL above, choose OAuth and DCR if a registration option is shown, then complete the owner login and board/permission approval. Install/enable the plugin in the conversation. Availability depends on account and workspace rules. Do not enter a made-up client secret or assume ChatGPT reads local Codex configuration. Sources: [custom MCP server](https://developers.openai.com/api/docs/guides/custom-mcp-server), [OpenAI auth contract](https://developers.openai.com/plugins/build/auth).

**Claude web:** open custom connector settings, enter that URL, choose sign-in and **Register automatically** for DCR, then log in to Canvas and pick the board/permissions. Enable the connector in the conversation. This server does not advertise Client ID Metadata Documents, so published identity is not a substitute for DCR. A Claude connection already pointing to another board does not automatically acquire a new room. Source: [official Claude custom connectors](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp).

## 3. Codex · bearer environment or OAuth

Merge into the Codex MCP configuration chosen by the owner:

```toml
[mcp_servers.jadisatu_canvas]
url = "https://canvas.jadisatu.cloud/mcp"
bearer_token_env_var = "JADISATU_CANVAS_TOKEN"
```

The OAuth alternative uses the endpoint without `bearer_token_env_var`. Once the owner chooses CLI setup, the documented commands are:

```sh
codex mcp add jadisatu_canvas --url https://canvas.jadisatu.cloud/mcp
codex mcp login jadisatu_canvas --oauth-client-registration dcr
```

These commands alter client configuration, so they are not part of offline skill testing. Source: [Codex MCP](https://learn.chatgpt.com/docs/extend/mcp?surface=cli). Local CLI help confirms the bearer flag (`codex mcp add --help`) and the `dcr` registration option (`codex mcp login --help`).

## 4. Claude Code · `.mcp.json`

```json
{
  "mcpServers": {
    "jadisatu_canvas": {
      "type": "http",
      "url": "https://canvas.jadisatu.cloud/mcp",
      "headers": {"Authorization": "Bearer ${JADISATU_CANVAS_TOKEN}"}
    }
  }
}
```

Claude Code expands `${VAR}` in headers. For OAuth, omit the static header and complete authentication from MCP management. Do not disable tool approvals globally. Source: [Claude Code MCP and environment expansion](https://code.claude.com/docs/en/mcp#environment-variable-expansion-in-mcpjson).

## 5. Gemini CLI · `.gemini/settings.json`

```json
{
  "mcpServers": {
    "jadisatu_canvas": {
      "httpUrl": "https://canvas.jadisatu.cloud/mcp"
    }
  }
}
```

Gemini CLI uses `httpUrl` for Streamable HTTP; `url` selects SSE transport. Let OAuth discovery detect the server, then run `/mcp auth jadisatu_canvas` in a session prepared by the owner. Documentation guarantees environment expansion in the `env` block; do not assume that syntax works in headers on every version. For a bearer environment, use the bridge in §9 with Gemini's `env` mapping. Source: [Gemini CLI MCP](https://geminicli.com/docs/tools/mcp-server/).

## 6. Cursor · `.cursor/mcp.json`

```json
{
  "mcpServers": {
    "jadisatu_canvas": {
      "url": "https://canvas.jadisatu.cloud/mcp",
      "headers": {"Authorization": "Bearer ${env:JADISATU_CANVAS_TOKEN}"}
    }
  }
}
```

Cursor uses `${env:NAME}`. For OAuth, omit the header and use the client's available authentication flow; do not invent a client secret. Source: [Cursor MCP and config interpolation](https://cursor.com/docs/mcp#config-interpolation).

## 7. VS Code / Copilot · choose the matching format

The VS Code format in `.vscode/mcp.json` uses `servers`:

```json
{
  "servers": {
    "jadisatu_canvas": {
      "type": "http",
      "url": "https://canvas.jadisatu.cloud/mcp",
      "headers": {"Authorization": "Bearer ${env:JADISATU_CANVAS_TOKEN}"}
    }
  }
}
```

The portable Copilot format in `.mcp.json` uses `mcpServers` and `${NAME}`:

```json
{
  "mcpServers": {
    "jadisatu_canvas": {
      "type": "http",
      "url": "https://canvas.jadisatu.cloud/mcp",
      "headers": {"Authorization": "Bearer ${JADISATU_CANVAS_TOKEN}"}
    }
  }
}
```

Do not mix the formats of the two files. Supply the environment to the right host/harness. Source: [VS Code MCP configuration reference](https://code.visualstudio.com/docs/agents/reference/mcp-configuration).

## 8. xAI / Grok API · remote MCP

For an application **already** authorized to use the xAI Responses API, include this object in the `tools` list of an existing request. No model calls are run by the skill:

```python
import os

canvas_tool = {
    "type": "mcp",
    "server_url": "https://canvas.jadisatu.cloud/mcp",
    "server_label": "jadisatu_canvas",
    "headers": {"Authorization": f"Bearer {os.environ['JADISATU_CANVAS_TOKEN']}"},
    "allowed_tools": ["read_board", "read_image", "get_sketch", "list_activity"],
}
```

The example intentionally restricts read tools. Write tasks require a write token and matching allowlist; server permissions still govern. This is xAI's OpenAI-compatible Responses API form. Native xAI SDKs use other names, including `extra_headers` and `allowed_tool_names`; do not copy parameters across SDKs. This support does not prove the connector is available on Grok web. Source: [official xAI remote MCP](https://docs.x.ai/developers/tools/remote-mcp).

## 9. Stdio bridge and verification

Stdio clients can run **`server/bridge.mjs` from a Jadisatu Canvas app checkout**, with Node ≥22.13 and app dependencies already available. That file is not in the skill-development repo. Specify the real checkout path via the `JADISATU_CANVAS_DIR` environment variable; do not guess paths or install dependencies without matching scope.

Codex example, once that environment variable and `JADISATU_CANVAS_TOKEN` are supplied by the owner:

```toml
[mcp_servers.jadisatu_canvas_bridge]
command = "sh"
args = ["-c", 'export MCP_TOKEN="$JADISATU_CANVAS_TOKEN"; exec node "$JADISATU_CANVAS_DIR/server/bridge.mjs"']
env_vars = ["JADISATU_CANVAS_DIR", "JADISATU_CANVAS_TOKEN"]
env = { MCP_URL = "https://canvas.jadisatu.cloud/mcp" }
```

The bridge reads `MCP_URL` and `MCP_TOKEN`; the example above maps the token from the environment without making it a process argument. Mapping syntax differs per client; the following Gemini example uses the documented `env` expansion:

```json
{
  "mcpServers": {
    "jadisatu_canvas_bridge": {
      "command": "sh",
      "args": ["-c", "exec node \"$JADISATU_CANVAS_DIR/server/bridge.mjs\""],
      "env": {
        "JADISATU_CANVAS_DIR": "$JADISATU_CANVAS_DIR",
        "MCP_URL": "https://canvas.jadisatu.cloud/mcp",
        "MCP_TOKEN": "$JADISATU_CANVAS_TOKEN"
      }
    }
  }
}
```

`sh` is a POSIX example; for Windows clients use the right runtime/path on that machine. The token does not become a process argument. Do not enable both HTTP and bridge connections with duplicate names/identities unnecessarily.

After the owner prepares one client: verify `tools/list` is available, `read_board` returns the approved board, then use `read_image` for one active reference. Test writes only when requested and with the latest `contextVersion`. Record which connection was actually tested; never report all providers as working just because the examples parse.
