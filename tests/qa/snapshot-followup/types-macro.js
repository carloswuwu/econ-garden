/*
 * 經濟學園 · Econ Garden — 宏觀經濟題型生成器
 * content/types-macro.js
 * ------------------------------------------------------------------
 * 題型（docs/TYPE-CATALOG.md 第 4 節）：
 *   gdp_exp, gdp_real, growth, unemployment, cpi, inflation,
 *   multiplier, income_eq, money_multiplier, money_demand, interest
 *
 * 所有隨機性只用傳入的 rng；答案一律四捨五入至 2 位小數；
 * 題幹寫明單位與模型假設；解題步驟最後一步給出答案。
 */
(function () {
  'use strict';

  var ED = window.EconData;
  if (!ED) throw new Error('types-macro.js 需要先載入 econ-boot.js');
  var U = ED.util;

  /* ---------------- 通用小工具 ---------------- */

  function pair(zh, en) { return { zh: zh, en: en }; }
  function sol(zh, en) { return { zh: zh, en: en }; }
  function fm(v, dp) { return U.fmt(v, dp === undefined ? 2 : dp); }
  function rd(v, dp) { return U.round(v, dp === undefined ? 2 : dp); }
  /* 中文以「萬人」為單位時，英文統一換算為百萬人（1 百萬人 = 100 萬人） */
  function mil(v) { return U.fmt(v / 100, 2); }

  /* 建立含正確答案與指定干擾項的數值選項（大額金錢題用） */
  function choiceSet(rng, answer, distractors, opts) {
    opts = opts || {};
    var dp = opts.dp === undefined ? 2 : opts.dp;
    var min = opts.min;
    var max = opts.max;
    var seen = {};
    var out = [];
    function add(v) {
      if (typeof v !== 'number' || !isFinite(v)) return false;
      v = U.round(v, dp);
      if (min !== undefined && min !== null && v < min) return false;
      if (max !== undefined && max !== null && v > max) return false;
      var key = String(v);
      if (seen[key]) return false;
      seen[key] = true;
      out.push(v);
      return true;
    }
    add(answer);
    (distractors || []).forEach(add);
    var unit = opts.step !== undefined ? opts.step : Math.abs(answer) * 0.1;
    unit = U.round(unit, dp);
    if (!unit) unit = Math.pow(10, -dp);
    var guard = 0;
    while (out.length < 4 && guard++ < 400) {
      add(answer + U.pick(rng, [unit, -unit, unit * 2, -unit * 2]));
    }
    return U.shuffle(rng, out);
  }

  /* ================================================================
   * 1. gdp_exp — 支出法本地生產總值
   * ================================================================ */

  ED.registerType('gdp_exp', function (rng, o) {
    var level = o.level || 1;

    if (level === 1) {
      var C = U.randInt(rng, 8, 20) * 100;
      var I = U.randInt(rng, 3, 8) * 100;
      var G = U.randInt(rng, 2, 6) * 100;
      var X = U.randInt(rng, 6, 14) * 100;
      var M = U.randInt(rng, 5, 12) * 100;
      var nx = X - M;
      var gdp = C + I + G + nx;
      return {
        prompt: pair(
          '某開放經濟體系某年的支出資料如下（單位：百萬元）：私人消費支出 $C = ' + C + '$；本地固定資本形成總額 $I = ' + I + '$；政府消費支出 $G = ' + G + '$；貨物及服務出口 $X = ' + X + '$；貨物及服務進口 $M = ' + M + '$。用支出法計算該年的本地生產總值（GDP），答案以百萬元為單位，四捨五入至整數。',
          'The expenditure data of an open economy in a certain year are as follows (in millions of dollars): private consumption expenditure $C = ' + C + '$; gross domestic fixed capital formation $I = ' + I + '$; government consumption expenditure $G = ' + G + '$; exports of goods and services $X = ' + X + '$; imports of goods and services $M = ' + M + '$. Using the expenditure approach, calculate the GDP of that year in millions of dollars, rounded to the nearest integer.'
        ),
        hint: pair(
          '支出法公式：$GDP = C + I + G + X - M$。先算淨出口 $X - M$，再加上私人消費、投資與政府支出。',
          'Expenditure approach: $GDP = C + I + G + X - M$. Find net exports $X - M$ first, then add consumption, investment and government expenditure.'
        ),
        answer: gdp,
        choices: choiceSet(rng, gdp, [C + I + G + X, C + I + G, C + I + G + M, gdp + M], { dp: 0, min: 0 }),
        solution: sol(
          ['支出法的公式為 $GDP = C + I + G + X - M$，其中 $X - M$ 是淨出口。',
           '淨出口 = ' + X + ' − ' + M + ' = ' + nx + '（百萬元）。',
           'GDP = ' + C + ' + ' + I + ' + ' + G + ' + ' + X + ' − ' + M + ' = ' + gdp + '（百萬元）。',
           '因此該年的本地生產總值為 ' + gdp + ' 百萬元。'],
          ['By the expenditure approach, $GDP = C + I + G + X - M$, where $X - M$ is net exports.',
           'Net exports = ' + X + ' - ' + M + ' = ' + nx + ' (millions of dollars).',
           'GDP = ' + C + ' + ' + I + ' + ' + G + ' + ' + X + ' - ' + M + ' = ' + gdp + ' (millions of dollars).',
           'So the GDP of that year is ' + gdp + ' million dollars.']
        ),
        math: { mode: 'expenditure', C: C, I: I, G: G, X: X, M: M }
      };
    }

    if (level === 2) {
      var pcThousand = U.pick(rng, [260, 280, 300, 320, 360, 400, 440, 480]);
      var pop = U.pick(rng, [5, 6.5, 7, 7.5, 8]);          // 百萬人
      var gdpY = pcThousand * pop;                          // 十億元
      var nx2 = U.pick(rng, [-200, -100, 100, 200]);
      var X2 = U.randInt(rng, 20, 40) * 10;
      var M2 = X2 - nx2;
      if (M2 <= 0) { X2 = U.randInt(rng, 50, 80) * 10; M2 = X2 - nx2; }
      var domestic = gdpY - nx2;                            // C + I + G
      var C2 = Math.round(domestic * U.pick(rng, [0.55, 0.6, 0.62]) / 10) * 10;
      var I2 = Math.round(domestic * U.pick(rng, [0.2, 0.22, 0.25]) / 10) * 10;
      var G2 = domestic - C2 - I2;
      if (G2 < 100) { C2 = C2 - (100 - G2); G2 = 100; }
      var perCapita = rd(gdpY / pop * 1000, 2);
      return {
        prompt: pair(
          '某經濟體系去年的資料如下（單位：十億元）：私人消費支出 $C = ' + C2 + '$；本地固定資本形成總額 $I = ' + I2 + '$；政府消費支出 $G = ' + G2 + '$；貨物及服務出口 $X = ' + X2 + '$；貨物及服務進口 $M = ' + M2 + '$；人口為 ' + pop + ' 百萬人。求該年的人均本地生產總值（以元為單位，四捨五入至整數）。',
          'The data of an economy last year are as follows (in billions of dollars): private consumption expenditure $C = ' + C2 + '$; gross domestic fixed capital formation $I = ' + I2 + '$; government consumption expenditure $G = ' + G2 + '$; exports of goods and services $X = ' + X2 + '$; imports of goods and services $M = ' + M2 + '$. The population is ' + pop + ' million. Find the GDP per capita of that year in dollars, rounded to the nearest integer.'
        ),
        hint: pair(
          '先用支出法求 GDP（十億元），再除以人口（百萬人）。單位換算：1 十億元 ÷ 1 百萬人 = 1000 元。',
          'First find GDP by the expenditure approach (billions of dollars), then divide by population (millions). Unit conversion: 1 billion divided by 1 million equals 1000 dollars.'
        ),
        answer: perCapita,
        choices: choiceSet(rng, perCapita, [gdpY, rd(perCapita / 10, 2), rd(perCapita * 10, 2), rd(perCapita / 100, 2)], { dp: 0, min: 0 }),
        solution: sol(
          ['支出法：$GDP = C + I + G + X - M$。',
           '淨出口 = ' + X2 + ' − ' + M2 + ' = ' + nx2 + '（十億元）。',
           'GDP = ' + C2 + ' + ' + I2 + ' + ' + G2 + ' + ' + X2 + ' − ' + M2 + ' = ' + gdpY + '（十億元）。',
           '人均 GDP = GDP ÷ 人口 = ' + gdpY + ' 十億元 ÷ ' + pop + ' 百萬人 = ' + fm(gdpY / pop, 2) + ' × 1000 = ' + fm(perCapita, 0) + ' 元。',
           '因此該年的人均本地生產總值為 ' + fm(perCapita, 0) + ' 元。'],
          ['Expenditure approach: $GDP = C + I + G + X - M$.',
           'Net exports = ' + X2 + ' - ' + M2 + ' = ' + nx2 + ' (billions of dollars).',
           'GDP = ' + C2 + ' + ' + I2 + ' + ' + G2 + ' + ' + X2 + ' - ' + M2 + ' = ' + gdpY + ' (billions of dollars).',
           'GDP per capita = GDP / population = ' + gdpY + ' billion / ' + pop + ' million = ' + fm(gdpY / pop, 2) + ' x 1000 = ' + fm(perCapita, 0) + ' dollars.',
           'So the GDP per capita of that year is ' + fm(perCapita, 0) + ' dollars.']
        ),
        math: { mode: 'per_capita', gdpY: gdpY, pop: pop, nx: nx2 }
      };
    }

    /* level 3：存貨變動與轉移支付陷阱 */
    var C3 = U.randInt(rng, 8, 18) * 100;
    var G3 = U.randInt(rng, 3, 7) * 100;
    var fixedCap = U.randInt(rng, 4, 9) * 100;
    var invChange = U.pick(rng, [-200, -100, 100, 200]);
    var X3 = U.randInt(rng, 6, 14) * 100;
    var M3 = U.randInt(rng, 5, 12) * 100;
    var transfer = U.randInt(rng, 1, 5) * 100;
    var capitalForm = fixedCap + invChange;
    var gdp3 = C3 + G3 + capitalForm + X3 - M3;
    return {
      prompt: pair(
        '某開放經濟體系某年的支出資料如下（單位：百萬元）：私人消費支出 $C = ' + C3 + '$；政府消費支出 $G = ' + G3 + '$；本地固定資本形成總額 = ' + fixedCap + '；存貨變動 = ' + invChange + '（存貨減少記為負數）；貨物及服務出口 $X = ' + X3 + '$；貨物及服務進口 $M = ' + M3 + '$。另外，政府向家庭發放社會福利轉移支付 ' + transfer + ' 百萬元。用支出法計算該年的本地生產總值（GDP），只計入應計入的項目（百萬元，四捨五入至整數）。',
        'The expenditure data of an open economy in a certain year are as follows (in millions of dollars): private consumption expenditure $C = ' + C3 + '$; government consumption expenditure $G = ' + G3 + '$; gross domestic fixed capital formation = ' + fixedCap + '; change in inventories = ' + invChange + ' (a fall in inventories is recorded as a negative number); exports of goods and services $X = ' + X3 + '$; imports of goods and services $M = ' + M3 + '$. In addition, the government pays social welfare transfer payments of ' + transfer + ' million dollars to households. Using the expenditure approach, calculate the GDP of that year, counting only the items that should be counted (in millions of dollars, rounded to the nearest integer).'
      ),
      hint: pair(
        '本地資本形成總額 = 本地固定資本形成 + 存貨變動，兩者都要計入 GDP；政府轉移支付只是收入再分配，不是生產，不計入 GDP。',
        'Gross domestic capital formation equals gross domestic fixed capital formation plus the change in inventories; both are included in GDP. Government transfer payments are merely income redistribution, not production, so they are excluded from GDP.'
      ),
      answer: gdp3,
      choices: choiceSet(rng, gdp3, [gdp3 + transfer, C3 + G3 + fixedCap + X3 - M3, C3 + G3 + capitalForm + X3, C3 + G3 + capitalForm + X3 + M3], { dp: 0, min: 0 }),
      solution: sol(
        ['支出法：$GDP = C + I + G + X - M$，其中本地資本形成總額 $I$ = 本地固定資本形成 + 存貨變動。',
         '本地資本形成總額 = ' + fixedCap + ' + (' + invChange + ') = ' + capitalForm + '（百萬元）。',
         '政府轉移支付 ' + transfer + ' 百萬元屬於收入再分配，不涉及生產，不計入 GDP。',
         'GDP = ' + C3 + ' + ' + capitalForm + ' + ' + G3 + ' + ' + X3 + ' − ' + M3 + ' = ' + gdp3 + '（百萬元）。',
         '因此該年的本地生產總值為 ' + gdp3 + ' 百萬元。'],
        ['Expenditure approach: $GDP = C + I + G + X - M$, where gross domestic capital formation $I$ equals gross domestic fixed capital formation plus the change in inventories.',
         'Gross domestic capital formation = ' + fixedCap + ' + (' + invChange + ') = ' + capitalForm + ' (millions of dollars).',
         'The government transfer payments of ' + transfer + ' million dollars are income redistribution rather than production, so they are not counted in GDP.',
         'GDP = ' + C3 + ' + ' + capitalForm + ' + ' + G3 + ' + ' + X3 + ' - ' + M3 + ' = ' + gdp3 + ' (millions of dollars).',
         'So the GDP of that year is ' + gdp3 + ' million dollars.']
      ),
      math: { mode: 'inventory', C: C3, G: G3, fixedCap: fixedCap, invChange: invChange, X: X3, M: M3, transfer: transfer }
    };
  });

  /* ================================================================
   * 2. gdp_real — 名義／實質 GDP 與平減指數
   * ================================================================ */

  ED.registerType('gdp_real', function (rng, o) {
    var level = o.level || 1;

    if (level === 1) {
      var real = U.randInt(rng, 20, 60) * 100;
      var deflator = U.pick(rng, [110, 120, 125, 150, 200]);
      var nominal = real * deflator / 100;
      return {
        prompt: pair(
          '某經濟體系某年的名義本地生產總值為 ' + nominal + ' 百萬元，當年的 GDP 平減指數為 ' + deflator + '（基年 = 100）。求當年的實質本地生產總值（百萬元，2 位小數）。',
          'The nominal GDP of an economy in a certain year is ' + nominal + ' million dollars, and the GDP deflator of that year is ' + deflator + ' (base year = 100). Find the real GDP of that year (in millions of dollars, 2 d.p.).'
        ),
        hint: pair(
          'GDP 平減指數 = (名義 GDP ÷ 實質 GDP) × 100，所以實質 GDP = 名義 GDP ÷ (平減指數 ÷ 100)。',
          'GDP deflator = (nominal GDP / real GDP) x 100, so real GDP = nominal GDP / (deflator / 100).'
        ),
        answer: real,
        choices: choiceSet(rng, real, [nominal, rd(real * deflator / 100, 2), rd(nominal * deflator / 100, 2)], { dp: 2, min: 0 }),
        solution: sol(
          ['GDP 平減指數的定義是 (名義 GDP ÷ 實質 GDP) × 100。',
           '把平減指數 ' + deflator + ' 化為物價水平：' + deflator + ' ÷ 100 = ' + fm(deflator / 100, 2) + '。',
           '實質 GDP = 名義 GDP ÷ 物價水平 = ' + nominal + ' ÷ ' + fm(deflator / 100, 2) + ' = ' + fm(real, 2) + '（百萬元）。',
           '因此當年的實質本地生產總值為 ' + fm(real, 2) + ' 百萬元。'],
          ['The GDP deflator is defined as (nominal GDP / real GDP) x 100.',
           'The deflator of ' + deflator + ' corresponds to a price level of ' + deflator + ' / 100 = ' + fm(deflator / 100, 2) + '.',
           'Real GDP = nominal GDP / price level = ' + nominal + ' / ' + fm(deflator / 100, 2) + ' = ' + fm(real, 2) + ' (millions of dollars).',
           'So the real GDP of that year is ' + fm(real, 2) + ' million dollars.']
        ),
        math: { mode: 'real_from_nominal', nominal: nominal, deflator: deflator }
      };
    }

    if (level === 2) {
      var y1 = U.randInt(rng, 40, 120) * 100;
      var g = U.pick(rng, [2, 4, 5, 6, 8, 10]);
      var y2 = y1 + Math.round(y1 * g / 100);
      return {
        prompt: pair(
          '某經濟體系去年的實質本地生產總值為 ' + y1 + ' 百萬元，今年為 ' + y2 + ' 百萬元（兩年均以同一基年價格計算）。求今年的經濟增長率（%，2 位小數）。',
          'The real GDP of an economy was ' + y1 + ' million dollars last year and ' + y2 + ' million dollars this year, both measured at the prices of the same base year. Find the economic growth rate of this year (in %, 2 d.p.).'
        ),
        hint: pair(
          '經濟增長率 = (今年實質 GDP − 去年實質 GDP) ÷ 去年實質 GDP × 100%。用實質 GDP 而非名義 GDP，才不會混入物價變動。',
          'Growth rate = (real GDP this year - real GDP last year) / real GDP last year x 100%. Use real GDP, not nominal GDP, so that price changes are excluded.'
        ),
        answer: g,
        solution: sol(
          ['增長率 = (今年實質 GDP − 去年實質 GDP) ÷ 去年實質 GDP × 100%。',
           '= (' + y2 + ' − ' + y1 + ') ÷ ' + y1 + ' × 100% = ' + fm(y2 - y1, 2) + ' ÷ ' + y1 + ' × 100%。',
           '= ' + fm(g, 2) + '%。因此今年的經濟增長率為 ' + fm(g, 2) + '%。'],
          ['Growth rate = (real GDP this year - real GDP last year) / real GDP last year x 100%.',
           '= (' + y2 + ' - ' + y1 + ') / ' + y1 + ' x 100% = ' + fm(y2 - y1, 2) + ' / ' + y1 + ' x 100%.',
           '= ' + fm(g, 2) + '%. So the economic growth rate of this year is ' + fm(g, 2) + '%.']
        ),
        math: { mode: 'growth_rate', y1: y1, y2: y2 }
      };
    }

    var nomG = U.pick(rng, [6, 8, 10, 12, 15]);
    var infl = U.pick(rng, [2, 3, 4, 5]);
    var realG = nomG - infl;
    return {
      prompt: pair(
        '某經濟體系今年的名義本地生產總值增長 ' + nomG + '%，同期 GDP 平減指數上升 ' + infl + '%。用近似式求今年的實質經濟增長率（%）：實質增長率 ≈ 名義增長率 − 通脹率。答案取 2 位小數。',
        'This year the nominal GDP of an economy grew by ' + nomG + '%, while the GDP deflator rose by ' + infl + '% over the same period. Using the approximation, find the real economic growth rate of this year (in %): real growth rate is approximately nominal growth rate minus inflation rate. Give the answer to 2 d.p.'
      ),
      hint: pair(
        '名義增長同時包含物價與產量變動，所以實質增長率 ≈ 名義增長率 − 通脹率；順序不可顛倒。',
        'Nominal growth includes both price changes and output changes, so real growth is approximately nominal growth minus inflation. The order of subtraction matters.'
      ),
      answer: realG,
      solution: sol(
        ['近似式：實質增長率 ≈ 名義增長率 − 通脹率。',
           '= ' + nomG + '% − ' + infl + '% = ' + fm(realG, 2) + '%。',
           '因此今年的實質經濟增長率約為 ' + fm(realG, 2) + '%。'],
        ['Approximation: real growth rate is approximately nominal growth rate minus inflation rate.',
           '= ' + nomG + '% - ' + infl + '% = ' + fm(realG, 2) + '%.',
           'So the real economic growth rate of this year is about ' + fm(realG, 2) + '%.']
      ),
      math: { mode: 'approx_real_growth', nominalGrowth: nomG, inflation: infl }
    };
  });

  /* ================================================================
   * 3. growth — 增長率、人均 GDP、CAGR 與 72 法則
   * ================================================================ */

  ED.registerType('growth', function (rng, o) {
    var level = o.level || 1;

    if (level === 1) {
      var y1 = U.randInt(rng, 40, 120) * 100;
      var g = U.pick(rng, [2, 3, 4, 5, 6, 8, 10]);
      var y2 = y1 + Math.round(y1 * g / 100);
      return {
        prompt: pair(
          '某國的實質本地生產總值由 ' + y1 + ' 百萬元上升至 ' + y2 + ' 百萬元。求期內的經濟增長率（%，2 位小數）。',
          'The real GDP of a country rises from ' + y1 + ' million dollars to ' + y2 + ' million dollars. Find the economic growth rate over this period (in %, 2 d.p.).'
        ),
        hint: pair(
          '經濟增長率 = (期末實質 GDP − 期初實質 GDP) ÷ 期初實質 GDP × 100%。',
          'Growth rate = (real GDP at the end - real GDP at the start) / real GDP at the start x 100%.'
        ),
        answer: g,
        solution: sol(
          ['增長率 = (期末值 − 期初值) ÷ 期初值 × 100%。',
           '= (' + y2 + ' − ' + y1 + ') ÷ ' + y1 + ' × 100% = ' + fm(g, 2) + '%。',
           '因此期內的經濟增長率為 ' + fm(g, 2) + '%。'],
          ['Growth rate = (end value - start value) / start value x 100%.',
           '= (' + y2 + ' - ' + y1 + ') / ' + y1 + ' x 100% = ' + fm(g, 2) + '%.',
           'So the economic growth rate over this period is ' + fm(g, 2) + '%.']
        ),
        math: { mode: 'growth_rate', y1: y1, y2: y2 }
      };
    }

    if (level === 2) {
      var pcThousand = U.pick(rng, [240, 260, 280, 300, 320, 360, 400]);
      var pop = U.pick(rng, [5, 6.5, 7, 7.5, 8]);
      var gdpY = pcThousand * pop;                 // 十億元
      var perCapita = rd(gdpY / pop * 1000, 2);    // 元
      return {
        prompt: pair(
          '某經濟體系去年的實質本地生產總值為 ' + gdpY + ' 十億元，人口為 ' + pop + ' 百萬人。求去年的人均實質本地生產總值（元，四捨五入至整數）。',
          'The real GDP of an economy last year was ' + gdpY + ' billion dollars and its population was ' + pop + ' million. Find the real GDP per capita last year (in dollars, rounded to the nearest integer).'
        ),
        hint: pair(
          '人均 GDP = 實質 GDP ÷ 人口。注意單位換算：1 十億元 ÷ 1 百萬人 = 1000 元，所以 (十億元 ÷ 百萬人) × 1000 = 元。',
          'GDP per capita = real GDP / population. Watch the units: 1 billion divided by 1 million equals 1000 dollars, so (billions / millions) x 1000 gives dollars.'
        ),
        answer: perCapita,
        choices: choiceSet(rng, perCapita, [gdpY, rd(perCapita / 10, 2), rd(perCapita * 10, 2), rd(perCapita / 100, 2)], { dp: 0, min: 0 }),
        solution: sol(
          ['人均實質 GDP = 實質 GDP ÷ 人口。',
           '= ' + gdpY + ' 十億元 ÷ ' + pop + ' 百萬人 = ' + fm(gdpY / pop, 2) + '（十億元/百萬人）。',
           '單位換算：1 十億元 ÷ 1 百萬人 = 1000 元，所以人均 GDP = ' + fm(gdpY / pop, 2) + ' × 1000 = ' + fm(perCapita, 0) + ' 元。',
           '因此去年的人均實質本地生產總值為 ' + fm(perCapita, 0) + ' 元。'],
          ['Real GDP per capita = real GDP / population.',
           '= ' + gdpY + ' billion / ' + pop + ' million = ' + fm(gdpY / pop, 2) + ' (billion per million).',
           'Unit conversion: 1 billion divided by 1 million equals 1000 dollars, so GDP per capita = ' + fm(gdpY / pop, 2) + ' x 1000 = ' + fm(perCapita, 0) + ' dollars.',
           'So the real GDP per capita last year was ' + fm(perCapita, 0) + ' dollars.']
        ),
        math: { mode: 'per_capita', gdpY: gdpY, pop: pop }
      };
    }

    var mode = U.pick(rng, ['rule72', 'cagr']);

    if (mode === 'rule72') {
      var r = U.pick(rng, [2, 3, 4, 6, 8, 9, 12]);
      var years = rd(72 / r, 2);
      return {
        prompt: pair(
          '某經濟體系實質 GDP 的年均增長率為 ' + r + '%。用 72 法則（翻倍年數 ≈ 72 ÷ 年增長率的百分數）估算實質 GDP 翻倍所需的年數（年，2 位小數）。',
          'The average annual growth rate of real GDP in an economy is ' + r + '%. Use the rule of 72 (doubling time is approximately 72 divided by the percentage growth rate) to estimate the number of years needed for real GDP to double (in years, 2 d.p.).'
        ),
        hint: pair(
          '72 法則：翻倍年數 ≈ 72 ÷ 年增長率；年增長率以百分數的數字代入（例如 8% 用 8）。',
          'Rule of 72: doubling time is approximately 72 divided by the growth rate, using the number of the percentage (for example, use 8 for 8%).'
        ),
        answer: years,
        solution: sol(
          ['72 法則：翻倍年數 ≈ 72 ÷ 年增長率（百分數的數字）。',
           '= 72 ÷ ' + r + ' = ' + fm(years, 2) + '（年）。',
           '因此實質 GDP 約需 ' + fm(years, 2) + ' 年翻倍。'],
          ['Rule of 72: doubling time is approximately 72 divided by the percentage growth rate.',
           '= 72 / ' + r + ' = ' + fm(years, 2) + ' years.',
           'So real GDP takes about ' + fm(years, 2) + ' years to double.']
        ),
        math: { mode: 'rule72', rate: r }
      };
    }

    var gC = U.pick(rng, [5, 10, 15, 20]);
    var nY = U.pick(rng, [2, 3, 4, 5]);
    var start = 100;
    var end = rd(start * Math.pow(1 + gC / 100, nY), 2);
    var cagr = rd((Math.pow(end / start, 1 / nY) - 1) * 100, 2);
    return {
      prompt: pair(
        '某經濟體系的實質 GDP 指數（基年 = 100）在 ' + nY + ' 年內由 100 上升至 ' + fm(end, 2) + '。求期內的年均複合增長率（CAGR，%，2 位小數）。',
        'The real GDP index of an economy (base year = 100) rises from 100 to ' + fm(end, 2) + ' over ' + nY + ' years. Find the compound annual growth rate (CAGR) over this period (in %, 2 d.p.).'
      ),
      hint: pair(
        'CAGR = (期末值 ÷ 期初值)^(1/n) − 1，其中 n 為年數；最後乘以 100 化為百分比。',
        'CAGR = (end value / start value)^(1/n) - 1, where n is the number of years; multiply by 100 at the end to express it as a percentage.'
      ),
      answer: cagr,
      solution: sol(
        ['CAGR = (期末值 ÷ 期初值)^(1/n) − 1，n = ' + nY + '。',
         '期末值 ÷ 期初值 = ' + fm(end, 2) + ' ÷ 100 = ' + fm(end / 100, 4) + '。',
         'CAGR = (' + fm(end / 100, 4) + ')^(1/' + nY + ') − 1 ≈ ' + fm(cagr, 2) + '%，即年均複合增長率約為 ' + fm(cagr, 2) + '%。',
         '因此期內的年均複合增長率為 ' + fm(cagr, 2) + '%。'],
        ['CAGR = (end value / start value)^(1/n) - 1, with n = ' + nY + '.',
         'End value / start value = ' + fm(end, 2) + ' / 100 = ' + fm(end / 100, 4) + '.',
         'CAGR = (' + fm(end / 100, 4) + ')^(1/' + nY + ') - 1 ≈ ' + fm(cagr, 2) + '%, so the CAGR is about ' + fm(cagr, 2) + '%.',
         'So the compound annual growth rate over this period is ' + fm(cagr, 2) + '%.']
      ),
      math: { mode: 'cagr', years: nY, end: end }
    };
  });

  /* ================================================================
   * 4. unemployment — 失業率與勞動參與率
   * ================================================================ */

  ED.registerType('unemployment', function (rng, o) {
    var level = o.level || 1;

    if (level === 1) {
      var lf = U.pick(rng, [200, 300, 400, 500]);      // 萬人
      var rate = U.pick(rng, [4, 5, 6, 8, 10]);
      var u = lf * rate / 100;
      var e = lf - u;
      return {
        prompt: pair(
          '某經濟體系就業人口為 ' + e + ' 萬人，失業人口為 ' + u + ' 萬人。求失業率（%，2 位小數）。',
          'In an economy, the employed population is ' + mil(e) + ' million and the unemployed population is ' + mil(u) + ' million. Find the unemployment rate (in %, 2 d.p.).'
        ),
        hint: pair(
          '勞動人口 = 就業人口 + 失業人口；失業率 = 失業人口 ÷ 勞動人口 × 100%。分母不是總人口，也不是就業人口。',
          'Labour force = employed + unemployed. Unemployment rate = unemployed / labour force x 100%. The denominator is neither the total population nor the employed population.'
        ),
        answer: rd(rate, 2),
        choices: choiceSet(rng, rd(rate, 2), [rd(u / e * 100, 2), rd(rate * 2, 2), rd(rate / 2, 2)], { dp: 2, min: 0 }),
        solution: sol(
          ['勞動人口 = 就業人口 + 失業人口 = ' + e + ' + ' + u + ' = ' + lf + ' 萬人。',
           '失業率 = 失業人口 ÷ 勞動人口 × 100% = ' + u + ' ÷ ' + lf + ' × 100%。',
           '= ' + fm(rate, 2) + '%。因此失業率為 ' + fm(rate, 2) + '%。'],
          ['Labour force = employed + unemployed = ' + mil(e) + ' + ' + mil(u) + ' = ' + mil(lf) + ' million.',
           'Unemployment rate = unemployed / labour force x 100% = ' + mil(u) + ' / ' + mil(lf) + ' x 100%.',
           '= ' + fm(rate, 2) + '%. So the unemployment rate is ' + fm(rate, 2) + '%.']
        ),
        math: { mode: 'unemployment_rate', employed: e, unemployed: u }
      };
    }

    if (level === 2) {
      var W = U.pick(rng, [500, 600, 700, 800]);       // 工作年齡人口 萬人
      var rate2 = U.pick(rng, [55, 60, 62, 65, 70, 75]);
      var lf2 = W * rate2 / 100;
      var u2 = U.randInt(rng, 10, 40);
      var e2 = lf2 - u2;
      return {
        prompt: pair(
          '某經濟體系的工作年齡人口為 ' + W + ' 萬人，其中就業人口 ' + e2 + ' 萬人、失業人口 ' + u2 + ' 萬人。求勞動參與率（%，2 位小數）。',
          'The working-age population of an economy is ' + mil(W) + ' million, of which ' + mil(e2) + ' million are employed and ' + mil(u2) + ' million are unemployed. Find the labour force participation rate (in %, 2 d.p.).'
        ),
        hint: pair(
          '勞動人口 = 就業 + 失業；勞動參與率 = 勞動人口 ÷ 工作年齡人口 × 100%。',
          'Labour force = employed + unemployed. Participation rate = labour force / working-age population x 100%.'
        ),
        answer: rd(rate2, 2),
        choices: choiceSet(rng, rd(rate2, 2), [rd(e2 / W * 100, 2), rd(u2 / W * 100, 2), rd(rate2 + 5, 2)], { dp: 2, min: 0, max: 100 }),
        solution: sol(
          ['勞動人口 = 就業人口 + 失業人口 = ' + e2 + ' + ' + u2 + ' = ' + lf2 + ' 萬人。',
           '勞動參與率 = 勞動人口 ÷ 工作年齡人口 × 100% = ' + lf2 + ' ÷ ' + W + ' × 100%。',
           '= ' + fm(rate2, 2) + '%。因此勞動參與率為 ' + fm(rate2, 2) + '%。'],
          ['Labour force = employed + unemployed = ' + mil(e2) + ' + ' + mil(u2) + ' = ' + mil(lf2) + ' million.',
           'Participation rate = labour force / working-age population x 100% = ' + mil(lf2) + ' / ' + mil(W) + ' x 100%.',
           '= ' + fm(rate2, 2) + '%. So the labour force participation rate is ' + fm(rate2, 2) + '%.']
        ),
        math: { mode: 'participation_rate', workingAge: W, labourForce: lf2 }
      };
    }

    var asked = U.pick(rng, ['unemp', 'lfpr']);

    if (asked === 'unemp') {
      var lf3 = U.pick(rng, [300, 400, 500]);
      var rate3 = U.pick(rng, [4, 5, 6, 8]);
      var u3 = lf3 * rate3 / 100;
      var e3 = lf3 - u3;
      var n3 = U.randInt(rng, 10, 25) * 10;
      return {
        prompt: pair(
          '某經濟體系的工作年齡人口包括：就業人口 ' + e3 + ' 萬人、失業人口 ' + u3 + ' 萬人，以及非勞動人口 ' + n3 + ' 萬人（沒有工作且沒有積極尋找工作）。求失業率（%，2 位小數）。',
          'The working-age population of an economy consists of ' + mil(e3) + ' million employed, ' + mil(u3) + ' million unemployed and ' + mil(n3) + ' million not in the labour force (not working and not actively looking for work). Find the unemployment rate (in %, 2 d.p.).'
        ),
        hint: pair(
          '非勞動人口不屬於勞動人口，計算失業率時分母只用勞動人口（就業 + 失業）。',
          'People not in the labour force are excluded from the labour force; the denominator of the unemployment rate is the labour force (employed + unemployed) only.'
        ),
        answer: rd(rate3, 2),
        choices: choiceSet(rng, rd(rate3, 2), [rd(u3 / (lf3 + n3) * 100, 2), rd(u3 / e3 * 100, 2), rd(rate3 * 2, 2)], { dp: 2, min: 0, max: 100 }),
        solution: sol(
          ['工作年齡人口 = 就業 + 失業 + 非勞動人口 = ' + e3 + ' + ' + u3 + ' + ' + n3 + ' = ' + (lf3 + n3) + ' 萬人。',
           '勞動人口 = 就業 + 失業 = ' + e3 + ' + ' + u3 + ' = ' + lf3 + ' 萬人；非勞動人口不計入勞動人口。',
           '失業率 = 失業人口 ÷ 勞動人口 × 100% = ' + u3 + ' ÷ ' + lf3 + ' × 100% = ' + fm(rate3, 2) + '%。',
           '因此失業率為 ' + fm(rate3, 2) + '%。'],
          ['Working-age population = employed + unemployed + not in labour force = ' + mil(e3) + ' + ' + mil(u3) + ' + ' + mil(n3) + ' = ' + mil(lf3 + n3) + ' million.',
           'Labour force = employed + unemployed = ' + mil(e3) + ' + ' + mil(u3) + ' = ' + mil(lf3) + ' million; people not in the labour force are excluded.',
           'Unemployment rate = unemployed / labour force x 100% = ' + mil(u3) + ' / ' + mil(lf3) + ' x 100% = ' + fm(rate3, 2) + '%.',
           'So the unemployment rate is ' + fm(rate3, 2) + '%.']
        ),
        math: { mode: 'unemployment_rate_advanced', employed: e3, unemployed: u3, notInLabourForce: n3 }
      };
    }

    var W3 = U.pick(rng, [600, 700, 800]);
    var rate4 = U.pick(rng, [60, 62, 65, 70, 75]);
    var lf4 = W3 * rate4 / 100;
    var u4 = U.randInt(rng, 10, 30);
    var e4 = lf4 - u4;
    var n4 = W3 - lf4;
    return {
      prompt: pair(
        '某經濟體系的工作年齡人口包括：就業人口 ' + e4 + ' 萬人、失業人口 ' + u4 + ' 萬人，以及非勞動人口 ' + n4 + ' 萬人（沒有工作且沒有積極尋找工作）。求勞動參與率（%，2 位小數）。',
        'The working-age population of an economy consists of ' + mil(e4) + ' million employed, ' + mil(u4) + ' million unemployed and ' + mil(n4) + ' million not in the labour force (not working and not actively looking for work). Find the labour force participation rate (in %, 2 d.p.).'
      ),
      hint: pair(
        '勞動人口 = 就業 + 失業；工作年齡人口 = 勞動人口 + 非勞動人口；勞動參與率 = 勞動人口 ÷ 工作年齡人口 × 100%。',
        'Labour force = employed + unemployed. Working-age population = labour force + people not in the labour force. Participation rate = labour force / working-age population x 100%.'
      ),
      answer: rd(rate4, 2),
      choices: choiceSet(rng, rd(rate4, 2), [rd(e4 / W3 * 100, 2), rd(u4 / W3 * 100, 2), rd(rate4 + 5, 2)], { dp: 2, min: 0, max: 100 }),
      solution: sol(
        ['工作年齡人口 = 就業 + 失業 + 非勞動人口 = ' + e4 + ' + ' + u4 + ' + ' + n4 + ' = ' + W3 + ' 萬人。',
         '勞動人口 = 就業 + 失業 = ' + e4 + ' + ' + u4 + ' = ' + lf4 + ' 萬人。',
         '勞動參與率 = 勞動人口 ÷ 工作年齡人口 × 100% = ' + lf4 + ' ÷ ' + W3 + ' × 100% = ' + fm(rate4, 2) + '%。',
         '因此勞動參與率為 ' + fm(rate4, 2) + '%。'],
        ['Working-age population = employed + unemployed + not in labour force = ' + mil(e4) + ' + ' + mil(u4) + ' + ' + mil(n4) + ' = ' + mil(W3) + ' million.',
         'Labour force = employed + unemployed = ' + mil(e4) + ' + ' + mil(u4) + ' = ' + mil(lf4) + ' million.',
         'Participation rate = labour force / working-age population x 100% = ' + mil(lf4) + ' / ' + mil(W3) + ' x 100% = ' + fm(rate4, 2) + '%.',
         'So the labour force participation rate is ' + fm(rate4, 2) + '%.']
      ),
      math: { mode: 'participation_rate_advanced', workingAge: W3, labourForce: lf4 }
    };
  });

  /* ================================================================
   * 5. cpi — 消費物價指數、通脹與實質工資
   * ================================================================ */

  ED.registerType('cpi', function (rng, o) {
    var level = o.level || 1;

    if (level === 1) {
      var q1 = U.randInt(rng, 5, 20), b1 = U.randInt(rng, 10, 30), c1 = b1 + U.randInt(rng, 2, 8);
      var q2 = U.randInt(rng, 2, 10), b2 = U.randInt(rng, 40, 80), c2 = b2 + U.randInt(rng, 5, 15);
      var q3 = U.randInt(rng, 10, 30), b3 = U.randInt(rng, 5, 20), c3 = b3 + U.randInt(rng, 1, 5);
      var baseCost = q1 * b1 + q2 * b2 + q3 * b3;
      var curCost = q1 * c1 + q2 * c2 + q3 * c3;
      var cpi = rd(curCost / baseCost * 100, 2);
      return {
        prompt: pair(
          '某經濟體系只消費三種商品，基期與當期的價格及當期消費量如下：白米 ' + q1 + ' 公斤，基期價格 ' + b1 + ' 元/公斤，當期價格 ' + c1 + ' 元/公斤；豬肉 ' + q2 + ' 公斤，基期價格 ' + b2 + ' 元/公斤，當期價格 ' + c2 + ' 元/公斤；交通 ' + q3 + ' 程，基期價格 ' + b3 + ' 元/程，當期價格 ' + c3 + ' 元/程。求當期的消費物價指數（CPI，基期 = 100，2 位小數）。',
          'An economy consumes only three goods. The base-period prices, current-period prices and current-period quantities are: rice ' + q1 + ' kg, base price ' + b1 + ' dollars per kg, current price ' + c1 + ' dollars per kg; pork ' + q2 + ' kg, base price ' + b2 + ' dollars per kg, current price ' + c2 + ' dollars per kg; transport ' + q3 + ' trips, base price ' + b3 + ' dollars per trip, current price ' + c3 + ' dollars per trip. Find the current-period consumer price index (CPI, base period = 100, 2 d.p.).'
        ),
        hint: pair(
          'CPI = (以當期價格計算的籃子成本 ÷ 以基期價格計算的當期籃子成本) × 100%；籃子數量固定為當期消費量，只讓價格變動。',
          'CPI = (cost of the current basket at current prices / cost of the current basket at base-period prices) x 100%. The basket quantities are fixed at the current quantities; only prices change.'
        ),
        answer: cpi,
        choices: choiceSet(rng, cpi, [rd(baseCost / curCost * 100, 2), rd((curCost - baseCost) / baseCost * 100, 2), rd(cpi + 10, 2)], { dp: 2, min: 0 }),
        solution: sol(
          ['以基期價格計算的當期籃子成本 = ' + q1 + ' × ' + b1 + ' + ' + q2 + ' × ' + b2 + ' + ' + q3 + ' × ' + b3 + ' = ' + baseCost + ' 元。',
           '以當期價格計算的當期籃子成本 = ' + q1 + ' × ' + c1 + ' + ' + q2 + ' × ' + c2 + ' + ' + q3 + ' × ' + c3 + ' = ' + curCost + ' 元。',
           'CPI = 以當期價格計算的成本 ÷ 以基期價格計算的成本 × 100 = ' + curCost + ' ÷ ' + baseCost + ' × 100 = ' + fm(cpi, 2) + '。',
           '因此當期的消費物價指數為 ' + fm(cpi, 2) + '。'],
          ['Cost of the current basket at base-period prices = ' + q1 + ' x ' + b1 + ' + ' + q2 + ' x ' + b2 + ' + ' + q3 + ' x ' + b3 + ' = ' + baseCost + ' dollars.',
           'Cost of the current basket at current prices = ' + q1 + ' x ' + c1 + ' + ' + q2 + ' x ' + c2 + ' + ' + q3 + ' x ' + c3 + ' = ' + curCost + ' dollars.',
           'CPI = cost at current prices / cost at base-period prices x 100 = ' + curCost + ' / ' + baseCost + ' x 100 = ' + fm(cpi, 2) + '.',
           'So the current-period CPI is ' + fm(cpi, 2) + '.']
        ),
        math: { mode: 'cpi_basket', baseCost: baseCost, currentCost: curCost }
      };
    }

    if (level === 2) {
      var cpi1 = U.pick(rng, [100, 200, 300, 400]);
      var infl = U.pick(rng, [2, 4, 5, 8, 10]);
      var cpi2 = cpi1 + cpi1 * infl / 100;
      return {
        prompt: pair(
          '某經濟體系去年的消費物價指數為 ' + cpi1 + '，今年為 ' + cpi2 + '。求今年的通脹率（%，2 位小數）。',
          'The consumer price index of an economy was ' + cpi1 + ' last year and ' + cpi2 + ' this year. Find the inflation rate of this year (in %, 2 d.p.).'
        ),
        hint: pair(
          '通脹率 = (今年 CPI − 去年 CPI) ÷ 去年 CPI × 100%。分母是去年的 CPI（基期），不是今年的 CPI。',
          'Inflation rate = (CPI this year - CPI last year) / CPI last year x 100%. The denominator is last year CPI (the base), not this year CPI.'
        ),
        answer: rd(infl, 2),
        solution: sol(
          ['通脹率 = (今年 CPI − 去年 CPI) ÷ 去年 CPI × 100%。',
           '= (' + cpi2 + ' − ' + cpi1 + ') ÷ ' + cpi1 + ' × 100% = ' + fm(cpi2 - cpi1, 2) + ' ÷ ' + cpi1 + ' × 100%。',
           '= ' + fm(infl, 2) + '%。因此今年的通脹率為 ' + fm(infl, 2) + '%。'],
          ['Inflation rate = (CPI this year - CPI last year) / CPI last year x 100%.',
           '= (' + cpi2 + ' - ' + cpi1 + ') / ' + cpi1 + ' x 100% = ' + fm(cpi2 - cpi1, 2) + ' / ' + cpi1 + ' x 100%.',
           '= ' + fm(infl, 2) + '%. So the inflation rate of this year is ' + fm(infl, 2) + '%.']
        ),
        math: { mode: 'inflation_from_cpi', cpi1: cpi1, cpi2: cpi2 }
      };
    }

    var wage1 = U.pick(rng, [15000, 18000, 20000, 24000, 30000]);
    var cpiB = U.pick(rng, [105, 110, 120, 125, 150]);
    var realG = U.pick(rng, [2, 3, 5, 8, 10]);
    var wage2 = rd(wage1 * (1 + realG / 100) * (cpiB / 100), 2);
    var real1 = wage1;
    var real2 = rd(wage2 / cpiB * 100, 2);
    var growthReal = rd((real2 / real1 - 1) * 100, 2);
    return {
      prompt: pair(
        '某僱員第一年的名義月薪為 ' + wage1 + ' 元，當年 CPI 為 100；第二年的名義月薪為 ' + wage2 + ' 元，當年 CPI 為 ' + cpiB + '。求第二年實質工資相對第一年的增長率（%，2 位小數）。',
        'An employee earned a nominal monthly salary of ' + wage1 + ' dollars in the first year, when the CPI was 100. In the second year the nominal monthly salary was ' + wage2 + ' dollars and the CPI was ' + cpiB + '. Find the growth rate of the real wage in the second year compared with the first year (in %, 2 d.p.).'
      ),
      hint: pair(
        '實質工資 = 名義工資 ÷ CPI × 100。先分別求出兩年的實質工資，再計增長率；不可直接用名義工資增長率。',
        'Real wage = nominal wage / CPI x 100. Find the real wage in each year first, then compute the growth rate; do not use the growth rate of the nominal wage directly.'
      ),
      answer: growthReal,
      solution: sol(
        ['第一年實質工資 = ' + wage1 + ' ÷ 100 × 100 = ' + fm(real1, 2) + ' 元。',
         '第二年實質工資 = ' + wage2 + ' ÷ ' + cpiB + ' × 100 = ' + fm(real2, 2) + ' 元。',
         '實質工資增長率 = (' + fm(real2, 2) + ' − ' + fm(real1, 2) + ') ÷ ' + fm(real1, 2) + ' × 100% = ' + fm(growthReal, 2) + '%。',
         '因此第二年實質工資增長了 ' + fm(growthReal, 2) + '%。'],
        ['Real wage in the first year = ' + wage1 + ' / 100 x 100 = ' + fm(real1, 2) + ' dollars.',
         'Real wage in the second year = ' + wage2 + ' / ' + cpiB + ' x 100 = ' + fm(real2, 2) + ' dollars.',
         'Real wage growth rate = (' + fm(real2, 2) + ' - ' + fm(real1, 2) + ') / ' + fm(real1, 2) + ' x 100% = ' + fm(growthReal, 2) + '%.',
         'So the real wage grew by ' + fm(growthReal, 2) + '% in the second year.']
      ),
      math: { mode: 'real_wage', wage1: wage1, wage2: wage2, cpi: cpiB }
    };
  });

  /* ================================================================
   * 6. inflation — 實質值、Fisher 式與購買力
   * ================================================================ */

  ED.registerType('inflation', function (rng, o) {
    var level = o.level || 1;

    if (level === 1) {
      var real = U.pick(rng, [10000, 12000, 15000, 18000, 20000, 25000, 30000]);
      var infl = U.pick(rng, [5, 10, 20, 25]);
      var nominal = real + Math.round(real * infl / 100);
      return {
        prompt: pair(
          '某人今年的名義月入為 ' + nominal + ' 元，同期物價水平上升 ' + infl + '%。求以去年（基期）物價計算的實質月入（元，2 位小數）。',
          'A person has a nominal monthly income of ' + nominal + ' dollars this year, while the price level rose by ' + infl + '% over the same period. Find the real monthly income measured at last year (base period) prices (in dollars, 2 d.p.).'
        ),
        hint: pair(
          '實質值 = 名義值 ÷ (1 + 通脹率)，通脹率要用小數代入（例如 10% = 0.10）。',
          'Real value = nominal value / (1 + inflation rate), with the inflation rate expressed as a decimal (for example, 10% = 0.10).'
        ),
        answer: rd(real, 2),
        choices: choiceSet(rng, rd(real, 2), [rd(nominal * (1 - infl / 100), 2), rd(nominal - real, 2), nominal], { dp: 2, min: 0 }),
        solution: sol(
          ['實質值 = 名義值 ÷ (1 + 通脹率)，通脹率 ' + infl + '% = ' + fm(infl / 100, 2) + '。',
           '實質月入 = ' + nominal + ' ÷ (1 + ' + fm(infl / 100, 2) + ') = ' + nominal + ' ÷ ' + fm(1 + infl / 100, 2) + '。',
           '= ' + fm(real, 2) + ' 元。因此以基期物價計算的實質月入為 ' + fm(real, 2) + ' 元。'],
          ['Real value = nominal value / (1 + inflation rate), where ' + infl + '% = ' + fm(infl / 100, 2) + '.',
           'Real monthly income = ' + nominal + ' / (1 + ' + fm(infl / 100, 2) + ') = ' + nominal + ' / ' + fm(1 + infl / 100, 2) + '.',
           '= ' + fm(real, 2) + ' dollars. So the real monthly income at base-period prices is ' + fm(real, 2) + ' dollars.']
        ),
        math: { mode: 'real_value', nominal: nominal, inflation: infl }
      };
    }

    if (level === 2) {
      var nomRate = U.pick(rng, [4, 5, 6, 7, 8, 9, 10, 12]);
      var infl2 = U.pick(rng, [1, 2, 3, 4, 5, 6]);
      if (nomRate === infl2) infl2 = infl2 + 1;
      var realRate = nomRate - infl2;
      return {
        prompt: pair(
          '某經濟體系的名義利率為 ' + nomRate + '%，同期的通脹率為 ' + infl2 + '%。用 Fisher 近似式（實質利率 ≈ 名義利率 − 通脹率）求實質利率（%，2 位小數；若為負數請保留負號）。',
          'The nominal interest rate in an economy is ' + nomRate + '%, and the inflation rate over the same period is ' + infl2 + '%. Using the Fisher approximation (real interest rate is approximately nominal interest rate minus inflation rate), find the real interest rate (in %, 2 d.p.; keep a negative sign if it is negative).'
        ),
        hint: pair(
          '近似式：實質利率 ≈ 名義利率 − 通脹率。名義利率低於通脹率時，實質利率為負，表示購買力被侵蝕。',
          'Approximation: real interest rate is approximately nominal interest rate minus inflation rate. If the nominal rate is below inflation, the real rate is negative, meaning purchasing power is eroded.'
        ),
        answer: rd(realRate, 2),
        choices: choiceSet(rng, rd(realRate, 2), [rd(nomRate + infl2, 2), rd(infl2 - nomRate, 2), nomRate], { dp: 2, min: -30, max: 40, step: 1 }),
        solution: sol(
          ['Fisher 近似式：實質利率 ≈ 名義利率 − 通脹率。',
           '= ' + nomRate + '% − ' + infl2 + '% = ' + fm(realRate, 2) + '%。',
           '因此實質利率約為 ' + fm(realRate, 2) + '%。'],
          ['Fisher approximation: real interest rate is approximately nominal interest rate minus inflation rate.',
           '= ' + nomRate + '% - ' + infl2 + '% = ' + fm(realRate, 2) + '%.',
           'So the real interest rate is about ' + fm(realRate, 2) + '%.']
        ),
        math: { mode: 'real_interest', nominalRate: nomRate, inflation: infl2 }
      };
    }

    var infl3 = U.pick(rng, [10, 20, 25, 50]);
    var drop = rd((1 - 1 / (1 + infl3 / 100)) * 100, 2);
    return {
      prompt: pair(
        '若物價水平上升 ' + infl3 + '%，同一筆錢的購買力會下降百分之幾？用精確式計算（購買力變動 = 1 ÷ (1 + 通脹率) − 1），答案取 2 位小數，並以「下降的百分比」表示正數。',
        'If the price level rises by ' + infl3 + '%, by what percentage does the purchasing power of the same amount of money fall? Use the exact formula (change in purchasing power = 1 / (1 + inflation rate) - 1), give the answer to 2 d.p. and express the fall as a positive percentage.'
      ),
      hint: pair(
        '購買力變動 = 1 ÷ (1 + 通脹率) − 1；例如通脹 25% 時購買力變為 1 ÷ 1.25 = 0.8，即下降 20%。',
        'Change in purchasing power = 1 / (1 + inflation rate) - 1; for example, with 25% inflation purchasing power becomes 1 / 1.25 = 0.8, a fall of 20%.'
      ),
      answer: drop,
      choices: choiceSet(rng, drop, [infl3, rd((infl3 / (100 + infl3)) * 100, 2) === drop ? rd(infl3 / 2, 2) : rd((infl3 / (100 + infl3)) * 100, 2), rd(drop * 2, 2)], { dp: 2, min: 0 }),
      solution: sol(
        ['購買力變動 = 1 ÷ (1 + 通脹率) − 1，通脹率 ' + infl3 + '% = ' + fm(infl3 / 100, 2) + '。',
         '新購買力 = 1 ÷ ' + fm(1 + infl3 / 100, 2) + ' = ' + fm(1 / (1 + infl3 / 100), 4) + '。',
         '購買力下降 = (1 − ' + fm(1 / (1 + infl3 / 100), 4) + ') × 100% = ' + fm(drop, 2) + '%。',
         '因此購買力下降 ' + fm(drop, 2) + '%。'],
        ['Change in purchasing power = 1 / (1 + inflation rate) - 1, where ' + infl3 + '% = ' + fm(infl3 / 100, 2) + '.',
         'New purchasing power = 1 / ' + fm(1 + infl3 / 100, 2) + ' = ' + fm(1 / (1 + infl3 / 100), 4) + '.',
         'Fall in purchasing power = (1 - ' + fm(1 / (1 + infl3 / 100), 4) + ') x 100% = ' + fm(drop, 2) + '%.',
         'So purchasing power falls by ' + fm(drop, 2) + '%.']
      ),
      math: { mode: 'purchasing_power', inflation: infl3 }
    };
  });

  /* ================================================================
   * 7. multiplier — 支出乘數、稅收乘數、開放經濟乘數
   * ================================================================ */

  ED.registerType('multiplier', function (rng, o) {
    var level = o.level || 1;

    if (level === 1) {
      var mpc = U.pick(rng, [0.5, 0.6, 0.75, 0.8, 0.9]);
      var k = rd(1 / (1 - mpc), 2);
      return {
        prompt: pair(
          '在簡單凱恩斯模型中（封閉經濟、沒有政府部門），邊際消費傾向 MPC = ' + mpc + '。求支出乘數 $k$（2 位小數）。',
          'In the simple Keynesian model (closed economy with no government sector), the marginal propensity to consume is MPC = ' + mpc + '. Find the expenditure multiplier $k$ (2 d.p.).'
        ),
        hint: pair(
          '$k = 1/(1 - MPC) = 1/MPS$，其中 MPS = 1 − MPC 是邊際儲蓄傾向。',
          '$k = 1/(1 - MPC) = 1/MPS$, where MPS = 1 - MPC is the marginal propensity to save.'
        ),
        answer: k,
        solution: sol(
          ['MPS = 1 − MPC = 1 − ' + mpc + ' = ' + fm(1 - mpc, 2) + '。',
           '支出乘數 $k = 1/MPS = 1 ÷ ' + fm(1 - mpc, 2) + ' = ' + fm(k, 2) + '$。',
           '因此支出乘數為 ' + fm(k, 2) + '。'],
          ['MPS = 1 - MPC = 1 - ' + mpc + ' = ' + fm(1 - mpc, 2) + '.',
           'Expenditure multiplier $k = 1/MPS = 1 / ' + fm(1 - mpc, 2) + ' = ' + fm(k, 2) + '$.',
           'So the expenditure multiplier is ' + fm(k, 2) + '.']
        ),
        math: { mode: 'expenditure_multiplier', mpc: mpc }
      };
    }

    if (level === 2) {
      var mpc2 = U.pick(rng, [0.5, 0.6, 0.75, 0.8]);
      var dG = U.pick(rng, [100, 150, 200, 250, 300, 400]);
      var k2 = 1 / (1 - mpc2);
      var dY = rd(k2 * dG, 2);
      return {
        prompt: pair(
          '在簡單凱恩斯模型中（封閉經濟、沒有政府部門），MPC = ' + mpc2 + '。政府增加購買 ΔG = ' + dG + ' 百萬元，其他因素不變。求均衡收入的變動（百萬元，2 位小數）。',
          'In the simple Keynesian model (closed economy with no government sector), MPC = ' + mpc2 + '. Government purchases increase by ΔG = ' + dG + ' million dollars, other things being equal. Find the change in equilibrium income (in millions of dollars, 2 d.p.).'
        ),
        hint: pair(
          '支出乘數 $k = 1/(1 - MPC)$；均衡收入變動 ΔY = k × ΔG。',
          'Expenditure multiplier $k = 1/(1 - MPC)$; the change in equilibrium income is ΔY = k x ΔG.'
        ),
        answer: dY,
        choices: choiceSet(rng, dY, [rd(dG, 2), rd(mpc2 * dG, 2), rd((1 + mpc2) * dG, 2)], { dp: 2, min: 0 }),
        solution: sol(
          ['支出乘數 $k = 1/(1 - MPC) = 1 ÷ ' + fm(1 - mpc2, 2) + ' = ' + fm(k2, 2) + '$。',
           '均衡收入變動 ΔY = k × ΔG = ' + fm(k2, 2) + ' × ' + dG + ' = ' + fm(dY, 2) + '（百萬元）。',
           '因此均衡收入增加 ' + fm(dY, 2) + ' 百萬元。'],
          ['Expenditure multiplier $k = 1/(1 - MPC) = 1 / ' + fm(1 - mpc2, 2) + ' = ' + fm(k2, 2) + '$.',
           'Change in equilibrium income ΔY = k x ΔG = ' + fm(k2, 2) + ' x ' + dG + ' = ' + fm(dY, 2) + ' (millions of dollars).',
           'So equilibrium income rises by ' + fm(dY, 2) + ' million dollars.']
        ),
        math: { mode: 'change_in_income', mpc: mpc2, dG: dG }
      };
    }

    var mode = U.pick(rng, ['tax', 'open']);

    if (mode === 'tax') {
      var mpc3 = U.pick(rng, [0.6, 0.75, 0.8]);
      var dT = U.pick(rng, [100, 200, 250, 400]);
      var kTax = -mpc3 / (1 - mpc3);
      var dY3 = rd(kTax * dT, 2);
      return {
        prompt: pair(
          '在簡單凱恩斯模型中，MPC = ' + mpc3 + '。政府把定額稅增加 ΔT = ' + dT + ' 百萬元，其他因素不變。求均衡收入的變動（增加為正、減少為負；百萬元，2 位小數）。',
          'In the simple Keynesian model, MPC = ' + mpc3 + '. The government raises a lump-sum tax by ΔT = ' + dT + ' million dollars, other things being equal. Find the change in equilibrium income (positive for an increase, negative for a decrease; in millions of dollars, 2 d.p.).'
        ),
        hint: pair(
          '定額稅乘數 = −MPC/(1 − MPC)。稅收增加會減少可支配收入與消費，所以乘數為負。',
          'The lump-sum tax multiplier is -MPC/(1 - MPC). A tax rise reduces disposable income and consumption, so the multiplier is negative.'
        ),
        answer: dY3,
        choices: choiceSet(rng, dY3, [rd(-dY3, 2), rd(kTax * dT * -1, 2) === dY3 ? rd(mpc3 * dT, 2) : rd(-kTax * dT, 2), rd(dT, 2)], { dp: 2, min: -5000, max: 5000, step: 50 }),
        solution: sol(
          ['定額稅乘數 = −MPC/(1 − MPC) = −' + mpc3 + ' ÷ ' + fm(1 - mpc3, 2) + ' = ' + fm(kTax, 2) + '。',
           '均衡收入變動 ΔY = 稅收乘數 × ΔT = ' + fm(kTax, 2) + ' × ' + dT + ' = ' + fm(dY3, 2) + '（百萬元）。',
           '因此均衡收入變動為 ' + fm(dY3, 2) + ' 百萬元（即減少 ' + fm(Math.abs(dY3), 2) + ' 百萬元）。'],
          ['Lump-sum tax multiplier = -MPC/(1 - MPC) = -' + mpc3 + ' / ' + fm(1 - mpc3, 2) + ' = ' + fm(kTax, 2) + '.',
           'Change in equilibrium income ΔY = tax multiplier x ΔT = ' + fm(kTax, 2) + ' x ' + dT + ' = ' + fm(dY3, 2) + ' (millions of dollars).',
           'So equilibrium income changes by ' + fm(dY3, 2) + ' million dollars (a fall of ' + fm(Math.abs(dY3), 2) + ' million).']
        ),
        math: { mode: 'tax_multiplier', mpc: mpc3, dT: dT }
      };
    }

    var mps = U.pick(rng, [0.1, 0.2, 0.25]);
    var mpm = U.pick(rng, [0.1, 0.15, 0.2]);
    var kOpen = rd(1 / (mps + mpm), 2);
    return {
      prompt: pair(
        '某開放經濟（政府沒有徵稅）的邊際儲蓄傾向 MPS = ' + mps + '，邊際進口傾向 MPM = ' + mpm + '。求開放經濟乘數 $k = 1/(MPS + MPM)$（2 位小數）。',
        'In an open economy with no taxation, the marginal propensity to save is MPS = ' + mps + ' and the marginal propensity to import is MPM = ' + mpm + '. Find the open-economy multiplier $k = 1/(MPS + MPM)$ (2 d.p.).'
      ),
      hint: pair(
        '開放經濟中漏出包括儲蓄與進口，所以乘數 = 1 ÷ (MPS + MPM)；漏出越多，乘數越小。',
        'In an open economy the leakages include saving and imports, so the multiplier is 1 / (MPS + MPM); larger leakages give a smaller multiplier.'
      ),
      answer: kOpen,
      solution: sol(
        ['開放經濟乘數 $k = 1/(MPS + MPM)$。',
         'MPS + MPM = ' + mps + ' + ' + mpm + ' = ' + fm(mps + mpm, 2) + '。',
         'k = 1 ÷ ' + fm(mps + mpm, 2) + ' = ' + fm(kOpen, 2) + '。因此開放經濟乘數為 ' + fm(kOpen, 2) + '。'],
        ['The open-economy multiplier is $k = 1/(MPS + MPM)$.',
         'MPS + MPM = ' + mps + ' + ' + mpm + ' = ' + fm(mps + mpm, 2) + '.',
         'k = 1 / ' + fm(mps + mpm, 2) + ' = ' + fm(kOpen, 2) + '. So the open-economy multiplier is ' + fm(kOpen, 2) + '.']
      ),
      math: { mode: 'open_multiplier', mps: mps, mpm: mpm }
    };
  });

  /* ================================================================
   * 8. income_eq — 簡單凱恩斯模型的均衡收入
   * ================================================================ */

  ED.registerType('income_eq', function (rng, o) {
    var level = o.level || 1;

    if (level === 1) {
      var b = U.pick(rng, [0.5, 0.6, 0.75, 0.8]);
      var Yt = U.pick(rng, [3000, 4000, 5000, 6000]);
      var a = U.pick(rng, [100, 200, 300]);
      var slack = Math.round(Yt * (1 - b)) - a;
      if (slack < 200) { a = 100; slack = Math.round(Yt * (1 - b)) - a; }
      var I = rd(slack * U.pick(rng, [0.4, 0.5, 0.6]) / 50, 0) * 50;
      if (I < 50) I = 50;
      var G = slack - I;
      if (G < 50) { G = 50; I = slack - 50; }
      var num = a + I + G;
      var den = 1 - b;
      var Y = rd(num / den, 2);
      return {
        prompt: pair(
          '在簡單凱恩斯模型中，某封閉經濟（沒有對外貿易、沒有稅收）的消費函數為 $C = ' + a + ' + ' + b + 'Y$（$Y$ 為收入，單位：百萬元），投資 $I = ' + I + '$，政府購買 $G = ' + G + '$。求均衡收入 $Y$（百萬元，2 位小數）。',
          'In the simple Keynesian model, a closed economy with no foreign trade and no taxation has the consumption function $C = ' + a + ' + ' + b + 'Y$ (where $Y$ is income in millions of dollars), investment $I = ' + I + '$ and government purchases $G = ' + G + '$. Find the equilibrium income $Y$ (in millions of dollars, 2 d.p.).'
        ),
        hint: pair(
          '均衡條件：$Y = C + I + G$。代入 $C = a + bY$ 後整理得 $Y = (a + I + G)/(1 - b)$。',
          'Equilibrium condition: $Y = C + I + G$. Substitute $C = a + bY$ and rearrange to get $Y = (a + I + G)/(1 - b)$.'
        ),
        answer: Y,
        choices: choiceSet(rng, Y, [rd(num, 2), rd(num / b, 2), rd(num / (1 + b), 2)], { dp: 2, min: 0 }),
        solution: sol(
          ['均衡條件：$Y = C + I + G$。',
           '代入消費函數：$Y = ' + a + ' + ' + b + 'Y + ' + I + ' + ' + G + '$。',
           '整理得 $(1 - ' + b + ')Y = ' + num + '$，所以 $Y = ' + num + ' ÷ ' + fm(den, 2) + '$。',
           '$Y = ' + fm(Y, 2) + '$（百萬元）。因此均衡收入為 ' + fm(Y, 2) + ' 百萬元。'],
          ['Equilibrium condition: $Y = C + I + G$.',
           'Substitute the consumption function: $Y = ' + a + ' + ' + b + 'Y + ' + I + ' + ' + G + '$.',
           'Rearrange: $(1 - ' + b + ')Y = ' + num + '$, so $Y = ' + num + ' / ' + fm(den, 2) + '$.',
           '$Y = ' + fm(Y, 2) + '$ (millions of dollars). So equilibrium income is ' + fm(Y, 2) + ' million dollars.']
        ),
        math: { mode: 'basic', a: a, b: b, I: I, G: G }
      };
    }

    if (level === 2) {
      var b2 = U.pick(rng, [0.6, 0.75, 0.8]);
      var Yt2 = U.pick(rng, [4000, 5000, 6000]);
      var T = U.pick(rng, [200, 400, 500, 600]);
      var a2 = U.pick(rng, [100, 200, 300]);
      var need = Math.round(Yt2 * (1 - b2)) - a2 + Math.round(b2 * T);
      var I2 = rd(need * U.pick(rng, [0.4, 0.5]) / 50, 0) * 50;
      if (I2 < 50) I2 = 50;
      var G2 = need - I2;
      if (G2 < 50) { G2 = 50; I2 = need - 50; }
      var num2 = a2 - b2 * T + I2 + G2;
      var den2 = 1 - b2;
      var Y2 = rd(num2 / den2, 2);
      return {
        prompt: pair(
          '在簡單凱恩斯模型中，某封閉經濟（沒有對外貿易）的消費函數為 $C = ' + a2 + ' + ' + b2 + '(Y - T)$（$Y$ 為收入，單位：百萬元），定額稅 $T = ' + T + '$，投資 $I = ' + I2 + '$，政府購買 $G = ' + G2 + '$。求均衡收入 $Y$（百萬元，2 位小數）。',
          'In the simple Keynesian model, a closed economy with no foreign trade has the consumption function $C = ' + a2 + ' + ' + b2 + '(Y - T)$ (where $Y$ is income in millions of dollars), a lump-sum tax $T = ' + T + '$, investment $I = ' + I2 + '$ and government purchases $G = ' + G2 + '$. Find the equilibrium income $Y$ (in millions of dollars, 2 d.p.).'
        ),
        hint: pair(
          '可支配收入 = Y − T，所以 C = a + b(Y − T)。均衡條件 $Y = C + I + G$ 整理後得 $Y = (a - bT + I + G)/(1 - b)$。',
          'Disposable income = Y - T, so C = a + b(Y - T). Rearranging the equilibrium condition $Y = C + I + G$ gives $Y = (a - bT + I + G)/(1 - b)$.'
        ),
        answer: Y2,
        choices: choiceSet(rng, Y2, [rd(a2 + I2 + G2, 2), rd((a2 + I2 + G2) / den2, 2), rd(num2 / b2, 2)], { dp: 2, min: 0 }),
        solution: sol(
          ['可支配收入 = $Y - T$，所以 $C = ' + a2 + ' + ' + b2 + '(Y - ' + T + ')$。',
           '均衡條件：$Y = C + I + G = ' + a2 + ' + ' + b2 + '(Y - ' + T + ') + ' + I2 + ' + ' + G2 + '$。',
           '整理得 $(1 - ' + b2 + ')Y = ' + num2 + '$，所以 $Y = ' + num2 + ' ÷ ' + fm(den2, 2) + '$。',
           '$Y = ' + fm(Y2, 2) + '$（百萬元）。因此均衡收入為 ' + fm(Y2, 2) + ' 百萬元。'],
          ['Disposable income = $Y - T$, so $C = ' + a2 + ' + ' + b2 + '(Y - ' + T + ')$.',
           'Equilibrium condition: $Y = C + I + G = ' + a2 + ' + ' + b2 + '(Y - ' + T + ') + ' + I2 + ' + ' + G2 + '$.',
           'Rearrange: $(1 - ' + b2 + ')Y = ' + num2 + '$, so $Y = ' + num2 + ' / ' + fm(den2, 2) + '$.',
           '$Y = ' + fm(Y2, 2) + '$ (millions of dollars). So equilibrium income is ' + fm(Y2, 2) + ' million dollars.']
        ),
        math: { mode: 'with_tax', a: a2, b: b2, T: T, I: I2, G: G2 }
      };
    }

    var b3 = U.pick(rng, [0.6, 0.75, 0.8]);
    var m = U.pick(rng, [0.1, 0.15, 0.2]);
    var Yt3 = U.pick(rng, [4000, 5000, 6000, 8000]);
    var den3 = 1 - b3 + m;
    var num3 = rd(Yt3 * den3, 0);
    var a3 = U.pick(rng, [100, 200, 300]);
    var rest = num3 - a3;
    var I3 = Math.round(rest * 0.35 / 50) * 50;
    var G3 = Math.round(rest * 0.3 / 50) * 50;
    var X3 = rest - I3 - G3;
    if (X3 < 50) { X3 = 50; G3 = rest - I3 - X3; }
    var Y3 = rd((a3 + I3 + G3 + X3) / den3, 2);
    return {
      prompt: pair(
        '在簡單凱恩斯模型中，某開放經濟（政府沒有徵稅）的消費函數為 $C = ' + a3 + ' + ' + b3 + 'Y$，進口函數為 $M = ' + m + 'Y$（$Y$ 為收入，單位：百萬元），投資 $I = ' + I3 + '$，政府購買 $G = ' + G3 + '$，出口 $X = ' + X3 + '$。求均衡收入 $Y$（百萬元，2 位小數）。',
        'In the simple Keynesian model, an open economy with no taxation has the consumption function $C = ' + a3 + ' + ' + b3 + 'Y$ and the import function $M = ' + m + 'Y$ (where $Y$ is income in millions of dollars). Investment is $I = ' + I3 + '$, government purchases are $G = ' + G3 + '$ and exports are $X = ' + X3 + '$. Find the equilibrium income $Y$ (in millions of dollars, 2 d.p.).'
      ),
      hint: pair(
        '宏觀均衡：$Y = C + I + G + X - M$。代入 $C = a + bY$、$M = mY$ 後整理得 $Y = (a + I + G + X)/(1 - b + m)$。',
        'Macroeconomic equilibrium: $Y = C + I + G + X - M$. Substituting $C = a + bY$ and $M = mY$ gives $Y = (a + I + G + X)/(1 - b + m)$.'
      ),
      answer: Y3,
      choices: choiceSet(rng, Y3, [rd(a3 + I3 + G3 + X3, 2), rd((a3 + I3 + G3 + X3) / (1 - b3), 2), rd((a3 + I3 + G3 + X3) / den3, 2) === Y3 ? rd(Y3 * 1.2, 2) : rd((a3 + I3 + G3 + X3) / den3, 2)], { dp: 2, min: 0 }),
      solution: sol(
        ['宏觀均衡：$Y = C + I + G + X - M$。',
         '代入 $C = ' + a3 + ' + ' + b3 + 'Y$ 與 $M = ' + m + 'Y$：$Y = ' + a3 + ' + ' + b3 + 'Y + ' + I3 + ' + ' + G3 + ' + ' + X3 + ' - ' + m + 'Y$。',
         '整理得 $(1 - ' + b3 + ' + ' + m + ')Y = ' + (a3 + I3 + G3 + X3) + '$，所以 $Y = ' + (a3 + I3 + G3 + X3) + ' ÷ ' + fm(den3, 2) + '$。',
         '$Y = ' + fm(Y3, 2) + '$（百萬元）。因此均衡收入為 ' + fm(Y3, 2) + ' 百萬元。'],
        ['Macroeconomic equilibrium: $Y = C + I + G + X - M$.',
         'Substitute $C = ' + a3 + ' + ' + b3 + 'Y$ and $M = ' + m + 'Y$: $Y = ' + a3 + ' + ' + b3 + 'Y + ' + I3 + ' + ' + G3 + ' + ' + X3 + ' - ' + m + 'Y$.',
         'Rearrange: $(1 - ' + b3 + ' + ' + m + ')Y = ' + (a3 + I3 + G3 + X3) + '$, so $Y = ' + (a3 + I3 + G3 + X3) + ' / ' + fm(den3, 2) + '$.',
         '$Y = ' + fm(Y3, 2) + '$ (millions of dollars). So equilibrium income is ' + fm(Y3, 2) + ' million dollars.']
      ),
      math: { mode: 'open_economy', a: a3, b: b3, m: m, I: I3, G: G3, X: X3 }
    };
  });

  /* ================================================================
   * 9. money_multiplier — 貨幣乘數與存款創造
   * ================================================================ */

  ED.registerType('money_multiplier', function (rng, o) {
    var level = o.level || 1;

    if (level === 1) {
      var r1 = U.pick(rng, [5, 10, 12.5, 20, 25]);
      var mm1 = rd(1 / (r1 / 100), 2);
      return {
        prompt: pair(
          '某銀行體系的法定準備金率為 ' + r1 + '%，銀行不持有超額準備金，公眾也沒有現金漏出。求簡單貨幣乘數（2 位小數）。',
          'The required reserve ratio in a banking system is ' + r1 + '%. Banks hold no excess reserves and the public holds no cash. Find the simple money multiplier (2 d.p.).'
        ),
        hint: pair(
          '簡單貨幣乘數 = 1 ÷ 法定準備金率（以小數表示），例如準備金率 10% = 0.10。',
          'Simple money multiplier = 1 / required reserve ratio (as a decimal), for example a reserve ratio of 10% = 0.10.'
        ),
        answer: mm1,
        solution: sol(
          ['法定準備金率 ' + r1 + '% = ' + fm(r1 / 100, 3) + '。',
           '簡單貨幣乘數 = 1 ÷ ' + fm(r1 / 100, 3) + ' = ' + fm(mm1, 2) + '。',
           '因此簡單貨幣乘數為 ' + fm(mm1, 2) + '。'],
          ['The required reserve ratio ' + r1 + '% = ' + fm(r1 / 100, 3) + '.',
           'Simple money multiplier = 1 / ' + fm(r1 / 100, 3) + ' = ' + fm(mm1, 2) + '.',
           'So the simple money multiplier is ' + fm(mm1, 2) + '.']
        ),
        math: { mode: 'simple_multiplier', reserve: r1 }
      };
    }

    if (level === 2) {
      var r2 = U.pick(rng, [5, 10, 12.5, 20, 25]);
      var D0 = U.pick(rng, [500, 800, 1000, 1200, 1500, 2000]);
      var total = rd(D0 / (r2 / 100), 2);
      return {
        prompt: pair(
          '商業銀行收到 ' + D0 + ' 百萬元的新存款，法定準備金率為 ' + r2 + '%；假設銀行不持有超額準備金、公眾沒有現金漏出。求銀行體系最終可創造的總存款（百萬元，2 位小數）。',
          'A commercial bank receives new deposits of ' + D0 + ' million dollars and the required reserve ratio is ' + r2 + '%. Assuming banks hold no excess reserves and the public holds no cash, find the total deposits eventually created by the banking system (in millions of dollars, 2 d.p.).'
        ),
        hint: pair(
          '總存款 = 初始存款 × 簡單貨幣乘數 = 初始存款 ÷ 法定準備金率。',
          'Total deposits = initial deposit x simple money multiplier = initial deposit / required reserve ratio.'
        ),
        answer: total,
        choices: choiceSet(rng, total, [D0, rd(total * (1 + r2 / 100), 2), rd(D0 * (r2 / 100), 2)], { dp: 2, min: 0 }),
        solution: sol(
          ['簡單貨幣乘數 = 1 ÷ ' + fm(r2 / 100, 3) + ' = ' + fm(1 / (r2 / 100), 2) + '。',
           '總存款 = 初始存款 × 貨幣乘數 = ' + D0 + ' × ' + fm(1 / (r2 / 100), 2) + ' = ' + fm(total, 2) + '（百萬元）。',
           '因此銀行體系最終可創造 ' + fm(total, 2) + ' 百萬元總存款。'],
          ['Simple money multiplier = 1 / ' + fm(r2 / 100, 3) + ' = ' + fm(1 / (r2 / 100), 2) + '.',
           'Total deposits = initial deposit x money multiplier = ' + D0 + ' x ' + fm(1 / (r2 / 100), 2) + ' = ' + fm(total, 2) + ' (millions of dollars).',
           'So the banking system can eventually create total deposits of ' + fm(total, 2) + ' million dollars.']
        ),
        math: { mode: 'deposit_creation', reserve: r2, initialDeposit: D0 }
      };
    }

    var pairRC = U.pick(rng, [[10, 10], [20, 5], [10, 20], [25, 15], [12.5, 12.5], [20, 20], [10, 40], [5, 15], [15, 5]]);
    var r3 = pairRC[0];
    var c3 = pairRC[1];
    var mm3 = rd((1 + c3 / 100) / (r3 / 100 + c3 / 100), 2);
    return {
      prompt: pair(
        '某經濟體系的法定準備金率為 ' + r3 + '%，公眾持有的現金對存款比率為 ' + c3 + '%。設 r 與 c 以小數表示，貨幣乘數為 $m = (1 + c)/(r + c)$（考慮現金漏出）。求貨幣乘數（2 位小數）。',
        'In an economy the required reserve ratio is ' + r3 + '% and the public holds a cash-to-deposit ratio of ' + c3 + '%. With r and c expressed as decimals, the money multiplier is $m = (1 + c)/(r + c)$ (allowing for cash leakage). Find the money multiplier (2 d.p.).'
      ),
      hint: pair(
        '把 r 與 c 除以 100 後代入 $m = (1 + c)/(r + c)$。現金漏出使貨幣乘數小於 1/r。',
        'Divide r and c by 100, then substitute into $m = (1 + c)/(r + c)$. Cash leakage makes the money multiplier smaller than 1/r.'
      ),
      answer: mm3,
      solution: sol(
        ['r = ' + r3 + '% = ' + fm(r3 / 100, 3) + '，c = ' + c3 + '% = ' + fm(c3 / 100, 3) + '。',
         '貨幣乘數 $m = (1 + c)/(r + c) = (1 + ' + fm(c3 / 100, 3) + ') ÷ (' + fm(r3 / 100, 3) + ' + ' + fm(c3 / 100, 3) + ')$。',
         '$m = ' + fm(1 + c3 / 100, 3) + ' ÷ ' + fm(r3 / 100 + c3 / 100, 3) + ' = ' + fm(mm3, 2) + '$。因此貨幣乘數為 ' + fm(mm3, 2) + '。'],
        ['r = ' + r3 + '% = ' + fm(r3 / 100, 3) + ', c = ' + c3 + '% = ' + fm(c3 / 100, 3) + '.',
         'Money multiplier $m = (1 + c)/(r + c) = (1 + ' + fm(c3 / 100, 3) + ') / (' + fm(r3 / 100, 3) + ' + ' + fm(c3 / 100, 3) + ')$.',
         '$m = ' + fm(1 + c3 / 100, 3) + ' / ' + fm(r3 / 100 + c3 / 100, 3) + ' = ' + fm(mm3, 2) + '$. So the money multiplier is ' + fm(mm3, 2) + '.']
      ),
      math: { mode: 'cash_leakage', reserve: r3, cashRatio: c3 }
    };
  });

  /* ================================================================
   * 10. money_demand — 貨幣數量論 MV = PY
   * ================================================================ */

  ED.registerType('money_demand', function (rng, o) {
    var level = o.level || 1;

    if (level === 1) {
      var Y = U.pick(rng, [800, 1000, 1200, 1500, 2000]);
      var Pindex = U.pick(rng, [110, 120, 125, 150, 200]);
      var priceLevel = Pindex / 100;
      var nominal = Y * Pindex / 100;
      var V = U.pick(rng, [4, 5, 8, 10]);
      var M = rd(nominal / V, 2);
      return {
        prompt: pair(
          '某經濟體系的實質本地生產總值為 ' + Y + ' 百萬元，物價指數（基年 = 100）為 ' + Pindex + '，貨幣流通速度 $V = ' + V + '$（次/年）。用交易方程式 $MV = PY$（其中物價水平 $P$ = 物價指數 ÷ 100）求貨幣供應 $M$（百萬元，2 位小數）。',
          'The real GDP of an economy is ' + Y + ' million dollars, the price index (base year = 100) is ' + Pindex + ', and the velocity of money is $V = ' + V + '$ (times per year). Using the equation of exchange $MV = PY$ (where the price level $P$ = price index / 100), find the money supply $M$ (in millions of dollars, 2 d.p.).'
        ),
        hint: pair(
          '先求物價水平 $P$ = 物價指數 ÷ 100，名義 GDP = $PY$，再由 $M = PY/V$ 求貨幣供應。',
          'First find the price level $P$ = price index / 100, then nominal GDP = $PY$, and finally $M = PY/V$.'
        ),
        answer: M,
        choices: choiceSet(rng, M, [rd(nominal, 2), rd(nominal * V, 2), rd(M * V, 2)], { dp: 2, min: 0 }),
        solution: sol(
          ['物價水平 $P$ = ' + Pindex + ' ÷ 100 = ' + fm(priceLevel, 2) + '。',
           '名義 GDP = $PY$ = ' + fm(priceLevel, 2) + ' × ' + Y + ' = ' + fm(nominal, 2) + '（百萬元）。',
           '由 $MV = PY$ 得 $M = PY ÷ V$ = ' + fm(nominal, 2) + ' ÷ ' + V + ' = ' + fm(M, 2) + '（百萬元）。',
           '因此貨幣供應為 ' + fm(M, 2) + ' 百萬元。'],
          ['The price level $P$ = ' + Pindex + ' / 100 = ' + fm(priceLevel, 2) + '.',
           'Nominal GDP = $PY$ = ' + fm(priceLevel, 2) + ' x ' + Y + ' = ' + fm(nominal, 2) + ' (millions of dollars).',
           'From $MV = PY$, $M = PY / V$ = ' + fm(nominal, 2) + ' / ' + V + ' = ' + fm(M, 2) + ' (millions of dollars).',
           'So the money supply is ' + fm(M, 2) + ' million dollars.']
        ),
        math: { mode: 'find_money', realGDP: Y, priceIndex: Pindex, velocity: V }
      };
    }

    if (level === 2) {
      var Y2 = U.pick(rng, [800, 1000, 1200, 1500, 2000]);
      var Pindex2 = U.pick(rng, [110, 120, 125, 150, 200]);
      var nominal2 = Y2 * Pindex2 / 100;
      var M2 = U.pick(rng, [100, 125, 150, 200, 250, 300, 400]);
      var V2 = rd(nominal2 / M2, 2);
      return {
        prompt: pair(
          '某經濟體系的實質本地生產總值為 ' + Y2 + ' 百萬元，物價指數（基年 = 100）為 ' + Pindex2 + '，貨幣供應為 ' + M2 + ' 百萬元。用交易方程式 $MV = PY$（其中物價水平 $P$ = 物價指數 ÷ 100）求貨幣流通速度 $V$（次/年，2 位小數）。',
          'The real GDP of an economy is ' + Y2 + ' million dollars, the price index (base year = 100) is ' + Pindex2 + ', and the money supply is ' + M2 + ' million dollars. Using the equation of exchange $MV = PY$ (where the price level $P$ = price index / 100), find the velocity of money $V$ (times per year, 2 d.p.).'
        ),
        hint: pair(
          '$V = PY ÷ M$，其中 $PY$ 是名義 GDP；物價水平要先由物價指數除以 100 求得。',
          '$V = PY / M$, where $PY$ is nominal GDP; first obtain the price level by dividing the price index by 100.'
        ),
        answer: V2,
        choices: choiceSet(rng, V2, [rd(nominal2, 2), rd(M2 / nominal2, 4), rd(nominal2 * M2, 2)], { dp: 2, min: 0 }),
        solution: sol(
          ['物價水平 $P$ = ' + Pindex2 + ' ÷ 100 = ' + fm(Pindex2 / 100, 2) + '，名義 GDP = $PY$ = ' + fm(nominal2, 2) + '（百萬元）。',
           '由 $MV = PY$ 得 $V = PY ÷ M$。',
           '$V$ = ' + fm(nominal2, 2) + ' ÷ ' + M2 + ' = ' + fm(V2, 2) + '（次/年）。因此貨幣流通速度為 ' + fm(V2, 2) + ' 次/年。'],
          ['The price level $P$ = ' + Pindex2 + ' / 100 = ' + fm(Pindex2 / 100, 2) + ', so nominal GDP = $PY$ = ' + fm(nominal2, 2) + ' (millions of dollars).',
           'From $MV = PY$, $V = PY / M$.',
           '$V$ = ' + fm(nominal2, 2) + ' / ' + M2 + ' = ' + fm(V2, 2) + ' (times per year). So the velocity of money is ' + fm(V2, 2) + ' times per year.']
        ),
        math: { mode: 'find_velocity', realGDP: Y2, priceIndex: Pindex2, money: M2 }
      };
    }

    var dP = U.pick(rng, [2, 3, 4, 5]);
    var dY = U.pick(rng, [1, 2, 3, 4, 5]);
    var dV = U.pick(rng, [-2, -1, 0, 1, 2]);
    var dM = dP + dY - dV;
    var velTextZh = dV > 0 ? '上升 ' + dV + '%' : (dV < 0 ? '下降 ' + Math.abs(dV) + '%' : '不變');
    var velTextEn = dV > 0 ? 'rises by ' + dV + '%' : (dV < 0 ? 'falls by ' + Math.abs(dV) + '%' : 'stays unchanged');
    return {
      prompt: pair(
        '某經濟體系物價水平上升 ' + dP + '%，實質本地生產總值增長 ' + dY + '%，貨幣流通速度' + velTextZh + '。用數量方程式的增長率形式 $%ΔM + %ΔV = %ΔP + %ΔY$ 求貨幣供應增長率（%，2 位小數）。',
        'In an economy the price level rises by ' + dP + '%, real GDP grows by ' + dY + '% and the velocity of money ' + velTextEn + '. Using the growth-rate form of the quantity equation $%ΔM + %ΔV = %ΔP + %ΔY$, find the growth rate of the money supply (in %, 2 d.p.).'
      ),
      hint: pair(
        '整理得 %ΔM = %ΔP + %ΔY − %ΔV；速度下降（負值）時要加回，速度上升時要減去。',
        'Rearranging gives %ΔM = %ΔP + %ΔY - %ΔV. A fall in velocity (a negative value) must be added back, while a rise in velocity is subtracted.'
      ),
      answer: rd(dM, 2),
      solution: sol(
        ['由 $%ΔM + %ΔV = %ΔP + %ΔY$ 得 %ΔM = %ΔP + %ΔY − %ΔV。',
         '%ΔM = ' + dP + '% + ' + dY + '% − (' + dV + '%) = ' + fm(dM, 2) + '%。',
         '因此貨幣供應增長率為 ' + fm(dM, 2) + '%。'],
        ['From $%ΔM + %ΔV = %ΔP + %ΔY$, we get %ΔM = %ΔP + %ΔY - %ΔV.',
         '%ΔM = ' + dP + '% + ' + dY + '% - (' + dV + '%) = ' + fm(dM, 2) + '%.',
         'So the growth rate of the money supply is ' + fm(dM, 2) + '%.']
      ),
      math: { mode: 'growth_rates', inflation: dP, realGrowth: dY, velocityChange: dV }
    };
  });

  /* ================================================================
   * 11. interest — 單利／複利／實質與有效利率
   *    o.mode = 'simple' | 'compound'；沒有 mode 時按 level 選：
   *    level 1 = simple、level 2 = compound、level 3 = real/effective
   * ================================================================ */

  ED.registerType('interest', function (rng, o) {
    var level = o.level || 1;
    var family;
    if (o.mode === 'simple' || o.mode === 'compound') family = o.mode;
    else family = level >= 3 ? 'advanced' : (level === 2 ? 'compound' : 'simple');

    /* ---- 單利 ---- */
    if (family === 'simple') {
      var P = U.pick(rng, [1000, 2000, 3000, 5000, 8000, 10000, 12000]);
      var r = U.pick(rng, [2, 3, 4, 5, 6]);
      var t = U.pick(rng, [1, 2, 3, 4, 5]);
      var interest = P * r * t / 100;

      if (level <= 1) {
        return {
          prompt: pair(
            '某人把本金 ' + P + ' 元存入銀行，年利率 ' + r + '%，存期 ' + t + ' 年，以單利計算。求期滿可得的單利息（元，2 位小數）。',
            'A person deposits a principal of ' + P + ' dollars in a bank at a simple annual interest rate of ' + r + '% for ' + t + ' years. Find the simple interest earned at maturity (in dollars, 2 d.p.).'
          ),
          hint: pair(
            '單利公式：$I = P × r × t$，其中 r 要用小數代入（例如 5% = 0.05）。單利只按本金計息。',
            'Simple interest: $I = P × r × t$, where r is expressed as a decimal (for example, 5% = 0.05). Simple interest is calculated on the principal only.'
          ),
          answer: rd(interest, 2),
          choices: choiceSet(rng, rd(interest, 2), [rd(P * r / 100, 2), rd(P * r * t / 100 + P, 2), rd(P * r / 100 * (t + 1), 2)], { dp: 2, min: 0 }),
          solution: sol(
            ['單利公式為 $I = P × r × t$，其中 $P$ 是本金、$r$ 是年利率（小數）、$t$ 是年數。',
             '年利率 ' + r + '% = ' + fm(r / 100, 2) + '，年期 $t = ' + t + '$ 年。',
             '$I = ' + P + ' × ' + fm(r / 100, 2) + ' × ' + t + ' = ' + fm(interest, 2) + '$ 元。',
             '因此期滿可得單利息 ' + fm(interest, 2) + ' 元。'],
            ['The simple interest formula is $I = P × r × t$, where $P$ is the principal, $r$ the annual rate as a decimal and $t$ the number of years.',
             'The annual rate is ' + r + '% = ' + fm(r / 100, 2) + ', and $t = ' + t + '$ years.',
             '$I = ' + P + ' × ' + fm(r / 100, 2) + ' × ' + t + ' = ' + fm(interest, 2) + '$ dollars.',
             'So the simple interest earned is ' + fm(interest, 2) + ' dollars.']
          ),
          math: { mode: 'simple', variant: 'interest', P: P, r: r, t: t }
        };
      }

      if (level === 2) {
        var amount = P + interest;
        return {
          prompt: pair(
            '某人把本金 ' + P + ' 元存入銀行，年利率 ' + r + '%，存期 ' + t + ' 年，以單利計算。求期滿的本利和（元，2 位小數）。',
            'A person deposits a principal of ' + P + ' dollars in a bank at a simple annual interest rate of ' + r + '% for ' + t + ' years. Find the amount at maturity (principal plus simple interest, in dollars, 2 d.p.).'
          ),
          hint: pair(
            '本利和 = 本金 + 單利息 = $P(1 + rt)$，其中 r 要用小數代入。',
            'Amount = principal + simple interest = $P(1 + rt)$, where r is expressed as a decimal.'
          ),
          answer: rd(amount, 2),
          choices: choiceSet(rng, rd(amount, 2), [rd(interest, 2), P, rd(P * (1 + r / 100) * t, 2)], { dp: 2, min: 0 }),
          solution: sol(
            ['先求單利息：$I = P × r × t$。',
             '$I = ' + P + ' × ' + fm(r / 100, 2) + ' × ' + t + ' = ' + fm(interest, 2) + '$ 元。',
             '本利和 = 本金 + 利息 = ' + P + ' + ' + fm(interest, 2) + ' = ' + fm(amount, 2) + ' 元。',
             '因此期滿的本利和為 ' + fm(amount, 2) + ' 元。'],
            ['First find the simple interest: $I = P × r × t$.',
             '$I = ' + P + ' × ' + fm(r / 100, 2) + ' × ' + t + ' = ' + fm(interest, 2) + '$ dollars.',
             'Amount = principal + interest = ' + P + ' + ' + fm(interest, 2) + ' = ' + fm(amount, 2) + ' dollars.',
             'So the amount at maturity is ' + fm(amount, 2) + ' dollars.']
          ),
          math: { mode: 'simple', variant: 'amount', P: P, r: r, t: t }
        };
      }

      var target = P + interest;
      return {
        prompt: pair(
          '某人把本金 ' + P + ' 元存入銀行，以單利計算，年利率 ' + r + '%，期滿時的本利和為 ' + target + ' 元。求存期（年，2 位小數）。',
          'A person deposits a principal of ' + P + ' dollars in a bank at a simple annual interest rate of ' + r + '%. The amount at maturity is ' + target + ' dollars. Find the number of years of the deposit (in years, 2 d.p.).'
        ),
        hint: pair(
          '先由本利和減本金求出利息：$I = A - P$；再由 $I = P × r × t$ 得 $t = I ÷ (P × r)$。',
          'First find the interest by subtracting the principal from the amount: $I = A - P$; then from $I = P × r × t$, $t = I / (P × r)$.'
        ),
        answer: t,
        choices: choiceSet(rng, t, [t + 1, t - 1 === 0 ? t + 2 : t - 1, rd(target / (P * r / 100), 2)], { dp: 2, min: 0, step: 1 }),
        solution: sol(
          ['利息 = 本利和 − 本金 = ' + target + ' − ' + P + ' = ' + fm(interest, 2) + ' 元。',
           '由 $I = P × r × t$ 得 $t = I ÷ (P × r)$。',
           '$t = ' + fm(interest, 2) + ' ÷ (' + P + ' × ' + fm(r / 100, 2) + ') = ' + fm(t, 2) + '$ 年。',
           '因此存期為 ' + fm(t, 2) + ' 年。'],
          ['Interest = amount - principal = ' + target + ' - ' + P + ' = ' + fm(interest, 2) + ' dollars.',
           'From $I = P × r × t$, $t = I / (P × r)$.',
           '$t = ' + fm(interest, 2) + ' / (' + P + ' × ' + fm(r / 100, 2) + ') = ' + fm(t, 2) + '$ years.',
           'So the deposit period is ' + fm(t, 2) + ' years.']
        ),
        math: { mode: 'simple', variant: 'time', P: P, r: r, t: t }
      };
    }

    /* ---- 複利 ---- */
    if (family === 'compound') {
      var Pc = U.pick(rng, [1000, 2000, 3000, 5000, 8000, 10000, 12000, 20000]);
      var rc = U.pick(rng, [2, 3, 4, 5, 6, 8]);
      var nc = U.pick(rng, [2, 3, 4, 5]);
      var factor = Math.pow(1 + rc / 100, nc);
      var amountC = rd(Pc * factor, 2);
      var interestC = rd(amountC - Pc, 2);

      if (level <= 1) {
        return {
          prompt: pair(
            '某人把本金 ' + Pc + ' 元存入銀行，年利率 ' + rc + '%，每年複利一次，為期 ' + nc + ' 年。求期滿的本利和（元，2 位小數）。',
            'A person deposits a principal of ' + Pc + ' dollars in a bank at an annual interest rate of ' + rc + '%, compounded annually, for ' + nc + ' years. Find the amount at maturity (in dollars, 2 d.p.).'
          ),
          hint: pair(
            '複利公式：$A = P(1 + r)^n$，其中 r 為年利率（小數）、n 為年數；複利是「利滾利」，與單利不同。',
            'Compound interest formula: $A = P(1 + r)^n$, where r is the annual rate as a decimal and n is the number of years. Compounding means interest earns interest, unlike simple interest.'
          ),
          answer: amountC,
          choices: choiceSet(rng, amountC, [rd(Pc * (1 + rc * nc / 100), 2), rd(Pc * (1 + rc / 100) * nc, 2), rd(amountC * (1 + rc / 100), 2)], { dp: 2, min: 0 }),
          solution: sol(
            ['複利公式：$A = P(1 + r)^n$，其中 r = ' + fm(rc / 100, 2) + '，n = ' + nc + '。',
             '$A = ' + Pc + ' × (1 + ' + fm(rc / 100, 2) + ')^{' + nc + '} = ' + fm(amountC, 2) + '$ 元。',
             '因此期滿的本利和為 ' + fm(amountC, 2) + ' 元。'],
            ['Compound interest formula: $A = P(1 + r)^n$, where r = ' + fm(rc / 100, 2) + ' and n = ' + nc + '.',
             '$A = ' + Pc + ' × (1 + ' + fm(rc / 100, 2) + ')^{' + nc + '} = ' + fm(amountC, 2) + '$ dollars.',
             'So the amount at maturity is ' + fm(amountC, 2) + ' dollars.']
          ),
          math: { mode: 'compound', variant: 'amount', P: Pc, r: rc, n: nc }
        };
      }

      if (level === 2) {
        return {
          prompt: pair(
            '某人把本金 ' + Pc + ' 元存入銀行，年利率 ' + rc + '%，每年複利一次，為期 ' + nc + ' 年。求期滿的複利利息（元，2 位小數）。',
            'A person deposits a principal of ' + Pc + ' dollars in a bank at an annual interest rate of ' + rc + '%, compounded annually, for ' + nc + ' years. Find the compound interest earned at maturity (in dollars, 2 d.p.).'
          ),
          hint: pair(
            '先求本利和 $A = P(1 + r)^n$，再減去本金 $P$，即複利利息 = $A - P$。',
            'First find the amount $A = P(1 + r)^n$, then subtract the principal $P$: compound interest = $A - P$.'
          ),
          answer: interestC,
          choices: choiceSet(rng, interestC, [rd(Pc * rc * nc / 100, 2), amountC, rd(amountC * (1 + rc / 100), 2)], { dp: 2, min: 0 }),
          solution: sol(
            ['複利公式：$A = P(1 + r)^n$，r = ' + fm(rc / 100, 2) + '，n = ' + nc + '。',
             '$A = ' + Pc + ' × (1 + ' + fm(rc / 100, 2) + ')^{' + nc + '} = ' + fm(amountC, 2) + '$ 元。',
             '複利利息 = $A - P$ = ' + fm(amountC, 2) + ' − ' + Pc + ' = ' + fm(interestC, 2) + ' 元。',
             '因此期滿的複利利息為 ' + fm(interestC, 2) + ' 元。'],
            ['Compound interest formula: $A = P(1 + r)^n$, with r = ' + fm(rc / 100, 2) + ' and n = ' + nc + '.',
             '$A = ' + Pc + ' × (1 + ' + fm(rc / 100, 2) + ')^{' + nc + '} = ' + fm(amountC, 2) + '$ dollars.',
             'Compound interest = $A - P$ = ' + fm(amountC, 2) + ' - ' + Pc + ' = ' + fm(interestC, 2) + ' dollars.',
             'So the compound interest earned is ' + fm(interestC, 2) + ' dollars.']
          ),
          math: { mode: 'compound', variant: 'interest', P: Pc, r: rc, n: nc }
        };
      }

      var r72 = U.pick(rng, [3, 4, 6, 8, 9, 12]);
      var years72 = rd(72 / r72, 2);
      return {
        prompt: pair(
          '某人把本金 ' + Pc + ' 元存入銀行，年利率 ' + r72 + '%，每年複利一次。用 72 法則（翻倍年數 ≈ 72 ÷ 年利率的百分數）估算本金翻倍所需的年數（年，2 位小數）。',
          'A person deposits a principal of ' + Pc + ' dollars in a bank at an annual interest rate of ' + r72 + '%, compounded annually. Use the rule of 72 (doubling time is approximately 72 divided by the percentage interest rate) to estimate how many years are needed for the principal to double (in years, 2 d.p.).'
        ),
        hint: pair(
          '72 法則：翻倍年數 ≈ 72 ÷ 年利率；年利率用百分數的數字代入（例如 8% 用 8）。',
          'Rule of 72: doubling time is approximately 72 divided by the interest rate, using the number of the percentage (for example, use 8 for 8%).'
        ),
        answer: years72,
        solution: sol(
          ['72 法則：翻倍年數 ≈ 72 ÷ 年利率（百分數的數字）。',
           '= 72 ÷ ' + r72 + ' = ' + fm(years72, 2) + '（年）。',
           '因此本金約需 ' + fm(years72, 2) + ' 年翻倍。'],
          ['Rule of 72: doubling time is approximately 72 divided by the percentage interest rate.',
           '= 72 / ' + r72 + ' = ' + fm(years72, 2) + ' years.',
           'So the principal takes about ' + fm(years72, 2) + ' years to double.']
        ),
        math: { mode: 'compound', variant: 'double', P: Pc, r: r72 }
      };
    }

    /* ---- level 3（無 mode）：實質利率或有效年利率 ---- */
    var sub = U.pick(rng, ['real', 'effective']);

    if (sub === 'real') {
      var nomRate = U.pick(rng, [4, 5, 6, 7, 8, 9, 10]);
      var infl = U.pick(rng, [1, 2, 3, 4, 5]);
      var realRate = nomRate - infl;
      if (realRate === 0) { infl = infl + 1; realRate = nomRate - infl; }
      return {
        prompt: pair(
          '某經濟體系的名義年利率為 ' + nomRate + '%，同期的通脹率為 ' + infl + '%。用近似式（實質利率 ≈ 名義利率 − 通脹率）求實質年利率（%，2 位小數；若為負數請保留負號）。',
          'The nominal annual interest rate in an economy is ' + nomRate + '%, and the inflation rate over the same period is ' + infl + '%. Using the approximation (real interest rate is approximately nominal interest rate minus inflation rate), find the real annual interest rate (in %, 2 d.p.; keep a negative sign if it is negative).'
        ),
        hint: pair(
          'Fisher 近似式：實質利率 ≈ 名義利率 − 通脹率。名義利率低於通脹率時，實質利率為負。',
          'Fisher approximation: real interest rate is approximately nominal interest rate minus inflation rate. If the nominal rate is below inflation, the real rate is negative.'
        ),
        answer: rd(realRate, 2),
        choices: choiceSet(rng, rd(realRate, 2), [rd(nomRate + infl, 2), rd(infl - nomRate, 2), nomRate], { dp: 2, min: -30, max: 40, step: 1 }),
        solution: sol(
          ['Fisher 近似式：實質利率 ≈ 名義利率 − 通脹率。',
           '= ' + nomRate + '% − ' + infl + '% = ' + fm(realRate, 2) + '%。',
           '因此實質年利率約為 ' + fm(realRate, 2) + '%。'],
          ['Fisher approximation: real interest rate is approximately nominal interest rate minus inflation rate.',
           '= ' + nomRate + '% - ' + infl + '% = ' + fm(realRate, 2) + '%.',
           'So the real annual interest rate is about ' + fm(realRate, 2) + '%.']
        ),
        math: { mode: 'real', nominalRate: nomRate, inflation: infl }
      };
    }

    var pr = U.pick(rng, [[6, 2], [6, 4], [6, 12], [8, 2], [8, 4], [10, 2], [10, 4], [12, 12], [4, 4], [5, 12]]);
    var nom = pr[0];
    var mPer = pr[1];
    var ear = rd((Math.pow(1 + nom / 100 / mPer, mPer) - 1) * 100, 2);
    var freqZh = mPer === 2 ? '每半年' : (mPer === 4 ? '每季' : '每月');
    var freqEn = mPer === 2 ? 'semi-annually' : (mPer === 4 ? 'quarterly' : 'monthly');
    return {
      prompt: pair(
        '某銀行提供名義年利率 ' + nom + '% 的存款計劃，' + freqZh + '複利一次（即每年複利 ' + mPer + ' 次）。求有效年利率 EAR（%，2 位小數）。公式：$EAR = (1 + r/m)^m - 1$，r 以小數代入。',
        'A bank offers a deposit plan with a nominal annual interest rate of ' + nom + '%, compounded ' + freqEn + ' (that is, ' + mPer + ' times per year). Find the effective annual rate (EAR, in %, 2 d.p.). Formula: $EAR = (1 + r/m)^m - 1$, with r expressed as a decimal.'
      ),
      hint: pair(
        '把名義年利率除以 100 及複利次數 m，代入 $EAR = (1 + r/m)^m - 1$，再乘以 100 化為百分比。m 越大，EAR 越高。',
        'Divide the nominal annual rate by 100 and by the compounding frequency m, substitute into $EAR = (1 + r/m)^m - 1$, then multiply by 100. The larger m is, the higher the EAR.'
      ),
      answer: ear,
      solution: sol(
        ['名義年利率 r = ' + fm(nom / 100, 3) + '，每年複利次數 m = ' + mPer + '。',
         '$EAR = (1 + ' + fm(nom / 100, 3) + ' ÷ ' + mPer + ')^{' + mPer + '} - 1 = ' + fm(ear, 2) + '%$。',
         '因此有效年利率為 ' + fm(ear, 2) + '%。'],
        ['Nominal annual rate r = ' + fm(nom / 100, 3) + ', with m = ' + mPer + ' compounding periods per year.',
         '$EAR = (1 + ' + fm(nom / 100, 3) + ' / ' + mPer + ')^{' + mPer + '} - 1 = ' + fm(ear, 2) + '%$.',
         'So the effective annual rate is ' + fm(ear, 2) + '%.']
      ),
      math: { mode: 'effective', nominalRate: nom, frequency: mPer }
    };
  });
})();
