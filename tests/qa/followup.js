/* followup.js — 跟進稽核：針對 QA-GENERATORS.md P0/P1 修正逐項驗證（QA_LIVE=1 讀最新 content） */
'use strict';
const H = require('./harness');
if (process.env.QA_LIVE !== '1') console.log('（提示：未設 QA_LIVE=1，將讀取 snapshot/ 舊版）');
const fmt2 = (v) => String(Math.round(v * 100) / 100);
const issues = {};
function bad(key, msg, ex) {
  issues[key] = issues[key] || { n: 0, ex: [] };
  issues[key].n++;
  if (issues[key].ex.length < 3) issues[key].ex.push(ex);
}
function gen(type, skillId, step, seed) {
  return H.Core.generateProblem(H.ED.skills[skillId], { seed, difficultyStep: step, type });
}
function each(type, per, fn) {
  H.pairs(type).forEach((pr) => {
    for (let i = 0; i < (per || 40); i++) {
      let p;
      try { p = H.Core.generateProblem(pr.skill, { seed: 7000 + i * 197 + pr.step * 31, difficultyStep: pr.step, type }); } catch (e) { bad('generate-error', type + ' ' + e.message, {}); continue; }
      fn(p, pr);
    }
  });
}
const CJK = /[\u4e00-\u9fff]/;

/* 1. 浮點亂碼：題幹（prompt）不得再出現 >3 位小數 */
const LONG = /-?\d+\.\d{4,}/;
Object.keys(H.ED.types).sort().forEach((type) => {
  each(type, 30, (p) => {
    ['zh', 'en'].forEach((lang) => {
      const m = String(p.prompt[lang]).match(LONG);
      if (m) bad('float-in-prompt', type + ' ' + lang + ' ' + m[0] + ' :: ' + String(p.prompt[lang]).slice(0, 120), {});
    });
    if (p.hint) ['zh', 'en'].forEach((lang) => {
      const m = String(p.hint[lang]).match(LONG);
      if (m) bad('float-in-hint', type + ' ' + lang + ' ' + m[0], {});
    });
  });
});

/* 2. 中英文題幹數字是否「同量級」：unemployment 以萬人/百萬人換算，允許 ×100 差異 */
{
  each('unemployment', 80, (p) => {
    const zh = String(p.prompt.zh);
    const en = String(p.prompt.en);
    const zhNums = (zh.match(/\d[\d,]*(?:\.\d+)?/g) || []).map((x) => Number(x.replace(/,/g, ''))).filter((x) => x >= 10);
    zhNums.forEach((v) => {
      const asIs = String(v);
      const divided = fmt2(v / 100);
      if (en.indexOf(asIs) === -1 && en.indexOf(divided) === -1) bad('unemployment-en-conversion', 'en 找不到 ' + v + ' 或其 /100 值 ' + divided, { en });
    });
    if (/[^.\d]\d{3,}\s+million/.test(en)) bad('unemployment-en-still-hundred-million', '英文仍有 3 位以上整數 + million', { en });
  });
}

/* 3. ped 分類文字（只檢查 level 1 initial 模式）：answer <= 1 時不得出現「answer > 1」 */
each('ped', 120, (p) => {
  if (p.math.mode !== 'initial') return;
  const a = p.answer;
  const zh = p.solution.zh.join(' ');
  const en = p.solution.en.join(' ');
  const badZh = a <= 1 && zh.indexOf(String(a) + ' > 1') !== -1;
  const badEn = a <= 1 && en.indexOf(String(a) + ' > 1') !== -1;
  if (badZh || badEn) bad('ped-classification', 'answer=' + a + ' 仍寫 > 1 :: ' + zh.slice(0, 140), {});
  if (a < 1 && !(zh.indexOf(String(a) + ' < 1') !== -1 && en.indexOf(String(a) + ' < 1') !== -1)) bad('ped-classification-missing', 'answer=' + a + ' 未見 < 1', { zh: zh.slice(0, 140) });
  if (a === 1 && !(zh.indexOf('1 = 1') !== -1 && en.indexOf('1 = 1') !== -1)) bad('ped-classification-eq1', 'answer=1 未見 = 1', { zh: zh.slice(0, 140) });
});

/* 4. ped_tr：level 1 百分比模式不得再有 PED = 1；且不得顯示 (1 + -0.x) */
{
  const peds = new Set();
  each('ped_tr', 80, (p) => {
    const m = p.math;
    if (m.mode === 'percent') {
      peds.add(m.ped);
      if (Math.abs(m.ped - 1) < 1e-12) bad('ped_tr-unit-elastic', 'PED=1 仍出現', { math: m });
      const txt = p.solution.zh.join(' ');
      if (/\(1 \+ -/.test(txt)) bad('ped_tr-negative-factor', '解題仍出現 (1 + -0.x)', { txt: txt.slice(0, 140) });
    }
    if (m.mode === 'direction' && Math.abs(m.ped - 1) < 1e-12) bad('ped_tr-direction-unit', '方向題 PED=1', { math: m });
  });
  console.log('ped_tr percent 模式出現過的 PED 值：' + Array.from(peds).sort((a, b) => a - b).join(', '));
}

/* 5. 英文文法：舊 bug 字串不得再出現 */
{
  const PATTERNS = [
    [/\b(income|revenue|quantity|demand|demanded|price|output|population|profit|cost|sales|wage|employment)\s+(fall|rise)\s+by\b/, 'singular-subject-fall/rise'],
    [/gives up (play|buy|go|visit|take)\b/, 'gives-up-infinitive'],
    [/chooses to (go|play|buy|visit|take)\b/, 'chooses-to-infinitive-old-style']
  ];
  Object.keys(H.ED.types).sort().forEach((type) => {
    each(type, 20, (p) => {
      ['zh', 'en'].forEach((lang) => {
        [['prompt', p.prompt[lang]], ['hint', p.hint && p.hint[lang]], ['solution', p.solution ? p.solution[lang].join(' ') : '']].forEach(([kind, txt]) => {
          if (!txt) return;
          PATTERNS.forEach(([re, name]) => {
            const m = String(txt).match(re);
            if (m) bad('english-grammar', type + ' ' + kind + ' ' + name + ' :: ' + String(txt).slice(0, 140), {});
          });
        });
      });
    });
  });
}

/* 6. 英文欄位不得夾中文（含 gini） */
Object.keys(H.ED.types).sort().forEach((type) => {
  each(type, 20, (p) => {
    const fields = [['prompt.en', p.prompt.en], ['hint.en', p.hint && p.hint.en], ['solution.en', p.solution ? p.solution.en.join(' ') : '']];
    if (p.choiceLabels) Object.keys(p.choiceLabels).forEach((k) => fields.push(['label.en.' + k, p.choiceLabels[k].en]));
    fields.forEach(([name, txt]) => {
      if (!txt) return;
      const m = String(txt).match(CJK);
      if (m) bad('cjk-in-english', type + ' ' + name + ' 含「' + m[0] + '」 :: ' + String(txt).slice(0, 160), {});
    });
  });
});

/* 7. data_read 英文單位語序 */
each('data_read', 60, (p) => {
  const en = String(p.prompt.en);
  if (/\d+ HKD million/.test(en)) bad('data_read-money-order', '出現「N HKD million」', { en });
  if (/10,000 (books|visits|kg)/.test(en) && !/in units of 10,000/.test(en)) bad('data_read-unit-note', '缺少 unit note', { en });
  if (/which are \d/.test(en)) bad('data_read-old-phrase', '仍有 which are N ... from left to right', { en });
});

/* 8. cpi / interest 用語與中間值 */
each('cpi', 30, (p) => {
  const zh = p.solution.zh.join(' ');
  const en = p.solution.en.join(' ');
  if (p.math.mode === 'cpi_basket') {
    if (/基期籃子成本/.test(zh)) bad('cpi-old-term', '仍有「基期籃子成本」', { zh });
    if (/Base-period basket cost/.test(en)) bad('cpi-old-term-en', '仍有 Base-period basket cost', { en });
    if (!/當期籃子/.test(zh)) bad('cpi-new-term-missing', '未見「當期籃子」用語', { zh: zh.slice(0, 120) });
  }
});
each('interest', 40, (p) => {
  const txt = p.solution.zh.join(' ') + ' ' + p.solution.en.join(' ');
  const m = txt.match(/-?\d+\.\d{5,}/);
  if (m) bad('interest-long-intermediate', '解題仍有 5 位以上小數 ' + m[0], {});
});

/* 9. ped / pes / yed / xed / gdp_real / growth / inflation / income_eq 題幹不再有長小數（已由 1 覆蓋，這裡另印代表樣本） */
console.log('\n=== 代表樣本（修正後） ===');
function showSample(type, skillId, step, seed) {
  const p = gen(type, skillId, step, seed);
  console.log('--- ' + type + ' ' + skillId + '/s' + step + ' seed=' + seed + ' answer=' + JSON.stringify(p.answer));
  console.log('ZH: ' + String(p.prompt.zh).slice(0, 200));
  console.log('EN: ' + String(p.prompt.en).slice(0, 200));
  if (p.solution) console.log('SOL: ' + p.solution.zh.join(' // ').slice(0, 220));
}
showSample('unemployment', 's2.unemployment', 0, 1234);
showSample('ped', 's4.elasticity', 0, 1370);
showSample('ped', 's4.elasticity', 0, 1111);
showSample('ped_tr', 's4.elasticity', 0, 1148);
showSample('gini', 'chal.game_data', 2, 777);
showSample('oppcost', 's1.opportunity_cost', 0, 1234);
showSample('data_read', 'chal.game_data', 0, 1234);
showSample('cpi', 's2.inflation', 0, 1234);
showSample('income_eq', 's6.income_determination', 0, 1000);
showSample('growth', 's2.growth', 0, 1111);
showSample('gdp_real', 's6.national_income', 1, 1111);
showSample('inflation', 's6.macro_problems', 0, 1370);
showSample('interest', 's1.investment', 0, 1234);

/* 9. 針對修正點的正面檢查 */
/* 9.1 yed / xed / ped_tr 英文第三人稱動詞（只檢查 level 1 initial 模式，其餘模式用 "changes from … to …"） */
each('yed', 40, (p) => {
  if (p.math.mode !== 'initial') return;
  const en = String(p.prompt.en);
  if (!/\bincome (rises|falls) by\b/.test(en)) bad('changeEnVerb-yed', '未見 income rises/falls by', { en: en.slice(0, 160) });
  if (/\bincome (rise|fall) by\b/.test(en)) bad('changeEnVerb-yed-old', '仍有 income rise/fall by', { en: en.slice(0, 160) });
});
each('xed', 40, (p) => {
  if (p.math.mode !== 'initial') return;
  const en = String(p.prompt.en);
  if (!/\bprice of good Y (rises|falls) by\b/.test(en)) bad('changeEnVerb-xed', '未見 price … rises/falls by', { en: en.slice(0, 160) });
});
each('ped_tr', 40, (p) => {
  if (p.math.mode !== 'percent') return;
  const en = p.solution.en.join(' ');
  if (!/total revenue (rises|falls) by/.test(en)) bad('changeEnVerb-ped_tr', '未見 total revenue rises/falls by', { en: en.slice(0, 160) });
  if (/total revenue (rise|fall) by/.test(en)) bad('changeEnVerb-ped_tr-old', '仍有 total revenue rise/fall by', { en: en.slice(0, 160) });
});
/* 9.2 oppcost 動名詞（只檢查含 "gives up" 的 next-best / best-forgone 模式） */
each('oppcost', 30, (p) => {
  if (p.math.mode !== 'next-best' && p.math.mode !== 'best-forgone') return;
  const en = p.solution.en.join(' ');
  if (!/gives up (going|buying|visiting|taking|playing)/.test(en)) bad('oppcost-gerund', '未見 gives up + V-ing', { en: en.slice(0, 180) });
});
/* 9.3 gini 英文不含中文，且逐段用 Segment */
each('gini', 40, (p) => {
  const en = p.solution.en.join(' ');
  if (CJK.test(en)) bad('gini-en-cjk', '英文解題含中文', { en: en.slice(0, 180) });
  if (!/Segment 1:/.test(en)) bad('gini-en-segment', '英文未見 Segment 1:', { en: en.slice(0, 180) });
});
/* 9.4 data_read 英文新句型 */
each('data_read', 40, (p) => {
  const en = String(p.prompt.en);
  if (!/(The values are|in units of|HKD \d+ million)/.test(en)) bad('data_read-en-new', '未見新句型', { en: en.slice(0, 180) });
});
/* 9.5 全部英文欄位不得含中文（已於第 6 項做，這裡針對 gini 的兩條相關題再確認） */
['gini', 'data_read'].forEach((t) => {
  each(t, 40, (p) => {
    ['prompt', 'hint', 'solution'].forEach((k) => {
      const v = k === 'solution' ? p.solution.en.join(' ') : (p[k] && p[k].en);
      if (v && CJK.test(String(v))) bad('followup-en-cjk-' + t, t + ' ' + k + '.en 含中文', { v: String(v).slice(0, 180) });
    });
  });
});

console.log('\n=== gini 英文解題完整樣本 ===');
console.log(gen('gini', 'chal.game_data', 2, 777).solution.en.join(' // '));

/* 10. 輸出 */
console.log('\n=== 問題統計 ===');
const keys = Object.keys(issues);
if (!keys.length) console.log('（無）');
keys.sort().forEach((k) => {
  console.log('[' + k + '] x' + issues[k].n);
  issues[k].ex.forEach((e) => console.log('   ' + JSON.stringify(e).slice(0, 260)));
});
