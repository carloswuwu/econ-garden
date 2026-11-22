/*
 * tests/dev-gen-check.js — 內容與生成器自檢（Node，無需瀏覽器）
 * 用法：
 *   node tests/dev-gen-check.js                 # 檢查全部
 *   node tests/dev-gen-check.js --only=ped      # 只檢查某題型
 *   node tests/dev-gen-check.js --skill=s4.ped  # 只檢查某技能
 *
 * 它會用 vm 依 index.html 的順序載入 econ-boot、content/*.js、econ-core.js，
 * 對每個技能 × 每個難度 × 每種題型抽樣，檢查題目契約與答案是否自洽。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const args = process.argv.slice(2);
const onlyType = (args.find(a => a.startsWith('--only=')) || '').slice(7);
const onlySkill = (args.find(a => a.startsWith('--skill=')) || '').slice(8);

const sandbox = {
  console,
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
  'content/types-micro.js',
  'content/types-micro2.js',
  'content/types-welfare.js',
  'content/types-macro.js',
  'content/types-international.js',
  'content/types-applied.js',
  'content/stage-s1.js',
  'content/stage-s2.js',
  'content/stage-s3.js',
  'content/stage-s4.js',
  'content/stage-s5.js',
  'content/stage-s6.js',
  'content/stage-college.js',
  'content/stage-challenge.js',
  'content/lessons-junior.js',
  'content/lessons-s4.js',
  'content/lessons-s6.js',
  'content/lessons-college.js',
  'econ-core.js',
  'formulas.js',
  'curriculum-outline.js'
];

const missingFiles = [];
for (const rel of files) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) { missingFiles.push(rel); continue; }
  vm.runInContext(fs.readFileSync(abs, 'utf8'), ctx, { filename: rel });
}

const ED = sandbox.EconData;
const Core = sandbox.MathCore;
if (!ED || !Core) {
  console.error('載入失敗：EconData 或 MathCore 不存在');
  process.exit(1);
}

const errors = [];
const warnings = [];
const notes = [];
function err(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

function isObj(v) { return v && typeof v === 'object' && !Array.isArray(v); }
function nonEmptyStr(v) { return typeof v === 'string' && v.trim().length > 0; }
function dollarBalance(label, s, where) {
  if (typeof s !== 'string') return;
  const n = (s.match(/\$/g) || []).length;
  if (n % 2) err(where + ': ' + label + ' 的 $ 數量為奇數（KaTeX 分隔符未成對）');
}
function checkLesson(id, lesson) {
  if (!isObj(lesson)) { err(id + ': 課堂必須是物件'); return; }
  ['zh', 'en'].forEach((lang) => {
    const l = lesson[lang];
    const where = id + '/lesson/' + lang;
    if (!isObj(l)) { err(where + ': 缺少語言物件'); return; }
    ['intro', 'example', 'tip', 'mistake'].forEach((k) => {
      if (!nonEmptyStr(l[k])) err(where + ': ' + k + ' 必須是非空字串');
      else dollarBalance(k, l[k], where);
    });
    if (!Array.isArray(l.glossary) || l.glossary.length < 2) {
      err(where + ': glossary 至少要有 2 個術語');
    } else {
      l.glossary.forEach((g, i) => {
        if (!nonEmptyStr(g.term) || !nonEmptyStr(g.def)) err(where + ': glossary[' + i + '] 需要 term/def');
      });
    }
    if (l.steps != null) {
      if (!Array.isArray(l.steps) || !l.steps.length) err(where + ': steps 必須是非空陣列');
      else l.steps.forEach((s, i) => { if (!nonEmptyStr(s)) err(where + ': steps[' + i + '] 為空'); });
    }
  });
  if (lesson.zh && lesson.en && lesson.zh.steps && lesson.en.steps && lesson.zh.steps.length !== lesson.en.steps.length) {
    warn(id + ': 中英 steps 長度不同');
  }
}
function checkTextPair(label, v, where) {
  if (!isObj(v) || !nonEmptyStr(v.zh) || !nonEmptyStr(v.en)) err(where + ': ' + label + ' 必須是 {zh,en} 非空字串');
}
function checkProblem(p, where) {
  checkTextPair('prompt', p.prompt, where);
  checkTextPair('hint', p.hint, where);
  if (isObj(p.prompt)) { dollarBalance('prompt.zh', p.prompt.zh, where); dollarBalance('prompt.en', p.prompt.en, where); }
  if (isObj(p.hint)) { dollarBalance('hint.zh', p.hint.zh, where); dollarBalance('hint.en', p.hint.en, where); }
  if (!isObj(p.solution) || !Array.isArray(p.solution.zh) || !Array.isArray(p.solution.en) ||
      !p.solution.zh.length || p.solution.zh.length !== p.solution.en.length) {
    err(where + ': solution 必須有長度相同的中英步驟陣列');
  } else {
    p.solution.zh.forEach((s, i) => { if (!nonEmptyStr(s)) err(where + ': solution.zh[' + i + '] 為空'); else dollarBalance('solution.zh[' + i + ']', s, where); });
    p.solution.en.forEach((s, i) => { if (!nonEmptyStr(s)) err(where + ': solution.en[' + i + '] 為空'); else dollarBalance('solution.en[' + i + ']', s, where); });
  }
  if (p.answer === undefined || p.answer === null) err(where + ': 缺少 answer');
  if (typeof p.answer === 'number' && !isFinite(p.answer)) err(where + ': answer 不是有限數字');
  if (typeof p.answer === 'string' && !nonEmptyStr(p.answer)) err(where + ': answer 字串為空');
  if (p.input) return;
  if (!Array.isArray(p.choices)) { err(where + ': 缺少 choices'); return; }
  if (p.choices.length < 3 || p.choices.length > 6) err(where + ': choices 數量 ' + p.choices.length + '（應 3–6）');
  const seen = new Set();
  p.choices.forEach((c) => {
    const k = String(c);
    if (seen.has(k)) err(where + ': choices 有重複選項 ' + k);
    seen.add(k);
  });
  const ok = p.choices.some((c) => Core.valuesEqual(p.answer, c));
  if (!ok) err(where + ': 正確答案不在 choices 中');
  if (p.choiceLabels) {
    p.choices.forEach((c) => {
      const lab = p.choiceLabels[String(c)];
      if (!lab || !nonEmptyStr(lab.zh) || !nonEmptyStr(lab.en)) err(where + ': choiceLabels 缺少/格式錯 ' + c);
    });
  }
}

/* 技能層檢查 */
const stageSkillIds = [];
ED.stages.forEach((stage) => {
  stage.topics.forEach((topic) => topic.skills.forEach((id) => {
    stageSkillIds.push(id);
    const s = ED.skills[id];
    if (!s) { err('階段 ' + stage.id + ' 引用未註冊技能 ' + id); return; }
    if (s.stage !== stage.id) err(id + ': stage 欄位應為 ' + stage.id + '，實際 ' + s.stage);
  }));
});
Object.keys(ED.skills).forEach((id) => {
  if (stageSkillIds.indexOf(id) === -1) err('技能 ' + id + ' 沒有被任何階段 topic 引用');
});

let generated = 0;
const typeSeen = new Set();
Object.keys(ED.skills).forEach((id) => {
  if (onlySkill && id !== onlySkill) return;
  const s = ED.skills[id];
  if (!s.types || !s.types.length) { err(id + ': 缺少 types'); return; }
  if (!ED.lessons[id]) warn(id + ': 缺少課堂內容');
  else checkLesson(id, ED.lessons[id]);
  const levels = Math.max(1, (s.levels || [{}]).length);
  s.types.forEach((spec) => {
    const t = typeof spec === 'string' ? spec : spec.t;
    if (onlyType && t !== onlyType) return;
    typeSeen.add(t);
    if (t !== 'bank' && !ED.types[t]) { err(id + ': 題型未實作 ' + t); return; }
    if (t === 'bank') {
      if (!s.bank || !s.bank.length) { err(id + ': 題型 bank 但沒有題庫'); return; }
      if (s.bank.length < 6) warn(id + ': 題庫只有 ' + s.bank.length + ' 題（建議 6–10 題，10 題測驗才不會重複）');
      s.bank.forEach((q) => {
        if (!nonEmptyStr(q.id)) err(id + ': 題庫項目缺少 id');
        checkTextPair('prompt', q.prompt, id + '/bank/' + q.id);
        checkTextPair('hint', q.hint, id + '/bank/' + q.id);
        if (!Array.isArray(q.choices) || q.choices.length < 3) err(id + '/bank/' + q.id + ': choices 少於 3');
        const ids = (q.choices || []).map((c) => String(c.id));
        if (ids.indexOf(String(q.answer)) === -1) err(id + '/bank/' + q.id + ': answer 不在選項 id 中');
        if (new Set(ids).size !== ids.length) err(id + '/bank/' + q.id + ': 選項 id 重複');
        (q.choices || []).forEach((c) => { if (!nonEmptyStr(c.zh) || !nonEmptyStr(c.en)) err(id + '/bank/' + q.id + ': 選項缺少雙語'); });
        if (!isObj(q.solution) || !Array.isArray(q.solution.zh) || !Array.isArray(q.solution.en)) {
          err(id + '/bank/' + q.id + ': solution 必須有 zh/en 步驟陣列');
        } else if (!q.solution.zh.length || q.solution.zh.length !== q.solution.en.length) {
          err(id + '/bank/' + q.id + ': 解題步驟中英長度不同或為空');
        } else {
          q.solution.zh.forEach((s, i) => { if (!nonEmptyStr(s)) err(id + '/bank/' + q.id + ': solution.zh[' + i + '] 為空'); });
          q.solution.en.forEach((s, i) => { if (!nonEmptyStr(s)) err(id + '/bank/' + q.id + ': solution.en[' + i + '] 為空'); });
        }
      });
      return;
    }
    for (let step = 0; step < levels; step++) {
      for (let n = 0; n < 25; n++) {
        let p;
        try {
          p = Core.generateProblem(s, { seed: 1000 + n * 97 + step, difficultyStep: step, type: t });
        } catch (e) {
          err(id + ' / ' + t + ' (level ' + step + ', sample ' + n + '): 生成失敗 — ' + e.message);
          break;
        }
        generated++;
        checkProblem(p, id + ' / ' + t + ' (level ' + step + ', sample ' + n + ')');
        if (p.sig !== p.sig) err(id + ' / ' + t + ': sig 為 NaN');
      }
    }
  });
});

/* 組卷檢查 */
if (!onlySkill && !onlyType) {
  ED.stages.forEach((stage) => {
    const skillList = [];
    stage.topics.forEach((topic) => topic.skills.forEach((id) => {
      const s = ED.skills[id];
      if (s.types && s.types.length) skillList.push(s);
    }));
    if (!skillList.length) return;
    try {
      const quiz = Core.composeSet(skillList[0], 10, { seed: 7 });
      if (quiz.length !== 10) err(stage.id + ': composeSet 只出 ' + quiz.length + '/10 題');
    } catch (e) { err(stage.id + ': composeSet 失敗 — ' + e.message); }
    try {
      const exam = Core.composeExam(skillList, 20, { seed: 11 });
      if (exam.length !== 20) err(stage.id + ': composeExam 只出 ' + exam.length + '/20 題');
      const sigs = new Set(exam.map((p) => p.sig));
      if (sigs.size < 10) warn(stage.id + ': 20 題考試只有 ' + sigs.size + ' 個不同題目（題庫可能太小）');
    } catch (e) { err(stage.id + ': composeExam 失敗 — ' + e.message); }
  });
}

/* 輸出 */
if (missingFiles.length) console.log('（未建立的檔案，已略過：' + missingFiles.join(', ') + '）');
console.log('已檢查題型：' + Array.from(typeSeen).sort().join(', '));
console.log('抽樣生成：' + generated + ' 題');
if (warnings.length) {
  console.log('\n⚠ 警告 ' + warnings.length + ' 項：');
  warnings.slice(0, 40).forEach((w) => console.log('  - ' + w));
  if (warnings.length > 40) console.log('  … 其餘 ' + (warnings.length - 40) + ' 項');
}
if (errors.length) {
  console.error('\n✗ 錯誤 ' + errors.length + ' 項：');
  errors.slice(0, 60).forEach((e) => console.error('  - ' + e));
  if (errors.length > 60) console.error('  … 其餘 ' + (errors.length - 60) + ' 項');
  process.exit(1);
}
console.log('\n✓ 全部檢查通過');
