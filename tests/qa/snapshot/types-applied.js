/*
 * 經濟學園 · Econ Garden — 題目生成器：計量、財務、數據與增長模型
 * ------------------------------------------------------------------
 * 本檔案只註冊以下 5 個題型（content/types-applied.js）：
 *   regression   簡單線性回歸（預測值、斜率解釋、R²／顯著性判斷）
 *   npv          現值與淨現值（一期 PV、兩期 NPV、三期投資決策）
 *   gini         洛倫茲曲線與 Gini 係數（三點、四點、兩地比較）
 *   data_read    棒形圖數據閱讀（佔比、百分比變化、實質值）
 *   growth_model Harrod–Domar 與增長會計（求 g、s、TFP）
 *
 * 契約見 docs/TYPE-CATALOG.md 第 6 節；只用傳入的 rng（可重現），
 * 不使用非種子隨機數、系統時間、DOM 或網絡 API。
 */
(function () {
  'use strict';

  var U = EconData.util;
  var pick = U.pick;
  var randInt = U.randInt;
  var round = U.round;
  var shuffle = U.shuffle;

  /* ================= 共用小工具 ================= */

  function levelOf(o) {
    var lv = o && typeof o.level === 'number' && isFinite(o.level) ? o.level : 1;
    return Math.max(1, Math.min(3, Math.round(lv)));
  }

  function num(v) { return String(round(v, 2)); }

  function trim3(v) { return String(round(v, 3)); }

  /* 建立文字選項：items = [{id, zh, en}]，answerId 必須在選項中 */
  function textProblem(rng, items, answerId, problem, where) {
    var ids = items.map(function (c) { return String(c.id); });
    if (ids.indexOf(String(answerId)) === -1) {
      throw new Error('applied: 文字答案不在選項中（' + where + '）');
    }
    var labels = {};
    items.forEach(function (c) { labels[String(c.id)] = { zh: c.zh, en: c.en }; });
    problem.answer = String(answerId);
    problem.choices = shuffle(rng, ids);
    problem.choiceLabels = labels;
    return problem;
  }

  /* 回歸方程字串（顯示用，不含 $） */
  function eqText(a, b) {
    if (b >= 0) return a + ' + ' + num(b) + 'X';
    return a + ' - ' + num(-b) + 'X';
  }

  /* ================= 1. regression ================= */

  var REG_CONTEXTS = [
    {
      zhX: '每月廣告支出', enX: 'monthly advertising spending',
      zhXU: '千元', enXU: 'HKD thousand',
      zhY: '每月銷售額', enY: 'monthly sales',
      zhYU: '千元', enYU: 'HKD thousand'
    },
    {
      zhX: '每週溫習時數', enX: 'weekly study hours',
      zhXU: '小時', enXU: 'hours',
      zhY: '測驗分數', enY: 'test score',
      zhYU: '分', enYU: 'marks'
    },
    {
      zhX: '每公頃施肥量', enX: 'fertiliser applied per hectare',
      zhXU: '公斤', enXU: 'kg',
      zhY: '農作物產量', enY: 'crop output',
      zhYU: '公斤', enYU: 'kg'
    },
    {
      zhX: '店鋪面積', enX: 'shop floor area',
      zhXU: '平方米', enXU: 'square metres',
      zhY: '每月營業額', enY: 'monthly revenue',
      zhYU: '千元', enYU: 'HKD thousand'
    }
  ];

  var REG_SLOPE_CONTEXTS = [
    {
      sign: 1,
      zhX: '每月廣告支出', enX: 'monthly advertising spending',
      zhXU: '千元', enXU: 'HKD thousand',
      zhY: '每月銷售額', enY: 'monthly sales',
      zhYU: '千元', enYU: 'HKD thousand'
    },
    {
      sign: 1,
      zhX: '每週溫習時數', enX: 'weekly study hours',
      zhXU: '小時', enXU: 'hours',
      zhY: '測驗分數', enY: 'test score',
      zhYU: '分', enYU: 'marks'
    },
    {
      sign: -1,
      zhX: '商品價格', enX: 'price of the good',
      zhXU: '元', enXU: 'HKD',
      zhY: '每月需求量', enY: 'quantity demanded per month',
      zhYU: '件', enYU: 'units'
    }
  ];

  function regressionPredict(rng) {
    var ctx = pick(rng, REG_CONTEXTS);
    var b = pick(rng, [2, 2.5, 3, 3.5, 4, 5]);
    var a = pick(rng, [8, 10, 12, 15, 18, 20, 24, 30]);
    var x0 = pick(rng, [2, 3, 4, 5, 6, 8]);
    var n = randInt(rng, 30, 200);
    var r2 = pick(rng, [0.52, 0.6, 0.64, 0.7, 0.81, 0.89]);
    var eq = eqText(a, b);
    var answer = round(a + b * x0, 2);
    var bOp = b >= 0 ? '+ ' : '- ';
    return {
      prompt: {
        zh: '某研究以簡單線性回歸分析「' + ctx.zhY + '」（Y）與「' + ctx.zhX + '」（X）的關係，得到估計方程 $\\hat{Y} = ' + eq + '$，樣本數 $n = ' + n + '$，$R^2 = ' + r2 + '$。若某樣本的 X 為 ' + x0 + ' ' + ctx.zhXU + '，用此方程預測其 Y 是多少 ' + ctx.zhYU + '（四捨五入至 2 位小數）？',
        en: 'A simple linear regression of ' + ctx.enY + ' (Y) on ' + ctx.enX + ' (X) gives the estimated equation $\\hat{Y} = ' + eq + '$ with $n = ' + n + '$ and $R^2 = ' + r2 + '$. If a sample has X = ' + x0 + ' ' + ctx.enXU + ', what is its predicted Y (' + ctx.enYU + ', 2 d.p.)?'
      },
      hint: {
        zh: '把 X 的值代入估計方程，再計算 $\\hat{Y}$。',
        en: 'Substitute the value of X into the estimated equation and compute $\\hat{Y}$.'
      },
      answer: answer,
      choices: U.numericChoices(rng, answer, { min: 0, dp: 2, deltas: [b, -b, 1, -1, 2, -2, 3, -3] }),
      solution: {
        zh: [
          '估計方程為 $\\hat{Y} = ' + eq + '$。',
          '代入 $X = ' + x0 + '$：$\\hat{Y} = ' + a + ' ' + bOp + num(Math.abs(b)) + ' \\times ' + x0 + '$。',
          '計算得 $\\hat{Y} = ' + num(answer) + '$。',
          '因此預測的 Y 為 ' + num(answer) + ' ' + ctx.zhYU + '。'
        ],
        en: [
          'The estimated equation is $\\hat{Y} = ' + eq + '$.',
          'Substitute $X = ' + x0 + '$: $\\hat{Y} = ' + a + ' ' + bOp + num(Math.abs(b)) + ' \\times ' + x0 + '$.',
          'This gives $\\hat{Y} = ' + num(answer) + '$.',
          'So the predicted Y is ' + num(answer) + ' ' + ctx.enYU + '.'
        ]
      },
      math: { mode: 'predict', a: a, b: b, x0: x0, n: n, r2: r2 }
    };
  }

  function regressionSlope(rng) {
    var ctx = pick(rng, REG_SLOPE_CONTEXTS);
    var pos = ctx.sign > 0;
    var a = pos ? pick(rng, [10, 15, 20, 24, 30]) : pick(rng, [60, 70, 80, 90, 100]);
    var mag = pick(rng, pos ? [2, 2.5, 3, 4, 5] : [2, 2.5, 3, 4]);
    var b = pos ? mag : -mag;
    var n = randInt(rng, 30, 200);
    var r2 = pick(rng, [0.52, 0.6, 0.64, 0.7, 0.81]);
    var eq = eqText(a, b);
    var zhDir = pos ? '增加' : '減少';
    var enDir = pos ? 'increases' : 'decreases';
    var items = [
      {
        id: 'a',
        zh: '當 X 每增加 1 ' + ctx.zhXU + '，Y 平均' + zhDir + ' ' + num(mag) + ' ' + ctx.zhYU + '（其他因素不變）。',
        en: 'When X rises by 1 ' + ctx.enXU + ', Y ' + enDir + ' by ' + num(mag) + ' ' + ctx.enYU + ' on average, holding other factors constant.'
      },
      {
        id: 'b',
        zh: '當 X 每增加 1 ' + ctx.zhXU + '，Y 必定' + zhDir + ' ' + num(mag) + ' ' + ctx.zhYU + '。',
        en: 'When X rises by 1 ' + ctx.enXU + ', Y must ' + (pos ? 'increase' : 'decrease') + ' by ' + num(mag) + ' ' + ctx.enYU + '.'
      },
      {
        id: 'c',
        zh: '當 Y 每增加 1 ' + ctx.zhYU + '，X 平均' + (pos ? '增加' : '減少') + ' ' + num(mag) + ' ' + ctx.zhXU + '。',
        en: 'When Y rises by 1 ' + ctx.enYU + ', X ' + (pos ? 'increases' : 'decreases') + ' by ' + num(mag) + ' ' + ctx.enXU + ' on average.'
      },
      {
        id: 'd',
        zh: '當 X 每增加 1%，Y 平均' + zhDir + ' ' + num(mag) + '%。',
        en: 'When X rises by 1%, Y ' + enDir + ' by ' + num(mag) + '% on average.'
      }
    ];
    var problem = {
      prompt: {
        zh: '某回歸的估計方程為 $\\hat{Y} = ' + eq + '$，樣本數 $n = ' + n + '$，$R^2 = ' + r2 + '$；其中 X 為' + ctx.zhX + '（' + ctx.zhXU + '），Y 為' + ctx.zhY + '（' + ctx.zhYU + '）。在其他因素不變下，斜率 $b = ' + b + '$ 的正確解釋是下列哪一項？',
        en: 'A regression gives $\\hat{Y} = ' + eq + '$ ($n = ' + n + '$, $R^2 = ' + r2 + '$), where X is ' + ctx.enX + ' (' + ctx.enXU + ') and Y is ' + ctx.enY + ' (' + ctx.enYU + '). Holding other factors constant, which of the following correctly interprets the slope $b = ' + b + '$?'
      },
      hint: {
        zh: '斜率是「X 每增加 1 單位，Y 平均變動多少」，單位是 Y 的單位除以 X 的單位。',
        en: 'The slope is the average change in Y when X rises by one unit; its units are Y units per X unit.'
      },
      solution: {
        zh: [
          '估計方程為 $\\hat{Y} = ' + eq + '$，斜率的單位是「Y 的單位／X 的單位」。',
          '所以 X 每增加 1 ' + ctx.zhXU + '，Y 平均' + zhDir + ' ' + num(mag) + ' ' + ctx.zhYU + '（其他因素不變）。',
          '「必定」的說法忽略了誤差項；把 X、Y 的角色對調，或把「1 個單位」誤當成「1%」，都不正確。',
          '因此正確解釋是：X 每增加 1 ' + ctx.zhXU + '，Y 平均' + zhDir + ' ' + num(mag) + ' ' + ctx.zhYU + '。'
        ],
        en: [
          'The estimated equation is $\\hat{Y} = ' + eq + '$; the slope is measured in units of Y per unit of X.',
          'So when X rises by 1 ' + ctx.enXU + ', Y ' + enDir + ' by ' + num(mag) + ' ' + ctx.enYU + ' on average, holding other factors constant.',
          'The word "must" ignores the error term; reversing the roles of X and Y, or confusing a one-unit change with a 1% change, is also wrong.',
          'The correct interpretation is: when X rises by 1 ' + ctx.enXU + ', Y ' + enDir + ' by ' + num(mag) + ' ' + ctx.enYU + ' on average.'
        ]
      },
      math: { mode: 'slope', a: a, b: b, n: n, r2: r2 }
    };
    return textProblem(rng, items, 'a', problem, 'regression/slope');
  }

  function regressionR2(rng) {
    var ctx = pick(rng, REG_CONTEXTS);
    var b = pick(rng, [2, 2.5, 3, 3.5, 4]);
    var a = pick(rng, [10, 15, 20, 24, 30]);
    var n = randInt(rng, 30, 200);
    var r2 = pick(rng, [0.36, 0.49, 0.64, 0.81, 0.9]);
    var pct = Math.round(r2 * 100);
    var eq = eqText(a, b);
    var items = [
      {
        id: 'a',
        zh: 'R² = ' + r2 + ' 表示 X 的變動解釋了 Y 約 ' + pct + '% 的變異。',
        en: 'R² = ' + r2 + ' means that variation in X explains about ' + pct + '% of the variation in Y.'
      },
      {
        id: 'b',
        zh: 'R² = ' + r2 + ' 表示 X 有 ' + pct + '% 的機會導致 Y 改變。',
        en: 'R² = ' + r2 + ' means that there is a ' + pct + '% chance that X causes Y to change.'
      },
      {
        id: 'c',
        zh: 'R² = ' + r2 + ' 表示 Y 的變動解釋了 X 約 ' + pct + '% 的變異。',
        en: 'R² = ' + r2 + ' means that variation in Y explains about ' + pct + '% of the variation in X.'
      },
      {
        id: 'd',
        zh: 'R² = ' + r2 + ' 表示回歸方程有 ' + pct + '% 的機會準確預測下一個 Y。',
        en: 'R² = ' + r2 + ' means that the regression equation has a ' + pct + '% chance of predicting the next Y exactly.'
      }
    ];
    var problem = {
      prompt: {
        zh: '某回歸方程為 $\\hat{Y} = ' + eq + '$，樣本數 $n = ' + n + '$，$R^2 = ' + r2 + '$；其中 X 為' + ctx.zhX + '（' + ctx.zhXU + '），Y 為' + ctx.zhY + '（' + ctx.zhYU + '）。下列哪一項是對 $R^2$ 的正確解釋？',
        en: 'A regression gives $\\hat{Y} = ' + eq + '$ ($n = ' + n + '$, $R^2 = ' + r2 + '$), where X is ' + ctx.enX + ' (' + ctx.enXU + ') and Y is ' + ctx.enY + ' (' + ctx.enYU + '). Which of the following correctly interprets $R^2$?'
      },
      hint: {
        zh: '$R^2$ 是可解釋變異的比例：Y 的總變異中，有多少百分比可由回歸模型（X）解釋。',
        en: '$R^2$ is the proportion of variation explained: the percentage of the total variation in Y accounted for by the regression on X.'
      },
      solution: {
        zh: [
          '$R^2$（判定係數）量度 Y 的總變異中可由回歸模型解釋的比例。',
          '$R^2 = ' + r2 + '$ 即 ' + pct + '%，表示 X 的變動解釋了 Y 約 ' + pct + '% 的變異。',
          '$R^2$ 不是因果機率、不是 Y 解釋 X，也不是預測準確的機率，所以其餘選項錯誤。',
          '因此正確解釋是：X 的變動解釋了 Y 約 ' + pct + '% 的變異。'
        ],
        en: [
          '$R^2$ (the coefficient of determination) measures the proportion of the total variation in Y explained by the regression model.',
          '$R^2 = ' + r2 + '$ means ' + pct + '%, so variation in X explains about ' + pct + '% of the variation in Y.',
          '$R^2$ is not a probability of causation, not Y explaining X, and not the chance of an exact prediction, so the other options are wrong.',
          'Hence the correct interpretation is: variation in X explains about ' + pct + '% of the variation in Y.'
        ]
      },
      math: { mode: 'r2', a: a, b: b, n: n, r2: r2 }
    };
    return textProblem(rng, items, 'a', problem, 'regression/r2');
  }

  function regressionSig(rng) {
    var ctx = pick(rng, REG_CONTEXTS);
    var b = pick(rng, [2, 2.5, 3, 3.5, 4]);
    var a = pick(rng, [10, 15, 20, 24, 30]);
    var n = randInt(rng, 30, 200);
    var p = pick(rng, [0.01, 0.03, 0.04, 0.08, 0.12, 0.2]);
    var pPct = Math.round(p * 100);
    var eq = eqText(a, b);
    var significant = p < 0.05;
    var answerId = significant ? 'sig' : 'notsig';
    var items = [
      {
        id: 'sig',
        zh: '拒絕虛無假設 H₀: b = 0，斜率在 5% 顯著水準下顯著異於 0。',
        en: 'Reject the null hypothesis H₀: b = 0; the slope is statistically significant at the 5% level.'
      },
      {
        id: 'notsig',
        zh: '未能拒絕虛無假設 H₀: b = 0，斜率在 5% 顯著水準下不顯著。',
        en: 'Fail to reject the null hypothesis H₀: b = 0; the slope is not statistically significant at the 5% level.'
      },
      {
        id: 'prob',
        zh: 'p 值等於「斜率為 0」的機率，所以有 ' + pPct + '% 機會斜率等於 0。',
        en: 'The p-value is the probability that the slope equals 0, so there is a ' + pPct + '% chance that the slope is 0.'
      },
      {
        id: 'r2',
        zh: 'p 值就是 R²，表示模型解釋了 ' + pPct + '% 的 Y 變異。',
        en: 'The p-value equals R², so the model explains ' + pPct + '% of the variation in Y.'
      }
    ];
    var problem = {
      prompt: {
        zh: '某回歸方程為 $\\hat{Y} = ' + eq + '$，樣本數 $n = ' + n + '$；其中 X 為' + ctx.zhX + '（' + ctx.zhXU + '），Y 為' + ctx.zhY + '（' + ctx.zhYU + '）。斜率 $b$ 的 p 值（p-value）為 ' + p + '。在 5% 顯著水準下，下列哪一項結論正確？',
        en: 'A regression gives $\\hat{Y} = ' + eq + '$ ($n = ' + n + '$), where X is ' + ctx.enX + ' (' + ctx.enXU + ') and Y is ' + ctx.enY + ' (' + ctx.enYU + '). The p-value of the slope $b$ is ' + p + '. At the 5% significance level, which conclusion is correct?'
      },
      hint: {
        zh: '決策規則：p 值小於 5% 就拒絕 H₀，否則不能拒絕 H₀。',
        en: 'Decision rule: reject H₀ if the p-value is below 5%; otherwise do not reject H₀.'
      },
      solution: {
        zh: [
          '顯著水準 5%，決策規則是：p 值 < 0.05 時拒絕 H₀: b = 0。',
          '本例 p = ' + p + (significant ? ' < 0.05，所以拒絕 H₀。' : ' ≥ 0.05，所以不能拒絕 H₀。'),
          'p 值不是「斜率為 0 的機率」，也不等於 R²，其餘選項是常見誤解。',
          significant
            ? '因此在 5% 水準下斜率顯著異於 0（拒絕 H₀）。'
            : '因此在 5% 水準下斜率不顯著（未能拒絕 H₀）。'
        ],
        en: [
          'The 5% significance level means: reject H₀: b = 0 when the p-value is below 0.05.',
          'Here p = ' + p + (significant ? ' < 0.05, so we reject H₀.' : ' ≥ 0.05, so we fail to reject H₀.'),
          'The p-value is not the probability that the slope is 0, and it is not R²; the other options are common misinterpretations.',
          significant
            ? 'Therefore the slope is statistically significant at the 5% level (reject H₀).'
            : 'Therefore the slope is not statistically significant at the 5% level (fail to reject H₀).'
        ]
      },
      math: { mode: 'sig', a: a, b: b, n: n, p: p }
    };
    return textProblem(rng, items, answerId, problem, 'regression/sig');
  }

  function regressionFit(rng) {
    return pick(rng, [0, 1]) === 0 ? regressionR2(rng) : regressionSig(rng);
  }

  /* ================= 2. npv ================= */

  function npvPv(rng) {
    var r = pick(rng, [5, 8, 10, 20, 25]);
    var pv = pick(rng, [40, 50, 60, 80, 100, 120]);
    var factor = 1 + r / 100;
    var cf1 = round(pv * factor, 2);
    var answer = round(cf1 / factor, 2);
    return {
      prompt: {
        zh: '某項目將於 1 年後收到現金流 $CF_1 = ' + num(cf1) + '$ 百萬元。若年折現率為 ' + r + '%，求該筆現金流的現值（PV，百萬元，四捨五入至 2 位小數）。',
        en: 'A project will receive a cash flow of $CF_1 = ' + num(cf1) + '$ million in one year. If the annual discount rate is ' + r + '%, find the present value (PV) of this cash flow (HKD million, 2 d.p.).'
      },
      hint: {
        zh: '一年後的現值：$PV = \\dfrac{CF_1}{1 + r}$，r 以小數代入。',
        en: 'Present value in one year: $PV = \\dfrac{CF_1}{1 + r}$, with r written as a decimal.'
      },
      answer: answer,
      choices: U.numericChoices(rng, answer, { min: 0, dp: 2, deltas: [5, -5, 10, -10, 2, -2, 1, -1] }),
      solution: {
        zh: [
          '一年後的現金流 $CF_1 = ' + num(cf1) + '$ 百萬元，年折現率 r = ' + r + '% = ' + num(factor - 1) + '。',
          '現值公式：$PV = \\dfrac{CF_1}{1 + r}$。',
          '代入：$PV = \\dfrac{' + num(cf1) + '}{' + num(factor) + '} = ' + num(answer) + '$ 百萬元。',
          '因此該現金流的現值為 ' + num(answer) + ' 百萬元。'
        ],
        en: [
          'The cash flow in one year is $CF_1 = ' + num(cf1) + '$ million and the annual discount rate is r = ' + r + '% = ' + num(factor - 1) + '.',
          'The present value formula is $PV = \\dfrac{CF_1}{1 + r}$.',
          'Substitute: $PV = \\dfrac{' + num(cf1) + '}{' + num(factor) + '} = ' + num(answer) + '$ million.',
          'So the present value of this cash flow is ' + num(answer) + ' million.'
        ]
      },
      math: { mode: 'pv', cf1: cf1, r: r, pv: answer }
    };
  }

  function npvTwo(rng) {
    var r = pick(rng, [10, 20, 25]);
    var f1 = 1 + r / 100;
    var f2 = f1 * f1;
    var pv1 = pick(rng, [20, 30, 40, 50, 60]);
    var pv2;
    if (r === 10) pv2 = pick(rng, [50, 100]);
    else if (r === 20) pv2 = pick(rng, [50, 75, 100]);
    else pv2 = pick(rng, [80, 160]);
    var cf1 = round(pv1 * f1, 2);
    var cf2 = round(pv2 * f2, 2);
    var c0 = randInt(rng, 4, 16) * 10;
    var answer = round(pv1 + pv2 - c0, 2);
    if (answer === 0) {
      c0 += 10;
      answer = round(pv1 + pv2 - c0, 2);
    }
    return {
      prompt: {
        zh: '某公司考慮一個為期 2 年的投資項目：期初（t = 0）支出 $C_0 = ' + c0 + '$ 百萬元，第 1 年末及第 2 年末分別收到現金流 $CF_1 = ' + num(cf1) + '$ 及 $CF_2 = ' + num(cf2) + '$ 百萬元。若年折現率為 ' + r + '%，求項目的淨現值 $NPV = \\sum_{t=1}^{2} \\dfrac{CF_t}{(1+r)^t} - C_0$（百萬元，四捨五入至 2 位小數）。',
        en: 'A firm is considering a two-year project: it pays $C_0 = ' + c0 + '$ million at t = 0 and receives cash flows of $CF_1 = ' + num(cf1) + '$ and $CF_2 = ' + num(cf2) + '$ million at the end of years 1 and 2 respectively. If the annual discount rate is ' + r + '%, find the net present value $NPV = \\sum_{t=1}^{2} \\dfrac{CF_t}{(1+r)^t} - C_0$ (HKD million, 2 d.p.).'
      },
      hint: {
        zh: '先分別把各期現金流折現，再把現值加總，最後減去期初投資。',
        en: 'Discount each cash flow separately, add the present values, then subtract the initial investment.'
      },
      answer: answer,
      choices: U.numericChoices(rng, answer, { min: -500, max: 500, dp: 2, deltas: [5, -5, 10, -10, 20, -20, 1, -1] }),
      solution: {
        zh: [
          '年折現率 r = ' + r + '%，折現因子：第 1 年為 1 ÷ ' + num(f1) + '，第 2 年為 1 ÷ ' + num(f2) + '。',
          '第 1 年現值：$PV_1 = ' + num(cf1) + ' \\div ' + num(f1) + ' = ' + num(pv1) + '$。',
          '第 2 年現值：$PV_2 = ' + num(cf2) + ' \\div ' + num(f2) + ' = ' + num(pv2) + '$。',
          '$NPV = PV_1 + PV_2 - C_0 = ' + num(pv1) + ' + ' + num(pv2) + ' - ' + c0 + ' = ' + num(answer) + '$。',
          '因此項目的 NPV 為 ' + num(answer) + ' 百萬元。'
        ],
        en: [
          'With r = ' + r + '%, the discount factors are 1 ÷ ' + num(f1) + ' for year 1 and 1 ÷ ' + num(f2) + ' for year 2.',
          'Present value of year 1: $PV_1 = ' + num(cf1) + ' \\div ' + num(f1) + ' = ' + num(pv1) + '$.',
          'Present value of year 2: $PV_2 = ' + num(cf2) + ' \\div ' + num(f2) + ' = ' + num(pv2) + '$.',
          '$NPV = PV_1 + PV_2 - C_0 = ' + num(pv1) + ' + ' + num(pv2) + ' - ' + c0 + ' = ' + num(answer) + '$.',
          'So the NPV of the project is ' + num(answer) + ' million.'
        ]
      },
      math: { mode: 'npv2', c0: c0, cf1: cf1, cf2: cf2, r: r, pv1: pv1, pv2: pv2, npv: answer }
    };
  }

  function npvDecision(rng) {
    var r = 10;
    var f1 = 1.1;
    var f2 = 1.21;
    var f3 = 1.331;
    var pv1 = pick(rng, [20, 30, 40, 50]);
    var pv2 = pick(rng, [50, 100]);
    var pv3 = pick(rng, [100, 200]);
    var cf1 = round(pv1 * f1, 2);
    var cf2 = round(pv2 * f2, 2);
    var cf3 = round(pv3 * f3, 2);
    var pvSum = pv1 + pv2 + pv3;
    var gap = 10 * randInt(rng, 1, 6);
    var positive = rng() < 0.5;
    var c0 = positive ? pvSum - gap : pvSum + gap;
    var npv = round(pvSum - c0, 2);
    var answerId = positive ? 'accept' : 'reject';
    var items = [
      {
        id: 'accept',
        zh: '應接受，因為 NPV 為正（NPV > 0）。',
        en: 'Accept, because the NPV is positive (NPV > 0).'
      },
      {
        id: 'reject',
        zh: '應拒絕，因為 NPV 為負（NPV < 0）。',
        en: 'Reject, because the NPV is negative (NPV < 0).'
      },
      {
        id: 'irr',
        zh: '無法用 NPV 判斷，必須改用內部報酬率（IRR）。',
        en: 'NPV cannot be used for the decision; the internal rate of return (IRR) must be used instead.'
      },
      {
        id: 'later',
        zh: '應延後決定，因為 NPV 沒有考慮貨幣的時間價值。',
        en: 'Postpone the decision, because NPV does not take the time value of money into account.'
      }
    ];
    var problem = {
      prompt: {
        zh: '某公司考慮一個為期 3 年的項目：期初（t = 0）支出 $C_0 = ' + c0 + '$ 百萬元，第 1、2、3 年末分別收到現金流 $CF_1 = ' + num(cf1) + '$、$CF_2 = ' + num(cf2) + '$、$CF_3 = ' + num(cf3) + '$ 百萬元。年折現率為 10%。根據淨現值（NPV）法則，公司應否接受此項目？',
        en: 'A firm is considering a three-year project: it pays $C_0 = ' + c0 + '$ million at t = 0 and receives cash flows of $CF_1 = ' + num(cf1) + '$, $CF_2 = ' + num(cf2) + '$ and $CF_3 = ' + num(cf3) + '$ million at the end of years 1, 2 and 3 respectively. The annual discount rate is 10%. According to the NPV rule, should the firm accept the project?'
      },
      hint: {
        zh: '先求三期現值之和，再減去期初投資 C₀，最後看 NPV 的正負。',
        en: 'Find the sum of the three present values, subtract the initial investment C₀, then look at the sign of NPV.'
      },
      solution: {
        zh: [
          '年折現率 10%，第 t 年現金流的折現因子為 $\\dfrac{1}{1.1^t}$。',
          '第 1 年現值：$PV_1 = ' + num(cf1) + ' \\div 1.1 = ' + num(pv1) + '$。',
          '第 2 年現值：$PV_2 = ' + num(cf2) + ' \\div 1.21 = ' + num(pv2) + '$。',
          '第 3 年現值：$PV_3 = ' + num(cf3) + ' \\div 1.331 = ' + num(pv3) + '$。',
          '$NPV = ' + num(pv1) + ' + ' + num(pv2) + ' + ' + num(pv3) + ' - ' + c0 + ' = ' + num(npv) + '$ 百萬元。',
          'NPV ' + (positive ? '> 0' : '< 0') + '，按 NPV 法則應' + (positive ? '接受' : '拒絕') + '此項目。'
        ],
        en: [
          'With a 10% discount rate, the discount factor for a cash flow in year t is $\\dfrac{1}{1.1^t}$.',
          'Year 1: $PV_1 = ' + num(cf1) + ' \\div 1.1 = ' + num(pv1) + '$.',
          'Year 2: $PV_2 = ' + num(cf2) + ' \\div 1.21 = ' + num(pv2) + '$.',
          'Year 3: $PV_3 = ' + num(cf3) + ' \\div 1.331 = ' + num(pv3) + '$.',
          '$NPV = ' + num(pv1) + ' + ' + num(pv2) + ' + ' + num(pv3) + ' - ' + c0 + ' = ' + num(npv) + '$ million.',
          'NPV ' + (positive ? '> 0' : '< 0') + ', so by the NPV rule the firm should ' + (positive ? 'accept' : 'reject') + ' the project.'
        ]
      },
      math: { mode: 'decision', c0: c0, cf1: cf1, cf2: cf2, cf3: cf3, r: r, pv1: pv1, pv2: pv2, pv3: pv3, npv: npv }
    };
    return textProblem(rng, items, answerId, problem, 'npv/decision');
  }

  /* ================= 3. gini ================= */

  function giniFromPoints(pts) {
    var sum = 0;
    for (var i = 1; i < pts.length; i++) {
      sum += (pts[i].x - pts[i - 1].x) * (pts[i].y + pts[i - 1].y);
    }
    return 1 - sum;
  }

  function pointsTextZh(pts) {
    return pts.map(function (p) { return '(' + num(p.x) + ', ' + num(p.y) + ')'; }).join('、');
  }

  function pointsTextEn(pts) {
    return pts.map(function (p) { return '(' + num(p.x) + ', ' + num(p.y) + ')'; }).join(', ');
  }

  function giniTerms(pts) {
    var parts = [];
    var sum = 0;
    for (var i = 1; i < pts.length; i++) {
      var dx = round(pts[i].x - pts[i - 1].x, 4);
      var sy = round(pts[i].y + pts[i - 1].y, 4);
      var area = round(dx * sy, 4);
      sum = round(sum + area, 4);
      parts.push('第 ' + i + ' 段 (' + num(pts[i].x) + ' - ' + num(pts[i - 1].x) + ')(' + num(pts[i].y) + ' + ' + num(pts[i - 1].y) + ') = ' + trim3(area));
    }
    return { parts: parts, sum: sum };
  }

  function giniTask(pts, g) {
    var terms = giniTerms(pts);
    var sum = num(terms.sum);
    if (String(terms.sum) !== sum) sum = trim3(terms.sum);
    return {
      prompt: {
        zh: '某地的收入分配以洛倫茲曲線（Lorenz curve）表示。由低收入到高收入排列，累積人口份額 $x$ 與累積收入份額 $y$ 的資料點為：' + pointsTextZh(pts) + '。用梯形法計算 Gini 係數：$G = 1 - \\sum_{i=1}^{n}(x_i - x_{i-1})(y_i + y_{i-1})$（首尾資料點為 (0, 0) 與 (1, 1)）。答案取 0 至 1 之間，四捨五入至 2 位小數。',
        en: 'The income distribution of a region is described by a Lorenz curve. Ordered from lowest to highest income, the data points of cumulative population share $x$ and cumulative income share $y$ are: ' + pointsTextEn(pts) + '. Use the trapezoid formula $G = 1 - \\sum_{i=1}^{n}(x_i - x_{i-1})(y_i + y_{i-1})$ (the first and last points are (0, 0) and (1, 1)). Give the Gini coefficient between 0 and 1, to 2 d.p.'
      },
      hint: {
        zh: '逐段計算 $(x_i - x_{i-1})(y_i + y_{i-1})$，加總後用 1 減去。',
        en: 'Compute $(x_i - x_{i-1})(y_i + y_{i-1})$ for each segment, add them up, and subtract the total from 1.'
      },
      solution: {
        zh: [
          '資料點（累積人口份額 x，累積收入份額 y）：' + pointsTextZh(pts) + '。',
          '逐段計算：' + terms.parts.join('；') + '。',
          '總和 = ' + trim3(terms.sum) + '。',
          'Gini 係數 = 1 - ' + trim3(terms.sum) + ' = ' + num(g) + '。',
          '因此 Gini 係數為 ' + num(g) + '。'
        ],
        en: [
          'Data points (cumulative population share x, cumulative income share y): ' + pointsTextEn(pts) + '.',
          'Segment by segment: ' + terms.parts.join('; ') + '.',
          'Total = ' + trim3(terms.sum) + '.',
          'Gini coefficient = 1 - ' + trim3(terms.sum) + ' = ' + num(g) + '.',
          'So the Gini coefficient is ' + num(g) + '.'
        ]
      },
      math: { mode: 'gini', x: pts.map(function (p) { return p.x; }), y: pts.map(function (p) { return p.y; }), gini: g }
    };
  }

  function giniSimple(rng) {
    var x1t = pick(rng, [3, 4, 5, 6, 7]);
    var y1t = randInt(rng, 1, x1t - 1);
    var pts = [
      { x: 0, y: 0 },
      { x: round(x1t / 10, 2), y: round(y1t / 10, 2) },
      { x: 1, y: 1 }
    ];
    var g = round(giniFromPoints(pts), 2);
    var p = giniTask(pts, g);
    p.answer = g;
    p.choices = U.numericChoices(rng, g, {
      min: 0, max: 1, dp: 2,
      deltas: [0.01, -0.01, 0.02, -0.02, 0.03, -0.03, 0.05, -0.05, 0.1, -0.1]
    });
    return p;
  }

  function giniFour(rng) {
    var x1t = pick(rng, [2, 4, 6]);
    var x2choices = [];
    for (var k = x1t + 2; k <= 8; k += 2) x2choices.push(k);
    var x2t = pick(rng, x2choices);
    var y1t = randInt(rng, 1, x1t - 1);
    var y2t = randInt(rng, y1t + 1, x2t - 1);
    var pts = [
      { x: 0, y: 0 },
      { x: round(x1t / 10, 2), y: round(y1t / 10, 2) },
      { x: round(x2t / 10, 2), y: round(y2t / 10, 2) },
      { x: 1, y: 1 }
    ];
    var g = round(giniFromPoints(pts), 2);
    var p = giniTask(pts, g);
    p.answer = g;
    p.choices = U.numericChoices(rng, g, {
      min: 0, max: 1, dp: 2,
      deltas: [0.01, -0.01, 0.02, -0.02, 0.03, -0.03, 0.05, -0.05, 0.1, -0.1]
    });
    return p;
  }

  function giniCompare(rng) {
    var x1t = pick(rng, [3, 4, 5, 6, 7]);
    var y1t = randInt(rng, 1, x1t - 1);
    var pts = [
      { x: 0, y: 0 },
      { x: round(x1t / 10, 2), y: round(y1t / 10, 2) },
      { x: 1, y: 1 }
    ];
    var gA = round(giniFromPoints(pts), 2);
    var gB = pick(rng, [0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6]);
    var guard = 0;
    while (Math.abs(gA - gB) < 0.05 && guard++ < 100) {
      gB = pick(rng, [0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6]);
    }
    var terms = giniTerms(pts);
    var answerId = gA > gB ? 'jia' : 'yi';
    var winnerZh = gA > gB ? '甲區' : '乙區';
    var winnerEn = gA > gB ? 'Region A' : 'Region B';
    var items = [
      {
        id: 'jia',
        zh: '甲區較不平等，因為甲區的 Gini 係數較高。',
        en: 'Region A is more unequal because its Gini coefficient is higher.'
      },
      {
        id: 'yi',
        zh: '乙區較不平等，因為乙區的 Gini 係數較高。',
        en: 'Region B is more unequal because its Gini coefficient is higher.'
      },
      {
        id: 'same',
        zh: '兩區的不平等程度相同，因為兩區的 Gini 係數相等。',
        en: 'The two regions are equally unequal because their Gini coefficients are equal.'
      },
      {
        id: 'unknown',
        zh: '無法比較，因為兩區的累積人口份額不同。',
        en: 'They cannot be compared because the two regions have different cumulative population shares.'
      }
    ];
    var problem = {
      prompt: {
        zh: '甲區的收入分配以洛倫茲曲線表示，累積人口份額 $x$ 與累積收入份額 $y$ 的資料點為：' + pointsTextZh(pts) + '；乙區的 Gini 係數則為 ' + num(gB) + '。用梯形法計算甲區的 Gini 係數 $G = 1 - \\sum_{i=1}^{n}(x_i - x_{i-1})(y_i + y_{i-1})$，並判斷哪一區的收入分配較不平等（Gini 係數愈高代表愈不平等）。',
        en: 'Region A\'s income distribution is described by a Lorenz curve with cumulative population share $x$ and cumulative income share $y$: ' + pointsTextEn(pts) + '. Region B has a Gini coefficient of ' + num(gB) + '. Use the trapezoid formula $G = 1 - \\sum_{i=1}^{n}(x_i - x_{i-1})(y_i + y_{i-1})$ to compute Region A\'s Gini coefficient, and decide which region has the more unequal income distribution (a higher Gini coefficient means greater inequality).'
      },
      hint: {
        zh: '先算出甲區的 Gini 係數，再與乙區的 Gini 係數比較大小。',
        en: 'First compute Region A\'s Gini coefficient, then compare it with Region B\'s Gini coefficient.'
      },
      solution: {
        zh: [
          '甲區資料點（累積人口份額 x，累積收入份額 y）：' + pointsTextZh(pts) + '。',
          '逐段計算：' + terms.parts.join('；') + '。',
          '甲區 Gini 係數 = 1 - ' + trim3(terms.sum) + ' = ' + num(gA) + '。',
          '乙區的 Gini 係數為 ' + num(gB) + '；' + num(gA) + ' ' + (gA > gB ? '>' : '<') + ' ' + num(gB) + '，所以' + winnerZh + '的 Gini 係數較高。',
          'Gini 係數較高代表收入分配較不平等，因此' + winnerZh + '較不平等。'
        ],
        en: [
          'Region A data points (cumulative population share x, cumulative income share y): ' + pointsTextEn(pts) + '.',
          'Segment by segment: ' + terms.parts.join('; ') + '.',
          'Region A\'s Gini coefficient = 1 - ' + trim3(terms.sum) + ' = ' + num(gA) + '.',
          'Region B\'s Gini coefficient is ' + num(gB) + '; since ' + num(gA) + ' ' + (gA > gB ? '>' : '<') + ' ' + num(gB) + ', ' + winnerEn + ' has the higher Gini coefficient.',
          'A higher Gini coefficient means greater income inequality, so ' + winnerEn + ' is more unequal.'
        ]
      },
      math: { mode: 'compare', x: [0, pts[1].x, 1], y: [0, pts[1].y, 1], gini: gA, otherGini: gB }
    };
    return textProblem(rng, items, answerId, problem, 'gini/compare');
  }

  /* ================= 4. data_read ================= */

  var READ_CONTEXTS = [
    {
      zhItem: '借書量', enItem: 'books borrowed',
      zhUnit: '萬冊', enUnit: '10,000 books',
      zhGroup: '圖書館', enGroup: 'libraries', zhMeasure: '間'
    },
    {
      zhItem: '旅客人次', enItem: 'visitor arrivals',
      zhUnit: '萬人次', enUnit: '10,000 visits',
      zhGroup: '口岸', enGroup: 'checkpoints', zhMeasure: '個'
    },
    {
      zhItem: '農作物產量', enItem: 'crop output',
      zhUnit: '萬公斤', enUnit: '10,000 kg',
      zhGroup: '農場', enGroup: 'farms', zhMeasure: '個'
    },
    {
      zhItem: '營業額', enItem: 'sales revenue',
      zhUnit: '百萬元', enUnit: 'HKD million',
      zhGroup: '分店', enGroup: 'branches', zhMeasure: '間'
    }
  ];

  var BAR_LETTERS = ['A', 'B', 'C', 'D', 'E'];

  function barValues(rng, n) {
    return shuffle(rng, [2, 3, 4, 5, 6, 7]).slice(0, n);
  }

  function dataShare(rng) {
    var ctx = pick(rng, READ_CONTEXTS);
    var n = randInt(rng, 4, 5);
    var values = barValues(rng, n);
    var labels = BAR_LETTERS.slice(0, n);
    var idx = randInt(rng, 0, n - 1);
    var total = values.reduce(function (s, v) { return s + v; }, 0);
    var answer = round(values[idx] / total * 100, 2);
    var lastLabel = labels[n - 1];
    return {
      prompt: {
        zh: '下圖的棒形圖顯示 ' + n + ' ' + ctx.zhMeasure + ctx.zhGroup + '（' + labels[0] + ' 至 ' + lastLabel + '）的' + ctx.zhItem + '，由左至右依次為 ' + values.join('、') + ' ' + ctx.zhUnit + '。' + labels[idx] + ' 的' + ctx.zhItem + '佔全部 ' + n + ' ' + ctx.zhMeasure + ctx.zhGroup + '總' + ctx.zhItem + '的百分比是多少？（以百分比數字作答，四捨五入至 2 位小數）',
        en: 'The bar chart below shows the ' + ctx.enItem + ' of ' + n + ' ' + ctx.enGroup + ' (' + labels[0] + ' to ' + lastLabel + '), which are ' + values.join(', ') + ' ' + ctx.enUnit + ' from left to right. What percentage of the total ' + ctx.enItem + ' across all ' + n + ' ' + ctx.enGroup + ' comes from ' + labels[idx] + '? (Give the answer as a percentage number, 2 d.p.)'
      },
      hint: {
        zh: '先求所有柱的總和，再用指定柱的值除以總和，乘以 100%。',
        en: 'First add up all the bars, then divide the chosen bar by the total and multiply by 100%.'
      },
      answer: answer,
      choices: U.numericChoices(rng, answer, { min: 0, max: 100, dp: 2, deltas: [1, -1, 2, -2, 5, -5, 10, -10] }),
      solution: {
        zh: [
          '全部 ' + n + ' ' + ctx.zhMeasure + ctx.zhGroup + '的' + ctx.zhItem + '總數 = ' + values.join(' + ') + ' = ' + total + ' ' + ctx.zhUnit + '。',
          labels[idx] + ' 的' + ctx.zhItem + ' = ' + values[idx] + ' ' + ctx.zhUnit + '。',
          '佔比 = ' + values[idx] + ' ÷ ' + total + ' × 100% = ' + num(answer) + '%。',
          '因此 ' + labels[idx] + ' 的佔比為 ' + num(answer) + '%。'
        ],
        en: [
          'Total ' + ctx.enItem + ' = ' + values.join(' + ') + ' = ' + total + ' ' + ctx.enUnit + '.',
          labels[idx] + '\'s ' + ctx.enItem + ' = ' + values[idx] + ' ' + ctx.enUnit + '.',
          'Share = ' + values[idx] + ' ÷ ' + total + ' × 100% = ' + num(answer) + '%.',
          'So the share of ' + labels[idx] + ' is ' + num(answer) + '%.'
        ]
      },
      visual: { kind: 'barchart', values: values.slice(), labels: labels.slice() },
      math: { mode: 'share', values: values, labels: labels, idx: idx, total: total, answer: answer }
    };
  }

  function dataChange(rng) {
    var ctx = pick(rng, READ_CONTEXTS);
    var n = randInt(rng, 4, 5);
    var values = barValues(rng, n);
    var startYear = n === 5 ? 2019 : 2020;
    var years = [];
    for (var i = 0; i < n; i++) years.push(String(startYear + i));
    var first = values[0];
    var last = values[n - 1];
    var diff = last - first;
    var answer = round(diff / first * 100, 2);
    var up = diff > 0;
    return {
      prompt: {
        zh: '下圖的棒形圖顯示某地' + ctx.zhGroup + '由 ' + years[0] + ' 年至 ' + years[n - 1] + ' 年的' + ctx.zhItem + '，由左至右依次為 ' + values.join('、') + ' ' + ctx.zhUnit + '。求由 ' + years[0] + ' 年至 ' + years[n - 1] + ' 年的百分比變化（增加為正、減少為負；以百分比數字作答，四捨五入至 2 位小數）。',
        en: 'The bar chart below shows the ' + ctx.enItem + ' of ' + ctx.enGroup + ' in a region from ' + years[0] + ' to ' + years[n - 1] + ', which are ' + values.join(', ') + ' ' + ctx.enUnit + ' from left to right. Find the percentage change from ' + years[0] + ' to ' + years[n - 1] + ' (a rise is positive, a fall is negative; give the answer as a percentage number, 2 d.p.).'
      },
      hint: {
        zh: '百分比變化 =（期末值 - 期初值）÷ 期初值 × 100%。',
        en: 'Percentage change = (end value − start value) ÷ start value × 100%.'
      },
      answer: answer,
      choices: U.numericChoices(rng, answer, { min: -100, max: 300, dp: 2, deltas: [1, -1, 2, -2, 5, -5, 10, -10, 20, -20] }),
      solution: {
        zh: [
          years[0] + ' 年的' + ctx.zhItem + ' = ' + first + ' ' + ctx.zhUnit + '；' + years[n - 1] + ' 年的' + ctx.zhItem + ' = ' + last + ' ' + ctx.zhUnit + '。',
          '變化量 = ' + last + ' - ' + first + ' = ' + diff + ' ' + ctx.zhUnit + '。',
          '百分比變化 = ' + diff + ' ÷ ' + first + ' × 100% = ' + num(answer) + '%。',
          '因此百分比變化為 ' + num(answer) + '%（' + (up ? '增加' : '減少') + '）。'
        ],
        en: [
          'In ' + years[0] + ', ' + ctx.enItem + ' = ' + first + ' ' + ctx.enUnit + '; in ' + years[n - 1] + ', ' + ctx.enItem + ' = ' + last + ' ' + ctx.enUnit + '.',
          'Change = ' + last + ' - ' + first + ' = ' + diff + ' ' + ctx.enUnit + '.',
          'Percentage change = ' + diff + ' ÷ ' + first + ' × 100% = ' + num(answer) + '%.',
          'So the percentage change is ' + num(answer) + '% (a ' + (up ? 'rise' : 'fall') + ').'
        ]
      },
      visual: { kind: 'barchart', values: values.slice(), labels: years.slice() },
      math: { mode: 'change', values: values, labels: years, first: first, last: last, answer: answer }
    };
  }

  function dataReal(rng) {
    var ctx = READ_CONTEXTS[3];
    var n = randInt(rng, 4, 5);
    var values = barValues(rng, n);
    var labels = BAR_LETTERS.slice(0, n);
    var idx = randInt(rng, 0, n - 1);
    var priceIndex = pick(rng, [110, 120, 125, 150, 200]);
    var nominal = values[idx];
    var answer = round(nominal * 100 / priceIndex, 2);
    var lastLabel = labels[n - 1];
    return {
      prompt: {
        zh: '下圖的棒形圖顯示 ' + n + ' 間分店（' + labels[0] + ' 至 ' + lastLabel + '）在 2024 年的名義營業額，由左至右依次為 ' + values.join('、') + ' ' + ctx.zhUnit + '。' + labels[idx] + ' 店 2024 年的名義營業額為 ' + nominal + ' ' + ctx.zhUnit + '；物價指數（2020 = 100）為 ' + priceIndex + '。求 ' + labels[idx] + ' 店 2024 年的實質營業額（以 2020 年價格計算，百萬元，四捨五入至 2 位小數）。',
        en: 'The bar chart below shows the nominal sales revenue of ' + n + ' branches (' + labels[0] + ' to ' + lastLabel + ') in 2024, which are ' + values.join(', ') + ' ' + ctx.enUnit + ' from left to right. Branch ' + labels[idx] + ' had nominal sales revenue of ' + nominal + ' ' + ctx.enUnit + ' in 2024, and the price index (2020 = 100) is ' + priceIndex + '. Find the real sales revenue of branch ' + labels[idx] + ' in 2024 (at 2020 prices, HKD million, 2 d.p.).'
      },
      hint: {
        zh: '實質值 = 名義值 ÷（物價指數 ÷ 100）。',
        en: 'Real value = nominal value ÷ (price index ÷ 100).'
      },
      answer: answer,
      choices: U.numericChoices(rng, answer, { min: 0, max: 20, dp: 2, deltas: [0.5, -0.5, 1, -1, 2, -2] }),
      solution: {
        zh: [
          '名義營業額 = ' + nominal + ' 百萬元；物價指數（2020 = 100）= ' + priceIndex + '。',
          '實質值 = 名義值 ÷（物價指數 ÷ 100）。',
          '代入：' + nominal + ' ÷（' + priceIndex + ' ÷ 100）= ' + nominal + ' ÷ ' + num(priceIndex / 100) + ' = ' + num(nominal * 100 / priceIndex) + ' 百萬元。',
          '因此實質營業額為 ' + num(answer) + ' 百萬元（以 2020 年價格計算）。'
        ],
        en: [
          'Nominal sales revenue = ' + nominal + ' million; price index (2020 = 100) = ' + priceIndex + '.',
          'Real value = nominal value ÷ (price index ÷ 100).',
          'Substitute: ' + nominal + ' ÷ (' + priceIndex + ' ÷ 100) = ' + nominal + ' ÷ ' + num(priceIndex / 100) + ' = ' + num(nominal * 100 / priceIndex) + ' million.',
          'So the real sales revenue is ' + num(answer) + ' million (at 2020 prices).'
        ]
      },
      visual: { kind: 'barchart', values: values.slice(), labels: labels.slice() },
      math: { mode: 'real', values: values, labels: labels, idx: idx, nominal: nominal, priceIndex: priceIndex, answer: answer }
    };
  }

  /* ================= 5. growth_model ================= */

  function growthHarrodG(rng) {
    var g = pick(rng, [2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7.5]);
    var v = pick(rng, [2, 3, 4, 5]);
    var s = round(g * v, 2);
    return {
      prompt: {
        zh: '在 Harrod–Domar 增長模型中，增長率為 $g = s/v$，其中 $s$ 為儲蓄率、$v$ 為資本產出比率（capital–output ratio）。某經濟體的儲蓄率為 ' + num(s) + '%，資本產出比率為 ' + v + '。求該經濟體的增長率 $g$（以百分比數字作答，四捨五入至 2 位小數）。',
        en: 'In the Harrod–Domar growth model the growth rate is $g = s/v$, where $s$ is the saving rate and $v$ is the capital–output ratio. An economy has a saving rate of ' + num(s) + '% and a capital–output ratio of ' + v + '. Find the growth rate $g$ (as a percentage number, 2 d.p.).'
      },
      hint: {
        zh: '把儲蓄率（百分數）除以資本產出比率，即得增長率（百分數）。',
        en: 'Divide the saving rate (in per cent) by the capital–output ratio to get the growth rate (in per cent).'
      },
      answer: round(g, 2),
      solution: {
        zh: [
          'Harrod–Domar 模型：$g = s/v$。',
          '其中 $s = ' + num(s) + '\\%$，$v = ' + v + '$。',
          '所以 $g = ' + num(s) + '\\% \\div ' + v + ' = ' + num(g) + '\\%$。',
          '因此增長率 $g$ 為 ' + num(g) + '%。'
        ],
        en: [
          'The Harrod–Domar model gives $g = s/v$.',
          'Here $s = ' + num(s) + '\\%$ and $v = ' + v + '$.',
          'So $g = ' + num(s) + '\\% \\div ' + v + ' = ' + num(g) + '\\%$.',
          'Therefore the growth rate $g$ is ' + num(g) + '%.'
        ]
      },
      math: { mode: 'hd_g', s: s, v: v, g: round(g, 2) }
    };
  }

  function growthHarrodS(rng) {
    var g = pick(rng, [2, 2.5, 3, 3.5, 4, 4.5, 5, 6]);
    var v = pick(rng, [2, 3, 4, 5]);
    var s = round(g * v, 2);
    return {
      prompt: {
        zh: '在 Harrod–Domar 增長模型中，增長率為 $g = s/v$，其中 $s$ 為儲蓄率、$v$ 為資本產出比率。某經濟體希望達到每年 ' + num(g) + '% 的增長率，而其資本產出比率為 ' + v + '。求所需的儲蓄率 $s$（以百分比數字作答，四捨五入至 2 位小數）。',
        en: 'In the Harrod–Domar growth model the growth rate is $g = s/v$, where $s$ is the saving rate and $v$ is the capital–output ratio. An economy wants to grow at ' + num(g) + '% per year and its capital–output ratio is ' + v + '. Find the required saving rate $s$ (as a percentage number, 2 d.p.).'
      },
      hint: {
        zh: '由 $g = s/v$ 可得 $s = g \\times v$。',
        en: 'From $g = s/v$ we get $s = g \\times v$.'
      },
      answer: s,
      solution: {
        zh: [
          '由 Harrod–Domar 模型 $g = s/v$，可得 $s = g \\times v$。',
          '其中 $g = ' + num(g) + '\\%$，$v = ' + v + '$。',
          '所以 $s = ' + num(g) + '\\% \\times ' + v + ' = ' + num(s) + '\\%$。',
          '因此所需的儲蓄率為 ' + num(s) + '%。'
        ],
        en: [
          'From the Harrod–Domar model $g = s/v$, we get $s = g \\times v$.',
          'Here $g = ' + num(g) + '\\%$ and $v = ' + v + '$.',
          'So $s = ' + num(g) + '\\% \\times ' + v + ' = ' + num(s) + '\\%$.',
          'Therefore the required saving rate is ' + num(s) + '%.'
        ]
      },
      math: { mode: 'hd_s', s: s, v: v, g: g }
    };
  }

  function growthAccounting(rng) {
    var alpha = pick(rng, [0.3, 0.4, 0.5]);
    var gK = randInt(rng, 4, 8);
    var gL = randInt(rng, 1, 4);
    var tfp = pick(rng, [0.5, 0.8, 1, 1.2, 1.5, 2]);
    var g = round(alpha * gK + (1 - alpha) * gL + tfp, 2);
    var mode = pick(rng, [0, 1]) === 0 ? 'tfp' : 'g';
    var askTfp = mode === 'tfp';
    var answer = askTfp ? tfp : g;
    var givenZh = askTfp
      ? '$\\alpha = ' + num(alpha) + '$、$g_K = ' + gK + '\\%$、$g_L = ' + gL + '\\%$、$g = ' + num(g) + '\\%$'
      : '$\\alpha = ' + num(alpha) + '$、$g_K = ' + gK + '\\%$、$g_L = ' + gL + '\\%$、$\\text{TFP} = ' + num(tfp) + '\\%$';
    var givenEn = askTfp
      ? '$\\alpha = ' + num(alpha) + '$, $g_K = ' + gK + '\\%$, $g_L = ' + gL + '\\%$ and $g = ' + num(g) + '\\%$'
      : '$\\alpha = ' + num(alpha) + '$, $g_K = ' + gK + '\\%$, $g_L = ' + gL + '\\%$ and $\\text{TFP} = ' + num(tfp) + '\\%$';
    var promptZh, promptEn, solutionZh, solutionEn;
    if (askTfp) {
      promptZh = '在增長會計（growth accounting）中，$g = \\alpha g_K + (1 - \\alpha) g_L + \\text{TFP}$，其中 $g$、$g_K$、$g_L$ 分別為實質 GDP、資本及勞動的增長率，$\\alpha$ 為資本份額，TFP 為全要素生產率增長。已知 ' + givenZh + '。求 TFP 增長率（以百分比數字作答，四捨五入至 2 位小數）。';
      promptEn = 'In growth accounting, $g = \\alpha g_K + (1 - \\alpha) g_L + \\text{TFP}$, where $g$, $g_K$ and $g_L$ are the growth rates of real GDP, capital and labour, $\\alpha$ is the capital share, and TFP is total factor productivity growth. Given ' + givenEn + ', find TFP growth (as a percentage number, 2 d.p.).';
      solutionZh = [
        '增長會計公式：$g = \\alpha g_K + (1 - \\alpha) g_L + \\text{TFP}$，所以 $\\text{TFP} = g - \\alpha g_K - (1 - \\alpha) g_L$。',
        '代入：$\\alpha g_K = ' + num(alpha) + ' \\times ' + gK + '\\% = ' + num(alpha * gK) + '\\%$。',
        '$(1 - \\alpha) g_L = ' + num(1 - alpha) + ' \\times ' + gL + '\\% = ' + num((1 - alpha) * gL) + '\\%$。',
        '$\\text{TFP} = ' + num(g) + '\\% - ' + num(alpha * gK) + '\\% - ' + num((1 - alpha) * gL) + '\\% = ' + num(tfp) + '\\%$。',
        '因此 TFP 增長率為 ' + num(tfp) + '%。'
      ];
      solutionEn = [
        'The growth accounting formula is $g = \\alpha g_K + (1 - \\alpha) g_L + \\text{TFP}$, so $\\text{TFP} = g - \\alpha g_K - (1 - \\alpha) g_L$.',
        'Substitute: $\\alpha g_K = ' + num(alpha) + ' \\times ' + gK + '\\% = ' + num(alpha * gK) + '\\%$.',
        '$(1 - \\alpha) g_L = ' + num(1 - alpha) + ' \\times ' + gL + '\\% = ' + num((1 - alpha) * gL) + '\\%$.',
        '$\\text{TFP} = ' + num(g) + '\\% - ' + num(alpha * gK) + '\\% - ' + num((1 - alpha) * gL) + '\\% = ' + num(tfp) + '\\%$.',
        'Therefore TFP growth is ' + num(tfp) + '%.'
      ];
    } else {
      promptZh = '在增長會計（growth accounting）中，$g = \\alpha g_K + (1 - \\alpha) g_L + \\text{TFP}$，其中 $g$、$g_K$、$g_L$ 分別為實質 GDP、資本及勞動的增長率，$\\alpha$ 為資本份額，TFP 為全要素生產率增長。已知 ' + givenZh + '。求實質 GDP 的增長率 $g$（以百分比數字作答，四捨五入至 2 位小數）。';
      promptEn = 'In growth accounting, $g = \\alpha g_K + (1 - \\alpha) g_L + \\text{TFP}$, where $g$, $g_K$ and $g_L$ are the growth rates of real GDP, capital and labour, $\\alpha$ is the capital share, and TFP is total factor productivity growth. Given ' + givenEn + ', find the growth rate of real GDP $g$ (as a percentage number, 2 d.p.).';
      solutionZh = [
        '增長會計公式：$g = \\alpha g_K + (1 - \\alpha) g_L + \\text{TFP}$。',
        '$\\alpha g_K = ' + num(alpha) + ' \\times ' + gK + '\\% = ' + num(alpha * gK) + '\\%$。',
        '$(1 - \\alpha) g_L = ' + num(1 - alpha) + ' \\times ' + gL + '\\% = ' + num((1 - alpha) * gL) + '\\%$。',
        '$g = ' + num(alpha * gK) + '\\% + ' + num((1 - alpha) * gL) + '\\% + ' + num(tfp) + '\\% = ' + num(g) + '\\%$。',
        '因此實質 GDP 增長率 $g$ 為 ' + num(g) + '%。'
      ];
      solutionEn = [
        'The growth accounting formula is $g = \\alpha g_K + (1 - \\alpha) g_L + \\text{TFP}$.',
        '$\\alpha g_K = ' + num(alpha) + ' \\times ' + gK + '\\% = ' + num(alpha * gK) + '\\%$.',
        '$(1 - \\alpha) g_L = ' + num(1 - alpha) + ' \\times ' + gL + '\\% = ' + num((1 - alpha) * gL) + '\\%$.',
        '$g = ' + num(alpha * gK) + '\\% + ' + num((1 - alpha) * gL) + '\\% + ' + num(tfp) + '\\% = ' + num(g) + '\\%$.',
        'Therefore the growth rate of real GDP $g$ is ' + num(g) + '%.'
      ];
    }
    return {
      prompt: { zh: promptZh, en: promptEn },
      hint: {
        zh: '把已知的增長率代入增長會計公式，逐項相乘後加總或移項。',
        en: 'Substitute the given growth rates into the growth accounting formula, multiply each term and then add or rearrange.'
      },
      answer: answer,
      solution: { zh: solutionZh, en: solutionEn },
      math: { mode: 'ga_' + mode, alpha: alpha, gK: gK, gL: gL, tfp: tfp, g: g }
    };
  }

  /* ================= 註冊 ================= */

  EconData.registerType('regression', function (rng, o) {
    var level = levelOf(o);
    if (level === 1) return regressionPredict(rng);
    if (level === 2) return regressionSlope(rng);
    return regressionFit(rng);
  });

  EconData.registerType('npv', function (rng, o) {
    var level = levelOf(o);
    if (level === 1) return npvPv(rng);
    if (level === 2) return npvTwo(rng);
    return npvDecision(rng);
  });

  EconData.registerType('gini', function (rng, o) {
    var level = levelOf(o);
    if (level === 1) return giniSimple(rng);
    if (level === 2) return giniFour(rng);
    return giniCompare(rng);
  });

  EconData.registerType('data_read', function (rng, o) {
    var level = levelOf(o);
    if (level === 1) return dataShare(rng);
    if (level === 2) return dataChange(rng);
    return dataReal(rng);
  });

  EconData.registerType('growth_model', function (rng, o) {
    var level = levelOf(o);
    if (level === 1) return growthHarrodG(rng);
    if (level === 2) return growthHarrodS(rng);
    return growthAccounting(rng);
  });
})();
