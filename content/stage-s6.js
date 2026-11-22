/*
 * 中六 · DSE 經濟（宏觀經濟學與國際經濟，含選修單元延伸）
 * 涵蓋必修部分 F–J，以及選修單元二「貿易理論之延伸、經濟增長及發展」。
 */
EconData.addStage({
  id: 's6', zh: '中六', en: 'Form 6', color: '#4F8A5B', emoji: '🏛️',
  desc: { zh: 'DSE 宏觀經濟：量度、決定、政策與國際經濟', en: 'DSE macroeconomics: measurement, determination, policy and the international economy' },
  topics: [
    { id: 's6.t1', zh: '宏觀量度與決定', en: 'Measuring & Determining National Income', skills: ['s6.national_income', 's6.income_determination'] },
    { id: 's6.t2', zh: '貨幣、銀行與政策', en: 'Money, Banking & Policy', skills: ['s6.money_banking', 's6.money_demand', 's6.macro_problems', 's6.fiscal_policy', 's6.monetary_policy', 's6.supply_side'] },
    { id: 's6.t3', zh: '國際經濟與發展', en: 'International Economy & Development', skills: ['s6.trade_theory', 's6.exchange_rate', 's6.balance_payments', 's6.growth_development'] }
  ]
});

EconData.addSkills({
  's6.national_income': {
    id: 's6.national_income', stage: 's6', order: 1,
    zh: { name: '國民收入量度', goal: '用支出法計算 GDP，計算實質 GDP、GDP 平減指數與經濟增長率。' },
    en: { name: 'Measuring National Income', goal: 'Compute GDP by expenditure, real GDP, the GDP deflator and the growth rate.' },
    lesson: 's6.national_income', types: ['gdp_exp', 'gdp_real'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's6.income_determination': {
    id: 's6.income_determination', stage: 's6', order: 2,
    zh: { name: '國民收入決定與乘數', goal: '用消費函數與乘數求均衡收入，計算政府支出或稅收變動的影響。' },
    en: { name: 'Income Determination & the Multiplier', goal: 'Find equilibrium income with the consumption function and multiplier, and compute the effects of changes in G or T.' },
    lesson: 's6.income_determination', types: ['multiplier', 'income_eq'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's6.money_banking': {
    id: 's6.money_banking', stage: 's6', order: 3,
    zh: { name: '貨幣與銀行', goal: '說明貨幣的功能、銀行體系與存款創造，計算貨幣乘數與貨幣供應。' },
    en: { name: 'Money & Banking', goal: 'Explain the functions of money, the banking system and deposit creation; compute the money multiplier and money supply.' },
    lesson: 's6.money_banking', types: ['money_multiplier'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's6.money_demand': {
    id: 's6.money_demand', stage: 's6', order: 4,
    zh: { name: '貨幣需求與利率', goal: '分析貨幣需求、利率決定，以及貨幣數量論與實質利率。' },
    en: { name: 'Money Demand & Interest', goal: 'Analyse money demand and interest determination, the quantity theory of money and real interest rates.' },
    lesson: 's6.money_demand', types: ['money_demand', 'interest'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's6.macro_problems': {
    id: 's6.macro_problems', stage: 's6', order: 5,
    zh: { name: '失業、通脹與經濟週期', goal: '計算失業率與通脹率，分辨宏觀問題的成因與經濟週期的階段。' },
    en: { name: 'Unemployment, Inflation & the Business Cycle', goal: 'Compute unemployment and inflation, identify causes of macroeconomic problems and phases of the business cycle.' },
    lesson: 's6.macro_problems', types: ['unemployment', 'inflation'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's6.fiscal_policy': {
    id: 's6.fiscal_policy', stage: 's6', order: 6,
    zh: { name: '財政政策', goal: '分析擴張性與緊縮性財政政策的效果、自動穩定器及政策限制。' },
    en: { name: 'Fiscal Policy', goal: 'Analyse expansionary and contractionary fiscal policy, automatic stabilisers and policy constraints.' },
    lesson: 's6.fiscal_policy', types: ['fiscal_balance'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's6.monetary_policy': {
    id: 's6.monetary_policy', stage: 's6', order: 7,
    zh: { name: '貨幣政策', goal: '分析貨幣政策工具、傳導機制，以及與財政政策的協調和衝突。' },
    en: { name: 'Monetary Policy', goal: 'Analyse monetary policy tools, transmission mechanisms, and coordination or conflict with fiscal policy.' },
    lesson: 's6.monetary_policy', types: ['money_multiplier'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's6.supply_side': {
    id: 's6.supply_side', stage: 's6', order: 8,
    zh: { name: '供應面政策', goal: '說明供應面政策如何提升生產力與潛在產出，並比較其政策效果。' },
    en: { name: 'Supply-side Policy', goal: 'Explain how supply-side policies raise productivity and potential output, and compare their effects.' },
    lesson: 's6.supply_side', types: ['bank'],
    levels: [{ level: 1 }, { level: 2 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's6.trade_theory': {
    id: 's6.trade_theory', stage: 's6', order: 9,
    zh: { name: '國際貿易理論與政策', goal: '用比較優勢分析貿易得益，並評估關稅、配額等貿易政策的影響。' },
    en: { name: 'Trade Theory & Policy', goal: 'Use comparative advantage to analyse gains from trade and evaluate tariffs, quotas and other trade policies.' },
    lesson: 's6.trade_theory', types: ['comparative_advantage', 'tariff'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's6.exchange_rate': {
    id: 's6.exchange_rate', stage: 's6', order: 10,
    zh: { name: '匯率與國際金融', goal: '分析匯率變動的原因與影響，計算交叉匯率與購買力平價匯率。' },
    en: { name: 'Exchange Rates & International Finance', goal: 'Analyse causes and effects of exchange-rate changes, and compute cross rates and PPP rates.' },
    lesson: 's6.exchange_rate', types: ['exchange_rate', 'ppp'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's6.balance_payments': {
    id: 's6.balance_payments', stage: 's6', order: 11,
    zh: { name: '國際收支與資本流動', goal: '計算經常帳與資本帳，分析國際收支與資本流動的關係。' },
    en: { name: 'Balance of Payments & Capital Flows', goal: 'Compute the current and capital accounts and analyse the link between the balance of payments and capital flows.' },
    lesson: 's6.balance_payments', types: ['balance_payments'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's6.growth_development': {
    id: 's6.growth_development', stage: 's6', order: 12,
    zh: { name: '經濟增長與發展', goal: '分析經濟增長的來源、可持續發展與經濟發展的指標和政策。' },
    en: { name: 'Economic Growth & Development', goal: 'Analyse sources of growth, sustainable development, and indicators and policies for economic development.' },
    lesson: 's6.growth_development', types: ['growth'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  }
});
