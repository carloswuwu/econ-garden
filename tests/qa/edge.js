/* edge.js — 全題型邊界/顯示掃描：長小數、選項精度、負零、重複選項 */
'use strict';
const H = require('./harness');
const LONG = /-?\d+\.\d{4,}/;
const rows = {};
Object.keys(H.ED.types).sort().forEach((t) => {
  const s = { n: 0, promptLong: 0, solLong: 0, longExamples: [], choiceBad: [], negZero: [], dupChoice: [] };
  H.pairs(t).forEach((pr) => {
    for (let i = 0; i < 30; i++) {
      const seed = 50000 + i * 173 + pr.step * 19;
      let p;
      try { p = H.Core.generateProblem(pr.skill, { seed, difficultyStep: pr.step, type: t }); } catch (e) { s.err = (s.err || 0) + 1; continue; }
      s.n++;
      const pz = String(p.prompt.zh) + ' ' + String(p.prompt.en);
      const pl = pz.match(LONG);
      if (pl) {
        s.promptLong++;
        if (s.longExamples.length < 3) s.longExamples.push({ where: pr.skill.id + '/s' + pr.step, seed, text: pl[0], zh: String(p.prompt.zh).slice(0, 150) });
      }
      if (p.solution) {
        const sl = (p.solution.zh.join(' ') + ' ' + p.solution.en.join(' ')).match(LONG);
        if (sl) s.solLong++;
      }
      if (String(p.prompt.zh).indexOf('-0') !== -1 || String(p.prompt.en).indexOf('-0') !== -1) s.negZero.push(String(p.prompt.zh).slice(0, 120));
      if (p.choices) {
        const nums = p.choices.filter((c) => typeof c === 'number');
        nums.forEach((c) => {
          if (Math.abs(c * 100 - Math.round(c * 100)) > 1e-6) s.choiceBad.push(c);
        });
        const seen = {};
        let dup = false;
        p.choices.forEach((c) => {
          const k = typeof c === 'number' ? String(Math.round(c * 100) / 100) : String(c);
          if (seen[k]) dup = true;
          seen[k] = 1;
        });
        if (dup) s.dupChoice.push(JSON.stringify(p.choices));
      }
    }
  });
  rows[t] = s;
});
Object.keys(rows).forEach((t) => {
  const s = rows[t];
  const flags = [];
  if (s.err) flags.push('genErr=' + s.err);
  if (s.promptLong) flags.push('promptLong=' + s.promptLong);
  if (s.solLong) flags.push('solLong=' + s.solLong);
  if (s.choiceBad.length) flags.push('choiceBad=' + s.choiceBad.slice(0, 3).join(','));
  if (s.negZero.length) flags.push('negZero=' + s.negZero[0]);
  if (s.dupChoice.length) flags.push('dupChoice=' + s.dupChoice[0]);
  if (flags.length) console.log(t.padEnd(24) + ' n=' + s.n + '  ' + flags.join(' | '));
  s.longExamples.forEach((e) => console.log('    ' + t + ' long: ' + e.where + ' seed=' + e.seed + ' "' + e.text + '" | ' + e.zh.replace(/\n/g, ' ')));
});
