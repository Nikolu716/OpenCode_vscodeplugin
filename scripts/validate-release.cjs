"use strict"

const fs = require("node:fs")
const path = require("node:path")

const root = path.resolve(__dirname, "..")
const manifest = require(path.join(root, "package.json"))
const issues = []
const check = (condition, message) => {
  if (!condition) issues.push(message)
}
const localPackage = process.env.OPENCODE_GO_LOCAL_PACKAGE === "1"
const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
const metadataUrl = (value) => typeof value === "string" ? value : value?.url
const validUrl = (value, protocols = ["https:"]) => {
  try {
    return protocols.includes(new URL(value).protocol)
  } catch {
    return false
  }
}

if (!localPackage) {
  check(manifest.publisher !== "zcode-local", "Set the permanent Marketplace publisher ID in package.json")
  check(/^[A-Za-z0-9][A-Za-z0-9-]*$/.test(String(manifest.publisher || "")), "Publisher ID has an invalid format")
  for (const field of ["repository", "bugs", "homepage"]) {
    const raw = manifest[field]
    const url = metadataUrl(raw)
    check(Boolean(raw), `Add package.json ${field} metadata`)
    check(!/CHANGE-ME|example\.com|your[-_ ]/i.test(JSON.stringify(raw || "")), `${field} still contains a placeholder`)
    check(!raw || validUrl(url, field === "repository" ? ["https:", "git+https:"] : ["https:"]), `${field} must use a valid HTTPS URL`)
  }
}
check(fs.existsSync(path.join(root, "package-lock.json")), "Commit package-lock.json")
check(Boolean(manifest.icon) && fs.existsSync(path.join(root, manifest.icon || "")), "Marketplace icon is missing")

const security = fs.readFileSync(path.join(root, "SECURITY.md"), "utf8")
if (!localPackage) check(!/Before public release, replace this paragraph/i.test(security), "Replace the SECURITY.md reporting placeholder")
const changelog = fs.readFileSync(path.join(root, "CHANGELOG.md"), "utf8")
check(new RegExp(`^##\\s+\\[?${escapeRegExp(manifest.version)}\\]?(?:\\s|$)`, "m").test(changelog), `Add CHANGELOG.md section ${manifest.version}`)

const tag = process.env.GITHUB_REF_NAME
if (tag) check(tag === `v${manifest.version}`, `Git tag ${tag} must equal v${manifest.version}`)

if (issues.length > 0) {
  console.error(`Release check failed with ${issues.length} item${issues.length === 1 ? "" : "s"}:`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}
console.log(`${localPackage ? "local package" : "release"}: metadata is ready for ${manifest.publisher}.${manifest.name}@${manifest.version}`)
