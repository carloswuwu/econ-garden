/* chk-micro.js — types-micro.js 的獨立重算（10 個題型） */
'use strict';
const R = require('./runner');
const { near, round2 } = R;

/* 事件 → 需求變動方向（依 content/types-micro.js 的 DEMAND_EVENTS 表獨立列出） */
const DEMAND_DIR = {
  income_up_normal: 1, income_down_normal: -1, sub_up: 1, sub_down: -1,
  pop_up: 1, pop_down: -1, taste_up: 1, taste_down: -1,
  comp_up: -1, comp_down: 1, future_up: 1, future_down: -1,
  income_up_inferior: -1, income_down_inferior: 1
};
const SUPPLY_DIR = {
  cost_up: -1, cost_down: 1, tech_up: 1, producers_up: 1, producers_down: -1,
  subsidy: 1, tax: -1, expect_up: -1, expect_down: 1, weather: -1, wage_up: -1
};

/* 1. oppcost */
R.audit('oppcost', (p) => {
  const m = p.math;
  if (m.mode === 'next-best') return { expected: m.altValue };
  if (m.mode === 'best-forgone') return { expected: Math.max.apply(null, m.otherValues) };
  if (m.mode === 'per-unit') return { expected: round2(m.maxB / m.maxA) };
  return { error: 'unknown mode ' + m.mode };
});

/* 2. ppc */
R.audit('ppc', (p) => {
  const m = p.math;
  const slope = m.maxY / m.maxX;
  if (m.mode === 'unit-cost') return { expected: round2(slope) };
  if (m.mode === 'remaining') return { expected: round2(m.maxY - m.qx * slope) };
  if (m.mode === 'efficiency') {
    const v = m.qx / m.maxX + m.qy / m.maxY;
    const expected = v > 1 + 1e-9 ? 'outside' : v < 1 - 1e-9 ? 'inside' : 'on';
    return { expected, note: 'efficiency point=' + m.point };
  }
  return { error: 'unknown mode ' + m.mode };
});

/* 3/4. demand_shift / supply_shift */
R.audit('demand_shift', (p) => {
  const m = p.math;
  const dir = DEMAND_DIR[m.event];
  if (dir == null) return { error: 'unknown event ' + m.event };
  const expected = dir > 0 ? 'upup' : 'downdown';
  return { expected, note: 'event direction=' + dir + ', answer=' + m.answer };
}, {});
R.audit('supply_shift', (p) => {
  const m = p.math;
  const dir = SUPPLY_DIR[m.event];
  if (dir == null) return { error: 'unknown event ' + m.event };
  const expected = dir > 0 ? 'downup' : 'updown';
  return { expected, note: 'event direction=' + dir + ', answer=' + m.answer };
});

/* 5. equilibrium */
R.audit('equilibrium', (p) => {
  const m = p.math;
  const pe = (m.a - m.c) / (m.b + m.d);
  const qe = m.c + m.d * pe;
  if (m.mode === 'level1') {
    if (m.asked === 'price') return { expected: round2(pe) };
    if (m.asked === 'quantity') return { expected: round2(qe) };
    return { error: 'asked? ' + m.asked };
  }
  if (m.mode === 'price-control') {
    const p0 = m.p0;
    const qd = m.a - m.b * p0;
    const qs = m.c + m.d * p0;
    if (m.asked === 'shortage') return { expected: round2(qd - qs) };
    if (m.asked === 'surplus') return { expected: round2(qs - qd) };
    return { error: 'asked? ' + m.asked };
  }
  if (m.mode === 'shift') {
    const isDemand = String(m.shift).indexOf('demand') === 0;
    const isSupply = String(m.shift).indexOf('supply') === 0;
    const a2 = isDemand ? m.newA : m.a;
    const c2 = isSupply ? m.newC : m.c;
    const pe2 = (a2 - c2) / (m.b + m.d);
    const qe2 = c2 + m.d * pe2;
    if (m.asked === 'price') return { expected: round2(pe2) };
    if (m.asked === 'quantity') return { expected: round2(qe2) };
    return { error: 'asked? ' + m.asked };
  }
  return { error: 'unknown mode ' + m.mode };
});

/* 6. ped */
R.audit('ped', (p) => {
  const m = p.math;
  if (m.mode === 'initial') return { expected: round2(Math.abs(((m.q2 - m.q1) / m.q1) / ((m.p2 - m.p1) / m.p1))) };
  if (m.mode === 'midpoint') return { expected: round2(Math.abs(((m.q2 - m.q1) / ((m.q1 + m.q2) / 2)) / ((m.p2 - m.p1) / ((m.p1 + m.p2) / 2)))) };
  if (m.mode === 'point') { const q = m.a - m.b * m.p; return { expected: round2(Math.abs(m.b * m.p / q)) }; }
  return { error: 'unknown mode ' + m.mode };
});

/* 7. ped_tr */
R.audit('ped_tr', (p) => {
  const m = p.math;
  if (m.mode === 'percent') {
    const dq = -m.ped * m.dPricePct;
    const tr = ((1 + m.dPricePct / 100) * (1 + dq / 100) - 1) * 100;
    return { expected: round2(tr) };
  }
  if (m.mode === 'direction') {
    const dq = -m.ped * m.dPricePct;
    const trPct = ((1 + m.dPricePct / 100) * (1 + dq / 100) - 1) * 100;
    const expected = trPct > 1e-9 ? 'rise' : trPct < -1e-9 ? 'fall' : 'same';
    return { expected, note: 'tr=' + round2(trPct) };
  }
  return { error: 'unknown mode ' + m.mode };
});

/* 8. yed */
R.audit('yed', (p) => {
  const m = p.math;
  let expected;
  if (m.mode === 'initial') expected = m.dQuantityPct / m.dIncomePct;
  else if (m.mode === 'initial-levels') expected = ((m.quantity2 - m.quantity1) / m.quantity1) / ((m.income2 - m.income1) / m.income1);
  else if (m.mode === 'midpoint') expected = ((m.quantity2 - m.quantity1) / ((m.quantity1 + m.quantity2) / 2)) / ((m.income2 - m.income1) / ((m.income1 + m.income2) / 2));
  else return { error: 'unknown mode ' + m.mode };
  expected = round2(expected);
  const kind = expected < 0 ? 'inferior' : expected < 1 ? 'necessity' : 'luxury';
  return { expected, note: 'kind expected=' + kind + ' got=' + m.kind };
});

/* 9. xed */
R.audit('xed', (p) => {
  const m = p.math;
  let expected;
  if (m.mode === 'initial') expected = m.dQxPct / m.dPyPct;
  else if (m.mode === 'initial-levels') expected = ((m.qx2 - m.qx1) / m.qx1) / ((m.py2 - m.py1) / m.py1);
  else if (m.mode === 'midpoint') expected = ((m.qx2 - m.qx1) / ((m.qx1 + m.qx2) / 2)) / ((m.py2 - m.py1) / ((m.py1 + m.py2) / 2));
  else return { error: 'unknown mode ' + m.mode };
  expected = round2(expected);
  const rel = expected < 0 ? 'complement' : 'substitute';
  return { expected, note: 'relation expected=' + rel + ' got=' + m.relation };
});

/* 10. pes */
R.audit('pes', (p) => {
  const m = p.math;
  if (m.mode === 'initial') return { expected: round2(((m.q2 - m.q1) / m.q1) / ((m.p2 - m.p1) / m.p1)) };
  if (m.mode === 'midpoint') return { expected: round2(((m.q2 - m.q1) / ((m.q1 + m.q2) / 2)) / ((m.p2 - m.p1) / ((m.p1 + m.p2) / 2))) };
  if (m.mode === 'point') { const q = m.c + m.d * m.p; return { expected: round2(m.d * m.p / q) }; }
  return { error: 'unknown mode ' + m.mode };
});

R.finish('micro');
