"use strict"

const assert = require("node:assert/strict")
const fs = require("node:fs")
const path = require("node:path")
const test = require("node:test")
const vm = require("node:vm")

const root = path.resolve(__dirname, "../..")
const manifest = require(path.join(root, "package.json"))
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8")

test("security-sensitive settings have safe scopes", () => {
  const properties = manifest.contributes.configuration.properties
  assert.equal(properties["opencodeGo.apiBaseUrl"], undefined)
  assert.equal(properties["opencodeGo.gatewayUrl"].scope, "machine")
  assert.equal(properties["opencodeGo.autoRefreshInterval"].scope, "application")
  assert.equal(properties["opencodeGo.autoRefreshInterval"].minimum, 0)
  assert.equal(properties["opencodeGo.notifyThresholds"].scope, "application")
  assert.equal(manifest.capabilities.untrustedWorkspaces.supported, false)
})

test("package contains no installed metadata or unused runtime dependencies", () => {
  assert.equal(manifest.__metadata, undefined)
  assert.deepEqual(manifest.dependencies, undefined)
  assert.deepEqual(manifest.extensionKind, ["workspace"])
  assert.deepEqual(manifest.activationEvents, ["onStartupFinished"])
  assert.match(manifest.scripts["vscode:prepublish"], /release:check/)
  assert.equal(manifest.scripts["verify:package"], "npm run package && npm run test:vsix")
})

test("all package locale files use the same key set and placeholders", () => {
  const names = fs.readdirSync(root).filter((name) => /^package\.nls(?:\.[\w-]+)?\.json$/.test(name)).sort()
  const locales = names.map((name) => [name, JSON.parse(read(name))])
  const expectedKeys = Object.keys(locales[0][1]).sort()
  const placeholders = (value) => [...String(value).matchAll(/\{([^}]+)\}/g)].map((match) => match[1]).sort()

  for (const [name, locale] of locales) {
    assert.equal(locale.displayName, "OpenCode GO Manager", `${name} display name differs`)
    assert.deepEqual(Object.keys(locale).sort(), expectedKeys, `${name} key set differs`)
    for (const key of expectedKeys) {
      assert.deepEqual(placeholders(locale[key]), placeholders(locales[0][1][key]), `${name}:${key} placeholders differ`)
    }
    assert.equal(locale["config.apiBaseUrl"], undefined)
  }
})

test("production mode does not expose provider or secret-bearing stores globally", () => {
  const extension = read("src/extension.js")
  const guarded = extension.match(/if \(context\.extensionMode !== vscode4\.ExtensionMode\.Production\) \{([\s\S]*?)\n  \}/)
  assert.ok(guarded, "missing production guard")
  for (const name of ["Provider", "StatusBar", "Notifier"]) {
    assert.match(guarded[1], new RegExp(`globalThis\\.__opencodeGo${name}`))
  }
  const outsideGuard = extension.replace(guarded[0], "")
  assert.doesNotMatch(outsideGuard, /globalThis\.__opencodeGo(?:Provider|StatusBar|Notifier)\s*=/)
})

test("the bundled and external Webview dictionaries are identical", () => {
  const extension = read("src/extension.js")
  const boundary = extension.indexOf("// src/extension.ts")
  assert.ok(boundary > 0, "embedded i18n boundary is missing")
  const sandbox = { module: { exports: {} }, exports: {} }
  vm.runInNewContext(`${extension.slice(0, boundary)}\nmodule.exports = require_i18n();`, sandbox)
  const bundled = JSON.parse(JSON.stringify(sandbox.module.exports.dicts))
  const external = require(path.join(root, "media", "i18n.js")).dicts
  assert.deepEqual(bundled, external)
})

test("built security helper is self-contained and source outputs are reproducible", () => {
  assert.equal(read("dist/extension.js"), read("src/extension.js"))
  assert.equal(read("dist/runtime-security.cjs"), read("src/runtime-security.cjs"))
  assert.doesNotMatch(read("dist/runtime-security.cjs"), /require\(["']\.\.\/src/)
  const helper = require(path.join(root, "dist", "runtime-security.cjs"))
  assert.equal(helper.OFFICIAL_API_BASE_URL, "https://opencode.ai")
})

test("the extension no longer contains configurable API endpoints", () => {
  const extension = read("src/extension.js")
  assert.doesNotMatch(extension, /cfg\.get\(["']apiBaseUrl/)
  assert.match(extension, /this\.baseUrl = OFFICIAL_API_BASE_URL/)
  assert.doesNotMatch(read("media/i18n.js"), /apiBaseUrl/)
})
