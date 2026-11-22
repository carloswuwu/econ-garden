/*
 * 中二 · 香港公共財政、經濟表現與人力資源
 * 對應「公民、經濟與社會」（中二）單元 2.3、2.4。
 */
EconData.addStage({
  id: 's2', zh: '中二', en: 'Form 2', color: '#5A9E6F', emoji: '🏙️',
  desc: { zh: '香港的公共財政、經濟表現與人力資源', en: 'Hong Kong public finance, economic performance and human resources' },
  topics: [
    { id: 's2.t1', zh: '公共財政', en: 'Public Finance', skills: ['s2.public_finance', 's2.tax_types', 's2.tax_progressive', 's2.fiscal_budget'] },
    { id: 's2.t2', zh: '經濟表現', en: 'Economic Performance', skills: ['s2.gdp', 's2.growth', 's2.unemployment', 's2.inflation'] }
  ]
});

EconData.addSkills({
  's2.public_finance': {
    id: 's2.public_finance', stage: 's2', order: 1,
    zh: { name: '公共財政與政府角色', goal: '說明政府收入與支出的來源和用途，以及政府在經濟中的角色。' },
    en: { name: 'Public Finance & Government', goal: 'Explain sources and uses of government revenue and spending, and the government\'s role in the economy.' },
    lesson: 's2.public_finance', types: ['bank'],
    levels: [{ level: 1 }, { level: 2 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's2.tax_types': {
    id: 's2.tax_types', stage: 's2', order: 2,
    zh: { name: '稅種與稅制原則', goal: '認識直接稅與間接稅、累進／比例／累退稅，以及公平與效率等稅制原則。' },
    en: { name: 'Types of Taxes', goal: 'Recognise direct and indirect taxes, progressive/proportional/regressive taxes, and principles such as equity and efficiency.' },
    lesson: 's2.tax_types', types: ['tax_basic'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's2.tax_progressive': {
    id: 's2.tax_progressive', stage: 's2', order: 3,
    zh: { name: '累進稅與有效稅率', goal: '按累進稅階計算應繳稅款、平均稅率與邊際稅率。' },
    en: { name: 'Progressive Tax & Effective Rate', goal: 'Compute tax payable, average tax rate and marginal tax rate under progressive tax brackets.' },
    lesson: 's2.tax_progressive', types: ['tax_progressive'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's2.fiscal_budget': {
    id: 's2.fiscal_budget', stage: 's2', order: 4,
    zh: { name: '財政預算與赤字', goal: '計算政府財政盈餘或赤字，理解赤字、盈餘與債務的關係。' },
    en: { name: 'Budget Balance', goal: 'Compute a government budget surplus or deficit and understand its link to public debt.' },
    lesson: 's2.fiscal_budget', types: ['fiscal_balance'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's2.gdp': {
    id: 's2.gdp', stage: 's2', order: 5,
    zh: { name: '本地生產總值', goal: '用支出法計算本地生產總值，並分辨名義與實質 GDP。' },
    en: { name: 'Gross Domestic Product', goal: 'Compute GDP by the expenditure approach and distinguish nominal from real GDP.' },
    lesson: 's2.gdp', types: ['gdp_exp'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's2.growth': {
    id: 's2.growth', stage: 's2', order: 6,
    zh: { name: '經濟增長', goal: '計算經濟增長率、人均 GDP 及增長率的近似規則。' },
    en: { name: 'Economic Growth', goal: 'Compute economic growth rates, GDP per capita and rules for approximating growth.' },
    lesson: 's2.growth', types: ['growth'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's2.unemployment': {
    id: 's2.unemployment', stage: 's2', order: 7,
    zh: { name: '失業與勞動人口', goal: '計算勞動人口、失業率與勞動參與率，並分辨失業的類型。' },
    en: { name: 'Unemployment & Labour Force', goal: 'Compute the labour force, unemployment rate and participation rate, and identify types of unemployment.' },
    lesson: 's2.unemployment', types: ['unemployment'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  },
  's2.inflation': {
    id: 's2.inflation', stage: 's2', order: 8,
    zh: { name: '通脹與物價', goal: '用消費物價指數計算通脹率，理解通脹對購買力的影響。' },
    en: { name: 'Inflation & Prices', goal: 'Compute inflation from the CPI and understand inflation\'s effect on purchasing power.' },
    lesson: 's2.inflation', types: ['cpi'],
    levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
    mastery: { practice: 10, quizPass: 0.8 }
  }
});
