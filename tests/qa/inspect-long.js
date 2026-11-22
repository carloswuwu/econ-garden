'use strict';
const H = require('./harness');
const LONG = /-?\d+\.\d{4,}/;
['growth', 'inflation', 'ped_tr', 'interest'].forEach((t) => {
  console.log('### ' + t);
  let shown = 0;
  H.pairs(t).forEach((pr) => {
    for (let i = 0; i < 40; i++) {
      let p;
      try { p = H.Core.generateProblem(pr.skill, { seed: 8000 + i * 211 + pr.step * 37, difficultyStep: pr.step, type: t }); } catch (e) { continue; }
      const txt = p.solution.zh.join(' ');
      const m = txt.match(LONG);
      if (m && shown < 3) {
        shown++;
        console.log('  ' + pr.skill.id + '/s' + pr.step + ' mode=' + (p.math.mode || '') + ' text=' + m[0]);
        console.log('    ' + txt.slice(0, 200));
      }
    }
  });
  if (!shown) console.log('  （無超長小數）');
});
