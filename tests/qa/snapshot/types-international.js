/*
 * 經濟學園 · Econ Garden — 題型生成器：稅務、預算、匯率與國際收支
 * ------------------------------------------------------------------
 * 本檔只註冊以下 8 個題型（對應 docs/TYPE-CATALOG.md 第 5 節）：
 *   exchange_rate, ppp, balance_payments, fiscal_balance,
 *   tax_basic, tax_progressive, budget_personal, percentage
 *
 * 規則：
 *   - 所有隨機數只來自傳入的 rng（同一 seed 可重現）；
 *     不使用 Math.random、Date.now、eval、DOM 或網絡。
 *   - 金額一律寫出單位（港元 / 美元 / 百萬港元 / 億港元），
 *     選項只放數字，因此題幹必說明「答案的單位」。
 *   - 公式用 $...$ 包住；貨幣代號用 HKD / USD 等，避免裸 $ 被誤當 KaTeX。
 *   - 數字答案先四捨五入至 2 位小數；可能為負數的答案自行提供 choices。
 */
(function () {
  'use strict';

  var ED = window.EconData;
  var U = ED.util;

  /* ================= 共用格式與選項工具 ================= */

  function round2(n) { return U.round(n, 2); }

  // 放入 $...$ 數學式的數字：不加千位分隔
  function nz(n) { return String(round2(n)); }

  // 顯示用金額／數量：加千位分隔，去掉多餘小數
  function fmtNum(n) {
    var s = String(round2(n));
    var parts = s.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  // 固定 2 位小數（匯率、比率用）
  function f2(n) { return round2(n).toFixed(2); }

  // 原樣輸出（用於顯示精確的稅率／折扣因子，例如 0.125 不可寫成 0.13）
  function plain(x) { return String(x); }

  // 百分比顯示（例：7.33%）
  function pc(n) { return fmtNum(n) + '%'; }

  /*
   * 產生 4 個互不相同的數字選項（含正確答案）。
   * opt: { min, max, dp, step, percent }
   * answer 必須已四捨五入至 dp，否則會與選項對不上。
   */
  function makeChoices(rng, answer, opt) {
    opt = opt || {};
    var min = opt.min == null ? 0 : opt.min;
    var max = opt.max == null ? null : opt.max;
    var dp = opt.dp == null ? 2 : opt.dp;
    var step = opt.step;
    if (step == null) {
      if (opt.percent) {
        step = 0.5;
      } else {
        var a = Math.abs(answer);
        if (a >= 100000) step = 10000;
        else if (a >= 10000) step = 1000;
        else if (a >= 1000) step = 100;
        else if (a >= 100) step = 10;
        else if (a >= 10) step = 2;
        else if (a >= 1) step = 0.5;
        else step = 0.05;
      }
    }
    return U.numericChoices(rng, answer, {
      min: min,
      max: max,
      dp: dp,
      deltas: [step, -step, 2 * step, -2 * step, 5 * step, -5 * step]
    });
  }

  /* ================= 1. exchange_rate ================= */

  var FX_RATES = [
    { code: 'USD', zh: '美元', en: 'US dollar', enP: 'US dollars', rate: 7.8 },
    { code: 'EUR', zh: '歐元', en: 'euro', enP: 'euros', rate: 8.5 },
    { code: 'GBP', zh: '英鎊', en: 'pound sterling', enP: 'pounds sterling', rate: 10.0 },
    { code: 'CNY', zh: '人民幣', en: 'Chinese yuan', enP: 'Chinese yuan', rate: 1.1 },
    { code: 'AUD', zh: '澳元', en: 'Australian dollar', enP: 'Australian dollars', rate: 5.0 },
    { code: 'SGD', zh: '新加坡元', en: 'Singapore dollar', enP: 'Singapore dollars', rate: 5.8 },
    { code: 'CAD', zh: '加元', en: 'Canadian dollar', enP: 'Canadian dollars', rate: 5.7 },
    { code: 'CHF', zh: '瑞士法郎', en: 'Swiss franc', enP: 'Swiss francs', rate: 8.8 }
  ];

  ED.registerType('exchange_rate', function (rng, o) {
    var level = o.level || 1;

    /* ---- level 1：單向兌換（明確寫出「1 外幣 = X 港元」） ---- */
    if (level === 1) {
      var c = U.pick(rng, FX_RATES);
      var rate = c.rate;
      var toHkd = rng() < 0.6;
      var answer, promptZh, promptEn, solZh, solEn, math;

      if (toHkd) {
        var amountF = U.pick(rng, [10, 20, 25, 40, 50, 80, 100, 120, 150, 200, 250, 300, 400, 500]);
        answer = round2(amountF * rate);
        promptZh = '某銀行報價：1 ' + c.zh + ' = ' + f2(rate) + ' 港元（即以港元表示每 1 ' + c.zh +
          '的價格，其他因素不變）。某人持有 ' + fmtNum(amountF) + ' ' + c.zh + '，可兌換多少港元？答案以港元計，取 2 位小數。';
        promptEn = 'A bank quotes 1 ' + c.en + ' = ' + f2(rate) + ' HKD (that is, the price of 1 ' + c.en +
          ' in HKD, other things being constant). How many HKD can ' + fmtNum(amountF) + ' ' + c.enP +
          ' be exchanged for? Give your answer in HKD, 2 d.p.';
        solZh = [
          '報價為 1 ' + c.zh + ' = ' + f2(rate) + ' 港元。',
          '港元金額 = 外幣金額 × 匯率 $= ' + nz(amountF) + ' \\times ' + f2(rate) + ' = ' + nz(answer) + '$。',
          '因此可兌換 ' + fmtNum(answer) + ' 港元。'
        ];
        solEn = [
          'The quote is 1 ' + c.en + ' = ' + f2(rate) + ' HKD.',
          'HKD amount = foreign-currency amount × exchange rate $= ' + nz(amountF) + ' \\times ' + f2(rate) + ' = ' + nz(answer) + '$.',
          'So ' + fmtNum(answer) + ' HKD can be obtained.'
        ];
        math = { mode: 'toHKD', code: c.code, rate: rate, amount: amountF };
      } else {
        var foreignUnits = U.pick(rng, [100, 120, 150, 200, 250, 300, 350, 400, 500, 600, 750, 800]);
        var hkdAmount = round2(foreignUnits * rate);
        answer = foreignUnits;
        promptZh = '某銀行報價：1 ' + c.zh + ' = ' + f2(rate) + ' 港元（即以港元表示每 1 ' + c.zh +
          '的價格，其他因素不變）。某人持有 ' + fmtNum(hkdAmount) + ' 港元，可兌換多少' + c.zh +
          '？答案以' + c.zh + '計，取 2 位小數。';
        promptEn = 'A bank quotes 1 ' + c.en + ' = ' + f2(rate) + ' HKD (that is, the price of 1 ' + c.en +
          ' in HKD, other things being constant). How many ' + c.enP + ' can ' + fmtNum(hkdAmount) +
          ' HKD be exchanged for? Give your answer in ' + c.enP + ', 2 d.p.';
        solZh = [
          '報價為 1 ' + c.zh + ' = ' + f2(rate) + ' 港元。',
          '外幣金額 = 港元金額 ÷ 匯率 $= ' + nz(hkdAmount) + ' \\div ' + f2(rate) + ' = ' + nz(answer) + '$。',
          '因此可兌換 ' + fmtNum(answer) + ' ' + c.zh + '。'
        ];
        solEn = [
          'The quote is 1 ' + c.en + ' = ' + f2(rate) + ' HKD.',
          'Foreign-currency amount = HKD amount ÷ exchange rate $= ' +
            nz(hkdAmount) + ' \\div ' + f2(rate) + ' = ' + nz(answer) + '$.',
          'So ' + fmtNum(answer) + ' ' + c.enP + ' can be obtained.'
        ];
        math = { mode: 'toForeign', code: c.code, rate: rate, amount: hkdAmount };
      }

      return {
        prompt: { zh: promptZh, en: promptEn },
        hint: {
          zh: '港元金額 = 外幣金額 × 匯率；由港元換回外幣時，外幣金額 = 港元金額 ÷ 匯率。',
          en: 'HKD amount = foreign-currency amount × exchange rate; in the reverse direction, foreign-currency amount = HKD amount ÷ exchange rate.'
        },
        answer: answer,
        choices: makeChoices(rng, answer, { min: 0, max: 100000 }),
        solution: { zh: solZh, en: solEn },
        math: math
      };
    }

    /* ---- level 2：外幣兌港元的升值／貶值百分比 ---- */
    if (level === 2) {
      var c2 = U.pick(rng, FX_RATES);
      var base = c2.rate;
      var pert = U.pick(rng, [1, 1.5, 2, 2.5, 3, 4, 5, -1, -1.5, -2, -2.5, -3, -4, -5]);
      var newRate = round2(base * (1 + pert / 100));
      if (newRate === base) newRate = round2(base + (pert > 0 ? 0.02 : -0.02));
      var up = newRate > base;
      var diff = round2(Math.abs(newRate - base));
      var answer2 = round2(Math.abs(newRate - base) / base * 100);
      var zh2 = [
        '舊匯率：1 ' + c2.zh + ' = ' + f2(base) + ' 港元；新匯率：1 ' + c2.zh + ' = ' + f2(newRate) + ' 港元。',
        '匯率變動 $= ' + f2(newRate) + ' - ' + f2(base) + ' = ' + f2(diff) + '$ 港元。',
        (up ? '升值' : '貶值') + '百分比 $= \\frac{' + f2(diff) + '}{' + f2(base) + '} \\times 100\\% = ' + f2(answer2) + '\\%$。',
        '因此' + c2.zh + '兌港元' + (up ? '升值' : '貶值') + ' ' + pc(answer2) + '。'
      ];
      var en2 = [
        'Old rate: 1 ' + c2.en + ' = ' + f2(base) + ' HKD; new rate: 1 ' + c2.en + ' = ' + f2(newRate) + ' HKD.',
        'Change in the rate $= ' + f2(newRate) + ' - ' + f2(base) + ' = ' + f2(diff) + '$ HKD.',
        'Percentage ' + (up ? 'appreciation' : 'depreciation') + ' $= \\frac{' + f2(diff) + '}{' + f2(base) + '} \\times 100\\% = ' + f2(answer2) + '\\%$.',
        'So the ' + c2.en + ' ' + (up ? 'appreciated' : 'depreciated') + ' by ' + pc(answer2) + ' against the HKD.'
      ];
      return {
        prompt: {
          zh: '以港元表示，1 ' + c2.zh + '的價格由 ' + f2(base) + ' 港元' + (up ? '上升' : '下跌') +
            '至 ' + f2(newRate) + ' 港元（其他因素不變）。求' + c2.zh + '兌港元' + (up ? '升值' : '貶值') +
            '百分比。答案以百分比（%）表示，取 2 位小數。',
          en: 'Measured in HKD, the price of 1 ' + c2.en + ' ' + (up ? 'rises' : 'falls') + ' from ' +
            f2(base) + ' HKD to ' + f2(newRate) + ' HKD (other things being constant). Find the percentage ' +
            (up ? 'appreciation' : 'depreciation') + ' of the ' + c2.en + ' against the HKD. Give your answer in %, 2 d.p.'
        },
        hint: {
          zh: '升值／貶值百分比 = (新匯率 − 舊匯率) ÷ 舊匯率 × 100%，取絕對值。',
          en: 'Percentage appreciation/depreciation = (new rate − old rate) ÷ old rate × 100%, take the absolute value.'
        },
        answer: answer2,
        choices: makeChoices(rng, answer2, { min: 0, max: 100, percent: true }),
        solution: { zh: zh2, en: en2 },
        math: { mode: 'change', code: c2.code, oldRate: base, newRate: newRate }
      };
    }

    /* ---- level 3：交叉匯率（把兩種報價換成同一基礎貨幣，再相除） ---- */
    var useUsd = rng() < 0.6;
    var answer3, zh3, en3, promptZh3, promptEn3, math3;

    if (useUsd) {
      var usdHkd = U.pick(rng, [7.5, 7.75, 7.8, 8.0]);
      var usdJpy = U.pick(rng, [105, 110, 117, 120, 130, 140, 150]);
      answer3 = round2(usdJpy / usdHkd);
      promptZh3 = '已知 1 美元 = ' + f2(usdHkd) + ' 港元，且 1 美元 = ' + fmtNum(usdJpy) +
        ' 日元（其他因素不變）。求交叉匯率：以日元表示，1 港元可兌換多少日元？答案以日元計，取 2 位小數。';
      promptEn3 = 'Given that 1 US dollar = ' + f2(usdHkd) + ' HKD and 1 US dollar = ' + fmtNum(usdJpy) +
        ' Japanese yen (other things being constant), find the cross rate: how many Japanese yen can 1 HKD buy? Give your answer in Japanese yen, 2 d.p.';
      zh3 = [
        '兩項報價都以美元為基礎：' + f2(usdHkd) + ' 港元 = 1 美元 = ' + fmtNum(usdJpy) + ' 日元。',
        '所以 ' + f2(usdHkd) + ' 港元可兌換 ' + fmtNum(usdJpy) + ' 日元。',
        '1 港元 $= ' + nz(usdJpy) + ' \\div ' + f2(usdHkd) + ' = ' + nz(answer3) + '$ 日元。',
        '因此 1 港元可兌換 ' + f2(answer3) + ' 日元。'
      ];
      en3 = [
        'Both quotes use the US dollar as the base: HKD ' + f2(usdHkd) + ' = USD 1 = ' + fmtNum(usdJpy) + ' Japanese yen.',
        'So HKD ' + f2(usdHkd) + ' can buy ' + fmtNum(usdJpy) + ' Japanese yen.',
        '1 HKD $= ' + nz(usdJpy) + ' \\div ' + f2(usdHkd) + ' = ' + nz(answer3) + '$ Japanese yen.',
        'So 1 HKD can buy ' + f2(answer3) + ' Japanese yen.'
      ];
      math3 = { mode: 'crossUSD', base: usdHkd, quote: usdJpy };
    } else {
      var eurHkd = U.pick(rng, [8.4, 8.5, 8.6, 9.0]);
      var eurUsd = U.pick(rng, [1.05, 1.1, 1.15, 1.2]);
      answer3 = round2(eurHkd / eurUsd);
      promptZh3 = '已知 1 歐元 = ' + f2(eurHkd) + ' 港元，且 1 歐元 = ' + f2(eurUsd) +
        ' 美元（其他因素不變）。求交叉匯率：以港元表示，1 美元可兌換多少港元？答案以港元計，取 2 位小數。';
      promptEn3 = 'Given that 1 euro = ' + f2(eurHkd) + ' HKD and 1 euro = ' + f2(eurUsd) +
        ' US dollar (other things being constant), find the cross rate: how many HKD does 1 US dollar buy? Give your answer in HKD, 2 d.p.';
      zh3 = [
        '兩項報價都以歐元為基礎：' + f2(eurHkd) + ' 港元 = 1 歐元 = ' + f2(eurUsd) + ' 美元。',
        '所以 ' + f2(eurUsd) + ' 美元可兌換 ' + f2(eurHkd) + ' 港元。',
        '1 美元 $= ' + nz(eurHkd) + ' \\div ' + f2(eurUsd) + ' = ' + nz(answer3) + '$ 港元。',
        '因此 1 美元可兌換 ' + f2(answer3) + ' 港元。'
      ];
      en3 = [
        'Both quotes use the euro as the base: HKD ' + f2(eurHkd) + ' = EUR 1 = USD ' + f2(eurUsd) + '.',
        'So USD ' + f2(eurUsd) + ' can buy HKD ' + f2(eurHkd) + '.',
        '1 USD $= ' + nz(eurHkd) + ' \\div ' + f2(eurUsd) + ' = ' + nz(answer3) + '$ HKD.',
        'So 1 USD can buy ' + f2(answer3) + ' HKD.'
      ];
      math3 = { mode: 'crossEUR', base: eurHkd, quote: eurUsd };
    }

    return {
      prompt: { zh: promptZh3, en: promptEn3 },
      hint: {
        zh: '交叉匯率：先把兩種貨幣都換算成同一種基礎貨幣（例如美元），再相除。',
        en: 'Cross rate: express both currencies in the same base currency (e.g. the US dollar), then divide.'
      },
      answer: answer3,
      choices: makeChoices(rng, answer3, { min: 0, max: 1000, step: 0.5 }),
      solution: { zh: zh3, en: en3 },
      math: math3
    };
  });

  /* ================= 2. ppp ================= */

  var PPP_COUNTRIES = [
    {
      zh: '內地', en: 'the Mainland', curZh: '人民幣', curEn: 'Chinese yuan (CNY)', curEnP: 'Chinese yuan (CNY)',
      prices: [2000, 2500, 3000, 4000, 5000], rates: [1.2, 1.5, 2]
    },
    {
      zh: '日本', en: 'Japan', curZh: '日元', curEn: 'Japanese yen (JPY)', curEnP: 'Japanese yen (JPY)',
      prices: [40000, 50000, 60000, 80000], rates: [0.05, 0.06, 0.07, 0.08]
    },
    {
      zh: '泰國', en: 'Thailand', curZh: '泰銖', curEn: 'Thai baht (THB)', curEnP: 'Thai baht (THB)',
      prices: [8000, 10000, 12000, 15000, 20000], rates: [0.2, 0.25, 0.3]
    },
    {
      zh: '英國', en: 'the United Kingdom', curZh: '英鎊', curEn: 'pound sterling (GBP)', curEnP: 'pounds sterling (GBP)',
      prices: [300, 400, 500], rates: [9, 10, 11]
    },
    {
      zh: '美國', en: 'the United States', curZh: '美元', curEn: 'US dollar (USD)', curEnP: 'US dollars (USD)',
      prices: [400, 500, 600], rates: [7.5, 7.8, 8]
    }
  ];

  ED.registerType('ppp', function (rng, o) {
    var level = o.level || 1;

    /* ---- level 1：由同一籃子商品價格求 PPP 匯率 ---- */
    if (level === 1) {
      var c = U.pick(rng, PPP_COUNTRIES);
      var foreignPrice = U.pick(rng, c.prices);
      var ppp = U.pick(rng, c.rates);
      var domesticPrice = round2(foreignPrice * ppp);
      var answer = round2(domesticPrice / foreignPrice);
      var step = answer < 0.2 ? 0.01 : answer < 1 ? 0.05 : answer < 3 ? 0.1 : 0.5;

      return {
        prompt: {
          zh: '同一籃子商品在香港售 ' + fmtNum(domesticPrice) + ' 港元，在' + c.zh + '售 ' +
            fmtNum(foreignPrice) + ' ' + c.curZh + '（同一時期、同一籃子，其他因素不變）。' +
            '求購買力平價（PPP）匯率：以港元表示 1 ' + c.curZh + '的價格（即 1 ' + c.curZh +
            '兌多少港元）。答案以港元計，取 2 位小數。',
          en: 'The same basket of goods costs ' + fmtNum(domesticPrice) + ' HKD in Hong Kong and ' +
            fmtNum(foreignPrice) + ' ' + c.curEnP + ' in ' + c.en + ' (same period, same basket, other things being constant). ' +
            'Find the purchasing power parity (PPP) exchange rate: the price of 1 ' + c.curEn +
            ' expressed in HKD. Give your answer in HKD, 2 d.p.'
        },
        hint: {
          zh: 'PPP 匯率 = 本國物價 ÷ 外國物價（同一籃子商品）。',
          en: 'PPP exchange rate = domestic price ÷ foreign price for the same basket of goods.'
        },
        answer: answer,
        choices: makeChoices(rng, answer, { min: 0, max: 100, step: step }),
        solution: {
          zh: [
            'PPP 匯率 = 本國物價 ÷ 外國物價（同一籃子商品）。',
            'PPP 匯率 $= ' + nz(domesticPrice) + ' \\div ' + nz(foreignPrice) + ' = ' + nz(answer) + '$ 港元。',
            '因此 PPP 匯率為 1 ' + c.curZh + ' = ' + f2(answer) + ' 港元。'
          ],
          en: [
            'PPP exchange rate = domestic price ÷ foreign price for the same basket of goods.',
            'PPP rate $= ' + nz(domesticPrice) + ' \\div ' + nz(foreignPrice) + ' = ' + nz(answer) + '$ HKD.',
            'So the PPP rate is 1 ' + c.curEn + ' = ' + f2(answer) + ' HKD.'
          ]
        },
        math: { mode: 'pppRate', domestic: domesticPrice, foreign: foreignPrice, ppp: ppp }
      };
    }

    /* ---- level 2：比較名義匯率與 PPP 匯率，判斷外幣高估／低估 ---- */
    if (level === 2) {
      var pool = PPP_COUNTRIES.filter(function (x) {
        return x.rates[x.rates.length - 1] >= 1;
      });
      var c2 = U.pick(rng, pool);
      var foreignPrice2 = U.pick(rng, c2.prices);
      var ppp2 = U.pick(rng, c2.rates);
      var domesticPrice2 = round2(foreignPrice2 * ppp2);
      var dev = U.pick(rng, [8, 10, 12, 15, 20, -8, -10, -12, -15, -20]);
      var nominal = round2(ppp2 * (1 + dev / 100));
      if (nominal === ppp2) { nominal = round2(ppp2 + (dev > 0 ? 0.1 : -0.1)); }
      var over = nominal > ppp2;
      var outcome = over ? 'over' : 'under';
      var labelZh = over ? '被高估' : '被低估';
      var labelEn = over ? 'overvalued' : 'undervalued';

      var labels = U.labelsOf([
        { id: 'over', zh: '外幣被高估', en: 'Overvalued' },
        { id: 'under', zh: '外幣被低估', en: 'Undervalued' },
        { id: 'parity', zh: '兩者大致平價', en: 'At parity' }
      ]);

      return {
        prompt: {
          zh: '同一籃子商品在香港售 ' + fmtNum(domesticPrice2) + ' 港元，在' + c2.zh + '售 ' +
            fmtNum(foreignPrice2) + ' ' + c2.curZh + '，因此 PPP 匯率為 1 ' + c2.curZh + ' = ' +
            f2(ppp2) + ' 港元。市場名義匯率則為 1 ' + c2.curZh + ' = ' + f2(nominal) +
            ' 港元。按購買力平價判斷，' + c2.curZh + '相對港元被高估、被低估，還是大致平價？',
          en: 'The same basket of goods costs ' + fmtNum(domesticPrice2) + ' HKD in Hong Kong and ' +
            fmtNum(foreignPrice2) + ' ' + c2.curEnP + ' in ' + c2.en + ', so the PPP rate is 1 ' + c2.curEn +
            ' = ' + f2(ppp2) + ' HKD. The market nominal rate is 1 ' + c2.curEn + ' = ' + f2(nominal) +
            ' HKD. According to purchasing power parity, is the ' + c2.curEn +
            ' overvalued, undervalued, or at parity against the HKD?'
        },
        hint: {
          zh: '比較名義匯率與 PPP 匯率：若以港元表示的實際外幣價格高於 PPP 價格，外幣便被高估。',
          en: 'Compare the nominal rate with the PPP rate: if the actual foreign-currency price in HKD is above its PPP price, the foreign currency is overvalued.'
        },
        answer: outcome,
        choices: U.shuffle(rng, ['over', 'under', 'parity']),
        choiceLabels: labels,
        solution: {
          zh: [
            'PPP 匯率為 1 ' + c2.curZh + ' = ' + f2(ppp2) + ' 港元；名義匯率為 1 ' + c2.curZh + ' = ' + f2(nominal) + ' 港元。',
            '名義匯率' + (over ? '高於' : '低於') + ' PPP 匯率，表示以港元計算的外幣市場價格' + (over ? '高於' : '低於') + ' PPP 價格。',
            '因此' + c2.curZh + '相對港元' + labelZh + '。',
            '答案：' + c2.curZh + labelZh + '。'
          ],
          en: [
            'The PPP rate is 1 ' + c2.curEn + ' = ' + f2(ppp2) + ' HKD; the nominal rate is 1 ' + c2.curEn + ' = ' + f2(nominal) + ' HKD.',
            'The nominal rate is ' + (over ? 'above' : 'below') + ' the PPP rate, so the market price of the foreign currency in HKD is ' + (over ? 'above' : 'below') + ' its PPP price.',
            'Therefore the ' + c2.curEn + ' is ' + labelEn + ' against the HKD.',
            'Answer: the ' + c2.curEn + ' is ' + labelEn + ' against the HKD.'
          ]
        },
        math: { mode: 'pppJudge', ppp: ppp2, nominal: nominal, domestic: domesticPrice2, foreign: foreignPrice2 }
      };
    }

    /* ---- level 3：實質匯率 R = E × (Pf / Pd) ---- */
    var E = U.pick(rng, [7.5, 7.75, 7.8, 8.0, 8.5, 10.0]);
    var Pf = U.pick(rng, [105, 110, 120, 125, 130, 150]);
    var Pd = U.pick(rng, [100, 105, 110, 120, 125]);
    if (Pf === Pd) { Pf = Pd === 150 ? 130 : Pf + 10; }
    var answer3 = round2(E * Pf / Pd);

    return {
      prompt: {
        zh: '名義匯率為 1 美元 = ' + f2(E) + ' 港元。美國的物價指數為 ' + Pf + '，香港的物價指數為 ' +
          Pd + '（兩者以同一年為基年，基年指數 = 100）。按實質匯率公式 $R = E \\times \\frac{P_f}{P_d}$ ' +
          '計算實質匯率（以港元表示的美元實質價格）R。答案取 2 位小數。',
        en: 'The nominal exchange rate is 1 US dollar = ' + f2(E) + ' HKD. The US price index is ' + Pf +
          ' and the Hong Kong price index is ' + Pd + ' (both use the same base year, with the base-year index = 100). ' +
          'Using the real exchange rate formula $R = E \\times \\frac{P_f}{P_d}$, compute the real exchange rate R ' +
          '(the real price of the US dollar in HKD). Give your answer to 2 d.p.'
      },
      hint: {
        zh: '直接代入 R = E × (Pf ÷ Pd)：E 是名義匯率，Pf 是外國物價指數，Pd 是本國物價指數。',
        en: 'Substitute into R = E × (Pf ÷ Pd): E is the nominal rate, Pf the foreign price index and Pd the domestic price index.'
      },
      answer: answer3,
      choices: makeChoices(rng, answer3, { min: 0, max: 100, step: 0.2 }),
      solution: {
        zh: [
          '名義匯率 E = ' + f2(E) + ' 港元；外國物價指數 Pf = ' + Pf + '；本國物價指數 Pd = ' + Pd + '。',
          '實質匯率 $R = ' + f2(E) + ' \\times \\frac{' + Pf + '}{' + Pd + '} = ' + nz(answer3) + '$。',
          '因此實質匯率為 ' + f2(answer3) + '（以港元表示的美元實質價格）。'
        ],
        en: [
          'Nominal rate E = ' + f2(E) + ' HKD; foreign price index Pf = ' + Pf + '; domestic price index Pd = ' + Pd + '.',
          'Real exchange rate $R = ' + f2(E) + ' \\times \\frac{' + Pf + '}{' + Pd + '} = ' + nz(answer3) + '$.',
          'So the real exchange rate is ' + f2(answer3) + ' (the real price of the US dollar in HKD).'
        ]
      },
      math: { mode: 'realRate', nominal: E, foreignIndex: Pf, domesticIndex: Pd }
    };
  });

  /* ================= 3. balance_payments ================= */

  function bopChoices(rng, answer) {
    return makeChoices(rng, answer, { min: -100000, max: 100000 });
  }

  ED.registerType('balance_payments', function (rng, o) {
    var level = o.level || 1;

    /* ---- level 1：貨物及服務淨出口 ---- */
    if (level === 1) {
      var gx = U.randInt(rng, 500, 900);
      var gm = U.randInt(rng, 400, 800);
      var sx = U.randInt(rng, 150, 400);
      var sm = U.randInt(rng, 150, 400);
      var answer = gx - gm + sx - sm;
      while (answer === 0) { gx += 10; answer = gx - gm + sx - sm; }

      return {
        prompt: {
          zh: '某經濟體的對外貿易數據如下（以百萬港元為單位，其他因素不變）：貨物出口 ' + fmtNum(gx) +
            '；貨物進口 ' + fmtNum(gm) + '；服務出口 ' + fmtNum(sx) + '；服務進口 ' + fmtNum(sm) +
            '。求貨物及服務淨出口（即經常帳中貨物與服務的部分）。答案以百萬港元計：正數代表淨出口，負數代表淨進口。',
          en: 'An economy has the following external trade figures (in millions of HKD, other things being constant): ' +
            'goods exports ' + fmtNum(gx) + '; goods imports ' + fmtNum(gm) + '; services exports ' + fmtNum(sx) +
            '; services imports ' + fmtNum(sm) + '. Find net exports of goods and services (the goods and services part of the current account). ' +
            'Answer in millions of HKD: a positive number means net exports, a negative number means net imports.'
        },
        hint: {
          zh: '貨物及服務淨出口 = 貨物出口 − 貨物進口 + 服務出口 − 服務進口。',
          en: 'Net exports of goods and services = goods exports − goods imports + services exports − services imports.'
        },
        answer: answer,
        choices: bopChoices(rng, answer),
        solution: {
          zh: [
            '把貨物與服務合併計算：淨出口 = 貨物出口 − 貨物進口 + 服務出口 − 服務進口。',
            '淨出口 $= ' + nz(gx) + ' - ' + nz(gm) + ' + ' + nz(sx) + ' - ' + nz(sm) + ' = ' + nz(answer) + '$ 百萬港元。',
            '因此貨物及服務淨出口為 ' + fmtNum(answer) + ' 百萬港元。'
          ],
          en: [
            'Combine goods and services: net exports = goods exports − goods imports + services exports − services imports.',
            'Net exports $= ' + nz(gx) + ' - ' + nz(gm) + ' + ' + nz(sx) + ' - ' + nz(sm) + ' = ' + nz(answer) + '$ million HKD.',
            'So net exports of goods and services are ' + fmtNum(answer) + ' million HKD.'
          ]
        },
        math: { mode: 'goodsServices', goodsX: gx, goodsM: gm, servicesX: sx, servicesM: sm }
      };
    }

    /* ---- level 2：完整經常帳（加收入淨額與轉移淨額） ---- */
    if (level === 2) {
      var gx2 = U.randInt(rng, 500, 900);
      var gm2 = U.randInt(rng, 400, 800);
      var sx2 = U.randInt(rng, 150, 400);
      var sm2 = U.randInt(rng, 150, 400);
      var inc2 = U.randInt(rng, -150, 250);
      var tr2 = U.randInt(rng, -100, 150);
      var answer2 = gx2 - gm2 + sx2 - sm2 + inc2 + tr2;
      while (answer2 === 0) { inc2 += 10; answer2 = gx2 - gm2 + sx2 - sm2 + inc2 + tr2; }

      return {
        prompt: {
          zh: '某經濟體的國際收支數據如下（以百萬港元為單位，其他因素不變）：貨物出口 ' + fmtNum(gx2) +
            '；貨物進口 ' + fmtNum(gm2) + '；服務出口 ' + fmtNum(sx2) + '；服務進口 ' + fmtNum(sm2) +
            '；對外要素收入淨額 ' + fmtNum(inc2) + '；對外轉移淨額 ' + fmtNum(tr2) +
            '（收入及轉移的淨額 = 流入 − 流出，負數代表流出多於流入）。求經常帳餘額。' +
            '答案以百萬港元計：正數代表經常帳盈餘，負數代表赤字。',
          en: 'An economy has the following balance of payments data (in millions of HKD, other things being constant): ' +
            'goods exports ' + fmtNum(gx2) + '; goods imports ' + fmtNum(gm2) + '; services exports ' + fmtNum(sx2) +
            '; services imports ' + fmtNum(sm2) + '; net factor income from abroad ' + fmtNum(inc2) +
            '; net transfers from abroad ' + fmtNum(tr2) +
            ' (net = inflows − outflows; a negative number means outflows exceed inflows). ' +
            'Find the current account balance. Answer in millions of HKD: a positive number means a current account surplus, a negative number means a deficit.'
        },
        hint: {
          zh: '經常帳 = 貨物出口 − 貨物進口 + 服務出口 − 服務進口 + 收入淨額 + 轉移淨額。',
          en: 'Current account = goods exports − goods imports + services exports − services imports + net income + net transfers.'
        },
        answer: answer2,
        choices: bopChoices(rng, answer2),
        solution: {
          zh: [
            '經常帳餘額 = 貨物出口 − 貨物進口 + 服務出口 − 服務進口 + 收入淨額 + 轉移淨額。',
            '經常帳餘額 $= ' + nz(gx2) + ' - ' + nz(gm2) + ' + ' + nz(sx2) + ' - ' + nz(sm2) + ' + (' + nz(inc2) + ') + (' + nz(tr2) + ') = ' + nz(answer2) + '$ 百萬港元。',
            '因此經常帳餘額為 ' + fmtNum(answer2) + ' 百萬港元。'
          ],
          en: [
            'Current account balance = goods exports − goods imports + services exports − services imports + net income + net transfers.',
            'Current account balance $= ' + nz(gx2) + ' - ' + nz(gm2) + ' + ' + nz(sx2) + ' - ' + nz(sm2) + ' + (' + nz(inc2) + ') + (' + nz(tr2) + ') = ' + nz(answer2) + '$ million HKD.',
            'So the current account balance is ' + fmtNum(answer2) + ' million HKD.'
          ]
        },
        math: { mode: 'currentAccount', goodsX: gx2, goodsM: gm2, servicesX: sx2, servicesM: sm2, income: inc2, transfers: tr2 }
      };
    }

    /* ---- level 3：簡化模型下求資本帳餘額（經常帳 + 資本帳 = 0） ---- */
    var gx3 = U.randInt(rng, 500, 900);
    var gm3 = U.randInt(rng, 400, 800);
    var sxNet3 = U.randInt(rng, -150, 300);
    var inc3 = U.randInt(rng, -150, 250);
    var tr3 = U.randInt(rng, -100, 150);
    var ca = gx3 - gm3 + sxNet3 + inc3 + tr3;
    while (ca === 0) { inc3 += 10; ca = gx3 - gm3 + sxNet3 + inc3 + tr3; }
    var answer3 = -ca;

    return {
      prompt: {
        zh: '在簡化模型中，經常帳餘額 + 資本帳餘額 = 0，且資本帳餘額以正數表示淨資本流入、負數表示淨資本流出。' +
          '某經濟體的數據如下（以百萬港元為單位，其他因素不變）：貨物出口 ' + fmtNum(gx3) + '；貨物進口 ' +
          fmtNum(gm3) + '；服務淨出口 ' + fmtNum(sxNet3) + '；對外要素收入淨額 ' + fmtNum(inc3) +
          '；對外轉移淨額 ' + fmtNum(tr3) + '。求資本帳餘額。答案以百萬港元計。',
        en: 'In a simplified model, current account balance + capital account balance = 0, where a positive capital account balance means net capital inflow and a negative one means net capital outflow. ' +
          'An economy has the following data (in millions of HKD, other things being constant): goods exports ' + fmtNum(gx3) +
          '; goods imports ' + fmtNum(gm3) + '; net exports of services ' + fmtNum(sxNet3) +
          '; net factor income from abroad ' + fmtNum(inc3) + '; net transfers from abroad ' + fmtNum(tr3) +
          '. Find the capital account balance. Answer in millions of HKD.'
      },
      hint: {
        zh: '先算經常帳餘額，再用「經常帳 + 資本帳 = 0」求資本帳餘額 = −經常帳餘額。',
        en: 'First compute the current account balance, then use current account + capital account = 0 to get capital account = −current account.'
      },
      answer: answer3,
      choices: bopChoices(rng, answer3),
      solution: {
        zh: [
          '經常帳餘額 = 貨物出口 − 貨物進口 + 服務淨出口 + 收入淨額 + 轉移淨額。',
          '經常帳餘額 $= ' + nz(gx3) + ' - ' + nz(gm3) + ' + (' + nz(sxNet3) + ') + (' + nz(inc3) + ') + (' + nz(tr3) + ') = ' + nz(ca) + '$ 百萬港元。',
          '由 經常帳餘額 + 資本帳餘額 = 0，得 資本帳餘額 = −經常帳餘額。',
          '資本帳餘額 $= -(' + nz(ca) + ') = ' + nz(answer3) + '$ 百萬港元。',
          '因此資本帳餘額為 ' + fmtNum(answer3) + ' 百萬港元。'
        ],
        en: [
          'Current account balance = goods exports − goods imports + net services exports + net income + net transfers.',
          'Current account balance $= ' + nz(gx3) + ' - ' + nz(gm3) + ' + (' + nz(sxNet3) + ') + (' + nz(inc3) + ') + (' + nz(tr3) + ') = ' + nz(ca) + '$ million HKD.',
          'Since current account balance + capital account balance = 0, capital account balance = −current account balance.',
          'Capital account balance $= -(' + nz(ca) + ') = ' + nz(answer3) + '$ million HKD.',
          'So the capital account balance is ' + fmtNum(answer3) + ' million HKD.'
        ]
      },
      math: { mode: 'capitalAccount', goodsX: gx3, goodsM: gm3, servicesNet: sxNet3, income: inc3, transfers: tr3 }
    };
  });

  /* ================= 4. fiscal_balance ================= */

  function fiscalChoices(rng, answer, step) {
    return makeChoices(rng, answer, { min: -100000, max: 100000, step: step });
  }

  ED.registerType('fiscal_balance', function (rng, o) {
    var level = o.level || 1;

    /* ---- level 1：整體財政餘額 = 收入 − 支出 ---- */
    if (level === 1) {
      var revenue = U.randInt(rng, 450, 700) * 10;
      var gap = (rng() < 0.5 ? -1 : 1) * U.randInt(rng, 100, 800);
      var spending = revenue - gap;
      var answer = gap;

      return {
        prompt: {
          zh: '某政府年度的財政數據如下（以億港元為單位，其他因素不變）：政府收入 ' + fmtNum(revenue) +
            ' 億；政府支出 ' + fmtNum(spending) + ' 億。求財政盈餘或赤字（盈餘以正數表示，赤字以負數表示）。答案以億港元計。',
          en: 'A government\'s annual figures are as follows (in units of HKD 100 million, other things being constant): ' +
            'government revenue ' + fmtNum(revenue) + '; government expenditure ' + fmtNum(spending) +
            '. Find the budget surplus or deficit (a positive number means a surplus, a negative number means a deficit). ' +
            'Answer in units of HKD 100 million.'
        },
        hint: {
          zh: '財政餘額 = 政府收入 − 政府支出；收入高於支出為盈餘（正數），低於支出為赤字（負數）。',
          en: 'Budget balance = government revenue − government expenditure; revenue above expenditure is a surplus (positive), below is a deficit (negative).'
        },
        answer: answer,
        choices: fiscalChoices(rng, answer, 10),
        solution: {
          zh: [
            '財政餘額 = 政府收入 − 政府支出。',
            '財政餘額 $= ' + nz(revenue) + ' - ' + nz(spending) + ' = ' + nz(answer) + '$ 億港元。',
            '因此錄得' + (answer > 0 ? '盈餘 ' : '赤字 ') + fmtNum(Math.abs(answer)) + ' 億港元（以' +
              (answer > 0 ? '正數' : '負數') + '表示）。'
          ],
          en: [
            'Budget balance = government revenue − government expenditure.',
            'Budget balance $= ' + nz(revenue) + ' - ' + nz(spending) + ' = ' + nz(answer) + '$ units of HKD 100 million.',
            'So there is a ' + (answer > 0 ? 'surplus' : 'deficit') + ' of ' + fmtNum(Math.abs(answer)) +
              ' units of HKD 100 million (shown as a ' + (answer > 0 ? 'positive' : 'negative') + ' number).'
          ]
        },
        math: { mode: 'overall', revenue: revenue, spending: spending }
      };
    }

    /* ---- level 2：基本盈餘 = 整體餘額 + 利息支出 ---- */
    if (level === 2) {
      var revenue2 = U.randInt(rng, 500, 750) * 10;
      var primary2 = (rng() < 0.5 ? -1 : 1) * U.randInt(rng, 100, 600);
      var nonInterest = revenue2 - primary2;
      var interest = U.randInt(rng, 15, 40) * 10;
      var overall = revenue2 - nonInterest - interest;
      var answer2 = primary2;

      return {
        prompt: {
          zh: '某政府年度的財政數據如下（以億港元為單位，其他因素不變）：政府總收入 ' + fmtNum(revenue2) +
            ' 億；非利息支出 ' + fmtNum(nonInterest) + ' 億；利息支出 ' + fmtNum(interest) +
            ' 億。先求整體財政餘額（= 收入 − 總支出，總支出 = 非利息支出 + 利息支出），再求基本盈餘（= 整體餘額 + 利息支出）。' +
            '求基本盈餘（盈餘以正數、赤字以負數表示），答案以億港元計。',
          en: 'A government\'s annual figures are as follows (in units of HKD 100 million, other things being constant): ' +
            'total revenue ' + fmtNum(revenue2) + '; non-interest expenditure ' + fmtNum(nonInterest) +
            '; interest payments ' + fmtNum(interest) +
            '. First compute the overall budget balance (= revenue − total expenditure, where total expenditure = non-interest expenditure + interest payments), ' +
            'then the primary surplus (= overall balance + interest payments). Find the primary surplus (positive for a surplus, negative for a deficit) in units of HKD 100 million.'
        },
        hint: {
          zh: '先加總支出求整體餘額，再把利息支出加回：基本盈餘 = 整體餘額 + 利息支出。',
          en: 'Add up total expenditure to get the overall balance, then add interest payments back: primary surplus = overall balance + interest payments.'
        },
        answer: answer2,
        choices: fiscalChoices(rng, answer2, 10),
        solution: {
          zh: [
            '總支出 = 非利息支出 + 利息支出 $= ' + nz(nonInterest) + ' + ' + nz(interest) + ' = ' + nz(nonInterest + interest) + '$ 億港元。',
            '整體財政餘額 = 收入 − 總支出 $= ' + nz(revenue2) + ' - ' + nz(nonInterest + interest) + ' = ' + nz(overall) + '$ 億港元。',
            '基本盈餘 = 整體餘額 + 利息支出 $= ' + nz(overall) + ' + ' + nz(interest) + ' = ' + nz(primary2) + '$ 億港元。',
            '因此基本盈餘為 ' + fmtNum(primary2) + ' 億港元（' + (primary2 > 0 ? '盈餘' : '赤字') + '）。'
          ],
          en: [
            'Total expenditure = non-interest expenditure + interest payments $= ' + nz(nonInterest) + ' + ' + nz(interest) + ' = ' + nz(nonInterest + interest) + '$ units of HKD 100 million.',
            'Overall budget balance = revenue − total expenditure $= ' + nz(revenue2) + ' - ' + nz(nonInterest + interest) + ' = ' + nz(overall) + '$ units of HKD 100 million.',
            'Primary surplus = overall balance + interest payments $= ' + nz(overall) + ' + ' + nz(interest) + ' = ' + nz(primary2) + '$ units of HKD 100 million.',
            'So the primary surplus is ' + fmtNum(primary2) + ' units of HKD 100 million (' + (primary2 > 0 ? 'a surplus' : 'a deficit') + ').'
          ]
        },
        math: { mode: 'primary', revenue: revenue2, nonInterest: nonInterest, interest: interest }
      };
    }

    /* ---- level 3：赤字／盈餘融資後的債務佔 GDP 比率 ---- */
    var revenue3 = U.randInt(rng, 500, 750) * 10;
    var gap3 = (rng() < 0.5 ? -1 : 1) * U.randInt(rng, 100, 600);
    var spending3 = revenue3 - gap3;
    var gdp = U.randInt(rng, 280, 320) * 100;
    var debt0 = U.randInt(rng, 25, 55) * 100;
    var debt1 = debt0 - gap3;
    var answer3 = round2(debt1 / gdp * 100);

    return {
      prompt: {
        zh: '某政府年度的數據如下（以億港元為單位，其他因素不變）：政府收入 ' + fmtNum(revenue3) +
          ' 億；政府支出 ' + fmtNum(spending3) + ' 億；年初政府債務 ' + fmtNum(debt0) + ' 億；名義 GDP ' +
          fmtNum(gdp) + ' 億。假設財政盈餘全部用於償還債務、赤字全部以發債填補，求年末政府債務佔 GDP 的比率。' +
          '答案以百分比（%）表示，取 2 位小數。',
        en: 'A government\'s annual figures are as follows (in units of HKD 100 million, other things being constant): ' +
          'government revenue ' + fmtNum(revenue3) + '; government expenditure ' + fmtNum(spending3) +
          '; government debt at the beginning of the year ' + fmtNum(debt0) + '; nominal GDP ' + fmtNum(gdp) +
          '. Assume that any budget surplus is used entirely to repay debt and any deficit is financed entirely by issuing new debt. ' +
          'Find the year-end government debt as a percentage of GDP. Give your answer in %, 2 d.p.'
      },
      hint: {
        zh: '先求財政餘額，再求年末債務 = 年初債務 − 財政餘額，最後除以 GDP 乘 100%。',
        en: 'First find the budget balance, then year-end debt = beginning debt − budget balance, and finally divide by GDP and multiply by 100%.'
      },
      answer: answer3,
      choices: makeChoices(rng, answer3, { min: 0, max: 200, percent: true }),
      solution: {
        zh: [
          '財政餘額 = 收入 − 支出 $= ' + nz(revenue3) + ' - ' + nz(spending3) + ' = ' + nz(gap3) + '$ 億港元。',
          '年末債務 = 年初債務 − 財政餘額 $= ' + nz(debt0) + ' - (' + nz(gap3) + ') = ' + nz(debt1) + '$ 億港元。',
          '債務佔 GDP 比率 $= \\frac{' + nz(debt1) + '}{' + nz(gdp) + '} \\times 100\\% = ' + f2(answer3) + '\\%$。',
          '因此年末政府債務佔 GDP 的比率為 ' + pc(answer3) + '。'
        ],
        en: [
          'Budget balance = revenue − expenditure $= ' + nz(revenue3) + ' - ' + nz(spending3) + ' = ' + nz(gap3) + '$ units of HKD 100 million.',
          'Year-end debt = beginning debt − budget balance $= ' + nz(debt0) + ' - (' + nz(gap3) + ') = ' + nz(debt1) + '$ units of HKD 100 million.',
          'Debt-to-GDP ratio $= \\frac{' + nz(debt1) + '}{' + nz(gdp) + '} \\times 100\\% = ' + f2(answer3) + '\\%$.',
          'So the year-end government debt is ' + pc(answer3) + ' of GDP.'
        ]
      },
      math: { mode: 'debtRatio', revenue: revenue3, spending: spending3, gdp: gdp, debt0: debt0 }
    };
  });

  /* ================= 5. tax_basic ================= */

  ED.registerType('tax_basic', function (rng, o) {
    var level = o.level || 1;

    /* ---- level 1：比例稅，稅款 = 應稅收入 × 稅率 ---- */
    if (level === 1) {
      var income = U.randInt(rng, 30, 80) * 10000;
      var rate = U.pick(rng, [6, 8, 10, 12, 15, 17]);
      var answer = round2(income * rate / 100);

      return {
        prompt: {
          zh: '某人的應稅收入為 ' + fmtNum(income) + ' 港元，適用的比例稅率為 ' + rate +
            '%。求應繳稅款（港元，取 2 位小數）。',
          en: 'A person has taxable income of ' + fmtNum(income) + ' HKD and the proportional tax rate is ' +
            rate + '%. Find the tax payable (in HKD, 2 d.p.).'
        },
        hint: {
          zh: '比例稅：稅款 = 應稅收入 × 稅率。',
          en: 'Proportional tax: tax payable = taxable income × tax rate.'
        },
        answer: answer,
        choices: makeChoices(rng, answer, { min: 0, max: 1000000 }),
        solution: {
          zh: [
            '比例稅下，稅款 = 應稅收入 × 稅率。',
            '稅款 $= ' + nz(income) + ' \\times ' + plain(rate / 100) + ' = ' + nz(answer) + '$ 港元。',
            '因此應繳稅款為 ' + fmtNum(answer) + ' 港元。'
          ],
          en: [
            'Under a proportional tax, tax payable = taxable income × tax rate.',
            'Tax payable $= ' + nz(income) + ' \\times ' + plain(rate / 100) + ' = ' + nz(answer) + '$ HKD.',
            'So the tax payable is ' + fmtNum(answer) + ' HKD.'
          ]
        },
        math: { mode: 'proportional', income: income, rate: rate }
      };
    }

    /* ---- level 2：扣除免稅額後計稅；求稅款或平均稅率 ---- */
    if (level === 2) {
      var income2 = U.randInt(rng, 36, 72) * 10000;
      var allowance = U.pick(rng, [120000, 132000, 150000]);
      var rate2 = U.pick(rng, [6, 8, 10, 12, 15, 17]);
      var taxable = income2 - allowance;
      var tax = round2(taxable * rate2 / 100);
      var askAvg = rng() < 0.5;
      var answer2 = askAvg ? round2(tax / income2 * 100) : tax;
      var zh2 = [
        '應稅收入 = 年薪 − 免稅額 $= ' + nz(income2) + ' - ' + nz(allowance) + ' = ' + nz(taxable) + '$ 港元。',
        '稅款 = 應稅收入 × 稅率 $= ' + nz(taxable) + ' \\times ' + nz(rate2 / 100) + ' = ' + nz(tax) + '$ 港元。'
      ];
      var en2 = [
        'Taxable income = annual income − allowance $= ' + nz(income2) + ' - ' + nz(allowance) + ' = ' + nz(taxable) + '$ HKD.',
        'Tax payable = taxable income × tax rate $= ' + nz(taxable) + ' \\times ' + nz(rate2 / 100) + ' = ' + nz(tax) + '$ HKD.'
      ];
      if (askAvg) {
        zh2.push('平均稅率 = 稅款 ÷ 年薪 × 100% $= \\frac{' + nz(tax) + '}{' + nz(income2) + '} \\times 100\\% = ' + f2(answer2) + '\\%$。');
        zh2.push('因此平均稅率為 ' + pc(answer2) + '。');
        en2.push('Average tax rate = tax payable ÷ annual income × 100% $= \\frac{' + nz(tax) + '}{' + nz(income2) + '} \\times 100\\% = ' + f2(answer2) + '\\%$.');
        en2.push('So the average tax rate is ' + pc(answer2) + '.');
      } else {
        zh2.push('因此應繳稅款為 ' + fmtNum(tax) + ' 港元。');
        en2.push('So the tax payable is ' + fmtNum(tax) + ' HKD.');
      }

      return {
        prompt: {
          zh: '某人的年薪為 ' + fmtNum(income2) + ' 港元，可享有的免稅額為 ' + fmtNum(allowance) +
            ' 港元，餘下的應稅收入按比例稅率 ' + rate2 + '% 課稅。' +
            (askAvg ? '求平均稅率（= 稅款 ÷ 年薪 × 100%）。答案以百分比（%）表示，取 2 位小數。'
              : '求應繳稅款（港元，取 2 位小數）。'),
          en: 'A person earns an annual salary of ' + fmtNum(income2) + ' HKD and is entitled to a tax allowance of ' +
            fmtNum(allowance) + ' HKD; the remaining taxable income is taxed at a proportional rate of ' + rate2 + '%. ' +
            (askAvg ? 'Find the average tax rate (= tax payable ÷ annual income × 100%). Give your answer in %, 2 d.p.'
              : 'Find the tax payable (in HKD, 2 d.p.).')
        },
        hint: {
          zh: '先扣免稅額得應稅收入，再乘稅率；平均稅率 = 稅款 ÷ 總收入 × 100%（分母是總收入，不是應稅收入）。',
          en: 'Subtract the allowance to get taxable income, then multiply by the tax rate; average tax rate = tax payable ÷ total income × 100% (the denominator is total income, not taxable income).'
        },
        answer: answer2,
        choices: askAvg
          ? makeChoices(rng, answer2, { min: 0, max: 100, percent: true })
          : makeChoices(rng, answer2, { min: 0, max: 1000000 }),
        solution: { zh: zh2, en: en2 },
        math: { mode: askAvg ? 'allowanceAvg' : 'allowanceTax', income: income2, allowance: allowance, rate: rate2 }
      };
    }

    /* ---- level 3：間接稅（從量稅／從價稅）對價格的影響 ---- */
    var mode = U.pick(rng, ['specificAdd', 'specificReverse', 'advalorem']);
    var price = U.pick(rng, [40, 50, 60, 75, 80, 100, 120, 150]);
    var perUnit = U.pick(rng, [5, 8, 10, 12, 15, 20]);
    var adRate = U.pick(rng, [5, 8, 10, 12.5, 15, 20]);
    var answer3, promptZh3, promptEn3, zh3, en3;

    if (mode === 'specificAdd') {
      answer3 = round2(price + perUnit);
      promptZh3 = '某商品的稅前價為 ' + fmtNum(price) + ' 港元。政府對每單位徵收從量稅 ' + fmtNum(perUnit) +
        ' 港元；假設稅項全數轉嫁給消費者（其他因素不變），求含稅價（港元，2 位小數）。';
      promptEn3 = 'The pre-tax price of a good is ' + fmtNum(price) + ' HKD. The government imposes a per-unit tax of ' +
        fmtNum(perUnit) + ' HKD; assume the tax is fully passed on to consumers (other things being constant). ' +
        'Find the tax-inclusive price (in HKD, 2 d.p.).';
      zh3 = [
        '從量稅是按每單位固定金額徵收的間接稅。',
        '含稅價 = 稅前價 + 每單位稅額 $= ' + nz(price) + ' + ' + nz(perUnit) + ' = ' + nz(answer3) + '$ 港元。',
        '因此含稅價為 ' + fmtNum(answer3) + ' 港元。'
      ];
      en3 = [
        'A per-unit tax is an indirect tax charged as a fixed amount per unit.',
        'Tax-inclusive price = pre-tax price + tax per unit $= ' + nz(price) + ' + ' + nz(perUnit) + ' = ' + nz(answer3) + '$ HKD.',
        'So the tax-inclusive price is ' + fmtNum(answer3) + ' HKD.'
      ];
    } else if (mode === 'specificReverse') {
      var incl = price + perUnit;
      answer3 = price;
      promptZh3 = '某商品的含稅價為 ' + fmtNum(incl) + ' 港元，已包括每單位 ' + fmtNum(perUnit) +
        ' 港元的從量稅；假設稅項全數轉嫁給消費者（其他因素不變），求稅前價（港元，2 位小數）。';
      promptEn3 = 'The tax-inclusive price of a good is ' + fmtNum(incl) + ' HKD, which already includes a per-unit tax of ' +
        fmtNum(perUnit) + ' HKD; assume the tax is fully passed on to consumers (other things being constant). ' +
        'Find the pre-tax price (in HKD, 2 d.p.).';
      zh3 = [
        '從量稅是按每單位固定金額徵收的間接稅。',
        '稅前價 = 含稅價 − 每單位稅額 $= ' + nz(incl) + ' - ' + nz(perUnit) + ' = ' + nz(answer3) + '$ 港元。',
        '因此稅前價為 ' + fmtNum(answer3) + ' 港元。'
      ];
      en3 = [
        'A per-unit tax is an indirect tax charged as a fixed amount per unit.',
        'Pre-tax price = tax-inclusive price − tax per unit $= ' + nz(incl) + ' - ' + nz(perUnit) + ' = ' + nz(answer3) + '$ HKD.',
        'So the pre-tax price is ' + fmtNum(answer3) + ' HKD.'
      ];
    } else {
      answer3 = round2(price * (1 + adRate / 100));
      promptZh3 = '某商品的稅前價為 ' + fmtNum(price) + ' 港元。政府徵收從價稅，稅率為稅前價的 ' + fmtNum(adRate) +
        '%；假設稅項全數轉嫁給消費者（其他因素不變），求含稅價（港元，2 位小數）。';
      promptEn3 = 'The pre-tax price of a good is ' + fmtNum(price) + ' HKD. The government imposes an ad valorem tax at ' +
        fmtNum(adRate) + '% of the pre-tax price; assume the tax is fully passed on to consumers (other things being constant). ' +
        'Find the tax-inclusive price (in HKD, 2 d.p.).';
      zh3 = [
        '從價稅是按價格的固定百分比徵收的間接稅。',
        '稅款 = 稅前價 × 稅率 $= ' + nz(price) + ' \\times ' + plain(adRate / 100) + ' = ' + nz(round2(price * adRate / 100)) + '$ 港元。',
        '含稅價 = 稅前價 + 稅款 $= ' + nz(price) + ' + ' + nz(round2(price * adRate / 100)) + ' = ' + nz(answer3) + '$ 港元。',
        '因此含稅價為 ' + fmtNum(answer3) + ' 港元。'
      ];
      en3 = [
        'An ad valorem tax is an indirect tax charged as a fixed percentage of the price.',
        'Tax = pre-tax price × tax rate $= ' + nz(price) + ' \\times ' + plain(adRate / 100) + ' = ' + nz(round2(price * adRate / 100)) + '$ HKD.',
        'Tax-inclusive price = pre-tax price + tax $= ' + nz(price) + ' + ' + nz(round2(price * adRate / 100)) + ' = ' + nz(answer3) + '$ HKD.',
        'So the tax-inclusive price is ' + fmtNum(answer3) + ' HKD.'
      ];
    }

    return {
      prompt: { zh: promptZh3, en: promptEn3 },
      hint: {
        zh: '從量稅是每單位固定金額，直接加在價格上；從價稅按稅前價的百分比計算。',
        en: 'A per-unit tax is a fixed amount per unit added directly to the price; an ad valorem tax is a percentage of the pre-tax price.'
      },
      answer: answer3,
      choices: makeChoices(rng, answer3, { min: 0, max: 1000 }),
      solution: { zh: zh3, en: en3 },
      math: { mode: mode, price: price, perUnit: perUnit, adRate: adRate }
    };
  });

  /* ================= 6. tax_progressive ================= */

  // 五級累進稅階（每級寬度 50,000，稅率遞增）
  var TAX_BRACKETS = [
    { limit: 50000, rate: 2 },
    { limit: 100000, rate: 6 },
    { limit: 150000, rate: 10 },
    { limit: 200000, rate: 14 },
    { limit: null, rate: 17 }
  ];

  var BRACKET_ZH = '累進稅階：0–50,000 港元 2%；50,001–100,000 港元 6%；100,001–150,000 港元 10%；' +
    '150,001–200,000 港元 14%；200,000 港元以上 17%。';
  var BRACKET_EN = 'Progressive tax brackets: HKD 0–50,000 at 2%; HKD 50,001–100,000 at 6%; ' +
    'HKD 100,001–150,000 at 10%; HKD 150,001–200,000 at 14%; above HKD 200,000 at 17%.';

  function taxSlices(income) {
    var out = [];
    var lower = 0;
    for (var i = 0; i < TAX_BRACKETS.length; i++) {
      var b = TAX_BRACKETS[i];
      var upper = b.limit == null ? income : b.limit;
      var slice = Math.min(income, upper) - lower;
      if (slice > 0) {
        out.push({ slice: slice, rate: b.rate, amount: round2(slice * b.rate / 100) });
      }
      if (b.limit == null || income <= b.limit) break;
      lower = b.limit;
    }
    return out;
  }

  function taxTotal(slices) {
    var t = 0;
    for (var i = 0; i < slices.length; i++) t += slices[i].amount;
    return round2(t);
  }

  function sliceLineZh(i, s, isTop) {
    var head = i === 0 ? '首 ' + fmtNum(s.slice) + ' 港元'
      : isTop ? '餘下 ' + fmtNum(s.slice) + ' 港元'
        : '其後 ' + fmtNum(s.slice) + ' 港元';
    return head + ' × ' + s.rate + '% = ' + fmtNum(s.amount) + ' 港元。';
  }

  function sliceLineEn(i, s, isTop) {
    var head = i === 0 ? 'First HKD ' + fmtNum(s.slice)
      : isTop ? 'Remaining HKD ' + fmtNum(s.slice)
        : 'Next HKD ' + fmtNum(s.slice);
    return head + ' × ' + s.rate + '% = HKD ' + fmtNum(s.amount) + '.';
  }

  function sliceExprZh(slices) {
    return slices.map(function (s) {
      return fmtNum(s.slice) + ' × ' + s.rate + '%';
    }).join(' + ');
  }

  function sliceExprEn(slices) {
    return slices.map(function (s) {
      return 'HKD ' + fmtNum(s.slice) + ' × ' + s.rate + '%';
    }).join(' + ');
  }

  ED.registerType('tax_progressive', function (rng, o) {
    var level = o.level || 1;

    /* ---- level 1：按稅階逐級計算應繳稅款 ---- */
    if (level === 1) {
      var income = U.randInt(rng, 110, 145) * 1000;
      var slices = taxSlices(income);
      var tax = taxTotal(slices);
      var zh = [];
      var en = [];

      slices.forEach(function (s, i) {
        var isTop = (i === slices.length - 1) && income > 200000;
        zh.push(sliceLineZh(i, s, isTop));
        en.push(sliceLineEn(i, s, isTop));
      });
      zh.push('合計稅款 = ' + slices.map(function (s) { return fmtNum(s.amount); }).join(' + ') + ' = ' + fmtNum(tax) + ' 港元。');
      en.push('Total tax = ' + slices.map(function (s) { return 'HKD ' + fmtNum(s.amount); }).join(' + ') + ' = HKD ' + fmtNum(tax) + '.');
      zh.push('因此應繳稅款為 ' + fmtNum(tax) + ' 港元。');
      en.push('So the tax payable is ' + fmtNum(tax) + ' HKD.');

      return {
        prompt: {
          zh: BRACKET_ZH + ' 某人的應稅收入（已扣除免稅額）為 ' + fmtNum(income) +
            ' 港元。求應繳稅款（港元，取 2 位小數）。',
          en: BRACKET_EN + ' A person\'s taxable income (after deducting the allowance) is ' + fmtNum(income) +
            ' HKD. Find the tax payable (in HKD, 2 d.p.).'
        },
        hint: {
          zh: '只對每個稅階內的金額套用該級稅率，逐級計算後加總；不要把全部收入乘以最高稅率。',
          en: 'Apply each rate only to the income falling within that bracket, then add up the amounts; do not multiply all income by the top rate.'
        },
        answer: tax,
        choices: makeChoices(rng, tax, { min: 0, max: 1000000 }),
        solution: { zh: zh, en: en },
        math: { mode: 'progressiveTax', income: income, tax: tax }
      };
    }

    /* ---- level 2：求平均稅率 = 稅款 ÷ 應稅收入 × 100% ---- */
    if (level === 2) {
      var income2 = U.randInt(rng, 160, 195) * 1000;
      var slices2 = taxSlices(income2);
      var tax2 = taxTotal(slices2);
      var avg = round2(tax2 / income2 * 100);
      var zh2 = [];
      var en2 = [];

      slices2.forEach(function (s, i) {
        var isTop = (i === slices2.length - 1) && income2 > 200000;
        zh2.push(sliceLineZh(i, s, isTop));
        en2.push(sliceLineEn(i, s, isTop));
      });
      zh2.push('合計稅款 = ' + slices2.map(function (s) { return fmtNum(s.amount); }).join(' + ') + ' = ' + fmtNum(tax2) + ' 港元。');
      en2.push('Total tax = ' + slices2.map(function (s) { return 'HKD ' + fmtNum(s.amount); }).join(' + ') + ' = HKD ' + fmtNum(tax2) + '.');
      zh2.push('平均稅率 = 稅款 ÷ 應稅收入 × 100% $= \\frac{' + nz(tax2) + '}{' + nz(income2) + '} \\times 100\\% = ' + f2(avg) + '\\%$。');
      en2.push('Average tax rate = tax payable ÷ taxable income × 100% $= \\frac{' + nz(tax2) + '}{' + nz(income2) + '} \\times 100\\% = ' + f2(avg) + '\\%$.');
      zh2.push('因此平均稅率為 ' + pc(avg) + '。');
      en2.push('So the average tax rate is ' + pc(avg) + '.');

      return {
        prompt: {
          zh: BRACKET_ZH + ' 某人的應稅收入（已扣除免稅額）為 ' + fmtNum(income2) +
            ' 港元。求平均稅率（= 應繳稅款 ÷ 應稅收入 × 100%）。答案以百分比（%）表示，取 2 位小數。',
          en: BRACKET_EN + ' A person\'s taxable income (after deducting the allowance) is ' + fmtNum(income2) +
            ' HKD. Find the average tax rate (= tax payable ÷ taxable income × 100%). Give your answer in %, 2 d.p.'
        },
        hint: {
          zh: '先按稅階逐級求出稅款，再除以應稅收入；平均稅率一定低於最高邊際稅率。',
          en: 'First compute the tax bracket by bracket, then divide by taxable income; the average rate is always below the top marginal rate.'
        },
        answer: avg,
        choices: makeChoices(rng, avg, { min: 0, max: 100, percent: true }),
        solution: { zh: zh2, en: en2 },
        math: { mode: 'averageRate', income: income2, tax: tax2, avg: avg }
      };
    }

    /* ---- level 3：比較兩個收入水平下的平均（有效）稅率 ---- */
    var incomeA = U.randInt(rng, 55, 95) * 1000;
    var incomeB = U.randInt(rng, 210, 300) * 1000;
    var slicesA = taxSlices(incomeA);
    var slicesB = taxSlices(incomeB);
    var taxA = taxTotal(slicesA);
    var taxB = taxTotal(slicesB);
    var rateA = round2(taxA / incomeA * 100);
    var rateB = round2(taxB / incomeB * 100);
    var diffRate = round2(rateB - rateA);

    return {
      prompt: {
        zh: BRACKET_ZH + ' A 的應稅收入（已扣除免稅額）為 ' + fmtNum(incomeA) + ' 港元；B 的應稅收入（已扣除免稅額）為 ' +
          fmtNum(incomeB) + ' 港元。假設兩人只須繳付累進稅，求 B 的平均（有效）稅率比 A 高多少個百分點。' +
          '答案以百分點表示，取 2 位小數。',
        en: BRACKET_EN + ' Person A\'s taxable income (after deducting the allowance) is ' + fmtNum(incomeA) +
          ' HKD; person B\'s taxable income (after deducting the allowance) is ' + fmtNum(incomeB) +
          ' HKD. Assuming both pay only the progressive tax, find how many percentage points B\'s average (effective) tax rate is above A\'s. ' +
          'Give your answer in percentage points, 2 d.p.'
      },
      hint: {
        zh: '先分別按稅階算出兩人的稅款，再各自除以應稅收入得平均稅率，最後相減。',
        en: 'Compute each person\'s tax bracket by bracket, divide each tax by that person\'s taxable income to get the average rate, then subtract.'
      },
      answer: diffRate,
      choices: makeChoices(rng, diffRate, { min: 0, max: 100, percent: true }),
      solution: {
        zh: [
          'A 的應稅收入為 ' + fmtNum(incomeA) + ' 港元，稅款逐級計算：' + sliceExprZh(slicesA) + ' = ' + fmtNum(taxA) + ' 港元。',
          'A 的平均（有效）稅率 = ' + fmtNum(taxA) + ' ÷ ' + fmtNum(incomeA) + ' × 100% = ' + pc(rateA) + '。',
          'B 的應稅收入為 ' + fmtNum(incomeB) + ' 港元，稅款逐級計算：' + sliceExprZh(slicesB) + ' = ' + fmtNum(taxB) + ' 港元。',
          'B 的平均（有效）稅率 = ' + fmtNum(taxB) + ' ÷ ' + fmtNum(incomeB) + ' × 100% = ' + pc(rateB) + '。',
          '有效稅率差距 = ' + pc(rateB) + ' − ' + pc(rateA) + ' = ' + f2(diffRate) + ' 個百分點。',
          '因此 B 的平均（有效）稅率比 A 高 ' + f2(diffRate) + ' 個百分點。'
        ],
        en: [
          'A\'s taxable income is ' + fmtNum(incomeA) + ' HKD; tax computed bracket by bracket: ' + sliceExprEn(slicesA) + ' = HKD ' + fmtNum(taxA) + '.',
          'A\'s average (effective) tax rate = ' + fmtNum(taxA) + ' ÷ ' + fmtNum(incomeA) + ' × 100% = ' + pc(rateA) + '.',
          'B\'s taxable income is ' + fmtNum(incomeB) + ' HKD; tax computed bracket by bracket: ' + sliceExprEn(slicesB) + ' = HKD ' + fmtNum(taxB) + '.',
          'B\'s average (effective) tax rate = ' + fmtNum(taxB) + ' ÷ ' + fmtNum(incomeB) + ' × 100% = ' + pc(rateB) + '.',
          'Difference in effective rates = ' + pc(rateB) + ' − ' + pc(rateA) + ' = ' + f2(diffRate) + ' percentage points.',
          'So B\'s average (effective) tax rate is ' + f2(diffRate) + ' percentage points above A\'s.'
        ]
      },
      math: { mode: 'compareRate', incomeA: incomeA, incomeB: incomeB, rateA: rateA, rateB: rateB }
    };
  });

  /* ================= 7. budget_personal ================= */

  function budgetItems(rng) {
    return {
      rent: U.randInt(rng, 40, 100) * 100,
      food: U.randInt(rng, 20, 45) * 100,
      transport: U.randInt(rng, 4, 15) * 100,
      other: U.randInt(rng, 5, 20) * 100
    };
  }

  function budgetLinesZh(b) {
    return '租金 ' + fmtNum(b.rent) + ' 港元、飲食 ' + fmtNum(b.food) + ' 港元、交通 ' +
      fmtNum(b.transport) + ' 港元、其他 ' + fmtNum(b.other) + ' 港元';
  }

  function budgetLinesEn(b) {
    return 'rent HKD ' + fmtNum(b.rent) + ', food HKD ' + fmtNum(b.food) + ', transport HKD ' +
      fmtNum(b.transport) + ', other HKD ' + fmtNum(b.other);
  }

  ED.registerType('budget_personal', function (rng, o) {
    var level = o.level || 1;
    var b = budgetItems(rng);
    var expenses = b.rent + b.food + b.transport + b.other;
    var saving = U.randInt(rng, 10, 80) * 100;
    var income = expenses + saving;

    /* ---- level 1：儲蓄 = 收入 − 支出 ---- */
    if (level === 1) {
      return {
        prompt: {
          zh: '某人在香港工作，每月收入 ' + fmtNum(income) + ' 港元。每月固定及變動支出如下：' +
            budgetLinesZh(b) + '。求每月儲蓄（港元）。',
          en: 'A person working in Hong Kong has a monthly income of ' + fmtNum(income) + ' HKD. Monthly fixed and variable expenses are: ' +
            budgetLinesEn(b) + '. Find the monthly saving (in HKD).'
        },
        hint: {
          zh: '每月儲蓄 = 每月收入 − 各項支出總和。',
          en: 'Monthly saving = monthly income − total expenses.'
        },
        answer: saving,
        choices: makeChoices(rng, saving, { min: 0, max: 100000 }),
        solution: {
          zh: [
            '每月支出總額 = 租金 + 飲食 + 交通 + 其他 $= ' + nz(b.rent) + ' + ' + nz(b.food) + ' + ' +
              nz(b.transport) + ' + ' + nz(b.other) + ' = ' + nz(expenses) + '$ 港元。',
            '每月儲蓄 = 收入 − 支出 $= ' + nz(income) + ' - ' + nz(expenses) + ' = ' + nz(saving) + '$ 港元。',
            '因此每月儲蓄為 ' + fmtNum(saving) + ' 港元。'
          ],
          en: [
            'Total monthly expenses = rent + food + transport + other $= ' + nz(b.rent) + ' + ' + nz(b.food) + ' + ' +
              nz(b.transport) + ' + ' + nz(b.other) + ' = ' + nz(expenses) + '$ HKD.',
            'Monthly saving = income − expenses $= ' + nz(income) + ' - ' + nz(expenses) + ' = ' + nz(saving) + '$ HKD.',
            'So the monthly saving is ' + fmtNum(saving) + ' HKD.'
          ]
        },
        math: { mode: 'saving', income: income, expenses: expenses }
      };
    }

    /* ---- level 2：儲蓄率 = 儲蓄 ÷ 收入 × 100% ---- */
    if (level === 2) {
      var rate = round2(saving / income * 100);
      return {
        prompt: {
          zh: '某人在香港工作，每月收入 ' + fmtNum(income) + ' 港元。每月固定及變動支出如下：' +
            budgetLinesZh(b) + '。求儲蓄率（= 每月儲蓄 ÷ 每月收入 × 100%）。答案以百分比（%）表示，取 2 位小數。',
          en: 'A person working in Hong Kong has a monthly income of ' + fmtNum(income) + ' HKD. Monthly fixed and variable expenses are: ' +
            budgetLinesEn(b) + '. Find the saving rate (= monthly saving ÷ monthly income × 100%). Give your answer in %, 2 d.p.'
        },
        hint: {
          zh: '先求每月儲蓄（收入 − 支出），再除以收入乘 100%。',
          en: 'First find the monthly saving (income − expenses), then divide by income and multiply by 100%.'
        },
        answer: rate,
        choices: makeChoices(rng, rate, { min: 0, max: 100, percent: true }),
        solution: {
          zh: [
            '每月支出總額 = 租金 + 飲食 + 交通 + 其他 $= ' + nz(b.rent) + ' + ' + nz(b.food) + ' + ' +
              nz(b.transport) + ' + ' + nz(b.other) + ' = ' + nz(expenses) + '$ 港元。',
            '每月儲蓄 = 收入 − 支出 $= ' + nz(income) + ' - ' + nz(expenses) + ' = ' + nz(saving) + '$ 港元。',
            '儲蓄率 = 儲蓄 ÷ 收入 × 100% $= \\frac{' + nz(saving) + '}{' + nz(income) + '} \\times 100\\% = ' + f2(rate) + '\\%$。',
            '因此儲蓄率為 ' + pc(rate) + '。'
          ],
          en: [
            'Total monthly expenses = rent + food + transport + other $= ' + nz(b.rent) + ' + ' + nz(b.food) + ' + ' +
              nz(b.transport) + ' + ' + nz(b.other) + ' = ' + nz(expenses) + '$ HKD.',
            'Monthly saving = income − expenses $= ' + nz(income) + ' - ' + nz(expenses) + ' = ' + nz(saving) + '$ HKD.',
            'Saving rate = saving ÷ income × 100% $= \\frac{' + nz(saving) + '}{' + nz(income) + '} \\times 100\\% = ' + f2(rate) + '\\%$.',
            'So the saving rate is ' + pc(rate) + '.'
          ]
        },
        math: { mode: 'savingRate', income: income, expenses: expenses, rate: rate }
      };
    }

    /* ---- level 3：達成目標儲蓄額所需月數（不足一個月作一個月計） ---- */
    var months = U.randInt(rng, 4, 18);
    var target = saving * months - U.randInt(rng, 1, Math.max(1, saving - 1));
    var answer = Math.ceil(target / saving);
    var quotient = f2(target / saving);

    return {
      prompt: {
        zh: '某人在香港工作，每月收入 ' + fmtNum(income) + ' 港元。每月固定及變動支出如下：' +
          budgetLinesZh(b) + '。他想購買一件售價 ' + fmtNum(target) +
          ' 港元的物品，並把每月儲蓄全數用於此目標。求需時多少個月（不足一個月亦作一個月計）。答案以月為單位。',
        en: 'A person working in Hong Kong has a monthly income of ' + fmtNum(income) + ' HKD. Monthly fixed and variable expenses are: ' +
          budgetLinesEn(b) + '. The person wants to buy an item priced at ' + fmtNum(target) +
          ' HKD and puts the entire monthly saving towards this goal. How many months will it take (any part of a month counts as one month)? ' +
          'Answer in months.'
      },
      hint: {
        zh: '先求每月儲蓄（收入 − 支出），再用「目標金額 ÷ 每月儲蓄」，有餘數即進位至下一個月。',
        en: 'First find the monthly saving (income − expenses), then divide the target by the monthly saving; round up if there is a remainder.'
      },
      answer: answer,
      choices: makeChoices(rng, answer, { min: 1, max: 60, step: 1 }),
      solution: {
        zh: [
          '每月儲蓄 = 收入 − 支出總額。',
          '每月儲蓄 $= ' + nz(income) + ' - (' + nz(b.rent) + ' + ' + nz(b.food) + ' + ' +
            nz(b.transport) + ' + ' + nz(b.other) + ') = ' + nz(saving) + '$ 港元。',
          '需時 = 目標金額 ÷ 每月儲蓄 $= ' + nz(target) + ' \\div ' + nz(saving) + ' = ' + quotient + '$ 個月。',
          '不足一個月亦作一個月計，故需 ' + answer + ' 個月。'
        ],
        en: [
          'Monthly saving = income − total expenses.',
          'Monthly saving $= ' + nz(income) + ' - (' + nz(b.rent) + ' + ' + nz(b.food) + ' + ' +
            nz(b.transport) + ' + ' + nz(b.other) + ') = ' + nz(saving) + '$ HKD.',
          'Time needed = target ÷ monthly saving $= ' + nz(target) + ' \\div ' + nz(saving) + ' = ' + quotient + '$ months.',
          'Any part of a month counts as one month, so it takes ' + answer + ' months.'
        ]
      },
      math: { mode: 'targetMonths', income: income, expenses: expenses, target: target }
    };
  });

  /* ================= 8. percentage ================= */

  var PRICE_POOL = [80, 120, 150, 180, 200, 240, 250, 300, 320, 400, 480, 500, 600, 800];

  ED.registerType('percentage', function (rng, o) {
    var level = o.level || 1;

    /* ---- level 1：折扣 ---- */
    if (level === 1) {
      var price = U.pick(rng, PRICE_POOL);
      var discount = U.pick(rng, [10, 15, 20, 25, 30, 40, 50]);
      var discAmount = round2(price * discount / 100);
      var answer = round2(price - discAmount);

      return {
        prompt: {
          zh: '某商品原價 ' + fmtNum(price) + ' 港元，現在減價 ' + discount + '%。求售價（港元，取 2 位小數）。',
          en: 'A good has an original price of ' + fmtNum(price) + ' HKD and is now sold at a discount of ' +
            discount + '%. Find the selling price (in HKD, 2 d.p.).'
        },
        hint: {
          zh: '折扣金額 = 原價 × 折扣率；售價 = 原價 − 折扣金額。',
          en: 'Discount amount = original price × discount rate; selling price = original price − discount amount.'
        },
        answer: answer,
        choices: makeChoices(rng, answer, { min: 0, max: 10000, step: 5 }),
        solution: {
          zh: [
            '折扣金額 = 原價 × 折扣率 $= ' + nz(price) + ' \\times ' + plain(discount / 100) + ' = ' + nz(discAmount) + '$ 港元。',
            '售價 = 原價 − 折扣金額 $= ' + nz(price) + ' - ' + nz(discAmount) + ' = ' + nz(answer) + '$ 港元。',
            '因此售價為 ' + fmtNum(answer) + ' 港元。'
          ],
          en: [
            'Discount amount = original price × discount rate $= ' + nz(price) + ' \\times ' + plain(discount / 100) + ' = ' + nz(discAmount) + '$ HKD.',
            'Selling price = original price − discount amount $= ' + nz(price) + ' - ' + nz(discAmount) + ' = ' + nz(answer) + '$ HKD.',
            'So the selling price is ' + fmtNum(answer) + ' HKD.'
          ]
        },
        math: { mode: 'discount', price: price, discount: discount }
      };
    }

    /* ---- level 2：加價或服務費 ---- */
    if (level === 2) {
      var service = rng() < 0.5;
      if (service) {
        var bill = U.pick(rng, [120, 180, 240, 300, 360, 480, 600]);
        var charge = U.pick(rng, [5, 10, 12.5, 15]);
        var chargeAmount = round2(bill * charge / 100);
        var total = round2(bill + chargeAmount);
        return {
          prompt: {
            zh: '某餐廳的食品及飲品費用為 ' + fmtNum(bill) + ' 港元，另加收 ' + fmtNum(charge) +
              '% 服務費。求賬單總額（港元，取 2 位小數）。',
            en: 'A restaurant bill for food and drinks is ' + fmtNum(bill) + ' HKD, with a service charge of ' +
              fmtNum(charge) + '% added. Find the total bill (in HKD, 2 d.p.).'
          },
          hint: {
            zh: '服務費 = 費用 × 服務費率；總額 = 費用 + 服務費。',
            en: 'Service charge = bill × service charge rate; total = bill + service charge.'
          },
          answer: total,
          choices: makeChoices(rng, total, { min: 0, max: 10000, step: 5 }),
          solution: {
            zh: [
              '服務費 = 費用 × 服務費率 $= ' + nz(bill) + ' \\times ' + plain(charge / 100) + ' = ' + nz(chargeAmount) + '$ 港元。',
              '賬單總額 = 費用 + 服務費 $= ' + nz(bill) + ' + ' + nz(chargeAmount) + ' = ' + nz(total) + '$ 港元。',
              '因此賬單總額為 ' + fmtNum(total) + ' 港元。'
            ],
            en: [
              'Service charge = bill × service charge rate $= ' + nz(bill) + ' \\times ' + plain(charge / 100) + ' = ' + nz(chargeAmount) + '$ HKD.',
              'Total bill = bill + service charge $= ' + nz(bill) + ' + ' + nz(chargeAmount) + ' = ' + nz(total) + '$ HKD.',
              'So the total bill is ' + fmtNum(total) + ' HKD.'
            ]
          },
          math: { mode: 'serviceCharge', bill: bill, charge: charge }
        };
      }
      var cost = U.pick(rng, [40, 60, 80, 100, 120, 150, 200, 250, 300]);
      var markup = U.pick(rng, [10, 15, 20, 25, 30, 40, 50]);
      var markupAmount = round2(cost * markup / 100);
      var selling = round2(cost + markupAmount);
      return {
        prompt: {
          zh: '某商店以 ' + fmtNum(cost) + ' 港元購入一件貨品，加價 ' + markup +
            '% 後出售。求售價（港元，取 2 位小數）。',
          en: 'A shop buys a good for ' + fmtNum(cost) + ' HKD and sells it at a mark-up of ' +
            markup + '%. Find the selling price (in HKD, 2 d.p.).'
        },
        hint: {
          zh: '加價金額 = 成本 × 加價率；售價 = 成本 + 加價金額。',
          en: 'Mark-up amount = cost × mark-up rate; selling price = cost + mark-up amount.'
        },
        answer: selling,
        choices: makeChoices(rng, selling, { min: 0, max: 10000, step: 5 }),
        solution: {
          zh: [
            '加價金額 = 成本 × 加價率 $= ' + nz(cost) + ' \\times ' + plain(markup / 100) + ' = ' + nz(markupAmount) + '$ 港元。',
            '售價 = 成本 + 加價金額 $= ' + nz(cost) + ' + ' + nz(markupAmount) + ' = ' + nz(selling) + '$ 港元。',
            '因此售價為 ' + fmtNum(selling) + ' 港元。'
          ],
          en: [
            'Mark-up amount = cost × mark-up rate $= ' + nz(cost) + ' \\times ' + plain(markup / 100) + ' = ' + nz(markupAmount) + '$ HKD.',
            'Selling price = cost + mark-up amount $= ' + nz(cost) + ' + ' + nz(markupAmount) + ' = ' + nz(selling) + '$ HKD.',
            'So the selling price is ' + fmtNum(selling) + ' HKD.'
          ]
        },
        math: { mode: 'markup', cost: cost, markup: markup }
      };
    }

    /* ---- level 3：反向求原價，或連續百分比變化 ---- */
    var mode3 = U.pick(rng, ['reverseDiscount', 'reverseMarkup', 'successive']);

    if (mode3 === 'successive') {
      var price3 = U.pick(rng, [400, 500, 600, 800, 1000, 1200]);
      var upPct = U.pick(rng, [10, 20, 25, 50]);
      var downPct = U.pick(rng, [10, 20, 25, 50]);
      var afterUp = round2(price3 * (1 + upPct / 100));
      var finalPrice = round2(afterUp * (1 - downPct / 100));
      var answer3 = round2(((1 + upPct / 100) * (1 - downPct / 100) - 1) * 100);
      var dirZh = answer3 > 0 ? '上升 ' + f2(answer3) + '%' : answer3 < 0 ? '下跌 ' + f2(Math.abs(answer3)) + '%' : '不變（0%）';
      var dirEn = answer3 > 0 ? 'an increase of ' + f2(answer3) + '%' : answer3 < 0 ? 'a decrease of ' + f2(Math.abs(answer3)) + '%' : 'no change (0%)';

      return {
        prompt: {
          zh: '某商品原價 ' + fmtNum(price3) + ' 港元，先加價 ' + upPct + '%，再在加價後的價格上減價 ' +
            downPct + '%。求最終價格相對原價的百分比變化（上升為正、下跌為負）。' +
            '答案以百分比（%）表示，取 2 位小數。',
          en: 'A good has an original price of ' + fmtNum(price3) + ' HKD. Its price is first raised by ' + upPct +
            '% and then reduced by ' + downPct + '% of the raised price. Find the percentage change in the final price relative to the original price ' +
            '(an increase is positive, a decrease is negative). Give your answer in %, 2 d.p.'
        },
        hint: {
          zh: '先逐步求出加價後及減價後的最終價格，再用「(最終 − 原價) ÷ 原價 × 100%」；兩次百分比不能直接相加減。',
          en: 'Work out the price after the rise and then after the reduction, then use (final − original) ÷ original × 100%; the two percentages cannot simply be added or subtracted.'
        },
        answer: answer3,
        choices: makeChoices(rng, answer3, { min: -100, max: 500, percent: true }),
        solution: {
          zh: [
            '第一次加價後價格 = 原價 × (1 + 加價率) $= ' + nz(price3) + ' \\times (1 + ' + plain(upPct / 100) + ') = ' + nz(afterUp) + '$ 港元。',
            '第二次減價後價格 = 加價後價格 × (1 − 減價率) $= ' + nz(afterUp) + ' \\times (1 - ' + plain(downPct / 100) + ') = ' + nz(finalPrice) + '$ 港元。',
            '百分比變化 = (最終價格 − 原價) ÷ 原價 × 100% $= \\frac{' + nz(finalPrice) + ' - ' + nz(price3) + '}{' + nz(price3) + '} \\times 100\\% = ' + f2(answer3) + '\\%$。',
            '因此最終價格相對原價' + dirZh + '。'
          ],
          en: [
            'Price after the first increase = original price × (1 + increase rate) $= ' + nz(price3) + ' \\times (1 + ' + plain(upPct / 100) + ') = ' + nz(afterUp) + '$ HKD.',
            'Price after the reduction = raised price × (1 − reduction rate) $= ' + nz(afterUp) + ' \\times (1 - ' + plain(downPct / 100) + ') = ' + nz(finalPrice) + '$ HKD.',
            'Percentage change = (final price − original price) ÷ original price × 100% $= \\frac{' + nz(finalPrice) + ' - ' + nz(price3) + '}{' + nz(price3) + '} \\times 100\\% = ' + f2(answer3) + '\\%$.',
            'So the final price shows ' + dirEn + ' relative to the original price.'
          ]
        },
        math: { mode: 'successive', price: price3, upPct: upPct, downPct: downPct }
      };
    }

    if (mode3 === 'reverseDiscount') {
      var original = U.pick(rng, PRICE_POOL);
      var disc3 = U.pick(rng, [10, 15, 20, 25, 30, 40]);
      var sale = round2(original * (1 - disc3 / 100));
      var factor = 1 - disc3 / 100;
      var answerD = round2(sale / factor);
      return {
        prompt: {
          zh: '某商品在減價 ' + disc3 + '% 後，售價為 ' + fmtNum(sale) + ' 港元。求原價（港元，取 2 位小數）。',
          en: 'After a discount of ' + disc3 + '%, a good is sold for ' + fmtNum(sale) + ' HKD. Find the original price (in HKD, 2 d.p.).'
        },
        hint: {
          zh: '售價 = 原價 × (1 − 折扣率)，所以原價 = 售價 ÷ (1 − 折扣率)。',
          en: 'Selling price = original price × (1 − discount rate), so original price = selling price ÷ (1 − discount rate).'
        },
        answer: answerD,
        choices: makeChoices(rng, answerD, { min: 0, max: 10000, step: 5 }),
        solution: {
          zh: [
            '設原價為 x。',
            '售價 = 原價 × (1 − 折扣率)，即 $' + nz(sale) + ' = x \\times ' + plain(factor) + '$。',
            '原價 $x = ' + nz(sale) + ' \\div ' + plain(factor) + ' = ' + nz(answerD) + '$ 港元。',
            '因此原價為 ' + fmtNum(answerD) + ' 港元。'
          ],
          en: [
            'Let the original price be x.',
            'Selling price = original price × (1 − discount rate), so $' + nz(sale) + ' = x \\times ' + plain(factor) + '$.',
            'Original price $x = ' + nz(sale) + ' \\div ' + plain(factor) + ' = ' + nz(answerD) + '$ HKD.',
            'So the original price is ' + fmtNum(answerD) + ' HKD.'
          ]
        },
        math: { mode: 'reverseDiscount', sale: sale, discount: disc3 }
      };
    }

    var cost3 = U.pick(rng, [40, 60, 80, 100, 120, 150, 200, 250, 300]);
    var markup3 = U.pick(rng, [10, 15, 20, 25, 30, 40, 50]);
    var selling3 = round2(cost3 * (1 + markup3 / 100));
    var factor3 = 1 + markup3 / 100;
    var answerM = round2(selling3 / factor3);

    return {
      prompt: {
        zh: '某商店把一件貨品加價 ' + markup3 + '% 後，以 ' + fmtNum(selling3) +
          ' 港元出售。求該貨品的成本（港元，取 2 位小數）。',
        en: 'A shop marks a good up by ' + markup3 + '% and sells it for ' + fmtNum(selling3) +
          ' HKD. Find the cost of the good (in HKD, 2 d.p.).'
      },
      hint: {
        zh: '售價 = 成本 × (1 + 加價率)，所以成本 = 售價 ÷ (1 + 加價率)。',
        en: 'Selling price = cost × (1 + mark-up rate), so cost = selling price ÷ (1 + mark-up rate).'
      },
      answer: answerM,
      choices: makeChoices(rng, answerM, { min: 0, max: 10000, step: 5 }),
      solution: {
        zh: [
          '設成本為 x。',
          '售價 = 成本 × (1 + 加價率)，即 $' + nz(selling3) + ' = x \\times ' + plain(factor3) + '$。',
          '成本 $x = ' + nz(selling3) + ' \\div ' + plain(factor3) + ' = ' + nz(answerM) + '$ 港元。',
          '因此成本為 ' + fmtNum(answerM) + ' 港元。'
        ],
        en: [
          'Let the cost be x.',
          'Selling price = cost × (1 + mark-up rate), so $' + nz(selling3) + ' = x \\times ' + plain(factor3) + '$.',
          'Cost $x = ' + nz(selling3) + ' \\div ' + plain(factor3) + ' = ' + nz(answerM) + '$ HKD.',
          'So the cost is ' + fmtNum(answerM) + ' HKD.'
        ]
      },
      math: { mode: 'reverseMarkup', selling: selling3, markup: markup3 }
    };
  });
})();
