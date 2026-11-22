/* chk-intl.js — types-international.js 的獨立重算（8 個題型） */
'use strict';
const R = require('./runner');
const { near, round2 } = R;

/* 1. exchange_rate */
R.audit('exchange_rate', (p) => {
  const m = p.math;
  if (m.mode === 'toHKD') return { expected: round2(m.amount * m.rate) };
  if (m.mode === 'toForeign') {
    /* math.amount 為港元總額；外幣數量 = 港元 ÷ 匯率 */
    return { expected: round2(m.amount / m.rate), note: 'hkdAmount=' + m.amount };
  }
  if (m.mode === 'change') return { expected: round2(Math.abs(m.newRate - m.oldRate) / m.oldRate * 100) };
  if (m.mode === 'crossUSD') return { expected: round2(m.quote / m.base), note: '1 HKD = quote/base JPY' };
  if (m.mode === 'crossEUR') return { expected: round2(m.base / m.quote), note: '1 USD = base/quote HKD' };
  return { error: 'unknown mode ' + m.mode };
});

/* 2. ppp */
R.audit('ppp', (p) => {
  const m = p.math;
  if (m.mode === 'pppRate') return { expected: round2(m.domestic / m.foreign), note: 'ppp=' + m.ppp };
  if (m.mode === 'pppJudge') {
    const expected = m.nominal > m.ppp ? 'over' : m.nominal < m.ppp ? 'under' : 'parity';
    return { expected, note: 'nominal=' + m.nominal + ' ppp=' + m.ppp };
  }
  if (m.mode === 'realRate') return { expected: round2(m.nominal * m.foreignIndex / m.domesticIndex) };
  return { error: 'unknown mode ' + m.mode };
});

/* 3. balance_payments（資本帳 = −經常帳，簡化模型） */
R.audit('balance_payments', (p) => {
  const m = p.math;
  if (m.mode === 'goodsServices') return { expected: m.goodsX - m.goodsM + m.servicesX - m.servicesM };
  if (m.mode === 'currentAccount') {
    const ca = m.goodsX - m.goodsM + m.servicesX - m.servicesM + m.income + m.transfers;
    return { expected: ca };
  }
  if (m.mode === 'capitalAccount') {
    const ca = m.goodsX - m.goodsM + m.servicesNet + m.income + m.transfers;
    return { expected: -ca, note: 'CA=' + ca };
  }
  return { error: 'unknown mode ' + m.mode };
});

/* 4. fiscal_balance */
R.audit('fiscal_balance', (p) => {
  const m = p.math;
  if (m.mode === 'overall') return { expected: m.revenue - m.spending };
  if (m.mode === 'primary') return { expected: m.revenue - m.nonInterest, note: '基本盈餘 = 收入 − 非利息支出' };
  if (m.mode === 'debtRatio') {
    const debt1 = m.debt0 + (m.spending - m.revenue);
    return { expected: round2(debt1 / m.gdp * 100), note: 'debt1=' + debt1 };
  }
  return { error: 'unknown mode ' + m.mode };
});

/* 5. tax_basic */
R.audit('tax_basic', (p) => {
  const m = p.math;
  if (m.mode === 'proportional') return { expected: round2(m.income * m.rate / 100) };
  if (m.mode === 'allowanceTax') return { expected: round2((m.income - m.allowance) * m.rate / 100) };
  if (m.mode === 'allowanceAvg') {
    const tax = round2((m.income - m.allowance) * m.rate / 100);
    return { expected: round2(tax / m.income * 100), note: 'tax=' + tax };
  }
  if (m.mode === 'specificAdd') return { expected: round2(m.price + m.perUnit) };
  if (m.mode === 'specificReverse') return { expected: round2(m.price), note: '稅前價 = 含稅價 ' + (m.price + m.perUnit) + ' − ' + m.perUnit };
  if (m.mode === 'advalorem') return { expected: round2(m.price * (1 + m.adRate / 100)) };
  return { error: 'unknown mode ' + m.mode };
});

/* 6. tax_progressive：0–50,000 2%；50,001–100,000 6%；100,001–150,000 10%；150,001–200,000 14%；200,000 以上 17% */
function taxOf(income) {
  const brackets = [[50000, 2], [100000, 6], [150000, 10], [200000, 14], [Infinity, 17]];
  let tax = 0, lower = 0;
  for (const [upper, rate] of brackets) {
    if (income <= lower) break;
    const slice = Math.min(income, upper) - lower;
    tax += slice * rate / 100;
    lower = upper;
  }
  return round2(tax);
}
R.audit('tax_progressive', (p) => {
  const m = p.math;
  if (m.mode === 'progressiveTax') return { expected: taxOf(m.income) };
  if (m.mode === 'averageRate') return { expected: round2(taxOf(m.income) / m.income * 100) };
  if (m.mode === 'compareRate') {
    const rateA = round2(taxOf(m.incomeA) / m.incomeA * 100);
    const rateB = round2(taxOf(m.incomeB) / m.incomeB * 100);
    return { expected: round2(rateB - rateA), note: 'A=' + rateA + '% B=' + rateB + '%' };
  }
  return { error: 'unknown mode ' + m.mode };
});

/* 7. budget_personal */
R.audit('budget_personal', (p) => {
  const m = p.math;
  if (m.mode === 'saving') return { expected: m.income - m.expenses };
  if (m.mode === 'savingRate') return { expected: round2((m.income - m.expenses) / m.income * 100) };
  if (m.mode === 'targetMonths') return { expected: Math.ceil(m.target / (m.income - m.expenses)), note: '不足一月作一月計' };
  return { error: 'unknown mode ' + m.mode };
});

/* 8. percentage */
R.audit('percentage', (p) => {
  const m = p.math;
  if (m.mode === 'discount') return { expected: round2(m.price * (1 - m.discount / 100)) };
  if (m.mode === 'serviceCharge') return { expected: round2(m.bill * (1 + m.charge / 100)) };
  if (m.mode === 'markup') return { expected: round2(m.cost * (1 + m.markup / 100)) };
  if (m.mode === 'reverseMarkup') return { expected: round2(m.selling / (1 + m.markup / 100)) };
  if (m.mode === 'reverseDiscount') return { expected: round2(m.sale / (1 - m.discount / 100)) };
  if (m.mode === 'successive') return { expected: round2(((1 + m.upPct / 100) * (1 - m.downPct / 100) - 1) * 100) };
  return { error: 'unknown mode ' + m.mode };
});

R.finish('intl');
