/* 對每個題型，走訪所有 (技能,step) 組合與多個 seed，印出每個 math 模式的首個樣本題幹（zh/en 截短）
 * node tests/qa/modes.js [type]  -> 用 cmd 重定向成 UTF-8 檔 */
'use strict';
const H = require('./harness');
const only = process.argv[2] || '';
const types = only ? [only] : Object.keys(H.ED.types).sort();
const trunc = (s, n) => (typeof s === 'string' && s.length > n ? s.slice(0, n) + '…' : s);
types.forEach((t) => {
  const seen = {};
  for (const pr of H.pairs(t)) {
    for (let i = 0; i < 12; i++) {
      let p;
      try { p = H.Core.generateProblem(pr.skill, { seed: 3000 + i * 61 + pr.step * 13, difficultyStep: pr.step, type: t }); }
      catch (e) { console.log('### ' + t + ' ERROR ' + e.message); return; }
      const m = p.math || {};
      const key = [m.mode, m.kind, m.variant, m.asked, m.ask, m.sub, m.side].filter((x) => x != null).join('/');
      if (seen[key]) continue;
      seen[key] = true;
      console.log('### ' + t + ' :: mode=' + key + ' :: skill=' + pr.skill.id + ' step=' + pr.step + ' L' + pr.level);
      console.log('   ZH: ' + trunc(p.prompt.zh, 330));
      console.log('   EN: ' + trunc(p.prompt.en, 330));
      console.log('   ANS: ' + JSON.stringify(p.answer) + ' | math=' + JSON.stringify(m));
      console.log('   CH: ' + JSON.stringify(p.choices || null));
      if (p.choiceLabels) console.log('   LB: ' + JSON.stringify(p.choiceLabels));
      if (p.visual) console.log('   VIS: ' + JSON.stringify(p.visual));
    }
  }
});
