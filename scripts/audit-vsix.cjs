"use strict"

const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")
const { spawnSync } = require("node:child_process")

const root = path.resolve(__dirname, "..")
const sourceManifest = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"))
const defaultVsix = path.join(root, "artifacts", `${sourceManifest.name}-${sourceManifest.version}.vsix`)
const args = process.argv.slice(2)

if (args.length > 1 || args.includes("--help") || args.includes("-h")) {
  console.log("Usage: node scripts/audit-vsix.cjs [path-to-extension.vsix]")
  console.log(`Default: ${path.relative(root, defaultVsix)}`)
  process.exit(args.length > 1 ? 1 : 0)
}

const vsixPath = path.resolve(root, args[0] || defaultVsix)
let yauzl

const MAX_ENTRY_BYTES = 8 * 1024 * 1024
const MAX_TOTAL_BYTES = 24 * 1024 * 1024
const MAX_ENTRIES = 100

const requiredFiles = new Set([
  "[Content_Types].xml",
  "extension.vsixmanifest",
  "extension/package.json",
  "extension/README.md",
  "extension/CHANGELOG.md",
  "extension/LICENSE.txt",
  "extension/SECURITY.md",
  "extension/RELEASING.md",
  "extension/dist/extension.js",
  "extension/dist/runtime-security.cjs",
  "extension/media/dashboard.css",
  "extension/media/dashboard.js",
  "extension/media/i18n.js",
  "extension/media/icon.png",
  "extension/media/opencode-icon.svg",
])

for (const name of fs.readdirSync(root).filter((name) => /^package\.nls(?:\.[\w-]+)?\.json$/.test(name))) {
  requiredFiles.add(`extension/${name}`)
}

const allowedFiles = new Set([...requiredFiles].map((name) => name.toLowerCase()))
const forbiddenPathRules = [
  [/(^|\/)\.git(?:\/|$)/i, "Git metadata"],
  [/(^|\/)\.github(?:\/|$)/i, "GitHub workflow source"],
  [/(^|\/)\.vscode(?:\/|$)/i, "editor configuration"],
  [/(^|\/)node_modules(?:\/|$)/i, "node_modules"],
  [/^extension\/(?:src|scripts|test|artifacts)(?:\/|$)/i, "development source"],
  [/^extension\/media\/vendor(?:\/|$)/i, "unused vendored runtime"],
  [/(^|\/)(?:debug\.log|\.vsixmanifest)$/i, "installed/debug artifact"],
  [/(^|\/)(?:auth\.json|credentials(?:\.json)?|\.env(?:\..*)?|\.npmrc|\.vsce)$/i, "credential file"],
  [/\.(?:log|vsix|map|pem|key|pfx|p12|bak|tmp)$/i, "forbidden file type"],
]

const secretPatterns = [
  ["private key", /-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/],
  ["OpenAI/OpenCode-style API key", /\bsk-(?:(?:proj|g)-)?[A-Za-z0-9_-]{16,}\b/],
  ["GitHub token", /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})\b/],
  ["AWS access key", /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  ["Slack token", /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/],
  ["npm access token", /\bnpm_[A-Za-z0-9]{20,}\b/],
  ["literal bearer token", /\bBearer\s+[A-Za-z0-9._~+/-]{20,}/i],
  ["JWT", /\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/],
  ["cloud account key", /\bAccountKey=[A-Za-z0-9+/=]{20,}/i],
  ["embedded release token", /\b(?:VSCE_PAT|OVSX_PAT|AZURE_DEVOPS_EXT_PAT)\s*[:=]\s*["'][^$"'{}\s]{20,}["']/i],
]

const textExtensions = new Set([".cjs", ".css", ".html", ".js", ".json", ".md", ".txt", ".xml", ".svg", ".vsixmanifest"])
const issues = []

function issue(message) {
  issues.push(message)
}

function validateArchivePath(name) {
  if (!name || name.includes("\0") || name.includes("\\") || name.startsWith("/") || /^[A-Za-z]:/.test(name)) {
    throw new Error(`Unsafe ZIP entry path: ${JSON.stringify(name)}`)
  }
  const parts = name.split("/")
  const meaningful = name.endsWith("/") ? parts.slice(0, -1) : parts
  if (meaningful.some((part) => !part || part === "." || part === "..")) {
    throw new Error(`Unsafe ZIP entry path: ${JSON.stringify(name)}`)
  }
}

function readArchive(file) {
  return new Promise((resolve, reject) => {
    yauzl.open(file, { lazyEntries: true, autoClose: true, validateEntrySizes: true, strictFileNames: true }, (openError, zip) => {
      if (openError) return reject(openError)

      const entries = new Map()
      const namesByCase = new Map()
      let totalBytes = 0
      let entryCount = 0
      let settled = false

      const abort = (error) => {
        if (settled) return
        settled = true
        try {
          zip.close()
        } catch {
          // Keep the original archive error.
        }
        reject(error)
      }

      zip.on("error", abort)
      zip.on("end", () => {
        if (settled) return
        settled = true
        resolve(entries)
      })
      zip.on("entry", (entry) => {
        try {
          validateArchivePath(entry.fileName)
          entryCount += 1
          if (entryCount > MAX_ENTRIES) throw new Error(`VSIX contains more than ${MAX_ENTRIES} entries`)

          const caseKey = entry.fileName.toLowerCase()
          const prior = namesByCase.get(caseKey)
          if (prior) throw new Error(`Duplicate or case-colliding ZIP entries: ${prior} and ${entry.fileName}`)
          namesByCase.set(caseKey, entry.fileName)

          if (entry.fileName.endsWith("/")) {
            zip.readEntry()
            return
          }
          const unixMode = entry.externalFileAttributes >>> 16
          if ((unixMode & 0o170000) === 0o120000) {
            throw new Error(`Symbolic links are not allowed in VSIX files: ${entry.fileName}`)
          }
          if (typeof entry.isEncrypted === "function" && entry.isEncrypted()) {
            throw new Error(`Encrypted ZIP entries are not allowed: ${entry.fileName}`)
          }
          if (entry.uncompressedSize > MAX_ENTRY_BYTES) {
            throw new Error(`ZIP entry is too large: ${entry.fileName} (${entry.uncompressedSize} bytes)`)
          }
          totalBytes += entry.uncompressedSize
          if (totalBytes > MAX_TOTAL_BYTES) throw new Error(`VSIX expands beyond ${MAX_TOTAL_BYTES} bytes`)
        } catch (error) {
          abort(error)
          return
        }

        zip.openReadStream(entry, (streamError, stream) => {
          if (streamError) return abort(streamError)
          const chunks = []
          let bytes = 0
          stream.on("error", abort)
          stream.on("data", (chunk) => {
            bytes += chunk.length
            if (bytes > MAX_ENTRY_BYTES) {
              stream.destroy(new Error(`ZIP entry exceeded the size limit while reading: ${entry.fileName}`))
              return
            }
            chunks.push(chunk)
          })
          stream.on("end", () => {
            if (settled) return
            if (bytes !== entry.uncompressedSize) {
              abort(new Error(`ZIP entry size mismatch: ${entry.fileName}`))
              return
            }
            entries.set(entry.fileName, Buffer.concat(chunks))
            zip.readEntry()
          })
        })
      })

      zip.readEntry()
    })
  })
}

function indexEntries(entries) {
  return new Map([...entries].map(([name, data]) => [name.toLowerCase(), { name, data }]))
}

function parseJson(entry, label) {
  try {
    return JSON.parse(entry.data.toString("utf8").replace(/^\uFEFF/, ""))
  } catch (error) {
    issue(`${label} is not valid JSON: ${error.message}`)
    return null
  }
}

function decodeXmlEntities(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
}

function readVsixIdentity(entry) {
  const xml = entry.data.toString("utf8").replace(/^\uFEFF/, "")
  const match = xml.match(/<Identity\b([^>]*)\/?\s*>/i)
  if (!match) {
    issue("extension.vsixmanifest has no Identity element")
    return null
  }
  const attributes = {}
  for (const attribute of match[1].matchAll(/([\w:.-]+)\s*=\s*(["'])(.*?)\2/g)) {
    attributes[attribute[1]] = decodeXmlEntities(attribute[3])
  }
  return attributes
}

function scanSecrets(entries) {
  for (const [name, data] of entries) {
    if (!textExtensions.has(path.extname(name).toLowerCase())) continue
    let text
    try {
      text = new TextDecoder("utf-8", { fatal: true }).decode(data)
    } catch {
      issue(`Text file is not valid UTF-8: ${name}`)
      continue
    }
    for (const [label, pattern] of secretPatterns) {
      if (pattern.test(text)) issue(`Possible ${label} found in ${name}`)
    }
  }
}

function auditHelper(helperEntry) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "opencode-go-vsix-audit-"))
  const helperPath = path.join(directory, "runtime-security.cjs")
  try {
    fs.writeFileSync(helperPath, helperEntry.data)
    const probe = [
      "const helper = require(process.argv[1])",
      "if (helper.OFFICIAL_API_BASE_URL !== 'https://opencode.ai') throw new Error('unexpected API base URL')",
      "for (const name of ['updateModelContextFile', 'validateLoopbackGatewayUrl']) {",
      "  if (typeof helper[name] !== 'function') throw new Error(`missing export: ${name}`)",
      "}",
    ].join("\n")
    const cleanEnvironment = {}
    for (const name of ["PATH", "Path", "PATHEXT", "SystemRoot", "SYSTEMROOT", "WINDIR", "TMP", "TEMP"]) {
      if (process.env[name]) cleanEnvironment[name] = process.env[name]
    }
    const result = spawnSync(process.execPath, ["-e", probe, helperPath], {
      cwd: directory,
      encoding: "utf8",
      env: cleanEnvironment,
      shell: false,
      timeout: 5000,
      windowsHide: true,
    })
    if (result.error) {
      issue(`dist/runtime-security.cjs could not be loaded independently: ${result.error.message}`)
    } else if (result.status !== 0) {
      const detail = (result.stderr || result.stdout || `exit ${result.status}`).trim().split(/\r?\n/)[0]
      issue(`dist/runtime-security.cjs could not be loaded independently: ${detail}`)
    }
  } finally {
    fs.rmSync(directory, { recursive: true, force: true })
  }
}

async function main() {
  if (!fs.existsSync(vsixPath)) throw new Error(`VSIX does not exist: ${vsixPath}`)
  if (!fs.statSync(vsixPath).isFile()) throw new Error(`VSIX path is not a file: ${vsixPath}`)
  try {
    yauzl = require("yauzl")
  } catch (error) {
    throw new Error(`Cannot load yauzl. Run npm ci before auditing a VSIX. (${error.message})`)
  }

  const entries = await readArchive(vsixPath)
  const indexed = indexEntries(entries)

  for (const name of entries.keys()) {
    for (const [pattern, label] of forbiddenPathRules) {
      if (pattern.test(name)) issue(`Forbidden ${label} included in VSIX: ${name}`)
    }
    if (!allowedFiles.has(name.toLowerCase())) issue(`File is not in the release whitelist: ${name}`)
  }
  for (const required of requiredFiles) {
    if (!indexed.has(required.toLowerCase())) issue(`Required VSIX file is missing: ${required}`)
  }

  scanSecrets(entries)

  const packageEntry = indexed.get("extension/package.json")
  const packagedManifest = packageEntry ? parseJson(packageEntry, "extension/package.json") : null
  if (packagedManifest) {
    for (const field of ["name", "version", "publisher"]) {
      if (packagedManifest[field] !== sourceManifest[field]) {
        issue(`Packaged ${field} (${JSON.stringify(packagedManifest[field])}) does not match package.json (${JSON.stringify(sourceManifest[field])})`)
      }
    }
    if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(String(packagedManifest.version || ""))) {
      issue(`Packaged version is not a release semver: ${JSON.stringify(packagedManifest.version)}`)
    }
    if (!/^[A-Za-z0-9][A-Za-z0-9-]*$/.test(String(packagedManifest.publisher || ""))) {
      issue(`Packaged publisher ID is invalid: ${JSON.stringify(packagedManifest.publisher)}`)
    }
    if (packagedManifest.main !== "./dist/extension.js") issue(`Unexpected extension entry point: ${packagedManifest.main}`)
    if (packagedManifest.icon !== "media/icon.png") issue(`Unexpected Marketplace icon path: ${packagedManifest.icon}`)
  }

  const vsixManifestEntry = indexed.get("extension.vsixmanifest")
  const identity = vsixManifestEntry ? readVsixIdentity(vsixManifestEntry) : null
  if (identity && packagedManifest) {
    for (const [attribute, field] of [["Id", "name"], ["Version", "version"], ["Publisher", "publisher"]]) {
      if (identity[attribute] !== packagedManifest[field]) {
        issue(`VSIX Identity ${attribute} (${JSON.stringify(identity[attribute])}) does not match extension/package.json ${field} (${JSON.stringify(packagedManifest[field])})`)
      }
    }
  }

  const helperEntry = indexed.get("extension/dist/runtime-security.cjs")
  if (helperEntry) auditHelper(helperEntry)

  if (issues.length > 0) {
    const uniqueIssues = [...new Set(issues)]
    console.error(`VSIX audit failed with ${uniqueIssues.length} issue${uniqueIssues.length === 1 ? "" : "s"}:`)
    for (const message of uniqueIssues) console.error(`- ${message}`)
    process.exitCode = 1
    return
  }

  const totalBytes = [...entries.values()].reduce((sum, data) => sum + data.length, 0)
  console.log(`VSIX audit passed: ${path.basename(vsixPath)}`)
  console.log(`- identity: ${packagedManifest.publisher}.${packagedManifest.name}@${packagedManifest.version}`)
  console.log(`- package: ${entries.size} files, ${totalBytes} uncompressed bytes`)
  console.log("- whitelist, forbidden paths, secret patterns, manifests, and standalone security helper passed")
}

main().catch((error) => {
  console.error(`VSIX audit failed: ${error.stack || error.message}`)
  process.exitCode = 1
})
