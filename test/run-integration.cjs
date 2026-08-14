"use strict"

const assert = require("node:assert/strict")
const crypto = require("node:crypto")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")
const { spawnSync } = require("node:child_process")
const { downloadAndUnzipVSCode, runTests } = require("@vscode/test-electron")

const root = path.resolve(__dirname, "..")
const manifest = require(path.join(root, "package.json"))
const args = process.argv.slice(2)
const testVsix = args.includes("--vsix")
if (args.some((arg) => arg !== "--vsix")) throw new Error(`Unknown argument: ${args.find((arg) => arg !== "--vsix")}`)

// Extension hosts set this for their own Code.exe process; inheriting it turns
// the separate test instance into a plain Node process on Windows.
delete process.env.ELECTRON_RUN_AS_NODE
const candidates = [
  process.env.VSCODE_EXECUTABLE_PATH,
  process.platform === "win32" ? "D:\\Microsoft VS Code\\Code.exe" : null,
  process.platform === "win32" && process.env.LOCALAPPDATA
    ? path.join(process.env.LOCALAPPDATA, "Programs", "Microsoft VS Code", "Code.exe")
    : null,
].filter(Boolean)
let vscodeExecutablePath = candidates.find((candidate) => fs.existsSync(candidate))
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "opencode-go-integration-"))
const workspacePath = path.join(temporaryRoot, "workspace")
const runtimeExtensionsPath = path.join(temporaryRoot, "runtime-extensions")
fs.mkdirSync(workspacePath, { recursive: true })

const digest = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex")

function runCodeCli(cliArgs) {
  if (!vscodeExecutablePath) throw new Error("A local VS Code executable is required for installed-VSIX tests")
  let executable = vscodeExecutablePath
  let commandArgs = cliArgs
  const env = { ...process.env }
  if (process.platform === "win32") {
    const cliModule = path.join(path.dirname(vscodeExecutablePath), "resources", "app", "out", "cli.js")
    assert.ok(fs.existsSync(cliModule), `VS Code CLI module is missing: ${cliModule}`)
    env.ELECTRON_RUN_AS_NODE = "1"
    commandArgs = [cliModule, ...cliArgs]
  } else {
    const binaryName = path.basename(vscodeExecutablePath).includes("insider") ? "code-insiders" : "code"
    executable = process.platform === "darwin"
      ? path.resolve(vscodeExecutablePath, "../../../Contents/Resources/app/bin", binaryName)
      : path.resolve(vscodeExecutablePath, "../bin", binaryName)
  }
  const result = spawnSync(executable, commandArgs, {
    cwd: root,
    encoding: "utf8",
    env,
    shell: false,
    timeout: 60000,
    windowsHide: true,
  })
  if (result.error) throw result.error
  assert.equal(result.status, 0, result.stderr || result.stdout || `VS Code CLI exited with ${result.status}`)
  return result.stdout
}

function installedExtensionPath() {
  const vsixPath = path.join(root, "artifacts", `${manifest.name}-${manifest.version}.vsix`)
  assert.ok(fs.existsSync(vsixPath), `VSIX is missing; run npm run package first: ${vsixPath}`)
  const installExtensionsPath = path.join(temporaryRoot, "installed-extensions")
  const cliUserDataPath = path.join(temporaryRoot, "cli-user-data")
  const commonArgs = [`--extensions-dir=${installExtensionsPath}`, `--user-data-dir=${cliUserDataPath}`]

  runCodeCli(["--install-extension", vsixPath, "--force", ...commonArgs])
  const listing = runCodeCli(["--list-extensions", "--show-versions", ...commonArgs])
  const expected = `${manifest.publisher}.${manifest.name}@${manifest.version}`.toLowerCase()
  assert.ok(listing.split(/\r?\n/).some((line) => line.trim().toLowerCase() === expected), `Installed extension is not listed as ${expected}`)

  const installed = fs.readdirSync(installExtensionsPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(installExtensionsPath, entry.name))
    .find((directory) => {
      try {
        const packaged = JSON.parse(fs.readFileSync(path.join(directory, "package.json"), "utf8"))
        return packaged.name === manifest.name && packaged.publisher === manifest.publisher && packaged.version === manifest.version
      } catch {
        return false
      }
    })
  assert.ok(installed, "VS Code installed the VSIX but its extension directory was not found")

  const runtimeFiles = [
    "dist/extension.js",
    "dist/runtime-security.cjs",
    "media/dashboard.js",
    "media/dashboard.css",
    "media/i18n.js",
    "media/icon.png",
    "media/opencode-icon.svg",
  ]
  for (const relative of runtimeFiles) {
    const source = path.join(root, relative)
    const packaged = path.join(installed, relative)
    assert.ok(fs.existsSync(packaged), `Installed VSIX is missing ${relative}`)
    assert.equal(digest(packaged), digest(source), `Installed VSIX ${relative} differs from the verified source`)
  }
  console.log(`integration: installed and hash-verified ${expected}`)
  return installed
}

async function main() {
  if (testVsix && !vscodeExecutablePath) vscodeExecutablePath = await downloadAndUnzipVSCode()
  const extensionDevelopmentPath = testVsix ? installedExtensionPath() : root
  await runTests({
    ...(vscodeExecutablePath ? { vscodeExecutablePath } : {}),
    extensionDevelopmentPath,
    extensionTestsPath: path.join(root, "test", "integration", "index.cjs"),
    launchArgs: [
      workspacePath,
      "--disable-extensions",
      `--user-data-dir=${path.join(temporaryRoot, "runtime-user-data")}`,
      `--extensions-dir=${runtimeExtensionsPath}`,
    ],
  })
  fs.rmSync(temporaryRoot, { recursive: true, force: true })
  console.log(`integration: ${testVsix ? "installed VSIX" : "development"} Webview tests passed`)
}

main().catch((error) => {
  console.error(error)
  console.error(`Integration artifacts retained at ${temporaryRoot}`)
  process.exitCode = 1
})
