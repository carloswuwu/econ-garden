/*
 * 中三 · 國家經濟概況、世界貿易與全球化
 * 對應「公民、經濟與社會」（中三）單元 3.2 及世界性經濟議題。
 */
EconData.addStage({
  id: 's3', zh: '中三', en: 'Form 3', color: '#8C6CB3', emoji: '🌏',
  desc: { zh: '國家經濟、世界貿易與全球化', en: 'The national economy, world trade and globalisation' },
  topics: [
    { id: 's3.t1', zh: '國家與世界經濟', en: 'National & World Economy', skills: ['s3.china_economy', 's3.trade', 's3.globalisation'] },
    { id: 's3.t2', zh: '貿易、金融與發展', en: 'Trade, Finance & Development', skills: ['s3.exchange_rate', 's3.trade_policy', 's3.balance_payments', 's3.economic_systems', 's3.development'] }
  ]
});

EconData.addSkills({
  's3.china_economy': {
    id: 's3.china_economy', stage: 's3', order: 1,
    zh: { name: '國家經濟概況', goal: '認識國家經濟的規模、結構與增長因素，以及香港與內地的經濟關係。' },
    en: { name: 'The National Economy', goal: 'Understand the size, structure and growth drivers of the national economy and Hong Kong–Mainland links.' },
    lesson: 's3.china_economy', types: ['growth'],
    levels: [{ level: 1 }, { level: 2 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's3.trade': {
    id: 's3.trade', stage: 's3', order: 2,
    zh: { name: '國際貿易與分工', goal: '用機會成本與比較優勢解釋分工和貿易為何能帶來得益。' },
    en: { name: 'International Trade & Specialisation', goal: 'Use opportunity cost and comparative advantage to explain the gains from specialisation and trade.' },
    lesson: 's3.trade', types: ['comparative_advantage'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's3.globalisation': {
    id: 's3.globalisation', stage: 's3', order: 3,
    zh: { name: '全球化與跨國企業', goal: '說明全球化的成因、表現和利弊，以及跨國企業的角色。' },
    en: { name: 'Globalisation & Multinationals', goal: 'Explain the causes, evidence, benefits and costs of globalisation, and the role of multinational firms.' },
    lesson: 's3.globalisation', types: ['bank'],
    levels: [{ level: 1 }, { level: 2 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's3.exchange_rate': {
    id: 's3.exchange_rate', stage: 's3', order: 4,
    zh: { name: '匯率入門', goal: '進行貨幣兌換，計算貨幣升值與貶值的百分比。' },
    en: { name: 'Exchange Rates', goal: 'Convert between currencies and compute currency appreciation and depreciation.' },
    lesson: 's3.exchange_rate', types: ['exchange_rate'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's3.trade_policy': {
    id: 's3.trade_policy', stage: 's3', order: 5,
    zh: { name: '貿易政策與關稅', goal: '分析關稅與配額對價格、進口量、消費者與生產者的影響。' },
    en: { name: 'Trade Policy & Tariffs', goal: 'Analyse how tariffs and quotas affect prices, imports, consumers and producers.' },
    lesson: 's3.trade_policy', types: ['tariff'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's3.balance_payments': {
    id: 's3.balance_payments', stage: 's3', order: 6,
    zh: { name: '國際收支', goal: '計算經常帳餘額，認識國際收支的組成部分。' },
    en: { name: 'Balance of Payments', goal: 'Compute the current account balance and identify the components of the balance of payments.' },
    lesson: 's3.balance_payments', types: ['balance_payments'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's3.economic_systems': {
    id: 's3.economic_systems', stage: 's3', order: 7,
    zh: { name: '經濟體系', goal: '比較市場、計劃與混合經濟體系，並說明它們如何回答三個基本經濟問題。' },
    en: { name: 'Economic Systems', goal: 'Compare market, planned and mixed economies and how each answers the three basic economic questions.' },
    lesson: 's3.economic_systems', types: ['bank'],
    levels: [{ level: 1 }, { level: 2 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's3.development': {
    id: 's3.development', stage: 's3', order: 8,
    zh: { name: '經濟發展與可持續發展', goal: '分辨經濟增長與經濟發展，認識可持續發展及生活水平的量度。' },
    en: { name: 'Development & Sustainability', goal: 'Distinguish economic growth from development, and understand sustainable development and living standards.' },
    lesson: 's3.development', types: ['growth'],
    levels: [{ level: 1 }, { level: 2 }],
    mastery: { practice: 10, quizPass: 0.8 }
  }
});
