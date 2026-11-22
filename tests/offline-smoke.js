/*
 * tests/offline-smoke.js — PWA 離線冒煙測試
 * 先執行 `node tests/serve.js 4173`，再執行 `node tests/offline-smoke.js [url]`。
 * 需要 puppeteer-core + Chrome/Edge；沒有會自動跳過。
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
const puppeteer = loadPuppeteer();
const chrome = CHROME_PATHS.find((p) => fs.existsSync(p));
if (!puppeteer || !chrome) {
  console.log('（略過 offline-smoke：需要 puppeteer-core 與 Chrome/Edge）');
  process.exit(0);
}
const URL = process.argv[2] || 'http://127.0.0.1:4173/index.html';
const SHOTS = path.join(__dirname, '_shots');
fs.mkdirSync(SHOTS, { recursive: true });
let checks = 0;
function check(cond, msg) { checks++; if (!cond) throw new Error(msg); }
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chrome,
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--hide-scrollbars']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1180, height: 900 });
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForSelector('#screen-home .stage-card', { timeout: 8000 });
  const sw = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return { supported: false };
    const reg = await navigator.serviceWorker.ready;
    return { supported: true, active: !!reg.active };
  });
  check(sw.supported && sw.active, 'Service Worker 應註冊並啟用');
  await sleep(1500); // 等待 precache 完成
  const cached = await page.evaluate(async () => {
    const keys = await caches.keys();
    const c = await caches.open(keys[0]);
    const reqs = await c.keys();
    return { keys, count: reqs.length };
  });
  check(cached.count >= 30, 'precache 應有 >= 30 個資源，實際 ' + cached.count);

  await page.setOfflineMode(true);
  await page.reload({ waitUntil: 'load' });
  await page.waitForSelector('#screen-home .stage-card', { timeout: 8000 });
  const offlineHome = await page.evaluate(() => ({
    stages: document.querySelectorAll('#screen-home .stage-card').length,
    text: document.body.textContent
  }));
  check(offlineHome.stages === 7, '離線重新載入後首頁仍有 7 個階段');
  check(offlineHome.text.includes('經濟學園'), '離線首頁內容正常');
  await page.screenshot({ path: path.join(SHOTS, 'offline-home.png') });

  await page.click('#screen-home .stage-card[data-stage="s1"]');
  await page.waitForSelector('#screen-stage .skill-card');
  await page.click('#screen-stage .skill-card[data-skill="s1.money"]');
  await page.waitForSelector('#screen-lesson .lesson-card');
  const offlineLesson = await page.evaluate(() => document.querySelector('#screen-lesson').textContent);
  check(offlineLesson.includes('金錢的功能'), '離線仍可打開小課堂（lessons 已快取）');
  await page.screenshot({ path: path.join(SHOTS, 'offline-lesson.png') });

  await browser.close();
  console.log('✓ PWA 離線冒煙測試通過（' + checks + ' 項檢查）');
})().catch((e) => { console.error('✗ PWA 離線冒煙測試失敗：', e && e.message || e); process.exit(1); });
