/*
 * content/lessons-s4.js
 * 中四＋中五（DSE 經濟：微觀 I 與微觀 II）小課堂及概念題庫
 * 技能：s4.basic_concepts … s5.factor_markets（共 22 課）
 * 題庫：s4.positive_normative、s4.economic_questions、s4.production、s5.public_goods
 * 以 EconData.addLessons / EconData.addBanks 註冊。
 */

EconData.addLessons({

  's4.basic_concepts': {
    zh: {
      intro: '資源有限而慾望無限，這就是稀少性；有稀少性便要做選擇，而選擇的代價就是機會成本——所放棄的最佳替代選擇的價值。生產可能曲線（PPF）顯示在既定資源與技術下，兩種物品的最大產量組合，曲線上的點代表有效率。短期固定要素不變時，增加可變要素，邊際回報最終遞減。',
      steps: [
        '找出你所選的方案，以及被放棄的替代選擇。',
        '比較各替代選擇的價值，找出價值最高的一個。',
        '該最高價值就是這個選擇的機會成本。',
        '若是兩產品模型，用 $\\frac{\\Delta Y}{\\Delta X}$ 求每單位機會成本。'
      ],
      example: '某廠一小時可全產 100 件 X 或 50 件 Y，機會成本不變。每增產 1 件 X 要放棄 0.5 件 Y，故 1 件 X 的機會成本是 0.5 件 Y。若只生產 60 件 X，餘下四成資源可生產 $0.4 \\times 50 = 20$ 件 Y。',
      tip: '機會成本只計「最佳」替代選擇，千萬不要把放棄的所有選項價值相加。',
      mistake: '把機會成本當成付出的金錢總額。若選擇涉及付費，該筆錢的最佳其他用途才是機會成本，而不是賬單上的數字。',
      glossary: [
        { term: '稀少性', def: '資源有限而人的慾望無限的現象。' },
        { term: '機會成本', def: '作出選擇時所放棄的最佳替代選擇的價值。' },
        { term: '生產可能曲線', def: '在既定資源與技術下，兩種物品最大產量組合的軌跡。' }
      ]
    },
    en: {
      intro: 'Resources are limited while wants are unlimited — that is scarcity. Scarcity forces choices, and the cost of a choice is its opportunity cost: the value of the best alternative forgone. The production possibility frontier (PPF) shows the maximum combinations of two goods producible with given resources and technology; points on the curve are efficient. In the short run, with fixed factors, adding variable inputs eventually gives diminishing marginal returns.',
      steps: [
        'Identify the option chosen and the alternatives given up.',
        'Compare the values of the alternatives and find the highest one.',
        'That highest value is the opportunity cost of the choice.',
        'For a two-good model, use $\\frac{\\Delta Y}{\\Delta X}$ to get the per-unit opportunity cost.'
      ],
      example: 'A factory can produce either 100 units of X or 50 units of Y in an hour, with constant opportunity cost. Each extra X costs 0.5 Y, so the opportunity cost of 1 X is 0.5 Y. If it produces 60 X, the remaining 40% of resources can produce $0.4 \\times 50 = 20$ Y.',
      tip: 'Count only the best alternative forgone — never add up the values of all unchosen options.',
      mistake: 'Treating opportunity cost as the total amount of money paid. If a choice involves spending, the opportunity cost is the best alternative use of that money, not the bill.',
      glossary: [
        { term: 'Scarcity', def: 'The situation where resources are limited relative to unlimited wants.' },
        { term: 'Opportunity cost', def: 'The value of the best alternative forgone when a choice is made.' },
        { term: 'Production possibility frontier', def: 'The locus of maximum output combinations of two goods given resources and technology.' }
      ]
    },
    visual: { kind: 'ppf', point: 'on', shift: false, desc: { zh: '生產可能曲線上的一點代表有效率', en: 'A point on the PPF represents an efficient combination' } }
  },

  's4.positive_normative': {
    zh: {
      intro: '實證陳述描述「是甚麼」，可以用事實或數據檢驗真偽；規範陳述涉及「應該怎樣」的價值判斷，不能單靠事實證明對錯。分辨兩者的關鍵不是語氣，而是可否用證據檢驗。',      steps: ["先判斷句子是在描述「是甚麼」，還是表達「應該怎樣」。", "問一問：這句話可否用事實或數據檢驗真偽？", "可用事實檢驗的是實證陳述；涉及價值判斷、不能單靠事實檢驗的是規範陳述。"],

      example: '「最低工資令失業率上升」是實證陳述，可用數據檢驗；「政府應提高最低工資」是規範陳述，涉及價值判斷，經濟學不能單憑數據判定它對錯。',
      tip: '看到「應該、公平、理想」多數是規範陳述；但最終仍要問一句：可否用事實檢驗？',
      mistake: '以為有數據支持的主張就一定是實證陳述。即使引用大量數據，「政府應……」仍然是規範陳述。',
      glossary: [
        { term: '實證陳述', def: '描述事實、可用證據檢驗真偽的陳述。' },
        { term: '規範陳述', def: '涉及價值判斷、不能單靠事實檢驗的陳述。' }
      ]
    },
    en: {
      intro: 'A positive statement describes what is and can be tested against facts or data. A normative statement involves a value judgement about what ought to be and cannot be proved right or wrong by facts alone. The test is not the tone of the sentence but whether evidence can settle it.',      steps: ["Decide whether the sentence describes \"what is\" or \"what ought to be\".", "Ask whether facts or data can test the claim.", "If facts can test it, it is a positive statement; if it rests on a value judgement, it is normative."],

      example: '"A minimum wage raises unemployment" is a positive statement that data can test. "The government should raise the minimum wage" is a normative statement involving a value judgement; economics cannot judge it by data alone.',
      tip: 'Words like "should", "fair" and "ideal" usually signal a normative statement — but always ask: can facts test it?',
      mistake: 'Assuming a claim backed by data must be positive. Even with plenty of data, "the government should…" remains normative.',
      glossary: [
        { term: 'Positive statement', def: 'A statement of fact that can be tested against evidence.' },
        { term: 'Normative statement', def: 'A statement involving a value judgement that cannot be tested by facts alone.' }
      ]
    }
  },

  's4.economic_questions': {
    zh: {
      intro: '稀少性令每個社會都要回答三個基本經濟問題：生產甚麼、怎樣生產、為誰生產。市場經濟主要靠價格與利潤回答，計劃經濟靠中央計劃，混合經濟則由市場與政府共同決定。',      steps: ["看這個決定涉及產品種類、生產方法，還是分配對象。", "產品種類是「生產甚麼」；生產方法與投入組合是「怎樣生產」；分配給誰是「為誰生產」。", "市場經濟靠價格，計劃經濟靠中央計劃，混合經濟則兩者並用。"],

      example: '一間茶餐廳要決定：生產甚麼（菜單上有哪些菜式）、怎樣生產（用明火還是電爐、請多少員工）、為誰生產（如何定價、服務哪些顧客）。三個問題分別是產品、方法與對象。',
      tip: '記住「產品、方法、對象」：生產甚麼＝產品，怎樣生產＝方法，為誰生產＝對象。',
      mistake: '把「怎樣生產」與「為誰生產」混淆。用機器代替人手是「怎樣生產」；定價令哪些顧客買得到，才是「為誰生產」。',
      glossary: [
        { term: '市場經濟', def: '主要由價格機制與私人生產決定資源分配的經濟體系。' },
        { term: '計劃經濟', def: '主要由政府中央計劃決定資源分配的經濟體系。' },
        { term: '混合經濟', def: '市場與政府共同參與資源分配的經濟體系。' }
      ]
    },
    en: {
      intro: 'Scarcity forces every society to answer three basic economic questions: what to produce, how to produce, and for whom to produce. A market economy answers mainly through prices and profits, a planned economy through central planning, and a mixed economy through both markets and government.',      steps: ["Identify whether the decision is about the product, the production method or the recipient.", "The product is \"what to produce\"; methods and inputs are \"how to produce\"; the recipient is \"for whom to produce\".", "Markets use prices, planned economies use central planning, and mixed economies use both."],

      example: 'A cha chaan teng must decide what to produce (the menu), how to produce it (gas or electric cooking, how many staff), and for whom (how to price, which customers to serve). These are the product, method and target questions.',
      tip: 'Remember "product, method, target": what = product, how = method, for whom = target.',
      mistake: 'Confusing "how to produce" with "for whom to produce". Replacing workers with machines is a "how" decision; pricing that decides who can buy is a "for whom" decision.',
      glossary: [
        { term: 'Market economy', def: 'An economy where the price mechanism and private producers mainly allocate resources.' },
        { term: 'Planned economy', def: 'An economy where central government planning mainly allocates resources.' },
        { term: 'Mixed economy', def: 'An economy where both markets and government allocate resources.' }
      ]
    }
  },

  's4.production': {
    zh: {
      intro: '生產是創造效用或增加價值的活動，需要四種生產要素：土地、勞力、資本與企業家才能。分工（專業化）讓工人專注於個別工序，提高生產力，但也帶來協調成本與互相依賴。',      steps: ["分辨四種生產要素：土地、勞力、資本與企業家才能。", "金錢與金融資產不是生產要素；機器、廠房等生產工具才是資本。", "評估分工能否提高生產力，並留意協調成本與互相依賴等局限。"],

      example: '一人獨力做三文治，每小時做 10 份；分工後四人分別負責切麵包、塗醬、加配料與包裝，合共每小時做 60 份。總產量增加，但工序之間需要協調與交接。',
      tip: '金錢不是生產要素；資本是指機器、廠房等「生產出來的生產工具」，不是鈔票或存款。',
      mistake: '把銀行存款或現金當作資本。它們是金融資產，不是直接用於生產的工具。',
      glossary: [
        { term: '生產要素', def: '用於生產物品與服務的資源，包括土地、勞力、資本與企業家才能。' },
        { term: '分工', def: '把生產工序分配給不同工人或廠商，以提高專業化程度。' },
        { term: '企業家才能', def: '組織其他生產要素並承擔經營風險的能力。' }
      ]
    },
    en: {
      intro: 'Production is the creation of utility or added value, and it uses four factors of production: land, labour, capital and entrepreneurship. Division of labour (specialisation) lets workers focus on individual tasks and raises productivity, but it also brings coordination costs and mutual dependence.',      steps: ["Identify the four factors: land, labour, capital and entrepreneurship.", "Money and financial assets are not factors of production; machines and factories are capital.", "Assess whether division of labour raises productivity, noting coordination costs and dependence."],

      example: 'Working alone, one person makes 10 sandwiches an hour. With division of labour, four workers handle slicing, spreading, filling and packing, and together make 60 sandwiches an hour. Output rises, but the steps need coordination and handovers.',
      tip: 'Money is not a factor of production; capital means produced means of production such as machines and factories, not cash or deposits.',
      mistake: 'Treating bank deposits or cash as capital. They are financial assets, not tools used directly in production.',
      glossary: [
        { term: 'Factors of production', def: 'Resources used to produce goods and services: land, labour, capital and entrepreneurship.' },
        { term: 'Division of labour', def: 'Splitting production into tasks performed by different workers or firms.' },
        { term: 'Entrepreneurship', def: 'The ability to organise the other factors of production and bear business risk.' }
      ]
    }
  },

  's4.cost': {
    zh: {
      intro: '短期總成本 $TC = FC + VC$，平均成本 $AC = TC \\div Q$，邊際成本 $MC = \\Delta TC \\div \\Delta Q$ 是多生產一單位所增加的成本。短期有固定要素，邊際報酬最終遞減，令 $MC$ 上升；長期廠商可調整所有要素，可享規模經濟。',
      steps: [
        '從題目分辨固定成本、變動成本與產量 Q。',
        '代入 TC 公式求總成本；再用 $AC = TC \\div Q$ 求平均成本。',
        '邊際成本 $MC = TC(Q) - TC(Q - 1)$，即多生產一單位的成本。',
        '比較 MC 與 AC：MC 低於 AC 時 AC 下降，高於 AC 時 AC 上升。'
      ],
      example: '某廠的總成本 $TC = 100 + 5Q + Q^2$。Q = 10 時，TC = 100 + 50 + 100 = 250元，AC = 25元；Q = 9 時 TC = 226元，所以第 10 單位的 MC = 250 − 226 = 24元。',
      tip: 'MC 只受變動成本影響；固定成本不隨產量改變，所以不計入 MC。',
      mistake: '用平均成本當作多生產一單位的成本。多一單位的成本是 $MC = \\Delta TC \\div \\Delta Q$，不是 AC。',
      glossary: [
        { term: '固定成本', def: '不隨產量變動的成本，例如租金。' },
        { term: '邊際成本', def: '多生產一單位所增加的總成本。' },
        { term: '規模經濟', def: '產量增加令長期平均成本下降的現象。' }
      ]
    },
    en: {
      intro: 'In the short run, total cost is $TC = FC + VC$; average cost is $AC = TC \\div Q$; marginal cost $MC = \\Delta TC \\div \\Delta Q$ is the extra cost of producing one more unit. Fixed factors cause diminishing marginal returns, so MC eventually rises; in the long run all factors can vary and economies of scale are possible.',
      steps: [
        'Identify fixed cost, variable cost and output Q from the question.',
        'Substitute Q into the TC formula, then find $AC = TC \\div Q$.',
        'Marginal cost $MC = TC(Q) - TC(Q - 1)$ is the cost of one extra unit.',
        'Compare MC with AC: AC falls when MC < AC and rises when MC > AC.'
      ],
      example: 'A firm has total cost $TC = 100 + 5Q + Q^2$. At Q = 10, TC = 100 + 50 + 100 = HKD 250 and AC = HKD 25. At Q = 9, TC = HKD 226, so the MC of the 10th unit is 250 − 226 = HKD 24.',
      tip: 'MC depends only on variable cost; fixed cost does not change with output, so it is not part of MC.',
      mistake: 'Using average cost as the cost of one more unit. The extra-unit cost is $MC = \\Delta TC \\div \\Delta Q$, not AC.',
      glossary: [
        { term: 'Fixed cost', def: 'A cost that does not vary with output, such as rent.' },
        { term: 'Marginal cost', def: 'The increase in total cost from producing one more unit.' },
        { term: 'Economies of scale', def: 'A fall in long-run average cost as output increases.' }
      ]
    }
  },

  's4.profit': {
    zh: {
      intro: '會計利潤 = 總收入 − 顯性成本；經濟利潤要再扣除隱性成本（機會成本）。當經濟利潤為零，廠商只賺取正常利潤，即所有資源都賺回其機會成本。廠商一般以利潤極大化為目標。',
      steps: [
        '計算總收入 $TR = P \\times Q$。',
        '減去顯性成本（實際支付的金錢），得會計利潤。',
        '再減去隱性成本（老闆放棄的薪酬、自有資產的租金或利息），得經濟利潤。',
        '經濟利潤為零即正常利潤；大於零即超額利潤。'
      ],
      example: '小店全年收入 500,000元，顯性成本 350,000元；老闆放棄受僱薪酬 100,000元，自有舖位若出租可得 50,000元。會計利潤 = 500,000 − 350,000 = 150,000元；經濟利潤 = 500,000 − 350,000 − 150,000 = 0元，即賺取正常利潤。',
      tip: '一句記住：經濟利潤 = 會計利潤 − 隱性成本。',
      mistake: '只計實際支出的成本，忽略老闆自己的時間與資金，於是把正常利潤誤當成超額利潤。',
      glossary: [
        { term: '會計利潤', def: '總收入減去顯性成本。' },
        { term: '經濟利潤', def: '總收入減去顯性成本與隱性成本。' },
        { term: '正常利潤', def: '經濟利潤為零、所有資源賺回機會成本的狀態。' }
      ]
    },
    en: {
      intro: 'Accounting profit = total revenue − explicit costs; economic profit subtracts implicit costs (opportunity costs) as well. When economic profit is zero, the firm earns only normal profit, meaning every resource earns its opportunity cost. Firms generally aim to maximise profit.',
      steps: [
        'Compute total revenue: $TR = P \\times Q$.',
        'Subtract explicit costs actually paid to get accounting profit.',
        'Subtract implicit costs (the owner\'s forgone salary, rent or interest on own assets) to get economic profit.',
        'Zero economic profit means normal profit; a positive figure means supernormal profit.'
      ],
      example: 'A small shop earns HKD 500,000 a year with explicit costs of HKD 350,000. The owner gives up a salary of HKD 100,000 and could rent out the shop for HKD 50,000. Accounting profit = 500,000 − 350,000 = HKD 150,000; economic profit = 500,000 − 350,000 − 150,000 = HKD 0, i.e. normal profit.',
      tip: 'One line to remember: economic profit = accounting profit − implicit costs.',
      mistake: 'Counting only costs actually paid and ignoring the owner\'s own time and money, so normal profit is mistaken for supernormal profit.',
      glossary: [
        { term: 'Accounting profit', def: 'Total revenue minus explicit costs.' },
        { term: 'Economic profit', def: 'Total revenue minus explicit and implicit costs.' },
        { term: 'Normal profit', def: 'Zero economic profit, where all resources earn their opportunity cost.' }
      ]
    }
  }

,

  's4.demand': {
    zh: {
      intro: '需求定律：其他因素不變時，價格上升，需求量下降。只有該貨品自身價格改變，才是沿需求曲線移動（需求量變動）；收入、偏好、相關貨品價格、預期價格或人口改變，會令整條需求曲線移動（需求變動）。',      steps: ["先確認改變的是該貨品自身價格，還是其他因素。", "自身價格改變是沿需求曲線移動，即需求量變動。", "收入、偏好、相關貨品價格、預期價格或人口改變會令整條需求曲線移動，再判斷均衡價格與數量的方向。"],

      example: '可樂與檸檬茶是替代品。檸檬茶價格上升，人們轉買可樂，可樂的需求增加，需求曲線右移，均衡價格與數量都上升。',
      tip: '口訣：「自身價格沿線走，其他因素整條移」。',
      mistake: '把「需求增加」與「需求量增加」混用。前者是整條曲線右移，後者只是價格下降時沿曲線移動。',
      glossary: [
        { term: '需求定律', def: '其他因素不變時，價格與需求量成反向關係。' },
        { term: '需求量', def: '在某一價格下消費者願意並能夠購買的數量。' },
        { term: '需求變動', def: '價格以外因素令整條需求曲線移動。' }
      ]
    },
    en: {
      intro: 'The law of demand: other things being equal, when price rises, quantity demanded falls. Only a change in the good\'s own price moves us along the demand curve (a change in quantity demanded); changes in income, tastes, related prices, expected prices or population shift the whole curve (a change in demand).',      steps: ["Check whether the change is in the good\'s own price or in another factor.", "A change in own price is a movement along the demand curve: a change in quantity demanded.", "Changes in income, tastes, related prices, expected prices or population shift the whole demand curve; then work out the effect on equilibrium price and quantity."],

      example: 'Cola and lemon tea are substitutes. When lemon tea becomes more expensive, people switch to cola; demand for cola rises, its demand curve shifts right, and both equilibrium price and quantity rise.',
      tip: 'Rhyme to remember: own price moves along the curve; other factors shift the whole curve.',
      mistake: 'Using "demand rises" and "quantity demanded rises" interchangeably. The first shifts the whole curve right; the second is a movement along the curve after a price fall.',
      glossary: [
        { term: 'Law of demand', def: 'Other things equal, price and quantity demanded are inversely related.' },
        { term: 'Quantity demanded', def: 'The amount consumers are willing and able to buy at a given price.' },
        { term: 'Change in demand', def: 'A shift of the whole demand curve caused by a non-price factor.' }
      ]
    },
    visual: { kind: 'supplydemand', shifts: ['D+'], desc: { zh: '需求增加，需求曲線由 D 右移至 D1', en: 'Demand increases: the demand curve shifts right from D to D1' } }
  },

  's4.supply': {
    zh: {
      intro: '供應定律：其他因素不變時，價格上升，供應量上升。投入成本、技術、補貼或稅、生產者數目與預期價格改變，會令整條供應曲線移動。',      steps: ["先確認改變的是該貨品自身價格，還是其他因素。", "自身價格改變是沿供應曲線移動，即供應量變動。", "成本、技術、補貼或稅、生產者數目或預期價格改變會令整條供應曲線移動，再判斷均衡價格與數量的方向。"],

      example: '糖價上升令檸檬茶的生產成本增加，供應減少，供應曲線左移。結果均衡價格上升、均衡數量下降。',
      tip: '成本上升＝供應減少（左移）；技術進步或補貼＝供應增加（右移）。',
      mistake: '把「供應量減少」與「供應減少」混淆。價格下跌只是沿供應曲線向左下移動，並非整條曲線左移。',
      glossary: [
        { term: '供應定律', def: '其他因素不變時，價格與供應量成正向關係。' },
        { term: '供應量', def: '在某一價格下生產者願意並能夠出售的數量。' },
        { term: '供應變動', def: '價格以外因素令整條供應曲線移動。' }
      ]
    },
    en: {
      intro: 'The law of supply: other things being equal, a higher price raises quantity supplied. Changes in input costs, technology, subsidies or taxes, the number of producers and expected prices shift the whole supply curve.',      steps: ["Check whether the change is in the good\'s own price or in another factor.", "A change in own price is a movement along the supply curve: a change in quantity supplied.", "Changes in costs, technology, subsidies or taxes, the number of producers or expected prices shift the whole supply curve; then work out the effect on equilibrium price and quantity."],

      example: 'A rise in the price of sugar raises the cost of making lemon tea, so supply falls and the supply curve shifts left. As a result, equilibrium price rises and equilibrium quantity falls.',
      tip: 'Higher costs mean less supply (shift left); better technology or a subsidy means more supply (shift right).',
      mistake: 'Confusing "a fall in quantity supplied" with "a fall in supply". A price fall is a movement down along the supply curve, not a leftward shift of the curve.',
      glossary: [
        { term: 'Law of supply', def: 'Other things equal, price and quantity supplied are positively related.' },
        { term: 'Quantity supplied', def: 'The amount producers are willing and able to sell at a given price.' },
        { term: 'Change in supply', def: 'A shift of the whole supply curve caused by a non-price factor.' }
      ]
    },
    visual: { kind: 'supplydemand', shifts: ['S-'], desc: { zh: '供應減少，供應曲線由 S 左移至 S1', en: 'Supply falls: the supply curve shifts left from S to S1' } }
  },

  's4.equilibrium': {
    zh: {
      intro: '均衡是需求量等於供應量的價格與數量，市場既無短缺亦無盈餘的壓力。價格高於均衡會出現盈餘，價格被推低；低於均衡會出現短缺，價格被推高。需求或供應移動會改變均衡價格與數量。',
      steps: [
        '寫出需求函數 $Q_d$ 與供應函數 $Q_s$。',
        '令 $Q_d = Q_s$，解方程求均衡價格 $P$。',
        '把 $P$ 代回任一函數求均衡數量 $Q$。',
        '若要找短缺或盈餘，先代入指定價格求 $Q_d$ 與 $Q_s$，再相減。'
      ],
      example: '需求 $Q_d = 100 - 2P$，供應 $Q_s = 20 + 2P$。令 $Q_d = Q_s$：$100 - 2P = 20 + 2P$，得 $P = 20$ 元、$Q = 60$。若價格為 10元，$Q_d = 80$、$Q_s = 40$，出現短缺 40 單位，價格會被推高。',
      tip: '先寫 Qd 與 Qs 再比較；短缺時價格上升，盈餘時價格下跌。',
      mistake: '把「短缺」當成「供應減少」。短缺是價格低於均衡時 Qd 大於 Qs 的差額，不是曲線移動。',
      glossary: [
        { term: '均衡價格', def: '令需求量等於供應量的價格。' },
        { term: '短缺', def: '價格低於均衡時，需求量超過供應量的差額。' },
        { term: '盈餘', def: '價格高於均衡時，供應量超過需求量的差額。' }
      ]
    },
    en: {
      intro: 'Equilibrium is the price and quantity at which quantity demanded equals quantity supplied, so there is no pressure for price to change. Above equilibrium a surplus pushes price down; below equilibrium a shortage pushes price up. Shifts in demand or supply change the equilibrium price and quantity.',
      steps: [
        'Write down the demand function $Q_d$ and the supply function $Q_s$.',
        'Set $Q_d = Q_s$ and solve for the equilibrium price $P$.',
        'Substitute $P$ back into either function to find equilibrium quantity $Q$.',
        'For a shortage or surplus, substitute the given price into $Q_d$ and $Q_s$, then subtract.'
      ],
      example: 'Demand is $Q_d = 100 - 2P$ and supply is $Q_s = 20 + 2P$. Setting $Q_d = Q_s$ gives $100 - 2P = 20 + 2P$, so $P = 20$ dollars and $Q = 60$. At a price of HKD 10, $Q_d = 80$ and $Q_s = 40$, so there is a shortage of 40 units and price is pushed up.',
      tip: 'Write Qd and Qs first, then compare; shortages push price up and surpluses push it down.',
      mistake: 'Treating a "shortage" as "a fall in supply". A shortage is the gap where Qd exceeds Qs at a price below equilibrium, not a curve shift.',
      glossary: [
        { term: 'Equilibrium price', def: 'The price at which quantity demanded equals quantity supplied.' },
        { term: 'Shortage', def: 'The excess of quantity demanded over quantity supplied when price is below equilibrium.' },
        { term: 'Surplus', def: 'The excess of quantity supplied over quantity demanded when price is above equilibrium.' }
      ]
    },
    visual: { kind: 'supplydemand', desc: { zh: '供需圖：均衡點在 D 與 S 相交處', en: 'Supply and demand diagram: equilibrium where D and S intersect' } }
  },

  's4.elasticity': {
    zh: {
      intro: '需求價格彈性 $PED = \\dfrac{\\%\\Delta Q}{\\%\\Delta P}$（需求量變動百分比 ÷ 價格變動百分比），通常取絕對值。PED 大於 1 為彈性，小於 1 為非彈性，等於 1 為單位彈性。彈性大時，減價會令總收入上升。',
      steps: [
        '寫出新舊價格與新舊需求量。',
        '分別計算價格與需求量的百分比變動（用題目指定的初始值法或中點法）。',
        '$PED = \\left| \\dfrac{\\%\\Delta Q}{\\%\\Delta P} \\right|$。',
        '判斷彈性，再用總收入（P × Q）的變化檢驗結論。'
      ],
      example: '價格由 10元跌至 8元，需求量由 100 升至 130。價格變動 = −20%，需求量變動 = +30%，$PED = |30 \\div (-20)| = 1.5$（彈性）。總收入由 1,000元升至 1,040元，減價令收入增加。',
      tip: '彈性需求（PED > 1）減價增收入；非彈性需求減價減收入。',
      mistake: '把價格與數量的絕對變動直接相除。彈性用百分比變動計算，並且要取絕對值。',
      glossary: [
        { term: '需求價格彈性', def: '需求量對價格變動的敏感程度。' },
        { term: '彈性需求', def: 'PED 大於 1，需求量變動百分比大於價格變動百分比。' },
        { term: '總收入', def: '價格乘以銷售量。' }
      ]
    },
    en: {
      intro: 'Price elasticity of demand is $PED = \\dfrac{\\%\\Delta Q}{\\%\\Delta P}$ (the percentage change in quantity demanded divided by the percentage change in price), usually taken as an absolute value. PED above 1 is elastic, below 1 inelastic, and equal to 1 unit elastic. When demand is elastic, a price cut raises total revenue.',
      steps: [
        'Write down the old and new prices and quantities.',
        'Compute the percentage changes in price and quantity (using the initial-value or midpoint method stated in the question).',
        '$PED = \\left| \\dfrac{\\%\\Delta Q}{\\%\\Delta P} \\right|$.',
        'Classify the elasticity and check the conclusion with the change in total revenue (P × Q).'
      ],
      example: 'Price falls from HKD 10 to HKD 8 and quantity demanded rises from 100 to 130. Price changes by −20% and quantity by +30%, so $PED = |30 \\div (-20)| = 1.5$ (elastic). Total revenue rises from HKD 1,000 to HKD 1,040, so the price cut raises revenue.',
      tip: 'Elastic demand (PED > 1): a price cut raises revenue; inelastic demand: a price cut lowers revenue.',
      mistake: 'Dividing absolute changes in price and quantity. Elasticity uses percentage changes and an absolute value.',
      glossary: [
        { term: 'Price elasticity of demand', def: 'The responsiveness of quantity demanded to a change in price.' },
        { term: 'Elastic demand', def: 'PED greater than 1: quantity demanded changes proportionally more than price.' },
        { term: 'Total revenue', def: 'Price multiplied by quantity sold.' }
      ]
    }
  },

  's4.elasticity_other': {
    zh: {
      intro: '收入彈性 $YED = \\dfrac{\\%\\Delta Q}{\\%\\Delta Y}$：正數是正常物品（大於 1 為奢侈品，0 至 1 為必需品），負數是劣等物品。交叉彈性 $XED = \\dfrac{\\%\\Delta Q_X}{\\%\\Delta P_Y}$：正數代表替代品，負數代表互補品。供應價格彈性 $PES = \\dfrac{\\%\\Delta Q_s}{\\%\\Delta P}$，通常為正。',
      steps: [
        '先認清題目是哪兩種變數：收入、另一貨品價格，還是自身價格。',
        '分別計算兩個百分比變動。',
        '相除，並保留正負號（PES 除外）。',
        '按正負與大小分類：正常／劣等、替代／互補、彈性／非彈性。'
      ],
      example: '收入上升 10%，某物品需求上升 15%，YED = 1.5，屬奢侈品。另一物品 Y 價格上升 10%，物品 X 需求下跌 5%，XED = −0.5，兩者是互補品。',
      tip: 'YED 看收入、XED 看另一貨品價格、PES 看自身價格；先寫公式再代入。',
      mistake: '忘記保留正負號；XED 的分子永遠是物品 X 的需求量變動，不是 Y 的價格變動。',
      glossary: [
        { term: '收入彈性', def: '需求量對收入變動的敏感程度。' },
        { term: '交叉彈性', def: '某物品需求量對另一物品價格變動的敏感程度。' },
        { term: '供應價格彈性', def: '供應量對價格變動的敏感程度。' }
      ]
    },
    en: {
      intro: 'Income elasticity $YED = \\dfrac{\\%\\Delta Q}{\\%\\Delta Y}$: positive for normal goods (above 1 a luxury, between 0 and 1 a necessity), negative for inferior goods. Cross elasticity $XED = \\dfrac{\\%\\Delta Q_X}{\\%\\Delta P_Y}$: positive for substitutes, negative for complements. Price elasticity of supply $PES = \\dfrac{\\%\\Delta Q_s}{\\%\\Delta P}$, normally positive.',
      steps: [
        'Identify the two variables: income, the price of another good, or the good\'s own price.',
        'Compute the two percentage changes.',
        'Divide them, keeping the sign (except for PES).',
        'Classify by sign and size: normal or inferior, substitute or complement, elastic or inelastic.'
      ],
      example: 'Income rises 10% and demand for a good rises 15%, so YED = 1.5 and the good is a luxury. The price of good Y rises 10% and demand for good X falls 5%, so XED = −0.5 and the two goods are complements.',
      tip: 'YED uses income, XED uses another good\'s price, PES uses own price; write the formula before substituting.',
      mistake: 'Dropping the sign, or putting the change in Y\'s price in the numerator of XED. The numerator is always the change in quantity of X.',
      glossary: [
        { term: 'Income elasticity', def: 'The responsiveness of quantity demanded to a change in income.' },
        { term: 'Cross elasticity', def: 'The responsiveness of quantity demanded of one good to a change in the price of another.' },
        { term: 'Price elasticity of supply', def: 'The responsiveness of quantity supplied to a change in price.' }
      ]
    }
  },

  's5.market_structure': {
    zh: {
      intro: '市場結構按廠商數目、產品差異、進入障礙與定價能力分類：完全競爭、壟斷競爭、寡頭與壟斷。市場集中度可用赫芬達爾指數 $HHI = \\sum s^2$ 衡量（s 為市場佔有率 %），數值由 0 至 10000，越大越集中。',
      steps: [
        '列出各廠商的市場佔有率（以百分比表示）。',
        '把每個佔有率平方。',
        '把所有平方值相加，得 HHI。',
        '比較數值判斷集中程度（一般 2500 以上屬高度集中）。'
      ],
      example: '某市場三間廠商佔有率為 50%、30%、20%，$HHI = 50^2 + 30^2 + 20^2 = 2500 + 900 + 400 = 3800$，屬高度集中。',
      tip: 'HHI 用平方，大廠商的影響會被放大；完全競爭下 HHI 接近 0。',
      mistake: '只看廠商數目判斷競爭程度。十間各佔 10% 的 HHI 是 1000，兩間各佔 50% 的 HHI 是 5000，後者集中得多。',
      glossary: [
        { term: '市場結構', def: '市場中廠商數目、產品差異、進入障礙與定價能力的組合。' },
        { term: '進入障礙', def: '阻止新廠商進入市場的因素。' },
        { term: '赫芬達爾指數', def: '各廠商市場佔有率平方之和，用以衡量市場集中度。' }
      ]
    },
    en: {
      intro: 'Market structure is classified by the number of firms, product differentiation, barriers to entry and pricing power: perfect competition, monopolistic competition, oligopoly and monopoly. Concentration can be measured by the Herfindahl-Hirschman Index, $HHI = \\sum s^2$, where s is the market share in %, ranging from 0 to 10000; a larger value means greater concentration.',
      steps: [
        'List each firm\'s market share as a percentage.',
        'Square each market share.',
        'Add the squares to get the HHI.',
        'Compare the value to judge concentration (above 2500 is generally highly concentrated).'
      ],
      example: 'In a market with shares of 50%, 30% and 20%, $HHI = 50^2 + 30^2 + 20^2 = 2500 + 900 + 400 = 3800$, which is highly concentrated.',
      tip: 'HHI squares the shares, so large firms dominate the index; under perfect competition HHI is close to 0.',
      mistake: 'Judging competition by the number of firms alone. Ten firms with 10% each give an HHI of 1000, while two firms with 50% each give 5000 — the latter is far more concentrated.',
      glossary: [
        { term: 'Market structure', def: 'The combination of firm numbers, product differentiation, entry barriers and pricing power in a market.' },
        { term: 'Barriers to entry', def: 'Factors that prevent new firms from entering a market.' },
        { term: 'Herfindahl-Hirschman Index', def: 'The sum of squared market shares, used to measure market concentration.' }
      ]
    }
  }

,

  's5.perfect_competition': {
    zh: {
      intro: '完全競爭廠商是價格接受者，$P = MR = AR$。短期按 $MR = MC$ 決定產量，只要價格不低於平均變動成本（$P \\geq AVC$）就繼續生產，否則停產。長期廠商可自由進出，均衡時 $P = AC_{min}$，經濟利潤為零，只賺正常利潤。',
      steps: [
        '在完全競爭下，價格就是廠商的 $MR$。',
        '令 $MR = MC$ 求利潤最大化產量。',
        '比較 $P$ 與 $AVC$：$P \\geq AVC$ 繼續生產，$P < AVC$ 停產。',
        '比較 $P$ 與 $AC$ 判斷利潤正負；長期均衡時 $P = AC_{min}$。'
      ],
      example: '某廠 $MC = 20$ 元、$AVC = 15$ 元、$AC = 22$ 元，市價 20元。短期 $P = MC$，應繼續生產，但每單位虧損 2元（20 − 22）。長期若價格持續低於 $AC$，廠商會退出市場，價格回升至最低 AC。',
      tip: '停產條件是 P < AVC，不是 P < AC；短期虧損仍可能值得繼續生產。',
      mistake: '一見虧損就停產。只要售價能收回變動成本，短期繼續生產可減少虧損。',
      glossary: [
        { term: '價格接受者', def: '不能影響市場價格、只能接受市價的廠商。' },
        { term: '停產', def: '短期內完全停止生產以減少虧損的決定。' },
        { term: '長期均衡', def: '廠商自由進出後，$P = AC_{min}$、經濟利潤為零的狀態。' }
      ]
    },
    en: {
      intro: 'A perfectly competitive firm is a price taker, so $P = MR = AR$. In the short run it chooses output where $MR = MC$ and keeps producing as long as price is not below average variable cost ($P \\geq AVC$); otherwise it shuts down. In the long run firms enter and exit freely, so equilibrium has $P = AC_{min}$, zero economic profit and only normal profit.',
      steps: [
        'Under perfect competition, price is the firm\'s $MR$.',
        'Set $MR = MC$ to find the profit-maximising output.',
        'Compare $P$ with $AVC$: keep producing if $P \\geq AVC$, shut down if $P < AVC$.',
        'Compare $P$ with $AC$ to judge profit; in long-run equilibrium $P = AC_{min}$.'
      ],
      example: 'A firm has MC = HKD 20, AVC = HKD 15 and AC = HKD 22, with a market price of HKD 20. In the short run $P = MC$, so it produces, but it loses HKD 2 per unit (20 − 22). If price stays below AC, firms exit in the long run and price rises back to minimum AC.',
      tip: 'The shutdown condition is P < AVC, not P < AC; a short-run loss can still be worth producing through.',
      mistake: 'Shutting down as soon as a loss appears. As long as price covers variable cost, producing reduces the loss in the short run.',
      glossary: [
        { term: 'Price taker', def: 'A firm that must accept the market price and cannot influence it.' },
        { term: 'Shutdown', def: 'Stopping production entirely in the short run to limit losses.' },
        { term: 'Long-run equilibrium', def: 'The state after free entry and exit, with $P = AC_{min}$ and zero economic profit.' }
      ]
    }
  },

  's5.monopoly': {
    zh: {
      intro: '壟斷是市場只有一間廠商、並有進入障礙，壟斷者是價格決定者，面對向下傾斜的需求曲線，$MR < P$。廠商按 $MR = MC$ 決定產量，再在需求曲線上找出價格，所以價格高於 $MC$，造成無謂損失。',
      steps: [
        '由需求函數求邊際收入：MR 與需求同截距，斜率是兩倍。',
        '令 $MR = MC$ 求利潤最大化產量 $Q$。',
        '把 Q 代回需求曲線求價格 P。',
        '利潤可用 $(P - AC) \\times Q$ 或 $TR - TC$ 計算；比較完全競爭產量可求無謂損失。'
      ],
      example: '需求 $P = 100 - 2Q$，邊際收入 $MR = 100 - 4Q$，$MC = 20$ 元。令 $MR = MC$：$100 - 4Q = 20$，得 $Q = 20$，$P = 100 - 40 = 60$ 元。利潤（假設無固定成本）是 $(60 - 20) \\times 20 = 800$ 元；完全競爭產量為 40，無謂損失是 $\\frac{1}{2} \\times (40 - 20) \\times (60 - 20) = 400$ 元。',
      tip: '壟斷者不會在 $P = MC$ 生產；先找 $MR = MC$ 的數量，再向需求曲線要價格。',
      mistake: '直接用 $P = MC$ 求壟斷產量。$P = MC$ 是完全競爭的條件，壟斷廠商會限制產量以提高價格。',
      glossary: [
        { term: '壟斷', def: '市場只有一間廠商、新廠商難以進入的市場結構。' },
        { term: '邊際收入', def: '多售出一單位所增加的總收入。' },
        { term: '無謂損失', def: '未達致效率時損失的總盈餘。' }
      ]
    },
    en: {
      intro: 'A monopoly is a market with a single firm and barriers to entry. The monopolist is a price maker facing a downward-sloping demand curve, so $MR < P$. It produces where $MR = MC$ and reads the price off the demand curve, so price exceeds $MC$ and deadweight loss arises.',
      steps: [
        'Find marginal revenue from demand: MR has the same intercept as demand but twice the slope.',
        'Set $MR = MC$ to find the profit-maximising output $Q$.',
        'Substitute Q back into demand to find price P.',
        'Profit can be found as $(P - AC) \\times Q$ or $TR - TC$; compare with the competitive output to find deadweight loss.'
      ],
      example: 'Demand is $P = 100 - 2Q$ and marginal revenue is $MR = 100 - 4Q$, with $MC = 20$ dollars. Setting $MR = MC$ gives $100 - 4Q = 20$, so $Q = 20$ and $P = 100 - 40 = 60$ dollars. Profit (no fixed cost) is $(60 - 20) \\times 20 = 800$ dollars. Competitive output is 40, so deadweight loss is $\\frac{1}{2} \\times (40 - 20) \\times (60 - 20) = 400$ dollars.',
      tip: 'A monopolist does not produce where $P = MC$; find the output where $MR = MC$, then read the price off demand.',
      mistake: 'Using $P = MC$ to find monopoly output. $P = MC$ is the competitive condition; a monopolist restricts output to raise price.',
      glossary: [
        { term: 'Monopoly', def: 'A market with one firm protected by barriers to entry.' },
        { term: 'Marginal revenue', def: 'The extra total revenue from selling one more unit.' },
        { term: 'Deadweight loss', def: 'The loss of total surplus when an efficient outcome is not reached.' }
      ]
    }
  },

  's5.oligopoly': {
    zh: {
      intro: '寡頭市場由少數廠商主導，彼此的策略互相影響，要用博弈論分析。優勢策略是不論對手怎樣選都最佳的選擇；納什均衡是雙方都沒有誘因單方面改變策略的組合。囚徒困境說明個別理性可能導致集體較差的結果。',
      steps: [
        '列出雙方策略與各組合的收益。',
        '逐一比較：對手選每個策略時，自己哪個選擇較好。',
        '若某策略在對手所有選擇下都較好，它就是優勢策略。',
        '找出雙方都不願單方面改變的組合，就是納什均衡。'
      ],
      example: '兩間廠商可選高價或低價。雙方高價各賺 10元；一方減價則減價方賺 15元、對手賺 5元；雙方低價各賺 6元。無論對手選甚麼，選低價都較好，所以低價是雙方的優勢策略，納什均衡是（低價，低價）賺（6元，6元）；合作維持高價本可各賺 10元，這就是囚徒困境。',
      tip: '優勢策略要逐格比較「對手每個選擇下我怎樣最好」，不要假設對手會合作。',
      mistake: '把納什均衡當作對雙方最優。囚徒困境下納什均衡的結果可能比合作結果差。',
      glossary: [
        { term: '寡頭', def: '由少數廠商主導、彼此策略互動的市場結構。' },
        { term: '優勢策略', def: '不論對手怎樣選擇，都是最佳的單一策略。' },
        { term: '納什均衡', def: '雙方都沒有誘因單方面改變策略的策略組合。' }
      ]
    },
    en: {
      intro: 'An oligopoly is dominated by a few firms whose strategies affect one another, so game theory is used. A dominant strategy is the best choice whatever the rival does; a Nash equilibrium is a strategy pair where neither side gains by changing alone. The prisoner\'s dilemma shows how individually rational choices can produce a worse collective outcome.',
      steps: [
        'List both players\' strategies and the payoffs of each pair.',
        'Compare cell by cell: when the rival picks each strategy, which choice is better for me?',
        'If one strategy is better whatever the rival does, it is the dominant strategy.',
        'Find the pair from which neither side wants to deviate — the Nash equilibrium.'
      ],
      example: 'Two firms choose high or low price. Both high earns HKD 10 each; if one cuts price, the cutter earns HKD 15 and the other HKD 5; both low earns HKD 6 each. Low price is better whatever the rival does, so it is each firm\'s dominant strategy and the Nash equilibrium is (low, low) with (HKD 6, HKD 6). Cooperating on high price would earn HKD 10 each — the prisoner\'s dilemma.',
      tip: 'Compare "what is best for me given each rival move" cell by cell; never assume the rival will cooperate.',
      mistake: 'Treating the Nash equilibrium as the best outcome for both. In a prisoner\'s dilemma the Nash equilibrium can be worse than cooperation.',
      glossary: [
        { term: 'Oligopoly', def: 'A market dominated by a few firms that interact strategically.' },
        { term: 'Dominant strategy', def: 'A strategy that is best regardless of what the rival chooses.' },
        { term: 'Nash equilibrium', def: 'A strategy pair from which neither player gains by changing alone.' }
      ]
    }
  },

  's5.price_discrimination': {
    zh: {
      intro: '價格歧視是同一廠商對同一貨品向不同顧客收取不同價格。條件是廠商有定價能力、市場可分隔、各市場需求彈性不同，且貨品不能轉售套利。一級向每人收其最高願付價，二級按購買量分段定價，三級按顧客類別分市場定價。',
      steps: [
        '確認市場可分隔、不同組別需求彈性不同，且不能轉售套利。',
        '分別寫出各市場的需求與 $MR$ 函數。',
        '各市場令 $MR = MC$ 求利潤最大化數量，再代回需求求價格。',
        '比較各市場價格與需求彈性：彈性較低者價格較高。'
      ],
      example: '兩個分隔市場：$P_1 = 100 - Q_1$、$P_2 = 60 - Q_2$，$MC = 20$ 元。市場 1：$MR_1 = 100 - 2Q_1 = 20$，得 $Q_1 = 40$、$P_1 = 60$ 元。市場 2：$MR_2 = 60 - 2Q_2 = 20$，得 $Q_2 = 20$、$P_2 = 40$ 元。需求較缺乏彈性的市場 1 價格較高。',
      tip: '先分市場，再各自 $MR = MC$；彈性較低的市場定價較高。',
      mistake: '以為價格歧視就是對所有人加價。它可以是向願付較高者收較高價、向價格敏感者收較低價。',
      glossary: [
        { term: '價格歧視', def: '同一廠商對同一貨品向不同顧客收取不同價格。' },
        { term: '三級價格歧視', def: '按可識別的顧客類別分開市場，各市場定不同價格。' },
        { term: '套利', def: '低價買入、高價轉售以賺取差價的行為。' }
      ]
    },
    en: {
      intro: 'Price discrimination means one firm charges different prices for the same good to different customers. The conditions are market power, separable markets with different demand elasticities, and no resale arbitrage. First-degree charges each buyer their maximum willingness to pay; second-degree uses quantity blocks; third-degree sets prices by customer group.',
      steps: [
        'Check that markets can be separated, elasticities differ and resale is impossible.',
        'Write the demand and MR functions for each market.',
        'In each market set $MR = MC$ to find the profit-maximising quantity, then read the price off demand.',
        'Compare prices and elasticities: the market with lower elasticity has the higher price.'
      ],
      example: 'Two separated markets: $P_1 = 100 - Q_1$ and $P_2 = 60 - Q_2$, with $MC = 20$ dollars. Market 1: $MR_1 = 100 - 2Q_1 = 20$, so $Q_1 = 40$ and $P_1 = 60$ dollars. Market 2: $MR_2 = 60 - 2Q_2 = 20$, so $Q_2 = 20$ and $P_2 = 40$ dollars. The less elastic market 1 has the higher price.',
      tip: 'Separate the markets first, then set $MR = MC$ in each; lower elasticity means a higher price.',
      mistake: 'Thinking price discrimination simply means raising prices for everyone. It can mean higher prices for those willing to pay more and lower prices for price-sensitive buyers.',
      glossary: [
        { term: 'Price discrimination', def: 'Charging different customers different prices for the same good.' },
        { term: 'Third-degree price discrimination', def: 'Dividing customers into identifiable groups and charging each group a different price.' },
        { term: 'Arbitrage', def: 'Buying low and reselling high to profit from a price difference.' }
      ]
    }
  },

  's5.surplus': {
    zh: {
      intro: '消費者盈餘是消費者願意付的最高價格與實際價格之差，圖上是需求曲線以下、價格以上的面積；生產者盈餘是實際價格與最低願意接受價格之差，即供應曲線以上、價格以下的面積。兩者合計為總盈餘，衡量市場交易的淨得益。',
      steps: [
        '先求均衡價格 $P$ 與均衡數量 $Q$。',
        '消費者盈餘 $CS = \\frac{1}{2} \\times Q \\times (a - P)$，a 為需求曲線的價格截距。',
        '生產者盈餘 $PS = \\frac{1}{2} \\times Q \\times (P - b)$，b 為供應曲線的價格截距。',
        '總盈餘 $TS = CS + PS$；若有干預，比較前後總盈餘的差額即無謂損失。'
      ],
      example: '需求 $Q_d = 100 - P$，供應 $Q_s = P$，均衡 $P = 50$ 元、$Q = 50$。消費者盈餘是 $\\frac{1}{2} \\times 50 \\times (100 - 50) = 1,250$ 元；生產者盈餘是 $\\frac{1}{2} \\times 50 \\times 50 = 1,250$ 元；總盈餘是 2,500元。',
      tip: '盈餘是圖上的面積，三角形用 ½ × 底 × 高；先畫圖再代入數字。',
      mistake: '把消費者盈餘當成消費者支付的總金額。它是「願意付 − 實際付」的差額，不是支出。',
      glossary: [
        { term: '消費者盈餘', def: '消費者願意付的最高價格與實際價格之差。' },
        { term: '生產者盈餘', def: '實際價格與生產者最低願意接受價格之差。' },
        { term: '總盈餘', def: '消費者盈餘與生產者盈餘之和。' }
      ]
    },
    en: {
      intro: 'Consumer surplus is the gap between what consumers are willing to pay and what they actually pay — the area below demand and above price. Producer surplus is the gap between the price received and the minimum acceptable price — the area above supply and below price. Their sum is total surplus, the net gain from market exchange.',
      steps: [
        'Find the equilibrium price P and quantity Q.',
        'Consumer surplus $CS = \\frac{1}{2} \\times Q \\times (a - P)$, where a is the demand price intercept.',
        'Producer surplus $PS = \\frac{1}{2} \\times Q \\times (P - b)$, where b is the supply price intercept.',
        'Total surplus $TS = CS + PS$; with intervention, the fall in total surplus is the deadweight loss.'
      ],
      example: 'Demand is $Q_d = 100 - P$ and supply is $Q_s = P$, so $P = 50$ dollars and $Q = 50$. Consumer surplus is $\\frac{1}{2} \\times 50 \\times (100 - 50) = 1,250$ dollars; producer surplus is $\\frac{1}{2} \\times 50 \\times 50 = 1,250$ dollars; total surplus is 2,500 dollars.',
      tip: 'Surplus is an area: use ½ × base × height for triangles and sketch the diagram before substituting.',
      mistake: 'Treating consumer surplus as the total amount consumers pay. It is the gap between willingness to pay and the price paid, not expenditure.',
      glossary: [
        { term: 'Consumer surplus', def: 'The difference between willingness to pay and the price actually paid.' },
        { term: 'Producer surplus', def: 'The difference between the price received and the minimum acceptable price.' },
        { term: 'Total surplus', def: 'The sum of consumer surplus and producer surplus.' }
      ]
    }
  }

,

  's5.tax_incidence': {
    zh: {
      intro: '從量稅是按每單位貨品徵收固定金額的稅，會令供應曲線向上移，幅度等於稅額。稅後價格上升，消費者與生產者分擔稅負；哪一方承擔較多，取決於供需彈性——彈性較低的一方承擔較多。除稅收外，產量減少亦造成無謂損失。',
      steps: [
        '先求無稅均衡價格 $P_0$ 與數量 $Q_0$。',
        '把從量稅寫進供應：$Q_s = P - t$（或 $P = Q_s + t$）。',
        '令 $Q_d = Q_s$ 解新均衡，求消費者價格 $P_c$ 與產量 $Q_t$。',
        '生產者實收 $P_p = P_c - t$；消費者稅負 $P_c - P_0$、生產者稅負 $P_0 - P_p$；稅收 $t \\times Q_t$。',
        '無謂損失是 $\\frac{1}{2} \\times t \\times (Q_0 - Q_t)$（線性供需下）。'
      ],
      example: '需求 $Q_d = 100 - P$，供應 $Q_s = P$，原均衡 $P = 50$ 元、$Q = 50$。政府徵收每單位 10元從量稅，供應變為 $Q_s = P - 10$。令 $100 - P = P - 10$，得消費者付 $P_c = 55$ 元、產量 $Q = 45$，生產者實收 $P_p = 45$ 元。消費者與生產者各承擔 5元；稅收是 $10 \\times 45 = 450$ 元；無謂損失是 $\\frac{1}{2} \\times 10 \\times (50 - 45) = 25$ 元。',
      tip: '法定納稅人不一定是稅負承擔者；彈性較低的一方承擔較多稅負。',
      mistake: '以為向賣方徵稅就全由賣方承擔。稅負歸宿由供需彈性決定，與法定納稅人無必然關係。',
      glossary: [
        { term: '從量稅', def: '按每單位貨品徵收固定金額的稅。' },
        { term: '稅負歸宿', def: '稅款最終由消費者與生產者分擔的比例。' },
        { term: '無謂損失', def: '稅項令交易量減少而損失的總盈餘。' }
      ]
    },
    en: {
      intro: 'A per-unit tax is a fixed amount charged on each unit, shifting the supply curve up by the tax. The price rises and consumers and producers share the burden; the side with the lower elasticity bears more. Besides raising revenue, the tax reduces quantity and creates deadweight loss.',
      steps: [
        'Find the no-tax equilibrium price $P_0$ and quantity $Q_0$.',
        'Build the tax into supply: $Q_s = P - t$ (or $P = Q_s + t$).',
        'Set $Q_d = Q_s$ to find the new consumer price $P_c$ and quantity $Q_t$.',
        'The producer receives $P_p = P_c - t$; burdens are $P_c - P_0$ and $P_0 - P_p$; tax revenue is $t \\times Q_t$.',
        'Deadweight loss is $\\frac{1}{2} \\times t \\times (Q_0 - Q_t)$ with linear demand and supply.'
      ],
      example: 'Demand $Q_d = 100 - P$ and supply $Q_s = P$ give an initial equilibrium of $P = 50$ dollars and $Q = 50$. A per-unit tax of 10 dollars makes supply $Q_s = P - 10$. Setting $100 - P = P - 10$ gives a consumer price $P_c = 55$ dollars and $Q = 45$, with producers receiving $P_p = 45$ dollars. Consumers and producers each bear 5 dollars; tax revenue is $10 \\times 45 = 450$ dollars; deadweight loss is $\\frac{1}{2} \\times 10 \\times (50 - 45) = 25$ dollars.',
      tip: 'The legal taxpayer is not necessarily the one who bears the burden; the less elastic side bears more.',
      mistake: 'Assuming a tax on sellers is fully borne by sellers. Incidence depends on the elasticities of demand and supply, not on who pays the tax legally.',
      glossary: [
        { term: 'Per-unit tax', def: 'A fixed amount of tax charged on each unit of a good.' },
        { term: 'Tax incidence', def: 'How the tax burden is divided between consumers and producers.' },
        { term: 'Deadweight loss', def: 'The total surplus lost because a tax reduces the quantity traded.' }
      ]
    }
  },

  's5.price_controls': {
    zh: {
      intro: '價格上限是法定最高價格，只有低於均衡價格時才有效（binding），會造成短缺；價格下限是法定最低價格，只有高於均衡價格時才有效，會造成盈餘。兩者都令交易量減少，可能造成無謂損失。',
      steps: [
        '先求均衡價格 $P$ 與均衡數量 $Q$。',
        '判斷是否有效：上限低於均衡／下限高於均衡才有效。',
        '把限價代入需求與供應函數，求 $Q_d$ 與 $Q_s$。',
        '實際交易量是 $\\min(Q_d, Q_s)$，差額就是短缺或盈餘。',
        '用需求與供應曲線之間的面積求無謂損失。'
      ],
      example: '需求 $Q_d = 100 - P$，供應 $Q_s = P$，均衡 $P = 50$ 元、$Q = 50$。若設價格上限 30元（低於均衡），$Q_d = 70$、$Q_s = 30$，短缺 40 單位，實際交易量只有 30。無謂損失是 $\\frac{1}{2} \\times (50 - 30) \\times (70 - 30) = 400$ 元。',
      tip: '先問「有沒有效」：上限要低於均衡才有效，下限要高於均衡才有效。',
      mistake: '以為價格上限一定令所有人買到便宜貨。短缺之下部分買家買不到，亦可能出現排隊或非價格競爭。',
      glossary: [
        { term: '價格上限', def: '政府規定的法定最高價格。' },
        { term: '價格下限', def: '政府規定的法定最低價格。' },
        { term: '有效（binding）', def: '限價低於／高於均衡而真正影響市場交易的情況。' }
      ]
    },
    en: {
      intro: 'A price ceiling is a legal maximum price and is binding only below the equilibrium, causing a shortage. A price floor is a legal minimum price and is binding only above the equilibrium, causing a surplus. Both reduce the quantity traded and can create deadweight loss.',
      steps: [
        'Find the equilibrium price $P$ and quantity $Q$.',
        'Check whether the control is binding: a ceiling must be below equilibrium, a floor above it.',
        'Substitute the controlled price into the demand and supply functions to find $Q_d$ and $Q_s$.',
        'Quantity traded is $\\min(Q_d, Q_s)$; the difference is the shortage or surplus.',
        'Find deadweight loss as the area between the demand and supply curves.'
      ],
      example: 'Demand $Q_d = 100 - P$ and supply $Q_s = P$ give $P = 50$ dollars and $Q = 50$. A price ceiling of HKD 30 (below equilibrium) gives $Q_d = 70$ and $Q_s = 30$, a shortage of 40 units, so only 30 units trade. Deadweight loss is $\\frac{1}{2} \\times (50 - 30) \\times (70 - 30) = 400$ dollars.',
      tip: 'First ask whether the control binds: a ceiling must be below equilibrium and a floor above it.',
      mistake: 'Thinking a price ceiling guarantees cheap goods for everyone. With a shortage, some buyers cannot get the good and non-price competition such as queuing may appear.',
      glossary: [
        { term: 'Price ceiling', def: 'A legal maximum price set by the government.' },
        { term: 'Price floor', def: 'A legal minimum price set by the government.' },
        { term: 'Binding', def: 'A price control set below or above equilibrium so that it actually affects the market.' }
      ]
    },
    visual: { kind: 'supplydemand', control: 'ceiling', desc: { zh: '價格上限設定於均衡價格之下', en: 'A price ceiling set below the equilibrium price' } }
  },

  's5.externality': {
    zh: {
      intro: '外部性是個人的生產或消費對第三者造成、卻未經市場價格反映的影響。負外部性令邊際社會成本高於邊際私人成本，市場產量高於社會最適；正外部性令邊際社會利益高於私人利益，市場產量低於社會最適。政府可用皮古稅（負外部性）或補貼（正外部性）矯正。',
      steps: [
        '分清 $MPC$、$MEC$，並求邊際社會成本 $MSC = MPC + MEC$。',
        '求私人市場均衡：令需求（私人利益）等於 $MPC$。',
        '求社會最適：$MSB = MSC$。',
        '皮古稅應等於社會最適產量下的邊際外部成本。',
        '無謂損失是 $\\frac{1}{2} \\times \\Delta Q \\times MEC$（$\\Delta Q$ 為私人產量減社會最適產量；線性近似）。'
      ],
      example: '工廠 $MPC = 10 + Q$，每單位污染的外部成本 $MEC = 6$ 元，需求（$MSB$）$P = 60 - Q$。市場均衡：$60 - Q = 10 + Q$，得 $Q = 25$。社會最適：$60 - Q = 10 + Q + 6$，得 $Q = 22$。皮古稅是 6元；無謂損失是 $\\frac{1}{2} \\times (25 - 22) \\times 6 = 9$ 元。',
      tip: '負外部性：私人產量 > 社會最適；正外部性：私人產量 < 社會最適。',
      mistake: '把 $MPC$ 當作 $MSC$。計算社會最適時要加上外部成本，$MSC = MPC + MEC$。',
      glossary: [
        { term: '外部性', def: '生產或消費對第三者造成、未經市場價格反映的影響。' },
        { term: '邊際社會成本', def: '多生產一單位對整個社會造成的成本，等於私人成本加外部成本。' },
        { term: '皮古稅', def: '按邊際外部成本徵收、用以矯正負外部性的稅。' }
      ]
    },
    en: {
      intro: 'An externality is a spillover from production or consumption onto third parties that market prices do not reflect. A negative externality makes marginal social cost exceed marginal private cost, so market output exceeds the social optimum; a positive externality makes marginal social benefit exceed private benefit, so market output falls short. Pigouvian taxes (negative) or subsidies (positive) can correct this.',
      steps: [
        'Identify $MPC$ and $MEC$, then find marginal social cost $MSC = MPC + MEC$.',
        'Find the private market equilibrium: demand (private benefit) equals $MPC$.',
        'Find the social optimum: $MSB = MSC$.',
        'The Pigouvian tax equals the marginal external cost at the social optimum.',
        'Deadweight loss is $\\frac{1}{2} \\times \\Delta Q \\times MEC$, where $\\Delta Q$ is private output minus the social optimum (linear approximation).'
      ],
      example: 'A factory has $MPC = 10 + Q$ and an external cost of $MEC = 6$ dollars per unit, while demand ($MSB$) is $P = 60 - Q$. The market equilibrium gives $60 - Q = 10 + Q$, so $Q = 25$. The social optimum gives $60 - Q = 10 + Q + 6$, so $Q = 22$. The Pigouvian tax is HKD 6 and deadweight loss is $\\frac{1}{2} \\times (25 - 22) \\times 6 = 9$ dollars.',
      tip: 'Negative externality: private output is above the social optimum; positive externality: private output is below it.',
      mistake: 'Using $MPC$ as $MSC$. The social optimum must include external cost, so $MSC = MPC + MEC$.',
      glossary: [
        { term: 'Externality', def: 'A spillover effect of production or consumption on third parties not reflected in market prices.' },
        { term: 'Marginal social cost', def: 'The cost to society of one more unit: private cost plus external cost.' },
        { term: 'Pigouvian tax', def: 'A tax equal to the marginal external cost, used to correct a negative externality.' }
      ]
    }
  },

  's5.public_goods': {
    zh: {
      intro: '公共財（public good）同時具備非競爭性（一人享用不減少他人可用量）與非排他性（無法阻止他人享用），例如國防與燈塔。私人生產者難以收費，出現搭便車問題，市場供應不足，構成市場失效。',      steps: ["檢查非競爭性：一人享用會否減少他人可享用的數量？", "檢查非排他性：生產者能否阻止他人享用？", "兩者兼備是公共財；競爭但非排他是共有資源；非競爭但排他是俱樂部財；兩者皆是私有財。"],

      example: '燈塔的燈光不會因多一艘船使用而減少（非競爭性），也難以阻止船隻使用（非排他性），所以是公共財。若由私人興建，船主可搭便車而不付費，結果燈塔數目低於社會所需。',
      tip: '公共財 ≠ 政府提供的財貨；要同時符合非競爭性與非排他性才是公共財。',
      mistake: '把「政府提供」等同「公共財」。政府提供的公屋單位既有排他性也有競爭性，屬私有財。',
      glossary: [
        { term: '公共財', def: '同時具備非競爭性與非排他性的財貨。' },
        { term: '搭便車', def: '不付費而享用財貨或服務的行為。' },
        { term: '共有資源', def: '具競爭性但非排他性的資源，容易過度使用。' }
      ]
    },
    en: {
      intro: 'A public good is both non-rival (one person\'s use does not reduce what others can consume) and non-excludable (no one can be prevented from consuming it), such as national defence or a lighthouse. Private producers cannot easily charge for it, so free-riding leads to under-provision — a market failure.',      steps: ["Check non-rivalry: does one person's use reduce what others can consume?", "Check non-excludability: can producers stop others from consuming it?", "Both mean a public good; rival but non-excludable is a common resource; non-rival but excludable is a club good; both rival and excludable is a private good."],

      example: 'A lighthouse\'s light is not reduced when one more ship uses it (non-rival), and ships cannot easily be excluded (non-excludable), so it is a public good. If privately built, shipowners could free-ride without paying, so too few lighthouses would be provided.',
      tip: 'A public good is not the same as a good provided by the government; it must be both non-rival and non-excludable.',
      mistake: 'Equating "government-provided" with "public good". A public housing flat provided by the government is rival and excludable, so it is a private good.',
      glossary: [
        { term: 'Public good', def: 'A good that is both non-rival and non-excludable.' },
        { term: 'Free-rider', def: 'A person who enjoys a good or service without paying for it.' },
        { term: 'Common resource', def: 'A resource that is rival but non-excludable, so it tends to be overused.' }
      ]
    }
  },

  's5.factor_markets': {
    zh: {
      intro: '要素市場的價格（工資、租金、利息）由要素需求與供應決定。勞動需求是引伸需求，取決於勞工的邊際產值 MRP；勞動供應一般向上傾斜。均衡工資由勞動供求決定；最低工資若高於均衡，在競爭模型下會造成勞動過剩（失業）。',
      steps: [
        '令勞動需求等於勞動供應，求均衡工資 $W$ 與就業量 $L$。',
        '若最低工資高於均衡，把最低工資代入需求與供應函數。',
        '需求量與供應量的差額就是勞動過剩（失業）。',
        '比較最低工資與均衡工資，判斷最低工資是否有約束力。'
      ],
      example: '勞動需求 $W = 200 - 2L$，勞動供應 $W = 20 + 2L$。均衡：$200 - 2L = 20 + 2L$，得 $L = 45$、$W = 110$ 元。若法定最低工資為 130元，需求 $L = 35$、供應 $L = 55$，勞動過剩 20 人（在完全競爭模型下）。',
      tip: '最低工資要高於均衡工資才有約束力；等於或低於均衡時不影響就業。',
      mistake: '以為最低工資一定增加就業。競爭模型下，高於均衡的最低工資會減少就業；實際效果還取決於市場結構、需求彈性與覆蓋範圍。',
      glossary: [
        { term: '引伸需求', def: '對生產要素的需求源自對其產品的需求。' },
        { term: '邊際產值', def: '多僱用一單位要素所增加的總收入。' },
        { term: '均衡工資', def: '勞動需求量等於勞動供應量時的工資。' }
      ]
    },
    en: {
      intro: 'Factor prices (wages, rent, interest) are determined by factor demand and supply. Labour demand is a derived demand based on workers\' marginal revenue product (MRP), and labour supply generally slopes upward. The equilibrium wage clears the labour market; a minimum wage set above equilibrium creates excess labour (unemployment) in the competitive model.',
      steps: [
        'Set labour demand equal to labour supply to find the equilibrium wage $W$ and employment $L$.',
        'If a minimum wage is above equilibrium, substitute it into the demand and supply functions.',
        'The gap between quantity supplied and quantity demanded is excess labour (unemployment).',
        'Compare the minimum wage with the equilibrium wage to see whether it binds.'
      ],
      example: 'Labour demand is $W = 200 - 2L$ and labour supply is $W = 20 + 2L$. Equilibrium gives $200 - 2L = 20 + 2L$, so $L = 45$ and $W = 110$ dollars. With a minimum wage of HKD 130, demand is $L = 35$ and supply is $L = 55$, creating excess labour of 20 workers in the competitive model.',
      tip: 'A minimum wage only binds if it is above the equilibrium wage; at or below equilibrium it does not affect employment.',
      mistake: 'Assuming a minimum wage always raises employment. In the competitive model a wage above equilibrium reduces employment; actual effects also depend on market structure, demand elasticity and coverage.',
      glossary: [
        { term: 'Derived demand', def: 'Demand for a factor of production that arises from demand for its output.' },
        { term: 'Marginal revenue product', def: 'The extra total revenue from employing one more unit of a factor.' },
        { term: 'Equilibrium wage', def: 'The wage at which quantity of labour demanded equals quantity supplied.' }
      ]
    }
  }

});

EconData.addBanks({

  's4.positive_normative': [
    {
      id: 'pn1',
      prompt: { zh: '以下哪一項是規範陳述？', en: 'Which of the following is a normative statement?' },
      choices: [
        { id: 'a', zh: '某地的最低工資令青年失業率上升。', en: 'A minimum wage in a certain place raises youth unemployment.' },
        { id: 'b', zh: '政府應該把最低工資提高至每小時 50元。', en: 'The government should raise the minimum wage to HKD 50 per hour.' },
        { id: 'c', zh: '最低工資是一項價格下限。', en: 'A minimum wage is a price floor.' },
        { id: 'd', zh: '某地的最低工資是每小時 40元。', en: 'The minimum wage in a certain place is HKD 40 per hour.' }
      ],
      answer: 'b',
      hint: { zh: '找含有「應該」等價值判斷的陳述。', en: 'Look for a statement containing a value judgement such as "should".' },
      solution: {
        zh: [
          '實證陳述描述事實，可用數據檢驗；規範陳述涉及價值判斷，不能單靠事實檢驗。',
          '「政府應該把最低工資提高至每小時 50元」是價值判斷，故選 b。',
          'a、c、d 都描述可用事實檢驗的情況，屬實證陳述。'
        ],
        en: [
          'Positive statements describe facts and can be tested with data; normative statements involve value judgements that facts alone cannot settle.',
          '"The government should raise the minimum wage to HKD 50 per hour" is a value judgement, so b is correct.',
          'a, c and d all describe situations that can be checked against facts, so they are positive statements.'
        ]
      }
    },
    {
      id: 'pn2',
      prompt: { zh: '以下哪一項是實證陳述？', en: 'Which of the following is a positive statement?' },
      choices: [
        { id: 'a', zh: '政府應該削減利得稅。', en: 'The government should cut profits tax.' },
        { id: 'b', zh: '削減利得稅會令企業投資增加。', en: 'Cutting profits tax will increase business investment.' },
        { id: 'c', zh: '貧富差距擴大是不公平的。', en: 'A widening income gap is unfair.' },
        { id: 'd', zh: '政府應擴大公共開支。', en: 'The government should increase public spending.' }
      ],
      answer: 'b',
      hint: { zh: '實證陳述可以用數據檢驗真偽。', en: 'A positive statement can be tested against data.' },
      solution: {
        zh: [
          '「削減利得稅會令企業投資增加」提出可觀察、可檢驗的因果關係，故是實證陳述。',
          'a、c、d 都含「應該」或「不公平」等價值判斷，屬規範陳述。',
          '因此答案為 b。'
        ],
        en: [
          '"Cutting profits tax will increase business investment" makes an observable, testable causal claim, so it is positive.',
          'a, c and d contain value judgements such as "should" or "unfair", so they are normative.',
          'The answer is therefore b.'
        ]
      }
    },
    {
      id: 'pn3',
      prompt: { zh: '以下哪一項陳述可以用事實或數據檢驗？', en: 'Which of the following statements can be tested with facts or data?' },
      choices: [
        { id: 'a', zh: '通脹率上升會降低實質收入。', en: 'A rise in the inflation rate reduces real income.' },
        { id: 'b', zh: '政府應該控制通脹。', en: 'The government should control inflation.' },
        { id: 'c', zh: '高通脹對窮人不公平。', en: 'High inflation is unfair to the poor.' },
        { id: 'd', zh: '物價穩定是最理想的目標。', en: 'Price stability is the most desirable goal.' }
      ],
      answer: 'a',
      hint: { zh: '問一問：這句可否用數據證明對錯？', en: 'Ask: can data prove this statement right or wrong?' },
      solution: {
        zh: [
          '「通脹率上升會降低實質收入」是可檢驗的因果關係，屬實證陳述。',
          'b、c、d 分別涉及「應該」、「公平」與「最理想」的價值判斷，不能單靠數據檢驗。',
          '因此答案為 a。'
        ],
        en: [
          '"A rise in the inflation rate reduces real income" is a testable causal claim, so it is positive.',
          'b, c and d involve value judgements about "should", "fair" and "most desirable", which data alone cannot settle.',
          'The answer is therefore a.'
        ]
      }
    },
    {
      id: 'pn4',
      prompt: { zh: '以下哪一項「不是」實證陳述？', en: 'Which of the following is NOT a positive statement?' },
      choices: [
        { id: 'a', zh: '增加煙稅會減少香煙銷量。', en: 'Raising tobacco tax reduces cigarette sales.' },
        { id: 'b', zh: '吸煙會增加患病風險。', en: 'Smoking increases the risk of illness.' },
        { id: 'c', zh: '政府應全面禁止吸煙。', en: 'The government should ban smoking completely.' },
        { id: 'd', zh: '煙稅是一項間接稅。', en: 'Tobacco tax is an indirect tax.' }
      ],
      answer: 'c',
      hint: { zh: '哪一項涉及「應該」的價值判斷？', en: 'Which option contains a "should" value judgement?' },
      solution: {
        zh: [
          '「政府應全面禁止吸煙」是價值判斷，屬規範陳述。',
          'a、b、d 都可用數據或定義檢驗，屬實證陳述。',
          '題目問「不是」實證陳述，故答案為 c。'
        ],
        en: [
          '"The government should ban smoking completely" is a value judgement, so it is normative.',
          'a, b and d can be checked with data or definitions, so they are positive.',
          'The question asks for what is NOT positive, so the answer is c.'
        ]
      }
    },
    {
      id: 'pn5',
      prompt: {
        zh: '甲說：「失業率升至 5%，所以政府應該創造就業。」以下哪項最能描述甲的陳述？',
        en: 'Person A says: "The unemployment rate has risen to 5%, so the government should create jobs." Which best describes Person A\'s statement?'
      },
      choices: [
        { id: 'a', zh: '整句都是實證陳述。', en: 'The whole statement is positive.' },
        { id: 'b', zh: '整句都是規範陳述。', en: 'The whole statement is normative.' },
        { id: 'c', zh: '前半是實證陳述，後半是規範陳述。', en: 'The first half is positive and the second half is normative.' },
        { id: 'd', zh: '前半是規範陳述，後半是實證陳述。', en: 'The first half is normative and the second half is positive.' }
      ],
      answer: 'c',
      hint: { zh: '把句子分成兩部分，分別問「可否用事實檢驗」。', en: 'Split the sentence in two and ask whether each part can be tested by facts.' },
      solution: {
        zh: [
          '「失業率升至 5%」可用數據檢驗，是實證陳述。',
          '「政府應該創造就業」是價值判斷，是規範陳述。',
          '所以前半實證、後半規範，答案為 c。'
        ],
        en: [
          '"The unemployment rate has risen to 5%" can be checked with data, so it is positive.',
          '"The government should create jobs" is a value judgement, so it is normative.',
          'The first half is positive and the second half normative, so the answer is c.'
        ]
      }
    },
    {
      id: 'pn6',
      prompt: { zh: '以下哪一項陳述「不能」用事實推翻？', en: 'Which of the following statements CANNOT be refuted by facts?' },
      choices: [
        { id: 'a', zh: '增加福利開支會令政府赤字擴大。', en: 'Higher welfare spending widens the government deficit.' },
        { id: 'b', zh: '政府應增加福利開支。', en: 'The government should increase welfare spending.' },
        { id: 'c', zh: '削減福利開支會令貧窮率上升。', en: 'Cutting welfare spending raises the poverty rate.' },
        { id: 'd', zh: '福利開支屬於政府轉移支付。', en: 'Welfare spending is a government transfer payment.' }
      ],
      answer: 'b',
      hint: { zh: '規範陳述不能單靠事實判定對錯。', en: 'A normative statement cannot be judged true or false by facts alone.' },
      solution: {
        zh: [
          '「政府應增加福利開支」是價值判斷，數據不能證明「應該」或「不應該」。',
          'a、c 是可檢驗的因果預測，d 是可核對的定義，三者都能被事實推翻。',
          '因此答案為 b。'
        ],
        en: [
          '"The government should increase welfare spending" is a value judgement; data cannot prove what "should" be done.',
          'a and c are testable causal predictions and d is a checkable definition, so all three can be refuted by facts.',
          'The answer is therefore b.'
        ]
      }
    },
    {
      id: 'pn7',
      prompt: { zh: '以下哪一項關於價格上限的陳述是實證陳述？', en: 'Which of the following statements about a price ceiling is positive?' },
      choices: [
        { id: 'a', zh: '價格上限若定於均衡價格之下，會出現短缺。', en: 'If a price ceiling is set below the equilibrium price, a shortage results.' },
        { id: 'b', zh: '政府應該取消租金管制。', en: 'The government should abolish rent control.' },
        { id: 'c', zh: '租金管制對業主不公平。', en: 'Rent control is unfair to landlords.' },
        { id: 'd', zh: '社會應優先照顧低收入租客。', en: 'Society should give priority to low-income tenants.' }
      ],
      answer: 'a',
      hint: { zh: '哪一項只是在描述價格上限的市場後果？', en: 'Which option merely describes a market consequence of a price ceiling?' },
      solution: {
        zh: [
          'a 描述「上限低於均衡會造成短缺」這個可檢驗的市場後果，屬實證陳述。',
          'b、c、d 都含「應該」或「公平」等價值判斷，屬規範陳述。',
          '因此答案為 a。'
        ],
        en: [
          'a describes a testable market consequence: a ceiling below equilibrium causes a shortage, so it is positive.',
          'b, c and d contain value judgements about "should" or "fair", so they are normative.',
          'The answer is therefore a.'
        ]
      }
    },
    {
      id: 'pn8',
      prompt: {
        zh: '陳述 I：「提高最低工資會增加失業。」陳述 II：「最低工資水平過高是不公平的。」以下哪項正確？',
        en: 'Statement I: "Raising the minimum wage increases unemployment." Statement II: "A minimum wage that is too high is unfair." Which is correct?'
      },
      choices: [
        { id: 'a', zh: 'I 是實證陳述，II 是實證陳述。', en: 'I is positive and II is positive.' },
        { id: 'b', zh: 'I 是規範陳述，II 是規範陳述。', en: 'I is normative and II is normative.' },
        { id: 'c', zh: 'I 是實證陳述，II 是規範陳述。', en: 'I is positive and II is normative.' },
        { id: 'd', zh: 'I 是規範陳述，II 是實證陳述。', en: 'I is normative and II is positive.' }
      ],
      answer: 'c',
      hint: { zh: 'I 是因果預測；II 用了「公平」這個價值判斷。', en: 'I is a causal prediction; II uses the value judgement "unfair".' },
      solution: {
        zh: [
          '陳述 I 是可檢驗的因果預測，屬實證陳述。',
          '陳述 II 以「公平」作價值判斷，屬規範陳述。',
          '因此 I 實證、II 規範，答案為 c。'
        ],
        en: [
          'Statement I is a testable causal prediction, so it is positive.',
          'Statement II makes a value judgement about fairness, so it is normative.',
          'Thus I is positive and II is normative, so the answer is c.'
        ]
      }
    }
  ],

  's4.economic_questions': [
    {
      id: 'eq1',
      prompt: { zh: '一間餐廳決定在餐牌上加入素食菜式。這主要回答哪一個基本經濟問題？', en: 'A restaurant decides to add vegetarian dishes to its menu. Which basic economic question does this mainly answer?' },
      choices: [
        { id: 'a', zh: '生產甚麼', en: 'What to produce' },
        { id: 'b', zh: '怎樣生產', en: 'How to produce' },
        { id: 'c', zh: '為誰生產', en: 'For whom to produce' },
        { id: 'd', zh: '何時生產', en: 'When to produce' }
      ],
      answer: 'a',
      hint: { zh: '餐牌決定的是「產品」的種類。', en: 'The menu decides the type of product.' },
      solution: {
        zh: [
          '三個基本經濟問題是生產甚麼、怎樣生產、為誰生產。',
          '加入素食菜式是決定生產哪一種產品，屬「生產甚麼」。',
          '因此答案為 a。'
        ],
        en: [
          'The three basic economic questions are what, how and for whom to produce.',
          'Adding vegetarian dishes decides which product to make, which is "what to produce".',
          'The answer is therefore a.'
        ]
      }
    },
    {
      id: 'eq2',
      prompt: { zh: '一間工廠改用機械臂代替人手包裝。這主要回答哪一個基本經濟問題？', en: 'A factory replaces manual packing with robotic arms. Which basic economic question does this mainly answer?' },
      choices: [
        { id: 'a', zh: '生產甚麼', en: 'What to produce' },
        { id: 'b', zh: '怎樣生產', en: 'How to produce' },
        { id: 'c', zh: '為誰生產', en: 'For whom to produce' },
        { id: 'd', zh: '為何生產', en: 'Why to produce' }
      ],
      answer: 'b',
      hint: { zh: '選擇生產方法與投入組合，屬於「怎樣生產」。', en: 'Choosing the production method and input mix is a "how" decision.' },
      solution: {
        zh: [
          '「怎樣生產」指用甚麼技術與生產要素組合來生產。',
          '用機械臂代替人手是改變生產方法，屬「怎樣生產」。',
          '因此答案為 b。'
        ],
        en: [
          '"How to produce" refers to the technology and mix of inputs used.',
          'Replacing workers with robotic arms changes the production method, so it is "how to produce".',
          'The answer is therefore b.'
        ]
      }
    },
    {
      id: 'eq3',
      prompt: { zh: '政府把公屋單位優先編配給低收入家庭。這主要回答哪一個基本經濟問題？', en: 'The government allocates public housing flats to low-income families first. Which basic economic question does this mainly answer?' },
      choices: [
        { id: 'a', zh: '生產甚麼', en: 'What to produce' },
        { id: 'b', zh: '怎樣生產', en: 'How to produce' },
        { id: 'c', zh: '為誰生產', en: 'For whom to produce' },
        { id: 'd', zh: '何時生產', en: 'When to produce' }
      ],
      answer: 'c',
      hint: { zh: '決定誰可得到產品，屬於「為誰生產」。', en: 'Deciding who gets the output is the "for whom" question.' },
      solution: {
        zh: [
          '「為誰生產」問的是產品分配給哪些人。',
          '優先編配公屋給低收入家庭是決定受益的對象，屬「為誰生產」。',
          '因此答案為 c。'
        ],
        en: [
          '"For whom to produce" asks who receives the output.',
          'Giving priority to low-income families decides the beneficiaries, so it is "for whom to produce".',
          'The answer is therefore c.'
        ]
      }
    },
    {
      id: 'eq4',
      prompt: { zh: '在市場經濟中，資源分配主要由甚麼引導？', en: 'In a market economy, what mainly guides the allocation of resources?' },
      choices: [
        { id: 'a', zh: '政府的年度計劃', en: 'The government\'s annual plan' },
        { id: 'b', zh: '價格機制', en: 'The price mechanism' },
        { id: 'c', zh: '傳統習俗', en: 'Tradition and custom' },
        { id: 'd', zh: '抽籤', en: 'Drawing lots' }
      ],
      answer: 'b',
      hint: { zh: '市場經濟靠價格與利潤傳遞信息。', en: 'A market economy relies on prices and profits to transmit information.' },
      solution: {
        zh: [
          '市場經濟由私人生產者與消費者參與，價格隨供求變動。',
          '價格上升吸引資源流入，價格下跌令資源流出，這就是價格機制。',
          '因此答案為 b。'
        ],
        en: [
          'A market economy involves private producers and consumers, with prices changing with demand and supply.',
          'Rising prices attract resources and falling prices release them — this is the price mechanism.',
          'The answer is therefore b.'
        ]
      }
    },
    {
      id: 'eq5',
      prompt: { zh: '以下哪一項是計劃經濟的特徵？', en: 'Which of the following is a feature of a planned economy?' },
      choices: [
        { id: 'a', zh: '生產由中央計劃決定', en: 'Production is decided by central planning' },
        { id: 'b', zh: '價格主要由供求決定', en: 'Prices are mainly determined by demand and supply' },
        { id: 'c', zh: '大部分生產資料由私人擁有', en: 'Most means of production are privately owned' },
        { id: 'd', zh: '廠商以利潤極大化為主要目標', en: 'Firms mainly aim to maximise profit' }
      ],
      answer: 'a',
      hint: { zh: '計劃經濟由政府的中央計劃回答三個基本問題。', en: 'In a planned economy, central government planning answers the three basic questions.' },
      solution: {
        zh: [
          '計劃經濟由中央計劃決定生產甚麼、怎樣生產及為誰生產。',
          'b、c、d 都是市場經濟的常見特徵。',
          '因此答案為 a。'
        ],
        en: [
          'In a planned economy, central planning decides what, how and for whom to produce.',
          'b, c and d are typical features of a market economy.',
          'The answer is therefore a.'
        ]
      }
    },
    {
      id: 'eq6',
      prompt: { zh: '三個基本經濟問題的共同根源是甚麼？', en: 'What is the common root of the three basic economic questions?' },
      choices: [
        { id: 'a', zh: '通貨膨脹', en: 'Inflation' },
        { id: 'b', zh: '失業', en: 'Unemployment' },
        { id: 'c', zh: '稀少性', en: 'Scarcity' },
        { id: 'd', zh: '政府干預', en: 'Government intervention' }
      ],
      answer: 'c',
      hint: { zh: '若資源無限，就不必選擇。', en: 'If resources were unlimited, no choices would be needed.' },
      solution: {
        zh: [
          '資源有限而慾望無限，令社會必須選擇。',
          '有選擇就要決定生產甚麼、怎樣生產、為誰生產，所以根源是稀少性。',
          '因此答案為 c。'
        ],
        en: [
          'Limited resources and unlimited wants force society to choose.',
          'Choice requires deciding what, how and for whom to produce, so the root is scarcity.',
          'The answer is therefore c.'
        ]
      }
    },
    {
      id: 'eq7',
      prompt: { zh: '以下哪項最準確描述混合經濟？', en: 'Which best describes a mixed economy?' },
      choices: [
        { id: 'a', zh: '完全由政府擁有及分配資源', en: 'The government owns and allocates all resources' },
        { id: 'b', zh: '完全由市場價格分配資源', en: 'Market prices alone allocate all resources' },
        { id: 'c', zh: '市場與政府共同參與資源分配', en: 'Both markets and government allocate resources' },
        { id: 'd', zh: '完全沒有私營企業', en: 'There are no private firms' }
      ],
      answer: 'c',
      hint: { zh: '混合經濟同時有市場機制與政府角色。', en: 'A mixed economy has both market mechanisms and a government role.' },
      solution: {
        zh: [
          '混合經濟既讓市場價格引導大部分資源，也由政府提供公共財與規管。',
          'a 與 b 是純計劃經濟與純市場經濟的描述，d 亦不符。',
          '因此答案為 c。'
        ],
        en: [
          'In a mixed economy, market prices guide most resources while the government provides public goods and regulates.',
          'a and b describe a purely planned and a purely market economy, and d is also incorrect.',
          'The answer is therefore c.'
        ]
      }
    },
    {
      id: 'eq8',
      prompt: { zh: '以下哪一項「不屬於」「怎樣生產」的決定？', en: 'Which of the following is NOT a "how to produce" decision?' },
      choices: [
        { id: 'a', zh: '用機器還是人手完成工序', en: 'Whether to use machines or workers for a task' },
        { id: 'b', zh: '把工序外判還是自行生產', en: 'Whether to outsource production or make it in-house' },
        { id: 'c', zh: '決定生產哪一種產品', en: 'Which product to produce' },
        { id: 'd', zh: '用本地還是進口原料', en: 'Whether to use local or imported materials' }
      ],
      answer: 'c',
      hint: { zh: '「怎樣生產」關乎方法與投入，不關乎產品種類。', en: '"How to produce" concerns methods and inputs, not the type of product.' },
      solution: {
        zh: [
          '「怎樣生產」問用甚麼技術、工序與投入組合。',
          'a、b、d 都關乎生產方法與投入選擇；c 選擇產品種類，屬「生產甚麼」。',
          '因此答案為 c。'
        ],
        en: [
          '"How to produce" asks about technology, processes and the input mix.',
          'a, b and d all concern production methods and inputs; c chooses the product type, which is "what to produce".',
          'The answer is therefore c.'
        ]
      }
    }
  ],

  's4.production': [
    {
      id: 'pr1',
      prompt: { zh: '以下哪一項「不是」生產要素？', en: 'Which of the following is NOT a factor of production?' },
      choices: [
        { id: 'a', zh: '土地', en: 'Land' },
        { id: 'b', zh: '勞力', en: 'Labour' },
        { id: 'c', zh: '金錢', en: 'Money' },
        { id: 'd', zh: '企業家才能', en: 'Entrepreneurship' }
      ],
      answer: 'c',
      hint: { zh: '生產要素是直接用於生產的資源。', en: 'Factors of production are resources used directly in production.' },
      solution: {
        zh: [
          '四種生產要素是土地、勞力、資本與企業家才能。',
          '金錢是交易媒介與金融資產，不是直接用於生產的資源。',
          '因此答案為 c。'
        ],
        en: [
          'The four factors of production are land, labour, capital and entrepreneurship.',
          'Money is a medium of exchange and a financial asset, not a resource used directly in production.',
          'The answer is therefore c.'
        ]
      }
    },
    {
      id: 'pr2',
      prompt: { zh: '以下哪一項屬於資本（capital）？', en: 'Which of the following is capital?' },
      choices: [
        { id: 'a', zh: '工廠裡的機器', en: 'Machines in a factory' },
        { id: 'b', zh: '銀行存款', en: 'Bank deposits' },
        { id: 'c', zh: '現金', en: 'Cash' },
        { id: 'd', zh: '股票', en: 'Shares' }
      ],
      answer: 'a',
      hint: { zh: '資本是「生產出來的生產工具」。', en: 'Capital means produced means of production.' },
      solution: {
        zh: [
          '資本是指機器、工具、廠房等生產出來的生產工具。',
          'b、c、d 都是金融資產，不是直接用於生產的工具。',
          '因此答案為 a。'
        ],
        en: [
          'Capital refers to produced means of production such as machines, tools and factories.',
          'b, c and d are financial assets, not tools used directly in production.',
          'The answer is therefore a.'
        ]
      }
    },
    {
      id: 'pr3',
      prompt: { zh: '企業家才能的主要功能是甚麼？', en: 'What is the main function of entrepreneurship?' },
      choices: [
        { id: 'a', zh: '提供土地', en: 'Providing land' },
        { id: 'b', zh: '組織其他生產要素並承擔風險', en: 'Organising the other factors of production and bearing risk' },
        { id: 'c', zh: '提供機器', en: 'Providing machines' },
        { id: 'd', zh: '提供勞力', en: 'Providing labour' }
      ],
      answer: 'b',
      hint: { zh: '企業家把土地、勞力與資本組合起來，並承受虧損風險。', en: 'The entrepreneur combines land, labour and capital and bears the risk of loss.' },
      solution: {
        zh: [
          '企業家才能是組織土地、勞力與資本、決定生產方向的能力。',
          '企業家亦要承擔經營風險，故 b 正確。',
          'a、c、d 分別是土地、資本與勞力的功能，故答案為 b。'
        ],
        en: [
          'Entrepreneurship is the ability to organise land, labour and capital and decide what to produce.',
          'Entrepreneurs also bear business risk, so b is correct.',
          'a, c and d describe the functions of land, capital and labour, so the answer is b.'
        ]
      }
    },
    {
      id: 'pr4',
      prompt: { zh: '分工（專業化）通常帶來甚麼好處？', en: 'What benefit does division of labour (specialisation) usually bring?' },
      choices: [
        { id: 'a', zh: '工人熟練程度提高，生產力上升', en: 'Workers become more skilled and productivity rises' },
        { id: 'b', zh: '減少對機器的需求', en: 'It reduces the need for machines' },
        { id: 'c', zh: '每名工人生產所有工序', en: 'Each worker performs every task' },
        { id: 'd', zh: '完全消除協調成本', en: 'It removes coordination costs entirely' }
      ],
      answer: 'a',
      hint: { zh: '專業化令工人重複做同一工序，技術更熟練。', en: 'Specialisation lets workers repeat one task and become more skilled.' },
      solution: {
        zh: [
          '分工讓工人專注單一工序，熟能生巧，並可節省轉換工序的時間，提高生產力。',
          '分工反而可能增加對機器的使用與協調成本，故 b、d 錯。',
          'c 與分工相反，故答案為 a。'
        ],
        en: [
          'Division of labour lets workers focus on one task, become more skilled and save switching time, raising productivity.',
          'It may actually increase machine use and coordination costs, so b and d are wrong.',
          'c is the opposite of specialisation, so the answer is a.'
        ]
      }
    },
    {
      id: 'pr5',
      prompt: { zh: '以下哪一項是分工的局限？', en: 'Which of the following is a limitation of division of labour?' },
      choices: [
        { id: 'a', zh: '工人技能變得單一，轉職較困難', en: 'Workers become narrowly skilled and find it harder to change jobs' },
        { id: 'b', zh: '生產力必然下降', en: 'Productivity must fall' },
        { id: 'c', zh: '產品種類會自動增加', en: 'The variety of products automatically increases' },
        { id: 'd', zh: '生產過程不再需要管理', en: 'Production no longer needs management' }
      ],
      answer: 'a',
      hint: { zh: '分工提高效率，卻令工人只懂個別工序。', en: 'Division of labour raises efficiency but leaves workers knowing only one task.' },
      solution: {
        zh: [
          '分工令工人長期只做單一工序，技能單一，轉職或適應新工作較難。',
          '分工通常提高而非降低生產力，也需要更多協調與管理，故 b、d 錯。',
          'c 並非分工的直接結果，故答案為 a。'
        ],
        en: [
          'Specialised workers repeat one task, so their skills are narrow and switching jobs is harder.',
          'Division of labour usually raises productivity and needs more coordination and management, so b and d are wrong.',
          'c is not a direct result of specialisation, so the answer is a.'
        ]
      }
    },
    {
      id: 'pr6',
      prompt: { zh: '以下哪一項屬於第一級生產（primary production）？', en: 'Which of the following is primary production?' },
      choices: [
        { id: 'a', zh: '種植蔬菜', en: 'Growing vegetables' },
        { id: 'b', zh: '麵包店烘焙麵包', en: 'Baking bread in a bakery' },
        { id: 'c', zh: '銀行提供貸款服務', en: 'A bank providing loans' },
        { id: 'd', zh: '維修手機', en: 'Repairing mobile phones' }
      ],
      answer: 'a',
      hint: { zh: '第一級生產直接從自然資源取得產物。', en: 'Primary production extracts output directly from nature.' },
      solution: {
        zh: [
          '第一級生產包括農業、漁業、採礦等直接取自自然的活動。',
          '烘焙屬第二級（製造），銀行服務與維修屬第三級（服務）。',
          '因此答案為 a。'
        ],
        en: [
          'Primary production includes farming, fishing and mining, which take output directly from nature.',
          'Baking is secondary (manufacturing); banking and repair are tertiary (services).',
          'The answer is therefore a.'
        ]
      }
    },
    {
      id: 'pr7',
      prompt: { zh: '在固定機器下不斷增加工人，邊際報酬最終遞減，主要原因是甚麼？', en: 'When more workers are added to fixed machinery, marginal returns eventually diminish mainly because…' },
      choices: [
        { id: 'a', zh: '固定要素不足，每名工人可用的資本減少', en: 'The fixed factor is limited, so each worker has less capital to work with' },
        { id: 'b', zh: '工人變得懶惰', en: 'Workers become lazy' },
        { id: 'c', zh: '工資上升', en: 'Wages rise' },
        { id: 'd', zh: '產品價格下跌', en: 'Product prices fall' }
      ],
      answer: 'a',
      hint: { zh: '邊際報酬遞減源於固定要素與可變要素的比例。', en: 'Diminishing marginal returns come from the ratio of fixed to variable factors.' },
      solution: {
        zh: [
          '短期內機器（固定要素）數量不變，工人增加令每人可分到的資本減少。',
          '因此每名新增工人的邊際產量最終下降，這就是邊際報酬遞減。',
          '工資與價格變動不影響邊際產量，故答案為 a。'
        ],
        en: [
          'In the short run the machines (fixed factor) are unchanged, so extra workers have less capital each.',
          'The marginal product of each additional worker eventually falls — diminishing marginal returns.',
          'Wage and price changes do not cause this fall in marginal product, so the answer is a.'
        ]
      }
    },
    {
      id: 'pr8',
      prompt: { zh: '以下哪項生產要素與回報的配對正確？', en: 'Which pairing of factors of production and their returns is correct?' },
      choices: [
        { id: 'a', zh: '土地—租金、勞力—工資、資本—利息', en: 'Land—rent, labour—wages, capital—interest' },
        { id: 'b', zh: '土地—工資、勞力—租金、資本—利潤', en: 'Land—wages, labour—rent, capital—profit' },
        { id: 'c', zh: '土地—利息、勞力—利潤、資本—租金', en: 'Land—interest, labour—profit, capital—rent' },
        { id: 'd', zh: '土地—利潤、勞力—利息、資本—工資', en: 'Land—profit, labour—interest, capital—wages' }
      ],
      answer: 'a',
      hint: { zh: '土地收租、工人收工資、資本收利息、企業家收利潤。', en: 'Land earns rent, labour earns wages, capital earns interest and entrepreneurship earns profit.' },
      solution: {
        zh: [
          '要素市場中，土地的回報是租金，勞力的回報是工資。',
          '資本的回報是利息，企業家才能的回報是利潤。',
          '因此 a 正確。'
        ],
        en: [
          'In factor markets, land earns rent and labour earns wages.',
          'Capital earns interest and entrepreneurship earns profit.',
          'Therefore a is correct.'
        ]
      }
    }
  ],

  's5.public_goods': [
    {
      id: 'pg1',
      prompt: { zh: '公共財的兩個主要特徵是甚麼？', en: 'What are the two main characteristics of a public good?' },
      choices: [
        { id: 'a', zh: '非競爭性與非排他性', en: 'Non-rivalry and non-excludability' },
        { id: 'b', zh: '由政府生產與免費提供', en: 'Produced by the government and provided free' },
        { id: 'c', zh: '競爭性與排他性', en: 'Rivalry and excludability' },
        { id: 'd', zh: '由私人市場提供與收費', en: 'Provided by private markets at a price' }
      ],
      answer: 'a',
      hint: { zh: '一人享用不減少他人享用，亦無法阻止他人享用。', en: 'One person\'s use does not reduce others\' use, and others cannot be excluded.' },
      solution: {
        zh: [
          '非競爭性：一人享用不減少他人可享用的數量；非排他性：無法阻止他人享用。',
          '由政府生產或免費提供並非定義的一部分，故 b 錯。',
          'c、d 分別描述私有財與市場提供的財貨，故答案為 a。'
        ],
        en: [
          'Non-rivalry: one person\'s use does not reduce the amount available to others. Non-excludability: others cannot be prevented from consuming it.',
          'Being government-produced or free is not part of the definition, so b is wrong.',
          'c and d describe private goods and market provision, so the answer is a.'
        ]
      }
    },
    {
      id: 'pg2',
      prompt: { zh: '以下哪一項最符合公共財的定義？', en: 'Which of the following best fits the definition of a public good?' },
      choices: [
        { id: 'a', zh: '國防', en: 'National defence' },
        { id: 'b', zh: '漢堡包', en: 'A hamburger' },
        { id: 'c', zh: '收費電視節目', en: 'Pay-television programmes' },
        { id: 'd', zh: '公共屋邨單位', en: 'A public housing flat' }
      ],
      answer: 'a',
      hint: { zh: '國防保護所有人，且不會因多一人受保護而減少。', en: 'Defence protects everyone and is not reduced when one more person is protected.' },
      solution: {
        zh: [
          '國防同時具備非競爭性與非排他性，是典型的公共財。',
          '漢堡包有競爭性與排他性；收費電視有排他性（俱樂部財）；公屋單位有競爭性與排他性。',
          '因此答案為 a。'
        ],
        en: [
          'National defence is both non-rival and non-excludable, a classic public good.',
          'A hamburger is rival and excludable; pay TV is excludable (a club good); a public housing flat is rival and excludable.',
          'The answer is therefore a.'
        ]
      }
    },
    {
      id: 'pg3',
      prompt: { zh: '共有資源（common resource）的特徵是甚麼？', en: 'What are the characteristics of a common resource?' },
      choices: [
        { id: 'a', zh: '競爭性、非排他性', en: 'Rival and non-excludable' },
        { id: 'b', zh: '非競爭性、排他性', en: 'Non-rival and excludable' },
        { id: 'c', zh: '非競爭性、非排他性', en: 'Non-rival and non-excludable' },
        { id: 'd', zh: '競爭性、排他性', en: 'Rival and excludable' }
      ],
      answer: 'a',
      hint: { zh: '魚類被捕走後他人可捕的數量減少，但難以阻止捕魚。', en: 'Fish taken by one boat leave fewer for others, yet fishing cannot easily be stopped.' },
      solution: {
        zh: [
          '共有資源如公海魚類：一人使用會減少他人可用的數量（競爭性）。',
          '但難以阻止他人使用（非排他性），故容易過度使用。',
          '因此答案為 a。'
        ],
        en: [
          'A common resource such as ocean fish is rival: one user leaves less for others.',
          'It is also non-excludable, so it tends to be overused.',
          'The answer is therefore a.'
        ]
      }
    },
    {
      id: 'pg4',
      prompt: { zh: '以下哪一項屬於俱樂部財（非競爭性但排他性）？', en: 'Which of the following is a club good (non-rival but excludable)?' },
      choices: [
        { id: 'a', zh: '收費電視節目', en: 'Pay-television programmes' },
        { id: 'b', zh: '國防', en: 'National defence' },
        { id: 'c', zh: '公海魚類', en: 'Ocean fish' },
        { id: 'd', zh: '一杯咖啡', en: 'A cup of coffee' }
      ],
      answer: 'a',
      hint: { zh: '多加一個觀眾不會減少節目對他人的供應，但可憑收費排除他人。', en: 'One more viewer does not reduce the programme for others, but non-payers can be excluded.' },
      solution: {
        zh: [
          '收費電視節目：多一人觀看不會減少他人觀看（非競爭性），但未付費者不能收看（排他性）。',
          '國防是公共財，公海魚類是共有資源，咖啡是私有財。',
          '因此答案為 a。'
        ],
        en: [
          'Pay TV is non-rival (one more viewer does not reduce others\' viewing) but excludable (non-payers are blocked).',
          'Defence is a public good, ocean fish a common resource and coffee a private good.',
          'The answer is therefore a.'
        ]
      }
    },
    {
      id: 'pg5',
      prompt: { zh: '公共財市場出現搭便車問題，主要原因是甚麼？', en: 'Why does the free-rider problem arise for public goods?' },
      choices: [
        { id: 'a', zh: '財貨非排他，人們可以不付費而享用', en: 'The good is non-excludable, so people can enjoy it without paying' },
        { id: 'b', zh: '財貨非競爭，邊際成本為零', en: 'The good is non-rival, so its marginal cost is zero' },
        { id: 'c', zh: '政府補貼生產', en: 'The government subsidises production' },
        { id: 'd', zh: '市場價格過高', en: 'The market price is too high' }
      ],
      answer: 'a',
      hint: { zh: '不能排除未付費者，人人便想免費享用。', en: 'When non-payers cannot be excluded, everyone wants a free ride.' },
      solution: {
        zh: [
          '非排他性令生產者無法阻止未付費者享用財貨。',
          '消費者因此傾向不付費而「搭便車」，導致私人市場供應不足。',
          '非競爭性雖令邊際成本為零，但不是搭便車的主因，故答案為 a。'
        ],
        en: [
          'Non-excludability means producers cannot stop non-payers from consuming the good.',
          'Consumers therefore tend to free-ride, so private supply falls short.',
          'Non-rivalry makes marginal cost zero but is not the main cause of free-riding, so the answer is a.'
        ]
      }
    },
    {
      id: 'pg6',
      prompt: { zh: '公共財為何構成市場失效？', en: 'Why do public goods cause market failure?' },
      choices: [
        { id: 'a', zh: '私人市場因搭便車而供應不足', en: 'Private markets under-provide because of free-riding' },
        { id: 'b', zh: '私人市場供應過多', en: 'Private markets over-provide' },
        { id: 'c', zh: '價格太高但供應充足', en: 'Prices are too high but supply is sufficient' },
        { id: 'd', zh: '政府禁止私人生產', en: 'The government bans private production' }
      ],
      answer: 'a',
      hint: { zh: '市場失效指價格機制未能有效分配資源。', en: 'Market failure means the price mechanism fails to allocate resources efficiently.' },
      solution: {
        zh: [
          '公共財非排他，私人廠商難以收費，加上搭便車問題，市場供應低於社會最適。',
          '供應不足即市場失效，故 a 正確。',
          'b、c、d 與公共財市場失效的原因不符，故答案為 a。'
        ],
        en: [
          'Because public goods are non-excludable, private firms cannot easily charge, and free-riding leads to under-provision.',
          'Under-provision is market failure, so a is correct.',
          'b, c and d do not explain the failure, so the answer is a.'
        ]
      }
    },
    {
      id: 'pg7',
      prompt: { zh: '以下哪一項財貨既有排他性又有競爭性？', en: 'Which of the following goods is both excludable and rival?' },
      choices: [
        { id: 'a', zh: '一杯咖啡', en: 'A cup of coffee' },
        { id: 'b', zh: '國防', en: 'National defence' },
        { id: 'c', zh: '燈塔', en: 'A lighthouse' },
        { id: 'd', zh: '公海魚類', en: 'Ocean fish' }
      ],
      answer: 'a',
      hint: { zh: '私有財同時有排他性與競爭性。', en: 'A private good is both excludable and rival.' },
      solution: {
        zh: [
          '一杯咖啡：不付錢不能喝（排他性），一人喝掉他人便不能喝（競爭性），屬私有財。',
          '國防與燈塔是公共財，公海魚類是共有資源。',
          '因此答案為 a。'
        ],
        en: [
          'A cup of coffee is excludable (you must pay) and rival (once drunk, others cannot have it) — a private good.',
          'Defence and a lighthouse are public goods; ocean fish is a common resource.',
          'The answer is therefore a.'
        ]
      }
    },
    {
      id: 'pg8',
      prompt: { zh: '以下哪項陳述正確？', en: 'Which of the following statements is correct?' },
      choices: [
        { id: 'a', zh: '公共財不一定由政府提供，政府提供的財貨也不一定是公共財', en: 'Public goods are not necessarily government-provided, and government-provided goods are not necessarily public goods' },
        { id: 'b', zh: '所有政府提供的財貨都是公共財', en: 'All government-provided goods are public goods' },
        { id: 'c', zh: '公共財一定由私人市場提供', en: 'Public goods are always provided by private markets' },
        { id: 'd', zh: '公共財一定有排他性', en: 'Public goods are always excludable' }
      ],
      answer: 'a',
      hint: { zh: '以「非競爭性＋非排他性」判斷，而非以提供者判斷。', en: 'Judge by non-rivalry plus non-excludability, not by who provides the good.' },
      solution: {
        zh: [
          '公共財的定義看特徵而非提供者：燈塔可由私人提供，政府提供的公屋卻是私有財。',
          'b、c、d 都與定義不符，其中 d 更與非排他性相反。',
          '因此答案為 a。'
        ],
        en: [
          'Public-good status depends on characteristics, not the provider: a lighthouse can be privately provided, while public housing is a private good.',
          'b, c and d conflict with the definition, and d contradicts non-excludability.',
          'The answer is therefore a.'
        ]
      }
    }
  ]

});

