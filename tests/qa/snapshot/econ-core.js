/*
 * 經濟學園 · Econ Garden — 學習引擎（classic script）
 * ------------------------------------------------------------------
 * 由 EconData 的 stages / skills / lessons / banks / types 組裝：
 *   window.Curriculum = { stages, skills }
 *   window.Lessons    = { skillId: { zh, en } }
 *   window.MathCore   = 題目生成、判分、進度、掌握度、自適應（app.js 沿用數學版的 API）
 * 命名沿用 MathCore 是為了直接重用已經成熟的介面層（app.js），並非數學專用。
 */
(function () {
  'use strict';

  var ED = window.EconData;
  if (!ED) throw new Error('econ-core.js 需要先載入 econ-boot.js');

  var skills = ED.skills;

  /* 把題庫掛到技能上 */
  Object.keys(ED.banks).forEach(function (id) {
    var s = skills[id];
    if (!s) throw new Error('題庫指向未註冊技能: ' + id);
    s.bank = (s.bank || []).concat(ED.banks[id]);
  });

  var Curriculum = { stages: ED.stages, skills: skills };
  var Lessons = ED.lessons;

  /* ================= 隨機與值工具 ================= */

  function seedRandom(seed) {
    var a = (seed >>> 0) || 1;
    return function () {
      a |= 0;
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function randInt(rng, min, max) {
    if (max < min) { var tmp = min; min = max; max = tmp; }
    return min + Math.floor(rng() * (max - min + 1));
  }

  function pick(rng, arr) { return arr[randInt(rng, 0, arr.length - 1)]; }

  function shuffle(rng, arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = randInt(rng, 0, i);
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function round(n, dp) {
    var f = Math.pow(10, dp == null ? 6 : dp);
    return Math.round(n * f) / f;
  }

  function isFraction() { return false; }
  function reduceFraction(v) { return v; }
  function valueKey(v) { return String(v); }
  function renderValue(v) { return String(v); }

  function valuesEqual(a, b) {
    if (b === null || b === undefined) return false;
    if (typeof a === 'number') {
      var n = typeof b === 'number' ? b : Number(b);
      if (!isFinite(n)) return false;
      return Math.abs(a - n) < 1e-6;
    }
    if (typeof b === 'number') return false;
    return String(a).trim().toLowerCase() === String(b).trim().toLowerCase();
  }

  /* 把使用者輸入規整為值：數字（可含 $、%、千位逗號、分數）或文字 */
  function normalizeInput(input, expected) {
    if (input === null || input === undefined) return null;
    if (typeof input === 'number') return isFinite(input) ? input : null;
    var s = String(input).trim();
    if (!s) return null;
    if (typeof expected === 'number') {
      var t = s.replace(/[,\s$€£¥%]/g, '');
      if (/^[+-]?\d+(\.\d+)?$/.test(t)) return Number(t);
      var m = /^([+-]?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/.exec(t);
      if (m && Number(m[2]) !== 0) return Number(m[1]) / Number(m[2]);
      return null;
    }
    return s;
  }

  var CARET_TOKEN_RE = /(?:\([A-Za-z0-9.+\-−×÷/ ]+\)|[A-Za-z0-9.]+)\s*\^\s*(?:\{[A-Za-z0-9.+\-−]+\}|\([A-Za-z0-9.+\-−]+\)|[A-Za-z0-9.]+)/g;

  function formatMathText(text) {
    if (typeof text !== 'string' || text.indexOf('^') === -1) return text;
    return text.split(/(\$[^$]*\$)/).map(function (part, idx) {
      if (idx % 2 === 1) return part;
      return part.replace(CARET_TOKEN_RE, function (tok) {
        return '$' + tok.replace(/−/g, '-') + '$';
      });
    }).join('');
  }

  /* ================= 簽名與去重 ================= */

  function stableStringify(value) {
    if (value === null || typeof value !== 'object') return JSON.stringify(value);
    if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']';
    var keys = Object.keys(value).sort();
    return '{' + keys.map(function (k) { return JSON.stringify(k) + ':' + stableStringify(value[k]); }).join(',') + '}';
  }

  function mathed(p) {
    if (p.math && typeof p.math === 'object') return p.math;
    return { p: p.prompt && p.prompt.zh, a: p.answer };
  }

  function mathSig(math) { return stableStringify(math); }

  function blankNumerals(value) {
    if (typeof value === 'number') return '#';
    if (typeof value === 'string') return value.replace(/\d+(?:\.\d+)?/g, '#');
    if (value === null || typeof value !== 'object') return value;
    if (Array.isArray(value)) return value.map(blankNumerals);
    var out = {};
    Object.keys(value).sort().forEach(function (k) { out[k] = blankNumerals(value[k]); });
    return out;
  }

  function templateSig(p) {
    if (!p) return '';
    return p.type + ':' + stableStringify(blankNumerals(mathed(p)));
  }

  function contextSig(p) {
    if (!p) return '';
    var text = p.prompt && p.prompt.en ? String(p.prompt.en) : '';
    return p.type + ':' + text.replace(/\d+(?:\.\d+)?/g, '#').replace(/\s+/g, ' ').trim();
  }

  /* ================= 題型／難度 ================= */

  function typeList(skill) {
    return (skill.types || []).map(function (t) {
      return typeof t === 'string' ? { t: t } : t;
    });
  }

  function levelFor(skill, difficultyStep) {
    var levels = skill.levels || [{}];
    var idx = Math.max(0, Math.min(difficultyStep || 0, levels.length - 1));
    var lvl = levels[idx] || {};
    var out = {};
    Object.keys(lvl).forEach(function (k) { out[k] = lvl[k]; });
    return out;
  }

  /* ================= 題庫題 ================= */

  function bankProblem(skill, rng) {
    var bank = skill.bank || [];
    if (!bank.length) throw new Error('技能缺少題庫: ' + skill.id);
    var item = pick(rng, bank);
    var ids = item.choices.map(function (c) { return String(c.id); });
    var labels = {};
    item.choices.forEach(function (c) { labels[String(c.id)] = { zh: c.zh, en: c.en }; });
    if (ids.indexOf(String(item.answer)) === -1) {
      throw new Error('題庫答案不在選項中: ' + skill.id + '/' + item.id);
    }
    return {
      prompt: item.prompt,
      hint: item.hint,
      answer: String(item.answer),
      choices: shuffle(rng, ids),
      choiceLabels: labels,
      solution: item.solution,
      math: { q: item.id }
    };
  }

  /* ================= 生成單題 ================= */

  function generateProblem(skill, opts) {
    opts = opts || {};
    var types = typeList(skill);
    if (!types.length) throw new Error('技能缺少題目類型: ' + (skill.id || '?'));
    var typeSpec = null;
    if (opts.typeIndex != null) {
      typeSpec = types[opts.typeIndex];
      if (!typeSpec) throw new Error('題目類型索引越界: ' + opts.typeIndex);
    } else if (opts.type) {
      for (var i = 0; i < types.length; i++) if (types[i].t === opts.type) { typeSpec = types[i]; break; }
      if (!typeSpec) throw new Error('未知題目類型: ' + opts.type);
    } else {
      typeSpec = types[0];
    }
    var rng = opts.rng || seedRandom(opts.seed != null ? opts.seed : 1);
    var step = opts.difficultyStep != null ? opts.difficultyStep : 0;
    var o = levelFor(skill, step);
    if (typeSpec.opts) for (var k in typeSpec.opts) o[k] = typeSpec.opts[k];

    var p;
    if (typeSpec.t === 'bank') {
      p = bankProblem(skill, rng);
    } else {
      var gen = ED.types[typeSpec.t];
      if (!gen) throw new Error('未實現的題目類型: ' + typeSpec.t + '（技能 ' + skill.id + '）');
      p = gen(rng, o);
      if (!p || !p.prompt || p.answer === undefined || p.answer === null) {
        throw new Error('生成器回傳格式不完整: ' + typeSpec.t);
      }
    }

    p.type = typeSpec.t;
    p.difficultyStep = step;
    p.prompt = { zh: formatMathText(p.prompt.zh), en: formatMathText(p.prompt.en) };
    if (p.hint) p.hint = { zh: formatMathText(p.hint.zh), en: formatMathText(p.hint.en) };
    if (p.solution) {
      p.solution = {
        zh: (p.solution.zh || []).map(formatMathText),
        en: (p.solution.en || []).map(formatMathText)
      };
    }

    if (o.input) p.input = 'text';
    if (p.input) {
      delete p.choices;
      delete p.choiceLabels;
    } else {
      if (!p.choices) {
        if (typeof p.answer !== 'number') {
          throw new Error('文字答案必須提供 choices: ' + skill.id + ' / ' + p.type);
        }
        p.choices = ED.util.numericChoices(rng, p.answer, {
          deltas: o.deltas || (typeSpec.opts && typeSpec.opts.deltas),
          min: o.choiceMin != null ? o.choiceMin : (o.min != null ? o.min : 0),
          max: o.choiceMax != null ? o.choiceMax : o.max,
          dp: o.dp
        });
      }
      var hasAnswer = p.choices.some(function (c) { return valuesEqual(p.answer, c); });
      if (!hasAnswer) p.choices.push(p.answer);
      var seen = {};
      p.choices = p.choices.filter(function (c) {
        var key = typeof c === 'number' ? String(round(c, o.dp == null ? 6 : o.dp)) : String(c);
        if (seen[key]) return false;
        seen[key] = true;
        return true;
      });
      if (p.choices.length > 6) p.choices = p.choices.slice(0, 6);
      p.choices = shuffle(rng, p.choices);
    }

    p.sig = p.type + ':' + mathSig(mathed(p));
    return p;
  }

  function generateSet(skill, count, opts) {
    opts = opts || {};
    var rng = opts.rng || seedRandom(opts.seed != null ? opts.seed : 1);
    var step = opts.difficultyStep != null ? opts.difficultyStep : 0;
    var types = typeList(skill);
    var out = [];
    var seen = {};
    var guard = 0;
    while (out.length < count && guard++ < count * 300) {
      var idx = types.length > 1 ? Math.floor(rng() * types.length) : 0;
      var p = generateProblem(skill, { rng: rng, difficultyStep: step, typeIndex: idx });
      if (!seen[p.sig]) { seen[p.sig] = true; out.push(p); }
    }
    return out;
  }

  /* ================= 解題步驟 ================= */

  function explain(problem) {
    if (problem && problem.solution && problem.solution.zh && problem.solution.zh.length) {
      return problem.solution;
    }
    var prompt = problem && problem.prompt ? problem.prompt : { zh: '', en: '' };
    return {
      zh: [prompt.zh, '答案：' + renderValue(problem.answer)],
      en: [prompt.en, 'Answer: ' + renderValue(problem.answer)]
    };
  }

  /* ================= 判分 ================= */

  function checkAnswer(problem, input) {
    var expected = problem.answer;
    var parsed = normalizeInput(input, expected);
    return { correct: valuesEqual(expected, parsed), expected: expected };
  }

  /* ================= 自適應選題 ================= */

  function defaultSkillProgress() {
    return {
      attempts: 0, correct: 0,
      consecCorrect: 0, consecWrong: 0,
      difficultyStep: 0, lastSeen: 0,
      typeAcc: {}, stars: 0, mastered: false,
      quizStars: 0, quizBest: 0,
      lastProblems: []
    };
  }

  function typeAccKey(problem) {
    var m = (problem && problem.math) || {};
    var mode = m.mode || m.form || '';
    return problem.type + (mode && mode !== problem.type ? ':' + mode : '');
  }

  function nextProblem(skill, progress, opts) {
    opts = opts || {};
    var rng = opts.rng || seedRandom(Date.now() & 0xffffffff);
    var sp = progress.skills[skill.id] || defaultSkillProgress();
    var step = sp.difficultyStep;
    var types = typeList(skill);

    var weights = types.map(function (ts) {
      var a = 0, c = 0;
      var base = ts.t;
      Object.keys(sp.typeAcc).forEach(function (key) {
        if (key === base || key.indexOf(base + ':') === 0) {
          var acc = sp.typeAcc[key];
          if (acc && acc.a) { a += acc.a; c += acc.c; }
        }
      });
      if (!a) return 1;
      return Math.max(0.05, 1 - c / a);
    });
    var totalW = weights.reduce(function (s, w) { return s + w; }, 0);
    var roll = rng() * totalW;
    var chosenIdx = 0;
    for (var i = 0; i < types.length; i++) {
      roll -= weights[i];
      if (roll <= 0) { chosenIdx = i; break; }
    }

    var recent = sp.lastProblems || [];
    var avoidSig = {}, avoidTpl = {};
    (opts.avoid || []).forEach(function (q) {
      if (!q) return;
      if (q.sig) avoidSig[q.sig] = true;
      if (q.math) avoidTpl[templateSig(q)] = true;
    });
    var p = null;
    var guard = 0;
    while (guard++ < 20) {
      p = generateProblem(skill, { rng: rng, difficultyStep: step, typeIndex: chosenIdx });
      var seenRecent = recent.some(function (r) { return r.sig === p.sig; });
      if (seenRecent || avoidSig[p.sig]) continue;
      if (guard < 16 && avoidTpl[templateSig(p)]) continue;
      break;
    }
    return p;
  }

  /* ================= 組卷 ================= */

  function composeSet(skill, count, opts) {
    opts = opts || {};
    var rng = opts.rng || seedRandom(opts.seed != null ? opts.seed : 1);
    var step = opts.difficultyStep != null ? opts.difficultyStep : 0;
    var types = typeList(skill);
    if (!types.length) return [];
    var out = [];
    var seenSig = {};
    var tCount = {}, cCount = {};
    var avoid = {};
    (opts.avoid || []).forEach(function (s) { avoid[s] = true; });
    function draw() {
      var ti = types.length > 1 ? Math.floor(rng() * types.length) : 0;
      return generateProblem(skill, { rng: rng, difficultyStep: step, typeIndex: ti });
    }
    function pass(maxTpl) {
      var guard = 0;
      while (out.length < count && guard++ < count * 300) {
        var p = draw();
        var t = templateSig(p), c = contextSig(p);
        if (seenSig[p.sig] || avoid[p.sig]) continue;
        if ((tCount[t] || 0) >= maxTpl || (cCount[c] || 0) >= maxTpl) continue;
        seenSig[p.sig] = true;
        tCount[t] = (tCount[t] || 0) + 1;
        cCount[c] = (cCount[c] || 0) + 1;
        out.push(p);
      }
    }
    pass(1);
    pass(2);
    pass(4);
    var guard = 0;
    while (out.length < count && guard++ < count * 400) {
      var p2 = draw();
      if (seenSig[p2.sig]) continue;
      seenSig[p2.sig] = true;
      out.push(p2);
    }
    guard = 0;
    while (out.length < count && guard++ < count * 200) out.push(draw());
    return out;
  }

  function composeExam(skillList, count, opts) {
    opts = opts || {};
    var rng = opts.rng || seedRandom(opts.seed != null ? opts.seed : 1);
    var maxPerSkill = opts.maxPerSkill != null ? opts.maxPerSkill : 3;
    var stepFor = opts.stepFor;
    var out = [], seenSig = {}, tCount = {}, cCount = {}, sCount = {};
    var cursor = 0;
    function stepOf(skill) {
      var levels = Math.max(1, (skill.levels || []).length);
      if (stepFor) return stepFor(skill, rng);
      return randInt(rng, 0, levels - 1);
    }
    function draw(relax) {
      for (var tries = 0; tries < skillList.length * 12; tries++) {
        var skill = skillList[cursor++ % skillList.length];
        var types = typeList(skill);
        if (!types.length) continue;
        var p = generateProblem(skill, {
          rng: rng,
          difficultyStep: stepOf(skill),
          typeIndex: Math.floor(rng() * types.length)
        });
        if (seenSig[p.sig]) continue;
        var t = templateSig(p), c = contextSig(p);
        if (!relax && ((tCount[t] || 0) >= 2 || (cCount[c] || 0) >= 2 || (sCount[skill.id] || 0) >= maxPerSkill)) continue;
        seenSig[p.sig] = true;
        tCount[t] = (tCount[t] || 0) + 1;
        cCount[c] = (cCount[c] || 0) + 1;
        sCount[skill.id] = (sCount[skill.id] || 0) + 1;
        p.skillId = skill.id;
        return p;
      }
      return null;
    }
    var guard = 0;
    while (out.length < count && guard++ < count * 40) { var p = draw(false); if (p) out.push(p); }
    guard = 0;
    while (out.length < count && guard++ < count * 40) { var p2 = draw(true); if (p2) out.push(p2); }
    guard = 0;
    while (out.length < count && guard++ < count * 400) {
      var skill2 = skillList[cursor++ % skillList.length];
      var types2 = typeList(skill2);
      if (!types2.length) continue;
      var p3 = generateProblem(skill2, { rng: rng, difficultyStep: stepOf(skill2), typeIndex: Math.floor(rng() * types2.length) });
      if (seenSig[p3.sig]) continue;
      seenSig[p3.sig] = true;
      p3.skillId = skill2.id;
      out.push(p3);
    }
    guard = 0;
    while (out.length < count && guard++ < count * 200) {
      var skill3 = skillList[cursor++ % skillList.length];
      var types3 = typeList(skill3);
      if (!types3.length) continue;
      var p4 = generateProblem(skill3, { rng: rng, difficultyStep: stepOf(skill3), typeIndex: Math.floor(rng() * types3.length) });
      p4.skillId = skill3.id;
      out.push(p4);
    }
    return opts.shuffle === false ? out : shuffle(rng, out);
  }

  /* ================= 進度、掌握度與計分（與數學版同一套規則） ================= */

  function newProgress() {
    return { version: 2, lang: 'zh', sound: true, theme: 'light', stars: 0, streak: { lastDay: null, count: 0 }, badges: [], skills: {}, stageExams: {} };
  }

  function sanitizeProgress(input) {
    var base = newProgress();
    if (!input || typeof input !== 'object' || Array.isArray(input)) return base;
    var num = function (v, d) { return (typeof v === 'number' && isFinite(v)) ? v : d; };
    var int = function (v, d, min, max) {
      var n = Math.floor(num(v, d));
      if (n < min) n = min;
      if (max != null && n > max) n = max;
      return n;
    };
    var bool = function (v, d) { return typeof v === 'boolean' ? v : d; };
    base.lang = (input.lang === 'en' || input.lang === 'zh') ? input.lang : 'zh';
    base.sound = bool(input.sound, true);
    base.theme = (input.theme === 'dark' || input.theme === 'light' || input.theme === 'auto') ? input.theme : 'light';
    base.stars = int(input.stars, 0, 0, 1000000);
    if (input.streak && typeof input.streak === 'object') {
      base.streak.lastDay = (typeof input.streak.lastDay === 'string' || input.streak.lastDay === null) ? input.streak.lastDay : null;
      base.streak.count = int(input.streak.count, 0, 0, 100000);
    }
    if (Array.isArray(input.badges)) base.badges = input.badges.filter(function (b) { return typeof b === 'string'; }).slice(0, 100);
    if (input.skills && typeof input.skills === 'object' && !Array.isArray(input.skills)) {
      Object.keys(input.skills).slice(0, 500).forEach(function (id) {
        var s = input.skills[id];
        if (!s || typeof s !== 'object') return;
        var sp = {
          attempts: int(s.attempts, 0, 0, 1000000),
          correct: int(s.correct, 0, 0, 1000000),
          consecCorrect: int(s.consecCorrect, 0, 0, 100),
          consecWrong: int(s.consecWrong, 0, 0, 100),
          difficultyStep: int(s.difficultyStep, 0, 0, 20),
          lastSeen: num(s.lastSeen, 0),
          typeAcc: {},
          stars: int(s.stars, 0, 0, 3),
          mastered: bool(s.mastered, false),
          quizStars: int(s.quizStars, 0, 0, 3),
          quizBest: int(s.quizBest, 0, 0, 100),
          lastProblems: Array.isArray(s.lastProblems) ? s.lastProblems.slice(-20) : []
        };
        if (s.typeAcc && typeof s.typeAcc === 'object') {
          Object.keys(s.typeAcc).slice(0, 60).forEach(function (t) {
            var a = s.typeAcc[t];
            if (a && typeof a === 'object') sp.typeAcc[t] = { a: int(a.a, 0, 0, 1000000), c: int(a.c, 0, 0, 1000000) };
          });
        }
        base.skills[id] = sp;
      });
    }
    if (input.stageExams && typeof input.stageExams === 'object' && !Array.isArray(input.stageExams)) {
      Object.keys(input.stageExams).slice(0, 100).forEach(function (id) {
        var e = input.stageExams[id];
        if (!e || typeof e !== 'object') return;
        base.stageExams[id] = { passed: bool(e.passed, false) || bool(e.perfect, false), perfect: bool(e.perfect, false), best: int(e.best, 0, 0, 100) };
      });
    }
    base.version = 2;
    return base;
  }

  function practiceStars(correct, practice) {
    if (correct >= practice) return 3;
    if (correct >= Math.ceil(practice * 0.66)) return 2;
    if (correct >= Math.ceil(practice * 0.33)) return 1;
    return 0;
  }

  function quizStars(percent, pass) {
    var threshold = (typeof pass === 'number' && pass > 0 && pass <= 1) ? pass : 0.8;
    if (percent >= Math.min(0.95, threshold + 0.15)) return 3;
    if (percent >= threshold) return 2;
    if (percent >= threshold * 0.75) return 1;
    return 0;
  }

  function masteryStatus(progress, skill) {
    var sp = progress.skills[skill.id] || defaultSkillProgress();
    var practice = (skill.mastery && skill.mastery.practice) || 10;
    var pStars = practiceStars(sp.correct, practice);
    var qStars = sp.quizStars || 0;
    var stars = Math.max(pStars, qStars);
    return { practiceStars: pStars, quizStars: qStars, stars: stars, mastered: qStars >= 2, practice: practice };
  }

  function applyResult(progress, skill, problem, correct, opts) {
    opts = opts || {};
    if (!progress.skills[skill.id]) progress.skills[skill.id] = defaultSkillProgress();
    var sp = progress.skills[skill.id];
    sp.attempts += 1;
    sp.lastSeen = Date.now();
    var accKey = typeAccKey(problem);
    var acc = sp.typeAcc[accKey] || { a: 0, c: 0 };
    acc.a += 1;
    var credit = opts.credit !== false;
    if (correct && credit) {
      acc.c += 1;
      sp.correct += 1;
      sp.consecCorrect += 1;
      sp.consecWrong = 0;
      if (sp.consecCorrect >= 3) { sp.difficultyStep += 1; sp.consecCorrect = 0; }
    } else if (correct) {
      sp.consecCorrect = 0;
    } else {
      sp.consecWrong += 1;
      sp.consecCorrect = 0;
      if (sp.consecWrong >= 2) {
        sp.difficultyStep = Math.max(0, sp.difficultyStep - 1);
        sp.consecWrong = 0;
      }
    }
    var levels = skill.levels || [{}];
    sp.difficultyStep = Math.max(0, Math.min(sp.difficultyStep, levels.length - 1));
    sp.typeAcc[accKey] = acc;
    sp.lastProblems.push({ type: problem.type, sig: problem.sig });
    if (sp.lastProblems.length > 3) sp.lastProblems.shift();
    var st = masteryStatus(progress, skill);
    sp.stars = st.stars;
    sp.mastered = st.mastered;
    return progress;
  }

  function applyQuizResult(progress, skill, percent) {
    if (!progress.skills[skill.id]) progress.skills[skill.id] = defaultSkillProgress();
    var sp = progress.skills[skill.id];
    var pass = (skill.mastery && skill.mastery.quizPass) || 0.8;
    var qs = quizStars(percent, pass);
    sp.quizStars = Math.max(sp.quizStars || 0, qs);
    sp.quizBest = Math.max(sp.quizBest || 0, Math.round(percent * 100));
    var st = masteryStatus(progress, skill);
    sp.stars = st.stars;
    sp.mastered = st.mastered;
    return progress;
  }

  function gradeQuiz(results, pass) {
    var correct = 0, total = results.length;
    results.forEach(function (r) { if (r.correct) correct++; });
    var percent = total ? correct / total : 0;
    return { correct: correct, total: total, percent: percent, stars: quizStars(percent, pass) };
  }

  /* ================= 對外 API ================= */

  var GENERATOR_TYPES = Object.keys(ED.types).concat(['bank']).sort();

  var MathCore = {
    GENERATOR_TYPES: GENERATOR_TYPES,
    answerFromMath: function () { return null; },
    formatMathText: formatMathText,
    templateSig: templateSig,
    contextSig: contextSig,
    composeSet: composeSet,
    composeExam: composeExam,
    isInputProblem: function (p) { return !!(p && p.input); },
    seedRandom: seedRandom,
    randInt: randInt,
    pick: pick,
    shuffle: shuffle,
    isFraction: isFraction,
    valueKey: valueKey,
    renderValue: renderValue,
    valuesEqual: valuesEqual,
    reduceFraction: reduceFraction,
    normalizeInput: normalizeInput,
    generateProblem: generateProblem,
    generateSet: generateSet,
    explain: explain,
    checkAnswer: checkAnswer,
    defaultSkillProgress: defaultSkillProgress,
    newProgress: newProgress,
    sanitizeProgress: sanitizeProgress,
    practiceStars: practiceStars,
    quizStars: quizStars,
    masteryStatus: masteryStatus,
    applyResult: applyResult,
    applyQuizResult: applyQuizResult,
    gradeQuiz: gradeQuiz,
    nextProblem: nextProblem
  };

  window.Curriculum = Curriculum;
  window.Lessons = Lessons;
  window.MathCore = MathCore;
  window.EconCore = MathCore;
  window.__econData = ED;

  /* 開發者自檢：所有技能引用的題型都必須存在，且課堂齊全 */
  (function selfCheck() {
    var missingTypes = {};
    var missingLessons = [];
    Object.keys(skills).forEach(function (id) {
      var s = skills[id];
      if (!s.types || !s.types.length) missingTypes[id] = 'no-types';
      (s.types || []).forEach(function (t) {
        var name = typeof t === 'string' ? t : t.t;
        if (name !== 'bank' && !ED.types[name]) missingTypes[id] = name;
      });
      if (s.types && s.types.some(function (t) { return (typeof t === 'string' ? t : t.t) === 'bank'; })) {
        if (!s.bank || !s.bank.length) missingTypes[id] = 'no-bank';
      }
      if (!Lessons[id]) missingLessons.push(id);
    });
    if (Object.keys(missingTypes).length) {
      if (window.console && console.warn) console.warn('[econ-core] 題型未就緒:', missingTypes);
    }
    if (missingLessons.length) {
      if (window.console && console.warn) console.warn('[econ-core] 缺少課堂:', missingLessons);
    }
  })();
})();
