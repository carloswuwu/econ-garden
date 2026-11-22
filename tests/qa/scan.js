/* 多樣本題幹掃描：node tests/qa/scan.js type levels seedsPerLevel */
'use strict';
const H = require('./harness');
const type = process.argv[2];
const levels = (process.argv[3] || '1,2,3').split(',').map(Number);
const per = Number(process.argv[4] || 3);
console.log('### ' + type);
levels.forEach((lv) => {
  for (let i = 0; i < per; i++) {
    let p;
    try { p = H.generate(type, lv, 600 + i * 913); } catch (e) { console.log('lv' + lv + ' ERR ' + e.message); continue; }
    const m = p.math || {};
    const key = [m.mode, m.kind, m.variant, m.ask, m.asked, m.shift, m.change, m.sub].filter((x) => x != null).join('/');
    console.log('[' + lv + '/' + key + '] A=' + JSON.stringify(p.answer) + ' | C=' + JSON.stringify(p.choices || null));
    console.log('  Q: ' + String(p.prompt.zh).slice(0, 300));
    console.log('  M: ' + JSON.stringify(m).slice(0, 300));
    if (p.choiceLabels) console.log('  L: ' + JSON.stringify(p.choiceLabels).slice(0, 400));
  }
});
