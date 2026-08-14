# Security

## Data handling

- API keys are stored in VS Code SecretStorage.
- Keys are sent only to `https://opencode.ai/zen/go/v1/usage` using an Authorization header.
- The available-model request goes to `https://opencode.ai/zen/go/v1/models` without a key.
- Optional gateway integration accepts only HTTP(S) loopback origins such as `http://127.0.0.1:8000`.
- Context changes update the user's existing `opencode.json`; the extension validates the document, writes a `.bak` copy, and replaces it atomically.

The extension is disabled in untrusted workspaces because it stores credentials, performs network requests, and can update user configuration.

## Reporting

Do not include API keys, full request headers, or private `opencode.json` content in a public issue. Report vulnerabilities privately through [GitHub Security Advisories](https://github.com/Nikolu716/OpenCode_vscodeplugin/security/advisories/new).
