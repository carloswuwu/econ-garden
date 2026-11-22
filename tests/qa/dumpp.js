/* 只印題幹與答案：node tests/qa/dumpp.js type1,type2 lv1,lv2 */
'use strict';
const H = require('./harness');
const types = (process.argv[2] || '').split(',');
const levels = (process.argv[3] || '1,2,3').split(',').map(Number);
types.forEach((t) => {
  levels.forEach((lv) => {
    let p;
    try { p = H.generate(t, lv, 5000); } catch (e) { console.log('===== ' + t + ' lv' + lv + ' ERROR ' + e.message); return; }
    console.log('===== ' + t + ' lv' + lv);
    console.log('Q: ' + p.prompt.zh);
    console.log('A: ' + JSON.stringify(p.answer) + ' | C: ' + JSON.stringify(p.choices || null) + ' | math=' + JSON.stringify(p.math));
  });
});
