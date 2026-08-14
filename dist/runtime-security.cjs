"use strict"

const fs = require("node:fs")
const path = require("node:path")
const crypto = require("node:crypto")

const OFFICIAL_API_BASE_URL = "https://opencode.ai"
const ALLOWED_CONTEXTS = new Set([0, 128 * 1024, 256 * 1024, 512 * 1024, 1024 * 1024])
const UNSAFE_OBJECT_KEYS = new Set(["__proto__", "prototype", "constructor"])

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function assertSafeKey(value, label) {
  if (typeof value !== "string" || value.length === 0 || value.length > 512 || UNSAFE_OBJECT_KEYS.has(value)) {
    throw new Error(`Invalid ${label}`)
  }
}

function ownRecord(parent, key, label) {
  if (!Object.hasOwn(parent, key)) {
    Object.defineProperty(parent, key, {
      value: {},
      enumerable: true,
      configurable: true,
      writable: true,
    })
  }
  if (!isRecord(parent[key])) throw new Error(`${label} must be an object`)
  return parent[key]
}

function updateModelContextFile(file, providerId, modelId, context, options = {}) {
  assertSafeKey(providerId, "provider ID")
  assertSafeKey(modelId, "model ID")
  if (!ALLOWED_CONTEXTS.has(context)) throw new Error("Unsupported context size")

  if (options.allowedModels) {
    const allowed = options.allowedModels instanceof Set ? options.allowedModels : new Set(options.allowedModels)
    if (!allowed.has(modelId)) throw new Error("Model is not in the current OpenCode model list")
  }

  const original = fs.readFileSync(file, "utf8")
  let config
  try {
    config = JSON.parse(original.replace(/^\uFEFF/, ""))
  } catch (error) {
    throw new Error(`Cannot parse opencode.json: ${error.message}`)
  }
  if (!isRecord(config)) throw new Error("opencode.json root must be an object")

  const providers = ownRecord(config, "provider", "provider")
  const provider = ownRecord(providers, providerId, `provider.${providerId}`)
  const models = ownRecord(provider, "models", `provider.${providerId}.models`)
  const model = ownRecord(models, modelId, `provider.${providerId}.models.${modelId}`)

  if (context > 0) {
    const limit = ownRecord(model, "limit", `provider.${providerId}.models.${modelId}.limit`)
    limit.context = context
  } else if (Object.hasOwn(model, "limit")) {
    if (!isRecord(model.limit)) throw new Error(`provider.${providerId}.models.${modelId}.limit must be an object`)
    delete model.limit.context
    if (Object.keys(model.limit).length === 0) delete model.limit
  }

  if (Object.keys(model).length === 0) delete models[modelId]
  if (Object.keys(models).length === 0) delete provider.models

  const serialized = `${JSON.stringify(config, null, 2)}\n`
  const stat = fs.statSync(file)
  const directory = path.dirname(file)
  const tempFile = path.join(directory, `.${path.basename(file)}.${process.pid}.${crypto.randomBytes(6).toString("hex")}.tmp`)
  const backupFile = `${file}.bak`

  try {
    fs.writeFileSync(tempFile, serialized, { encoding: "utf8", flag: "wx", mode: stat.mode })
    const handle = fs.openSync(tempFile, "r+")
    try {
      fs.fsyncSync(handle)
    } finally {
      fs.closeSync(handle)
    }
    fs.copyFileSync(file, backupFile)
    fs.renameSync(tempFile, file)
  } catch (error) {
    try {
      fs.rmSync(tempFile, { force: true })
    } catch {
      // Preserve the original error; the temporary path contains no secret.
    }
    throw error
  }

  return { file, backupFile }
}

function validateLoopbackGatewayUrl(value) {
  const raw = typeof value === "string" ? value.trim() : ""
  if (!raw) return ""

  let url
  try {
    url = new URL(raw)
  } catch {
    throw new Error("Gateway URL is invalid")
  }
  if (!new Set(["http:", "https:"]).has(url.protocol)) throw new Error("Gateway URL must use HTTP or HTTPS")
  if (url.username || url.password) throw new Error("Gateway URL must not contain credentials")
  if (url.pathname !== "/" || url.search || url.hash) throw new Error("Gateway URL must contain only an origin")

  const host = url.hostname.toLowerCase()
  const loopback = host === "localhost" || host === "[::1]" || host === "::1" || /^127(?:\.\d{1,3}){3}$/.test(host)
  if (!loopback) throw new Error("Gateway URL must point to this machine")
  return url.origin
}

module.exports = {
  ALLOWED_CONTEXTS,
  OFFICIAL_API_BASE_URL,
  updateModelContextFile,
  validateLoopbackGatewayUrl,
}
