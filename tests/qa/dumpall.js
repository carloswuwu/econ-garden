/* 全部題型 × level 1–3 的樣本總覽：node tests/qa/dumpall.js > tests/qa/_dump.txt */
'use strict';
const H = require('./harness');
const map = H.typeMap();
Object.keys(H.ED.types).sort().forEach((t) => {
  for (const lv of [1, 2, 3]) {
    let p;
    try { p = H.generate(t, lv, 5000); } catch (e) { console.log('===== ' + t + ' lv' + lv + ' ERROR ' + e.message); continue; }
    console.log('===== ' + t + ' lv' + lv + ' skill=' + H.skillFor(t, lv).id);
    console.log('Q: ' + p.prompt.zh);
    console.log('A: ' + JSON.stringify(p.answer) + ' | math=' + JSON.stringify(p.math));
    if (p.choices) console.log('C: ' + JSON.stringify(p.choices));
    console.log('S: ' + (p.solution ? p.solution.zh.join(' // ') : '(none)'));
  }
});
