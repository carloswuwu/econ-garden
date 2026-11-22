/*
 * tests/qa/harness.js — QA 審計用的載入器（唯讀，不修改任何內容檔）
 * 以 tests/qa/snapshot/ 內的固定快照載入（避免其他代理同時改檔造成不一致）。
 * 快照 sha256 見 tests/qa/snapshot/SHA256SUMS.txt。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..', '..');
const SNAP = path.join(__dirname, 'snapshot');
/* QA_LIVE=1 時改讀工作區最新的 content/types-*.js（跟進稽核用）；預設讀固定快照 */
const LIVE = process.env.QA_LIVE === '1';

function load() {
  const sandbox = {
    console: { log() {}, warn() {}, error() {} },
    Date,
    Math,
    JSON,
    setTimeout,
    clearTimeout,
    document: { querySelector: () => null },
    location: { protocol: 'file:', hash: '' },
    navigator: {}
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  const ctx = vm.createContext(sandbox);
  const files = [
    'econ-boot.js',
    'i18n.js',
    'types-micro.js',
    'types-micro2.js',
    'types-welfare.js',
    'types-macro.js',
    'types-international.js',
    'types-applied.js',
    'stage-s1.js',
    'stage-s2.js',
    'stage-s3.js',
    'stage-s4.js',
    'stage-s5.js',
    'stage-s6.js',
    'stage-college.js',
    'stage-challenge.js',
    'econ-core.js'
  ];
  for (const rel of files) {
    const isContent = rel.indexOf('types-') === 0 || rel.indexOf('stage-') === 0;
    const abs = LIVE
      ? (isContent ? path.join(ROOT, 'content', rel) : path.join(ROOT, rel))
      : path.join(SNAP, rel);
    if (!fs.existsSync(abs)) continue;
    vm.runInContext(fs.readFileSync(abs, 'utf8'), ctx, { filename: (LIVE ? 'content/' : 'snapshot/') + rel });
  }
  const ED = sandbox.EconData;
  const Core = sandbox.MathCore;
  return { ED, Core };
}

const { ED, Core } = load();

/* type -> [{skill, levels, opts}] */
function typeMap() {
  const map = {};
  Object.keys(ED.skills).forEach((id) => {
    const s = ED.skills[id];
    (s.types || []).forEach((spec) => {
      const t = typeof spec === 'string' ? spec : spec.t;
      if (t === 'bank') return;
      (map[t] = map[t] || []).push({ skill: id, levels: (s.levels || [{}]).length, opts: (typeof spec === 'object' && spec.opts) || null });
    });
  });
  return map;
}

/* 選一個能達到指定 level 的技能（優先 3 級技能） */
function skillFor(type, level) {
  const map = typeMap();
  const list = map[type] || [];
  const ok = list.filter((x) => x.levels >= level);
  const pool = ok.length ? ok : list;
  if (!pool.length) throw new Error('no skill for type ' + type);
  pool.sort((a, b) => b.levels - a.levels);
  return ED.skills[pool[0].skill];
}

function generate(type, level, seed) {
  const s = skillFor(type, level);
  const step = Math.min(level - 1, (s.levels || [{}]).length - 1);
  return Core.generateProblem(s, { seed, difficultyStep: step, type });
}

/* 列出引用某題型的所有 (skill, step) 組合；step 的 o.level 由技能 levels 決定 */
function pairs(type) {
  const map = typeMap();
  const out = [];
  (map[type] || []).forEach(({ skill }) => {
    const s = ED.skills[skill];
    (s.levels || [{}]).forEach((lvl, step) => {
      out.push({ skill: s, step, level: lvl.level || step + 1, mode: lvl.mode });
    });
  });
  return out;
}

function sample(type, level, n, fn) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const seed = 90000 + i * 131 + (level - 1) * 7;
    let p;
    try {
      p = generate(type, level, seed);
    } catch (e) {
      out.push({ error: e.message, seed });
      continue;
    }
    if (fn) fn(p);
    out.push(p);
  }
  return out;
}

module.exports = { ED, Core, typeMap, skillFor, pairs, generate, sample, ROOT, SNAP };

/* CLI: node tests/qa/harness.js list */
if (require.main === module) {
  const map = typeMap();
  const types = Object.keys(ED.types).sort();
  console.log('已註冊題型 ' + types.length + ' 個；技能 ' + Object.keys(ED.skills).length + ' 個');
  types.forEach((t) => {
    const list = map[t] || [];
    const lv = Array.from(new Set(list.map((x) => x.levels))).sort();
    console.log(t.padEnd(24) + ' levels=' + lv.join('/') + '  skills=' + list.map((x) => x.skill).join(','));
  });
  const unused = types.filter((t) => !map[t]);
  const missing = Object.keys(map).filter((t) => !ED.types[t]);
  console.log('未被技能引用: ' + (unused.join(',') || '（無）'));
  console.log('技能引用但未註冊: ' + (missing.join(',') || '（無）'));
}
