'use strict';
const H = require('./harness');
const NEG_OK = ['profit', 'fiscal_balance', 'balance_payments', 'multiplier', 'npv', 'ped_tr', 'yed', 'xed', 'npv2', 'data_read', 'percentage', 'interest', 'inflation'];
const out = {};
Object.keys(H.ED.types).sort().forEach((t) => {
  H.pairs(t).forEach((pr) => {
    for (let i = 0; i < 20; i++) {
      let p;
      try { p = H.Core.generateProblem(pr.skill, { seed: 90000 + i * 71 + pr.step * 13, difficultyStep: pr.step, type: t }); } catch (e) { continue; }
      if (!p.choices || typeof p.answer !== 'number') continue;
      const negs = p.choices.filter((c) => typeof c === 'number' && c < 0);
      if (negs.length && p.answer > 0) {
        out[t] = out[t] || { n: 0, ex: null };
        out[t].n++;
        if (!out[t].ex) out[t].ex = { answer: p.answer, choices: p.choices, math: p.math, zh: String(p.prompt.zh).slice(0, 120) };
      }
    }
  });
});
console.log(JSON.stringify(out, null, 1));
