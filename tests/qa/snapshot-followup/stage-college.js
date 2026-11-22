/*
 * 大學 · 經濟學核心課程
 * 對應大學經濟學主修的入門核心：微觀、宏觀、計量與應用領域，另設經濟思想。
 */
EconData.addStage({
  id: 'college', zh: '大學', en: 'University', color: '#6F7D8C', emoji: '🎓',
  desc: { zh: '大學經濟學核心：微觀、宏觀、計量與應用', en: 'University economics: micro, macro, econometrics and applications' },
  topics: [
    { id: 'col.t1', zh: '微觀經濟學', en: 'Microeconomics', skills: ['col.consumer', 'col.producer', 'col.market_welfare', 'col.game_theory', 'col.info_behavioural'] },
    { id: 'col.t2', zh: '宏觀經濟學', en: 'Macroeconomics', skills: ['col.macro_models', 'col.growth_theory', 'col.monetary_theory', 'col.labour'] },
    { id: 'col.t3', zh: '計量與應用', en: 'Econometrics & Applications', skills: ['col.econometrics', 'col.public', 'col.international'] },
    { id: 'col.t4', zh: '經濟思想', en: 'History of Economic Thought', skills: ['col.thought'] }
  ]
});

EconData.addSkills({
  'col.consumer': {
    id: 'col.consumer', stage: 'college', order: 1,
    zh: { name: '消費者理論', goal: '用邊際效用、預算線與無異曲線分析消費者選擇與需求。' },
    en: { name: 'Consumer Theory', goal: 'Use marginal utility, budget constraints and indifference curves to analyse consumer choice and demand.' },
    lesson: 'col.consumer', types: ['mv', 'budget_line'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  'col.producer': {
    id: 'col.producer', stage: 'college', order: 2,
    zh: { name: '廠商理論與成本', goal: '分析生產函數、規模報酬、成本最小化與利潤最大化。' },
    en: { name: 'Producer Theory & Costs', goal: 'Analyse production functions, returns to scale, cost minimisation and profit maximisation.' },
    lesson: 'col.producer', types: ['cost', 'profit'],
    levels: [{ level: 2 }, { level: 3 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  'col.market_welfare': {
    id: 'col.market_welfare', stage: 'college', order: 3,
    zh: { name: '市場均衡與福利', goal: '用供需模型評估消費者盈餘、生產者盈餘、稅負與無謂損失。' },
    en: { name: 'Market Equilibrium & Welfare', goal: 'Use supply and demand to evaluate consumer surplus, producer surplus, tax incidence and deadweight loss.' },
    lesson: 'col.market_welfare', types: ['equilibrium', 'surplus'],
    levels: [{ level: 2 }, { level: 3 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  'col.game_theory': {
    id: 'col.game_theory', stage: 'college', order: 4,
    zh: { name: '博弈論', goal: '求納什均衡、優勢策略，並理解囚徒困境與重複博弈。' },
    en: { name: 'Game Theory', goal: 'Find Nash equilibria and dominant strategies, and understand the prisoner\'s dilemma and repeated games.' },
    lesson: 'col.game_theory', types: ['game_theory'],
    levels: [{ level: 2 }, { level: 3 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  'col.info_behavioural': {
    id: 'col.info_behavioural', stage: 'college', order: 5,
    zh: { name: '資訊與行為經濟學', goal: '分析逆向選擇、道德風險、訊號，以及捷思與偏誤等行為經濟學概念。' },
    en: { name: 'Information & Behavioural Economics', goal: 'Analyse adverse selection, moral hazard and signalling, plus heuristics and biases in behavioural economics.' },
    lesson: 'col.info_behavioural', types: ['bank'],
    levels: [{ level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  'col.macro_models': {
    id: 'col.macro_models', stage: 'college', order: 6,
    zh: { name: '宏觀模型：AD-AS 與 IS-LM', goal: '用 AD-AS 與 IS-LM 模型分析衝擊與政策的效果。' },
    en: { name: 'Macro Models: AD-AS & IS-LM', goal: 'Use AD-AS and IS-LM models to analyse shocks and policy effects.' },
    lesson: 'col.macro_models', types: ['multiplier', 'income_eq'],
    levels: [{ level: 2 }, { level: 3 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  'col.growth_theory': {
    id: 'col.growth_theory', stage: 'college', order: 7,
    zh: { name: '經濟增長理論', goal: '用增長會計、Harrod-Domar 與 Solow 模型分析長期增長。' },
    en: { name: 'Growth Theory', goal: 'Analyse long-run growth with growth accounting, the Harrod-Domar model and the Solow model.' },
    lesson: 'col.growth_theory', types: ['growth_model', 'growth'],
    levels: [{ level: 2 }, { level: 3 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  'col.monetary_theory': {
    id: 'col.monetary_theory', stage: 'college', order: 8,
    zh: { name: '貨幣理論與政策規則', goal: '分析貨幣需求、貨幣供應、規則與權衡，以及通脹目標。' },
    en: { name: 'Monetary Theory & Policy Rules', goal: 'Analyse money demand and supply, rules versus discretion, and inflation targeting.' },
    lesson: 'col.monetary_theory', types: ['money_demand'],
    levels: [{ level: 2 }, { level: 3 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  'col.labour': {
    id: 'col.labour', stage: 'college', order: 9,
    zh: { name: '勞動經濟學', goal: '分析勞動供應、人力資本、工資差異與歧視等議題。' },
    en: { name: 'Labour Economics', goal: 'Analyse labour supply, human capital, wage differentials and discrimination.' },
    lesson: 'col.labour', types: ['labour'],
    levels: [{ level: 2 }, { level: 3 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  'col.econometrics': {
    id: 'col.econometrics', stage: 'college', order: 10,
    zh: { name: '計量經濟學入門', goal: '解釋簡單線性回歸、R²、顯著性，並理解相關與因果的分別。' },
    en: { name: 'Introductory Econometrics', goal: 'Interpret simple linear regression, R² and significance, and distinguish correlation from causation.' },
    lesson: 'col.econometrics', types: ['regression'],
    levels: [{ level: 2 }, { level: 3 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  'col.public': {
    id: 'col.public', stage: 'college', order: 11,
    zh: { name: '公共經濟學', goal: '分析公共財、外部性、稅負歸宿與最適稅制。' },
    en: { name: 'Public Economics', goal: 'Analyse public goods, externalities, tax incidence and optimal taxation.' },
    lesson: 'col.public', types: ['externality', 'tax_incidence'],
    levels: [{ level: 2 }, { level: 3 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  'col.international': {
    id: 'col.international', stage: 'college', order: 12,
    zh: { name: '國際經濟學', goal: '分析比較優勢、貿易得益、匯率與國際資本流動。' },
    en: { name: 'International Economics', goal: 'Analyse comparative advantage, gains from trade, exchange rates and international capital flows.' },
    lesson: 'col.international', types: ['comparative_advantage', 'ppp'],
    levels: [{ level: 2 }, { level: 3 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  'col.thought': {
    id: 'col.thought', stage: 'college', order: 13,
    zh: { name: '經濟思想史', goal: '認識重商主義、古典學派、馬克思、邊際革命、凱恩斯與現代經濟學的發展。' },
    en: { name: 'History of Economic Thought', goal: 'Trace mercantilism, the classics, Marx, the marginal revolution, Keynes and modern economics.' },
    lesson: 'col.thought', types: ['bank'],
    levels: [{ level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  }
});
