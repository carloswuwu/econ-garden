/* lint.js — 全題型題幹/提示/解題文字的基本排版與重複詞檢查 */
'use strict';
const H = require('./harness');
const PATTERNS = [
  { re: / {2,}/, name: 'double-space' },
  { re: /\s[,.;:%]/, name: 'space-before-punct' },
  { re: /\b(\w+) \1\b/i, name: 'repeated-word' },
  { re: /[，。；：、]\s*[，。；：、]/, name: 'double-cjk-punct' },
  { re: /\(\s*\)/, name: 'empty-paren' },
  { re: /\bHKD \d+\.\d+ million/, name: 'unit-order' }
];
const counts = {};
function note(kind, type, where, text) {
  counts[kind] = counts[kind] || {};
  const arr = counts[kind][type] = counts[kind][type] || { n: 0, ex: [] };
  arr.n++;
  if (arr.ex.length < 2) arr.ex.push({ where, text: String(text).slice(0, 220) });
}
Object.keys(H.ED.types).sort().forEach((t) => {
  H.pairs(t).forEach((pr) => {
    for (let i = 0; i < 12; i++) {
      let p;
      try { p = H.Core.generateProblem(pr.skill, { seed: 30000 + i * 191 + pr.step * 23, difficultyStep: pr.step, type: t }); } catch (e) { continue; }
      const where = pr.skill.id + '/s' + pr.step;
      ['zh', 'en'].forEach((lang) => {
        [['prompt', p.prompt[lang]], ['hint', p.hint && p.hint[lang]], ['solution', p.solution ? p.solution[lang].join(' ') : '']].forEach(([kind, txt]) => {
          if (!txt) return;
          PATTERNS.forEach((pt) => { if (pt.re.test(txt)) note(pt.name + '-' + lang + '-' + kind, t, where, txt); });
        });
      });
    }
  });
});
Object.keys(counts).sort().forEach((k) => {
  console.log('## ' + k);
  Object.keys(counts[k]).forEach((t) => {
    const a = counts[k][t];
    console.log('  ' + t + ' x' + a.n + ' :: ' + a.ex[0].text + (a.ex[1] ? ' || ' + a.ex[1].text : ''));
  });
});
