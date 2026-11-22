/*
 * content/lessons-s6.js
 * 中六（DSE 宏觀經濟與國際經濟）＋挑戰區（解難策略）小課堂及概念題庫
 * 技能：s6.national_income … s6.growth_development、chal.trade … chal.reasoning（共 18 課）
 * 題庫：s6.supply_side、chal.reasoning
 * 以 EconData.addLessons / EconData.addBanks 註冊。
 */

EconData.addLessons({

  's6.national_income': {
    zh: {
      intro: "本地生產總值（GDP）是一個經濟體在指定期間內生產的最終物品與服務的市場價值總和。用支出法計算：$GDP = C + I + G + (X - M)$。名義 GDP 按當期價格計算，實質 GDP 按基期價格計算；GDP 平減指數 = 名義 GDP ÷ 實質 GDP × 100，用來剔除物價變動的影響。",
      steps: [
        "分清 C、I、G、X、M 各項：投資包括存貨變動與資本形成；政府轉移支付（如綜援）不計入 G。",
        "用支出法加總：$GDP = C + I + G + (X - M)$。",
        "把名義 GDP 換成實質 GDP：實質 GDP = 名義 GDP ÷ GDP 平減指數 × 100。",
        "增長率 = （新實質 GDP − 舊實質 GDP）÷ 舊實質 GDP × 100%。"
      ],
      example: "某年（以百萬元計）：C = 600、I = 150、G = 120、X = 300、M = 280，則 GDP = 600 + 150 + 120 + 300 − 280 = 890 百萬元。另一年名義 GDP 為 1,100、GDP 平減指數為 125，實質 GDP = 1,100 ÷ 125 × 100 = 880；若去年實質 GDP 為 800，增長率 = （880 − 800）÷ 800 × 100% = 10%。",
      tip: "先確認題目給的是名義還是實質 GDP；平減指數大於 100 時，實質 GDP 小於名義 GDP。",
      mistake: "把中間產品或二手交易計入 GDP，造成重複計算；只有最終物品與服務的市場價值才計入。",
      glossary: [
        { term: "本地生產總值（GDP）", def: "一經濟體在指定期間內生產的最終物品與服務的市場價值總和。" },
        { term: "GDP 平減指數", def: "名義 GDP 與實質 GDP 的比率乘以 100，反映整體物價水平。" },
        { term: "名義與實質 GDP", def: "名義 GDP 按當期價格計算；實質 GDP 按基期價格計算，已剔除物價變動。" }
      ]
    },
    en: {
      intro: "Gross domestic product (GDP) is the market value of all final goods and services produced by an economy in a given period. The expenditure approach gives $GDP = C + I + G + (X - M)$. Nominal GDP uses current prices while real GDP uses base-period prices. The GDP deflator = nominal GDP ÷ real GDP × 100, and it removes the effect of price changes.",
      steps: [
        "Identify C, I, G, X and M: investment includes changes in inventories and capital formation; government transfer payments (such as welfare) are not part of G.",
        "Add up the expenditure components: $GDP = C + I + G + (X - M)$.",
        "Convert nominal to real GDP: real GDP = nominal GDP ÷ GDP deflator × 100.",
        "Growth rate = (new real GDP − old real GDP) ÷ old real GDP × 100%."
      ],
      example: "In a certain year (in HKD million): C = 600, I = 150, G = 120, X = 300 and M = 280, so GDP = 600 + 150 + 120 + 300 − 280 = 890 million. In another year nominal GDP is 1,100 and the GDP deflator is 125, so real GDP = 1,100 ÷ 125 × 100 = 880. If real GDP last year was 800, the growth rate = (880 − 800) ÷ 800 × 100% = 10%.",
      tip: "Check whether GDP is nominal or real: when the deflator is above 100, real GDP is below nominal GDP.",
      mistake: "Counting intermediate goods or second-hand transactions in GDP, which double-counts; only the market value of final goods and services is included.",
      glossary: [
        { term: "Gross domestic product (GDP)", def: "The market value of all final goods and services produced by an economy in a given period." },
        { term: "GDP deflator", def: "The ratio of nominal GDP to real GDP multiplied by 100; it measures the overall price level." },
        { term: "Nominal and real GDP", def: "Nominal GDP is valued at current prices; real GDP is valued at base-period prices, so price changes are removed." }
      ]
    }
  },

  's6.income_determination': {
    zh: {
      intro: "均衡國民收入在總產出等於總支出時出現：$Y = C + I + G + (X - M)$。在消費函數 $C = a + bY$ 中，$b$ 是邊際消費傾向（MPC），$1 - b$ 是邊際儲蓄傾向（MPS）。自發支出變動會透過乘數 $k = \\dfrac{1}{1 - MPC} = \\dfrac{1}{MPS}$ 放大。",
      steps: [
        "寫出消費函數，認清自發消費 a 與邊際消費傾向 MPC。",
        "把 C、I、G、X、M 代入 $Y = C + I + G + (X - M)$。",
        "解方程求均衡收入 Y。",
        "求乘數 $k = 1 ÷ (1 - MPC)$，再算 $\\Delta Y = k \\times \\Delta$ 自發支出。",
        "若用稅收政策：稅收乘數 = −MPC ÷ (1 − MPC)，減稅會令收入上升。"
      ],
      example: "C = 100 + 0.8Y、I = 150、G = 50，封閉經濟。Y = 100 + 0.8Y + 150 + 50，即 0.2Y = 300，得 Y = 1,500。MPC = 0.8，乘數 k = 1 ÷ 0.2 = 5。若 G 增加 20，ΔY = 5 × 20 = 100，新均衡收入為 1,600。政府支出乘數（5）大於稅收乘數（4）。",
      tip: "先由消費函數讀出 MPC，再算 $k = 1 ÷ (1 - MPC)$；均衡條件是 Y = 總支出，不是 C = Y。",
      mistake: "把 MPC 當成乘數。MPC 是每多一元收入中用於消費的比例，乘數才是支出變動的放大倍數。",
      glossary: [
        { term: "消費函數", def: "把消費支出與可支配收入連繫起來的函數，$C = a + bY$。" },
        { term: "乘數", def: "自發支出每變動一單位，最終均衡收入變動的倍數。" },
        { term: "邊際消費傾向（MPC）", def: "每多一單位收入中用於消費的比例；MPC + MPS = 1。" }
      ]
    },
    en: {
      intro: "Equilibrium national income occurs when total output equals total expenditure: $Y = C + I + G + (X - M)$. In the consumption function $C = a + bY$, $b$ is the marginal propensity to consume (MPC) and $1 - b$ is the marginal propensity to save (MPS). A change in autonomous spending is amplified by the multiplier $k = \\dfrac{1}{1 - MPC} = \\dfrac{1}{MPS}$.",
      steps: [
        "Write down the consumption function and identify autonomous consumption a and the MPC.",
        "Substitute C, I, G, X and M into $Y = C + I + G + (X - M)$.",
        "Solve the equation for equilibrium income Y.",
        "Compute the multiplier $k = 1 ÷ (1 - MPC)$, then $\\Delta Y = k \\times \\Delta$ autonomous spending.",
        "For tax policy: the tax multiplier = −MPC ÷ (1 − MPC); a tax cut raises income."
      ],
      example: "C = 100 + 0.8Y, I = 150 and G = 50 in a closed economy. Y = 100 + 0.8Y + 150 + 50, so 0.2Y = 300 and Y = 1,500. With MPC = 0.8, the multiplier k = 1 ÷ 0.2 = 5. If G rises by 20, ΔY = 5 × 20 = 100 and the new equilibrium income is 1,600. The government-spending multiplier (5) is larger than the tax multiplier (4).",
      tip: "Read the MPC from the consumption function first, then use $k = 1 ÷ (1 - MPC)$; the equilibrium condition is Y = total expenditure, not C = Y.",
      mistake: "Treating the MPC as the multiplier. The MPC is the proportion of an extra dollar of income spent on consumption; the multiplier is the magnification of a spending change.",
      glossary: [
        { term: "Consumption function", def: "A function linking consumption expenditure to disposable income, $C = a + bY$." },
        { term: "Multiplier", def: "The multiple by which equilibrium income changes when autonomous spending changes by one unit." },
        { term: "Marginal propensity to consume (MPC)", def: "The proportion of an extra unit of income spent on consumption; MPC + MPS = 1." }
      ]
    }
  },

  's6.money_banking': {
    zh: {
      intro: "貨幣有交易媒介、計價單位與價值儲藏三大功能。銀行實行部分準備金制：保留部分存款作準備金，其餘貸出；貸款再存入銀行，形成存款創造。若法定準備金率為 $r$，貨幣（存款）乘數 = $\\dfrac{1}{r}$，最終總存款 = 初始新存款 × $\\dfrac{1}{r}$。貨幣供應 = 公眾持有現金 + 存款。",
      steps: [
        "找出法定準備金率 r。",
        "貨幣乘數 = 1 ÷ r。",
        "最終總存款 = 初始新存款 × 貨幣乘數。",
        "新創造的存款 = 最終總存款 − 初始存款。",
        "驗算：準備金總額 = 最終總存款 × r。"
      ],
      example: "銀行體系收到 1,000 元新存款，法定準備金率 20%。乘數 = 1 ÷ 0.2 = 5，最終總存款 = 1,000 × 5 = 5,000 元，新創造的存款 = 5,000 − 1,000 = 4,000 元；準備金總額 = 5,000 × 0.2 = 1,000 元，與初始存款相符。",
      tip: "「準備金 × 乘數 = 總存款」，不是「準備金 × 乘數 = 新存款」；兩者相差一個初始存款。",
      mistake: "以為把現金存入銀行就一定增加貨幣供應。現金減少、存款增加，貨幣供應未必改變；只有銀行新增貸款才會創造存款。",
      glossary: [
        { term: "貨幣乘數", def: "法定準備金率的倒數，表示銀行體系最終可創造的存款是初始存款的多少倍。" },
        { term: "存款創造", def: "銀行把部分存款貸出，貸款再存入銀行體系而產生的多倍存款。" },
        { term: "法定準備金率", def: "銀行依法須就存款保留的準備金佔存款的比率。" }
      ]
    },
    en: {
      intro: "Money serves as a medium of exchange, a unit of account and a store of value. Banks operate a fractional reserve system: they keep part of deposits as reserves and lend out the rest, and the loans return as new deposits, creating deposits. If the required reserve ratio is $r$, the money (deposit) multiplier = $\\dfrac{1}{r}$, and final total deposits = initial new deposit × $\\dfrac{1}{r}$. Money supply = currency held by the public + deposits.",
      steps: [
        "Identify the required reserve ratio r.",
        "Money multiplier = 1 ÷ r.",
        "Final total deposits = initial new deposit × money multiplier.",
        "Newly created deposits = final total deposits − initial deposit.",
        "Check: total reserves = final total deposits × r."
      ],
      example: "The banking system receives a new deposit of HKD 1,000 with a required reserve ratio of 20%. The multiplier = 1 ÷ 0.2 = 5, so final total deposits = 1,000 × 5 = HKD 5,000 and newly created deposits = 5,000 − 1,000 = HKD 4,000. Total reserves = 5,000 × 0.2 = HKD 1,000, matching the initial deposit.",
      tip: "Reserves × multiplier = total deposits, not new deposits; the two differ by one initial deposit.",
      mistake: "Assuming that depositing cash into a bank must raise the money supply. Currency falls and deposits rise, so the money supply may not change; only new bank lending creates deposits.",
      glossary: [
        { term: "Money multiplier", def: "The reciprocal of the required reserve ratio; it shows how many times the initial deposit can become final total deposits." },
        { term: "Deposit creation", def: "The multiple expansion of deposits as banks lend out part of their deposits and the loans return to the banking system." },
        { term: "Required reserve ratio", def: "The proportion of deposits banks must legally hold as reserves." }
      ]
    }
  },

  's6.money_demand': {
    zh: {
      intro: "貨幣需求來自交易、預防與投機三種動機。利率是持有貨幣的機會成本：利率上升，貨幣需求下降。貨幣市場的供求均衡決定利率。貨幣數量論 $MV = PY$ 指出：若貨幣流通速度 $V$ 與實質產出 $Y$ 短期穩定，貨幣供應增長主要反映在物價上。實質利率約等於名義利率減通脹率。",
      steps: [
        "分清 M、V、P、Y 各代表甚麼，並統一單位。",
        "用 $MV = PY$ 代入求未知量。",
        "增長率版本：%ΔM + %ΔV ≈ %ΔP + %ΔY。",
        "實質利率 ≈ 名義利率 − 通脹率；要精確時用 (1 + 名義利率) ÷ (1 + 通脹率) − 1。"
      ],
      example: "某經濟 M = 400 億元、V = 5，名義 GDP = MV = 2,000 億元。若 M 增加 10%、V 不變、實質產出增長 3%，物價升幅約 10% − 3% = 7%（精確值 = 1.10 ÷ 1.03 − 1 ≈ 6.8%）。名義利率 6%、通脹率 2%，實質利率約 4%。",
      tip: "記住傳導方向：貨幣供應增加 → 利率下降 → 投資與消費增加 → 總需求上升。",
      mistake: "以為利率上升會增加貨幣需求；利率上升代表持有貨幣的機會成本上升，貨幣需求反而下降。",
      glossary: [
        { term: "貨幣需求", def: "公眾因交易、預防與投機動機而願意持有的貨幣量。" },
        { term: "貨幣數量論", def: "以 $MV = PY$ 表示貨幣供應、流通速度、物價與實質產出的關係。" },
        { term: "實質利率", def: "名義利率扣除通脹率後的回報率，約等於名義利率減通脹率。" }
      ]
    },
    en: {
      intro: "Money demand arises from the transactions, precautionary and speculative motives. The interest rate is the opportunity cost of holding money: when the interest rate rises, the quantity of money demanded falls. Money-market equilibrium determines the interest rate. The quantity theory of money $MV = PY$ states that if velocity $V$ and real output $Y$ are stable in the short run, growth in the money supply is reflected mainly in prices. The real interest rate is approximately the nominal rate minus inflation.",
      steps: [
        "Identify what M, V, P and Y stand for, and use consistent units.",
        "Substitute into $MV = PY$ to find the unknown.",
        "Growth-rate form: %ΔM + %ΔV ≈ %ΔP + %ΔY.",
        "Real interest rate ≈ nominal interest rate − inflation rate; for precision use (1 + nominal) ÷ (1 + inflation) − 1."
      ],
      example: "In an economy M = HKD 40 billion and V = 5, so nominal GDP = MV = HKD 200 billion. If M rises by 10%, V is unchanged and real output grows by 3%, prices rise by about 10% − 3% = 7% (exact value = 1.10 ÷ 1.03 − 1 ≈ 6.8%). With a nominal interest rate of 6% and inflation of 2%, the real interest rate is about 4%.",
      tip: "Remember the transmission direction: money supply rises → interest rate falls → investment and consumption rise → aggregate demand rises.",
      mistake: "Assuming a higher interest rate raises money demand; a higher rate makes holding money more costly, so money demand falls.",
      glossary: [
        { term: "Money demand", def: "The amount of money the public is willing to hold for transactions, precautionary and speculative motives." },
        { term: "Quantity theory of money", def: "$MV = PY$ relates the money supply, velocity, the price level and real output." },
        { term: "Real interest rate", def: "The return after inflation; approximately the nominal interest rate minus the inflation rate." }
      ]
    }
  },

  's6.macro_problems': {
    zh: {
      intro: "失業率 = 失業人數 ÷ 勞動人口 × 100%，勞動人口 = 就業人數 + 失業人數，不包括非勞動人口（如全職學生、退休人士）。通脹率是消費物價指數（CPI）變動的百分比。經濟週期分繁榮、衰退、蕭條與復甦；失業分摩擦性、結構性與週期性，通脹成因分需求拉動與成本推動。",
      steps: [
        "先求勞動人口 = 就業人數 + 失業人數。",
        "失業率 = 失業人數 ÷ 勞動人口 × 100%。",
        "勞動參與率 = 勞動人口 ÷ 工作年齡人口 × 100%。",
        "通脹率 = （新 CPI − 舊 CPI）÷ 舊 CPI × 100%。",
        "判斷失業或通脹的類型，再連繫成因。"
      ],
      example: "工作年齡人口 500 萬、就業 380 萬、失業 20 萬，則勞動人口 = 400 萬，失業率 = 20 ÷ 400 × 100% = 5%，勞動參與率 = 400 ÷ 500 × 100% = 80%。CPI 由 110 升至 115.5，通脹率 = （115.5 − 110）÷ 110 × 100% = 5%。",
      tip: "失業率的分母是勞動人口，不是總人口；計算通脹率要除以舊 CPI，指數點數不能直接當百分比。",
      mistake: "把非勞動人口（如全職學生）當成失業人口，令失業率被高估。",
      glossary: [
        { term: "失業率", def: "失業人數佔勞動人口的百分比。" },
        { term: "通脹率", def: "消費物價指數在特定期間內的變動百分比。" },
        { term: "經濟週期", def: "經濟活動在繁榮、衰退、蕭條與復甦之間的波動。" }
      ]
    },
    en: {
      intro: "The unemployment rate = unemployed ÷ labour force × 100%, where the labour force = employed + unemployed and excludes people outside the labour force (such as full-time students and retirees). The inflation rate is the percentage change in the consumer price index (CPI). The business cycle has expansion, recession, depression and recovery phases; unemployment is frictional, structural or cyclical, and inflation is demand-pull or cost-push.",
      steps: [
        "Find the labour force = employed + unemployed.",
        "Unemployment rate = unemployed ÷ labour force × 100%.",
        "Labour force participation rate = labour force ÷ working-age population × 100%.",
        "Inflation rate = (new CPI − old CPI) ÷ old CPI × 100%.",
        "Classify the type of unemployment or inflation, then link it to its cause."
      ],
      example: "The working-age population is 5 million, with 3.8 million employed and 0.2 million unemployed. The labour force is 4 million, so the unemployment rate = 20 ÷ 400 × 100% = 5% and the participation rate = 400 ÷ 500 × 100% = 80%. If the CPI rises from 110 to 115.5, the inflation rate = (115.5 − 110) ÷ 110 × 100% = 5%.",
      tip: "The denominator of the unemployment rate is the labour force, not the total population; divide the CPI change by the old CPI because index points are not percentages.",
      mistake: "Counting people outside the labour force (such as full-time students) as unemployed, which overstates the unemployment rate.",
      glossary: [
        { term: "Unemployment rate", def: "The unemployed as a percentage of the labour force." },
        { term: "Inflation rate", def: "The percentage change in the consumer price index over a period." },
        { term: "Business cycle", def: "The fluctuations of economic activity between expansion, recession, depression and recovery." }
      ]
    }
  },

  's6.fiscal_policy': {
    zh: {
      intro: "財政政策是政府透過稅收與支出影響總需求。擴張性政策（增加政府支出或減稅）令總需求右移，用以填補緊縮缺口、對抗衰退；緊縮性政策相反，用以消除通脹缺口、冷卻通脹。自動穩定器（累進稅、失業救濟）在衰退時自動減少稅收、增加救濟，發揮緩衝作用，毋須等待決策。政策限制包括時滯、擠出效應、債務負擔與政治阻力。",
      steps: [
        "算出產出缺口 = 潛在產出 − 現時均衡產出。",
        "求乘數 $k = 1 ÷ (1 - MPC)$。",
        "所需政府支出 $\\Delta G$ = 缺口 ÷ k。",
        "若用減稅：稅收乘數 = −MPC ÷ (1 − MPC)，所需減稅額 = 缺口 ÷ 稅收乘數的絕對值。",
        "指出限制：時滯與擠出效應。"
      ],
      example: "潛在產出 5,000 億元，現時均衡 4,600 億元，產出缺口 400 億元；MPC = 0.75，乘數 k = 4。增加政府支出 ΔG = 400 ÷ 4 = 100 億元，可令產出回到潛在水平。若改為減稅，稅收乘數 = −3，需減稅 400 ÷ 3 ≈ 133.3 億元。",
      tip: "政府支出乘數大於稅收乘數；同樣的缺口，減稅規模要比增加政府支出大。",
      mistake: "把增加轉移支付與增加政府購買當成效果一樣；轉移支付先增加可支配收入，再按 MPC 傳導，乘數較小。",
      glossary: [
        { term: "財政政策", def: "政府透過稅收與公共支出影響總需求與經濟活動的政策。" },
        { term: "自動穩定器", def: "毋須政府另作決定、在經濟波動時自動緩衝的財政機制，如累進稅與失業救濟。" },
        { term: "擠出效應", def: "政府增加借貸與支出，令利率上升而減少私人投資的現象。" }
      ]
    },
    en: {
      intro: "Fiscal policy uses government taxation and spending to influence aggregate demand. Expansionary policy (raising government spending or cutting taxes) shifts aggregate demand right to close a deflationary gap and fight a recession; contractionary policy does the opposite to close an inflationary gap and cool inflation. Automatic stabilisers (progressive taxes, unemployment benefits) cushion the economy automatically, without waiting for decisions. Constraints include time lags, crowding out, debt burdens and political resistance.",
      steps: [
        "Compute the output gap = potential output − current equilibrium output.",
        "Find the multiplier $k = 1 ÷ (1 - MPC)$.",
        "Required change in government spending $\\Delta G$ = gap ÷ k.",
        "For a tax cut: tax multiplier = −MPC ÷ (1 − MPC), so the required tax cut = gap ÷ the absolute value of the tax multiplier.",
        "State the constraints: time lags and crowding out."
      ],
      example: "Potential output is HKD 500 billion and current equilibrium output is HKD 460 billion, giving an output gap of HKD 40 billion. With MPC = 0.75, the multiplier k = 4. Raising government spending by ΔG = 40 ÷ 4 = HKD 10 billion restores output to potential. Using a tax cut instead, the tax multiplier = −3, so the required tax cut is 40 ÷ 3 ≈ HKD 13.3 billion.",
      tip: "The government-spending multiplier is larger than the tax multiplier; for the same gap, a tax cut must be larger than an increase in government spending.",
      mistake: "Treating an increase in transfer payments as equivalent to an increase in government purchases; transfers first raise disposable income and then work through the MPC, so the multiplier is smaller.",
      glossary: [
        { term: "Fiscal policy", def: "The use of government taxation and public spending to influence aggregate demand and economic activity." },
        { term: "Automatic stabiliser", def: "A fiscal mechanism that cushions fluctuations without new decisions, such as progressive taxes and unemployment benefits." },
        { term: "Crowding out", def: "A fall in private investment when government borrowing and spending push interest rates up." }
      ]
    },
    visual: { kind: "adas", shifts: ["AD+"], desc: { zh: "擴張性財政政策令總需求右移，短期產出增加、物價有上升壓力。", en: "Expansionary fiscal policy shifts aggregate demand right, raising output in the short run and putting upward pressure on prices." } }
  },

  's6.monetary_policy': {
    zh: {
      intro: "貨幣政策是中央銀行透過控制貨幣供應與利率影響總需求。工具包括公開市場操作（買賣政府或外匯基金票據）、調整法定準備金率與貼現窗利率。傳導機制：貨幣供應增加 → 利率下降 → 投資與消費增加 → 總需求右移 → 產出與物價上升。限制包括時滯、流動性陷阱與投資對利率不敏感；香港實行聯繫匯率，利率主要跟隨美元走勢，貨幣政策自主性有限。",
      steps: [
        "分辨政策是擴張性還是緊縮性。",
        "以準備金率求貨幣乘數 1 ÷ r，估算存款與貨幣供應的變化。",
        "追蹤傳導：M → r → 投資與消費 → AD → 產出與物價。",
        "評估限制：時滯、流動性陷阱、投資敏感度與聯繫匯率。"
      ],
      example: "基礎貨幣（準備金）800 億元，法定準備金率由 20% 降至 10%。原本乘數 = 5，總存款上限 4,000 億元；新乘數 = 10，總存款上限 8,000 億元，即可多支持 4,000 億元存款。貨幣供應增加令利率有下調壓力，投資與消費上升，總需求右移。",
      tip: "擴張性貨幣政策 = 增加貨幣供應、壓低利率；記住傳導鏈「M → r → I、C → AD → Y」。",
      mistake: "以為中央銀行可以直接命令商業銀行減息；央行是透過改變貨幣供應與短期利率來影響市場利率。",
      glossary: [
        { term: "貨幣政策", def: "中央銀行透過控制貨幣供應與利率以影響總需求的政策。" },
        { term: "公開市場操作", def: "中央銀行在市場買賣政府債券或票據，以調節銀行體系的準備金與貨幣供應。" },
        { term: "傳導機制", def: "政策工具經利率、資產價格與信貸等渠道影響投資、消費與總需求的過程。" }
      ]
    },
    en: {
      intro: "Monetary policy is the central bank's use of control over the money supply and interest rates to influence aggregate demand. Tools include open market operations (buying or selling government or Exchange Fund bills), changes in the required reserve ratio and the discount window rate. The transmission mechanism runs: money supply rises → interest rate falls → investment and consumption rise → aggregate demand shifts right → output and prices rise. Constraints include time lags, the liquidity trap and investment that is insensitive to interest rates; with its linked exchange rate, Hong Kong's interest rates follow US rates closely, so monetary policy autonomy is limited.",
      steps: [
        "Decide whether the policy is expansionary or contractionary.",
        "Use the reserve ratio to find the money multiplier 1 ÷ r and estimate changes in deposits and the money supply.",
        "Trace the transmission: M → r → investment and consumption → AD → output and prices.",
        "Evaluate the constraints: time lags, liquidity trap, investment sensitivity and the linked exchange rate."
      ],
      example: "Base money (reserves) is HKD 80 billion and the required reserve ratio falls from 20% to 10%. The original multiplier of 5 supports at most HKD 400 billion of deposits; the new multiplier of 10 supports up to HKD 800 billion, so deposits can rise by HKD 400 billion. The larger money supply puts downward pressure on interest rates, investment and consumption rise, and aggregate demand shifts right.",
      tip: "Expansionary monetary policy = a larger money supply and lower interest rates; remember the chain M → r → I, C → AD → Y.",
      mistake: "Assuming the central bank can simply order commercial banks to cut rates; it changes the money supply and short-term rates to influence market interest rates.",
      glossary: [
        { term: "Monetary policy", def: "Central-bank control of the money supply and interest rates to influence aggregate demand." },
        { term: "Open market operations", def: "Central-bank purchases or sales of government securities or bills to adjust bank reserves and the money supply." },
        { term: "Transmission mechanism", def: "The channels through which policy tools affect interest rates, asset prices, credit, investment, consumption and aggregate demand." }
      ]
    },
    visual: { kind: "adas", shifts: ["AD+"], desc: { zh: "擴張性貨幣政策令總需求右移，短期產出與物價上升。", en: "Expansionary monetary policy shifts aggregate demand right, raising output and prices in the short run." } }
  },

  's6.supply_side': {
    zh: {
      intro: "供應面政策針對經濟的生產能力，透過提升生產要素的質與量、改善技術與效率，令長期總供應（潛在產出）增加，短期亦可壓低成本而令短期總供應右移。例子包括教育與培訓、研究與開發、基建、放寬規管、提供投資誘因與提升勞動市場效率。它與刺激總需求的需求面政策不同，較適合處理成本推動型通脹與滯脹，但見效較慢。",
      steps: [
        "分清政策影響的是總需求還是總供應。",
        "問一問：政策是否提升生產力或生產要素的數量？",
        "推演長期總供應（潛在產出）與短期總供應的移動方向。",
        "比較短期代價與長期得益，並指出見效需時。"
      ],
      example: "政府資助職業培訓，令每名工人的年均產出由 100 單位升至 110 單位（+10%）。若就業量不變，潛在產出由 2,000 億元升至 2,200 億元，同時生產成本下降令短期總供應右移，屬非通脹式的增長。",
      tip: "記住分界：增加政府購買是需求面；提升工人技能與技術才是供應面。",
      mistake: "以為所有減稅都是供應面政策。增加可支配收入、刺激消費屬需求面；降低利得稅以鼓勵投資與創業才偏向供應面。",
      glossary: [
        { term: "供應面政策", def: "旨在提升生產力與潛在產出的政策，如教育、培訓、研發、基建與放寬規管。" },
        { term: "潛在產出", def: "在既定資源與技術下，經濟長期可持續生產的最高產出。" },
        { term: "生產力", def: "每單位投入（例如每名工人）所生產的產出。" }
      ]
    },
    en: {
      intro: "Supply-side policy targets the economy's productive capacity. By improving the quality and quantity of factors of production, technology and efficiency, it raises long-run aggregate supply (potential output) and can also shift short-run aggregate supply right by lowering costs. Examples include education and training, research and development, infrastructure, deregulation, investment incentives and a more efficient labour market. Unlike demand-side policy, it suits cost-push inflation and stagflation, but its effects take longer to appear.",
      steps: [
        "Decide whether the policy affects aggregate demand or aggregate supply.",
        "Ask whether the policy raises productivity or the quantity of factors of production.",
        "Work out the direction of the shift in long-run supply (potential output) and short-run supply.",
        "Compare short-run costs with long-run benefits and note the time required."
      ],
      example: "Government-funded vocational training raises output per worker from 100 to 110 units a year (+10%). With employment unchanged, potential output rises from HKD 200 billion to HKD 220 billion, while lower production costs shift short-run aggregate supply right — non-inflationary growth.",
      tip: "Remember the dividing line: raising government purchases is demand-side; raising workers' skills and technology is supply-side.",
      mistake: "Assuming every tax cut is supply-side. Raising disposable income and stimulating consumption is demand-side; cutting profits tax to encourage investment and start-ups leans supply-side.",
      glossary: [
        { term: "Supply-side policy", def: "Policy aimed at raising productivity and potential output, such as education, training, R&D, infrastructure and deregulation." },
        { term: "Potential output", def: "The maximum output an economy can sustain in the long run with given resources and technology." },
        { term: "Productivity", def: "Output produced per unit of input, for example output per worker." }
      ]
    },
    visual: { kind: "adas", shifts: ["SRAS+"], desc: { zh: "供應面政策令短期總供應右移，成本下降、物價有下行壓力；長期潛在產出亦會增加。", en: "Supply-side policy shifts short-run aggregate supply right, lowering costs and price pressure; potential output also rises in the long run." } }
  },

  's6.trade_theory': {
    zh: {
      intro: "比較優勢是指以較低機會成本生產某物品的能力，是貿易得益的基礎：各國專業化生產自己有比較優勢的物品再交換，總產量增加。關稅是對進口貨徵收的稅（例如按每單位計的從量關稅），會提高國內價格、減少進口、增加本地生產，令本地生產者盈餘上升，並帶來關稅收入；但消費者盈餘減少，整體仍有無謂損失。配額效果類似，但配額租金不一定歸政府。",
      steps: [
        "分別計算兩國生產每單位物品的機會成本。",
        "機會成本較低者在該物品有比較優勢。",
        "互利交換比率介乎兩國國內機會成本之間。",
        "關稅題：國內價 = 世界價 + 從量關稅，再求 Qd、Qs、進口量、稅收與無謂損失。"
      ],
      example: "甲國 1 單位 X 的機會成本是 2 單位 Y，乙國是 0.5 單位 Y，故乙國在 X 有比較優勢，甲國在 Y 有比較優勢；互利交換比率為 1X 換 0.5Y 至 2Y 之間。關稅例：Qd = 100 − 2P、Qs = 20 + 2P、世界價 15、從量關稅 2，則國內價 17、Qd = 66、Qs = 54、進口 12、關稅收入 24、無謂損失 = 0.5 × 4 × 2 + 0.5 × 4 × 2 = 8。",
      tip: "無謂損失來自兩邊：消費減少（Qd 下降）與被取代的本地高成本生產（Qs 上升）。",
      mistake: "把絕對優勢當成比較優勢；即使一國樣樣都生產得較多，仍應生產機會成本較低的物品。",
      glossary: [
        { term: "比較優勢", def: "以較低機會成本生產某物品的能力。" },
        { term: "從量關稅", def: "按每單位進口貨徵收固定金額的稅。" },
        { term: "無謂損失", def: "政策令總盈餘減少的淨損失，資源未達效率配置。" }
      ]
    },
    en: {
      intro: "Comparative advantage is the ability to produce a good at a lower opportunity cost, and it is the basis of gains from trade: when each country specialises in the good in which it has a comparative advantage and trades, total output rises. A tariff is a tax on imports (for example a per-unit tariff) that raises the domestic price, reduces imports and increases domestic production and producer surplus, and generates tariff revenue; but consumer surplus falls and there is a net deadweight loss. A quota has similar effects, but the quota rents need not go to the government.",
      steps: [
        "Compute each country's opportunity cost of producing one unit of each good.",
        "The country with the lower opportunity cost has the comparative advantage.",
        "The mutually beneficial exchange ratio lies between the two domestic opportunity costs.",
        "For a tariff: domestic price = world price + per-unit tariff; then find Qd, Qs, imports, revenue and deadweight loss."
      ],
      example: "In country A the opportunity cost of 1 unit of X is 2 units of Y, while in country B it is 0.5 units of Y, so B has a comparative advantage in X and A in Y; the mutually beneficial exchange ratio is between 0.5Y and 2Y per X. Tariff example: Qd = 100 − 2P, Qs = 20 + 2P, world price 15 and a per-unit tariff of 2, so the domestic price is 17, Qd = 66, Qs = 54, imports = 12, tariff revenue = 24 and deadweight loss = 0.5 × 4 × 2 + 0.5 × 4 × 2 = 8.",
      tip: "Deadweight loss comes from two sides: the consumption lost (lower Qd) and the higher-cost domestic production that replaces imports (higher Qs).",
      mistake: "Confusing absolute advantage with comparative advantage; even if one country produces more of everything, it should still specialise where its opportunity cost is lower.",
      glossary: [
        { term: "Comparative advantage", def: "The ability to produce a good at a lower opportunity cost." },
        { term: "Per-unit tariff", def: "A fixed amount of tax charged on each unit of imported goods." },
        { term: "Deadweight loss", def: "The net loss of total surplus caused by a policy, meaning resources are not allocated efficiently." }
      ]
    }
  },

  's6.exchange_rate': {
    zh: {
      intro: "匯率是兩種貨幣的交換比率。以「1 單位外幣兌多少本幣」報價時，數字上升代表本幣貶值，數字下跌代表本幣升值。浮動匯率由外匯供求決定：出口增加、資本流入或利率上升會增加本幣需求，令本幣升值。購買力平價（PPP）匯率 = 本國物價 ÷ 外國物價（同一籃子），可用來判斷幣值是否高估或低估；實質匯率 = 名義匯率 × 外國物價 ÷ 本國物價。",
      steps: [
        "寫清楚報價方向：每 1 單位外幣兌多少本幣。",
        "交叉匯率：把兩個用同一本幣表示的匯率相除。",
        "升值或貶值幅度 = （新匯率 − 舊匯率）÷ 舊匯率 × 100%，再判斷方向。",
        "PPP 匯率 = 本國物價 ÷ 外國物價；比較 PPP 與名義匯率判斷高估或低估。"
      ],
      example: "1 美元 = 7.8 港元、1 英鎊 = 10.14 港元，則 1 英鎊 = 10.14 ÷ 7.8 = 1.3 美元。若匯率由 7.8 跌至 7.5 港元兌 1 美元，美元貶值（7.8 − 7.5）÷ 7.8 × 100% ≈ 3.8%，即港元升值（7.8 − 7.5）÷ 7.5 × 100% = 4.0%。同一籃子貨品在香港售 780 港元、在美國售 100 美元，PPP 匯率 = 780 ÷ 100 = 7.8；若市價為 7.5，實質匯率 = 7.5 × 100 ÷ 780 ≈ 0.96，小於 1，表示本國物價相對較高、本幣實質偏強。",
      tip: "先寫清報價方向再判斷升貶值：「每 1 美元兌港元」的數字下跌，代表港元升值、美元貶值。",
      mistake: "看見「1 美元兌港元由 7.8 跌至 7.5」就說美元升值；美元能換到的港元少了，其實是美元貶值、港元升值。",
      glossary: [
        { term: "匯率", def: "兩種貨幣之間的交換比率。" },
        { term: "升值與貶值", def: "本幣能兌換更多外幣為升值，能兌換更少外幣為貶值。" },
        { term: "購買力平價（PPP）", def: "同一籃子貨品在兩地價格相等時所對應的匯率，等於本國物價除以外國物價。" }
      ]
    },
    en: {
      intro: "An exchange rate is the price of one currency in terms of another. When quoted as 'how much domestic currency buys one unit of foreign currency', a higher number means the domestic currency has depreciated and a lower number means it has appreciated. Floating rates are set by foreign-exchange demand and supply: higher exports, capital inflows or higher interest rates raise demand for the domestic currency and cause appreciation. The purchasing power parity (PPP) rate = domestic price ÷ foreign price of the same basket and can be used to judge over- or under-valuation; the real exchange rate = nominal exchange rate × foreign price ÷ domestic price.",
      steps: [
        "Write down the direction of the quote: how much domestic currency buys one unit of foreign currency.",
        "For a cross rate, divide the two rates quoted in the same home currency.",
        "Appreciation or depreciation = (new rate − old rate) ÷ old rate × 100%, then interpret the direction.",
        "PPP rate = domestic price ÷ foreign price; compare the PPP rate with the nominal rate to judge over- or under-valuation."
      ],
      example: "If USD 1 = HKD 7.8 and GBP 1 = HKD 10.14, then GBP 1 = 10.14 ÷ 7.8 = USD 1.3. If the rate falls from 7.8 to 7.5 HKD per USD, the USD depreciates by (7.8 − 7.5) ÷ 7.8 × 100% ≈ 3.8%, so the HKD appreciates by (7.8 − 7.5) ÷ 7.5 × 100% = 4.0%. A basket costs HKD 780 in Hong Kong and USD 100 in the US, so the PPP rate = 780 ÷ 100 = 7.8; if the market rate is 7.5, the real exchange rate = 7.5 × 100 ÷ 780 ≈ 0.96, below 1, meaning domestic prices are relatively high and the domestic currency is strong in real terms.",
      tip: "Settle the direction of the quote before judging appreciation: when 'HKD per USD' falls, the HKD appreciates and the USD depreciates.",
      mistake: "Seeing 'HKD per USD falls from 7.8 to 7.5' and saying the USD has appreciated; each USD now buys fewer HKD, so the USD has depreciated and the HKD has appreciated.",
      glossary: [
        { term: "Exchange rate", def: "The rate at which one currency can be exchanged for another." },
        { term: "Appreciation and depreciation", def: "Appreciation means the domestic currency buys more foreign currency; depreciation means it buys less." },
        { term: "Purchasing power parity (PPP)", def: "The exchange rate at which the same basket of goods costs the same in two places, equal to the domestic price divided by the foreign price." }
      ]
    }
  },

  's6.balance_payments': {
    zh: {
      intro: "國際收支帳記錄一經濟體與世界其他地方的交易。經常帳 = 貨物淨出口 + 服務淨出口 + 收入淨額 + 轉移淨額；資本帳記錄資本轉移與非生產、非金融資產的買賣；金融帳記錄投資與資金流動。在簡化模型中，經常帳盈餘由資本與金融帳的資金流出抵銷，整體國際收支恆等於零。",
      steps: [
        "逐項列出貨物、服務、收入與轉移的數字，注意進口與資金流出用負號。",
        "經常帳 = 貨物淨出口 + 服務淨出口 + 收入淨額 + 轉移淨額。",
        "資本與金融帳記錄資金流入（正）與流出（負）。",
        "檢查：經常帳 + 資本與金融帳 = 0（簡化模型）。"
      ],
      example: "貨物出口 4,000、貨物進口 4,500（貨物淨出口 −500）、服務淨出口 +800、收入淨額 −100、轉移淨額 +50，則經常帳 = −500 + 800 − 100 + 50 = +250（盈餘）。簡化模型下，資本與金融帳合計應為 −250，即淨資金流出 250。",
      tip: "先分開貨物、服務、收入、轉移四項再加總；經常帳盈餘不代表整體一定「賺錢」，只是出口收入多於進口支出。",
      mistake: "以為經常帳盈餘一定代表經濟健康；盈餘也可能反映本地需求疲弱或儲蓄過多。",
      glossary: [
        { term: "經常帳", def: "貨物與服務淨出口、收入淨額及轉移淨額的總和。" },
        { term: "資本帳", def: "記錄資本轉移及非生產、非金融資產買賣的帳目。" },
        { term: "國際收支", def: "一經濟體與世界其他地方的經濟交易總帳，包括經常帳、資本帳與金融帳。" }
      ]
    },
    en: {
      intro: "The balance of payments records an economy's transactions with the rest of the world. The current account = net exports of goods + net exports of services + net income + net transfers; the capital account records capital transfers and purchases or sales of non-produced, non-financial assets; the financial account records investment and capital flows. In a simplified model, a current account surplus is offset by net capital and financial outflows, so the overall balance of payments is always zero.",
      steps: [
        "List goods, services, income and transfers item by item, using negative signs for imports and outflows.",
        "Current account = net exports of goods + net exports of services + net income + net transfers.",
        "The capital and financial accounts record inflows (positive) and outflows (negative).",
        "Check: current account + capital and financial accounts = 0 (simplified model)."
      ],
      example: "Goods exports are 4,000 and goods imports 4,500 (net exports of goods −500), net exports of services +800, net income −100 and net transfers +50. The current account = −500 + 800 − 100 + 50 = +250, a surplus. In the simplified model the capital and financial accounts together must be −250, i.e. net outflows of 250.",
      tip: "Split the current account into goods, services, income and transfers before adding; a current account surplus does not mean the economy is 'making money', only that export earnings exceed import spending.",
      mistake: "Assuming a current account surplus always means a healthy economy; a surplus can also reflect weak domestic demand or excess saving.",
      glossary: [
        { term: "Current account", def: "Net exports of goods and services plus net income and net transfers." },
        { term: "Capital account", def: "The account recording capital transfers and purchases or sales of non-produced, non-financial assets." },
        { term: "Balance of payments", def: "The overall account of an economy's transactions with the rest of the world: current, capital and financial accounts." }
      ]
    }
  },

  's6.growth_development': {
    zh: {
      intro: "經濟增長是實質 GDP 的增加，來源可分為生產要素累積（資本、勞動）與全要素生產力提升（技術、制度、效率）。人均實質 GDP 增長率約等於 GDP 增長率減人口增長率。經濟發展比增長更廣，還包括生活水平、教育、健康、收入分配與環境可持續性，常用指標有 HDI 與 Gini 係數。",
      steps: [
        "區分總量增長與人均增長，人均要用人口調整。",
        "增長率 = （新值 − 舊值）÷ 舊值 × 100%。",
        "人均增長率 ≈ GDP 增長率 − 人口增長率。",
        "估算翻倍時間：約 72 ÷ 年增長率（%）。",
        "增長之外，用 HDI、Gini 等指標評估發展。"
      ],
      example: "實質 GDP 由 1,000 億元增至 1,100 億元（+10%），人口由 100 萬增至 102 萬（+2%）。人均實質 GDP 由 10 萬元增至 1,100 ÷ 102 ≈ 10.78 萬元，增長約 7.8%（約等於 10% − 2%）。若年增長率為 6%，按 72 法則約 72 ÷ 6 = 12 年可翻一倍。",
      tip: "比較生活水平用「人均實質 GDP」；比較不同年份要用實質數字，避免物價變動干擾。",
      mistake: "把 GDP 增長等同經濟發展，忽略收入分配、環境與健康；或把名義 GDP 增長當成實質增長。",
      glossary: [
        { term: "經濟增長", def: "一經濟體實質 GDP 或人均實質 GDP 的增加。" },
        { term: "經濟發展", def: "生活水平、教育、健康、收入分配與環境質素的整體改善，範圍比增長更廣。" },
        { term: "全要素生產力", def: "資本與勞動以外、來自技術、制度與效率改進的產出增長來源。" }
      ]
    },
    en: {
      intro: "Economic growth is an increase in real GDP. Its sources are factor accumulation (capital and labour) and rising total factor productivity (technology, institutions and efficiency). The growth rate of real GDP per capita is approximately the GDP growth rate minus the population growth rate. Economic development is broader than growth: it also covers living standards, education, health, income distribution and environmental sustainability, often measured by the HDI and the Gini coefficient.",
      steps: [
        "Distinguish total growth from per-capita growth, which adjusts for population.",
        "Growth rate = (new value − old value) ÷ old value × 100%.",
        "Per-capita growth ≈ GDP growth − population growth.",
        "Estimate doubling time: about 72 ÷ the annual growth rate in per cent.",
        "Beyond growth, use indicators such as the HDI and the Gini coefficient to assess development."
      ],
      example: "Real GDP rises from HKD 100 billion to HKD 110 billion (+10%) while population rises from 1 million to 1.02 million (+2%). Real GDP per capita rises from HKD 100,000 to HKD 110 billion ÷ 1.02 million ≈ HKD 107,800, a rise of about 7.8% (approximately 10% − 2%). At an annual growth rate of 6%, the rule of 72 implies about 72 ÷ 6 = 12 years to double.",
      tip: "Compare living standards using real GDP per capita; compare years using real rather than nominal figures to avoid price effects.",
      mistake: "Equating GDP growth with economic development and ignoring income distribution, the environment and health; or treating nominal GDP growth as real growth.",
      glossary: [
        { term: "Economic growth", def: "An increase in an economy's real GDP or real GDP per capita." },
        { term: "Economic development", def: "Broad improvement in living standards, education, health, income distribution and the environment, wider than growth." },
        { term: "Total factor productivity", def: "The part of output growth coming from technology, institutions and efficiency rather than capital and labour." }
      ]
    }
  },

  'chal.trade': {
    zh: {
      intro: "貿易挑戰題的解難策略：先把生產數據統一成同一種表達方式（「每小時產量」與「每單位所需工時」互為倒數），再逐國計算機會成本，用機會成本表找比較優勢。最後用「貿易前後總產量」驗證得益，並確認交換比率落在兩國機會成本之間，否則不會有互利的專業化。",
      steps: [
        "把兩國數據換成同一表達方式：每小時產量，或每單位所需工時。",
        "用「放棄的 Y ÷ 增加的 X」計算每國每物品的機會成本。",
        "機會成本較低者在該物品有比較優勢，寫出專業化方向。",
        "以固定資源（例如各 24 小時）計貿易前總產量與專業化後總產量，差額就是潛在得益。",
        "用落在兩國機會成本之間的交換比率分配得益，並驗算雙方都比貿易前好。"
      ],
      example: "兩國各 24 小時。甲國：1X 需 2 小時、1Y 需 3 小時；乙國：1X 需 4 小時、1Y 需 2 小時。甲國 1X 的機會成本 = 2 ÷ 3 ≈ 0.67Y，乙國 = 4 ÷ 2 = 2Y，故甲國在 X 有比較優勢；1Y 的機會成本甲國 1.5X、乙國 0.5X，故乙國在 Y 有比較優勢。貿易前甲產 6X + 4Y、乙產 3X + 6Y，合共 9X + 10Y；專業化後甲產 12X、乙產 12Y，合共 12X + 12Y。按 1X = 1Y 交換 4X ↔ 4Y：甲得 8X + 4Y（+2X），乙得 4X + 8Y（+1X + 2Y），雙方都得益。",
      tip: "數據是「每小時產量」時，機會成本 = 另一物品的每小時產量 ÷ 該物品的每小時產量；若是「每單位工時」則反過來。",
      mistake: "把絕對優勢（用較少資源生產）當成比較優勢；比較優勢只看機會成本，不看絕對產量。",
      glossary: [
        { term: "比較優勢", def: "以較低機會成本生產某物品的能力。" },
        { term: "交換比率", def: "兩物品互相交換的比例，須介乎兩國的國內機會成本之間才有互利空間。" },
        { term: "專業化", def: "各國把資源集中生產自己有比較優勢的物品。" }
      ]
    },
    en: {
      intro: "A strategy for trade challenge problems: first put the production data into one common form ('output per hour' and 'hours per unit' are reciprocals), then compute each country's opportunity costs and use an opportunity-cost table to find comparative advantage. Last, verify the gains by comparing total output before and after trade, and check that the exchange ratio lies between the two opportunity costs, otherwise mutually beneficial specialisation is impossible.",
      steps: [
        "Convert both countries' data into the same form: output per hour, or hours per unit.",
        "Compute each country's opportunity cost of each good as 'units of Y given up ÷ extra units of X'.",
        "The lower opportunity cost shows comparative advantage; state the specialisation pattern.",
        "With fixed resources (for example 24 hours each), compare total output before trade with total output after specialisation; the difference is the potential gain.",
        "Allocate the gain using an exchange ratio between the two opportunity costs, and check that both countries are better off than before trade."
      ],
      example: "Each country has 24 hours. In country A, 1X needs 2 hours and 1Y needs 3 hours; in country B, 1X needs 4 hours and 1Y needs 2 hours. Country A's opportunity cost of 1X = 2 ÷ 3 ≈ 0.67Y and country B's = 4 ÷ 2 = 2Y, so A has a comparative advantage in X; for 1Y, A gives up 1.5X and B gives up 0.5X, so B has a comparative advantage in Y. Before trade A produces 6X + 4Y and B produces 3X + 6Y, a total of 9X + 10Y; after specialisation A produces 12X and B produces 12Y, a total of 12X + 12Y. Trading 4X for 4Y at 1X = 1Y, A ends with 8X + 4Y (+2X) and B ends with 4X + 8Y (+1X + 2Y), so both gain.",
      tip: "When data are 'output per hour', opportunity cost = the other good's output per hour ÷ this good's output per hour; with 'hours per unit' it is the other way round.",
      mistake: "Confusing absolute advantage (using fewer resources) with comparative advantage, which depends only on opportunity cost.",
      glossary: [
        { term: "Comparative advantage", def: "The ability to produce a good at a lower opportunity cost." },
        { term: "Exchange ratio", def: "The rate at which two goods trade; it must lie between the two domestic opportunity costs for mutual gains." },
        { term: "Specialisation", def: "Concentrating resources on producing the good in which a country has a comparative advantage." }
      ]
    }
  },

  'chal.elasticity_tax': {
    zh: {
      intro: "多步策略：先求無稅均衡（P0、Q0），再把從量稅放進供需：令買方價為 Pc、賣方價為 Ps = Pc − t，解 Qd(Pc) = Qs(Pc − t) 得新交易量 Q1。稅負歸宿看彈性：彈性較小的一方承擔較多稅負。最後計稅收 = t × Q1，無謂損失 = 0.5 × (Q0 − Q1) × t（線性供需）。",
      steps: [
        "令 Qd = Qs 求無稅均衡 P0、Q0。",
        "設 Pc = Ps + t，代入需求與供應求 Q1、Pc、Ps。",
        "消費者每單位稅負 = Pc − P0；生產者每單位稅負 = P0 − Ps；兩者相加應等於 t。",
        "稅收 = t × Q1；無謂損失 = 0.5 × (Q0 − Q1) × t。",
        "比較兩方稅負，對照供需彈性解釋歸宿。"
      ],
      example: "Qd = 120 − 2P、Qs = 30 + 3P，無稅均衡 P0 = 18、Q0 = 84。從量稅 t = 10：120 − 2Pc = 30 + 3(Pc − 10)，解得 Pc = 24、Ps = 14、Q1 = 72。消費者負擔 6、生產者負擔 4（6 + 4 = 10）；稅收 = 72 × 10 = 720；無謂損失 = 0.5 × (84 − 72) × 10 = 60。",
      tip: "用「消費者負擔 + 生產者負擔 = 稅額」即時驗算；無謂損失只看交易量減少，與稅收是兩回事。",
      mistake: "把稅收當成社會得益；稅收只是買賣雙方轉移給政府的金額，無謂損失才是整體淨損失。",
      glossary: [
        { term: "稅負歸宿", def: "從量稅最終由消費者與生產者分擔的比例，彈性較小的一方負擔較多。" },
        { term: "從量稅", def: "按每單位貨品徵收固定金額的稅。" },
        { term: "無謂損失", def: "因交易量低於有效水平而損失的總盈餘，圖上是稅楔旁邊的三角形。" }
      ]
    },
    en: {
      intro: "Multi-step strategy: find the no-tax equilibrium (P0, Q0), then insert the per-unit tax into demand and supply: let the buyer's price be Pc and the seller's price be Ps = Pc − t, and solve Qd(Pc) = Qs(Pc − t) for the new quantity Q1. Incidence depends on elasticity: the less elastic side bears more of the tax. Finally, tax revenue = t × Q1 and deadweight loss = 0.5 × (Q0 − Q1) × t for linear demand and supply.",
      steps: [
        "Set Qd = Qs to find the no-tax equilibrium P0 and Q0.",
        "Set Pc = Ps + t and substitute into demand and supply to find Q1, Pc and Ps.",
        "Consumer burden per unit = Pc − P0; producer burden per unit = P0 − Ps; the two must add up to t.",
        "Tax revenue = t × Q1; deadweight loss = 0.5 × (Q0 − Q1) × t.",
        "Compare the two burdens and link the incidence to the elasticities."
      ],
      example: "Qd = 120 − 2P and Qs = 30 + 3P give the no-tax equilibrium P0 = 18 and Q0 = 84. With a per-unit tax t = 10: 120 − 2Pc = 30 + 3(Pc − 10), so Pc = 24, Ps = 14 and Q1 = 72. The consumer burden is 6 and the producer burden is 4 (6 + 4 = 10); tax revenue = 72 × 10 = 720 and deadweight loss = 0.5 × (84 − 72) × 10 = 60.",
      tip: "Use 'consumer burden + producer burden = tax' as an instant check; deadweight loss depends on the fall in quantity, not on the tax revenue.",
      mistake: "Treating tax revenue as a social benefit; revenue is merely a transfer from buyers and sellers to the government, while deadweight loss is the net loss to society.",
      glossary: [
        { term: "Tax incidence", def: "The division of a per-unit tax between consumers and producers; the less elastic side bears more." },
        { term: "Per-unit tax", def: "A fixed amount of tax charged on each unit of a good." },
        { term: "Deadweight loss", def: "The total surplus lost because the quantity traded falls below the efficient level; the triangles beside the tax wedge." }
      ]
    }
  },

  'chal.macro': {
    zh: {
      intro: "開放經濟的解難步驟：先寫清消費、稅與進口的關係，再找出每一輪的漏出，得出乘數 = 1 ÷ [1 − c(1 − t) + m]。接着算產出缺口，最後用「缺口 ÷ 乘數」求政策規模。儲蓄、稅與進口三個漏出都令乘數變小，所以開放經濟的政策效果比封閉經濟弱。",
      steps: [
        "寫出 C = a + c(1 − t)Y 與 M = mY（c 為 MPC、t 為稅率、m 為邊際進口傾向）。",
        "代入 Y = C + I + G + X − M，整理出乘數 = 1 ÷ [1 − c(1 − t) + m]。",
        "算產出缺口 = 潛在產出 − 現時均衡產出。",
        "所需 ΔG = 缺口 ÷ 乘數；若用減稅或轉移支付，則用相應乘數。",
        "比較封閉經濟乘數，說明漏出如何削弱政策效果。"
      ],
      example: "c = 0.8、稅率 t = 0.25、邊際進口傾向 m = 0.1，乘數 = 1 ÷ [1 − 0.8 × 0.75 + 0.1] = 1 ÷ 0.5 = 2。若潛在產出 10,000 億元、現時均衡 9,600 億元（缺口 400），需增加政府支出 ΔG = 400 ÷ 2 = 200 億元。對照封閉經濟乘數 = 1 ÷ (1 − 0.6) = 2.5，開放經濟的乘數明顯較小。",
      tip: "先算分母「漏出總和」，再取倒數；分母越大（漏出越多），乘數越小，所需政策規模越大。",
      mistake: "忘記稅與進口也是漏出，只用 1 ÷ (1 − MPC) 計算開放經濟乘數，令所需政策規模被低估。",
      glossary: [
        { term: "開放經濟乘數", def: "計入稅收與進口漏出後，自發支出變動對均衡收入的放大倍數。" },
        { term: "邊際進口傾向", def: "每多一單位收入中用於進口的比例。" },
        { term: "產出缺口", def: "潛在產出與現時均衡產出之間的差距。" }
      ]
    },
    en: {
      intro: "A strategy for open-economy problems: write down how consumption, taxes and imports are related, identify the leakages in each round, and derive the multiplier = 1 ÷ [1 − c(1 − t) + m]. Then compute the output gap and use 'gap ÷ multiplier' to find the policy size. Saving, taxes and imports all reduce the multiplier, so policy is weaker in an open economy than in a closed one.",
      steps: [
        "Write C = a + c(1 − t)Y and M = mY (c is the MPC, t the tax rate, m the marginal propensity to import).",
        "Substitute into Y = C + I + G + X − M and rearrange to get the multiplier = 1 ÷ [1 − c(1 − t) + m].",
        "Compute the output gap = potential output − current equilibrium output.",
        "Required ΔG = gap ÷ multiplier; for a tax cut or transfers, use the relevant multiplier.",
        "Compare with the closed-economy multiplier and explain how leakages weaken policy."
      ],
      example: "With c = 0.8, a tax rate t = 0.25 and a marginal propensity to import m = 0.1, the multiplier = 1 ÷ [1 − 0.8 × 0.75 + 0.1] = 1 ÷ 0.5 = 2. If potential output is HKD 1,000 billion and current equilibrium output is HKD 960 billion (a gap of HKD 40 billion), the required rise in government spending is ΔG = 40 ÷ 2 = HKD 20 billion. The closed-economy multiplier would be 1 ÷ (1 − 0.6) = 2.5, clearly larger.",
      tip: "Compute the denominator (total leakage) first and then take its reciprocal; a larger denominator means a smaller multiplier and a larger required policy change.",
      mistake: "Forgetting that taxes and imports are leakages and using only 1 ÷ (1 − MPC) for the open-economy multiplier, which understates the policy size needed.",
      glossary: [
        { term: "Open-economy multiplier", def: "The magnification of a change in autonomous spending on equilibrium income once tax and import leakages are included." },
        { term: "Marginal propensity to import", def: "The proportion of an extra unit of income spent on imports." },
        { term: "Output gap", def: "The difference between potential output and current equilibrium output." }
      ]
    }
  },

  'chal.finance': {
    zh: {
      intro: "財務數學的解難流程：先畫時間線，把初始投資與各期現金流放在正確時點；再逐期折現，$PV = CF \\div (1 + r)^t$；最後 NPV = 各期現值總和 − 初始投資。NPV 大於 0 表示回報高於資本機會成本，值得投資；NPV 等於 0 是分界線；NPV 小於 0 應拒絕。",
      steps: [
        "列出初始投資與各期現金流，注意正負號與時點。",
        "逐期折現：$PV = CF \\div (1 + r)^t$。",
        "把各期現值相加，得總現值。",
        "NPV = 總現值 − 初始投資。",
        "按 NPV 正負決定接受或拒絕；比較多個項目時選 NPV 最大者。"
      ],
      example: "初始投資 100 萬元，第 1 年現金流 55 萬元、第 2 年 60.5 萬元，折現率 10%。PV1 = 55 ÷ 1.1 = 50 萬元；PV2 = 60.5 ÷ 1.21 = 50 萬元；總現值 = 100 萬元。NPV = 100 − 100 = 0，表示剛好賺回 10% 的資本成本，接受與否在經濟上無差異；若要求回報高於 10%，便應拒絕。",
      tip: "先用 $(1 + r)^t$ 折現再相加，不要用「總現金流 − 初始投資」；折現率越高，未來現金流越不值錢。",
      mistake: "把 NPV = 0 當成「白做」而拒絕；NPV = 0 已賺回資本機會成本，等於取得正常利潤，不是虧損。",
      glossary: [
        { term: "現值", def: "未來一筆現金流按折現率換算成今天的價值。" },
        { term: "淨現值（NPV）", def: "各期現金流現值總和減去初始投資；大於 0 表示值得投資。" },
        { term: "折現率", def: "把未來現金流折現時所用的利率，反映資本的機會成本。" }
      ]
    },
    en: {
      intro: "A workflow for financial mathematics: draw a timeline and put the initial investment and each period's cash flow at the correct dates; discount each flow, $PV = CF \\div (1 + r)^t$; then NPV = the sum of present values − the initial investment. NPV above 0 means the return beats the opportunity cost of capital, so invest; NPV equal to 0 is the cut-off; NPV below 0 means reject.",
      steps: [
        "List the initial investment and each period's cash flow, watching signs and timing.",
        "Discount each flow: $PV = CF \\div (1 + r)^t$.",
        "Add the present values to get the total present value.",
        "NPV = total present value − initial investment.",
        "Accept or reject according to the sign of NPV; when comparing projects, choose the largest NPV."
      ],
      example: "An initial investment of HKD 1,000,000 gives cash flows of HKD 550,000 in year 1 and HKD 605,000 in year 2, with a discount rate of 10%. PV1 = 550,000 ÷ 1.1 = HKD 500,000; PV2 = 605,000 ÷ 1.21 = HKD 500,000, so the total present value is HKD 1,000,000. NPV = 1,000,000 − 1,000,000 = 0, meaning the project exactly earns back the 10% cost of capital, so accepting or rejecting makes no economic difference; if the required return were above 10%, the project should be rejected.",
      tip: "Discount with $(1 + r)^t$ before adding, rather than comparing total cash flow with the initial investment; a higher discount rate makes future cash flows worth less.",
      mistake: "Treating NPV = 0 as 'working for nothing' and rejecting the project; NPV = 0 already earns the opportunity cost of capital, i.e. normal profit, not a loss.",
      glossary: [
        { term: "Present value", def: "The value today of a future cash flow after discounting at the discount rate." },
        { term: "Net present value (NPV)", def: "The sum of present values of cash flows minus the initial investment; positive NPV means the investment is worthwhile." },
        { term: "Discount rate", def: "The interest rate used to discount future cash flows, reflecting the opportunity cost of capital." }
      ]
    }
  },

  'chal.game_data': {
    zh: {
      intro: "解難流程：博弈題用「最佳回應」逐格比較——固定對手的選擇，看自己哪個回報較高；雙方都不願單方面改變的組合，就是納什均衡。集中度用 HHI = 各廠商市佔率的平方和（0 至 10000）；不平等用 Gini 係數（0 至 1），由洛倫茨曲線計算。數據題先檢查單位（% 還是百分點）、基期與名義或實質。",
      steps: [
        "博弈：固定對手策略，逐列比較自己的回報，找出最佳回應。",
        "雙方都沒有誘因單方面改變的策略組合就是納什均衡。",
        "集中度：把各廠商市佔率平方後相加，得 HHI。",
        "Gini：由洛倫茨曲線資料點計算 $Gini = 1 - \\sum (x_i - x_{i-1})(y_i + y_{i-1})$。",
        "數據題先確認單位、基期與名義或實質，再作比較。"
      ],
      example: "四間廠商市佔率 40%、30%、20%、10%，HHI = 1,600 + 900 + 400 + 100 = 3,000。三點洛倫茨曲線 (0, 0)、(0.5, 0.2)、(1, 1)：Gini = 1 − [0.5 × 0.2 + 0.5 × 1.2] = 1 − 0.7 = 0.3。",
      tip: "博弈題先找優勢策略，找不到才逐格找納什均衡；記住 HHI 的 0 至 10000 與 Gini 的 0 至 1 兩個範圍。",
      mistake: "把「雙方合作回報最高」的組合當成納什均衡；納什均衡只要求雙方都無誘因單方面偏離。",
      glossary: [
        { term: "納什均衡", def: "在給定對手策略下，任何一方都無誘因單方面改變策略的策略組合。" },
        { term: "優勢策略", def: "不論對手選擇甚麼，都是自己回報最高的策略。" },
        { term: "赫芬達爾指數（HHI）", def: "各廠商市佔率平方的總和，用作量度市場集中度。" }
      ]
    },
    en: {
      intro: "Problem-solving routine: for games, compare best responses cell by cell — fix the opponent's choice and see which return is higher; a combination from which neither side wants to deviate unilaterally is a Nash equilibrium. Concentration is measured by HHI = the sum of squared market shares (0 to 10,000); inequality is measured by the Gini coefficient (0 to 1), computed from the Lorenz curve. For data questions, first check the units (per cent or percentage points), the base period and whether figures are nominal or real.",
      steps: [
        "Games: fix the opponent's strategy, compare your returns row by row and find the best response.",
        "A combination in which neither player has an incentive to deviate is a Nash equilibrium.",
        "Concentration: square each firm's market share and add them to get HHI.",
        "Gini: use the Lorenz curve points and $Gini = 1 - \\sum (x_i - x_{i-1})(y_i + y_{i-1})$.",
        "Data questions: confirm units, base period and nominal or real terms before comparing."
      ],
      example: "Four firms have market shares of 40%, 30%, 20% and 10%, so HHI = 1,600 + 900 + 400 + 100 = 3,000. A Lorenz curve through (0, 0), (0.5, 0.2) and (1, 1) gives Gini = 1 − [0.5 × 0.2 + 0.5 × 1.2] = 1 − 0.7 = 0.3.",
      tip: "Look for a dominant strategy first and only then search cell by cell for Nash equilibria; remember the ranges: HHI 0 to 10,000 and Gini 0 to 1.",
      mistake: "Treating the combination with the highest joint payoff as the Nash equilibrium; a Nash equilibrium only requires that neither side can gain by deviating alone.",
      glossary: [
        { term: "Nash equilibrium", def: "A strategy combination in which neither player has an incentive to change strategy unilaterally, given the other's choice." },
        { term: "Dominant strategy", def: "A strategy that gives the highest payoff no matter what the opponent chooses." },
        { term: "Herfindahl-Hirschman index (HHI)", def: "The sum of squared market shares, used to measure market concentration." }
      ]
    }
  },

  'chal.reasoning': {
    zh: {
      intro: "經濟推理的常見陷阱：把相關當因果、忽略機會成本、只看政策的第一層效果（破窗謬誤）、把個人理性推論為集體理性（合成謬誤）、把「平衡」誤解為每項都要相等。解難策略是連問三句：誘因是甚麼？代價由誰付？之後會發生甚麼（次級效果）？",
      steps: [
        "找出命題的隱含假設。",
        "問誘因與機會成本：有沒有人因此改變行為？",
        "推演第一輪與第二輪效果（次級反應）。",
        "分辨個人層面與整體層面（合成謬誤）。",
        "用反例或極端情況檢驗結論。"
      ],
      example: "節儉悖論：個人多儲蓄本是好事，但若所有人都同時多儲蓄，總消費下降、總需求左移，均衡收入減少，最終總儲蓄未必增加——個人理性不等於集體理性，這是合成謬誤的一種表現（短期、其他條件不變下）。",
      tip: "每次遇到「所以一定……」的推論，先問：其他條件是否不變？誘因有否改變？第二輪效果是甚麼？",
      mistake: "把「事後發生」當成「因此導致」（post hoc fallacy）；或以為國際收支「平衡」就等於貨物貿易盈虧為零。",
      glossary: [
        { term: "合成謬誤", def: "把對個人成立的事推論為對整體也成立；整體層面往往因價格與收入改變而得出相反結果。" },
        { term: "節儉悖論", def: "所有人同時增加儲蓄，總需求下降令收入減少，總儲蓄未必增加。" },
        { term: "次級效果", def: "政策的第一輪效果所引發的連鎖反應，往往與第一輪方向相反。" }
      ]
    },
    en: {
      intro: "Common traps in economic reasoning: taking correlation for causation, ignoring opportunity cost, looking only at the first-round effect of a policy (the broken-window fallacy), generalising from individual rationality to collective rationality (fallacy of composition), and misreading 'balance' as 'every item must be equal'. The strategy is to ask three questions: what are the incentives? who bears the cost? what happens next (secondary effects)?",
      steps: [
        "Identify the hidden assumptions of the claim.",
        "Ask about incentives and opportunity cost: will anyone change behaviour?",
        "Trace the first-round and second-round (secondary) effects.",
        "Separate the individual level from the aggregate level (fallacy of composition).",
        "Test the conclusion with counter-examples or extreme cases."
      ],
      example: "The paradox of thrift: saving more is good for an individual, but if everyone saves more at once, total consumption falls, aggregate demand shifts left and equilibrium income falls, so total saving may not rise at all — individual rationality is not collective rationality, a form of the fallacy of composition (in the short run, other things equal).",
      tip: "Whenever a claim says 'therefore it must be so', ask: are other things equal? have incentives changed? what is the second-round effect?",
      mistake: "Treating 'it happened after' as 'it was caused by' (post hoc fallacy); or assuming that a 'balanced' balance of payments means the goods trade must be exactly balanced.",
      glossary: [
        { term: "Fallacy of composition", def: "Assuming that what is true for an individual is also true for the whole; at the aggregate level, prices and incomes change and may reverse the result." },
        { term: "Paradox of thrift", def: "When everyone saves more at once, aggregate demand and income fall, so total saving may not rise." },
        { term: "Secondary effects", def: "The knock-on consequences of a policy's first-round effect, often opposite in direction." }
      ]
    }
  }

});

EconData.addBanks({

  's6.supply_side': [
    {
      id: "ss1",
      prompt: { zh: "以下哪一項屬於供應面政策？", en: "Which of the following is a supply-side policy?" },
      choices: [
        { id: "a", zh: "政府增加基建投資以縮短運輸時間。", en: "The government invests in infrastructure to shorten transport times." },
        { id: "b", zh: "政府向市民派發現金以刺激消費。", en: "The government hands out cash to households to boost consumption." },
        { id: "c", zh: "中央銀行在公開市場買入債券。", en: "The central bank buys bonds in the open market." },
        { id: "d", zh: "政府提高失業救濟金額。", en: "The government raises unemployment benefits." }
      ],
      answer: "a",
      hint: { zh: "供應面政策提升生產能力，不是刺激總需求。", en: "Supply-side policy raises productive capacity rather than stimulating aggregate demand." },
      solution: {
        zh: [
          "供應面政策旨在提升生產力與潛在產出；縮短運輸時間可降低生產與物流成本，提升效率。",
          "b 與 d 分別增加消費與轉移支付，屬需求面政策。",
          "c 是貨幣政策，透過利率影響總需求，亦屬需求面。",
          "因此答案為 a。"
        ],
        en: [
          "Supply-side policy aims to raise productivity and potential output; shorter transport times cut production and logistics costs and improve efficiency.",
          "b and d raise consumption and transfer payments respectively, which are demand-side measures.",
          "c is monetary policy, which affects aggregate demand through interest rates and is also demand-side.",
          "The answer is therefore a."
        ]
      }
    },
    {
      id: "ss2",
      prompt: { zh: "以下哪一項最可能令長期總供應（LRAS）右移？", en: "Which of the following is most likely to shift long-run aggregate supply (LRAS) to the right?" },
      choices: [
        { id: "a", zh: "放寬商業規管以降低營商成本。", en: "Relaxing business regulations to lower operating costs." },
        { id: "b", zh: "政府增加醫療券資助。", en: "The government increases healthcare voucher subsidies." },
        { id: "c", zh: "中央銀行調低利率。", en: "The central bank lowers interest rates." },
        { id: "d", zh: "政府增加對低收入家庭的津貼。", en: "The government raises allowances for low-income families." }
      ],
      answer: "a",
      hint: { zh: "想想哪一項能提升生產能力或降低生產成本。", en: "Which option raises productive capacity or lowers production costs?" },
      solution: {
        zh: [
          "放寬規管降低營商成本，鼓勵生產與投資，令長期總供應右移。",
          "b 與 d 增加家庭收入與消費，屬需求面政策。",
          "c 透過利率刺激投資與消費，主要影響總需求，不是直接提升產能。",
          "因此答案為 a。"
        ],
        en: [
          "Relaxing regulations lowers operating costs and encourages production and investment, shifting long-run aggregate supply right.",
          "b and d raise household income and consumption, which are demand-side measures.",
          "c stimulates investment and consumption through interest rates and mainly affects aggregate demand rather than capacity.",
          "The answer is therefore a."
        ]
      }
    },
    {
      id: "ss3",
      prompt: { zh: "供應面政策成功時，短期最可能出現甚麼結果？", en: "When supply-side policy succeeds, what is most likely to happen in the short run?" },
      choices: [
        { id: "a", zh: "產出增加，物價有下降壓力。", en: "Output rises and there is downward pressure on prices." },
        { id: "b", zh: "產出增加，物價有上升壓力。", en: "Output rises and there is upward pressure on prices." },
        { id: "c", zh: "產出減少，物價上升。", en: "Output falls and prices rise." },
        { id: "d", zh: "產出減少，物價下降。", en: "Output falls and prices fall." }
      ],
      answer: "a",
      hint: { zh: "短期總供應右移會令均衡產出與物價怎樣變？", en: "What happens to equilibrium output and prices when short-run aggregate supply shifts right?" },
      solution: {
        zh: [
          "供應面政策降低生產成本、提升效率，短期總供應右移。",
          "短期總供應右移令均衡產出增加，物價有下降（或通脹放緩）壓力。",
          "b 是總需求擴張的結果；c、d 的產出方向錯誤。",
          "因此答案為 a。"
        ],
        en: [
          "Supply-side policy lowers production costs and raises efficiency, shifting short-run aggregate supply right.",
          "A rightward shift in short-run aggregate supply raises equilibrium output and puts downward pressure on prices (or slows inflation).",
          "b is the result of an expansion of aggregate demand; c and d have the wrong output direction.",
          "The answer is therefore a."
        ]
      }
    },
    {
      id: "ss4",
      prompt: { zh: "以下哪一項「不是」供應面政策？", en: "Which of the following is NOT a supply-side policy?" },
      choices: [
        { id: "a", zh: "為失業人士提供職業再培訓。", en: "Providing retraining for the unemployed." },
        { id: "b", zh: "增加大學研究撥款。", en: "Increasing university research funding." },
        { id: "c", zh: "向市民發放消費券。", en: "Issuing consumption vouchers to residents." },
        { id: "d", zh: "簡化商業牌照申請程序。", en: "Simplifying the business licence application process." }
      ],
      answer: "c",
      hint: { zh: "哪一項只是增加總需求？", en: "Which option only raises aggregate demand?" },
      solution: {
        zh: [
          "消費券直接增加消費與總需求，屬需求面政策。",
          "a 與 b 提升人力資本與技術，d 降低營商成本，均屬供應面政策。",
          "題目問「不是」供應面政策，因此答案為 c。"
        ],
        en: [
          "Consumption vouchers directly raise consumption and aggregate demand, so they are demand-side.",
          "a and b raise human capital and technology, while d lowers operating costs, so all three are supply-side.",
          "The question asks for what is NOT supply-side, so the answer is c."
        ]
      }
    },
    {
      id: "ss5",
      prompt: { zh: "政府削減利得稅以鼓勵企業購置機器，這被視為供應面政策，主要原因是甚麼？", en: "Cutting profits tax to encourage firms to buy machinery is regarded as supply-side policy mainly because it:" },
      choices: [
        { id: "a", zh: "增加資本存量與生產能力。", en: "increases the capital stock and productive capacity." },
        { id: "b", zh: "直接增加政府支出。", en: "directly increases government spending." },
        { id: "c", zh: "減少進口競爭。", en: "reduces import competition." },
        { id: "d", zh: "增加家庭可支配收入以刺激消費。", en: "raises household disposable income to stimulate consumption." }
      ],
      answer: "a",
      hint: { zh: "購置機器對生產能力有甚麼影響？", en: "What does buying machinery do to productive capacity?" },
      solution: {
        zh: [
          "企業購置機器增加資本存量，提升生產能力與潛在產出，屬供應面政策。",
          "b 錯：減稅令政府收入減少，不是增加支出。",
          "c 與關稅或配額有關；d 描述的是需求面的減稅效果。",
          "因此答案為 a。"
        ],
        en: [
          "Firms buying machinery add to the capital stock, raising productive capacity and potential output, which is supply-side.",
          "b is wrong: a tax cut reduces government revenue rather than raising spending.",
          "c relates to tariffs or quotas; d describes the demand-side effect of a tax cut.",
          "The answer is therefore a."
        ]
      }
    },
    {
      id: "ss6",
      prompt: { zh: "與需求面政策比較，供應面政策的特點是甚麼？", en: "Compared with demand-side policy, supply-side policy is characterised by:" },
      choices: [
        { id: "a", zh: "見效較慢，但能提升潛在產出。", en: "slower effects, but it raises potential output." },
        { id: "b", zh: "見效較快，且不需動用資源。", en: "faster effects, and it uses no resources." },
        { id: "c", zh: "只影響物價，不影響產出。", en: "affecting only prices, not output." },
        { id: "d", zh: "只能由中央銀行推行。", en: "being implemented only by the central bank." }
      ],
      answer: "a",
      hint: { zh: "教育與基建要多久才提升生產力？", en: "How long do education and infrastructure take to raise productivity?" },
      solution: {
        zh: [
          "教育、培訓、研發與基建需時才能提升生產力，故見效較慢，但能提高潛在產出。",
          "b 錯：任何政策都涉及機會成本，且供應面政策通常較慢。",
          "c 錯：供應面政策會提升產出；d 錯：供應面政策多由政府推行。",
          "因此答案為 a。"
        ],
        en: [
          "Education, training, R&D and infrastructure take time to raise productivity, so effects are slower but potential output rises.",
          "b is wrong: every policy has an opportunity cost, and supply-side measures are usually slower.",
          "c is wrong because supply-side policy raises output; d is wrong because governments usually implement it.",
          "The answer is therefore a."
        ]
      }
    },
    {
      id: "ss7",
      prompt: { zh: "供應面政策在對抗嚴重衰退時的局限是甚麼？", en: "What is the main limitation of supply-side policy in fighting a severe recession?" },
      choices: [
        { id: "a", zh: "提升生產能力的措施需時，難以即時填補需求不足。", en: "Measures that raise capacity take time and cannot quickly fill a shortfall in demand." },
        { id: "b", zh: "一定會令政府財政赤字消失。", en: "It always eliminates the government's fiscal deficit." },
        { id: "c", zh: "只會令物價上升。", en: "It only pushes prices up." },
        { id: "d", zh: "必須先提高關稅才有效。", en: "It works only after tariffs are raised." }
      ],
      answer: "a",
      hint: { zh: "衰退是短期需求不足，供應面政策改變的是產能。", en: "A recession is a shortfall in demand, while supply-side policy changes capacity." },
      solution: {
        zh: [
          "供應面政策透過教育、基建與研發提升產能，效果需時，短期難以即時增加總需求。",
          "b 錯：供應面政策與財政赤字沒有必然關係。",
          "c 錯：供應面政策通常令物價有下行壓力；d 錯：關稅會提高成本，不是供應面政策的前提。",
          "因此答案為 a。"
        ],
        en: [
          "Supply-side policy raises capacity through education, infrastructure and R&D, which takes time and cannot quickly raise aggregate demand.",
          "b is wrong: there is no necessary link with the fiscal deficit.",
          "c is wrong because supply-side policy usually puts downward pressure on prices; d is wrong because tariffs raise costs.",
          "The answer is therefore a."
        ]
      }
    },
    {
      id: "ss8",
      prompt: { zh: "一項大型鐵路基建落成，對經濟最直接的供應面影響是甚麼？", en: "When a large railway project is completed, its most direct supply-side effect is to:" },
      choices: [
        { id: "a", zh: "降低運輸與物流成本，提升生產效率。", en: "lower transport and logistics costs and raise production efficiency." },
        { id: "b", zh: "增加政府消費，令總需求右移。", en: "raise government consumption and shift aggregate demand right." },
        { id: "c", zh: "減少勞動力供應。", en: "reduce the supply of labour." },
        { id: "d", zh: "令貨幣供應增加。", en: "increase the money supply." }
      ],
      answer: "a",
      hint: { zh: "題目問的是「供應面」影響。", en: "The question asks for the supply-side effect." },
      solution: {
        zh: [
          "基建改善運輸效率、降低生產與物流成本，提升潛在產出，屬供應面影響。",
          "b 描述的是短期需求面效果，不是「最直接的供應面影響」。",
          "c 錯：基建不會減少勞動力供應；d 錯：基建與貨幣供應沒有直接關係。",
          "因此答案為 a。"
        ],
        en: [
          "Infrastructure improves transport efficiency and lowers production and logistics costs, raising potential output — a supply-side effect.",
          "b describes a short-run demand-side effect, not the most direct supply-side effect.",
          "c is wrong because infrastructure does not reduce labour supply; d is wrong because there is no direct link with the money supply.",
          "The answer is therefore a."
        ]
      }
    },
    {
      id: "ss9",
      prompt: { zh: "若供應面政策令生產力上升 10%，而總需求與貨幣供應不變，長期最可能出現甚麼結果？", en: "If supply-side policy raises productivity by 10% while aggregate demand and the money supply are unchanged, what is most likely in the long run?" },
      choices: [
        { id: "a", zh: "實質產出上升，物價水平下降。", en: "Real output rises and the price level falls." },
        { id: "b", zh: "實質產出與物價同時上升。", en: "Real output and the price level both rise." },
        { id: "c", zh: "實質產出下降，物價上升。", en: "Real output falls and the price level rises." },
        { id: "d", zh: "實質產出與物價都不變。", en: "Real output and the price level are both unchanged." }
      ],
      answer: "a",
      hint: { zh: "總供應右移而總需求不變，均衡點怎樣移動？", en: "With supply shifting right and demand unchanged, where does equilibrium move?" },
      solution: {
        zh: [
          "生產力上升令長期總供應右移。",
          "總需求不變時，均衡實質產出上升，物價水平下降。",
          "b 是總需求右移的結果；c、d 與供應增加的結果不符。",
          "因此答案為 a。"
        ],
        en: [
          "Higher productivity shifts long-run aggregate supply right.",
          "With aggregate demand unchanged, equilibrium real output rises and the price level falls.",
          "b is the result of a rightward shift in aggregate demand; c and d contradict an increase in supply.",
          "The answer is therefore a."
        ]
      }
    },
    {
      id: "ss10",
      prompt: { zh: "以下哪一組政策組合最符合供應面政策？", en: "Which set of policies best fits supply-side policy?" },
      choices: [
        { id: "a", zh: "職業培訓、研發資助、簡化牌照程序", en: "Vocational training, R&D grants and simpler licensing procedures" },
        { id: "b", zh: "增加政府購買、減稅刺激消費、派發現金", en: "More government purchases, tax cuts to boost consumption and cash handouts" },
        { id: "c", zh: "提高關稅、進口配額、外匯管制", en: "Higher tariffs, import quotas and exchange controls" },
        { id: "d", zh: "提高利率、賣出外匯基金票據、提高準備金率", en: "Higher interest rates, selling Exchange Fund bills and a higher reserve ratio" }
      ],
      answer: "a",
      hint: { zh: "哪一組全部指向提升生產力或降低成本？", en: "Which set is entirely about raising productivity or lowering costs?" },
      solution: {
        zh: [
          "a 組全部提升人力資本、技術或降低營商成本，屬供應面政策。",
          "b 組刺激消費與政府購買，屬需求面；c 組屬貿易保護，通常提高成本與價格。",
          "d 組屬緊縮貨幣政策，透過利率影響總需求。",
          "因此答案為 a。"
        ],
        en: [
          "Set a raises human capital and technology or lowers operating costs, so it is supply-side.",
          "Set b stimulates consumption and government purchases (demand-side); set c is trade protection, which usually raises costs and prices.",
          "Set d is contractionary monetary policy, which affects aggregate demand through interest rates.",
          "The answer is therefore a."
        ]
      }
    }
  ],

  'chal.reasoning': [
    {
      id: "cr1",
      prompt: { zh: "「打破商店櫥窗能為玻璃工人創造就業，所以破壞對經濟有利。」這個說法的主要錯誤是甚麼？", en: "\"Breaking a shop window creates jobs for glaziers, so destruction benefits the economy.\" What is the main error in this claim?" },
      choices: [
        { id: "a", zh: "忽略了重建櫥窗的資源本可用於其他更有價值的用途。", en: "It ignores that the resources used to rebuild the window could have produced something else of greater value." },
        { id: "b", zh: "玻璃工人不屬於生產要素。", en: "Glaziers are not factors of production." },
        { id: "c", zh: "破壞一定令總需求下降。", en: "Destruction must reduce aggregate demand." },
        { id: "d", zh: "櫥窗不是最終產品。", en: "A shop window is not a final good." }
      ],
      answer: "a",
      hint: { zh: "想一想：用來修窗的資源原本可以用來做甚麼？", en: "Ask: what could the resources used for repairs have done instead?" },
      solution: {
        zh: [
          "修窗所用的勞力與資本本可生產其他物品，破壞令社會放棄了那些產出，這就是機會成本。",
          "只看見玻璃工人就業，只是政策的第一層效果，忽略了被放棄的其他用途。",
          "b 錯：勞力是生產要素；c 錯：破壞未必令總需求下降；d 錯：櫥窗屬資本物品，不是重點。",
          "因此答案為 a。"
        ],
        en: [
          "The labour and capital used to repair the window could have produced other goods, so destruction forces society to give up that output — an opportunity cost.",
          "Seeing only the glaziers' jobs captures the first-round effect and ignores the alternatives forgone.",
          "b is wrong because labour is a factor of production; c is wrong because destruction need not reduce aggregate demand; d is wrong because a window is a capital good, which is not the point.",
          "The answer is therefore a."
        ]
      }
    },
    {
      id: "cr2",
      prompt: { zh: "以下哪一項是合成謬誤？", en: "Which of the following is a fallacy of composition?" },
      choices: [
        { id: "a", zh: "「個人多儲蓄對自己有利，所以所有人都多儲蓄一定對整體有利。」", en: "\"Saving more is good for an individual, so if everyone saves more it must be good for the whole economy.\"" },
        { id: "b", zh: "「價格上升會令需求量下降。」", en: "\"A higher price reduces quantity demanded.\"" },
        { id: "c", zh: "「關稅會減少進口量。」", en: "\"A tariff reduces the quantity of imports.\"" },
        { id: "d", zh: "「利率上升會減少投資。」", en: "\"A higher interest rate reduces investment.\"" }
      ],
      answer: "a",
      hint: { zh: "合成謬誤是把對個人成立的事當成對整體也成立。", en: "The fallacy of composition assumes what is true for an individual is true for the whole." },
      solution: {
        zh: [
          "合成謬誤是把對個人成立的事推論為對整體成立。",
          "所有人同時多儲蓄會令總消費與總需求下降，均衡收入減少，總儲蓄未必增加。",
          "b、c、d 都是一般成立的經濟關係，不涉及由個體推論整體。",
          "因此答案為 a。"
        ],
        en: [
          "The fallacy of composition generalises from what is true for an individual to the whole economy.",
          "If everyone saves more at once, total consumption and aggregate demand fall, equilibrium income drops and total saving may not rise.",
          "b, c and d are generally valid economic relationships and do not generalise from the individual to the aggregate.",
          "The answer is therefore a."
        ]
      }
    },
    {
      id: "cr3",
      prompt: { zh: "若所有家庭同時大幅增加儲蓄，短期最可能出現甚麼結果？", en: "If all households sharply increase their saving at the same time, what is most likely in the short run?" },
      choices: [
        { id: "a", zh: "總消費下降，均衡收入減少，總儲蓄未必增加。", en: "Total consumption falls, equilibrium income falls and total saving may not rise." },
        { id: "b", zh: "總儲蓄必定按儲蓄率比例增加。", en: "Total saving must rise in proportion to the saving rate." },
        { id: "c", zh: "物價必定上升。", en: "Prices must rise." },
        { id: "d", zh: "失業率必定下降。", en: "The unemployment rate must fall." }
      ],
      answer: "a",
      hint: { zh: "儲蓄增加會令消費與總需求怎樣變？", en: "What happens to consumption and aggregate demand when saving rises?" },
      solution: {
        zh: [
          "儲蓄增加令消費與總需求下降，透過乘數令均衡收入減少。",
          "收入減少後，家庭能儲蓄的金額也下降，所以總儲蓄未必增加，這就是節儉悖論。",
          "b 忽略了收入下降；c 錯：需求下降令物價有下行壓力；d 錯：需求下降通常令失業上升。",
          "因此答案為 a。"
        ],
        en: [
          "Higher saving reduces consumption and aggregate demand, and the multiplier lowers equilibrium income.",
          "With lower income, households have less to save, so total saving may not rise — the paradox of thrift.",
          "b ignores the fall in income; c is wrong because weaker demand puts downward pressure on prices; d is wrong because weaker demand usually raises unemployment.",
          "The answer is therefore a."
        ]
      }
    },
    {
      id: "cr4",
      prompt: { zh: "某地的雪糕銷量與遇溺人數在夏季同時上升。以下哪個解釋最合理？", en: "In a certain place, ice-cream sales and the number of drownings both rise in summer. Which explanation is most reasonable?" },
      choices: [
        { id: "a", zh: "兩者都受夏季高溫影響，未必有因果關係。", en: "Both are driven by hot summer weather, so there need not be a causal link." },
        { id: "b", zh: "吃雪糕會直接令人遇溺。", en: "Eating ice cream directly causes drowning." },
        { id: "c", zh: "遇溺事件增加會令雪糕需求上升。", en: "More drownings raise the demand for ice cream." },
        { id: "d", zh: "兩者同時上升純屬統計錯誤。", en: "Their joint rise must be a statistical error." }
      ],
      answer: "a",
      hint: { zh: "有沒有第三個因素同時影響兩者？", en: "Is there a third factor affecting both?" },
      solution: {
        zh: [
          "兩個變數同時上升，可能同受第三個因素（氣溫）影響。",
          "這是「相關不等於因果」的典型例子。",
          "b、c 把相關當成因果；d 錯：同時上升可以是真實觀察，只是未必有因果。",
          "因此答案為 a。"
        ],
        en: [
          "Two variables rising together may both be driven by a third factor such as temperature.",
          "This is the classic case of correlation without causation.",
          "b and c treat correlation as causation; d is wrong because the joint rise can be a real observation without being causal.",
          "The answer is therefore a."
        ]
      }
    },
    {
      id: "cr5",
      prompt: { zh: "你買了一張不可退款的電影票，入場後發現電影很難看。按經濟推理，最恰當的做法是甚麼？", en: "You bought a non-refundable cinema ticket and find the film terrible after it starts. According to economic reasoning, what is the best approach?" },
      choices: [
        { id: "a", zh: "只比較繼續觀看的邊際利益與邊際成本；票價屬已付出的沉沒成本。", en: "Compare only the marginal benefit and marginal cost of staying; the ticket price is a sunk cost already paid." },
        { id: "b", zh: "一定要看完，否則浪費了票價。", en: "You must watch to the end, otherwise the ticket price is wasted." },
        { id: "c", zh: "一定要立即離場，因為票價已付。", en: "You must leave at once because the ticket is already paid." },
        { id: "d", zh: "是否看完取決於票價的高低。", en: "Whether to stay depends on how high the ticket price was." }
      ],
      answer: "a",
      hint: { zh: "已付出、不能收回的成本叫甚麼？", en: "What do we call a cost already paid and impossible to recover?" },
      solution: {
        zh: [
          "票價已經付出且無法收回，屬沉沒成本，不應影響現在的決定。",
          "應該比較餘下時間的其他用途（機會成本）與繼續觀看的享受。",
          "b、c 讓已付成本左右決定；d 錯：票價高低不改變它已是沉沒成本。",
          "因此答案為 a。"
        ],
        en: [
          "The ticket price is already paid and cannot be recovered, so it is a sunk cost and should not affect the current decision.",
          "Compare the opportunity cost of the remaining time with the enjoyment of staying.",
          "b and c let the sunk cost drive the decision; d is wrong because the size of the price does not change its sunk nature.",
          "The answer is therefore a."
        ]
      }
    },
    {
      id: "cr6",
      prompt: { zh: "「甲國對乙國有雙邊貿易逆差，所以甲國一定吃虧。」以下哪項最能反駁這說法？", en: "\"Country A runs a bilateral trade deficit with country B, so A must lose.\" Which point best refutes this?" },
      choices: [
        { id: "a", zh: "雙邊貿易差額不決定貿易利益；貿易按比較優勢互利，應看整體經常帳與資本流動。", en: "A bilateral balance does not determine the gains from trade; trade is mutually beneficial through comparative advantage, so the overall current account and capital flows matter." },
        { id: "b", zh: "雙邊貿易逆差一定令本幣升值。", en: "A bilateral trade deficit must cause the currency to appreciate." },
        { id: "c", zh: "雙邊貿易差額一定等於零。", en: "A bilateral trade balance must always be zero." },
        { id: "d", zh: "逆差代表該國沒有比較優勢。", en: "A deficit means the country has no comparative advantage." }
      ],
      answer: "a",
      hint: { zh: "貿易利益來自甚麼？雙邊差額能代表全部嗎？", en: "Where do gains from trade come from? Can a bilateral balance represent everything?" },
      solution: {
        zh: [
          "國際貿易是多邊的，對一國的逆差可被對其他地區的順差抵銷。",
          "貿易利益來自比較優勢與專業化，不是雙邊貿易差額。",
          "b 錯：逆差通常令本幣有貶值壓力；c 錯：雙邊差額可正可負；d 錯：比較優勢與雙邊差額沒有必然關係。",
          "因此答案為 a。"
        ],
        en: [
          "Trade is multilateral, so a deficit with one country can be offset by surpluses with others.",
          "Gains from trade come from comparative advantage and specialisation, not from a bilateral balance.",
          "b is wrong because a deficit usually puts downward pressure on the currency; c is wrong because a bilateral balance can be positive or negative; d is wrong because comparative advantage is unrelated to the bilateral balance.",
          "The answer is therefore a."
        ]
      }
    },
    {
      id: "cr7",
      prompt: { zh: "政府對某商品設定低於均衡價格的上限，最可能出現甚麼結果？", en: "If the government sets a price ceiling below the equilibrium price of a good, what is most likely to happen?" },
      choices: [
        { id: "a", zh: "出現短缺，並可能出現排隊、配給等非價格競爭。", en: "A shortage develops, with non-price competition such as queuing or rationing." },
        { id: "b", zh: "出現盈餘，生產過剩。", en: "A surplus develops with overproduction." },
        { id: "c", zh: "市場價格上升至新均衡。", en: "The market price rises to a new equilibrium." },
        { id: "d", zh: "需求量下降、供應量上升。", en: "Quantity demanded falls and quantity supplied rises." }
      ],
      answer: "a",
      hint: { zh: "有效的價格上限低於均衡價，代表價格「被迫」偏低。", en: "An effective ceiling is below equilibrium, so the price is held down." },
      solution: {
        zh: [
          "低於均衡的價格上限令需求量超過供應量，出現短缺。",
          "價格不能上升，買方只好用排隊、配給或人際關係等非價格方式競爭。",
          "b 是價格下限的結果；c 錯：上限令價格不能升；d 錯：價格下降令需求量上升、供應量下降。",
          "因此答案為 a。"
        ],
        en: [
          "A ceiling below equilibrium makes quantity demanded exceed quantity supplied, creating a shortage.",
          "Since the price cannot rise, buyers compete through queuing, rationing or connections — non-price competition.",
          "b is the result of a price floor; c is wrong because the ceiling prevents the price from rising; d is wrong because a lower price raises quantity demanded and lowers quantity supplied.",
          "The answer is therefore a."
        ]
      }
    },
    {
      id: "cr8",
      prompt: { zh: "在完全競爭的勞動市場模型中，若法定最低工資高於均衡工資，最可能出現甚麼結果？", en: "In the competitive labour-market model, if a legal minimum wage is above the equilibrium wage, what is most likely?" },
      choices: [
        { id: "a", zh: "在職者工資上升，但就業量減少，低技術勞工尤其受影響。", en: "Wages of those employed rise but employment falls, especially for low-skilled workers." },
        { id: "b", zh: "工資與就業量同時上升。", en: "Both wages and employment rise." },
        { id: "c", zh: "對工資與就業量都沒有影響。", en: "Neither wages nor employment is affected." },
        { id: "d", zh: "勞動供應即時降至零。", en: "Labour supply instantly drops to zero." }
      ],
      answer: "a",
      hint: { zh: "最低工資高於均衡即有約束力，勞動量會怎樣變？", en: "A binding minimum wage is above equilibrium; what happens to the quantity of labour?" },
      solution: {
        zh: [
          "最低工資高於均衡時，勞動需求量下降、供應量上升，出現勞動過剩（失業）。",
          "在職者保住較高工資，但部分勞工（尤其低技術者）失去工作機會。",
          "b 錯：需求定律下就業量減少；c 錯：高於均衡即有約束力；d 錯：供應不會降至零。",
          "因此答案為 a。"
        ],
        en: [
          "Above equilibrium, the minimum wage lowers quantity of labour demanded and raises quantity supplied, creating excess labour (unemployment).",
          "Those in work keep higher wages, but some workers — especially the low-skilled — lose job opportunities.",
          "b is wrong because employment falls along the demand curve; c is wrong because it binds above equilibrium; d is wrong because supply does not fall to zero.",
          "The answer is therefore a."
        ]
      }
    },
    {
      id: "cr9",
      prompt: { zh: "「免費的東西沒有成本。」這句話的問題是甚麼？", en: "\"Free things have no cost.\" What is the problem with this statement?" },
      choices: [
        { id: "a", zh: "即使不用付款，使用它仍有機會成本。", en: "Even without paying, using it still has an opportunity cost." },
        { id: "b", zh: "免費物品一定是公共財。", en: "Free goods must be public goods." },
        { id: "c", zh: "免費物品沒有需求。", en: "Free goods have no demand." },
        { id: "d", zh: "政府必須補貼免費物品。", en: "The government must subsidise free goods." }
      ],
      answer: "a",
      hint: { zh: "經濟學的成本是指甚麼？", en: "What does cost mean in economics?" },
      solution: {
        zh: [
          "經濟學的成本是所放棄的最佳替代用途，即機會成本。",
          "免費使用公園仍佔用時間與空間，這些資源有其他用途，故仍有成本。",
          "b 錯：免費提供不等於公共財；c 錯：免費物品可以有需求；d 錯：免費與補貼沒有必然關係。",
          "因此答案為 a。"
        ],
        en: [
          "In economics, cost is the value of the best alternative forgone — opportunity cost.",
          "Using a park for free still takes time and space that have other uses, so a cost remains.",
          "b is wrong because free provision does not make something a public good; c is wrong because free goods can be in demand; d is wrong because free provision and subsidy are not necessarily linked.",
          "The answer is therefore a."
        ]
      }
    },
    {
      id: "cr10",
      prompt: { zh: "政府同時要「消除失業」與「零通脹」，在經濟推理上最主要的問題是甚麼？", en: "A government wants both to 'eliminate unemployment' and to achieve 'zero inflation'. What is the main problem in economic reasoning?" },
      choices: [
        { id: "a", zh: "擴張政策短期可減少失業但可能推高物價，緊縮政策相反，兩個目標存在短期取捨。", en: "Expansionary policy can cut unemployment in the short run but may push prices up, while contractionary policy does the opposite, so the two goals involve a short-run trade-off." },
        { id: "b", zh: "失業與通脹在統計上不可能同時存在。", en: "Unemployment and inflation cannot coexist statistically." },
        { id: "c", zh: "政府沒有足夠的統計數據。", en: "The government lacks sufficient statistics." },
        { id: "d", zh: "通脹率一定等於零。", en: "The inflation rate must be zero." }
      ],
      answer: "a",
      hint: { zh: "擴張與緊縮政策對失業和物價的方向有甚麼不同？", en: "How do expansionary and contractionary policy affect unemployment and prices differently?" },
      solution: {
        zh: [
          "擴張性政策令總需求上升，短期可增加產出與就業，但物價有上升壓力。",
          "緊縮性政策壓抑總需求，可冷卻通脹，但短期失業可能上升。",
          "因此兩個目標短期存在取捨，故 a 正確；b 錯：兩者可同時存在（如滯脹）；c 不是主要理論問題；d 與命題無關。",
          "因此答案為 a。"
        ],
        en: [
          "Expansionary policy raises aggregate demand, which can raise output and employment in the short run but puts upward pressure on prices.",
          "Contractionary policy restrains aggregate demand, cooling inflation but possibly raising unemployment in the short run.",
          "The two goals therefore involve a short-run trade-off, so a is correct; b is wrong because both can occur together (stagflation); c is not the main theoretical issue; d is irrelevant.",
          "The answer is therefore a."
        ]
      }
    }
  ]

});
