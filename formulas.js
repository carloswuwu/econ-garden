/*
 * 經濟學園 · 公式一覽
 * 由 index.html 直接載入；app.js 的「公式一覽」畫面讀取 window.Formulas。
 */
var F = {
  title: { zh: '公式一覽', en: 'Formula Sheet' },
  intro: {
    zh: '以下按課題整理常用經濟學公式，方便溫習與查閱。公式以 KaTeX 排版；計算時記得先寫出定義，再代入數字。',
    en: 'Common economics formulae grouped by topic for revision and quick reference. Formulae are typeset with KaTeX; always state the definition before substituting numbers.'
  },
  sections: [
    {
      zh: '彈性 Elasticity', en: 'Elasticity', items: [
        { zh: '需求價格彈性（初始值法）', en: 'Price elasticity of demand (initial-value)', latex: 'E_d = \\left|\\dfrac{\\%\\Delta Q_d}{\\%\\Delta P}\\right| = \\left|\\dfrac{(Q_2-Q_1)/Q_1}{(P_2-P_1)/P_1}\\right|' },
        { zh: '需求價格彈性（中點法）', en: 'Price elasticity of demand (midpoint)', latex: 'E_d = \\left|\\dfrac{(Q_2-Q_1)/\\bar{Q}}{(P_2-P_1)/\\bar{P}}\\right|,\\quad \\bar{Q}=\\dfrac{Q_1+Q_2}{2}' },
        { zh: '點彈性（線性需求）', en: 'Point elasticity (linear demand)', latex: 'E_d = \\left|\\dfrac{dQ}{dP}\\cdot\\dfrac{P}{Q}\\right|' },
        { zh: '供應價格彈性', en: 'Price elasticity of supply', latex: 'E_s = \\dfrac{\\%\\Delta Q_s}{\\%\\Delta P}' },
        { zh: '收入彈性', en: 'Income elasticity of demand', latex: 'E_Y = \\dfrac{\\%\\Delta Q_d}{\\%\\Delta Y}' },
        { zh: '交叉價格彈性', en: 'Cross-price elasticity of demand', latex: 'E_{xy} = \\dfrac{\\%\\Delta Q_x}{\\%\\Delta P_y}' },
        { zh: '總收入與彈性', en: 'Total revenue and elasticity', latex: 'TR = P\\times Q,\\quad \\%\\Delta TR \\approx \\%\\Delta P + \\%\\Delta Q_d' },
        { zh: '稅負歸宿：消費者負擔', en: 'Tax incidence: consumer share', latex: '\\text{consumer share} = \\dfrac{E_s}{E_s + E_d}' },
        { zh: '稅負歸宿：生產者負擔', en: 'Tax incidence: producer share', latex: '\\text{producer share} = \\dfrac{E_d}{E_s + E_d}' }
      ]
    },
    {
      zh: '消費者與廠商 Consumer & Firm', en: 'Consumer & Firm', items: [
        { zh: '總效用與邊際效用', en: 'Total and marginal utility', latex: 'TU_n = \\sum_{i=1}^{n} MU_i,\\quad MU_n = TU_n - TU_{n-1}' },
        { zh: '消費者均衡', en: 'Consumer equilibrium', latex: '\\dfrac{MU_x}{P_x} = \\dfrac{MU_y}{P_y}' },
        { zh: '預算線', en: 'Budget line', latex: 'P_x X + P_y Y = I,\\quad \\text{slope} = -\\dfrac{P_x}{P_y}' },
        { zh: '總成本、平均成本、邊際成本', en: 'Total, average and marginal cost', latex: 'TC = FC + VC,\\quad AC = \\dfrac{TC}{Q},\\quad MC = \\dfrac{\\Delta TC}{\\Delta Q}' },
        { zh: '利潤', en: 'Profit', latex: '\\pi = TR - TC = P\\times Q - TC' },
        { zh: '利潤最大化條件', en: 'Profit-maximising condition', latex: 'MR = MC' },
        { zh: '壟斷廠商的邊際收入', en: 'Marginal revenue under monopoly', latex: 'P = a - bQ \\;\\Rightarrow\\; MR = a - 2bQ' },
        { zh: '經濟利潤', en: 'Economic profit', latex: '\\text{economic profit} = TR - \\text{explicit costs} - \\text{implicit costs}' },
        { zh: '邊際產量與邊際成本', en: 'Marginal product and marginal cost', latex: 'MC = \\dfrac{w}{MP_L}' }
      ]
    },
    {
      zh: '市場效率與政府干預 Efficiency & Government', en: 'Efficiency & Government', items: [
        { zh: '消費者盈餘', en: 'Consumer surplus', latex: 'CS = \\dfrac{1}{2}\\times Q_e \\times (P_{\\max} - P_e)' },
        { zh: '生產者盈餘', en: 'Producer surplus', latex: 'PS = \\dfrac{1}{2}\\times Q_e \\times (P_e - P_{\\min})' },
        { zh: '總盈餘', en: 'Total surplus', latex: 'TS = CS + PS' },
        { zh: '無謂損失（三角形）', en: 'Deadweight loss (triangle)', latex: 'DWL = \\dfrac{1}{2}\\times \\Delta Q \\times \\Delta P' },
        { zh: '從量稅稅收', en: 'Tax revenue (per-unit tax)', latex: '\\text{Tax revenue} = t \\times Q_t' },
        { zh: '皮古稅', en: 'Pigouvian tax', latex: 't^{*} = MEC\\big|_{Q^{*}}' },
        { zh: '社會最適產量（負外部性）', en: 'Socially optimal output (negative externality)', latex: 'MSB = MPC + MEC' },
        { zh: '補貼後價格關係', en: 'Subsidy price relation', latex: 'P_c - P_s = s' }
      ]
    },
    {
      zh: '國民收入與乘數 National Income & Multiplier', en: 'National Income & Multiplier', items: [
        { zh: '支出法 GDP', en: 'GDP by expenditure', latex: 'GDP = C + I + G + (X - M)' },
        { zh: '實質 GDP 與平減指數', en: 'Real GDP and GDP deflator', latex: '\\text{Real GDP} = \\dfrac{\\text{Nominal GDP}}{\\text{GDP deflator}} \\times 100' },
        { zh: 'GDP 平減指數', en: 'GDP deflator', latex: '\\text{GDP deflator} = \\dfrac{\\text{Nominal GDP}}{\\text{Real GDP}} \\times 100' },
        { zh: '經濟增長率', en: 'Economic growth rate', latex: 'g = \\dfrac{Y_2 - Y_1}{Y_1}\\times 100\\%' },
        { zh: '消費函數', en: 'Consumption function', latex: 'C = a + bY,\\quad b = MPC,\\quad MPS = 1 - b' },
        { zh: '簡單乘數', en: 'Simple multiplier', latex: 'k = \\dfrac{1}{1 - MPC} = \\dfrac{1}{MPS}' },
        { zh: '政府支出乘數', en: 'Government spending multiplier', latex: '\\Delta Y = \\dfrac{1}{1 - MPC}\\times \\Delta G' },
        { zh: '稅收乘數', en: 'Tax multiplier', latex: '\\Delta Y = -\\dfrac{MPC}{1 - MPC}\\times \\Delta T' },
        { zh: '均衡國民收入', en: 'Equilibrium national income', latex: 'Y = C + I + G + (X - M)' },
        { zh: '人均 GDP', en: 'GDP per capita', latex: '\\text{GDP per capita} = \\dfrac{GDP}{\\text{population}}' }
      ]
    },
    {
      zh: '貨幣、利率與財務 Mathematics of Money', en: 'Money, Interest & Finance', items: [
        { zh: '貨幣數量論', en: 'Quantity theory of money', latex: 'MV = PY' },
        { zh: '貨幣乘數', en: 'Money multiplier', latex: 'm = \\dfrac{1}{r}' },
        { zh: '存款創造總額', en: 'Total deposit creation', latex: '\\text{Total deposits} = \\text{initial deposit}\\times\\dfrac{1}{r}' },
        { zh: '單利息', en: 'Simple interest', latex: 'I = P\\,r\\,t,\\quad A = P(1 + rt)' },
        { zh: '複利息', en: 'Compound interest', latex: 'A = P(1 + r)^n,\\quad I = P\\big[(1+r)^n - 1\\big]' },
        { zh: '實質利率（Fisher）', en: 'Real interest rate (Fisher)', latex: 'r \\approx i - \\pi' },
        { zh: '現值', en: 'Present value', latex: 'PV = \\dfrac{CF}{(1 + r)^t}' },
        { zh: '淨現值', en: 'Net present value', latex: 'NPV = \\sum_{t=1}^{n}\\dfrac{CF_t}{(1+r)^t} - C_0' },
        { zh: '有效年利率', en: 'Effective annual rate', latex: 'EAR = \\left(1 + \\dfrac{r}{m}\\right)^m - 1' },
        { zh: '七二法則', en: 'Rule of 72', latex: '\\text{doubling time} \\approx \\dfrac{72}{r\\%}' }
      ]
    },
    {
      zh: '國際貿易與金融 International Trade & Finance', en: 'International Trade & Finance', items: [
        { zh: '比較優勢（以另一商品表示機會成本）', en: 'Comparative advantage (opportunity cost)', latex: 'OC_X = \\dfrac{\\text{units of }Y\\text{ given up}}{\\text{units of }X\\text{ gained}}' },
        { zh: '貿易得益', en: 'Gains from trade', latex: '\\text{gains} = \\text{consumption after trade} - \\text{consumption in autarky}' },
        { zh: '關稅收入', en: 'Tariff revenue', latex: '\\text{Tariff revenue} = t \\times (M_1 - M_2)' },
        { zh: '匯率換算', en: 'Currency conversion', latex: '\\text{value in domestic currency} = \\text{foreign amount}\\times E' },
        { zh: '貨幣升值／貶值', en: 'Appreciation / depreciation', latex: '\\%\\Delta E = \\dfrac{E_2 - E_1}{E_1}\\times 100\\%' },
        { zh: '購買力平價匯率', en: 'PPP exchange rate', latex: 'E_{PPP} = \\dfrac{P_d}{P_f}' },
        { zh: '實質匯率', en: 'Real exchange rate', latex: 'q = E\\times\\dfrac{P_f}{P_d}' },
        { zh: '經常帳', en: 'Current account', latex: 'CA = (X - M) + \\text{net services} + \\text{net income} + \\text{net transfers}' }
      ]
    },
    {
      zh: '稅務、預算與個人理財 Tax, Budget & Personal Finance', en: 'Tax, Budget & Personal Finance', items: [
        { zh: '應繳稅款（比例稅）', en: 'Tax payable (proportional)', latex: 'T = \\text{taxable income}\\times t' },
        { zh: '平均稅率', en: 'Average tax rate', latex: '\\text{average tax rate} = \\dfrac{\\text{tax payable}}{\\text{income}}\\times 100\\%' },
        { zh: '邊際稅率', en: 'Marginal tax rate', latex: '\\text{marginal tax rate} = \\dfrac{\\Delta\\text{tax}}{\\Delta\\text{income}}\\times 100\\%' },
        { zh: '財政盈餘／赤字', en: 'Budget surplus / deficit', latex: '\\text{budget balance} = \\text{revenue} - \\text{expenditure}' },
        { zh: '儲蓄與儲蓄率', en: 'Saving and saving rate', latex: 'S = Y - C,\\quad \\text{saving rate} = \\dfrac{S}{Y}\\times 100\\%' },
        { zh: '折扣價', en: 'Discounted price', latex: 'P_{\\text{new}} = P\\times(1 - d)' },
        { zh: '百分比變化', en: 'Percentage change', latex: '\\%\\Delta = \\dfrac{\\text{new} - \\text{old}}{\\text{old}}\\times 100\\%' }
      ]
    },
    {
      zh: '統計、計量與市場集中 Statistics, Econometrics & Concentration', en: 'Statistics, Econometrics & Concentration', items: [
        { zh: '失業率', en: 'Unemployment rate', latex: 'u = \\dfrac{\\text{unemployed}}{\\text{labour force}}\\times 100\\%' },
        { zh: '勞動參與率', en: 'Labour force participation rate', latex: '\\text{LFPR} = \\dfrac{\\text{labour force}}{\\text{working-age population}}\\times 100\\%' },
        { zh: '消費物價指數', en: 'Consumer price index', latex: 'CPI = \\dfrac{\\text{cost of basket at current prices}}{\\text{cost of basket at base prices}}\\times 100' },
        { zh: '通脹率', en: 'Inflation rate', latex: '\\pi = \\dfrac{CPI_2 - CPI_1}{CPI_1}\\times 100\\%' },
        { zh: '複合年均增長率', en: 'Compound annual growth rate', latex: 'CAGR = \\left(\\dfrac{Y_n}{Y_0}\\right)^{1/n} - 1' },
        { zh: '簡單線性回歸', en: 'Simple linear regression', latex: '\\hat{Y} = \\hat{a} + \\hat{b}X' },
        { zh: '判定係數', en: 'Coefficient of determination', latex: 'R^2 = \\dfrac{ESS}{TSS} = 1 - \\dfrac{RSS}{TSS}' },
        { zh: 'HHI 市場集中度', en: 'Herfindahl–Hirschman Index', latex: 'HHI = \\sum_{i=1}^{n} s_i^2' },
        { zh: 'Gini 係數（洛倫茲曲線梯形法）', en: 'Gini coefficient (trapezoid)', latex: 'G = 1 - \\sum_{i}\\left(x_i - x_{i-1}\\right)\\left(y_i + y_{i-1}\\right)' },
        { zh: 'Harrod–Domar 增長', en: 'Harrod–Domar growth', latex: 'g = \\dfrac{s}{v}' }
      ]
    }
  ]
};

window.Formulas = F;
