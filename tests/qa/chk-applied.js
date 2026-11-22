/* chk-applied.js — types-applied.js 的獨立重算（5 個題型）
 * 注意：這 5 個題型只被挑戰區／大學區技能引用，而該等技能的 levels 由 level 2 起，
 * 故 level 1 分支在 app 內不可達；另外用 directLevels 直接呼叫生成器補測。 */
'use strict';
const R = require('./runner');
const { near, round2 } = R;
const DIRECT = [1];

/* 1. regression */
R.audit('regression', (p) => {
  const m = p.math;
  if (m.mode === 'predict') return { expected: round2(m.a + m.b * m.x0) };
  if (m.mode === 'slope') return { expected: 'a', note: '斜率正確解釋為選項 a' };
  if (m.mode === 'r2') return { expected: 'a', note: 'R² 正確解釋為選項 a' };
  if (m.mode === 'sig') return { expected: m.p < 0.05 ? 'sig' : 'notsig', note: 'p=' + m.p };
  return { error: 'unknown mode ' + m.mode };
}, { directLevels: DIRECT });

/* 2. npv */
R.audit('npv', (p) => {
  const m = p.math;
  const f = 1 + m.r / 100;
  if (m.mode === 'pv') return { expected: round2(m.cf1 / f) };
  if (m.mode === 'npv2') return { expected: round2(m.cf1 / f + m.cf2 / (f * f) - m.c0) };
  if (m.mode === 'decision') {
    const npv = m.cf1 / 1.1 + m.cf2 / 1.21 + m.cf3 / 1.331 - m.c0;
    return { expected: npv > 1e-9 ? 'accept' : npv < -1e-9 ? 'reject' : 'accept', note: 'NPV=' + round2(npv) };
  }
  return { error: 'unknown mode ' + m.mode };
}, { directLevels: DIRECT });

/* 3. gini（梯形法） */
function giniOf(x, y) {
  let sum = 0;
  for (let i = 1; i < x.length; i++) sum += (x[i] - x[i - 1]) * (y[i] + y[i - 1]);
  return round2(1 - sum);
}
R.audit('gini', (p) => {
  const m = p.math;
  const g = giniOf(m.x, m.y);
  if (m.mode === 'gini') return { expected: g };
  if (m.mode === 'compare') {
    const expected = g > m.otherGini ? 'jia' : g < m.otherGini ? 'yi' : 'same';
    return { expected, note: 'gA=' + g + ' gB=' + m.otherGini };
  }
  return { error: 'unknown mode ' + m.mode };
}, { directLevels: DIRECT });

/* 4. data_read */
R.audit('data_read', (p) => {
  const m = p.math;
  if (m.mode === 'share') {
    const total = m.values.reduce((s, v) => s + v, 0);
    return { expected: round2(m.values[m.idx] / total * 100) };
  }
  if (m.mode === 'change') return { expected: round2((m.last - m.first) / m.first * 100) };
  if (m.mode === 'real') return { expected: round2(m.nominal * 100 / m.priceIndex) };
  return { error: 'unknown mode ' + m.mode };
}, { directLevels: DIRECT });

/* 5. growth_model */
R.audit('growth_model', (p) => {
  const m = p.math;
  if (m.mode === 'hd_g') return { expected: round2(m.s / m.v) };
  if (m.mode === 'hd_s') return { expected: round2(m.g * m.v) };
  if (m.mode === 'ga_tfp') return { expected: round2(m.g - m.alpha * m.gK - (1 - m.alpha) * m.gL) };
  if (m.mode === 'ga_g') return { expected: round2(m.alpha * m.gK + (1 - m.alpha) * m.gL + m.tfp) };
  return { error: 'unknown mode ' + m.mode };
}, { directLevels: DIRECT });

R.finish('applied');
