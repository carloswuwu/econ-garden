/*
 * 中一至中三 · 課堂內容與概念題庫
 * 對應香港「公民、經濟與社會」（中一至中三）：理財教育、公共財政、經濟表現、
 * 國家經濟、世界貿易與全球化。
 * 註冊方式見 docs/CONTENT-SPEC.md；只註冊本檔負責的技能。
 *
 * 寫作約定：貨幣金額用「元」／「百萬元」（英文用 dollars／million dollars），
 * 避免與 KaTeX 的 $...$ 分隔符衝突；數學式只用 ASCII 或 Unicode 運算符。
 */

EconData.addLessons({
  's1.money': {
    zh: {
      intro: '金錢是大家都接受用來付款的東西。沒有金錢，人們要以物易物，必須找到雙方都想交換的人才能交易；金錢還有計價、儲存價值和延遲支付的功能。',
      example: '茶餐廳早餐標價 32 元，是「計價單位」；用八達通拍卡付款，是「交易媒介」；卡內餘額把購買力保存下來，是「價值儲存」；若約定下月才付款，就是「延遲支付」。',
      tip: '記住四大功能：交易媒介、計價單位、價值儲存、延遲支付。',
      mistake: '常見錯誤：以為信用卡就是金錢。信用卡是借貸工具，真正付款的是銀行存款。',
      glossary: [
        { term: '交易媒介', def: '大家都接受用來交換物品和服務的東西。' },
        { term: '計價單位', def: '用同一單位為物品標價，方便比較價值。' },
        { term: '價值儲存', def: '把購買力保存下來，留待日後使用。' }
      ]
    },
    en: {
      intro: 'Money is anything generally accepted as payment. Without money, people would have to barter, and each trade would need a double coincidence of wants. Money also acts as a unit of account, a store of value and a standard of deferred payment.',
      example: 'A cha chaan teng breakfast is priced at 32 dollars, using money as a unit of account. Paying with an Octopus card uses it as a medium of exchange; the card balance is a store of value; paying next month uses it as a standard of deferred payment.',
      tip: 'Remember the four functions: medium of exchange, unit of account, store of value and standard of deferred payment.',
      mistake: 'A common mistake is thinking a credit card is money. A credit card is a borrowing tool; the actual payment comes from a bank deposit.',
      glossary: [
        { term: 'Medium of exchange', def: 'Anything generally accepted in exchange for goods and services.' },
        { term: 'Unit of account', def: 'A common unit for quoting prices so that values can be compared.' },
        { term: 'Store of value', def: 'A way of keeping purchasing power for future use.' }
      ]
    }
  },

  's1.scarcity': {
    zh: {
      intro: '金錢、時間、土地等資源有限，但人的慾望無窮，這種情況叫稀少性。因為稀少，我們必須選擇，而每次選擇都要放棄其他東西。',
      example: '你有 100 元零用錢，想買 80 元的耳機，又想買 70 元的書。兩樣合共 150 元，超過 100 元，只能二選一——這就是稀少性下的選擇。',
      tip: '分辨需要與想要：問自己「沒有它，能否維持基本生活？」',
      mistake: '常見錯誤：以為「稀少」等於「數量很少」。稀少性是相對於慾望而言，物品再多也可能不足以滿足所有慾望。',
      glossary: [
        { term: '稀少性', def: '資源有限，不足以滿足所有慾望。' },
        { term: '需要', def: '維持基本生活所必需的東西。' },
        { term: '想要', def: '並非必需，但能帶來滿足的東西。' }
      ]
    },
    en: {
      intro: 'Resources such as money, time and land are limited, while human wants are unlimited. This is scarcity. Because of scarcity we must choose, and every choice means giving something up.',
      example: 'You have 100 dollars of pocket money. You want headphones for 80 dollars and a book for 70 dollars. Together they cost 150 dollars, more than 100 dollars, so you can buy only one. That is scarcity forcing a choice.',
      tip: 'Separate needs from wants: ask whether you could still meet your basic needs without it.',
      mistake: 'A common mistake is to treat scarcity as meaning very few. Scarcity is relative to wants, so even a large amount can be scarce if it cannot satisfy all wants.',
      glossary: [
        { term: 'Scarcity', def: 'Limited resources that cannot satisfy all wants.' },
        { term: 'Needs', def: 'Things required to maintain a basic standard of living.' },
        { term: 'Wants', def: 'Things that are not essential but add to satisfaction.' }
      ]
    }
  },

  's1.opportunity_cost': {
    zh: {
      intro: '機會成本是作出選擇時，所放棄的次佳選擇中價值最高的一項。它可以用金錢衡量，也可以是時間或滿足感。',
      example: '週末三小時，你可以補習（值 600 元）、打球（值 400 元）或睡覺（值 200 元）。選補習的話，機會成本是次佳的打球 400 元，不是 600 元，也不是三者相加的 1200 元。',
      tip: '只計次佳的一項，不要把所有放棄的選擇相加。',
      mistake: '常見錯誤：把打球和睡覺的價值相加（400 + 200 = 600 元）當作機會成本。正確只取次佳選擇的 400 元。',
      glossary: [
        { term: '機會成本', def: '作出選擇時放棄的次佳選擇的價值。' },
        { term: '次佳選擇', def: '在放棄的選擇中價值最高的一項。' },
        { term: '取捨', def: '因為資源有限而放棄部分選擇。' }
      ],
      steps: [
        '列出所有可選方案及各自的價值。',
        '找出你最終選擇的方案。',
        '在餘下方案中選出價值最高的一項。',
        '該項價值就是機會成本。'
      ]
    },
    en: {
      intro: 'Opportunity cost is the value of the next best alternative forgone when making a choice. It can be measured in money, time or satisfaction.',
      example: 'You have three hours at the weekend: tutoring is worth 600 dollars, playing ball 400 dollars and sleeping 200 dollars. If you choose tutoring, the opportunity cost is 400 dollars, the next best option, not 600 dollars and not their sum of 1200 dollars.',
      tip: 'Count only the single best alternative given up; do not add all the options forgone.',
      mistake: 'A common mistake is to add the values of playing ball and sleeping (400 + 200 = 600 dollars). The correct opportunity cost is only the next best option, 400 dollars.',
      glossary: [
        { term: 'Opportunity cost', def: 'The value of the next best alternative forgone when a choice is made.' },
        { term: 'Next best alternative', def: 'The most valuable option given up.' },
        { term: 'Trade-off', def: 'Giving up some options because resources are limited.' }
      ],
      steps: [
        'List every option and its value.',
        'Identify the option you actually choose.',
        'Among the remaining options, pick the one with the highest value.',
        'That value is the opportunity cost.'
      ]
    }
  },

  's1.factors': {
    zh: {
      intro: '生產要素是生產物品和服務所需的資源，分為土地、勞力、資本和企業家才能四類，各有對應的回報。',
      example: '茶餐廳的舖位屬土地，回報是租金；侍應屬勞力，回報是工資；爐具和雪櫃屬資本，回報是利息；老闆決定菜單並承擔蝕本風險，屬企業家才能，回報是利潤。',
      tip: '口訣「土、勞、資、企」對應「租、工、息、利」。',
      mistake: '常見錯誤：以為鈔票是資本。資本是機器、廠房等生產工具；金錢本身不是生產要素。',
      glossary: [
        { term: '生產要素', def: '生產物品和服務所需的資源。' },
        { term: '資本', def: '機器、廠房等用於生產的實物工具。' },
        { term: '企業家才能', def: '組織生產並承擔風險的能力，回報是利潤。' }
      ]
    },
    en: {
      intro: 'Factors of production are the resources used to produce goods and services: land, labour, capital and entrepreneurship. Each earns a reward.',
      example: 'For a cha chaan teng, the shop is land (reward: rent); waiters are labour (wages); stoves and fridges are capital (interest); the owner who plans the menu and bears the risk of loss provides entrepreneurship (profit).',
      tip: 'Remember: land earns rent, labour earns wages, capital earns interest and entrepreneurship earns profit.',
      mistake: 'A common mistake is to call banknotes capital. Capital means produced means of production such as machines and factories; money itself is not a factor of production.',
      glossary: [
        { term: 'Factors of production', def: 'The resources used to produce goods and services.' },
        { term: 'Capital', def: 'Produced goods such as machines and factories used in production.' },
        { term: 'Entrepreneurship', def: 'The ability to organise production and bear risk; its reward is profit.' }
      ]
    }
  },

  's1.budget': {
    zh: {
      intro: '預算是把收入與支出預先計劃。收入減支出有餘就是儲蓄；支出大於收入就是入不敷支。儲蓄率顯示每 100 元收入中儲起多少。',
      example: '零用錢 800 元：交通 120 元、飯錢 360 元、娛樂 140 元，支出合共 620 元。儲蓄 = 800 − 620 = 180 元，儲蓄率 = 180 ÷ 800 = 0.225，即 22.5%。',
      tip: '先儲蓄後消費：每月先撥起目標儲蓄，再分配其餘支出。',
      mistake: '常見錯誤：用支出做分母計儲蓄率（180 ÷ 620）。儲蓄率的分母是收入，即 180 ÷ 800 = 22.5%。',
      glossary: [
        { term: '預算', def: '一段時間內收入與支出的計劃。' },
        { term: '儲蓄', def: '收入減去支出後剩下的部分。' },
        { term: '儲蓄率', def: '儲蓄佔收入的比例。' }
      ],
      steps: [
        '列出所有收入。',
        '列出固定支出（如交通）和變動支出（如娛樂）。',
        '儲蓄 = 收入 − 總支出。',
        '儲蓄率 = 儲蓄 ÷ 收入 × 100%。'
      ]
    },
    en: {
      intro: 'A budget is a plan for income and spending. Income minus spending is saving; spending more than income means living beyond your means. The saving rate shows how much of each 100 dollars of income is saved.',
      example: 'Pocket money is 800 dollars: transport 120, meals 360 and entertainment 140 give total spending of 620 dollars. Saving is 800 − 620 = 180 dollars, so the saving rate is 180 ÷ 800 = 0.225, or 22.5%.',
      tip: 'Save first, spend later: set aside the target saving before sharing out the rest.',
      mistake: 'A common mistake is to divide by spending (180 ÷ 620). The saving rate uses income as the denominator: 180 ÷ 800 = 22.5%.',
      glossary: [
        { term: 'Budget', def: 'A plan for income and spending over a period.' },
        { term: 'Saving', def: 'Income that is not spent.' },
        { term: 'Saving rate', def: 'Saving as a proportion of income.' }
      ],
      steps: [
        'List all income.',
        'List fixed spending (such as transport) and variable spending (such as entertainment).',
        'Saving = income − total spending.',
        'Saving rate = saving ÷ income × 100%.'
      ]
    }
  },

  's1.percentage': {
    zh: {
      intro: '百分數表示「每 100」的比例。折扣是從原價減去某個百分率，加價或服務費是在原價上加某個百分率；百分比變化一律以原值為分母。',
      example: '球鞋原價 600 元，八折即 600 × 0.8 = 480 元，比原價便宜 120 元。若只知道折後價 480 元，原價 = 480 ÷ 0.8 = 600 元。',
      tip: '反向求原價用除法：折後價 ÷ (1 − 折扣率)。',
      mistake: '常見錯誤：把「八折」當成減 80 元或減 8%。八折是原價的 80%，即減 20%。',
      glossary: [
        { term: '折扣', def: '從原價減去的金額或百分率。' },
        { term: '百分率變化', def: '新值與舊值的差佔舊值的百分率。' },
        { term: '服務費', def: '按賬單金額加收的百分率費用。' }
      ],
      steps: [
        '找出原價和百分率。',
        '折扣用 × (1 − r)，加價用 × (1 + r)。',
        '算出最終價格或差額。',
        '反向求原價時用除法。'
      ]
    },
    en: {
      intro: 'A percentage expresses a proportion out of 100. A discount subtracts a percentage from the original price, while a mark-up or service charge adds one; a percentage change always uses the original value as the denominator.',
      example: 'Trainers originally cost 600 dollars. At 20% off, the price is 600 × 0.8 = 480 dollars, which is 120 dollars less. Given only the sale price of 480 dollars, the original price is 480 ÷ 0.8 = 600 dollars.',
      tip: 'To find the original price, divide: sale price ÷ (1 − discount rate).',
      mistake: 'A common mistake is to read a 20% discount as minus 80 dollars or minus 8%. Paying 80% of the price means a discount of 20%.',
      glossary: [
        { term: 'Discount', def: 'An amount or percentage taken off the original price.' },
        { term: 'Percentage change', def: 'The change from the old value as a percentage of the old value.' },
        { term: 'Service charge', def: 'A percentage added to a bill.' }
      ],
      steps: [
        'Identify the original price and the percentage.',
        'For a discount use × (1 − r); for a mark-up use × (1 + r).',
        'Work out the final price or the difference.',
        'To reverse a percentage change, divide.'
      ]
    }
  },

  's1.interest': {
    zh: {
      intro: '利息是使用金錢的代價：借錢要付利息，存款可收利息。單利息只按本金計算，公式為 利息 = 本金 × 利率 × 時間，即 $I = P × r × t$。借貸前要衡量還款能力，避免以債養債。',
      example: '向銀行借 5000 元，年利率 6%，借 2 年：單利息 = 5000 × 0.06 × 2 = 600 元，本利和 = 5000 + 600 = 5600 元。',
      tip: '先統一時間單位：題目給月數要除以 12，6 個月即 0.5 年。',
      mistake: '常見錯誤：忘記把「月」換算成「年」，例如把 6 個月當作 6 年，令利息大 12 倍。',
      glossary: [
        { term: '本金', def: '借入或存入的原本金額。' },
        { term: '單利息', def: '只按本金計算的利息。' },
        { term: '利率', def: '每單位時間的利息佔本金的比例。' }
      ],
      steps: [
        '寫出本金、利率和時間，並統一單位。',
        '利息 = 本金 × 利率 × 時間。',
        '本利和 = 本金 + 利息。',
        '利息就是借貸的成本。'
      ]
    },
    en: {
      intro: 'Interest is the price of using money: borrowers pay it and savers earn it. Simple interest is calculated on the principal only: interest = principal × interest rate × time, or $I = P × r × t$. Borrow only what you can repay, and avoid taking on new debt to repay old debt.',
      example: 'Borrow 5000 dollars at 6% per year for 2 years. Simple interest = 5000 × 0.06 × 2 = 600 dollars, so the amount repayable is 5000 + 600 = 5600 dollars.',
      tip: 'Use the same time unit throughout: 6 months is 0.5 year, not 6 years.',
      mistake: 'A common mistake is to forget converting months into years, for example treating 6 months as 6 years, which makes the interest 12 times too large.',
      glossary: [
        { term: 'Principal', def: 'The original amount borrowed or deposited.' },
        { term: 'Simple interest', def: 'Interest calculated on the principal only.' },
        { term: 'Interest rate', def: 'Interest per period as a proportion of the principal.' }
      ],
      steps: [
        'Write down the principal, interest rate and time, using the same unit.',
        'Interest = principal × interest rate × time.',
        'Amount repayable = principal + interest.',
        'The interest is the cost of borrowing.'
      ]
    }
  },

  's1.investment': {
    zh: {
      intro: '儲蓄是保本、低風險；投資是期望賺取回報，但要承受虧損風險。一般而言風險越高，期望回報越高。複利是「利疊利」，公式為 $A = P × (1 + r)^n$。',
      example: '存入 10000 元，年利率 5%，複利 2 年：10000 × 1.05 × 1.05 = 11025 元，利息 1025 元。同樣條件下單利息只有 1000 元，複利多 25 元。',
      tip: '比較投資要看「風險與回報」，不要只看最高回報。',
      mistake: '常見錯誤：以為「保證高回報」的投資沒有風險。回報越高通常風險越高，零風險高回報多是騙局。',
      glossary: [
        { term: '風險', def: '實際回報與預期不同的可能性。' },
        { term: '回報', def: '投資帶來的收益。' },
        { term: '複利', def: '利息也加入本金再計算利息，即利疊利。' }
      ],
      steps: [
        '找出本金、年利率和期數。',
        '複利本利和 = 本金 × (1 + 利率)^期數。',
        '利息 = 本利和 − 本金。',
        '與單利息比較，看複利的效果。'
      ]
    },
    en: {
      intro: 'Saving preserves capital with low risk; investing aims at a return but carries the risk of loss. Generally, higher risk comes with higher expected return. Compound interest means earning interest on interest, following $A = P × (1 + r)^n$.',
      example: 'Deposit 10000 dollars at 5% per year with annual compounding for 2 years: 10000 × 1.05 × 1.05 = 11025 dollars, so interest is 1025 dollars. Simple interest would give only 1000 dollars, so compounding adds 25 dollars.',
      tip: 'Compare investments by both risk and return, not return alone.',
      mistake: 'A common mistake is to believe a guaranteed high return is risk-free. Higher returns usually mean higher risk; offers of high return with no risk are often scams.',
      glossary: [
        { term: 'Risk', def: 'The chance that the actual return differs from the expected return.' },
        { term: 'Return', def: 'The gain from an investment.' },
        { term: 'Compound interest', def: 'Interest earned on interest as well as on the principal.' }
      ],
      steps: [
        'Identify the principal, annual interest rate and number of periods.',
        'Compound amount = principal × (1 + rate)^periods.',
        'Interest = amount − principal.',
        'Compare with simple interest to see the compounding effect.'
      ]
    }
  }
});

EconData.addLessons({
  's2.public_finance': {
    zh: {
      intro: '公共財政是政府如何籌集收入和使用支出。政府收入包括稅收、賣地收入和各項收費；支出用於教育、醫療、社福和基建。政府也提供公共財（public good）、再分配收入和穩定經濟。',
      example: '假設政府支出 1000 百萬元，其中教育 200、醫療 150、社福 150、基建 200、其他 300（百萬元）。200 + 150 + 150 + 200 + 300 = 1000，全部支出都用於公共服務。',
      tip: '記住「收入 → 支出 → 預算」的關係；政府支出是為了提供公共服務。',
      mistake: '常見錯誤：以為政府收入只有稅收。賣地收入、各項收費和投資回報也是收入來源。',
      glossary: [
        { term: '公共財政', def: '政府的收入、支出和債務管理。' },
        { term: '公共財', def: '難以排斥他人使用、一人使用不影響他人的物品。' },
        { term: '再分配', def: '透過稅收和福利把收入由一部分人轉移給另一部分人。' }
      ]
    },
    en: {
      intro: 'Public finance is how a government raises revenue and spends it. Revenue comes from taxes, land sales and fees; spending goes to education, health, welfare and infrastructure. The government also provides public goods, redistributes income and stabilises the economy.',
      example: 'Suppose government spending is 1000 million dollars: education 200, health 150, welfare 150, infrastructure 200 and others 300 (million dollars). 200 + 150 + 150 + 200 + 300 = 1000, so all spending goes to public services.',
      tip: 'Remember the chain: revenue, then spending, then the budget; government spending provides public services.',
      mistake: 'A common mistake is to think taxes are the only revenue. Land sales, fees and investment income are also sources of revenue.',
      glossary: [
        { term: 'Public finance', def: 'The revenue, spending and debt management of a government.' },
        { term: 'Public goods', def: 'Goods that are hard to exclude people from and where one person\'s use does not reduce another person\'s use.' },
        { term: 'Redistribution', def: 'Using taxes and benefits to move income from one group to another.' }
      ]
    }
  },

  's2.tax_types': {
    zh: {
      intro: '直接稅由納稅人直接負擔，例如薪俸稅和利得稅；間接稅透過價格轉嫁，例如煙酒稅和印花稅。按平均稅率隨收入上升、不變或下降，可分為累進、比例和累退稅。稅制設計要兼顧公平（按能力負擔）與效率（減少對行為的扭曲）。',
      example: '甲月入 20000 元繳稅 1000 元（平均稅率 5%）；乙月入 40000 元繳稅 4000 元（平均稅率 10%）。平均稅率隨收入上升，屬累進稅；若兩人平均稅率都是 10%，就是比例稅。',
      tip: '判斷累進或累退，看平均稅率隨收入上升還是下降。',
      mistake: '常見錯誤：以為稅款隨收入增加就是累進稅。稅款金額增加是正常的，關鍵是平均稅率有沒有上升。',
      glossary: [
        { term: '直接稅', def: '由納稅人直接負擔的稅，如薪俸稅。' },
        { term: '間接稅', def: '透過商品價格轉嫁的稅，如煙酒稅。' },
        { term: '累進稅', def: '平均稅率隨收入上升的稅制。' }
      ]
    },
    en: {
      intro: 'Direct taxes are borne directly by the taxpayer, such as salaries tax and profits tax. Indirect taxes are shifted through prices, such as duties on tobacco and alcohol and stamp duty. Taxes are progressive, proportional or regressive according to how the average tax rate changes with income. Tax design should balance equity (ability to pay) and efficiency (minimising distortions).',
      example: 'A earns 20000 dollars a month and pays 1000 dollars (average rate 5%); B earns 40000 dollars and pays 4000 dollars (average rate 10%). The average rate rises with income, so the tax is progressive. If both paid 10%, it would be proportional.',
      tip: 'To tell progressive from regressive, check whether the average tax rate rises or falls with income.',
      mistake: 'A common mistake is to call any tax progressive just because the tax bill is larger at higher income. What matters is whether the average tax rate rises.',
      glossary: [
        { term: 'Direct tax', def: 'A tax borne directly by the taxpayer, such as salaries tax.' },
        { term: 'Indirect tax', def: 'A tax shifted through the price of a good, such as a tobacco duty.' },
        { term: 'Progressive tax', def: 'A tax whose average rate rises with income.' }
      ]
    }
  },

  's2.tax_progressive': {
    zh: {
      intro: '累進稅制把應稅收入分為多個稅階，每個稅階按不同稅率課稅，不是把全部收入乘以最高稅率。平均稅率 = 稅款 ÷ 應稅收入，即 $T ÷ Y$；邊際稅率是多賺一元所適用的稅率。',
      example: '稅階：首 50000 元 2%、之後 50000 元 6%、其餘 10%。應稅收入 120000 元：稅款 = 50000 × 0.02 + 50000 × 0.06 + 20000 × 0.10 = 1000 + 3000 + 2000 = 6000 元；平均稅率 = 6000 ÷ 120000 = 5%，邊際稅率 = 10%。',
      tip: '分段計算，切勿把全部收入乘以最高稅率。',
      mistake: '常見錯誤：把 120000 × 10% = 12000 元當作稅款。正確是分段計算，稅款只有 6000 元。',
      glossary: [
        { term: '累進稅', def: '平均稅率隨收入上升的稅制。' },
        { term: '平均稅率', def: '稅款佔應稅收入的比例。' },
        { term: '邊際稅率', def: '多賺一元所適用的稅率。' }
      ],
      steps: [
        '列出各稅階的收入範圍和稅率。',
        '逐段計算每段稅款。',
        '把各段稅款相加，得出總稅款。',
        '平均稅率 = 稅款 ÷ 應稅收入；邊際稅率 = 多賺一元所適用的稅率。'
      ]
    },
    en: {
      intro: 'A progressive tax system divides taxable income into brackets, each taxed at its own rate; the whole income is not taxed at the top rate. The average tax rate is tax payable ÷ taxable income, or $T ÷ Y$, while the marginal tax rate is the rate applied to one more dollar of income.',
      example: 'Brackets: first 50000 dollars at 2%, next 50000 at 6%, the rest at 10%. Taxable income of 120000 dollars gives tax = 50000 × 0.02 + 50000 × 0.06 + 20000 × 0.10 = 1000 + 3000 + 2000 = 6000 dollars. The average rate is 6000 ÷ 120000 = 5% and the marginal rate is 10%.',
      tip: 'Tax each bracket separately; never multiply all income by the top rate.',
      mistake: 'A common mistake is to take 120000 × 10% = 12000 dollars as the tax. Taxing bracket by bracket gives only 6000 dollars.',
      glossary: [
        { term: 'Progressive tax', def: 'A tax whose average rate rises with income.' },
        { term: 'Average tax rate', def: 'Tax payable as a proportion of taxable income.' },
        { term: 'Marginal tax rate', def: 'The tax rate applied to one more dollar of income.' }
      ],
      steps: [
        'List the income range and rate of each bracket.',
        'Calculate the tax on each bracket separately.',
        'Add the bracket taxes to get total tax payable.',
        'Average rate = tax ÷ taxable income; marginal rate = the rate on one more dollar of income.'
      ]
    }
  },

  's2.fiscal_budget': {
    zh: {
      intro: '財政預算記錄政府一年的收入與支出。收入大於支出是盈餘，支出大於收入是赤字。赤字要靠借貸（發債）或動用儲備填補，長期赤字會令公共債務增加。',
      example: '假設政府收入 5800 百萬元、支出 6300 百萬元，赤字 = 6300 − 5800 = 500 百萬元。若支出中利息佔 100 百萬元，基本盈餘 = −500 + 100 = −400 百萬元，即基本赤字 400 百萬元。',
      tip: '先分正負：收入大於支出是盈餘，支出大於收入是赤字。',
      mistake: '常見錯誤：把「赤字」和「債務」混淆。赤字是某一年收支的差額，債務是累積未還的借款。',
      glossary: [
        { term: '財政盈餘', def: '政府收入大於支出。' },
        { term: '財政赤字', def: '政府支出大於收入。' },
        { term: '公共債務', def: '政府累積未償還的借款。' }
      ],
      steps: [
        '計算收入 − 支出。',
        '正數是盈餘，負數是赤字。',
        '基本盈餘 = 盈餘 + 利息支出。',
        '赤字需要借貸或動用儲備，令債務增加。'
      ]
    },
    en: {
      intro: 'A fiscal budget records the revenue and spending of a government for a year. Revenue above spending is a surplus; spending above revenue is a deficit. A deficit must be financed by borrowing (issuing bonds) or using reserves, and persistent deficits raise public debt.',
      example: 'Suppose revenue is 5800 million dollars and spending 6300 million dollars; the deficit is 6300 − 5800 = 500 million dollars. If interest payments are 100 million dollars, the primary balance is −500 + 100 = −400 million dollars, that is a primary deficit of 400 million dollars.',
      tip: 'Watch the sign: revenue above spending is a surplus; spending above revenue is a deficit.',
      mistake: 'A common mistake is to confuse a deficit with debt. A deficit is one year\'s balance; debt is the accumulated borrowing not yet repaid.',
      glossary: [
        { term: 'Budget surplus', def: 'Government revenue exceeds spending.' },
        { term: 'Budget deficit', def: 'Government spending exceeds revenue.' },
        { term: 'Public debt', def: 'The total borrowing a government has not yet repaid.' }
      ],
      steps: [
        'Calculate revenue − spending.',
        'A positive number is a surplus; a negative number is a deficit.',
        'Primary balance = budget balance + interest payments.',
        'A deficit must be financed by borrowing or reserves, so debt rises.'
      ]
    }
  },

  's2.gdp': {
    zh: {
      intro: '本地生產總值（GDP）是一年內一個經濟體生產的最終物品和服務的市場價值。支出法把私人消費、投資、政府支出和淨出口相加：$GDP = C + I + G + X − M$。以當期價格計是名義 GDP，剔除物價變動後是實質 GDP。',
      example: 'C = 12000、I = 4000、G = 3000、X = 5000、M = 4500（百萬元）：GDP = 12000 + 4000 + 3000 + 5000 − 4500 = 19500 百萬元。',
      tip: '只計最終物品；中間物品、二手交易和轉移支付不計入 GDP。',
      mistake: '常見錯誤：把進口當作加項。進口要在 GDP 中減去，所以淨出口可以是負數。',
      glossary: [
        { term: '本地生產總值', def: '一年內一個經濟體生產的最終物品和服務的市場價值。' },
        { term: '最終物品', def: '直接供消費者或使用者使用，不再加工轉售的物品。' },
        { term: '淨出口', def: '出口減進口。' }
      ],
      steps: [
        '分辨 C、I、G、X、M 各項。',
        '代入 GDP = C + I + G + X − M。',
        '先加出口，再減進口。',
        '檢查單位（例如百萬元）和是否只計最終物品。'
      ]
    },
    en: {
      intro: 'Gross Domestic Product (GDP) is the market value of all final goods and services produced in an economy in a year. The expenditure approach adds consumption, investment, government spending and net exports: $GDP = C + I + G + X − M$. Measured at current prices it is nominal GDP; after removing price changes it is real GDP.',
      example: 'With C = 12000, I = 4000, G = 3000, X = 5000 and M = 4500 (million dollars), GDP = 12000 + 4000 + 3000 + 5000 − 4500 = 19500 million dollars.',
      tip: 'Count final goods only; intermediate goods, second-hand sales and transfer payments are not in GDP.',
      mistake: 'A common mistake is to add imports. Imports must be subtracted, so net exports can be negative.',
      glossary: [
        { term: 'GDP', def: 'The market value of all final goods and services produced in an economy in a year.' },
        { term: 'Final goods', def: 'Goods bought for final use, not for resale or further processing.' },
        { term: 'Net exports', def: 'Exports minus imports.' }
      ],
      steps: [
        'Identify C, I, G, X and M.',
        'Substitute into GDP = C + I + G + X − M.',
        'Add exports first, then subtract imports.',
        'Check the unit (for example million dollars) and count final goods only.'
      ]
    }
  },

  's2.growth': {
    zh: {
      intro: '經濟增長率是新舊產量的百分比變化，公式為 $(Y2 − Y1) ÷ Y1$，其中 Y2 是新值、Y1 是舊值。人均 GDP = GDP ÷ 人口；比較不同年份要用實質 GDP 剔除物價變動。',
      example: '去年 GDP 20000 百萬元，今年 21000 百萬元，增長率 = $(21000 − 20000) ÷ 20000 = 0.05$，即 5%。若人口同時增加 2%，人均 GDP 增長約 5% − 2% = 3%。',
      tip: '增長率的分母是舊值；比較生活水平要看人均實質 GDP。',
      mistake: '常見錯誤：把名義 GDP 增長當成生活改善。若物價同時大升，實質增長可能很小。',
      glossary: [
        { term: '經濟增長', def: '經濟體產量的增加。' },
        { term: '人均 GDP', def: 'GDP 除以人口。' },
        { term: '實質 GDP', def: '剔除物價變動後的 GDP。' }
      ],
      steps: [
        '找出新值和舊值。',
        '增長率 = (新值 − 舊值) ÷ 舊值 × 100%。',
        '人均 GDP = GDP ÷ 人口。',
        '比較不同年份時用實質 GDP。'
      ]
    },
    en: {
      intro: 'The economic growth rate is the percentage change in output: $(Y2 − Y1) ÷ Y1$, where Y2 is the new value and Y1 the old value. GDP per capita = GDP ÷ population; to compare years, use real GDP to remove price changes.',
      example: 'GDP was 20000 million dollars last year and 21000 million dollars this year, so growth is $(21000 − 20000) ÷ 20000 = 0.05$, or 5%. If population also grows by 2%, GDP per capita grows by about 5% − 2% = 3%.',
      tip: 'Use the old value as the denominator; compare living standards with real GDP per capita.',
      mistake: 'A common mistake is to treat nominal GDP growth as a rise in living standards. If prices also jump, real growth may be small.',
      glossary: [
        { term: 'Economic growth', def: 'An increase in the output of an economy.' },
        { term: 'GDP per capita', def: 'GDP divided by population.' },
        { term: 'Real GDP', def: 'GDP adjusted for price changes.' }
      ],
      steps: [
        'Identify the new value and the old value.',
        'Growth rate = (new − old) ÷ old × 100%.',
        'GDP per capita = GDP ÷ population.',
        'Use real GDP when comparing years.'
      ]
    }
  },

  's2.unemployment': {
    zh: {
      intro: '勞動人口 = 就業人口 + 失業人口；失業率 = 失業人口 ÷ 勞動人口；勞動參與率 = 勞動人口 ÷ 工作年齡人口。失業分為摩擦性、結構性和週期性。',
      example: '某地就業 350 萬人、失業 15 萬人，勞動人口 = 365 萬人，失業率 = 15 ÷ 365 = 0.041，即約 4.1%。若工作年齡人口 600 萬人，參與率 = 365 ÷ 600 = 0.608，即約 60.8%。',
      tip: '失業率的分母是勞動人口，不是總人口；退休人士和全職學生不算失業。',
      mistake: '常見錯誤：把所有沒有工作的人都當作失業。沒有工作但沒有積極找工作（如退休）不算失業。',
      glossary: [
        { term: '失業率', def: '失業人口佔勞動人口的比例。' },
        { term: '勞動人口', def: '就業人口加上正在找工作的失業人口。' },
        { term: '勞動參與率', def: '勞動人口佔工作年齡人口的比例。' }
      ],
      steps: [
        '勞動人口 = 就業人口 + 失業人口。',
        '失業率 = 失業人口 ÷ 勞動人口 × 100%。',
        '勞動參與率 = 勞動人口 ÷ 工作年齡人口 × 100%。',
        '留意分母是勞動人口，不是總人口。'
      ]
    },
    en: {
      intro: 'The labour force = employed + unemployed. The unemployment rate = unemployed ÷ labour force, and the participation rate = labour force ÷ working-age population. Unemployment can be frictional, structural or cyclical.',
      example: 'With 3.5 million employed and 150000 unemployed, the labour force is 3.65 million, so the unemployment rate is 150000 ÷ 3650000 = 0.041, about 4.1%. With a working-age population of 6 million, the participation rate is 3.65 ÷ 6 = 0.608, about 60.8%.',
      tip: 'The unemployment rate divides by the labour force, not the total population; retired people and full-time students are not unemployed.',
      mistake: 'A common mistake is to count everyone without a job as unemployed. People without a job who are not actively looking, such as retirees, are not unemployed.',
      glossary: [
        { term: 'Unemployment rate', def: 'The unemployed as a proportion of the labour force.' },
        { term: 'Labour force', def: 'The employed plus the unemployed who are looking for work.' },
        { term: 'Participation rate', def: 'The labour force as a proportion of the working-age population.' }
      ],
      steps: [
        'Labour force = employed + unemployed.',
        'Unemployment rate = unemployed ÷ labour force × 100%.',
        'Participation rate = labour force ÷ working-age population × 100%.',
        'Check that the denominator is the labour force, not the total population.'
      ]
    }
  },

  's2.inflation': {
    zh: {
      intro: '消費物價指數（CPI）量度一籃子固定物品的價格水平。通脹率 = (CPI 新 − CPI 舊) ÷ CPI 舊，即 $(CPI2 − CPI1) ÷ CPI1$；通脹令金錢購買力下降，實質利率約等於名義利率減通脹率。',
      example: 'CPI 由 100 升至 105，通脹率 = (105 − 100) ÷ 100 = 0.05，即 5%。若名義利率 3%，實質利率約 3% − 5% = −2%，存款購買力下降。',
      tip: '比較不同年份的收入或工資時，要換算成實質值（剔除通脹）。',
      mistake: '常見錯誤：以為通脹代表所有物價都上升。CPI 是平均物價，個別物品價格可升可跌。',
      glossary: [
        { term: '消費物價指數', def: '量度一籃子固定消費品價格水平的指數。' },
        { term: '通脹', def: '物價水平持續上升。' },
        { term: '實質利率', def: '名義利率扣除通脹後的利率。' }
      ],
      steps: [
        '找出新舊 CPI。',
        '通脹率 = (新 CPI − 舊 CPI) ÷ 舊 CPI × 100%。',
        '實質利率約 = 名義利率 − 通脹率。',
        '判斷購買力上升還是下降。'
      ]
    },
    en: {
      intro: 'The Consumer Price Index (CPI) measures the price level of a fixed basket of goods. The inflation rate = (new CPI − old CPI) ÷ old CPI, or $(CPI2 − CPI1) ÷ CPI1$. Inflation reduces the purchasing power of money, and the real interest rate is approximately the nominal interest rate minus inflation.',
      example: 'With CPI rising from 100 to 105, inflation is (105 − 100) ÷ 100 = 0.05, or 5%. If the nominal interest rate is 3%, the real interest rate is about 3% − 5% = −2%, so savings lose purchasing power.',
      tip: 'When comparing incomes or wages across years, convert them into real terms by removing inflation.',
      mistake: 'A common mistake is to think inflation means every price rises. The CPI is an average, so individual prices can rise or fall.',
      glossary: [
        { term: 'CPI', def: 'An index measuring the price level of a fixed basket of consumer goods.' },
        { term: 'Inflation', def: 'A sustained rise in the general price level.' },
        { term: 'Real interest rate', def: 'The nominal interest rate minus inflation.' }
      ],
      steps: [
        'Identify the new and old CPI.',
        'Inflation rate = (new CPI − old CPI) ÷ old CPI × 100%.',
        'Real interest rate is approximately nominal rate − inflation rate.',
        'Decide whether purchasing power rises or falls.'
      ]
    }
  }
});

EconData.addLessons({
  's3.china_economy': {
    zh: {
      intro: '國家經濟規模龐大，產業包括農業、製造業和服務業。改革開放、工業化、城鎮化、基建和科技發展是主要增長動力；香港是國際金融、貿易和航運中心，與內地經貿往來密切。',
      example: '假設某國 GDP 中農業佔 8%、製造業佔 40%、服務業佔 52%，三者相加剛好 100%。服務業比重上升即經濟結構轉型，人均收入通常隨生產力提高而上升。',
      tip: '比較不同國家的經濟，要用人均 GDP，因為人口規模不同。',
      mistake: '常見錯誤：以為 GDP 總量大就代表人民生活水平高。還要看人均 GDP 和收入分配。',
      glossary: [
        { term: '本地生產總值', def: '一年內一個國家生產的最終物品和服務的市場價值。' },
        { term: '經濟結構', def: '各產業佔整體經濟的比重。' },
        { term: '城鎮化', def: '人口由鄉村遷移到城市、城市人口比重上升的過程。' }
      ]
    },
    en: {
      intro: 'The national economy is large, with agriculture, manufacturing and services. Reform and opening up, industrialisation, urbanisation, infrastructure and technology are major growth drivers. Hong Kong is an international financial, trade and shipping centre with close economic links to the mainland.',
      example: 'Suppose an economy has 8% of GDP from agriculture, 40% from manufacturing and 52% from services, which add up to 100%. A rising services share reflects structural change, and income per person usually rises with productivity.',
      tip: 'Compare countries using GDP per capita, because their populations differ in size.',
      mistake: 'A common mistake is to assume a large GDP means a high living standard. GDP per capita and income distribution also matter.',
      glossary: [
        { term: 'GDP', def: 'The market value of final goods and services produced in a country in a year.' },
        { term: 'Economic structure', def: 'The shares of different industries in the economy.' },
        { term: 'Urbanisation', def: 'The movement of people from rural areas to cities.' }
      ]
    }
  },

  's3.trade': {
    zh: {
      intro: '比較優勢是生產某物品時機會成本較低。即使一方樣樣都較強，按比較優勢分工再生產並貿易，雙方仍可得益。絕對優勢指產量較高，並不等於比較優勢。',
      example: '甲國生產 1 部手機的機會成本是 2 部電腦，乙國是 4 部電腦，所以甲國在手機有比較優勢。乙國生產 1 部電腦的機會成本是 0.25 部手機，低於甲國的 0.5 部，所以乙國應生產電腦。',
      tip: '比較優勢看機會成本較低，不是產量較多。',
      mistake: '常見錯誤：以為有絕對優勢的國家不需要貿易。按比較優勢分工，雙方仍能互惠。',
      glossary: [
        { term: '比較優勢', def: '生產某物品的機會成本較低。' },
        { term: '絕對優勢', def: '用同樣資源能生產較多產量。' },
        { term: '專業化', def: '集中生產自己較擅長的物品。' }
      ],
      steps: [
        '計算各國生產 1 單位物品的機會成本。',
        '機會成本較低的一方在該物品有比較優勢。',
        '各方專門生產有比較優勢的物品。',
        '貿易後總產量增加，雙方都能得益。'
      ]
    },
    en: {
      intro: 'Comparative advantage means producing a good at a lower opportunity cost. Even if one country is better at everything, specialising according to comparative advantage and then trading still benefits both sides. Absolute advantage means higher output, which is not the same as comparative advantage.',
      example: 'Country A gives up 2 computers to make 1 phone, while Country B gives up 4, so A has a comparative advantage in phones. B gives up only 0.25 phone to make 1 computer against 0.5 in A, so B should make computers.',
      tip: 'Comparative advantage is about lower opportunity cost, not higher output.',
      mistake: 'A common mistake is to think a country with absolute advantage in everything does not need trade. Specialising by comparative advantage still benefits both sides.',
      glossary: [
        { term: 'Comparative advantage', def: 'Producing a good at a lower opportunity cost.' },
        { term: 'Absolute advantage', def: 'Producing more output with the same resources.' },
        { term: 'Specialisation', def: 'Concentrating on producing the goods one is relatively better at.' }
      ],
      steps: [
        'Calculate each country opportunity cost of producing one unit.',
        'The country with the lower opportunity cost has a comparative advantage.',
        'Each country specialises in its comparative-advantage good.',
        'After trade, total output rises and both sides gain.'
      ]
    }
  },

  's3.globalisation': {
    zh: {
      intro: '全球化是商品、資金、資訊和人才跨國流動增加的過程。成因包括運輸和通訊成本下降、貿易壁壘減少，以及跨國企業擴張。',
      example: '一部智能手機的零件來自多個國家，在另一國組裝，再賣到全球，這就是全球價值鏈；跨國企業藉此降低成本、擴大市場。',
      tip: '分析全球化利弊時，要同時考慮效率提升和對不同群體的分配影響。',
      mistake: '常見錯誤：以為全球化只有好處或只有壞處。它提高效率，但也可能令部分低技術工人的職位外移。',
      glossary: [
        { term: '全球化', def: '商品、資金、資訊和人才跨國流動增加的過程。' },
        { term: '跨國企業', def: '在多個國家設廠生產和銷售的企業。' },
        { term: '全球價值鏈', def: '生產工序分散到不同國家完成的生產網絡。' }
      ]
    },
    en: {
      intro: 'Globalisation is the growing cross-border flow of goods, capital, information and people. Causes include falling transport and communication costs, fewer trade barriers and the expansion of multinational corporations.',
      example: 'A smartphone may use parts from several countries, be assembled in another country and then sold worldwide. This is a global value chain, which multinationals use to cut costs and reach larger markets.',
      tip: 'When weighing globalisation, consider both efficiency gains and how they are distributed among different groups.',
      mistake: 'A common mistake is to see globalisation as all good or all bad. It raises efficiency but can also move some low-skilled jobs abroad.',
      glossary: [
        { term: 'Globalisation', def: 'The growing cross-border flow of goods, capital, information and people.' },
        { term: 'Multinational corporation', def: 'A firm that produces and sells in several countries.' },
        { term: 'Global value chain', def: 'A production network with stages spread across countries.' }
      ]
    }
  },

  's3.exchange_rate': {
    zh: {
      intro: '匯率是兩種貨幣的交換比率。若報價是「每 1 單位外幣兌多少本幣」，數字上升代表外幣升值、本幣貶值。升值或貶值百分比 = (新匯率 − 舊匯率) ÷ 舊匯率，即 $(E2 − E1) ÷ E1$。',
      example: '每 1 美元兌 7.8 港元時，200 美元可兌 200 × 7.8 = 1560 港元；若匯率升至 7.9，可兌 200 × 7.9 = 1580 港元，多 20 港元。美元升值 (7.9 − 7.8) ÷ 7.8 = 0.0128，即約 1.3%。',
      tip: '先寫清楚報價方向，再判斷哪種貨幣升值。',
      mistake: '常見錯誤：把「外幣升值」和「本幣升值」混淆。美元兌港元由 7.8 升至 7.9，是美元升值、港元相對貶值。',
      glossary: [
        { term: '匯率', def: '兩種貨幣的交換比率。' },
        { term: '升值', def: '一種貨幣可兌換更多外幣。' },
        { term: '貶值', def: '一種貨幣可兌換更少外幣。' }
      ],
      steps: [
        '確定報價方向（1 單位外幣兌多少本幣）。',
        '兌換金額 = 外幣金額 × 匯率。',
        '變動百分比 = (新匯率 − 舊匯率) ÷ 舊匯率 × 100%。',
        '判斷哪種貨幣升值、哪種貶值。'
      ]
    },
    en: {
      intro: 'An exchange rate is the price of one currency in terms of another. If the quote is units of local currency per 1 unit of foreign currency, a higher number means the foreign currency appreciates and the local currency depreciates. Appreciation or depreciation = (new rate − old rate) ÷ old rate, or $(E2 − E1) ÷ E1$.',
      example: 'At HKD 7.8 per US dollar, 200 US dollars buy 200 × 7.8 = 1560 HK dollars. If the rate rises to 7.9, they buy 200 × 7.9 = 1580 HK dollars, 20 dollars more. The US dollar appreciates by (7.9 − 7.8) ÷ 7.8 = 0.0128, about 1.3%.',
      tip: 'State the direction of the quote first, then decide which currency appreciates.',
      mistake: 'A common mistake is to confuse foreign currency appreciation with local currency appreciation. When the rate moves from 7.8 to 7.9 HKD per US dollar, the US dollar appreciates and the HK dollar depreciates.',
      glossary: [
        { term: 'Exchange rate', def: 'The price of one currency in terms of another.' },
        { term: 'Appreciation', def: 'A currency buys more foreign currency.' },
        { term: 'Depreciation', def: 'A currency buys less foreign currency.' }
      ],
      steps: [
        'Identify the direction of the quote (local currency per 1 foreign unit).',
        'Amount exchanged = foreign currency × exchange rate.',
        'Percentage change = (new rate − old rate) ÷ old rate × 100%.',
        'Decide which currency appreciates and which depreciates.'
      ]
    }
  },

  's3.trade_policy': {
    zh: {
      intro: '關稅是對進口貨物徵收的稅，令進口價格上升、進口量減少；配額則直接限制進口數量。保護政策令本地生產者得益、消費者付更高價格，並可能造成無謂損失。',
      example: '某進口貨世界價格 100 元，關稅 20%，進口價升至 100 × 1.2 = 120 元，每件多付 20 元。若進口 10000 件，關稅收入 = 20 × 10000 = 200000 元。',
      tip: '分析關稅要由價格、進口量、消費者、生產者、政府收入和效率六方面入手。',
      mistake: '常見錯誤：以為關稅全由外國生產者負擔。實際上部分或全部稅負會轉嫁給本地消費者。',
      glossary: [
        { term: '關稅', def: '對進口貨物徵收的稅。' },
        { term: '配額', def: '對進口數量的直接限制。' },
        { term: '無謂損失', def: '因資源沒有用在最有價值的地方而損失的社會盈餘。' }
      ],
      steps: [
        '關稅後價格 = 世界價格 + 關稅（或 × (1 + 從價稅率)）。',
        '價格上升令進口量減少、本地生產增加。',
        '關稅收入 = 每件稅額 × 進口量。',
        '比較消費者、生產者、政府和效率的得失。'
      ]
    },
    en: {
      intro: 'A tariff is a tax on imports that raises their price and reduces import quantity; a quota directly limits import quantity. Protection helps domestic producers but makes consumers pay more and may create deadweight loss.',
      example: 'An imported good has a world price of 100 dollars. A 20% tariff raises the import price to 100 × 1.2 = 120 dollars, so buyers pay 20 dollars more per unit. With 10000 units imported, tariff revenue is 20 × 10000 = 200000 dollars.',
      tip: 'Analyse a tariff through price, import quantity, consumers, producers, government revenue and efficiency.',
      mistake: 'A common mistake is to think foreign producers bear the whole tariff. In practice part or all of the tax burden is passed on to local consumers.',
      glossary: [
        { term: 'Tariff', def: 'A tax on imported goods.' },
        { term: 'Quota', def: 'A direct limit on the quantity imported.' },
        { term: 'Deadweight loss', def: 'Lost total surplus because resources are not used where they are valued most.' }
      ],
      steps: [
        'Price after tariff = world price + tariff (or × (1 + ad valorem rate)).',
        'The higher price reduces imports and raises domestic output.',
        'Tariff revenue = tax per unit × quantity imported.',
        'Compare the gains and losses of consumers, producers, the government and efficiency.'
      ]
    }
  },

  's3.balance_payments': {
    zh: {
      intro: '國際收支記錄一經濟體與世界各地的交易，主要分為經常帳和資本及金融帳。經常帳包括貨物和服務淨出口、收入淨額和轉移淨額。',
      example: '貨物出口 5000、進口 4500、服務淨出口 300、收入淨額 100、轉移淨額 −50（百萬元）：經常帳 = 5000 − 4500 + 300 + 100 − 50 = 850 百萬元，是盈餘。',
      tip: '出口、收入流入和轉移流入為正；進口和流出為負，逐項寫清正負號。',
      mistake: '常見錯誤：以為經常帳只計貨物貿易。服務、投資收入和轉移也是經常帳的組成部分。',
      glossary: [
        { term: '國際收支', def: '記錄一經濟體與世界各地所有交易的帳目。' },
        { term: '經常帳', def: '記錄貨物、服務、收入和轉移的對外交易。' },
        { term: '貨物貿易差額', def: '貨物出口減貨物進口。' }
      ],
      steps: [
        '貨物貿易差額 = 貨物出口 − 貨物進口。',
        '加上服務淨出口。',
        '加上收入淨額和轉移淨額。',
        '正數是盈餘，負數是赤字。'
      ]
    },
    en: {
      intro: 'The balance of payments records the transactions of an economy with the rest of the world, mainly the current account and the capital and financial account. The current account covers net exports of goods and services, net income and net transfers.',
      example: 'Goods exports 5000, goods imports 4500, net services exports 300, net income 100 and net transfers −50 (million dollars). The current account is 5000 − 4500 + 300 + 100 − 50 = 850 million dollars, a surplus.',
      tip: 'Exports, income inflows and transfer inflows are positive; imports and outflows are negative, so track each sign.',
      mistake: 'A common mistake is to think the current account covers goods only. Services, investment income and transfers are also parts of it.',
      glossary: [
        { term: 'Balance of payments', def: 'The record of all transactions between an economy and the rest of the world.' },
        { term: 'Current account', def: 'The record of trade in goods and services, income and transfers.' },
        { term: 'Trade balance', def: 'Goods exports minus goods imports.' }
      ],
      steps: [
        'Goods trade balance = goods exports − goods imports.',
        'Add net exports of services.',
        'Add net income and net transfers.',
        'A positive total is a surplus; a negative total is a deficit.'
      ]
    }
  },

  's3.economic_systems': {
    zh: {
      intro: '所有經濟體系都要回答三個基本問題：生產甚麼、怎樣生產、為誰生產。市場經濟靠價格和私人生產決定；計劃經濟由政府指令；混合經濟兩者兼有。',
      example: '茶餐廳見奶茶受歡迎便加價和增產，是價格信號引導生產；政府提供教育和醫療，則是混合經濟中政府負責的部分。香港屬高度市場導向的混合經濟。',
      tip: '用「誰作決定、靠甚麼機制」來分辨市場、計劃和混合經濟。',
      mistake: '常見錯誤：以為市場經濟完全沒有政府。現實中的市場經濟也有政府提供法律、國防和公共服務。',
      glossary: [
        { term: '市場經濟', def: '主要由價格和私人生產決定資源分配的經濟體系。' },
        { term: '計劃經濟', def: '主要由政府指令決定生產和分配的經濟體系。' },
        { term: '混合經濟', def: '市場機制與政府干預並存的經濟體系。' }
      ]
    },
    en: {
      intro: 'Every economy must answer three basic questions: what to produce, how to produce and for whom to produce. A market economy relies on prices and private producers; a planned economy relies on government directives; a mixed economy combines both.',
      example: 'When a cha chaan teng sees strong demand for milk tea, it raises the price and produces more, so the price signal guides production. The government provides education and healthcare, the public part of a mixed economy. Hong Kong is a highly market-oriented mixed economy.',
      tip: 'Use who decides and through what mechanism to tell market, planned and mixed economies apart.',
      mistake: 'A common mistake is to think a market economy has no government. Real market economies still have government providing law, defence and public services.',
      glossary: [
        { term: 'Market economy', def: 'An economy where prices and private producers mainly allocate resources.' },
        { term: 'Planned economy', def: 'An economy where government directives mainly decide production and distribution.' },
        { term: 'Mixed economy', def: 'An economy combining market forces with government intervention.' }
      ]
    }
  },

  's3.development': {
    zh: {
      intro: '經濟增長是產量增加（GDP 上升）；經濟發展還包括生活水平、教育、健康、環境和收入分配的改善。可持續發展是滿足當代需要而不損害後代滿足其需要的能力。',
      example: '兩地人均 GDP 都上升 10%，但甲地污染加劇、入學率下降，乙地環境改善、入學率上升，則乙地的經濟發展較佳。人類發展指數（HDI）綜合收入、教育和健康。',
      tip: '增長是「量」，發展是「質」；比較發展要看多個指標。',
      mistake: '常見錯誤：把 GDP 增長等同經濟發展。發展還包括分配、環境和生活質素。',
      glossary: [
        { term: '經濟發展', def: '生活水平、教育、健康和分配等多方面的改善。' },
        { term: '可持續發展', def: '滿足當代需要，而不損害後代滿足其需要的能力。' },
        { term: '人類發展指數', def: '綜合收入、教育和健康以量度發展的指標。' }
      ]
    },
    en: {
      intro: 'Economic growth is a rise in output (GDP). Economic development also includes better living standards, education, health, the environment and income distribution. Sustainable development meets present needs without harming the ability of future generations to meet theirs.',
      example: 'Two places both raise GDP per capita by 10%. If one has worse pollution and falling school enrolment while the other improves both, the second has better economic development. The Human Development Index (HDI) combines income, education and health.',
      tip: 'Growth is about quantity; development is about quality. Compare development with several indicators.',
      mistake: 'A common mistake is to equate GDP growth with economic development. Development also covers distribution, the environment and quality of life.',
      glossary: [
        { term: 'Economic development', def: 'Improvements in living standards, education, health and distribution.' },
        { term: 'Sustainable development', def: 'Meeting present needs without harming the ability of future generations to meet theirs.' },
        { term: 'Human Development Index', def: 'An indicator combining income, education and health.' }
      ]
    }
  }
});

EconData.addBanks({
  's1.money': [
    {
      id: 'money1',
      prompt: { zh: '在茶餐廳用八達通付款，主要體現金錢的哪一項功能？', en: 'Paying at a cha chaan teng with an Octopus card mainly shows which function of money?' },
      choices: [
        { id: 'a', zh: '交易媒介', en: 'Medium of exchange' },
        { id: 'b', zh: '計價單位', en: 'Unit of account' },
        { id: 'c', zh: '價值儲存', en: 'Store of value' },
        { id: 'd', zh: '延遲支付的標準', en: 'Standard of deferred payment' }
      ],
      answer: 'a',
      hint: { zh: '付款是即時用金錢交換物品。', en: 'Paying exchanges money for goods immediately.' },
      solution: {
        zh: ['八達通付款是即時用金錢交換食物，屬交易媒介。', '計價單位是餐牌上的標價，價值儲存是把購買力保存，延遲支付是日後才付款，故選 a。'],
        en: ['Paying with an Octopus card exchanges money for food immediately, so it is a medium of exchange.', 'A unit of account is the menu price, a store of value keeps purchasing power, and deferred payment is paying later, so a.']
      }
    },
    {
      id: 'money2',
      prompt: { zh: '餐牌上「奶茶 22 元」的標價，體現金錢的哪一項功能？', en: 'A menu price of 22 dollars for milk tea shows which function of money?' },
      choices: [
        { id: 'a', zh: '交易媒介', en: 'Medium of exchange' },
        { id: 'b', zh: '計價單位', en: 'Unit of account' },
        { id: 'c', zh: '價值儲存', en: 'Store of value' },
        { id: 'd', zh: '延遲支付的標準', en: 'Standard of deferred payment' }
      ],
      answer: 'b',
      hint: { zh: '標價是用同一單位表示價值，方便比較。', en: 'A price tag uses a common unit to compare values.' },
      solution: {
        zh: ['標價用同一單位表示物品的價值，方便比較，屬計價單位。', '付款才是交易媒介，把購買力保存是價值儲存，故選 b。'],
        en: ['A price tag expresses value in a common unit so that values can be compared, which is the unit of account.', 'Paying is the medium of exchange and keeping purchasing power is the store of value, so b.']
      }
    },
    {
      id: 'money3',
      prompt: { zh: '把 5000 元存入銀行，留待兩年後旅行使用，主要體現哪項功能？', en: 'Depositing 5000 dollars in a bank for a trip in two years mainly shows which function?' },
      choices: [
        { id: 'a', zh: '交易媒介', en: 'Medium of exchange' },
        { id: 'b', zh: '計價單位', en: 'Unit of account' },
        { id: 'c', zh: '價值儲存', en: 'Store of value' },
        { id: 'd', zh: '延遲支付的標準', en: 'Standard of deferred payment' }
      ],
      answer: 'c',
      hint: { zh: '存款的目的是把購買力留到未來。', en: 'The purpose is to keep purchasing power for the future.' },
      solution: {
        zh: ['存款把購買力保存到日後使用，屬價值儲存。', '標價是計價單位，即時付款是交易媒介，故選 c。'],
        en: ['The deposit keeps purchasing power for later use, which is the store of value.', 'A price tag is the unit of account and immediate payment is the medium of exchange, so c.']
      }
    },
    {
      id: 'money4',
      prompt: { zh: '你與同學約定下個月才付 300 元飯錢，這體現金錢的哪項功能？', en: 'You agree with a classmate to pay 300 dollars for a meal next month. Which function of money is shown?' },
      choices: [
        { id: 'a', zh: '交易媒介', en: 'Medium of exchange' },
        { id: 'b', zh: '計價單位', en: 'Unit of account' },
        { id: 'c', zh: '價值儲存', en: 'Store of value' },
        { id: 'd', zh: '延遲支付的標準', en: 'Standard of deferred payment' }
      ],
      answer: 'd',
      hint: { zh: '金錢用作日後清還債務的標準。', en: 'Money is used as the standard for settling a debt later.' },
      solution: {
        zh: ['約定下月付款，金錢成為日後清還債務的標準，屬延遲支付。', '即時付款才是交易媒介，故選 d。'],
        en: ['Promising to pay next month uses money as the standard for settling a debt later, so it is the standard of deferred payment.', 'Immediate payment would be the medium of exchange, so d.']
      }
    },
    {
      id: 'money5',
      prompt: { zh: '沒有金錢而以物易物，交易最大的困難是甚麼？', en: 'Without money and using barter, what is the biggest difficulty in trading?' },
      choices: [
        { id: 'a', zh: '以物易物一定要用金錢', en: 'Barter requires money' },
        { id: 'b', zh: '需要雙方剛好都想得到對方的物品', en: 'Both sides must happen to want what the other offers' },
        { id: 'c', zh: '以物易物不需要雙方同意', en: 'Barter needs no agreement between the two sides' },
        { id: 'd', zh: '物品不能保存', en: 'Goods cannot be stored' }
      ],
      answer: 'b',
      hint: { zh: '這叫「需求的雙重巧合」。', en: 'This is called the double coincidence of wants.' },
      solution: {
        zh: ['以物易物要雙方都想要對方的物品，即需求的雙重巧合，這很難同時出現。', '以物易物不需金錢，但必須雙方同意；保存期限只是次要問題，故選 b。'],
        en: ['Barter needs both sides to want what the other offers, the double coincidence of wants, which is rarely present.', 'Barter needs no money but does need agreement, and storage is only a secondary problem, so b.']
      }
    },
    {
      id: 'money6',
      prompt: { zh: '以下哪一項不是金錢的功能？', en: 'Which of the following is NOT a function of money?' },
      choices: [
        { id: 'a', zh: '交易媒介', en: 'Medium of exchange' },
        { id: 'b', zh: '計價單位', en: 'Unit of account' },
        { id: 'c', zh: '保證物價上升', en: 'Guaranteeing that prices rise' },
        { id: 'd', zh: '價值儲存', en: 'Store of value' }
      ],
      answer: 'c',
      hint: { zh: '金錢不能保證物價走勢。', en: 'Money cannot guarantee the direction of prices.' },
      solution: {
        zh: ['金錢不能保證物價上升；通脹時金錢的購買力反而下降。', '交易媒介、計價單位和價值儲存都是金錢的功能，故選 c。'],
        en: ['Money cannot guarantee rising prices; during inflation its purchasing power falls.', 'Medium of exchange, unit of account and store of value are all functions, so c.']
      }
    },
    {
      id: 'money7',
      prompt: { zh: '通脹嚴重時，金錢哪一項功能直接受購買力下降影響？', en: 'When inflation is severe, which function of money is directly weakened by falling purchasing power?' },
      choices: [
        { id: 'a', zh: '交易媒介', en: 'Medium of exchange' },
        { id: 'b', zh: '計價單位', en: 'Unit of account' },
        { id: 'c', zh: '價值儲存', en: 'Store of value' },
        { id: 'd', zh: '延遲支付的標準', en: 'Standard of deferred payment' }
      ],
      answer: 'c',
      hint: { zh: '購買力下降即是「保存價值」的能力變差。', en: 'Falling purchasing power weakens the ability to keep value.' },
      solution: {
        zh: ['物價上升令同一筆錢買到的東西減少，即購買力下降，價值儲存功能受損。', '交易媒介和計價單位仍可使用，故選 c。'],
        en: ['Higher prices mean the same amount of money buys less, so the store-of-value function is weakened.', 'Money still works as a medium of exchange and unit of account, so c.']
      }
    },
    {
      id: 'money8',
      prompt: { zh: '用信用卡購物時，真正完成支付的是甚麼？', en: 'When you buy something with a credit card, what actually makes the payment?' },
      choices: [
        { id: 'a', zh: '信用卡本身', en: 'The credit card itself' },
        { id: 'b', zh: '銀行戶口內的存款', en: 'The bank deposit' },
        { id: 'c', zh: '信用卡的積分回贈', en: 'Rewards points on the card' },
        { id: 'd', zh: '你日後償還的信用卡欠款', en: 'Your later repayment of the card debt' }
      ],
      answer: 'b',
      hint: { zh: '信用卡是借貸工具，不是貨幣。', en: 'A credit card is a borrowing tool, not money.' },
      solution: {
        zh: ['信用卡只是延遲付款的借貸工具，結算時真正支付的是你銀行戶口內的存款（貨幣）。', '信用卡本身、積分回贈和日後還款都不是即時的支付來源，故選 b。'],
        en: ['A credit card is only a borrowing tool for deferred payment; the payment is settled from your bank deposit, which is money.', 'The card itself, rewards points and later repayment are not the immediate source of payment, so b.']
      }
    },
    {
      id: 'money9',
      prompt: { zh: '以八達通代替現金付款，最能減少哪項交易成本？', en: 'Paying with an Octopus card instead of cash most reduces which transaction cost?' },
      choices: [
        { id: 'a', zh: '找續時間', en: 'Time spent giving change' },
        { id: 'b', zh: '標價成本', en: 'Cost of price tags' },
        { id: 'c', zh: '利息成本', en: 'Interest cost' },
        { id: 'd', zh: '稅務成本', en: 'Tax cost' }
      ],
      answer: 'a',
      hint: { zh: '拍卡付款不用點算和找續。', en: 'Tapping a card needs no counting or change.' },
      solution: {
        zh: ['拍卡即時扣款，不用點算現金和找續，減少交易時間和成本。', '標價、利息和稅務與付款方式沒有直接關係，故選 a。'],
        en: ['Tapping a card debits the amount at once, so no cash counting or change is needed, cutting transaction time and cost.', 'Price tags, interest and tax are not directly related to the payment method, so a.']
      }
    }
  ],

  's1.scarcity': [
    {
      id: 'scarcity1',
      prompt: { zh: '稀少性是指甚麼？', en: 'What does scarcity mean?' },
      choices: [
        { id: 'a', zh: '物品的數量很少', en: 'Goods exist in very small quantities' },
        { id: 'b', zh: '資源有限而慾望無窮', en: 'Resources are limited while wants are unlimited' },
        { id: 'c', zh: '只有窮人才面對的問題', en: 'A problem faced only by the poor' },
        { id: 'd', zh: '自然資源即將用完', en: 'Natural resources are about to run out' }
      ],
      answer: 'b',
      hint: { zh: '稀少性是「有限」與「無窮」的對比。', en: 'Scarcity contrasts limited resources with unlimited wants.' },
      solution: {
        zh: ['稀少性指資源不足以滿足所有慾望，即資源有限而慾望無窮。', '稀少不等於數量很少，也不是窮人獨有，故選 b。'],
        en: ['Scarcity means resources cannot satisfy all wants, so resources are limited and wants unlimited.', 'It does not simply mean few goods, nor is it limited to the poor, so b.']
      }
    },
    {
      id: 'scarcity2',
      prompt: { zh: '以下哪一項屬於「需要」而不是「想要」？', en: 'Which of the following is a need rather than a want?' },
      choices: [
        { id: 'a', zh: '智能手機', en: 'A smartphone' },
        { id: 'b', zh: '遊戲機', en: 'A games console' },
        { id: 'c', zh: '基本糧食', en: 'Basic food' },
        { id: 'd', zh: '名牌球鞋', en: 'Branded trainers' }
      ],
      answer: 'c',
      hint: { zh: '需要是維持基本生活所必需。', en: 'Needs are required for a basic standard of living.' },
      solution: {
        zh: ['基本糧食是維持生命和健康所必需，屬需要。', '智能手機、遊戲機和名牌球鞋都不是維持基本生活所必需，屬想要，故選 c。'],
        en: ['Basic food is required for life and health, so it is a need.', 'Smartphones, games consoles and branded trainers are not essential for basic living, so c.']
      }
    },
    {
      id: 'scarcity3',
      prompt: { zh: '你有 100 元，想買 60 元的書和 70 元的戲票，但兩者只能選一。這情況反映甚麼？', en: 'You have 100 dollars and want a 60-dollar book and a 70-dollar ticket, but can choose only one. What does this show?' },
      choices: [
        { id: 'a', zh: '通脹', en: 'Inflation' },
        { id: 'b', zh: '稀少性下的選擇', en: 'Choice under scarcity' },
        { id: 'c', zh: '失業', en: 'Unemployment' },
        { id: 'd', zh: '貿易得益', en: 'Gains from trade' }
      ],
      answer: 'b',
      hint: { zh: '60 + 70 = 130 元，超過 100 元。', en: '60 + 70 = 130 dollars, more than 100 dollars.' },
      solution: {
        zh: ['100 元不足以同時買書和戲票（60 + 70 = 130 元），資源有限便要在兩者中取捨。', '這是稀少性下的選擇，不是通脹、失業或貿易得益，故選 b。'],
        en: ['100 dollars cannot buy both the book and the ticket (60 + 70 = 130 dollars), so limited resources force a choice.', 'This is choice under scarcity, not inflation, unemployment or gains from trade, so b.']
      }
    },
    {
      id: 'scarcity4',
      prompt: { zh: '以下哪項正確描述稀少性？', en: 'Which statement correctly describes scarcity?' },
      choices: [
        { id: 'a', zh: '只有窮人面對', en: 'Only poor people face it' },
        { id: 'b', zh: '只有富人面對', en: 'Only rich people face it' },
        { id: 'c', zh: '所有人都面對', en: 'Everyone faces it' },
        { id: 'd', zh: '只有政府面對', en: 'Only the government faces it' }
      ],
      answer: 'c',
      hint: { zh: '任何人的資源都不足以滿足所有慾望。', en: 'No one has enough resources to satisfy all wants.' },
      solution: {
        zh: ['無論貧富，資源都有限而慾望無窮，所以所有人都面對稀少性。', '貧富只影響稀少性的形式和程度，故選 c。'],
        en: ['Rich or poor, resources are limited while wants are unlimited, so everyone faces scarcity.', 'Wealth affects the form and degree of scarcity, not whether it exists, so c.']
      }
    },
    {
      id: 'scarcity5',
      prompt: { zh: '因為稀少性，我們必須做甚麼？', en: 'Because of scarcity, what must we do?' },
      choices: [
        { id: 'a', zh: '提高所有物品的價格', en: 'Raise the price of all goods' },
        { id: 'b', zh: '作出選擇', en: 'Make choices' },
        { id: 'c', zh: '停止生產', en: 'Stop production' },
        { id: 'd', zh: '取消儲蓄', en: 'Give up saving' }
      ],
      answer: 'b',
      hint: { zh: '資源不足便要取捨。', en: 'Limited resources force trade-offs.' },
      solution: {
        zh: ['資源不足以滿足所有慾望，所以必須在眾多選擇中作出取捨。', '提高價格、停止生產或取消儲蓄都不是稀少性的必然結果，故選 b。'],
        en: ['Resources cannot satisfy all wants, so we must choose among alternatives.', 'Raising all prices, stopping production or giving up saving are not necessary results of scarcity, so b.']
      }
    },
    {
      id: 'scarcity6',
      prompt: { zh: '以下哪個例子最能顯示時間的稀少性？', en: 'Which example best shows the scarcity of time?' },
      choices: [
        { id: 'a', zh: '銀行派息', en: 'A bank pays interest' },
        { id: 'b', zh: '放學後只有兩小時，要選擇做功課還是練球', en: 'Only two hours after school, so you must choose between homework and practice' },
        { id: 'c', zh: '商店接受八達通', en: 'A shop accepts Octopus cards' },
        { id: 'd', zh: '鈔票有防偽特徵', en: 'Banknotes have anti-counterfeit features' }
      ],
      answer: 'b',
      hint: { zh: '時間有限，活動互相競爭。', en: 'Time is limited and activities compete for it.' },
      solution: {
        zh: ['放學後時間有限，做功課和練球只能選一，顯示時間是稀少資源。', '派息、八達通和鈔票防偽與時間有限無關，故選 b。'],
        en: ['Time after school is limited, so homework and practice compete for it, showing that time is scarce.', 'Interest, Octopus cards and anti-counterfeit features are unrelated to limited time, so b.']
      }
    },
    {
      id: 'scarcity7',
      prompt: { zh: '以下哪項最能顯示土地的稀少性？', en: 'Which best shows the scarcity of land?' },
      choices: [
        { id: 'a', zh: '商場大減價', en: 'A shopping mall sale' },
        { id: 'b', zh: '城市土地有限，政府要決定土地用途', en: 'Urban land is limited, so the government must decide its use' },
        { id: 'c', zh: '銀行調高利率', en: 'A bank raises interest rates' },
        { id: 'd', zh: '市民使用信用卡', en: 'People use credit cards' }
      ],
      answer: 'b',
      hint: { zh: '同一塊土地不能同時用作住宅和公園。', en: 'One plot cannot be housing and a park at the same time.' },
      solution: {
        zh: ['土地供應有限，不同用途互相競爭，政府要取捨，顯示土地稀少。', '減價、利率和信用卡與土地稀少無關，故選 b。'],
        en: ['Land is limited and different uses compete for it, forcing the government to choose, which shows land scarcity.', 'Sales, interest rates and credit cards are unrelated to land scarcity, so b.']
      }
    },
    {
      id: 'scarcity8',
      prompt: { zh: '假設所有資源都無限，稀少性會怎樣？', en: 'If all resources were unlimited, what would happen to scarcity?' },
      choices: [
        { id: 'a', zh: '仍然存在', en: 'It would still exist' },
        { id: 'b', zh: '消失', en: 'It would disappear' },
        { id: 'c', zh: '只影響窮人', en: 'It would affect only the poor' },
        { id: 'd', zh: '只在通脹時出現', en: 'It would appear only during inflation' }
      ],
      answer: 'b',
      hint: { zh: '稀少性是資源不足相對於慾望。', en: 'Scarcity is a shortage of resources relative to wants.' },
      solution: {
        zh: ['稀少性的根源是資源不足以滿足慾望；若資源無限，便不用取捨，稀少性消失。', '稀少性不是只在通脹時出現，也不是只影響窮人，故選 b。'],
        en: ['Scarcity comes from resources being insufficient for wants; if resources were unlimited, no choice would be needed and scarcity would disappear.', 'Scarcity is not limited to inflation or to the poor, so b.']
      }
    },
    {
      id: 'scarcity9',
      prompt: { zh: '稀少性與機會成本的關係是甚麼？', en: 'What is the link between scarcity and opportunity cost?' },
      choices: [
        { id: 'a', zh: '兩者沒有關係', en: 'They are unrelated' },
        { id: 'b', zh: '因為稀少，選擇才有機會成本', en: 'Because of scarcity, choices have an opportunity cost' },
        { id: 'c', zh: '機會成本只出現在市場經濟', en: 'Opportunity cost exists only in a market economy' },
        { id: 'd', zh: '稀少性令所有價格永遠上升', en: 'Scarcity makes all prices rise forever' }
      ],
      answer: 'b',
      hint: { zh: '有限資源下，選一項就要放棄另一項。', en: 'With limited resources, choosing one thing means giving up another.' },
      solution: {
        zh: ['資源有限令選擇要放棄其他用途，被放棄的次佳選擇價值就是機會成本。', '稀少性不一定令價格永遠上升，機會成本也不限於市場經濟，故選 b。'],
        en: ['Limited resources mean a choice gives up other uses, and the value of the next best option forgone is the opportunity cost.', 'Scarcity does not make all prices rise forever, and opportunity cost is not limited to market economies, so b.']
      }
    }
  ],

  's1.factors': [
    {
      id: 'factors1',
      prompt: { zh: '茶餐廳的侍應提供服務，屬於哪種生產要素？', en: 'Waiters providing service in a cha chaan teng belong to which factor of production?' },
      choices: [
        { id: 'a', zh: '土地', en: 'Land' },
        { id: 'b', zh: '勞力', en: 'Labour' },
        { id: 'c', zh: '資本', en: 'Capital' },
        { id: 'd', zh: '企業家才能', en: 'Entrepreneurship' }
      ],
      answer: 'b',
      hint: { zh: '侍應付出體力和時間。', en: 'Waiters provide physical effort and time.' },
      solution: {
        zh: ['侍應付出體力和時間提供服務，屬勞力，回報是工資。', '土地是天然資源，資本是機器廠房，企業家才能是組織與承擔風險，故選 b。'],
        en: ['Waiters provide service with their effort and time, so this is labour, rewarded by wages.', 'Land is natural resources, capital is machines and factories, and entrepreneurship organises and bears risk, so b.']
      }
    },
    {
      id: 'factors2',
      prompt: { zh: '茶餐廳租用舖位，舖位屬於哪種生產要素？', en: 'A cha chaan teng rents a shop. The shop belongs to which factor of production?' },
      choices: [
        { id: 'a', zh: '土地', en: 'Land' },
        { id: 'b', zh: '勞力', en: 'Labour' },
        { id: 'c', zh: '資本', en: 'Capital' },
        { id: 'd', zh: '企業家才能', en: 'Entrepreneurship' }
      ],
      answer: 'a',
      hint: { zh: '舖位所在的地方是天然資源。', en: 'The space where the shop stands is a natural resource.' },
      solution: {
        zh: ['舖位所在的地方屬天然資源，即土地，回報是租金。', '舖位不是機器廠房（資本），也不是人力，故選 a。'],
        en: ['The space the shop occupies is a natural resource, that is land, rewarded by rent.', 'It is not a machine or factory (capital) nor human effort, so a.']
      }
    },
    {
      id: 'factors3',
      prompt: { zh: '茶餐廳購入爐具和雪櫃，屬於哪種生產要素？', en: 'A cha chaan teng buys stoves and fridges. They belong to which factor of production?' },
      choices: [
        { id: 'a', zh: '土地', en: 'Land' },
        { id: 'b', zh: '勞力', en: 'Labour' },
        { id: 'c', zh: '資本', en: 'Capital' },
        { id: 'd', zh: '企業家才能', en: 'Entrepreneurship' }
      ],
      answer: 'c',
      hint: { zh: '爐具和雪櫃是生產工具。', en: 'Stoves and fridges are tools of production.' },
      solution: {
        zh: ['爐具和雪櫃是生產工具，屬資本，回報是利息。', '土地是天然資源，故選 c。'],
        en: ['Stoves and fridges are produced means of production, so they are capital, rewarded by interest.', 'Land is a natural resource, so c.']
      }
    },
    {
      id: 'factors4',
      prompt: { zh: '老闆設計菜單、決定開分店並承擔蝕本風險，屬於哪種生產要素？', en: 'The owner designs the menu and opens a branch while bearing the risk of loss. This is which factor of production?' },
      choices: [
        { id: 'a', zh: '土地', en: 'Land' },
        { id: 'b', zh: '勞力', en: 'Labour' },
        { id: 'c', zh: '資本', en: 'Capital' },
        { id: 'd', zh: '企業家才能', en: 'Entrepreneurship' }
      ],
      answer: 'd',
      hint: { zh: '組織生產並承擔風險。', en: 'Organising production and bearing risk.' },
      solution: {
        zh: ['組織生產、作決定並承擔風險是企業家才能，回報是利潤。', '勞力是提供勞動，故選 d。'],
        en: ['Organising production, making decisions and bearing risk is entrepreneurship, rewarded by profit.', 'Labour is the provision of work, so d.']
      }
    },
    {
      id: 'factors5',
      prompt: { zh: '以下哪一項不是生產要素？', en: 'Which of the following is NOT a factor of production?' },
      choices: [
        { id: 'a', zh: '土地', en: 'Land' },
        { id: 'b', zh: '勞力', en: 'Labour' },
        { id: 'c', zh: '金錢', en: 'Money' },
        { id: 'd', zh: '企業家才能', en: 'Entrepreneurship' }
      ],
      answer: 'c',
      hint: { zh: '四種生產要素是土地、勞力、資本和企業家才能。', en: 'The four factors are land, labour, capital and entrepreneurship.' },
      solution: {
        zh: ['生產要素是土地、勞力、資本和企業家才能，金錢是交易媒介，不是生產要素。', '故選 c。'],
        en: ['The factors of production are land, labour, capital and entrepreneurship; money is a medium of exchange, not a factor.', 'So c.']
      }
    },
    {
      id: 'factors6',
      prompt: { zh: '勞力的回報是甚麼？', en: 'What is the reward for labour?' },
      choices: [
        { id: 'a', zh: '工資', en: 'Wages' },
        { id: 'b', zh: '租金', en: 'Rent' },
        { id: 'c', zh: '利息', en: 'Interest' },
        { id: 'd', zh: '利潤', en: 'Profit' }
      ],
      answer: 'a',
      hint: { zh: '土地收租、資本收息、企業家得利潤。', en: 'Land earns rent, capital earns interest, and entrepreneurship earns profit.' },
      solution: {
        zh: ['勞力的回報是工資。', '土地收租、資本收息、企業家才能得利潤，故選 a。'],
        en: ['Labour is rewarded with wages.', 'Land earns rent, capital earns interest and entrepreneurship earns profit, so a.']
      }
    },
    {
      id: 'factors7',
      prompt: { zh: '以下哪項屬於土地（天然資源）？', en: 'Which of the following is land (a natural resource)?' },
      choices: [
        { id: 'a', zh: '拖拉機', en: 'A tractor' },
        { id: 'b', zh: '農地', en: 'Farmland' },
        { id: 'c', zh: '農夫', en: 'A farmer' },
        { id: 'd', zh: '農場經理', en: 'A farm manager' }
      ],
      answer: 'b',
      hint: { zh: '土地指天然存在的資源。', en: 'Land means resources provided by nature.' },
      solution: {
        zh: ['農地是天然存在的資源，屬土地。', '拖拉機是資本，農夫和經理提供勞力，故選 b。'],
        en: ['Farmland is provided by nature, so it is land.', 'A tractor is capital, while the farmer and manager provide labour, so b.']
      }
    },
    {
      id: 'factors8',
      prompt: { zh: '以下哪項最能說明企業家才能？', en: 'Which best illustrates entrepreneurship?' },
      choices: [
        { id: 'a', zh: '工人操作機器', en: 'A worker operates a machine' },
        { id: 'b', zh: '東主決定開分店並承受風險', en: 'An owner opens a new branch and bears the risk' },
        { id: 'c', zh: '銀行收取利息', en: 'A bank charges interest' },
        { id: 'd', zh: '業主收取租金', en: 'A landlord collects rent' }
      ],
      answer: 'b',
      hint: { zh: '企業家才能包括決策和承擔風險。', en: 'Entrepreneurship includes decisions and risk-bearing.' },
      solution: {
        zh: ['企業家才能是組織生產、作決定和承擔風險，東主開分店正是例子。', '工人操作機器屬勞力，收息和收租分別是資本與土地的回報，故選 b。'],
        en: ['Entrepreneurship means organising production, deciding and bearing risk, as when an owner opens a branch.', 'Operating a machine is labour, while interest and rent reward capital and land, so b.']
      }
    },
    {
      id: 'factors9',
      prompt: { zh: '工廠購入一部機器，這筆支出是為了獲得哪種生產要素？', en: 'A factory buys a machine. This spending is to obtain which factor of production?' },
      choices: [
        { id: 'a', zh: '土地', en: 'Land' },
        { id: 'b', zh: '勞力', en: 'Labour' },
        { id: 'c', zh: '資本', en: 'Capital' },
        { id: 'd', zh: '企業家才能', en: 'Entrepreneurship' }
      ],
      answer: 'c',
      hint: { zh: '機器是生產工具。', en: 'A machine is a tool of production.' },
      solution: {
        zh: ['機器是生產工具，屬資本，回報是利息。', '購買機器不是土地、勞力或企業家才能，故選 c。'],
        en: ['A machine is a produced means of production, so it is capital, rewarded by interest.', 'Buying a machine is not land, labour or entrepreneurship, so c.']
      }
    }
  ]
});

EconData.addBanks({
  's2.public_finance': [
    {
      id: 'pf1',
      prompt: { zh: '以下哪項不是香港政府的主要收入來源？', en: 'Which of the following is NOT a main source of revenue for the Hong Kong government?' },
      choices: [
        { id: 'a', zh: '稅收', en: 'Taxes' },
        { id: 'b', zh: '賣地收入', en: 'Land sale revenue' },
        { id: 'c', zh: '政府收費', en: 'Government fees and charges' },
        { id: 'd', zh: '私人公司的全部利潤', en: 'All profits of private companies' }
      ],
      answer: 'd',
      hint: { zh: '政府收入來自稅收、賣地和收費。', en: 'Revenue comes from taxes, land sales and fees.' },
      solution: {
        zh: ['政府主要收入包括稅收、賣地收入和各項政府收費。', '政府不會收取私人公司的全部利潤，故選 d。'],
        en: ['Government revenue mainly comes from taxes, land sales and fees and charges.', 'The government does not take all profits of private companies, so d.']
      }
    },
    {
      id: 'pf2',
      prompt: { zh: '政府支出最主要用於甚麼？', en: 'What is government spending mainly used for?' },
      choices: [
        { id: 'a', zh: '提供教育、醫療和基建等公共服務', en: 'Providing public services such as education, health and infrastructure' },
        { id: 'b', zh: '購買私人公司的股票以賺取回報', en: 'Buying shares in private firms for returns' },
        { id: 'c', zh: '為私人公司提供無限量貸款', en: 'Providing unlimited loans to private firms' },
        { id: 'd', zh: '直接增加市民的私人消費', en: 'Directly raising private consumption' }
      ],
      answer: 'a',
      hint: { zh: '政府支出換來公共服務。', en: 'Government spending buys public services.' },
      solution: {
        zh: ['政府支出主要用於教育、醫療、社福和基建等公共服務。', '購買私人公司股票、提供無限量貸款或直接增加私人消費都不是政府支出的主要用途，故選 a。'],
        en: ['Spending mainly goes to public services such as education, health, welfare and infrastructure.', 'Buying shares in private firms, providing unlimited loans or directly raising private consumption are not the main uses, so a.']
      }
    },
    {
      id: 'pf3',
      prompt: { zh: '以下哪項是公共財的例子？', en: 'Which of the following is an example of a public good?' },
      choices: [
        { id: 'a', zh: '私人汽車', en: 'A private car' },
        { id: 'b', zh: '路燈', en: 'Street lighting' },
        { id: 'c', zh: '智能手機', en: 'A smartphone' },
        { id: 'd', zh: '餐廳晚餐', en: 'A restaurant dinner' }
      ],
      answer: 'b',
      hint: { zh: '公共財難以排斥他人使用。', en: 'It is hard to exclude people from using a public good.' },
      solution: {
        zh: ['路燈難以排斥未付款的人使用，而且一人使用不影響他人，屬公共財。', '私人汽車、智能手機和晚餐都可排斥並會競爭使用，故選 b。'],
        en: ['Street lighting is hard to restrict to paying users and one person\'s use does not reduce another person\'s use, so it is a public good.', 'Cars, smartphones and dinners can be excluded and are rival, so b.']
      }
    },
    {
      id: 'pf4',
      prompt: { zh: '政府為甚麼要提供公共財？', en: 'Why does the government provide public goods?' },
      choices: [
        { id: 'a', zh: '因為公共財完全沒有成本', en: 'Because public goods cost nothing' },
        { id: 'b', zh: '因為私人市場難以收費，供應可能不足', en: 'Because private markets find it hard to charge, so supply may be too low' },
        { id: 'c', zh: '因為政府想賺取利潤', en: 'Because the government wants profit' },
        { id: 'd', zh: '因為公共財一定比私人物品好', en: 'Because public goods are always better than private goods' }
      ],
      answer: 'b',
      hint: { zh: '收不到費，私人生產者便不願提供。', en: 'If producers cannot charge, they will not supply enough.' },
      solution: {
        zh: ['公共財有非排斥性和非競爭性，私人難以收費，市場供應可能不足，所以由政府提供。', '公共財仍有成本，政府也不是為牟利，故選 b。'],
        en: ['Public goods are non-excludable and non-rival, so private producers cannot charge easily and supply may be too low; hence the government provides them.', 'Public goods still cost money and the government is not seeking profit, so b.']
      }
    },
    {
      id: 'pf5',
      prompt: { zh: '政府徵稅的主要目的之一是甚麼？', en: 'What is one main purpose of taxation?' },
      choices: [
        { id: 'a', zh: '為公共支出籌集收入', en: 'To raise revenue for public spending' },
        { id: 'b', zh: '令所有物價上升', en: 'To make all prices rise' },
        { id: 'c', zh: '減少政府支出', en: 'To cut government spending' },
        { id: 'd', zh: '取代私人儲蓄', en: 'To replace private saving' }
      ],
      answer: 'a',
      hint: { zh: '政府要收入才能提供公共服務。', en: 'The government needs revenue to provide public services.' },
      solution: {
        zh: ['稅收是政府主要收入來源，用來支付教育、醫療等公共支出。', '徵稅不是為了推高物價或取代儲蓄，故選 a。'],
        en: ['Taxes are the main revenue source, used to pay for public services such as education and health care.', 'Taxation is not meant to raise all prices or replace saving, so a.']
      }
    },
    {
      id: 'pf6',
      prompt: { zh: '以下哪項政策最能達到收入再分配？', en: 'Which policy best achieves income redistribution?' },
      choices: [
        { id: 'a', zh: '累進薪俸稅', en: 'Progressive salaries tax' },
        { id: 'b', zh: '提高煙酒稅', en: 'Raising tobacco and alcohol duties' },
        { id: 'c', zh: '增加基建投資', en: 'Increasing infrastructure investment' },
        { id: 'd', zh: '減少社會福利開支', en: 'Cutting welfare spending' }
      ],
      answer: 'a',
      hint: { zh: '再分配是透過稅收和福利轉移收入。', en: 'Redistribution moves income through taxes and benefits.' },
      solution: {
        zh: ['累進稅令高收入者按較高稅率繳稅，稅收可用於幫助低收入人士，達到再分配。', '提高煙酒稅具累退效果、增加基建投資不是直接再分配、減少福利開支會擴大收入差距，故選 a。'],
        en: ['A progressive tax makes higher earners pay a higher rate, and the revenue can help lower-income groups, so it redistributes income.', 'A tobacco and alcohol duty is regressive, infrastructure investment is not direct redistribution, and cutting welfare widens the income gap, so a.']
      }
    },
    {
      id: 'pf7',
      prompt: { zh: '以下哪項不是政府在經濟中的一般角色？', en: 'Which of the following is NOT a general role of government in the economy?' },
      choices: [
        { id: 'a', zh: '提供公共財', en: 'Providing public goods' },
        { id: 'b', zh: '處理外部性', en: 'Dealing with externalities' },
        { id: 'c', zh: '再分配收入', en: 'Redistributing income' },
        { id: 'd', zh: '決定所有私人企業的產量', en: 'Deciding output for every private firm' }
      ],
      answer: 'd',
      hint: { zh: '市場經濟中私人企業自行決定產量。', en: 'In a market economy private firms decide their own output.' },
      solution: {
        zh: ['政府提供公共財、處理外部性、再分配收入和穩定經濟。', '在市場經濟中，政府不會決定所有私人企業的產量，故選 d。'],
        en: ['The government provides public goods, deals with externalities, redistributes income and stabilises the economy.', 'A market economy does not have the government deciding output for every private firm, so d.']
      }
    },
    {
      id: 'pf8',
      prompt: { zh: '假設政府收入 6000 百萬元，支出 5500 百萬元，該年財政狀況是甚麼？', en: 'If government revenue is 6000 million dollars and spending is 5500 million dollars, what is the budget position?' },
      choices: [
        { id: 'a', zh: '盈餘 500 百萬元', en: 'A surplus of 500 million dollars' },
        { id: 'b', zh: '赤字 500 百萬元', en: 'A deficit of 500 million dollars' },
        { id: 'c', zh: '盈餘 11500 百萬元', en: 'A surplus of 11500 million dollars' },
        { id: 'd', zh: '赤字 11500 百萬元', en: 'A deficit of 11500 million dollars' }
      ],
      answer: 'a',
      hint: { zh: '財政盈餘 = 收入 − 支出。', en: 'Budget balance = revenue − spending.' },
      solution: {
        zh: ['財政盈餘 = 6000 − 5500 = 500 百萬元。', '收入大於支出是盈餘，故選 a；11500 是兩者相加，不是差額。'],
        en: ['Budget surplus = 6000 − 5500 = 500 million dollars.', 'Revenue exceeds spending, so it is a surplus; 11500 is their sum, not the difference, so a.']
      }
    },
    {
      id: 'pf9',
      prompt: { zh: '政府增加教育支出，長遠最可能帶來甚麼影響？', en: 'What is the most likely long-run effect of higher government spending on education?' },
      choices: [
        { id: 'a', zh: '提升人力資本', en: 'Raising human capital' },
        { id: 'b', zh: '減少勞動人口', en: 'Reducing the labour force' },
        { id: 'c', zh: '令所有物價下跌', en: 'Making all prices fall' },
        { id: 'd', zh: '減少政府收入', en: 'Reducing government revenue' }
      ],
      answer: 'a',
      hint: { zh: '教育提升知識和技能。', en: 'Education raises knowledge and skills.' },
      solution: {
        zh: ['教育投資提升市民的知識和技能，即人力資本。', '增加教育支出不會必然減少勞動人口或令物價下跌，故選 a。'],
        en: ['Spending on education raises knowledge and skills, which is human capital.', 'More education spending does not necessarily shrink the labour force or lower all prices, so a.']
      }
    }
  ],

  's3.globalisation': [
    {
      id: 'gl1',
      prompt: { zh: '全球化是指甚麼？', en: 'What does globalisation mean?' },
      choices: [
        { id: 'a', zh: '一個國家停止對外貿易', en: 'A country stops trading with others' },
        { id: 'b', zh: '商品、資金、資訊和人才跨國流動增加', en: 'Growing cross-border flows of goods, capital, information and people' },
        { id: 'c', zh: '所有國家使用同一貨幣', en: 'All countries use one currency' },
        { id: 'd', zh: '各國普遍提高關稅', en: 'Countries generally raise tariffs' }
      ],
      answer: 'b',
      hint: { zh: '全球化是跨國經濟活動增加的過程。', en: 'Globalisation is the growth of cross-border economic activity.' },
      solution: {
        zh: ['全球化是商品、資金、資訊和人才跨國流動增加的過程。', '單一貨幣、停止貿易或普遍加關稅都不是全球化的定義，故選 b。'],
        en: ['Globalisation is the growing cross-border flow of goods, capital, information and people.', 'A single currency, stopping trade or raising tariffs are not its definition, so b.']
      }
    },
    {
      id: 'gl2',
      prompt: { zh: '以下哪項會減慢全球化？', en: 'Which of the following would slow down globalisation?' },
      choices: [
        { id: 'a', zh: '運輸成本下降', en: 'Falling transport costs' },
        { id: 'b', zh: '通訊科技進步', en: 'Advances in communication technology' },
        { id: 'c', zh: '各國增加貿易壁壘', en: 'Countries raising trade barriers' },
        { id: 'd', zh: '跨國企業擴張', en: 'Multinationals expanding' }
      ],
      answer: 'c',
      hint: { zh: '貿易壁壘阻礙商品和資金流動。', en: 'Trade barriers obstruct flows of goods and capital.' },
      solution: {
        zh: ['貿易壁壘增加會阻礙商品和資金跨國流動，減慢全球化。', '運輸和通訊成本下降、跨國企業擴張都會促進全球化，故選 c。'],
        en: ['More trade barriers obstruct cross-border flows of goods and capital, slowing globalisation.', 'Falling transport and communication costs and multinational expansion promote globalisation, so c.']
      }
    },
    {
      id: 'gl3',
      prompt: { zh: '跨國企業在全球化中的主要角色是甚麼？', en: 'What is the main role of multinational corporations in globalisation?' },
      choices: [
        { id: 'a', zh: '只在本國生產和銷售', en: 'Producing and selling only at home' },
        { id: 'b', zh: '在多國設廠生產和銷售，形成全球生產網絡', en: 'Producing and selling in many countries, forming global production networks' },
        { id: 'c', zh: '禁止技術轉移', en: 'Banning technology transfer' },
        { id: 'd', zh: '統一各國稅率', en: 'Setting one tax rate for all countries' }
      ],
      answer: 'b',
      hint: { zh: '跨國企業把生產分散到不同國家。', en: 'Multinationals spread production across countries.' },
      solution: {
        zh: ['跨國企業在多國設廠、採購和銷售，把生產工序分散到不同國家。', '它們不會禁止技術轉移或統一各國稅率，故選 b。'],
        en: ['Multinationals build plants, source inputs and sell in many countries, spreading production across borders.', 'They do not ban technology transfer or set a single global tax rate, so b.']
      }
    },
    {
      id: 'gl4',
      prompt: { zh: '全球化對消費者的主要好處是甚麼？', en: 'What is the main benefit of globalisation for consumers?' },
      choices: [
        { id: 'a', zh: '商品選擇增加，價格可能下降', en: 'More choice and possibly lower prices' },
        { id: 'b', zh: '進口商品價格一定上升', en: 'Import prices must rise' },
        { id: 'c', zh: '本地商品一定比進口商品便宜', en: 'Local goods are always cheaper than imports' },
        { id: 'd', zh: '消費者只能購買本地生產的商品', en: 'Consumers can buy only locally produced goods' }
      ],
      answer: 'a',
      hint: { zh: '市場擴大、競爭增加，消費者得益。', en: 'Bigger markets and more competition benefit consumers.' },
      solution: {
        zh: ['全球化擴大市場和競爭，消費者有更多選擇，價格也可能下降。', '進口價格一定上升、本地貨必然便宜、只能買本地貨，都不是全球化帶來的消費者好處，故選 a。'],
        en: ['Globalisation enlarges markets and competition, so consumers get more choice and possibly lower prices.', 'Rising import prices, always-cheaper local goods and local-only choices are not benefits for consumers, so a.']
      }
    },
    {
      id: 'gl5',
      prompt: { zh: '全球化最可能令以下哪類工人受負面影響？', en: 'Which group of workers is most likely to be hurt by globalisation?' },
      choices: [
        { id: 'a', zh: '低技術製造業工人', en: 'Low-skilled manufacturing workers' },
        { id: 'b', zh: '跨國企業高層', en: 'Senior managers of multinationals' },
        { id: 'c', zh: '國際律師', en: 'International lawyers' },
        { id: 'd', zh: '軟件工程師', en: 'Software engineers' }
      ],
      answer: 'a',
      hint: { zh: '生產外移到工資較低的地方，哪類職位最受影響？', en: 'When production moves to lower-wage places, which jobs are hit first?' },
      solution: {
        zh: ['生產工序外移到工資較低的地方，低技術製造業職位最易流失。', '高層、跨國律師和軟件工程師通常因市場擴大而受益，故選 a。'],
        en: ['Production moving to lower-wage locations hits low-skilled manufacturing jobs hardest.', 'Senior managers, international lawyers and software engineers usually gain from larger markets, so a.']
      }
    },
    {
      id: 'gl6',
      prompt: { zh: '一部手機的零件來自多國、在另一國組裝，這現象稱為甚麼？', en: 'A phone uses parts from several countries and is assembled in another. What is this called?' },
      choices: [
        { id: 'a', zh: '全球價值鏈', en: 'A global value chain' },
        { id: 'b', zh: '貿易壁壘', en: 'A trade barrier' },
        { id: 'c', zh: '關稅同盟', en: 'A customs union' },
        { id: 'd', zh: '價格上限', en: 'A price ceiling' }
      ],
      answer: 'a',
      hint: { zh: '生產工序分散到不同國家完成。', en: 'Production stages are spread across countries.' },
      solution: {
        zh: ['生產工序分散到不同國家、再由多國零件組裝，稱為全球價值鏈。', '貿易壁壘、關稅同盟和價格上限都不是這種分工現象，故選 a。'],
        en: ['When production stages are spread across countries and parts from many places are assembled, this is a global value chain.', 'Trade barriers, customs unions and price ceilings are not this division of production, so a.']
      }
    },
    {
      id: 'gl7',
      prompt: { zh: '以下哪項是香港全球化的表現？', en: 'Which of the following shows globalisation in Hong Kong?' },
      choices: [
        { id: 'a', zh: '市民網購外國商品', en: 'People buy foreign goods online' },
        { id: 'b', zh: '市民只買本地蔬菜', en: 'People buy only local vegetables' },
        { id: 'c', zh: '香港與外地的貿易額持續下降', en: 'Hong Kong\'s trade with other places keeps falling' },
        { id: 'd', zh: '市民只在本港銀行存款', en: 'People keep their savings only in local banks' }
      ],
      answer: 'a',
      hint: { zh: '全球化涉及跨境貿易和交流。', en: 'Globalisation involves cross-border trade and exchange.' },
      solution: {
        zh: ['網購外國商品涉及跨境貿易和物流，是香港全球化的表現。', '只買本地產品、貿易額下降和只在本地存款都減少或無助跨國交流，故選 a。'],
        en: ['Buying foreign goods online involves cross-border trade and logistics, which shows globalisation.', 'Buying only local goods, falling trade and local-only savings reduce or do not involve cross-border exchange, so a.']
      }
    },
    {
      id: 'gl8',
      prompt: { zh: '跨國企業到發展中國家設廠，對當地可能帶來甚麼影響？', en: 'What effect might a multinational setting up a factory in a developing country have?' },
      choices: [
        { id: 'a', zh: '創造就業，但工資和環境標準可能較低', en: 'Creating jobs but possibly with lower wages and weaker environmental standards' },
        { id: 'b', zh: '一定令當地所有人更富有', en: 'It must make everyone there richer' },
        { id: 'c', zh: '完全沒有環境影響', en: 'It has no environmental effect at all' },
        { id: 'd', zh: '一定減少當地就業', en: 'It must reduce local employment' }
      ],
      answer: 'a',
      hint: { zh: '外資設廠有得有失，要平衡看。', en: 'Foreign investment brings gains and costs; weigh both.' },
      solution: {
        zh: ['設廠可創造就業和技術轉移，但也可能出現工資偏低和環境標準較寬鬆的問題。', '「一定更富有」和「完全沒有環境影響」都過於絕對，故選 a。'],
        en: ['A factory can create jobs and transfer technology, but may also bring low wages and weaker environmental standards.', 'Claims that everyone must become richer or that there is no environmental effect are too absolute, so a.']
      }
    },
    {
      id: 'gl9',
      prompt: { zh: '分析全球化的利弊時，最恰當的做法是甚麼？', en: 'When analysing the pros and cons of globalisation, what is the best approach?' },
      choices: [
        { id: 'a', zh: '只看總產量增加', en: 'Look only at total output growth' },
        { id: 'b', zh: '同時考慮效率提升和對不同群體的分配影響', en: 'Consider both efficiency gains and how they are distributed among groups' },
        { id: 'c', zh: '只看失業率', en: 'Look only at the unemployment rate' },
        { id: 'd', zh: '假定所有國家得益相同', en: 'Assume all countries gain equally' }
      ],
      answer: 'b',
      hint: { zh: '效率與分配是兩個不同角度。', en: 'Efficiency and distribution are two different angles.' },
      solution: {
        zh: ['全球化提升效率，但得益和損失在不同群體間分布不均，所以要同時考慮效率與分配。', '只看產量、失業率或假定各國得益相同都不全面，故選 b。'],
        en: ['Globalisation raises efficiency, but gains and losses fall unevenly across groups, so both efficiency and distribution matter.', 'Looking only at output or unemployment, or assuming equal gains, is incomplete, so b.']
      }
    }
  ],

  's3.economic_systems': [
    {
      id: 'es1',
      prompt: { zh: '三個基本經濟問題是甚麼？', en: 'What are the three basic economic questions?' },
      choices: [
        { id: 'a', zh: '生產甚麼、怎樣生產、為誰生產', en: 'What to produce, how to produce and for whom to produce' },
        { id: 'b', zh: '何時生產、在哪裡生產、用甚麼貨幣', en: 'When to produce, where to produce and which currency to use' },
        { id: 'c', zh: '進口甚麼、出口甚麼、儲蓄多少', en: 'What to import, what to export and how much to save' },
        { id: 'd', zh: '誰付稅、誰監管、誰選舉', en: 'Who pays tax, who regulates and who votes' }
      ],
      answer: 'a',
      hint: { zh: '所有經濟體系都要回答這三個問題。', en: 'Every economy must answer these three questions.' },
      solution: {
        zh: ['所有經濟體系都要回答生產甚麼、怎樣生產和為誰生產。', '其餘選項不是基本經濟問題，故選 a。'],
        en: ['Every economy must decide what to produce, how to produce it and for whom.', 'The other options are not the basic economic questions, so a.']
      }
    },
    {
      id: 'es2',
      prompt: { zh: '在市場經濟中，「生產甚麼」主要由甚麼決定？', en: 'In a market economy, what mainly decides what to produce?' },
      choices: [
        { id: 'a', zh: '政府指令', en: 'Government directives' },
        { id: 'b', zh: '價格和消費者需求', en: 'Prices and consumer demand' },
        { id: 'c', zh: '生產者的個人喜好', en: 'Producers personal tastes' },
        { id: 'd', zh: '國際組織', en: 'International organisations' }
      ],
      answer: 'b',
      hint: { zh: '市場靠價格信號引導生產。', en: 'Markets use price signals to guide production.' },
      solution: {
        zh: ['市場經濟靠價格信號和消費者需求引導生產。', '政府指令是計劃經濟的特徵，故選 b。'],
        en: ['A market economy relies on price signals and consumer demand to guide production.', 'Government directives are a feature of a planned economy, so b.']
      }
    },
    {
      id: 'es3',
      prompt: { zh: '在計劃經濟中，資源分配主要由甚麼決定？', en: 'In a planned economy, what mainly decides the allocation of resources?' },
      choices: [
        { id: 'a', zh: '價格', en: 'Prices' },
        { id: 'b', zh: '政府指令', en: 'Government directives' },
        { id: 'c', zh: '消費者投票', en: 'Consumer voting' },
        { id: 'd', zh: '外國投資者', en: 'Foreign investors' }
      ],
      answer: 'b',
      hint: { zh: '計劃經濟由中央規劃生產。', en: 'A planned economy has central planning of production.' },
      solution: {
        zh: ['計劃經濟由政府指令決定生產和分配，價格的作用有限。', '消費者投票和外國投資者不是主要決定者，故選 b。'],
        en: ['In a planned economy government directives decide production and distribution, with a limited role for prices.', 'Consumer voting and foreign investors are not the main decision-makers, so b.']
      }
    },
    {
      id: 'es4',
      prompt: { zh: '混合經濟體系的特徵是甚麼？', en: 'What is the feature of a mixed economy?' },
      choices: [
        { id: 'a', zh: '只有市場，沒有政府', en: 'Only markets, no government' },
        { id: 'b', zh: '只有政府，沒有市場', en: 'Only government, no markets' },
        { id: 'c', zh: '市場機制與政府干預並存', en: 'Market forces and government intervention coexist' },
        { id: 'd', zh: '完全沒有私人生產', en: 'No private production at all' }
      ],
      answer: 'c',
      hint: { zh: '混合經濟同時有私人生產和政府角色。', en: 'A mixed economy has both private production and a government role.' },
      solution: {
        zh: ['混合經濟同時有私人生產和市場價格，也有政府提供公共服務和調控。', '香港屬高度市場導向的混合經濟，故選 c。'],
        en: ['A mixed economy has private production and market prices alongside government public services and regulation.', 'Hong Kong is a highly market-oriented mixed economy, so c.']
      }
    },
    {
      id: 'es5',
      prompt: { zh: '在市場經濟中，價格的功能不包括以下哪一項？', en: 'In a market economy, which is NOT a function of prices?' },
      choices: [
        { id: 'a', zh: '傳遞供求資訊', en: 'Conveying information about supply and demand' },
        { id: 'b', zh: '提供生產誘因', en: 'Providing incentives to produce' },
        { id: 'c', zh: '分配資源', en: 'Allocating resources' },
        { id: 'd', zh: '保證人人收入相同', en: 'Guaranteeing equal incomes for everyone' }
      ],
      answer: 'd',
      hint: { zh: '價格不能保證收入相等。', en: 'Prices cannot guarantee equal incomes.' },
      solution: {
        zh: ['價格傳遞資訊、提供誘因和分配資源，但不能保證收入相同。', '收入分配還受稅收和福利政策影響，故選 d。'],
        en: ['Prices convey information, give incentives and allocate resources, but cannot equalise incomes.', 'Income distribution is also affected by taxes and welfare policy, so d.']
      }
    },
    {
      id: 'es6',
      prompt: { zh: '以下哪項是市場經濟可能出現的問題？', en: 'Which of the following is a possible problem in a market economy?' },
      choices: [
        { id: 'a', zh: '公共財供應不足', en: 'Public goods may be under-supplied' },
        { id: 'b', zh: '價格由供求決定', en: 'Prices are determined by supply and demand' },
        { id: 'c', zh: '私人生產者追求利潤', en: 'Private producers seek profit' },
        { id: 'd', zh: '政府提供公共服務', en: 'The government provides public services' }
      ],
      answer: 'a',
      hint: { zh: '市場難以對公共財收費。', en: 'Markets find it hard to charge for public goods.' },
      solution: {
        zh: ['市場難以對公共財收費，供應可能不足，這是市場失靈之一。', '價格由供求決定、生產者追求利潤和政府提供公共服務都不是「問題」，故選 a。'],
        en: ['Markets find it hard to charge for public goods, so supply may be too low, which is market failure.', 'Prices set by supply and demand, profit-seeking producers and government services are not problems, so a.']
      }
    },
    {
      id: 'es7',
      prompt: { zh: '以下哪項是政府校正市場失靈的例子？', en: 'Which of the following is an example of government correcting market failure?' },
      choices: [
        { id: 'a', zh: '提供路燈等公共財', en: 'Providing public goods such as street lighting' },
        { id: 'b', zh: '禁止所有進口貨物', en: 'Banning all imported goods' },
        { id: 'c', zh: '放寬環保法規以吸引投資', en: 'Relaxing environmental rules to attract investment' },
        { id: 'd', zh: '任由市場自行調節，政府完全不干預', en: 'Leaving everything to the market with no government intervention' }
      ],
      answer: 'a',
      hint: { zh: '公共財是市場失靈的常見例子。', en: 'Public goods are a common example of market failure.' },
      solution: {
        zh: ['路燈是公共財，私人市場供應不足，由政府提供可校正市場失靈。', '禁止進口、放寬環保法規和完全不干預都不是校正市場失靈的做法，故選 a。'],
        en: ['Street lighting is a public good that private markets under-supply, so government provision corrects market failure.', 'Banning imports, relaxing environmental rules and non-intervention are not corrections of market failure, so a.']
      }
    },
    {
      id: 'es8',
      prompt: { zh: '與市場經濟比較，計劃經濟中的消費者選擇通常怎樣？', en: 'Compared with a market economy, consumer choice in a planned economy is usually what?' },
      choices: [
        { id: 'a', zh: '較多', en: 'Greater' },
        { id: 'b', zh: '較少', en: 'Smaller' },
        { id: 'c', zh: '完全沒有限制', en: 'Completely unrestricted' },
        { id: 'd', zh: '與市場經濟完全相同', en: 'Exactly the same as in a market economy' }
      ],
      answer: 'b',
      hint: { zh: '消費品種類和數量由政府規劃。', en: 'The government plans the types and quantities of consumer goods.' },
      solution: {
        zh: ['計劃經濟由中央決定生產，消費品的種類和數量由政府規劃，消費者選擇通常較少。', '故選 b，而不是較多或完全相同。'],
        en: ['In a planned economy the government plans production, so the variety and quantity of consumer goods are set centrally and choice is usually smaller.', 'So b, not greater or exactly the same.']
      }
    },
    {
      id: 'es9',
      prompt: { zh: '香港的經濟體系最宜描述為甚麼？', en: 'How is the Hong Kong economy best described?' },
      choices: [
        { id: 'a', zh: '純粹計劃經濟', en: 'A purely planned economy' },
        { id: 'b', zh: '高度市場導向的混合經濟', en: 'A highly market-oriented mixed economy' },
        { id: 'c', zh: '完全沒有政府干預的經濟', en: 'An economy with no government intervention at all' },
        { id: 'd', zh: '以農業為主的經濟', en: 'A mainly agricultural economy' }
      ],
      answer: 'b',
      hint: { zh: '私人市場主導，但政府也提供公共服務。', en: 'Private markets dominate, but the government also provides public services.' },
      solution: {
        zh: ['香港以私人生產和自由貿易為主，同時政府提供教育、醫療等公共服務，屬高度市場導向的混合經濟。', '故選 b。'],
        en: ['Hong Kong relies mainly on private production and free trade, while the government provides education, health care and other public services, so it is a highly market-oriented mixed economy.', 'So b.']
      }
    }
  ]
});
