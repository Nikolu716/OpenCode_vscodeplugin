/**
 * OpenCode Go 仪表盘 — webview 前端脚本（Apple/Tesla 科技风）。
 * 与扩展侧通过 postMessage 通信（见 src/panel.ts 的 handleMessage）。
 */
(() => {
  const api = acquireVsCodeApi()

  const $ = (id) => document.getElementById(id)

  const els = {
    statusBadge: $("status-badge"),
    onboard: $("onboard"),
    onboardKey: $("onboard-key"),
    onboardSave: $("onboard-save"),
    onboardSkip: $("onboard-skip"),
    onboardWarn: $("onboard-warn"),
    empty: $("empty"),
    btnAddFirst: $("btn-add-first"),
    errorCard: $("error-card"),
    errorText: $("error-text"),
    errorHint: $("error-hint"),
    errorKeyForm: $("error-key-form"),
    errorKeyInput: $("error-key-input"),
    errorKeySave: $("error-key-save"),
    dashboard: $("dashboard"),
    // 账户下拉（自绘）
    accountDropdown: $("account-dropdown"),
    accountTrigger: $("account-trigger"),
    accountCurrent: $("account-current"),
    accountMenu: $("account-menu"),
    btnAccounts: $("btn-accounts"),
    // 语言下拉（自绘）
    langDropdown: $("lang-dropdown"),
    langTrigger: $("lang-trigger"),
    langMenu: $("lang-menu"),
    // 多账户总览
    overview: $("overview"),
    overviewCount: $("overview-count"),
    overviewList: $("overview-list"),
    // 网关联动
    gwCard: $("gw-card"),
    gwSummary: $("gw-summary"),
    gwList: $("gw-list"),
    btnGwFilter: $("btn-gw-filter"),
    usageBars: $("usage-bars"),
    detailKey: $("detail-key"),
    detailUpdated: $("detail-updated"),
    modelsCount: $("models-count"),
    modelsList: $("models-list"),
    ctxCard: $("ctx-card"),
    ctxList: $("ctx-list"),
    btnOpenConfig: $("btn-open-config"),
    accountsView: $("accounts"),
    btnBack: $("btn-back"),
    accountList: $("account-list"),
    addToggle: $("btn-add-toggle"),
    addBox: $("add-box"),
    addKey: $("add-key"),
    addName: $("add-name"),
    btnAdd: $("btn-add"),
    btnRefresh: $("btn-refresh-top"),
  }

  let state = {
    loading: false,
    lang: "en",
    dict: {},
    activeAccount: null,
    accounts: [],
    usage: null,
    usageAccountId: null,
    usages: {},
    history: [],
    gateway: null,
    notifySettings: { enabled: true, warn: 80, crit: 100 },
    modelContexts: null,
    configFile: null,
    skipOnboarding: false,
    models: null,
    error: null,
    errorKind: null,
    lastUpdated: null,
  }

  let currentView = api.getState()?.view === "accounts" ? "accounts" : "dashboard"
  let selectedContextModel = null

  // ─────────── 翻译 ───────────

  const fallbackDict = (window.OGI18N && window.OGI18N.dicts && window.OGI18N.dicts.en) || {}

  function t(key, params) {
    let text = (state.dict && state.dict[key]) ?? fallbackDict[key] ?? key
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.split(`{${k}}`).join(String(v))
      }
    }
    return text
  }

  // 语言选项（语言名用各语言自称）
  const LANGUAGE_OPTIONS = [
    { id: "", labelKey: "lang.followSystem" },
    { id: "zh-cn", label: "简体中文" },
    { id: "zh-tw", label: "繁體中文" },
    { id: "en", label: "English" },
    { id: "ko", label: "한국어" },
    { id: "ja", label: "日本語" },
  ]

  // ─────────── 工具 ───────────

  const pad = (n) => String(n).padStart(2, "0")

  function fmtTime(ts) {
    if (!ts) return ""
    const d = new Date(ts)
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  }

  function percentInfo(value) {
    if (value === null || value === undefined || value === "") return { numeric: null, barValue: 0, label: "—" }
    const numeric = Number(value)
    if (!Number.isFinite(numeric)) return { numeric: null, barValue: 0, label: "—" }
    return {
      numeric,
      barValue: Math.max(0, Math.min(100, numeric)),
      label: `${numeric}%`,
    }
  }

  function levelFor(value, status) {
    if (status === "rate-limited") return "crit"
    if (value === null || value === undefined || value === "") return "unknown"
    const numeric = Number(value)
    if (!Number.isFinite(numeric)) return "unknown"
    const rawWarn = Number(state.notifySettings?.warn ?? 80)
    const rawCrit = Number(state.notifySettings?.crit ?? 100)
    const warn = Math.max(0, Math.min(100, Number.isFinite(rawWarn) ? rawWarn : 80))
    const crit = Math.max(warn, Math.min(100, Number.isFinite(rawCrit) ? rawCrit : 100))
    return numeric >= crit ? "crit" : numeric >= warn ? "warn" : "ok"
  }

  function progressBar(percent, level, label) {
    const valueText = percent.numeric === null ? t("usage.unavailable") : percent.label
    const valueNow = percent.numeric === null ? "" : ` aria-valuenow="${percent.barValue}"`
    return `<svg class="bar-progress ${level}" viewBox="0 0 100 5" preserveAspectRatio="none" role="progressbar" aria-valuemin="0" aria-valuemax="100"${valueNow} aria-label="${escapeHtml(label)}" aria-valuetext="${escapeHtml(valueText)}">
      <rect class="bar-track" x="0" y="0" width="100" height="5" rx="2.5"></rect>
      <rect class="bar-value" x="0" y="0" width="${percent.barValue}" height="5" rx="2.5"></rect>
    </svg>`
  }

  /** 完整倒计时（含秒） */
  function fmtCountdown(iso) {
    if (!iso) return "—"
    const deadline = new Date(iso).getTime()
    if (!Number.isFinite(deadline)) return "—"
    const ms = deadline - Date.now()
    if (ms <= 0) return t("time.soon")
    const s = Math.floor(ms / 1000)
    const d = Math.floor(s / 86400)
    const h = Math.floor((s % 86400) / 3600)
    const m = Math.floor((s % 3600) / 60)
    if (d > 0) return t("time.dHMS", { d, h, m, s: s % 60 })
    if (h > 0) return t("time.dHMS", { d: 0, h, m, s: s % 60 })
    if (m > 0) return t("time.mS", { m, s: s % 60 })
    return `${s}s`
  }

  function usageBar(title, u = {}) {
    const el = document.createElement("div")
    el.className = "usage-item"
    const percent = percentInfo(u.percent)
    const lvl = levelFor(percent.numeric, u.status)
    const limited = u.status === "rate-limited"
    el.innerHTML = `
      <div class="usage-line">
        <span class="usage-title">${title}${limited ? `<span class="rate-chip">${t("usage.rateLimited")}</span>` : ""}</span>
        ${progressBar(percent, lvl, title)}
        <span class="usage-pct ${lvl}">${percent.label}</span>
      </div>
      <div class="usage-reset countdown" data-resets="${escapeHtml(u.resetsAt || "")}">${t("usage.resetIn", { time: fmtCountdown(u.resetsAt) })}</div>`
    el.title = `${limited ? t("usage.atLimit") : t("usage.ok")} · ${t("usage.resetIn", { time: fmtCountdown(u.resetsAt) })}`
    return el
  }

  // ─────────── 下拉组件（自绘，避免原生 select 白框） ───────────

  function closeDropdowns() {
    els.accountMenu.classList.add("hidden")
    els.langMenu.classList.add("hidden")
    els.accountTrigger.setAttribute("aria-expanded", "false")
    els.langTrigger.setAttribute("aria-expanded", "false")
  }

  function toggleDropdown(menu, trigger) {
    const wasHidden = menu.classList.contains("hidden")
    closeDropdowns()
    if (wasHidden) {
      menu.classList.remove("hidden")
      trigger.setAttribute("aria-expanded", "true")
    }
  }

  /**
   * 语言菜单：用 fixed 视口定位，从按钮下方弹出并**贴着面板右缘**（右下展开）。
   * 按钮右侧还有刷新/徽章，若按按钮对齐会显得偏左；贴右缘最符合直觉，
   * 且窄面板下也不会被遮挡。
   */
  function openLangMenu() {
    closeDropdowns()
    const menu = els.langMenu
    const trig = els.langTrigger
    menu.classList.remove("hidden")
    menu.classList.toggle("open-up", trig.getBoundingClientRect().bottom + 276 > window.innerHeight)
    trig.setAttribute("aria-expanded", "true")
  }

  function renderLanguageMenu() {
    els.langMenu.replaceChildren(
      ...LANGUAGE_OPTIONS.map((opt) => {
        const btn = document.createElement("button")
        btn.className = `dropdown-item${state.lang === opt.id ? " active" : ""}`
        btn.textContent = opt.labelKey ? t(opt.labelKey) : opt.label
        btn.addEventListener("click", () => {
          api.postMessage({ type: "setLanguage", lang: opt.id })
          closeDropdowns()
        })
        return btn
      }),
    )
  }

  function renderAccountDropdown() {
    const { accounts, activeAccount } = state
    els.accountCurrent.textContent = activeAccount?.name ?? "—"
    els.accountDropdown.classList.toggle("hidden", accounts.length <= 1)

    els.accountMenu.replaceChildren(
      ...accounts.map((a) => {
        const btn = document.createElement("button")
        btn.className = `dropdown-item${a.id === activeAccount?.id ? " active" : ""}`
        btn.innerHTML = `<span class="item-tag tag ${a.source}">${a.source === "local" ? t("tag.local") : t("tag.manual")}</span>${escapeHtml(a.name)}`
        const sub = document.createElement("span")
        sub.className = "item-sub"
        sub.textContent = a.keyMasked
        btn.appendChild(sub)
        btn.addEventListener("click", () => {
          if (a.id !== activeAccount?.id) api.postMessage({ type: "setActiveAccount", id: a.id })
          closeDropdowns()
        })
        return btn
      }),
    )
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]))
  }

  // ─────────── 渲染 ───────────

  function renderBadge() {
    const b = els.statusBadge
    const usageMatchesAccount = !state.usageAccountId || state.usageAccountId === state.activeAccount?.id
    if (state.error) {
      b.textContent = state.errorKind === "not-subscribed" ? t("status.unsubscribed") : t("status.error")
      b.className = "badge crit"
    } else if (state.loading) {
      b.textContent = t("status.checking")
      b.className = "badge"
    } else if (state.usage && usageMatchesAccount) {
      const limited = Object.values(state.usage).some((u) => u.status === "rate-limited")
      const levels = Object.values(state.usage).map((u) => levelFor(u?.percent, u?.status))
      const level = levels.includes("unknown")
        ? "unknown"
        : limited || levels.includes("crit")
          ? "crit"
          : levels.includes("warn")
            ? "warn"
            : "ok"
      b.textContent = limited
        ? t("status.limited")
        : level === "unknown"
          ? t("status.error")
          : level === "crit"
          ? t("status.critical")
          : level === "warn"
            ? t("status.warning")
            : t("status.ok")
      b.className = `badge ${level === "unknown" ? "crit" : level}`
    } else {
      b.textContent = t("status.notConfigured")
      b.className = "badge"
    }
    els.btnRefresh.classList.toggle("loading", state.loading)
    els.btnRefresh.disabled = state.loading
    els.btnRefresh.setAttribute("aria-busy", String(state.loading))
  }

  function renderUsage() {
    if (!state.usage || (state.usageAccountId && state.usageAccountId !== state.activeAccount?.id)) {
      els.usageBars.replaceChildren()
      els.detailKey.textContent = "—"
      els.detailUpdated.textContent = "—"
      return
    }
    const { rolling, weekly, monthly } = state.usage
    els.usageBars.replaceChildren(
      usageBar(t("bar.rolling"), rolling),
      usageBar(t("bar.weekly"), weekly),
      usageBar(t("bar.monthly"), monthly),
    )
    els.detailKey.textContent = state.activeAccount?.keyMasked ?? "—"
    els.detailUpdated.textContent = state.lastUpdated ? fmtTime(state.lastUpdated) : "—"
  }

  // ─────────── 多账户总览（每账户一张紧凑卡片） ───────────

  /** 单账户总览卡片主体：错误态 / 三档迷你进度条 + 最快重置倒计时 */
  function ovBody(entry, accountName) {
    const box = document.createElement("div")
    if (!entry) {
      box.innerHTML = `<div class="ov-meta muted">${t("overview.checking")}</div>`
      return box
    }
    if (entry.kind !== "ok") {
      const label =
        entry.kind === "auth"
          ? t("overview.invalid")
          : entry.kind === "not-subscribed"
            ? t("status.unsubscribed")
            : entry.kind === "network"
              ? t("overview.network")
              : t("overview.error")
      box.innerHTML = `<div class="ov-meta crit-text">${label}${entry.error ? ` <span class="muted">— ${escapeHtml(entry.error)}</span>` : ""}</div>`
      return box
    }

    const u = entry.usage
    const windows = [
      { label: t("ov.short.rolling"), usage: u?.rolling ?? {} },
      { label: t("ov.short.weekly"), usage: u?.weekly ?? {} },
      { label: t("ov.short.monthly"), usage: u?.monthly ?? {} },
    ].map((w) => ({ ...w, percent: percentInfo(w.usage.percent) }))
    box.innerHTML = `
      <div class="ov-minis">
        ${windows
          .map(
            (w) => `
          <div class="ov-mini">
            <span class="ov-mini-label">${w.label}</span>
            ${progressBar(w.percent, levelFor(w.percent.numeric, w.usage.status), `${accountName} ${w.label}`)}
            <span class="ov-mini-pct ${levelFor(w.percent.numeric, w.usage.status)}">${w.percent.label}</span>
          </div>`,
          )
          .join("")}
      </div>`
    return box
  }

  function renderOverview() {
    const multi = state.accounts.length > 1
    els.overview.classList.toggle("hidden", !multi)
    if (!multi) {
      els.overviewList.replaceChildren()
      return
    }
    els.overviewCount.textContent = t("overview.count", { n: state.accounts.length })
    els.overviewList.replaceChildren(
      ...state.accounts.map((a) => {
        const entry = state.usages?.[a.id]
        const card = document.createElement("div")
        card.className = `ov-card${a.id === state.activeAccount?.id ? " active" : ""}`
        card.innerHTML = `
          <button type="button" class="ov-select" aria-current="${a.id === state.activeAccount?.id ? "true" : "false"}">
            <span class="ov-name">${escapeHtml(a.name)}</span>
            <span class="tag ${a.source}">${a.source === "local" ? t("tag.local") : t("tag.manual")}</span>
          </button>
          <div class="ov-body"></div>`
        card.querySelector(".ov-body").appendChild(ovBody(entry, a.name))
        card.querySelector(".ov-select").addEventListener("click", () => {
          if (a.id !== state.activeAccount?.id) api.postMessage({ type: "setActiveAccount", id: a.id })
        })
        return card
      }),
    )
  }

  // ─────────── 网关联动（本地中转网关 /admin/status） ───────────

  let gwFilter = "sub" // 默认只看订阅制站点；"all" 看全部

  function gwRow(st) {
    const row = document.createElement("div")
    row.className = "gw-row"
    const stateLabel = !st.enabled ? "disabled" : st.quotaExhausted ? "quota" : st.status || "down"
    const statusText = t(`gw.${stateLabel}`)
    const health = Number(st.healthScore ?? 0).toFixed(0)
    const latency = st.emaLatency != null ? t("gw.latency", { v: Math.round(st.emaLatency * 1000) }) : "—"
    const balance = st.balance != null ? t("gw.balance", { v: Number(st.balance).toFixed(2) }) : "—"
    row.innerHTML = `
      <div class="gw-row-main">
        <div class="gw-row-head">
          <span class="gw-dot ${stateLabel}"></span>
          <span class="gw-name">${escapeHtml(st.name)}</span>
          <span class="gw-status gw-${stateLabel}">${statusText}</span>
        </div>
        <div class="gw-row-meta muted">
          <span>${t("gw.health", { p: health })}</span> · <span>${latency}</span> · <span>${balance}</span>
          ${st.quotaError ? `<span class="crit-text"> · ${escapeHtml(st.quotaError)}</span>` : ""}
        </div>
      </div>`
    if (st.quotaExhausted) {
      const btn = document.createElement("button")
      btn.className = "mini-btn gw-reset"
      btn.textContent = t("gw.reset")
      btn.addEventListener("click", () => api.postMessage({ type: "resetStation", name: st.name }))
      row.appendChild(btn)
    }
    return row
  }

  function renderGateway() {
    const gw = state.gateway
    els.gwCard.classList.toggle("hidden", !gw)
    if (!gw) return
    els.btnGwFilter.textContent = gwFilter === "sub" ? t("gw.filterSub") : t("gw.filterAll")

    if (gw.error) {
      els.gwSummary.textContent = t("gw.error", { msg: gw.error })
      els.gwList.replaceChildren()
      return
    }
    const s = gw.summary ?? { total: 0, up: 0 }
    els.gwSummary.textContent = t("gw.summary", { up: s.up, total: s.total })

    const rows = (gw.stations ?? []).filter((st) => gwFilter === "all" || st.billing === "subscription")
    if (rows.length === 0) {
      els.gwList.replaceChildren()
      const empty = document.createElement("div")
      empty.className = "local-empty"
      empty.textContent = gwFilter === "sub" ? t("gw.noSub") : t("gw.noStations")
      els.gwList.appendChild(empty)
      return
    }
    els.gwList.replaceChildren(...rows.map(gwRow))
  }

  // ─────────── 上下文配置（参考 Kimi 插件 Context Config） ───────────

  const CTX_OPTIONS = [128, 256, 512, 1024]
  const configModelId = (modelId) => modelId.replace(/^(?:opencode-go|opencode)\//, "")
  const contextRowId = (index) => `ctx-model-${index}`

  function selectContextModel(modelId, { focus = false, scroll = false } = {}) {
    selectedContextModel = modelId
    els.modelsList.querySelectorAll("button.chip").forEach((button) => {
      if (button.dataset.modelId === modelId) button.setAttribute("aria-current", "true")
      else button.removeAttribute("aria-current")
    })
    els.ctxList.querySelectorAll(".ctx-row").forEach((row) => {
      row.classList.toggle("targeted", row.dataset.modelId === modelId)
    })

    const row = [...els.ctxList.querySelectorAll(".ctx-row")].find((item) => item.dataset.modelId === modelId)
    if (!row) return
    if (scroll) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      row.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" })
    }
    if (focus) row.focus({ preventScroll: true })
  }

  function focusContextModel(modelId) {
    if (els.ctxCard.classList.contains("hidden")) {
      api.postMessage({ type: "openConfig" })
      return
    }

    els.ctxCard.open = true
    selectContextModel(modelId, { focus: true, scroll: true })
  }

  function renderContexts() {
    const models = state.models || []
    const contexts = state.modelContexts || {}
    const hasConfig = state.configFile !== null
    if (selectedContextModel && !models.includes(selectedContextModel)) selectedContextModel = null

    els.ctxCard.classList.toggle("hidden", !hasConfig || models.length === 0)
    els.ctxList.replaceChildren()
    if (!hasConfig || models.length === 0) {
      selectedContextModel = null
      els.ctxCard.open = false
      return
    }

    // 配置文件的 models 键使用 provider 内模型 id，不写入重复的 provider 前缀。
    const ctxFor = (modelId) => contexts[modelId] ?? contexts[configModelId(modelId)] ?? null

    els.ctxList.replaceChildren(
      ...models.map((modelId, index) => {
        const row = document.createElement("div")
        row.className = `ctx-row${selectedContextModel === modelId ? " targeted" : ""}`
        row.id = contextRowId(index)
        row.dataset.modelId = modelId
        row.tabIndex = -1
        row.setAttribute("role", "group")
        row.addEventListener("focusin", () => selectContextModel(modelId))
        const current = ctxFor(modelId)

        const opts = CTX_OPTIONS.map((k) => {
          const btn = document.createElement("button")
          btn.className = `ctx-opt${current === k * 1024 ? " active" : ""}`
          btn.textContent = t("ctx.option", { n: k })
          btn.dataset.context = String(k * 1024)
          btn.setAttribute("aria-pressed", String(current === k * 1024))
          btn.addEventListener("click", () => {
            // 选中高亮
            row.querySelectorAll(".ctx-opt").forEach((b) => {
              b.classList.remove("active")
              b.setAttribute("aria-pressed", "false")
            })
            btn.classList.add("active")
            btn.setAttribute("aria-pressed", "true")
          })
          return btn
        })

        const saveBtn = document.createElement("button")
        saveBtn.className = "btn btn-primary ctx-save"
        saveBtn.textContent = t("ctx.save")
        saveBtn.addEventListener("click", () => {
          const active = row.querySelector(".ctx-opt.active")
          const context = Number(active?.dataset.context || 0)
          if (!context) return
          saveBtn.textContent = t("ctx.saved")
          setTimeout(() => (saveBtn.textContent = t("ctx.save")), 1500)
          api.postMessage({ type: "saveContext", model: configModelId(modelId), context })
        })

        row.innerHTML = `<div class="ctx-head"><span class="ctx-name" id="${contextRowId(index)}-name"></span><span class="ctx-current"></span></div>`
        row.setAttribute("aria-labelledby", `${contextRowId(index)}-name`)
        row.querySelector(".ctx-name").textContent = modelId
        row.querySelector(".ctx-current").textContent = current
          ? `${t("ctx.option", { n: Math.round(current / 1024) })}`
          : "—"
        const head = row.querySelector(".ctx-head")
        const optsBox = document.createElement("div")
        optsBox.className = "ctx-opts"
        opts.forEach((b) => optsBox.appendChild(b))
        optsBox.appendChild(saveBtn)
        row.appendChild(optsBox)
        return row
      }),
    )
  }

  function renderModels() {
    if (!state.models) {
      els.modelsCount.textContent = ""
      els.modelsList.replaceChildren()
      return
    }
    els.modelsCount.textContent = t("models.count", { n: state.models.length })
    const configurable = state.configFile !== null
    els.modelsList.replaceChildren(
      ...state.models.map((id, index) => {
        const chip = document.createElement(configurable ? "button" : "span")
        if (configurable) chip.type = "button"
        chip.className = "chip"
        chip.textContent = id
        chip.dataset.modelId = id
        if (configurable) {
          chip.setAttribute("aria-label", `${t("ctx.title")}: ${id}`)
          chip.setAttribute("aria-controls", contextRowId(index))
          if (selectedContextModel === id) chip.setAttribute("aria-current", "true")
          chip.title = `${t("ctx.title")}: ${id}`
          chip.addEventListener("click", () => focusContextModel(id))
        }
        return chip
      }),
    )
  }

  function renderAccountsList() {
    const { accounts, activeAccount } = state
    els.accountList.replaceChildren(
      ...accounts.map((a) => {
        const item = document.createElement("div")
        item.className = `account-item${a.id === activeAccount?.id ? " active" : ""}`

        const main = document.createElement("button")
        main.type = "button"
        main.className = "account-main"
        main.setAttribute("aria-current", a.id === activeAccount?.id ? "true" : "false")
        main.innerHTML = `
          <div class="account-name">
            <span class="name-text"></span>
            <span class="tag ${a.source}">${a.source === "local" ? t("tag.local") : t("tag.manual")}</span>
          </div>
          <div class="account-key">${a.keyMasked}</div>`
        main.querySelector(".name-text").textContent = a.name
        main.addEventListener("click", () => {
          if (a.id !== activeAccount?.id) api.postMessage({ type: "setActiveAccount", id: a.id })
        })

        // 重命名：行内输入框
        const renameBtn = document.createElement("button")
        renameBtn.className = "mini-btn"
        renameBtn.textContent = t("accounts.rename")
        renameBtn.addEventListener("click", (e) => {
          e.stopPropagation()
          const nameEl = main.querySelector(".name-text")
          const input = document.createElement("input")
          input.type = "text"
          input.value = a.name
          input.className = "rename-input"
          nameEl.replaceWith(input)
          input.focus()
          input.select()
          const commit = () => {
            const v = input.value.trim()
            if (v && v !== a.name) api.postMessage({ type: "renameAccount", id: a.id, name: v })
          }
          input.addEventListener("keydown", (ev) => {
            if (ev.key === "Enter") { commit(); renderAccountsList() }
            if (ev.key === "Escape") renderAccountsList()
          })
          input.addEventListener("blur", () => { commit(); renderAccountsList() })
        })

        // 删除：二次确认
        const actions = document.createElement("div")
        actions.className = "account-actions"
        actions.append(renameBtn)
        if (a.source === "manual") {
          const delBtn = document.createElement("button")
          delBtn.className = "mini-btn danger"
          delBtn.textContent = t("accounts.remove")
          delBtn.addEventListener("click", (e) => {
            e.stopPropagation()
            if (delBtn.dataset.confirm) {
              api.postMessage({ type: "removeAccount", id: a.id })
              return
            }
            delBtn.dataset.confirm = "1"
            delBtn.textContent = t("accounts.confirm")
            setTimeout(() => {
              delete delBtn.dataset.confirm
              delBtn.textContent = t("accounts.remove")
            }, 2500)
          })
          actions.append(delBtn)
        }
        item.append(main, actions)
        return item
      }),
    )
  }

  function render() {
    const focusedModelId = document.activeElement?.matches?.("button.chip")
      ? document.activeElement.dataset.modelId
      : null
    const focusedContextRow = document.activeElement?.closest?.(".ctx-row")
    const focusedContext = focusedContextRow
      ? {
          modelId: focusedContextRow.dataset.modelId,
          context: document.activeElement?.matches?.(".ctx-opt") ? document.activeElement.dataset.context : null,
          save: document.activeElement?.matches?.(".ctx-save") || false,
        }
      : null

    renderBadge()

    // 视图分层：
    //  1. 首次引导（没有任何手动 key 且未跳过）—— 正常流程，主动引导填 key
    //  2. 空状态（跳过引导且没有任何账户）
    //  3. 仪表盘
    const hasManual = state.accounts.some((a) => a.source === "manual")
    const showOnboard = !state.skipOnboarding && !hasManual
    const hasAccounts = state.accounts.length > 0

    const showAccounts = currentView === "accounts"
    els.accountsView.classList.toggle("hidden", !showAccounts)
    els.onboard.classList.toggle("hidden", showAccounts || !showOnboard)
    els.empty.classList.toggle("hidden", showAccounts || showOnboard || hasAccounts)
    els.dashboard.classList.toggle("hidden", showAccounts || showOnboard || !hasAccounts)
    // 引导页显示时不叠红色错误卡（引导输入框本身就是修复入口），
    // 改为在引导卡内用黄色提示说明"本机 key 已失效"，避免一张屏两个冲突卡片
    els.errorCard.classList.toggle("hidden", showAccounts || !state.error || showOnboard)

    // 引导卡：「使用本机账户」仅当存在本地自动发现的账户时提供
    const hasLocal = state.accounts.some((a) => a.source === "local")
    els.onboardSkip.classList.toggle("hidden", !hasLocal)

    // 引导卡内预警：本机自动发现的 key 失效（401/403 等）时给出明确说明
    const showOnboardWarn = showOnboard && hasLocal && !!state.error
    els.onboardWarn.classList.toggle("hidden", !showOnboardWarn)
    if (showOnboardWarn) {
      els.onboardWarn.textContent = t("onboard.localFailed", { error: state.error })
    }

    if (state.error) {
      els.errorText.textContent = state.error
      els.errorHint.textContent =
        state.errorKind === "auth"
          ? t("error.auth")
          : state.errorKind === "not-subscribed"
            ? t("error.notSubscribed")
            : state.errorKind === "network"
              ? t("error.network")
              : ""
      // key 无效时直接就地展示填 key 表单（填一次永久生效）
      els.errorKeyForm.classList.toggle("hidden", state.errorKind !== "auth")
    }

    if (hasAccounts) {
      renderAccountDropdown()
      renderOverview()
      renderUsage()
      renderGateway()
      renderModels()
      renderContexts()

      if (focusedModelId) {
        const model = [...els.modelsList.querySelectorAll("button.chip")]
          .find((button) => button.dataset.modelId === focusedModelId)
        model?.focus({ preventScroll: true })
      } else if (focusedContext) {
        const row = [...els.ctxList.querySelectorAll(".ctx-row")]
          .find((item) => item.dataset.modelId === focusedContext.modelId)
        const target = focusedContext.context
          ? [...(row?.querySelectorAll(".ctx-opt") || [])].find((button) => button.dataset.context === focusedContext.context)
          : focusedContext.save
            ? row?.querySelector(".ctx-save")
            : row
        target?.focus({ preventScroll: true })
      }
    }
    if (showAccounts) renderAccountsList()
    renderLanguageMenu()
  }

  // ─────────── 视图切换 ───────────

  function showView(name) {
    currentView = name === "accounts" ? "accounts" : "dashboard"
    closeDropdowns()
    // 记住当前视图：语言切换会重建 webview HTML，重建后据此恢复所在页面
    api.setState({ ...(api.getState() || {}), view: currentView })
    render()
  }

  // ─────────── 交互 ───────────

  els.btnAddFirst.addEventListener("click", () => showView("accounts"))
  els.btnAccounts.addEventListener("click", () => showView("accounts"))
  els.btnBack.addEventListener("click", () => {
    showView("dashboard")
  })

  els.accountTrigger.addEventListener("click", (e) => {
    e.stopPropagation()
    toggleDropdown(els.accountMenu, els.accountTrigger)
  })

  els.langTrigger.addEventListener("click", (e) => {
    e.stopPropagation()
    if (els.langMenu.classList.contains("hidden")) openLangMenu()
    else closeDropdowns()
  })

  // 点击外部关闭所有下拉
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) closeDropdowns()
  })

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return
    const hadOpenMenu = !els.accountMenu.classList.contains("hidden") || !els.langMenu.classList.contains("hidden")
    closeDropdowns()
    if (hadOpenMenu) (els.langDropdown.contains(document.activeElement) ? els.langTrigger : els.accountTrigger).focus()
  })

  document.querySelectorAll("[data-url]").forEach((button) => {
    button.addEventListener("click", () => api.postMessage({ type: "openUrl", url: button.dataset.url }))
  })

  // 添加账户：同一按钮负责展开和收起，避免展开后没有取消入口
  els.addToggle.addEventListener("click", () => {
    const show = els.addBox.classList.contains("hidden")
    els.addBox.classList.toggle("hidden", !show)
    els.addToggle.classList.toggle("active", show)
    els.addToggle.setAttribute("aria-expanded", String(show))
    if (show) els.addKey.focus()
  })

  els.btnAdd.addEventListener("click", () => {
    const key = els.addKey.value.trim()
    if (!key) return
    api.postMessage({ type: "addAccount", key, name: els.addName.value.trim() })
    els.addKey.value = ""
    els.addName.value = ""
    // 添加后收起表单，恢复为单个「添加」按钮
    els.addBox.classList.add("hidden")
    els.addToggle.classList.remove("active")
    els.addToggle.setAttribute("aria-expanded", "false")
  })

  els.addKey.addEventListener("keydown", (e) => {
    if (e.key === "Enter") els.btnAdd.click()
    if (e.key === "Escape") els.addToggle.click()
  })

  els.addName.addEventListener("keydown", (e) => {
    if (e.key === "Enter") els.btnAdd.click()
    if (e.key === "Escape") els.addToggle.click()
  })

  els.btnRefresh.addEventListener("click", () => api.postMessage({ type: "refresh" }))

  els.btnOpenConfig.addEventListener("click", () => api.postMessage({ type: "openConfig" }))

  els.btnGwFilter.addEventListener("click", () => {
    gwFilter = gwFilter === "sub" ? "all" : "sub"
    renderGateway()
  })

  // 错误卡内联填 key：保存即生效（addAccount 存密钥库 + 激活 + 刷新）
  els.errorKeySave.addEventListener("click", () => {
    const key = els.errorKeyInput.value.trim()
    if (!key) return
    api.postMessage({ type: "addAccount", key })
    els.errorKeyInput.value = ""
  })
  els.errorKeyInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") els.errorKeySave.click()
  })

  // 首次引导：保存 key / 跳过（使用本机账户）
  els.onboardSave.addEventListener("click", () => {
    const key = els.onboardKey.value.trim()
    if (!key) return
    api.postMessage({ type: "addAccount", key })
    els.onboardKey.value = ""
  })
  els.onboardKey.addEventListener("keydown", (e) => {
    if (e.key === "Enter") els.onboardSave.click()
  })
  els.onboardSkip.addEventListener("click", () => api.postMessage({ type: "skipOnboarding" }))

  // 秒级倒计时：每秒刷新所有带 data-resets 的倒计时文本（详情条 + 总览卡，不触发全量渲染）
  setInterval(() => {
    document.querySelectorAll(".countdown[data-resets]").forEach((el) => {
      const iso = el.getAttribute("data-resets")
      el.textContent = iso ? t("usage.resetIn", { time: fmtCountdown(iso) }) : ""
    })
  }, 1000)

  // ─────────── 消息 ───────────

  window.addEventListener("message", (event) => {
    const msg = event.data
    if (msg?.type === "state") {
      state = { ...state, ...msg.state }
      render()
    } else if (msg?.type === "__layoutDebug") {
      // 集成测试钩子：在真实 Webview 中回传窄栏布局与视图互斥状态。
      if (typeof msg.width === "number") {
        document.body.classList.toggle("debug-width-220", msg.width <= 220)
        document.body.classList.toggle("debug-width-300", msg.width > 220 && msg.width <= 300)
      }
      if (msg.view) showView(msg.view)
      if (msg.toggleAdd) els.addToggle.click()
      if (msg.openModels) {
        document.querySelectorAll("details.models").forEach((details) => (details.open = true))
      }
      if (msg.openContexts) els.ctxCard.open = true
      if (msg.closeContexts) els.ctxCard.open = false
      if (typeof msg.clickModel === "string") {
        const modelButton = [...els.modelsList.querySelectorAll("button.chip")].find((button) => button.dataset.modelId === msg.clickModel)
        modelButton?.click()
      }
      if (typeof msg.focusModel === "string") {
        const modelButton = [...els.modelsList.querySelectorAll("button.chip")].find((button) => button.dataset.modelId === msg.focusModel)
        modelButton?.focus()
      }
      if (msg.openLanguage) openLangMenu()

      requestAnimationFrame(() => requestAnimationFrame(() => {
        const rect = (el) => {
          if (!el) return null
          const r = el.getBoundingClientRect()
          return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height }
        }
        const metrics = (el) => el ? { rect: rect(el), clientWidth: el.clientWidth, scrollWidth: el.scrollWidth } : null
        const bodyRect = document.body.getBoundingClientRect()
        const visible = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== "hidden"
        const modelDetails = [...document.querySelectorAll("details.models")].find((el) => el.contains(els.modelsList))
        const scoped = [
          document.querySelector(".topbar"),
          document.querySelector(".topbar-actions"),
          els.langMenu,
          els.dashboard,
          document.querySelector(".account-switch"),
          ...els.usageBars.querySelectorAll(".usage-item, .usage-line"),
          els.overview,
          ...els.overviewList.querySelectorAll(".ov-card, .ov-select"),
          els.accountsView,
          ...els.accountList.querySelectorAll(".account-item, .account-main, .account-actions"),
          modelDetails,
          els.modelsList,
          ...els.modelsList.children,
          els.ctxCard,
          els.ctxList,
          ...els.ctxList.children,
        ]
        const overflow = scoped
          .filter(visible)
          .map((el) => ({
            tag: el.tagName.toLowerCase(),
            id: el.id,
            className: el.className,
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
            right: el.getBoundingClientRect().right,
          }))
          .filter((item) => item.scrollWidth > item.clientWidth + 1 || item.right > bodyRect.right + 1 || item.left < bodyRect.left - 1)

        const m = els.langMenu.getBoundingClientRect()
        api.postMessage({
          type: "__layoutResult",
          requestId: msg.requestId,
          rect: { left: m.left, right: m.right, top: m.top, bottom: m.bottom, width: m.width, height: m.height },
          viewport: { width: window.innerWidth, height: window.innerHeight },
          body: metrics(document.body),
          views: {
            onboard: visible(els.onboard),
            empty: visible(els.empty),
            dashboard: visible(els.dashboard),
            accounts: visible(els.accountsView),
          },
          badge: { text: els.statusBadge.textContent || "", className: els.statusBadge.className },
          addForm: {
            hidden: els.addBox.classList.contains("hidden"),
            expanded: els.addToggle.getAttribute("aria-expanded"),
          },
          models: {
            open: !!modelDetails?.open,
            details: metrics(modelDetails),
            list: metrics(els.modelsList),
            count: els.modelsList.children.length,
            buttons: els.modelsList.querySelectorAll("button.chip").length,
            controls: [...els.modelsList.querySelectorAll("button.chip")].map((button) => button.getAttribute("aria-controls")),
            items: [...els.modelsList.querySelectorAll("button.chip")].map((button) => {
              const style = getComputedStyle(button)
              return {
                modelId: button.dataset.modelId,
                current: button.getAttribute("aria-current"),
                backgroundColor: style.backgroundColor,
                borderColor: style.borderColor,
                textDecorationLine: style.textDecorationLine,
                boxShadow: style.boxShadow,
                focused: document.activeElement === button,
                rect: rect(button),
              }
            }),
          },
          contexts: {
            open: els.ctxCard.open,
            card: metrics(els.ctxCard),
            rows: els.ctxList.children.length,
            focusedModel: document.activeElement?.closest(".ctx-row")?.dataset.modelId ?? null,
            targetedModel: els.ctxList.querySelector(".ctx-row.targeted")?.dataset.modelId ?? null,
            rowIds: [...els.ctxList.querySelectorAll(".ctx-row")].map((row) => row.id),
          },
          usageText: [...els.usageBars.querySelectorAll(".usage-pct")].map((el) => el.textContent || ""),
          usageBars: [...els.usageBars.querySelectorAll(".bar-progress")].map((el) => ({
            value: Number(el.getAttribute("aria-valuenow") ?? 0),
            max: Number(el.getAttribute("aria-valuemax")),
            ariaValueText: el.getAttribute("aria-valuetext"),
            width: el.getBoundingClientRect().width,
            trackWidth: el.querySelector(".bar-track")?.getBoundingClientRect().width ?? 0,
            fillWidth: el.querySelector(".bar-value")?.getBoundingClientRect().width ?? 0,
            color: getComputedStyle(el).getPropertyValue("--progress-color").trim(),
            className: el.getAttribute("class") || "",
          })),
          usageResetText: [...els.usageBars.querySelectorAll(".usage-reset")].map((el) => el.textContent || ""),
          overview: {
            visible: visible(els.overview),
            cards: els.overviewList.children.length,
            current: [...els.overviewList.querySelectorAll(".ov-select")].map((el) => el.getAttribute("aria-current")),
            bars: [...els.overviewList.querySelectorAll(".bar-progress")].map((el) => ({
              value: Number(el.getAttribute("aria-valuenow") ?? 0),
              trackWidth: el.querySelector(".bar-track")?.getBoundingClientRect().width ?? 0,
              fillWidth: el.querySelector(".bar-value")?.getBoundingClientRect().width ?? 0,
            })),
          },
          dashboardText: els.dashboard.textContent || "",
          overflow,
          savedView: api.getState()?.view,
        })
        if (msg.openLanguage) closeDropdowns()
      }))
    }
  })

  api.postMessage({ type: "ready" })
})()
