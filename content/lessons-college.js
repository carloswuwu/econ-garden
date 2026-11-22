/*
 * content/lessons-college.js
 * 大學（經濟學核心課程）小課堂及概念題庫
 * 技能：col.consumer … col.thought（共 13 課）
 * 題庫：col.info_behavioural、col.thought
 * 以 EconData.addLessons / EconData.addBanks 註冊。
 */

EconData.addLessons({

  'col.consumer': {
    zh: {
      intro: '消費者從消費中得到的滿足稱為效用；多消費一單位所增加的效用是邊際效用，一般隨消費量增加而遞減（邊際效用遞減定律）。在預算線 $P_X X + P_Y Y = I$ 的限制下，當每元邊際效用相等，即 $MU_X/P_X = MU_Y/P_Y$ 時，總效用最大；圖形上就是無異曲線與預算線相切，切點斜率（邊際替代率）等於價格比 $P_X/P_Y$。',
      steps: [
        '寫出預算約束 $P_X X + P_Y Y = I$，求全買 X 與全買 Y 的兩個截距 $I/P_X$、$I/P_Y$。',
        '預算線斜率的絕對值 $P_X/P_Y$ 就是多買 1 單位 X 的機會成本（以 Y 計）。',
        '分別計算兩商品的每元邊際效用 $MU_X/P_X$ 與 $MU_Y/P_Y$。',
        '若 $MU_X/P_X > MU_Y/P_Y$，增加 X、減少 Y，直至兩者相等且用盡收入；反之亦然。'
      ],
      example: '預算 120 元，$P_X = 10$ 元、$P_Y = 20$ 元：全買 X 可得 12 單位，全買 Y 可得 6 單位；斜率絕對值 $10/20 = 0.5$，即 1 單位 X 的機會成本是 0.5 單位 Y。若現有組合下 $MU_X = 20$、$MU_Y = 30$，每元邊際效用分別為 $20/10 = 2$ 與 $30/20 = 1.5$，故應增加 X、減少 Y。',
      tip: '比較「每元邊際效用」而非「邊際效用」本身；價格不同時，$MU$ 較高不代表更值得買。',
      mistake: '把邊際效用最高的商品買到最多。正解是比較 $MU/P$，在預算限制下令各商品的每元邊際效用相等。',
      glossary: [
        { term: '邊際效用', def: '多消費一單位商品所增加的總效用。' },
        { term: '無異曲線', def: '能帶給消費者相同效用水平的商品組合軌跡。' },
        { term: '預算線', def: '在既定收入與價格下，消費者能負擔的兩種商品組合的軌跡。' }
      ]
    },
    en: {
      intro: 'The satisfaction a consumer derives from a good is utility; the extra utility from one more unit is marginal utility, which normally diminishes as consumption rises (the law of diminishing marginal utility). Given the budget line $P_X X + P_Y Y = I$, total utility is maximised when utility per dollar is equal across goods, $MU_X/P_X = MU_Y/P_Y$. Graphically this is where an indifference curve is tangent to the budget line, so the slope (the marginal rate of substitution) equals the price ratio $P_X/P_Y$.',
      steps: [
        'Write the budget constraint $P_X X + P_Y Y = I$ and find the two intercepts $I/P_X$ and $I/P_Y$.',
        'The absolute slope of the budget line, $P_X/P_Y$, is the opportunity cost of one more unit of X in units of Y.',
        'Compute the utility per dollar for each good, $MU_X/P_X$ and $MU_Y/P_Y$.',
        'If $MU_X/P_X > MU_Y/P_Y$, buy more X and less Y until the two are equal and income is fully spent; the reverse applies otherwise.'
      ],
      example: 'With a budget of 120 dollars and $P_X = 10$ dollars, $P_Y = 20$ dollars: spending all on X gives 12 units and all on Y gives 6 units. The absolute slope is $10/20 = 0.5$, so one unit of X costs 0.5 units of Y. If at the current bundle $MU_X = 20$ and $MU_Y = 30$, utility per dollar is $20/10 = 2$ and $30/20 = 1.5$, so the consumer should buy more X and less Y.',
      tip: 'Compare utility per dollar rather than marginal utility itself; when prices differ, a higher $MU$ does not mean a better buy.',
      mistake: 'Buying most of the good with the highest marginal utility. The correct rule compares $MU/P$ and equalises utility per dollar subject to the budget.',
      glossary: [
        { term: 'Marginal utility', def: 'The extra total utility gained from consuming one more unit of a good.' },
        { term: 'Indifference curve', def: 'The locus of consumption bundles that give the consumer the same level of utility.' },
        { term: 'Budget line', def: 'The locus of affordable bundles of two goods given income and prices.' }
      ]
    }
  },

  'col.producer': {
    zh: {
      intro: '生產函數描述投入與產出的關係：短期至少有一種固定投入，邊際產量最終遞減；長期所有投入可變，規模報酬描述投入倍增時產出的變化——產出倍增為不變，增更多為遞增，增更少為遞減。廠商以成本最小化選擇投入組合，並以 $MR = MC$ 決定利潤最大化的產量；經濟利潤還要扣除機會成本。',
      steps: [
        '由總成本函數求邊際成本 $MC = dTC/dQ$，或由成本表用相鄰產量的成本差求 MC。',
        '由需求函數 $P = a - bQ$ 寫出總收入 $TR = PQ$，再求邊際收入 $MR = a - 2bQ$。',
        '令 $MR = MC$ 解出利潤最大化產量 $Q^*$，代回需求函數求價格。',
        '利潤 $\\pi = TR - TC$；若求經濟利潤，再減去自有資源的機會成本。'
      ],
      example: '某廠商的總成本為 $TC = 100 + 10Q + Q^2$，故 $MC = 10 + 2Q$；市場需求為 $P = 70 - 2Q$，故 $MR = 70 - 4Q$。令 $MR = MC$：$70 - 4Q = 10 + 2Q$，解得 $Q = 10$、$P = 50$，利潤 $= 500 - 300 = 200$ 元。',
      tip: '完全競爭廠商是價格接受者，$P = MR$；壟斷廠商面對向下傾斜的需求，$MR < P$，但兩者都用 $MR = MC$ 決定產量。',
      mistake: '把會計利潤當成經濟利潤。經濟利潤要再扣除老闆自有資金與時間的機會成本，因此可能為負，即使賬面有盈利。',
      glossary: [
        { term: '規模報酬', def: '長期所有投入按同一比例增加時，產出增加的比例大於、等於或小於投入比例的現象。' },
        { term: '邊際成本', def: '多生產一單位產出所增加的總成本。' },
        { term: '經濟利潤', def: '總收入減去所有顯性成本與機會成本後的利潤。' }
      ]
    },
    en: {
      intro: 'A production function relates inputs to output. In the short run at least one input is fixed and marginal product eventually diminishes; in the long run all inputs can vary, and returns to scale describe what happens when all inputs are doubled: constant returns if output doubles, increasing returns if output more than doubles, decreasing returns if it less than doubles. Firms choose inputs to minimise cost and set $MR = MC$ to maximise profit; economic profit also deducts opportunity costs.',
      steps: [
        'Find marginal cost from the total cost function, $MC = dTC/dQ$, or from cost-table differences between adjacent outputs.',
        'From demand $P = a - bQ$ write total revenue $TR = PQ$ and marginal revenue $MR = a - 2bQ$.',
        'Set $MR = MC$ to solve for the profit-maximising quantity $Q^*$, then substitute back into demand for price.',
        'Profit is $\\pi = TR - TC$; for economic profit, subtract the opportunity cost of the owner\'s own resources as well.'
      ],
      example: 'A firm has total cost $TC = 100 + 10Q + Q^2$, so $MC = 10 + 2Q$; market demand is $P = 70 - 2Q$, so $MR = 70 - 4Q$. Setting $MR = MC$: $70 - 4Q = 10 + 2Q$ gives $Q = 10$ and $P = 50$, with profit $= 500 - 300 = 200$ dollars.',
      tip: 'A perfectly competitive firm is a price taker, so $P = MR$; a monopolist faces a downward-sloping demand curve, so $MR < P$, but both set $MR = MC$.',
      mistake: 'Treating accounting profit as economic profit. Economic profit also deducts the opportunity cost of the owner\'s capital and time, so it may be negative even when the accounts show a profit.',
      glossary: [
        { term: 'Returns to scale', def: 'How output responds when all inputs are scaled up together: increasing, constant or decreasing.' },
        { term: 'Marginal cost', def: 'The extra total cost of producing one more unit of output.' },
        { term: 'Economic profit', def: 'Total revenue minus explicit costs and opportunity costs.' }
      ]
    }
  },

  'col.market_welfare': {
    zh: {
      intro: '消費者盈餘是願付價格與實際價格之差，生產者盈餘是實際價格與邊際成本之差；兩者之和為總盈餘，在沒有外部性與市場力量的完全競爭均衡中達到最大。從量稅會令交易量減少，買賣雙方分擔稅負的比例取決於供需彈性；減少的交易造成無謂損失。',
      steps: [
        '令 $Q_d = Q_s$ 求無稅均衡價格 $P_e$ 與數量 $Q_e$。',
        '消費者盈餘 $= \\frac{1}{2} \\times Q_e \\times (P_{max} - P_e)$，其中 $P_{max}$ 是需求曲線的價格截距。',
        '生產者盈餘 $= \\frac{1}{2} \\times Q_e \\times (P_e - P_{min})$，其中 $P_{min}$ 是供應曲線的價格截距。',
        '有從量稅 $t$ 時，令 $Q_d(P_c) = Q_s(P_c - t)$ 求買方價 $P_c$ 與賣方價 $P_p$，再算稅收與無謂損失 $\\frac{1}{2} \\times t \\times \\Delta Q$。'
      ],
      example: '$Q_d = 120 - 2P$、$Q_s = 2P$：均衡 $P = 30$、$Q = 60$。消費者盈餘 $= \\frac{1}{2} \\times 60 \\times (60 - 30) = 900$ 元；生產者盈餘 $= \\frac{1}{2} \\times 60 \\times 30 = 900$ 元。若加從量稅 10 元，買方價 35 元、賣方價 25 元、交易量 50，稅收 500 元，無謂損失 $= \\frac{1}{2} \\times 10 \\times 10 = 50$ 元。',
      tip: '畫圖時先標出均衡點、需求與供應的價格截距，以及稅楔；三角形面積比死記公式可靠。',
      mistake: '以為法定納稅人就是稅負承擔者。稅負歸宿取決於彈性：較缺乏彈性的一方承擔較大比例的稅負，價格會把部分負擔轉移給另一方。',
      glossary: [
        { term: '消費者盈餘', def: '消費者願付價格總額與實際支付總額之差。' },
        { term: '生產者盈餘', def: '生產者實際收取總額與其願意接受的最低總額之差。' },
        { term: '無謂損失', def: '市場效率未被充分利用而損失的總盈餘。' }
      ]
    },
    en: {
      intro: 'Consumer surplus is the gap between what buyers are willing to pay and what they actually pay; producer surplus is the gap between the price received and marginal cost. Their sum is total surplus, which is maximised in a competitive equilibrium without externalities or market power. A per-unit tax reduces the quantity traded; the burden is shared between buyers and sellers according to relative elasticities, and the lost trades create a deadweight loss.',
      steps: [
        'Set $Q_d = Q_s$ to find the no-tax equilibrium price $P_e$ and quantity $Q_e$.',
        'Consumer surplus $= \\frac{1}{2} \\times Q_e \\times (P_{max} - P_e)$, where $P_{max}$ is the demand price intercept.',
        'Producer surplus $= \\frac{1}{2} \\times Q_e \\times (P_e - P_{min})$, where $P_{min}$ is the supply price intercept.',
        'With a per-unit tax $t$, solve $Q_d(P_c) = Q_s(P_c - t)$ for the buyer price $P_c$ and seller price $P_p$, then compute tax revenue and deadweight loss $\\frac{1}{2} \\times t \\times \\Delta Q$.'
      ],
      example: 'With $Q_d = 120 - 2P$ and $Q_s = 2P$, equilibrium is $P = 30$ and $Q = 60$. Consumer surplus $= \\frac{1}{2} \\times 60 \\times (60 - 30) = 900$ dollars; producer surplus $= \\frac{1}{2} \\times 60 \\times 30 = 900$ dollars. A per-unit tax of 10 dollars gives a buyer price of 35, a seller price of 25 and a quantity of 50; tax revenue is 500 dollars and deadweight loss $= \\frac{1}{2} \\times 10 \\times 10 = 50$ dollars.',
      tip: 'When drawing the diagram, mark the equilibrium, the price intercepts and the tax wedge first; triangle areas are more reliable than memorised formulas.',
      mistake: 'Assuming the party that legally pays the tax bears it. Incidence depends on elasticities: the less elastic side bears the larger share, as prices shift part of the burden to the other side.',
      glossary: [
        { term: 'Consumer surplus', def: 'Total willingness to pay minus total amount actually paid.' },
        { term: 'Producer surplus', def: 'Total amount received minus the minimum total amount producers would accept.' },
        { term: 'Deadweight loss', def: 'The total surplus lost because mutually beneficial trades do not take place.' }
      ]
    }
  },

  'col.game_theory': {
    zh: {
      intro: '博弈論研究策略互動：每個人的回報取決於所有人的選擇。優勢策略是不論對手怎樣做都最好的策略；納什均衡是給定對手策略、任何一方都不能單方面改變而獲益的策略組合。囚徒困境中個人理性導致集體較差的結果；在重複博弈中，聲譽與報復的可能性可支持合作。',
      steps: [
        '固定對手的策略，逐一比較自己每個策略的回報。',
        '若某策略在對手所有策略下回報都較高，它就是優勢策略。',
        '對每個策略組合，檢查任何一方能否單方面改變而增加回報；不能改變的組合就是納什均衡。',
        '比較納什均衡與其他組合的總回報，判斷是否屬於囚徒困境。'
      ],
      example: '兩廠商同時定價，回報以百萬元計：雙方都定高價各得 10；一方降價而另一方定高價時，降價者得 14、定高價者得 4；雙方都降價各得 6。無論對手怎樣做，降價都較好（對手高價：14 對 10；對手低價：6 對 4），故（降價，降價）是優勢策略均衡，也是納什均衡，但雙方各得 6，低於合作定高價的 10，這就是囚徒困境。',
      tip: '先找優勢策略可大幅簡化分析；但納什均衡不一定唯一、也不一定是社會最優，必須逐格檢查。',
      mistake: '把「雙方合作最好」當成納什均衡。若任何一方可單方面改變策略而獲益，該合作組合就不穩定，不是納什均衡。',
      glossary: [
        { term: '納什均衡', def: '給定其他參與者的策略，沒有任何參與者能單方面改變策略而獲益的策略組合。' },
        { term: '優勢策略', def: '不論對手選擇甚麼策略，對自己都最有利的策略。' },
        { term: '囚徒困境', def: '個人理性選擇導致集體結果較合作結果為差的博弈。' }
      ]
    },
    en: {
      intro: 'Game theory studies strategic interaction: each player\'s payoff depends on everyone\'s choices. A dominant strategy is best whatever the other player does; a Nash equilibrium is a strategy profile where, given the other players\' strategies, no player can gain by changing unilaterally. In a prisoner\'s dilemma, individual rationality produces a worse collective outcome; in repeated games, reputation and the threat of retaliation can sustain cooperation.',
      steps: [
        'Hold the opponent\'s strategy fixed and compare your payoffs across your own strategies.',
        'If one strategy gives a higher payoff against every opponent strategy, it is a dominant strategy.',
        'For each strategy profile, check whether either player can gain by changing unilaterally; profiles where no one can are Nash equilibria.',
        'Compare the Nash equilibrium with other profiles to see whether it is a prisoner\'s dilemma.'
      ],
      example: 'Two firms set prices simultaneously; payoffs in millions: both high price gives 10 each; one cuts price while the other stays high gives 14 to the cutter and 4 to the other; both cut gives 6 each. Cutting is better whatever the rival does (against high: 14 versus 10; against low: 6 versus 4), so (cut, cut) is a dominant-strategy equilibrium and a Nash equilibrium, yet each earns 6, below the cooperative 10 — a prisoner\'s dilemma.',
      tip: 'Finding dominant strategies simplifies the analysis, but Nash equilibria need not be unique or socially optimal, so check every cell.',
      mistake: 'Treating the jointly best outcome as the Nash equilibrium. If either player can gain by changing strategy unilaterally, the cooperative profile is unstable and is not a Nash equilibrium.',
      glossary: [
        { term: 'Nash equilibrium', def: 'A strategy profile in which no player can gain by unilaterally changing strategy, given the others\' strategies.' },
        { term: 'Dominant strategy', def: 'A strategy that yields a higher payoff than any alternative, whatever the opponents do.' },
        { term: 'Prisoner\'s dilemma', def: 'A game where individually rational choices lead to a worse collective outcome than cooperation.' }
      ]
    }
  },

  'col.info_behavioural': {
    zh: {
      intro: '資訊不對稱指交易一方比另一方掌握更多資訊。簽約前隱藏資訊引起逆向選擇，例如檸檬市場與高危者較願投保；簽約後隱藏行動引起道德風險，例如投保後減少防範。訊號是知情一方主動披露（如以學歷證明能力），篩選是無知一方設計機制區分類型（如驗身、試用期）。行為經濟學則研究捷思與偏誤：錨定、可得性、代表性、框架效應、損失規避與現時偏誤，說明人並非完全理性。',
      example: '二手車市場：賣家知道車況、買家不知道，買家只願付平均價，好車車主退出，市場只剩劣車——這是逆向選擇（檸檬市場）。汽車全保後車主泊車較不小心——這是道德風險。求職者以學位向僱主證明能力——這是訊號；僱主要求筆試以區分申請人——這是篩選。商店先標原價 1,000 元再以 600 元發售，顧客覺得划算——這是錨定效應。',
      tip: '用兩條線分辨概念：簽約前／簽約後區分逆向選擇與道德風險；由誰先有資訊區分訊號（知情者披露）與篩選（無知者設關卡）。',
      mistake: '把逆向選擇與道德風險混為一談。前者是簽約前選錯了交易對象的類型，後者是簽約後一方的行為因合約或保險而改變。',
      glossary: [
        { term: '逆向選擇', def: '簽約前因資訊不對稱，高風險或低質素者較願意參與交易，令市場平均質素下降。' },
        { term: '道德風險', def: '簽約後因風險由他人承擔，一方改變行為而減少防範。' },
        { term: '訊號', def: '知情一方以可觀察的行動或證明，向另一方顯示自己的類型。' }
      ]
    },
    en: {
      intro: 'Asymmetric information means one side of a transaction knows more than the other. Hidden information before contracting causes adverse selection, as in the market for lemons or when high-risk people are more willing to buy insurance; hidden action after contracting causes moral hazard, such as taking fewer precautions once insured. Signalling is the informed party revealing its type (for example, a degree showing ability), while screening is the uninformed party designing a device to separate types (for example, a medical check or a probation period). Behavioural economics studies heuristics and biases — anchoring, availability, representativeness, framing, loss aversion and present bias — showing that people are not fully rational.',
      example: 'In the used-car market, sellers know the car\'s condition but buyers do not, so buyers offer only an average price, good cars withdraw and only lemons remain — adverse selection. A driver with comprehensive insurance parks less carefully — moral hazard. A job applicant uses a degree to show ability — signalling; an employer sets a written test to separate applicants — screening. A shop shows an original price of 1,000 dollars and then sells at 600, and customers feel they have a bargain — anchoring.',
      tip: 'Use two dividing lines: before versus after contracting separates adverse selection from moral hazard; who holds the information first separates signalling (informed party reveals) from screening (uninformed party sets the test).',
      mistake: 'Confusing adverse selection with moral hazard. The former is choosing the wrong type of trading partner before contracting; the latter is a change in behaviour after contracting because the risk is borne by someone else.',
      glossary: [
        { term: 'Adverse selection', def: 'Before contracting, asymmetric information makes higher-risk or lower-quality types more willing to trade, lowering average market quality.' },
        { term: 'Moral hazard', def: 'After contracting, a party changes behaviour and takes fewer precautions because someone else bears the risk.' },
        { term: 'Signalling', def: 'The informed party reveals its type through an observable action or credential.' }
      ]
    }
  },

  'col.macro_models': {
    zh: {
      intro: 'AD-AS 模型以總需求與總供應分析物價與產出：短期總供應向上傾斜，長期總供應在自然產出水平垂直。IS-LM 模型以 IS（物品市場均衡）與 LM（貨幣市場均衡）共同決定利率與收入：財政擴張移動 IS，貨幣擴張移動 LM；LM 越陡，財政政策的擠出效應越大（LM 垂直時完全擠出）；LM 水平（流動性陷阱）時貨幣政策失效。',
      steps: [
        '寫出消費函數 $C = a + b(Y - T)$ 與其他支出，令物品市場均衡 $Y = C + I + G$。',
        '整理成 $Y = \\frac{a - bT + I + G}{1 - b}$，求出均衡收入。',
        '乘數 $k = \\frac{1}{1 - b}$；政府支出增加 $\\Delta G$ 使收入最多增加 $k\\Delta G$。',
        '用 IS-LM 檢查利率反應：擴張政策推高利率時，投資被擠出，實際效果小於簡單乘數。'
      ],
      example: '$C = 80 + 0.8(Y - T)$、$T = 100$、$I = 120$、$G = 140$。代入 $Y = C + I + G$：$Y = 80 + 0.8(Y - 100) + 120 + 140 = 260 + 0.8Y$，故 $0.2Y = 260$，$Y = 1300$。乘數 $k = 1/0.2 = 5$；若 $G$ 增加 20，均衡收入最多增加 100（未計擠出效應）。',
      tip: '先問衝擊移動哪條曲線：財政政策移動 IS／AD，貨幣政策移動 LM／AD，成本或生產力衝擊移動 AS。',
      mistake: '以為 AD 右移一定令產出增加。長期總供應垂直，AD 右移最終只推高物價；只有短期未達充分就業時，才可增加實質產出。',
      glossary: [
        { term: '總需求-總供應模型', def: '以總需求與總供應的互動解釋物價水平與實質產出的宏觀模型。' },
        { term: 'IS-LM 模型', def: '以物品市場（IS）與貨幣市場（LM）同時均衡決定利率與收入的模型。' },
        { term: '擠出效應', def: '擴張性財政政策推高利率，令私人投資減少，抵銷部分政策效果。' }
      ]
    },
    en: {
      intro: 'The AD-AS model uses aggregate demand and aggregate supply to explain the price level and output: short-run aggregate supply slopes upward, while long-run aggregate supply is vertical at potential output. The IS-LM model determines the interest rate and income from equilibrium in the goods market (IS) and the money market (LM): fiscal expansion shifts IS and monetary expansion shifts LM; the steeper LM is, the larger the crowding out of private investment (complete crowding out when LM is vertical), while monetary policy is ineffective when LM is horizontal (a liquidity trap).',
      steps: [
        'Write the consumption function $C = a + b(Y - T)$ together with other spending, and impose goods-market equilibrium $Y = C + I + G$.',
        'Rearrange to $Y = \\frac{a - bT + I + G}{1 - b}$ and solve for equilibrium income.',
        'The multiplier is $k = \\frac{1}{1 - b}$; a rise of $\\Delta G$ in government spending raises income by at most $k\\Delta G$.',
        'Use IS-LM to check the interest-rate response: if expansionary policy pushes up the interest rate, investment is crowded out and the actual effect is smaller than the simple multiplier.'
      ],
      example: 'Let $C = 80 + 0.8(Y - T)$, $T = 100$, $I = 120$ and $G = 140$. Substituting into $Y = C + I + G$: $Y = 80 + 0.8(Y - 100) + 120 + 140 = 260 + 0.8Y$, so $0.2Y = 260$ and $Y = 1300$. The multiplier is $k = 1/0.2 = 5$; if $G$ rises by 20, equilibrium income rises by at most 100 (before crowding out).',
      tip: 'First ask which curve the shock shifts: fiscal policy moves IS and AD, monetary policy moves LM and AD, and cost or productivity shocks move AS.',
      mistake: 'Assuming a rightward shift of AD always raises output. Long-run aggregate supply is vertical, so an AD shift ultimately only raises the price level; real output rises only in the short run below full employment.',
      glossary: [
        { term: 'AD-AS model', def: 'A macroeconomic model explaining the price level and real output through aggregate demand and aggregate supply.' },
        { term: 'IS-LM model', def: 'A model where goods-market (IS) and money-market (LM) equilibrium jointly determine the interest rate and income.' },
        { term: 'Crowding out', def: 'Expansionary fiscal policy raises interest rates and reduces private investment, offsetting part of the policy effect.' }
      ]
    }
  },

  'col.growth_theory': {
    zh: {
      intro: '增長會計把產出增長分解為資本、勞動與全要素生產率（TFP）的貢獻：$g = \\alpha g_K + (1 - \\alpha) g_L + \\text{TFP}$，其中 $\\alpha$ 是資本份額。Harrod-Domar 模型以 $g = s/v$ 說明儲蓄率 $s$ 與資本產出比 $v$ 的角色。Solow 模型加入資本邊際報酬遞減與技術進步：儲蓄只能提高穩定狀態的人均資本，長期人均增長最終靠技術進步。',
      steps: [
        'Harrod-Domar：用 $g = s/v$ 求增長率，或由目標增長率反求所需儲蓄率 $s = gv$。',
        '增長會計：先算資本貢獻 $\\alpha g_K$ 與勞動貢獻 $(1 - \\alpha) g_L$。',
        '用產出增長率減去上述兩項貢獻，餘額就是 TFP 增長。',
        '在 Solow 模型中，區分沿轉移路徑的資本深化與穩定狀態下的技術進步。'
      ],
      example: '儲蓄率 24%、資本產出比 4，則 $g = 0.24/4 = 6\\%$。若資本增長 8%、勞動增長 2%、資本份額 $\\alpha = 0.3$，資本貢獻為 2.4%、勞動貢獻為 1.4%；若實際產出增長 6%，則 TFP 增長 $= 6 - 2.4 - 1.4 = 2.2\\%$。',
      tip: '增長會計的權數 $\\alpha$ 與 $1 - \\alpha$ 必須相加等於 1；用「餘額法」求 TFP 最不易出錯。',
      mistake: '以為儲蓄率越高，長期增長率越高。Solow 模型中儲蓄率只提高穩定狀態的人均資本與收入水平；長期增長率由技術進步決定。',
      glossary: [
        { term: '增長會計', def: '把產出增長分解為各生產要素貢獻與全要素生產率的方法。' },
        { term: '全要素生產率', def: '不能由資本與勞動投入增加解釋的產出增長部分，反映技術與效率。' },
        { term: 'Solow 模型', def: '以資本累積、人口增長與技術進步解釋長期增長的增長模型。' }
      ]
    },
    en: {
      intro: 'Growth accounting decomposes output growth into the contributions of capital, labour and total factor productivity (TFP): $g = \\alpha g_K + (1 - \\alpha) g_L + \\text{TFP}$, where $\\alpha$ is capital\'s share. The Harrod-Domar model captures the roles of the saving rate $s$ and the capital-output ratio $v$ through $g = s/v$. The Solow model adds diminishing returns to capital and technological progress: saving raises the steady-state level of capital per worker, but long-run growth in income per worker ultimately comes from technological progress.',
      steps: [
        'Harrod-Domar: use $g = s/v$ to find the growth rate, or rearrange to the required saving rate $s = gv$.',
        'Growth accounting: compute the capital contribution $\\alpha g_K$ and the labour contribution $(1 - \\alpha) g_L$.',
        'Subtract these two contributions from output growth; the residual is TFP growth.',
        'In the Solow model, distinguish capital deepening along the transition path from technological progress at the steady state.'
      ],
      example: 'With a saving rate of 24% and a capital-output ratio of 4, $g = 0.24/4 = 6\\%$. If capital grows at 8%, labour at 2% and capital\'s share is $\\alpha = 0.3$, the capital contribution is 2.4% and the labour contribution is 1.4%; if output actually grows at 6%, TFP growth is $6 - 2.4 - 1.4 = 2.2\\%$.',
      tip: 'The weights $\\alpha$ and $1 - \\alpha$ in growth accounting must sum to 1; the residual method is the safest way to find TFP growth.',
      mistake: 'Believing a higher saving rate raises the long-run growth rate. In the Solow model saving only raises the steady-state level of capital and income per worker; the long-run growth rate is set by technological progress.',
      glossary: [
        { term: 'Growth accounting', def: 'A method that decomposes output growth into factor contributions and total factor productivity.' },
        { term: 'Total factor productivity', def: 'The part of output growth not explained by more capital and labour, reflecting technology and efficiency.' },
        { term: 'Solow model', def: 'A growth model explaining long-run growth through capital accumulation, population growth and technological progress.' }
      ]
    }
  },

  'col.monetary_theory': {
    zh: {
      intro: '貨幣數量論以 $MV = PY$ 連結貨幣量、流通速度、物價與實質產出。凱恩斯的流動性偏好認為貨幣需求源於交易、預防與投機動機，並受利率影響；中央銀行透過公開市場操作等工具控制貨幣供應。政策規則（如通脹目標、泰勒規則）與相機抉擇之爭，核心是時間不一致與政策可信度。',
      steps: [
        '寫出 $MV = PY$，確認 $M$ 為貨幣量、$V$ 為流通速度、$P$ 為物價、$Y$ 為實質產出。',
        '求其中一個未知數，例如 $V = PY/M$ 或 $M = PY/V$。',
        '增長形式：$\\%\\Delta M + \\%\\Delta V = \\%\\Delta P + \\%\\Delta Y$。',
        '若假設 $V$ 不變，通脹率約等於貨幣增長率減實質產出增長率，可用來判斷貨幣是否過度擴張。'
      ],
      example: '某經濟 $M = 500$、$V = 6$、$Y = 1500$：$PY = 3000$，故 $P = 3000/1500 = 2$。若貨幣供應增長 8%、實質產出增長 3%、流通速度不變，通脹率約為 $8\\% - 3\\% = 5\\%$。',
      tip: '增長式是近似式，只在通脹與增長率較低時準確；高通脹時要逐項用變動率相乘計算。',
      mistake: '把中央銀行「印鈔」等同貨幣供應等幅增加。現金漏出與超額準備令貨幣乘數小於 $1/r$，實際貨幣供應增幅可能較小。',
      glossary: [
        { term: '貨幣數量論', def: '認為貨幣量與物價水平存在穩定關係的理論，核心為 $MV = PY$。' },
        { term: '流動性偏好', def: '凱恩斯認為貨幣需求取決於收入與利率的理論。' },
        { term: '通脹目標', def: '中央銀行公開承諾把通脹維持在某一目標範圍的政策框架。' }
      ]
    },
    en: {
      intro: 'The quantity theory of money links money, velocity, prices and real output through $MV = PY$. Keynes\'s liquidity preference theory holds that money demand arises from transactions, precautionary and speculative motives and depends on the interest rate; the central bank controls the money supply using tools such as open-market operations. The debate between policy rules (inflation targeting, the Taylor rule) and discretion centres on time inconsistency and policy credibility.',
      steps: [
        'Write $MV = PY$, identifying $M$ as the money stock, $V$ velocity, $P$ the price level and $Y$ real output.',
        'Solve for the unknown, for example $V = PY/M$ or $M = PY/V$.',
        'Use the growth form: $\\%\\Delta M + \\%\\Delta V = \\%\\Delta P + \\%\\Delta Y$.',
        'If $V$ is assumed constant, inflation is approximately money growth minus real output growth, which indicates whether money is expanding too fast.'
      ],
      example: 'In an economy with $M = 500$, $V = 6$ and $Y = 1500$, $PY = 3000$, so $P = 3000/1500 = 2$. If the money supply grows by 8%, real output by 3% and velocity is constant, inflation is approximately $8\\% - 3\\% = 5\\%$.',
      tip: 'The growth equation is an approximation that is accurate only at low inflation and growth rates; at high inflation, compound the individual growth rates.',
      mistake: 'Equating central-bank money creation with an equal increase in the money supply. Cash leakages and excess reserves make the money multiplier smaller than $1/r$, so the actual increase may be smaller.',
      glossary: [
        { term: 'Quantity theory of money', def: 'The theory that the money stock and the price level are linked by $MV = PY$.' },
        { term: 'Liquidity preference', def: 'Keynes\'s theory that money demand depends on income and the interest rate.' },
        { term: 'Inflation targeting', def: 'A policy framework in which the central bank publicly commits to keeping inflation within a target range.' }
      ]
    }
  },

  'col.labour': {
    zh: {
      intro: '勞動供應取決於工資變動的收入效應與替代效應，工資上升時工時可能先增後減，形成向後彎的勞動供應曲線。勞動需求是引伸需求，取決於邊際收益產品 $MRP = MR \\times MP_L$。工資差異可由人力資本、補償性差異、工會與歧視解釋；人力資本理論把教育與培訓視為投資，回報以工資溢價體現。',
      steps: [
        '令勞動需求 $W_d = a - bL$ 與供應 $W_s = c + dL$ 相等，求均衡工資與就業量。',
        '若最低工資高於均衡，代入工資分別求 $L_s$ 與 $L_d$，勞動過剩 $= L_s - L_d$。',
        '若生產力上升，$MRP$ 上升令勞動需求右移，均衡工資與就業量同時上升。',
        '比較不同人力資本投資的現值回報，判斷是否值得升學或接受培訓。'
      ],
      example: '勞動需求 $W = 200 - 2L$、供應 $W = 20 + 3L$（$W$ 為每日工資、$L$ 為工人數）。令兩式相等：$200 - 2L = 20 + 3L$，得 $L = 36$、$W = 128$。若最低工資定於 140，需求為 $L_d = 30$、供應為 $L_s = 40$，勞動過剩 10 人。',
      tip: '最低工資只在高於均衡工資時才有效；工資干預造成的失業大小，取決於勞動需求的彈性。',
      mistake: '以為工資越高，僱主越想僱人。勞動需求曲線向下傾斜：工資越高，僱用量越少，因為 $MRP$ 必須等於工資。',
      glossary: [
        { term: '邊際收益產品', def: '多僱用一單位勞動所增加的總收入，等於邊際收入乘以勞動的邊際產量。' },
        { term: '人力資本', def: '教育、培訓與健康等能提高勞動生產力的投資。' },
        { term: '補償性工資差異', def: '為補償工作性質較差（如危險、辛苦）而支付的額外工資。' }
      ]
    },
    en: {
      intro: 'Labour supply depends on the income and substitution effects of a wage change; as wages rise, hours may first increase and then fall, giving a backward-bending labour supply curve. Labour demand is a derived demand based on marginal revenue product, $MRP = MR \\times MP_L$. Wage differences can be explained by human capital, compensating differentials, unions and discrimination; human capital theory treats education and training as investment whose return appears as a wage premium.',
      steps: [
        'Set labour demand $W_d = a - bL$ equal to labour supply $W_s = c + dL$ to find the equilibrium wage and employment.',
        'If a minimum wage is above the equilibrium, substitute it into both schedules to get $L_s$ and $L_d$; excess labour supply is $L_s - L_d$.',
        'If productivity rises, $MRP$ rises so labour demand shifts right, raising both the equilibrium wage and employment.',
        'Compare the present value of returns to different human-capital investments when deciding whether to study or train further.'
      ],
      example: 'Labour demand is $W = 200 - 2L$ and supply is $W = 20 + 3L$ ($W$ is the daily wage and $L$ the number of workers). Setting them equal: $200 - 2L = 20 + 3L$, so $L = 36$ and $W = 128$. If a minimum wage of 140 is set, demand is $L_d = 30$ and supply is $L_s = 40$, giving excess labour supply of 10 workers.',
      tip: 'A minimum wage only binds when it is above the equilibrium wage; the resulting unemployment depends on the elasticity of labour demand.',
      mistake: 'Thinking that higher wages make employers want to hire more. Labour demand slopes downward: a higher wage reduces employment because the wage must equal marginal revenue product.',
      glossary: [
        { term: 'Marginal revenue product', def: 'The extra total revenue from employing one more unit of labour, equal to marginal revenue times marginal product.' },
        { term: 'Human capital', def: 'Investment in education, training and health that raises labour productivity.' },
        { term: 'Compensating wage differential', def: 'Extra pay that compensates for less attractive working conditions such as danger or hardship.' }
      ]
    }
  },

  'col.econometrics': {
    zh: {
      intro: '計量經濟學用數據估計經濟關係。簡單線性回歸 $\\hat{Y} = a + bX$ 中，斜率 $b$ 是 $X$ 增加一單位時 $Y$ 的平均變動，$R^2$ 是模型解釋的變異比例。統計顯著（如 $p < 0.05$）只說明該關係不太可能純由抽樣誤差造成，不代表因果；因果推論要靠隨機實驗、工具變數、斷點回歸等方法處理內生性與遺漏變數。',
      steps: [
        '寫出估計方程 $\\hat{Y} = a + bX$，確認 $X$、$Y$ 的單位與樣本。',
        '把 $X$ 的值代入方程，求預測值 $\\hat{Y}$。',
        '解釋斜率：$X$ 每增加 1 單位，$Y$ 平均變動 $b$ 單位（不是每個個案都如此）。',
        '檢查 $R^2$、$t$ 值與 $p$ 值，再問是否有遺漏變數、反向因果或選擇偏誤，才判斷可否作因果解讀。'
      ],
      example: '以月入（千元）對受教育年數回歸，得 $\\hat{Y} = 50 + 2.5X$、$R^2 = 0.36$，斜率 $p$ 值為 0.01。受教育 12 年者的預測月入為 $50 + 2.5 \\times 12 = 80$（即 80,000 元）；每多讀一年與月入平均高 2,500 元相關。$R^2 = 0.36$ 表示教育解釋約 36% 的月入變異；$p = 0.01 < 0.05$ 表示在 5% 水平統計顯著，但若能力等變數被忽略，斜率未必是因果效應。',
      tip: '看到「相關」先問三個問題：有沒有遺漏變數？有沒有反向因果？樣本是否有選擇性？三者都排除，才可說因果。',
      mistake: '把 $R^2$ 高當成因果證據，或把 $p$ 值小當成效果大。$R^2$ 與統計顯著性都不等於因果，也不等於經濟上的重要性。',
      glossary: [
        { term: 'OLS', def: '普通最小二乘法，選擇使殘差平方和最小的回歸線。' },
        { term: 'R²', def: '回歸模型能解釋的因變數變異比例，介乎 0 與 1。' },
        { term: '因果推論', def: '判斷一個變數的變動是否真正導致另一個變數變動的方法。' }
      ]
    },
    en: {
      intro: 'Econometrics uses data to estimate economic relationships. In the simple linear regression $\\hat{Y} = a + bX$, the slope $b$ is the average change in $Y$ when $X$ rises by one unit, and $R^2$ is the proportion of variation explained by the model. Statistical significance (for example $p < 0.05$) only shows that the relationship is unlikely to be pure sampling error; it does not establish causation. Causal inference uses randomised experiments, instrumental variables and regression discontinuity to handle endogeneity and omitted variables.',
      steps: [
        'Write the estimated equation $\\hat{Y} = a + bX$ and note the units of $X$ and $Y$ and the sample used.',
        'Substitute the value of $X$ into the equation to obtain the predicted $\\hat{Y}$.',
        'Interpret the slope: a one-unit rise in $X$ is associated with an average change of $b$ units in $Y$ (not for every individual case).',
        'Check $R^2$, the $t$ statistic and the $p$ value, then ask about omitted variables, reverse causation or selection bias before making a causal claim.'
      ],
      example: 'Regressing monthly income (in thousands of dollars) on years of schooling gives $\\hat{Y} = 50 + 2.5X$ with $R^2 = 0.36$ and a slope $p$ value of 0.01. For 12 years of schooling the predicted income is $50 + 2.5 \\times 12 = 80$, i.e. 80,000 dollars; each extra year is associated with 2,500 dollars more per month. $R^2 = 0.36$ means schooling explains about 36% of the variation in income; $p = 0.01 < 0.05$ means the estimate is significant at the 5% level, but if ability is omitted the slope need not be a causal effect.',
      tip: 'When you see a correlation, ask three questions: is there an omitted variable, is there reverse causation, and is the sample selected? Only then can causation be claimed.',
      mistake: 'Treating a high $R^2$ as proof of causation, or a small $p$ value as a large effect. Neither $R^2$ nor significance establishes causation or economic importance.',
      glossary: [
        { term: 'OLS', def: 'Ordinary least squares, which chooses the regression line that minimises the sum of squared residuals.' },
        { term: 'R-squared', def: 'The proportion of variation in the dependent variable explained by the regression, between 0 and 1.' },
        { term: 'Causal inference', def: 'Methods for judging whether a change in one variable actually causes a change in another.' }
      ]
    }
  },

  'col.public': {
    zh: {
      intro: '公共財同時具非競爭性與非排他性，市場供應不足，出現搭便車問題。外部性令私人成本與社會成本（或私人利益與社會利益）出現差距，可用皮古稅、補貼、界定產權（Coase 定理）或管制矯正。稅負歸宿取決於供需彈性：較缺乏彈性的一方承擔較多稅負，法定納稅人不一定是最終負擔者；最適稅制要在效率與公平之間取捨。',
      steps: [
        '找出私人邊際成本 $MPC$ 與邊際外部成本 $MEC$，社會邊際成本 $MSC = MPC + MEC$。',
        '令 $MSB = MSC$ 求社會最適產量，令 $MSB = MPC$ 求市場產量。',
        '皮古稅等於社會最適產量下的邊際外部成本。',
        '分析稅負歸宿：比較供需曲線斜率與彈性，較缺乏彈性的一方承擔較大比例。'
      ],
      example: '$MSB = 80 - 2Q$、$MPC = 20 + 2Q$、每單位外部成本 $MEC = 8$。市場均衡：$80 - 2Q = 20 + 2Q$，得 $Q = 15$。社會最適：$80 - 2Q = 28 + 2Q$，得 $Q = 13$，故最適皮古稅為每單位 8 元。市場產量比社會最適多 2 單位，無謂損失 $= \\frac{1}{2} \\times 8 \\times 2 = 8$ 元。',
      tip: '先分清外部成本是「每單位」還是「總額」；皮古稅要等於社會最適產量下的邊際外部成本，不是任意稅率。',
      mistake: '以為向生產者徵稅就由生產者承擔全部稅負。稅負按彈性分擔，價格上升會把部分負擔轉給消費者。',
      glossary: [
        { term: '公共財', def: '同時具非競爭性與非排他性的物品，市場供應通常不足。' },
        { term: '外部性', def: '交易對第三者造成而未經市場補償的成本或利益。' },
        { term: '皮古稅', def: '按邊際外部成本徵收、用以矯正負外部性的稅。' }
      ]
    },
    en: {
      intro: 'Public goods are both non-rival and non-excludable, so markets under-provide them and free-riding arises. Externalities create a gap between private and social cost (or benefit), which can be corrected with a Pigouvian tax, a subsidy, assigning property rights (the Coase theorem) or regulation. Tax incidence depends on supply and demand elasticities: the less elastic side bears more of the burden, so the statutory taxpayer need not bear it. Optimal taxation trades off efficiency and equity.',
      steps: [
        'Identify private marginal cost $MPC$ and marginal external cost $MEC$, so social marginal cost is $MSC = MPC + MEC$.',
        'Set $MSB = MSC$ for the socially optimal quantity and $MSB = MPC$ for the market quantity.',
        'The Pigouvian tax equals the marginal external cost at the socially optimal quantity.',
        'Analyse incidence by comparing the slopes and elasticities of supply and demand; the less elastic side bears the larger share.'
      ],
      example: 'Let $MSB = 80 - 2Q$, $MPC = 20 + 2Q$ and the external cost be $MEC = 8$ per unit. The market equilibrium sets $80 - 2Q = 20 + 2Q$, giving $Q = 15$. The social optimum sets $80 - 2Q = 28 + 2Q$, giving $Q = 13$, so the optimal Pigouvian tax is 8 dollars per unit. Market output is 2 units above the social optimum, with deadweight loss $= \\frac{1}{2} \\times 8 \\times 2 = 8$ dollars.',
      tip: 'First check whether the external cost is per unit or a total; the Pigouvian tax must equal the marginal external cost at the socially optimal quantity, not an arbitrary rate.',
      mistake: 'Assuming that a tax on producers is borne entirely by producers. The burden is shared according to elasticities, and a price rise passes part of it to consumers.',
      glossary: [
        { term: 'Public good', def: 'A good that is both non-rival and non-excludable, so markets usually under-provide it.' },
        { term: 'Externality', def: 'A cost or benefit imposed on third parties that is not compensated through the market.' },
        { term: 'Pigouvian tax', def: 'A tax equal to marginal external cost, used to correct a negative externality.' }
      ]
    }
  },

  'col.international': {
    zh: {
      intro: '比較優勢以機會成本而非絕對成本判斷：即使一國樣樣都較落後，只要某商品的機會成本較低，仍有比較優勢；各國專業化生產並貿易，可使雙方得益。購買力平價（PPP）認為長期匯率應等於兩國同一籃子的物價比，名義匯率偏離 PPP 匯率即意味幣值高估或低估；國際資本流動則受利率差異與風險影響。',
      steps: [
        '用「放棄的 Y 數量 ÷ 增加的 X 數量」算出每國生產 X 的機會成本（以 Y 計）。',
        '機會成本較低者對 X 有比較優勢；另一國則對 Y 有比較優勢。',
        '讓各國專業化生產其比較優勢產品，比較貿易前後的總產量，即得貿易得益。',
        'PPP 匯率 = 本國物價 ÷ 外國物價；名義匯率（1 外幣兌多少本幣）高於 PPP 匯率即外幣高估，低於則外幣低估。'
      ],
      example: '甲國每單位布需 2 小時、酒需 4 小時，故 1 單位布的機會成本是 0.5 單位酒；乙國布與酒各需 3 小時，故 1 單位布的機會成本是 1 單位酒。甲國在布、乙國在酒有比較優勢：各用 12 小時、一半時間生產每種產品，貿易前合共生產 5 單位布與 3.5 單位酒，專業化後合共 6 單位布與 4 單位酒，兩樣都增加。PPP 檢查：同一籃子香港 780 港元、美國 100 美元，PPP 匯率為 7.8 港元兌 1 美元；若名義匯率為 7.5 港元兌 1 美元，低於 PPP 匯率，表示美元被低估、港元被高估。',
      tip: '比較優勢看機會成本，不看工時或工資的絕對高低；「誰生產得較快」不等於「誰應生產」。',
      mistake: '以為絕對優勢決定貿易方向。即使一國在所有產品上都較有效率，仍應生產機會成本較低的產品，並以貿易換取其他產品。',
      glossary: [
        { term: '比較優勢', def: '生產某商品的機會成本較低的優勢。' },
        { term: '購買力平價', def: '兩國同一籃子物價之比所對應的長期匯率。' },
        { term: '貿易得益', def: '專業化與貿易令雙方總產量或消費增加的好處。' }
      ]
    },
    en: {
      intro: 'Comparative advantage is judged by opportunity cost, not absolute cost: even if one country is less productive in everything, it has a comparative advantage in the good for which its opportunity cost is lower, and specialisation plus trade can benefit both sides. Purchasing power parity (PPP) holds that the long-run exchange rate should equal the ratio of the two countries\' price levels for the same basket; a nominal rate that departs from the PPP rate implies over- or under-valuation. International capital flows respond to interest-rate differentials and risk.',
      steps: [
        'Compute each country\'s opportunity cost of X in units of Y by dividing the units of Y given up by the extra units of X produced.',
        'The country with the lower opportunity cost has a comparative advantage in X; the other has it in Y.',
        'Let each country specialise in its comparative-advantage good and compare total output before and after trade to find the gains.',
        'The PPP rate equals the domestic price level divided by the foreign price level; if the nominal rate (units of domestic currency per unit of foreign currency) is above the PPP rate the foreign currency is overvalued, and if below it is undervalued.'
      ],
      example: 'In country A, a unit of cloth takes 2 hours and a unit of wine 4 hours, so the opportunity cost of one cloth is 0.5 wine; in country B, both take 3 hours, so the opportunity cost of one cloth is 1 wine. A has a comparative advantage in cloth and B in wine: with 12 hours each, split equally between the two goods, they produce 5 cloth and 3.5 wine in total before trade; after specialisation they produce 6 cloth and 4 wine, more of both. PPP check: if the same basket costs HKD 780 in Hong Kong and USD 100 in the US, the PPP rate is 7.8 HKD per USD; if the nominal rate is 7.5 HKD per USD, below the PPP rate, the US dollar is undervalued and the Hong Kong dollar is overvalued.',
      tip: 'Comparative advantage is about opportunity cost, not absolute hours or wages; being the faster producer does not mean you should produce the good.',
      mistake: 'Letting absolute advantage determine the direction of trade. Even if a country is more efficient in every good, it should specialise in the good with the lower opportunity cost and trade for the rest.',
      glossary: [
        { term: 'Comparative advantage', def: 'The advantage of producing a good at a lower opportunity cost.' },
        { term: 'Purchasing power parity', def: 'The long-run exchange rate implied by the ratio of two countries\' price levels for the same basket.' },
        { term: 'Gains from trade', def: 'The benefit of specialisation and trade, shown by higher total output or consumption.' }
      ]
    }
  },

  'col.thought': {
    zh: {
      intro: '經濟思想史按時序展開：重商主義重視金銀與貿易順差；重農學派主張自然秩序與農業；Adam Smith《國富論》（1776）以分工與「看不見的手」建立古典學派；Ricardo 提出比較優勢與地租論；Marx 分析資本主義的剩餘價值與階級關係。1870 年代邊際革命（Jevons、Menger、Walras）以主觀邊際效用解釋價值，取代勞動價值論；Marshall 整合供需分析與局部均衡，奠定新古典經濟學；Keynes（1936）以有效需求解釋低於充分就業的均衡；其後 Friedman 的貨幣主義、理性預期學派與新凱恩斯學派持續對話。',
      example: '同一問題「價格由甚麼決定？」：古典學派以勞動價值論回答；邊際學派以主觀邊際效用與稀缺性回答；Marshall 以供需雙方共同決定；Keynes 則關注總需求與短期價格僵固。這種對比顯示思想史是「問題與方法」的演變，而非單純的新舊取代。',
      tip: '讀思想史要分清四層：時代背景、核心問題、分析方法、政策主張；不要把不同時代的理論直接套用到今天的制度環境。',
      mistake: '把思想史簡化為「舊理論全錯、新理論全對」。各學派回應其時代問題，很多概念仍被現代經濟學吸收、修正與整合。',
      glossary: [
        { term: '重商主義', def: '16 至 18 世紀認為國家財富取決於金銀積累與貿易順差的思想。' },
        { term: '邊際革命', def: '1870 年代以邊際效用與主觀價值重建價值理論的思想轉向。' },
        { term: '凱恩斯革命', def: '凱恩斯以有效需求與政府干預解釋失業均衡，改變宏觀經濟學的分析框架。' }
      ]
    },
    en: {
      intro: 'The history of economic thought unfolds chronologically: mercantilism stressed bullion and trade surpluses; the physiocrats emphasised natural order and agriculture; Adam Smith\'s Wealth of Nations (1776) founded the classical school with the division of labour and the "invisible hand"; Ricardo developed comparative advantage and the theory of rent; Marx analysed surplus value and class relations under capitalism. In the 1870s the marginal revolution (Jevons, Menger, Walras) explained value through subjective marginal utility rather than the labour theory of value; Marshall integrated supply and demand into partial equilibrium and founded neoclassical economics; Keynes (1936) used effective demand to explain equilibrium below full employment; later, Friedman\'s monetarism, the rational-expectations school and New Keynesian economics continued the conversation.',
      example: 'Take one question, "what determines price?". The classics answered with the labour theory of value; the marginalists with subjective marginal utility and scarcity; Marshall with supply and demand together; Keynes focused on aggregate demand and short-run price rigidity. The contrast shows that the history of thought is an evolution of questions and methods, not a simple replacement of old ideas by new ones.',
      tip: 'Read the history of thought on four levels: historical setting, central question, analytical method and policy conclusion. Do not transplant theories from one era directly into today\'s institutions.',
      mistake: 'Reducing the history of thought to "old theories were all wrong and new ones are all right". Each school responded to the problems of its time, and many of its concepts were absorbed, revised and integrated by modern economics.',
      glossary: [
        { term: 'Mercantilism', def: 'A 16th- to 18th-century view that national wealth depends on accumulating bullion and running trade surpluses.' },
        { term: 'Marginal revolution', def: 'The 1870s shift that rebuilt value theory on marginal utility and subjective valuation.' },
        { term: 'Keynesian revolution', def: 'Keynes\'s use of effective demand and government intervention to explain unemployment equilibrium, which reshaped macroeconomics.' }
      ]
    }
  }

});

EconData.addBanks({

  'col.info_behavioural': [
    {
      id: 'info1',
      prompt: {
        zh: '以下哪一項描述「逆向選擇」（adverse selection）？',
        en: 'Which of the following describes adverse selection?'
      },
      choices: [
        { id: 'a', zh: '投保人在簽約後減少小心駕駛。', en: 'A policyholder drives less carefully after signing the insurance contract.' },
        { id: 'b', zh: '高風險人士在簽約前較願意購買保險，令保險池的平均風險上升。', en: 'High-risk people are more willing to buy insurance before contracting, raising the average risk of the insurance pool.' },
        { id: 'c', zh: '僱主要求求職者參加筆試以區分能力。', en: 'An employer requires applicants to take a written test to separate ability levels.' },
        { id: 'd', zh: '商戶以廣告提高品牌知名度。', en: 'A shop uses advertising to raise brand awareness.' }
      ],
      answer: 'b',
      hint: { zh: '逆向選擇發生在簽約前，源於隱藏資訊。', en: 'Adverse selection happens before contracting and stems from hidden information.' },
      solution: {
        zh: [
          '逆向選擇是簽約前因資訊不對稱，高風險或低質素者較願意參與交易，令市場平均質素下降。',
          'a 是簽約後的行為改變，屬道德風險；c 是僱主設計機制區分類型，屬篩選；d 是廣告，與資訊不對稱的分類無關。',
          'b 描述高風險者在簽約前較願投保，令保險池平均風險上升，故答案為 b。'
        ],
        en: [
          'Adverse selection is a pre-contract problem in which, under asymmetric information, higher-risk or lower-quality types are more willing to trade, lowering average market quality.',
          'a is a change in behaviour after contracting, which is moral hazard; c is a device designed by the employer to separate types, which is screening; d is advertising and does not describe this classification issue.',
          'b describes high-risk people being more willing to buy insurance before contracting, raising average risk in the pool, so the answer is b.'
        ]
      }
    },
    {
      id: 'info2',
      prompt: {
        zh: '以下哪一項是「道德風險」（moral hazard）的例子？',
        en: 'Which of the following is an example of moral hazard?'
      },
      choices: [
        { id: 'a', zh: '二手車買家因無法分辨車況而只願付出較低價格。', en: 'A used-car buyer offers a lower price because the car\'s condition cannot be verified.' },
        { id: 'b', zh: '銀行因存款保險保障存戶，而從事較高風險的貸款。', en: 'A bank takes on riskier loans because deposit insurance protects its depositors.' },
        { id: 'c', zh: '僱主以試用期觀察新員工的實際能力。', en: 'An employer uses a probation period to observe a new worker\'s ability.' },
        { id: 'd', zh: '學生以優異成績向僱主證明自己的能力。', en: 'A student uses excellent grades to show ability to employers.' }
      ],
      answer: 'b',
      hint: { zh: '道德風險是簽約後因風險由他人承擔而改變行為。', en: 'Moral hazard is a change in behaviour after contracting because someone else bears the risk.' },
      solution: {
        zh: [
          '道德風險是簽約後隱藏行動：一方因風險由他人承擔而減少防範。',
          'a 是簽約前的隱藏資訊問題，屬逆向選擇；c 是篩選；d 是訊號。',
          'b 中存款保險令銀行不必承擔全部風險，於是從事較高風險貸款，故答案為 b。'
        ],
        en: [
          'Moral hazard is hidden action after contracting: a party takes fewer precautions because someone else bears the risk.',
          'a is a pre-contract hidden-information problem, which is adverse selection; c is screening; d is signalling.',
          'In b, deposit insurance means the bank does not bear the full risk, so it makes riskier loans — the answer is b.'
        ]
      }
    },
    {
      id: 'info3',
      prompt: {
        zh: '在「檸檬市場」中，為何質素較好的二手車可能退出市場？',
        en: 'In the market for lemons, why may higher-quality used cars leave the market?'
      },
      choices: [
        { id: 'a', zh: '好車的維修成本較高。', en: 'Good cars have higher maintenance costs.' },
        { id: 'b', zh: '政府對二手車設定價格上限。', en: 'The government sets a price ceiling on used cars.' },
        { id: 'c', zh: '買家只願付平均價，好車車主不願接受而退出。', en: 'Buyers offer only the average price, which owners of good cars are unwilling to accept, so they withdraw.' },
        { id: 'd', zh: '買家普遍偏好質素較差的車。', en: 'Buyers generally prefer lower-quality cars.' }
      ],
      answer: 'c',
      hint: { zh: '買家無法分辨車況，只能按平均質素出價。', en: 'Buyers cannot tell quality apart, so they bid on average quality.' },
      solution: {
        zh: [
          '檸檬市場源於賣家知道車況、買家不知道的資訊不對稱。',
          '買家只願付反映平均質素的價格，好車車主認為價格低於其價值而退出，市場平均質素再下降。',
          'c 正確描述這個過程；a、b、d 都不是檸檬市場的核心機制，故答案為 c。'
        ],
        en: [
          'The lemons market arises from asymmetric information: sellers know the car\'s condition but buyers do not.',
          'Buyers offer a price that reflects average quality; owners of good cars find the price below their car\'s value and withdraw, so average quality falls further.',
          'c describes this process; a, b and d are not the core mechanism of the lemons market, so the answer is c.'
        ]
      }
    },
    {
      id: 'info4',
      prompt: {
        zh: '求職者攻讀學位以向僱主證明自己的能力，這屬於以下哪一概念？',
        en: 'A job applicant earns a degree to show ability to employers. Which concept does this illustrate?'
      },
      choices: [
        { id: 'a', zh: '道德風險。', en: 'Moral hazard.' },
        { id: 'b', zh: '逆向選擇。', en: 'Adverse selection.' },
        { id: 'c', zh: '訊號（signalling）。', en: 'Signalling.' },
        { id: 'd', zh: '篩選（screening）。', en: 'Screening.' }
      ],
      answer: 'c',
      hint: { zh: '訊號是知情一方主動披露自己的類型。', en: 'Signalling is the informed party actively revealing its type.' },
      solution: {
        zh: [
          '訊號是知情一方以可觀察的行動顯示自己的類型；求職者知道自己能力，僱主不知道。',
          '求職者主動取得學位，是以行動向僱主披露能力，屬訊號；篩選則是由僱主設計機制（如筆試）區分類型。',
          '因此答案為 c，a、b 與簽約前後的行為改變無關。'
        ],
        en: [
          'Signalling is the informed party revealing its type through an observable action; the applicant knows his ability but employers do not.',
          'By earning a degree the applicant reveals ability through an action, which is signalling; screening is when the employer designs a device, such as a test, to separate types.',
          'The answer is therefore c; a and b concern different information problems.'
        ]
      }
    },
    {
      id: 'info5',
      prompt: {
        zh: '保險公司要求投保人先接受身體檢查，以區分不同風險的人。這屬於以下哪一概念？',
        en: 'An insurer requires applicants to take a medical check to separate different risk types. Which concept does this illustrate?'
      },
      choices: [
        { id: 'a', zh: '訊號。', en: 'Signalling.' },
        { id: 'b', zh: '篩選（screening）。', en: 'Screening.' },
        { id: 'c', zh: '道德風險。', en: 'Moral hazard.' },
        { id: 'd', zh: '逆向選擇。', en: 'Adverse selection.' }
      ],
      answer: 'b',
      hint: { zh: '由無知一方設計機制區分類型，稱為篩選。', en: 'When the uninformed party designs a mechanism to separate types, it is screening.' },
      solution: {
        zh: [
          '篩選是資訊較少的一方設計機制，令不同類型的人作出不同選擇或披露資訊。',
          '保險公司不知道投保人的健康狀況，於是要求驗身以區分風險，屬篩選。',
          '訊號由知情一方主動發出，與此相反；c、d 描述其他資訊問題，故答案為 b。'
        ],
        en: [
          'Screening is when the less-informed party designs a mechanism that makes different types reveal themselves or choose differently.',
          'The insurer does not know applicants\' health, so it requires a medical check to separate risk types — this is screening.',
          'Signalling is initiated by the informed party, the reverse situation; c and d describe other information problems, so the answer is b.'
        ]
      }
    },
    {
      id: 'info6',
      prompt: {
        zh: '某人只根據最近聽到的空難新聞，便高估乘坐飛機的風險。這最能用以下哪個概念解釋？',
        en: 'A person overestimates the risk of flying because of a recent air-crash news report. Which concept best explains this?'
      },
      choices: [
        { id: 'a', zh: '錨定效應。', en: 'Anchoring.' },
        { id: 'b', zh: '代表性捷思。', en: 'The representativeness heuristic.' },
        { id: 'c', zh: '框架效應。', en: 'Framing.' },
        { id: 'd', zh: '可得性捷思。', en: 'The availability heuristic.' }
      ],
      answer: 'd',
      hint: { zh: '容易想起的事件會被高估其發生機率。', en: 'Events that come to mind easily have their probability overestimated.' },
      solution: {
        zh: [
          '可得性捷思指人按事件在記憶中容易提取的程度來判斷機率。',
          '空難新聞生動易記，令人高估飛行風險，正是可得性捷思。',
          '錨定效應源於初始數值、代表性捷思源於以典型形象判斷、框架效應源於表述方式，故答案為 d。'
        ],
        en: [
          'The availability heuristic means people judge probability by how easily examples come to mind.',
          'Vivid air-crash reports are easy to recall, so flying risk is overestimated — this is the availability heuristic.',
          'Anchoring comes from an initial number, representativeness from judging by a stereotype, and framing from how a choice is described, so the answer is d.'
        ]
      }
    },
    {
      id: 'info7',
      prompt: {
        zh: '商店先標示原價 1,000 元，再以 600 元出售，顧客因而覺得十分划算。這最能說明以下哪一概念？',
        en: 'A shop displays an original price of 1,000 dollars and then sells at 600, so customers feel they have a bargain. Which concept does this best illustrate?'
      },
      choices: [
        { id: 'a', zh: '損失規避。', en: 'Loss aversion.' },
        { id: 'b', zh: '現時偏誤。', en: 'Present bias.' },
        { id: 'c', zh: '沉沒成本謬誤。', en: 'The sunk-cost fallacy.' },
        { id: 'd', zh: '錨定效應。', en: 'Anchoring.' }
      ],
      answer: 'd',
      hint: { zh: '先出現的數字會成為判斷的參考點。', en: 'The first number shown becomes a reference point for judgement.' },
      solution: {
        zh: [
          '錨定效應指人過度依賴最先接觸的數值（錨）來作判斷。',
          '原價 1,000 元成為錨，使 600 元顯得便宜，即使實際價值未必如此。',
          '損失規避、現時偏誤與沉沒成本謬誤都不涉及以初始價格作參考點，故答案為 d。'
        ],
        en: [
          'Anchoring is over-relying on an initial number (the anchor) when making a judgement.',
          'The original price of 1,000 dollars acts as an anchor, making 600 look cheap even if the true value is not that high.',
          'Loss aversion, present bias and the sunk-cost fallacy do not involve an initial price as a reference point, so the answer is d.'
        ]
      }
    },
    {
      id: 'info8',
      prompt: {
        zh: '同一項醫療政策，以「九成存活率」描述比以「一成死亡率」描述得到更多支持。這屬於以下哪一現象？',
        en: 'The same medical policy attracts more support when described as a "90% survival rate" than as a "10% death rate". Which phenomenon is this?'
      },
      choices: [
        { id: 'a', zh: '可得性捷思。', en: 'The availability heuristic.' },
        { id: 'b', zh: '代表性捷思。', en: 'The representativeness heuristic.' },
        { id: 'c', zh: '框架效應。', en: 'The framing effect.' },
        { id: 'd', zh: '錨定效應。', en: 'Anchoring.' }
      ],
      answer: 'c',
      hint: { zh: '同一資訊以不同方式表述，會改變人的選擇。', en: 'The same information presented differently changes choices.' },
      solution: {
        zh: [
          '框架效應指同一資訊以不同方式（正面或負面）表述，會令判斷與選擇改變。',
          '「九成存活」與「一成死亡」在數學上相等，但支持度不同，正是框架效應。',
          'a、b、d 分別關於記憶提取、典型形象與初始數值，與表述方式無關，故答案為 c。'
        ],
        en: [
          'The framing effect is that the same information, presented positively or negatively, changes judgements and choices.',
          '"90% survival" and "10% death" are mathematically equivalent, yet support differs — this is the framing effect.',
          'a, b and d concern memory retrieval, stereotypes and initial numbers rather than presentation, so the answer is c.'
        ]
      }
    },
    {
      id: 'info9',
      prompt: {
        zh: '以下哪一項「最能」減少二手車市場的逆向選擇？',
        en: 'Which of the following would BEST reduce adverse selection in the used-car market?'
      },
      choices: [
        { id: 'a', zh: '提高二手車的售價。', en: 'Raising the price of used cars.' },
        { id: 'b', zh: '強制賣家提供第三方驗車報告。', en: 'Requiring sellers to provide an independent inspection report.' },
        { id: 'c', zh: '禁止二手車交易。', en: 'Banning all used-car trading.' },
        { id: 'd', zh: '向買家徵收二手車交易稅。', en: 'Imposing a transaction tax on buyers.' }
      ],
      answer: 'b',
      hint: { zh: '逆向選擇源於資訊不對稱，最直接的辦法是減少資訊差距。', en: 'Adverse selection stems from asymmetric information, so the direct remedy is to reduce the information gap.' },
      solution: {
        zh: [
          '逆向選擇源於買家不知道車況，只願付平均價，令好車退出。',
          '第三方驗車報告讓買家能分辨車況，減少資訊不對稱，是最直接的矯正方法。',
          '加價不能令買家分辨質素，禁止交易只是取消市場，交易稅更會壓低交易量，故答案為 b。'
        ],
        en: [
          'Adverse selection arises because buyers cannot verify condition, so they pay only an average price and good cars withdraw.',
          'An independent inspection report lets buyers distinguish quality and narrows the information gap, making it the most direct remedy.',
          'A higher price does not reveal quality, a ban simply removes the market, and a transaction tax reduces trade volume, so the answer is b.'
        ]
      }
    },
    {
      id: 'info10',
      prompt: {
        zh: '「明天開始儲蓄」的計劃一再推遲，最能用以下哪個概念解釋？',
        en: '"I will start saving tomorrow" keeps being postponed. Which concept best explains this?'
      },
      choices: [
        { id: 'a', zh: '現時偏誤（present bias）。', en: 'Present bias.' },
        { id: 'b', zh: '錨定效應。', en: 'Anchoring.' },
        { id: 'c', zh: '損失規避。', en: 'Loss aversion.' },
        { id: 'd', zh: '代表性捷思。', en: 'The representativeness heuristic.' }
      ],
      answer: 'a',
      hint: { zh: '人對即時回報賦予過高權重，對未來回報賦予過低權重。', en: 'People give too much weight to immediate rewards and too little to future ones.' },
      solution: {
        zh: [
          '現時偏誤指人過分看重眼前利益，對未來利益折扣過大，並常預期「明天的自己」會更有自制力。',
          '儲蓄的好處在未來、消費的滿足在現在，於是一再推遲儲蓄，符合現時偏誤。',
          '錨定、損失規避與代表性捷思都不直接解釋跨期自我控制的問題，故答案為 a。'
        ],
        en: [
          'Present bias means people overweight immediate rewards, discount future rewards too heavily and expect their future selves to be more disciplined.',
          'Saving benefits are in the future while spending gives immediate satisfaction, so saving is repeatedly postponed — consistent with present bias.',
          'Anchoring, loss aversion and representativeness do not directly explain intertemporal self-control, so the answer is a.'
        ]
      }
    }
  ],

  'col.thought': [
    {
      id: 'thought1',
      prompt: {
        zh: '重商主義（mercantilism）認為國家財富的主要來源是甚麼？',
        en: 'What did mercantilism regard as the main source of national wealth?'
      },
      choices: [
        { id: 'a', zh: '勞動價值與自由交換。', en: 'Labour value and free exchange.' },
        { id: 'b', zh: '金銀等貴金屬的積累與貿易順差。', en: 'The accumulation of bullion such as gold and silver, and trade surpluses.' },
        { id: 'c', zh: '農業生產與自然秩序。', en: 'Agricultural production and natural order.' },
        { id: 'd', zh: '邊際效用與消費者選擇。', en: 'Marginal utility and consumer choice.' }
      ],
      answer: 'b',
      hint: { zh: '重商主義盛行於 16 至 18 世紀，重視金銀流入。', en: 'Mercantilism flourished from the 16th to the 18th century and prized inflows of bullion.' },
      solution: {
        zh: [
          '重商主義認為一國財富取決於金銀等貴金屬的存量，因此主張鼓勵出口、限制進口以保持貿易順差。',
          'a 接近古典學派的自由貿易觀，c 是重農學派的主張，d 屬 1870 年代邊際革命。',
          '因此答案為 b。'
        ],
        en: [
          'Mercantilists held that national wealth depended on the stock of bullion, so they favoured exports and restrictions on imports to keep a trade surplus.',
          'a is close to the classical free-trade view, c is the physiocrats\' position and d belongs to the marginal revolution of the 1870s.',
          'The answer is therefore b.'
        ]
      }
    },
    {
      id: 'thought2',
      prompt: {
        zh: 'Adam Smith 在《國富論》中以哪個概念說明個人追求私利可促進社會利益？',
        en: 'Which concept did Adam Smith use in The Wealth of Nations to explain how self-interest can promote the social interest?'
      },
      choices: [
        { id: 'a', zh: '比較優勢。', en: 'Comparative advantage.' },
        { id: 'b', zh: '剩餘價值。', en: 'Surplus value.' },
        { id: 'c', zh: '「看不見的手」。', en: 'The "invisible hand".' },
        { id: 'd', zh: '有效需求。', en: 'Effective demand.' }
      ],
      answer: 'c',
      hint: { zh: 'Smith 認為市場價格與利潤引導資源流向社會需要的地方。', en: 'Smith argued that market prices and profits guide resources to where society needs them.' },
      solution: {
        zh: [
          'Smith 以「看不見的手」描述價格機制：個人為私利而生產與交換，卻在無意中促進了社會利益。',
          '比較優勢由 Ricardo 提出，剩餘價值由 Marx 分析，有效需求是 Keynes 的概念。',
          '因此答案為 c。'
        ],
        en: [
          'Smith used the "invisible hand" to describe the price mechanism: individuals pursuing their own interest produce and exchange in ways that unintentionally promote the social interest.',
          'Comparative advantage was developed by Ricardo, surplus value was analysed by Marx and effective demand is a Keynesian concept.',
          'The answer is therefore c.'
        ]
      }
    },
    {
      id: 'thought3',
      prompt: {
        zh: 'Adam Smith 認為分工（division of labour）提高生產力的主要原因是甚麼？',
        en: 'According to Adam Smith, what were the main reasons why the division of labour raises productivity?'
      },
      choices: [
        { id: 'a', zh: '政府補貼與關稅保護。', en: 'Government subsidies and tariff protection.' },
        { id: 'b', zh: '工人技巧因重複工序而熟練、節省轉換工序的時間，並促進機械發明。', en: 'Workers become more skilled through repetition, time is saved in moving between tasks, and machinery is invented.' },
        { id: 'c', zh: '工會的集體談判提高工資。', en: 'Collective bargaining by unions raises wages.' },
        { id: 'd', zh: '貨幣供應增加刺激需求。', en: 'An increase in the money supply stimulates demand.' }
      ],
      answer: 'b',
      hint: { zh: 'Smith 以製針工場為例說明分工的好處。', en: 'Smith used the pin factory to illustrate the benefits of the division of labour.' },
      solution: {
        zh: [
          'Smith 指出分工令工人專注於單一工序，技巧更熟練、節省轉換工作的時間，並有助發明專門機械。',
          'a、c、d 分別是政策、工資談判與貨幣因素，不是 Smith 對分工提高生產力的解釋。',
          '因此答案為 b。'
        ],
        en: [
          'Smith argued that specialising in one task makes workers more skilled, saves the time of switching tasks and encourages the invention of specialised machinery.',
          'a, c and d concern policy, wage bargaining and money respectively, not Smith\'s explanation of why the division of labour raises productivity.',
          'The answer is therefore b.'
        ]
      }
    },
    {
      id: 'thought4',
      prompt: {
        zh: 'Ricardo 的比較優勢理論認為，國際貿易的得益來自甚麼？',
        en: 'According to Ricardo\'s theory of comparative advantage, where do the gains from international trade come from?'
      },
      choices: [
        { id: 'a', zh: '一國必須在所有產品上都有絕對優勢。', en: 'A country must have an absolute advantage in every good.' },
        { id: 'b', zh: '各國工資水平必須相等。', en: 'Wage levels must be equal across countries.' },
        { id: 'c', zh: '各國生產機會成本較低的產品並專業化，然後互相貿易。', en: 'Countries specialise in goods with lower opportunity cost and trade with each other.' },
        { id: 'd', zh: '各國保持貿易順差以累積金銀。', en: 'Countries maintain trade surpluses to accumulate bullion.' }
      ],
      answer: 'c',
      hint: { zh: '比較優勢以機會成本比較，而非絕對生產力。', en: 'Comparative advantage compares opportunity costs, not absolute productivity.' },
      solution: {
        zh: [
          '比較優勢以機會成本判斷：各國生產自己機會成本較低的產品，專業化後透過貿易，雙方可消費的總量增加。',
          'a 與絕對優勢混淆，d 是重商主義的主張，b 不是理論前提。',
          '因此答案為 c。'
        ],
        en: [
          'Comparative advantage is based on opportunity cost: each country produces the good for which its opportunity cost is lower, and after specialisation trade raises the total amount both can consume.',
          'a confuses comparative with absolute advantage, d is a mercantilist claim and b is not a premise of the theory.',
          'The answer is therefore c.'
        ]
      }
    },
    {
      id: 'thought5',
      prompt: {
        zh: '馬克思（Marx）認為資本家的利潤主要來自甚麼？',
        en: 'According to Marx, where did capitalists\' profits mainly come from?'
      },
      choices: [
        { id: 'a', zh: '資本家的節儉與延遲消費。', en: 'Capitalists\' thrift and delayed consumption.' },
        { id: 'b', zh: '消費者對商品的主觀評價。', en: 'Consumers\' subjective valuation of goods.' },
        { id: 'c', zh: '對工人所創造剩餘價值的佔有。', en: 'The appropriation of surplus value created by workers.' },
        { id: 'd', zh: '技術進步自然帶來的生產力提升。', en: 'Productivity gains that arise naturally from technological progress.' }
      ],
      answer: 'c',
      hint: { zh: '馬克思以勞動價值論與剩餘價值分析資本主義。', en: 'Marx analysed capitalism using the labour theory of value and surplus value.' },
      solution: {
        zh: [
          '馬克思認為工人勞動創造的價值高於其工資，差額就是剩餘價值，被資本家佔有而成為利潤。',
          'a 是古典學派常見的資本累積解釋，b 是邊際學派的主觀價值論，d 不是馬克思的利潤來源分析。',
          '因此答案為 c。'
        ],
        en: [
          'Marx argued that workers create more value than their wages, and the difference — surplus value — is appropriated by capitalists as profit.',
          'a is a classical explanation of capital accumulation, b is the marginalists\' subjective value theory and d is not Marx\'s account of profit.',
          'The answer is therefore c.'
        ]
      }
    },
    {
      id: 'thought6',
      prompt: {
        zh: '1870 年代「邊際革命」的主要貢獻是甚麼？',
        en: 'What was the main contribution of the "marginal revolution" of the 1870s?'
      },
      choices: [
        { id: 'a', zh: '以主觀邊際效用解釋價值，取代勞動價值論。', en: 'Explaining value through subjective marginal utility, replacing the labour theory of value.' },
        { id: 'b', zh: '提出比較優勢理論。', en: 'Developing the theory of comparative advantage.' },
        { id: 'c', zh: '建立國民收入會計體系。', en: 'Establishing national income accounting.' },
        { id: 'd', zh: '主張政府應以財政政策刺激總需求。', en: 'Advocating fiscal policy to stimulate aggregate demand.' }
      ],
      answer: 'a',
      hint: { zh: 'Jevons、Menger、Walras 各自獨立提出邊際效用概念。', en: 'Jevons, Menger and Walras independently developed the concept of marginal utility.' },
      solution: {
        zh: [
          '邊際革命由 Jevons、Menger 與 Walras 等人在 1870 年代推動，以主觀邊際效用解釋價值，取代古典學派的勞動價值論。',
          'b 由 Ricardo 提出，c 是 20 世紀的發展，d 屬凱恩斯學派的主張。',
          '因此答案為 a。'
        ],
        en: [
          'The marginal revolution, led by Jevons, Menger and Walras in the 1870s, explained value through subjective marginal utility and replaced the classical labour theory of value.',
          'b was developed by Ricardo, c is a 20th-century development and d is a Keynesian policy prescription.',
          'The answer is therefore a.'
        ]
      }
    },
    {
      id: 'thought7',
      prompt: {
        zh: 'Marshall 對經濟學的主要貢獻是甚麼？',
        en: 'What was Alfred Marshall\'s main contribution to economics?'
      },
      choices: [
        { id: 'a', zh: '提出剩餘價值理論。', en: 'Developing the theory of surplus value.' },
        { id: 'b', zh: '整合供需分析與局部均衡，奠定新古典經濟學的基礎。', en: 'Integrating supply and demand analysis with partial equilibrium, laying the foundation of neoclassical economics.' },
        { id: 'c', zh: '建立 AD-AS 模型。', en: 'Building the AD-AS model.' },
        { id: 'd', zh: '提出理性預期假說。', en: 'Proposing the rational-expectations hypothesis.' }
      ],
      answer: 'b',
      hint: { zh: 'Marshall 的《經濟學原理》以供需曲線分析單一市場。', en: 'Marshall\'s Principles of Economics analysed individual markets with supply and demand curves.' },
      solution: {
        zh: [
          'Marshall 把邊際效用與成本分析整合成供需曲線，建立局部均衡分析，成為新古典經濟學的基礎。',
          'a 是 Marx 的理論，c 在 20 世紀才逐步形成，d 由 Lucas 等人在 1970 年代提出。',
          '因此答案為 b。'
        ],
        en: [
          'Marshall integrated marginal utility with cost analysis into supply and demand curves and developed partial equilibrium analysis, which became the foundation of neoclassical economics.',
          'a is Marx\'s theory, c took shape in the 20th century and d was advanced by Lucas and others in the 1970s.',
          'The answer is therefore b.'
        ]
      }
    },
    {
      id: 'thought8',
      prompt: {
        zh: 'Keynes 在《就業、利息與貨幣的一般理論》中主張甚麼？',
        en: 'What did Keynes argue in The General Theory of Employment, Interest and Money?'
      },
      choices: [
        { id: 'a', zh: '經濟可能停留在低於充分就業的均衡，政府應以財政政策刺激總需求。', en: 'The economy may settle at an equilibrium below full employment, so government should use fiscal policy to stimulate aggregate demand.' },
        { id: 'b', zh: '市場價格完全伸縮，經濟總能迅速回復充分就業。', en: 'Prices are fully flexible and the economy always returns quickly to full employment.' },
        { id: 'c', zh: '貨幣供應是唯一有效的政策工具。', en: 'The money supply is the only effective policy tool.' },
        { id: 'd', zh: '儲蓄率決定長期經濟增長率。', en: 'The saving rate determines the long-run growth rate.' }
      ],
      answer: 'a',
      hint: { zh: 'Keynes 關注有效需求不足與失業均衡。', en: 'Keynes focused on deficient effective demand and unemployment equilibrium.' },
      solution: {
        zh: [
          'Keynes 認為工資與價格未必迅速調整，總需求不足可令經濟停留在低於充分就業的均衡。',
          '因此他主張政府增加開支或減稅以刺激總需求；b 是古典學派的觀點，c 過分強調貨幣政策，d 屬增長理論。',
          '因此答案為 a。'
        ],
        en: [
          'Keynes argued that wages and prices may not adjust quickly, so deficient aggregate demand can leave the economy at an equilibrium below full employment.',
          'He therefore advocated higher government spending or tax cuts to stimulate demand; b is the classical view, c overstates monetary policy and d belongs to growth theory.',
          'The answer is therefore a.'
        ]
      }
    },
    {
      id: 'thought9',
      prompt: {
        zh: '以下哪項按時間先後排列正確？',
        en: 'Which of the following is in the correct chronological order?'
      },
      choices: [
        { id: 'a', zh: '古典學派 → 重商主義 → 邊際革命 → 凱恩斯。', en: 'Classical school → mercantilism → marginal revolution → Keynes.' },
        { id: 'b', zh: '重商主義 → 古典學派 → 邊際革命 → 凱恩斯。', en: 'Mercantilism → classical school → marginal revolution → Keynes.' },
        { id: 'c', zh: '邊際革命 → 重商主義 → 凱恩斯 → 古典學派。', en: 'Marginal revolution → mercantilism → Keynes → classical school.' },
        { id: 'd', zh: '凱恩斯 → 邊際革命 → 重商主義 → 古典學派。', en: 'Keynes → marginal revolution → mercantilism → classical school.' }
      ],
      answer: 'b',
      hint: { zh: 'Smith 的《國富論》在 1776 年，邊際革命在 1870 年代，凱恩斯在 1936 年。', en: 'Smith\'s Wealth of Nations appeared in 1776, the marginal revolution in the 1870s and Keynes in 1936.' },
      solution: {
        zh: [
          '重商主義盛行於 16 至 18 世紀；古典學派以 Smith《國富論》（1776）為代表；邊際革命在 1870 年代；凱恩斯《一般理論》在 1936 年。',
          '正確次序是重商主義、古典學派、邊際革命、凱恩斯。',
          '因此答案為 b。'
        ],
        en: [
          'Mercantilism flourished from the 16th to the 18th century; the classical school is represented by Smith\'s Wealth of Nations (1776); the marginal revolution came in the 1870s; and Keynes\'s General Theory appeared in 1936.',
          'The correct order is mercantilism, classical school, marginal revolution, Keynes.',
          'The answer is therefore b.'
        ]
      }
    },
    {
      id: 'thought10',
      prompt: {
        zh: 'Friedman 的貨幣主義（monetarism）主要主張甚麼？',
        en: 'What did Friedman\'s monetarism mainly argue?'
      },
      choices: [
        { id: 'a', zh: '財政政策比貨幣政策更有效。', en: 'Fiscal policy is more effective than monetary policy.' },
        { id: 'b', zh: '貨幣供應增長是通脹的主要決定因素，政策應受規則約束。', en: 'Money growth is the main determinant of inflation, and policy should be bound by rules.' },
        { id: 'c', zh: '應以中央計劃取代市場價格。', en: 'Central planning should replace market prices.' },
        { id: 'd', zh: '失業率長期由總需求決定。', en: 'The unemployment rate is determined by aggregate demand in the long run.' }
      ],
      answer: 'b',
      hint: { zh: '貨幣主義承繼貨幣數量論，強調貨幣增長與通脹的關係。', en: 'Monetarism builds on the quantity theory of money and stresses the link between money growth and inflation.' },
      solution: {
        zh: [
          'Friedman 認為「通脹無論何時何地都是貨幣現象」，貨幣供應增長過快是通脹的主因，並主張以固定規則約束政策。',
          'a 與貨幣主義相反，c 是計劃經濟主張，d 忽略自然失業率。',
          '因此答案為 b。'
        ],
        en: [
          'Friedman argued that "inflation is always and everywhere a monetary phenomenon": excessive money growth is the main cause of inflation, so policy should follow a rule.',
          'a is the opposite of monetarism, c is a planned-economy claim and d ignores the natural rate of unemployment.',
          'The answer is therefore b.'
        ]
      }
    }
  ]

});
