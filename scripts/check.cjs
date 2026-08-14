"use strict"

const assert = require("node:assert")
const fs = require("node:fs")
const path = require("node:path")
const { spawnSync } = require("node:child_process")

const root = path.resolve(__dirname, "..")
const scriptFiles = [
  "src/extension.js",
  "src/runtime-security.cjs",
  "dist/extension.js",
  "dist/runtime-security.cjs",
  "media/dashboard.js",
  "media/i18n.js",
  "scripts/build.mjs",
  "scripts/check.cjs",
  "scripts/generate-icon.cjs",
  "scripts/package.cjs",
  "scripts/audit-vsix.cjs",
  "scripts/validate-release.cjs",
  "test/run-integration.cjs",
  "test/integration/index.cjs",
  "test/ui-static.test.cjs",
  "test/unit/security.test.cjs",
  "test/unit/metadata.test.cjs",
]

for (const relative of scriptFiles) {
  const result = spawnSync(process.execPath, ["--check", path.join(root, relative)], { encoding: "utf8" })
  assert.strictEqual(result.status, 0, `${relative}: ${result.stderr || result.stdout}`)
}

for (const name of fs.readdirSync(root).filter((name) => /^package(?:\.nls(?:\.[\w-]+)?)?\.json$/.test(name))) {
  JSON.parse(fs.readFileSync(path.join(root, name), "utf8"))
}

const textFiles = [
  ...scriptFiles,
  "package.json",
  "README.md",
  "CHANGELOG.md",
  "SECURITY.md",
  "RELEASING.md",
]
for (const relative of textFiles) {
  const text = fs.readFileSync(path.join(root, relative), "utf8")
  assert.ok(!text.includes("\uFFFD"), `${relative} contains a Unicode replacement character`)
  assert.ok(!/sk-g[A-Za-z0-9_-]{16,}/.test(text), `${relative} appears to contain an API key`)
}

console.log(`check: ${scriptFiles.length} scripts and package metadata passed`)
