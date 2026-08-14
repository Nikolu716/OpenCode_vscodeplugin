"use strict"

const assert = require("node:assert/strict")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")
const test = require("node:test")

const {
  ALLOWED_CONTEXTS,
  OFFICIAL_API_BASE_URL,
  updateModelContextFile,
  validateLoopbackGatewayUrl,
} = require("../../src/runtime-security.cjs")

function fixture(content) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "opencode-go-security-"))
  const file = path.join(directory, "opencode.json")
  fs.writeFileSync(file, content, "utf8")
  return {
    directory,
    file,
    cleanup: () => fs.rmSync(directory, { recursive: true, force: true }),
  }
}

test("API keys have one fixed official destination", () => {
  assert.equal(OFFICIAL_API_BASE_URL, "https://opencode.ai")
})

test("context sizes are explicitly allowlisted", () => {
  assert.deepEqual([...ALLOWED_CONTEXTS], [0, 131072, 262144, 524288, 1048576])
})

test("updates one known model, preserves unknown fields, and creates a backup", (t) => {
  const original = `${JSON.stringify({
    keep: { nested: true },
    provider: {
      "opencode-go": {
        custom: "keep-provider-field",
        models: {
          "minimax-m3": { other: true, limit: { output: 8192, context: 131072 } },
        },
      },
    },
  }, null, 2)}\n`
  const files = fixture(original)
  t.after(files.cleanup)

  const result = updateModelContextFile(files.file, "opencode-go", "minimax-m3", 524288, {
    allowedModels: new Set(["minimax-m3"]),
  })

  const updated = JSON.parse(fs.readFileSync(files.file, "utf8"))
  assert.deepEqual(updated.keep, { nested: true })
  assert.equal(updated.provider["opencode-go"].custom, "keep-provider-field")
  assert.deepEqual(updated.provider["opencode-go"].models["minimax-m3"], {
    other: true,
    limit: { output: 8192, context: 524288 },
  })
  assert.equal(fs.readFileSync(result.backupFile, "utf8"), original)
  assert.deepEqual(fs.readdirSync(files.directory).sort(), ["opencode.json", "opencode.json.bak"])
})

test("accepts a UTF-8 BOM without discarding the original backup bytes", (t) => {
  const original = `\uFEFF${JSON.stringify({ provider: {} })}`
  const files = fixture(original)
  t.after(files.cleanup)

  const result = updateModelContextFile(files.file, "opencode-go", "kimi-k3", 131072, {
    allowedModels: ["kimi-k3"],
  })

  assert.equal(JSON.parse(fs.readFileSync(files.file, "utf8")).provider["opencode-go"].models["kimi-k3"].limit.context, 131072)
  assert.equal(fs.readFileSync(result.backupFile, "utf8"), original)
})

for (const [name, content, model, context, pattern] of [
  ["malformed JSON", "{ broken", "minimax-m3", 131072, /Cannot parse/],
  ["non-object JSON", "[]", "minimax-m3", 131072, /root must be an object/],
  ["prototype key", "{}", "__proto__", 131072, /Invalid model ID/],
  ["unknown model", "{}", "not-from-api", 131072, /not in the current/],
  ["unsupported context", "{}", "minimax-m3", 123456, /Unsupported context/],
]) {
  test(`${name} is rejected without changing the file`, (t) => {
    const files = fixture(content)
    t.after(files.cleanup)
    const before = fs.readFileSync(files.file)

    assert.throws(
      () => updateModelContextFile(files.file, "opencode-go", model, context, { allowedModels: ["minimax-m3"] }),
      pattern,
    )
    assert.deepEqual(fs.readFileSync(files.file), before)
    assert.deepEqual(fs.readdirSync(files.directory), ["opencode.json"])
    assert.equal(Object.prototype.limit, undefined)
  })
}

test("gateway URLs are restricted to local HTTP origins", () => {
  for (const value of ["", "http://localhost:8000", "https://127.0.0.1", "http://[::1]:8787", "http://127.1:9000/"]) {
    assert.doesNotThrow(() => validateLoopbackGatewayUrl(value))
  }
  assert.equal(validateLoopbackGatewayUrl("http://127.1:9000/"), "http://127.0.0.1:9000")

  for (const value of [
    "https://example.com",
    "http://192.168.1.2:8000",
    "file:///tmp/gateway",
    "http://user:pass@localhost:8000",
    "http://localhost:8000/admin/status",
    "http://localhost:8000/?target=external",
  ]) {
    assert.throws(() => validateLoopbackGatewayUrl(value))
  }
})
