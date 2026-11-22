/*
 * tools/strip-bank-types.js（整理腳本，可重跑）
 * 規則：概念型技能保留 'bank'；計算型技能移除 'bank'。
 * 以「技能區塊」為單位處理，避免跨技能的正則誤配。
 */
'use strict';
const fs = require('fs');
const path = require('path');

const BANK_ONLY = new Set([
  's1.money', 's1.scarcity', 's1.factors',
  's2.public_finance',
  's3.globalisation', 's3.economic_systems',
  's4.positive_normative', 's4.economic_questions', 's4.production',
  's5.public_goods',
  's6.supply_side',
  'col.info_behavioural', 'col.thought',
  'chal.reasoning'
]);

const dir = path.join(__dirname, '..', 'content');
const files = fs.readdirSync(dir).filter(f => /^stage-.*\.js$/.test(f));
let changed = 0;
files.forEach((f) => {
  const abs = path.join(dir, f);
  const src = fs.readFileSync(abs, 'utf8');
  const re = /^  ['"]([a-z0-9._]+)['"]: \{/gm;
  const marks = [];
  let m;
  while ((m = re.exec(src))) marks.push({ id: m[1], index: m.index });
  let out = '';
  let cursor = 0;
  marks.forEach((mark, i) => {
    const end = i + 1 < marks.length ? marks[i + 1].index : src.length;
    const block = src.slice(mark.index, end);
    const tm = /types: \[([^\]]*)\]/.exec(block);
    let newBlock = block;
    if (tm) {
      let items = tm[1].split(',').map(s => s.trim()).filter(Boolean);
      const hadBank = items.indexOf("'bank'") !== -1;
      if (BANK_ONLY.has(mark.id)) {
        if (!hadBank) { items.push("'bank'"); changed++; }
      } else if (hadBank) {
        items = items.filter(s => s !== "'bank'");
        changed++;
      }
      newBlock = block.slice(0, tm.index) + 'types: [' + items.join(', ') + ']' + block.slice(tm.index + tm[0].length);
    }
    out += src.slice(cursor, mark.index) + newBlock;
    cursor = end;
  });
  out += src.slice(cursor);
  fs.writeFileSync(abs, out, 'utf8');
});
console.log('normalised bank types, changed blocks:', changed);
