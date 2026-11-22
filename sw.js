/* 經濟學園 · Service Worker（離線快取）
 * 策略：導覽請求網路優先（3 秒超時回退 index.html）；其他同源資源網路優先、失敗回快取。
 * 更新版本時遞增 CACHE 名稱，舊快取會在 activate 時刪除。 */
const CACHE = 'econ-garden-v1';
const NAV_TIMEOUT_MS = 3000;
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './econ-boot.js',
  './econ-core.js',
  './i18n.js',
  './formulas.js',
  './curriculum-outline.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './content/types-micro.js',
  './content/types-micro2.js',
  './content/types-welfare.js',
  './content/types-macro.js',
  './content/types-international.js',
  './content/types-applied.js',
  './content/stage-s1.js',
  './content/stage-s2.js',
  './content/stage-s3.js',
  './content/stage-s4.js',
  './content/stage-s5.js',
  './content/stage-s6.js',
  './content/stage-college.js',
  './content/stage-challenge.js',
  './content/lessons-junior.js',
  './content/lessons-s4.js',
  './content/lessons-s6.js',
  './content/lessons-college.js',
  './vendor/katex/katex.min.js',
  './vendor/katex/katex.min.css',
  './vendor/katex/fonts/KaTeX_AMS-Regular.woff2',
  './vendor/katex/fonts/KaTeX_Caligraphic-Bold.woff2',
  './vendor/katex/fonts/KaTeX_Caligraphic-Regular.woff2',
  './vendor/katex/fonts/KaTeX_Fraktur-Bold.woff2',
  './vendor/katex/fonts/KaTeX_Fraktur-Regular.woff2',
  './vendor/katex/fonts/KaTeX_Main-Bold.woff2',
  './vendor/katex/fonts/KaTeX_Main-BoldItalic.woff2',
  './vendor/katex/fonts/KaTeX_Main-Italic.woff2',
  './vendor/katex/fonts/KaTeX_Main-Regular.woff2',
  './vendor/katex/fonts/KaTeX_Math-BoldItalic.woff2',
  './vendor/katex/fonts/KaTeX_Math-Italic.woff2',
  './vendor/katex/fonts/KaTeX_SansSerif-Bold.woff2',
  './vendor/katex/fonts/KaTeX_SansSerif-Italic.woff2',
  './vendor/katex/fonts/KaTeX_SansSerif-Regular.woff2',
  './vendor/katex/fonts/KaTeX_Script-Regular.woff2',
  './vendor/katex/fonts/KaTeX_Size1-Regular.woff2',
  './vendor/katex/fonts/KaTeX_Size2-Regular.woff2',
  './vendor/katex/fonts/KaTeX_Size3-Regular.woff2',
  './vendor/katex/fonts/KaTeX_Size4-Regular.woff2',
  './vendor/katex/fonts/KaTeX_Typewriter-Regular.woff2'
];

function isNavigation(req) {
  return req.mode === 'navigate' ||
    (req.headers && (req.headers.get('accept') || '').indexOf('text/html') !== -1);
}

function putInCache(req, res) {
  if (!res || !res.ok) return;
  const copy = res.clone();
  caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
}

function navigationFetch(req) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('navigation timeout')), NAV_TIMEOUT_MS);
    fetch(req).then((res) => {
      clearTimeout(timer);
      putInCache(req, res);
      resolve(res);
    }, (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.allSettled(ASSETS.map((url) => c.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  if (isNavigation(req)) {
    e.respondWith(
      navigationFetch(req).catch(() =>
        caches.match(req).then((hit) => hit || caches.match('./index.html'))
      )
    );
    return;
  }

  e.respondWith(
    fetch(req).then((res) => {
      putInCache(req, res);
      return res;
    }).catch(() =>
      caches.match(req).then((hit) => hit || Response.error())
    )
  );
});
