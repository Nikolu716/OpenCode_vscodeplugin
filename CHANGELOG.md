# Changelog

All notable changes to this extension are documented here.

## 0.4.0 - 2026-08-13

- Show server-reported quota percentages with proportional, threshold-colored progress bars.
- Make available models compact, collapsible controls that jump to the matching context configuration.
- Preserve the selected model across refreshes and improve keyboard focus and narrow-sidebar layout.
- Remove unsupported per-key model attribution and fabricated usage estimates.
- Restrict API-key requests to the official OpenCode endpoint.
- Protect `opencode.json` with validation, backup, and atomic replacement.
- Restrict optional gateway integration to loopback origins.
- Add reproducible build, security tests, VSIX packaging checks, and release automation.
