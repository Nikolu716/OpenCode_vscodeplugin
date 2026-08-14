# OpenCode Go Subscription Manager

View and manage OpenCode Go subscription usage from the VS Code sidebar.

This is an independent community extension and is not affiliated with or endorsed by OpenCode.

## Features

- Displays the 5-hour, weekly, and monthly percentages returned by the OpenCode Go usage API.
- Shows reset countdowns, rate-limit state, configurable warnings, and a persistent status-bar summary.
- Manages multiple manually added API keys using VS Code SecretStorage.
- Lists available OpenCode Go models. Selecting a model opens and focuses its matching context configuration.
- Updates model context limits in an existing `opencode.json`, with validation, backup, and atomic replacement.
- Optionally displays a local relay gateway when configured with a loopback URL.
- Supports Simplified Chinese, Traditional Chinese, English, Korean, and Japanese.

The extension does not estimate monetary usage or attribute usage to individual models because the available API response does not provide those data.

## Getting started

1. Open the OpenCode Go icon in the Activity Bar.
2. Paste an API key from [opencode.ai](https://opencode.ai/auth).
3. Add, switch, rename, or remove plans from the account management view.

The extension does not scan `auth.json`. Each key must be added explicitly.

## Settings

| Setting | Default | Description |
| --- | --- | --- |
| `opencodeGo.autoRefreshInterval` | `60` | Refresh interval in seconds. Set to `0` to disable automatic refresh. |
| `opencodeGo.gatewayUrl` | `""` | Optional local gateway origin, for example `http://127.0.0.1:8000`. Only loopback HTTP(S) origins are accepted. |
| `opencodeGo.notifyThresholds` | `{enabled:true,warn:80,crit:100}` | Warning and critical usage thresholds. |

## Data and configuration safety

API keys are stored in VS Code SecretStorage and sent only to the official OpenCode usage endpoint. See [SECURITY.md](SECURITY.md) for the exact data flow. Context configuration changes preserve existing fields and create `opencode.json.bak` before replacement.

## Development

This `0.4.0` repository is a JavaScript recovery baseline created from the previously installed extension. `src/extension.js` is the source of truth while the code is incrementally split into maintainable modules.

```bash
npm ci
npm run build
npm run check
npm run test:unit
npm run test:integration
npm run package
```

`npm run package` writes the VSIX to `artifacts/`. Public release setup and versioning are documented in [RELEASING.md](RELEASING.md).

## License

MIT. See [LICENSE.txt](LICENSE.txt).
