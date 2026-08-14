# Releasing

The permanent Marketplace identity is `NikoLu.opencode-go-subscription`. Do not change either component after the first publication.

## One-time setup

1. Create a permanent Visual Studio Marketplace Publisher at `marketplace.visualstudio.com/manage`.
2. Set its ID as `publisher` in `package.json`. Never change `publisher` or `name` after the first release; together they are the upgrade identity.
3. Create the public GitHub repository and add its real `repository`, `bugs`, and `homepage` URLs to `package.json`.
4. Keep `SECURITY.md` pointed at the repository's private security-advisory URL (for this repository: `https://github.com/Nikolu716/OpenCode_vscodeplugin/security/advisories/new`). Forks should replace it with their own private security contact.
5. Create an Azure DevOps PAT with only `Marketplace > Manage`, then add it to the GitHub repository as the Actions secret `VSCE_PAT`.
6. Create a GitHub Actions environment named `marketplace` and configure required reviewers. Tag pushes build first; Marketplace publication waits for this approval.

Run these gates before the first tag:

```bash
npm ci
npm run release:check
npm run verify:all
npm run verify:package
```

`verify:package` creates the VSIX, audits its exact contents, installs it into an isolated VS Code profile, verifies runtime file hashes, and reruns the real Webview tests from the installed package.

## Publishing and upgrades

Use semantic versions:

- `patch`: compatible bug or security fix.
- `minor`: compatible feature.
- `major`: incompatible behavior.

For each upgrade, update `package.json` and `package-lock.json`, add the same version to `CHANGELOG.md`, run all release gates, then commit and tag:

```bash
npm version patch --no-git-tag-version
# Update CHANGELOG.md, then run the four release gates above.
git add package.json package-lock.json CHANGELOG.md
git commit -m "release: v0.4.1"
git tag v0.4.1
git push origin main
git push origin v0.4.1
```

The tag must exactly match `v` plus `package.json` version. GitHub Actions builds and audits one VSIX, pauses at the `marketplace` environment, publishes that exact artifact after approval, and attaches it to the GitHub Release. Existing Marketplace users then receive the upgrade automatically under the unchanged extension identity.
