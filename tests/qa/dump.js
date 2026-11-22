/* dump 樣本：node tests/qa/dump.js <type> <level> [n] */
'use strict';
const H = require('./harness');
const type = process.argv[2];
const level = Number(process.argv[3] || 1);
const n = Number(process.argv[4] || 1);
const map = H.typeMap();
if (!map[type]) { console.error('unknown type ' + type); process.exit(1); }
const skills = map[type].map((x) => x.skill + '(lv' + x.levels + ')').join(', ');
console.log('=== ' + type + '   skills: ' + skills);
for (let i = 0; i < n; i++) {
  let p;
  try {
    p = H.generate(type, level, 5000 + i * 173);
  } catch (e) { console.log('ERROR ' + e.message); continue; }
  console.log('--- sample ' + i + ' seed=' + (5000 + i * 173));
  console.log('zh: ' + p.prompt.zh);
  console.log('en: ' + p.prompt.en);
  console.log('hint zh: ' + (p.hint && p.hint.zh));
  console.log('hint en: ' + (p.hint && p.hint.en));
  console.log('answer: ' + JSON.stringify(p.answer));
  console.log('choices: ' + JSON.stringify(p.choices));
  if (p.choiceLabels) console.log('choiceLabels: ' + JSON.stringify(p.choiceLabels));
  console.log('solution zh: ' + JSON.stringify(p.solution.zh));
  console.log('solution en: ' + JSON.stringify(p.solution.en));
  console.log('math: ' + JSON.stringify(p.math));
  if (p.visual) console.log('visual: ' + JSON.stringify(p.visual));
}
