/*
 * 中四 · DSE 經濟（微觀 I）
 * 涵蓋必修部分 A 基本經濟概念、B 廠商與生產、C 市場與價格。
 */
EconData.addStage({
  id: 's4', zh: '中四', en: 'Form 4', color: '#EE8B3C', emoji: '🧭',
  desc: { zh: 'DSE 微觀經濟 I：基本概念、廠商與生產、市場與價格', en: 'DSE Micro I: basic concepts, firms and production, market and price' },
  topics: [
    { id: 's4.t1', zh: '基本經濟概念', en: 'Basic Economic Concepts', skills: ['s4.basic_concepts', 's4.positive_normative', 's4.economic_questions'] },
    { id: 's4.t2', zh: '廠商與生產', en: 'Firms & Production', skills: ['s4.production', 's4.cost', 's4.profit'] },
    { id: 's4.t3', zh: '市場與價格', en: 'Market & Price', skills: ['s4.demand', 's4.supply', 's4.equilibrium', 's4.elasticity', 's4.elasticity_other'] }
  ]
});

EconData.addSkills({
  's4.basic_concepts': {
    id: 's4.basic_concepts', stage: 's4', order: 1,
    zh: { name: '稀少性、機會成本與邊際分析', goal: '運用稀少性、機會成本、邊際回報遞減與生產可能曲線分析選擇。' },
    en: { name: 'Scarcity, Opportunity Cost & Marginal Analysis', goal: 'Apply scarcity, opportunity cost, diminishing marginal returns and the PPF to choices.' },
    lesson: 's4.basic_concepts', types: ['oppcost', 'ppc'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's4.positive_normative': {
    id: 's4.positive_normative', stage: 's4', order: 2,
    zh: { name: '實證與規範陳述', goal: '分辨可用事實檢驗的實證陳述與涉及價值判斷的規範陳述。' },
    en: { name: 'Positive vs Normative Statements', goal: 'Distinguish testable positive statements from value-judgement normative statements.' },
    lesson: 's4.positive_normative', types: ['bank'],
    levels: [{ level: 1 }, { level: 2 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's4.economic_questions': {
    id: 's4.economic_questions', stage: 's4', order: 3,
    zh: { name: '三個基本經濟問題', goal: '說明生產甚麼、怎樣生產、為誰生產三個問題，以及不同經濟體系的做法。' },
    en: { name: 'Three Basic Economic Questions', goal: 'Explain what, how and for whom to produce, and how economic systems answer them.' },
    lesson: 's4.economic_questions', types: ['bank'],
    levels: [{ level: 1 }, { level: 2 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's4.production': {
    id: 's4.production', stage: 's4', order: 4,
    zh: { name: '生產、生產要素與分工', goal: '分辨生產要素、生產與分工的好處，以及廠商的生產決策。' },
    en: { name: 'Production, Factors & Specialisation', goal: 'Identify factors of production, the gains from specialisation and firms\' production decisions.' },
    lesson: 's4.production', types: ['bank'],
    levels: [{ level: 1 }, { level: 2 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's4.cost': {
    id: 's4.cost', stage: 's4', order: 5,
    zh: { name: '成本與規模經濟', goal: '計算總成本、平均成本與邊際成本，理解短期成本與規模經濟。' },
    en: { name: 'Costs & Economies of Scale', goal: 'Compute total, average and marginal cost, and understand short-run costs and economies of scale.' },
    lesson: 's4.cost', types: ['cost'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's4.profit': {
    id: 's4.profit', stage: 's4', order: 6,
    zh: { name: '利潤與廠商目標', goal: '計算會計利潤與經濟利潤，理解正常利潤與廠商的目標。' },
    en: { name: 'Profit & Firm Objectives', goal: 'Compute accounting and economic profit, and understand normal profit and firm objectives.' },
    lesson: 's4.profit', types: ['profit'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's4.demand': {
    id: 's4.demand', stage: 's4', order: 7,
    zh: { name: '需求與需求定律', goal: '說明需求定律、需求量變動與需求變動，以及影響需求的因素。' },
    en: { name: 'Demand & the Law of Demand', goal: 'Explain the law of demand, movements along vs shifts of the demand curve, and demand determinants.' },
    lesson: 's4.demand', types: ['demand_shift'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's4.supply': {
    id: 's4.supply', stage: 's4', order: 8,
    zh: { name: '供應與供應定律', goal: '說明供應定律、供應量變動與供應變動，以及影響供應的因素。' },
    en: { name: 'Supply & the Law of Supply', goal: 'Explain the law of supply, movements along vs shifts of the supply curve, and supply determinants.' },
    lesson: 's4.supply', types: ['supply_shift'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's4.equilibrium': {
    id: 's4.equilibrium', stage: 's4', order: 9,
    zh: { name: '市場均衡與價格機能', goal: '求均衡價格與數量，分析需求或供應變動對均衡的影響。' },
    en: { name: 'Market Equilibrium & Price Mechanism', goal: 'Find equilibrium price and quantity, and analyse how demand or supply shifts change equilibrium.' },
    lesson: 's4.equilibrium', types: ['equilibrium'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's4.elasticity': {
    id: 's4.elasticity', stage: 's4', order: 10,
    zh: { name: '需求價格彈性', goal: '計算需求價格彈性，判斷彈性大小，並分析彈性與總收入的關係。' },
    en: { name: 'Price Elasticity of Demand', goal: 'Compute PED, classify elasticity, and analyse the link between elasticity and total revenue.' },
    lesson: 's4.elasticity', types: ['ped', 'ped_tr'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's4.elasticity_other': {
    id: 's4.elasticity_other', stage: 's4', order: 11,
    zh: { name: '收入、交叉與供應彈性', goal: '計算收入彈性、交叉彈性與供應彈性，並解釋其經濟含意。' },
    en: { name: 'Income, Cross & Supply Elasticity', goal: 'Compute income, cross and supply elasticities and interpret their meaning.' },
    lesson: 's4.elasticity_other', types: ['yed', 'xed', 'pes'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  }
});
