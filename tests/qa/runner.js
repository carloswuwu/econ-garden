/*
 * tests/qa/runner.js — QA 答案正確性審計框架
 * 對每個題型的每一個（技能, 難度）組合抽樣，呼叫獨立重算函數，比對生成器答案。
 * 執行：node tests/qa/chk-micro.js 等；結果寫入 tests/qa/_results-*.json。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const H = require('./harness');

const TOL = 0.011;

function isNum(v) { return typeof v === 'number' && isFinite(v); }
function near(a, b, tol) { return isNum(a) && isNum(b) && Math.abs(a - b) <= (tol == null ? TOL : tol); }
function round2(v) { return Math.round(v * 100) / 100; }
function fmt2(v) { return String(round2(v)); }
function numsIn(s) {
  const out = [];
  /* 只取「看起來是資料值」的數字（至少兩位數或有小數），避免中英文量詞差異造成假警報 */
  String(s || '').replace(/(\d[\d,]*(?:\.\d+)?)/g, function (m) {
    out.push(m.replace(/,/g, ''));
    return m;
  });
  return out;
}

const ISSUES = {};       // type -> [ {kind, msg, ex:[...]} ]
const SAMPLE_COUNT = {};
const GEN_ERRORS = {};

function addIssue(type, kind, msg, ex) {
  ISSUES[type] = ISSUES[type] || [];
  let it = ISSUES[type].find((x) => x.kind === kind);
  if (!it) { it = { kind, msg, examples: [] }; ISSUES[type].push(it); }
  if (it.examples.length < 3) it.examples.push(ex);
  it.count = (it.count || 0) + 1;
}

const LONG_DEC = /-?\d+\.\d{4,}/;
const BAD_TEXT = /\b(undefined|NaN|Infinity|null)\b/;

function genericChecks(type, p, ctx) {
  const where = ctx.where;
  const ex = () => ({
    where, seed: ctx.seed, zh: String(p.prompt.zh).slice(0, 220),
    answer: p.answer, math: p.math
  });

  ['zh', 'en'].forEach((lang) => {
    if (LONG_DEC.test(String(p.prompt[lang]))) addIssue(type, 'long-decimal-prompt', '題幹出現超過 2 位小數的數字（多為浮點誤差未格式化）', Object.assign(ex(), { text: String(p.prompt[lang]).match(LONG_DEC)[0], lang }));
    if (BAD_TEXT.test(String(p.prompt[lang]))) addIssue(type, 'bad-token-prompt', '題幹出現 undefined/NaN/Infinity/null', Object.assign(ex(), { text: String(p.prompt[lang]).match(BAD_TEXT)[0], lang }));
  });
  if (p.solution) {
    ['zh', 'en'].forEach((lang) => {
      const txt = (p.solution[lang] || []).join(' ');
      if (BAD_TEXT.test(txt)) addIssue(type, 'bad-token-solution', '解題步驟出現 undefined/NaN/Infinity/null', Object.assign(ex(), { text: txt.match(BAD_TEXT)[0], lang }));
      const m = txt.match(LONG_DEC);
      if (m) addIssue(type, 'long-decimal-solution', '解題步驟出現超過 2 位小數的數字（可能是浮點誤差或合法中間值）', Object.assign(ex(), { text: m[0], lang }));
    });
  }
  if (p.hint) {
    ['zh', 'en'].forEach((lang) => {
      if (BAD_TEXT.test(String(p.hint[lang]))) addIssue(type, 'bad-token-hint', '提示出現 undefined/NaN/Infinity/null', Object.assign(ex(), { lang }));
    });
  }

  /* 中英題幹數字一致性（粗略：只比較多位數／小數，避開中英文量詞與單數字差異） */
  const z = numsIn(p.prompt.zh).filter((x) => x.length >= 2 || x.indexOf('.') !== -1).sort();
  const e = numsIn(p.prompt.en).filter((x) => x.length >= 2 || x.indexOf('.') !== -1).sort();
  if (z.join(',') !== e.join(',')) {
    addIssue(type, 'zh-en-number-mismatch', '中文與英文題幹的（多位數）數字集合不一致', Object.assign(ex(), { zhNums: numsIn(p.prompt.zh), enNums: numsIn(p.prompt.en) }));
  }

  /* 答案是否為數字且超過 2 位小數 */
  if (isNum(p.answer) && Math.abs(p.answer * 100 - Math.round(p.answer * 100)) > 1e-6) {
    addIssue(type, 'answer-more-than-2dp', '數值答案超過 2 位小數', ex());
  }

  /* 答案是否出現在解題步驟（只檢查數值答案；文字答案逐型人工核對選項語義） */
  if (p.solution && p.solution.zh && isNum(p.answer)) {
    const txt = p.solution.zh.join(' ').replace(/,/g, ''); /* 去掉千位分隔 */
    const cands = [String(p.answer), fmt2(p.answer), String(round2(p.answer))];
    if (Number.isInteger(p.answer)) cands.push(String(p.answer));
    const found = cands.some((c) => txt.indexOf(String(c).replace(/,/g, '')) !== -1);
    if (!found) addIssue(type, 'answer-not-in-solution', '解題步驟未出現最終答案', ex());
  }

  /* 答案是否在選項中（引擎通常會補，但若是自訂 choices 可能漏） */
  if (!p.input && p.choices && !p.choices.some((c) => H.Core.valuesEqual(p.answer, c))) {
    addIssue(type, 'answer-not-in-choices', '答案不在選項中', ex());
  }
}

/* fn(p) -> { expected, tol?, note? }；expected 可為數字或字串 */
function audit(type, fn, opts) {
  opts = opts || {};
  const per = opts.n || 30;
  const pairs = H.pairs(type);
  if (!pairs.length) { addIssue(type, 'no-skill', '沒有技能引用此題型', {}); return; }
  let n = 0;
  pairs.forEach((pr) => {
    for (let i = 0; i < per; i++) {
      const seed = 40000 + i * 137 + pr.step * 17;
      const where = pr.skill.id + '/step' + pr.step + '(L' + pr.level + ')';
      let p;
      try {
        p = H.Core.generateProblem(pr.skill, { seed, difficultyStep: pr.step, type });
      } catch (e) {
        GEN_ERRORS[type] = (GEN_ERRORS[type] || 0) + 1;
        addIssue(type, 'generate-error', '生成器拋錯', { where, seed, error: e.message });
        continue;
      }
      n++;
      SAMPLE_COUNT[type] = (SAMPLE_COUNT[type] || 0) + 1;
      genericChecks(type, p, { where, seed });
      let res;
      try { res = fn(p, pr); } catch (e) { res = { error: e.message }; }
      if (!res) continue;
      if (res.error) { addIssue(type, 'check-error', '重算時出錯（QA 腳本問題）', { where, seed, error: res.error, math: p.math }); continue; }
      const tol = res.tol == null ? TOL : res.tol;
      let ok;
      if (typeof res.expected === 'number') ok = near(p.answer, res.expected, tol);
      else ok = String(p.answer) === String(res.expected);
      if (!ok) {
        addIssue(type, 'answer-mismatch', res.note || '生成器答案與獨立重算不符', {
          where, seed, zh: String(p.prompt.zh).slice(0, 320),
          answer: p.answer, expected: res.expected, math: p.math,
          choices: p.choices, labels: p.choiceLabels ? JSON.stringify(p.choiceLabels).slice(0, 300) : undefined,
          solution: p.solution ? p.solution.zh.join(' // ').slice(0, 400) : undefined
        });
      }
      if (res.extra) res.extra(p);
    }
  });
  /* 直接呼叫生成器測試「技能不可達」的難度分支（例如挑戰區技能最低已由 level 2 起） */
  (opts.directLevels || []).forEach((lv) => {
    for (let i = 0; i < per; i++) {
      const seed = 82000 + i * 149 + lv * 11;
      const where = 'direct/level' + lv;
      let p;
      try {
        const rng = H.Core.seedRandom(seed);
        p = H.ED.types[type](rng, { level: lv });
      } catch (e) {
        GEN_ERRORS[type] = (GEN_ERRORS[type] || 0) + 1;
        addIssue(type, 'generate-error', '生成器拋錯（直接指定 level）', { where, seed, error: e.message });
        continue;
      }
      n++;
      SAMPLE_COUNT[type] = (SAMPLE_COUNT[type] || 0) + 1;
      genericChecks(type, p, { where, seed });
      let res;
      try { res = fn(p, { directLevel: lv }); } catch (e) { res = { error: e.message }; }
      if (!res) continue;
      if (res.error) { addIssue(type, 'check-error', '重算時出錯（QA 腳本問題）', { where, seed, error: res.error, math: p.math }); continue; }
      const tol = res.tol == null ? TOL : res.tol;
      const ok = typeof res.expected === 'number' ? near(p.answer, res.expected, tol) : String(p.answer) === String(res.expected);
      if (!ok) {
        addIssue(type, 'answer-mismatch', res.note || '生成器答案與獨立重算不符（直接 level）', {
          where, seed, zh: String(p.prompt.zh).slice(0, 320), answer: p.answer, expected: res.expected, math: p.math,
          solution: p.solution ? p.solution.zh.join(' // ').slice(0, 400) : undefined
        });
      }
    }
  });
  return n;
}

function finish(name) {
  const types = Object.keys(ISSUES).sort();
  const out = {};
  let failCount = 0;
  types.forEach((t) => {
    const hard = ISSUES[t].filter((x) => ['answer-mismatch', 'generate-error', 'check-error', 'bad-token-prompt', 'bad-token-solution', 'answer-not-in-choices'].indexOf(x.kind) !== -1);
    const minor = ISSUES[t].filter((x) => hard.indexOf(x) === -1);
    out[t] = { samples: SAMPLE_COUNT[t] || 0, fail: hard, minor };
    if (hard.length) failCount++;
  });
  const summary = {
    file: name,
    types: types.length,
    failTypes: failCount,
    sampleTotal: Object.keys(SAMPLE_COUNT).reduce((s, k) => s + SAMPLE_COUNT[k], 0),
    results: out,
    genErrors: GEN_ERRORS
  };
  fs.writeFileSync(path.join(__dirname, '_results-' + name + '.json'), JSON.stringify(summary, null, 1), 'utf8');
  console.log('[' + name + '] 題型 ' + types.length + '，樣本 ' + summary.sampleTotal + '，FAIL 題型 ' + failCount);
  types.forEach((t) => {
    const r = out[t];
    if (!r.fail.length && !r.minor.length) { console.log('  PASS  ' + t + ' (' + r.samples + ')'); return; }
    console.log('  ' + (r.fail.length ? 'FAIL' : 'pass*') + '  ' + t + ' (' + r.samples + ')');
    r.fail.forEach((f) => {
      console.log('     ✗ [' + f.kind + '×' + (f.count || 1) + '] ' + f.msg);
      (f.examples || []).slice(0, 2).forEach((e) => console.log('        · ' + (e.where || '') + ' seed=' + e.seed + ' answer=' + JSON.stringify(e.answer) + ' expected=' + JSON.stringify(e.expected) + (e.zh ? ' | ' + e.zh.slice(0, 120) : '') + (e.text ? ' | ' + e.text : '')));
    });
    r.minor.forEach((f) => {
      console.log('     ~ [' + f.kind + '×' + (f.count || 1) + '] ' + f.msg);
      (f.examples || []).slice(0, 2).forEach((e) => console.log('        · ' + (e.where || '') + ' seed=' + e.seed + (e.text ? ' text=' + e.text : '') + (e.zhNums ? ' zh=' + JSON.stringify(e.zhNums) + ' en=' + JSON.stringify(e.enNums) : '') + (e.zh ? ' | ' + e.zh.slice(0, 100) : '')));
    });
  });
}

module.exports = { audit, finish, near, isNum, round2, fmt2, numsIn, addIssue, TOL };
