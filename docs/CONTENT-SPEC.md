# 課堂與題庫內容規格 · CONTENT SPEC

> 給負責 `content/lessons-*.js` 的作者。你只寫「教學內容」與「概念題庫」，不要改 `app.js`、`econ-core.js`、`content/stage-*.js` 或 `content/types-*.js`。
> 先讀 `docs/TYPE-CATALOG.md` 了解每個技能的計算題型；你寫的課堂要能支撐那些題目。

## 一、載入與註冊方式

在 `content/lessons-*.js` 內用兩個函數註冊（這兩個函數由 `econ-boot.js` 提供）：

```js
EconData.addLessons({
  's4.elasticity': {
    zh: { intro: '…', example: '…', tip: '…', mistake: '…', glossary: [{ term: '需求價格彈性', def: '…' }] },
    en: { intro: '…', example: '…', tip: '…', mistake: '…', glossary: [{ term: 'Price elasticity of demand', def: '…' }] }
  }
});

EconData.addBanks({
  's4.positive_normative': [
    {
      id: 'pn1',
      prompt: { zh: '以下哪一項是規範陳述？', en: 'Which of the following is a normative statement?' },
      choices: [
        { id: 'a', zh: '最低工資令失業率上升。', en: 'A minimum wage raises unemployment.' },
        { id: 'b', zh: '政府應該提高最低工資。', en: 'The government should raise the minimum wage.' },
        { id: 'c', zh: '香港的失業率是 3%。', en: 'Hong Kong\'s unemployment rate is 3%.' },
        { id: 'd', zh: '最低工資是一項價格下限。', en: 'A minimum wage is a price floor.' }
      ],
      answer: 'b',
      hint: { zh: '規範陳述涉及「應該」等價值判斷。', en: 'Normative statements involve value judgements, e.g. "should".' },
      solution: {
        zh: ['規範陳述涉及價值判斷，不能用事實檢驗。', '「政府應該提高最低工資」是價值判斷，故選 b。'],
        en: ['Normative statements involve value judgements and cannot be tested by facts.', '"The government should raise the minimum wage" is a value judgement, so b.']
      }
    }
  ]
});
```

注意：
- 課堂 key 必須逐字等於技能 id（例如 `s4.elasticity`）。
- 題庫 key 必須逐字等於技能 id；**只為下面「需要題庫的技能」清單寫題庫**，其他技能不要寫（寫了也不會用到）。
- 所有字串用 UTF-8；繁體中文用香港用語；英文用經濟學標準術語。
- 不要用 HTML；公式用 `$...$`（KaTeX），例如 `$PED = \\dfrac{\\%\\Delta Q}{\\%\\Delta P}$`。選項文字用純文字，避免 `$`。
- 不要用 `Math.random`、`Date.now`、`eval` 或任何 DOM/網絡 API。

## 二、小課堂（lesson）規格

每個技能都要有一課。`zh` / `en` 兩個語言物件，欄位如下：

| 欄位 | 必填 | 要求 |
|---|---|---|
| `intro` | ✅ | 2–4 句講解核心概念；用學生能懂的語言，先具體後抽象。 |
| `example` | ✅ | 一個具體數字例子，示範如何應用；數字要正確。 |
| `tip` | ✅ | 一句實用技巧／記憶法／檢查方法。 |
| `mistake` | ✅ | 一個常見錯誤，並指出正確做法。 |
| `glossary` | ✅ | 2–3 個術語，`{ term, def }`；中英各自填。 |
| `steps` | 選填 | 3–5 步的通用解題流程（計算技能強烈建議填）。app 會顯示為「解題步驟」。 |
| `visual` | 選填 | 只在適合的課堂使用：`{ kind: 'supplydemand', desc: {zh,en}, shifts: ['D+'], control: 'floor' }`／`{ kind: 'ppf', point: 'on', shift: false }`／`{ kind: 'adas', shifts: ['AD+'] }`／`{ kind: 'barchart', values: [..], labels: ['A','B'] }`。不確定就不要填。 |

寫作要求：
1. **準確**：不要寫錯定義、方向或因果。有爭議的政策（最低工資、貿易保護、再分配）用主流經濟學的多角度表述，不寫成政治主張。
2. **緊扣技能目標**：`stage-*.js` 內每個技能的 `zh.goal` / `en.goal` 就是課堂要教的內容。
3. **DSE 用語**：例如「需求價格彈性」「從量稅」「無謂損失」「消費者盈餘」「生產者盈餘」「價格上限」「比較優勢」「本地生產總值」「經常帳」「貨幣乘數」。英文：price elasticity of demand, per-unit tax, deadweight loss, consumer surplus, price ceiling, comparative advantage, GDP, current account, money multiplier。
4. **深淺**：中一至中三用生活例子（零用錢、八達通、茶餐廳、網購）；中四至中六用 DSE 情境與計算；大學用課程概念（邊際效用、無異曲線、IS-LM、OLS、Nash equilibrium）。
5. **長度**：每課合計約 120–220 中文字（英文對應），不要長篇大論；app 的課堂卡不適合長文。
6. **例子數字**：如涉及計算，數字必須能算出整齊答案，並在 `example` 寫出答案。

## 三、題庫（bank）規格

**只有以下技能需要題庫**（其餘技能不要寫）：

| 檔案 | 需要題庫的技能（每個 8–10 題） |
|---|---|
| `content/lessons-junior.js` | `s1.money`, `s1.scarcity`, `s1.factors`, `s2.public_finance`, `s3.globalisation`, `s3.economic_systems` |
| `content/lessons-s4.js` | `s4.positive_normative`, `s4.economic_questions`, `s4.production`, `s5.public_goods` |
| `content/lessons-s6.js` | `s6.supply_side`, `chal.reasoning` |
| `content/lessons-college.js` | `col.info_behavioural`, `col.thought` |

每題格式（全部必填）：

```js
{
  id: 'money1',                  // 該技能內唯一，用英數字
  prompt: { zh, en },            // 一題一問，避免雙重否定
  choices: [                     // 4 個選項，id 用 a/b/c/d
    { id: 'a', zh, en }, { id: 'b', zh, en }, { id: 'c', zh, en }, { id: 'd', zh, en }
  ],
  answer: 'c',                   // 必須是其中一個 id
  hint: { zh, en },              // 一句提示
  solution: { zh: [步驟...], en: [步驟...] } // 2–4 步，最後一步說明為何答案是該選項
}
```

出題要求：
1. **一題一考點**；正確答案必須唯一，不能有兩個都對。
2. 干擾項要似是而非（常見誤解、相近概念、方向相反），不要用明顯荒謬的選項。
3. 盡量避免「以上皆是／以上皆非」；真的要用時確保邏輯嚴謹。
4. 同一技能的題目要覆蓋不同角度（定義、辨認、應用、比較、常見錯誤），不要 8 題都考同一定義。
5. 難度循序：前 3 題基礎辨認、中間應用、最後 1–2 題比較或情境判斷。
6. 題幹與選項的雙語要意思一致，不要中英各問不同東西。
7. 不要出現需要外部最新數據才能作答的題目（例如「香港今年失業率是多少」）；用假設數字或概念判斷。
8. 解題步驟要解釋「為何正確」及「其他選項錯在哪裡」（至少指出一個）。

## 四、內容分配與撰寫順序

### A. `content/lessons-junior.js`（中一至中三，24 課）
技能：`s1.money`, `s1.scarcity`, `s1.opportunity_cost`, `s1.factors`, `s1.budget`, `s1.percentage`, `s1.interest`, `s1.investment`, `s2.public_finance`, `s2.tax_types`, `s2.tax_progressive`, `s2.fiscal_budget`, `s2.gdp`, `s2.growth`, `s2.unemployment`, `s2.inflation`, `s3.china_economy`, `s3.trade`, `s3.globalisation`, `s3.exchange_rate`, `s3.trade_policy`, `s3.balance_payments`, `s3.economic_systems`, `s3.development`。
題庫：`s1.money`, `s1.scarcity`, `s1.factors`, `s2.public_finance`, `s3.globalisation`, `s3.economic_systems`。

### B. `content/lessons-s4.js`（中四＋中五，22 課）
技能：`s4.basic_concepts`, `s4.positive_normative`, `s4.economic_questions`, `s4.production`, `s4.cost`, `s4.profit`, `s4.demand`, `s4.supply`, `s4.equilibrium`, `s4.elasticity`, `s4.elasticity_other`, `s5.market_structure`, `s5.perfect_competition`, `s5.monopoly`, `s5.oligopoly`, `s5.price_discrimination`, `s5.surplus`, `s5.tax_incidence`, `s5.price_controls`, `s5.externality`, `s5.public_goods`, `s5.factor_markets`。
題庫：`s4.positive_normative`, `s4.economic_questions`, `s4.production`, `s5.public_goods`。

### C. `content/lessons-s6.js`（中六＋挑戰區，18 課）
技能：`s6.national_income`, `s6.income_determination`, `s6.money_banking`, `s6.money_demand`, `s6.macro_problems`, `s6.fiscal_policy`, `s6.monetary_policy`, `s6.supply_side`, `s6.trade_theory`, `s6.exchange_rate`, `s6.balance_payments`, `s6.growth_development`, `chal.trade`, `chal.elasticity_tax`, `chal.macro`, `chal.finance`, `chal.game_data`, `chal.reasoning`。
題庫：`s6.supply_side`, `chal.reasoning`。

### D. `content/lessons-college.js`（大學，13 課）
技能：`col.consumer`, `col.producer`, `col.market_welfare`, `col.game_theory`, `col.info_behavioural`, `col.macro_models`, `col.growth_theory`, `col.monetary_theory`, `col.labour`, `col.econometrics`, `col.public`, `col.international`, `col.thought`。
題庫：`col.info_behavioural`, `col.thought`。

> 挑戰區的課堂不是「另一套課程」，而是解難策略：如何拆解多步題、檢查單位、用圖形輔助、辨認陷阱。

## 五、品質檢查清單

- [ ] 每個分配到的技能都有課堂，key 完全一致。
- [ ] 只有清單上的技能有題庫，每個 8–10 題。
- [ ] 每題 4 個選項、answer 正確、解題步驟與答案一致。
- [ ] 沒有 `Math.random`、DOM、網絡、HTML；公式用 `$...$`。
- [ ] 繁體中文（香港）與英文均通順、無錯字；同一技能中英內容一致。
- [ ] 數字例子算得通；沒有要求背誦會變動的現實數據。
- [ ] 執行 `node tests/dev-gen-check.js`：與你負責的技能相關的「缺少課堂」警告應全部消失；題庫技能不應再出現「題庫只有 X 題」警告。
