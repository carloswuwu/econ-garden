/*
 * 經濟學園 · Econ Garden — 微觀基礎題型生成器
 * ------------------------------------------------------------------
 * 題型：oppcost, ppc, demand_shift, supply_shift, equilibrium, ped, ped_tr, yed, xed, pes
 * 契約見 docs/TYPE-CATALOG.md 第 1 節。
 *
 * 約定：
 *   - 只使用傳入的 rng（seeded），不呼叫 Math.random / Date.now。
 *   - 每個生成器回傳 { prompt, hint, answer, solution, math, [choices], [choiceLabels] }。
 *   - 數字答案四捨五入至 2 位小數；可負答案（ped_tr / yed / xed）自行提供 choices，
 *     numericChoices 的 min 設為 -100，避免引擎預設下限 0 出錯。
 *   - 文字答案（demand_shift / supply_shift / ppc 效率判斷 / ped_tr 方向）提供
 *     choices 與 choiceLabels，答案 id 必須在 choices 內。
 *   - 公式用 $...$；貨幣金額不用 $ 符號（避免與 KaTeX 定界符衝突），以「元 / dollars」表示。
 */
(function () {
  'use strict';

  var U = EconData.util;

  /* ================= 共用小工具 ================= */

  function bi(zh, en) { return { zh: zh, en: en }; }

  function levelOf(o) {
    var l = o && o.level != null ? Number(o.level) : 1;
    if (!isFinite(l)) l = 1;
    return Math.max(1, Math.min(3, Math.round(l)));
  }

  function changeZh(v) { return v > 0 ? '上升' : (v < 0 ? '下跌' : '不變'); }
  function changeEn(v) { return v > 0 ? 'rise' : (v < 0 ? 'fall' : 'stay unchanged'); }

  /* 預設 dp = 2 的 numericChoices 包裝 */
  function numChoices(rng, answer, opts) {
    var o = {};
    if (opts) {
      for (var k in opts) { if (Object.prototype.hasOwnProperty.call(opts, k)) o[k] = opts[k]; }
    }
    if (o.dp == null) o.dp = 2;
    return U.numericChoices(rng, answer, o);
  }

  function elasticWordZh(e) {
    if (e > 1) return '需求富彈性（elastic）';
    if (e < 1) return '需求缺乏彈性（inelastic）';
    return '需求為單位彈性（unit elastic）';
  }
  function elasticWordEn(e) {
    if (e > 1) return 'demand is elastic';
    if (e < 1) return 'demand is inelastic';
    return 'demand is unit-elastic';
  }

  function yedKind(yed) {
    if (yed < 0) return { key: 'inferior', zh: '劣等物品（inferior good）', en: 'an inferior good' };
    if (yed > 1) return { key: 'luxury', zh: '奢侈品（luxury good）', en: 'a luxury good' };
    return { key: 'necessity', zh: '必需品（necessity good）', en: 'a necessity good' };
  }
  function yedKindTextZh(yed) {
    if (yed < 0) return 'YED < 0，所以物品 X 是劣等物品（inferior good）。';
    if (yed > 1) return 'YED > 1，所以物品 X 是奢侈品（luxury good）。';
    return 'YED 介乎 0 與 1 之間，所以物品 X 是必需品（necessity good）。';
  }
  function yedKindTextEn(yed) {
    if (yed < 0) return 'YED < 0, so good X is an inferior good.';
    if (yed > 1) return 'YED > 1, so good X is a luxury good.';
    return 'YED is between 0 and 1, so good X is a necessity good.';
  }
  function xedRelation(xed) {
    if (xed > 0) return { key: 'substitute', zh: '替代品（substitutes）', en: 'substitutes' };
    if (xed < 0) return { key: 'complement', zh: '互補品（complements）', en: 'complements' };
    return { key: 'unrelated', zh: '沒有明顯關係的物品', en: 'unrelated goods' };
  }

  /* =====================================================================
   * 1) oppcost — 機會成本
   * ===================================================================== */

  var OPP_ACTIVITIES = [
    { zh: '去行山', en: 'go hiking' },
    { zh: '去戲院看電影', en: 'go to the cinema' },
    { zh: '買一對球鞋', en: 'buy a pair of sneakers' },
    { zh: '買一副耳機', en: 'buy a pair of earphones' },
    { zh: '去主題公園', en: 'visit a theme park' },
    { zh: '去露營', en: 'go camping' },
    { zh: '上數學補習班', en: 'take a maths tutorial class' },
    { zh: '去打籃球', en: 'play basketball' }
  ];

  EconData.registerType('oppcost', function (rng, o) {
    var level = levelOf(o);

    if (level === 1) {
      var pair = U.shuffle(rng, OPP_ACTIVITIES).slice(0, 2);
      var v0 = 10 * U.randInt(rng, 20, 60);
      var v1 = 10 * U.randInt(rng, 20, 60);
      if (v1 === v0) v1 = v0 + 10;
      var pickIdx = U.randInt(rng, 0, 1);
      var altIdx = 1 - pickIdx;
      var chosen1 = pair[pickIdx];
      var alt1 = pair[altIdx];
      var chosenValue1 = pickIdx === 0 ? v0 : v1;
      var altValue1 = pickIdx === 0 ? v1 : v0;
      return {
        prompt: bi(
          '志明週末只有一天空閒，只能在兩項活動中選一項：「' + pair[0].zh + '」（他認為值 ' + v0 + ' 元）或「' + pair[1].zh + '」（他認為值 ' + v1 + ' 元）。他最後選擇了「' + chosen1.zh + '」。假設其他因素不變，他這個選擇的機會成本是多少元？',
          'Chi-ming has one free day at the weekend and can choose only one of two activities: ' + pair[0].en + ' (worth ' + v0 + ' dollars to him) or ' + pair[1].en + ' (worth ' + v1 + ' dollars to him). He finally chooses to ' + chosen1.en + '. Ceteris paribus, what is the opportunity cost of his choice in dollars?'
        ),
        hint: bi('機會成本 = 所放棄的次佳選擇（next best alternative）的價值，不是所選方案的價值。',
          'Opportunity cost is the value of the next best alternative forgone, not the value of the chosen option.'),
        answer: altValue1,
        solution: {
          zh: [
            '機會成本是所放棄的次佳選擇的價值，而不是所選方案的價值。',
            '他選擇了「' + chosen1.zh + '」，所放棄的是「' + alt1.zh + '」，其價值為 ' + altValue1 + ' 元。',
            '因此機會成本為 ' + altValue1 + ' 元。'
          ],
          en: [
            'Opportunity cost is the value of the next best alternative forgone, not the value of the option chosen.',
            'He chooses to ' + chosen1.en + ' and gives up ' + alt1.en + ', which is worth ' + altValue1 + ' dollars.',
            'So the opportunity cost is ' + altValue1 + ' dollars.'
          ]
        },
        math: { mode: 'next-best', chosenValue: chosenValue1, altValue: altValue1, answer: altValue1 }
      };
    }

    if (level === 2) {
      var trio = U.shuffle(rng, OPP_ACTIVITIES).slice(0, 3);
      var vals = [];
      while (vals.length < 3) {
        var vv = 10 * U.randInt(rng, 20, 60);
        if (vals.indexOf(vv) === -1) vals.push(vv);
      }
      var chosenIdx = U.randInt(rng, 0, 2);
      var otherIdx = [];
      for (var i2 = 0; i2 < 3; i2++) { if (i2 !== chosenIdx) otherIdx.push(i2); }
      var altBestIdx = vals[otherIdx[0]] >= vals[otherIdx[1]] ? otherIdx[0] : otherIdx[1];
      var answer2 = vals[altBestIdx];
      var zhList = trio.map(function (t, i) { return '「' + t.zh + '」（值 ' + vals[i] + ' 元）'; }).join('、');
      var enList = trio.map(function (t, i) { return t.en + ' (worth ' + vals[i] + ' dollars)'; }).join(', ');
      return {
        prompt: bi(
          '美玲週末可以從三項活動中選一項：' + zhList + '。她最後選擇了「' + trio[chosenIdx].zh + '」。假設其他因素不變，她這個選擇的機會成本是多少元？',
          'Mei-ling can choose one of three activities at the weekend: ' + enList + '. She finally chooses to ' + trio[chosenIdx].en + '. Ceteris paribus, what is the opportunity cost of her choice in dollars?'
        ),
        hint: bi('機會成本 = 所有被放棄的選擇中，價值最高的一項（次佳選擇）的價值。',
          'Opportunity cost is the value of the best alternative forgone, i.e. the highest-valued option that is given up.'),
        answer: answer2,
        solution: {
          zh: [
            '機會成本是所放棄的次佳選擇的價值，而不是所有放棄項目的總和。',
            '她選擇了「' + trio[chosenIdx].zh + '」，放棄了「' + trio[otherIdx[0]].zh + '」（' + vals[otherIdx[0]] + ' 元）及「' + trio[otherIdx[1]].zh + '」（' + vals[otherIdx[1]] + ' 元）。',
            '兩者之中價值較高的是「' + trio[altBestIdx].zh + '」，其價值為 ' + answer2 + ' 元。',
            '因此機會成本為 ' + answer2 + ' 元。'
          ],
          en: [
            'Opportunity cost is the value of the next best alternative forgone, not the sum of all options given up.',
            'She chooses to ' + trio[chosenIdx].en + ' and gives up ' + trio[otherIdx[0]].en + ' (' + vals[otherIdx[0]] + ' dollars) and ' + trio[otherIdx[1]].en + ' (' + vals[otherIdx[1]] + ' dollars).',
            'The higher-valued one is ' + trio[altBestIdx].en + ', worth ' + answer2 + ' dollars.',
            'So the opportunity cost is ' + answer2 + ' dollars.'
          ]
        },
        math: {
          mode: 'best-forgone',
          chosenValue: vals[chosenIdx],
          otherValues: [vals[otherIdx[0]], vals[otherIdx[1]]],
          answer: answer2
        }
      };
    }

    /* level 3：直線 PPF 上的每單位機會成本 */
    var maxA = 4 * U.randInt(rng, 25, 125);           /* 100–500 件 A */
    var ratio = U.pick(rng, [0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 4]);
    var maxB = maxA * ratio;                            /* 整數件 B */
    var answer3 = U.round(maxB / maxA, 2);
    return {
      prompt: bi(
        '某工廠把全部資源用於生產物品 A 時，每日可生產 ' + maxA + ' 件 A；把全部資源用於生產物品 B 時，每日可生產 ' + maxB + ' 件 B。假設生產可能曲線是一條直線（機會成本不變），且所有資源同質。生產 1 件物品 A 的機會成本是多少件物品 B？（四捨五入至 2 位小數）',
        'When a factory uses all its resources to produce good A, it can produce ' + maxA + ' units of A per day; when it uses all its resources to produce good B, it can produce ' + maxB + ' units of B per day. Assume the production possibility curve is a straight line (constant opportunity cost) and all resources are homogeneous. What is the opportunity cost of producing 1 unit of A, measured in units of B? (2 d.p.)'
      ),
      hint: bi('直線 PPF 上每單位 A 的機會成本 = B 的最大產量 ÷ A 的最大產量。',
        'On a straight-line PPF, the opportunity cost of one unit of A equals the maximum output of B divided by the maximum output of A.'),
      answer: answer3,
      choices: numChoices(rng, answer3, {
        min: 0, max: maxB, dp: 2,
        deltas: [0.25, -0.25, 0.5, -0.5, 1, -1, 1.5, -1.5]
      }),
      solution: {
        zh: [
          '直線 PPF 上，每增產 1 件 A 要放棄的 B 數量固定，等於「B 的最大產量 ÷ A 的最大產量」。',
          '每件 A 的機會成本 = ' + maxB + ' ÷ ' + maxA + ' = ' + answer3 + ' 件 B。',
          '因此生產 1 件 A 的機會成本是 ' + answer3 + ' 件 B。'
        ],
        en: [
          'On a straight-line PPF the amount of B given up for each extra unit of A is constant: (maximum output of B) ÷ (maximum output of A).',
          'Opportunity cost per unit of A = ' + maxB + ' ÷ ' + maxA + ' = ' + answer3 + ' units of B.',
          'So the opportunity cost of producing 1 unit of A is ' + answer3 + ' units of B.'
        ]
      },
      math: { mode: 'per-unit', maxA: maxA, maxB: maxB, answer: answer3 }
    };
  });

  /* =====================================================================
   * 2) ppc — 直線生產可能曲線
   * ===================================================================== */

  function ppfParams(rng) {
    var ratio = U.pick(rng, [0.5, 1, 2, 2.5, 3, 4]);  /* 每件 X 的機會成本（件 Y） */
    var maxX = 4 * U.randInt(rng, 25, 125);             /* 100–500 件 X */
    var maxY = maxX * ratio;                            /* 件 Y（整數） */
    return { ratio: ratio, maxX: maxX, maxY: maxY };
  }

  function ppfIntroZh(p) {
    return '某經濟只生產物品 X 和 Y，其生產可能曲線（PPF）是一條直線：全部資源用於生產 X 可得 ' + p.maxX + ' 件；全部資源用於生產 Y 可得 ' + p.maxY + ' 件。假設所有資源同質、技術不變。';
  }
  function ppfIntroEn(p) {
    return 'An economy produces only goods X and Y, and its production possibility curve (PPF) is a straight line: using all resources for X gives ' + p.maxX + ' units, while using all resources for Y gives ' + p.maxY + ' units. Assume all resources are homogeneous and technology is unchanged.';
  }

  EconData.registerType('ppc', function (rng, o) {
    var level = levelOf(o);

    if (level === 1) {
      var p1 = ppfParams(rng);
      var answer1 = U.round(p1.maxY / p1.maxX, 2);
      return {
        prompt: bi(
          ppfIntroZh(p1) + ' 生產 1 件 X 的機會成本是多少件 Y？（四捨五入至 2 位小數）',
          ppfIntroEn(p1) + ' What is the opportunity cost of producing 1 unit of X, measured in units of Y? (2 d.p.)'
        ),
        hint: bi('直線 PPF 上，每件 X 的機會成本 = Y 的最大產量 ÷ X 的最大產量。',
          'On a straight-line PPF, the opportunity cost of one unit of X is (maximum Y) ÷ (maximum X).'),
        answer: answer1,
        choices: numChoices(rng, answer1, {
          min: 0, max: p1.maxY, dp: 2,
          deltas: [0.5, -0.5, 1, -1, 2, -2, 0.25, -0.25]
        }),
        solution: {
          zh: [
            '直線 PPF 的斜率絕對值 = 每增產 1 件 X 要放棄的 Y 數量，也就是 X 的機會成本。',
            '每件 X 的機會成本 = ' + p1.maxY + ' ÷ ' + p1.maxX + ' = ' + answer1 + ' 件 Y。',
            '因此生產 1 件 X 的機會成本是 ' + answer1 + ' 件 Y。'
          ],
          en: [
            'The absolute slope of the straight-line PPF is the amount of Y given up for one more unit of X, i.e. the opportunity cost of X.',
            'Opportunity cost per unit of X = ' + p1.maxY + ' ÷ ' + p1.maxX + ' = ' + answer1 + ' units of Y.',
            'So the opportunity cost of producing 1 unit of X is ' + answer1 + ' units of Y.'
          ]
        },
        math: { mode: 'unit-cost', maxX: p1.maxX, maxY: p1.maxY, asked: 'opportunity-cost', answer: answer1 }
      };
    }

    if (level === 2) {
      var p2 = ppfParams(rng);
      var qx = 2 * U.randInt(rng, 5, Math.floor(p2.maxX / 2) - 5);
      var usedY = U.round(qx * p2.ratio, 2);
      var answer2 = U.round(p2.maxY - usedY, 2);
      return {
        prompt: bi(
          ppfIntroZh(p2) + ' 若該經濟已生產 ' + qx + ' 件 X，在生產可能曲線上，它最多還可以生產多少件 Y？',
          ppfIntroEn(p2) + ' If the economy already produces ' + qx + ' units of X, what is the maximum amount of Y it can still produce on the PPF?'
        ),
        hint: bi('先求每件 X 的機會成本，再計算生產 qx 件 X 所放棄的 Y。',
          'First find the opportunity cost of one unit of X, then subtract the Y given up for qx units of X from the maximum Y.'),
        answer: answer2,
        choices: numChoices(rng, answer2, { min: 0, max: p2.maxY, dp: 2 }),
        solution: {
          zh: [
            '每件 X 的機會成本 = ' + p2.maxY + ' ÷ ' + p2.maxX + ' = ' + p2.ratio + ' 件 Y。',
            '生產 ' + qx + ' 件 X 所放棄的 Y = ' + qx + ' × ' + p2.ratio + ' = ' + usedY + ' 件 Y。',
            '最多可生產的 Y = ' + p2.maxY + ' − ' + usedY + ' = ' + answer2 + ' 件 Y。',
            '因此最多還可以生產 ' + answer2 + ' 件 Y。'
          ],
          en: [
            'Opportunity cost per unit of X = ' + p2.maxY + ' ÷ ' + p2.maxX + ' = ' + p2.ratio + ' units of Y.',
            'Y given up for ' + qx + ' units of X = ' + qx + ' × ' + p2.ratio + ' = ' + usedY + ' units of Y.',
            'Maximum Y still attainable = ' + p2.maxY + ' − ' + usedY + ' = ' + answer2 + ' units of Y.',
            'So it can still produce ' + answer2 + ' units of Y.'
          ]
        },
        math: { mode: 'remaining', maxX: p2.maxX, maxY: p2.maxY, qx: qx, asked: 'max-remaining-y', answer: answer2 }
      };
    }

    /* level 3：點在 PPF 上 / 內 / 外（文字選項） */
    var p3 = ppfParams(rng);
    var qx3 = 2 * U.randInt(rng, 3, Math.floor(p3.maxX / 2) - 3);
    var onY = U.round(p3.maxY - qx3 * p3.ratio, 2);
    var point = U.pick(rng, ['on', 'inside', 'outside']);
    var qy3;
    if (point === 'on') {
      qy3 = onY;
    } else if (point === 'inside') {
      var drop = U.randInt(rng, 1, Math.min(onY - 1, 10));
      qy3 = onY - drop;
    } else {
      var room = p3.maxY - onY;
      var rise = U.randInt(rng, 1, Math.min(Math.max(room, 1), 10));
      qy3 = onY + rise;
    }
    var PPC_POINTS = [
      { id: 'on', zh: '在 PPF 上（有效率）', en: 'On the PPF (efficient)' },
      { id: 'inside', zh: '在 PPF 內（無效率）', en: 'Inside the PPF (inefficient)' },
      { id: 'outside', zh: '在 PPF 外（不可達）', en: 'Outside the PPF (unattainable)' }
    ];
    var pointLabel = null;
    for (var pi = 0; pi < PPC_POINTS.length; pi++) { if (PPC_POINTS[pi].id === point) pointLabel = PPC_POINTS[pi]; }
    var compareZh = point === 'on' ? '剛好等於' : (point === 'inside' ? '小於' : '大於');
    var compareEn = point === 'on' ? 'is exactly equal to' : (point === 'inside' ? 'is less than' : 'is greater than');
    var reasonZh = point === 'on'
      ? '點在 PPF 上代表資源已充分且最佳利用，生產有效率。'
      : (point === 'inside'
        ? '點在 PPF 內代表部分資源未被充分利用或未被最佳利用，生產無效率。'
        : '點在 PPF 外代表在現有資源與技術下無法達到。');
    var reasonEn = point === 'on'
      ? 'A point on the PPF means resources are fully and best used, so production is efficient.'
      : (point === 'inside'
        ? 'A point inside the PPF means some resources are underused or not best used, so production is inefficient.'
        : 'A point outside the PPF is unattainable with the current resources and technology.');
    return {
      prompt: bi(
        ppfIntroZh(p3) + ' 若該經濟目前的生產組合是 ' + qx3 + ' 件 X 和 ' + qy3 + ' 件 Y，這一點在哪裡？',
        ppfIntroEn(p3) + ' If the economy is currently producing ' + qx3 + ' units of X and ' + qy3 + ' units of Y, where is this point?'
      ),
      hint: bi('先算出 ' + qx3 + ' 件 X 時 PPF 上的 Y 數量，再與 ' + qy3 + ' 件 Y 比較。',
        'First work out the Y quantity on the PPF when X is ' + qx3 + ' units, then compare it with ' + qy3 + ' units of Y.'),
      answer: point,
      choices: ['on', 'inside', 'outside'],
      choiceLabels: U.labelsOf(PPC_POINTS),
      solution: {
        zh: [
          '當 ' + qx3 + ' 件 X 時，PPF 上的 Y 數量 = ' + p3.maxY + ' − ' + qx3 + ' × ' + p3.ratio + ' = ' + onY + ' 件 Y。',
          '目前生產 ' + qy3 + ' 件 Y，' + qy3 + ' ' + compareZh + ' PPF 上的 ' + onY + ' 件 Y。',
          reasonZh,
          '因此答案是「' + pointLabel.zh + '」。'
        ],
        en: [
          'When X is ' + qx3 + ' units, the amount of Y on the PPF is ' + p3.maxY + ' − ' + qx3 + ' × ' + p3.ratio + ' = ' + onY + ' units of Y.',
          'The economy currently produces ' + qy3 + ' units of Y, which ' + compareEn + ' the ' + onY + ' units of Y on the PPF.',
          reasonEn,
          'So the answer is "' + pointLabel.en + '".'
        ]
      },
      math: { mode: 'efficiency', maxX: p3.maxX, maxY: p3.maxY, qx: qx3, qy: qy3, point: point, answer: point }
    };
  });

  /* =====================================================================
   * 3) demand_shift / 4) supply_shift — 需求／供應曲線移動對均衡 P、Q 的影響
   * ===================================================================== */

  var SHIFT_OPTIONS = [
    { id: 'upup', zh: 'P 上升、Q 上升', en: 'P rises, Q rises' },
    { id: 'updown', zh: 'P 上升、Q 下跌', en: 'P rises, Q falls' },
    { id: 'downup', zh: 'P 下跌、Q 上升', en: 'P falls, Q rises' },
    { id: 'downdown', zh: 'P 下跌、Q 下跌', en: 'P falls, Q falls' }
  ];
  var SHIFT_CHOICES = ['upup', 'updown', 'downup', 'downdown'];
  var SHIFT_LABELS = U.labelsOf(SHIFT_OPTIONS);

  var MICRO_MARKETS = [
    { zh: '珍珠奶茶', en: 'bubble tea' },
    { zh: '咖啡', en: 'coffee' },
    { zh: '戲院門票', en: 'cinema tickets' },
    { zh: '麵包', en: 'bread' },
    { zh: '智能手機', en: 'smartphones' },
    { zh: '酒店房間', en: 'hotel rooms' }
  ];

  var DEMAND_EVENTS = [
    { key: 'income_up_normal', dir: 1, lv: 1,
      zh: '消費者的收入上升，而「{X}」是正常物品（normal good）。',
      en: 'Consumers\' income rises and {X} is a normal good.' },
    { key: 'income_down_normal', dir: -1, lv: 1,
      zh: '消費者的收入下跌，而「{X}」是正常物品（normal good）。',
      en: 'Consumers\' income falls and {X} is a normal good.' },
    { key: 'sub_up', dir: 1, lv: 1,
      zh: '「{X}」的替代品價格上升。',
      en: 'The price of a substitute for {X} rises.' },
    { key: 'sub_down', dir: -1, lv: 1,
      zh: '「{X}」的替代品價格下跌。',
      en: 'The price of a substitute for {X} falls.' },
    { key: 'pop_up', dir: 1, lv: 1,
      zh: '市場上的人口增加。',
      en: 'The population in the market increases.' },
    { key: 'pop_down', dir: -1, lv: 1,
      zh: '市場上的人口減少。',
      en: 'The population in the market decreases.' },
    { key: 'taste_up', dir: 1, lv: 2,
      zh: '消費者對「{X}」的偏好增強（例如潮流興起）。',
      en: 'Consumers\' preference for {X} increases (e.g. it becomes trendy).' },
    { key: 'taste_down', dir: -1, lv: 2,
      zh: '消費者對「{X}」的偏好減弱。',
      en: 'Consumers\' preference for {X} decreases.' },
    { key: 'comp_up', dir: -1, lv: 2,
      zh: '「{X}」的互補品價格上升。',
      en: 'The price of a complement for {X} rises.' },
    { key: 'comp_down', dir: 1, lv: 2,
      zh: '「{X}」的互補品價格下跌。',
      en: 'The price of a complement for {X} falls.' },
    { key: 'future_up', dir: 1, lv: 3,
      zh: '消費者預期「{X}」的價格在未來會上升。',
      en: 'Consumers expect the price of {X} to rise in the future.' },
    { key: 'future_down', dir: -1, lv: 3,
      zh: '消費者預期「{X}」的價格在未來會下跌。',
      en: 'Consumers expect the price of {X} to fall in the future.' },
    { key: 'income_up_inferior', dir: -1, lv: 3,
      zh: '消費者的收入上升，而「{X}」是劣等物品（inferior good）。',
      en: 'Consumers\' income rises and {X} is an inferior good.' },
    { key: 'income_down_inferior', dir: 1, lv: 3,
      zh: '消費者的收入下跌，而「{X}」是劣等物品（inferior good）。',
      en: 'Consumers\' income falls and {X} is an inferior good.' }
  ];

  var SUPPLY_EVENTS = [
    { key: 'cost_up', dir: -1, lv: 1,
      zh: '生產「{X}」的投入成本上升（例如原料價格上升）。',
      en: 'The cost of inputs used to produce {X} rises (e.g. raw material prices rise).' },
    { key: 'cost_down', dir: 1, lv: 1,
      zh: '生產「{X}」的投入成本下跌。',
      en: 'The cost of inputs used to produce {X} falls.' },
    { key: 'tech_up', dir: 1, lv: 1,
      zh: '生產「{X}」的技術進步，降低了生產成本。',
      en: 'Technological progress lowers the cost of producing {X}.' },
    { key: 'producers_up', dir: 1, lv: 1,
      zh: '生產「{X}」的廠商數目增加。',
      en: 'The number of firms producing {X} increases.' },
    { key: 'producers_down', dir: -1, lv: 2,
      zh: '生產「{X}」的廠商數目減少。',
      en: 'The number of firms producing {X} decreases.' },
    { key: 'subsidy', dir: 1, lv: 2,
      zh: '政府向「{X}」的生產者提供每單位補貼。',
      en: 'The government gives producers of {X} a per-unit subsidy.' },
    { key: 'tax', dir: -1, lv: 2,
      zh: '政府向「{X}」的生產者徵收每單位從量稅。',
      en: 'The government imposes a per-unit tax on producers of {X}.' },
    { key: 'expect_up', dir: -1, lv: 3,
      zh: '生產者預期「{X}」的價格在未來會上升，因此減少現在的供應。',
      en: 'Producers expect the price of {X} to rise in the future, so they supply less now.' },
    { key: 'expect_down', dir: 1, lv: 3,
      zh: '生產者預期「{X}」的價格在未來會下跌，因此增加現在的供應。',
      en: 'Producers expect the price of {X} to fall in the future, so they supply more now.' },
    { key: 'weather', dir: -1, lv: 3,
      zh: '惡劣天氣令「{X}」的生產受阻。',
      en: 'Bad weather disrupts the production of {X}.' },
    { key: 'wage_up', dir: -1, lv: 3,
      zh: '生產「{X}」的工資上升。',
      en: 'Wages in the production of {X} rise.' }
  ];

  function buildShiftProblem(rng, o, cfg) {
    var level = levelOf(o);
    var events = cfg.events.filter(function (ev) { return ev.lv <= level; });
    var ev = U.pick(rng, events);
    var market = U.pick(rng, cfg.markets);
    var Xzh = market.zh;
    var Xen = market.en;
    var evZh = ev.zh.replace('{X}', Xzh);
    var evEn = ev.en.replace('{X}', Xen);
    var isDemand = cfg.isDemand;
    var answer;
    if (isDemand) {
      answer = ev.dir > 0 ? 'upup' : 'downdown';
    } else {
      answer = ev.dir > 0 ? 'downup' : 'updown';
    }
    var answerLabel = null;
    for (var si = 0; si < SHIFT_OPTIONS.length; si++) {
      if (SHIFT_OPTIONS[si].id === answer) answerLabel = SHIFT_OPTIONS[si];
    }
    var subjectZh = isDemand ? '需求' : '供應';
    var otherZh = isDemand ? '供應' : '需求';
    var subjectEn = isDemand ? 'demand' : 'supply';
    var otherEn = isDemand ? 'supply' : 'demand';
    var promptZh = '考慮「' + Xzh + '」市場。事件：' + evZh + ' 假設其他因素不變，事件只令' + subjectZh + '曲線移動，' + otherZh + '曲線不變。以原有均衡為比較起點，新的均衡價格（P）與均衡數量（Q）會怎樣變化？';
    var promptEn = 'Consider the market for ' + Xen + '. Event: ' + evEn + ' Ceteris paribus, the event shifts only the ' + subjectEn + ' curve; the ' + otherEn + ' curve is unchanged. Compared with the original equilibrium, how will the equilibrium price (P) and quantity (Q) change?';
    var hintZh, hintEn;
    if (isDemand) {
      hintZh = '需求增加 → 需求曲線右移 → 均衡 P 與 Q 同升；需求減少 → 均衡 P 與 Q 同跌。';
      hintEn = 'A rise in demand shifts the demand curve right and raises both P and Q; a fall in demand lowers both P and Q.';
    } else {
      hintZh = '供應增加 → 供應曲線右移 → 均衡 P 跌、Q 升；供應減少 → 均衡 P 升、Q 跌。';
      hintEn = 'A rise in supply shifts the supply curve right, lowering P and raising Q; a fall in supply raises P and lowers Q.';
    }
    var solution;
    if (isDemand && ev.dir > 0) {
      solution = {
        zh: [
          '事件（' + evZh + '）令「' + Xzh + '」的需求增加，需求曲線向右移動。',
          '供應曲線不變時，需求增加會沿著向上傾斜的供應曲線推高均衡價格，同時增加均衡數量。',
          '因此 P 上升、Q 上升，答案是「' + answerLabel.zh + '」。'
        ],
        en: [
          'The event (' + evEn + ') increases the demand for ' + Xen + ', shifting the demand curve to the right.',
          'With supply unchanged, higher demand moves the equilibrium up along the upward-sloping supply curve, raising both equilibrium price and quantity.',
          'So P rises and Q rises; the answer is "' + answerLabel.en + '".'
        ]
      };
    } else if (isDemand) {
      solution = {
        zh: [
          '事件（' + evZh + '）令「' + Xzh + '」的需求減少，需求曲線向左移動。',
          '供應曲線不變時，需求減少會沿著向上傾斜的供應曲線壓低均衡價格，同時減少均衡數量。',
          '因此 P 下跌、Q 下跌，答案是「' + answerLabel.zh + '」。'
        ],
        en: [
          'The event (' + evEn + ') decreases the demand for ' + Xen + ', shifting the demand curve to the left.',
          'With supply unchanged, lower demand moves the equilibrium down along the upward-sloping supply curve, lowering both equilibrium price and quantity.',
          'So P falls and Q falls; the answer is "' + answerLabel.en + '".'
        ]
      };
    } else if (ev.dir > 0) {
      solution = {
        zh: [
          '事件（' + evZh + '）令「' + Xzh + '」的供應增加，供應曲線向右移動。',
          '需求曲線不變時，供應增加會沿著向下傾斜的需求曲線壓低均衡價格，同時增加均衡數量。',
          '因此 P 下跌、Q 上升，答案是「' + answerLabel.zh + '」。'
        ],
        en: [
          'The event (' + evEn + ') increases the supply of ' + Xen + ', shifting the supply curve to the right.',
          'With demand unchanged, higher supply moves the equilibrium down along the downward-sloping demand curve, lowering equilibrium price and raising equilibrium quantity.',
          'So P falls and Q rises; the answer is "' + answerLabel.en + '".'
        ]
      };
    } else {
      solution = {
        zh: [
          '事件（' + evZh + '）令「' + Xzh + '」的供應減少，供應曲線向左移動。',
          '需求曲線不變時，供應減少會沿著向下傾斜的需求曲線推高均衡價格，同時減少均衡數量。',
          '因此 P 上升、Q 下跌，答案是「' + answerLabel.zh + '」。'
        ],
        en: [
          'The event (' + evEn + ') decreases the supply of ' + Xen + ', shifting the supply curve to the left.',
          'With demand unchanged, lower supply moves the equilibrium up along the downward-sloping demand curve, raising equilibrium price and lowering equilibrium quantity.',
          'So P rises and Q falls; the answer is "' + answerLabel.en + '".'
        ]
      };
    }
    return {
      prompt: bi(promptZh, promptEn),
      hint: bi(hintZh, hintEn),
      answer: answer,
      choices: SHIFT_CHOICES.slice(),
      choiceLabels: SHIFT_LABELS,
      solution: solution,
      math: {
        kind: isDemand ? 'demand' : 'supply',
        event: ev.key,
        direction: ev.dir,
        market: market.en,
        answer: answer
      }
    };
  }

  EconData.registerType('demand_shift', function (rng, o) {
    return buildShiftProblem(rng, o, { isDemand: true, events: DEMAND_EVENTS, markets: MICRO_MARKETS });
  });

  EconData.registerType('supply_shift', function (rng, o) {
    return buildShiftProblem(rng, o, { isDemand: false, events: SUPPLY_EVENTS, markets: MICRO_MARKETS });
  });

  /* =====================================================================
   * 5) equilibrium — 線性供需與均衡
   * ===================================================================== */

  function eqParams(rng) {
    var b = U.randInt(rng, 1, 4);      /* Qd = a − bP */
    var d = U.randInt(rng, 1, 4);      /* Qs = c + dP */
    var pe = U.randInt(rng, 4, 12);
    var c = U.randInt(rng, 20, 80);
    var qe = c + d * pe;
    var a = qe + b * pe;
    return { a: a, b: b, c: c, d: d, pe: pe, qe: qe };
  }

  function eqPromptZh(e, tail) {
    return '某商品的市場需求函數為 $Q_d = ' + e.a + ' - ' + e.b + 'P$，供應函數為 $Q_s = ' + e.c + ' + ' + e.d + 'P$，其中 P 為價格（元），Q 為數量（件）。' + tail;
  }
  function eqPromptEn(e, tail) {
    return 'The market demand for a good is $Q_d = ' + e.a + ' - ' + e.b + 'P$ and the supply is $Q_s = ' + e.c + ' + ' + e.d + 'P$, where P is the price in dollars and Q is the quantity in units. ' + tail;
  }

  EconData.registerType('equilibrium', function (rng, o) {
    var level = levelOf(o);
    var e = eqParams(rng);

    if (level === 1) {
      var asked1 = U.pick(rng, ['price', 'quantity']);
      var answer1 = asked1 === 'price' ? e.pe : e.qe;
      var askZh1 = asked1 === 'price' ? '求均衡價格（元）。' : '求均衡數量（件）。';
      var askEn1 = asked1 === 'price' ? 'Find the equilibrium price (in dollars).' : 'Find the equilibrium quantity (in units).';
      return {
        prompt: bi(eqPromptZh(e, '假設市場處於均衡。' + askZh1), eqPromptEn(e, 'The market is in equilibrium. ' + askEn1)),
        hint: bi('均衡時需求量等於供應量：$Q_d = Q_s$；把兩條函數相等後解 P。',
          'In equilibrium quantity demanded equals quantity supplied: $Q_d = Q_s$. Set the two functions equal and solve for P.'),
        answer: answer1,
        choices: numChoices(rng, answer1, { min: 0, dp: 2 }),
        solution: {
          zh: [
            '均衡時需求量等於供應量：$Q_d = Q_s$，即 $' + e.a + ' - ' + e.b + 'P = ' + e.c + ' + ' + e.d + 'P$。',
            '整理得 $' + (e.b + e.d) + 'P = ' + (e.a - e.c) + '$，所以均衡價格 $P = ' + e.pe + '$ 元。',
            '代回需求函數：$Q = ' + e.a + ' - ' + e.b + ' × ' + e.pe + ' = ' + e.qe + '$ 件。',
            '因此均衡價格為 ' + e.pe + ' 元，均衡數量為 ' + e.qe + ' 件；本題要求的均衡' + (asked1 === 'price' ? '價格是 ' + e.pe + ' 元' : '數量是 ' + e.qe + ' 件') + '。'
          ],
          en: [
            'In equilibrium $Q_d = Q_s$, i.e. $' + e.a + ' - ' + e.b + 'P = ' + e.c + ' + ' + e.d + 'P$.',
            'Rearranging gives $' + (e.b + e.d) + 'P = ' + (e.a - e.c) + '$, so the equilibrium price is $P = ' + e.pe + '$ dollars.',
            'Substitute back into demand: $Q = ' + e.a + ' - ' + e.b + ' × ' + e.pe + ' = ' + e.qe + '$ units.',
            'Thus the equilibrium price is ' + e.pe + ' dollars and the equilibrium quantity is ' + e.qe + ' units; the required equilibrium ' + (asked1 === 'price' ? 'price is ' + e.pe + ' dollars' : 'quantity is ' + e.qe + ' units') + '.'
          ]
        },
        math: { mode: 'level1', a: e.a, b: e.b, c: e.c, d: e.d, asked: asked1, answer: answer1 }
      };
    }

    if (level === 2) {
      var above = rng() < 0.5;
      var p0;
      if (above) {
        var maxRise = Math.min(5, Math.floor((e.qe - 2) / e.b), e.pe - 1);
        if (maxRise < 1) maxRise = 1;
        p0 = e.pe + U.randInt(rng, 1, maxRise);
      } else {
        var maxFall = Math.min(5, e.pe - 1);
        if (maxFall < 1) maxFall = 1;
        p0 = e.pe - U.randInt(rng, 1, maxFall);
      }
      var qd0 = e.a - e.b * p0;
      var qs0 = e.c + e.d * p0;
      var gap = above ? qs0 - qd0 : qd0 - qs0;
      var gapNameZh = above ? '盈餘（過剩）' : '短缺';
      var gapNameEn = above ? 'surplus' : 'shortage';
      var asked2 = above ? 'surplus' : 'shortage';
      return {
        prompt: bi(
          eqPromptZh(e, '若市場價格為 ' + p0 + ' 元（' + (above ? '高於' : '低於') + '均衡價格），求市場的' + gapNameZh + '數量（件）。'),
          eqPromptEn(e, 'If the market price is ' + p0 + ' dollars (' + (above ? 'above' : 'below') + ' the equilibrium price), find the size of the ' + gapNameEn + ' (in units).')
        ),
        hint: bi('把 P = ' + p0 + ' 元分別代入需求與供應函數，再比較兩者的數量。',
          'Substitute P = ' + p0 + ' dollars into both the demand and supply functions, then compare the two quantities.'),
        answer: gap,
        choices: numChoices(rng, gap, { min: 0, dp: 2 }),
        solution: {
          zh: [
            '把 $P = ' + p0 + '$ 代入需求函數：$Q_d = ' + e.a + ' - ' + e.b + ' × ' + p0 + ' = ' + qd0 + '$ 件。',
            '代入供應函數：$Q_s = ' + e.c + ' + ' + e.d + ' × ' + p0 + ' = ' + qs0 + '$ 件。',
            (above ? '因為 $Q_s > Q_d$，市場出現盈餘（過剩）。' : '因為 $Q_d > Q_s$，市場出現短缺。'),
            '數量 = |' + qs0 + ' − ' + qd0 + '| = ' + gap + ' 件，因此' + gapNameZh + '數量為 ' + gap + ' 件。'
          ],
          en: [
            'Substitute $P = ' + p0 + '$ into demand: $Q_d = ' + e.a + ' - ' + e.b + ' × ' + p0 + ' = ' + qd0 + '$ units.',
            'Substitute into supply: $Q_s = ' + e.c + ' + ' + e.d + ' × ' + p0 + ' = ' + qs0 + '$ units.',
            (above ? 'Since $Q_s > Q_d$, there is a surplus.' : 'Since $Q_d > Q_s$, there is a shortage.'),
            'Size = |' + qs0 + ' − ' + qd0 + '| = ' + gap + ' units, so the ' + gapNameEn + ' is ' + gap + ' units.'
          ]
        },
        math: { mode: 'price-control', a: e.a, b: e.b, c: e.c, d: e.d, p0: p0, asked: asked2, answer: gap }
      };
    }

    /* level 3：曲線平移後的新均衡 */
    var shiftKind = U.pick(rng, ['demand_up', 'demand_down', 'supply_up', 'supply_down']);
    var t = U.randInt(rng, 1, 2);
    var k = (e.b + e.d) * t;
    var newA = e.a;
    var newC = e.c;
    if (shiftKind === 'demand_up') newA = e.a + k;
    if (shiftKind === 'demand_down') newA = e.a - k;
    if (shiftKind === 'supply_up') newC = e.c + k;
    if (shiftKind === 'supply_down') newC = e.c - k;
    var newPe = (newA - newC) / (e.b + e.d);
    var newQe = newA - e.b * newPe;
    var asked3 = U.pick(rng, ['price', 'quantity']);
    var answer3 = asked3 === 'price' ? newPe : newQe;
    var shiftZhMap = {
      demand_up: '需求增加 ' + k + ' 單位',
      demand_down: '需求減少 ' + k + ' 單位',
      supply_up: '供應增加 ' + k + ' 單位',
      supply_down: '供應減少 ' + k + ' 單位'
    };
    var shiftEnMap = {
      demand_up: 'demand increases by ' + k + ' units',
      demand_down: 'demand decreases by ' + k + ' units',
      supply_up: 'supply increases by ' + k + ' units',
      supply_down: 'supply decreases by ' + k + ' units'
    };
    var isDemandShift = shiftKind.indexOf('demand') === 0;
    var newFnZh = isDemandShift ? ('$Q_d = ' + newA + ' - ' + e.b + 'P$') : ('$Q_s = ' + newC + ' + ' + e.d + 'P$');
    var newFnEn = isDemandShift ? ('$Q_d = ' + newA + ' - ' + e.b + 'P$') : ('$Q_s = ' + newC + ' + ' + e.d + 'P$');
    var tailZh3 = '現' + shiftZhMap[shiftKind] + '，新' + (isDemandShift ? '需求' : '供應') + '函數為 ' + newFnZh + '。求新的均衡' + (asked3 === 'price' ? '價格（元）。' : '數量（件）。');
    var tailEn3 = 'Now ' + shiftEnMap[shiftKind] + ', so the new ' + (isDemandShift ? 'demand' : 'supply') + ' function is ' + newFnEn + '. Find the new equilibrium ' + (asked3 === 'price' ? 'price (in dollars).' : 'quantity (in units).');
    return {
      prompt: bi(eqPromptZh(e, tailZh3), eqPromptEn(e, tailEn3)),
      hint: bi('先寫出平移後的新函數，再令新的 $Q_d = Q_s$ 解新均衡。',
        'Write down the new function after the shift, then set the new $Q_d = Q_s$ and solve for the new equilibrium.'),
      answer: answer3,
      choices: numChoices(rng, answer3, { min: 0, dp: 2 }),
      solution: {
        zh: [
          '平移後的新' + (isDemandShift ? '需求' : '供應') + '函數為 ' + newFnZh + '。',
          '令 $Q_d = Q_s$：$' + newA + ' - ' + e.b + 'P = ' + newC + ' + ' + e.d + 'P$。',
          '解得新均衡價格 $P = (' + newA + ' − ' + newC + ') ÷ ' + (e.b + e.d) + ' = ' + newPe + '$ 元。',
          '代回新' + (isDemandShift ? '需求' : '供應') + '函數得新均衡數量 $Q = ' + newQe + '$ 件；本題要求的新均衡' + (asked3 === 'price' ? '價格是 ' + newPe + ' 元' : '數量是 ' + newQe + ' 件') + '。'
        ],
        en: [
          'After the shift the new ' + (isDemandShift ? 'demand' : 'supply') + ' function is ' + newFnEn + '.',
          'Set $Q_d = Q_s$: $' + newA + ' - ' + e.b + 'P = ' + newC + ' + ' + e.d + 'P$.',
          'Solving gives the new equilibrium price $P = (' + newA + ' − ' + newC + ') ÷ ' + (e.b + e.d) + ' = ' + newPe + '$ dollars.',
          'Substituting back gives the new equilibrium quantity $Q = ' + newQe + '$ units; the required new equilibrium ' + (asked3 === 'price' ? 'price is ' + newPe + ' dollars' : 'quantity is ' + newQe + ' units') + '.'
        ]
      },
      math: {
        mode: 'shift', a: e.a, b: e.b, c: e.c, d: e.d,
        newA: newA, newC: newC, shift: shiftKind, asked: asked3, answer: answer3
      }
    };
  });

  /* =====================================================================
   * 6) ped — 需求價格彈性（初始值法 / 中點法 / 點彈性）
   * ===================================================================== */

  /* 中點法用的價格組合（avg, half）：2×half ÷ avg 為整數百分比 */
  var MID_PRICE_PAIRS = [
    { avg: 10, half: 1 },
    { avg: 10, half: 2 },
    { avg: 20, half: 2 },
    { avg: 20, half: 5 },
    { avg: 40, half: 4 },
    { avg: 40, half: 5 },
    { avg: 50, half: 5 },
    { avg: 50, half: 10 }
  ];
  /* 供應彈性／交叉彈性用：dP 百分比需為整數且 dQ 百分比亦為整數 */
  var MID_PRICE_PAIRS_INT = [
    { avg: 10, half: 1 },
    { avg: 10, half: 2 },
    { avg: 20, half: 2 },
    { avg: 20, half: 5 },
    { avg: 40, half: 4 },
    { avg: 50, half: 5 },
    { avg: 50, half: 10 }
  ];

  EconData.registerType('ped', function (rng, o) {
    var level = levelOf(o);

    if (level === 1) {
      /* 初始值法：由價格／數量的水平變化，用初始值作分母 */
      var p1 = 10 * U.randInt(rng, 3, 8);
      var dPct = U.pick(rng, [-20, -10, 10, 20]);
      var ped1 = U.pick(rng, [0.5, 1, 1.5, 2, 2.5, 3]);
      var dQPct = -ped1 * dPct;
      var q1 = 20 * U.randInt(rng, 5, 20);
      var p2 = p1 * (1 + dPct / 100);
      var q2 = q1 + (q1 / 20) * (dQPct / 5);
      var answer1 = U.round(Math.abs(dQPct / dPct), 2);
      var isRise1 = dPct > 0;
      return {
        prompt: bi(
          '某商品的價格由 ' + p1 + ' 元' + (isRise1 ? '上升' : '下跌') + '至 ' + p2 + ' 元，需求量由 ' + q1 + ' 件變為 ' + q2 + ' 件。假設其他因素不變，用初始值法計算需求價格彈性（取絕對值，四捨五入至 2 位小數）。',
          'The price of a good changes from ' + p1 + ' to ' + p2 + ' dollars and quantity demanded changes from ' + q1 + ' to ' + q2 + ' units. Ceteris paribus, using the initial-value method, compute the price elasticity of demand (absolute value, 2 d.p.).'
        ),
        hint: bi('初始值法：$PED = |\\%\\Delta Q \\div \\%\\Delta P|$，百分比以「原來的水平」作分母。',
          'Initial-value method: $PED = |\\%\\Delta Q \\div \\%\\Delta P|$, with the original levels as the base.'),
        answer: answer1,
        choices: numChoices(rng, answer1, { min: 0, dp: 2 }),
        solution: {
          zh: [
            '需求量變動百分比 = (' + q2 + ' − ' + q1 + ') ÷ ' + q1 + ' × 100% = ' + dQPct + '%。',
            '價格變動百分比 = (' + p2 + ' − ' + p1 + ') ÷ ' + p1 + ' × 100% = ' + dPct + '%。',
            'PED = |' + dQPct + '% ÷ ' + dPct + '%| = ' + answer1 + '；因為 ' + answer1 + ' > 1，' + elasticWordZh(answer1) + '。',
            '因此需求價格彈性為 ' + answer1 + '（取絕對值）。'
          ],
          en: [
            '% change in quantity demanded = (' + q2 + ' − ' + q1 + ') ÷ ' + q1 + ' × 100% = ' + dQPct + '%.',
            '% change in price = (' + p2 + ' − ' + p1 + ') ÷ ' + p1 + ' × 100% = ' + dPct + '%.',
            'PED = |' + dQPct + '% ÷ ' + dPct + '%| = ' + answer1 + '; since ' + answer1 + ' > 1, ' + elasticWordEn(answer1) + '.',
            'So the price elasticity of demand is ' + answer1 + ' (absolute value).'
          ]
        },
        math: { mode: 'initial', p1: p1, p2: p2, q1: q1, q2: q2, ped: answer1, answer: answer1 }
      };
    }

    if (level === 2) {
      /* 中點法：由線性需求函數抽出兩個價格水平 */
      var pair = U.pick(rng, MID_PRICE_PAIRS);
      var avgP = pair.avg;
      var half = pair.half;
      var p1b = avgP - half;
      var p2b = avgP + half;
      var slope = U.randInt(rng, 1, 4);
      var qAvg = U.pick(rng, [100, 200, 250, 500]);
      var intercept = qAvg + slope * avgP;
      var q1b = qAvg + slope * half;
      var q2b = qAvg - slope * half;
      var dPctB = U.round((p2b - p1b) / avgP * 100, 2);
      var dQPctB = U.round((q2b - q1b) / qAvg * 100, 2);
      var answer2 = U.round(Math.abs(dQPctB / dPctB), 2);
      return {
        prompt: bi(
          '某商品的價格由 ' + p1b + ' 元上升至 ' + p2b + ' 元，需求量由 ' + q1b + ' 件下跌至 ' + q2b + ' 件。假設其他因素不變，用中點法計算需求價格彈性（取絕對值，四捨五入至 2 位小數）。',
          'The price of a good rises from ' + p1b + ' to ' + p2b + ' dollars and quantity demanded falls from ' + q1b + ' to ' + q2b + ' units. Ceteris paribus, using the midpoint method, compute the price elasticity of demand (absolute value, 2 d.p.).'
        ),
        hint: bi('中點法：以平均價格與平均數量作分母：$PED = |(\\Delta Q \\div Q_{avg}) \\div (\\Delta P \\div P_{avg})|$。',
          'Midpoint method: divide by the average price and average quantity: $PED = |(\\Delta Q \\div Q_{avg}) \\div (\\Delta P \\div P_{avg})|$.'),
        answer: answer2,
        choices: numChoices(rng, answer2, { min: 0, dp: 2 }),
        solution: {
          zh: [
            '平均價格 = (' + p1b + ' + ' + p2b + ') ÷ 2 = ' + avgP + ' 元；價格變動百分比 = (' + p2b + ' − ' + p1b + ') ÷ ' + avgP + ' × 100% = ' + dPctB + '%。',
            '平均數量 = (' + q1b + ' + ' + q2b + ') ÷ 2 = ' + qAvg + ' 件；需求量變動百分比 = (' + q2b + ' − ' + q1b + ') ÷ ' + qAvg + ' × 100% = ' + dQPctB + '%。',
            'PED = |' + dQPctB + '% ÷ ' + dPctB + '%| = ' + answer2 + '。',
            '因此需求價格彈性為 ' + answer2 + '（取絕對值）；' + elasticWordZh(answer2) + '。'
          ],
          en: [
            'Average price = (' + p1b + ' + ' + p2b + ') ÷ 2 = ' + avgP + ' dollars; % change in price = (' + p2b + ' − ' + p1b + ') ÷ ' + avgP + ' × 100% = ' + dPctB + '%.',
            'Average quantity = (' + q1b + ' + ' + q2b + ') ÷ 2 = ' + qAvg + ' units; % change in quantity demanded = (' + q2b + ' − ' + q1b + ') ÷ ' + qAvg + ' × 100% = ' + dQPctB + '%.',
            'PED = |' + dQPctB + '% ÷ ' + dPctB + '%| = ' + answer2 + '.',
            'So the price elasticity of demand is ' + answer2 + ' (absolute value); ' + elasticWordEn(answer2) + '.'
          ]
        },
        math: { mode: 'midpoint', p1: p1b, p2: p2b, q1: q1b, q2: q2b, ped: answer2, answer: answer2 }
      };
    }

    /* level 3：由 Qd = a − bP 求點彈性 */
    var slope3 = U.randInt(rng, 1, 6);
    var p3 = U.randInt(rng, 2, 20);
    var q3 = U.randInt(rng, 20, 200);
    var a3 = q3 + slope3 * p3;
    var answer3 = U.round(slope3 * p3 / q3, 2);
    return {
      prompt: bi(
        '某商品的需求函數為 $Q_d = ' + a3 + ' - ' + slope3 + 'P$，其中 P 為價格（元），Q 為數量（件）。求價格為 ' + p3 + ' 元時的點價格彈性（point price elasticity），取絕對值並四捨五入至 2 位小數。',
        'The demand function for a good is $Q_d = ' + a3 + ' - ' + slope3 + 'P$, where P is the price in dollars and Q is the quantity in units. Find the point price elasticity of demand at P = ' + p3 + ' dollars (absolute value, 2 d.p.).'
      ),
      hint: bi('點彈性 $PED = |(dQ/dP) \\times (P/Q)| = bP/Q$，其中 b 是需求函數中 P 的係數。',
        'Point elasticity $PED = |(dQ/dP) \\times (P/Q)| = bP/Q$, where b is the coefficient of P in the demand function.'),
      answer: answer3,
      choices: numChoices(rng, answer3, { min: 0, dp: 2 }),
      solution: {
        zh: [
          '當 $P = ' + p3 + '$ 時，需求量 $Q = ' + a3 + ' - ' + slope3 + ' × ' + p3 + ' = ' + q3 + '$ 件。',
          '點價格彈性 $PED = |b \\times P/Q| = |' + slope3 + ' × ' + p3 + ' ÷ ' + q3 + '| = ' + answer3 + '$。',
          '因此價格為 ' + p3 + ' 元時的點價格彈性為 ' + answer3 + '（取絕對值）；' + elasticWordZh(answer3) + '。'
        ],
        en: [
          'At $P = ' + p3 + '$, quantity demanded $Q = ' + a3 + ' - ' + slope3 + ' × ' + p3 + ' = ' + q3 + '$ units.',
          'Point price elasticity $PED = |b \\times P/Q| = |' + slope3 + ' × ' + p3 + ' ÷ ' + q3 + '| = ' + answer3 + '$.',
          'So the point price elasticity at P = ' + p3 + ' dollars is ' + answer3 + ' (absolute value); ' + elasticWordEn(answer3) + '.'
        ]
      },
      math: { mode: 'point', a: a3, b: slope3, p: p3, q: q3, ped: answer3, answer: answer3 }
    };
  });

  /* =====================================================================
   * 7) ped_tr — 價格彈性與總收入
   * ===================================================================== */

  EconData.registerType('ped_tr', function (rng, o) {
    var level = levelOf(o);

    if (level <= 2) {
      var ped = level === 1
        ? U.pick(rng, [0.5, 1, 2, 2.5])
        : U.pick(rng, [0.4, 0.8, 1.2, 1.5, 1.8, 2.5, 3]);
      var dP = level === 1
        ? U.pick(rng, [-20, -10, 10, 20])
        : U.pick(rng, [-25, -15, -10, 10, 15, 25]);
      var dQ = -ped * dP;
      var factorP = 1 + dP / 100;
      var factorQ = 1 + dQ / 100;
      var trFactor = factorP * factorQ;
      var trChange = trFactor - 1;
      var answer = U.round(trChange * 100, 2);
      var shownFactor = U.round(trFactor, 6);
      var shownChange = U.round(trChange, 4);
      var priceWordZh = dP > 0 ? '上升' : '下跌';
      var priceWordEn = dP > 0 ? 'rises' : 'falls';
      return {
        prompt: bi(
          '某商品的需求價格彈性（絕對值）為 ' + ped + '。若價格' + priceWordZh + ' ' + Math.abs(dP) + '%，假設其他因素不變，求總收入的變動百分比（上升為正、下跌為負，四捨五入至 2 位小數）。',
          'The price elasticity of demand (absolute value) for a good is ' + ped + '. If the price ' + priceWordEn + ' by ' + Math.abs(dP) + '%, ceteris paribus, find the percentage change in total revenue (positive for a rise, negative for a fall, 2 d.p.).'
        ),
        hint: bi('先求 %ΔQ = −PED × %ΔP，再用 %ΔTR = (1 + %ΔP)(1 + %ΔQ) − 1。',
          'First find %ΔQ = −PED × %ΔP, then use %ΔTR = (1 + %ΔP)(1 + %ΔQ) − 1.'),
        answer: answer,
        choices: numChoices(rng, answer, {
          min: -100, max: 100, dp: 2,
          deltas: [-10, -5, -2, -1, 1, 2, 5, 10]
        }),
        solution: {
          zh: [
            '需求量變動百分比 = −PED × 價格變動百分比 = −' + ped + ' × ' + dP + '% = ' + dQ + '%。',
            '總收入變動 = (1 + ' + U.fmt(dP / 100, 2) + ') × (1 + ' + U.fmt(dQ / 100, 2) + ') − 1 = ' + U.fmt(shownFactor, 4) + ' − 1 = ' + U.fmt(shownChange, 4) + '。',
            '換成百分比：總收入變動百分比 = ' + answer + '%，即總收入' + changeZh(answer) + ' ' + U.fmt(Math.abs(answer), 2) + '%。',
            '因此總收入變動百分比為 ' + answer + '%。'
          ],
          en: [
            '% change in quantity demanded = −PED × % change in price = −' + ped + ' × ' + dP + '% = ' + dQ + '%.',
            'Change in total revenue = (1 + ' + U.fmt(dP / 100, 2) + ') × (1 + ' + U.fmt(dQ / 100, 2) + ') − 1 = ' + U.fmt(shownFactor, 4) + ' − 1 = ' + U.fmt(shownChange, 4) + '.',
            'As a percentage, the change in total revenue is ' + answer + '%, i.e. total revenue ' + changeEn(answer) + ' by ' + U.fmt(Math.abs(answer), 2) + '%.',
            'So the percentage change in total revenue is ' + answer + '%.'
          ]
        },
        math: { mode: 'percent', ped: ped, dPricePct: dP, dQuantityPct: dQ, trPct: answer, answer: answer }
      };
    }

    /* level 3：由彈性大小判斷價格上升時總收入的方向（文字選項） */
    var ped3 = U.pick(rng, [0.4, 0.5, 0.8, 1.2, 1.5, 2, 2.5, 3]);
    var dP3 = U.pick(rng, [10, 15, 20]);
    var answer3 = ped3 > 1 ? 'fall' : 'rise';
    var TR_OPTIONS = [
      { id: 'rise', zh: '總收入上升', en: 'Total revenue rises' },
      { id: 'fall', zh: '總收入下跌', en: 'Total revenue falls' },
      { id: 'same', zh: '總收入不變', en: 'Total revenue stays the same' }
    ];
    var dQ3 = -ped3 * dP3;
    var answerLabel3 = answer3 === 'fall' ? '總收入下跌' : '總收入上升';
    var answerLabelEn3 = answer3 === 'fall' ? 'Total revenue falls' : 'Total revenue rises';
    return {
      prompt: bi(
        '某商品的需求價格彈性（絕對值）為 ' + ped3 + '。若價格上升 ' + dP3 + '%，假設其他因素不變，總收入會上升、下跌還是不變？',
        'The price elasticity of demand (absolute value) for a good is ' + ped3 + '. If the price rises by ' + dP3 + '%, ceteris paribus, will total revenue rise, fall or stay the same?'
      ),
      hint: bi('先求 %ΔQ = −PED × %ΔP，再比較價格與數量變動的百分比大小。',
        'First find %ΔQ = −PED × %ΔP, then compare the percentage changes in price and quantity.'),
      answer: answer3,
      choices: ['rise', 'fall', 'same'],
      choiceLabels: U.labelsOf(TR_OPTIONS),
      solution: {
        zh: [
          '需求量變動百分比 = −PED × 價格變動百分比 = −' + ped3 + ' × ' + dP3 + '% = ' + dQ3 + '%。',
          (ped3 > 1
            ? '因為需求富彈性（|PED| > 1），需求量下跌的百分比大於價格上升的百分比，數量效應主導。'
            : '因為需求缺乏彈性（|PED| < 1），需求量下跌的百分比小於價格上升的百分比，價格效應主導。'),
          '因此總收入會' + (answer3 === 'fall' ? '下跌' : '上升') + '，答案是「' + answerLabel3 + '」。'
        ],
        en: [
          '% change in quantity demanded = −PED × % change in price = −' + ped3 + ' × ' + dP3 + '% = ' + dQ3 + '%.',
          (ped3 > 1
            ? 'Since demand is elastic (|PED| > 1), the percentage fall in quantity is larger than the percentage rise in price, so the quantity effect dominates.'
            : 'Since demand is inelastic (|PED| < 1), the percentage fall in quantity is smaller than the percentage rise in price, so the price effect dominates.'),
          'Therefore total revenue ' + (answer3 === 'fall' ? 'falls' : 'rises') + '; the answer is "' + answerLabelEn3 + '".'
        ]
      },
      math: { mode: 'direction', ped: ped3, dPricePct: dP3, dQuantityPct: dQ3, direction: answer3, answer: answer3 }
    };
  });

  /* =====================================================================
   * 8) yed — 收入彈性
   * ===================================================================== */

  var YED_VALUES = [-2.5, -2, -1.5, -0.8, -0.5, 0.4, 0.6, 0.8, 1.2, 1.5, 2, 2.5, 3];
  var YED_CHOICE_DELTAS = [-3, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 3];

  EconData.registerType('yed', function (rng, o) {
    var level = levelOf(o);
    var yed = U.pick(rng, YED_VALUES);

    if (level === 1) {
      var dIncome = U.pick(rng, [-20, -10, 10, 20]);
      var dQuantity = yed * dIncome;
      var answer1 = U.round(dQuantity / dIncome, 2);
      return {
        prompt: bi(
          '某家庭的收入' + changeZh(dIncome) + ' ' + Math.abs(dIncome) + '% 後，對物品 X 的需求量' + changeZh(dQuantity) + ' ' + U.fmt(Math.abs(dQuantity), 2) + '%。假設其他因素不變，計算物品 X 的收入彈性（YED），並保留正負號（四捨五入至 2 位小數）。',
          'After a household\'s income ' + changeEn(dIncome) + ' by ' + Math.abs(dIncome) + '%, the quantity of good X demanded ' + changeEn(dQuantity) + ' by ' + U.fmt(Math.abs(dQuantity), 2) + '%. Ceteris paribus, compute the income elasticity of demand (YED) for good X, keeping the sign (2 d.p.).'
        ),
        hint: bi('YED = 需求量變動百分比 ÷ 收入變動百分比，保留正負號。',
          'YED = % change in quantity demanded ÷ % change in income, keeping the sign.'),
        answer: answer1,
        choices: numChoices(rng, answer1, { min: -100, max: 100, dp: 2, deltas: YED_CHOICE_DELTAS }),
        solution: {
          zh: [
            '收入變動百分比 = ' + dIncome + '%，需求量變動百分比 = ' + dQuantity + '%。',
            'YED = 需求量變動百分比 ÷ 收入變動百分比 = ' + dQuantity + '% ÷ ' + dIncome + '% = ' + answer1 + '。',
            'YED = ' + answer1 + '；' + yedKindTextZh(answer1)
          ],
          en: [
            '% change in income = ' + dIncome + '%; % change in quantity demanded = ' + dQuantity + '%.',
            'YED = % change in quantity demanded ÷ % change in income = ' + dQuantity + '% ÷ ' + dIncome + '% = ' + answer1 + '.',
            'YED = ' + answer1 + '; ' + yedKindTextEn(answer1)
          ]
        },
        math: { mode: 'initial', dIncomePct: dIncome, dQuantityPct: dQuantity, yed: answer1, kind: yedKind(answer1).key, answer: answer1 }
      };
    }

    if (level === 2) {
      var dIncome2 = U.pick(rng, [-20, -10, 10, 20]);
      var dQuantity2 = yed * dIncome2;
      var income1 = 20 * U.randInt(rng, 25, 100);
      var income2 = income1 * (1 + dIncome2 / 100);
      var quantity1 = 100 * U.randInt(rng, 1, 4);
      var quantity2 = quantity1 * (1 + dQuantity2 / 100);
      var answer2 = U.round(dQuantity2 / dIncome2, 2);
      return {
        prompt: bi(
          '某家庭每月收入由 ' + income1 + ' 元變為 ' + income2 + ' 元，對物品 X 的每月需求量由 ' + quantity1 + ' 件變為 ' + quantity2 + ' 件。假設其他因素不變，用初始值法計算物品 X 的收入彈性（YED），並保留正負號（四捨五入至 2 位小數）。',
          'A household\'s monthly income changes from ' + income1 + ' to ' + income2 + ' dollars, and its monthly quantity demanded of good X changes from ' + quantity1 + ' to ' + quantity2 + ' units. Ceteris paribus, using the initial-value method, compute the income elasticity of demand (YED) for good X, keeping the sign (2 d.p.).'
        ),
        hint: bi('初始值法：YED = [(Q2 − Q1) ÷ Q1] ÷ [(I2 − I1) ÷ I1]，保留正負號。',
          'Initial-value method: YED = [(Q2 − Q1) ÷ Q1] ÷ [(I2 − I1) ÷ I1], keeping the sign.'),
        answer: answer2,
        choices: numChoices(rng, answer2, { min: -100, max: 100, dp: 2, deltas: YED_CHOICE_DELTAS }),
        solution: {
          zh: [
            '收入變動百分比 = (' + income2 + ' − ' + income1 + ') ÷ ' + income1 + ' × 100% = ' + dIncome2 + '%。',
            '需求量變動百分比 = (' + quantity2 + ' − ' + quantity1 + ') ÷ ' + quantity1 + ' × 100% = ' + dQuantity2 + '%。',
            'YED = ' + dQuantity2 + '% ÷ ' + dIncome2 + '% = ' + answer2 + '。',
            'YED = ' + answer2 + '；' + yedKindTextZh(answer2)
          ],
          en: [
            '% change in income = (' + income2 + ' − ' + income1 + ') ÷ ' + income1 + ' × 100% = ' + dIncome2 + '%.',
            '% change in quantity demanded = (' + quantity2 + ' − ' + quantity1 + ') ÷ ' + quantity1 + ' × 100% = ' + dQuantity2 + '%.',
            'YED = ' + dQuantity2 + '% ÷ ' + dIncome2 + '% = ' + answer2 + '.',
            'YED = ' + answer2 + '; ' + yedKindTextEn(answer2)
          ]
        },
        math: {
          mode: 'initial-levels',
          income1: income1, income2: income2, quantity1: quantity1, quantity2: quantity2,
          yed: answer2, kind: yedKind(answer2).key, answer: answer2
        }
      };
    }

    /* level 3：中點法（收入與需求量都給兩個水平，自行算百分比） */
    var dIncome3 = U.pick(rng, [20, 40]);
    var halfIncome = 1000 * dIncome3 / 200;     /* 100 或 200 */
    var income1b = 1000 - halfIncome;
    var income2b = 1000 + halfIncome;
    var dQuantity3 = yed * dIncome3;             /* 整數 */
    var quantity1b = 200 - dQuantity3;
    var quantity2b = 200 + dQuantity3;
    var answer3 = U.round(dQuantity3 / dIncome3, 2);
    return {
      prompt: bi(
        '某家庭每月收入由 ' + income1b + ' 元變為 ' + income2b + ' 元，同時對物品 X 的每月需求量由 ' + quantity1b + ' 件變為 ' + quantity2b + ' 件。假設其他因素不變，用中點法計算物品 X 的收入彈性（YED），並保留正負號（四捨五入至 2 位小數）。',
        'A household\'s monthly income changes from ' + income1b + ' to ' + income2b + ' dollars, and its monthly quantity demanded of good X changes from ' + quantity1b + ' to ' + quantity2b + ' units. Ceteris paribus, using the midpoint method, compute the income elasticity of demand (YED) for good X, keeping the sign (2 d.p.).'
      ),
      hint: bi('中點法：分子與分母都以「平均數」作分母：YED = (ΔQ ÷ Q 平均) ÷ (ΔI ÷ I 平均)。',
        'Midpoint method: divide both changes by the averages: YED = (ΔQ ÷ average Q) ÷ (ΔI ÷ average I).'),
      answer: answer3,
      choices: numChoices(rng, answer3, { min: -100, max: 100, dp: 2, deltas: YED_CHOICE_DELTAS }),
      solution: {
        zh: [
          '平均收入 = (' + income1b + ' + ' + income2b + ') ÷ 2 = 1000 元；收入變動百分比 = (' + income2b + ' − ' + income1b + ') ÷ 1000 × 100% = ' + dIncome3 + '%。',
          '平均需求量 = (' + quantity1b + ' + ' + quantity2b + ') ÷ 2 = 200 件；需求量變動百分比 = (' + quantity2b + ' − ' + quantity1b + ') ÷ 200 × 100% = ' + dQuantity3 + '%。',
          'YED = ' + dQuantity3 + '% ÷ ' + dIncome3 + '% = ' + answer3 + '。',
          'YED = ' + answer3 + '；' + yedKindTextZh(answer3)
        ],
        en: [
          'Average income = (' + income1b + ' + ' + income2b + ') ÷ 2 = 1000 dollars; % change in income = (' + income2b + ' − ' + income1b + ') ÷ 1000 × 100% = ' + dIncome3 + '%.',
          'Average quantity = (' + quantity1b + ' + ' + quantity2b + ') ÷ 2 = 200 units; % change in quantity demanded = (' + quantity2b + ' − ' + quantity1b + ') ÷ 200 × 100% = ' + dQuantity3 + '%.',
          'YED = ' + dQuantity3 + '% ÷ ' + dIncome3 + '% = ' + answer3 + '.',
          'YED = ' + answer3 + '; ' + yedKindTextEn(answer3)
        ]
      },
      math: {
        mode: 'midpoint',
        income1: income1b, income2: income2b, quantity1: quantity1b, quantity2: quantity2b,
        yed: answer3, kind: yedKind(answer3).key, answer: answer3
      }
    };
  });

  /* =====================================================================
   * 9) xed — 交叉彈性
   * ===================================================================== */

  var XED_VALUES = [-3, -2.5, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 2.5, 3];
  var XED_CHOICE_DELTAS = [-3, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 3];

  EconData.registerType('xed', function (rng, o) {
    var level = levelOf(o);
    var xed = U.pick(rng, XED_VALUES);
    var relation = xedRelation(xed);

    if (level === 1) {
      var dPy = U.pick(rng, [-20, -10, 10, 20]);
      var dQx = xed * dPy;
      var answer1 = U.round(dQx / dPy, 2);
      return {
        prompt: bi(
          '物品 Y 的價格' + changeZh(dPy) + ' ' + Math.abs(dPy) + '% 後，物品 X 的需求量' + changeZh(dQx) + ' ' + U.fmt(Math.abs(dQx), 2) + '%。假設其他因素不變，計算 X 對 Y 價格的交叉彈性（XED），並保留正負號（四捨五入至 2 位小數）。',
          'After the price of good Y ' + changeEn(dPy) + ' by ' + Math.abs(dPy) + '%, the quantity of good X demanded ' + changeEn(dQx) + ' by ' + U.fmt(Math.abs(dQx), 2) + '%. Ceteris paribus, compute the cross price elasticity of demand (XED) of X with respect to the price of Y, keeping the sign (2 d.p.).'
        ),
        hint: bi('XED = X 需求量變動百分比 ÷ Y 價格變動百分比；正數代表替代品，負數代表互補品。',
          'XED = % change in quantity of X demanded ÷ % change in price of Y; positive means substitutes, negative means complements.'),
        answer: answer1,
        choices: numChoices(rng, answer1, { min: -100, max: 100, dp: 2, deltas: XED_CHOICE_DELTAS }),
        solution: {
          zh: [
            'Y 價格變動百分比 = ' + dPy + '%，X 需求量變動百分比 = ' + dQx + '%。',
            'XED = ' + dQx + '% ÷ ' + dPy + '% = ' + answer1 + '。',
            'XED ' + (answer1 > 0 ? '為正數' : '為負數') + '，代表 X 與 Y 是' + relation.zh + '。',
            '因此 X 對 Y 價格的交叉彈性為 ' + answer1 + '（' + relation.zh + '）。'
          ],
          en: [
            '% change in price of Y = ' + dPy + '%; % change in quantity of X demanded = ' + dQx + '%.',
            'XED = ' + dQx + '% ÷ ' + dPy + '% = ' + answer1 + '.',
            'XED is ' + (answer1 > 0 ? 'positive' : 'negative') + ', so X and Y are ' + relation.en + '.',
            'So the cross price elasticity of X with respect to the price of Y is ' + answer1 + ' (' + relation.en + ').'
          ]
        },
        math: { mode: 'initial', dPyPct: dPy, dQxPct: dQx, xed: answer1, relation: relation.key, answer: answer1 }
      };
    }

    if (level === 2) {
      var dPy2 = U.pick(rng, [-20, -10, 10, 20]);
      var dQx2 = xed * dPy2;
      var py1 = 20 * U.randInt(rng, 2, 5);
      var py2 = py1 * (1 + dPy2 / 100);
      var qx1 = 100 * U.randInt(rng, 1, 4);
      var qx2 = qx1 * (1 + dQx2 / 100);
      var answer2 = U.round(dQx2 / dPy2, 2);
      return {
        prompt: bi(
          '物品 Y 的價格由 ' + py1 + ' 元變為 ' + py2 + ' 元，物品 X 的需求量由 ' + qx1 + ' 件變為 ' + qx2 + ' 件。假設其他因素不變，用初始值法計算 X 對 Y 價格的交叉彈性（XED），並保留正負號（四捨五入至 2 位小數）。',
          'The price of good Y changes from ' + py1 + ' to ' + py2 + ' dollars, and the quantity of good X demanded changes from ' + qx1 + ' to ' + qx2 + ' units. Ceteris paribus, using the initial-value method, compute the cross price elasticity of demand (XED) of X with respect to the price of Y, keeping the sign (2 d.p.).'
        ),
        hint: bi('初始值法：XED = [(Qx2 − Qx1) ÷ Qx1] ÷ [(Py2 − Py1) ÷ Py1]，保留正負號。',
          'Initial-value method: XED = [(Qx2 − Qx1) ÷ Qx1] ÷ [(Py2 − Py1) ÷ Py1], keeping the sign.'),
        answer: answer2,
        choices: numChoices(rng, answer2, { min: -100, max: 100, dp: 2, deltas: XED_CHOICE_DELTAS }),
        solution: {
          zh: [
            'Y 價格變動百分比 = (' + py2 + ' − ' + py1 + ') ÷ ' + py1 + ' × 100% = ' + dPy2 + '%。',
            'X 需求量變動百分比 = (' + qx2 + ' − ' + qx1 + ') ÷ ' + qx1 + ' × 100% = ' + dQx2 + '%。',
            'XED = ' + dQx2 + '% ÷ ' + dPy2 + '% = ' + answer2 + '。',
            'XED = ' + answer2 + ' ' + (answer2 > 0 ? '> 0' : '< 0') + '，代表 X 與 Y 是' + relation.zh + '。'
          ],
          en: [
            '% change in price of Y = (' + py2 + ' − ' + py1 + ') ÷ ' + py1 + ' × 100% = ' + dPy2 + '%.',
            '% change in quantity of X demanded = (' + qx2 + ' − ' + qx1 + ') ÷ ' + qx1 + ' × 100% = ' + dQx2 + '%.',
            'XED = ' + dQx2 + '% ÷ ' + dPy2 + '% = ' + answer2 + '.',
            'XED = ' + answer2 + ' ' + (answer2 > 0 ? '> 0' : '< 0') + ', so X and Y are ' + relation.en + '.'
          ]
        },
        math: {
          mode: 'initial-levels',
          py1: py1, py2: py2, qx1: qx1, qx2: qx2,
          xed: answer2, relation: relation.key, answer: answer2
        }
      };
    }

    /* level 3：中點法 */
    var pair3 = U.pick(rng, MID_PRICE_PAIRS_INT);
    var py1b = pair3.avg - pair3.half;
    var py2b = pair3.avg + pair3.half;
    var dPy3 = U.round((py2b - py1b) / pair3.avg * 100, 2);
    var dQx3 = xed * dPy3;
    var qx1b = 200 - dQx3;
    var qx2b = 200 + dQx3;
    var answer3 = U.round(dQx3 / dPy3, 2);
    return {
      prompt: bi(
        '物品 Y 的價格由 ' + py1b + ' 元變為 ' + py2b + ' 元，同時物品 X 的需求量由 ' + qx1b + ' 件變為 ' + qx2b + ' 件。假設其他因素不變，用中點法計算 X 對 Y 價格的交叉彈性（XED），並保留正負號（四捨五入至 2 位小數）。',
        'The price of good Y changes from ' + py1b + ' to ' + py2b + ' dollars, and the quantity of good X demanded changes from ' + qx1b + ' to ' + qx2b + ' units. Ceteris paribus, using the midpoint method, compute the cross price elasticity of demand (XED) of X with respect to the price of Y, keeping the sign (2 d.p.).'
      ),
      hint: bi('中點法：分子與分母都以平均數作分母，再保留正負號。',
        'Midpoint method: divide both changes by their averages, then keep the sign.'),
      answer: answer3,
      choices: numChoices(rng, answer3, { min: -100, max: 100, dp: 2, deltas: XED_CHOICE_DELTAS }),
      solution: {
        zh: [
          '平均 Y 價格 = (' + py1b + ' + ' + py2b + ') ÷ 2 = ' + pair3.avg + ' 元；Y 價格變動百分比 = (' + py2b + ' − ' + py1b + ') ÷ ' + pair3.avg + ' × 100% = ' + dPy3 + '%。',
          '平均 X 需求量 = (' + qx1b + ' + ' + qx2b + ') ÷ 2 = 200 件；X 需求量變動百分比 = (' + qx2b + ' − ' + qx1b + ') ÷ 200 × 100% = ' + dQx3 + '%。',
          'XED = ' + dQx3 + '% ÷ ' + dPy3 + '% = ' + answer3 + '。',
          'XED = ' + answer3 + ' ' + (answer3 > 0 ? '> 0' : '< 0') + '，代表 X 與 Y 是' + relation.zh + '。'
        ],
        en: [
          'Average price of Y = (' + py1b + ' + ' + py2b + ') ÷ 2 = ' + pair3.avg + ' dollars; % change in price of Y = (' + py2b + ' − ' + py1b + ') ÷ ' + pair3.avg + ' × 100% = ' + dPy3 + '%.',
          'Average quantity of X = (' + qx1b + ' + ' + qx2b + ') ÷ 2 = 200 units; % change in quantity of X demanded = (' + qx2b + ' − ' + qx1b + ') ÷ 200 × 100% = ' + dQx3 + '%.',
          'XED = ' + dQx3 + '% ÷ ' + dPy3 + '% = ' + answer3 + '.',
          'XED = ' + answer3 + ' ' + (answer3 > 0 ? '> 0' : '< 0') + ', so X and Y are ' + relation.en + '.'
        ]
      },
      math: {
        mode: 'midpoint',
        py1: py1b, py2: py2b, qx1: qx1b, qx2: qx2b,
        xed: answer3, relation: relation.key, answer: answer3
      }
    };
  });

  /* =====================================================================
   * 10) pes — 供應價格彈性
   * ===================================================================== */

  EconData.registerType('pes', function (rng, o) {
    var level = levelOf(o);

    if (level === 1) {
      var p1 = 10 * U.randInt(rng, 3, 8);
      var dPct = U.pick(rng, [-20, -10, 10, 20]);
      var pes1 = U.pick(rng, [0.5, 1, 1.5, 2, 2.5, 3]);
      var dQPct = pes1 * dPct;
      var q1 = 20 * U.randInt(rng, 5, 20);
      var p2 = p1 * (1 + dPct / 100);
      var q2 = q1 + (q1 / 20) * (dQPct / 5);
      var answer1 = U.round(dQPct / dPct, 2);
      return {
        prompt: bi(
          '某商品的價格由 ' + p1 + ' 元' + changeZh(dPct) + '至 ' + p2 + ' 元，供應量由 ' + q1 + ' 件變為 ' + q2 + ' 件。假設其他因素不變，用初始值法計算供應價格彈性（PES，四捨五入至 2 位小數）。',
          'The price of a good changes from ' + p1 + ' to ' + p2 + ' dollars and quantity supplied changes from ' + q1 + ' to ' + q2 + ' units. Ceteris paribus, using the initial-value method, compute the price elasticity of supply (PES, 2 d.p.).'
        ),
        hint: bi('PES = 供應量變動百分比 ÷ 價格變動百分比，PES 為正數。',
          'PES = % change in quantity supplied ÷ % change in price; PES is positive.'),
        answer: answer1,
        choices: numChoices(rng, answer1, { min: 0, dp: 2 }),
        solution: {
          zh: [
            '供應量變動百分比 = (' + q2 + ' − ' + q1 + ') ÷ ' + q1 + ' × 100% = ' + dQPct + '%。',
            '價格變動百分比 = (' + p2 + ' − ' + p1 + ') ÷ ' + p1 + ' × 100% = ' + dPct + '%。',
            'PES = ' + dQPct + '% ÷ ' + dPct + '% = ' + answer1 + '。',
            '因此供應價格彈性為 ' + answer1 + '。'
          ],
          en: [
            '% change in quantity supplied = (' + q2 + ' − ' + q1 + ') ÷ ' + q1 + ' × 100% = ' + dQPct + '%.',
            '% change in price = (' + p2 + ' − ' + p1 + ') ÷ ' + p1 + ' × 100% = ' + dPct + '%.',
            'PES = ' + dQPct + '% ÷ ' + dPct + '% = ' + answer1 + '.',
            'So the price elasticity of supply is ' + answer1 + '.'
          ]
        },
        math: { mode: 'initial', p1: p1, p2: p2, q1: q1, q2: q2, pes: answer1, answer: answer1 }
      };
    }

    if (level === 2) {
      var pair = U.pick(rng, MID_PRICE_PAIRS_INT);
      var p1b = pair.avg - pair.half;
      var p2b = pair.avg + pair.half;
      var dPctB = U.round((p2b - p1b) / pair.avg * 100, 2);
      var pes2 = U.pick(rng, [0.5, 1, 1.5, 2, 2.5, 3]);
      var dQPctB = pes2 * dPctB;
      var q1b = 200 - dQPctB;
      var q2b = 200 + dQPctB;
      var answer2 = U.round(dQPctB / dPctB, 2);
      return {
        prompt: bi(
          '某商品的價格由 ' + p1b + ' 元上升至 ' + p2b + ' 元，供應量由 ' + q1b + ' 件變為 ' + q2b + ' 件。假設其他因素不變，用中點法計算供應價格彈性（PES，四捨五入至 2 位小數）。',
          'The price of a good rises from ' + p1b + ' to ' + p2b + ' dollars and quantity supplied changes from ' + q1b + ' to ' + q2b + ' units. Ceteris paribus, using the midpoint method, compute the price elasticity of supply (PES, 2 d.p.).'
        ),
        hint: bi('中點法：以平均價格與平均數量作分母：PES = (ΔQ ÷ Q 平均) ÷ (ΔP ÷ P 平均)。',
          'Midpoint method: divide by the average price and average quantity: PES = (ΔQ ÷ average Q) ÷ (ΔP ÷ average P).'),
        answer: answer2,
        choices: numChoices(rng, answer2, { min: 0, dp: 2 }),
        solution: {
          zh: [
            '平均價格 = (' + p1b + ' + ' + p2b + ') ÷ 2 = ' + pair.avg + ' 元；價格變動百分比 = (' + p2b + ' − ' + p1b + ') ÷ ' + pair.avg + ' × 100% = ' + dPctB + '%。',
            '平均供應量 = (' + q1b + ' + ' + q2b + ') ÷ 2 = 200 件；供應量變動百分比 = (' + q2b + ' − ' + q1b + ') ÷ 200 × 100% = ' + dQPctB + '%。',
            'PES = ' + dQPctB + '% ÷ ' + dPctB + '% = ' + answer2 + '。',
            '因此供應價格彈性為 ' + answer2 + '。'
          ],
          en: [
            'Average price = (' + p1b + ' + ' + p2b + ') ÷ 2 = ' + pair.avg + ' dollars; % change in price = (' + p2b + ' − ' + p1b + ') ÷ ' + pair.avg + ' × 100% = ' + dPctB + '%.',
            'Average quantity supplied = (' + q1b + ' + ' + q2b + ') ÷ 2 = 200 units; % change in quantity supplied = (' + q2b + ' − ' + q1b + ') ÷ 200 × 100% = ' + dQPctB + '%.',
            'PES = ' + dQPctB + '% ÷ ' + dPctB + '% = ' + answer2 + '.',
            'So the price elasticity of supply is ' + answer2 + '.'
          ]
        },
        math: { mode: 'midpoint', p1: p1b, p2: p2b, q1: q1b, q2: q2b, pes: answer2, answer: answer2 }
      };
    }

    /* level 3：由 Qs = c + dP 求點彈性 */
    var c3 = U.randInt(rng, 10, 100);
    var slope3 = U.randInt(rng, 1, 6);
    var p3 = U.randInt(rng, 2, 20);
    var q3 = c3 + slope3 * p3;
    var answer3 = U.round(slope3 * p3 / q3, 2);
    return {
      prompt: bi(
        '某商品的供應函數為 $Q_s = ' + c3 + ' + ' + slope3 + 'P$，其中 P 為價格（元），Q 為數量（件）。求價格為 ' + p3 + ' 元時的點供應價格彈性（point price elasticity of supply，四捨五入至 2 位小數）。',
        'The supply function for a good is $Q_s = ' + c3 + ' + ' + slope3 + 'P$, where P is the price in dollars and Q is the quantity in units. Find the point price elasticity of supply at P = ' + p3 + ' dollars (2 d.p.).'
      ),
      hint: bi('點供應彈性 $PES = (dQ/dP) \\times (P/Q) = dP/Q$；此題的 d 是供應函數中 P 的係數。',
        'Point elasticity of supply $PES = (dQ/dP) \\times (P/Q) = dP/Q$; here d is the coefficient of P in the supply function.'),
      answer: answer3,
      choices: numChoices(rng, answer3, { min: 0, dp: 2 }),
      solution: {
        zh: [
          '當 $P = ' + p3 + '$ 時，供應量 $Q = ' + c3 + ' + ' + slope3 + ' × ' + p3 + ' = ' + q3 + '$ 件。',
          '點供應價格彈性 $PES = d \\times P/Q = ' + slope3 + ' × ' + p3 + ' ÷ ' + q3 + ' = ' + answer3 + '$。',
          '因此價格為 ' + p3 + ' 元時的點供應價格彈性為 ' + answer3 + '。'
        ],
        en: [
          'At $P = ' + p3 + '$, quantity supplied $Q = ' + c3 + ' + ' + slope3 + ' × ' + p3 + ' = ' + q3 + '$ units.',
          'Point price elasticity of supply $PES = d \\times P/Q = ' + slope3 + ' × ' + p3 + ' ÷ ' + q3 + ' = ' + answer3 + '$.',
          'So the point price elasticity of supply at P = ' + p3 + ' dollars is ' + answer3 + '.'
        ]
      },
      math: { mode: 'point', c: c3, d: slope3, p: p3, q: q3, pes: answer3, answer: answer3 }
    };
  });
})();
