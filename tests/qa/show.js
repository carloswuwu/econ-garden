'use strict';
const H = require('./harness');
const types = process.argv.slice(2);
types.forEach((t) => {
  [1, 2, 3].forEach((lv) => {
    let p;
    try { p = H.generate(t, lv, 70007); } catch (e) { console.log(t + ' lv' + lv + ' ERR'); return; }
    console.log('=== ' + t + ' lv' + lv + ' | A=' + JSON.stringify(p.answer));
    console.log('EN: ' + p.prompt.en);
    console.log('ZH: ' + p.prompt.zh);
    if (p.solution) console.log('SOL-EN: ' + p.solution.en.join(' // '));
  });
});
