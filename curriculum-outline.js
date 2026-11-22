/*
 * 課程大綱（香港課程參考）
 * - 初中：公民、經濟與社會（中一至中三）課程指引（2022）中有關「資源與經濟活動」的學習單元
 * - 高中：經濟課程及評估指引（中四至中六，2025/26 學年起優化，適用於 2028 年起 HKDSE）
 * - 大學：本地大學經濟學主修常見核心課程
 */
var O = {
  title: { zh: '課程大綱', en: 'Curriculum Outline' },
  intro: {
    zh: '以下大綱按香港教育局《公民、經濟與社會課程指引（中一至中三）》（2022）的經濟範疇，以及《經濟課程及評估指引（中四至中六）》（2025 年更新、2025/26 學年起於中四推行）整理，並補上大學經濟學主修的核心課題，供學習規劃參考。',
    en: 'This outline follows the Economics-related strands of the EDB "Citizenship, Economics and Society Curriculum Guide (S.1–S.3)" (2022) and the "Economics Curriculum and Assessment Guide (S.4–S.6)" (updated 2025, implemented from S.4 in 2025/26), plus core topics in university economics majors.'
  },
  note: {
    zh: '本 app 由中一開始，不設學前及小學階段：正規經濟學教育最早見於中一「公民、經濟與社會」的理財與經濟單元，而 DSE 經濟科由中四開始，因此把學前與小學的數學式階段略去，集中中一至大學的經濟學內容。',
    en: 'This app starts at S.1 and has no pre-school or primary stages: formal economics education begins with the junior secondary Citizenship, Economics and Society curriculum, while HKDSE Economics starts in S.4. Pre-school and primary sections are therefore omitted.'
  },
  stages: [
    {
      id: 'js',
      zh: '初中（中一至中三）：公民、經濟與社會 · 經濟範疇',
      en: 'Junior Secondary (S.1–S.3): Citizenship, Economics and Society — Economics strand',
      strands: [
        {
          zh: '資源與經濟活動', en: 'Resources and Economic Activities', units: [
            { zh: '金錢的功能與用途', en: 'Functions and uses of money' },
            { zh: '消費項目的優先次序與預算', en: 'Prioritising consumption and budgeting' },
            { zh: '借貸的責任、代價與風險', en: 'Responsibilities, costs and risks of borrowing' },
            { zh: '儲蓄、投資、風險與回報', en: 'Saving, investment, risk and return' },
            { zh: '網上消費與理財陷阱', en: 'Online consumption and financial traps' },
            { zh: '香港的公共財政', en: 'Public finance of Hong Kong' },
            { zh: '香港的經濟表現及人力資源', en: 'Economic performance and human resources of Hong Kong' },
            { zh: '國家經濟概況與世界貿易', en: 'The national economy and world trade' },
            { zh: '經濟全球化與國際經濟組織', en: 'Globalisation and international economic organisations' }
          ]
        },
        {
          zh: '經濟學基礎概念（本 app 補充）', en: 'Foundations of Economics (supplement)', units: [
            { zh: '稀少性、選擇與機會成本', en: 'Scarcity, choice and opportunity cost' },
            { zh: '生產要素與分工', en: 'Factors of production and specialisation' },
            { zh: '需求、供應與價格初步', en: 'Introduction to demand, supply and price' },
            { zh: '經濟體系與三個基本經濟問題', en: 'Economic systems and the three basic economic questions' }
          ]
        }
      ]
    },
    {
      id: 'ss',
      zh: '高中（中四至中六）：HKDSE 經濟科',
      en: 'Senior Secondary (S.4–S.6): HKDSE Economics',
      strands: [
        {
          zh: '必修部分：微觀經濟學', en: 'Compulsory Part: Microeconomics', units: [
            { zh: 'A 基本經濟概念', en: 'A Basic economic concepts' },
            { zh: 'B 廠商與生產', en: 'B Firms and production' },
            { zh: 'C 市場與價格', en: 'C Market and price' },
            { zh: 'D 競爭與市場結構', en: 'D Competition and market structure' },
            { zh: 'E 效率、公平和政府的角色', en: 'E Efficiency, equity and the role of government' }
          ]
        },
        {
          zh: '必修部分：宏觀經濟學', en: 'Compulsory Part: Macroeconomics', units: [
            { zh: 'F 經濟表現的量度', en: 'F Measurement of economic performance' },
            { zh: 'G 國民收入決定及價格水平', en: 'G National income determination and price level' },
            { zh: 'H 貨幣與銀行', en: 'H Money and banking' },
            { zh: 'I 宏觀經濟問題和政策', en: 'I Macroeconomic problems and policies' },
            { zh: 'J 國際貿易和金融', en: 'J International trade and finance' }
          ]
        },
        {
          zh: '選修部分（二選一，約 10% 課程時間）', en: 'Elective Part (choose one, about 10% of curriculum time)', units: [
            { zh: '單元一：壟斷定價、反競爭行為及競爭政策', en: 'Unit 1: Monopoly pricing, anti-competitive behaviour and competition policy' },
            { zh: '單元二：貿易理論之延伸、經濟增長及發展', en: 'Unit 2: Extension of trade theory, economic growth and development' }
          ]
        }
      ]
    },
    {
      id: 'uni',
      zh: '大學：經濟學主修核心課程',
      en: 'University: Core of an Economics Major',
      strands: [
        {
          zh: '微觀經濟學', en: 'Microeconomics', units: [
            { zh: '消費者理論：效用、預算線、無異曲線', en: 'Consumer theory: utility, budget line, indifference curves' },
            { zh: '廠商理論：生產函數、成本、利潤最大化', en: 'Producer theory: production function, costs, profit maximisation' },
            { zh: '市場均衡與福利經濟學', en: 'Market equilibrium and welfare economics' },
            { zh: '博弈論與策略互動', en: 'Game theory and strategic interaction' },
            { zh: '資訊經濟學與行為經濟學', en: 'Information economics and behavioural economics' }
          ]
        },
        {
          zh: '宏觀經濟學', en: 'Macroeconomics', units: [
            { zh: 'AD-AS 與 IS-LM 模型', en: 'AD-AS and IS-LM models' },
            { zh: '經濟增長理論：Solow 模型與增長會計', en: 'Growth theory: Solow model and growth accounting' },
            { zh: '貨幣理論與政策規則', en: 'Monetary theory and policy rules' },
            { zh: '失業、通脹與經濟週期', en: 'Unemployment, inflation and the business cycle' },
            { zh: '勞動經濟學', en: 'Labour economics' }
          ]
        },
        {
          zh: '計量經濟學', en: 'Econometrics', units: [
            { zh: '機率、統計推論與假設檢定', en: 'Probability, statistical inference and hypothesis testing' },
            { zh: '簡單與多元線性回歸', en: 'Simple and multiple linear regression' },
            { zh: 'OLS 假設、R² 與顯著性', en: 'OLS assumptions, R² and significance' },
            { zh: '因果推論與政策評估', en: 'Causal inference and policy evaluation' }
          ]
        },
        {
          zh: '應用領域與經濟思想', en: 'Applied Fields and Economic Thought', units: [
            { zh: '公共經濟學', en: 'Public economics' },
            { zh: '國際經濟學', en: 'International economics' },
            { zh: '金融經濟學', en: 'Financial economics' },
            { zh: '發展經濟學', en: 'Development economics' },
            { zh: '產業組織', en: 'Industrial organisation' },
            { zh: '經濟思想史', en: 'History of economic thought' }
          ]
        }
      ]
    }
  ]
};

window.CurriculumOutline = O;
