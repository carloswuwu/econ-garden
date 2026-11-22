/*
 * tests/a11y-smoke.js — 無障礙冒煙測試（puppeteer + axe-core，可選）
 * 需要 puppeteer-core、Chrome/Edge 與 axe-core（沒有會自動跳過）。
 * 用法：node tests/a11y-smoke.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

function tryRequire(name) {
  try { return require(name); } catch (e) { /* fall through */ }
  try { return require(path.join(__dirname, '..', '..', 'math', 'node_modules', name)); } catch (e) { /* fall through */ }
  try { return require(path.join(__dirname, '..', '..', 'math', 'tests', 'node_modules', name)); } catch (e) { /* fall through */ }
  return null;
}
const puppeteer = tryRequire('puppeteer-core');
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];
const chrome = CHROME_PATHS.find((p) => fs.existsSync(p));
let axePath = null;
for (const p of [
  path.join(__dirname, '..', '..', 'math', 'tests', 'node_modules', 'axe-core', 'axe.min.js'),
  path.join(__dirname, 'node_modules', 'axe-core', 'axe.min.js')
]) if (fs.existsSync(p)) { axePath = p; break; }
if (!puppeteer || !chrome || !axePath) {
  console.log('（略過 a11y-smoke：需要 puppeteer-core、Chrome/Edge、axe-core）');
  process.exit(0);
}
const AXE = fs.readFileSync(axePath, 'utf8');
const URL = 'file:///' + path.join(__dirname, '..', 'index.html').replace(/\\/g, '/');
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

(async () => {
  const browser = await puppeteer.launch({ executablePath: chrome, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1180, height: 900 });
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForSelector('#screen-home .stage-card');
  await sleep(300);

  let issues = 0;
  async function audit(name, selectorsToCheck) {
    await page.addScriptTag({ content: AXE });
    const res = await page.evaluate(async () => {
      const r = await window.axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }
      });
      return r.violations.map((v) => ({
        id: v.id, impact: v.impact, help: v.help,
        nodes: v.nodes.slice(0, 4).map((n) => n.target.join(' '))
      }));
    });
    for (const v of res) {
      if (v.impact === 'serious' || v.impact === 'critical') {
        issues++;
        console.log('✗ [' + name + '] ' + v.id + ' (' + v.impact + '): ' + v.help);
        v.nodes.forEach((n) => console.log('    ' + n));
      }
    }
    const headings = await page.evaluate(() => Array.from(document.querySelectorAll('h1')).filter((h) => !h.closest('[hidden]') && h.offsetParent !== null).map((h) => h.textContent.trim()));
    if (headings.length !== 1) { issues++; console.log('✗ [' + name + '] 可見 h1 數量應為 1，實際 ' + headings.length + '：' + JSON.stringify(headings)); }
  }

  await audit('home');
  await page.click('#screen-home .stage-card[data-stage="s1"]');
  await page.waitForSelector('#screen-stage .skill-card');
  await audit('stage');
  await page.click('#screen-stage .skill-card[data-skill="s1.money"]');
  await page.waitForSelector('#screen-lesson .lesson-card');
  await audit('lesson');
  await page.click('#lessonPractice');
  await page.waitForSelector('#screen-practice .choice');
  await audit('practice');
  await page.evaluate(() => window.__econApp.navigate({ screen: 'formulas' }));
  await page.waitForSelector('#screen-formulas .formula-row');
  await audit('formulas');
  await page.evaluate(() => window.__econApp.navigate({ screen: 'outline' }));
  await page.waitForSelector('#screen-outline .outline-stage');
  await audit('outline');
  await browser.close();
  if (issues) { console.error('✗ 無障礙測試發現 ' + issues + ' 項 serious/critical 問題'); process.exit(1); }
  console.log('✓ 無障礙冒煙測試通過（無 serious/critical 違規）');
})().catch((e) => { console.error('✗ 無障礙測試失敗：', e && e.message || e); process.exit(1); });
