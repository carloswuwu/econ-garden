/* chk-micro2.js — types-micro2.js 的獨立重算（10 個題型） */
'use strict';
const R = require('./runner');
const { near, round2 } = R;

/* 1. cost */
R.audit('cost', (p) => {
  const m = p.math;
  if (m.mode === 'tc') return { expected: m.fc + m.vc * m.q };
  if (m.mode === 'ac') return { expected: round2((m.fc + m.vc * m.q) / m.q) };
  if (m.mode === 'mc') {
    const tc = (q) => m.fc + m.a * q + m.b * q * q;
    return { expected: tc(m.n) - tc(m.n - 1) };
  }
  if (m.mode === 'mrmc') {
    const q = (m.a - m.c) / (2 * m.b + m.d);
    const price = m.a - m.b * q;
    if (m.ask === 'quantity') return { expected: round2(q) };
    if (m.ask === 'price') return { expected: round2(price) };
    return { error: 'ask? ' + m.ask };
  }
  return { error: 'unknown mode ' + m.mode };
});

/* 2. profit */
R.audit('profit', (p) => {
  const m = p.math;
  if (m.mode === 'accounting') return { expected: m.p * m.q - m.explicit };
  if (m.mode === 'economic') return { expected: m.tr - m.explicit - m.salary - m.rent };
  if (m.mode === 'normal') return { expected: round2(m.tr - m.explicit - m.salary - m.capital * m.rate / 100) };
  return { error: 'unknown mode ' + m.mode };
});

/* 3. monopoly */
R.audit('monopoly', (p) => {
  const m = p.math;
  const qm = (m.a - m.c) / (2 * m.b);
  const pm = m.a - m.b * qm;
  if (m.mode === 'quantity') return { expected: round2(qm) };
  if (m.mode === 'price') return { expected: round2(pm) };
  if (m.mode === 'profit') return { expected: round2((pm - m.c) * qm - (m.fc || 0)) };
  if (m.mode === 'dwl') {
    const qc = (m.a - m.c) / m.b;
    return { expected: round2(0.5 * (qc - qm) * (pm - m.c)) };
  }
  return { error: 'unknown mode ' + m.mode };
});

/* 4. price_discrimination */
R.audit('price_discrimination', (p) => {
  const m = p.math;
  const a1 = m.a1, a2 = m.a2, b = m.b, c = m.c;
  const q1 = (a1 - c) / (2 * b), q2 = (a2 - c) / (2 * b);
  const p1 = (a1 + c) / 2, p2 = (a2 + c) / 2;
  if (m.mode === 'quantity') {
    const expected = m.market === 1 ? q1 : q2;
    return { expected: round2(expected), note: 'market=' + m.market };
  }
  if (m.mode === 'price') {
    const expected = m.market === 1 ? p1 : p2;
    return { expected: round2(expected), note: 'market=' + m.market };
  }
  if (m.mode === 'compare') {
    const expected = p1 > p2 ? 'm1' : p2 > p1 ? 'm2' : 'same';
    return { expected, note: 'p1=' + p1 + ' p2=' + p2 };
  }
  return { error: 'unknown mode ' + m.mode };
});

/* 5. hhi */
R.audit('hhi', (p) => {
  const m = p.math;
  const shares = m.shares.slice();
  const old = shares.reduce((s, x) => s + x * x, 0);
  if (m.mode === 'three' || m.mode === 'four') {
    if (Math.round(shares.reduce((s, x) => s + x, 0)) !== 100) return { error: 'shares 總和不等於 100: ' + shares.join(',') };
    return { expected: old };
  }
  if (m.mode === 'merger') {
    const i = m.merge[0], j = m.merge[1];
    const combined = shares[i] + shares[j];
    const expected = old - shares[i] * shares[i] - shares[j] * shares[j] + combined * combined;
    const change = 2 * shares[i] * shares[j];
    const wantChange = /增加了多少/.test(String(p.prompt.zh));
    return { expected: wantChange ? change : expected, note: 'old=' + old + ' new=' + expected + ' change=' + change + ' askChange=' + wantChange };
  }
  return { error: 'unknown mode ' + m.mode };
});

/* 6. game_theory */
function nashCells(m) {
  const out = [];
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
      if (m[r][c][0] > m[1 - r][c][0] && m[r][c][1] > m[r][1 - c][1]) out.push('xy'.charAt(r) + 'xy'.charAt(c));
    }
  }
  return out;
}
R.audit('game_theory', (p) => {
  const m = p.math;
  if (m.mode === 'dominant') {
    let expected;
    const mtx = m.payoffs;
    if (mtx[0][0][0] > mtx[1][0][0] && mtx[0][1][0] > mtx[1][1][0]) expected = 'x';
    else if (mtx[1][0][0] > mtx[0][0][0] && mtx[1][1][0] > mtx[0][1][0]) expected = 'y';
    else expected = 'none';
    return { expected, note: 'matrix=' + JSON.stringify(m.payoffs) };
  }
  if (m.mode === 'nash') {
    const cells = nashCells(m.payoffs);
    if (cells.length !== 1) return { expected: cells[0] || '(none)', note: 'NE cells=' + cells.join('/') + ' matrix=' + JSON.stringify(m.payoffs) };
    return { expected: cells[0] };
  }
  if (m.mode === 'dilemma') {
    /* 找出 (合作,合作) 與 (背叛,背叛)：對角格收益相等者為合作/背叛 */
    const d0 = m.payoffs[0][0][0] === m.payoffs[0][0][1];
    const d1 = m.payoffs[1][1][0] === m.payoffs[1][1][1];
    if (!d0 && !d1) return { error: '非對稱對角矩陣' };
    const c = d0 ? 0 : 1, d = 1 - c;
    const T = m.payoffs[d][c][0], R = m.payoffs[c][c][0], P = m.payoffs[d][d][0], S = m.payoffs[c][d][0];
    const isPD = T > R && R > P && P > S;
    return { expected: 'pd', note: 'PD? T=' + T + ' R=' + R + ' P=' + P + ' S=' + S + ' => ' + isPD };
  }
  if (m.mode === 'repeated') return { expected: 'future' };
  return { error: 'unknown mode ' + m.mode };
});

/* 7. labour */
function labourAsk(p) {
  const zh = String(p.prompt.zh);
  if (/均衡工資率|新的均衡工資率/.test(zh)) return 'wage';
  if (/均衡就業量|新的均衡就業量/.test(zh)) return 'employment';
  return null;
}
R.audit('labour', (p) => {
  const m = p.math;
  const ask = labourAsk(p);
  if (m.mode === 'equilibrium') {
    const L = (m.a - m.c) / (m.b + m.d);
    const W = m.a - m.b * L;
    if (ask === 'employment') return { expected: round2(L), note: 'L=' + L + ' W=' + W };
    if (ask === 'wage') return { expected: round2(W), note: 'L=' + L + ' W=' + W };
    return { error: 'ask? ' + zh };
  }
  if (m.mode === 'minimum_wage') {
    const Ld = (m.a - m.Wm) / m.b;
    const Ls = (m.Wm - m.c) / m.d;
    return { expected: round2(Ls - Ld), note: 'Ld=' + Ld + ' Ls=' + Ls };
  }
  if (m.mode === 'shift') {
    const L = (m.a - m.c) / (m.b + m.d);
    const W = m.a - m.b * L;
    if (ask === 'employment') return { expected: round2(L), note: 'a=' + m.a + ' c=' + m.c + ' change=' + m.change };
    if (ask === 'wage') return { expected: round2(W), note: 'a=' + m.a + ' c=' + m.c + ' change=' + m.change };
    return { error: 'ask? ' + zh };
  }
  return { error: 'unknown mode ' + m.mode };
});

/* 8. comparative_advantage */
R.audit('comparative_advantage', (p) => {
  const m = p.math;
  if (m.mode === 'oppcost') {
    return { expected: round2(m.good === 'x' ? m.y / m.x : m.x / m.y) };
  }
  if (m.mode === 'which') {
    const ocA = m.ya / m.xa, ocB = m.yb / m.xb;
    if (Math.abs(ocA - ocB) < 1e-9) return { expected: 'same' };
    return { expected: ocA < ocB ? 'a' : 'b', note: 'ocA=' + ocA + ' ocB=' + ocB };
  }
  if (m.mode === 'gains') {
    /* 甲國自給自足消費 X = Xs/2；專業化後 Xs；換出 t → 最終 Xs−t；得益 = Xs/2 − t */
    return { expected: round2(m.Xs / 2 - m.t), note: 'Xs=' + m.Xs + ' t=' + m.t + ' r=' + m.r };
  }
  return { error: 'unknown mode ' + m.mode };
});

/* 9. tariff */
R.audit('tariff', (p) => {
  const m = p.math;
  const P1 = m.Pw + m.t;
  const Qd = (P) => m.a - m.b * P;
  const Qs = (P) => m.c + m.d * P;
  if (m.mode === 'price_or_imports') {
    if (m.ask === 'price') return { expected: round2(P1) };
    if (m.ask === 'imports') return { expected: round2(Qd(P1) - Qs(P1)) };
    return { error: 'ask? ' + m.ask };
  }
  if (m.mode === 'revenue') return { expected: round2(m.t * (Qd(P1) - Qs(P1))) };
  if (m.mode === 'dwl') {
    const Pw = m.Pw;
    const imports0 = Qd(Pw) - Qs(Pw);
    const imports1 = Qd(P1) - Qs(P1);
    if (!(imports0 > 0) || !(imports1 > 0)) return { error: '進口量非正: ' + imports0 + '/' + imports1 };
    return { expected: round2(0.5 * m.t * (imports0 - imports1)) };
  }
  return { error: 'unknown mode ' + m.mode };
});

R.finish('micro2');
