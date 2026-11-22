'use strict';
const H = require('./harness');
const LONG = /-?\d+\.\d{4,}/;
const out = {};
Object.keys(H.ED.types).sort().forEach((t) => {
  H.pairs(t).forEach((pr) => {
    let n = 0, bad = 0, ex = null;
    for (let i = 0; i < 60; i++) {
      const seed = 60000 + i * 211 + pr.step * 29;
      let p;
      try { p = H.Core.generateProblem(pr.skill, { seed, difficultyStep: pr.step, type: t }); } catch (e) { continue; }
      n++;
      const m = String(p.prompt.zh).match(LONG);
      if (m) { bad++; if (!ex) ex = { seed, text: m[0], zh: String(p.prompt.zh).slice(0, 160) }; }
    }
    if (bad) out[t + ' ' + pr.skill.id + ' step' + pr.step + '(L' + pr.level + ')'] = { n, bad, pct: Math.round(bad / n * 100), ex };
  });
});
Object.keys(out).forEach((k) => {
  const v = out[k];
  console.log(k + ': ' + v.bad + '/' + v.n + ' (' + v.pct + '%) ex seed=' + v.ex.seed + ' "' + v.ex.text + '" :: ' + v.ex.zh);
});
