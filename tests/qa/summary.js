'use strict';
const H = require('./harness');
const fs = require('fs');
const results = {};
for (const f of ['micro', 'micro2', 'welfare', 'macro', 'intl', 'applied']) {
  const r = JSON.parse(fs.readFileSync(__dirname + '/_results-' + f + '.json', 'utf8'));
  Object.keys(r.results).forEach((t) => { results[t] = r.results[t]; });
}
const rows = [];
Object.keys(H.ED.types).sort().forEach((t) => {
  const prs = H.pairs(t);
  const levels = Array.from(new Set(prs.map((p) => p.level))).sort();
  const direct = ['regression', 'npv', 'gini', 'data_read', 'growth_model'].indexOf(t) !== -1;
  const samples = prs.length * 30 + (direct ? 30 : 0);
  const r = results[t] || { fail: [], minor: [] };
  rows.push({
    type: t,
    skills: Array.from(new Set(prs.map((p) => p.skill.id))).join(','),
    levels: levels.join('/') + (direct ? '(1 直接測試)' : ''),
    samples,
    status: r.fail.length ? 'FAIL' : (r.minor.length ? 'PASS*' : 'PASS'),
    issues: r.fail.concat(r.minor).map((m) => m.kind + '×' + (m.count || 1)).join('; ')
  });
});
fs.writeFileSync(__dirname + '/_summary.json', JSON.stringify(rows, null, 1), 'utf8');
rows.forEach((x) => console.log([x.type, x.levels, x.samples, x.status, x.issues].join(' | ')));
console.log('types=' + rows.length + ' samples=' + rows.reduce((s, x) => s + x.samples, 0));
