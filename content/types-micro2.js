/*
 * 經濟學園 · Econ Garden — 題目生成器：廠商、市場結構與貿易
 * ------------------------------------------------------------------
 * 對應 docs/TYPE-CATALOG.md 第 2 節，實作以下 9 個題型：
 *   cost, profit, monopoly, price_discrimination, hhi,
 *   game_theory, labour, comparative_advantage, tariff
 *
 * 所有隨機性都來自傳入的 rng；不使用 Math.random / Date.now / DOM / 網絡。
 */
(function () {
  'use strict';

  var ED = window.EconData;
  var U = ED.util;
  var pick = U.pick;
  var ri = U.randInt;

  /* 縮短解題步驟物件的建立 */
  function sol(zh, en) { return { zh: zh, en: en }; }

  /* 英文序數（1st、2nd、3rd、4th…） */
  function ordinal(n) {
    var m100 = n % 100;
    if (m100 >= 11 && m100 <= 13) return n + 'th';
    var r = n % 10;
    return n + (r === 1 ? 'st' : r === 2 ? 'nd' : r === 3 ? 'rd' : 'th');
  }

  /* 以 numericChoices 建立數字選項（預設整數、下限 0） */
  function numChoices(rng, answer, deltas, opts) {
    opts = opts || {};
    return U.numericChoices(rng, answer, {
      deltas: deltas,
      dp: opts.dp == null ? 0 : opts.dp,
      min: opts.min == null ? 0 : opts.min,
      max: opts.max
    });
  }

  /* =================================================================
   * 1. cost — 成本（總成本、平均成本、邊際成本、利潤最大化產量）
   * ================================================================= */
  ED.registerType('cost', function (rng, o) {
    var level = o.level || 1;

    if (level <= 1) {
      var mode1 = pick(rng, ['tc', 'ac']);
      var q1 = pick(rng, [2, 3, 4, 5, 6, 10]);
      var vc1 = ri(rng, 5, 30);
      var fc1 = pick(rng, [2, 3, 4, 5, 6, 10, 12]) * q1; /* 令 FC ÷ Q 為整數 */
      var tc1 = fc1 + vc1 * q1;
      var ac1 = tc1 / q1;
      var ans1 = mode1 === 'tc' ? tc1 : ac1;

      if (mode1 === 'tc') {
        return {
          prompt: {
            zh: '某廠商生產 ' + q1 + ' 件產品。固定成本為 ' + fc1 + ' 元，每件產品的變動成本為 ' + vc1 + ' 元。假設產品全部生產，求總成本（元）。',
            en: 'A firm produces ' + q1 + ' units. Its fixed cost is ' + fc1 + ' dollars and the variable cost per unit is ' + vc1 + ' dollars. All units are produced; find the total cost (in dollars).'
          },
          hint: {
            zh: '總成本 = 固定成本 + 每件變動成本 × 產量。',
            en: 'Total cost = fixed cost + variable cost per unit × quantity.'
          },
          answer: ans1,
          choices: numChoices(rng, ans1, [1, -1, 2, -2, 5, -5, 10, -10]),
          solution: sol(
            ['總成本公式：$TC = FC + VC \\times Q$。',
             '代入：$TC = ' + fc1 + ' + ' + vc1 + ' \\times ' + q1 + ' = ' + tc1 + '$ 元。',
             '因此總成本為 ' + tc1 + ' 元。'],
            ['Total cost formula: $TC = FC + VC \\times Q$.',
             'Substitute: $TC = ' + fc1 + ' + ' + vc1 + ' \\times ' + q1 + ' = ' + tc1 + '$ dollars.',
             'So the total cost is ' + tc1 + ' dollars.']
          ),
          math: { mode: 'tc', level: level, fc: fc1, vc: vc1, q: q1 }
        };
      }
      return {
        prompt: {
          zh: '某廠商生產 ' + q1 + ' 件產品。固定成本為 ' + fc1 + ' 元，每件產品的變動成本為 ' + vc1 + ' 元。假設產品全部生產，求平均成本（元）。',
          en: 'A firm produces ' + q1 + ' units. Its fixed cost is ' + fc1 + ' dollars and the variable cost per unit is ' + vc1 + ' dollars. All units are produced; find the average cost (in dollars).'
        },
        hint: {
          zh: '先求總成本，再除以產量：$AC = TC \\div Q$。',
          en: 'Find total cost first, then divide by output: $AC = TC \\div Q$.'
        },
        answer: ans1,
        choices: numChoices(rng, ans1, [1, -1, 2, -2, 5, -5, 10, -10]),
        solution: sol(
          ['總成本 $TC = ' + fc1 + ' + ' + vc1 + ' \\times ' + q1 + ' = ' + tc1 + '$ 元。',
           '平均成本 $AC = TC \\div Q = ' + tc1 + ' \\div ' + q1 + ' = ' + ac1 + '$ 元。',
           '因此平均成本為 ' + ac1 + ' 元。'],
          ['Total cost $TC = ' + fc1 + ' + ' + vc1 + ' \\times ' + q1 + ' = ' + tc1 + '$ dollars.',
           'Average cost $AC = TC \\div Q = ' + tc1 + ' \\div ' + q1 + ' = ' + ac1 + '$ dollars.',
           'So the average cost is ' + ac1 + ' dollars.']
        ),
        math: { mode: 'ac', level: level, fc: fc1, vc: vc1, q: q1 }
      };
    }

    if (level === 2) {
      var b2 = pick(rng, [1, 2, 3]);
      var a2 = ri(rng, 4, 20);
      var fc2 = ri(rng, 10, 60);
      var n2 = ri(rng, 1, 4);
      var mc2 = a2 + b2 * (2 * n2 - 1); /* TC(n) − TC(n−1) */
      var tcn = fc2 + a2 * n2 + b2 * n2 * n2;
      var tcm = fc2 + a2 * (n2 - 1) + b2 * (n2 - 1) * (n2 - 1);
      return {
        prompt: {
          zh: '某廠商的總成本函數為 $TC = ' + fc2 + ' + ' + a2 + 'Q + ' + b2 + 'Q^2$，其中 TC 以元為單位，Q 為產量（單位：件）。求由 $Q = ' + (n2 - 1) + '$ 增產至 $Q = ' + n2 + '$（即生產第 ' + n2 + ' 件產品）的邊際成本（元）。',
          en: 'A firm has total cost $TC = ' + fc2 + ' + ' + a2 + 'Q + ' + b2 + 'Q^2$, where TC is in dollars and Q is output in units. Find the marginal cost (in dollars) of raising output from $Q = ' + (n2 - 1) + '$ to $Q = ' + n2 + '$ (i.e. of the ' + ordinal(n2) + ' unit).'
        },
        hint: {
          zh: '邊際成本 = 多生產一單位所增加的總成本：$MC = TC(Q) - TC(Q-1)$。',
          en: 'Marginal cost is the increase in total cost from one more unit: $MC = TC(Q) - TC(Q-1)$.'
        },
        answer: mc2,
        choices: numChoices(rng, mc2, [1, -1, 2, -2, 3, -3, 5, -5]),
        solution: sol(
          ['$TC(' + n2 + ') = ' + fc2 + ' + ' + a2 + ' \\times ' + n2 + ' + ' + b2 + ' \\times ' + n2 + '^2 = ' + tcn + '$ 元。',
           '$TC(' + (n2 - 1) + ') = ' + fc2 + ' + ' + a2 + ' \\times ' + (n2 - 1) + ' + ' + b2 + ' \\times ' + (n2 - 1) + '^2 = ' + tcm + '$ 元。',
           '邊際成本 $= ' + tcn + ' - ' + tcm + ' = ' + mc2 + '$ 元。',
           '因此第 ' + n2 + ' 件產品的邊際成本為 ' + mc2 + ' 元。'],
          ['$TC(' + n2 + ') = ' + fc2 + ' + ' + a2 + ' \\times ' + n2 + ' + ' + b2 + ' \\times ' + n2 + '^2 = ' + tcn + '$ dollars.',
           '$TC(' + (n2 - 1) + ') = ' + fc2 + ' + ' + a2 + ' \\times ' + (n2 - 1) + ' + ' + b2 + ' \\times ' + (n2 - 1) + '^2 = ' + tcm + '$ dollars.',
           'Marginal cost $= ' + tcn + ' - ' + tcm + ' = ' + mc2 + '$ dollars.',
           'So the marginal cost of the ' + ordinal(n2) + ' unit is ' + mc2 + ' dollars.']
        ),
        math: { mode: 'mc', level: level, fc: fc2, a: a2, b: b2, n: n2 }
      };
    }

    /* level 3：由 MR = MC 求利潤最大化產量或價格 */
    var b3 = ri(rng, 1, 4);
    var d3 = ri(rng, 1, 4);
    var c3 = ri(rng, 2, 10);
    var q3 = ri(rng, 2, 8);
    var a3 = c3 + q3 * (2 * b3 + d3);
    var p3 = a3 - b3 * q3; /* = c + q(b+d) > 0 */
    var ask3 = pick(rng, ['quantity', 'price']);
    var ans3 = ask3 === 'quantity' ? q3 : p3;
    return {
      prompt: {
        zh: '某廠商面對的需求曲線為 $P = ' + a3 + ' - ' + b3 + 'Q$，邊際成本為 $MC = ' + c3 + ' + ' + d3 + 'Q$，其中價格與成本以元為單位，Q 為產量（單位：件）。求利潤最大化的' + (ask3 === 'quantity' ? '產量（件）' : '價格（元）') + '。',
        en: 'A firm faces demand $P = ' + a3 + ' - ' + b3 + 'Q$ and marginal cost $MC = ' + c3 + ' + ' + d3 + 'Q$, where prices and costs are in dollars and Q is output in units. Find the profit-maximising ' + (ask3 === 'quantity' ? 'output (units)' : 'price (dollars)') + '.'
      },
      hint: {
        zh: '先由需求曲線求邊際收益（斜率是需求的兩倍），再令 $MR = MC$。',
        en: 'Derive marginal revenue from demand (its slope is twice that of demand), then set $MR = MC$.'
      },
      answer: ans3,
      choices: numChoices(rng, ans3, [1, -1, 2, -2, 3, -3, 5, -5, 10, -10]),
      solution: sol(
        ['總收益 $TR = P \\times Q = (' + a3 + ' - ' + b3 + 'Q)Q = ' + a3 + 'Q - ' + b3 + 'Q^2$，故 $MR = ' + a3 + ' - ' + (2 * b3) + 'Q$。',
         '利潤最大化條件是 $MR = MC$：$' + a3 + ' - ' + (2 * b3) + 'Q = ' + c3 + ' + ' + d3 + 'Q$。',
         '整理得 $Q = ' + q3 + '$ 件；代入需求曲線，$P = ' + a3 + ' - ' + b3 + ' \\times ' + q3 + ' = ' + p3 + '$ 元。',
         ask3 === 'quantity' ? '因此利潤最大化產量為 ' + q3 + ' 件。' : '因此利潤最大化價格為 ' + p3 + ' 元。'],
        ['Total revenue $TR = P \\times Q = (' + a3 + ' - ' + b3 + 'Q)Q = ' + a3 + 'Q - ' + b3 + 'Q^2$, so $MR = ' + a3 + ' - ' + (2 * b3) + 'Q$.',
         'Profit maximisation requires $MR = MC$: $' + a3 + ' - ' + (2 * b3) + 'Q = ' + c3 + ' + ' + d3 + 'Q$.',
         'Solving gives $Q = ' + q3 + '$ units; substituting into demand, $P = ' + a3 + ' - ' + b3 + ' \\times ' + q3 + ' = ' + p3 + '$ dollars.',
         ask3 === 'quantity' ? 'So the profit-maximising output is ' + q3 + ' units.' : 'So the profit-maximising price is ' + p3 + ' dollars.']
      ),
      math: { mode: 'mrmc', level: level, a: a3, b: b3, c: c3, d: d3, q: q3, ask: ask3 }
    };
  });

  /* =================================================================
   * 2. profit — 會計利潤、經濟利潤、正常利潤
   * ================================================================= */
  ED.registerType('profit', function (rng, o) {
    var level = o.level || 1;

    if (level <= 1) {
      var p1 = ri(rng, 10, 60);
      var q1 = ri(rng, 5, 30);
      var mat1 = ri(rng, 20, 150);
      var wage1 = ri(rng, 20, 150);
      var tr1 = p1 * q1;
      var ec1 = mat1 + wage1;
      var ap1 = tr1 - ec1;
      return {
        prompt: {
          zh: '某廠商本月售出 ' + q1 + ' 件產品，每件售價 ' + p1 + ' 元。顯性成本包括材料費 ' + mat1 + ' 元及工資 ' + wage1 + ' 元。求會計利潤（元）。',
          en: 'A firm sells ' + q1 + ' units this month at ' + p1 + ' dollars each. Its explicit costs are ' + mat1 + ' dollars for materials and ' + wage1 + ' dollars for wages. Find the accounting profit (in dollars).'
        },
        hint: {
          zh: '會計利潤 = 總收入 − 顯性成本；總收入 = 價格 × 數量。',
          en: 'Accounting profit = total revenue − explicit costs; total revenue = price × quantity.'
        },
        answer: ap1,
        choices: numChoices(rng, ap1, [50, -50, 100, -100, 200, -200, 20, -20], { min: -1000, max: 2500 }),
        solution: sol(
          ['總收入 $TR = ' + p1 + ' \\times ' + q1 + ' = ' + tr1 + '$ 元。',
           '顯性成本 $= ' + mat1 + ' + ' + wage1 + ' = ' + ec1 + '$ 元。',
           '會計利潤 $= TR - $ 顯性成本 $= ' + tr1 + ' - ' + ec1 + ' = ' + ap1 + '$ 元。',
           '因此會計利潤為 ' + ap1 + ' 元。'],
          ['Total revenue $TR = ' + p1 + ' \\times ' + q1 + ' = ' + tr1 + '$ dollars.',
           'Explicit costs $= ' + mat1 + ' + ' + wage1 + ' = ' + ec1 + '$ dollars.',
           'Accounting profit $= TR - $ explicit costs $= ' + tr1 + ' - ' + ec1 + ' = ' + ap1 + '$ dollars.',
           'So the accounting profit is ' + ap1 + ' dollars.']
        ),
        math: { mode: 'accounting', level: level, p: p1, q: q1, explicit: ec1 }
      };
    }

    if (level === 2) {
      var tr2 = ri(rng, 100, 500);
      var ec2 = ri(rng, 60, 400);
      var sal2 = ri(rng, 20, 150);
      var rent2 = ri(rng, 10, 80);
      var ap2 = tr2 - ec2;
      var oc2 = sal2 + rent2;
      var ep2 = ap2 - oc2;
      return {
        prompt: {
          zh: '某東主自行經營工廠，一年總收入為 ' + tr2 + ' 元，顯性成本（材料、工資等）合計 ' + ec2 + ' 元。若他放棄自行經營，可受僱賺取年薪 ' + sal2 + ' 元，並可把自有廠房出租收取年租金 ' + rent2 + ' 元。求自行經營的經濟利潤（元）。',
          en: 'An owner runs a factory with annual total revenue of ' + tr2 + ' dollars and explicit costs (materials, wages, etc.) of ' + ec2 + ' dollars. If he gave up the business, he could work for an annual salary of ' + sal2 + ' dollars and rent out his own factory for ' + rent2 + ' dollars a year. Find the economic profit of running the business (in dollars).'
        },
        hint: {
          zh: '經濟利潤 = 會計利潤 − 機會成本；機會成本包括放棄的薪金與租金。',
          en: 'Economic profit = accounting profit − opportunity cost; the opportunity cost includes the forgone salary and rent.'
        },
        answer: ep2,
        choices: numChoices(rng, ep2, [50, -50, 100, -100, 200, -200, 20, -20], { min: -1000, max: 1000 }),
        solution: sol(
          ['會計利潤 $= ' + tr2 + ' - ' + ec2 + ' = ' + ap2 + '$ 元。',
           '機會成本 $= ' + sal2 + ' + ' + rent2 + ' = ' + oc2 + '$ 元。',
           '經濟利潤 $= ' + ap2 + ' - ' + oc2 + ' = ' + ep2 + '$ 元。',
           '因此經濟利潤為 ' + ep2 + ' 元' + (ep2 < 0 ? '（即相對於另一方案虧損 ' + (-ep2) + ' 元）' : '') + '。'],
          ['Accounting profit $= ' + tr2 + ' - ' + ec2 + ' = ' + ap2 + '$ dollars.',
           'Opportunity cost $= ' + sal2 + ' + ' + rent2 + ' = ' + oc2 + '$ dollars.',
           'Economic profit $= ' + ap2 + ' - ' + oc2 + ' = ' + ep2 + '$ dollars.',
           'So the economic profit is ' + ep2 + ' dollars' + (ep2 < 0 ? ' (a loss of ' + (-ep2) + ' dollars relative to the alternative)' : '') + '.']
        ),
        math: { mode: 'economic', level: level, tr: tr2, explicit: ec2, salary: sal2, rent: rent2 }
      };
    }

    /* level 3：加入自有資本的正常回報（正常利潤），經濟利潤可正可負 */
    var tr3 = ri(rng, 200, 800);
    var ec3 = ri(rng, 100, 600);
    var sal3 = ri(rng, 40, 200);
    var cap3 = 20 * ri(rng, 5, 50); /* 100–1000，且可被 20 整除 */
    var rate3 = pick(rng, [5, 10]);
    var intCost3 = cap3 * rate3 / 100;
    var ap3 = tr3 - ec3;
    var ep3 = ap3 - sal3 - intCost3;
    return {
      prompt: {
        zh: '某企業一年的總收入為 ' + tr3 + ' 元，顯性成本合計 ' + ec3 + ' 元。東主投入自有資本 ' + cap3 + ' 元。若不作此生意，他可受僱賺取年薪 ' + sal3 + ' 元，並可把資本投於其他用途賺取每年 ' + rate3 + '% 的正常回報。求自行經營的經濟利潤（元）。',
        en: 'A business has annual total revenue of ' + tr3 + ' dollars and explicit costs of ' + ec3 + ' dollars. The owner has invested ' + cap3 + ' dollars of his own capital. If he did not run the business, he could earn a salary of ' + sal3 + ' dollars and invest the capital elsewhere for a normal return of ' + rate3 + '% per year. Find the economic profit of running the business (in dollars).'
      },
      hint: {
        zh: '經濟利潤 = 會計利潤 − 放棄的薪金 − 資本的正常回報（機會成本）。',
        en: 'Economic profit = accounting profit − forgone salary − normal return on capital (opportunity cost).'
      },
      answer: ep3,
      choices: numChoices(rng, ep3, [50, -50, 100, -100, 150, -150, 25, -25], { min: -1000, max: 1000 }),
      solution: sol(
        ['會計利潤 $= ' + tr3 + ' - ' + ec3 + ' = ' + ap3 + '$ 元。',
         '資本的正常回報（機會成本）$= ' + cap3 + ' \\times ' + rate3 + '\\% = ' + intCost3 + '$ 元。',
         '總機會成本 $= ' + sal3 + ' + ' + intCost3 + ' = ' + (sal3 + intCost3) + '$ 元。',
         '經濟利潤 $= ' + ap3 + ' - ' + (sal3 + intCost3) + ' = ' + ep3 + '$ 元。',
         '因此經濟利潤為 ' + ep3 + ' 元' + (ep3 > 0 ? '，即賺取超過正常利潤的超額利潤。' : (ep3 === 0 ? '，即剛好賺取正常利潤。' : '，即未達正常利潤（低於其他用途的回報）。'))],
        ['Accounting profit $= ' + tr3 + ' - ' + ec3 + ' = ' + ap3 + '$ dollars.',
         'Normal return on capital (opportunity cost) $= ' + cap3 + ' \\times ' + rate3 + '\\% = ' + intCost3 + '$ dollars.',
         'Total opportunity cost $= ' + sal3 + ' + ' + intCost3 + ' = ' + (sal3 + intCost3) + '$ dollars.',
         'Economic profit $= ' + ap3 + ' - ' + (sal3 + intCost3) + ' = ' + ep3 + '$ dollars.',
         'So the economic profit is ' + ep3 + ' dollars' + (ep3 > 0 ? ', i.e. an above-normal (supernormal) profit.' : (ep3 === 0 ? ', i.e. exactly a normal profit.' : ', i.e. below the normal return available elsewhere.'))]
      ),
      math: { mode: 'normal', level: level, tr: tr3, explicit: ec3, salary: sal3, capital: cap3, rate: rate3 }
    };
  });

  /* =================================================================
   * 3. monopoly — 壟斷：MR = MC、壟斷價格、利潤、無謂損失
   * ================================================================= */
  ED.registerType('monopoly', function (rng, o) {
    var level = o.level || 1;
    var b = pick(rng, [1, 2, 4]);
    var c = ri(rng, 2, 10);
    var qm = ri(rng, 2, 6);
    var mode = level <= 1 ? 'quantity' : (level === 2 ? 'price' : pick(rng, ['profit', 'dwl']));

    if (mode === 'dwl' && (b * qm * qm) % 2 !== 0) qm += 1; /* 令無謂損失為整數 */

    var a = c + 2 * b * qm;
    var pm = a - b * qm; /* = c + b·qm > 0 */
    var fc = 0;
    var profit = b * qm * qm;
    if (mode === 'profit') {
      fc = pick(rng, [0, 10, 20]);
      if (profit <= fc) fc = 0;
      profit = profit - fc;
    }
    var qc = 2 * qm;
    var dwl = b * qm * qm / 2;

    var promptZh = '某壟斷廠商面對的需求曲線為 $P = ' + a + ' - ' + b + 'Q$，其中 P 以元為單位，Q 以件為單位。';
    var promptEn = 'A monopolist faces demand $P = ' + a + ' - ' + b + 'Q$, where P is in dollars and Q is in units. ';
    var answer;

    if (mode === 'quantity') {
      promptZh += '廠商的邊際成本固定為 $MC = ' + c + '$ 元，沒有固定成本。求利潤最大化的產量（件）。';
      promptEn += 'Its marginal cost is constant at $MC = ' + c + '$ dollars and there is no fixed cost. Find the profit-maximising output (units).';
      answer = qm;
    } else if (mode === 'price') {
      promptZh += '廠商的邊際成本固定為 $MC = ' + c + '$ 元，沒有固定成本。求利潤最大化的價格（元）。';
      promptEn += 'Its marginal cost is constant at $MC = ' + c + '$ dollars and there is no fixed cost. Find the profit-maximising price (in dollars).';
      answer = pm;
    } else if (mode === 'profit') {
      promptZh += '廠商的邊際成本固定為 $MC = ' + c + '$ 元，固定成本為 ' + fc + ' 元。求壟斷廠商的利潤（元）。';
      promptEn += 'Its marginal cost is constant at $MC = ' + c + '$ dollars and its fixed cost is ' + fc + ' dollars. Find the monopolist\u2019s profit (in dollars).';
      answer = profit;
    } else {
      promptZh += '廠商的邊際成本固定為 $MC = ' + c + '$ 元，沒有固定成本。假設需求曲線為直線，求相對於完全競爭市場的無謂損失（元）。無謂損失以需求曲線與邊際成本曲線之間、由壟斷產量至完全競爭產量所夾的三角形面積計算。';
      promptEn += 'Its marginal cost is constant at $MC = ' + c + '$ dollars and there is no fixed cost. Assuming linear demand, find the deadweight loss (in dollars) relative to a perfectly competitive market. The deadweight loss is the area of the triangle between the demand curve and the marginal cost curve, from the monopoly output to the competitive output.';
      answer = dwl;
    }

    var stepsZh = [
      '總收益 $TR = (' + a + ' - ' + b + 'Q)Q = ' + a + 'Q - ' + b + 'Q^2$，故邊際收益 $MR = ' + a + ' - ' + (2 * b) + 'Q$。',
      '令 $MR = MC$：$' + a + ' - ' + (2 * b) + 'Q = ' + c + '$，解得 $Q = ' + qm + '$ 件。',
      '代入需求曲線得壟斷價格 $P = ' + a + ' - ' + b + ' \\times ' + qm + ' = ' + pm + '$ 元。'
    ];
    var stepsEn = [
      'Total revenue $TR = (' + a + ' - ' + b + 'Q)Q = ' + a + 'Q - ' + b + 'Q^2$, so marginal revenue $MR = ' + a + ' - ' + (2 * b) + 'Q$.',
      'Set $MR = MC$: $' + a + ' - ' + (2 * b) + 'Q = ' + c + '$, giving $Q = ' + qm + '$ units.',
      'Substituting into demand gives the monopoly price $P = ' + a + ' - ' + b + ' \\times ' + qm + ' = ' + pm + '$ dollars.'
    ];

    if (mode === 'quantity') {
      stepsZh.push('因此利潤最大化產量為 ' + qm + ' 件。');
      stepsEn.push('So the profit-maximising output is ' + qm + ' units.');
    } else if (mode === 'price') {
      stepsZh.push('因此利潤最大化價格為 ' + pm + ' 元。');
      stepsEn.push('So the profit-maximising price is ' + pm + ' dollars.');
    } else if (mode === 'profit') {
      stepsZh.push('總收益 $TR = ' + pm + ' \\times ' + qm + ' = ' + (pm * qm) + '$ 元；總成本 $TC = ' + fc + ' + ' + c + ' \\times ' + qm + ' = ' + (fc + c * qm) + '$ 元。');
      stepsZh.push('利潤 $= TR - TC = ' + (pm * qm) + ' - ' + (fc + c * qm) + ' = ' + profit + '$ 元。');
      stepsEn.push('Total revenue $TR = ' + pm + ' \\times ' + qm + ' = ' + (pm * qm) + '$ dollars; total cost $TC = ' + fc + ' + ' + c + ' \\times ' + qm + ' = ' + (fc + c * qm) + '$ dollars.');
      stepsEn.push('Profit $= TR - TC = ' + (pm * qm) + ' - ' + (fc + c * qm) + ' = ' + profit + '$ dollars.');
    } else {
      var qd = a - c; /* 完全競爭產量：P = MC，Qc = (a − c)/b = 2qm */
      stepsZh.push('完全競爭下 $P = MC$：$' + a + ' - ' + b + 'Q = ' + c + '$，得 $Q_c = ' + qc + '$ 件，價格為 $' + c + '$ 元。');
      stepsZh.push('無謂損失 = 三角形面積 $= \\frac{1}{2} \\times (P_m - MC) \\times (Q_c - Q_m) = \\frac{1}{2} \\times (' + pm + ' - ' + c + ') \\times (' + qc + ' - ' + qm + ') = ' + dwl + '$ 元。');
      stepsEn.push('Under perfect competition $P = MC$: $' + a + ' - ' + b + 'Q = ' + c + '$, giving $Q_c = ' + qc + '$ units at a price of $' + c + '$ dollars.');
      stepsEn.push('Deadweight loss = triangle area $= \\frac{1}{2} \\times (P_m - MC) \\times (Q_c - Q_m) = \\frac{1}{2} \\times (' + pm + ' - ' + c + ') \\times (' + qc + ' - ' + qm + ') = ' + dwl + '$ dollars.');
    }

    return {
      prompt: { zh: promptZh, en: promptEn },
      hint: {
        zh: '壟斷廠商先令 $MR = MC$ 求產量，再依需求曲線定價；需求曲線的斜率是 $MR$ 的一半。',
        en: 'A monopolist first sets $MR = MC$ to find output, then reads the price off the demand curve; the demand curve is twice as steep as $MR$.'
      },
      answer: answer,
      choices: numChoices(rng, answer, [1, -1, 2, -2, 5, -5, 10, -10, 20, -20]),
      solution: sol(stepsZh, stepsEn),
      math: { mode: mode, level: level, a: a, b: b, c: c, qm: qm, pm: pm, fc: fc }
    };
  });

  /* =================================================================
   * 4. price_discrimination — 三級價格歧視（兩個分隔市場）
   * ================================================================= */
  ED.registerType('price_discrimination', function (rng, o) {
    var level = o.level || 1;
    var c = ri(rng, 2, 10);
    var q1 = ri(rng, 2, 7);
    var q2 = ri(rng, 2, 7);
    var guard = 0;
    while (q2 === q1 && guard++ < 50) q2 = ri(rng, 2, 7);
    if (q2 === q1) q2 = q1 === 7 ? 6 : q1 + 1; /* 保證兩市場最優數量不同（價格不同） */
    var a1 = c + 2 * q1;
    var a2 = c + 2 * q2;
    var p1 = a1 - q1; /* = c + q1 */
    var p2 = a2 - q2; /* = c + q2 */
    var introZh = '某壟斷者實行三級價格歧視，把市場分為兩個互相分隔的市場，邊際成本固定為 $MC = ' + c + '$ 元，沒有固定成本。市場 1 的需求為 $P_1 = ' + a1 + ' - Q_1$，市場 2 的需求為 $P_2 = ' + a2 + ' - Q_2$，其中價格以元為單位，數量以件為單位。';
    var introEn = 'A monopolist practises third-degree price discrimination in two separated markets. Its marginal cost is constant at $MC = ' + c + '$ dollars and there is no fixed cost. Demand in market 1 is $P_1 = ' + a1 + ' - Q_1$ and demand in market 2 is $P_2 = ' + a2 + ' - Q_2$, where prices are in dollars and quantities in units.';

    if (level <= 1) {
      return {
        prompt: {
          zh: introZh + '求市場 1 利潤最大化的銷售量（件）。',
          en: introEn + ' Find the profit-maximising quantity sold in market 1 (units).'
        },
        hint: {
          zh: '對每個市場分別令 $MR = MC$：$MR_1 = ' + a1 + ' - 2Q_1$。',
          en: 'Set $MR = MC$ separately in each market: $MR_1 = ' + a1 + ' - 2Q_1$.'
        },
        answer: q1,
        choices: numChoices(rng, q1, [1, -1, 2, -2, 3, -3]),
        solution: sol(
          ['市場 1 的總收益 $TR_1 = (' + a1 + ' - Q_1)Q_1$，故 $MR_1 = ' + a1 + ' - 2Q_1$。',
           '令 $MR_1 = MC$：$' + a1 + ' - 2Q_1 = ' + c + '$，解得 $Q_1 = ' + q1 + '$ 件。',
           '因此市場 1 的利潤最大化銷售量為 ' + q1 + ' 件。'],
          ['In market 1, total revenue $TR_1 = (' + a1 + ' - Q_1)Q_1$, so $MR_1 = ' + a1 + ' - 2Q_1$.',
           'Set $MR_1 = MC$: $' + a1 + ' - 2Q_1 = ' + c + '$, giving $Q_1 = ' + q1 + '$ units.',
           'So the profit-maximising quantity in market 1 is ' + q1 + ' units.']
        ),
        math: { mode: 'quantity', level: level, market: 1, a1: a1, a2: a2, b: 1, c: c }
      };
    }

    if (level === 2) {
      var market = pick(rng, [1, 2]);
      var ans = market === 1 ? p1 : p2;
      var am = market === 1 ? a1 : a2;
      var qm = market === 1 ? q1 : q2;
      return {
        prompt: {
          zh: introZh + '求市場 ' + market + ' 的利潤最大化價格（元）。',
          en: introEn + ' Find the profit-maximising price in market ' + market + ' (dollars).'
        },
        hint: {
          zh: '先令 $MR = MC$ 求市場 ' + market + ' 的數量，再代入該市場的需求曲線求價格。',
          en: 'First set $MR = MC$ to find the quantity in market ' + market + ', then substitute into that market\u2019s demand to get the price.'
        },
        answer: ans,
        choices: numChoices(rng, ans, [1, -1, 2, -2, 3, -3, 5, -5]),
        solution: sol(
          ['市場 ' + market + ' 的邊際收益 $MR = ' + am + ' - 2Q$。',
           '令 $MR = MC$：$' + am + ' - 2Q = ' + c + '$，得 $Q = ' + qm + '$ 件。',
           '代入需求曲線：$P = ' + am + ' - ' + qm + ' = ' + ans + '$ 元。',
           '因此市場 ' + market + ' 的利潤最大化價格為 ' + ans + ' 元。'],
          ['The marginal revenue in market ' + market + ' is $MR = ' + am + ' - 2Q$.',
           'Set $MR = MC$: $' + am + ' - 2Q = ' + c + '$, giving $Q = ' + qm + '$ units.',
           'Substitute into demand: $P = ' + am + ' - ' + qm + ' = ' + ans + '$ dollars.',
           'So the profit-maximising price in market ' + market + ' is ' + ans + ' dollars.']
        ),
        math: { mode: 'price', level: level, market: market, a1: a1, a2: a2, b: 1, c: c }
      };
    }

    /* level 3：文字選項，問哪個市場價格較高（兩市場最優價格保證不同） */
    var high = q1 > q2 ? 'm1' : 'm2';
    var choiceItems = [
      { id: 'm1', zh: '市場 1 的價格較高', en: 'Market 1 has the higher price' },
      { id: 'm2', zh: '市場 2 的價格較高', en: 'Market 2 has the higher price' },
      { id: 'same', zh: '兩個市場的價格相同', en: 'The two markets have the same price' }
    ];
    return {
      prompt: {
        zh: introZh + '在利潤最大化下，哪一個市場的壟斷價格較高？',
        en: introEn + ' At the profit-maximising outcome, which market has the higher monopoly price?'
      },
      hint: {
        zh: '在每個市場分別令 $MR = MC$：$MR = a - 2Q$，故 $Q = (a - c)/2$，價格 $P = a - Q$。比較兩市場的截距便可。',
        en: 'Set $MR = MC$ in each market: $MR = a - 2Q$, so $Q = (a - c)/2$ and $P = a - Q$. Compare the demand intercepts of the two markets.'
      },
      answer: high,
      choices: ['m1', 'm2', 'same'],
      choiceLabels: U.labelsOf(choiceItems),
      solution: sol(
        ['在各市場分別令 $MR = MC$。市場 1：$' + a1 + ' - 2Q_1 = ' + c + '$，得 $Q_1 = ' + q1 + '$、$P_1 = ' + p1 + '$ 元。',
         '市場 2：$' + a2 + ' - 2Q_2 = ' + c + '$，得 $Q_2 = ' + q2 + '$、$P_2 = ' + p2 + '$ 元。',
         '比較兩者：$P_1 = ' + p1 + '$ 元，$P_2 = ' + p2 + '$ 元，因此' + (q1 > q2 ? '市場 1' : '市場 2') + ' 的價格較高。',
         '答案：' + (q1 > q2 ? '市場 1 的價格較高。' : '市場 2 的價格較高。')],
        ['Set $MR = MC$ in each market. Market 1: $' + a1 + ' - 2Q_1 = ' + c + '$, so $Q_1 = ' + q1 + '$ and $P_1 = ' + p1 + '$ dollars.',
         'Market 2: $' + a2 + ' - 2Q_2 = ' + c + '$, so $Q_2 = ' + q2 + '$ and $P_2 = ' + p2 + '$ dollars.',
         'Comparing them: $P_1 = ' + p1 + '$ dollars and $P_2 = ' + p2 + '$ dollars, so ' + (q1 > q2 ? 'market 1' : 'market 2') + ' has the higher price.',
         'Answer: ' + (q1 > q2 ? 'market 1 has the higher price.' : 'market 2 has the higher price.')]
      ),
      math: { mode: 'compare', level: level, a1: a1, a2: a2, b: 1, c: c, q1: q1, q2: q2 }
    };
  });

  /* =================================================================
   * 5. hhi — 赫芬達爾—赫希曼指數（0–10000 尺度）
   * ================================================================= */
  function shares3(rng) {
    var s1 = ri(rng, 20, 45);
    var s2 = ri(rng, 15, 100 - s1 - 12);
    var s3 = 100 - s1 - s2;
    return [s1, s2, s3];
  }

  function shares4(rng) {
    var guard = 0;
    while (guard++ < 300) {
      var s1 = ri(rng, 18, 40);
      var s2 = ri(rng, 12, Math.min(40, 100 - s1 - 25));
      if (s2 < 12) continue;
      var s3 = ri(rng, 10, 100 - s1 - s2 - 8);
      if (s3 < 10) continue;
      var s4 = 100 - s1 - s2 - s3;
      if (s4 >= 8 && s4 <= 42) return [s1, s2, s3, s4];
    }
    return [32, 26, 24, 18];
  }

  function hhiOf(shares) {
    var t = 0;
    for (var i = 0; i < shares.length; i++) t += shares[i] * shares[i];
    return t;
  }

  function sharesText(namesZh, namesEn, shares, lang) {
    var partsZh = [], partsEn = [];
    for (var i = 0; i < shares.length; i++) {
      partsZh.push('廠商' + namesZh[i] + ' ' + shares[i] + '%');
      partsEn.push('Firm ' + namesEn[i] + ' ' + shares[i] + '%');
    }
    return lang === 'zh' ? partsZh.join('、') : partsEn.join(', ');
  }

  ED.registerType('hhi', function (rng, o) {
    var level = o.level || 1;
    var namesZh = ['甲', '乙', '丙', '丁'];
    var namesEn = ['A', 'B', 'C', 'D'];

    if (level <= 1) {
      var sh3 = U.shuffle(rng, shares3(rng));
      var hhi3 = hhiOf(sh3);
      return {
        prompt: {
          zh: '某市場有 3 間廠商，市場佔有率分別為' + sharesText(namesZh, namesEn, sh3, 'zh') + '。用 0–10000 尺度計算赫芬達爾—赫希曼指數（HHI）：$HHI = s_1^2 + s_2^2 + s_3^2$，其中 $s_i$ 為以百分點表示的市場佔有率。求 HHI。',
          en: 'A market has 3 firms with market shares: ' + sharesText(namesZh, namesEn, sh3, 'en') + '. Using the 0–10000 scale, compute the Herfindahl–Hirschman Index: $HHI = s_1^2 + s_2^2 + s_3^2$, where $s_i$ is the market share in percentage points. Find the HHI.'
        },
        hint: {
          zh: '把每個市場佔有率（百分點）平方後相加，例如 40% 的貢獻是 $40^2 = 1600$。',
          en: 'Square each market share in percentage points and add them up; for example, a 40% share contributes $40^2 = 1600$.'
        },
        answer: hhi3,
        choices: numChoices(rng, hhi3, [50, -50, 100, -100, 200, -200, 400, -400]),
        solution: sol(
          ['HHI $= ' + sh3[0] + '^2 + ' + sh3[1] + '^2 + ' + sh3[2] + '^2$。',
           '$= ' + (sh3[0] * sh3[0]) + ' + ' + (sh3[1] * sh3[1]) + ' + ' + (sh3[2] * sh3[2]) + ' = ' + hhi3 + '$。',
           '因此 HHI 為 ' + hhi3 + '。'],
          ['HHI $= ' + sh3[0] + '^2 + ' + sh3[1] + '^2 + ' + sh3[2] + '^2$.',
           '$= ' + (sh3[0] * sh3[0]) + ' + ' + (sh3[1] * sh3[1]) + ' + ' + (sh3[2] * sh3[2]) + ' = ' + hhi3 + '$.',
           'So the HHI is ' + hhi3 + '.']
        ),
        math: { mode: 'three', level: level, shares: sh3 }
      };
    }

    if (level === 2) {
      var sh4a = U.shuffle(rng, shares4(rng));
      var hhi4 = hhiOf(sh4a);
      return {
        prompt: {
          zh: '某市場有 4 間廠商，市場佔有率分別為' + sharesText(namesZh, namesEn, sh4a, 'zh') + '。用 0–10000 尺度計算 HHI：$HHI = s_1^2 + s_2^2 + s_3^2 + s_4^2$，其中 $s_i$ 為以百分點表示的市場佔有率。求 HHI。',
          en: 'A market has 4 firms with market shares: ' + sharesText(namesZh, namesEn, sh4a, 'en') + '. Using the 0–10000 scale, compute the HHI: $HHI = s_1^2 + s_2^2 + s_3^2 + s_4^2$, where $s_i$ is the market share in percentage points. Find the HHI.'
        },
        hint: {
          zh: 'HHI = 各廠商市場佔有率（百分點）的平方和；HHI 越高代表市場越集中。',
          en: 'HHI is the sum of the squared market shares (in percentage points); a higher HHI means a more concentrated market.'
        },
        answer: hhi4,
        choices: numChoices(rng, hhi4, [50, -50, 100, -100, 150, -150, 250, -250]),
        solution: sol(
          ['HHI $= ' + sh4a[0] + '^2 + ' + sh4a[1] + '^2 + ' + sh4a[2] + '^2 + ' + sh4a[3] + '^2$。',
           '$= ' + (sh4a[0] * sh4a[0]) + ' + ' + (sh4a[1] * sh4a[1]) + ' + ' + (sh4a[2] * sh4a[2]) + ' + ' + (sh4a[3] * sh4a[3]) + ' = ' + hhi4 + '$。',
           '因此 HHI 為 ' + hhi4 + '。'],
          ['HHI $= ' + sh4a[0] + '^2 + ' + sh4a[1] + '^2 + ' + sh4a[2] + '^2 + ' + sh4a[3] + '^2$.',
           '$= ' + (sh4a[0] * sh4a[0]) + ' + ' + (sh4a[1] * sh4a[1]) + ' + ' + (sh4a[2] * sh4a[2]) + ' + ' + (sh4a[3] * sh4a[3]) + ' = ' + hhi4 + '$.',
           'So the HHI is ' + hhi4 + '.']
        ),
        math: { mode: 'four', level: level, shares: sh4a }
      };
    }

    /* level 3：兩間廠商合併，求合併後 HHI 或 HHI 變化 */
    var sh4 = U.shuffle(rng, shares4(rng));
    var i = ri(rng, 0, 2);
    var j = ri(rng, i + 1, 3);
    var oldHhi = hhiOf(sh4);
    var si = sh4[i], sj = sh4[j];
    var change = 2 * si * sj;
    var newHhi = oldHhi + change;
    var mode = pick(rng, ['new', 'change']);
    var ans = mode === 'new' ? newHhi : change;
    var mergedZh = '廠商' + namesZh[i] + '與廠商' + namesZh[j] + '合併';
    var mergedEn = 'Firms ' + namesEn[i] + ' and ' + namesEn[j] + ' merge';
    return {
      prompt: {
        zh: '某市場有 4 間廠商，市場佔有率分別為' + sharesText(namesZh, namesEn, sh4, 'zh') + '。用 0–10000 尺度計算 HHI。若' + mergedZh + '，求合併後的 ' + (mode === 'new' ? 'HHI' : 'HHI 增加了多少') + '。',
        en: 'A market has 4 firms with market shares: ' + sharesText(namesZh, namesEn, sh4, 'en') + '. Using the 0–10000 scale, compute the HHI. If ' + mergedEn + ', find the ' + (mode === 'new' ? 'HHI after the merger' : 'increase in the HHI') + '.'
      },
      hint: {
        zh: '合併後 HHI = 原 HHI + 2 × 兩廠商佔有率之積（因為 $(s_i + s_j)^2 = s_i^2 + s_j^2 + 2s_i s_j$）。',
        en: 'Post-merger HHI = original HHI + 2 × product of the two shares, because $(s_i + s_j)^2 = s_i^2 + s_j^2 + 2s_i s_j$.'
      },
      answer: ans,
      choices: numChoices(rng, ans, [20, -20, 50, -50, 100, -100, 200, -200]),
      solution: sol(
        ['合併前 HHI $= ' + oldHhi + '$。',
         '合併後兩廠商的合併佔有率 $= ' + si + '\\% + ' + sj + '\\% = ' + (si + sj) + '\\%$。',
         'HHI 的變化 $= (s_i + s_j)^2 - s_i^2 - s_j^2 = 2 \\times ' + si + ' \\times ' + sj + ' = ' + change + '$。',
         '合併後 HHI $= ' + oldHhi + ' + ' + change + ' = ' + newHhi + '$。',
         mode === 'new' ? '因此合併後的 HHI 為 ' + newHhi + '。' : '因此 HHI 增加了 ' + change + '。'],
        ['Before the merger the HHI is $' + oldHhi + '$.',
         'The merged firm\u2019s share is $' + si + '\\% + ' + sj + '\\% = ' + (si + sj) + '\\%$.',
         'The change in the HHI is $(s_i + s_j)^2 - s_i^2 - s_j^2 = 2 \\times ' + si + ' \\times ' + sj + ' = ' + change + '$.',
         'The post-merger HHI is $' + oldHhi + ' + ' + change + ' = ' + newHhi + '$.',
         mode === 'new' ? 'So the HHI after the merger is ' + newHhi + '.' : 'So the HHI increases by ' + change + '.']
      ),
      math: { mode: 'merger', level: level, shares: sh4, merge: [i, j], newHhi: newHhi }
    };
  });

  /* =================================================================
   * 6. game_theory — 2×2 同時博弈（優勢策略、納什均衡、囚徒困境）
   * ================================================================= */
  var GAME_STRATS = [
    { zh: ['合作', '背叛'], en: ['Cooperate', 'Defect'] },
    { zh: ['減價', '維持價格'], en: ['Cut price', 'Hold price'] },
    { zh: ['進入市場', '不進入市場'], en: ['Enter the market', 'Stay out'] },
    { zh: ['賣廣告', '不賣廣告'], en: ['Advertise', 'Do not advertise'] },
    { zh: ['高產量', '低產量'], en: ['High output', 'Low output'] }
  ];

  function nashCombos(m, ids) {
    var out = [];
    for (var r = 0; r < 2; r++) {
      for (var c = 0; c < 2; c++) {
        var rowBest = m[r][c][0] > m[1 - r][c][0];
        var colBest = m[r][c][1] > m[r][1 - c][1];
        if (rowBest && colBest) out.push(ids[r] + ids[c]);
      }
    }
    return out;
  }

  /* 建立「甲有嚴格優勢策略、乙沒有優勢策略」的博弈，保證唯一納什均衡 */
  function domGame(rng) {
    var d = ri(rng, 0, 1);
    var oIdx = 1 - d;
    var cBR = ri(rng, 0, 1); /* 乙在甲選優勢策略時的最佳回應 */
    var cOther = 1 - cBR;
    var rd = [ri(rng, 6, 12), ri(rng, 6, 12)];
    var ro = [rd[0] - ri(rng, 2, 4), rd[1] - ri(rng, 2, 4)];
    var x = ri(rng, 6, 12);
    var cd = [0, 0];
    cd[cBR] = x; cd[cOther] = x - ri(rng, 2, 4);
    var y = ri(rng, 6, 12);
    var co = [0, 0];
    co[cOther] = y; co[cBR] = y - ri(rng, 2, 4);
    var m = [[null, null], [null, null]];
    m[d][0] = [rd[0], cd[0]];
    m[d][1] = [rd[1], cd[1]];
    m[oIdx][0] = [ro[0], co[0]];
    m[oIdx][1] = [ro[1], co[1]];
    return { m: m, d: d, cBR: cBR };
  }

  /* 建立囚徒困境：兩個玩家都有嚴格優勢策略（背叛），(合作,合作) 帕累托優於均衡 */
  function pdGame(rng) {
    var p = ri(rng, 8, 14);
    var a = ri(rng, 2, 4);
    var b = ri(rng, 2, 4);
    while (b === a) b = ri(rng, 2, 4);
    var dlt = ri(rng, 1, a - 1);
    var defect = ri(rng, 0, 1);
    var coop = 1 - defect;
    var m = [[null, null], [null, null]];
    m[coop][coop] = [p, p];
    m[coop][defect] = [p - a, p + b];
    m[defect][coop] = [p + b, p - a];
    m[defect][defect] = [p - dlt, p - dlt];
    return { m: m, p: p, a: a, b: b, d: dlt, defect: defect };
  }

  function matrixText(m, slZh, slEn) {
    var pos = [[0, 0], [0, 1], [1, 0], [1, 1]];
    var ids = ['x', 'y'];
    var zh = [], en = [];
    for (var k = 0; k < 4; k++) {
      var r = pos[k][0], c = pos[k][1];
      zh.push('（甲選 ' + ids[r] + '、乙選 ' + ids[c] + '）甲得 ' + m[r][c][0] + ' 元，乙得 ' + m[r][c][1] + ' 元');
      en.push('(A plays ' + ids[r] + ', B plays ' + ids[c] + ') A gets ' + m[r][c][0] + ' dollars, B gets ' + m[r][c][1] + ' dollars');
    }
    return {
      zh: '每格先列甲的收益、再列乙的收益：' + zh.join('；') + '。',
      en: 'Each cell lists A\u2019s payoff first, then B\u2019s: ' + en.join('; ') + '.'
    };
  }

  function gameIntro(slZh, slEn, mx) {
    return {
      zh: '甲、乙兩間廠商同時決定策略，收益以元為單位。雙方各有兩個策略：x＝' + slZh[0] + '、y＝' + slZh[1] + '。' + mx.zh,
      en: 'Firms A and B choose their strategies simultaneously. Payoffs are in dollars. Each has two strategies: x = ' + slEn[0] + ', y = ' + slEn[1] + '. ' + mx.en
    };
  }

  function comboLabels(slZh, slEn) {
    var ids = ['x', 'y'];
    var items = [];
    for (var r = 0; r < 2; r++) {
      for (var c = 0; c < 2; c++) {
        items.push({
          id: ids[r] + ids[c],
          zh: '（甲：' + slZh[r] + '；乙：' + slZh[c] + '）',
          en: '(A: ' + slEn[r] + '; B: ' + slEn[c] + ')'
        });
      }
    }
    return items;
  }

  ED.registerType('game_theory', function (rng, o) {
    var level = o.level || 1;

    if (level <= 1) {
      var set1 = pick(rng, GAME_STRATS);
      var g1 = domGame(rng);
      var m1 = g1.m;
      var domId = g1.d === 0 ? 'x' : 'y';
      var otherId = g1.d === 0 ? 'y' : 'x';
      var mx1 = matrixText(m1, set1.zh, set1.en);
      var intro1 = gameIntro(set1.zh, set1.en, mx1);
      var c0d = m1[g1.d][0][0], c0o = m1[1 - g1.d][0][0];
      var c1d = m1[g1.d][1][0], c1o = m1[1 - g1.d][1][0];
      var labelItems1 = [
        { id: 'x', zh: set1.zh[0], en: set1.en[0] },
        { id: 'y', zh: set1.zh[1], en: set1.en[1] },
        { id: 'none', zh: '沒有優勢策略', en: 'No dominant strategy' }
      ];
      return {
        prompt: {
          zh: intro1.zh + ' 求甲的優勢策略。',
          en: intro1.en + ' Find A\u2019s dominant strategy.'
        },
        hint: {
          zh: '優勢策略：無論對方選哪個策略，它帶來的收益都嚴格較高。',
          en: 'A dominant strategy gives a strictly higher payoff whatever the other player chooses.'
        },
        answer: domId,
        choices: ['x', 'y', 'none'],
        choiceLabels: U.labelsOf(labelItems1),
        solution: sol(
          ['固定乙的選擇。當乙選 x，甲選 ' + domId + ' 得 ' + c0d + ' 元，選 ' + otherId + ' 得 ' + c0o + ' 元。',
           '當乙選 y，甲選 ' + domId + ' 得 ' + c1d + ' 元，選 ' + otherId + ' 得 ' + c1o + ' 元。',
           '無論乙選 x 還是 y，甲選 ' + domId + ' 的收益都嚴格較高，所以 ' + domId + ' 是甲的優勢策略。',
           '答案：' + domId + '。'],
          ['Fix B\u2019s choice. If B plays x, A gets ' + c0d + ' dollars by playing ' + domId + ' and ' + c0o + ' dollars by playing ' + otherId + '.',
           'If B plays y, A gets ' + c1d + ' dollars by playing ' + domId + ' and ' + c1o + ' dollars by playing ' + otherId + '.',
           'Whichever strategy B chooses, playing ' + domId + ' gives A a strictly higher payoff, so ' + domId + ' is A\u2019s dominant strategy.',
           'Answer: ' + domId + '.']
        ),
        math: { mode: 'dominant', level: level, payoffs: m1, dominant: domId }
      };
    }

    if (level === 2) {
      var kind = pick(rng, ['pd', 'uni']);
      var set2 = pick(rng, GAME_STRATS);
      var g2 = kind === 'pd' ? pdGame(rng) : domGame(rng);
      var m2 = g2.m;
      var mx2 = matrixText(m2, set2.zh, set2.en);
      var intro2 = gameIntro(set2.zh, set2.en, mx2);
      var combos = nashCombos(m2, ['x', 'y']);
      var answer2 = combos[0];
      var labels2 = comboLabels(set2.zh, set2.en);
      var rBest0 = m2[0][0][0] > m2[1][0][0] ? 'x' : 'y';
      var rBest1 = m2[0][1][0] > m2[1][1][0] ? 'x' : 'y';
      var cBest0 = m2[0][0][1] > m2[0][1][1] ? 'x' : 'y';
      var cBest1 = m2[1][0][1] > m2[1][1][1] ? 'x' : 'y';
      return {
        prompt: {
          zh: intro2.zh + ' 以下哪一個策略組合是納什均衡？',
          en: intro2.en + ' Which of the following strategy profiles is the Nash equilibrium?'
        },
        hint: {
          zh: '納什均衡是雙方都同時對對方的策略作出最佳回應的組合。逐一檢查四個組合。',
          en: 'A Nash equilibrium is a profile where each player is best-responding to the other. Check the four profiles one by one.'
        },
        answer: answer2,
        choices: ['xx', 'xy', 'yx', 'yy'],
        choiceLabels: U.labelsOf(labels2),
        solution: sol(
          ['甲的最佳回應：若乙選 x，甲選 ' + rBest0 + '；若乙選 y，甲選 ' + rBest1 + '。',
           '乙的最佳回應：若甲選 x，乙選 ' + cBest0 + '；若甲選 y，乙選 ' + cBest1 + '。',
           '雙方同時互為最佳回應的組合只有一個，即（' + answer2.charAt(0) + '，' + answer2.charAt(1) + '）。',
           '因此納什均衡為 ' + answer2 + '。'],
          ['A\u2019s best response: if B plays x, A plays ' + rBest0 + '; if B plays y, A plays ' + rBest1 + '.',
           'B\u2019s best response: if A plays x, B plays ' + cBest0 + '; if A plays y, B plays ' + cBest1 + '.',
           'The only profile in which both are best-responding is (' + answer2.charAt(0) + ', ' + answer2.charAt(1) + ').',
           'So the Nash equilibrium is ' + answer2 + '.']
        ),
        math: { mode: 'nash', level: level, kind: kind, payoffs: m2, ne: answer2 }
      };
    }

    /* level 3：囚徒困境或重複博弈（文字選項） */
    var g3 = pdGame(rng);
    var m3 = g3.m;
    /* 策略標籤必須對應收益矩陣中「背叛」所在的下標，不可固定 */
    var set3 = g3.defect === 0
      ? { zh: ['背叛', '合作'], en: ['Defect', 'Cooperate'] }
      : { zh: ['合作', '背叛'], en: ['Cooperate', 'Defect'] };
    var mx3 = matrixText(m3, set3.zh, set3.en);
    var intro3 = gameIntro(set3.zh, set3.en, mx3);
    var ask3 = pick(rng, ['dilemma', 'repeated']);

    if (ask3 === 'dilemma') {
      var itemsD = [
        { id: 'pd', zh: '這是囚徒困境：雙方都有優勢策略（背叛），納什均衡結果並非帕累托最優。', en: 'This is a prisoner\u2019s dilemma: both players have a dominant strategy (defect), and the Nash equilibrium is not Pareto efficient.' },
        { id: 'coord', zh: '這是協調博弈：存在兩個納什均衡。', en: 'This is a coordination game: there are two Nash equilibria.' },
        { id: 'zero', zh: '這是零和博弈：一方的所得等於另一方的所失。', en: 'This is a zero-sum game: one player\u2019s gain equals the other\u2019s loss.' },
        { id: 'pareto', zh: '納什均衡結果已是帕累托最優。', en: 'The Nash equilibrium outcome is already Pareto efficient.' }
      ];
      var eq = m3[g3.defect][g3.defect];
      var coopCell = m3[1 - g3.defect][1 - g3.defect];
      return {
        prompt: {
          zh: intro3.zh + ' 以下哪一項正確描述這個博弈？',
          en: intro3.en + ' Which of the following correctly describes this game?'
        },
        hint: {
          zh: '先找雙方的優勢策略與納什均衡，再比較均衡結果與（合作，合作）的收益。',
          en: 'Find each player\u2019s dominant strategy and the Nash equilibrium, then compare the equilibrium payoffs with those of (cooperate, cooperate).'
        },
        answer: 'pd',
        choices: ['pd', 'coord', 'zero', 'pareto'],
        choiceLabels: U.labelsOf(itemsD),
        solution: sol(
          ['甲的收益：當乙選合作，甲選背叛得 ' + m3[g3.defect][1 - g3.defect][0] + ' 元，選合作得 ' + coopCell[0] + ' 元；當乙選背叛，甲選背叛得 ' + eq[0] + ' 元，選合作得 ' + m3[1 - g3.defect][g3.defect][0] + ' 元。故背叛是甲的優勢策略。',
           '乙的情況對稱，背叛也是乙的優勢策略，所以唯一的納什均衡是（背叛，背叛），收益為 ' + eq[0] + ' 元。',
           '但（合作，合作）的收益為 ' + coopCell[0] + ' 元，對雙方都更好；均衡結果並非帕累托最優，所以這是囚徒困境。',
           '答案：這是囚徒困境。'],
          ['A\u2019s payoffs: if B cooperates, A gets ' + m3[g3.defect][1 - g3.defect][0] + ' dollars by defecting and ' + coopCell[0] + ' dollars by cooperating; if B defects, A gets ' + eq[0] + ' dollars by defecting and ' + m3[1 - g3.defect][g3.defect][0] + ' dollars by cooperating. So defecting is A\u2019s dominant strategy.',
           'By symmetry, defecting is also B\u2019s dominant strategy, so the unique Nash equilibrium is (defect, defect) with payoffs of ' + eq[0] + ' dollars.',
           'But (cooperate, cooperate) gives ' + coopCell[0] + ' dollars to each, which is better for both; the equilibrium is not Pareto efficient, so this is a prisoner\u2019s dilemma.',
           'Answer: it is a prisoner\u2019s dilemma.']
        ),
        math: { mode: 'dilemma', level: level, payoffs: m3 }
      };
    }

    var itemsR = [
      { id: 'future', zh: '雙方都重視未來收益（貼現因子較高），使觸發策略可信。', en: 'Both players value future payoffs highly (a higher discount factor), making trigger strategies credible.' },
      { id: 'once', zh: '這個博弈只進行一次。', en: 'The game is played only once.' },
      { id: 'low', zh: '雙方的貼現因子很低。', en: 'Both players have a very low discount factor.' },
      { id: 'ignore', zh: '雙方都無法觀察對方過去的策略。', en: 'Neither player can observe the other\u2019s past strategy.' }
    ];
    return {
      prompt: {
        zh: intro3.zh + ' 若這個博弈在兩間廠商之間無限重複進行，以下哪一項最可能使雙方維持合作？',
        en: intro3.en + ' If this game is repeated indefinitely between the two firms, which of the following is most likely to sustain cooperation?'
      },
      hint: {
        zh: '重複博弈中，合作能否維持取決於雙方對未來收益的重視程度，以及背叛的長遠代價。',
        en: 'In a repeated game, whether cooperation can be sustained depends on how much both players value future payoffs and on the long-run cost of defecting.'
      },
      answer: 'future',
      choices: ['future', 'once', 'low', 'ignore'],
      choiceLabels: U.labelsOf(itemsR),
      solution: sol(
        ['在一次性博弈中，背叛是雙方的優勢策略，納什均衡是（背叛，背叛）。',
         '在無限重複博弈中，若雙方重視未來收益（貼現因子較高），「以牙還牙」等觸發策略會令背叛的長遠損失大於短期利益，合作便可能維持。',
         '若只玩一次、貼現因子很低，或無法觀察對方過去行為，合作都難以維持。',
         '因此最可能維持合作的是雙方重視未來收益。'],
        ['In a one-shot game, defecting is the dominant strategy for both players, so the Nash equilibrium is (defect, defect).',
         'In an infinitely repeated game, if both players value future payoffs highly (a high discount factor), trigger strategies such as tit-for-tat make the long-run cost of defecting exceed the short-run gain, so cooperation can be sustained.',
         'If the game is played only once, the discount factor is very low, or past actions cannot be observed, cooperation is hard to sustain.',
         'So the factor most likely to sustain cooperation is that both players value future payoffs highly.']
      ),
      math: { mode: 'repeated', level: level, payoffs: m3 }
    };
  });

  /* =================================================================
   * 7. labour — 勞動市場：均衡工資、最低工資、需求／供應變動
   * ================================================================= */
  ED.registerType('labour', function (rng, o) {
    var level = o.level || 1;
    var b = pick(rng, [1, 2]);
    var d = pick(rng, [1, 2]);
    var L = ri(rng, 12, 40);
    var c = ri(rng, 10, 30);
    var a = c + L * (b + d);
    var We = c + d * L;
    var introZh = '某勞動市場的勞動需求為 $W = ' + a + ' - ' + b + 'L$，勞動供應為 $W = ' + c + ' + ' + d + 'L$，其中 W 為工資率（單位：元／小時），L 為就業量（單位：千人）。';
    var introEn = 'In a labour market, labour demand is $W = ' + a + ' - ' + b + 'L$ and labour supply is $W = ' + c + ' + ' + d + 'L$, where W is the wage rate (dollars per hour) and L is employment (thousands of workers).';

    if (level <= 1) {
      var ask1 = pick(rng, ['wage', 'employment']);
      var ans1 = ask1 === 'wage' ? We : L;
      return {
        prompt: {
          zh: introZh + '求均衡' + (ask1 === 'wage' ? '工資率（元／小時）' : '就業量（千人）') + '。',
          en: introEn + ' Find the equilibrium ' + (ask1 === 'wage' ? 'wage rate (dollars per hour)' : 'employment (thousands)') + '.'
        },
        hint: {
          zh: '令勞動需求量等於勞動供應量（$W$ 相等），先求 L，再求 W。',
          en: 'Set quantity of labour demanded equal to quantity supplied ($W$ equal), find L first, then W.'
        },
        answer: ans1,
        choices: numChoices(rng, ans1, [1, -1, 2, -2, 5, -5, 10, -10]),
        solution: sol(
          ['令需求等於供應：$' + a + ' - ' + b + 'L = ' + c + ' + ' + d + 'L$。',
           '整理得 $' + (b + d) + 'L = ' + (a - c) + '$，所以 $L = ' + L + '$ 千人。',
           '代入供應函數：$W = ' + c + ' + ' + d + ' \\times ' + L + ' = ' + We + '$ 元／小時。',
           ask1 === 'wage' ? '因此均衡工資率為 ' + We + ' 元／小時。' : '因此均衡就業量為 ' + L + ' 千人。'],
          ['Set demand equal to supply: $' + a + ' - ' + b + 'L = ' + c + ' + ' + d + 'L$.',
           'Rearranging, $' + (b + d) + 'L = ' + (a - c) + '$, so $L = ' + L + '$ thousand workers.',
           'Substitute into supply: $W = ' + c + ' + ' + d + ' \\times ' + L + ' = ' + We + '$ dollars per hour.',
           ask1 === 'wage' ? 'So the equilibrium wage rate is ' + We + ' dollars per hour.' : 'So the equilibrium employment is ' + L + ' thousand workers.']
        ),
        math: { mode: 'equilibrium', level: level, a: a, b: b, c: c, d: d, L: L, W: We }
      };
    }

    if (level === 2) {
      var k = ri(rng, 1, 2);
      var m = k * b * d; /* 令最低工資下的數量為整數 */
      var Wm = We + m;
      var Ld = L - k * d;
      var Ls = L + k * b;
      var surplus = Ls - Ld;
      return {
        prompt: {
          zh: introZh + '政府訂立最低工資 ' + Wm + ' 元／小時，高於均衡工資率且低於需求曲線的工資截距。求最低工資下的勞動過剩（超額供應）數量（千人）。',
          en: introEn + ' The government sets a minimum wage of ' + Wm + ' dollars per hour, which is above the equilibrium wage and below the wage intercept of the demand curve. Find the labour surplus (excess supply) in thousands of workers.'
        },
        hint: {
          zh: '最低工資下：勞動需求量 $L_d$ 取決於需求曲線，供應量 $L_s$ 取決於供應曲線；過剩 = $L_s - L_d$。',
          en: 'At the minimum wage, quantity demanded $L_d$ comes from the demand curve and quantity supplied $L_s$ from the supply curve; the surplus is $L_s - L_d$.'
        },
        answer: surplus,
        choices: numChoices(rng, surplus, [1, -1, 2, -2, 3, -3]),
        solution: sol(
          ['最低工資 ' + Wm + ' 元高於均衡工資 ' + We + ' 元，因此最低工資具約束力。',
           '勞動需求量：$' + a + ' - ' + b + 'L = ' + Wm + '$，得 $L_d = ' + Ld + '$ 千人。',
           '勞動供應量：$' + c + ' + ' + d + 'L = ' + Wm + '$，得 $L_s = ' + Ls + '$ 千人。',
           '勞動過剩 $= L_s - L_d = ' + Ls + ' - ' + Ld + ' = ' + surplus + '$ 千人。'],
          ['The minimum wage of ' + Wm + ' dollars is above the equilibrium wage of ' + We + ' dollars, so it is binding.',
           'Quantity of labour demanded: $' + a + ' - ' + b + 'L = ' + Wm + '$, giving $L_d = ' + Ld + '$ thousand workers.',
           'Quantity of labour supplied: $' + c + ' + ' + d + 'L = ' + Wm + '$, giving $L_s = ' + Ls + '$ thousand workers.',
           'Labour surplus $= L_s - L_d = ' + Ls + ' - ' + Ld + ' = ' + surplus + '$ thousand workers.']
        ),
        math: { mode: 'minimum_wage', level: level, a: a, b: b, c: c, d: d, Wm: Wm }
      };
    }

    /* level 3：生產力上升令勞動需求增加，或勞動供應增加 */
    var kk = ri(rng, 1, 3);
    var change = pick(rng, ['demand', 'supply']);
    var a2, c2, Wnew;
    if (change === 'demand') {
      a2 = a + kk * (b + d);
      c2 = c;
      Wnew = We + kk * d;
    } else {
      a2 = a;
      c2 = c - kk * (b + d);
      if (c2 < 1) { /* 確保供應曲線截距為正 */
        kk = 1;
        c2 = c - 1 * (b + d);
        if (c2 < 1) c2 = 1;
      }
      Wnew = c2 + d * (L + kk);
    }
    var Lnew = L + kk;
    var ask3 = pick(rng, ['wage', 'employment']);
    var ans3 = ask3 === 'wage' ? Wnew : Lnew;
    var shiftZh = change === 'demand'
      ? '勞動需求因生產力上升而增加，新的勞動需求為 $W = ' + a2 + ' - ' + b + 'L$'
      : '勞動供應因勞動人口增加而增加，新的勞動供應為 $W = ' + c2 + ' + ' + d + 'L$';
    var shiftEn = change === 'demand'
      ? 'labour demand increases because of higher productivity; the new labour demand is $W = ' + a2 + ' - ' + b + 'L$'
      : 'labour supply increases because of a larger labour force; the new labour supply is $W = ' + c2 + ' + ' + d + 'L$';
    var otherZh = change === 'demand' ? '勞動供應' : '勞動需求';
    var otherEn = change === 'demand' ? 'labour supply' : 'labour demand';
    var otherLineZh = change === 'demand' ? '$W = ' + c + ' + ' + d + 'L$' : '$W = ' + a + ' - ' + b + 'L$';
    var otherLineEn = change === 'demand' ? '$W = ' + c + ' + ' + d + 'L$' : '$W = ' + a + ' - ' + b + 'L$';
    return {
      prompt: {
        zh: introZh + '假設其他因素不變，' + shiftZh + '，' + otherZh + '則維持為 ' + otherLineZh + '。求新的均衡' + (ask3 === 'wage' ? '工資率（元／小時）' : '就業量（千人）') + '。',
        en: introEn + ' Holding other factors constant, ' + shiftEn + ', while ' + otherEn + ' stays at ' + otherLineEn + '. Find the new equilibrium ' + (ask3 === 'wage' ? 'wage rate (dollars per hour)' : 'employment (thousands)') + '.'
      },
      hint: {
        zh: '把新的需求（或供應）曲線與不變的另一條曲線相等，解出新的 L，再代回求 W。',
        en: 'Equate the new demand (or supply) curve with the unchanged curve, solve for the new L, then substitute back for W.'
      },
      answer: ans3,
      choices: numChoices(rng, ans3, [1, -1, 2, -2, 5, -5, 10, -10]),
      solution: sol(
        [change === 'demand' ? '需求增加：令 $' + a2 + ' - ' + b + 'L = ' + c + ' + ' + d + 'L$。' : '供應增加：令 $' + a + ' - ' + b + 'L = ' + c2 + ' + ' + d + 'L$。',
         change === 'demand' ? '整理得 $L = ' + Lnew + '$ 千人，$W = ' + c + ' + ' + d + ' \\times ' + Lnew + ' = ' + Wnew + '$ 元／小時。' : '整理得 $L = ' + Lnew + '$ 千人，$W = ' + c2 + ' + ' + d + ' \\times ' + Lnew + ' = ' + Wnew + '$ 元／小時。',
         ask3 === 'wage' ? '因此新的均衡工資率為 ' + Wnew + ' 元／小時。' : '因此新的均衡就業量為 ' + Lnew + ' 千人。'],
        [change === 'demand' ? 'Demand increases: set $' + a2 + ' - ' + b + 'L = ' + c + ' + ' + d + 'L$.' : 'Supply increases: set $' + a + ' - ' + b + 'L = ' + c2 + ' + ' + d + 'L$.',
         change === 'demand' ? 'This gives $L = ' + Lnew + '$ thousand workers and $W = ' + c + ' + ' + d + ' \\times ' + Lnew + ' = ' + Wnew + '$ dollars per hour.' : 'This gives $L = ' + Lnew + '$ thousand workers and $W = ' + c2 + ' + ' + d + ' \\times ' + Lnew + ' = ' + Wnew + '$ dollars per hour.',
         ask3 === 'wage' ? 'So the new equilibrium wage rate is ' + Wnew + ' dollars per hour.' : 'So the new equilibrium employment is ' + Lnew + ' thousand workers.']
      ),
      math: { mode: 'shift', level: level, change: change, a: a2, c: c2, b: b, d: d, L: Lnew, W: Wnew }
    };
  });

  /* =================================================================
   * 8. comparative_advantage — 比較優勢與貿易得益
   * ================================================================= */
  ED.registerType('comparative_advantage', function (rng, o) {
    var level = o.level || 1;

    if (level <= 1) {
      var oc1 = ri(rng, 2, 5);
      var ask1 = pick(rng, ['x', 'y']);
      var x1, y1, ans1;
      if (ask1 === 'x') {
        x1 = ri(rng, 2, 10);
        y1 = oc1 * x1; /* OC_X = Y/X = oc1 */
        ans1 = oc1;
      } else {
        y1 = ri(rng, 2, 10);
        x1 = oc1 * y1; /* OC_Y = X/Y = oc1 */
        ans1 = oc1;
      }
      var good1 = ask1 === 'x' ? 'X' : 'Y';
      var other1 = ask1 === 'x' ? 'Y' : 'X';
      return {
        prompt: {
          zh: '某國把全部資源投入 X 可生產 ' + x1 + ' 單位 X，或全部投入 Y 可生產 ' + y1 + ' 單位 Y（生產可能曲線為直線）。求生產 1 單位 ' + good1 + ' 的機會成本（以單位 ' + other1 + ' 表示）。',
          en: 'A country can use all its resources to produce ' + x1 + ' units of X or ' + y1 + ' units of Y (its production possibility curve is a straight line). Find the opportunity cost of one unit of ' + good1 + ' (measured in units of ' + other1 + ').'
        },
        hint: {
          zh: '直線生產可能曲線下，1 單位 X 的機會成本 = 全部資源可生產的 Y ÷ 全部資源可生產的 X；Y 的機會成本則相反。',
          en: 'With a straight-line PPC, the opportunity cost of one unit of X = maximum Y ÷ maximum X (and the reverse for Y).'
        },
        answer: ans1,
        choices: numChoices(rng, ans1, [1, -1, 2, -2, 3, -3]),
        solution: sol(
          ask1 === 'x'
            ? ['生產 1 單位 X 的機會成本 = 可生產的 Y ÷ 可生產的 X $= ' + y1 + ' \\div ' + x1 + ' = ' + oc1 + '$ 單位 Y。', '因此生產 1 單位 X 的機會成本為 ' + oc1 + ' 單位 Y。']
            : ['生產 1 單位 Y 的機會成本 = 可生產的 X ÷ 可生產的 Y $= ' + x1 + ' \\div ' + y1 + ' = ' + oc1 + '$ 單位 X。', '因此生產 1 單位 Y 的機會成本為 ' + oc1 + ' 單位 X。'],
          ask1 === 'x'
            ? ['The opportunity cost of one unit of X = maximum Y ÷ maximum X $= ' + y1 + ' \\div ' + x1 + ' = ' + oc1 + '$ units of Y.', 'So the opportunity cost of one unit of X is ' + oc1 + ' units of Y.']
            : ['The opportunity cost of one unit of Y = maximum X ÷ maximum Y $= ' + x1 + ' \\div ' + y1 + ' = ' + oc1 + '$ units of X.', 'So the opportunity cost of one unit of Y is ' + oc1 + ' units of X.']
        ),
        math: { mode: 'oppcost', level: level, good: ask1, x: x1, y: y1 }
      };
    }

    if (level === 2) {
      var ocA = ri(rng, 2, 6);
      var ocB = ri(rng, 2, 6);
      var guard2 = 0;
      while (ocB === ocA && guard2++ < 50) ocB = ri(rng, 2, 6);
      if (ocB === ocA) ocB = ocA === 6 ? 5 : ocA + 1; /* 保證沒有相同機會成本（無平手） */
      var xa = ri(rng, 4, 10);
      var xb = ri(rng, 4, 10);
      var ya = ocA * xa;
      var yb = ocB * xb;
      var answer2 = ocA < ocB ? 'a' : 'b';
      var items2 = [
        { id: 'a', zh: '甲國在 X 有比較優勢', en: 'Country A has a comparative advantage in X' },
        { id: 'b', zh: '乙國在 X 有比較優勢', en: 'Country B has a comparative advantage in X' },
        { id: 'same', zh: '兩國在 X 的機會成本相同', en: 'The two countries have the same opportunity cost for X' }
      ];
      return {
        prompt: {
          zh: '甲國把全部資源投入 X 可生產 ' + xa + ' 單位 X，或全部投入 Y 可生產 ' + ya + ' 單位 Y；乙國把全部資源投入 X 可生產 ' + xb + ' 單位 X，或全部投入 Y 可生產 ' + yb + ' 單位 Y。兩國生產可能曲線均為直線。求哪一國在 X 有比較優勢？',
          en: 'Country A can use all its resources to produce ' + xa + ' units of X or ' + ya + ' units of Y. Country B can use all its resources to produce ' + xb + ' units of X or ' + yb + ' units of Y. Both production possibility curves are straight lines. Which country has a comparative advantage in X?'
        },
        hint: {
          zh: '比較兩國生產 1 單位 X 的機會成本（以 Y 為單位）；機會成本較低者具比較優勢。',
          en: 'Compare the opportunity cost of one unit of X (in units of Y) in the two countries; the lower opportunity cost gives the comparative advantage.'
        },
        answer: answer2,
        choices: ['a', 'b', 'same'],
        choiceLabels: U.labelsOf(items2),
        solution: sol(
          ['甲國生產 1 單位 X 的機會成本 $= ' + ya + ' \\div ' + xa + ' = ' + ocA + '$ 單位 Y。',
           '乙國生產 1 單位 X 的機會成本 $= ' + yb + ' \\div ' + xb + ' = ' + ocB + '$ 單位 Y。',
           '兩國機會成本不同（' + ocA + ' 與 ' + ocB + '），機會成本較低的是' + (ocA < ocB ? '甲國' : '乙國') + '。',
           '因此' + (ocA < ocB ? '甲國' : '乙國') + '在 X 有比較優勢。'],
          ['Country A\u2019s opportunity cost of one unit of X $= ' + ya + ' \\div ' + xa + ' = ' + ocA + '$ units of Y.',
           'Country B\u2019s opportunity cost of one unit of X $= ' + yb + ' \\div ' + xb + ' = ' + ocB + '$ units of Y.',
           'The opportunity costs differ (' + ocA + ' versus ' + ocB + '); the lower one is ' + (ocA < ocB ? 'Country A' : 'Country B') + '.',
           'So ' + (ocA < ocB ? 'Country A' : 'Country B') + ' has a comparative advantage in X.']
        ),
        math: { mode: 'which', level: level, xa: xa, ya: ya, xb: xb, yb: yb, ocA: ocA, ocB: ocB }
      };
    }

    /* level 3：專業化與貿易得益 */
    var ocS = ri(rng, 2, 3); /* 甲國（X 專業化國）的 OC_X，亦為整數 */
    var ocO = ocS + ri(rng, 1, 2); /* 乙國的 OC_X，必與 ocS 不同 */
    var p = ri(rng, 2 * ocS + 1, 2 * ocO - 1); /* 2r；r = p/2 介於兩國 OC_X 之間 */
    var mm = pick(rng, [2, 4]); /* 偶數，令所有數量為整數 */
    var Xs = p * mm;
    var Ys = ocS * Xs;
    var t = ocS * mm; /* 甲國用以交換的 X 數量 */
    var r = p / 2;
    var gain = Xs / 2 - t; /* 最終可消費 X 比自給自足多出的數量 */
    var Xo = ri(rng, 3, 9);
    var Yo = ocO * Xo;
    var autoX = Xs / 2;
    var autoY = Ys / 2;
    var tradeY = t * r;
    var finalX = Xs - t;
    return {
      prompt: {
        zh: '甲國把全部資源投入 X 可生產 ' + Xs + ' 單位 X，或全部投入 Y 可生產 ' + Ys + ' 單位 Y；乙國把全部資源投入 X 可生產 ' + Xo + ' 單位 X，或全部投入 Y 可生產 ' + Yo + ' 單位 Y。兩國生產可能曲線均為直線。自給自足時，甲國把一半資源用於生產 X、另一半用於生產 Y。若兩國按比較優勢完全專業化，並以 1 單位 X 交換 ' + U.round(r, 2) + ' 單位 Y 的比率貿易，甲國用 ' + t + ' 單位 X 換取 Y，使 Y 的消費量與自給自足時相同。求甲國最終可消費的 X 數量比自給自足時多多少單位？',
        en: 'Country A can use all its resources to produce ' + Xs + ' units of X or ' + Ys + ' units of Y. Country B can use all its resources to produce ' + Xo + ' units of X or ' + Yo + ' units of Y. Both production possibility curves are straight lines. In autarky, Country A uses half its resources for X and half for Y. If the two countries fully specialise according to comparative advantage and trade at a rate of 1 unit of X for ' + U.round(r, 2) + ' units of Y, Country A trades ' + t + ' units of X for Y so that its consumption of Y stays the same as in autarky. By how many units does Country A\u2019s final consumption of X exceed its autarky consumption?'
      },
      hint: {
        zh: '先比較兩國生產 X 的機會成本找出比較優勢；甲國自給自足的 X 是最大產量的一半；貿易後的最終 X = 專業化產量 − 換出去的 X。',
        en: 'First compare the opportunity costs of X to find comparative advantage. Country A\u2019s autarky X is half of its maximum output. Its final X after trade = specialised output − X traded away.'
      },
      answer: gain,
      choices: numChoices(rng, gain, [1, -1, 2, -2, 3, -3]),
      solution: sol(
        ['甲國生產 1 單位 X 的機會成本 $= ' + Ys + ' \\div ' + Xs + ' = ' + ocS + '$ 單位 Y；乙國為 $' + Yo + ' \\div ' + Xo + ' = ' + ocO + '$ 單位 Y。由於 ' + ocS + ' < ' + ocO + '，甲國在 X 有比較優勢，乙國在 Y 有比較優勢。',
         '自給自足時，甲國生產 X $= ' + Xs + ' \\div 2 = ' + autoX + '$ 單位，Y $= ' + Ys + ' \\div 2 = ' + autoY + '$ 單位。',
         '專業化後，甲國生產 ' + Xs + ' 單位 X；以 1X = ' + U.round(r, 2) + 'Y 交換，用 ' + t + ' 單位 X 可換得 $' + t + ' \\times ' + U.round(r, 2) + ' = ' + tradeY + '$ 單位 Y，Y 的消費量與自給自足相同。',
         '最終可消費 X $= ' + Xs + ' - ' + t + ' = ' + finalX + '$ 單位，比自給自足的 ' + autoX + ' 單位多 $' + finalX + ' - ' + autoX + ' = ' + gain + '$ 單位。',
         '因此甲國最終可消費的 X 比自給自足多 ' + gain + ' 單位。'],
        ['Country A\u2019s opportunity cost of one unit of X $= ' + Ys + ' \\div ' + Xs + ' = ' + ocS + '$ units of Y; that of Country B is $' + Yo + ' \\div ' + Xo + ' = ' + ocO + '$ units of Y. Since ' + ocS + ' < ' + ocO + ', Country A has a comparative advantage in X and Country B has one in Y.',
         'In autarky, Country A produces X $= ' + Xs + ' \\div 2 = ' + autoX + '$ units and Y $= ' + Ys + ' \\div 2 = ' + autoY + '$ units.',
         'After specialisation, Country A produces ' + Xs + ' units of X; at 1X = ' + U.round(r, 2) + 'Y, trading ' + t + ' units of X yields $' + t + ' \\times ' + U.round(r, 2) + ' = ' + tradeY + '$ units of Y, keeping Y consumption unchanged.',
         'Final X consumption $= ' + Xs + ' - ' + t + ' = ' + finalX + '$ units, which is $' + finalX + ' - ' + autoX + ' = ' + gain + '$ units more than the autarky level of ' + autoX + '.',
         'So Country A\u2019s final consumption of X exceeds autarky consumption by ' + gain + ' units.']
      ),
      math: { mode: 'gains', level: level, Xs: Xs, Ys: Ys, t: t, r: r, ocS: ocS, ocO: ocO, Xo: Xo, Yo: Yo }
    };
  });

  /* =================================================================
   * 9. tariff — 小國模型：從量關稅、進口量、關稅收入、無謂損失
   * ================================================================= */
  ED.registerType('tariff', function (rng, o) {
    var level = o.level || 1;
    var b = pick(rng, [1, 2]);
    var d = pick(rng, [1, 2]);
    var Pw = ri(rng, 10, 40);
    var t = pick(rng, [2, 3, 4, 5, 6, 8, 10]);
    if (level >= 3 && (t * t * (b + d)) % 2 !== 0) t += 1; /* 令無謂損失為整數 */
    var c = ri(rng, 5, 40);
    var gap = ri(rng, 10, 60);
    var imports0 = (b + d) * t + gap; /* 關稅前進口量，確保關稅後進口量 = gap > 0 */
    var Qs0 = c + d * Pw;
    var Qd0 = Qs0 + imports0;
    var a = Qd0 + b * Pw;
    var P1 = Pw + t;
    var Qd1 = a - b * P1;
    var Qs1 = c + d * P1;
    var imports1 = Qd1 - Qs1; /* = gap */
    var revenue = t * imports1;
    var dwl = t * t * (b + d) / 2;

    var introZh = '某小國是開放經濟，世界價格固定為 ' + Pw + ' 元（以元為單位）。國內需求為 $Q_d = ' + a + ' - ' + b + 'P$，國內供應為 $Q_s = ' + c + ' + ' + d + 'P$，其中 P 為價格（元），Q 為數量（件）。政府對每單位進口貨物徵收從量關稅 ' + t + ' 元。假設其他因素不變，小國無法影響世界價格，關稅全部反映在國內價格上。';
    var introEn = 'A small open economy faces a fixed world price of ' + Pw + ' dollars. Domestic demand is $Q_d = ' + a + ' - ' + b + 'P$ and domestic supply is $Q_s = ' + c + ' + ' + d + 'P$, where P is the price in dollars and Q is quantity in units. The government imposes a per-unit tariff of ' + t + ' dollars on imports. Holding other factors constant, the small country cannot affect the world price, and the tariff is fully passed on to the domestic price.';

    if (level <= 1) {
      var mode1 = pick(rng, ['price', 'imports']);
      var ans1 = mode1 === 'price' ? P1 : imports1;
      return {
        prompt: {
          zh: introZh + (mode1 === 'price' ? '求關稅後的國內價格（元）。' : '求關稅後的進口量（件）。'),
          en: introEn + (mode1 === 'price' ? ' Find the domestic price after the tariff (dollars).' : ' Find the quantity of imports after the tariff (units).')
        },
        hint: {
          zh: '關稅後國內價格 = 世界價格 + 從量關稅；進口量 = 國內需求量 − 國內供應量。',
          en: 'Domestic price after the tariff = world price + per-unit tariff; imports = quantity demanded − quantity supplied domestically.'
        },
        answer: ans1,
        choices: numChoices(rng, ans1, mode1 === 'price' ? [1, -1, 2, -2, 5, -5, 10, -10] : [2, -2, 5, -5, 10, -10, 20, -20]),
        solution: sol(
          mode1 === 'price'
            ? ['小國面對固定的世界價格 ' + Pw + ' 元，關稅 ' + t + ' 元全部轉嫁至國內價格。',
               '關稅後國內價格 $= ' + Pw + ' + ' + t + ' = ' + P1 + '$ 元。',
               '因此關稅後的國內價格為 ' + P1 + ' 元。']
            : ['關稅後國內價格 $= ' + Pw + ' + ' + t + ' = ' + P1 + '$ 元。',
               '國內需求量 $Q_d = ' + a + ' - ' + b + ' \\times ' + P1 + ' = ' + Qd1 + '$ 件；國內供應量 $Q_s = ' + c + ' + ' + d + ' \\times ' + P1 + ' = ' + Qs1 + '$ 件。',
               '進口量 $= Q_d - Q_s = ' + Qd1 + ' - ' + Qs1 + ' = ' + imports1 + '$ 件。',
               '因此關稅後的進口量為 ' + imports1 + ' 件。'],
          mode1 === 'price'
            ? ['The small country faces a fixed world price of ' + Pw + ' dollars, and the tariff of ' + t + ' dollars is fully passed on to the domestic price.',
               'Domestic price after the tariff $= ' + Pw + ' + ' + t + ' = ' + P1 + '$ dollars.',
               'So the domestic price after the tariff is ' + P1 + ' dollars.']
            : ['Domestic price after the tariff $= ' + Pw + ' + ' + t + ' = ' + P1 + '$ dollars.',
               'Quantity demanded $Q_d = ' + a + ' - ' + b + ' \\times ' + P1 + ' = ' + Qd1 + '$ units; quantity supplied domestically $Q_s = ' + c + ' + ' + d + ' \\times ' + P1 + ' = ' + Qs1 + '$ units.',
               'Imports $= Q_d - Q_s = ' + Qd1 + ' - ' + Qs1 + ' = ' + imports1 + '$ units.',
               'So imports after the tariff are ' + imports1 + ' units.']
        ),
        math: { mode: 'price_or_imports', level: level, a: a, b: b, c: c, d: d, Pw: Pw, t: t, ask: mode1 }
      };
    }

    if (level === 2) {
      return {
        prompt: {
          zh: introZh + '求政府的關稅收入（元）。',
          en: introEn + ' Find the government\u2019s tariff revenue (in dollars).'
        },
        hint: {
          zh: '關稅收入 = 從量關稅 × 關稅後的進口量。',
          en: 'Tariff revenue = per-unit tariff × quantity of imports after the tariff.'
        },
        answer: revenue,
        choices: numChoices(rng, revenue, [10, -10, 20, -20, 50, -50, 100, -100]),
        solution: sol(
          ['關稅後國內價格 $= ' + Pw + ' + ' + t + ' = ' + P1 + '$ 元。',
           '關稅後進口量 $= Q_d(' + P1 + ') - Q_s(' + P1 + ') = ' + Qd1 + ' - ' + Qs1 + ' = ' + imports1 + '$ 件。',
           '關稅收入 $= ' + t + ' \\times ' + imports1 + ' = ' + revenue + '$ 元。',
           '因此政府的關稅收入為 ' + revenue + ' 元。'],
          ['Domestic price after the tariff $= ' + Pw + ' + ' + t + ' = ' + P1 + '$ dollars.',
           'Imports after the tariff $= Q_d(' + P1 + ') - Q_s(' + P1 + ') = ' + Qd1 + ' - ' + Qs1 + ' = ' + imports1 + '$ units.',
           'Tariff revenue $= ' + t + ' \\times ' + imports1 + ' = ' + revenue + '$ dollars.',
           'So the government\u2019s tariff revenue is ' + revenue + ' dollars.']
        ),
        math: { mode: 'revenue', level: level, a: a, b: b, c: c, d: d, Pw: Pw, t: t }
      };
    }

    var dQs = Qs1 - Qs0; /* = d·t */
    var dQd = Qd0 - Qd1; /* = b·t */
    return {
      prompt: {
        zh: introZh + '假設供需曲線均為直線，求關稅造成的無謂損失（元）。無謂損失以兩個三角形面積之和計算：生產扭曲（供應量增加的部分）與消費扭曲（需求量減少的部分）。',
        en: introEn + ' Assuming linear demand and supply, find the deadweight loss (in dollars) caused by the tariff. The deadweight loss is the sum of two triangles: the production distortion (the rise in domestic supply) and the consumption distortion (the fall in quantity demanded).'
      },
      hint: {
        zh: '無謂損失 = ½ × 關稅 ×（國內供應增加量 + 國內需求減少量）。',
        en: 'Deadweight loss = ½ × tariff × (increase in domestic supply + decrease in quantity demanded).'
      },
      answer: dwl,
      choices: numChoices(rng, dwl, [2, -2, 5, -5, 10, -10, 20, -20, 50, -50]),
      solution: sol(
        ['自由貿易下國內價格為 ' + Pw + ' 元：$Q_d = ' + Qd0 + '$ 件，$Q_s = ' + Qs0 + '$ 件，進口 ' + imports0 + ' 件。',
         '關稅後國內價格為 ' + P1 + ' 元：$Q_d = ' + Qd1 + '$ 件，$Q_s = ' + Qs1 + '$ 件。國內供應增加 $' + Qs1 + ' - ' + Qs0 + ' = ' + dQs + '$ 件，國內需求減少 $' + Qd0 + ' - ' + Qd1 + ' = ' + dQd + '$ 件。',
         '無謂損失 $= \\frac{1}{2} \\times ' + t + ' \\times (' + dQs + ' + ' + dQd + ') = ' + dwl + '$ 元。',
         '因此關稅造成的無謂損失為 ' + dwl + ' 元。'],
        ['Under free trade the domestic price is ' + Pw + ' dollars: $Q_d = ' + Qd0 + '$ units, $Q_s = ' + Qs0 + '$ units, and imports are ' + imports0 + ' units.',
         'After the tariff the domestic price is ' + P1 + ' dollars: $Q_d = ' + Qd1 + '$ units and $Q_s = ' + Qs1 + '$ units. Domestic supply rises by $' + Qs1 + ' - ' + Qs0 + ' = ' + dQs + '$ units and quantity demanded falls by $' + Qd0 + ' - ' + Qd1 + ' = ' + dQd + '$ units.',
         'Deadweight loss $= \\frac{1}{2} \\times ' + t + ' \\times (' + dQs + ' + ' + dQd + ') = ' + dwl + '$ dollars.',
         'So the deadweight loss caused by the tariff is ' + dwl + ' dollars.']
      ),
      math: { mode: 'dwl', level: level, a: a, b: b, c: c, d: d, Pw: Pw, t: t, P1: P1 }
    };
  });
})();
