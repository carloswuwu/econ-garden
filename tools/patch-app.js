/*
 * tools/patch-app.js
 * 把數學版建置產物 app.js 調整為經濟學園的介面層。
 * 這是「一次性、可重跑」的補丁：每項替換都檢查命中次數，避免默默失敗。
 * 用法：node tools/patch-app.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'app.js');
let src = fs.readFileSync(file, 'utf8');
const applied = [];

function replaceOnce(name, needle, replacement) {
  const i = src.indexOf(needle);
  if (i === -1) throw new Error('找不到補丁目標: ' + name);
  if (src.indexOf(needle, i + 1) !== -1) throw new Error('補丁目標不唯一: ' + name);
  src = src.slice(0, i) + replacement + src.slice(i + needle.length);
  applied.push(name);
}

function replaceAll(name, needle, replacement, expected) {
  const before = src.split(needle).length - 1;
  if (before !== expected) throw new Error('補丁目標數量不符: ' + name + ' (found ' + before + ', expected ' + expected + ')');
  src = src.split(needle).join(replacement);
  applied.push(name + ' x' + before);
}

/* 1. 鍵入答案的階段：改為經濟學園的階段 id */
replaceOnce('typed-stage-ids',
  'var TYPED_ASSESSMENT_STAGES = ["ms1", "ms2", "ms3", "hs1", "hs2", "hs3", "college"];',
  'var TYPED_ASSESSMENT_STAGES = ["s4", "s5", "s6", "college", "challenge"];');

/* 2. 本機儲存 key 與數學版分開（同一瀏覽器可同時安裝兩套 app） */
replaceOnce('store-key', 'var STORE_KEY = "mathpath.progress";', 'var STORE_KEY = "econpath.progress";');
replaceOnce('legacy-key', 'var LEGACY_STORE_KEY = "mathpath.progress.v1";', 'var LEGACY_STORE_KEY = "econpath.progress.v1";');
replaceOnce('session-key', 'var SESSION_KEY = "mathpath.session.v1";', 'var SESSION_KEY = "econpath.session.v1";');
replaceAll('history-key', '{ mathpath: hash }', '{ econpath: hash }', 2);

/* 3. 大綱：把香港數學的學習階段映射改為經濟學園的階段 */
replaceOnce('outline-map',
  'var KS_APP = { ks1: ["prek", "g1", "g2", "g3"], ks2: ["g4", "g5", "g6"], js: ["ms1", "ms2", "ms3"], ss: ["hs1", "hs2", "hs3"] };',
  'var KS_APP = { js: ["s1", "s2", "s3"], ss: ["s4", "s5", "s6"], uni: ["college"] };');

/* 4. 文字選項的雙語標籤：題庫題用 choiceLabels，其餘沿用數學版 */
replaceOnce('choice-label',
  '  function choiceLabel(p, c) {\n' +
  '    if (p.type === "direction") return t("direction." + c);\n' +
  '    if (p.type === "centre") return t("centre." + c);\n' +
  '    return MathCore.isFraction(c) ? MathCore.renderValue(c) : String(c);\n' +
  '  }',
  '  function choiceLabel(p, c) {\n' +
  '    if (p.choiceLabels) {\n' +
  '      var cl = p.choiceLabels[String(c)];\n' +
  '      if (cl) return L(cl);\n' +
  '    }\n' +
  '    if (p.type === "direction") return t("direction." + c);\n' +
  '    if (p.type === "centre") return t("centre." + c);\n' +
  '    return MathCore.isFraction(c) ? MathCore.renderValue(c) : String(c);\n' +
  '  }');

/* 5. 首頁：顯示所有階段（未解鎖的顯示鎖），並加「解鎖所有階段」按鈕 */
replaceOnce('home-stage-loop',
  '    realStages.forEach(function(stage) {\n' +
  '      if (!stageUnlocked(stage.id)) return;\n' +
  '      unlockedCount++;\n' +
  '      var stats = stageSkillStats(stage);\n' +
  '      html += \'<button class="stage-card" type="button" data-stage="\' + stage.id + \'"><span class="emoji">\' + stage.emoji + \'</span><span class="name">\' + L(stage) + \'</span><span class="desc">\' + L(stage.desc) + \'</span><span class="stage-count">\' + t("home.stageCount", { u: stats.unlocked, t: stats.total }) + "</span></button>";\n' +
  '    });',
  '    realStages.forEach(function(stage) {\n' +
  '      var stats = stageSkillStats(stage);\n' +
  '      var locked = !stageUnlocked(stage.id);\n' +
  '      if (!locked) unlockedCount++;\n' +
  '      html += \'<button class="stage-card\' + (locked ? \' locked\' : \'\') + \'" type="button" data-stage="\' + stage.id + \'" data-locked="\' + (locked ? "1" : "0") + \'"><span class="emoji">\' + (locked ? "🔒" : stage.emoji) + \'</span><span class="name">\' + L(stage) + \'</span><span class="desc">\' + L(stage.desc) + \'</span><span class="stage-count">\' + (locked ? "🔒" : t("home.stageCount", { u: stats.unlocked, t: stats.total })) + "</span></button>";\n' +
  '    });');

replaceOnce('home-stage-click',
  '      el.addEventListener("click", function() {\n' +
  '        app.navigate({ screen: "stage", stageId: el.getAttribute("data-stage") });\n' +
  '      });',
  '      el.addEventListener("click", function() {\n' +
  '        if (el.getAttribute("data-locked") === "1") { app.toast(t("home.lockedStageHint")); return; }\n' +
  '        app.navigate({ screen: "stage", stageId: el.getAttribute("data-stage") });\n' +
  '      });');

replaceOnce('home-unlock-button',
  '</button><button class="btn secondary big" id="homeParentBtn" type="button">',
  '</button><button class="btn secondary big" id="homeUnlockBtn" type="button" style="margin-bottom:10px">🔓 \' + t("home.unlockAll") + \'</button><button class="btn secondary big" id="homeParentBtn" type="button">');

replaceOnce('home-unlock-listener',
  '    $("homeParentBtn").addEventListener("click", function() {',
  '    $("homeUnlockBtn").addEventListener("click", app.confirmUnlockAll);\n    $("homeParentBtn").addEventListener("click", function() {');

/* 6. 題目附圖：加入經濟學圖表（供需、PPF、AD-AS）的文字替代 */
replaceOnce('visual-alt-econ',
  '      default:\n        return tpl("generic");',
  '      case "supplydemand": {\n' +
  '        var sd = v.desc;\n' +
  '        if (sd && typeof sd === "object") sd = state.lang === "zh" ? sd.zh : sd.en;\n' +
  '        return tpl("supplydemand", { desc: sd || "" });\n' +
  '      }\n' +
  '      case "ppf": {\n' +
  '        var pd = v.desc;\n' +
  '        if (pd && typeof pd === "object") pd = state.lang === "zh" ? pd.zh : pd.en;\n' +
  '        return tpl("ppf", { desc: pd || "" });\n' +
  '      }\n' +
  '      case "adas": {\n' +
  '        var ad = v.desc;\n' +
  '        if (ad && typeof ad === "object") ad = state.lang === "zh" ? ad.zh : ad.en;\n' +
  '        return tpl("adas", { desc: ad || "" });\n' +
  '      }\n' +
  '      default:\n        return tpl("generic");');

/* 7. 題目附圖：新增三個經濟學圖表渲染器 */
const econCases =
  '      case "supplydemand":\n' +
  '        html = supplydemandSVG(visual);\n' +
  '        break;\n' +
  '      case "ppf":\n' +
  '        html = ppfSVG(visual);\n' +
  '        break;\n' +
  '      case "adas":\n' +
  '        html = adasSVG(visual);\n' +
  '        break;\n';

const econSvgFns = `  function econSvgFrame(inner, xLabel, yLabel) {
    xLabel = xLabel || 'Q';
    yLabel = yLabel || 'P';
    return '<svg width="300" height="210" viewBox="0 0 300 210" xmlns="http://www.w3.org/2000/svg">' +
      '<line x1="34" y1="34" x2="34" y2="178" stroke="#6F6555" stroke-width="2"/>' +
      '<line x1="34" y1="178" x2="272" y2="178" stroke="#6F6555" stroke-width="2"/>' +
      '<text x="270" y="196" font-size="12" fill="#6F6555">' + xLabel + '</text>' +
      '<text x="18" y="44" font-size="12" fill="#6F6555">' + yLabel + '</text>' + inner + '</svg>';
  }
  function supplydemandSVG(v) {
    var s = '<line x1="46" y1="46" x2="238" y2="164" stroke="#4A87C7" stroke-width="2.5"/>' +
      '<line x1="46" y1="164" x2="238" y2="46" stroke="#EE8B3C" stroke-width="2.5"/>' +
      '<text x="240" y="172" font-size="12" fill="#4A87C7">D</text>' +
      '<text x="240" y="42" font-size="12" fill="#EE8B3C">S</text>' +
      '<circle cx="142" cy="105" r="4" fill="#DD5A4F"/>';
    (v.shifts || []).forEach(function(sh) {
      if (sh === 'D+') s += '<line x1="70" y1="46" x2="262" y2="164" stroke="#4A87C7" stroke-width="1.8" stroke-dasharray="6 4"/><text x="264" y="172" font-size="12" fill="#4A87C7">D1</text>';
      if (sh === 'D-') s += '<line x1="30" y1="46" x2="222" y2="164" stroke="#4A87C7" stroke-width="1.8" stroke-dasharray="6 4"/><text x="224" y="176" font-size="12" fill="#4A87C7">D1</text>';
      if (sh === 'S+') s += '<line x1="70" y1="164" x2="262" y2="46" stroke="#EE8B3C" stroke-width="1.8" stroke-dasharray="6 4"/><text x="264" y="42" font-size="12" fill="#EE8B3C">S1</text>';
      if (sh === 'S-') s += '<line x1="30" y1="164" x2="222" y2="46" stroke="#EE8B3C" stroke-width="1.8" stroke-dasharray="6 4"/><text x="224" y="42" font-size="12" fill="#EE8B3C">S1</text>';
    });
    if (v.control === 'ceiling' || v.control === 'floor') {
      var y = 82;
      s += '<line x1="34" y1="' + y + '" x2="268" y2="' + y + '" stroke="#DD5A4F" stroke-width="1.8" stroke-dasharray="8 4"/>' +
        '<text x="42" y="' + (y - 6) + '" font-size="11" fill="#DD5A4F">' + (v.note || (v.control === 'ceiling' ? 'Price ceiling' : 'Price floor')) + '</text>';
    }
    return econSvgFrame(s);
  }
  function ppfSVG(v) {
    var s = '<path d="M46 158 C 120 148 210 108 258 58" fill="none" stroke="#4A87C7" stroke-width="2.5"/>' +
      '<text x="262" y="56" font-size="12" fill="#4A87C7">PPF</text>';
    if (v.shift) {
      s += '<path d="M54 150 C 128 140 216 100 264 50" fill="none" stroke="#4A87C7" stroke-width="1.8" stroke-dasharray="6 4"/>' +
        '<text x="266" y="46" font-size="12" fill="#4A87C7">PPF1</text>';
    }
    if (v.point === 'inside') s += '<circle cx="118" cy="130" r="4.5" fill="#EE8B3C"/>';
    else if (v.point === 'outside') s += '<circle cx="228" cy="68" r="4.5" fill="#DD5A4F"/>';
    else s += '<circle cx="168" cy="94" r="4.5" fill="#4F8A5B"/>';
    return econSvgFrame(s, 'X', 'Y');
  }
  function adasSVG(v) {
    var s = '<line x1="46" y1="58" x2="252" y2="162" stroke="#4A87C7" stroke-width="2.5"/>' +
      '<line x1="58" y1="162" x2="252" y2="54" stroke="#EE8B3C" stroke-width="2.5"/>' +
      '<line x1="196" y1="46" x2="196" y2="168" stroke="#8C6CB3" stroke-width="2" stroke-dasharray="6 4"/>' +
      '<text x="254" y="166" font-size="12" fill="#4A87C7">AD</text>' +
      '<text x="254" y="52" font-size="12" fill="#EE8B3C">SRAS</text>' +
      '<text x="199" y="44" font-size="12" fill="#8C6CB3">LRAS</text>' +
      '<circle cx="150" cy="108" r="4" fill="#DD5A4F"/>';
    (v.shifts || []).forEach(function(sh) {
      if (sh === 'AD+') s += '<line x1="64" y1="58" x2="270" y2="162" stroke="#4A87C7" stroke-width="1.8" stroke-dasharray="6 4"/><text x="272" y="166" font-size="12" fill="#4A87C7">AD1</text>';
      if (sh === 'AD-') s += '<line x1="30" y1="58" x2="236" y2="162" stroke="#4A87C7" stroke-width="1.8" stroke-dasharray="6 4"/><text x="238" y="166" font-size="12" fill="#4A87C7">AD1</text>';
      if (sh === 'SRAS+') s += '<line x1="76" y1="162" x2="270" y2="54" stroke="#EE8B3C" stroke-width="1.8" stroke-dasharray="6 4"/><text x="272" y="50" font-size="12" fill="#EE8B3C">SRAS1</text>';
      if (sh === 'SRAS-') s += '<line x1="40" y1="162" x2="234" y2="54" stroke="#EE8B3C" stroke-width="1.8" stroke-dasharray="6 4"/><text x="236" y="50" font-size="12" fill="#EE8B3C">SRAS1</text>';
    });
    return econSvgFrame(s);
  }
`;

replaceOnce('visual-render-econ',
  '      case "shape":\n' +
  '        html = shapeSVG(visual.shape);\n' +
  '        break;\n' +
  '    }\n' +
  '    container.innerHTML = html;\n' +
  '  }\n' +
  '  function triangleSVG(b, h) {',
  '      case "shape":\n' +
  '        html = shapeSVG(visual.shape);\n' +
  '        break;\n' +
  econCases +
  '    }\n' +
  '    container.innerHTML = html;\n' +
  '  }\n' +
  econSvgFns +
  '  function triangleSVG(b, h) {');

/* 8. 開發者 hook 改名（保留舊名以兼容測試腳本） */
replaceOnce('debug-hook', 'window.__mathApp = {', 'window.__econApp = window.__mathApp = {');

/* 9. 大學綜合考試：加入中六技能以確保 20 題有足夠橫向覆蓋 */
replaceOnce('college-prev-stage',
  '    if (stage.id === "college") {\n      var prev = getStage("hs3");',
  '    if (stage.id === "college") {\n      var prev = getStage("s6");');

/* 10. lessons chunk meta 名稱 */
replaceOnce('lessons-meta', 'meta[name="math-garden-lessons"]', 'meta[name="econ-garden-lessons"]');

/* 11. 公式表：可橫向捲動的 KaTeX 區塊要有鍵盤焦點（axe: scrollable-region-focusable） */
replaceOnce('formula-latex-tabindex',
  '<div class="formula-latex">',
  '<div class="formula-latex" tabindex="0">');fs.writeFileSync(file, src, 'utf8');
console.log('applied patches:');
applied.forEach(function (n) { console.log('  - ' + n); });
