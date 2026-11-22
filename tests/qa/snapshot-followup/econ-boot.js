/*
 * 經濟學園 · Econ Garden — 內容註冊與工具層
 * ------------------------------------------------------------------
 * 內容檔（content/*.js）先呼叫 EconData.* 註冊資料，最後由 econ-core.js
 * 組裝成 Curriculum / Lessons / MathCore（即 app.js 讀取的 window.* 全局）。
 *
 * 註冊 API：
 *   EconData.addStage(stage)              加入一個階段（含 topics 清單）
 *   EconData.addSkills(map)               加入技能定義，key = skill id
 *   EconData.addLessons(map)              加入小課堂內容，key = skill id
 *   EconData.addBanks(map)                加入選擇題題庫，key = skill id
 *   EconData.registerType(id, fn)         註冊題目生成器：fn(rng, opts) -> problem
 *
 * 生成器回傳的 problem 格式（全部欄位均為必要，另有標記者可選）：
 *   prompt    { zh, en }                 題幹（支援 $...$ KaTeX；可用 caret）
 *   hint      { zh, en }                 提示
 *   answer    number | string            正確答案；文字答案必須同時提供 choices
 *   choices   number[] | string[]        選項（可省略，引擎會為數字答案自動產生干擾項）
 *   choiceLabels { value: {zh,en} }      文字選項的雙語標籤（文字答案必填）
 *   solution  { zh: [step...], en: [step...] }  完整解題步驟
 *   math      object                     生成參數（用於去重/模板簽名），建議填
 *   input     true                       設為 true 則強制鍵入答案（不顯示選項）
 *   visual    object                     可選圖示（見 docs/TYPE-CATALOG.md）
 *
 * 題庫（bank）項目格式：
 *   { id, prompt:{zh,en}, choices:[{id,zh,en}...], answer:'a',
 *     hint:{zh,en}, solution:{zh:[...],en:[...]} }
 */
(function () {
  'use strict';

  var E = window.EconData = {
    stages: [],
    skills: {},
    lessons: {},
    banks: {},
    types: {}
  };

  /* ---------------- 可播種隨機數（與數學版相同的 mulberry32） ---------------- */

  function seedRandom(seed) {
    var a = (seed >>> 0) || 1;
    return function () {
      a |= 0;
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function randInt(rng, min, max) {
    if (max < min) { var tmp = min; min = max; max = tmp; }
    return min + Math.floor(rng() * (max - min + 1));
  }

  function pick(rng, arr) {
    return arr[randInt(rng, 0, arr.length - 1)];
  }

  function shuffle(rng, arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = randInt(rng, 0, i);
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---------------- 數值工具 ---------------- */

  function round(n, dp) {
    dp = dp == null ? 2 : dp;
    var f = Math.pow(10, dp);
    return Math.round(n * f) / f;
  }

  function fmt(n, dp) {
    if (typeof n !== 'number') return String(n);
    var r = round(n, dp == null ? 2 : dp);
    return String(r);
  }

  /* 金錢格式：加千位分隔、必要時保留兩位小數（只用於顯示，不用於答案比較） */
  function money(n) {
    var neg = n < 0;
    var v = Math.abs(round(n, 2));
    var parts = String(v).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (neg ? '-' : '') + '$' + parts.join('.');
  }

  function pct(n, dp) {
    return fmt(n, dp == null ? 1 : dp) + '%';
  }

  /* 產生 4 個互不相同的數字選項（包含正確答案），預設用 n/% 干擾 */
  function numericChoices(rng, answer, opts) {
    opts = opts || {};
    var dp = opts.dp == null ? 2 : opts.dp;
    var deltas = opts.deltas || [1, -1, 2, -2, 3, -3, 5, -5, 10, -10];
    var min = opts.min == null ? 0 : opts.min;
    var max = opts.max == null ? null : opts.max;
    var seen = {};
    var out = [];
    function add(v) {
      v = round(v, dp);
      if (max != null && v > max) return false;
      if (v < min) return false;
      if (!isFinite(v)) return false;
      var k = String(v);
      if (seen[k]) return false;
      seen[k] = true;
      out.push(v);
      return true;
    }
    add(answer);
    var guard = 0;
    while (out.length < 4 && guard++ < 500) {
      var v = answer + pick(rng, deltas);
      if (v === answer) v = answer + pick(rng, [1, -1]) * randInt(rng, 1, 4);
      add(v);
    }
    guard = 0;
    while (out.length < 4 && guard++ < 500) {
      var lo = Math.max(min, answer - 20), hi = max != null ? max : answer + 20;
      add(randInt(rng, lo, hi));
    }
    while (out.length < 4) add(answer + out.length + 1);
    return shuffle(rng, out);
  }

  /* 建立「文字選項」的 labels 對照：items = [{id, zh, en}] */
  function labelsOf(items) {
    var m = {};
    items.forEach(function (c) { m[String(c.id)] = { zh: c.zh, en: c.en }; });
    return m;
  }

  /* 常用情境句子池（內容檔可自行擴充） */
  function oneOf(rng, arr) { return pick(rng, arr); }

  E.util = {
    seedRandom: seedRandom,
    randInt: randInt,
    pick: pick,
    shuffle: shuffle,
    round: round,
    fmt: fmt,
    money: money,
    pct: pct,
    numericChoices: numericChoices,
    labelsOf: labelsOf,
    oneOf: oneOf,
    solution: function (zh, en) { return { zh: zh, en: en }; }
  };

  /* ---------------- 註冊入口 ---------------- */

  E.addStage = function (stage) {
    if (!stage || !stage.id) throw new Error('addStage: 缺少 id');
    E.stages.push(stage);
  };

  E.addSkills = function (map) {
    Object.keys(map || {}).forEach(function (id) {
      var s = map[id];
      if (!s) return;
      s.id = s.id || id;
      if (E.skills[id]) throw new Error('技能重複註冊: ' + id);
      E.skills[id] = s;
    });
  };

  E.addLessons = function (map) {
    Object.keys(map || {}).forEach(function (id) {
      if (E.lessons[id]) throw new Error('課堂重複註冊: ' + id);
      E.lessons[id] = map[id];
    });
  };

  E.addBanks = function (map) {
    Object.keys(map || {}).forEach(function (id) {
      if (!E.banks[id]) E.banks[id] = [];
      E.banks[id] = E.banks[id].concat(map[id] || []);
    });
  };

  E.registerType = function (id, fn) {
    if (typeof fn !== 'function') throw new Error('registerType: 生成器必須是函數: ' + id);
    if (E.types[id]) throw new Error('題型重複註冊: ' + id);
    E.types[id] = fn;
  };
})();
