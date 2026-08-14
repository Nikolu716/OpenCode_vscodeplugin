const assert = require("assert")
const vscode = require("vscode")
const manifest = require("../../package.json")

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function waitFor(getter, predicate, label, timeout = 15000) {
  const deadline = Date.now() + timeout
  while (Date.now() < deadline) {
    const value = getter()
    if (predicate(value)) return value
    await sleep(100)
  }
  throw new Error(`Timed out waiting for ${label}`)
}

async function layout(provider, view, payload) {
  const requestId = `${Date.now()}-${Math.random()}`
  provider.layoutDebugResult = undefined
  await view.webview.postMessage({ type: "__layoutDebug", requestId, ...payload })
  return waitFor(
    () => provider.getLayoutDebugResultForTest(),
    (result) => result?.requestId === requestId,
    `layout result ${requestId}`,
  )
}

function assertFillRatios(bars, expected, label) {
  assert.strictEqual(bars.length, expected.length, `${label}: unexpected bar count`)
  bars.forEach((bar, index) => {
    assert.ok(bar.trackWidth > 0, `${label} ${index}: track must be visible`)
    const actual = bar.fillWidth / bar.trackWidth
    assert.ok(
      Math.abs(actual - expected[index] / 100) < 0.015,
      `${label} ${index}: expected ${expected[index]}% fill, got ${(actual * 100).toFixed(2)}%`,
    )
  })
}

const syntheticState = {
  loading: false,
  skipOnboarding: true,
  activeAccount: { id: "test", name: "Go plan", keyMasked: "sk-g••••TEST", source: "manual" },
  accounts: [
    { id: "test", name: "Go plan", keyMasked: "sk-g••••TEST", source: "manual" },
    { id: "backup", name: `Backup ${"long-account-name-".repeat(4)}`, keyMasked: "sk-g••••BACK", source: "manual" },
  ],
  usage: {
    rolling: { status: "ok", percent: 36, resetsAt: new Date(Date.now() + 7200000).toISOString() },
    weekly: { status: "ok", percent: 54, resetsAt: new Date(Date.now() + 172800000).toISOString() },
    monthly: { status: "ok", percent: 71, resetsAt: new Date(Date.now() + 604800000).toISOString() },
  },
  usageAccountId: "test",
  usages: {
    test: {
      kind: "ok",
      usage: {
        rolling: { status: "ok", percent: 36, resetsAt: new Date(Date.now() + 7200000).toISOString() },
        weekly: { status: "ok", percent: 54, resetsAt: new Date(Date.now() + 172800000).toISOString() },
        monthly: { status: "ok", percent: 71, resetsAt: new Date(Date.now() + 604800000).toISOString() },
      },
    },
    backup: { kind: "network", error: "Network unavailable" },
  },
  notifySettings: { enabled: true, warn: 50, crit: 70 },
  history: [],
  gateway: null,
  models: [
    "minimax-m3",
    "minimax-m2.7",
    "minimax-m2.5",
    "kimi-k3",
    "kimi-k2.7-code",
    "kimi-k2.6",
    `opencode-go/${"very-long-model-identifier-".repeat(5)}end`,
  ],
  modelContexts: { "minimax-m3": 1048576, "minimax-m2.7": 1048576 },
  configFile: "opencode.json",
  error: null,
  lastUpdated: Date.now(),
}

async function run() {
  const extension = vscode.extensions.getExtension(`${manifest.publisher}.${manifest.name}`)
  assert.ok(extension, "development extension was not loaded")
  await extension.activate()
  await vscode.commands.executeCommand("opencodeGo.dashboard.focus")

  const provider = await waitFor(
    () => globalThis.__opencodeGoProvider,
    Boolean,
    "provider",
  )
  const view = await waitFor(
    () => provider.getViewForTest(),
    Boolean,
    "webview",
  )
  await waitFor(
    () => provider.isWebviewReadyForTest(),
    Boolean,
    "Webview ready handshake",
    30000,
  )
  const validUsage = provider.normalizeUsageForTest(syntheticState.usage)
  assert.deepStrictEqual(Object.keys(validUsage), ["rolling", "weekly", "monthly"])
  assert.throws(
    () => provider.normalizeUsageForTest({ rolling: syntheticState.usage.rolling, weekly: syntheticState.usage.weekly }),
    /monthly percentage is missing/,
    "a malformed account response must be rejected before it reaches shared UI state",
  )
  assert.throws(
    () => provider.normalizeUsageForTest({ ...syntheticState.usage, weekly: { percent: Number.NaN } }),
    /weekly percentage is missing/,
    "non-finite percentages must never reach the status bar or notifier",
  )
  await view.webview.postMessage({ type: "state", state: syntheticState })
  await sleep(300)

  let result = await layout(provider, view, { width: 300 })
  assert.strictEqual(result.models.open, false, "models should be collapsed by default")
  assert.strictEqual(result.contexts.open, false, "contexts should be collapsed by default")

  for (const width of [220, 300]) {
    result = await layout(provider, view, { width, openModels: true, openContexts: true })
    assert.strictEqual(result.models.open, true, `models should open at ${width}px`)
    assert.strictEqual(result.contexts.open, true, `contexts should open at ${width}px`)
    assert.strictEqual(result.models.count, syntheticState.models.length, "all models should render")
    assert.strictEqual(result.models.buttons, syntheticState.models.length, "every available model should be actionable")
    assert.strictEqual(result.contexts.rows, syntheticState.models.length, "all context rows should render")
    assert.deepStrictEqual(result.models.controls, result.contexts.rowIds, "model controls must target matching context rows")
    assert.deepStrictEqual(result.usageText, ["36%", "54%", "71%"], "usage must use server percentages verbatim")
    assert.deepStrictEqual(result.usageBars.map(({ value, max }) => ({ value, max })), [
      { value: 36, max: 100 },
      { value: 54, max: 100 },
      { value: 71, max: 100 },
    ], "progress controls must encode the real server percentages")
    assert.deepStrictEqual(result.usageBars.map((bar) => bar.ariaValueText), ["36%", "54%", "71%"])
    assert.deepStrictEqual(result.usageBars.map((bar) => bar.className), [
      "bar-progress ok",
      "bar-progress warn",
      "bar-progress crit",
    ], "quota thresholds must produce distinct visual states")
    assert.ok(result.usageBars.every((bar) => bar.width > 0), "progress controls must have a visible width")
    assertFillRatios(result.usageBars, [36, 54, 71], `quota bars at ${width}px`)
    assert.strictEqual(new Set(result.usageBars.map((bar) => bar.color)).size, 3, "progress states must render distinct colors")
    assert.strictEqual(result.usageResetText.length, 3, "every quota window must show its reset time")
    assert.ok(result.usageResetText.every((text) => text && !/NaN|—/.test(text)), "reset times must be visible and valid")
    assert.strictEqual(result.overview.visible, true)
    assert.strictEqual(result.overview.cards, 2)
    assert.deepStrictEqual(result.overview.current, ["true", "false"])
    assert.deepStrictEqual(result.overview.bars.map((bar) => bar.value), [36, 54, 71])
    assertFillRatios(result.overview.bars, [36, 54, 71], `overview bars at ${width}px`)
    assert.strictEqual(result.badge.className, "badge crit", "top status must use the same threshold as the quota bars")
    assert.doesNotMatch(result.dashboardText, /\$[\d.]+\s*\/\s*\$[\d.]+/, "dashboard must not show fabricated dollar estimates")
    assert.doesNotMatch(result.dashboardText, /本机模型用量|Local model usage/i, "dashboard must not show unattributable local usage")
    assert.deepStrictEqual(result.overflow, [], `horizontal overflow at ${width}px: ${JSON.stringify(result.overflow)}`)
  }

  result = await layout(provider, view, { width: 300, openModels: true, focusModel: "minimax-m3" })
  const focusedModel = result.models.items.find((item) => item.modelId === "minimax-m3")
  assert.strictEqual(focusedModel?.focused, true, "keyboard focus should reach a complete model item")
  assert.notStrictEqual(focusedModel?.boxShadow, "none", "model keyboard focus must have a visible inset ring")

  result = await layout(provider, view, {
    width: 300,
    openModels: true,
    closeContexts: true,
    clickModel: "minimax-m2.7",
  })
  assert.strictEqual(result.contexts.open, true, "clicking a model should expand context configuration")
  assert.strictEqual(result.contexts.focusedModel, "minimax-m2.7", "clicking a model should focus its context controls")
  assert.strictEqual(result.contexts.targetedModel, "minimax-m2.7", "clicking a model should highlight its context row")
  assert.strictEqual(result.models.items.filter((item) => item.current === "true").length, 1, "only one model should be current")
  let currentModel = result.models.items.find((item) => item.current === "true")
  assert.strictEqual(currentModel.modelId, "minimax-m2.7")
  assert.strictEqual(currentModel.textDecorationLine, "none", "current models must not look like underlined links")
  assert.notStrictEqual(currentModel.backgroundColor, "rgba(0, 0, 0, 0)", "the complete model item should carry the current state")

  await sleep(1800)
  result = await layout(provider, view, { width: 300 })
  assert.strictEqual(result.contexts.targetedModel, "minimax-m2.7", "the current target must not disappear on a timer")
  assert.strictEqual(result.models.items.find((item) => item.current === "true")?.modelId, "minimax-m2.7")

  await view.webview.postMessage({ type: "state", state: { lastUpdated: Date.now() } })
  await sleep(200)
  result = await layout(provider, view, { width: 300 })
  assert.strictEqual(result.contexts.targetedModel, "minimax-m2.7", "the current target must survive a state render")
  assert.strictEqual(result.contexts.focusedModel, "minimax-m2.7", "the focused context row must survive a state render")
  assert.strictEqual(result.models.items.find((item) => item.current === "true")?.modelId, "minimax-m2.7")

  const longModel = syntheticState.models.at(-1)
  result = await layout(provider, view, { closeContexts: true, clickModel: longModel })
  assert.strictEqual(result.contexts.focusedModel, longModel, "long provider-prefixed model IDs must map without selector escaping")
  assert.strictEqual(result.models.items.find((item) => item.current === "true")?.modelId, longModel, "current state should transfer to the next model")
  assert.ok(result.models.items.every((item) => item.rect.width <= result.models.list.clientWidth + 1), "model items must fit within the list")

  await view.webview.postMessage({ type: "state", state: { configFile: null } })
  await sleep(200)
  result = await layout(provider, view, { width: 300 })
  assert.strictEqual(result.models.buttons, 0, "models should remain plain text when no config file is available")
  assert.strictEqual(result.contexts.rows, 0, "hidden context configuration must not retain stale rows")
  assert.strictEqual(result.contexts.open, false, "context configuration should close when it becomes unavailable")

  await view.webview.postMessage({ type: "state", state: syntheticState })
  await sleep(200)

  result = await layout(provider, view, { width: 220, openLanguage: true })
  assert.ok(result.rect.left >= result.body.rect.left - 1, `language menu escaped left edge: ${JSON.stringify(result.rect)}`)
  assert.ok(result.rect.right <= result.body.rect.right + 1, `language menu escaped right edge: ${JSON.stringify(result.rect)}`)
  assert.deepStrictEqual(result.overflow, [], `language menu caused overflow: ${JSON.stringify(result.overflow)}`)

  await view.webview.postMessage({
    type: "state",
    state: {
      activeAccount: syntheticState.accounts[1],
      usage: syntheticState.usage,
      usageAccountId: "test",
      loading: true,
    },
  })
  await sleep(200)
  result = await layout(provider, view, { width: 300 })
  assert.deepStrictEqual(result.usageText, [], "usage from the previous account must never render under a new account")

  await view.webview.postMessage({
    type: "state",
    state: {
      activeAccount: syntheticState.activeAccount,
      usageAccountId: "test",
      usage: {
        rolling: { status: "ok", percent: null, resetsAt: null },
        weekly: { status: "ok", percent: 0, resetsAt: null },
        monthly: { status: "ok", percent: 125, resetsAt: null },
      },
      notifySettings: { enabled: true, warn: 0, crit: 0 },
      loading: false,
    },
  })
  await sleep(200)
  result = await layout(provider, view, { width: 300 })
  assert.deepStrictEqual(result.usageText, ["—", "0%", "125%"], "missing, zero, and over-limit values must remain distinct")
  assert.deepStrictEqual(result.usageBars.map(({ value }) => value), [0, 0, 100], "visual fill must clamp safely without rewriting labels")
  assertFillRatios(result.usageBars, [0, 0, 100], "boundary quota bars")
  assert.deepStrictEqual(result.usageBars.map((bar) => bar.ariaValueText), ["Usage unavailable", "0%", "125%"], "assistive text must preserve unknown and over-limit values")
  assert.deepStrictEqual(result.usageBars.map((bar) => bar.className), [
    "bar-progress unknown",
    "bar-progress crit",
    "bar-progress crit",
  ], "zero thresholds and missing values must use consistent states")

  await view.webview.postMessage({ type: "state", state: syntheticState })
  await sleep(200)

  result = await layout(provider, view, { width: 300, view: "accounts" })
  assert.deepStrictEqual(result.views, { onboard: false, empty: false, dashboard: false, accounts: true })
  assert.strictEqual(result.savedView, "accounts")

  result = await layout(provider, view, { width: 220, view: "accounts" })
  assert.deepStrictEqual(result.overflow, [], `account management overflowed at 220px: ${JSON.stringify(result.overflow)}`)

  result = await layout(provider, view, { toggleAdd: true })
  assert.deepStrictEqual(result.addForm, { hidden: false, expanded: "true" })
  result = await layout(provider, view, { toggleAdd: true })
  assert.deepStrictEqual(result.addForm, { hidden: true, expanded: "false" })

  await provider.handleMessage({ type: "setLanguage", lang: "en" })
  await sleep(500)
  await view.webview.postMessage({ type: "state", state: syntheticState })
  await sleep(300)
  result = await layout(provider, view, { width: 300 })
  assert.deepStrictEqual(result.views, { onboard: false, empty: false, dashboard: false, accounts: true })
  assert.strictEqual(result.savedView, "accounts")

  console.log("[integration] real Webview layout and language-state tests passed")
}

module.exports = { run }
