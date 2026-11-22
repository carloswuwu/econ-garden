/* chk-macro.js — types-macro.js 的獨立重算（11 個題型） */
'use strict';
const R = require('./runner');
const { near, round2 } = R;

/* 1. gdp_exp */
R.audit('gdp_exp', (p) => {
  const m = p.math;
  if (m.mode === 'expenditure') return { expected: m.C + m.I + m.G + m.X - m.M };
  if (m.mode === 'per_capita') return { expected: round2(m.gdpY * 1000 / m.pop), note: '十億 / 百萬 → ×1000' };
  if (m.mode === 'inventory') return { expected: m.C + m.G + m.fixedCap + m.invChange + m.X - m.M, note: '轉移支付不計入 GDP' };
  return { error: 'unknown mode ' + m.mode };
});

/* 2. gdp_real */
R.audit('gdp_real', (p) => {
  const m = p.math;
  if (m.mode === 'real_from_nominal') return { expected: round2(m.nominal / m.deflator * 100) };
  if (m.mode === 'growth_rate') return { expected: round2((m.y2 - m.y1) / m.y1 * 100) };
  if (m.mode === 'approx_real_growth') return { expected: round2(m.nominalGrowth - m.inflation) };
  return { error: 'unknown mode ' + m.mode };
});

/* 3. growth */
R.audit('growth', (p) => {
  const m = p.math;
  if (m.mode === 'growth_rate') return { expected: round2((m.y2 - m.y1) / m.y1 * 100) };
  if (m.mode === 'per_capita') return { expected: round2(m.gdpY * 1000 / m.pop), note: '十億 / 百萬 → ×1000' };
  if (m.mode === 'rule72') return { expected: round2(72 / m.rate) };
  if (m.mode === 'cagr') return { expected: round2((Math.pow(m.end / 100, 1 / m.years) - 1) * 100) };
  return { error: 'unknown mode ' + m.mode };
});

/* 4. unemployment */
R.audit('unemployment', (p) => {
  const m = p.math;
  if (m.mode === 'unemployment_rate') return { expected: round2(m.unemployed / (m.employed + m.unemployed) * 100) };
  if (m.mode === 'participation_rate') return { expected: round2(m.labourForce / m.workingAge * 100) };
  if (m.mode === 'unemployment_rate_advanced') {
    const lf = m.employed + m.unemployed;
    return { expected: round2(m.unemployed / lf * 100) };
  }
  if (m.mode === 'participation_rate_advanced') return { expected: round2(m.labourForce / m.workingAge * 100) };
  return { error: 'unknown mode ' + m.mode };
});

/* 5. cpi */
R.audit('cpi', (p) => {
  const m = p.math;
  if (m.mode === 'cpi_basket') return { expected: round2(m.currentCost / m.baseCost * 100) };
  if (m.mode === 'inflation_from_cpi') return { expected: round2((m.cpi2 - m.cpi1) / m.cpi1 * 100) };
  if (m.mode === 'real_wage') {
    const real2 = m.wage2 / (m.cpi / 100);
    return { expected: round2((real2 - m.wage1) / m.wage1 * 100), note: 'real2=' + round2(real2) };
  }
  return { error: 'unknown mode ' + m.mode };
});

/* 6. inflation */
R.audit('inflation', (p) => {
  const m = p.math;
  if (m.mode === 'real_value') return { expected: round2(m.nominal / (1 + m.inflation / 100)) };
  if (m.mode === 'real_interest') return { expected: round2(m.nominalRate - m.inflation) };
  if (m.mode === 'purchasing_power') return { expected: round2((1 - 1 / (1 + m.inflation / 100)) * 100), note: '購買力下降百分比' };
  return { error: 'unknown mode ' + m.mode };
});

/* 7. multiplier */
R.audit('multiplier', (p) => {
  const m = p.math;
  if (m.mode === 'expenditure_multiplier') return { expected: round2(1 / (1 - m.mpc)) };
  if (m.mode === 'change_in_income') return { expected: round2(m.dG / (1 - m.mpc)) };
  if (m.mode === 'tax_multiplier') return { expected: round2(-m.mpc / (1 - m.mpc) * m.dT) };
  if (m.mode === 'open_multiplier') return { expected: round2(1 / (m.mps + m.mpm)) };
  return { error: 'unknown mode ' + m.mode };
});

/* 8. income_eq */
R.audit('income_eq', (p) => {
  const m = p.math;
  if (m.mode === 'basic') return { expected: round2((m.a + m.I + m.G) / (1 - m.b)) };
  if (m.mode === 'with_tax') return { expected: round2((m.a - m.b * m.T + m.I + m.G) / (1 - m.b)) };
  if (m.mode === 'open_economy') return { expected: round2((m.a + m.I + m.G + m.X) / (1 - m.b + m.m)) };
  return { error: 'unknown mode ' + m.mode };
});

/* 9. money_multiplier */
R.audit('money_multiplier', (p) => {
  const m = p.math;
  if (m.mode === 'simple_multiplier') return { expected: round2(1 / (m.reserve / 100)) };
  if (m.mode === 'deposit_creation') return { expected: round2(m.initialDeposit / (m.reserve / 100)) };
  if (m.mode === 'cash_leakage') {
    const r = m.reserve / 100, c = m.cashRatio / 100;
    return { expected: round2((1 + c) / (r + c)) };
  }
  return { error: 'unknown mode ' + m.mode };
});

/* 10. money_demand：MV = PY（priceIndex 以 100 為基期） */
R.audit('money_demand', (p) => {
  const m = p.math;
  const P = m.priceIndex / 100;
  if (m.mode === 'find_money') return { expected: round2(P * m.realGDP / m.velocity) };
  if (m.mode === 'find_velocity') return { expected: round2(P * m.realGDP / m.money) };
  if (m.mode === 'growth_rates') return { expected: round2(m.inflation + m.realGrowth - m.velocityChange), note: '%ΔM = π + %ΔY − %ΔV' };
  return { error: 'unknown mode ' + m.mode };
});

/* 11. interest */
R.audit('interest', (p) => {
  const m = p.math;
  if (m.mode === 'simple') {
    const interest = m.P * m.r / 100 * m.t;
    if (m.variant === 'interest') return { expected: round2(interest) };
    if (m.variant === 'amount') return { expected: round2(m.P + interest) };
    if (m.variant === 'time') {
      /* 題幹應給本利和 = P(1+rt)；驗證後回推 t */
      const target = m.P + interest;
      if (String(p.prompt.zh).indexOf(String(round2(target))) === -1) return { error: '題幹本利和不等於 P(1+rt)：' + target };
      return { expected: round2(m.t) };
    }
    return { error: 'variant? ' + m.variant };
  }
  if (m.mode === 'compound') {
    const amount = m.P * Math.pow(1 + m.r / 100, m.n);
    if (m.variant === 'amount') return { expected: round2(amount) };
    if (m.variant === 'interest') return { expected: round2(amount - m.P) };
    if (m.variant === 'double') return { expected: round2(72 / m.r) };
    return { error: 'variant? ' + m.variant };
  }
  if (m.mode === 'real') return { expected: round2(m.nominalRate - m.inflation) };
  if (m.mode === 'effective') return { expected: round2((Math.pow(1 + m.nominalRate / 100 / m.frequency, m.frequency) - 1) * 100) };
  return { error: 'unknown mode ' + m.mode };
});

R.finish('macro');
