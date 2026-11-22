/* chk-welfare.js — types-welfare.js 的獨立重算（6 個題型） */
'use strict';
const R = require('./runner');
const { near, round2 } = R;

/* 由線性供需求無稅均衡 */
function eq(a, b, c, d) {
  const P = (a - c) / (b + d);
  return { P, Q: c + d * P };
}

/* 1. tax_incidence：Qd = a − bP、Qs = c + dP、從量稅 t。解 Qd(Pc) = Qs(Pc − t) */
R.audit('tax_incidence', (p) => {
  const m = p.math;
  const e = eq(m.a, m.b, m.c, m.d);
  const Pc = (m.a - m.c + m.d * m.t) / (m.b + m.d);
  const Pp = Pc - m.t;
  const Q1 = m.a - m.b * Pc;
  if (Math.abs((Pc - Pp) - m.t) > 1e-9) return { error: 'Pc-Pp != t' };
  if (!near(Pc, m.pc) || !near(Pp, m.pp) || !near(Q1, m.q1)) return { error: '參數不一致 pc/pp/q1：' + JSON.stringify({ Pc, Pp, Q1 }) };
  if (m.mode === 'tax_revenue') return { expected: round2(m.t * Q1) };
  if (m.mode === 'consumer_burden') return { expected: round2(Pc - e.P) };
  if (m.mode === 'producer_burden') return { expected: round2(e.P - Pp) };
  if (m.mode === 'dwl') return { expected: round2(0.5 * m.t * (e.Q - Q1)) };
  return { error: 'unknown mode ' + m.mode };
});

/* 2. price_control */
R.audit('price_control', (p) => {
  const m = p.math;
  const e = eq(m.a, m.b, m.c, m.d);
  const price = m.price;
  const Qd = m.a - m.b * price;
  const Qs = m.c + m.d * price;
  const Qt = Math.min(Qd, Qs);
  if (m.mode === 'shortage') {
    if (!(price < e.P)) return { error: 'ceiling 非 binding: price=' + price + ' pe=' + e.P };
    return { expected: round2(Qd - Qs) };
  }
  if (m.mode === 'surplus') {
    if (!(price > e.P)) return { error: 'floor 非 binding: price=' + price + ' pe=' + e.P };
    return { expected: round2(Qs - Qd) };
  }
  if (m.mode === 'traded_quantity') return { expected: round2(Qt) };
  if (m.mode === 'dwl') {
    const Pd = (q) => (m.a - q) / m.b;
    const Ps = (q) => (q - m.c) / m.d;
    return { expected: round2(0.5 * (e.Q - Qt) * (Pd(Qt) - Ps(Qt))), note: 'pe=' + e.P + ' qe=' + e.Q + ' qt=' + Qt };
  }
  return { error: 'unknown mode ' + m.mode };
});

/* 3. surplus */
R.audit('surplus', (p) => {
  const m = p.math;
  const c = m.q0 - m.d * m.p0;           /* 由均衡點反推供應截距 */
  const demandChoke = m.a / m.b;          /* 需求截距（P 軸） */
  const supplyChoke = c / m.d;            /* 供應在 P 軸的截距 */
  const cs = 0.5 * (demandChoke - m.p0) * m.q0;
  const ps = 0.5 * (m.p0 - supplyChoke) * m.q0;
  if (m.mode === 'consumer_surplus') {
    if (!near(cs, m.cs)) return { error: 'CS 參數不一致 cs=' + m.cs + ' calc=' + cs };
    return { expected: round2(cs) };
  }
  if (m.mode === 'producer_surplus') {
    if (!near(ps, m.ps)) return { error: 'PS 參數不一致 ps=' + m.ps + ' calc=' + ps };
    return { expected: round2(ps) };
  }
  if (m.mode === 'total_surplus') return { expected: round2(cs + ps) };
  if (m.mode === 'tax_dwl') {
    /* 課稅後：Pc、Pp、Q1 由給定參數推導 */
    const Pc = (m.a - c + m.d * m.t) / (m.b + m.d);
    const Pp = Pc - m.t;
    const Q1 = m.a - m.b * Pc;
    if (!near(Pc, m.pc) || !near(Pp, m.pp) || !near(Q1, m.q1)) return { error: '稅後參數不一致 ' + JSON.stringify({ Pc, Pp, Q1 }) };
    return { expected: round2(0.5 * m.t * (m.q0 - Q1)) };
  }
  return { error: 'unknown mode ' + m.mode };
});

/* 4. externality：MPC = a + bQ、MEC = e、MSB：P = c − dQ */
R.audit('externality', (p) => {
  const m = p.math;
  const qstar = (m.c - m.a - m.e) / (m.b + m.d);
  const qm = (m.c - m.a) / (m.b + m.d);
  if (!near(qstar, m.qstar) || !near(qm, m.qm)) return { error: 'qstar/qm 不一致 ' + qstar + '/' + qm };
  if (m.mode === 'social_optimum') return { expected: round2(qstar) };
  if (m.mode === 'pigouvian_tax') return { expected: round2(m.e) };
  if (m.mode === 'dwl') return { expected: round2(0.5 * (qm - qstar) * m.e) };
  return { error: 'unknown mode ' + m.mode };
});

/* 5. mv */
R.audit('mv', (p) => {
  const m = p.math;
  if (m.mode === 'mu_table') return { expected: m.mu1 - (m.index - 1) * m.drop };
  if (m.mode === 'price') return { expected: round2(m.muy * m.px / m.mux) };
  if (m.mode === 'quantity') {
    const targetMUx = m.px * m.muy / m.py;
    return { expected: round2((m.intercept - targetMUx) / m.slope) };
  }
  if (m.mode === 'budget_max') {
    /* 解 MUx/Px = MUy/Py 與預算約束：
       py·muxB·qx − px·muyB·qy = py·muxA − px·muyA
       px·qx + py·qy = I */
    const px = m.px, py = m.py, I = m.income;
    const a1 = py * m.muxB, b1 = -px * m.muyB, c1 = py * m.muxA - px * m.muyA;
    const a2 = px, b2 = py, c2 = I;
    const det = a1 * b2 - b1 * a2;
    const qx = (c1 * b2 - b1 * c2) / det;
    const qy = (a1 * c2 - c1 * a2) / det;
    const askX = /Q_x/.test(String(p.prompt.zh)) || /Q_x/.test(String(p.prompt.en));
    if (qx < -1e-9 || qy < -1e-9) return { error: '解出負數量 qx=' + qx + ' qy=' + qy };
    return { expected: round2(askX ? qx : qy), note: 'qx=' + round2(qx) + ' qy=' + round2(qy) + ' askX=' + askX };
  }
  return { error: 'unknown mode ' + m.mode };
});

/* 6. budget_line */
R.audit('budget_line', (p) => {
  const m = p.math;
  if (m.mode === 'max_x') return { expected: round2(m.income / m.px) };
  if (m.mode === 'max_y') return { expected: round2(m.income / m.py) };
  if (m.mode === 'slope') return { expected: round2(m.px / m.py) };
  if (m.mode === 'price_change') return { expected: round2(m.income / m.px2) };
  if (m.mode === 'income_change') return { expected: round2(m.income2 / m.px) };
  return { error: 'unknown mode ' + m.mode };
});

R.finish('welfare');
