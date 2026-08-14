const fs = require("fs")
const path = require("path")

const root = path.resolve(__dirname, "..")
const dist = fs.readFileSync(path.join(root, "dist/extension.js"), "utf8")
const start = dist.indexOf('<!DOCTYPE html>')
const endMarker = '</html>`;'
const end = dist.indexOf(endMarker, start)
if (start < 0 || end < 0) throw new Error("dashboard HTML template not found")

const i18n = fs.readFileSync(path.join(root, "media/i18n.js"), "utf8")
const dashboard = fs.readFileSync(path.join(root, "media/dashboard.js"), "utf8")
const template = dist.slice(start, end + "</html>".length)
const tr = (key) => ({
  "brand.sub": "订阅仪表盘",
  "account.manage": "管理账户",
  "lang.switch": "切换语言",
  refresh: "刷新",
  "onboard.title": "首次使用？粘贴你的 OpenCode Go API key",
  "accounts.addKeyPlaceholder": "粘贴新的 API key…",
  "onboard.save": "保存并开始",
  "error.openConsole": "打开控制台",
  "onboard.desc": "只需配置一次，key 保存在本机密钥库",
  "onboard.useLocal": "使用本机账户",
  "empty.title": "添加你的 Go 套餐",
  "empty.desc": "粘贴 API key 即可查看用量",
  "empty.add": "添加 API key",
  "error.saveKey": "保存并重试",
  "error.keyNote": "只需配置一次",
  "account.label": "账户",
  "overview.title": "账户总览",
  "usage.quotaTitle": "已用额度",
  "gw.title": "网关联动",
  "gw.filterSub": "仅订阅制",
  "gw.note": "网关数据",
  "models.title": "可用模型",
  "ctx.title": "上下文配置",
  "ctx.open": "打开配置文件",
  "ctx.note": "写入 opencode.json，对新会话生效",
  "detail.plan": "计划",
  "detail.planValue": "OpenCode Go",
  "detail.key": "API key",
  "detail.updated": "上次更新",
  "accounts.title": "账户",
  "accounts.back": "返回",
  "accounts.add": "添加",
  "accounts.addNamePlaceholder": "名称（可选）",
  "accounts.hint": "手动添加的 key 保存在 VS Code 密钥存储中，仅本机可用。",
  footer: "opencode.ai · zen/go/v1/usage",
}[key] || key)

let html = template
  .replace(/\$\{this\.lang\}/g, "zh-cn")
  .replace(/\$\{csp\}/g, "")
  .replace(/\$\{styleUri\}/g, "../media/dashboard.css")
  .replace(/\$\{i18nUri\}/g, "../media/i18n.js")
  .replace(/\$\{scriptUri\}/g, "../media/dashboard.js")
  .replace(/\$\{nonce\}/g, "")
  .replace(/\$\{tr\("([^"]+)"\)\}/g, (_, key) => tr(key))

const boot = `
<script>
window.__previewMessages = [];
window.__previewState = { view: "dashboard" };
window.acquireVsCodeApi = () => ({
  postMessage: (message) => window.__previewMessages.push(message),
  getState: () => window.__previewState,
  setState: (next) => { window.__previewState = next; return next; }
});
</script>`
const state = `
<script>
window.addEventListener("load", () => setTimeout(() => {
  window.dispatchEvent(new MessageEvent("message", { data: { type: "state", state: {
    loading: false, lang: "zh-cn", dict: window.OGI18N.dicts["zh-cn"], skipOnboarding: true,
    activeAccount: { id: "a1", name: "Go 套餐 1", keyMasked: "sk-g••••VKVJ", source: "manual" },
    accounts: [{ id: "a1", name: "Go 套餐 1", keyMasked: "sk-g••••VKVJ", source: "manual" }],
    usage: {
      rolling: { status: "ok", percent: 36, resetsAt: new Date(Date.now() + 7200000).toISOString() },
      weekly: { status: "ok", percent: 54, resetsAt: new Date(Date.now() + 172800000).toISOString() },
      monthly: { status: "ok", percent: 71, resetsAt: new Date(Date.now() + 604800000).toISOString() }
    },
    usageAccountId: "a1",
    usages: {}, gateway: null,
    notifySettings: { enabled: true, warn: 50, crit: 70 },
    models: ["minimax-m3", "minimax-m2.7", "minimax-m2.5", "kimi-k3", "kimi-k2.7-code", "kimi-k2.6", "opencode-go/this-is-an-extremely-long-model-identifier-without-any-natural-break-point-1234567890"],
    modelContexts: { "minimax-m3": 1048576, "minimax-m2.7": 1048576 }, configFile: "opencode.json",
    history: [], error: null, lastUpdated: Date.now()
  }}}));
}, 0));
</script>`
html = html.replace("<body>", `<body>${boot}`).replace("</body>", `${state}</body>`)
fs.writeFileSync(path.join(__dirname, "preview.html"), html)
console.log(path.join(__dirname, "preview.html"))
