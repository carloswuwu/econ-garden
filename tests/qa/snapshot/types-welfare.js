/*
 * 經濟學園 · Econ Garden — 題型生成器
 * content/types-welfare.js
 * ------------------------------------------------------------------
 * 負責題型：tax_incidence、price_control、surplus、externality、mv、budget_line
 * 契約見 docs/TYPE-CATALOG.md 第 3 節。
 * 全部生成器只用傳入的 rng（同一 seed 可重現），不使用 Math.random / Date.now。
 * 共通假設：其他因素不變；市場為完全競爭的封閉市場（消費者理論除外）。
 */
(function () {
  'use strict';

  var ED = window.EconData;
  if (!ED) throw new Error('content/types-welfare.js 需要先載入 econ-boot.js');
  var U = ED.util;
  var register = ED.registerType;

  /* ---------------- 小工具 ---------------- */

  function bi(zh, en) { return { zh: zh, en: en }; }

  function solved(zhArr, enArr) {
    if (zhArr.length !== enArr.length) {
      throw new Error('solution 中英步驟數目不一致: zh=' + zhArr.length + ', en=' + enArr.length);
    }
    return { zh: zhArr, en: enArr };
  }

  /* 把係數寫成 P 或 Q 的一次項，例如 1 -> "P"、2 -> "2P" */
  function termP(coef) { return coef === 1 ? 'P' : coef + 'P'; }
  function termQ(coef) { return coef === 1 ? 'Q' : coef + 'Q'; }
  /* 把係數與任意變數寫成一次項，例如 (1, 'P_c') -> "P_c"、(2, 'Q_x') -> "2Q_x" */
  function coefVar(coef, sym) { return (coef === 1 ? '' : coef) + sym; }
  /* 英文序數：2 -> 2nd、3 -> 3rd、5 -> 5th */
  function ordinalEn(n) {
    if (n === 1) return '1st';
    if (n === 2) return '2nd';
    if (n === 3) return '3rd';
    return n + 'th';
  }

  /* ================================================================
   * 1. tax_incidence — 從量稅、稅負歸宿、稅收、無謂損失
   * ================================================================ */

  register('tax_incidence', function (rng, o) {
    o = o || {};
    var level = o.level || 1;
    var b, d, k;
    if (level <= 1) {
      b = U.pick(rng, [1, 2]);
      d = U.pick(rng, [1, 2]);
      k = 1;
    } else if (level === 2) {
      b = U.pick(rng, [1, 2, 3]);
      d = U.pick(rng, [1, 2, 3]);
      k = U.randInt(rng, 1, 2);
    } else {
      b = U.pick(rng, [1, 2, 3]);
      d = U.pick(rng, [1, 2, 3]);
      k = U.randInt(rng, 1, 3);
    }

    var t = (b + d) * k;
    var p0 = U.randInt(rng, 8, 16) + b * k;
    var q0 = d * p0 + U.randInt(rng, 10, 40) + b * d * k;
    var a = q0 + b * p0;
    var c = q0 - d * p0;
    var pc = p0 + d * k;
    var pp = p0 - b * k;
    var q1 = q0 - b * d * k;
    var dq = q0 - q1;
    var consBurden = d * k;
    var prodBurden = b * k;

    var mode, answer, askZh, askEn, hintZh, hintEn;

    if (level <= 1) {
      mode = 'tax_revenue';
      answer = t * q1;
      askZh = '求這項從量稅為政府帶來的稅收總額（元，整數）。';
      askEn = "Find the total tax revenue the government collects from this per-unit tax (in dollars, integer).";
      hintZh = '先求無稅均衡，再解稅後數量 $Q_1$；稅收總額 = $t \\times Q_1$。';
      hintEn = "First find the no-tax equilibrium and the after-tax quantity $Q_1$; total tax revenue $= t \\times Q_1$.";
    } else if (level === 2) {
      if (rng() < 0.5) {
        mode = 'consumer_burden';
        answer = consBurden;
        askZh = '求消費者每件實際負擔的稅額（元，即稅後消費者價格與無稅均衡價格之差）。';
        askEn = "Find the tax burden per unit actually borne by consumers (in dollars), i.e. the after-tax consumer price minus the no-tax equilibrium price.";
        hintZh = '先求無稅均衡 $P_0$ 與稅後消費者價格 $P_c$；消費者每件負擔 = $P_c - P_0$。';
        hintEn = "First find the no-tax equilibrium price $P_0$ and the after-tax consumer price $P_c$; the consumer burden per unit is $P_c - P_0$.";
      } else {
        mode = 'producer_burden';
        answer = prodBurden;
        askZh = '求生產者每件實際負擔的稅額（元，即無稅均衡價格與稅後生產者價格之差）。';
        askEn = "Find the tax burden per unit actually borne by producers (in dollars), i.e. the no-tax equilibrium price minus the after-tax producer price.";
        hintZh = '先求無稅均衡 $P_0$ 與稅後生產者價格 $P_p$；生產者每件負擔 = $P_0 - P_p$。';
        hintEn = "First find the no-tax equilibrium price $P_0$ and the after-tax producer price $P_p$; the producer burden per unit is $P_0 - P_p$.";
      }
    } else {
      mode = 'dwl';
      answer = U.round(0.5 * t * dq, 2);
      askZh = '求這項從量稅造成的無謂損失（元，整數；按線性供需的三角形面積計算）。';
      askEn = "Find the deadweight loss caused by this per-unit tax (in dollars, integer), using the triangle area under linear demand and supply.";
      hintZh = '先求無稅均衡與稅後數量 $Q_1$；無謂損失 = $\\frac{1}{2} \\times t \\times (Q_0 - Q_1)$。';
      hintEn = "First find the no-tax equilibrium and the after-tax quantity $Q_1$; deadweight loss $= \\frac{1}{2} \\times t \\times (Q_0 - Q_1)$.";
    }

    var promptZh = '某商品在完全競爭的封閉市場中交易，其他因素不變（沒有其他政府干預、交易成本為零）。價格 $P$ 以元為單位，數量 $Q$ 以件為單位。市場需求為 $Q_d = ' + a + ' - ' + termP(b) + '$，市場供應為 $Q_s = ' + c + ' + ' + termP(d) + '$。政府向生產者徵收每件 ' + t + ' 元的從量稅。' + askZh;
    var promptEn = "A good is traded in a perfectly competitive, closed market with all other factors unchanged (no other government intervention and zero transaction costs). Price $P$ is in dollars and quantity $Q$ is in units. Market demand is $Q_d = " + a + " - " + termP(b) + "$ and market supply is $Q_s = " + c + " + " + termP(d) + "$. The government imposes a per-unit tax of " + t + " dollars on producers. " + askEn;

    var s1zh = '無稅均衡：令 $Q_d = Q_s$，即 $' + a + ' - ' + termP(b) + ' = ' + c + ' + ' + termP(d) + '$，解得 $P_0 = ' + p0 + '$ 元、$Q_0 = ' + q0 + '$ 件。';
    var s1en = "No-tax equilibrium: set $Q_d = Q_s$, i.e. $" + a + " - " + termP(b) + " = " + c + " + " + termP(d) + "$, giving $P_0 = " + p0 + "$ dollars and $Q_0 = " + q0 + "$ units.";
    var s2zh = '稅後設消費者價格為 $P_c$、生產者價格為 $P_p$，$P_c = P_p + t$。令 $Q_d(P_c) = Q_s(P_p)$，即 $' + a + ' - ' + coefVar(b, 'P_c') + ' = ' + c + ' + ' + coefVar(d, '(P_c - ' + t + ')') + '$，解得 $P_c = ' + pc + '$ 元、$P_p = P_c - t = ' + pp + '$ 元，稅後數量 $Q_1 = ' + q1 + '$ 件。';
    var s2en = "Let $P_c$ and $P_p$ be the consumer and producer prices after the tax, with $P_c = P_p + t$. Setting $Q_d(P_c) = Q_s(P_p)$, i.e. $" + a + " - " + coefVar(b, 'P_c') + " = " + c + " + " + coefVar(d, '(P_c - ' + t + ')') + "$, gives $P_c = " + pc + "$ dollars, $P_p = P_c - t = " + pp + "$ dollars and the after-tax quantity $Q_1 = " + q1 + "$ units.";
    var s3zh = '每件稅負分擔：消費者負擔 $P_c - P_0 = ' + consBurden + '$ 元，生產者負擔 $P_0 - P_p = ' + prodBurden + '$ 元，兩者合計 ' + t + ' 元，等於從量稅。';
    var s3en = "Tax burden per unit: consumers bear $P_c - P_0 = " + consBurden + "$ dollars and producers bear $P_0 - P_p = " + prodBurden + "$ dollars; the two add up to " + t + " dollars, equal to the per-unit tax.";

    var s4zh, s4en;
    if (mode === 'tax_revenue') {
      s4zh = '稅收總額 = $t \\times Q_1 = ' + t + ' \\times ' + q1 + ' = ' + answer + '$ 元。因此這項從量稅的稅收總額為 ' + answer + ' 元。';
      s4en = "Total tax revenue $= t \\times Q_1 = " + t + " \\times " + q1 + " = " + answer + "$ dollars. Therefore the total tax revenue is " + answer + " dollars.";
    } else if (mode === 'consumer_burden') {
      s4zh = '政府雖然向生產者徵稅，但稅負由買賣雙方分擔。消費者每件負擔 = $P_c - P_0 = ' + pc + ' - ' + p0 + ' = ' + consBurden + '$ 元。因此消費者每件負擔 ' + consBurden + ' 元。';
      s4en = "Although the tax is levied on producers, the burden is shared between buyers and sellers. Consumer burden per unit $= P_c - P_0 = " + pc + " - " + p0 + " = " + consBurden + "$ dollars, so consumers bear " + consBurden + " dollars per unit.";
    } else if (mode === 'producer_burden') {
      s4zh = '生產者每件負擔 = $P_0 - P_p = ' + p0 + ' - ' + pp + ' = ' + prodBurden + '$ 元。因此生產者每件負擔 ' + prodBurden + ' 元。';
      s4en = "Producer burden per unit $= P_0 - P_p = " + p0 + " - " + pp + " = " + prodBurden + "$ dollars, so producers bear " + prodBurden + " dollars per unit.";
    } else {
      s4zh = '產量由 $Q_0 = ' + q0 + '$ 件減至 $Q_1 = ' + q1 + '$ 件，減少 $Q_0 - Q_1 = ' + dq + '$ 件。無謂損失 = $\\frac{1}{2} \\times t \\times (Q_0 - Q_1) = \\frac{1}{2} \\times ' + t + ' \\times ' + dq + ' = ' + answer + '$ 元。因此無謂損失為 ' + answer + ' 元。';
      s4en = "Quantity falls from $Q_0 = " + q0 + "$ units to $Q_1 = " + q1 + "$ units, a fall of $Q_0 - Q_1 = " + dq + "$ units. Deadweight loss $= \\frac{1}{2} \\times t \\times (Q_0 - Q_1) = \\frac{1}{2} \\times " + t + " \\times " + dq + " = " + answer + "$ dollars. Therefore the deadweight loss is " + answer + " dollars.";
    }

    return {
      prompt: bi(promptZh, promptEn),
      hint: bi(hintZh, hintEn),
      answer: answer,
      solution: solved([s1zh, s2zh, s3zh, s4zh], [s1en, s2en, s3en, s4en]),
      math: { mode: mode, a: a, b: b, c: c, d: d, t: t, p0: p0, q0: q0, pc: pc, pp: pp, q1: q1 }
    };
  });

  /* ================================================================
   * 2. price_control — 有效價格上限／下限：短缺、過剩、實際交易量、無謂損失
   * ================================================================ */

  register('price_control', function (rng, o) {
    o = o || {};
    var level = o.level || 1;
    var isCeiling = rng() < 0.5;
    var b, d, delta;
    if (level <= 1) {
      b = U.pick(rng, [1, 2]);
      d = U.pick(rng, [1, 2]);
      delta = U.randInt(rng, 1, 2);
    } else if (level === 2) {
      b = U.pick(rng, [1, 2, 3]);
      d = U.pick(rng, [1, 2, 3]);
      delta = U.randInt(rng, 1, 3);
    } else {
      /* level 3 用相同斜率，令無謂損失的三角形面積為整數 */
      b = U.pick(rng, [1, 2, 3]);
      d = b;
      delta = U.randInt(rng, 1, 3);
    }

    var p0 = U.randInt(rng, 6, 14);
    if (isCeiling && delta > p0 - 2) delta = p0 - 2;
    var base = U.randInt(rng, 20, 50) + Math.max(b, d) * p0;
    var q0 = base + (isCeiling ? d : b) * delta;
    var qt = base;
    var a = q0 + b * p0;
    var c = q0 - d * p0;
    var price = p0 + (isCeiling ? -delta : delta);
    var qdAt = a - b * price;
    var qsAt = c + d * price;
    var gapQ = Math.abs(qdAt - qsAt);
    var sideLabelZh = isCeiling ? '價格上限' : '價格下限';
    var sideLabelEn = isCeiling ? 'price ceiling' : 'price floor';

    var mode, answer, askZh, askEn, hintZh, hintEn;
    if (level <= 1) {
      mode = isCeiling ? 'shortage' : 'surplus';
      answer = gapQ;
      askZh = '求在這個' + sideLabelZh + '下市場的' + (isCeiling ? '短缺' : '過剩') + '數量（件）。';
      askEn = "Find the " + (isCeiling ? 'shortage' : 'surplus') + " (in units) created by this " + sideLabelEn + ".";
      hintZh = '先求無稅均衡，再計算控制價格下的需求量與供應量；' + (isCeiling ? '短缺 = $Q_d - Q_s$' : '過剩 = $Q_s - Q_d$') + '。';
      hintEn = "First find the no-tax equilibrium, then compute quantity demanded and supplied at the controlled price; " + (isCeiling ? 'shortage $= Q_d - Q_s$' : 'surplus $= Q_s - Q_d$') + ".";
    } else if (level === 2) {
      mode = 'traded_quantity';
      answer = qt;
      askZh = '求在這個' + sideLabelZh + '下的實際交易量（件）。';
      askEn = "Find the quantity actually traded under this " + sideLabelEn + " (in units).";
      hintZh = '實際交易量由市場的短邊決定：' + (isCeiling ? '上限下供應量較少，故交易量 = $Q_s$。' : '下限下需求量較少，故交易量 = $Q_d$。');
      hintEn = "The quantity traded is set by the short side of the market: " + (isCeiling ? 'under a ceiling, supply is smaller, so quantity traded $= Q_s$.' : 'under a floor, demand is smaller, so quantity traded $= Q_d$.');
    } else {
      mode = 'dwl';
      answer = b * delta * delta;
      askZh = '求這個' + sideLabelZh + '造成的無謂損失（元，整數；按線性供需的三角形面積計算）。';
      askEn = "Find the deadweight loss caused by this " + sideLabelEn + " (in dollars, integer), using the triangle area under linear demand and supply.";
      hintZh = '先求無稅均衡與控制價格下的交易量，無謂損失 = $\\frac{1}{2} \\times (Q_0 - Q_t) \\times$ 價格楔子。';
      hintEn = "First find the no-tax equilibrium and the quantity traded at the controlled price; deadweight loss $= \\frac{1}{2} \\times (Q_0 - Q_t) \\times$ the price wedge.";
    }

    var promptZh = '某商品的市場為完全競爭的封閉市場，其他因素不變。價格 $P$ 以元為單位，數量 $Q$ 以件為單位。需求 $Q_d = ' + a + ' - ' + termP(b) + '$，供應 $Q_s = ' + c + ' + ' + termP(d) + '$。' +
      (isCeiling
        ? '政府設定價格上限 $P_c = ' + price + '$ 元，這個上限具約束力（低於無稅均衡價格）。'
        : '政府設定價格下限 $P_f = ' + price + '$ 元，這個下限具約束力（高於無稅均衡價格）。') + askZh;
    var promptEn = "The market for a good is perfectly competitive and closed, with all other factors unchanged. Price $P$ is in dollars and quantity $Q$ is in units. Demand is $Q_d = " + a + " - " + termP(b) + "$ and supply is $Q_s = " + c + " + " + termP(d) + "$. " +
      (isCeiling
        ? "The government sets a price ceiling of $P_c = " + price + "$ dollars, which is binding (below the no-tax equilibrium price). "
        : "The government sets a price floor of $P_f = " + price + "$ dollars, which is binding (above the no-tax equilibrium price). ") + askEn;

    var s1zh = '無稅均衡：令 $Q_d = Q_s$，即 $' + a + ' - ' + termP(b) + ' = ' + c + ' + ' + termP(d) + '$，解得 $P_0 = ' + p0 + '$ 元、$Q_0 = ' + q0 + '$ 件。';
    var s1en = "No-tax equilibrium: set $Q_d = Q_s$, i.e. $" + a + " - " + termP(b) + " = " + c + " + " + termP(d) + "$, giving $P_0 = " + p0 + "$ dollars and $Q_0 = " + q0 + "$ units.";
    var s2zh = '在' + sideLabelZh + ' $P = ' + price + '$ 元下：需求量 $Q_d = ' + a + ' - ' + b + ' \\times ' + price + ' = ' + qdAt + '$ 件，供應量 $Q_s = ' + c + ' + ' + d + ' \\times ' + price + ' = ' + qsAt + '$ 件。';
    var s2en = "At the " + sideLabelEn + " of $P = " + price + "$ dollars: quantity demanded $Q_d = " + a + " - " + b + " \\times " + price + " = " + qdAt + "$ units and quantity supplied $Q_s = " + c + " + " + d + " \\times " + price + " = " + qsAt + "$ units.";

    var s3zh, s3en, s4zh, s4en;
    if (mode === 'shortage' || mode === 'surplus') {
      s3zh = (isCeiling
        ? '由於上限低於均衡價格，出現短缺：短缺 = $Q_d - Q_s = ' + qdAt + ' - ' + qsAt + ' = ' + answer + '$ 件。'
        : '由於下限高於均衡價格，出現過剩：過剩 = $Q_s - Q_d = ' + qsAt + ' - ' + qdAt + ' = ' + answer + '$ 件。');
      s3en = (isCeiling
        ? "Because the ceiling is below the equilibrium price, there is a shortage: shortage $= Q_d - Q_s = " + qdAt + " - " + qsAt + " = " + answer + "$ units."
        : "Because the floor is above the equilibrium price, there is a surplus: surplus $= Q_s - Q_d = " + qsAt + " - " + qdAt + " = " + answer + "$ units.");
      s4zh = '因此這個' + sideLabelZh + '下的' + (isCeiling ? '短缺' : '過剩') + '數量為 ' + answer + ' 件。';
      s4en = "Therefore the " + (isCeiling ? 'shortage' : 'surplus') + " under this " + sideLabelEn + " is " + answer + " units.";
    } else if (mode === 'traded_quantity') {
      s3zh = '交易量由短邊決定：' + (isCeiling ? '供應量較少，故實際交易量 = $Q_s = ' : '需求量較少，故實際交易量 = $Q_d = ') + answer + '$ 件。';
      s3en = "The short side determines the quantity traded: " + (isCeiling ? 'supply is smaller, so quantity traded $= Q_s = ' : 'demand is smaller, so quantity traded $= Q_d = ') + answer + "$ units.";
      s4zh = '因此這個' + sideLabelZh + '下的實際交易量為 ' + answer + ' 件。';
      s4en = "Therefore the quantity actually traded under this " + sideLabelEn + " is " + answer + " units.";
    } else {
      var lost = q0 - qt;
      var wedge = 2 * delta;
      s3zh = '可交易數量由 $Q_0 = ' + q0 + '$ 件減至 $Q_t = ' + qt + '$ 件，減少 ' + lost + ' 件。' +
        (isCeiling
          ? '在 $Q_t$ 下需求價格為 $' + (p0 + delta) + '$ 元，與上限 $' + price + '$ 元的價格楔子為 ' + wedge + ' 元。'
          : '在 $Q_t$ 下供應價格為 $' + (p0 - delta) + '$ 元，與下限 $' + price + '$ 元的價格楔子為 ' + wedge + ' 元。') +
        '無謂損失 = $\\frac{1}{2} \\times ' + lost + ' \\times ' + wedge + ' = ' + answer + '$ 元。';
      s3en = "The quantity traded falls from $Q_0 = " + q0 + "$ units to $Q_t = " + qt + "$ units, a fall of " + lost + " units. " +
        (isCeiling
          ? "At $Q_t$ the demand price is $" + (p0 + delta) + "$ dollars, giving a price wedge of " + wedge + " dollars above the ceiling of $" + price + "$."
          : "At $Q_t$ the supply price is $" + (p0 - delta) + "$ dollars, giving a price wedge of " + wedge + " dollars below the floor of $" + price + "$.") +
        " Deadweight loss $= \\frac{1}{2} \\times " + lost + " \\times " + wedge + " = " + answer + "$ dollars.";
      s4zh = '因此這個' + sideLabelZh + '造成的無謂損失為 ' + answer + ' 元。';
      s4en = "Therefore the deadweight loss caused by this " + sideLabelEn + " is " + answer + " dollars.";
    }

    return {
      prompt: bi(promptZh, promptEn),
      hint: bi(hintZh, hintEn),
      answer: answer,
      solution: solved([s1zh, s2zh, s3zh, s4zh], [s1en, s2en, s3en, s4en]),
      math: { mode: mode, side: isCeiling ? 'ceiling' : 'floor', a: a, b: b, c: c, d: d, p0: p0, q0: q0, price: price, qt: qt, delta: delta }
    };
  });

  /* ================================================================
   * 3. surplus — 消費者盈餘、生產者盈餘、總盈餘、課稅後無謂損失
   *    需求 Qd = a - bP；供應 Qs = dP（供應曲線穿過原點）
   * ================================================================ */

  register('surplus', function (rng, o) {
    o = o || {};
    var level = o.level || 1;
    var b = U.pick(rng, [1, 2]);
    var d = U.pick(rng, [1, 2, 3]);
    var k0 = U.randInt(rng, 2, 5);
    var p0 = 2 * k0;                 /* 均衡價格（偶數） */
    var q0 = d * p0;                 /* 均衡數量 */
    var a = (b + d) * p0;            /* 需求截距：a = q0 + b*p0 */
    var maxWTP = a / b;              /* 需求線在 Q = 0 的價格（整數） */
    var cs = U.round(d * d * p0 * p0 / (2 * b), 2);
    var ps = U.round(d * p0 * p0 / 2, 2);
    var ts = cs + ps;

    var mode, answer, askZh, askEn, hintZh, hintEn;
    var t, pc, pp, q1, dq, dwl;
    if (level <= 1) {
      mode = 'consumer_surplus';
      answer = cs;
      askZh = '求消費者盈餘（元，整數）。';
      askEn = "Find the consumer surplus (in dollars, integer).";
      hintZh = '消費者盈餘 = $\\frac{1}{2} \\times Q_0 \\times ($最高願付價 $- P_0)$，最高願付價由需求線在 $Q = 0$ 時求得。';
      hintEn = "Consumer surplus $= \\frac{1}{2} \\times Q_0 \\times ($maximum willingness to pay $- P_0)$; the maximum willingness to pay is the demand price at $Q = 0$.";
    } else if (level === 2) {
      mode = 'producer_surplus';
      answer = ps;
      askZh = '求生產者盈餘（元，整數）。';
      askEn = "Find the producer surplus (in dollars, integer).";
      hintZh = '生產者盈餘 = $\\frac{1}{2} \\times Q_0 \\times (P_0 -$ 最低供應價$)$；供應線穿過原點，最低供應價為 0 元。';
      hintEn = "Producer surplus $= \\frac{1}{2} \\times Q_0 \\times (P_0 -$ minimum supply price$)$; the supply line passes through the origin, so the minimum supply price is 0 dollars.";
    } else if (rng() < 0.5) {
      mode = 'total_surplus';
      answer = ts;
      askZh = '求總盈餘（消費者盈餘與生產者盈餘之和，元，整數）。';
      askEn = "Find the total surplus (consumer surplus plus producer surplus, in dollars, integer).";
      hintZh = '分別計算消費者盈餘與生產者盈餘兩個三角形，再相加。';
      hintEn = "Compute the consumer surplus and producer surplus triangles separately, then add them.";
    } else {
      mode = 'tax_dwl';
      var kk = U.randInt(rng, 1, Math.min(3, Math.floor((p0 - 1) / b)));
      t = (b + d) * kk;
      pc = p0 + d * kk;
      pp = p0 - b * kk;
      q1 = q0 - b * d * kk;
      dq = q0 - q1;
      dwl = U.round(0.5 * t * dq, 2);
      answer = dwl;
      askZh = '政府向生產者徵收每件 ' + t + ' 元的從量稅。求這項稅造成的無謂損失（元，整數；按線性供需的三角形面積計算）。';
      askEn = "The government imposes a per-unit tax of " + t + " dollars on producers. Find the deadweight loss caused by this tax (in dollars, integer), using the triangle area under linear demand and supply.";
      hintZh = '先求無稅均衡與稅後價格 $P_c$、$P_p$ 及稅後數量 $Q_1$；無謂損失 = $\\frac{1}{2} \\times t \\times (Q_0 - Q_1)$。';
      hintEn = "First find the no-tax equilibrium, the after-tax prices $P_c$ and $P_p$, and the after-tax quantity $Q_1$; deadweight loss $= \\frac{1}{2} \\times t \\times (Q_0 - Q_1)$.";
    }

    var taxSentenceZh = mode === 'tax_dwl' ? '政府向生產者徵收每件 ' + t + ' 元的從量稅。' : '';
    var taxSentenceEn = mode === 'tax_dwl' ? "The government imposes a per-unit tax of " + t + " dollars on producers. " : '';

    var promptZh = '某商品的市場為完全競爭的封閉市場，其他因素不變。價格以元為單位，數量以件為單位。需求 $Q_d = ' + a + ' - ' + termP(b) + '$，供應 $Q_s = ' + termP(d) + '$（供應曲線穿過原點）。無稅均衡價格 $P_0 = ' + p0 + '$ 元，均衡數量 $Q_0 = ' + q0 + '$ 件。' + taxSentenceZh + askZh;
    var promptEn = "The market for a good is perfectly competitive and closed, with all other factors unchanged. Price is in dollars and quantity is in units. Demand is $Q_d = " + a + " - " + termP(b) + "$ and supply is $Q_s = " + termP(d) + "$ (the supply line passes through the origin). The no-tax equilibrium price is $P_0 = " + p0 + "$ dollars and the equilibrium quantity is $Q_0 = " + q0 + "$ units. " + taxSentenceEn + askEn;

    var s1zh = '無稅均衡：由 $Q_d = Q_s$ 驗證，$' + a + ' - ' + termP(b) + ' = ' + termP(d) + '$，解得 $P_0 = ' + p0 + '$ 元、$Q_0 = ' + q0 + '$ 件（與題目一致）。';
    var s1en = "No-tax equilibrium: setting $Q_d = Q_s$, $" + a + " - " + termP(b) + " = " + termP(d) + "$, gives $P_0 = " + p0 + "$ dollars and $Q_0 = " + q0 + "$ units (matching the question).";

    var s2zh, s2en, s3zh, s3en, s4zh, s4en;
    if (mode === 'consumer_surplus') {
      var invQ = b === 1 ? 'Q' : 'Q/' + b;
      s2zh = '需求函數的反函數為 $P = ' + maxWTP + ' - ' + invQ + '$；當 $Q = 0$ 時，最高願付價為 $' + maxWTP + '$ 元。';
      s2en = "The inverse demand function is $P = " + maxWTP + " - " + invQ + "$; at $Q = 0$ the maximum willingness to pay is $" + maxWTP + "$ dollars.";
      s3zh = '消費者盈餘 = $\\frac{1}{2} \\times Q_0 \\times (' + maxWTP + ' - ' + p0 + ') = \\frac{1}{2} \\times ' + q0 + ' \\times ' + (maxWTP - p0) + ' = ' + answer + '$ 元。';
      s3en = "Consumer surplus $= \\frac{1}{2} \\times Q_0 \\times (" + maxWTP + " - " + p0 + ") = \\frac{1}{2} \\times " + q0 + " \\times " + (maxWTP - p0) + " = " + answer + "$ dollars.";
      s4zh = '因此消費者盈餘為 ' + answer + ' 元。';
      s4en = "Therefore the consumer surplus is " + answer + " dollars.";
    } else if (mode === 'producer_surplus') {
      s2zh = '供應線 $Q_s = ' + termP(d) + '$ 穿過原點，最低供應價為 0 元。';
      s2en = "The supply line $Q_s = " + termP(d) + "$ passes through the origin, so the minimum supply price is 0 dollars.";
      s3zh = '生產者盈餘 = $\\frac{1}{2} \\times Q_0 \\times (P_0 - 0) = \\frac{1}{2} \\times ' + q0 + ' \\times ' + p0 + ' = ' + answer + '$ 元。';
      s3en = "Producer surplus $= \\frac{1}{2} \\times Q_0 \\times (P_0 - 0) = \\frac{1}{2} \\times " + q0 + " \\times " + p0 + " = " + answer + "$ dollars.";
      s4zh = '因此生產者盈餘為 ' + answer + ' 元。';
      s4en = "Therefore the producer surplus is " + answer + " dollars.";
    } else if (mode === 'total_surplus') {
      s2zh = '消費者盈餘 = $\\frac{1}{2} \\times Q_0 \\times (' + maxWTP + ' - ' + p0 + ') = ' + cs + '$ 元；生產者盈餘 = $\\frac{1}{2} \\times Q_0 \\times P_0 = ' + ps + '$ 元。';
      s2en = "Consumer surplus $= \\frac{1}{2} \\times Q_0 \\times (" + maxWTP + " - " + p0 + ") = " + cs + "$ dollars; producer surplus $= \\frac{1}{2} \\times Q_0 \\times P_0 = " + ps + "$ dollars.";
      s3zh = '總盈餘 = 消費者盈餘 + 生產者盈餘 = $' + cs + ' + ' + ps + ' = ' + ts + '$ 元。';
      s3en = "Total surplus $=$ consumer surplus $+$ producer surplus $= " + cs + " + " + ps + " = " + ts + "$ dollars.";
      s4zh = '因此總盈餘為 ' + answer + ' 元。';
      s4en = "Therefore the total surplus is " + answer + " dollars.";
    } else {
      s2zh = '稅後設消費者價格為 $P_c$、生產者價格為 $P_p$，$P_c = P_p + t$。令 $Q_d(P_c) = Q_s(P_p)$，即 $' + a + ' - ' + coefVar(b, '(P_p + ' + t + ')') + ' = ' + coefVar(d, 'P_p') + '$，解得 $P_c = ' + pc + '$ 元、$P_p = ' + pp + '$ 元、稅後數量 $Q_1 = ' + q1 + '$ 件。';
      s2en = "Let $P_c$ and $P_p$ be the consumer and producer prices after the tax, with $P_c = P_p + t$. Setting $Q_d(P_c) = Q_s(P_p)$, i.e. $" + a + " - " + coefVar(b, '(P_p + ' + t + ')') + " = " + coefVar(d, 'P_p') + "$, gives $P_c = " + pc + "$ dollars, $P_p = " + pp + "$ dollars and after-tax quantity $Q_1 = " + q1 + "$ units.";
      s3zh = '每件稅負：消費者負擔 $P_c - P_0 = ' + (pc - p0) + '$ 元，生產者負擔 $P_0 - P_p = ' + (p0 - pp) + '$ 元，合計 ' + t + ' 元。產量減少 $Q_0 - Q_1 = ' + dq + '$ 件，無謂損失 = $\\frac{1}{2} \\times t \\times (Q_0 - Q_1) = \\frac{1}{2} \\times ' + t + ' \\times ' + dq + ' = ' + answer + '$ 元。';
      s3en = "Burden per unit: consumers bear $P_c - P_0 = " + (pc - p0) + "$ dollars and producers bear $P_0 - P_p = " + (p0 - pp) + "$ dollars, adding up to " + t + " dollars. Quantity falls by $Q_0 - Q_1 = " + dq + "$ units, so deadweight loss $= \\frac{1}{2} \\times t \\times (Q_0 - Q_1) = \\frac{1}{2} \\times " + t + " \\times " + dq + " = " + answer + "$ dollars.";
      s4zh = '因此這項稅造成的無謂損失為 ' + answer + ' 元。';
      s4en = "Therefore the deadweight loss caused by the tax is " + answer + " dollars.";
    }

    return {
      prompt: bi(promptZh, promptEn),
      hint: bi(hintZh, hintEn),
      answer: answer,
      solution: solved([s1zh, s2zh, s3zh, s4zh], [s1en, s2en, s3en, s4en]),
      math: { mode: mode, a: a, b: b, d: d, p0: p0, q0: q0, cs: cs, ps: ps, ts: ts, t: t || 0, pc: pc || 0, pp: pp || 0, q1: q1 || 0 }
    };
  });

  /* ================================================================
   * 4. externality — 負外部性、皮古稅、無謂損失
   *    MPC = a + bQ；MEC = e；需求 MSB = c - dQ
   * ================================================================ */

  register('externality', function (rng, o) {
    o = o || {};
    var level = o.level || 1;
    var b, d;
    if (level >= 3) {
      /* b + d 為偶數，令無謂損失三角形面積為整數 */
      var pair = U.pick(rng, [[1, 1], [2, 2], [1, 3], [3, 1]]);
      b = pair[0];
      d = pair[1];
    } else {
      b = U.pick(rng, [1, 2, 3]);
      d = U.pick(rng, [1, 2, 3]);
    }
    var a = U.randInt(rng, 5, 15);
    var qstar = U.randInt(rng, 5, 20);
    var g = U.randInt(rng, 1, 4);
    var e = (b + d) * g;
    var c = a + b * qstar + e + d * qstar;   /* MSB 截距 */
    var qm = qstar + g;                       /* 自由市場產量 */
    var mpcStar = a + b * qstar;
    var msbStar = c - d * qstar;
    var dwl = U.round(0.5 * g * e, 2);

    var mode, answer, askZh, askEn, hintZh, hintEn;
    if (level <= 1) {
      mode = 'social_optimum';
      answer = qstar;
      askZh = '求社會最適產量（件，整數）。';
      askEn = "Find the socially optimal quantity (in units, integer).";
      hintZh = '社會最適要求邊際社會效益等於邊際社會成本：$MSB = MPC + MEC$。';
      hintEn = "The social optimum requires marginal social benefit to equal marginal social cost: $MSB = MPC + MEC$.";
    } else if (level === 2) {
      mode = 'pigouvian_tax';
      answer = e;
      askZh = '若政府向廠商徵收每單位皮古稅，使利潤最大化的產量等於社會最適產量，求每單位稅額（元，整數）。';
      askEn = "If the government imposes a per-unit Pigouvian tax so that the profit-maximising quantity equals the socially optimal quantity, find the tax per unit (in dollars, integer).";
      hintZh = '廠商課稅後按 $MPC + t = MSB$ 決定產量；要令其選擇社會最適產量，$t = MEC$。';
      hintEn = "After the tax the firm sets $MPC + t = MSB$; to make it choose the socially optimal quantity, $t = MEC$.";
    } else {
      mode = 'dwl';
      answer = dwl;
      askZh = '假設政府沒有干預（自由市場）。求自由市場產量與社會最適產量之間的無謂損失（元，整數；以線性三角形面積近似）。';
      askEn = "Suppose the government does not intervene (free market). Find the deadweight loss between the free-market quantity and the socially optimal quantity (in dollars, integer), approximated by a linear triangle.";
      hintZh = '先求 $MSB = MPC$ 的自由市場產量，再求 $MSB = MPC + MEC$ 的社會最適產量；無謂損失 = $\\frac{1}{2} \\times (Q_m - Q^*) \\times MEC$。';
      hintEn = "First find the free-market quantity from $MSB = MPC$, then the socially optimal quantity from $MSB = MPC + MEC$; deadweight loss $= \\frac{1}{2} \\times (Q_m - Q^*) \\times MEC$.";
    }

    var promptZh = '某工廠在完全競爭的封閉市場生產，其他因素不變。生產過程排放污染物，每單位產量的邊際外部成本固定為 $MEC = ' + e + '$ 元（負外部性；政府未干預）。價格以元為單位，數量 $Q$ 以件為單位。邊際私人成本 $MPC = ' + a + ' + ' + termQ(b) + '$；邊際外部成本 $MEC = ' + e + '$；市場需求（邊際社會效益）$MSB = ' + c + ' - ' + termQ(d) + '$。' + askZh;
    var promptEn = "A factory produces in a perfectly competitive, closed market with all other factors unchanged. Production creates pollution: the marginal external cost is a constant $MEC = " + e + "$ dollars per unit (a negative externality; the government does not intervene). Price is in dollars and quantity $Q$ is in units. Marginal private cost is $MPC = " + a + " + " + termQ(b) + "$; marginal external cost is $MEC = " + e + "$; market demand (marginal social benefit) is $MSB = " + c + " - " + termQ(d) + "$. " + askEn;

    var s1zh, s1en, s2zh, s2en, s3zh, s3en, s4zh, s4en;
    if (mode === 'social_optimum') {
      s1zh = '社會最適條件：$MSB = MPC + MEC$，即 $' + c + ' - ' + termQ(d) + ' = ' + a + ' + ' + termQ(b) + ' + ' + e + '$。';
      s1en = "Social optimum condition: $MSB = MPC + MEC$, i.e. $" + c + " - " + termQ(d) + " = " + a + " + " + termQ(b) + " + " + e + "$.";
      s2zh = '整理得 $(' + (b + d) + ')Q = ' + (c - a - e) + '$，故 $Q^* = ' + (c - a - e) + ' / ' + (b + d) + ' = ' + qstar + '$ 件。';
      s2en = "Rearranging gives $(" + (b + d) + ")Q = " + (c - a - e) + "$, so $Q^* = " + (c - a - e) + " / " + (b + d) + " = " + qstar + "$ units.";
      s3zh = '檢查：$Q^* = ' + qstar + ' > 0$，符合社會最適產量為正的要求。此時 $MSB = MPC + MEC = ' + msbStar + '$ 元。';
      s3en = "Check: $Q^* = " + qstar + " > 0$, so the socially optimal quantity is positive. At this quantity $MSB = MPC + MEC = " + msbStar + "$ dollars.";
      s4zh = '因此社會最適產量為 ' + answer + ' 件。';
      s4en = "Therefore the socially optimal quantity is " + answer + " units.";
    } else if (mode === 'pigouvian_tax') {
      s1zh = '先求社會最適產量：$MSB = MPC + MEC$，即 $' + c + ' - ' + termQ(d) + ' = ' + a + ' + ' + termQ(b) + ' + ' + e + '$，解得 $Q^* = ' + qstar + '$ 件。';
      s1en = "First find the socially optimal quantity: $MSB = MPC + MEC$, i.e. $" + c + " - " + termQ(d) + " = " + a + " + " + termQ(b) + " + " + e + "$, giving $Q^* = " + qstar + "$ units.";
      s2zh = '政府徵收每單位 $t$ 元後，廠商按 $MPC + t = MSB$ 決定產量。要令廠商選擇 $Q = Q^*$，需 $t = MEC = ' + e + '$ 元。';
      s2en = "With a per-unit tax $t$, the firm chooses output where $MPC + t = MSB$. To make the firm choose $Q = Q^*$, we need $t = MEC = " + e + "$ dollars.";
      s3zh = '驗證：$MPC(Q^*) + t = ' + mpcStar + ' + ' + e + ' = ' + (mpcStar + e) + '$ 元，而 $MSB(Q^*) = ' + c + ' - ' + d + ' \\times ' + qstar + ' = ' + msbStar + '$ 元，兩者相等，故廠商會生產 $Q^*$。';
      s3en = "Check: $MPC(Q^*) + t = " + mpcStar + " + " + e + " = " + (mpcStar + e) + "$ dollars while $MSB(Q^*) = " + c + " - " + d + " \\times " + qstar + " = " + msbStar + "$ dollars; they are equal, so the firm chooses $Q^*$.";
      s4zh = '因此每單位皮古稅為 ' + answer + ' 元。';
      s4en = "Therefore the Pigouvian tax per unit is " + answer + " dollars.";
    } else {
      s1zh = '自由市場均衡：廠商只考慮私人成本，令 $MSB = MPC$，即 $' + c + ' - ' + termQ(d) + ' = ' + a + ' + ' + termQ(b) + '$，解得 $Q_m = ' + (c - a) + ' / ' + (b + d) + ' = ' + qm + '$ 件。';
      s1en = "Free-market equilibrium: the firm considers only private cost, so $MSB = MPC$, i.e. $" + c + " - " + termQ(d) + " = " + a + " + " + termQ(b) + "$, giving $Q_m = " + (c - a) + " / " + (b + d) + " = " + qm + "$ units.";
      s2zh = '社會最適產量：$MSB = MPC + MEC$，即 $' + c + ' - ' + termQ(d) + ' = ' + a + ' + ' + termQ(b) + ' + ' + e + '$，解得 $Q^* = ' + qstar + '$ 件。';
      s2en = "Socially optimal quantity: $MSB = MPC + MEC$, i.e. $" + c + " - " + termQ(d) + " = " + a + " + " + termQ(b) + " + " + e + "$, giving $Q^* = " + qstar + "$ units.";
      s3zh = '自由市場產量比社會最適多 $Q_m - Q^* = ' + qm + ' - ' + qstar + ' = ' + g + '$ 件。無謂損失 = $\\frac{1}{2} \\times (Q_m - Q^*) \\times MEC = \\frac{1}{2} \\times ' + g + ' \\times ' + e + ' = ' + answer + '$ 元。';
      s3en = "The free-market quantity exceeds the social optimum by $Q_m - Q^* = " + qm + " - " + qstar + " = " + g + "$ units. Deadweight loss $= \\frac{1}{2} \\times (Q_m - Q^*) \\times MEC = \\frac{1}{2} \\times " + g + " \\times " + e + " = " + answer + "$ dollars.";
      s4zh = '因此自由市場造成的無謂損失為 ' + answer + ' 元。';
      s4en = "Therefore the deadweight loss in the free market is " + answer + " dollars.";
    }

    return {
      prompt: bi(promptZh, promptEn),
      hint: bi(hintZh, hintEn),
      answer: answer,
      solution: solved([s1zh, s2zh, s3zh, s4zh], [s1en, s2en, s3en, s4en]),
      math: { mode: mode, a: a, b: b, c: c, d: d, e: e, qstar: qstar, qm: qm, g: g }
    };
  });

  /* ================================================================
   * 5. mv — 邊際效用與消費者均衡
   * ================================================================ */

  register('mv', function (rng, o) {
    o = o || {};
    var level = o.level || 1;

    if (level <= 1) {
      /* 由總效用表求第 n 件的邊際效用 */
      var n = 5;
      var mu1 = U.randInt(rng, 16, 24);
      var maxDrop = Math.floor((mu1 - 3) / (n - 1));
      var drop = U.randInt(rng, 2, Math.max(2, maxDrop));
      var mus = [];
      var tus = [];
      var sum = 0;
      for (var i = 0; i < n; i++) {
        var mu = mu1 - i * drop;
        mus.push(mu);
        sum += mu;
        tus.push(sum);
      }
      var idx = U.randInt(rng, 2, 5);
      var prevTU = idx === 2 ? 0 : tus[idx - 2];
      var answer = mus[idx - 1];

      var tableZh = '數量（件）：1、2、3、4、5；總效用 $TU$（效用單位）：' + tus.join('、') + '。';
      var tableEn = "Quantity (units): 1, 2, 3, 4, 5; total utility $TU$ (utility units): " + tus.join(', ') + ".";
      var promptZh = '某消費者消費某商品的總效用如下表，其他因素不變（效用可以比較，單位為「效用單位」）。' + tableZh + '求第 ' + idx + ' 件的邊際效用 $MU$（效用單位，整數）。';
      var promptEn = "The table below shows a consumer's total utility from a good, with all other factors unchanged (utility is measurable in utility units). " + tableEn + " Find the marginal utility $MU$ of the " + idx + "-th unit (in utility units, integer).";
      var prevTextZh = idx === 2 ? '未消費時 $TU_0 = 0$' : '$TU_' + (idx - 1) + ' = ' + tus[idx - 2] + '$';
      var prevTextEn = idx === 2 ? 'with $TU_0 = 0$ before any consumption' : 'and $TU_' + (idx - 1) + ' = ' + tus[idx - 2] + '$';
      return {
        prompt: bi(promptZh, promptEn),
        hint: bi('邊際效用 = 增加一單位所增加的總效用：$MU_n = TU_n - TU_{n-1}$。', "Marginal utility is the extra total utility from one more unit: $MU_n = TU_n - TU_{n-1}$."),
        answer: answer,
        solution: solved([
          '邊際效用是增加第 $n$ 件時總效用的增量：$MU_n = TU_n - TU_{n-1}$。',
          '由表：$TU_' + idx + ' = ' + tus[idx - 1] + '$，' + prevTextZh + '。',
          '$MU_' + idx + ' = ' + tus[idx - 1] + ' - ' + prevTU + ' = ' + answer + '$ 效用單位（邊際效用隨消費量增加而遞減）。',
          '因此第 ' + idx + ' 件的邊際效用為 ' + answer + ' 效用單位。'
        ], [
          'Marginal utility is the increase in total utility from the $n$-th unit: $MU_n = TU_n - TU_{n-1}$.',
          'From the table: $TU_' + idx + ' = ' + tus[idx - 1] + '$, ' + prevTextEn + '.',
          '$MU_' + idx + ' = ' + tus[idx - 1] + ' - ' + prevTU + ' = ' + answer + '$ utility units (marginal utility falls as consumption rises).',
          'Therefore the marginal utility of the ' + idx + '-th unit is ' + answer + ' utility units.'
        ]),
        math: { mode: 'mu_table', mu1: mu1, drop: drop, index: idx, answer: answer }
      };
    }

    if (level === 2) {
      if (rng() < 0.5) {
        /* 求未知價格 Py */
        var pair = U.pick(rng, [[2, 4], [4, 2], [2, 5], [5, 2], [4, 5], [5, 4], [2, 10], [10, 2], [4, 10], [10, 4], [5, 10], [10, 5]]);
        var Px = pair[0];
        var Py = pair[1];
        var lam = U.randInt(rng, 1, 3);
        var MUx = lam * Px;
        var MUy = lam * Py;
        var answerPrice = Py;
        var promptZh = '某消費者只消費 X、Y 兩種商品，其他因素不變，並已達消費者均衡（$MU_x/P_x = MU_y/P_y$ 且用盡全部收入）。數量以件為單位，價格以元為單位。在現時消費組合下 $MU_x = ' + MUx + '$、$MU_y = ' + MUy + '$，且 $P_x = ' + Px + '$ 元。求 $P_y$（元，整數）。';
        var promptEn = "A consumer buys only goods X and Y, with all other factors unchanged, and is in consumer equilibrium ($MU_x/P_x = MU_y/P_y$) while spending all income. Quantity is in units and price is in dollars. At the current bundle $MU_x = " + MUx + "$, $MU_y = " + MUy + "$ and $P_x = " + Px + "$ dollars. Find $P_y$ (in dollars, integer).";
        return {
          prompt: bi(promptZh, promptEn),
          hint: bi('消費者均衡時 $MU_x/P_x = MU_y/P_y$，可改寫成 $P_y = P_x \\times MU_y / MU_x$。', "At consumer equilibrium $MU_x/P_x = MU_y/P_y$, which can be rearranged as $P_y = P_x \\times MU_y / MU_x$."),
          answer: answerPrice,
          solution: solved([
            '消費者均衡條件：$MU_x/P_x = MU_y/P_y$，即 $P_y = P_x \\times MU_y / MU_x$。',
            '代入：$P_y = ' + Px + ' \\times ' + MUy + ' / ' + MUx + ' = ' + answerPrice + '$ 元。',
            '驗證：$MU_x/P_x = ' + MUx + ' / ' + Px + ' = ' + lam + '$，$MU_y/P_y = ' + MUy + ' / ' + answerPrice + ' = ' + lam + '$，兩者相等。',
            '因此 $P_y$ 為 ' + answerPrice + ' 元。'
          ], [
            'Consumer equilibrium requires $MU_x/P_x = MU_y/P_y$, i.e. $P_y = P_x \\times MU_y / MU_x$.',
            "Substituting: $P_y = " + Px + " \\times " + MUy + " / " + MUx + " = " + answerPrice + "$ dollars.",
            "Check: $MU_x/P_x = " + MUx + " / " + Px + " = " + lam + "$ and $MU_y/P_y = " + MUy + " / " + answerPrice + " = " + lam + "$, which are equal.",
            'Therefore $P_y$ is ' + answerPrice + ' dollars.'
          ]),
          math: { mode: 'price', px: Px, py: Py, mux: MUx, muy: MUy, lambda: lam }
        };
      } else {
        /* 求未知數量 Qx */
        var px2 = U.pick(rng, [2, 4, 5]);
        var py2 = U.pick(rng, [2, 4, 5]);
        var lam2 = U.randInt(rng, 1, 3);
        var slope = U.pick(rng, [1, 2]);
        var qxStar = U.randInt(rng, 2, 6);
        var intercept = lam2 * px2 + slope * qxStar;
        var muy2 = lam2 * py2;
        var target = lam2 * px2;
        var answerQty = qxStar;
        var promptZh2 = '某消費者只消費 X、Y 兩種商品，其他因素不變，並已達消費者均衡（$MU_x/P_x = MU_y/P_y$ 且用盡全部收入）。數量以件為單位，價格以元為單位。$MU_x = ' + intercept + ' - ' + termQ(slope) + '$（邊際效用隨數量遞減）、$MU_y = ' + muy2 + '$、$P_x = ' + px2 + '$ 元、$P_y = ' + py2 + '$ 元。求 $Q_x$（件，整數）。';
        var promptEn2 = "A consumer buys only goods X and Y, with all other factors unchanged, and is in consumer equilibrium ($MU_x/P_x = MU_y/P_y$) while spending all income. Quantity is in units and price is in dollars. $MU_x = " + intercept + " - " + termQ(slope) + "$ (marginal utility falls with quantity), $MU_y = " + muy2 + "$, $P_x = " + px2 + "$ dollars and $P_y = " + py2 + "$ dollars. Find $Q_x$ (in units, integer).";
        return {
          prompt: bi(promptZh2, promptEn2),
          hint: bi('由 $MU_x/P_x = MU_y/P_y$ 求出均衡時要求的 $MU_x$，再代入 $MU_x = ' + intercept + ' - ' + termQ(slope) + '$ 解 $Q_x$。', "Use $MU_x/P_x = MU_y/P_y$ to find the required $MU_x$ at equilibrium, then substitute into $MU_x = " + intercept + " - " + termQ(slope) + "$ to solve for $Q_x$."),
          answer: answerQty,
          solution: solved([
            '消費者均衡條件：$MU_x/P_x = MU_y/P_y$，所以 $MU_x = P_x \\times MU_y / P_y$。',
            '代入已知值：$MU_x = ' + px2 + ' \\times ' + muy2 + ' / ' + py2 + ' = ' + target + '$ 效用單位。',
            '代入 $MU_x = ' + intercept + ' - ' + termQ(slope) + '$：$' + intercept + ' - ' + termQ(slope) + ' = ' + target + '$，解得 $Q_x = ' + answerQty + '$ 件。',
            '因此消費者均衡時的 $Q_x$ 為 ' + answerQty + ' 件。'
          ], [
            'Consumer equilibrium requires $MU_x/P_x = MU_y/P_y$, so $MU_x = P_x \\times MU_y / P_y$.',
            "Substituting the known values: $MU_x = " + px2 + " \\times " + muy2 + " / " + py2 + " = " + target + "$ utility units.",
            "Substituting into $MU_x = " + intercept + " - " + termQ(slope) + "$: $" + intercept + " - " + termQ(slope) + " = " + target + "$, which gives $Q_x = " + answerQty + "$ units.",
            'Therefore $Q_x$ at consumer equilibrium is ' + answerQty + ' units.'
          ]),
          math: { mode: 'quantity', px: px2, py: py2, muy: muy2, intercept: intercept, slope: slope, qx: qxStar }
        };
      }
    }

    /* level 3：預算約束下的總效用最大化數量組合 */
    var pair3 = U.pick(rng, [[2, 4], [4, 2], [2, 5], [5, 2], [4, 5], [5, 4], [2, 10], [10, 2]]);
    var Px3 = pair3[0];
    var Py3 = pair3[1];
    var lam3 = U.randInt(rng, 1, 2);
    var b1 = U.pick(rng, [1, 2]);
    var b2 = U.pick(rng, [1, 2]);
    var qx3 = U.randInt(rng, 2, 6);
    var qy3 = U.randInt(rng, 2, 6);
    var A3 = lam3 * Px3 + b1 * qx3;
    var B3 = lam3 * Py3 + b2 * qy3;
    var income = Px3 * qx3 + Py3 * qy3;
    var askX = rng() < 0.5;
    var answer3 = askX ? qx3 : qy3;
    var askZh3 = askX ? '求總效用極大時 X 的數量 $Q_x$（件，整數）。' : '求總效用極大時 Y 的數量 $Q_y$（件，整數）。';
    var askEn3 = askX ? "Find the quantity of X, $Q_x$, that maximises total utility (in units, integer)." : "Find the quantity of Y, $Q_y$, that maximises total utility (in units, integer).";
    var promptZh3 = '某消費者只消費 X、Y 兩種商品，其他因素不變，效用可作基數比較且貨幣的邊際效用固定。數量以件為單位，價格以元為單位。$MU_x = ' + A3 + ' - ' + termQ(b1) + '$、$MU_y = ' + B3 + ' - ' + termQ(b2) + '$；$P_x = ' + Px3 + '$ 元、$P_y = ' + Py3 + '$ 元；收入 $I = ' + income + '$ 元並全部用於消費。' + askZh3;
    var promptEn3 = "A consumer buys only goods X and Y, with all other factors unchanged; utility is measurable and the marginal utility of money is constant. Quantity is in units and price is in dollars. $MU_x = " + A3 + " - " + termQ(b1) + "$, $MU_y = " + B3 + " - " + termQ(b2) + "$; $P_x = " + Px3 + "$ dollars, $P_y = " + Py3 + "$ dollars; income $I = " + income + "$ dollars is spent entirely on the two goods. " + askEn3;
    return {
      prompt: bi(promptZh3, promptEn3),
      hint: bi('總效用極大的內點條件為 $MU_x/P_x = MU_y/P_y$，再配合預算約束 $P_x Q_x + P_y Q_y = I$ 聯立求解。', "The interior condition for maximum total utility is $MU_x/P_x = MU_y/P_y$; combine it with the budget constraint $P_x Q_x + P_y Q_y = I$ and solve."),
      answer: answer3,
      solution: solved([
        '總效用極大的內點條件：$MU_x/P_x = MU_y/P_y$，即 $MU_x \\times P_y = MU_y \\times P_x$。',
        '代入：$(' + A3 + ' - ' + termQ(b1) + ') \\times ' + Py3 + ' = (' + B3 + ' - ' + termQ(b2) + ') \\times ' + Px3 + '$。',
        '配合預算約束 $' + Px3 + 'Q_x + ' + Py3 + 'Q_y = ' + income + '$ 聯立解得 $Q_x = ' + qx3 + '$ 件、$Q_y = ' + qy3 + '$ 件（均為正整數，且用盡收入）。',
        '因此' + (askX ? ' X 的數量 $Q_x$ 為 ' : ' Y 的數量 $Q_y$ 為 ') + answer3 + ' 件。'
      ], [
        'The interior condition for maximum total utility is $MU_x/P_x = MU_y/P_y$, i.e. $MU_x \\times P_y = MU_y \\times P_x$.',
        "Substituting: $(" + A3 + " - " + termQ(b1) + ") \\times " + Py3 + " = (" + B3 + " - " + termQ(b2) + ") \\times " + Px3 + "$.",
        "Solving together with the budget constraint $" + Px3 + "Q_x + " + Py3 + "Q_y = " + income + "$ gives $Q_x = " + qx3 + "$ units and $Q_y = " + qy3 + "$ units (positive integers, with the whole income spent).",
        'Therefore the quantity of ' + (askX ? 'X, $Q_x$,' : 'Y, $Q_y$,') + ' is ' + answer3 + ' units.'
      ]),
      math: { mode: 'budget_max', px: Px3, py: Py3, muxA: A3, muxB: b1, muyA: B3, muyB: b2, income: income, qx: qx3, qy: qy3 }
    };
  });

  /* ================================================================
   * 6. budget_line — 預算線：截距、斜率、變動後的新購買量
   * ================================================================ */

  register('budget_line', function (rng, o) {
    o = o || {};
    var level = o.level || 1;
    var pair = U.pick(rng, [[2, 4], [4, 2], [5, 10], [10, 5], [4, 10], [10, 4], [2, 10], [10, 2], [5, 20], [20, 5], [2, 5], [5, 2], [4, 20], [20, 4], [10, 20], [20, 10]]);
    var Px = pair[0];
    var Py = pair[1];
    var m = U.randInt(rng, 2, 4);
    var income = Px * Py * m;
    var maxX = income / Px;   /* = Py * m */
    var maxY = income / Py;   /* = Px * m */
    var budgetZh = '預算約束為 $P_x X + P_y Y = I$，即 $' + Px + 'X + ' + Py + 'Y = ' + income + '$。';
    var budgetEn = "The budget constraint is $P_x X + P_y Y = I$, i.e. $" + Px + "X + " + Py + "Y = " + income + "$.";

    if (level <= 1) {
      var askX = rng() < 0.5;
      var answer = askX ? maxX : maxY;
      var askZh = askX ? '求把全部收入用於 X 時最多可購買的 X 數量（件）。' : '求把全部收入用於 Y 時最多可購買的 Y 數量（件）。';
      var askEn = askX ? "Find the maximum quantity of X the consumer can buy if all income is spent on X (in units)." : "Find the maximum quantity of Y the consumer can buy if all income is spent on Y (in units).";
      var promptZh = '某消費者的收入為 $I = ' + income + '$ 元，全部用於購買 X、Y 兩種商品；其他因素不變、商品價格固定（消費者是價格接受者）。價格以元為單位、數量以件為單位：$P_x = ' + Px + '$ 元、$P_y = ' + Py + '$ 元。' + budgetZh + askZh;
      var promptEn = "A consumer has income $I = " + income + "$ dollars, all spent on goods X and Y; all other factors are unchanged and prices are fixed (the consumer is a price taker). Price is in dollars and quantity is in units: $P_x = " + Px + "$ dollars and $P_y = " + Py + "$ dollars. " + budgetEn + " " + askEn;
      var solZh, solEn;
      if (askX) {
        solZh = [
          budgetZh,
          '全買 X 時 $Y = 0$，代入預算約束得 $' + Px + 'X = ' + income + '$。',
          '$X = ' + income + ' / ' + Px + ' = ' + answer + '$ 件（同理全買 Y 可得 $' + maxY + '$ 件）。',
          '因此最多可買 ' + answer + ' 件 X。'
        ];
        solEn = [
          budgetEn,
          "If all income is spent on X then $Y = 0$, so $" + Px + "X = " + income + "$.",
          "$X = " + income + " / " + Px + " = " + answer + "$ units (spending all on Y would give $" + maxY + "$ units).",
          'Therefore the consumer can buy at most ' + answer + ' units of X.'
        ];
      } else {
        solZh = [
          budgetZh,
          '全買 Y 時 $X = 0$，代入預算約束得 $' + Py + 'Y = ' + income + '$。',
          '$Y = ' + income + ' / ' + Py + ' = ' + answer + '$ 件（同理全買 X 可得 $' + maxX + '$ 件）。',
          '因此最多可買 ' + answer + ' 件 Y。'
        ];
        solEn = [
          budgetEn,
          "If all income is spent on Y then $X = 0$, so $" + Py + "Y = " + income + "$.",
          "$Y = " + income + " / " + Py + " = " + answer + "$ units (spending all on X would give $" + maxX + "$ units).",
          'Therefore the consumer can buy at most ' + answer + ' units of Y.'
        ];
      }
      return {
        prompt: bi(promptZh, promptEn),
        hint: bi('全買 X 時 $Y = 0$，$X = I/P_x$；全買 Y 時 $X = 0$，$Y = I/P_y$。', "For all X set $Y = 0$, so $X = I/P_x$; for all Y set $X = 0$, so $Y = I/P_y$."),
        answer: answer,
        solution: solved(solZh, solEn),
        math: { mode: askX ? 'max_x' : 'max_y', px: Px, py: Py, income: income, maxX: maxX, maxY: maxY }
      };
    }

    if (level === 2) {
      var slopeAbs = U.round(Px / Py, 2);
      var answerSlope = slopeAbs;
      var promptZh2 = '某消費者的收入為 $I = ' + income + '$ 元，全部用於購買 X、Y 兩種商品；其他因素不變、價格固定。價格以元為單位、數量以件為單位：$P_x = ' + Px + '$ 元、$P_y = ' + Py + '$ 元。' + budgetZh + '求預算線斜率的絕對值，亦即 X 的機會成本（每多買 1 件 X 要放棄多少件 Y；單位：件 Y／件 X，取 2 位小數）。';
      var promptEn2 = "A consumer has income $I = " + income + "$ dollars, all spent on goods X and Y; all other factors are unchanged and prices are fixed. Price is in dollars and quantity is in units: $P_x = " + Px + "$ dollars and $P_y = " + Py + "$ dollars. " + budgetEn + " Find the absolute value of the slope of the budget line, i.e. the opportunity cost of X (how many units of Y must be given up for one more unit of X; in units of Y per unit of X, 2 d.p.).";
      return {
        prompt: bi(promptZh2, promptEn2),
        hint: bi('把預算約束改寫成 $Y = I/P_y - (P_x/P_y)X$，斜率的絕對值就是 $P_x/P_y$。', "Rewrite the budget constraint as $Y = I/P_y - (P_x/P_y)X$; the absolute slope is $P_x/P_y$."),
        answer: answerSlope,
        solution: solved([
          budgetZh,
          '改寫成 $Y = ' + income + ' / ' + Py + ' - (' + Px + ' / ' + Py + ')X$，斜率為 $-P_x/P_y$。',
          '斜率絕對值 = $P_x/P_y = ' + Px + ' / ' + Py + ' = ' + answerSlope + '$ 件 Y／件 X。',
          '因此 X 的機會成本為 ' + answerSlope + ' 件 Y／件 X。'
        ], [
          budgetEn,
          "Rearranging: $Y = " + income + " / " + Py + " - (" + Px + " / " + Py + ")X$, so the slope is $-P_x/P_y$.",
          "The absolute slope is $P_x/P_y = " + Px + " / " + Py + " = " + answerSlope + "$ units of Y per unit of X.",
          'Therefore the opportunity cost of X is ' + answerSlope + ' units of Y per unit of X.'
        ]),
        math: { mode: 'slope', px: Px, py: Py, income: income, maxX: maxX, maxY: maxY }
      };
    }

    /* level 3：價格或收入變動後的新最大 X 購買量 */
    if (rng() < 0.5) {
      var dir = rng() < 0.5 ? 1 : -1;
      var du = U.randInt(rng, 1, 3);
      var income2 = income + dir * Px * du;
      var answerIncome = income2 / Px;   /* = maxX + dir*du */
      var promptZh3 = '某消費者的收入為 $I = ' + income + '$ 元，全部用於購買 X、Y 兩種商品；其他因素不變、價格固定。價格以元為單位、數量以件為單位：$P_x = ' + Px + '$ 元、$P_y = ' + Py + '$ 元。' + budgetZh + '若收入由 ' + income + ' 元' + (dir > 0 ? '增加' : '減少') + '至 ' + income2 + ' 元（X、Y 的價格不變），求新的最大 X 購買量（件）。';
      var promptEn3 = "A consumer has income $I = " + income + "$ dollars, all spent on goods X and Y; all other factors are unchanged and prices are fixed. Price is in dollars and quantity is in units: $P_x = " + Px + "$ dollars and $P_y = " + Py + "$ dollars. " + budgetEn + " If income " + (dir > 0 ? 'rises' : 'falls') + " from " + income + " dollars to " + income2 + " dollars (prices of X and Y unchanged), find the new maximum quantity of X that can be bought (in units).";
      return {
        prompt: bi(promptZh3, promptEn3),
        hint: bi('收入變動不改變價格，新的 X 截距 = 新收入 / $P_x$。', "A change in income leaves prices unchanged, so the new X-intercept is new income $/ P_x$."),
        answer: answerIncome,
        solution: solved([
          budgetZh,
          '收入改變後，新的預算約束為 $' + Px + 'X + ' + Py + 'Y = ' + income2 + '$（價格不變）。',
          '全買 X 時 $Y = 0$，故 $X = ' + income2 + ' / ' + Px + ' = ' + answerIncome + '$ 件。',
          '因此新的最大 X 購買量為 ' + answerIncome + ' 件。'
        ], [
          budgetEn,
          "After the income change the new budget constraint is $" + Px + "X + " + Py + "Y = " + income2 + "$ (prices unchanged).",
          "With all income spent on X, $Y = 0$, so $X = " + income2 + " / " + Px + " = " + answerIncome + "$ units.",
          'Therefore the new maximum quantity of X is ' + answerIncome + ' units.'
        ]),
        math: { mode: 'income_change', px: Px, py: Py, income: income, income2: income2, maxX: maxX, maxY: maxY }
      };
    } else {
      var pool = [2, 4, 5, 8, 10, 20].filter(function (p) { return p !== Px && income % p === 0; });
      if (!pool.length) pool = [Px === 2 ? 4 : 2];
      var Px2 = U.pick(rng, pool);
      var answerPriceChange = income / Px2;
      var promptZh4 = '某消費者的收入為 $I = ' + income + '$ 元，全部用於購買 X、Y 兩種商品；其他因素不變。價格以元為單位、數量以件為單位：$P_x = ' + Px + '$ 元、$P_y = ' + Py + '$ 元。' + budgetZh + '若 X 的價格由 ' + Px + ' 元' + (Px2 > Px ? '上升' : '下降') + '至 ' + Px2 + ' 元（收入與 Y 的價格不變），求新的最大 X 購買量（件）。';
      var promptEn4 = "A consumer has income $I = " + income + "$ dollars, all spent on goods X and Y; all other factors are unchanged. Price is in dollars and quantity is in units: $P_x = " + Px + "$ dollars and $P_y = " + Py + "$ dollars. " + budgetEn + " If the price of X " + (Px2 > Px ? 'rises' : 'falls') + " from " + Px + " dollars to " + Px2 + " dollars (income and the price of Y unchanged), find the new maximum quantity of X that can be bought (in units).";
      return {
        prompt: bi(promptZh4, promptEn4),
        hint: bi('收入與 $P_y$ 不變，新的 X 截距 = $I /$ 新 $P_x$。', "Income and $P_y$ are unchanged, so the new X-intercept is $I /$ the new $P_x$."),
        answer: answerPriceChange,
        solution: solved([
          budgetZh,
          'X 的價格改變後，新的預算約束為 $' + Px2 + 'X + ' + Py + 'Y = ' + income + '$。',
          '全買 X 時 $Y = 0$，故 $X = ' + income + ' / ' + Px2 + ' = ' + answerPriceChange + '$ 件。',
          '因此新的最大 X 購買量為 ' + answerPriceChange + ' 件。'
        ], [
          budgetEn,
          "After the price of X changes, the new budget constraint is $" + Px2 + "X + " + Py + "Y = " + income + "$.",
          "With all income spent on X, $Y = 0$, so $X = " + income + " / " + Px2 + " = " + answerPriceChange + "$ units.",
          'Therefore the new maximum quantity of X is ' + answerPriceChange + ' units.'
        ]),
        math: { mode: 'price_change', px: Px, py: Py, px2: Px2, income: income, maxX: maxX, maxY: maxY }
      };
    }
  });
})();
