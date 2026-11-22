/*
 * 挑戰區 · 經濟學應用與解題挑戰
 * 不屬於年級解鎖鏈，永遠開放；題目以跨課題應用、計算與推理為主。
 */
EconData.addStage({
  id: 'challenge', zh: '挑戰區', en: 'Challenge', color: '#B07C2A', emoji: '🏆',
  desc: { zh: '經濟學應用與解題挑戰：貿易、彈性、政策、金融、數據與博弈', en: 'Applied economics: trade, elasticity, policy, finance, data and games' },
  topics: [
    { id: 'chal.t1', zh: '貿易與彈性', en: 'Trade & Elasticity', skills: ['chal.trade', 'chal.elasticity_tax'] },
    { id: 'chal.t2', zh: '宏觀與金融', en: 'Macro & Finance', skills: ['chal.macro', 'chal.finance'] },
    { id: 'chal.t3', zh: '博弈、數據與推理', en: 'Games, Data & Reasoning', skills: ['chal.game_data', 'chal.reasoning'] }
  ]
});

EconData.addSkills({
  'chal.trade': {
    id: 'chal.trade', stage: 'challenge', order: 1,
    zh: { name: '貿易與比較優勢挑戰', goal: '在複雜的生產數據中找出比較優勢、貿易條件與貿易得益。' },
    en: { name: 'Trade & Comparative Advantage Challenge', goal: 'Find comparative advantage, terms of trade and gains from trade in richer production data.' },
    lesson: 'chal.trade', types: ['comparative_advantage', 'tariff'],
    levels: [{ level: 2 }, { level: 3 }, { level: 3 }],
    mastery: { practice: 8, quizPass: 0.8 }
  },
  'chal.elasticity_tax': {
    id: 'chal.elasticity_tax', stage: 'challenge', order: 2,
    zh: { name: '彈性與稅負挑戰', goal: '結合彈性、稅負歸宿與無謂損失解決多步難題。' },
    en: { name: 'Elasticity & Tax Incidence Challenge', goal: 'Combine elasticity, tax incidence and deadweight loss in multi-step problems.' },
    lesson: 'chal.elasticity_tax', types: ['tax_incidence', 'ped'],
    levels: [{ level: 2 }, { level: 3 }, { level: 3 }],
    mastery: { practice: 8, quizPass: 0.8 }
  },
  'chal.macro': {
    id: 'chal.macro', stage: 'challenge', order: 3,
    zh: { name: '宏觀政策與乘數挑戰', goal: '在開放經濟與存在緊縮缺口的情境中設計政策並計算效果。' },
    en: { name: 'Macro Policy & Multiplier Challenge', goal: 'Design policy and compute its effects in an open economy with an output gap.' },
    lesson: 'chal.macro', types: ['multiplier', 'income_eq'],
    levels: [{ level: 2 }, { level: 3 }, { level: 3 }],
    mastery: { practice: 8, quizPass: 0.8 }
  },
  'chal.finance': {
    id: 'chal.finance', stage: 'challenge', order: 4,
    zh: { name: '財務數學挑戰', goal: '計算現值、淨現值、複利與投資決策。' },
    en: { name: 'Financial Mathematics Challenge', goal: 'Compute present value, net present value, compound growth and investment decisions.' },
    lesson: 'chal.finance', types: ['npv', 'interest'],
    levels: [{ level: 2 }, { level: 3 }, { level: 3 }],
    mastery: { practice: 8, quizPass: 0.8 }
  },
  'chal.game_data': {
    id: 'chal.game_data', stage: 'challenge', order: 5,
    zh: { name: '博弈與數據挑戰', goal: '用博弈論與數據分析處理市場集中度、不平等與策略互動。' },
    en: { name: 'Games & Data Challenge', goal: 'Use game theory and data analysis on concentration, inequality and strategic interaction.' },
    lesson: 'chal.game_data', types: ['game_theory', 'hhi', 'gini', 'data_read'],
    levels: [{ level: 2 }, { level: 3 }, { level: 3 }],
    mastery: { practice: 8, quizPass: 0.8 }
  },
  'chal.reasoning': {
    id: 'chal.reasoning', stage: 'challenge', order: 6,
    zh: { name: '經濟推理挑戰', goal: '運用經濟邏輯拆解迷思、悖論與政策權衡。' },
    en: { name: 'Economic Reasoning Challenge', goal: 'Apply economic logic to myths, paradoxes and policy trade-offs.' },
    lesson: 'chal.reasoning', types: ['bank'],
    levels: [{ level: 2 }, { level: 3 }],
    mastery: { practice: 8, quizPass: 0.8 }
  }
});
