# 題型目錄（生成器契約）· TYPE CATALOG

> 給負責 `content/types-*.js` 的作者。請先讀 `econ-boot.js` 的註冊 API 與 `econ-core.js` 的 `generateProblem` 流程。
> 每個生成器用 `EconData.registerType('id', function (rng, o) { ... return problem; })` 註冊。
> 完成後用 `node tests/dev-gen-check.js --only=<id>` 驗證。

## 共通規則（必守）

1. **只用傳入的 `rng`**；禁止 `Math.random()`、`Date.now()`，確保同一 seed 可重現。
2. **回傳物件**：
   ```js
   {
     prompt: { zh, en },                 // 題幹，可用 $...$ 表示 KaTeX 公式
     hint: { zh, en },                   // 一句提示
     answer,                             // number 或 string
     choices,                            // 可選；文字答案必填，數字答案可省略由引擎代生成
     choiceLabels,                       // 文字選項必填：{ 'a': {zh,en}, ... }
     solution: { zh: [步驟], en: [步驟] },// 最後一步要包含答案
     math: { ... },                      // 生成參數（seed 去重/模板簽名用）
     input: false,                       // 通常省略；高階挑戰可設 true 強制鍵入
     visual: { ... }                     // 可選：supplydemand / ppf / adas / barchart
   }
   ```
3. **數字答案**：四捨五入至 2 位小數（除非題目要求整數）；用 `EduUtil.round(n, 2)`。
   若答案可能為負數，請自行提供 `choices`，以
   `EconData.util.numericChoices(rng, answer, { min: -500, max: 500, deltas: [...] })` 建立。
4. **文字答案**：必須提供 `choices`（值為 id 字串）與 `choiceLabels`（id → 雙語標籤）。
   正確答案的 id 要出現在 `choices`。
5. **雙語**：zh 用香港繁體中文＋DSE 術語；en 用清晰、準確的經濟學英文。不要中英夾雜。
6. **難度**：`o.level` 為 1–3（由技能的 `levels` 傳入，部分 2 級）。同一題型要在 level 1 用簡單整數、level 3 用多一步或較複雜數字。
7. **明確性**：題目要寫清楚假設（例如「其他因素不變」、「用初始值法」、「取絕對值」、「以百萬元為單位」），避免多解。
8. **答案合理性**：避免除以 0、負價格、負數量；彈性題的價格/數量變動不可為 0。
9. **不要放 HTML**；公式用 `$...$`；選項標籤用純文字。
10. **每個題型至少抽樣 25 次 × 每個 level 都要能生成**，且不能拋錯。

## 輔助 API

`EconData.util` 提供：
`seedRandom, randInt(rng,min,max), pick(rng,arr), shuffle(rng,arr), round(n,dp), fmt, money,
pct, numericChoices(rng, answer, {min,max,deltas,dp}), labelsOf(items), oneOf, solution(zh,en)`。

---

# 1. `content/types-micro.js`（微觀基礎：機會成本、PPF、供需、彈性）

| id | level / 參數 | 要求與答案 |
|---|---|---|
| `oppcost` | level 1–3 | 用生活情境問「機會成本」。要明確寫出所選方案與次佳選擇的價值；answer 為數字（元或分）。level 1 兩個明確金額；level 3 可加入時間成本或「每單位機會成本」（如兩產品產量）。`math:{mode}`。 |
| `ppc` | level 1–3 | 直線 PPF：全部資源生產 X 得 `maxX`，生產 Y 得 `maxY`。level 1 問每單位 X 的機會成本（=maxY/maxX）；level 2 問指定生產 q 單位 X 後最多可生產多少 Y；level 3 加入「點在曲線內／外／上」的效率判斷（用文字選項，提供 choiceLabels）。answer 為數字（除非效率判斷用文字 id）。`math:{maxX,maxY,asked}`。 |
| `demand_shift` | level 1–3 | 用事件（收入上升、替代品價格上升、預期價格上升、人口增加、偏好改變、互補品價格上升等）問需求曲線移動方向，以及均衡 P、Q 的變化。四個固定文字選項：P↑Q↑ / P↑Q↓ / P↓Q↑ / P↓Q↓（id 如 `upup, updown, downup, downdown`）。**只考需求**。必須提供 choiceLabels。`math:{event, direction}`。 |
| `supply_shift` | level 1–3 | 同上，但事件作用於供應（投入成本上升、技術進步、補貼、稅、生產者數目、預期價格等），問均衡 P、Q 的變化。選項同 `demand_shift`。**只考供應**。 |
| `equilibrium` | level 1–3 | `Qd = a − bP`、`Qs = c + dP`（整數、均衡為正）。level 1 求均衡價格或數量；level 2 求指定價格下的短缺/盈餘；level 3 需求或供應平移後求新均衡價格/數量。answer 數字；prompt 要列出兩條需求/供應函數並說明單位。`math:{a,b,c,d,asked}`。 |
| `ped` | level 1–3 | 需求價格彈性。level 1 用初始值法：`PED = |%ΔQ / %ΔP|`；level 2 用中點法；level 3 由 `Qd = a − bP` 在某一點計算點彈性 `|b·P/Q|`。prompt 要寫明用哪種方法；answer 取絕對值、2 位小數。`math:{mode,...}`。 |
| `ped_tr` | level 1–3 | 已知 PED（絕對值）與價格變動百分比，求總收入變動百分比：`%ΔTR = (1+%ΔP)(1+%ΔQ) − 1`，其中 `%ΔQ = −PED × %ΔP`。answer 為百分比數字（可負）；請提供 choices（min 可為負）。level 3 可追問價格上升時收入上升/下跌的文字選項（提供 choiceLabels）。 |
| `yed` | level 1–3 | 收入彈性 `YED = %ΔQ/%ΔI`（保留正負號）。level 1–2 直接給所得與需求量變動；level 3 給所得與需求量的兩個水平，自行算百分比（用中點法並在題目寫明）。answer 可負；提供 choices。math 記錄分類（正常/劣等/奢侈品/必需品）供解題步驟說明。 |
| `xed` | level 1–3 | 交叉彈性 `XED = %ΔQx/%ΔPy`（保留正負號）。給 Y 價格變動與 X 需求量變動；answer 可負；提供 choices。解題步驟要說明正數=替代品、負數=互補品。 |
| `pes` | level 1–3 | 供應價格彈性 `PES = %ΔQs/%ΔP`。level 1–2 初始值法／中點法（題目寫明）；level 3 由 `Qs = c + dP` 在某一點求點彈性。answer 正數、2 位小數。 |

**範例（`ped` 的核心實作，可直接參考）**

```js
EconData.registerType('ped', function (rng, o) {
  var U = EconData.util;
  var level = o.level || 1;
  var p1 = U.randInt(rng, 20, 80);
  var dPct = U.pick(rng, [-20, -15, -10, 10, 15, 20]);
  var ped = U.pick(rng, [0.5, 1, 1.5, 2, 2.5, 3]);
  var dQPct = -ped * dPct; // 需求定律
  var q1 = U.randInt(rng, 100, 400);
  var method = level >= 2 ? 'midpoint' : 'initial';
  var answer = U.round(Math.abs(dQPct / dPct), 2);
  return {
    prompt: {
      zh: '某商品價格由 $' + p1 + ' 變動 ' + Math.abs(dPct) + '%（' + (dPct > 0 ? '上升' : '下跌') + '），需求量變動 ' +
        Math.abs(U.round(dQPct, 1)) + '%。用' + (method === 'midpoint' ? '中點法' : '初始值法') + '計算需求價格彈性（取絕對值，2 位小數）。',
      en: 'The price of a good changes by ' + Math.abs(dPct) + '% (' + (dPct > 0 ? 'rise' : 'fall') + '), and quantity demanded changes by ' +
        Math.abs(U.round(dQPct, 1)) + '%. Using the ' + (method === 'midpoint' ? 'midpoint method' : 'initial-value method') +
        ', compute the price elasticity of demand (absolute value, 2 d.p.).'
    },
    hint: { zh: 'PED = 需求量變動百分比 ÷ 價格變動百分比，取絕對值。', en: 'PED = % change in quantity demanded ÷ % change in price, take the absolute value.' },
    answer: answer,
    solution: {
      zh: ['需求量變動百分比 = ' + U.round(dQPct, 1) + '%，價格變動百分比 = ' + dPct + '%。',
           'PED = |' + U.round(dQPct, 1) + '% ÷ ' + dPct + '%| = ' + answer + '。',
           '因此需求價格彈性為 ' + answer + '。'],
      en: ['% change in quantity demanded = ' + U.round(dQPct, 1) + '%; % change in price = ' + dPct + '%.',
           'PED = |' + U.round(dQPct, 1) + '% ÷ ' + dPct + '%| = ' + answer + '.',
           'So the price elasticity of demand is ' + answer + '.']
    },
    math: { mode: method, p1: p1, dPct: dPct, ped: ped }
  };
});
```

---

# 2. `content/types-micro2.js`（廠商、市場結構、貿易）

| id | level / 參數 | 要求與答案 |
|---|---|---|
| `cost` | level 1–3 | 用 `TC = FC + aQ + bQ²` 或成本表。level 1 給固定成本與變動成本，求 TC 或 AC；level 2 求邊際成本（相鄰產量差）；level 3 由 `MR = MC` 求利潤最大化產量（需求 `P = a − bQ`、`MC = c + dQ`，確保整數解）。answer 數字（元或數量）；prompt 要列明函數與單位。 |
| `profit` | level 1–3 | 給價格、產量、各項成本；level 1 求會計利潤 = TR − 顯性成本；level 2 加機會成本求經濟利潤；level 3 判斷正常利潤或比較兩個方案。answer 可負；提供 choices（含負數）。 |
| `monopoly` | level 1–3 | 需求 `P = a − bQ`、固定邊際成本 `MC = c`（或 TC）。level 1 求 MR 函數或利潤最大化 Q；level 2 求壟斷價格；level 3 求利潤或與完全競爭比較的無謂損失（用三角形近似，題目寫明）。answer 數字。 |
| `price_discrimination` | level 1–3 | 三級價格歧視：兩個分隔市場需求 `P1 = a1 − b1Q1`、`P2 = a2 − b2Q2`，`MC = c`。求某一市場利潤最大化價格/數量，或比較單一價格。answer 數字。level 3 可問哪個市場價格較高（文字選項）。 |
| `hhi` | level 1–3 | 給 3–5 間廠商市場佔有率（%），求 HHI = Σ s²（0–10000）。level 1 三間；level 3 問合併後 HHI 變化。answer 數字。prompt 要寫明用 0–10000 尺度。 |
| `game_theory` | level 1–3 | 2×2 同時博弈，給甲乙雙方的收益矩陣。level 1 找優勢策略；level 2 找納什均衡（4 個策略組合選項，提供 choiceLabels）；level 3 囚徒困境或重複博弈概念（可用文字選項）。answer 為策略 id 或文字 id；必須提供 choices 與 choiceLabels。`math:{payoffs}`。 |
| `labour` | level 1–3 | 勞動需求 `W = a − bL`、供應 `W = c + dL`。level 1 求均衡工資或就業量；level 2 最低工資高於均衡時求勞動過剩（供應量 − 需求量）；level 3 加入生產力/需求改變後的新均衡。answer 數字。 |
| `comparative_advantage` | level 1–3 | 兩國、兩產品，給每國每單位產品的勞動投入（或每單位勞動產量）。level 1 求某國生產 1 單位 X 的機會成本（單位 Y）；level 2 判斷哪國在 X 有比較優勢（文字選項，提供 choiceLabels）；level 3 求專業化後總產量增加或貿易得益（題目明確寫出交換比率）。answer 數字或文字 id。**確保沒有相同機會成本（無平手）**。 |
| `tariff` | level 1–3 | 小國模型：`Qd = a − bP`、`Qs = c + dP`、世界價格 `Pw`、從量關稅 `t`。level 1 求關稅後國內價格或進口量；level 2 求關稅收入；level 3 求無謂損失（兩個三角形，題目寫明幾何假設）。answer 數字；所有數量/價格為正、進口為正。 |

---

# 3. `content/types-welfare.js`（效率、政府干預、消費者理論）

| id | level / 參數 | 要求與答案 |
|---|---|---|
| `tax_incidence` | level 1–3 | 線性供需與從量稅 `t`。level 1 求稅收總額；level 2 求消費者每單位稅負（`Pc − P0`）或生產者稅負（`P0 − Pp`）；level 3 求無謂損失。prompt 要寫明「完全競爭市場、其他因素不變、以小國/封閉市場為例」。answer 數字（元或數量）。必須先算無稅均衡，再解 `Qd(Pc) = Qs(Pc − t)`。 |
| `price_control` | level 1–3 | 線性供需與有效（binding）價格上限/下限。level 1 求短缺/過剩數量；level 2 求實際交易量；level 3 求無謂損失。answer 數字。題目要說明上限低於/下限高於均衡（確保 binding）。 |
| `surplus` | level 1–3 | 線性供需。level 1 求消費者盈餘（三角形 `½ × Qe × (最大願付 − Pe)`）；level 2 求生產者盈餘；level 3 求總盈餘或課稅後的無謂損失。answer 數字；prompt 要提供需求/供應函數與均衡。 |
| `externality` | level 1–3 | `MPC = a + bQ`、`MEC = e`（每單位外部成本）、需求（MSB）`P = c − dQ`。level 1 求社會最適產量（MSB = MPC + MEC）；level 2 求皮古稅（= MEC）；level 3 求無謂損失（三角形，題目寫明以線性近似）。answer 數字。 |
| `mv` | level 1–3 | 邊際效用與消費者均衡。level 1 由總效用表求第 n 單位的 MU；level 2 給 `MUx`、`MUy`、`Px`、`Py`，求未知價格或數量使 `MUx/Px = MUy/Py`；level 3 求總效用最大化的數量組合（整數、預算約束）。answer 數字。 |
| `budget_line` | level 1–3 | 預算線 `PxX + PyY = I`。level 1 求全買 X 或全買 Y 的數量；level 2 求斜率（機會成本 `Px/Py`）；level 3 價格或收入變動後的新預算線最大數量。answer 數字。 |

---

# 4. `content/types-macro.js`（宏觀量度與決定）

| id | level / 參數 | 要求與答案 |
|---|---|---|
| `gdp_exp` | level 1–3 | 支出法 `GDP = C + I + G + X − M`。level 1 給四項求 GDP；level 2 求 GDP 或人均 GDP；level 3 加入存貨變動、資本形成或轉移支付陷阱（題目寫明哪些計入）。answer 數字（百萬元等，題目寫明單位）。 |
| `gdp_real` | level 1–3 | 名義 GDP、實質 GDP、GDP 平減指數。level 1 由名義 GDP 與平減指數求實質 GDP；level 2 由兩年實質 GDP 求增長率；level 3 由名義增長與通脹求實質增長（近似式並在題目說明可接受）。answer 數字（%或金額）。 |
| `growth` | level 1–3 | 增長率 `(Y2 − Y1)/Y1 × 100%`；level 2 人均 GDP = GDP/人口；level 3 CAGR 或 rule of 72（`72/r` 年）。answer 數字（%或年）。prompt 寫明用哪個規則、取幾位小數。 |
| `unemployment` | level 1–3 | 勞動人口 = 就業 + 失業；失業率 = 失業/勞動人口 ×100%；level 2 勞動參與率 = 勞動人口/工作年齡人口 ×100%；level 3 給就業、失業、非勞動人口求各率或判斷隱藏失業。answer 數字（%）。 |
| `cpi` | level 1–3 | 一籃子商品價格 → CPI = 當期成本/基期成本 ×100；level 2 通脹率 = CPI 變動%；level 3 兩年不同權數或實質工資。answer 數字（指數或%）。 |
| `inflation` | level 1–3 | 實質值 = 名義值/(1+通脹率)；實質利率 ≈ 名義利率 − 通脹率；level 3 購買力變化百分比。answer 數字（%或金額）。題目要寫明用近似或精確 Fisher 式。 |
| `multiplier` | level 1–3 | 簡單乘數 `k = 1/(1 − MPC) = 1/MPS`；level 2 `ΔY = k × ΔG`；level 3 稅收乘數 `−MPC/(1 − MPC)` 或開放經濟乘數（題目寫明漏出）。answer 數字。 |
| `income_eq` | level 1–3 | 均衡收入 `Y = C + I + G + (X − M)`；`C = a + bY`（level 1）；level 2 加入稅收 `C = a + b(Y − T)`；level 3 加入進口 `M = mY`。求均衡 Y 或缺口。answer 數字。確保兩邊係數使均衡為正。 |
| `money_multiplier` | level 1–3 | 法定準備金率 `r`；貨幣乘數 = `1/r`；level 1 求乘數；level 2 求初始存款最終可創造的總存款；level 3 加入現金漏出（題目給現金比率，公式寫明）。answer 數字。 |
| `money_demand` | level 1–3 | 數量論 `MV = PY`。level 1 求 M；level 2 求貨幣流通速度或名義 GDP；level 3 求貨幣供應增長率（`%ΔM + %ΔV = %ΔP + %ΔY`，題目寫明）。answer 數字。 |
| `interest` | level 1–3 (mode `simple`/`compound`) | simple：`I = P r t`、本利和 `P(1+rt)`；compound：`A = P(1+r)^n`、複利 `A − P`；real：`實質利率 ≈ 名義 − 通脹`。level 由 `o.mode` 或 level 決定（level 1 simple、2 compound、3 real/effective）。answer 數字（元或%）。題目要寫明期間與複利頻率。 |

---

# 5. `content/types-international.js`（稅務、預算、匯率、國際收支）

| id | level / 參數 | 要求與答案 |
|---|---|---|
| `exchange_rate` | level 1–3 | 匯率換算（`A 幣 = B 幣 × rate`）；level 2 升值/貶值百分比 `(新 − 舊)/舊 ×100`；level 3 交叉匯率或雙向報價。answer 數字（幣值或%）。prompt 要寫明「以每 1 單位外幣兌多少本幣」的方向，避免歧義。 |
| `ppp` | level 1–3 | 購買力平價匯率 = 本國物價/外國物價（同一籃子）；level 2 由 PPP 匯率與名義匯率判斷幣值高估/低估（文字選項或%）；level 3 實質匯率 = 名義匯率 × 外國物價/本國物價。answer 數字或文字 id。 |
| `balance_payments` | level 1–3 | 經常帳 = 貨物出口 − 貨物進口 + 服務淨出口 + 收入淨額 + 轉移淨額。level 1 只計貨物與服務；level 2 加入收入/轉移；level 3 求資本帳或國際收支差額（經常帳 + 資本帳 = 0 的簡化模型，題目寫明）。answer 可負；提供 choices（負數）。 |
| `fiscal_balance` | level 1–3 | 財政盈餘/赤字 = 政府收入 − 政府支出；level 2 基本盈餘 = 盈餘 + 利息支出；level 3 債務/GDP 比率或赤字融資。answer 可負；提供 choices（負數）。 |
| `tax_basic` | level 1–3 | 比例稅：稅款 = 應稅收入 × 稅率；level 2 扣除免稅額後計稅、平均稅率 = 稅款/收入；level 3 間接稅（從量/從價）對價格的影響。answer 數字。prompt 寫明免稅額與稅率。 |
| `tax_progressive` | level 1–3 | 累進稅階（3–4 級，每級稅率遞增）。level 1 計算應繳稅款；level 2 求平均稅率；level 3 求邊際稅率或比較兩個收入的有效稅率。answer 數字（元或%）。稅階要清楚列出，收入要落在較高稅階。 |
| `budget_personal` | level 1–3 | 月入、固定支出、變動支出 → 儲蓄 = 收入 − 支出；level 2 儲蓄率 = 儲蓄/收入 ×100%；level 3 目標儲蓄額需時（月）或預算調整。answer 數字（元、%或月）。 |
| `percentage` | level 1–3 | 折扣價、加價、服務費、百分比變化、反向求原價。level 1 折扣；level 2 加價/服務費；level 3 反向百分比或連續變化。answer 數字（元或%）。prompt 要寫清楚「求最終價格/原價/百分比變化」。 |

---

# 6. `content/types-applied.js`（計量、財務、數據與增長模型）

| id | level / 參數 | 要求與答案 |
|---|---|---|
| `regression` | level 1–3 | 給估計方程 `Ŷ = a + bX`、樣本數、R²。level 1 給 X 求預測 Y；level 2 解釋斜率（X 增加 1 單位，Y 平均變動 b）；level 3 判斷 R² 或顯著性（文字選項，提供 choiceLabels）。answer 數字或文字 id。題目要寫明變數單位。 |
| `npv` | level 1–3 | 初始投資 `C0`、未來現金流 `CF`（1–3 期）、折現率 `r`。level 1 求一期現值；level 2 求 NPV（`Σ CFt/(1+r)^t − C0`）；level 3 判斷是否接受（NPV>0）或求內部報酬率的近似。answer 數字（元）或文字 id。題目要寫明「以百萬元為單位、四捨五入至 2 位小數」。 |
| `gini` | level 1–3 | 洛倫茲曲線資料點（累積人口份額 x、累積收入份額 y，含 (0,0)、(1,1)）。Gini = `1 − Σ (x_i − x_{i−1})(y_i + y_{i−1})`。level 1 三點；level 2 四點；level 3 由 Gini 比較兩地不平等（文字選項）。answer 數字（0–1，2 位小數）。prompt 要列出資料點。 |
| `data_read` | level 1–3 | 用 `visual: {kind:'barchart', values:[...], labels:['A','B',...]}` 顯示 4–5 個數據；問百分比變化、佔比、平均或倍數。level 1 佔比；level 2 百分比變化；level 3 兩年比較或實質值（需另給物價指數）。answer 數字（%或值）。題幹必須提及圖表。 |
| `growth_model` | level 1–3 | level 1–2 Harrod-Domar：增長率 `g = s/v`（儲蓄率 ÷ 資本產出比率），求 g 或所需 s；level 3 增長會計：`g = αgK + (1−α)gL + TFP`，求 TFP 或 g。answer 數字（%）。prompt 要寫明模型與所有變數。 |

---

## 提交前自檢清單

- [ ] 只修改自己負責的檔案（不要改 app.js / econ-core.js / 其他 content 檔）。
- [ ] 每個 assigned id 都已 `registerType`，沒有多餘 id、沒有重複註冊。
- [ ] `node tests/dev-gen-check.js --only=<每個 id>` 全部通過（每種 level 至少 25 次抽樣）。
- [ ] 抽查中英文題幹、解題步驟沒有錯字、單位一致、答案與步驟相符。
- [ ] 沒有 `Math.random`、`Date.now`、`eval`、網絡請求或 `document` 操作。
- [ ] 所有文字使用 UTF-8、香港繁體中文；英文語法正確。
