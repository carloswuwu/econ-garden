/*
 * 中五 · DSE 經濟（微觀 II + 效率與政府）
 * 涵蓋必修部分 D 競爭與市場結構、E 效率、公平和政府的角色，以及要素市場。
 */
EconData.addStage({
  id: 's5', zh: '中五', en: 'Form 5', color: '#DD5A4F', emoji: '⚖️',
  desc: { zh: 'DSE 微觀經濟 II：市場結構、效率與政府角色', en: 'DSE Micro II: market structure, efficiency and the role of government' },
  topics: [
    { id: 's5.t1', zh: '競爭與市場結構', en: 'Competition & Market Structure', skills: ['s5.market_structure', 's5.perfect_competition', 's5.monopoly', 's5.oligopoly', 's5.price_discrimination'] },
    { id: 's5.t2', zh: '效率、公平與政府', en: 'Efficiency, Equity & Government', skills: ['s5.surplus', 's5.tax_incidence', 's5.price_controls', 's5.externality', 's5.public_goods', 's5.factor_markets'] }
  ]
});

EconData.addSkills({
  's5.market_structure': {
    id: 's5.market_structure', stage: 's5', order: 1,
    zh: { name: '市場結構', goal: '比較完全競爭、壟斷、壟斷競爭與寡頭的特徵，並計算市場集中度。' },
    en: { name: 'Market Structure', goal: 'Compare perfect competition, monopoly, monopolistic competition and oligopoly, and measure concentration.' },
    lesson: 's5.market_structure', types: ['hhi'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's5.perfect_competition': {
    id: 's5.perfect_competition', stage: 's5', order: 2,
    zh: { name: '完全競爭', goal: '分析完全競爭廠商的短期停產、利潤最大化與長期均衡。' },
    en: { name: 'Perfect Competition', goal: 'Analyse short-run shutdown, profit maximisation and long-run equilibrium under perfect competition.' },
    lesson: 's5.perfect_competition', types: ['profit'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's5.monopoly': {
    id: 's5.monopoly', stage: 's5', order: 3,
    zh: { name: '壟斷與壟斷定價', goal: '利用 MR = MC 求壟斷產量與價格，計算壟斷利潤及無謂損失。' },
    en: { name: 'Monopoly & Monopoly Pricing', goal: 'Use MR = MC to find monopoly output and price, and compute monopoly profit and deadweight loss.' },
    lesson: 's5.monopoly', types: ['monopoly'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's5.oligopoly': {
    id: 's5.oligopoly', stage: 's5', order: 4,
    zh: { name: '寡頭與博弈', goal: '用博弈論分析寡頭市場的策略互動，求納什均衡與優勢策略。' },
    en: { name: 'Oligopoly & Game Theory', goal: 'Use game theory to analyse strategic interaction in oligopoly and find Nash equilibria and dominant strategies.' },
    lesson: 's5.oligopoly', types: ['game_theory'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's5.price_discrimination': {
    id: 's5.price_discrimination', stage: 's5', order: 5,
    zh: { name: '價格歧視', goal: '解釋一級、二級與三級價格歧視的條件和影響。' },
    en: { name: 'Price Discrimination', goal: 'Explain the conditions for and effects of first-, second- and third-degree price discrimination.' },
    lesson: 's5.price_discrimination', types: ['price_discrimination'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's5.surplus': {
    id: 's5.surplus', stage: 's5', order: 6,
    zh: { name: '消費者盈餘與生產者盈餘', goal: '計算消費者盈餘、生產者盈餘與總盈餘，並判斷效率。' },
    en: { name: 'Consumer & Producer Surplus', goal: 'Compute consumer surplus, producer surplus and total surplus, and assess efficiency.' },
    lesson: 's5.surplus', types: ['surplus'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's5.tax_incidence': {
    id: 's5.tax_incidence', stage: 's5', order: 7,
    zh: { name: '從量稅與稅負歸宿', goal: '分析從量稅對價格、產量、稅負分擔與無謂損失的影響。' },
    en: { name: 'Per-unit Tax & Tax Incidence', goal: 'Analyse how a per-unit tax affects price, quantity, tax burden sharing and deadweight loss.' },
    lesson: 's5.tax_incidence', types: ['tax_incidence'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's5.price_controls': {
    id: 's5.price_controls', stage: 's5', order: 8,
    zh: { name: '價格上限與下限', goal: '分析價格上限與價格下限造成的短缺、盈餘及無謂損失。' },
    en: { name: 'Price Ceilings & Floors', goal: 'Analyse shortages, surpluses and deadweight loss caused by price ceilings and floors.' },
    lesson: 's5.price_controls', types: ['price_control'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's5.externality': {
    id: 's5.externality', stage: 's5', order: 9,
    zh: { name: '外部性與市場失效', goal: '分析正負外部性、社會最適產量，以及皮古稅與補貼的矯正作用。' },
    en: { name: 'Externalities & Market Failure', goal: 'Analyse positive and negative externalities, the socially optimal output, and Pigouvian taxes or subsidies.' },
    lesson: 's5.externality', types: ['externality'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's5.public_goods': {
    id: 's5.public_goods', stage: 's5', order: 10,
    zh: { name: '公共財與共有資源', goal: '以非競爭性和非排他性分辨公共財、私有財、共有資源與俱樂部財。' },
    en: { name: 'Public Goods & Common Resources', goal: 'Use non-rivalry and non-excludability to classify public, private, common-pool and club goods.' },
    lesson: 's5.public_goods', types: ['bank'],
    levels: [{ level: 1 }, { level: 2 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's5.factor_markets': {
    id: 's5.factor_markets', stage: 's5', order: 11,
    zh: { name: '要素市場與工資', goal: '分析勞動需求與供應、均衡工資，以及最低工資的影響。' },
    en: { name: 'Factor Markets & Wages', goal: 'Analyse labour demand and supply, equilibrium wages and the effects of a minimum wage.' },
    lesson: 's5.factor_markets', types: ['labour'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  }
});
