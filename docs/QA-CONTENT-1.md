# 內容 QA 報告（第 1 份）— 中一至中五課堂與概念題庫

> 審核員：獨立內容 QA（資深經濟科教師／校對）
> 審核範圍：`content/lessons-junior.js`（中一至中三，24 課 + 6 題庫）、`content/lessons-s4.js`（中四至中五，22 課 + 4 題庫）
> 審核依據：`docs/CONTENT-SPEC.md`、`docs/CURRICULUM-DESIGN.md`、`docs/TYPE-CATALOG.md`（生成題型要求）、`content/stage-s1.js`–`stage-s5.js`（技能目標）
> 審核日期：2026-11-22（當日完成）

---

## 一、摘要

| 項目 | 數量 |
|---|---|
| 已審核課堂 | **46 課**（junior 24、s4 22；技能 key 與 `CONTENT-SPEC` 清單完全一致） |
| 已審核題庫 | **10 個**（junior 6 個、s4 4 個） |
| 已審核題目 | **86 題**（junior 9×6＝54；s4 8×4＝32）＊任務書寫「78 題」，實際核算為 86 題 |
| 已修正問題 | **26 個問題、共 107 處**（第一輪審核 12 個問題／21 處；第二輪跟進 14 個問題／86 處，詳見 §4） |
| 已重算數字例子 | 46 課全部重算，**算術全部正確**（見 §3.2） |
| KaTeX 公式 | 抽出 328 個 `$...$` 片段（123 個不重複），以專案內 KaTeX `throwOnError` 全部成功渲染，**0 失敗** |
| 結構／編碼掃描 | 簡體字 0、英文欄位夾中文 0（修正後）、`$` 單數 0、glossary 數量全部 2–3、中英 steps 長度全部一致 |
| 最終自動檢查 | `node tests/dev-gen-check.js` → **✓ 全部檢查通過（0 錯誤、0 警告）** |

**結論**：兩檔整體質素良好，概念、計算、雙語對應、常見錯誤與 KaTeX 均可接受；沒有過時數據、政治偏頗或需要背誦最新數據的內容。發現的問題集中在「定義用語不夠精確」、「個別英文語法／轉義錯誤」、「跨階段術語不一致」，以及少量「課堂未完全覆蓋 stage 技能目標」的內容缺口。第二輪跟進已按指示：補入 5 個技能目標覆蓋句、把兩檔「公共物品」統一為「公共財（public good）」、改寫中一 8 題共 20 個過於荒謬的干擾項（詳見 §4.2）。

---

## 二、審核方法

1. **逐課逐題閱讀**：46 課的 `intro / example / tip / mistake / glossary / steps` 與 86 題的 `prompt / choices / answer / hint / solution`，中英對照閱讀。
2. **獨立重算**：把所有涉及數字的例子（本檔內）重新計算，核對方向、單位與 `example` 所寫答案；亦核對題庫解題步驟與答案是否一致。
3. **自動掃描**（Node 腳本載入兩檔的 `EconData` 註冊物件後檢查）：技能／題庫 key、課數與題數、glossary 數目、中英 steps 長度、`$` 成對、英文欄位是否夾中文或「元」、簡體字（以簡體專用字表掃描）、重複選項 id、`answer` 是否在選項內。
4. **KaTeX 實測**：用 `vendor/katex/katex.min.js` 對所有公式片段執行 `renderToString(..., {throwOnError:true})`。
5. **目標覆蓋核對**：把 `stage-s1.js`–`stage-s5.js` 每個技能的 `zh.goal`／`en.goal` 與對應課堂內容逐項比對，並核對 `stage-*.js` 的 `types` 與 `TYPE-CATALOG.md`（確認課堂有支撐生成題型）。
6. **自動檢查**：修改前後各跑一次 `node tests/dev-gen-check.js`，並對兩檔執行 `node --check`。

---

## 三、審核結論（按維度）

### 3.1 經濟學概念

- 46 課的定義、方向、因果與 DSE 慣用語整體正確，包括：機會成本（次佳選擇、不可相加）、稀少性（相對於慾望，非「數量少」）、生產要素與回報、比較優勢（看機會成本而非絕對產量）、GDP 支出法、失業率與參與率分母、CPI 與實質利率、匯率報價方向、經常帳組成、彈性（PED／YED／XED／PES 正負號）、壟斷 `MR = MC` 再向需求取價、寡頭優勢策略與納什均衡、三級價格歧視（彈性低者價高）、從量稅歸宿、價格上限／下限的有效條件、外部性與皮古稅、公共財與俱樂部財／共有資源分類、要素市場與最低工資。
- 政策課題保持中立：最低工資、關稅／保護、全球化、再分配均以主流經濟學的效率／公平取捨表述，沒有政治主張或單向宣傳。
- 已修正的定義問題：`s2.tax_progressive` 原把「邊際稅率」定義為「最高稅階的稅率」、把「累進稅」定義為「稅率隨收入上升」，與同檔 `s2.tax_types` 的「平均稅率」定義及 DSE 慣例不一致（詳見 §4 第 1 項）。
- 極少數簡化仍在可接受範圍（已列入 §5，未改）：`s1.investment` 稱儲蓄「保本」；`s5.perfect_competition` 停產條件寫成 `P < AVC` 而非「AVC 最低點」；`s1.money` 題庫 money8 對信用卡結算的簡化。
- 第二輪已把 5 個技能目標缺口補入對應課堂 intro（`s4.basic_concepts`、`s2.gdp`、`s2.tax_types`、`s1.interest`、`s4.profit`；中英各一句），覆蓋率已補齊（見 §4.2 第 13 項）。

### 3.2 數字與單位

全部數字例子獨立重算，**無一錯誤**；單位（元／百萬元／百萬人／百分比）前後一致，跨幣種例子（HKD/USD）亦有清楚標示。重點核對：

| 技能 | 核對內容 | 結果 |
|---|---|---|
| `s1.budget` | 800−620＝180；180÷800＝22.5% | ✓ |
| `s1.interest`／`s1.investment` | 5000×0.06×2＝600；10000×1.05²＝11025，複利多 25 | ✓ |
| `s2.tax_progressive` | 50000×0.02＋50000×0.06＋20000×0.10＝6000；平均 5%、邊際 10% | ✓ |
| `s2.fiscal_budget` | 6300−5800＝500；基本盈餘＝−500＋100＝−400 | ✓ |
| `s2.gdp` | 12000＋4000＋3000＋5000−4500＝19500 | ✓ |
| `s2.growth` | (21000−20000)÷20000＝5%；人均約 5%−2%＝3%（近似已用「約」） | ✓ |
| `s2.unemployment` | 15÷365≈4.1%；365÷600≈60.8% | ✓ |
| `s2.inflation` | (105−100)÷100＝5%；實質利率 3%−5%＝−2% | ✓ |
| `s3.exchange_rate` | 200×7.8＝1560、200×7.9＝1580；(7.9−7.8)÷7.8≈1.3% | ✓ |
| `s3.trade_policy` | 100×1.2＝120；20×10000＝200000 | ✓ |
| `s3.balance_payments` | 5000−4500＋300＋100−50＝850 | ✓ |
| `s4.cost` | TC(10)＝250、AC＝25；TC(9)＝226；MC＝24 | ✓ |
| `s4.profit` | 會計利潤 150,000；經濟利潤 0（正常利潤） | ✓ |
| `s4.equilibrium` | P＝20、Q＝60；P＝10 時短缺 40 | ✓ |
| `s4.elasticity` | PED 絕對值＝30÷20＝1.5；TR 1000→1040 | ✓ |
| `s5.monopoly` | Q＝20、P＝60、利潤 800；完全競爭 Q＝40；DWL＝400 | ✓ |
| `s5.price_discrimination` | 市場 1：Q＝40、P＝60；市場 2：Q＝20、P＝40 | ✓ |
| `s5.surplus` | CS＝PS＝1250；TS＝2500 | ✓ |
| `s5.tax_incidence` | Pc＝55、Q＝45、Pp＝45；稅收 450；DWL＝25 | ✓ |
| `s5.price_controls` | Qd＝70、Qs＝30、短缺 40；DWL＝½×20×40＝400 | ✓ |
| `s5.externality` | 私人 Q＝25、社會最適 Q＝22；DWL＝½×3×6＝9 | ✓ |
| `s5.factor_markets` | 均衡 L＝45、W＝110；最低工資 130 → 需求 35、供應 55、過剩 20 | ✓ |

### 3.3 中英一致與英文通順

- 全部技能 key、glossary 數目、`steps` 長度、prompt／choices／hint／solution 中英一一對應；沒有中英各問不同的情況。
- 已修正的不一致：`s4.positive_normative` 題 pn1 英文選項混入中文單位「50 元／40 元」（改為 HKD 50／HKD 40）；pn5 中文用「甲」而英文用 "Ada"（統一為 Person A）。
- 已修正的英文語法／句式：`s2.fiscal_budget` "one year balance" → "one year's balance"；`s2.tax_types` 倒裝句不順；`s4.elasticity_other` 漏冠詞；`s5.externality` 並列句失衡；`s1.opportunity_cost` "not the sum" 指代不清。
- 其餘英文通順、術語標準（price elasticity of demand、per-unit tax、deadweight loss、comparative advantage、current account 等）。

### 3.4 常見錯誤（`mistake` 欄）

46 課的 `mistake` 全部是**真實且常見**的學生誤解，並附正確做法，例如：把稀少性當「數量少」、把放棄的所有選項相加作機會成本、以支出作儲蓄率分母、把八折當減 8%、把月數當年數、把名義 GDP 增長當生活改善、把失業等同「沒有工作」、把進口當 GDP 加項、把絕對優勢當比較優勢、把關稅全歸外國生產者、把需求變動與需求量變動混用、把壟斷產量用 `P = MC` 求、把納什均衡當雙方最優、把平均成本當邊際成本、把政府提供等同公共財、以為最低工資必然增加就業等。**無錯誤或杜撰的「常見錯誤」。**

### 3.5 詞彙表（glossary）

- 每個語言物件均有 2–3 個術語，`term`／`def` 齊全、無重複；中英術語對應正確。
- 已修正：`s2.tax_progressive` 兩個定義（累進稅、邊際稅率，中英共 4 處）；`s3.development` 可持續發展定義漏了「後代滿足其需要的能力」（中英共 2 處）；`s3.china_economy` 的 GDP 術語由「國內生產總值」統一為全專案慣用的「本地生產總值」。
- 其餘詞彙準確，包括 DSE 指定用語（從量稅、無謂損失、消費者盈餘、生產者盈餘、價格上限／下限、比較優勢、本地生產總值、經常帳）。
- 第二輪已把中一檔 18 處「公共物品」統一為「公共財」，並在首次出現處標註「（public good）」，全專案用語一致。

### 3.6 時效、政治中立、最新數據

- **沒有**任何需要最新現實數據才能作答的內容；例子全是假設數字（如「假設政府收入 5800 百萬元」），符合 spec 要求。
- 沒有過時的政策描述被寫成現況；`s3.china_economy` 的「改革開放、工業化、城鎮化」屬歷史／結構事實，措辭中立；香港定位（國際金融、貿易、航運中心）為課程慣用中性描述。
- 最低工資、關稅保護、全球化、再分配均平衡呈現效率與分配兩面，未發現政治偏頗。

### 3.7 公式與 KaTeX

- 328 個 `$...$` 片段全部通過 KaTeX 嚴格渲染（`throwOnError:true`），包含 `\dfrac{\%\Delta Q}{\%\Delta P}`、`\left|...\right|`、`\frac{1}{2}`、`\sum s^2`、`\min(Q_d, Q_s)`、`P \geq AVC`、`AC_{min}` 等；Unicode `× ÷ −` 亦正常。
- 所有字串的 `$` 均成對；沒有把 `%` 直接寫進數學模式（已正確用 `\%`）；英文與中文欄位的公式寫法一致。

### 3.8 難度

- 中一至中三：以零用錢、八達通、茶餐廳、網購、政府預算、香港與國家經濟等生活情境切入，無需微積分，適合 CES 階段；少數課題（累進稅階計算、基本盈餘、經常帳計算）略深，但與 `TYPE-CATALOG` 要求的生成題型一致（如 `fiscal_balance` level 2 要求基本盈餘），屬刻意延伸，合理。
- 中四至中五：全面進入 DSE 情境與計算（供需函數、彈性、成本、壟斷、稅負、限價、外部性），難度與用語符合 DSE；計算步驟（`steps`）齊備。
- 未發現「中一課堂過深」或「中四課堂過淺」的明顯錯配。

### 3.9 用語一致性（跨課堂）

- 同一概念在 46 課內用語基本一致：機會成本、需求量／供應量變動、均衡、彈性、無謂損失、消費者盈餘／生產者盈餘、價格上限／下限、比較優勢、本地生產總值、經常帳等。
- 已統一一處：`s4.elasticity`「單一彈性」→「單位彈性」（與 `types-micro.js` 生成題回饋用語一致）。
- 第二輪已統一跨階段術語：中一檔 18 處「公共物品」全部改為「公共財」，並在 junior `s2.public_finance` 及 s4 `s5.public_goods` 首次出現處標註「（public good）」。現時全專案內容（兩檔、s6／college、stage、docs）一致使用「公共財」，中三升中四不再遇到術語切換。
- 「皮古稅」仍為全專案一致寫法（部分教科書用「庇古稅」）；若要改須全專案同步，見 §5.7。

### 3.10 錯字、簡體字、中英夾雜

- 簡體字掃描：**0**（以簡體專用字表逐字掃描兩檔全部字串）。
- 中英夾雜：修正前有 2 處英文選項混入「元」（pn1，已修）；修正後英文欄位再無中文字符。
- 沒有發現明顯錯別字；「帳／賬」「裡」等異體字用法可接受，未改。

---

## 四、已修正清單（第一輪 12 個問題／21 處；第二輪 14 個問題／86 處）

| # | 檔案:技能／題號 | 問題 | 修正 |
|---|---|---|---|
| 1 | `lessons-junior.js` : `s2.tax_progressive`（intro／steps／glossary ×2，中英共 8 處） | 「邊際稅率」寫成「最高稅階的稅率」、「累進稅」寫成「稅率隨收入上升」，與同檔 `s2.tax_types` 及 DSE 以「平均稅率」判斷累進的定義不一致 | 中英 intro／steps 改為「多賺一元所適用的稅率」；glossary 累進稅改「平均稅率隨收入上升」；邊際稅率改「多賺一元所適用的稅率」 |
| 2 | `lessons-junior.js` : `s2.tax_types`（en intro） | "By how the average tax rate changes with income, taxes are progressive…" 句式不順 | 改為 "Taxes are progressive, proportional or regressive according to how the average tax rate changes with income." |
| 3 | `lessons-junior.js` : `s2.fiscal_budget`（en mistake） | "A deficit is one year balance" 缺所有格 | "A deficit is one year's balance" |
| 4 | `lessons-junior.js` : `s3.china_economy`（glossary） | 術語用「國內生產總值」，與全專案（`s2.gdp`、`types-macro`、`stage-s2`、`s6`）慣用的「本地生產總值」不一致 | 統一為「本地生產總值」 |
| 5 | `lessons-junior.js` : `s3.development`（glossary 中英） | 可持續發展定義漏了「後代滿足其需要的能力」，中英皆不完整 | 中文補為「滿足當代需要，而不損害後代滿足其需要的能力」；英文補為 "…without harming the ability of future generations to meet theirs." |
| 6 | `lessons-junior.js` : `s1.opportunity_cost`（en example） | "not the sum of 1200 dollars" 指代不清 | 改為 "not their sum of 1200 dollars" |
| 7 | `lessons-s4.js` : `s5.public_goods`（en steps[0]） | 字串過度轉義：`person\\'s` 在畫面會顯示成 `person\'s`（多了一個反斜線） | 改為 `person's` |
| 8 | `lessons-s4.js` : `s4.positive_normative` 題 pn1（en 選項 b、d） | 英文選項混入中文單位：「50 元 per hour」「40 元 per hour」 | 改為 "HKD 50 per hour"／"HKD 40 per hour"（與 zh 的「50元／40元」及 solution 一致） |
| 9 | `lessons-s4.js` : `s4.positive_normative` 題 pn5（en prompt） | 中文用「甲」，英文用 "Ada"，中英不一致 | 英文改為 "Person A says… / Person A's statement" |
| 10 | `lessons-s4.js` : `s4.elasticity`（zh intro） | 「等於 1 為單一彈性」與 `types-micro.js` 生成題回饋的「單位彈性」不一致 | 統一為「單位彈性」 |
| 11 | `lessons-s4.js` : `s4.elasticity_other`（en intro） | "(above 1 luxury, between 0 and 1 necessity)" 漏冠詞，語意略鬆 | 改為 "(above 1 a luxury, between 0 and 1 a necessity)" |
| 12 | `lessons-s4.js` : `s5.externality`（en intro） | "makes marginal social cost exceed marginal private cost and the market output exceeds…" 並列結構失衡 | 改為 "…, so market output exceeds the social optimum; … so market output falls short." |

> 以上 12 個問題共 21 處文字改動，全部以精確字串取代方式完成；改動前後行數不變、格式不變、無重寫整課。修改後兩檔 `node --check` 均通過。

### 4.2 第二輪跟進修正（按 lead 指示，同日完成）

| # | 檔案:技能／題號 | 問題 | 修正 |
|---|---|---|---|
| 13 | `lessons-s4.js` : `s4.basic_concepts`、`s4.profit`；`lessons-junior.js` : `s2.gdp`、`s2.tax_types`、`s1.interest`（intro 中英共 10 處） | 5 個課堂未完全覆蓋 stage 技能目標：邊際回報遞減／名義與實質 GDP／稅制公平與效率／過度借貸風險／廠商目標 | 各在 intro 補一句（中英各一），實際補入句子見 §5.1；篇幅簡短、不改結構 |
| 14 | `lessons-junior.js` 全檔＋`lessons-s4.js`（共 20 處） | 中一檔用「公共物品」（18 處），與 s4 起及全專案「公共財」不一致 | 18 處統一為「公共財」；junior `s2.public_finance` 與 s4 `s5.public_goods` 首次出現處加註「（public good）」；現時全專案一致 |
| 15 | `lessons-junior.js` 中一題庫 8 題（20 個選項、16 條解題步驟） | 干擾項過於荒謬、一望而知（例：「收購所有私人企業」「禁止所有交易」「取消所有稅項」） | 改寫成合理常見誤解，題幹與答案不變：`money5`、`money8`、`pf2`、`pf6`、`gl4`、`gl7`、`es6`、`es7`（例：pf2 改「購買私人公司的股票以賺取回報」；pf6 改「提高煙酒稅」「增加基建投資」「減少社會福利開支」；es7 改「禁止所有進口貨物」「放寬環保法規」「完全不干預」） |

> 第二輪合計 14 個問題／86 處（goal 補句 10 處、術語統一 20 處、干擾項 20 個選項＋16 條解題步驟＝56 處）；兩輪合計 **26 個問題／107 處**。第二輪後兩檔 `node --check` 與 `node tests/dev-gen-check.js` 均通過。

---

## 五、未修正但建議（含重大但不自行改者）

以下問題屬**內容新增／改寫或跨檔統一**，超出「修正明顯錯誤、不改格式、不重寫」的界線，故只列位置與建議。其中 §5.1、§5.3（8 題）及 §5.4 已於第二輪按指示處理，保留記錄。

### 5.1 課堂未完全覆蓋 `stage-*.js` 的技能目標（**第二輪已全部補入**，保留原文記錄）

下表建議句已於第二輪全部補入對應 intro（中英各一句，見 §4.2 第 13 項）。

| 技能 | 目標中未被課堂覆蓋的部分 | 已補入的句子 |
|---|---|---|
| `s4.basic_concepts` | goal 含「邊際回報遞減」，課堂只教稀少性、機會成本、PPF | 「短期固定要素不變時，增加可變要素，邊際回報最終遞減。」（英文同步） |
| `s2.gdp` | goal 含「分辨名義與實質 GDP」，課堂只教支出法與最終物品 | 「以當期價格計是名義 GDP，剔除物價變動後是實質 GDP。」（英文同步） |
| `s2.tax_types` | goal 含「公平與效率等稅制原則」 | 「稅制設計要兼顧公平（按能力負擔）與效率（減少對行為的扭曲）。」（英文同步） |
| `s1.interest` | goal 含「認識過度借貸的風險」，課堂只教單利息計算 | 「借貸前要衡量還款能力，避免以債養債。」（英文同步） |
| `s4.profit` | goal 含「廠商的目標」，課堂只在結語提及正常利潤 | 「廠商一般以利潤極大化為目標。」（英文同步） |

### 5.2 完全競爭的停產條件宜更精確（`s5.perfect_competition`）

- 現時 intro／steps 寫「價格不低於平均變動成本（`P ≥ AVC`）就繼續生產，否則停產」；嚴格定義是與 **AVC 的最低點** 比較（`P ≥ min AVC`）。對 `MR = MC` 產量而言兩者等價，但作為定義建議在 intro 或 glossary 加「（AVC 的最低點）」。未改：屬定義精確化而非錯誤，且改動會牽動中英 4 個欄位。

### 5.3 中一至中三題庫干擾項（**第二輪已改寫 8 題**，其餘輕微者未改）

- **已改寫（第二輪）**：`money5`、`money8`、`pf2`、`pf6`、`gl4`、`gl7`、`es6`、`es7` 共 20 個荒謬選項及 16 條解題步驟，改為合理常見誤解（見 §4.2 第 15 項）。
- **建議日後再潤飾（程度較輕，未改）**：`s2.public_finance` pf5 b「令所有物價上升」、pf9 c「令所有物價下跌」；`s1.scarcity` scarcity4 a/b/d（只有窮人／富人／政府面對）、scarcity8 d「只在通脹時出現」、scarcity9 d「稀少性令所有價格永遠上升」；`s1.money` money9 c/d「利息成本／稅務成本」。

### 5.4 跨階段術語：「公共物品」vs「公共財」（**第二輪已統一**）

- 第二輪已把 `lessons-junior.js` 全部 18 處「公共物品」改為「公共財」，並在 junior `s2.public_finance` 與 s4 `s5.public_goods` 首次出現處標註「（public good）」。現時全專案內容（兩檔、s6／college、stage、docs）一致使用「公共財」，中三升中四不再遇到術語切換。

### 5.5 題庫源檔「答案按鍵」偏斜（不影響學習者）

- 源檔答案分佈：`s5.public_goods` 8 題全為 a；`s4.production` 8 題中 6 題為 a；`s1.scarcity` 9 題中 7 題為 b。
- 但 `econ-core.js` 的 `bankProblem`（約 L176）在出題時會 `shuffle` 選項次序，選項顯示次序每次不同，故**對實際作答沒有影響**；只是若日後改為不洗牌，會成為可猜答的缺陷。可選做法：維持現狀（依賴洗牌），或作者重排源檔選項次序。

### 5.6 個別措辭／格式微調（不影響正確性）

- `s3.trade`（zh intro）：「按比較優勢分工再生產並貿易」中的「再生產」易被讀成「reproduction」；建議改「按比較優勢分工、生產並貿易」。
- `s5.price_controls`（en intro）："binding only below the equilibrium" 可改 "binding only when set below the equilibrium"（同理 floor）。
- `s1.investment`（zh intro）：「儲蓄是保本、低風險」——銀行存款並非全額保證（香港存款保障計劃有上限）；S1 程度可接受，建議改「本金相對穩定、風險較低」。
- `s4.positive_normative`、`s4.economic_questions`、`s4.production`、`s4.demand`、`s4.supply`、`s5.public_goods` 把 `steps` 與 `intro` 寫在同一行（單行極長）。功能正常、不影響顯示；依「不要改格式」未動，建議日後格式化為獨立欄位。
- `s1.money` 題庫 money8 解說仍屬 S1 簡化（實際由發卡機構墊付、再由存款償還）；第二輪已把其荒謬選項改寫，並在解說用「即時的支付來源」，日後可再加「最終由」二字更精確。

### 5.7 「皮古稅」vs「庇古稅」

- 全專案（`lessons-s4`、`lessons-college`、`stage-s5`、`types-welfare`、`TYPE-CATALOG`）一致用「皮古稅」，故**不建議只改個別檔案**；若要改用更常見的「庇古稅」，須全專案同步（屬跨檔決定）。

---

## 六、驗證記錄

| 檢查 | 指令／方法 | 結果 |
|---|---|---|
| 語法 | `node --check content/lessons-junior.js`、`node --check content/lessons-s4.js` | 兩檔均通過（修改後） |
| 生成器自檢（修改前 baseline） | `node tests/dev-gen-check.js` | 4 個錯誤全部屬 `s6.supply_side`／`chal.reasoning`（非本範圍），另有 6 個 challenge 缺課堂警告 |
| 生成器自檢（第一輪修改後、第二輪前） | `node tests/dev-gen-check.js` | **✓ 全部檢查通過**（0 錯誤、0 警告；抽樣生成 6475 題）。此時 s6／college 已由其他作者補齊，先前 s6/challenge 錯誤已消失，與本檔修改無關 |
| 生成器自檢（第二輪後、最終） | `node tests/dev-gen-check.js` | **✓ 全部檢查通過**（0 錯誤、0 警告；抽樣生成 6475 題） |
| 內容結構 | 自製 Node 掃描（載入 `EconData`） | 46 課、10 題庫、86 題；技能 key 與 spec 一致；無重複 id；answer 全部在選項內；glossary 2–3 個；中英 steps 長度一致 |
| 語言 | 簡體專用字表掃描、英文欄位 CJK 掃描、中英夾雜掃描 | 簡體字 0；修正後英文欄位中文 0；「元」在英文欄位 0 |
| 公式 | KaTeX `renderToString(..., {throwOnError:true})` | 328 個片段（123 不重複）全部成功，0 失敗（第二輪後複檢結果相同） |
| 第二輪內容複檢 | 逐題核對改寫後 8 題（答案不變、解題步驟同步）、5 個補句、公共財術語；重跑結構與雙語掃描 | 每題 4 個唯一選項、answer 不變；全檔「公共物品」0、英文欄位中文 0、`$` 成對 0 異常；46 課／10 庫／86 題不變 |
| 雙語 | 中英逐項對照（prompt／choices／hint／solution／glossary／lesson 欄位） | 意思一致（修正 pn1、pn5 後） |

> 註：本報告的 QA 範圍不含 `lessons-s6.js`、`lessons-college.js`、`stage-*.js`、`types-*.js`；`dev-gen-check` 最終全綠亦包含其他作者當日補上的 s6／college 內容，不能全部歸功於本檔修改。

---

## 七、附註與限制

1. **題數差異**：任務書寫「10 個題庫（共 78 題）」，實際載入為 86 題（junior 6 個題庫各 9 題＝54；s4 4 個題庫各 8 題＝32），符合 `CONTENT-SPEC` 的「每個 8–10 題」。已按實際 86 題逐一審核。
2. **未做瀏覽器 UI 實測**：本 QA 以 Node 載入 `EconData` 加 KaTeX 渲染驗證內容與公式，未啟動瀏覽器截圖；課堂卡排版、字數是否溢出屬 UI 驗收範圍。另已核對 `app.js` 支援 `visual` 的 `kind`／`control` 值（`ppf`、`supplydemand`、`ceiling` 等）與本檔所用值一致。
3. **未重寫、未改格式**：所有修改均為字串級修正或單句補入，保留原語氣與篇幅；未新增技能、未改 stage 檔、未改其他檔案。第二輪按 lead 指示改寫了 8 題的選項文字（仍保持 4 選項、答案與題幹不變）。
4. **第二輪範圍**：同樣只改 `content/lessons-junior.js` 與 `content/lessons-s4.js` 兩檔；術語統一、goal 補句與干擾項改寫均只在這兩檔內完成。
5. 「簡體字掃描」以簡體專用字表為基礎，覆蓋常見簡體字，但不能保證覆蓋全部罕見異體；已另行人工閱讀兩檔全部中文字串。
