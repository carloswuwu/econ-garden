/* followup-verify.js — 產出跟進稽核的可引用證據（QA_LIVE=1） */
'use strict';
const fs = require('fs');
const H = require('./harness');
const LONG = /-?\d+\.\d{4,}/;
const CJK = /[\u4e00-\u9fff]/;
if (process.env.QA_LIVE !== '1') throw new Error('請設 QA_LIVE=1');

function gen(type, skillId, step, seed) {
  return H.Core.generateProblem(H.ED.skills[skillId], { seed, difficultyStep: step, type });
}
function brief(p) {
  return {
    answer: p.answer,
    zh: String(p.prompt.zh).replace(/\s+/g, ' ').slice(0, 200),
    en: String(p.prompt.en).replace(/\s+/g, ' ').slice(0, 200),
    solZh: p.solution ? p.solution.zh.join(' // ').slice(0, 220) : '',
    solEn: p.solution ? p.solution.en.join(' // ').slice(0, 220) : ''
  };
}
const checks = [];
function check(name, cond, evidence) {
  checks.push({ name, pass: !!cond, evidence });
}

/* A. 舊 bug seed 定點回歸 */
{
  const p = gen('income_eq', 's6.income_determination', 0, 1000);
  check('income_eq L1 seed1000 G 為整數 350', p.math.G === 350 && !LONG.test(String(p.prompt.zh)), brief(p));
}
{
  const p = gen('income_eq', 'col.macro_models', 0, 1000);
  check('income_eq L2 seed1000 G 為整數 800', p.math.G === 800 && !LONG.test(String(p.prompt.zh)), brief(p));
}
{
  const p = gen('yed', 's4.elasticity_other', 1, 1148);
  check('yed L2 seed1148 收入顯示 1650', p.math.income2 === 1650 && !LONG.test(String(p.prompt.zh)), brief(p));
}
{
  const p = gen('yed', 's4.elasticity_other', 1, 1259);
  check('yed L2 seed1259 數量顯示 224', p.math.quantity2 === 224 && !LONG.test(String(p.prompt.zh)), brief(p));
}
{
  const p = gen('xed', 's4.elasticity_other', 1, 1222);
  check('xed L2 seed1222 數量顯示 220', p.math.qx2 === 220 && !LONG.test(String(p.prompt.zh)), brief(p));
}
{
  const p = gen('xed', 's4.elasticity_other', 1, 1259);
  check('xed L2 seed1259 價格顯示 110', p.math.py2 === 110 && !LONG.test(String(p.prompt.zh)), brief(p));
}
{
  const p = gen('growth', 's2.growth', 0, 1111);
  check('growth L1 seed1111 GDP 顯示 11330', p.math.y2 === 11330 && !LONG.test(String(p.prompt.zh)), brief(p));
}
{
  const p = gen('gdp_real', 's6.national_income', 1, 1111);
  check('gdp_real L2 seed1111 GDP 顯示 11330', p.math.y2 === 11330 && !LONG.test(String(p.prompt.zh)), brief(p));
}
{
  const p = gen('inflation', 's6.macro_problems', 0, 1370);
  check('inflation L1 seed1370 名義收入顯示 13200', p.math.nominal === 13200 && !LONG.test(String(p.prompt.zh)), brief(p));
}
{
  const p = gen('ped', 's4.elasticity', 0, 1370);
  check('ped L1 seed1370 答案0.5 解題寫「0.5 < 1」', /0\.5 < 1/.test(p.solution.zh.join(' ')) && !/0\.5 > 1/.test(p.solution.zh.join(' ')), brief(p));
}
{
  const p = gen('ped', 's4.elasticity', 0, 1111);
  check('ped L1 seed1111 答案1 解題寫「1 = 1」', /1 = 1/.test(p.solution.zh.join(' ')), brief(p));
}
{
  const p = gen('ped', 's4.elasticity', 0, 1703);
  check('ped L1 seed1703 價格顯示 55（p1=50,+10%）', !LONG.test(String(p.prompt.zh)) && String(p.prompt.zh).indexOf('55 元') !== -1, brief(p));
}
{
  const p = gen('pes', 's4.elasticity_other', 0, 1703);
  check('pes L1 seed1703 價格顯示 55', !LONG.test(String(p.prompt.zh)), brief(p));
}
{
  const p = gen('unemployment', 's2.unemployment', 0, 1234);
  check('unemployment L1 英文以 1.84/0.16 million 表示', /1\.84 million/.test(p.prompt.en) && /0\.16 million/.test(p.prompt.en), brief(p));
}
{
  const p = gen('unemployment', 's2.unemployment', 1, 1234);
  check('unemployment L2 英文以百萬人表示（工作年齡/就業/失業）', !/[^.\d]\d{3,}\s+million/.test(p.prompt.en) && /million/.test(p.prompt.en), brief(p));
}
{
  const p = gen('ped_tr', 's4.elasticity', 0, 1148);
  check('ped_tr L1 不再有 PED=1', p.math.ped !== 1, brief(p));
}
{
  const p = gen('ped_tr', 's4.elasticity', 1, 2000);
  check('ped_tr 解題乘數因子寫「(1 − 0.xx)」而非「(1 + -0.xx)」', !/\(1 \+ -/.test(p.solution.zh.join(' ')), brief(p));
}
{
  const p = gen('gini', 'chal.game_data', 2, 777);
  const en = p.solution.en.join(' ');
  check('gini 英文解題無中文且用 Segment N', !CJK.test(en) && /Segment 1:/.test(en), { solEn: en.slice(0, 300) });
}
{
  const p = gen('data_read', 'chal.game_data', 1, 1234);
  const en = p.prompt.en;
  const ok = !/\d+ HKD million/.test(en) && !/which are \d/.test(en) && (/in units of/.test(en) || /HKD \d+ million/.test(en));
  check('data_read 英文不再「N HKD million」/「which are N … 10,000 books」，改用新語序', ok, brief(p));
}
{
  const p = gen('cpi', 's2.inflation', 0, 1234);
  check('cpi 已用「當期籃子」用語且無「基期籃子成本」', /當期籃子/.test(p.solution.zh.join(' ')) && !/基期籃子成本/.test(p.solution.zh.join(' ')), brief(p));
}
{
  const p = gen('interest', 's1.investment', 0, 1234);
  check('interest 解題無 5 位以上小數中間值', !/-?\d+\.\d{5,}/.test(p.solution.zh.join(' ') + ' ' + p.solution.en.join(' ')), brief(p));
}
{
  const p = gen('oppcost', 's1.opportunity_cost', 0, 1234);
  check('oppcost 英文 gives up + V-ing', /gives up (going|buying|visiting|taking|playing)/.test(p.solution.en.join(' ')), brief(p));
}
{
  const p = gen('yed', 's4.elasticity_other', 0, 1234);
  check('yed 英文 income rises/falls by', /income (rises|falls) by/.test(p.prompt.en), brief(p));
}
{
  const p = gen('xed', 's4.elasticity_other', 0, 1234);
  check('xed 英文 price of good Y rises/falls by', /price of good Y (rises|falls) by/.test(p.prompt.en), brief(p));
}
{
  const p = gen('ped_tr', 's4.elasticity', 1, 1234);
  check('ped_tr 英文 total revenue rises/falls by', /total revenue (rises|falls) by/.test(p.solution.en.join(' ')), brief(p));
}

console.log('=== 跟進定點回歸（' + checks.length + ' 項） ===');
let pass = 0;
checks.forEach((c) => {
  if (c.pass) pass++;
  console.log((c.pass ? 'PASS ' : 'FAIL ') + c.name);
  if (!c.pass) console.log('   ' + JSON.stringify(c.evidence));
});
console.log('PASS ' + pass + '/' + checks.length);

/* B. 讀取六份 checker 結果，統計答案層 */
console.log('\n=== 六個 checker 答案層結果（live） ===');
let sampleTotal = 0, failTotal = 0;
['micro', 'micro2', 'welfare', 'macro', 'intl', 'applied'].forEach((f) => {
  const r = JSON.parse(fs.readFileSync(__dirname + '/_results-' + f + '.json', 'utf8'));
  sampleTotal += r.sampleTotal;
  failTotal += r.failTypes;
  const mins = [];
  Object.keys(r.results).forEach((t) => {
    const x = r.results[t];
    x.minor.forEach((m) => mins.push(t + ':' + m.kind + 'x' + (m.count || 1)));
  });
  console.log(f + ': samples=' + r.sampleTotal + ' failTypes=' + r.failTypes + ' minor=[' + mins.join(', ') + ']');
});
console.log('TOTAL samples=' + sampleTotal + ' failTypes=' + failTotal);

/* C. 全題型題幹長小數掃描（只列不合法的「資料值」類型） */
console.log('\n=== 全題型題幹長小數掃描 ===');
let promptLong = 0;
const ex = [];
Object.keys(H.ED.types).sort().forEach((t) => {
  H.pairs(t).forEach((pr) => {
    for (let i = 0; i < 30; i++) {
      let p;
      try { p = H.Core.generateProblem(pr.skill, { seed: 6000 + i * 157 + pr.step * 23, difficultyStep: pr.step, type: t }); } catch (e) { continue; }
      const m = String(p.prompt.zh + ' ' + p.prompt.en).match(LONG);
      if (m) { promptLong++; if (ex.length < 5) ex.push(t + ' ' + pr.skill.id + '/s' + pr.step + ': ' + m[0]); }
    }
  });
});
console.log('題幹含 >3 位小數：' + promptLong + (ex.length ? ' 例：' + ex.join(' | ') : ''));

/* D. 英文欄位夾中文掃描（全 49 型） */
console.log('\n=== 英文欄位夾中文掃描 ===');
const cjk = [];
Object.keys(H.ED.types).sort().forEach((t) => {
  H.pairs(t).forEach((pr) => {
    for (let i = 0; i < 15; i++) {
      let p;
      try { p = H.Core.generateProblem(pr.skill, { seed: 9000 + i * 173 + pr.step * 29, difficultyStep: pr.step, type: t }); } catch (e) { continue; }
      const fields = [['prompt', p.prompt.en], ['hint', p.hint && p.hint.en], ['solution', p.solution && p.solution.en.join(' ')]];
      if (p.choiceLabels) Object.keys(p.choiceLabels).forEach((k) => fields.push(['label', p.choiceLabels[k].en]));
      fields.forEach(([k, v]) => { if (v && CJK.test(String(v)) && cjk.length < 5) cjk.push(t + ' ' + k); });
    }
  });
});
console.log(cjk.length ? '仍有：' + cjk.join(' | ') : '（無）');
