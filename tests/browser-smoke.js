/*
 * tests/browser-smoke.js — 真實瀏覽器冒煙測試與截圖
 * 需要 Chrome/Edge + puppeteer-core。未安裝時自動跳過。
 * 用法：node tests/browser-smoke.js
 * 截圖輸出：tests/_shots/*.png
 */
'use strict';
const fs = require('fs');
const path = require('path');

function loadPuppeteer() {
  try { return require('puppeteer-core'); } catch (e) { /* fall through */ }
  try { return require(path.join(__dirname, '..', '..', 'math', 'node_modules', 'puppeteer-core')); } catch (e) { /* fall through */ }
  return null;
}

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

function findChrome() {
  for (const p of CHROME_PATHS) if (fs.existsSync(p)) return p;
  return null;
}

const puppeteer = loadPuppeteer();
const chrome = findChrome();
if (!puppeteer || !chrome) {
  console.log('（略過 browser-smoke：需要 puppeteer-core 與 Chrome/Edge）');
  process.exit(0);
}

const ROOT = path.join(__dirname, '..');
const SHOTS = path.join(__dirname, '_shots');
fs.mkdirSync(SHOTS, { recursive: true });
const URL = pathToFileUrl(path.join(ROOT, 'index.html'));
let checks = 0;
function check(cond, msg) { checks++; if (!cond) throw new Error(msg); }
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }
function pathToFileUrl(p) { return 'file:///' + p.replace(/\\/g, '/'); }
function shot(page, name) { return page.screenshot({ path: path.join(SHOTS, name + '.png') }); }

async function blur(page) {
  await page.evaluate(() => { try { if (document.activeElement) document.activeElement.blur(); } catch (e) {} });
}

async function clickChoiceCorrect(page) {
  const info = await page.evaluate(() => {
    const p = window.__econApp.currentProblem();
    return { answer: p.answer, hasInput: !!p.input };
  });
  if (info.hasInput) {
    await page.type('#typedAnswer', String(info.answer));
    await page.click('#typedSubmit');
    return;
  }
  const key = await page.evaluate((a) => window.MathCore.valueKey(a), info.answer);
  await page.evaluate((k) => {
    const btns = Array.from(document.querySelectorAll('#screen-practice .choice'));
    const b = btns.find((x) => x.getAttribute('data-key') === k);
    if (!b) throw new Error('cannot find correct choice');
    b.click();
  }, key);
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: chrome,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--hide-scrollbars', '--allow-file-access-from-files']
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push('console: ' + msg.text()); });
  await page.setViewport({ width: 1180, height: 900, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForSelector('#screen-home .stage-card', { timeout: 8000 });
  await sleep(400);
  await blur(page);

  /* 1. 首頁 */
  const home = await page.evaluate(() => ({
    title: document.title,
    stages: document.querySelectorAll('#screen-home .stage-card').length,
    locked: document.querySelectorAll('#screen-home .stage-card.locked').length,
    challenge: !!document.getElementById('homeChallengeBtn'),
    unlock: !!document.getElementById('homeUnlockBtn'),
    text: document.body.textContent
  }));
  check(home.title.includes('經濟學園'), 'title 應含經濟學園');
  check(home.stages === 7, '首頁應有 7 個年級階段，實際 ' + home.stages);
  check(home.locked === 6, '初始應有 6 個未解鎖階段，實際 ' + home.locked);
  check(home.challenge && home.unlock, '挑戰區與解鎖按鈕應存在');
  check(home.text.includes('由中一到大學，一步步學經濟'), '首頁副標題');
  await shot(page, 'home');

  /* 2. 階段頁 */
  await page.click('#screen-home .stage-card[data-stage="s1"]');
  await page.waitForSelector('#screen-stage .skill-card');
  await sleep(150);
  await blur(page);
  const stage = await page.evaluate(() => ({
    cards: document.querySelectorAll('#screen-stage .skill-card').length,
    exam: !!document.getElementById('stageExamBtn'),
    text: document.querySelector('#screen-stage').textContent
  }));
  check(stage.cards === 8, '中一應有 8 個技能，實際 ' + stage.cards);
  check(stage.exam, '階段應有綜合考試按鈕');
  await shot(page, 'stage');

  /* 3. 小課堂（有公式與課堂內容） */
  await page.click('#screen-stage .skill-card[data-skill="s1.money"]');
  await page.waitForSelector('#screen-lesson .lesson-card');
  await sleep(200);
  await blur(page);
  const lesson = await page.evaluate(() => ({
    text: document.querySelector('#screen-lesson').textContent,
    glossary: document.querySelectorAll('#screen-lesson .lesson-glossary dt').length,
    practice: !!document.getElementById('lessonPractice')
  }));
  check(lesson.text.includes('金錢的功能'), '小課堂標題');
  check(lesson.glossary >= 2, '詞彙表至少 2 項，實際 ' + lesson.glossary);
  check(lesson.practice, '開始練習按鈕');
  await shot(page, 'lesson');

  /* 4. 練習答對 */
  await page.click('#lessonPractice');
  await page.waitForSelector('#screen-practice .choice');
  await sleep(200);
  await blur(page);
  const p1 = await page.evaluate(() => window.__econApp.currentProblem());
  check(p1 && p1.prompt && p1.answer !== undefined, '練習題已生成');
  check(p1.choices && p1.choices.length === 4, '練習應有 4 個選項');
  await shot(page, 'practice');
  await clickChoiceCorrect(page);
  await sleep(250);
  const after = await page.evaluate(() => ({
    feedback: (document.getElementById('feedback') || {}).textContent,
    next: !document.getElementById('nextBtn').hidden,
    progress: window.__econApp.getProgress().skills['s1.money']
  }));
  check(after.feedback && after.feedback.length > 0, '答對後有回饋');
  check(after.next, '答對後有下一題按鈕');
  check(after.progress && after.progress.correct >= 1, '練習進度已記錄');
  await shot(page, 'practice-correct');

  /* 5. 測驗完成（10 題） */
  await page.click('#backBtn'); // 回小課堂
  await page.waitForSelector('#lessonQuiz');
  await page.click('#lessonQuiz');
  await page.waitForSelector('#screen-practice .choice');
  for (let i = 0; i < 10; i++) {
    const mode = await page.evaluate(() => {
      const s = window.__econApp.getState();
      return { index: s.index, len: s.problems.length, done: s.index >= s.problems.length };
    });
    if (mode.done) break;
    await clickChoiceCorrect(page);
    await sleep(1100);
  }
  await sleep(400);
  const quiz = await page.evaluate(() => ({
    text: document.querySelector('#screen-practice').textContent,
    results: window.__econApp.getProgress().skills['s1.money']
  }));
  check(quiz.text.includes('完成') || quiz.text.includes('答對') || quiz.text.includes('測驗結果'), '測驗完成畫面');
  check(quiz.results && quiz.results.quizStars >= 1, '測驗星數已記錄');
  await shot(page, 'quiz-result');

  /* 5b. 綜合考試：20 題全對 → 通關並解鎖下一階段 */
  await page.evaluate(() => window.__econApp.navigate({ screen: 'stage', stageId: 's1' }));
  await page.waitForSelector('#stageExamBtn');
  await page.click('#stageExamBtn');
  await page.waitForSelector('#screen-practice .choice');
  for (let i = 0; i < 20; i++) {
    const done = await page.evaluate(() => {
      const s = window.__econApp.getState();
      return s.index >= s.problems.length || !!document.querySelector('#screen-practice .result-card');
    });
    if (done) break;
    await clickChoiceCorrect(page);
    await sleep(1150);
  }
  await sleep(500);
  const exam = await page.evaluate(() => ({
    text: document.querySelector('#screen-practice').textContent,
    exams: window.__econApp.getProgress().stageExams
  }));
  check(exam.text.includes('模擬試卷完成'), '綜合考試完成畫面');
  check(exam.exams && exam.exams.s1 && (exam.exams.s1.passed || exam.exams.s1.perfect), '中一綜合考試達標並記錄');
  await shot(page, 'exam-result');
  await page.evaluate(() => window.__econApp.navigate({ screen: 'home' }));
  await page.waitForSelector('#screen-home .stage-card');
  await sleep(250);
  const unlockedAfterExam = await page.evaluate(() => ({
    locked: document.querySelectorAll('#screen-home .stage-card.locked').length,
    s2: !document.querySelector('#screen-home .stage-card[data-stage="s2"]').classList.contains('locked')
  }));
  check(unlockedAfterExam.s2, '中一考試達標後中二應解鎖');
  await shot(page, 'home-after-exam');

  /* 5c. 一鍵解鎖所有階段（對話框） */
  await page.click('#homeUnlockBtn');
  await page.waitForSelector('#unlockOk');
  await page.click('#unlockOk');
  await sleep(400);
  await page.evaluate(() => window.__econApp.navigate({ screen: 'home' }));
  await page.waitForSelector('#screen-home .stage-card');
  await sleep(250);
  const allUnlocked = await page.evaluate(() => document.querySelectorAll('#screen-home .stage-card.locked').length);
  check(allUnlocked === 0, '一鍵解鎖後應再無鎖定階段，實際 ' + allUnlocked);

  /* 5d. 設定頁：深色主題切換 */
  await page.evaluate(() => window.__econApp.navigate({ screen: 'settings' }));
  await page.waitForSelector('#screen-settings .seg-btn');
  await page.click('#screen-settings .seg-btn[data-theme="dark"]');
  await sleep(200);
  const darkSetting = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  check(darkSetting === 'dark', '設定頁可切換深色主題');
  await page.click('#screen-settings .seg-btn[data-theme="light"]');
  await sleep(150);
  await blur(page);
  await shot(page, 'settings');
  await page.click('#settingsParent');
  await page.waitForSelector('#screen-parent .panel');
  await sleep(250);
  await blur(page);
  const parent = await page.evaluate(() => ({
    title: document.querySelector('#screen-parent h1').textContent,
    rows: document.querySelectorAll('#screen-parent .row-item').length,
    export: !!document.getElementById('parentExport')
  }));
  check(parent.title.includes('學習中心'), '學習中心標題');
  check(parent.export, '學習中心有導出進度');
  await shot(page, 'parent');

  /* 5e. 挑戰區 */
  await page.evaluate(() => window.__econApp.navigate({ screen: 'stage', stageId: 'challenge' }));
  await page.waitForSelector('#screen-stage .skill-card');
  await sleep(250);
  await blur(page);
  const challenge = await page.evaluate(() => ({
    cards: document.querySelectorAll('#screen-stage .skill-card').length,
    text: document.querySelector('#screen-stage').textContent
  }));
  check(challenge.cards === 6, '挑戰區應有 6 個技能，實際 ' + challenge.cards);
  await shot(page, 'challenge');

  /* 5f. 中六宏觀課堂（AD-AS 圖示） */
  await page.evaluate(() => window.__econApp.navigate({ screen: 'stage', stageId: 's6' }));
  await page.waitForSelector('#screen-stage .skill-card');
  await page.evaluate(() => document.querySelector('#screen-stage .skill-card[data-skill="s6.fiscal_policy"]').click());
  await page.waitForSelector('#screen-lesson .lesson-card');
  await sleep(300);
  await blur(page);
  const s6lesson = await page.evaluate(() => ({
    text: document.querySelector('#screen-lesson').textContent,
    svg: !!document.querySelector('#screen-lesson svg')
  }));
  check(s6lesson.text.includes('財政政策'), '中六財政政策課堂');
  check(s6lesson.svg, '中六課堂應顯示 AD-AS 圖示');
  await shot(page, 'lesson-s6');

  /* 6. 公式與大綱 */
  await page.evaluate(() => window.__econApp.navigate({ screen: 'formulas' }));
  await page.waitForSelector('#screen-formulas .formula-row');
  await sleep(200);
  await blur(page);
  const f = await page.evaluate(() => ({
    rows: document.querySelectorAll('#screen-formulas .formula-row').length,
    katex: document.querySelectorAll('#screen-formulas .katex').length
  }));
  check(f.rows >= 60, '公式數量應 >= 60，實際 ' + f.rows);
  check(f.katex > 0, '公式應以 KaTeX 渲染');
  await shot(page, 'formulas');

  await page.evaluate(() => window.__econApp.navigate({ screen: 'outline' }));
  await page.waitForSelector('#screen-outline .outline-stage');
  await sleep(200);
  await blur(page);
  const o = await page.evaluate(() => ({
    stages: document.querySelectorAll('#screen-outline .outline-stage').length,
    text: document.querySelector('#screen-outline').textContent
  }));
  check(o.stages === 3, '大綱應有 3 個學習階段，實際 ' + o.stages);
  check(o.text.includes('公民、經濟與社會') && o.text.includes('HKDSE'), '大綱含初中與 DSE 內容');
  await shot(page, 'outline');

  /* 7. 深色模式 + 英文 */
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    window.__econApp.getState().theme = 'dark';
    window.__econApp.navigate({ screen: 'home' });
  });
  await sleep(200);
  await blur(page);
  const dark = await page.evaluate(() => ({
    theme: document.documentElement.getAttribute('data-theme'),
    text: document.body.textContent
  }));
  check(dark.theme === 'dark', '深色模式');
  await shot(page, 'home-dark');

  await page.click('#langBtn');
  await sleep(250);
  const en = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    text: document.body.textContent
  }));
  check(en.lang === 'en', 'html lang 應為 en');
  check(en.text.includes('Econ Garden') && en.text.includes('Choose a Stage'), '英文介面');
  await shot(page, 'home-dark-en');
  await page.click('#langBtn');
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));

  /* 8. 解鎖所有階段 → DSE 階段與輸入答案 */
  await page.evaluate(() => {
    const p = window.__econApp.getProgress();
    window.__econApp.getState().stageId = null;
    window.Curriculum.stages.forEach((st) => {
      if (st.id !== 'challenge') p.stageExams[st.id] = { passed: true, perfect: true, best: 100 };
    });
    localStorage.setItem('econpath.progress', JSON.stringify(p));
  });
  await page.reload({ waitUntil: 'load' });
  await page.waitForSelector('#screen-home .stage-card');
  await sleep(300);
  const unlocked = await page.evaluate(() => document.querySelectorAll('#screen-home .stage-card').length);
  check(unlocked === 7, '解鎖後仍顯示 7 個階段');
  await page.evaluate(() => window.__econApp.navigate({ screen: 'stage', stageId: 's4' }));
  await page.waitForSelector('#screen-stage .skill-card');
  await sleep(150);
  await blur(page);
  await page.evaluate(() => {
    document.querySelector('#screen-stage .skill-card[data-skill="s4.basic_concepts"]').click();
  });
  await page.waitForSelector('#screen-lesson');
  await sleep(200);
  await shot(page, 'lesson-s4');
  await page.evaluate(() => { document.getElementById('lessonQuiz').click(); });
  await page.waitForSelector('#screen-practice .choice, #screen-practice #typedAnswer');
  await sleep(200);
  /* 前兩題是選擇題；每 3 題有 1 題改為鍵入答案，第 3 題應為輸入題 */
  for (let i = 0; i < 2; i++) {
    await clickChoiceCorrect(page);
    await sleep(1100);
  }
  const typed = await page.evaluate(() => {
    const p = window.__econApp.currentProblem();
    return { hasInput: !!p.input, type: p.type, answer: p.answer, choices: !!p.choices, index: window.__econApp.getState().index };
  });
  check(typed.hasInput, 'DSE 測驗第 3 題應為鍵入答案，實際 ' + JSON.stringify(typed));
  await shot(page, 'practice-typed');
  await page.type('#typedAnswer', String(typed.answer));
  await page.click('#typedSubmit');
  await sleep(300);
  const typedOk = await page.evaluate(() => (document.getElementById('feedback') || {}).textContent || '');
  check(typedOk.length > 0, '鍵入答案有回饋');

  /* 9. 手機版首頁 */
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.evaluate(() => window.__econApp.navigate({ screen: 'home' }));
  await sleep(250);
  await blur(page);
  await shot(page, 'home-mobile');

  await browser.close();
  if (errors.length) {
    throw new Error('瀏覽器 console/page errors:\n' + errors.slice(0, 10).join('\n'));
  }
  console.log('✓ 瀏覽器冒煙測試通過（' + checks + ' 項檢查），截圖輸出至 tests/_shots/');
}

main().catch((e) => { console.error('✗ 瀏覽器冒煙測試失敗：', e && e.message || e); process.exit(1); });
