'use strict';
const H = require('./harness');
const LONG = /-?\d+\.\d{4,}/;
function find(type, skillId, step, pred, max) {
  const skill = H.ED.skills[skillId];
  const out = [];
  for (let i = 0; i < (max || 4000); i++) {
    const seed = 1000 + i * 37;
    let p;
    try { p = H.Core.generateProblem(skill, { seed, difficultyStep: step, type }); } catch (e) { continue; }
    if (pred(p)) { out.push({ seed, p }); if (out.length >= 2) break; }
  }
  return out;
}
function show(tag, type, skillId, step, pred) {
  const hits = find(type, skillId, step, pred);
  console.log('##### ' + tag + ' (' + hits.length + ')');
  hits.forEach((h) => {
    const p = h.p;
    const late = LONG.test(String(p.prompt.zh));
    console.log('  seed=' + h.seed + ' answer=' + JSON.stringify(p.answer) + ' long=' + late);
    console.log('  ZH: ' + p.prompt.zh);
    console.log('  MATH: ' + JSON.stringify(p.math));
    console.log('  SOL: ' + (p.solution ? p.solution.zh.join(' // ') : ''));
  });
}
/* 找有小數亂碼的樣本 */
show('ped L1 亂碼', 'ped', 's4.elasticity', 0, (p) => LONG.test(String(p.prompt.zh)));
show('ped L1 答案 0.5（解題文字矛盾）', 'ped', 's4.elasticity', 0, (p) => p.answer === 0.5);
show('ped L1 答案 1（解題文字矛盾）', 'ped', 's4.elasticity', 0, (p) => p.answer === 1);
show('pes L1 亂碼', 'pes', 's4.elasticity_other', 0, (p) => LONG.test(String(p.prompt.zh)));
show('yed L2 亂碼', 'yed', 's4.elasticity_other', 1, (p) => LONG.test(String(p.prompt.zh)));
show('xed L2 亂碼', 'xed', 's4.elasticity_other', 1, (p) => LONG.test(String(p.prompt.zh)));
show('gdp_real L2 亂碼', 'gdp_real', 's6.national_income', 1, (p) => LONG.test(String(p.prompt.zh)));
show('growth L1 亂碼', 'growth', 's2.growth', 0, (p) => LONG.test(String(p.prompt.zh)));
show('inflation L1 亂碼', 'inflation', 's6.macro_problems', 0, (p) => LONG.test(String(p.prompt.zh)));
show('income_eq L1 亂碼', 'income_eq', 's6.income_determination', 0, (p) => LONG.test(String(p.prompt.zh)));
show('income_eq L2 亂碼', 'income_eq', 'col.macro_models', 0, (p) => LONG.test(String(p.prompt.zh)));
show('ped_tr L1 ped=1', 'ped_tr', 's4.elasticity', 0, (p) => p.math.ped === 1);
