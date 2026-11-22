/* profiler嚗???? 30?3嚗??箏?暸???math 璅∪????賊??獢???摮?獢???*/
'use strict';
const H = require('./harness');
const map = H.typeMap();
const types = Object.keys(H.ED.types).sort();
const only = process.argv[2];
types.forEach((t) => {
  if (only && only !== t) return;
  const modes = {}, keys = {}, answers = new Set(), ansType = new Set();
  let errs = 0;
  const samplesByMode = {};
  for (const lv of [1, 2, 3]) {
    for (let i = 0; i < 30; i++) {
      let p;
      try {
        p = H.generate(t, lv, 70000 + i * 31 + lv * 7);
      } catch (e) { errs++; continue; }
      const m = p.math || {};
      const mode = String(m.mode || m.kind || m.asked || '');
      const k = (m.mode != null ? 'mode=' + m.mode : '') + (m.kind != null ? 'kind=' + m.kind : '');
      modes[k || '(none)'] = (modes[k || '(none)'] || 0) + 1;
      Object.keys(m).forEach((x) => { keys[x] = (keys[x] || 0) + 1; });
      answers.add(JSON.stringify(p.answer));
      ansType.add(typeof p.answer);
      const sk = k + '|lv' + lv;
      if (!samplesByMode[sk]) samplesByMode[sk] = { seed: 70000 + i * 31 + lv * 7, lv, math: m, answer: p.answer, prompt: '' };
    }
  }
  console.log('### ' + t + ' skills=' + map[t].map((x) => x.skill + ':' + x.levels).join(','));
  console.log('   modes: ' + JSON.stringify(modes));
  console.log('   keys: ' + Object.keys(keys).join(','));
  console.log('   answer types: ' + Array.from(ansType).join(',') + ' | distinct answers: ' + answers.size + (answers.size <= 8 ? ' -> ' + Array.from(answers).join(' ') : ''));
  console.log('   per-mode first samples: ' + JSON.stringify(samplesByMode));
  if (errs) console.log('   !! errors: ' + errs);
});
