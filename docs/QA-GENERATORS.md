# 經濟學園（Econ Garden）題目生成器答案正確性獨立審計

> 檔案：`docs/QA-GENERATORS.md`
> 審計日期：2026-11-22（20:15–20:30，Asia/Hong_Kong）
> 審計角色：獨立 QA（經濟學助教 + 測試工程師）
> 稽核基準：`content/types-*.js` 固定快照（見 §8.1；20:27 再比對 live 檔案，六個 types 檔與八個 stage 檔 SHA256 全部一致）
> 稽核工具：`tests/qa/`（只讀載入 + 獨立重算，**沒有修改任何 content/types-*.js、app.js 或 econ-core.js**）

---

## 0. 結論摘要

| 項目 | 結果 |
|---|---|
| 已註冊生成器題型 | **49 個**（另有 1 個 `bank` 題庫型別，不是生成器） |
| 技能 / 階段 | 77 個技能、8 個階段 |
| 抽樣重算樣本 | **7,920 題**（每個「題型 × 技能 × 難度」30 題；5 個挑戰區題型另直接補測 level 1 共 150 題） |
| 答案與獨立重算不符 | **0**（`answer-mismatch = 0`） |
| 生成器拋錯 / 答案不在選項 / 答案超過 2 位小數 / 選項重複 | **0 / 0 / 0 / 0** |
| 題型狀態 | **PASS 35 個、PASS with minor wording 14 個、FAIL 0 個** |

**重點：49 個題型的 `answer` 欄位全部正確**（經濟學方向、正負號、單位、2 位小數四捨五入、稅負歸宿、乘數方向、彈性分類、貿易得益等都通過獨立重算）。但發現 **14 個題型有必須修正的呈現／文字問題**：主要是 **JavaScript 浮點數未格式化直接寫入題幹**（學生會看到 `12100.000000000002` 這種數字），以及一處 **解題步驟自相矛盾**（「0.5 > 1」）、英文單位錯 100 倍、和若干英文文法／單位語序問題。

> 備註：委託說明寫「51 個題目生成器」，實測 `Object.keys(EconData.types).length = 49`（`grep registerType` 共 43 個直接註冊 + `types-welfare.js` 用 `var register = ED.registerType` 再註冊 6 個 = 49）。本報告以實際 49 個為準。

---

## 1. 稽核方法

1. 以 Node + `vm` 依 `index.html` 順序載入：`econ-boot.js` → `content/types-*.js`（6 檔）→ `content/stage-*.js`（8 檔）→ `econ-core.js`。為避免其他代理同時改檔造成不一致，先把上述檔案複製到 `tests/qa/snapshot/` 並全程使用快照。
2. 對每個題型，**走訪所有引用它的技能 × 所有難度步驟**（`Core.generateProblem(skill, { type: t, difficultyStep, seed })`，明確指定 `type`，不依賴 `typeIndex`），每個（技能, 難度）組合抽 30 題；對只被「挑戰區／大學區」技能引用、level 1 分支在 app 內不可達的 5 個題型（`regression`、`npv`、`gini`、`data_read`、`growth_model`），額外以 `EconData.types[t](rng, {level:1})` 直接補測 level 1 共 30 題。
3. 每一題用 **獨立路徑重算**：由 `p.math` 的原始參數重新解方程／逐級計稅／算面積／算匯率／判斷優勢策略等（**不是**複製生成器的算式），再與 `p.answer` 比對（容差 0.011，對應 2 位小數）。
4. 另外做通用的文字/顯示檢查：超長小數、`NaN/undefined/Infinity`、答案是否出現在解題步驟、中英題幹數字多重集、答案是否在選項、答案小數位、選項重複／負數合理性。
5. 對文字答案題型（`demand_shift`、`supply_shift`、`game_theory`、`comparative_advantage`、`gini`、`npv`、`ppp`、`ppc`、`regression`、`price_discrimination`）另外核對「收益矩陣／事件方向 ↔ 答案 ↔ 選項標籤」的邏輯一致性。

---

## 2. 逐題型狀態表（49 個）

狀態定義：
- **PASS**：答案與題幹／解題一致，無實質問題。
- **PASS with minor wording**：答案正確，但有文字、單位、顯示或教學說明問題（詳見 §3；`＊` 標示）。
- **FAIL**：答案錯誤（本輪 **0 個**）。

### 2.1 `content/types-micro.js`（10 個）

| 題型 | 難度 | 樣本 | 狀態 | 主要發現 |
|---|---|---|---|---|
| `oppcost` | 1–3 | 180 | PASS with minor wording ＊ | 英文解題步驟 "gives up play basketball / buy a pair of sneakers" 文法錯（`types-micro.js:121,160`） |
| `ppc` | 1–3 | 90 | PASS | 機會成本、剩餘可產量、效率點判斷全部正確 |
| `demand_shift` | 1–3 | 90 | PASS | 14 個事件 ↔ 方向表逐一核對正確（收入、替代品、預期、劣等物品等） |
| `supply_shift` | 1–3 | 90 | PASS | 11 個事件 ↔ 方向表正確（成本、技術、補貼、稅、預期、天氣、工資） |
| `equilibrium` | 1–3 | 180 | PASS | 均衡價／量、短缺盈餘、供需平移後新均衡全部正確 |
| `ped` | 1–3 | 180 | PASS with minor wording ＊ | **level 1 約 1/3 樣本解題步驟寫「因為 0.5 > 1」「因為 1 > 1」自相矛盾**（`types-micro.js:780,786`）；level 1 價格 `p1=50、變動 +10%` 時題幹出現 `55.00000000000001`（`types-micro.js:763`） |
| `ped_tr` | 1–3 | 90 | PASS with minor wording ＊ | level 1 含 `PED = 1` 時，精確式與 DSE「單位彈性→總收入不變」慣例衝突（見 §3.4）；英文解題 "total revenue fall/rise by" 文法錯（`types-micro.js:913`） |
| `yed` | 1–3 | 90 | PASS with minor wording ＊ | level 2 收入／需求量出現浮點亂碼（`types-micro.js:1007,1009`；約 30% 樣本）；英文題幹 "income fall / demanded rise" 文法錯（`types-micro.js:981`） |
| `xed` | 1–3 | 90 | PASS with minor wording ＊ | level 2 價格／需求量出現浮點亂碼（`types-micro.js:1129,1131`；約 18% 樣本）；英文題幹 "price … fall / demanded rise" 文法錯（`types-micro.js:1101`） |
| `pes` | 1–3 | 90 | PASS with minor wording ＊ | level 1 價格 `p1=50、+10%` 時出現 `55.00000000000001`（`types-micro.js:1217`） |

### 2.2 `content/types-micro2.js`（9 個）

| 題型 | 難度 | 樣本 | 狀態 | 主要發現 |
|---|---|---|---|---|
| `cost` | 1–3 | 180 | PASS | TC/AC、MC = TC(n)−TC(n−1)（`a+b(2n−1)`）、MR=MC 求 Q/P 全部正確 |
| `profit` | 1–3 | 270 | PASS | 會計利潤、經濟利潤（含放棄薪金／租金／資本正常回報）正確，負數選項合理 |
| `monopoly` | 1–3 | 90 | PASS | Q_m=(a−c)/2b、P_m、利潤、DWL = ½(Pm−c)(Qc−Qm) 正確 |
| `price_discrimination` | 1–3 | 90 | PASS | 兩市場 MR=MC、價格比較（高價＝低彈性市場）正確 |
| `hhi` | 1–3 | 180 | PASS | 3/4 廠商平方和、合併後 HHI 與「增加多少」兩種問法都正確 |
| `game_theory` | 1–3 | 270 | PASS | 優勢策略、納什均衡、囚徒困境結構、重複博弈答案與收益矩陣逐一核對一致 |
| `labour` | 1–3 | 180 | PASS | 均衡工資／就業、最低工資超額供應、供需平移後新均衡正確 |
| `comparative_advantage` | 1–3 | 360 | PASS | OC、比較優勢（保證無平手）、專業化＋貿易得益（含交換比率與自給自足對照）正確 |
| `tariff` | 1–3 | 270 | PASS | 小國模型關稅後價格／進口量、關稅收入、DWL = ½·t·(進口減少)（兩三角和）正確 |

### 2.3 `content/types-welfare.js`（6 個）

| 題型 | 難度 | 樣本 | 狀態 | 主要發現 |
|---|---|---|---|---|
| `tax_incidence` | 1–3 | 270 | PASS | 解 Qd(Pc)=Qs(Pc−t)、稅收、消費者／生產者負擔、DWL 全部正確（且負擔和 = t） |
| `price_control` | 1–3 | 90 | PASS | 上限短缺／下限過剩、實際交易量、DWL（三角）正確；binding 條件正確 |
| `surplus` | 1–3 | 180 | PASS | CS/PS/TS、課稅 DWL 正確（供應穿過原點時 CS/PS 也對） |
| `externality` | 1–3 | 180 | PASS | 社會最適產量、皮古稅 = MEC、DWL = ½(Qm−Q*)·MEC 正確 |
| `mv` | 1–3 | 90 | PASS | MU 表、消費者均衡求 P、求 Q、預算約束下聯立求 Qx/Qy 正確 |
| `budget_line` | 1–3 | 90 | PASS | 截距、斜率和機會成本（Px/Py）、價格／收入變動後新最大購買量正確 |

### 2.4 `content/types-macro.js`（11 個）

| 題型 | 難度 | 樣本 | 狀態 | 主要發現 |
|---|---|---|---|---|
| `gdp_exp` | 1–3 | 180 | PASS | C+I+G+X−M、人均（十億/百萬→×1000）、存貨變動計入而轉移支付排除，全部正確 |
| `gdp_real` | 1–3 | 90 | PASS with minor wording ＊ | level 2 今年實質 GDP 出現浮點亂碼（`types-macro.js:214`；約 5%） |
| `growth` | 1–3 | 390 | PASS with minor wording ＊ | level 1 期末 GDP 浮點亂碼（`types-macro.js:272`；約 3%）；CAGR 解題的 5 位中間值是合理安排（可選縮短） |
| `unemployment` | 1–3 | 180 | PASS with minor wording ＊ | **英文題幹／解題把「萬人」寫成 "million"，數量級錯 100 倍**（`types-macro.js:396,408,425,437,456,469,487,500` 等） |
| `cpi` | 1–3 | 90 | PASS with minor wording ＊ | CPI 籃子題的解題用語「基期籃子成本」其實是「當期籃子按基期價格的成本」（`types-macro.js:535,539`），宜說明是 Paasche 型／以當期數量為籃子 |
| `inflation` | 1–3 | 90 | PASS with minor wording ＊ | level 1 名義收入浮點亂碼（`types-macro.js:615`；約 7%） |
| `multiplier` | 1–3 | 270 | PASS | 支出乘數、ΔY = kΔG、稅收乘數 −MPC/(1−MPC)、開放乘數 1/(mps+mpm) 正確 |
| `income_eq` | 1–3 | 270 | PASS with minor wording ＊ | **level 1／2 的 G 出現浮點亂碼（如 349.9999999999998），影響率 28%–45%（`types-macro.js:820-824,859-862`）** |
| `money_multiplier` | 1–3 | 180 | PASS | 1/r、存款創造、現金漏出 m=(1+c)/(r+c) 正確 |
| `money_demand` | 1–3 | 180 | PASS | MV=PY 求 M、V，及 %ΔM = π+%ΔY−%ΔV 正確 |
| `interest` | 1–3 | 360 | PASS with minor wording ＊ | 單利／複利／72 法則／實質利率／EAR 全部正確；解題顯示 5–6 位中間值（可接受，可選縮短） |

### 2.5 `content/types-international.js`（8 個）

| 題型 | 難度 | 樣本 | 狀態 | 主要發現 |
|---|---|---|---|---|
| `exchange_rate` | 1–3 | 180 | PASS | 兌換方向、升值／貶值百分比（絕對值）、交叉匯率方向全部正確 |
| `ppp` | 1–3 | 180 | PASS | PPP 匯率、高估／低估判斷（名義 > PPP → 外幣高估）、實質匯率 R=E·Pf/Pd 正確 |
| `balance_payments` | 1–3 | 180 | PASS | 貨物及服務淨出口、經常帳（含收入／轉移）、資本帳 = −CA 正確 |
| `fiscal_balance` | 1–3 | 180 | PASS | 盈餘／赤字、基本盈餘（= 收入 − 非利息支出）、債務／GDP 正確（自動檢查的 "100 million" 差異是英文單位寫法，非錯誤） |
| `tax_basic` | 1–3 | 90 | PASS | 比例稅、免稅額後計稅、平均稅率、從量／從價稅加價正確 |
| `tax_progressive` | 1–3 | 90 | PASS | 逐級計稅（0–50k 2%、…、>200k 17%）、平均稅率、有效稅率差全部正確 |
| `budget_personal` | 1–3 | 90 | PASS | 儲蓄、儲蓄率、目標月數（不足一月作一月）正確 |
| `percentage` | 1–3 | 90 | PASS | 折扣、服務費、加價、反向求原價、連續加減價正確 |

### 2.6 `content/types-applied.js`（5 個）

| 題型 | 難度 | 樣本 | 狀態 | 主要發現 |
|---|---|---|---|---|
| `regression` | 2–3（level 1 直接補測） | 120 | PASS | 預測、斜率解釋、R² 解釋、p 值顯著性判斷與選項標籤正確 |
| `npv` | 2–3（level 1 直接補測） | 120 | PASS | 一期 PV、兩期 NPV、NPV>0 → accept 正確 |
| `gini` | 2–3（level 1 直接補測） | 120 | PASS | 梯形法 Gini、兩地比較（Gini 較高＝較不平等）正確 |
| `data_read` | 2–3（level 1 直接補測） | 120 | PASS with minor wording ＊ | 佔比／百分比變化／實質值計算正確；**英文題幹單位語序錯誤**：「7, 2, 5, 3 10,000 books」「6 HKD million」（`types-applied.js:668,674,680,686,707,749,789`） |
| `growth_model` | 2–3（level 1 直接補測） | 120 | PASS | Harrod–Domar g=s/v、s=g·v、增長會計 g=αgK+(1−α)gL+TFP 正確 |

---

## 3. 重大問題（答案正確，但呈現/說明有錯誤，必須修正）

### 3.1 [P0] JavaScript 浮點數未格式化，直接寫進題幹與解題步驟

生成器用 `x * (1 + pct / 100)` 之類浮點運算，再原樣串接字串，某些組合會產生 `xxx.000000000001`、`xxx.9999999999998`。學生會看到「實質 GDP 為 12100.000000000002 百萬元」這類不可能的數據。**答案本身仍正確**（例如增長率仍是 10%），但題幹給定值顯示錯誤，且解題步驟重複該亂碼。

| # | 題型 | 級別 | seed（重現用） | 題幹摘要 | 生成器答案 | 正確答案／正確顯示 | 問題位置 |
|---|---|---|---|---|---|---|---|
| 1 | `income_eq` | L1 | 1000（`s6.income_determination`, step 0） | C=300+0.8Y、I=550、**G=349.9999999999998** | 6000 | G 應顯示 **350**；Y=6000 正確 | `content/types-macro.js:820-824`（`slack`/`G` 未取整） |
| 2 | `income_eq` | L2 | 1000（`col.macro_models`／`chal.macro`, step 0） | C=300+0.8(Y−T)、T=500、I=500、**G=799.9999999999998** | 6000 | G 應顯示 **800** | `content/types-macro.js:859-862` |
| 3 | `yed` | L2 | 1148 | 收入 1500 → **1650.0000000000002**；Q 400→368 | −0.8 | 收入應顯示 **1650** | `content/types-micro.js:1007` |
| 4 | `yed` | L2 | 1259 | 收入 1960→2156；Q 200 → **224.00000000000003** | 1.2 | Q 應顯示 **224** | `content/types-micro.js:1009` |
| 5 | `xed` | L2 | 1222 | Y 價 40→32；X 量 200 → **220.00000000000003** | −0.5 | 量應顯示 **220** | `content/types-micro.js:1131` |
| 6 | `xed` | L2 | 1259 | Y 價 100 → **110.00000000000001** | 1 | 價應顯示 **110** | `content/types-micro.js:1129` |
| 7 | `growth` | L1 | 1111 | 實質 GDP 10300 → **11330.000000000002** | 10 | 應顯示 **11330** | `content/types-macro.js:272` |
| 8 | `gdp_real` | L2 | 1111 | 實質 GDP 10300 → **11330.000000000002** | 10 | 應顯示 **11330** | `content/types-macro.js:214` |
| 9 | `inflation` | L1 | 1370 | 名義月入 **13200.000000000002**；通脹 10% | 12000 | 應顯示 **13200** | `content/types-macro.js:615` |
| 10 | `ped` | L1 | 1703 | 價格 50 → **55.00000000000001**；Q 220→209 | 0.5 | 價格應顯示 **55** | `content/types-micro.js:763`（只有 p1=50、dPct=+10 組合觸發） |
| 11 | `pes` | L1 | 1703 | 價格 50 → **55.00000000000001**；Q 220→231 | 0.5 | 價格應顯示 **55** | `content/types-micro.js:1217` |

影響率（同一分支抽 60 題計算）：`income_eq` L1 約 28%、L2 約 28–45%；`yed` L2 約 30%；`xed` L2 約 18%；`inflation` L1 約 7%；`gdp_real` L2 約 5%；`growth` L1 約 3%；`ped`／`pes` L1 約 4%（僅 p1=50、+10% 組合，p1 有 6 個取值、dPct 有 4 個取值）。

**修正方向（一行）**：把 `x * (1 + pct/100)` 改成整數友好的 `x * (100 + pct) / 100`，或顯示前 `U.round(值, 2)`／`U.fmt(值, 0)`；`income_eq` 的 `slack`／`G` 用 `Math.round` 取整。精確行號見 §7。

### 3.2 [P0] `ped` level 1 解題步驟硬編碼「> 1」，與答案自相矛盾

- 位置：`content/types-micro.js:780`（中文）、`:786`（英文）。
- 重現：seed 1370，答案 PED = 0.5。
- 解題顯示：`PED = |5% ÷ -10%| = 0.5；因為 0.5 > 1，需求缺乏彈性（inelastic）。`
- 正確應為：`因為 0.5 < 1，需求缺乏彈性`（PED = 1 時應寫「= 1，單位彈性」，而不是「1 > 1」）。
- 影響：答案是對的，但解釋自相矛盾；level 1 的 `ped` 有 `0.5`、`1` 兩個值會觸發，約佔 level 1 樣本 **1/3**。

### 3.3 [P0] `unemployment` 英文版把「萬人」翻成 "million"，數量級錯 100 倍

- 中文：「就業人口為 188 萬人，失業人口為 12 萬人」（= 1,880,000 / 120,000）。
- 英文（同題）：「employed population is 188 million and the unemployed population is 12 million」→ 188,000,000 / 12,000,000，**大 100 倍**。
- 位置：`content/types-macro.js:396`（L1 題幹）、`:408`（L1 解題）、`:425`（L2 題幹）、`:437`、`:456`（L3 題幹）、`:469-471`、`:487`、`:500-502` 等所有 `' million'` 字串。
- 修法：把 "million" 改成 "ten thousand"（並保留數字 188），或把數字換算成 `e/100` 再配 "million"（188 萬人 → 1.88 million）。
- 注意：失業率／參與率的答案本身不受影響（比率不變），但英文使用者看到的絕對人數錯誤。

### 3.4 [P0/P1] `ped_tr` level 1 的 `PED = 1` 造成多解（精確式 vs 教科書慣例）

- 位置：`content/types-micro.js:876`（level 1 的 `ped` 抽樣池含 `1`）。
- 重現：seed 1148，PED = 1，價格上升 10% → 生成器答案 **−1%**（精確式）；但中學／DSE 教科書慣例「單位彈性 → 總收入不變」會答 **0%**。
- 另一例：PED = 1、價格下跌 20% → 生成器答案 −4%。
- 問題：題目只寫「求總收入的變動百分比」，沒有說明要用精確乘法；提示雖給了精確公式，但學生若用「PED > 1 / < 1」的方向法則，PED = 1 時會答「不變」。屬於**歧義／多解**。
- 建議：在 level 1 的抽樣池移除 `1`（如 `[0.5, 2, 2.5]`），或在題幹加「用精確乘法計算，不要用近似」；level 3 的方向題已避開 1，可保留。

---

## 4. 教學文字、文法與術語問題（Minor，但建議修正）

### 4.1 英文動詞形式錯誤（`changeEn` 回傳原形）

- 位置：`content/types-micro.js:32` `changeEn(v)` 回傳 `'rise'`／`'fall'`，但被用在主語後面：
  - `types-micro.js:981`（`yed`）：「After a household's income **fall** by 10%, the quantity of good X demanded **rise** by 25%.」→ 應為 **falls / rises**。
  - `types-micro.js:1101`（`xed`）：「After the price of good Y **fall** by 10%, the quantity of good X demanded **rise** by 30%.」→ 應為 **falls / rises**。
  - `types-micro.js:913`（`ped_tr`）：「total revenue **fall** by 5.5%」→ 應為 **falls**（上升時 **rises**）。
- 修法：新增 `changeEnVerb(v) { return v > 0 ? 'rises' : 'falls'; }`，或直接把 `changeEn` 改成回傳第三人稱形式；句首 "After …" 子句的主語是單數名詞，需用 rises/falls。

### 4.2 `oppcost` 英文解題文法錯誤

- 位置：`content/types-micro.js:121,160`。
- 例：「He chooses to go camping and gives up **play** basketball…」「…gives up **buy** a pair of sneakers…」→ 應為 **playing / buying**（`gives up + V-ing`）。

### 4.3 `data_read` 英文單位語序與句子結構

- 位置：`content/types-applied.js:668,674,680,686`（單位字串）、`:707,749,789`（英文題幹）。
- 例：「The bar chart below shows the **books borrowed of libraries** … which are **7, 2, 5, 3 10,000 books** from left to right.」→ 建議 “The bar chart shows the number of books borrowed from libraries … The values are 7, 2, 5 and 3 (in units of 10,000 books).”
- 例：「Branch B had nominal sales revenue of **6 HKD million**」→ 應為 “**HKD 6 million**”；「which are 7, 6, 2, 3 HKD million」→ “HKD 7 million, HKD 6 million, …”。
- 中文版「由左至右依次為 7、2、5、3 萬冊」正確，可保留。

### 4.4 `cpi` 籃子題術語

- 位置：`content/types-macro.js:535`（中文「基期籃子成本」）、`:539`（英文 "Base-period basket cost"）。
- 事實：生成器用「**當期消費量** × 基期價格」計算 `baseCost`，這其實是「當期籃子按基期價格計算的成本」（Paasche 型物價指數），不是標準 Laspeyres 的「基期籃子成本」。
- 建議：改成「當期籃子按基期價格計算的成本」／"cost of the current basket at base-period prices"，或在題幹明說「以當期消費量為固定籃子」。

### 4.5 其他可接受但可潤飾

- `interest`、`growth` 的解題步驟顯示 5–6 位中間值（如複利因子 `1.157625`、CAGR 中間值 `1.15762`）——作為「展示計算」可接受；若想更清爽可縮到 4 位。
- `fiscal_balance` 英文 "in units of HKD 100 million" 對應中文「以億港元為單位」是正確的，只是數字表示方式不同（自動檢查會誤報，非缺陷）。
- 5 個應用題型（`regression`、`npv`、`gini`、`data_read`、`growth_model`）在 app 內只有 level 2–3：它們只被挑戰區／大學區技能引用，而那些技能的 `levels` 是 `[{level:2},{level:3},{level:3}]`，所以 level 1 分支不會出現在學生面前（本報告已直接呼叫生成器補測 level 1，答案全部正確）。若希望 level 1 也給學生做，需在 stage 檔加 level 1 的層級或另設技能——這是課程覆蓋設計問題，不是生成器錯誤。

---

## 5. 必須修正清單（P0 / P1）

### P0（學生可見的錯誤，建議立即修）
1. `income_eq` L1／L2：G 浮點亂碼（28%–45%），`types-macro.js:820-824,859-862`。
2. `yed` L2、`xed` L2：收入／需求量／價格浮點亂碼（18%–30%），`types-micro.js:1007,1009,1129,1131`。
3. `growth` L1、`gdp_real` L2、`inflation` L1：GDP／名義收入浮點亂碼（3%–7%），`types-macro.js:214,272,615`。
4. `ped`／`pes` L1：價格 55.00000000000001（p1=50、+10% 組合），`types-micro.js:763,1217`。
5. `ped` L1 解題步驟「0.5 > 1」「1 > 1」矛盾（約 1/3 樣本），`types-micro.js:780,786`。
6. `unemployment` 英文 "million" 應為「萬人」對應單位（數量級錯 100 倍），`types-macro.js:396,408,425,437,456,469,487,500` 等。
7. `ped_tr` L1 `PED = 1` 的多解問題（決定：移除 1 或加「用精確乘法」說明），`types-micro.js:876`。

### P1（雙語／文法，影響可讀性與專業度）
8. `changeEn` 文法：`types-micro.js:32`（影響 `:913,981,1101`）。
9. `oppcost` 英文 "gives up play/buy"：`types-micro.js:121,160`。
10. `data_read` 英文單位語序與 "HKD 6 million"：`types-applied.js:668,674,680,686,707,749,789`。

---

## 6. 可選潤飾清單（P2）

1. `cpi` 籃子題用語改成「當期籃子按基期價格計算的成本」或註明 Paasche 型（`types-macro.js:535,539`）。
2. `interest`／`growth` 解題中間值縮短至 2–4 位小數（`types-macro.js` interest 段落、`growth` CAGR 段落）——純美觀。
3. `fiscal_balance` 英文 "in units of HKD 100 million" 可改 "in HKD 100 million"（可選；兩種都通）。
4. 5 個應用題型 level 1 的可達性：若課程希望學生見到 level 1，調整 `content/stage-challenge.js`／`stage-college.js` 的 `levels`；否則可不必處理。
5. `data_read` 題幹說「下圖」——若 app.js 把 `visual` 顯示在題幹下方則正確；若在上方，建議改成「上圖／附圖」。可實際開 UI 確認（本次未改 app.js）。
6. `ped` level 1 的 `elasticWord` 說明可改為三段式（>1 / <1 / =1），降低再次寫錯硬編碼的機會。

---

## 7. 附錄 A：精確修正建議（行號）

> 以下只作建議，**本次審計未修改任何 `content/types-*.js` 或 `app.js`**。

### A.1 浮點數格式化（P0）
| 檔案:行 | 現況 | 建議 |
|---|---|---|
| `content/types-micro.js:763` | `var p2 = p1 * (1 + dPct / 100);` | `var p2 = p1 * (100 + dPct) / 100;`（p1 為 10 的倍數、dPct 為 ±10/20，結果為整數） |
| `content/types-micro.js:1217` | `var p2 = p1 * (1 + dPct / 100);` | `var p2 = p1 * (100 + dPct) / 100;` |
| `content/types-micro.js:1129` | `var py2 = py1 * (1 + dPy2 / 100);` | `var py2 = py1 * (100 + dPy2) / 100;` |
| `content/types-micro.js:1131` | `var qx2 = qx1 * (1 + dQx2 / 100);` | `var qx2 = qx1 * (100 + dQx2) / 100;` |
| `content/types-micro.js:1007` | `var income2 = income1 * (1 + dIncome2 / 100);` | `var income2 = income1 * (100 + dIncome2) / 100;` |
| `content/types-micro.js:1009` | `var quantity2 = quantity1 * (1 + dQuantity2 / 100);` | `var quantity2 = quantity1 * (100 + dQuantity2) / 100;` |
| `content/types-macro.js:214` | `var y2 = y1 * (1 + g / 100);` | `var y2 = y1 * (100 + g) / 100;` |
| `content/types-macro.js:272` | `var y2 = y1 * (1 + g / 100);` | `var y2 = y1 * (100 + g) / 100;` |
| `content/types-macro.js:615` | `var nominal = real * (1 + infl / 100);` | `var nominal = real * (100 + infl) / 100;` |
| `content/types-macro.js:820-825` | `slack`／`I`／`G` 浮點運算 | `var slack = Math.round(Yt * (1 - b) - a);`（或用整數運算）；`G` 再加 `Math.round` |
| `content/types-macro.js:859-863` | `need`／`I2`／`G2` 同上 | `var need = Math.round(Yt2 * (1 - b2) - a2 + b2 * T);`，`G2` 取整 |

### A.2 `ped` 解題文字（P0 教學錯誤）
`content/types-micro.js:780`（中文）、`:786`（英文）：
```js
// 現況
'PED = |' + dQPct + '% ÷ ' + dPct + '%| = ' + answer1 + '；因為 ' + answer1 + ' > 1，' + elasticWordZh(answer1) + '。'
// 建議
'PED = |' + dQPct + '% ÷ ' + dPct + '%| = ' + answer1 + '；' +
(answer1 > 1 ? '因為 ' + answer1 + ' > 1，' : answer1 < 1 ? '因為 ' + answer1 + ' < 1，' : '因為 ' + answer1 + ' = 1，') +
elasticWordZh(answer1) + '。'
```
英文同理（`> 1` / `< 1` / `= 1`）。

### A.3 `changeEn` 英文文法（P1）
`content/types-micro.js:32`：改成回傳第三人稱 `'rises'`／`'falls'`（並同步檢查 `:913,981,1101` 的句式）；或在各使用處用 `changeEnVerb(...)`。注意 `:913` 的 "total revenue rises/falls" 與 `:981,1101` 的 "income rises/falls"、"demanded rises/falls" 都需第三人稱。

### A.4 `oppcost` 英文動名詞（P1）
`content/types-micro.js:121`：`gives up ' + alt1.en` → `gives up ' + alt1.en + 'ing'` 不可靠（activity 字串如 "go camping"）；建議把 `alt1.en` 改成動名詞形式（例如資料表存 `'going camping'`）或在句尾改成 `gives up the option of ' + alt1.en`。`:160` 同理。

### A.5 `unemployment` 英文單位（P0）
`content/types-macro.js` 的 unemployment 段落：把所有 `' million'` 改為 `' ten thousand'`（數字不變，188 萬人→"188 ten thousand" 可讀性略差，可改 "1.88 million" 並把數字除以 100）。最簡單：`... is ' + e + ' ten thousand ...`，並在解題同步。
受影響行（題幹／解題）：`396, 399, 408, 425, 429, 437, 456, 460, 469, 470, 471, 487, 491, 500, 501, 502`。

### A.6 `data_read` 英文句子（P1）
`content/types-applied.js:667-687`（`enUnit`／`enGroup` 片段）與 `:707,749,789`（題幹）：
- `enUnit: '10,000 books'` → `'books (in units of 10,000)'` 或直接把 values 換成實際數量再顯示；
- 句子改成：`The bar chart below shows the number of books borrowed from libraries in a region from 2020 to 2023. The values, from left to right, are 7, 2, 5 and 3 (in units of 10,000 books).`
- 金額單位改 `HKD 6 million`（不是 `6 HKD million`）。

### A.7 `ped_tr` 多解（P0/P1）
`content/types-micro.js:876`：level 1 抽樣池 `[0.5, 1, 2, 2.5]` → 建議 `[0.5, 2, 2.5]`；若保留 1，請在題幹加「用精確乘法計算（不要用『PED 大於／小於 1』的方向法則）」。level 3 的方向題（`:922`）已排除 1，無問題。

---

## 8. 附錄 B：稽核範圍、工具與限制

### 8.1 基準快照與 SHA256（2026-11-22 20:19 建立；20:27 比對 live 一致）

| 檔案 | SHA256 |
|---|---|
| `content/types-micro.js` | `8D880FB58292E9FA29F4E897F374E4BBF1BAB9402A4C9C79FC584EDD044BB36F` |
| `content/types-micro2.js` | `A7A04CDC803A70362939F9A4491F48C97DC1DD7C4F0FC194B7676EED6D61EADE` |
| `content/types-welfare.js` | `123EC0710BEB3BDC9F0AA03D01886D293492ED91D7213A3ADC036124B3FF7948` |
| `content/types-macro.js` | `413F1C3438468FDA6AECE3AB9040D18CF3959EDB62823A81989F8E8F48636A01` |
| `content/types-international.js` | `C5DD4FD6D2FA0C4E776F6466BFDB662625899B2DA9C70655990BBFFA9F71729B` |
| `content/types-applied.js` | `7078C4B6EFED2E6867EF1848239A941CA3304CA9EDCFE0729A8696E870F9A12C` |

### 8.2 稽核程式（全部在 `tests/qa/`，唯讀內容檔）
- `harness.js`：以 `vm` 載入快照，提供 `pairs(type)`（列出所有引用該題型的技能 × 難度步驟）、`generate`、`typeMap`。
- `runner.js`：抽樣框架、通用文字檢查、答案比對、結果 JSON。
- `chk-micro.js`、`chk-micro2.js`、`chk-welfare.js`、`chk-macro.js`、`chk-intl.js`、`chk-applied.js`：49 個題型的獨立重算函數。
- `edge.js`（邊界／長小數／選項掃描）、`lint.js`（文字排版）、`freq.js`（浮點亂碼頻率）、`examples.js`（報告用重現例）、`modes.js`／`scan.js`／`show.js`／`dumpp.js`（抽樣檢視）。
- 重現：`node tests/qa/chk-*.js`，結果寫入 `tests/qa/_results-*.json`；`node tests/qa/edge.js` 掃顯示問題。

### 8.3 覆蓋率與限制
- 每個「題型 × 技能 × 難度」抽 30 題；合計 7,920 題（含 5 個應用題型的 level 1 直接補測 150 題）。
- 文字答案題型沒有唯一數值可重算，改以「事件方向表／收益矩陣／標籤語義」核對；`game_theory` 的優勢策略、納什均衡、囚徒困境結構已用收益矩陣重新判定。
- 未審計：`bank` 題庫題（非生成器）、`app.js` 的 UI 呈現、`lessons-*.js` 的課堂文字（稽核期間其他代理仍在寫入課堂檔）。
- 稽核期間 `content/types-*.js` 與 `content/stage-*.js` 與快照一致；唯一變動的是 `content/lessons-*.js`（與本報告無關）。

### 8.4 逐題型樣本數
見 §2 各表；`regression`／`npv`／`gini`／`data_read`／`growth_model` 各 120 題（含 level 1 直接補測 30 題），其餘題型 90–390 題。

---

## 9. 最終結論

- **答案正確性：通過。** 49 個生成器題型的 answer 在 7,920 題抽樣中無一錯誤，經濟學方向與數學計算（含稅負歸宿、乘數、彈性、貿易得益、無謂損失、匯率、增長率）都與獨立重算一致。
- **可信度風險不在「答案」而在「呈現與文字」：** 主要有 11 處浮點亂碼、1 處解題步驟自相矛盾、1 處英文單位數量級錯 100 倍、以及若干英文文法／單位語序問題。這些會令學生看到不合理的數字或矛盾的解釋，建議按 §5 的 P0/P1 清單修正。
- 修正完成後，建議再跑一次 `node tests/dev-gen-check.js`（契約）及本報告的 `node tests/qa/chk-*.js`（答案正確性）作回歸。

---

# Follow-up verification（修正後回歸稽核）

> 稽核時間：2026-11-22 20:33–20:37（Asia/Hong_Kong）
> 觸發：各生成器作者已按本報告 §5 修正 P0/P1。
> 方式：`QA_LIVE=1`（改讀工作區最新 `content/types-*.js`，不讀舊快照）重跑 **六個獨立重算 checker（7,920 題）**，另加 25 項定點回歸、全題型題幹長小數掃描、49 個題型的英文欄位夾中文掃描，以及原本的契約檢查 `node tests/dev-gen-check.js`。
> 基準：本次稽核時 live 檔案與 `tests/qa/snapshot-followup/` 快照一致（20:35 再比對，全部 SAME）。

## F.1 結論（一句）

**先前所有 P0/P1 問題已確認修復；本輪重跑沒有發現任何新的答案錯誤。答案層 FAIL = 0；49 個題型全部 PASS。** 剩下的只有「刻意保留的計算中間值」與自動檢查的已知誤報（見 F.4），不需要再修。

| 項目 | 修正前 | 修正後（本輪） |
|---|---|---|
| 題型答案與獨立重算不符 | 0 | **0** |
| 生成器拋錯／答案不在選項 | 0 / 0 | **0 / 0** |
| 題幹浮點亂碼（>3 位小數） | 11 類位置（見 §3.1） | **0 題**（全題型 × 30 樣本掃描） |
| 題型狀態 | PASS 35 / PASS* 14 / FAIL 0 | **PASS 49 / PASS with minor wording 0 / FAIL 0** |
| 英文欄位夾中文 | gini 等（作者回報） | **0 個題型**（49 型全掃描） |
| 契約檢查 `tests/dev-gen-check.js` | 通過（6,475 題） | **通過（6,475 題）** |
| 重跑樣本 | 7,920 | **7,920（相同抽樣設計）** |

## F.2 新基準（本次修正後的 SHA256）

| 檔案 | SHA256 | 與修正前 |
|---|---|---|
| `content/types-micro.js` | `9BBE7321455087135B972A5248648AF696048BF4CF4B7712C98F7F6DD6C20151` | CHANGED |
| `content/types-micro2.js` | `A7A04CDC803A70362939F9A4491F48C97DC1DD7C4F0FC194B7676EED6D61EADE` | SAME |
| `content/types-welfare.js` | `123EC0710BEB3BDC9F0AA03D01886D293492ED91D7213A3ADC036124B3FF7948` | SAME |
| `content/types-macro.js` | `AC1EA1B4661FC1EC25C1DA7B9D79681DAAD9D9A45D600548100A8550D2720D24` | CHANGED |
| `content/types-international.js` | `C5DD4FD6D2FA0C4E776F6466BFDB662625899B2DA9C70655990BBFFA9F71729B` | SAME |
| `content/types-applied.js` | `6FEF480AC785257A967FA1DF02C0BCF2E2B12DCA2F7C0C33F3976260752F33B8` | CHANGED |

※ 快照另存於 `tests/qa/snapshot-followup/`；舊的快照仍在 `tests/qa/snapshot/`（保留修正前狀態以備比對）。

## F.3 已確認修復清單（P0 / P1 逐項，附重現 seed 與修正前→修正後）

| # | 題型／問題 | 重現（技能/step, seed） | 修正前 | 修正後（本輪實測） | 結果 |
|---|---|---|---|---|---|
| 1 | `income_eq` L1 G 浮點亂碼（§3.1 #1） | `s6.income_determination` s0, seed=1000 | `G=349.9999999999998` | `G=350`（解題 `1199.9999999999998`→`1200`） | **PASS** |
| 2 | `income_eq` L2 G 浮點亂碼（§3.1 #2） | `col.macro_models` s0, seed=1000 | `G=799.9999999999998` | `G=800` | **PASS** |
| 3 | `yed` L2 收入浮點亂碼（§3.1 #3） | `s4.elasticity_other` s1, seed=1148 | `1650.0000000000002` | `1650` | **PASS** |
| 4 | `yed` L2 數量浮點亂碼（§3.1 #4） | `s4.elasticity_other` s1, seed=1259 | `224.00000000000003` | `224` | **PASS** |
| 5 | `xed` L2 數量浮點亂碼（§3.1 #5） | `s4.elasticity_other` s1, seed=1222 | `220.00000000000003` | `220` | **PASS** |
| 6 | `xed` L2 價格浮點亂碼（§3.1 #6） | `s4.elasticity_other` s1, seed=1259 | `110.00000000000001` | `110` | **PASS** |
| 7 | `growth` L1 GDP 浮點亂碼（§3.1 #7） | `s2.growth` s0, seed=1111 | `11330.000000000002` | `11330` | **PASS** |
| 8 | `gdp_real` L2 GDP 浮點亂碼（§3.1 #8） | `s6.national_income` s1, seed=1111 | `11330.000000000002` | `11330` | **PASS** |
| 9 | `inflation` L1 名義收入浮點亂碼（§3.1 #9） | `s6.macro_problems` s0, seed=1370 | `13200.000000000002` | `13200` | **PASS** |
| 10 | `ped` L1 價格浮點亂碼（§3.1 #10） | `s4.elasticity` s0, seed=1703（p1=50、+10%） | `55.00000000000001` | `55` | **PASS** |
| 11 | `pes` L1 價格浮點亂碼（§3.1 #11） | `s4.elasticity_other` s0, seed=1703 | `55.00000000000001` | `55` | **PASS** |
| 12 | `ped` L1 解題「0.5 > 1」矛盾（§3.2） | `s4.elasticity` s0, seed=1370 | `因為 0.5 > 1，需求缺乏彈性` | `因為 0.5 < 1，需求缺乏彈性` | **PASS** |
| 13 | `ped` L1 解題「1 > 1」矛盾（§3.2） | `s4.elasticity` s0, seed=1111 | `因為 1 > 1，需求為單位彈性` | `因為 1 = 1，需求為單位彈性` | **PASS** |
| 14 | `unemployment` 英文「萬人」誤作 million（§3.3） | `s2.unemployment` s0, seed=1234 | `184 million / 16 million` | `1.84 million / 0.16 million`（即 184 萬人 / 16 萬人） | **PASS** |
| 15 | `ped_tr` L1 `PED=1` 多解（§3.4） | `s4.elasticity` s0, 全 level-1 樣本 | 抽樣池含 `1`，出現 `PED=1` | 抽樣池改為 `[0.5, 2, 2.5]`；percent 模式出現過的 PED = `{0.4, 0.5, 0.8, 1.2, 1.5, 1.8, 2, 2.5, 3}`（**無 1**） | **PASS**（歧義消除） |
| 16 | `changeEn` 英文文法（§4.1） | `yed` / `xed` / `ped_tr` L1 | "income fall/rise by"、"demanded rise by"、"total revenue fall by" | "income **rises/falls** by"、"demanded **rises/falls** by"、"total revenue **rises/falls** by" | **PASS** |
| 17 | `oppcost` 英文 "gives up play/buy"（§4.2） | `s1.opportunity_cost` s0, seed=1234 | "gives up play basketball / buy a pair of sneakers" | 活動改為動名詞；"gives up **going/buying/…**"、"finally chooses going to the cinema" | **PASS** |
| 18 | `data_read` 英文單位語序（§4.3） | `chal.game_data` s0/s1/s2, seed=1234 | "which are 7, 2, 5, 3 10,000 books"、"6 HKD million" | "The values are 3, 4, 5, 2 and 6 (in units of 10,000 books)."、"HKD 3 million" | **PASS** |
| 19 | `cpi` 籃子術語（§4.4） | `s2.inflation` s0, seed=1234 | 「基期籃子成本」/"Base-period basket cost" | 「**以基期價格計算的當期籃子成本**」/"Cost of the current basket at base-period prices" | **PASS** |
| 20 | `interest` 解題 5–6 位中間值（§4.5 可選） | `s1.investment` s0, seed=1234 | 解題含 `factor` 6 位小數、EAR 5 位中間值 | 已移除；解題直接寫 `(1 + r)^n` 與 2 位答案（全題型掃描：**無 5 位以上小數**） | **PASS**（連可選項也修了） |
| 21 | `gini` 英文夾中文 | `chal.game_data` s2, seed=777 | 英文解題含「第 N 段」 | 英文解題全英文：`Segment 1: …; Segment 2: …`；英文欄位夾中文掃描：**0 個題型**（含 gini） | **PASS** |
| 22 | `ped_tr` 解題負因子寫法（順帶） | `s4.elasticity` s1, seed=2000 | `(1 + -0.15)` | `(1 − 0.15)`（乘數因子改為 `factorTerm`） | **PASS** |

定點回歸結果：**25/25 PASS**（腳本：`tests/qa/followup-verify.js`，輸出 `tests/qa/_live-verify.txt`）。

## F.4 本輪「仍存在」但不需修正的項目（全部是刻意保留或已知誤報）

1. **`growth`、`inflation`、`ped_tr` 解題步驟仍有 4–5 位小數**：這是**刻意展示的計算中間值**，不是浮點亂碼。
   - `growth` CAGR：`期末值 ÷ 期初值 = 132.25 ÷ 100 = 1.3225`（再開方）——正確中間值。
   - `inflation` 購買力：`1 ÷ 1.2 = 0.8333`（再算 16.67%）——正確中間值。
   - `ped_tr` 收入乘數：`(1 + 0.15) × (1 − 0.375) = 0.71875`——正確中間值。
   - 判定：**不是錯誤**；如要更清爽可再縮到 2–4 位（可選，不影響答案）。
2. **自動 checker 的 3 類已知誤報**（人工複核後確認不是問題）：
   - `unemployment` 的「中英數字不一致」×180：中文 `184 萬人` vs 英文 `1.84 million` 是**刻意的單位換算**（修正後正確），不是不一致。
   - `fiscal_balance` 的「中英數字不一致」×180：中文「以億港元為單位」vs 英文 "in units of HKD 100 million"，數字 `100` 是單位換算，非內容錯誤。
   - `data_read` 的「中英數字不一致」×47：中文「3、4、5、2、6 萬冊」vs 英文 "3, 4, 5, 2 and 6 (in units of 10,000 books)"，加上單位註記 `10,000`，屬正常換算。
3. **5 個應用題型 level 1 在 app 內仍不可達**（`regression`、`npv`、`gini`、`data_read`、`growth_model`）：這是挑戰區／大學區 `levels` 由 level 2 起的**課程設計**，不是生成器錯誤；本輪仍以直接呼叫生成器補測 level 1，答案全部正確。
4. `data_read` 題幹的「下圖」與 `visual` 實際渲染位置：屬 UI 呈現，需開 app 確認（本輪未改 app.js，維持原可選項）。

## F.5 本輪重跑明細

- **六個 checker（答案層）**：`micro 1,170`、`micro2 1,890`、`welfare 900`、`macro 2,280`、`intl 1,080`、`applied 600`；合計 **7,920 題**，`answer-mismatch = 0`、`generate-error = 0`、`answer-not-in-choices = 0`、`answer > 2dp = 0`。
- **全題型題幹掃描**：每型 30 樣本，題幹含 >3 位小數 = **0 題**。
- **英文欄位夾中文掃描**：49 型 × 每個（技能, 難度）15 樣本（prompt/hint/solution/choiceLabels.en）＝ **0**。
- **契約檢查**：`node tests/dev-gen-check.js` → **✓ 全部檢查通過（6,475 題）**。
- 重跑指令（可複現）：`$env:QA_LIVE='1'; node tests/qa/chk-micro.js`（其餘五個同理）、`node tests/qa/followup-verify.js`、`node tests/qa/edge.js`、`node tests/qa/freq.js`。

## F.6 修正後狀態

- **答案正確性：49/49 PASS。**
- **P0/P1 呈現與文字問題：0 個未修復。**
- **新引入的答案錯誤：0。**
- 本輪 `FAIL` 題型數：**0**；`PASS` 題型數：**49**。
