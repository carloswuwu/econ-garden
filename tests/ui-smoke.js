/*
 * tests/ui-smoke.js — 介面冒煙測試（jsdom）
 * 需要 jsdom；若本機沒有，會以 exit 0 跳過（只作開發輔助，不是 app 運行依賴）。
 * 用法：node tests/ui-smoke.js
 */
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');

let JSDOM = null;
try { JSDOM = require('jsdom').JSDOM; } catch (e) {
  try { JSDOM = require(path.join(__dirname, '..', '..', 'math', 'tests', 'node_modules', 'jsdom')).JSDOM; } catch (e2) { /* ignore */ }
}
if (!JSDOM) {
  console.log('（略過 ui-smoke：未安裝 jsdom。可先 npm install，或設定 NODE_PATH）');
  process.exit(0);
}

const ROOT = path.join(__dirname, '..');
const HTML = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const FILES = [
  'econ-boot.js', 'i18n.js',
  'content/types-micro.js', 'content/types-micro2.js', 'content/types-welfare.js',
  'content/types-macro.js', 'content/types-international.js', 'content/types-applied.js',
  'content/stage-s1.js', 'content/stage-s2.js', 'content/stage-s3.js', 'content/stage-s4.js',
  'content/stage-s5.js', 'content/stage-s6.js', 'content/stage-college.js', 'content/stage-challenge.js',
  'content/lessons-junior.js', 'content/lessons-s4.js',
  'content/lessons-s6.js', 'content/lessons-college.js',
  'econ-core.js', 'formulas.js', 'curriculum-outline.js',
  'vendor/katex/katex.min.js', 'app.js'
];

let checks = 0;
function check(cond, msg) { checks++; assert.ok(cond, msg); }
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

function boot() {
  const dom = new JSDOM(HTML, { runScripts: 'dangerously', url: 'http://localhost/' });
  const w = dom.window;
  w.scrollTo = function () {};
  const missing = [];
  FILES.forEach((rel) => {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) { missing.push(rel); return; }
    w.eval(fs.readFileSync(abs, 'utf8'));
  });
  return { dom, w, d: w.document, missing };
}

async function main() {
  const ctx = boot();
  const w = ctx.w, d = ctx.d;
  check(ctx.missing.length === 0, '缺少腳本：' + ctx.missing.join(', '));
  check(!!w.Curriculum && !!w.MathCore && !!w.Lessons && !!w.I18N && !!w.Formulas, '全局模塊已載入');
  check(w.Curriculum.stages.length === 8, '應有 8 個階段（中一至中六、大學、挑戰）');
  check(Object.keys(w.Curriculum.skills).length >= 70, '技能數應 >= 70');

  /* 首頁：所有階段都顯示（未解鎖變淡），挑戰卡存在 */
  check(d.body.textContent.includes('經濟學園'), '首頁品牌名');
  const stageCards = d.querySelectorAll('#screen-home .stage-card');
  check(stageCards.length === 7, '首頁應顯示 7 個年級階段（挑戰區另有卡片），實際 ' + stageCards.length);
  check(!!d.getElementById('homeChallengeBtn'), '挑戰區入口存在');
  check(!!d.getElementById('homeUnlockBtn'), '解鎖所有階段按鈕存在');
  check(!!d.querySelector('#screen-home .stage-card.locked'), '未解鎖階段以鎖定樣式顯示');

  /* 語言切換 */
  d.getElementById('langBtn').click();
  check(d.body.textContent.includes('Econ Garden'), '切到英文品牌名');
  d.getElementById('langBtn').click();

  /* 首頁 → 階段 → 小課堂 */
  d.querySelector('#screen-home .stage-card[data-stage="s1"]').click();
  check(!d.getElementById('screen-stage').hidden, '進入中一階段頁');
  const skillCards = d.querySelectorAll('#screen-stage .skill-card');
  check(skillCards.length === 8, '中一應有 8 個技能卡，實際 ' + skillCards.length);
  check(!!d.querySelector('#screen-stage .skill-card[data-skill="s1.opportunity_cost"]'), '機會成本技能存在');
  d.querySelector('#screen-stage .skill-card[data-skill="s1.money"]').click();
  check(!d.getElementById('screen-lesson').hidden, '進入小課堂');
  check((d.getElementById('screen-lesson').textContent || '').includes('金錢'), '小課堂標題含金錢');

  /* 練習：答對一題 */
  d.getElementById('lessonPractice').click();
  check(!d.getElementById('screen-practice').hidden, '進入練習');
  let p = w.__econApp.currentProblem();
  check(!!p && !!p.prompt && !!p.answer, '練習題已生成');
  const choices = Array.from(d.querySelectorAll('#screen-practice .choice'));
  const answerKey = w.MathCore.valueKey(p.answer);
  const correctBtn = choices.find((b) => b.getAttribute('data-key') === answerKey);
  check(!!correctBtn, '選項中應有正確答案');
  correctBtn.click();
  const sp = w.__econApp.getProgress().skills['s1.money'];
  check(sp && sp.correct >= 1, '答對後進度已記錄');
  check(!!w.localStorage.getItem('econpath.progress'), '進度已寫入 econpath.progress');
  check(!d.getElementById('nextBtn').hidden, '答對後出現下一題');
  d.getElementById('nextBtn').click();
  const p2 = w.__econApp.currentProblem();
  check(!!p2 && p2.sig !== p.sig, '下一題與上一題不同');

  /* 測驗：10 題、可作答 */
  d.getElementById('backBtn').click();
  check(!d.getElementById('screen-lesson').hidden, '返回小課堂');
  d.getElementById('lessonQuiz').click();
  check(!d.getElementById('screen-practice').hidden, '進入測驗');
  const q1 = w.__econApp.currentProblem();
  const qChoices = Array.from(d.querySelectorAll('#screen-practice .choice'));
  const qCorrect = qChoices.find((b) => b.getAttribute('data-key') === w.MathCore.valueKey(q1.answer));
  check(!!qCorrect, '測驗第一題有正確選項');
  qCorrect.click();
  await sleep(1200);
  check((d.getElementById('screen-practice').textContent || '').includes('2 /'), '測驗答對後進入第 2 題');
  check(w.__econApp.getState().problems.length === 10, '測驗共 10 題');

  /* 題庫技能：文字選項要顯示雙語標籤（切英文後） */
  w.location.hash = '#/home';
  w.dispatchEvent(new w.Event('hashchange'));
  await sleep(50);
  const bankSkill = 's1.money';
  w.__econApp.navigate({ screen: 'practice', skillId: bankSkill });
  check(!d.getElementById('screen-practice').hidden, '題庫技能可進入練習');
  const bankChoices = Array.from(d.querySelectorAll('#screen-practice .choice'));
  check(bankChoices.length === 4, '題庫題 4 個選項');
  check(bankChoices.every((b) => (b.textContent || '').trim().length > 0), '題庫選項有文字標籤');

  /* 綜合考試：20 題、跨技能 */
  w.__econApp.navigate({ screen: 'home' });
  w.__econApp.renderGradeExam('s1');
  await sleep(50);
  check(w.__econApp.getState().problems.length === 20, '中一綜合考試 20 題');
  const examSigs = new Set(w.__econApp.getState().problems.map((x) => x.sig));
  check(examSigs.size >= 15, '考試題目大部分不重複，實際 ' + examSigs.size);

  /* 公式／大綱畫面 */
  w.__econApp.navigate({ screen: 'formulas' });
  check(!d.getElementById('screen-formulas').hidden, '公式畫面可見');
  check(d.querySelectorAll('#screen-formulas .formula-row').length >= 30, '公式數量 >= 30');
  w.__econApp.navigate({ screen: 'outline' });
  check(!d.getElementById('screen-outline').hidden, '大綱畫面可見');
  check(d.querySelectorAll('#screen-outline .outline-stage').length === 3, '大綱有 3 個學習階段');

  console.log('✓ UI 冒煙測試通過（' + checks + ' 項檢查）');
}

main().catch((e) => { console.error('✗ UI 冒煙測試失敗：', e && e.message || e); process.exit(1); });
