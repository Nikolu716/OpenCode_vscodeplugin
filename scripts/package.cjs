"use strict"

const fs = require("node:fs")
const path = require("node:path")
const { spawnSync } = require("node:child_process")

const root = path.resolve(__dirname, "..")
const manifest = require(path.join(root, "package.json"))
const artifacts = path.join(root, "artifacts")
const output = path.join(artifacts, `${manifest.name}-${manifest.version}.vsix`)
const vsce = path.join(root, "node_modules", "@vscode", "vsce", "vsce")

if (!fs.existsSync(vsce)) throw new Error("Run npm ci before packaging")
fs.mkdirSync(artifacts, { recursive: true })
const packageArgs = [vsce, "package", "--out", output]
if (!manifest.repository) packageArgs.push("--allow-missing-repository", "--no-rewrite-relative-links")
const packageEnvironment = manifest.publisher === "zcode-local"
  ? { ...process.env, OPENCODE_GO_LOCAL_PACKAGE: "1" }
  : process.env
const result = spawnSync(process.execPath, packageArgs, {
  cwd: root,
  encoding: "utf8",
  env: packageEnvironment,
  shell: false,
})
if (result.stdout) process.stdout.write(result.stdout)
if (result.stderr) process.stderr.write(result.stderr)
if (result.error) throw result.error
if (result.status !== 0) process.exit(result.status ?? 1)

const audit = spawnSync(process.execPath, [path.join(root, "scripts", "audit-vsix.cjs"), output], {
  cwd: root,
  encoding: "utf8",
  shell: false,
})
if (audit.stdout) process.stdout.write(audit.stdout)
if (audit.stderr) process.stderr.write(audit.stderr)
if (audit.error) throw audit.error
if (audit.status !== 0) process.exit(audit.status ?? 1)
console.log(output)
