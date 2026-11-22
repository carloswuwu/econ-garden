/*
 * 中一 · 理財教育與基本經濟概念
 * 對應香港「公民、經濟與社會」（中一）理財教育單元，並補上經濟學入門概念。
 */
EconData.addStage({
  id: 's1', zh: '中一', en: 'Form 1', color: '#4A87C7', emoji: '🌱',
  desc: { zh: '金錢、選擇與理財：由個人預算出發認識經濟學', en: 'Money, choice and personal finance: economics through everyday decisions' },
  topics: [
    { id: 's1.t1', zh: '金錢與選擇', en: 'Money & Choice', skills: ['s1.money', 's1.scarcity', 's1.opportunity_cost', 's1.factors'] },
    { id: 's1.t2', zh: '理財與消費', en: 'Managing Money', skills: ['s1.budget', 's1.percentage', 's1.interest', 's1.investment'] }
  ]
});

EconData.addSkills({
  's1.money': {
    id: 's1.money', stage: 's1', order: 1,
    zh: { name: '金錢的功能', goal: '說出金錢作為交易媒介、計價單位、價值儲存及延遲支付的功能。' },
    en: { name: 'Functions of Money', goal: 'Explain money as a medium of exchange, unit of account, store of value and standard of deferred payment.' },
    lesson: 's1.money', types: ['bank'],
    levels: [{ level: 1 }, { level: 2 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's1.scarcity': {
    id: 's1.scarcity', stage: 's1', order: 2,
    zh: { name: '稀少性與選擇', goal: '理解資源有限、慾望無窮，因此要作出選擇，並分辨需要與想要。' },
    en: { name: 'Scarcity & Choice', goal: 'Understand limited resources and unlimited wants, the need to choose, and distinguish needs from wants.' },
    lesson: 's1.scarcity', types: ['bank'],
    levels: [{ level: 1 }, { level: 2 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's1.opportunity_cost': {
    id: 's1.opportunity_cost', stage: 's1', order: 3,
    zh: { name: '機會成本', goal: '計算作出選擇時所放棄的次佳選擇的價值。' },
    en: { name: 'Opportunity Cost', goal: 'Calculate the value of the next best alternative forgone when making a choice.' },
    lesson: 's1.opportunity_cost', types: ['oppcost'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's1.factors': {
    id: 's1.factors', stage: 's1', order: 4,
    zh: { name: '生產要素', goal: '分辨土地、勞力、資本與企業家才能四種生產要素，並說出它們的回報。' },
    en: { name: 'Factors of Production', goal: 'Identify land, labour, capital and entrepreneurship, and their rewards.' },
    lesson: 's1.factors', types: ['bank'],
    levels: [{ level: 1 }, { level: 2 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's1.budget': {
    id: 's1.budget', stage: 's1', order: 5,
    zh: { name: '個人預算與儲蓄', goal: '編製簡單個人預算，計算收入、支出、儲蓄及儲蓄率。' },
    en: { name: 'Budgeting & Saving', goal: 'Build a simple personal budget and compute income, spending, saving and the saving rate.' },
    lesson: 's1.budget', types: ['budget_personal'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's1.percentage': {
    id: 's1.percentage', stage: 's1', order: 6,
    zh: { name: '百分數與消費', goal: '運用百分數計算折扣、加價、服務費及百分比變化。' },
    en: { name: 'Percentages in Spending', goal: 'Use percentages for discounts, mark-ups, service charges and percentage changes.' },
    lesson: 's1.percentage', types: ['percentage'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's1.interest': {
    id: 's1.interest', stage: 's1', order: 7,
    zh: { name: '利息與借貸', goal: '計算單利息、本利和及借貸成本，認識過度借貸的風險。' },
    en: { name: 'Interest & Borrowing', goal: 'Compute simple interest, amount repayable and borrowing cost, and recognise the risks of over-borrowing.' },
    lesson: 's1.interest', types: ['interest'],
    levels: [{ level: 1, mode: 'simple' }, { level: 2, mode: 'simple' }, { level: 3, mode: 'compound' }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's1.investment': {
    id: 's1.investment', stage: 's1', order: 8,
    zh: { name: '儲蓄、投資與風險', goal: '認識儲蓄與投資的分別、風險與回報的關係，以及複利效果。' },
    en: { name: 'Saving, Investing & Risk', goal: 'Distinguish saving from investing, understand risk–return and the power of compound interest.' },
    lesson: 's1.investment', types: ['interest'],
    levels: [{ level: 1, mode: 'compound' }, { level: 2, mode: 'compound' }, { level: 3, mode: 'compound' }],
    mastery: { practice: 10, quizPass: 0.8 }
  }
});
