"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// media/i18n.js
var require_i18n = __commonJS({
  "media/i18n.js"(exports2, module2) {
    "use strict";
    (function(root, factory) {
      if (typeof module2 === "object" && module2.exports)
        module2.exports = factory();
      else
        root.OGI18N = factory();
    })(typeof self !== "undefined" ? self : exports2, function() {
      "use strict";
      const dicts2 = {
        "zh-cn": {
          "brand.sub": "\u8BA2\u9605\u4EEA\u8868\u76D8",
          "status.checking": "\u540C\u6B65\u4E2D\u2026",
          "status.ok": "\u8FD0\u884C\u6B63\u5E38",
          "status.warning": "\u63A5\u8FD1\u4E0A\u9650",
          "status.critical": "\u4E34\u8FD1\u4E0A\u9650",
          "status.limited": "\u5DF2\u8FBE\u9650\u6D41",
          "status.error": "\u51FA\u9519",
          "status.unsubscribed": "\u672A\u8BA2\u9605",
          "status.notConfigured": "\u672A\u914D\u7F6E",
          "empty.title": "\u6DFB\u52A0\u4F60\u7684 Go \u5957\u9910",
          "empty.desc": "\u7C98\u8D34 API key \u5373\u53EF\u67E5\u770B\u7528\u91CF\uFF0Ckey \u5C06\u4FDD\u5B58\u5728\u672C\u673A\u5BC6\u94A5\u5E93\u3002",
          "empty.add": "\u6DFB\u52A0 API key",
          "onboard.title": "\u9996\u6B21\u4F7F\u7528\uFF1F\u7C98\u8D34\u4F60\u7684 OpenCode Go API key",
          "onboard.desc": "\u53EA\u9700\u914D\u7F6E\u4E00\u6B21\uFF0Ckey \u4FDD\u5B58\u5728\u672C\u673A\u5BC6\u94A5\u5E93\uFF1B\u591A\u4E2A Go \u8BA2\u9605\u53EF\u5728\u300C\u8D26\u6237\u300D\u9875\u968F\u65F6\u6DFB\u52A0",
          "onboard.save": "\u4FDD\u5B58\u5E76\u5F00\u59CB",
          "onboard.useLocal": "\u4F7F\u7528\u672C\u673A\u81EA\u52A8\u53D1\u73B0\u7684\u8D26\u6237",
          "onboard.localFailed": "\u68C0\u6D4B\u5230\u672C\u673A\u81EA\u52A8\u53D1\u73B0\u7684 key \u5DF2\u5931\u6548\uFF08{error}\uFF09\u3002\u53EF\u76F4\u63A5\u7C98\u8D34\u65B0 key \u5F00\u59CB\u4F7F\u7528\uFF0C\u6216\u70B9\u300C\u4F7F\u7528\u672C\u673A\u81EA\u52A8\u53D1\u73B0\u7684\u8D26\u6237\u300D\u67E5\u770B\u8BE6\u60C5\u3002",
          "account.label": "\u8D26\u6237",
          "account.manage": "\u7BA1\u7406\u8D26\u6237",
          "stat.caption": "5 \u5C0F\u65F6\u6EDA\u52A8\u7528\u91CF",
          "bar.rolling": "5 \u5C0F\u65F6\u6EDA\u52A8",
          "bar.weekly": "\u672C\u5468",
          "bar.monthly": "\u672C\u6708",
          "usage.rateLimited": "\u9650\u6D41",
          "usage.ok": "\u989D\u5EA6\u6B63\u5E38",
          "usage.atLimit": "\u5DF2\u8FBE\u4E0A\u9650",
          "usage.unavailable": "\u6570\u636E\u4E0D\u53EF\u7528",
          "usage.reset": "\u91CD\u7F6E \xB7 {time}",
          "usage.resetIn": "\u91CD\u7F6E\uFF1A\u8FD8\u6709 {time}",
          "detail.plan": "\u8BA1\u5212",
          "detail.planValue": "OpenCode Go",
          "detail.key": "API key",
          "detail.updated": "\u4E0A\u6B21\u66F4\u65B0",
          "models.title": "\u53EF\u7528\u6A21\u578B",
          "models.count": "{n} \u4E2A",
          "accounts.title": "\u8D26\u6237",
          "accounts.back": "\u8FD4\u56DE",
          "accounts.rename": "\u91CD\u547D\u540D",
          "accounts.remove": "\u5220\u9664",
          "accounts.confirm": "\u786E\u8BA4\uFF1F",
          "accounts.addKeyPlaceholder": "\u7C98\u8D34\u65B0\u7684 API key\u2026",
          "accounts.addNamePlaceholder": "\u540D\u79F0\uFF08\u53EF\u9009\uFF09",
          "accounts.add": "\u6DFB\u52A0",
          "accounts.hint": "手动添加的 key 保存在 VS Code 密钥存储中，仅本机可用。",
          "tag.local": "\u672C\u673A",
          "tag.manual": "\u624B\u52A8",
          "footer": "opencode.ai \xB7 zen/go/v1/usage",
          "refresh": "\u5237\u65B0",
          "notify.copied": "API key \u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F",
          "account.defaultName": "Go \u5957\u9910 {n}",
          "time.soon": "\u5373\u5C06\u91CD\u7F6E",
          "time.dH": "{d} \u5929 {h} \u5C0F\u65F6",
          "time.hM": "{h} \u5C0F\u65F6 {m} \u5206",
          "time.mS": "{m} \u5206 {s} \u79D2",
          "time.dHMS": "{d} \u5929 {h} \u65F6 {m} \u5206 {s} \u79D2",
          "error.auth": "API key \u65E0\u6548\u6216\u5DF2\u8FC7\u671F\u3002\u8BF7\u5728 opencode.ai \u63A7\u5236\u53F0\u91CD\u65B0\u751F\u6210\uFF0C\u5E76\u5728\u300C\u8D26\u6237\u300D\u4E2D\u66FF\u6362\u3002",
          "error.notSubscribed": "\u5F53\u524D key \u672A\u542F\u7528 OpenCode Go \u8BA2\u9605\u3002\u53EF\u5728 opencode.ai/go \u8BA2\u9605\uFF0C\u6216\u5207\u6362\u5230\u5176\u4ED6\u8D26\u6237\u3002",
          "error.network": "\u7F51\u7EDC\u8FDE\u63A5\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u6216\u4EE3\u7406\u8BBE\u7F6E\u3002",
          "error.openConsole": "\u6253\u5F00\u63A7\u5236\u53F0",
          "error.saveKey": "\u4FDD\u5B58\u5E76\u91CD\u8BD5",
          "error.keyNote": "\u53EA\u9700\u914D\u7F6E\u4E00\u6B21\uFF0Ckey \u4FDD\u5B58\u5728\u672C\u673A\u5BC6\u94A5\u5E93\uFF08\u5931\u6548\u65F6\u624D\u9700\u66F4\u6362\uFF09",
          "lang.switch": "\u5207\u6362\u8BED\u8A00",
          "lang.followSystem": "\u8DDF\u968F\u7CFB\u7EDF",
          "ctx.title": "\u4E0A\u4E0B\u6587\u914D\u7F6E",
          "ctx.note": "\u5199\u5165 opencode.json\uFF0C\u5BF9\u65B0\u4F1A\u8BDD\u751F\u6548",
          "ctx.save": "\u4FDD\u5B58",
          "ctx.saved": "\u5DF2\u4FDD\u5B58",
          "ctx.open": "\u6253\u5F00\u914D\u7F6E\u6587\u4EF6",
          "ctx.noConfig": "\u672A\u627E\u5230 opencode.json\uFF0C\u8BF7\u5148\u5B89\u88C5 opencode \u6216\u624B\u52A8\u521B\u5EFA\u914D\u7F6E\u3002",
          "ctx.option": "{n}K",
          "usage.quotaTitle": "已用额度",
          "overview.title": "账户总览",
          "overview.count": "{n} 个账户",
          "overview.invalid": "key \u5931\u6548",
          "overview.network": "\u7F51\u7EDC\u9519\u8BEF",
          "overview.error": "\u51FA\u9519",
          "overview.checking": "\u540C\u6B65\u4E2D\u2026",
          "ov.short.rolling": "5h",
          "ov.short.weekly": "\u5468",
          "ov.short.monthly": "\u6708",
          "gw.title": "\u7F51\u5173\u8054\u52A8",
          "gw.filterSub": "\u4EC5\u8BA2\u9605\u5236",
          "gw.filterAll": "\u5168\u90E8\u7AD9\u70B9",
          "gw.summary": "{up}/{total} \u5728\u7EBF",
          "gw.up": "\u5728\u7EBF",
          "gw.down": "\u7194\u65AD",
          "gw.cooling": "\u51B7\u5374",
          "gw.disabled": "\u7981\u7528",
          "gw.quota": "\u914D\u989D\u8017\u5C3D",
          "gw.health": "\u8BC4\u5206 {p}",
          "gw.latency": "{v} ms",
          "gw.balance": "${v}",
          "gw.reset": "\u91CD\u7F6E",
          "gw.resetDone": "{name} \u5DF2\u91CD\u7F6E\uFF0C\u6B63\u5728\u786E\u8BA4\u2026",
          "gw.resetFail": "\u91CD\u7F6E\u5931\u8D25\uFF1A{msg}",
          "gw.notConfigured": "\u672A\u914D\u7F6E\u7F51\u5173\u5730\u5740\uFF08\u8BBE\u7F6E opencodeGo.gatewayUrl \u540E\u53EF\u7528\uFF09",
          "gw.note": "\u6570\u636E\u6765\u81EA\u672C\u5730\u4E2D\u8F6C\u7F51\u5173 /admin/status",
          "gw.error": "\u65E0\u6CD5\u8FDE\u63A5\u7F51\u5173\uFF1A{msg}",
          "gw.noSub": "\u6CA1\u6709\u8BA2\u9605\u5236\u7AD9\u70B9",
          "gw.noStations": "\u6CA1\u6709\u7AD9\u70B9",
          "notify.warn": "{name}\uFF1A{window}\u7528\u91CF\u5DF2\u8FBE {p}%",
          "notify.crit": "{name}\uFF1A{window}\u7528\u91CF\u5DF2\u8FBE {p}%\uFF0C\u63A5\u8FD1\u4E0A\u9650",
          "notify.limited": "{name}\uFF1A{window}\u5DF2\u9650\u6D41\uFF0C\u989D\u5EA6\u91CD\u7F6E\u540E\u6062\u590D",
          "notify.auth": "{name}\uFF1AAPI key \u5931\u6548\uFF0C\u8BF7\u66FF\u6362",
          "notify.notSubscribed": "{name}\uFF1A\u672A\u8BA2\u9605 OpenCode Go",
          "notify.view": "\u67E5\u770B\u4EEA\u8868\u76D8",
          "sb.title": "OpenCode Go \u8BA2\u9605",
          "sb.item": "{name} {p}%",
          "sb.windows": "5h {r}% \xB7 \u5468 {w}% \xB7 \u6708 {m}%",
          "sb.limited": "\uFF08\u9650\u6D41\uFF09",
          "sb.invalid": "key \u5931\u6548",
          "sb.notSubscribed": "\u672A\u8BA2\u9605",
          "sb.network": "\u7F51\u7EDC\u9519\u8BEF",
          "sb.click": "\u70B9\u51FB\u6253\u5F00\u4EEA\u8868\u76D8"
        },
        "zh-tw": {
          "brand.sub": "\u8A02\u95B1\u5100\u8868\u677F",
          "status.checking": "\u540C\u6B65\u4E2D\u2026",
          "status.ok": "\u904B\u4F5C\u6B63\u5E38",
          "status.warning": "\u63A5\u8FD1\u4E0A\u9650",
          "status.critical": "\u81E8\u8FD1\u4E0A\u9650",
          "status.limited": "\u5DF2\u9054\u4E0A\u9650",
          "status.error": "\u767C\u751F\u932F\u8AA4",
          "status.unsubscribed": "\u672A\u8A02\u95B1",
          "status.notConfigured": "\u672A\u8A2D\u5B9A",
          "empty.title": "\u65B0\u589E\u4F60\u7684 Go \u65B9\u6848",
          "empty.desc": "\u8CBC\u4E0A API \u91D1\u9470\u5373\u53EF\u67E5\u770B\u7528\u91CF\uFF0C\u91D1\u9470\u6703\u5B58\u653E\u5728\u672C\u6A5F\u91D1\u9470\u5EAB\u3002",
          "empty.add": "\u65B0\u589E API \u91D1\u9470",
          "onboard.title": "\u9996\u6B21\u4F7F\u7528\uFF1F\u8CBC\u4E0A\u4F60\u7684 OpenCode Go API \u91D1\u9470",
          "onboard.desc": "\u53EA\u9700\u8A2D\u5B9A\u4E00\u6B21\uFF0C\u91D1\u9470\u6703\u5B58\u653E\u5728\u672C\u6A5F\u91D1\u9470\u5EAB\uFF1B\u591A\u500B Go \u8A02\u95B1\u53EF\u5728\u300C\u5E33\u6236\u300D\u9801\u96A8\u6642\u65B0\u589E",
          "onboard.save": "\u5132\u5B58\u4E26\u958B\u59CB",
          "onboard.useLocal": "\u4F7F\u7528\u672C\u6A5F\u81EA\u52D5\u5075\u6E2C\u7684\u5E33\u6236",
          "onboard.localFailed": "\u5075\u6E2C\u5230\u672C\u6A5F\u81EA\u52D5\u5075\u6E2C\u7684\u91D1\u9470\u5DF2\u5931\u6548\uFF08{error}\uFF09\u3002\u53EF\u76F4\u63A5\u8CBC\u4E0A\u65B0\u91D1\u9470\u958B\u59CB\u4F7F\u7528\uFF0C\u6216\u9EDE\u300C\u4F7F\u7528\u672C\u6A5F\u81EA\u52D5\u5075\u6E2C\u7684\u5E33\u6236\u300D\u67E5\u770B\u8A73\u60C5\u3002",
          "account.label": "\u5E33\u6236",
          "account.manage": "\u7BA1\u7406\u5E33\u6236",
          "stat.caption": "5 \u5C0F\u6642\u6EFE\u52D5\u7528\u91CF",
          "bar.rolling": "5 \u5C0F\u6642\u6EFE\u52D5",
          "bar.weekly": "\u672C\u9031",
          "bar.monthly": "\u672C\u6708",
          "usage.rateLimited": "\u9650\u6D41",
          "usage.ok": "\u984D\u5EA6\u6B63\u5E38",
          "usage.atLimit": "\u5DF2\u9054\u4E0A\u9650",
          "usage.unavailable": "\u8CC7\u6599\u7121\u6CD5\u4F7F\u7528",
          "usage.reset": "\u91CD\u8A2D\u65BC {time}",
          "usage.resetIn": "\u91CD\u8A2D\uFF1A\u9084\u6709 {time}",
          "detail.plan": "\u65B9\u6848",
          "detail.planValue": "OpenCode Go",
          "detail.key": "API \u91D1\u9470",
          "detail.updated": "\u4E0A\u6B21\u66F4\u65B0",
          "models.title": "\u53EF\u7528\u6A21\u578B",
          "models.count": "{n} \u500B",
          "accounts.title": "\u5E33\u6236",
          "accounts.back": "\u8FD4\u56DE",
          "accounts.rename": "\u91CD\u65B0\u547D\u540D",
          "accounts.remove": "\u522A\u9664",
          "accounts.confirm": "\u78BA\u8A8D\uFF1F",
          "accounts.addKeyPlaceholder": "\u8CBC\u4E0A\u65B0\u7684 API \u91D1\u9470\u2026",
          "accounts.addNamePlaceholder": "\u540D\u7A31\uFF08\u9078\u586B\uFF09",
          "accounts.add": "\u65B0\u589E",
          "accounts.hint": "手動新增的 key 保存在 VS Code 密鑰儲存中，僅本機可用。",
          "tag.local": "\u672C\u6A5F",
          "tag.manual": "\u624B\u52D5",
          "footer": "opencode.ai \xB7 zen/go/v1/usage",
          "refresh": "\u91CD\u65B0\u6574\u7406",
          "notify.copied": "API \u91D1\u9470\u5DF2\u8907\u88FD\u5230\u526A\u8CBC\u7C3F",
          "account.defaultName": "Go \u65B9\u6848 {n}",
          "time.soon": "\u5373\u5C07\u91CD\u8A2D",
          "time.dH": "{d} \u5929 {h} \u5C0F\u6642",
          "time.hM": "{h} \u5C0F\u6642 {m} \u5206",
          "time.mS": "{m} \u5206 {s} \u79D2",
          "time.dHMS": "{d} \u5929 {h} \u6642 {m} \u5206 {s} \u79D2",
          "error.auth": "API \u91D1\u9470\u7121\u6548\u6216\u5DF2\u904E\u671F\u3002\u8ACB\u5728 opencode.ai \u63A7\u5236\u53F0\u91CD\u65B0\u7522\u751F\uFF0C\u4E26\u5728\u300C\u5E33\u6236\u300D\u4E2D\u66FF\u63DB\u3002",
          "error.notSubscribed": "\u6B64\u91D1\u9470\u672A\u555F\u7528 OpenCode Go \u8A02\u95B1\u3002\u53EF\u5728 opencode.ai/go \u8A02\u95B1\uFF0C\u6216\u5207\u63DB\u5230\u5176\u4ED6\u5E33\u6236\u3002",
          "error.network": "\u7DB2\u8DEF\u9023\u7DDA\u5931\u6557\uFF0C\u8ACB\u6AA2\u67E5\u7DB2\u8DEF\u6216\u4EE3\u7406\u8A2D\u5B9A\u3002",
          "error.openConsole": "\u958B\u555F\u4E3B\u63A7\u53F0",
          "error.saveKey": "\u5132\u5B58\u4E26\u91CD\u8A66",
          "error.keyNote": "\u53EA\u9700\u8A2D\u5B9A\u4E00\u6B21\uFF0C\u91D1\u9470\u6703\u5B58\u653E\u5728\u672C\u6A5F\u91D1\u9470\u5EAB\uFF08\u5931\u6548\u6642\u624D\u9700\u66F4\u63DB\uFF09",
          "lang.switch": "\u5207\u63DB\u8A9E\u8A00",
          "lang.followSystem": "\u8DDF\u96A8\u7CFB\u7D71",
          "ctx.title": "\u4E0A\u4E0B\u6587\u8A2D\u5B9A",
          "ctx.note": "\u5BEB\u5165 opencode.json\uFF0C\u5C0D\u65B0\u6703\u8A71\u751F\u6548",
          "ctx.save": "\u5132\u5B58",
          "ctx.saved": "\u5DF2\u5132\u5B58",
          "ctx.open": "\u958B\u555F\u8A2D\u5B9A\u6A94",
          "ctx.noConfig": "\u627E\u4E0D\u5230 opencode.json\uFF0C\u8ACB\u5148\u5B89\u88DD opencode \u6216\u624B\u52D5\u5EFA\u7ACB\u8A2D\u5B9A\u3002",
          "ctx.option": "{n}K",
          "usage.quotaTitle": "已用額度",
          "overview.title": "帳戶總覽",
          "overview.count": "{n} 個帳戶",
          "overview.invalid": "\u91D1\u9470\u5931\u6548",
          "overview.network": "\u7DB2\u8DEF\u932F\u8AA4",
          "overview.error": "\u767C\u751F\u932F\u8AA4",
          "overview.checking": "\u540C\u6B65\u4E2D\u2026",
          "ov.short.rolling": "5h",
          "ov.short.weekly": "\u9031",
          "ov.short.monthly": "\u6708",
          "gw.title": "\u9598\u9053\u5668\u806F\u52D5",
          "gw.filterSub": "\u50C5\u8A02\u95B1\u5236",
          "gw.filterAll": "\u5168\u90E8\u7AD9\u9EDE",
          "gw.summary": "{up}/{total} \u5728\u7DDA",
          "gw.up": "\u5728\u7DDA",
          "gw.down": "\u7194\u65B7",
          "gw.cooling": "\u51B7\u537B",
          "gw.disabled": "\u505C\u7528",
          "gw.quota": "\u914D\u984D\u8017\u76E1",
          "gw.health": "\u8A55\u5206 {p}",
          "gw.latency": "{v} ms",
          "gw.balance": "${v}",
          "gw.reset": "\u91CD\u8A2D",
          "gw.resetDone": "{name} \u5DF2\u91CD\u8A2D\uFF0C\u6B63\u5728\u78BA\u8A8D\u2026",
          "gw.resetFail": "\u91CD\u8A2D\u5931\u6557\uFF1A{msg}",
          "gw.notConfigured": "\u5C1A\u672A\u8A2D\u5B9A\u9598\u9053\u5668\u7DB2\u5740\uFF08\u8A2D\u5B9A opencodeGo.gatewayUrl \u5F8C\u53EF\u7528\uFF09",
          "gw.note": "\u8CC7\u6599\u4F86\u81EA\u672C\u6A5F\u4E2D\u8F49\u9598\u9053\u5668 /admin/status",
          "gw.error": "\u7121\u6CD5\u9023\u7DDA\u9598\u9053\u5668\uFF1A{msg}",
          "gw.noSub": "\u6C92\u6709\u8A02\u95B1\u5236\u7AD9\u9EDE",
          "gw.noStations": "\u6C92\u6709\u7AD9\u9EDE",
          "notify.warn": "{name}\uFF1A{window}\u7528\u91CF\u5DF2\u9054 {p}%",
          "notify.crit": "{name}\uFF1A{window}\u7528\u91CF\u5DF2\u9054 {p}%\uFF0C\u63A5\u8FD1\u4E0A\u9650",
          "notify.limited": "{name}\uFF1A{window}\u5DF2\u9054\u4E0A\u9650\uFF0C\u984D\u5EA6\u91CD\u8A2D\u5F8C\u6062\u5FA9",
          "notify.auth": "{name}\uFF1AAPI \u91D1\u9470\u5931\u6548\uFF0C\u8ACB\u66F4\u63DB",
          "notify.notSubscribed": "{name}\uFF1A\u672A\u8A02\u95B1 OpenCode Go",
          "notify.view": "\u67E5\u770B\u5100\u8868\u677F",
          "sb.title": "OpenCode Go \u8A02\u95B1",
          "sb.item": "{name} {p}%",
          "sb.windows": "5h {r}% \xB7 \u9031 {w}% \xB7 \u6708 {m}%",
          "sb.limited": "\uFF08\u5DF2\u9054\u4E0A\u9650\uFF09",
          "sb.invalid": "\u91D1\u9470\u5931\u6548",
          "sb.notSubscribed": "\u672A\u8A02\u95B1",
          "sb.network": "\u7DB2\u8DEF\u932F\u8AA4",
          "sb.click": "\u9EDE\u64CA\u958B\u555F\u5100\u8868\u677F"
        },
        en: {
          "brand.sub": "Subscription Dashboard",
          "status.checking": "Syncing\u2026",
          "status.ok": "Running fine",
          "status.warning": "Approaching limit",
          "status.critical": "Near limit",
          "status.limited": "Rate limited",
          "status.error": "Error",
          "status.unsubscribed": "Not subscribed",
          "status.notConfigured": "Not configured",
          "empty.title": "Add your Go plan",
          "empty.desc": "Paste an API key to see usage \u2014 the key is stored in your local secret storage.",
          "empty.add": "Add API key",
          "onboard.title": "First time? Paste your OpenCode Go API key",
          "onboard.desc": "Configure once \u2014 stored in your local secret storage. Add more Go plans anytime under Accounts.",
          "onboard.save": "Save & start",
          "onboard.useLocal": "Use locally discovered account",
          "onboard.localFailed": 'The locally discovered key is invalid ({error}). Paste a new key to start, or choose "Use locally discovered account" for details.',
          "account.label": "Account",
          "account.manage": "Manage accounts",
          "stat.caption": "5-hour rolling usage",
          "bar.rolling": "5-hour rolling",
          "bar.weekly": "This week",
          "bar.monthly": "This month",
          "usage.rateLimited": "Rate limited",
          "usage.ok": "Within limits",
          "usage.atLimit": "At limit",
          "usage.unavailable": "Usage unavailable",
          "usage.reset": "Resets \xB7 {time}",
          "usage.resetIn": "Resets in {time}",
          "detail.plan": "Plan",
          "detail.planValue": "OpenCode Go",
          "detail.key": "API key",
          "detail.updated": "Last updated",
          "models.title": "Available models",
          "models.count": "{n} models",
          "accounts.title": "Accounts",
          "accounts.back": "Back",
          "accounts.rename": "Rename",
          "accounts.remove": "Remove",
          "accounts.confirm": "Confirm?",
          "accounts.addKeyPlaceholder": "Paste new API key\u2026",
          "accounts.addNamePlaceholder": "Name (optional)",
          "accounts.add": "Add",
          "accounts.hint": "Manually added keys are stored in VS Code's secret storage on this machine.",
          "tag.local": "Local",
          "tag.manual": "Manual",
          "footer": "opencode.ai \xB7 zen/go/v1/usage",
          "refresh": "Refresh",
          "notify.copied": "API key copied to clipboard",
          "account.defaultName": "Go plan {n}",
          "time.soon": "Resets soon",
          "time.dH": "{d}d {h}h",
          "time.hM": "{h}h {m}m",
          "time.mS": "{m}m {s}s",
          "time.dHMS": "{d}d {h}h {m}m {s}s",
          "error.auth": "API key is invalid or expired. Generate a new one in the opencode.ai console and replace it under Accounts.",
          "error.notSubscribed": "This key does not have an active OpenCode Go subscription. Subscribe at opencode.ai/go or switch to another account.",
          "error.network": "Network connection failed. Check your network or proxy settings.",
          "error.openConsole": "Open console",
          "error.saveKey": "Save & retry",
          "error.keyNote": "Configure once \u2014 the key is stored in your local secret storage (replace only when invalid)",
          "lang.switch": "Switch language",
          "lang.followSystem": "Follow system",
          "ctx.title": "Context config",
          "ctx.note": "Written to opencode.json, applies to new sessions",
          "ctx.save": "Save",
          "ctx.saved": "Saved",
          "ctx.open": "Open config file",
          "ctx.noConfig": "opencode.json not found. Install opencode or create the config manually.",
          "ctx.option": "{n}K",
          "usage.quotaTitle": "Quota used",
          "overview.title": "Accounts overview",
          "overview.count": "{n} accounts",
          "overview.invalid": "Invalid key",
          "overview.network": "Network error",
          "overview.error": "Error",
          "overview.checking": "Syncing\u2026",
          "ov.short.rolling": "5h",
          "ov.short.weekly": "Wk",
          "ov.short.monthly": "Mo",
          "gw.title": "Gateway",
          "gw.filterSub": "Subscription only",
          "gw.filterAll": "All stations",
          "gw.summary": "{up}/{total} up",
          "gw.up": "Up",
          "gw.down": "Tripped",
          "gw.cooling": "Cooling",
          "gw.disabled": "Disabled",
          "gw.quota": "Quota exhausted",
          "gw.health": "Score {p}",
          "gw.latency": "{v} ms",
          "gw.balance": "${v}",
          "gw.reset": "Reset",
          "gw.resetDone": "{name} reset, verifying\u2026",
          "gw.resetFail": "Reset failed: {msg}",
          "gw.notConfigured": "Gateway URL not configured (set opencodeGo.gatewayUrl)",
          "gw.note": "Data from your local relay gateway /admin/status",
          "gw.error": "Cannot reach gateway: {msg}",
          "gw.noSub": "No subscription stations",
          "gw.noStations": "No stations",
          "notify.warn": "{name}: {window} usage reached {p}%",
          "notify.crit": "{name}: {window} usage at {p}%, close to limit",
          "notify.limited": "{name}: {window} rate-limited, recovers after quota reset",
          "notify.auth": "{name}: API key invalid, please replace",
          "notify.notSubscribed": "{name}: OpenCode Go not subscribed",
          "notify.view": "View dashboard",
          "sb.title": "OpenCode Go subscriptions",
          "sb.item": "{name} {p}%",
          "sb.windows": "5h {r}% \xB7 Wk {w}% \xB7 Mo {m}%",
          "sb.limited": " (rate-limited)",
          "sb.invalid": "invalid key",
          "sb.notSubscribed": "not subscribed",
          "sb.network": "network error",
          "sb.click": "Click to open dashboard"
        },
        ko: {
          "brand.sub": "\uAD6C\uB3C5 \uB300\uC2DC\uBCF4\uB4DC",
          "status.checking": "\uB3D9\uAE30\uD654 \uC911\u2026",
          "status.ok": "\uC815\uC0C1 \uC791\uB3D9",
          "status.warning": "\uD55C\uB3C4 \uADFC\uC811",
          "status.critical": "\uD55C\uB3C4 \uC784\uBC15",
          "status.limited": "\uC694\uAE08 \uD55C\uB3C4 \uB3C4\uB2EC",
          "status.error": "\uC624\uB958",
          "status.unsubscribed": "\uBBF8\uAD6C\uB3C5",
          "status.notConfigured": "\uBBF8\uAD6C\uC131",
          "empty.title": "Go \uC694\uAE08\uC81C \uCD94\uAC00",
          "empty.desc": "API \uD0A4\uB97C \uBD99\uC5EC\uB123\uC73C\uBA74 \uC0AC\uC6A9\uB7C9\uC744 \uD655\uC778\uD560 \uC218 \uC788\uC5B4\uC694. \uD0A4\uB294 \uB85C\uCEEC \uBE44\uBC00 \uC800\uC7A5\uC18C\uC5D0 \uBCF4\uAD00\uB429\uB2C8\uB2E4.",
          "empty.add": "API \uD0A4 \uCD94\uAC00",
          "onboard.title": "\uCC98\uC74C\uC774\uC2E0\uAC00\uC694? OpenCode Go API \uD0A4\uB97C \uBD99\uC5EC\uB123\uC73C\uC138\uC694",
          "onboard.desc": "\uD55C \uBC88\uB9CC \uC124\uC815\uD558\uBA74 \uB429\uB2C8\uB2E4. \uD0A4\uB294 \uB85C\uCEEC \uBE44\uBC00 \uC800\uC7A5\uC18C\uC5D0 \uBCF4\uAD00\uB418\uBA70, \uCD94\uAC00 Go \uAD6C\uB3C5\uC740 \uACC4\uC815\uC5D0\uC11C \uC5B8\uC81C\uB4E0 \uB4F1\uB85D\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",
          "onboard.save": "\uC800\uC7A5 \uD6C4 \uC2DC\uC791",
          "onboard.useLocal": "\uB85C\uCEEC\uC5D0\uC11C \uC790\uB3D9 \uBC1C\uACAC\uB41C \uACC4\uC815 \uC0AC\uC6A9",
          "onboard.localFailed": "\uB85C\uCEEC\uC5D0\uC11C \uC790\uB3D9 \uBC1C\uACAC\uB41C \uD0A4\uAC00 \uBB34\uD6A8\uD569\uB2C8\uB2E4({error}). \uC0C8 \uD0A4\uB97C \uBD99\uC5EC\uB123\uC5B4 \uC2DC\uC791\uD558\uAC70\uB098, '\uB85C\uCEEC\uC5D0\uC11C \uC790\uB3D9 \uBC1C\uACAC\uB41C \uACC4\uC815 \uC0AC\uC6A9'\uC744 \uB20C\uB7EC \uC790\uC138\uD788 \uD655\uC778\uD558\uC138\uC694.",
          "account.label": "\uACC4\uC815",
          "account.manage": "\uACC4\uC815 \uAD00\uB9AC",
          "stat.caption": "5\uC2DC\uAC04 \uB864\uB9C1 \uC0AC\uC6A9\uB7C9",
          "bar.rolling": "5\uC2DC\uAC04 \uB864\uB9C1",
          "bar.weekly": "\uC774\uBC88 \uC8FC",
          "bar.monthly": "\uC774\uBC88 \uB2EC",
          "usage.rateLimited": "\uD55C\uB3C4 \uB3C4\uB2EC",
          "usage.ok": "\uD55C\uB3C4 \uB0B4 \uC0AC\uC6A9",
          "usage.atLimit": "\uD55C\uB3C4 \uCD08\uACFC",
          "usage.unavailable": "\uC0AC\uC6A9\uB7C9 \uC815\uBCF4 \uC5C6\uC74C",
          "usage.reset": "\uCD08\uAE30\uD654 \xB7 {time}",
          "usage.resetIn": "\uCD08\uAE30\uD654: {time} \uB0A8\uC74C",
          "detail.plan": "\uC694\uAE08\uC81C",
          "detail.planValue": "OpenCode Go",
          "detail.key": "API \uD0A4",
          "detail.updated": "\uB9C8\uC9C0\uB9C9 \uC5C5\uB370\uC774\uD2B8",
          "models.title": "\uC0AC\uC6A9 \uAC00\uB2A5\uD55C \uBAA8\uB378",
          "models.count": "\uBAA8\uB378 {n}\uAC1C",
          "accounts.title": "\uACC4\uC815",
          "accounts.back": "\uB4A4\uB85C",
          "accounts.rename": "\uC774\uB984 \uBC14\uAFB8\uAE30",
          "accounts.remove": "\uC0AD\uC81C",
          "accounts.confirm": "\uD655\uC778?",
          "accounts.addKeyPlaceholder": "\uC0C8 API \uD0A4 \uBD99\uC5EC\uB123\uAE30\u2026",
          "accounts.addNamePlaceholder": "\uC774\uB984(\uC120\uD0DD)",
          "accounts.add": "\uCD94\uAC00",
          "accounts.hint": "수동으로 추가한 키는 이 기기의 VS Code 시크릿 저장소에 저장됩니다.",
          "tag.local": "\uB85C\uCEEC",
          "tag.manual": "\uC218\uB3D9",
          "footer": "opencode.ai \xB7 zen/go/v1/usage",
          "refresh": "\uC0C8\uB85C\uACE0\uCE68",
          "notify.copied": "API \uD0A4\uAC00 \uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4",
          "account.defaultName": "Go \uC694\uAE08\uC81C {n}",
          "time.soon": "\uACE7 \uCD08\uAE30\uD654",
          "time.dH": "{d}\uC77C {h}\uC2DC\uAC04",
          "time.hM": "{h}\uC2DC\uAC04 {m}\uBD84",
          "time.mS": "{m}\uBD84 {s}\uCD08",
          "time.dHMS": "{d}\uC77C {h}\uC2DC\uAC04 {m}\uBD84 {s}\uCD08",
          "error.auth": "API \uD0A4\uAC00 \uC798\uBABB\uB418\uC5C8\uAC70\uB098 \uB9CC\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. opencode.ai \uCF58\uC194\uC5D0\uC11C \uC0C8\uB85C \uC0DD\uC131\uD558\uACE0 '\uACC4\uC815'\uC5D0\uC11C \uAD50\uCCB4\uD558\uC138\uC694.",
          "error.notSubscribed": "\uC774 \uD0A4\uC5D0\uB294 OpenCode Go \uAD6C\uB3C5\uC774 \uD65C\uC131\uD654\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. opencode.ai/go\uC5D0\uC11C \uAD6C\uB3C5\uD558\uAC70\uB098 \uB2E4\uB978 \uACC4\uC815\uC73C\uB85C \uC804\uD658\uD558\uC138\uC694.",
          "error.network": "\uB124\uD2B8\uC6CC\uD06C \uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4. \uB124\uD2B8\uC6CC\uD06C \uB610\uB294 \uD504\uB85D\uC2DC \uC124\uC815\uC744 \uD655\uC778\uD558\uC138\uC694.",
          "error.openConsole": "\uCF58\uC194 \uC5F4\uAE30",
          "error.saveKey": "\uC800\uC7A5 \uD6C4 \uC7AC\uC2DC\uB3C4",
          "error.keyNote": "\uD55C \uBC88\uB9CC \uC124\uC815\uD558\uBA74 \uB429\uB2C8\uB2E4. \uD0A4\uB294 \uB85C\uCEEC \uBE44\uBC00 \uC800\uC7A5\uC18C\uC5D0 \uBCF4\uAD00\uB429\uB2C8\uB2E4(\uBB34\uD6A8\uD654 \uC2DC\uC5D0\uB9CC \uAD50\uCCB4)",
          "lang.switch": "\uC5B8\uC5B4 \uC804\uD658",
          "lang.followSystem": "\uC2DC\uC2A4\uD15C \uC5B8\uC5B4 \uB530\uB974\uAE30",
          "ctx.title": "\uCEE8\uD14D\uC2A4\uD2B8 \uC124\uC815",
          "ctx.note": "opencode.json\uC5D0 \uAE30\uB85D\uB418\uBA70 \uC0C8 \uC138\uC158\uBD80\uD130 \uC801\uC6A9\uB429\uB2C8\uB2E4",
          "ctx.save": "\uC800\uC7A5",
          "ctx.saved": "\uC800\uC7A5\uB428",
          "ctx.open": "\uC124\uC815 \uD30C\uC77C \uC5F4\uAE30",
          "ctx.noConfig": "opencode.json\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. opencode\uB97C \uC124\uCE58\uD558\uAC70\uB098 \uC124\uC815\uC744 \uC9C1\uC811 \uC0DD\uC131\uD558\uC138\uC694.",
          "ctx.option": "{n}K",
          "usage.quotaTitle": "사용한 쿼터",
          "overview.title": "계정 개요",
          "overview.count": "계정 {n}개",
          "overview.invalid": "\uD0A4 \uBB34\uD6A8",
          "overview.network": "\uB124\uD2B8\uC6CC\uD06C \uC624\uB958",
          "overview.error": "\uC624\uB958",
          "overview.checking": "\uB3D9\uAE30\uD654 \uC911\u2026",
          "ov.short.rolling": "5h",
          "ov.short.weekly": "\uC8FC",
          "ov.short.monthly": "\uC6D4",
          "gw.title": "\uAC8C\uC774\uD2B8\uC6E8\uC774 \uC5F0\uB3D9",
          "gw.filterSub": "\uAD6C\uB3C5\uC81C\uB9CC",
          "gw.filterAll": "\uC804\uCCB4 \uC2A4\uD14C\uC774\uC158",
          "gw.summary": "{up}/{total} \uC628\uB77C\uC778",
          "gw.up": "\uC628\uB77C\uC778",
          "gw.down": "\uCC28\uB2E8",
          "gw.cooling": "\uCFE8\uB2E4\uC6B4",
          "gw.disabled": "\uBE44\uD65C\uC131",
          "gw.quota": "\uD560\uB2F9\uB7C9 \uC18C\uC9C4",
          "gw.health": "\uC810\uC218 {p}",
          "gw.latency": "{v} ms",
          "gw.balance": "${v}",
          "gw.reset": "\uCD08\uAE30\uD654",
          "gw.resetDone": "{name} \uCD08\uAE30\uD654\uB428, \uD655\uC778 \uC911\u2026",
          "gw.resetFail": "\uCD08\uAE30\uD654 \uC2E4\uD328: {msg}",
          "gw.notConfigured": "\uAC8C\uC774\uD2B8\uC6E8\uC774 \uC8FC\uC18C\uAC00 \uC124\uC815\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (opencodeGo.gatewayUrl \uC124\uC815 \uD544\uC694)",
          "gw.note": "\uB85C\uCEEC \uB9B4\uB808\uC774 \uAC8C\uC774\uD2B8\uC6E8\uC774 /admin/status\uC758 \uB370\uC774\uD130",
          "gw.error": "\uAC8C\uC774\uD2B8\uC6E8\uC774\uC5D0 \uC5F0\uACB0\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4: {msg}",
          "gw.noSub": "\uAD6C\uB3C5\uC81C \uC2A4\uD14C\uC774\uC158\uC774 \uC5C6\uC2B5\uB2C8\uB2E4",
          "gw.noStations": "\uC2A4\uD14C\uC774\uC158\uC774 \uC5C6\uC2B5\uB2C8\uB2E4",
          "notify.warn": "{name}: {window} \uC0AC\uC6A9\uB7C9\uC774 {p}%\uC5D0 \uB3C4\uB2EC\uD588\uC2B5\uB2C8\uB2E4",
          "notify.crit": "{name}: {window} \uC0AC\uC6A9\uB7C9\uC774 {p}%\uC785\uB2C8\uB2E4. \uD55C\uB3C4\uC5D0 \uAC00\uAE4C\uC6CC\uC694",
          "notify.limited": "{name}: {window} \uD55C\uB3C4 \uB3C4\uB2EC, \uD560\uB2F9\uB7C9 \uCD08\uAE30\uD654 \uD6C4 \uBCF5\uAD6C\uB429\uB2C8\uB2E4",
          "notify.auth": "{name}: API \uD0A4\uAC00 \uBB34\uD6A8\uD569\uB2C8\uB2E4. \uAD50\uCCB4\uD558\uC138\uC694",
          "notify.notSubscribed": "{name}: OpenCode Go \uBBF8\uAD6C\uB3C5",
          "notify.view": "\uB300\uC2DC\uBCF4\uB4DC \uBCF4\uAE30",
          "sb.title": "OpenCode Go \uAD6C\uB3C5",
          "sb.item": "{name} {p}%",
          "sb.windows": "5h {r}% \xB7 \uC8FC {w}% \xB7 \uC6D4 {m}%",
          "sb.limited": " (\uD55C\uB3C4 \uB3C4\uB2EC)",
          "sb.invalid": "\uD0A4 \uBB34\uD6A8",
          "sb.notSubscribed": "\uBBF8\uAD6C\uB3C5",
          "sb.network": "\uB124\uD2B8\uC6CC\uD06C \uC624\uB958",
          "sb.click": "\uD074\uB9AD\uD558\uC5EC \uB300\uC2DC\uBCF4\uB4DC \uC5F4\uAE30"
        },
        ja: {
          "brand.sub": "\u30B5\u30D6\u30B9\u30AF\u30EA\u30D7\u30B7\u30E7\u30F3\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9",
          "status.checking": "\u540C\u671F\u4E2D\u2026",
          "status.ok": "\u6B63\u5E38\u7A3C\u50CD",
          "status.warning": "\u4E0A\u9650\u306B\u63A5\u8FD1",
          "status.critical": "\u4E0A\u9650\u9593\u8FD1",
          "status.limited": "\u4E0A\u9650\u5230\u9054",
          "status.error": "\u30A8\u30E9\u30FC",
          "status.unsubscribed": "\u672A\u5951\u7D04",
          "status.notConfigured": "\u672A\u8A2D\u5B9A",
          "empty.title": "Go\u30D7\u30E9\u30F3\u3092\u8FFD\u52A0",
          "empty.desc": "API\u30AD\u30FC\u3092\u8CBC\u308A\u4ED8\u3051\u308B\u3068\u5229\u7528\u91CF\u3092\u78BA\u8A8D\u3067\u304D\u307E\u3059\u3002\u30AD\u30FC\u306F\u30ED\u30FC\u30AB\u30EB\u306E\u79D8\u5BC6\u30B9\u30C8\u30EC\u30FC\u30B8\u306B\u4FDD\u5B58\u3055\u308C\u307E\u3059\u3002",
          "empty.add": "API\u30AD\u30FC\u3092\u8FFD\u52A0",
          "onboard.title": "\u521D\u3081\u3066\u3067\u3059\u304B\uFF1FOpenCode Go API\u30AD\u30FC\u3092\u8CBC\u308A\u4ED8\u3051\u3066\u304F\u3060\u3055\u3044",
          "onboard.desc": "\u4E00\u5EA6\u3060\u3051\u8A2D\u5B9A\u3059\u308C\u3070OK\u3002\u30AD\u30FC\u306F\u30ED\u30FC\u30AB\u30EB\u306E\u79D8\u5BC6\u30B9\u30C8\u30EC\u30FC\u30B8\u306B\u4FDD\u5B58\u3055\u308C\u3001\u8FFD\u52A0\u306EGo\u30D7\u30E9\u30F3\u306F\u30A2\u30AB\u30A6\u30F3\u30C8\u3067\u3044\u3064\u3067\u3082\u767B\u9332\u3067\u304D\u307E\u3059",
          "onboard.save": "\u4FDD\u5B58\u3057\u3066\u958B\u59CB",
          "onboard.useLocal": "\u30ED\u30FC\u30AB\u30EB\u3067\u81EA\u52D5\u691C\u51FA\u3055\u308C\u305F\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u4F7F\u7528",
          "onboard.localFailed": "\u30ED\u30FC\u30AB\u30EB\u3067\u81EA\u52D5\u691C\u51FA\u3055\u308C\u305F\u30AD\u30FC\u304C\u7121\u52B9\u3067\u3059\uFF08{error}\uFF09\u3002\u65B0\u3057\u3044\u30AD\u30FC\u3092\u8CBC\u308A\u4ED8\u3051\u3066\u958B\u59CB\u3059\u308B\u304B\u3001\u300C\u30ED\u30FC\u30AB\u30EB\u3067\u81EA\u52D5\u691C\u51FA\u3055\u308C\u305F\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u4F7F\u7528\u300D\u3067\u8A73\u7D30\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
          "account.label": "\u30A2\u30AB\u30A6\u30F3\u30C8",
          "account.manage": "\u30A2\u30AB\u30A6\u30F3\u30C8\u7BA1\u7406",
          "stat.caption": "5\u6642\u9593\u306E\u30ED\u30FC\u30EA\u30F3\u30B0\u5229\u7528\u91CF",
          "bar.rolling": "5\u6642\u9593\u30ED\u30FC\u30EA\u30F3\u30B0",
          "bar.weekly": "\u4ECA\u9031",
          "bar.monthly": "\u4ECA\u6708",
          "usage.rateLimited": "\u4E0A\u9650\u5230\u9054",
          "usage.ok": "\u4E0A\u9650\u5185",
          "usage.atLimit": "\u4E0A\u9650\u8D85\u904E",
          "usage.unavailable": "\u5229\u7528\u91CF\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093",
          "usage.reset": "\u30EA\u30BB\u30C3\u30C8 \xB7 {time}",
          "usage.resetIn": "\u30EA\u30BB\u30C3\u30C8: \u3042\u3068{time}",
          "detail.plan": "\u30D7\u30E9\u30F3",
          "detail.planValue": "OpenCode Go",
          "detail.key": "API\u30AD\u30FC",
          "detail.updated": "\u6700\u7D42\u66F4\u65B0",
          "models.title": "\u5229\u7528\u53EF\u80FD\u306A\u30E2\u30C7\u30EB",
          "models.count": "{n}\u500B\u306E\u30E2\u30C7\u30EB",
          "accounts.title": "\u30A2\u30AB\u30A6\u30F3\u30C8",
          "accounts.back": "\u623B\u308B",
          "accounts.rename": "\u540D\u524D\u3092\u5909\u66F4",
          "accounts.remove": "\u524A\u9664",
          "accounts.confirm": "\u78BA\u8A8D?",
          "accounts.addKeyPlaceholder": "\u65B0\u3057\u3044API\u30AD\u30FC\u3092\u8CBC\u308A\u4ED8\u3051\u2026",
          "accounts.addNamePlaceholder": "\u540D\u524D\uFF08\u4EFB\u610F\uFF09",
          "accounts.add": "\u8FFD\u52A0",
          "accounts.hint": "手動で追加したキーはこのマシンの VS Code シークレットストレージに保存されます。",
          "tag.local": "\u30ED\u30FC\u30AB\u30EB",
          "tag.manual": "\u624B\u52D5",
          "footer": "opencode.ai \xB7 zen/go/v1/usage",
          "refresh": "\u66F4\u65B0",
          "notify.copied": "API\u30AD\u30FC\u3092\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F",
          "account.defaultName": "Go\u30D7\u30E9\u30F3 {n}",
          "time.soon": "\u307E\u3082\u306A\u304F\u30EA\u30BB\u30C3\u30C8",
          "time.dH": "{d}\u65E5 {h}\u6642\u9593",
          "time.hM": "{h}\u6642\u9593 {m}\u5206",
          "time.mS": "{m}\u5206 {s}\u79D2",
          "time.dHMS": "{d}\u65E5 {h}\u6642\u9593 {m}\u5206 {s}\u79D2",
          "error.auth": "API\u30AD\u30FC\u304C\u7121\u52B9\u307E\u305F\u306F\u671F\u9650\u5207\u308C\u3067\u3059\u3002opencode.ai\u30B3\u30F3\u30BD\u30FC\u30EB\u3067\u518D\u751F\u6210\u3057\u300C\u30A2\u30AB\u30A6\u30F3\u30C8\u300D\u3067\u7F6E\u304D\u63DB\u3048\u3066\u304F\u3060\u3055\u3044\u3002",
          "error.notSubscribed": "\u3053\u306E\u30AD\u30FC\u3067\u306FOpenCode Go\u30B5\u30D6\u30B9\u30AF\u30EA\u30D7\u30B7\u30E7\u30F3\u304C\u6709\u52B9\u306B\u306A\u3063\u3066\u3044\u307E\u305B\u3093\u3002opencode.ai/go\u3067\u5951\u7D04\u3059\u308B\u304B\u3001\u5225\u306E\u30A2\u30AB\u30A6\u30F3\u30C8\u306B\u5207\u308A\u66FF\u3048\u3066\u304F\u3060\u3055\u3044\u3002",
          "error.network": "\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u63A5\u7D9A\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u307E\u305F\u306F\u30D7\u30ED\u30AD\u30B7\u8A2D\u5B9A\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
          "error.openConsole": "\u30B3\u30F3\u30BD\u30FC\u30EB\u3092\u958B\u304F",
          "error.saveKey": "\u4FDD\u5B58\u3057\u3066\u518D\u8A66\u884C",
          "error.keyNote": "\u4E00\u5EA6\u3060\u3051\u8A2D\u5B9A\u3059\u308C\u3070OK\u3002\u30AD\u30FC\u306F\u30ED\u30FC\u30AB\u30EB\u306E\u79D8\u5BC6\u30B9\u30C8\u30EC\u30FC\u30B8\u306B\u4FDD\u5B58\u3055\u308C\u307E\u3059\uFF08\u7121\u52B9\u306B\u306A\u3063\u305F\u6642\u306E\u307F\u4EA4\u63DB\uFF09",
          "lang.switch": "\u8A00\u8A9E\u3092\u5207\u308A\u66FF\u3048",
          "lang.followSystem": "\u30B7\u30B9\u30C6\u30E0\u306B\u5F93\u3046",
          "ctx.title": "\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u8A2D\u5B9A",
          "ctx.note": "opencode.json\u306B\u66F8\u304D\u8FBC\u307F\u3001\u65B0\u898F\u30BB\u30C3\u30B7\u30E7\u30F3\u306B\u53CD\u6620\u3055\u308C\u307E\u3059",
          "ctx.save": "\u4FDD\u5B58",
          "ctx.saved": "\u4FDD\u5B58\u3057\u307E\u3057\u305F",
          "ctx.open": "\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u3092\u958B\u304F",
          "ctx.noConfig": "opencode.json\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002opencode\u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3059\u308B\u304B\u3001\u8A2D\u5B9A\u3092\u624B\u52D5\u3067\u4F5C\u6210\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
          "ctx.option": "{n}K",
          "usage.quotaTitle": "使用済みクォータ",
          "overview.title": "アカウント一覧",
          "overview.count": "{n}件のアカウント",
          "overview.invalid": "\u30AD\u30FC\u7121\u52B9",
          "overview.network": "\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u30A8\u30E9\u30FC",
          "overview.error": "\u30A8\u30E9\u30FC",
          "overview.checking": "\u540C\u671F\u4E2D\u2026",
          "ov.short.rolling": "5h",
          "ov.short.weekly": "\u9031",
          "ov.short.monthly": "\u6708",
          "gw.title": "\u30B2\u30FC\u30C8\u30A6\u30A7\u30A4\u9023\u643A",
          "gw.filterSub": "\u30B5\u30D6\u30B9\u30AF\u306E\u307F",
          "gw.filterAll": "\u5168\u30B9\u30C6\u30FC\u30B7\u30E7\u30F3",
          "gw.summary": "{up}/{total} \u30AA\u30F3\u30E9\u30A4\u30F3",
          "gw.up": "\u30AA\u30F3\u30E9\u30A4\u30F3",
          "gw.down": "\u906E\u65AD",
          "gw.cooling": "\u30AF\u30FC\u30EB\u30C0\u30A6\u30F3",
          "gw.disabled": "\u7121\u52B9",
          "gw.quota": "\u30AF\u30A9\u30FC\u30BF\u67AF\u6E07",
          "gw.health": "\u30B9\u30B3\u30A2 {p}",
          "gw.latency": "{v} ms",
          "gw.balance": "${v}",
          "gw.reset": "\u30EA\u30BB\u30C3\u30C8",
          "gw.resetDone": "{name} \u3092\u30EA\u30BB\u30C3\u30C8\u3057\u307E\u3057\u305F\u3001\u78BA\u8A8D\u4E2D\u2026",
          "gw.resetFail": "\u30EA\u30BB\u30C3\u30C8\u5931\u6557: {msg}",
          "gw.notConfigured": "\u30B2\u30FC\u30C8\u30A6\u30A7\u30A4URL\u304C\u672A\u8A2D\u5B9A\u3067\u3059\uFF08opencodeGo.gatewayUrl\u3092\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\uFF09",
          "gw.note": "\u30ED\u30FC\u30AB\u30EB\u4E2D\u7D99\u30B2\u30FC\u30C8\u30A6\u30A7\u30A4 /admin/status \u306E\u30C7\u30FC\u30BF",
          "gw.error": "\u30B2\u30FC\u30C8\u30A6\u30A7\u30A4\u306B\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093: {msg}",
          "gw.noSub": "\u30B5\u30D6\u30B9\u30AF\u30EA\u30D7\u30B7\u30E7\u30F3\u30B9\u30C6\u30FC\u30B7\u30E7\u30F3\u304C\u3042\u308A\u307E\u305B\u3093",
          "gw.noStations": "\u30B9\u30C6\u30FC\u30B7\u30E7\u30F3\u304C\u3042\u308A\u307E\u305B\u3093",
          "notify.warn": "{name}: {window}\u306E\u5229\u7528\u91CF\u304C{p}%\u306B\u9054\u3057\u307E\u3057\u305F",
          "notify.crit": "{name}: {window}\u306E\u5229\u7528\u91CF\u304C{p}%\u3067\u3059\u3002\u4E0A\u9650\u9593\u8FD1\u3067\u3059",
          "notify.limited": "{name}: {window}\u304C\u4E0A\u9650\u5230\u9054\u3001\u30AF\u30A9\u30FC\u30BF\u30EA\u30BB\u30C3\u30C8\u5F8C\u306B\u5FA9\u65E7\u3057\u307E\u3059",
          "notify.auth": "{name}: API\u30AD\u30FC\u304C\u7121\u52B9\u3067\u3059\u3002\u4EA4\u63DB\u3057\u3066\u304F\u3060\u3055\u3044",
          "notify.notSubscribed": "{name}: OpenCode Go\u672A\u5951\u7D04",
          "notify.view": "\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9\u3092\u958B\u304F",
          "sb.title": "OpenCode Go \u30B5\u30D6\u30B9\u30AF\u30EA\u30D7\u30B7\u30E7\u30F3",
          "sb.item": "{name} {p}%",
          "sb.windows": "5h {r}% \xB7 \u9031 {w}% \xB7 \u6708 {m}%",
          "sb.limited": "\uFF08\u4E0A\u9650\u5230\u9054\uFF09",
          "sb.invalid": "\u30AD\u30FC\u7121\u52B9",
          "sb.notSubscribed": "\u672A\u5951\u7D04",
          "sb.network": "\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u30A8\u30E9\u30FC",
          "sb.click": "\u30AF\u30EA\u30C3\u30AF\u3067\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9\u3092\u958B\u304F"
        }
      };
      function detect2(lang) {
        const l = String(lang || "").toLowerCase().replace("_", "-");
        if (l === "zh-cn" || l === "zh" || l === "zh-hans")
          return "zh-cn";
        if (l === "zh-tw" || l === "zh-hk" || l === "zh-hant")
          return "zh-tw";
        if (l === "ko" || l === "ko-kr")
          return "ko";
        if (l === "ja" || l === "ja-jp")
          return "ja";
        return "en";
      }
      function t2(lang, key, params) {
        const dict = dicts2[detect2(lang)] || dicts2.en;
        let text = dict[key];
        if (text === void 0)
          text = dicts2.en[key] ?? key;
        if (params) {
          for (const [k, v] of Object.entries(params)) {
            text = text.replaceAll(`{${k}}`, String(v));
          }
        }
        return text;
      }
      function keys2() {
        const base = Object.keys(dicts2.en);
        return {
          base,
          languages: Object.keys(dicts2),
          complete: Object.fromEntries(
            Object.entries(dicts2).map(([lang, dict]) => [
              lang,
              base.filter((k) => dict[k] === void 0)
            ])
          )
        };
      }
      return { dicts: dicts2, detect: detect2, t: t2, keys: keys2 };
    });
  }
});

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode4 = __toESM(require("vscode"));
var {
  OFFICIAL_API_BASE_URL,
  updateModelContextFile,
  validateLoopbackGatewayUrl
} = require("./runtime-security.cjs");

// src/panel.ts
var vscode3 = __toESM(require("vscode"));

// src/api.ts
var ApiError = class extends Error {
  constructor(message, kind) {
    super(message);
    this.kind = kind;
    this.name = "ApiError";
  }
};
var ZenApi = class {
  constructor() {
    this.baseUrl = OFFICIAL_API_BASE_URL;
  }
  async getUsage(key) {
    const res = await this.request("/zen/go/v1/usage", key);
    const json = await res.json();
    if (!res.ok) {
      if (res.status === 401) {
        throw new ApiError(json?.error?.message ?? "Unauthorized", "auth");
      }
      if (res.status === 403) {
        throw new ApiError(json?.error?.message ?? "OpenCode Go subscription required.", "not-subscribed");
      }
      throw new ApiError(`HTTP ${res.status}: ${json?.error?.message ?? ""}`, "http");
    }
    return json;
  }
  async getModels() {
    const res = await this.request("/zen/go/v1/models");
    if (!res.ok) {
      throw new ApiError(`HTTP ${res.status}`, "http");
    }
    const json = await res.json();
    return json.data ?? [];
  }
  async request(path4, key) {
    let res;
    try {
      res = await fetch(`${this.baseUrl}${path4}`, {
        headers: key ? { Authorization: `Bearer ${key}` } : {},
        signal: AbortSignal.timeout(15e3)
        // 避免网络挂起导致一直转圈
      });
    } catch (err) {
      throw new ApiError(`\u65E0\u6CD5\u8FDE\u63A5 ${this.baseUrl}: ${err.message}`, "network");
    }
    return res;
  }
};
var USAGE_WINDOWS = ["rolling", "weekly", "monthly"];
function normalizeUsage(raw) {
  if (!raw || typeof raw !== "object")
    throw new ApiError("Invalid usage response: missing usage data", "unknown");
  const usage = {};
  for (const key of USAGE_WINDOWS) {
    const win = raw[key];
    const rawPercent = win?.percent;
    const percent = Number(rawPercent);
    if (!win || typeof win !== "object" || rawPercent === null || rawPercent === void 0 || rawPercent === "" || !Number.isFinite(percent))
      throw new ApiError(`Invalid usage response: ${key} percentage is missing`, "unknown");
    usage[key] = {
      ...win,
      percent,
      status: typeof win.status === "string" ? win.status : "ok",
      resetsAt: typeof win.resetsAt === "string" ? win.resetsAt : null
    };
  }
  return usage;
}

// src/accounts.ts
var crypto = __toESM(require("crypto"));

// src/keys.ts
var fs = __toESM(require("fs"));
var os = __toESM(require("os"));
var path = __toESM(require("path"));
function candidatePaths() {
  const home = os.homedir();
  const paths = [];
  const localAppData = process.env.LOCALAPPDATA;
  if (localAppData)
    paths.push(path.join(localAppData, "opencode", "auth.json"));
  const xdgData = process.env.XDG_DATA_HOME;
  if (xdgData)
    paths.push(path.join(xdgData, "opencode", "auth.json"));
  paths.push(path.join(home, ".local", "share", "opencode", "auth.json"));
  paths.push(path.join(home, ".config", "opencode", "auth.json"));
  return [...new Set(paths)];
}
var INTERESTING_PROVIDERS = ["opencode-go", "opencode"];
function findLocalKeys() {
  const seen = /* @__PURE__ */ new Set();
  const result = [];
  for (const file of candidatePaths()) {
    let raw;
    try {
      raw = fs.readFileSync(file, "utf8");
    } catch {
      continue;
    }
    let auth;
    try {
      auth = JSON.parse(raw);
    } catch {
      continue;
    }
    for (const provider2 of INTERESTING_PROVIDERS) {
      const entry = auth[provider2];
      const key = entry?.key || entry?.access;
      if (key && !seen.has(key)) {
        seen.add(key);
        result.push({ key, provider: provider2, path: file });
      }
    }
  }
  return result;
}
function maskKey(key) {
  if (key.length <= 8)
    return "\u2022\u2022\u2022\u2022";
  return `${key.slice(0, 4)}\u2022\u2022\u2022\u2022${key.slice(-4)}`;
}

// src/accounts.ts
var ACCOUNTS_SECRET = "opencodeGo.accounts.v1";
var ACTIVE_ACCOUNT_STATE = "opencodeGo.activeAccountId";
var AccountStore = class {
  constructor(secrets, workspaceState) {
    this.secrets = secrets;
    this.workspaceState = workspaceState;
  }
  manualAccounts = [];
  localAccounts = [];
  loaded = false;
  /** 加载手动账户 + 探测本地账户（幂等，可重复调用） */
  async init() {
    if (this.loaded)
      return;
    this.manualAccounts = await this.loadManual();
    // 本机 key 自动检测已关闭：只使用手动添加的账户，列表完全由用户掌控
    this.localAccounts = [];
    this.loaded = true;
  }
  async list() {
    await this.init();
    const seen = /* @__PURE__ */ new Set();
    const merged = [];
    for (const a of [...this.localAccounts, ...this.manualAccounts]) {
      if (seen.has(a.key))
        continue;
      seen.add(a.key);
      merged.push(a);
    }
    return merged;
  }
  async metaList() {
    return (await this.list()).map((a) => ({
      id: a.id,
      name: a.name,
      keyMasked: maskKey(a.key),
      source: a.source,
      provider: a.provider
    }));
  }
  async get(id) {
    return (await this.list()).find((a) => a.id === id);
  }
  async getActiveId() {
    await this.init();
    const saved = this.workspaceState.get(ACTIVE_ACCOUNT_STATE);
    const accounts = await this.list();
    if (saved && accounts.some((a) => a.id === saved))
      return saved;
    const first = accounts[0];
    return first ? first.id : "";
  }
  async setActive(id) {
    await this.workspaceState.update(ACTIVE_ACCOUNT_STATE, id);
  }
  async addManual(key, name) {
    await this.init();
    const trimmed = key.trim();
    const existing = (await this.list()).find((a) => a.key === trimmed);
    if (existing) {
      await this.setActive(existing.id);
      return existing;
    }
    const account = {
      id: `manual:${crypto.randomUUID()}`,
      name: (name?.trim() || `Go \u5957\u9910 ${this.manualAccounts.length + 1}`).slice(0, 40),
      key: trimmed,
      source: "manual"
    };
    this.manualAccounts.push(account);
    await this.persist();
    await this.setActive(account.id);
    return account;
  }
  async rename(id, name) {
    await this.init();
    const account = this.manualAccounts.find((a) => a.id === id);
    if (account) {
      account.name = (name.trim() || account.name).slice(0, 40);
      await this.persist();
    }
  }
  async remove(id) {
    await this.init();
    const wasActive = this.workspaceState.get(ACTIVE_ACCOUNT_STATE) === id;
    const before = this.manualAccounts.length;
    this.manualAccounts = this.manualAccounts.filter((a) => a.id !== id);
    if (this.manualAccounts.length !== before)
      await this.persist();
    if (wasActive) {
      const first = (await this.list())[0];
      await this.setActive(first ? first.id : "");
    }
  }
  async loadManual() {
    try {
      const raw = await this.secrets.get(ACCOUNTS_SECRET);
      if (!raw)
        return [];
      const parsed = JSON.parse(raw);
      return parsed.filter((a) => typeof a?.key === "string" && a.key.trim()).map((a) => ({
        id: a.id || `manual:${crypto.randomUUID()}`,
        name: a.name || "Go \u5957\u9910",
        key: a.key,
        source: "manual"
      }));
    } catch {
      return [];
    }
  }
  async persist() {
    const data = this.manualAccounts.map((a) => ({
      id: a.id,
      name: a.name,
      key: a.key
    }));
    await this.secrets.store(ACCOUNTS_SECRET, JSON.stringify(data));
  }
};
var PROVIDER_NAMES = {
  "opencode-go": "OpenCode Go",
  opencode: "OpenCode Zen"
};
function toAccount(local) {
  return {
    id: `local:${local.provider}:${hash(local.path)}`,
    name: PROVIDER_NAMES[local.provider] ?? local.provider,
    key: local.key,
    source: "local",
    provider: local.provider
  };
}
function hash(s) {
  return crypto.createHash("sha1").update(s).digest("hex").slice(0, 8);
}

// src/opencodeConfig.ts
var fs3 = __toESM(require("fs"));
var os3 = __toESM(require("os"));
var path3 = __toESM(require("path"));
function findConfigPath() {
  const home = os3.homedir();
  const candidates = [];
  const appData = process.env.APPDATA;
  if (appData)
    candidates.push(path3.join(appData, "opencode", "opencode.json"));
  const xdgConfig = process.env.XDG_CONFIG_HOME;
  if (xdgConfig)
    candidates.push(path3.join(xdgConfig, "opencode", "opencode.json"));
  candidates.push(path3.join(home, ".config", "opencode", "opencode.json"));
  candidates.push(path3.join(home, ".opencode", "opencode.json"));
  for (const file of candidates) {
    try {
      if (fs3.existsSync(file))
        return file;
    } catch {
    }
  }
  return void 0;
}
function readModelContexts(providerId) {
  const file = findConfigPath();
  if (!file)
    return null;
  try {
    const config = JSON.parse(fs3.readFileSync(file, "utf8"));
    const models = config.provider?.[providerId]?.models ?? {};
    const contexts = {};
    for (const [modelId, model] of Object.entries(models)) {
      const ctx = model?.limit?.context;
      if (typeof ctx === "number" && ctx > 0)
        contexts[modelId] = ctx;
    }
    return { file, contexts };
  } catch {
    return null;
  }
}
function writeModelContext(providerId, modelId, context, allowedModels) {
  const file = findConfigPath();
  if (!file) {
    return null;
  }
  return updateModelContextFile(file, providerId, modelId, context, { allowedModels });
}

// src/i18n.ts
var i18n = require_i18n();
var dicts = i18n.dicts;
var detect = i18n.detect;
var t = i18n.t;
var keys = i18n.keys;

// src/history.ts
var HISTORY_MAX_SAMPLES = 1440;
var HISTORY_MAX_ACCOUNTS = 20;
function sanitizeSample(s) {
  if (!s || typeof s !== "object")
    return null;
  const o = s;
  const t2 = typeof o.t === "number" ? o.t : NaN;
  const r = typeof o.r === "number" ? o.r : NaN;
  const w = typeof o.w === "number" ? o.w : NaN;
  const m = typeof o.m === "number" ? o.m : NaN;
  if (!Number.isFinite(t2) || !Number.isFinite(r) || !Number.isFinite(w) || !Number.isFinite(m)) {
    return null;
  }
  return { t: t2, r, w, m };
}
function recordSample(state, accountId, sample, maxSamples = HISTORY_MAX_SAMPLES) {
  const existing = state[accountId] ?? [];
  const last = existing[existing.length - 1];
  if (last && sample.t <= last.t)
    return state;
  const next = existing.length >= maxSamples ? existing.slice(existing.length - maxSamples + 1) : existing.slice();
  next.push(sample);
  return { ...state, [accountId]: next };
}
function pruneAccounts(state, knownIds, maxAccounts = HISTORY_MAX_ACCOUNTS) {
  const known = new Set(knownIds);
  const entries = Object.entries(state).filter(([id]) => known.has(id));
  if (entries.length <= maxAccounts) {
    return entries.length === Object.keys(state).length ? state : Object.fromEntries(entries);
  }
  entries.sort((a, b) => lastT(b[1]) - lastT(a[1]));
  return Object.fromEntries(entries.slice(0, maxAccounts));
}
function lastT(samples) {
  return samples.length ? samples[samples.length - 1].t : 0;
}
function downsample(samples, maxPoints) {
  if (samples.length <= maxPoints || maxPoints < 2)
    return samples.slice();
  const out = [];
  const step = (samples.length - 1) / (maxPoints - 1);
  for (let i = 0; i < maxPoints; i++) {
    out.push(samples[Math.round(i * step)]);
  }
  return out;
}

// src/historyStore.ts
var HISTORY_KEY = "opencodeGo.history.v1";
var HistoryStore = class {
  constructor(storage) {
    this.storage = storage;
  }
  /** 记录一个采样点（纯逻辑 + 持久化） */
  record(accountId, sample) {
    const next = recordSample(this.load(), accountId, sample);
    void this.storage.update(HISTORY_KEY, next);
  }
  /** 某账户的全部采样点（时间升序） */
  get(accountId) {
    return this.load()[accountId] ?? [];
  }
  /** 全量数据 */
  all() {
    return this.load();
  }
  /** 裁剪账户维度（账户被移除后清理，防止膨胀） */
  prune(knownIds) {
    const next = pruneAccounts(this.load(), knownIds);
    void this.storage.update(HISTORY_KEY, next);
  }
  load() {
    const raw = this.storage.get(HISTORY_KEY);
    const out = {};
    if (raw && typeof raw === "object") {
      for (const [id, arr] of Object.entries(raw)) {
        if (!Array.isArray(arr))
          continue;
        const samples = arr.map(sanitizeSample).filter((s) => s !== null).slice(-HISTORY_MAX_SAMPLES);
        if (samples.length)
          out[id] = samples;
      }
    }
    return out;
  }
};

// src/gateway.ts
var GatewayError = class extends Error {
  constructor(message, kind) {
    super(message);
    this.kind = kind;
    this.name = "GatewayError";
  }
};
var GatewayClient = class {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  async getStatus() {
    const res = await this.request("/admin/status");
    const json = await res.json().catch(() => ({}));
    return {
      summary: json?.summary ?? { total: 0, up: 0 },
      stations: Array.isArray(json?.stations) ? json.stations : []
    };
  }
  async resetStation(name) {
    await this.request(`/admin/station/${encodeURIComponent(name)}/reset`, "POST");
  }
  async request(path4, method = "GET") {
    let res;
    try {
      res = await fetch(`${this.baseUrl.replace(/\/$/, "")}${path4}`, {
        method,
        signal: AbortSignal.timeout(1e4)
      });
    } catch (err) {
      throw new GatewayError(`\u65E0\u6CD5\u8FDE\u63A5\u7F51\u5173 ${this.baseUrl}: ${err.message}`, "network");
    }
    if (!res.ok) {
      throw new GatewayError(`HTTP ${res.status}`, "http");
    }
    return res;
  }
};
function toStationView(s) {
  return {
    name: String(s?.name ?? ""),
    billing: String(s?.billing ?? ""),
    enabled: Boolean(s?.enabled),
    status: String(s?.status ?? ""),
    quotaExhausted: Boolean(s?.quota_exhausted),
    quotaError: String(s?.quota_error ?? ""),
    healthScore: Number(s?.health_score ?? 0),
    emaLatency: typeof s?.ema_latency === "number" ? s.ema_latency : null,
    balance: typeof s?.balance === "number" ? s.balance : null,
    rank: Number(s?.rank ?? 0)
  };
}

// src/statusBar.ts
var vscode = __toESM(require("vscode"));
var StatusBarManager = class {
  item;
  constructor() {
    this.item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 90);
    this.item.name = "OpenCode Go";
    this.item.command = "opencodeGo.showDashboard";
  }
  update(summaries, activeId, lang, thresholds) {
    if (summaries.length === 0) {
      this.item.hide();
      return;
    }
    const active = summaries.find((s) => s.id === activeId) ?? summaries[0];
    if (active.kind !== "ok") {
      this.item.text = "$(pulse) Go";
      this.item.color = new vscode.ThemeColor("statusBarItem.errorForeground");
      this.item.tooltip = this.buildTooltip(summaries, activeId, lang);
      this.item.show();
      return;
    }
    const rawPercent = Number.isFinite(active.percent) ? active.percent : 0;
    const pct = Math.min(100, Math.max(0, Math.round(rawPercent)));
    if (active.limited || rawPercent >= thresholds.crit) {
      this.item.color = new vscode.ThemeColor("statusBarItem.errorForeground");
    } else if (rawPercent >= thresholds.warn) {
      this.item.color = new vscode.ThemeColor("statusBarItem.warningForeground");
    } else {
      this.item.color = void 0;
    }
    this.item.text = `$(pulse) ${t(lang, "sb.item", { name: "Go", p: pct })}`;
    this.item.tooltip = this.buildTooltip(summaries, activeId, lang);
    this.item.show();
  }
  buildTooltip(summaries, activeId, lang) {
    const md = new vscode.MarkdownString();
    md.appendMarkdown(`**${t(lang, "sb.title")}**

`);
    for (const s of summaries) {
      const prefix = s.id === activeId ? "$(circle-filled)" : "$(circle-outline)";
      if (s.kind !== "ok") {
        const label = s.kind === "auth" ? t(lang, "sb.invalid") : s.kind === "not-subscribed" ? t(lang, "sb.notSubscribed") : t(lang, "sb.network");
        md.appendMarkdown(`${prefix} **${escapeMd(s.name)}** \u2014 ${label}
`);
      } else {
        const u = s.usage ?? { r: 0, w: 0, m: 0 };
        const detail = t(lang, "sb.windows", { r: u.r, w: u.w, m: u.m }) + (s.limited ? ` ${t(lang, "sb.limited")}` : "");
        md.appendMarkdown(`${prefix} **${escapeMd(s.name)}** \u2014 ${detail}
`);
      }
    }
    md.appendMarkdown(`
${t(lang, "sb.click")}`);
    md.isTrusted = false;
    return md;
  }
  /** 测试钩子：返回内部 StatusBarItem */
  getItemForTest() {
    return this.item;
  }
  dispose() {
    this.item.dispose();
  }
};
function escapeMd(s) {
  return s.replace(/[\\`*_{}[\]()#+\-.!|]/g, "\\$&");
}

// src/notify.ts
var vscode2 = __toESM(require("vscode"));
var WINDOWS = [
  { key: "rolling", i18n: "bar.rolling" },
  { key: "weekly", i18n: "bar.weekly" },
  { key: "monthly", i18n: "bar.monthly" }
];
var HYSTERESIS = 5;
var MAX_NOTIFY_PER_CYCLE = 2;
var UsageNotifier = class {
  /** `${accountId}:${window}` → 已通知的最高档位（0 无 / 1 warn / 2 crit） */
  windowTier = /* @__PURE__ */ new Map();
  /** `${accountId}:err` → 是否已通知过 key 失效类错误 */
  errorNotified = /* @__PURE__ */ new Set();
  evaluate(settings, entries, lang) {
    if (!settings.enabled)
      return;
    const events = [];
    for (const entry of entries) {
      if (entry.kind !== "ok") {
        if (entry.kind === "auth" || entry.kind === "not-subscribed") {
          const errKey = `${entry.id}:err`;
          if (!this.errorNotified.has(errKey)) {
            this.errorNotified.add(errKey);
            events.push(
              entry.kind === "auth" ? t(lang, "notify.auth", { name: entry.name }) : t(lang, "notify.notSubscribed", { name: entry.name })
            );
          }
        }
        continue;
      }
      this.errorNotified.delete(`${entry.id}:err`);
      const usage = entry.usage;
      if (!usage)
        continue;
      for (const w of WINDOWS) {
        const win = usage[w.key];
        if (!win)
          continue;
        const tierKey = `${entry.id}:${w.key}`;
        const prev = this.windowTier.get(tierKey) ?? 0;
        const p = Number(win.percent);
        if (!Number.isFinite(p))
          continue;
        const windowName = t(lang, w.i18n);
        if (win.status === "rate-limited" && prev < 2) {
          this.windowTier.set(tierKey, 2);
          events.push(t(lang, "notify.limited", { name: entry.name, window: windowName }));
        } else if (p >= settings.crit && prev < 2) {
          this.windowTier.set(tierKey, 2);
          events.push(t(lang, "notify.crit", { name: entry.name, window: windowName, p }));
        } else if (p >= settings.warn && prev < 1) {
          this.windowTier.set(tierKey, 1);
          events.push(t(lang, "notify.warn", { name: entry.name, window: windowName, p }));
        } else if (p < settings.warn - HYSTERESIS) {
          this.windowTier.set(tierKey, 0);
        }
      }
    }
    const viewLabel = t(lang, "notify.view");
    for (const message of events.slice(0, MAX_NOTIFY_PER_CYCLE)) {
      void vscode2.window.showWarningMessage(message, viewLabel).then((pick) => {
        if (pick === viewLabel)
          void vscode2.commands.executeCommand("opencodeGo.showDashboard");
      });
    }
  }
  /** 测试钩子：当前已通知档位快照 */
  getTiersForTest() {
    return Object.fromEntries(this.windowTier);
  }
};

// src/panel.ts
var HISTORY_PUSH_POINTS = 480;
var DashboardProvider = class _DashboardProvider {
  constructor(context) {
    this.context = context;
    this.store = new AccountStore(context.secrets, context.workspaceState);
    this.history = new HistoryStore(context.globalState);
    this.statusBar = new StatusBarManager();
    this.notifier = new UsageNotifier();
  }
  static viewType = "opencodeGo.dashboard";
  view;
  timer;
  store;
  history;
  statusBar;
  notifier;
  lastState;
  activeKey;
  refreshGeneration = 0;
  /** 手动语言覆盖的 globalState 键；空字符串 = 跟随系统 */
  static LANG_OVERRIDE_KEY = "opencodeGo.overrideLanguage";
  /** 首次引导跳过标记（用户选择"使用本机账户"后不再打扰） */
  static SKIP_ONBOARDING_KEY = "opencodeGo.skipOnboarding";
  /** 当前界面语言（zh-cn/zh-tw/en/ko/ja）：手动覆盖优先，否则跟随 VS Code */
  get lang() {
    const override = this.context.globalState.get(_DashboardProvider.LANG_OVERRIDE_KEY, "");
    return override && override in dicts ? override : detect(vscode3.env.language);
  }
  tr(key, params) {
    return t(this.lang, key, params);
  }
  resolveWebviewView(view) {
    this.view = view;
    this.webviewReady = false;
    view.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode3.Uri.joinPath(this.context.extensionUri, "media")]
    };
    view.webview.html = this.renderHtml(view.webview);
    view.webview.onDidReceiveMessage((msg) => void this.handleMessage(msg));
    view.onDidChangeVisibility(() => {
      if (view.visible) {
        this.scheduleRefresh(true);
      }
    });
    view.onDidDispose(() => {
      this.view = void 0;
    });
    this.scheduleRefresh(true);
  }
  /** 启动后台轮询（扩展激活时调用；与 webview 是否打开无关） */
  startMonitor() {
    this.scheduleRefresh(true);
  }
  refresh() {
    void this.refreshNow();
  }
  dispose() {
    this.stopTimer();
    this.statusBar.dispose();
  }
  // ---------------- 集成测试钩子 ----------------
  getViewForTest() {
    return this.view;
  }
  getLastStateForTest() {
    return this.lastState;
  }
  getStatusBarForTest() {
    return this.statusBar;
  }
  getNotifierForTest() {
    return this.notifier;
  }
  normalizeUsageForTest(raw) {
    return normalizeUsage(raw);
  }
  layoutDebugResult;
  getLayoutDebugResultForTest() {
    return this.layoutDebugResult;
  }
  webviewReady = false;
  isWebviewReadyForTest() {
    return this.webviewReady;
  }
  openConsole() {
    void vscode3.env.openExternal(vscode3.Uri.parse("https://console.opencode.ai"));
  }
  // ---------------- 消息处理 ----------------
  async handleMessage(msg) {
    switch (msg?.type) {
      case "ready":
        this.webviewReady = true;
        await this.scheduleRefresh(true);
        break;
      case "__layoutResult":
        this.layoutDebugResult = msg;
        break;
      case "refresh":
        await this.refreshNow();
        break;
      case "openUrl":
        if (typeof msg.url === "string") {
          try {
            const uri = vscode3.Uri.parse(msg.url);
            const host = uri.authority.toLowerCase().split(":")[0];
            if (uri.scheme === "https" && (host === "opencode.ai" || host.endsWith(".opencode.ai"))) {
              void vscode3.env.openExternal(uri);
            }
          } catch {
          }
        }
        break;
      case "copyKey": {
        const key = await this.currentKey();
        if (key) {
          await vscode3.env.clipboard.writeText(key);
          void vscode3.window.showInformationMessage(this.tr("notify.copied"));
        }
        break;
      }
      case "setActiveAccount":
        if (typeof msg.id === "string") {
          await this.store.setActive(msg.id);
          this.activeKey = void 0;
          await this.refreshNow();
        }
        break;
      case "addAccount":
        if (typeof msg.key === "string" && msg.key.trim()) {
          const accounts = await this.store.metaList();
          const name = typeof msg.name === "string" && msg.name.trim() ? msg.name : this.tr("account.defaultName", { n: accounts.filter((a) => a.source === "manual").length + 1 });
          await this.store.addManual(msg.key, name);
          this.activeKey = void 0;
          await this.refreshNow();
        }
        break;
      case "renameAccount":
        if (typeof msg.id === "string" && typeof msg.name === "string") {
          await this.store.rename(msg.id, msg.name);
          await this.pushAccounts();
        }
        break;
      case "removeAccount":
        if (typeof msg.id === "string") {
          await this.store.remove(msg.id);
          this.activeKey = void 0;
          this.history.prune((await this.store.list()).map((a) => a.id));
          await this.refreshNow();
        }
        break;
      case "setLanguage":
        if (typeof msg.lang === "string" && this.view) {
          const lang = msg.lang === "" ? "" : detect(msg.lang);
          await this.context.globalState.update(_DashboardProvider.LANG_OVERRIDE_KEY, lang);
          this.view.webview.html = this.renderHtml(this.view.webview);
        }
        break;
      case "saveContext":
        if (typeof msg.model === "string" && typeof msg.context === "number" && this.view) {
          const providerId = "opencode-go";
          try {
            const allowedModels = new Set(
              (this.lastState?.models ?? []).map((id) => String(id).replace(/^(?:opencode-go|opencode)\//, ""))
            );
            const result = writeModelContext(providerId, msg.model, msg.context, allowedModels);
            if (!result) {
              void vscode3.window.showWarningMessage(this.tr("ctx.noConfig"));
              break;
            }
            await this.pushModelContexts();
          } catch (err) {
            void vscode3.window.showErrorMessage(`opencode.json \u5199\u5165\u5931\u8D25: ${err.message}`);
          }
        }
        break;
      case "openConfig": {
        const file = findConfigPath();
        if (file) {
          const uri = vscode3.Uri.file(file);
          const doc = await vscode3.workspace.openTextDocument(uri);
          await vscode3.window.showTextDocument(doc, { preview: false });
        } else {
          void vscode3.window.showInformationMessage(this.tr("ctx.noConfig"));
        }
        break;
      }
      case "skipOnboarding":
        await this.context.globalState.update(_DashboardProvider.SKIP_ONBOARDING_KEY, true);
        await this.pushState({ skipOnboarding: true });
        break;
      case "resetStation": {
        if (typeof msg.name !== "string")
          break;
        let gatewayUrl;
        try {
          gatewayUrl = validateLoopbackGatewayUrl(vscode3.workspace.getConfiguration("opencodeGo").get("gatewayUrl") ?? "");
        } catch (err) {
          void vscode3.window.showErrorMessage(this.tr("gw.resetFail", { name: msg.name, msg: err.message }));
          break;
        }
        if (!gatewayUrl) {
          void vscode3.window.showInformationMessage(this.tr("gw.notConfigured"));
          break;
        }
        const client = new GatewayClient(gatewayUrl);
        try {
          await client.resetStation(msg.name);
          void vscode3.window.showInformationMessage(this.tr("gw.resetDone", { name: msg.name }));
        } catch (err) {
          void vscode3.window.showErrorMessage(this.tr("gw.resetFail", { name: msg.name, msg: err.message }));
        }
        if (this.view?.visible) {
          const gateway = await this.fetchGateway(gatewayUrl);
          this.postState({ gateway });
        }
        break;
      }
    }
  }
  // ---------------- 数据 ----------------
  async currentKey() {
    if (this.activeKey)
      return this.activeKey;
    const id = await this.store.getActiveId();
    if (!id)
      return void 0;
    const account = await this.store.get(id);
    this.activeKey = account?.key;
    return this.activeKey;
  }
  async refreshNow() {
    const generation = ++this.refreshGeneration;
    const accountMetas = await this.store.metaList();
    const requestedActiveId = await this.store.getActiveId();
    if (generation !== this.refreshGeneration)
      return;
    const activeAccount = requestedActiveId ? accountMetas.find((a) => a.id === requestedActiveId) ?? null : null;
    const cachedEntry = requestedActiveId ? this.lastState?.usages?.[requestedActiveId] : void 0;
    const sameAccount = this.lastState?.usageAccountId === requestedActiveId;
    const cachedUsage = sameAccount ? this.lastState?.usage ?? null : cachedEntry?.kind === "ok" ? cachedEntry.usage : null;
    await this.pushState({
      activeAccount,
      accounts: accountMetas,
      loading: true,
      usage: cachedUsage,
      usageAccountId: cachedUsage ? requestedActiveId : null,
      error: null,
      errorKind: null
    });
    const cfg = vscode3.workspace.getConfiguration("opencodeGo");
    let gatewayUrl = "";
    try {
      gatewayUrl = validateLoopbackGatewayUrl(cfg.get("gatewayUrl") ?? "");
    } catch {
      gatewayUrl = "";
    }
    const api = new ZenApi();
    const rawNotify = cfg.get("notifyThresholds", {});
    const rawWarn = Number(rawNotify?.warn ?? 80);
    const rawCrit = Number(rawNotify?.crit ?? 100);
    const warn = Math.max(0, Math.min(100, Number.isFinite(rawWarn) ? rawWarn : 80));
    const notifySettings = {
      enabled: rawNotify?.enabled !== false,
      warn,
      crit: Math.max(warn, Math.min(100, Number.isFinite(rawCrit) ? rawCrit : 100))
    };
    const viewActive = this.view !== void 0 && this.view.visible;
    try {
      const accounts = await this.store.list();
      const activeId = await this.store.getActiveId();
      if (accounts.length === 0) {
        if (generation !== this.refreshGeneration)
          return;
        this.statusBar.update([], null, this.lang, notifySettings);
        this.postState({
          loading: false,
          error: null,
          usage: null,
          usages: {},
          notifySettings,
          history: [],
          gateway: null,
          models: null,
        });
        return;
      }
      const results = await Promise.all(
        accounts.map(async (a) => {
          try {
            const res = await api.getUsage(a.key);
            return { kind: "ok", usage: normalizeUsage(res.usage) };
          } catch (err) {
            if (err instanceof ApiError)
              return { kind: err.kind, error: err.message };
            return { kind: "unknown", error: `\u672A\u77E5\u9519\u8BEF: ${err.message}` };
          }
        })
      );
      if (generation !== this.refreshGeneration)
        return;
      const usages = {};
      accounts.forEach((a, i) => usages[a.id] = results[i]);
      const now = Date.now();
      for (const a of accounts) {
        const entry = usages[a.id];
        if (entry.kind === "ok" && entry.usage) {
          this.history.record(a.id, {
            t: now,
            r: entry.usage.rolling.percent,
            w: entry.usage.weekly.percent,
            m: entry.usage.monthly.percent
          });
        }
      }
      this.history.prune(accounts.map((a) => a.id));
      const activeEntry = activeId ? usages[activeId] : void 0;
      const usage = activeEntry?.kind === "ok" && activeEntry.usage ? activeEntry.usage : null;
      const error = usage ? null : activeEntry?.error ?? null;
      const errorKind = usage ? void 0 : activeEntry?.kind;
      const summaries = accounts.map((a) => toStatusSummary(a, usages[a.id]));
      this.statusBar.update(summaries, activeId || null, this.lang, notifySettings);
      const notifyEntries = accounts.map((a) => {
        const entry = usages[a.id];
        return {
          id: a.id,
          name: a.name,
          kind: entry?.kind ?? "unknown",
          usage: entry?.usage
        };
      });
      this.notifier.evaluate(notifySettings, notifyEntries, this.lang);
      let models = null;
      let gateway = null;
      if (viewActive) {
        const [m, gw] = await Promise.all([
          api.getModels().then((ms) => ms.map((x) => x.id)).catch(() => null),
          gatewayUrl ? this.fetchGateway(gatewayUrl) : Promise.resolve(null)
        ]);
        models = m;
        gateway = gw;
      }
      if (generation !== this.refreshGeneration)
        return;
      this.postState({
        loading: false,
        usage,
        usageAccountId: usage ? activeId : null,
        usages,
        notifySettings,
        history: downsample(this.history.get(activeId ?? ""), HISTORY_PUSH_POINTS),
        gateway,
        models,
        error,
        errorKind,
        lastUpdated: Date.now()
      });
      await this.pushModelContexts();
    } catch (err) {
      if (generation !== this.refreshGeneration)
        return;
      const message = err instanceof ApiError ? err.message : `\u672A\u77E5\u9519\u8BEF: ${err.message}`;
      const kind = err instanceof ApiError ? err.kind : "unknown";
      this.postState({
        loading: false,
        usage: null,
        usageAccountId: null,
        usages: {},
        notifySettings,
        error: message,
        errorKind: kind,
        lastUpdated: Date.now()
      });
    } finally {
      if (generation === this.refreshGeneration)
        this.scheduleRefresh(false);
    }
  }
  async fetchGateway(gatewayUrl) {
    const client = new GatewayClient(gatewayUrl);
    try {
      const status = await client.getStatus();
      return {
        url: gatewayUrl,
        error: null,
        summary: status.summary,
        stations: (status.stations ?? []).map(toStationView)
      };
    } catch (err) {
      return {
        url: gatewayUrl,
        error: err instanceof GatewayError ? err.message : err.message,
        summary: null,
        stations: []
      };
    }
  }
  async pushAccounts() {
    this.postState({
      activeAccount: await this.activeMeta(),
      accounts: await this.store.metaList()
    });
  }
  /** 推送 opencode.json 中已配置的模型上下文 */
  async pushModelContexts() {
    const result = readModelContexts("opencode-go");
    this.postState({
      modelContexts: result?.contexts ?? null,
      configFile: result?.file ?? null
    });
  }
  async activeMeta() {
    const id = await this.store.getActiveId();
    if (!id)
      return null;
    return (await this.store.metaList()).find((a) => a.id === id) ?? null;
  }
  /** 轮询：与面板可见性解耦（状态栏/通知需要后台持续刷新） */
  scheduleRefresh(immediate) {
    this.stopTimer();
    const cfg = vscode3.workspace.getConfiguration("opencodeGo");
    const interval = cfg.get("autoRefreshInterval") ?? 60;
    if (interval <= 0)
      return;
    const delay = immediate ? 0 : interval * 1e3;
    this.timer = setTimeout(() => void this.refreshNow(), delay);
  }
  stopTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = void 0;
    }
  }
  postState(patch) {
    if (!this.view)
      return;
    void this.pushState(patch);
  }
  async pushState(patch) {
    if (!this.view)
      return;
    const last = this.lastState;
    const state = {
      loading: patch.loading ?? last?.loading ?? false,
      lang: this.lang,
      dict: dicts[this.lang] ?? dicts.en,
      activeAccount: patch.activeAccount !== void 0 ? patch.activeAccount : last?.activeAccount ?? null,
      accounts: patch.accounts ?? last?.accounts ?? [],
      // 显式 null 也算值（清空错误/用量场景）；仅当 patch 未携带该字段时沿用旧值
      usage: patch.usage !== void 0 ? patch.usage : last?.usage ?? null,
      usageAccountId: patch.usageAccountId !== void 0 ? patch.usageAccountId : last?.usageAccountId ?? null,
      usages: patch.usages !== void 0 ? patch.usages : last?.usages ?? {},
      history: patch.history !== void 0 ? patch.history : last?.history ?? [],
      gateway: patch.gateway !== void 0 ? patch.gateway : last?.gateway ?? null,
      notifySettings: patch.notifySettings ?? last?.notifySettings ?? { enabled: true, warn: 80, crit: 100 },
      modelContexts: patch.modelContexts !== void 0 ? patch.modelContexts : last?.modelContexts ?? null,
      configFile: patch.configFile !== void 0 ? patch.configFile : last?.configFile ?? null,
      skipOnboarding: patch.skipOnboarding ?? last?.skipOnboarding ?? (this.context.globalState.get(_DashboardProvider.SKIP_ONBOARDING_KEY) ?? false),
      models: patch.models !== void 0 ? patch.models : last?.models ?? null,
      error: patch.error !== void 0 ? patch.error : last?.error ?? null,
      errorKind: patch.errorKind !== void 0 ? patch.errorKind : last?.errorKind,
      lastUpdated: patch.lastUpdated ?? last?.lastUpdated ?? null
    };
    if (JSON.stringify(state) === JSON.stringify(last))
      return;
    this.lastState = state;
    void this.view.webview.postMessage({ type: "state", state });
  }
  // ---------------- HTML ----------------
  renderHtml(webview) {
    const styleUri = webview.asWebviewUri(
      vscode3.Uri.joinPath(this.context.extensionUri, "media", "dashboard.css")
    );
    const i18nUri = webview.asWebviewUri(
      vscode3.Uri.joinPath(this.context.extensionUri, "media", "i18n.js")
    );
    const scriptUri = webview.asWebviewUri(
      vscode3.Uri.joinPath(this.context.extensionUri, "media", "dashboard.js")
    );
    const nonce = getNonce();
    const csp = [
      `default-src 'none'`,
      `style-src ${webview.cspSource}`,
      `script-src 'nonce-${nonce}'`,
      `img-src ${webview.cspSource} data:`,
      `font-src ${webview.cspSource}`
    ].join("; ");
    const tr = (key, params) => this.tr(key, params);
    return `<!DOCTYPE html>
<html lang="${this.lang}">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="${csp}">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>OpenCode Go</title>
<link rel="stylesheet" href="${styleUri}">
</head>
<body>

<header class="topbar">
  <div class="brand">
    <svg class="logo" viewBox="0 0 512 512" fill="none" aria-hidden="true">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M384 416H128V96H384V416ZM320 160H192V352H320V160Z" fill="currentColor"/>
    </svg>
    <div class="brand-text">
      <span class="brand-name">OpenCode Go</span>
      <span class="brand-sub">${tr("brand.sub")}</span>
    </div>
  </div>
  <div class="topbar-actions">
    <button class="icon-btn" id="btn-accounts" title="${tr("account.manage")}" aria-label="${tr("account.manage")}">
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="6" cy="5" r="2.5"/>
        <path d="M1.8 13.2c0-2.3 1.9-3.7 4.2-3.7s4.2 1.4 4.2 3.7"/>
        <path d="M10.8 2.9a2.5 2.5 0 0 1 0 4.4"/>
        <path d="M12.6 9.9c1.3.5 2.2 1.6 2.2 3.3"/>
      </svg>
    </button>
    <div class="dropdown" id="lang-dropdown">
      <button class="icon-btn lang-btn" id="lang-trigger" title="${tr("lang.switch")}" aria-label="${tr("lang.switch")}" aria-haspopup="true" aria-expanded="false" aria-controls="lang-menu">
        <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="8" cy="8" r="6.2"/>
          <path d="M1.8 8h12.4M8 1.8c2 2.1 2 10.3 0 12.4M8 1.8c-2 2.1-2 10.3 0 12.4"/>
        </svg>
      </button>
      <div class="dropdown-menu hidden" id="lang-menu"></div>
    </div>
    <button class="icon-btn" id="btn-refresh-top" title="${tr("refresh")}" aria-label="${tr("refresh")}">
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9"/>
        <path d="M13.5 2.5v3h-3"/>
      </svg>
    </button>
    <span id="status-badge" class="badge" role="status" aria-live="polite">\u2014</span>
  </div>
</header>

<!-- \u9996\u6B21\u4F7F\u7528\u5F15\u5BFC\uFF1A\u586B key\uFF08\u6B63\u5E38\u6D41\u7A0B\u7684\u4E00\u90E8\u5206\uFF09 -->
<section id="onboard" class="panel onboard hidden">
  <svg class="logo onboard-logo" viewBox="0 0 512 512" fill="none" aria-hidden="true">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M384 416H128V96H384V416ZM320 160H192V352H320V160Z" fill="currentColor"/>
  </svg>
  <h2>${tr("onboard.title")}</h2>
  <p class="hint warn-hint hidden" id="onboard-warn"></p>
  <input id="onboard-key" type="password" placeholder="${tr("accounts.addKeyPlaceholder")}" aria-label="${tr("accounts.addKeyPlaceholder")}" spellcheck="false">
  <div class="onboard-actions">
    <button class="btn btn-primary" id="onboard-save">${tr("onboard.save")}</button>
    <button class="btn btn-ghost" data-url="https://opencode.ai/auth">${tr("error.openConsole")}</button>
  </div>
  <p class="hint">${tr("onboard.desc")}</p>
  <button class="link hidden" id="onboard-skip">${tr("onboard.useLocal")}</button>
</section>

<!-- \u7A7A\u72B6\u6001\uFF1A\u6CA1\u6709\u8D26\u6237 -->
<section id="empty" class="panel empty hidden">
  <h2>${tr("empty.title")}</h2>
  <p class="muted">${tr("empty.desc")}</p>
  <button id="btn-add-first" class="btn btn-primary">${tr("empty.add")}</button>
</section>

<!-- \u9519\u8BEF + \u5185\u8054 key \u4FEE\u590D\u8868\u5355 -->
<section id="error-card" class="panel error hidden" role="alert">
  <div class="error-title"><span id="error-text"></span></div>
  <p id="error-hint" class="muted"></p>
  <div class="error-key-form hidden" id="error-key-form">
    <input id="error-key-input" type="password" placeholder="${tr("accounts.addKeyPlaceholder")}" aria-label="${tr("accounts.addKeyPlaceholder")}" spellcheck="false">
    <div class="error-actions">
      <button class="btn btn-primary" id="error-key-save">${tr("error.saveKey")}</button>
      <button class="btn btn-ghost" data-url="https://opencode.ai/auth">${tr("error.openConsole")}</button>
    </div>
    <p class="hint">${tr("error.keyNote")}</p>
  </div>
</section>

<!-- \u4EEA\u8868\u76D8 -->
<section id="dashboard" class="hidden">
  <div class="account-switch">
    <span class="account-label">${tr("account.label")}</span>
    <div class="dropdown" id="account-dropdown">
      <button class="dropdown-trigger" id="account-trigger" aria-haspopup="true" aria-expanded="false" aria-controls="account-menu">
        <span id="account-current">\u2014</span>
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 6l4.5 4.5L12.5 6"/></svg>
      </button>
      <div class="dropdown-menu hidden" id="account-menu"></div>
    </div>
  </div>

  <!-- \u591A\u8D26\u6237\u603B\u89C8\uFF1A\u6BCF\u8D26\u6237\u4E00\u5F20\u7D27\u51D1\u5361\u7247\uFF08\u8D26\u6237\u6570 >1 \u65F6\u663E\u793A\uFF09 -->
  <section id="overview" class="panel hidden">
    <div class="card-head">
      <h2>${tr("overview.title")}</h2>
      <span class="count" id="overview-count"></span>
    </div>
    <div id="overview-list"></div>
  </section>

  <div class="section-head"><span class="section-title">${tr("usage.quotaTitle")}</span></div>
  <div class="usage-bars" id="usage-bars"></div>

  <!-- \u7F51\u5173\u8054\u52A8\uFF1A\u914D\u7F6E opencodeGo.gatewayUrl \u540E\u5C55\u793A\u4E2D\u8F6C\u7F51\u5173\u8BA2\u9605\u5236\u7AD9\u70B9 -->
  <section id="gw-card" class="panel hidden">
    <div class="card-head">
      <h2>${tr("gw.title")}</h2>
      <button class="btn btn-ghost compact-btn" id="btn-gw-filter">${tr("gw.filterSub")}</button>
    </div>
    <div id="gw-summary"></div>
    <div id="gw-list"></div>
    <p class="muted local-note" id="gw-note">${tr("gw.note")}</p>
  </section>

  <details class="models">
    <summary><span>${tr("models.title")}</span><span class="count" id="models-count"></span></summary>
    <div class="chips" id="models-list"></div>
  </details>

  <!-- \u4E0A\u4E0B\u6587\u914D\u7F6E -->
  <details id="ctx-card" class="panel ctx-card hidden">
    <summary class="card-head">
      <h2>${tr("ctx.title")}</h2>
    </summary>
    <div class="ctx-card-body">
      <button class="btn btn-ghost compact-btn" id="btn-open-config">${tr("ctx.open")}</button>
      <div id="ctx-list"></div>
      <p class="muted local-note">${tr("ctx.note")}</p>
    </div>
  </details>

  <div class="detail-grid">
    <div class="detail-row">
      <span class="detail-k">${tr("detail.plan")}</span>
      <span class="detail-v">${tr("detail.planValue")}</span>
    </div>
    <div class="detail-row">
      <span class="detail-k">${tr("detail.key")}</span>
      <span class="detail-v mono" id="detail-key">\u2014</span>
    </div>
    <div class="detail-row">
      <span class="detail-k">${tr("detail.updated")}</span>
      <span class="detail-v" id="detail-updated">\u2014</span>
    </div>
  </div>
</section>

<!-- \u8D26\u6237\u7BA1\u7406 -->
<section id="accounts" class="panel hidden">
  <div class="manage-head">
    <h2>${tr("accounts.title")}</h2>
    <button id="btn-back" class="btn btn-ghost">${tr("accounts.back")}</button>
  </div>
  <div id="account-list"></div>
  <button class="btn btn-ghost add-toggle" id="btn-add-toggle" aria-expanded="false" aria-controls="add-box">${tr("accounts.add")}</button>
  <div class="add-box hidden" id="add-box">
    <input id="add-key" type="password" placeholder="${tr("accounts.addKeyPlaceholder")}" aria-label="${tr("accounts.addKeyPlaceholder")}" spellcheck="false">
    <input id="add-name" type="text" placeholder="${tr("accounts.addNamePlaceholder")}" aria-label="${tr("accounts.addNamePlaceholder")}" spellcheck="false">
    <button id="btn-add" class="btn btn-primary">${tr("accounts.add")}</button>
  </div>
  <p class="muted">${tr("accounts.hint")}</p>
</section>

<footer class="footer">
  <span class="muted">${tr("footer")}</span>
</footer>

<script nonce="${nonce}" src="${i18nUri}"></script>
<script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
  }
};
function toStatusSummary(a, entry) {
  if (!entry || entry.kind !== "ok" || !entry.usage) {
    return { id: a.id, name: a.name, kind: entry?.kind ?? "unknown", percent: 0, limited: false };
  }
  const { rolling, weekly, monthly } = entry.usage;
  const windows = [rolling, weekly, monthly];
  const percentages = windows.map((u) => Number(u?.percent));
  if (percentages.some((p) => !Number.isFinite(p))) {
    return { id: a.id, name: a.name, kind: "unknown", percent: 0, limited: false };
  }
  return {
    id: a.id,
    name: a.name,
    kind: "ok",
    percent: Math.max(...percentages),
    limited: windows.some((u) => u.status === "rate-limited"),
    usage: { r: percentages[0], w: percentages[1], m: percentages[2] }
  };
}
function getNonce() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < 32; i++)
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  return text;
}

// src/extension.ts
var provider;
function activate(context) {
  provider = new DashboardProvider(context);
  provider.startMonitor();
  context.subscriptions.push(
    vscode4.window.registerWebviewViewProvider(DashboardProvider.viewType, provider, {
      webviewOptions: { retainContextWhenHidden: true }
    })
  );
  context.subscriptions.push(
    vscode4.commands.registerCommand("opencodeGo.showDashboard", async () => {
      await vscode4.commands.executeCommand("opencodeGo.dashboard.focus");
    })
  );
  context.subscriptions.push(
    vscode4.commands.registerCommand("opencodeGo.refresh", () => provider?.refresh())
  );
  context.subscriptions.push(
    vscode4.commands.registerCommand("opencodeGo.openConsole", () => provider?.openConsole())
  );
  if (context.extensionMode !== vscode4.ExtensionMode.Production) {
    globalThis.__opencodeGoProvider = provider;
    globalThis.__opencodeGoStatusBar = provider.getStatusBarForTest();
    globalThis.__opencodeGoNotifier = provider.getNotifierForTest();
  }
}
function deactivate() {
  provider?.dispose();
  provider = void 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
