// ═══════════════════════════════════════════════════════════════
//  AI GUIDE v2 — Assistente de dúvidas com Gemini AI
//  Busca local nos dados + Gemini API (gratuita) para respostas ricas
//  A mesma API key usada no Playground (Java/Python) serve aqui!
// ═══════════════════════════════════════════════════════════════

// ─── API Key storage — compartilhada com o Playground ─────────
function guideGetAPIKey()    { return localStorage.getItem('devguide_apikey') || ''; }
function guideSetAPIKey(k)   { localStorage.setItem('devguide_apikey', k); }
function guideRemoveAPIKey() { localStorage.removeItem('devguide_apikey'); }

// ─── Gemini model config ───────────────────────────────────────
const GEMINI_MODEL   = 'gemini-2.0-flash';
const GEMINI_API_URL = key =>
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${key}`;

// ─── Local Knowledge Base ─────────────────────────────────────
function _guideGetKB() {
  const source = (typeof DATA !== 'undefined' && DATA) || window.DATA || null;
  if (!source || !source.topics) return [];
  const items = [];
  source.topics.forEach(topic => {
    (topic.subtopics || []).forEach(sub => {
      items.push({ ...sub, _topicId: topic.id, _topicLabel: topic.label, _topicIcon: topic.icon });
    });
  });
  return items;
}

// ─── Synonym / keyword map ────────────────────────────────────
const GUIDE_SYNONYMS = {
  'var':         ['variaveis', 'variavel', 'variable', 'variables', 'let', 'const', 'var'],
  'const':       ['constantes', 'constante', 'constant', 'constants'],
  'array':       ['arrays', 'lista', 'listas', 'list', 'vetor', 'vetores'],
  'objeto':      ['structs', 'objeto', 'objetos', 'struct', 'object', 'objects'],
  'loop':        ['repeticao', 'loop', 'loops', 'for', 'while', 'do while', 'iteracao'],
  'if':          ['condicionais', 'if', 'else', 'switch', 'condicional', 'conditional'],
  'funcao':      ['funcoes', 'funcao', 'function', 'functions', 'metodo', 'method'],
  'recursao':    ['recursividade', 'recursao', 'recursive', 'recursion'],
  'pilha':       ['pilhas', 'pilha', 'stack', 'stacks', 'lifo'],
  'fila':        ['filas', 'fila', 'queue', 'queues', 'fifo'],
  'arvore':      ['arvores', 'arvore', 'tree', 'trees', 'bst', 'binaria'],
  'mapa':        ['mapa', 'map', 'maps', 'hashmap', 'dicionario', 'dictionary', 'hash'],
  'ponteiro':    ['ponteiros', 'ponteiro', 'pointer', 'pointers', 'referencia', 'reference'],
  'memoria':     ['memoria', 'memory', 'heap', 'stack memory', 'alocacao', 'allocation'],
  'closure':     ['closure', 'closures', 'escopo', 'scope'],
  'promise':     ['promise', 'promises', 'async', 'await', 'assincrono', 'asynchronous'],
  'prototype':   ['prototype', 'prototipo', 'heranca', 'inheritance'],
  'event':       ['evento', 'events', 'listener', 'callback'],
  'regex':       ['regex', 'regexp', 'expressao regular', 'regular expression'],
  'sort':        ['ordenacao', 'sort', 'ordenar', 'sorting', 'ordem'],
  'busca':       ['busca', 'search', 'pesquisa', 'binary search', 'busca binaria'],
  'complexidade':['complexidade', 'complexity', 'big o', 'big-o', 'performance'],
};

// ─── Local search engine ──────────────────────────────────────
function _guideSearch(query) {
  const kb = _guideGetKB();
  if (!kb.length) return null;

  const q = query.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .trim();

  const lang     = (typeof currentLang !== 'undefined' ? currentLang : 'pt');
  const titleKey = lang === 'en' ? 'title_en' : lang === 'fr' ? 'title_fr' : 'title';
  const descKey  = lang === 'en' ? 'desc_en'  : lang === 'fr' ? 'desc_fr'  : 'desc';
  const prosKey  = lang === 'en' ? 'pros_en'  : lang === 'fr' ? 'pros_fr'  : 'pros';
  const consKey  = lang === 'en' ? 'cons_en'  : lang === 'fr' ? 'cons_fr'  : 'cons';
  const whenKey  = lang === 'en' ? 'when_en'  : lang === 'fr' ? 'when_fr'  : 'when';

  const scored = kb.map(item => {
    const titleNorm = (item[titleKey] || item.title || '').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const descNorm  = (item[descKey]  || item.desc  || '').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const id = (item.id || '').toLowerCase();

    let score = 0;
    if (q.includes(id) || id.includes(q)) score += 80;
    if (titleNorm === q)            score += 100;
    else if (titleNorm.includes(q)) score += 60;
    else if (q.includes(titleNorm)) score += 50;
    if (descNorm.includes(q))       score += 20;

    Object.entries(GUIDE_SYNONYMS).forEach(([, terms]) => {
      const matchesTerm = terms.some(t => q.includes(t) || t.includes(q));
      const matchesId   = terms.some(t => id.includes(t) || t.includes(id));
      if (matchesTerm && matchesId) score += 70;
    });

    const words = q.split(/\s+/).filter(w => w.length > 2);
    words.forEach(w => {
      if (titleNorm.includes(w)) score += 30;
      if (descNorm.includes(w))  score += 10;
      if (id.includes(w))        score += 40;
    });

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];
  if (!best || best.score < 10) return null;
  return { item: best.item, titleKey, descKey, prosKey, consKey, whenKey };
}

// ─── Format local knowledge item ─────────────────────────────
function _guideFormatAnswer(result, originalQuery) {
  if (!result) return null;
  const { item, titleKey, descKey, prosKey, consKey, whenKey } = result;
  const lang = (typeof currentLang !== 'undefined' ? currentLang : 'pt');

  const title = item[titleKey] || item.title || item.id;
  const desc  = item[descKey]  || item.desc  || '';
  const pros  = item[prosKey]  || item.pros  || [];
  const cons  = item[consKey]  || item.cons  || [];
  const when  = item[whenKey]  || item.when  || '';
  const icon  = item.icon || '📖';
  const exJS  = item.examples?.javascript || '';

  let answer = `${icon} **${title}**\n\n${desc}`;
  if (when) {
    const lbl = lang==='en' ? '🕐 When to use' : lang==='fr' ? '🕐 Quand utiliser' : '🕐 Quando usar';
    answer += `\n\n${lbl}: ${when}`;
  }
  if (pros.length) {
    const lbl = lang==='en' ? '✅ Pros' : lang==='fr' ? '✅ Avantages' : '✅ Vantagens';
    answer += `\n\n${lbl}:\n` + pros.slice(0,3).map(p=>`• ${p}`).join('\n');
  }
  if (cons.length) {
    const lbl = lang==='en' ? '❌ Cons' : lang==='fr' ? '❌ Inconvénients' : '❌ Desvantagens';
    answer += `\n\n${lbl}:\n` + cons.slice(0,3).map(c=>`• ${c}`).join('\n');
  }
  if (exJS) {
    const lbl = lang==='en' ? '💡 Example (JavaScript)' : lang==='fr' ? '💡 Exemple (JavaScript)' : '💡 Exemplo (JavaScript)';
    answer += `\n\n${lbl}:\n\`\`\`\n${exJS}\n\`\`\``;
  }
  return answer;
}

// ═══════════════════════════════════════════════════════════════
//  GEMINI AI — respostas ricas (tier gratuito do Google AI Studio)
// ═══════════════════════════════════════════════════════════════

function _guideGetSystemPrompt() {
  const lang     = (typeof currentLang !== 'undefined' ? currentLang : 'pt');
  const langName = lang==='en' ? 'English' : lang==='fr' ? 'French' : 'Brazilian Portuguese';

  const kb = _guideGetKB();
  const kbSummary = kb.slice(0, 40).map(item => {
    const title = lang==='en' ? (item.title_en||item.title) : lang==='fr' ? (item.title_fr||item.title) : item.title;
    const desc  = lang==='en' ? (item.desc_en ||item.desc)  : lang==='fr' ? (item.desc_fr ||item.desc)  : item.desc;
    return `- ${item.icon||'•'} ${title}: ${(desc||'').substring(0,100)}`;
  }).join('\n');

  return `You are an expert programming tutor embedded in "Dev Manual", an interactive front-end interview study guide powered by Gemini AI.

LANGUAGE: Always respond in ${langName}. Never switch languages.

YOUR PERSONA:
- Friendly, concise, and deeply knowledgeable about programming
- You explain concepts clearly with practical, real-world examples
- You use emojis to structure responses
- You know this is a front-end interview prep tool

MANUAL TOPICS (for context):
${kbSummary}

RESPONSE FORMAT (always follow):
1. Use **bold** for key terms
2. Use \`inline code\` for keywords, variable names, function calls
3. Use \`\`\`js ... \`\`\` for code blocks — always specify language (js, python, java, html, css)
4. Bullet points (•) for lists
5. Emoji section headers to organize longer answers
6. Max ~300 words — concise but complete
7. End with "💡 Pro tip:" when you have a useful insight

ANSWER STRUCTURE:
📌 Short 1-2 sentence definition
⚙️ How it works
💻 Code example (always include one when relevant)
🕐 When to use / avoid
📊 Big O complexity for algorithms/data structures
💡 Pro tip

WHEN ANALYZING CODE:
- Point out specific issues with clear explanations
- Show corrected code snippets
- Praise what's done well
- Give Big O analysis if it's an algorithm
- Suggest 1-2 optimizations

Never say "I cannot help" — always provide the best answer possible.`;
}

// ─── Call Gemini API ──────────────────────────────────────────
async function _guideAskGemini(userMessage, codeContext) {
  const apiKey = guideGetAPIKey();
  if (!apiKey) throw new Error('NO_API_KEY');

  const lang = (typeof currentLang !== 'undefined' ? currentLang : 'pt');

  let fullPrompt = _guideGetSystemPrompt() + '\n\n---\n\n';
  if (codeContext && codeContext.length > 10) {
    const prefix = lang==='en'
      ? `The user is working on this code in the Playground:\n\`\`\`\n${codeContext}\n\`\`\`\n\nUser question: `
      : lang==='fr'
      ? `L'utilisateur travaille sur ce code :\n\`\`\`\n${codeContext}\n\`\`\`\n\nQuestion : `
      : `O usuário está trabalhando neste código no Playground:\n\`\`\`\n${codeContext}\n\`\`\`\n\nPergunta: `;
    fullPrompt += prefix + userMessage;
  } else {
    fullPrompt += userMessage;
  }

  const res = await fetch(GEMINI_API_URL(apiKey), {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
      generationConfig: { maxOutputTokens: 800, temperature: 0.7, topP: 0.9 },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      ],
    }),
  });

  // HTTP-level quota/auth errors
  if (res.status === 429) throw new Error('QUOTA_EXCEEDED');
  if (res.status === 403 || res.status === 401) throw new Error('INVALID_KEY');

  const data = await res.json();
  if (data.error) {
    const code = data.error.code || 0;
    const msg  = (data.error.message || '').toLowerCase();
    if (code === 429 || msg.includes('quota') || msg.includes('rate limit') || msg.includes('resource exhausted'))
      throw new Error('QUOTA_EXCEEDED');
    if (code === 400 || code === 403 || code === 401 || msg.includes('api key') || msg.includes('invalid'))
      throw new Error('INVALID_KEY');
    throw new Error(data.error.message);
  }

  return (data.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
}

// ─── Code analysis via Gemini ─────────────────────────────────
async function _guideAnalyzeCodeGemini(code, langLabel) {
  const lang = (typeof currentLang !== 'undefined' ? currentLang : 'pt');
  const prompt = lang==='en'
    ? `Analyze this ${langLabel} code:\n\`\`\`\n${code}\n\`\`\`\nCover: bugs, improvements, corrected snippets, Big O complexity, best practices.`
    : lang==='fr'
    ? `Analysez ce code ${langLabel} :\n\`\`\`\n${code}\n\`\`\`\nCouvrez : bugs, améliorations, extraits corrigés, complexité Big O.`
    : `Analise este código ${langLabel}:\n\`\`\`\n${code}\n\`\`\`\nAborde: bugs, melhorias, trechos corrigidos, complexidade Big O e boas práticas.`;
  return _guideAskGemini(prompt, null);
}

// ─── Local code analyzer (offline fallback) ───────────────────
function _guideAnalyzeCodeLocal(code) {
  const ui = (typeof currentLang !== 'undefined' ? currentLang : 'pt');
  const issues = [], tips = [], good = [];
  if (!code || code.trim().length < 5) return null;

  const hasVar      = /\bvar\b/.test(code);
  const hasLoop     = /\bfor\b|\bwhile\b/.test(code);
  const hasFunc     = /function\b|=>\s*[\{\w]/.test(code);
  const hasArr      = /\[.*\]/.test(code);
  const hasAsync    = /async\b|await\b/.test(code);
  const hasConsole  = /console\.log/.test(code);
  const hasClass    = /\bclass\b/.test(code);
  const hasTryCatch = /try\s*\{/.test(code);
  const lines       = code.split('\n').length;

  if (hasVar)                   issues.push(ui==='en'?'`var` detected — prefer `let`/`const`':ui==='fr'?'`var` détecté — préférez `let`/`const`':'`var` detectado — prefira `let`/`const`');
  if (hasLoop && hasArr)        tips.push(ui==='en'?'Loops + arrays — consider `map/filter/reduce`':ui==='fr'?'Boucles + tableaux — pensez à `map/filter/reduce`':'Loop + arrays — considere `map/filter/reduce`');
  if (hasAsync && !hasTryCatch) tips.push(ui==='en'?'`async/await` without `try/catch` — handle rejections!':ui==='fr'?'`async/await` sans `try/catch` — gérez les erreurs!':'`async/await` sem `try/catch` — trate rejeições!');
  if (hasConsole) good.push(ui==='en'?'`console.log` for debugging 👍':ui==='fr'?'`console.log` pour déboguer 👍':'`console.log` para depuração 👍');
  if (hasFunc)    good.push(ui==='en'?'Functions defined':ui==='fr'?'Fonctions définies':'Funções definidas');
  if (!hasVar)    good.push(ui==='en'?'No `var` — good scoping!':ui==='fr'?'Pas de `var` — bon périmètre!':'Sem `var` — bom escopo!');
  if (hasClass)   good.push(ui==='en'?'Classes used — good OOP':ui==='fr'?'Classes utilisées — bonne POO':'Classes usadas — boa OOP');
  if (hasTryCatch)good.push(ui==='en'?'Error handling with `try/catch` 👍':ui==='fr'?'Gestion erreurs `try/catch` 👍':'Tratamento com `try/catch` 👍');

  const L = {
    s: ui==='en'?`📊 **${lines} lines** analyzed`:ui==='fr'?`📊 **${lines} lignes** analysées`:`📊 **${lines} linhas** analisadas`,
    g: ui==='en'?'✅ What looks good':ui==='fr'?'✅ Ce qui est bien':'✅ O que está bem',
    i: ui==='en'?'⚠️ Improvements':ui==='fr'?'⚠️ Améliorations':'⚠️ Melhorias',
    t: ui==='en'?'💡 Tip':ui==='fr'?'💡 Conseil':'💡 Dica',
    k: ui==='en'?'🔑 Add a free Gemini API key in ⚙️ for deeper AI analysis!':ui==='fr'?'🔑 Ajoutez une clé API Gemini gratuite dans ⚙️ pour une analyse IA!':'🔑 Configure uma API key gratuita do Gemini em ⚙️ para análise IA detalhada!',
  };

  let msg = `🔍 ${L.s}\n\n`;
  if (good.length)    msg += `${L.g}:\n` + good.map(p=>`• ${p}`).join('\n') + '\n\n';
  if (issues.length)  msg += `${L.i}:\n` + issues.map(i=>`• ${i}`).join('\n') + '\n\n';
  if (tips.length)    msg += `${L.t}: ${tips[0]}\n\n`;
  if (!guideGetAPIKey()) msg += `\n💡 ${L.k}`;
  return msg;
}

// ─── "Not found" fallback ─────────────────────────────────────
function _guideNotFoundMsg(query) {
  const lang = (typeof currentLang !== 'undefined' ? currentLang : 'pt');
  const kb   = _guideGetKB();
  const sugg = kb.sort(()=>Math.random()-.5).slice(0,3)
    .map(s=>`• ${s.icon||'📌'} ${(lang==='en'?s.title_en:lang==='fr'?s.title_fr:s.title)||s.title}`).join('\n');
  if (lang==='en') return `🔍 Couldn't find **"${query}"** locally.\n\nSuggested topics:\n${sugg}\n\n💡 Try: *"explain arrays"*, *"what is recursion?"*`;
  if (lang==='fr') return `🔍 **"${query}"** introuvable localement.\n\nSujets suggérés :\n${sugg}`;
  return `🔍 Não encontrei **"${query}"** no manual local.\n\nTópicos sugeridos:\n${sugg}\n\n💡 Tente: *"explica arrays"*, *"o que é recursão?"*`;
}

// ─── Gemini error messages ────────────────────────────────────
function _guideGeminiErrorMsg(code) {
  const lang = (typeof currentLang !== 'undefined' ? currentLang : 'pt');
  if (code==='QUOTA_EXCEEDED') return lang==='en'
    ? '⚠️ **Gemini free quota exceeded** for today. Try again in a few minutes.'
    : lang==='fr' ? '⚠️ **Quota Gemini gratuit dépassé** pour aujourd\'hui. Réessayez dans quelques minutes.'
    : '⚠️ **Cota gratuita do Gemini esgotada** por hoje. Tente novamente em alguns minutos.';
  if (code==='INVALID_KEY') return lang==='en'
    ? '🔑 **Invalid API key.** Check your key in ⚙️ — it should start with `AIzaSy...`'
    : lang==='fr' ? '🔑 **Clé API invalide.** Vérifiez dans ⚙️ — elle doit commencer par `AIzaSy...`'
    : '🔑 **API key inválida.** Verifique em ⚙️ — deve começar com `AIzaSy...`';
  return lang==='en' ? '⚠️ Gemini API error. Using local search.' : lang==='fr' ? '⚠️ Erreur API Gemini. Recherche locale.' : '⚠️ Erro na API do Gemini. Usando busca local.';
}

// ─── Main answer engine ───────────────────────────────────────
async function _guideAnswer(userMessage) {
  // Always prepare local answer as fallback
  const localResult = _guideSearch(userMessage);
  const localAnswer = localResult
    ? _guideFormatAnswer(localResult, userMessage)
    : _guideNotFoundMsg(userMessage);

  if (guideGetAPIKey()) {
    try {
      const codeCtx = _guideGetCurrentCode();
      return await _guideAskGemini(userMessage, codeCtx.length > 10 ? codeCtx : null);
    } catch (err) {
      // On quota/key error: show error banner + local answer below
      if (err.message === 'QUOTA_EXCEEDED' || err.message === 'INVALID_KEY') {
        const lang = (typeof currentLang !== 'undefined' ? currentLang : 'pt');
        const sep  = lang==='en' ? '\n\n---\n📚 **Local result while offline:**\n\n'
                   : lang==='fr' ? '\n\n---\n📚 **Résultat local hors ligne :**\n\n'
                   : '\n\n---\n📚 **Resultado local enquanto offline:**\n\n';
        return _guideGeminiErrorMsg(err.message) + sep + localAnswer;
      }
      // Any other error: silently fall through to local
    }
  }

  return localAnswer;
}

// ═══════════════════════════════════════════════════════════════
//  I18N
// ═══════════════════════════════════════════════════════════════
const GUIDE_I18N = {
  pt: {
    title: '🤖 Assistente Dev',
    placeholder: 'Ex: como funciona closure? o que é Big O? diferença entre == e ===?',
    send: 'Perguntar', sending: 'Pensando...',
    analyzeCode: '🔍 Analisar meu código', analyzing: '🔍 Analisando...',
    close: '✕', minimize: '—', clear: 'Limpar chat',
    idleMsg: 'Ficou um tempo sem digitar. Posso dar uma dica?',
    welcomeMsg: 'Olá! 👋 Sou o **Assistente Dev** com Gemini AI.\n\nPode me perguntar qualquer coisa sobre programação — respostas detalhadas com exemplos de código.\n\n🔑 Configure sua **API key gratuita** do Google AI Studio em ⚙️ para ativar o Gemini!',
    welcomeMsgKeyed: 'Olá! 👋 **Gemini AI ativo** ✅\n\nPode perguntar qualquer coisa sobre programação — vou responder com exemplos de código, análise de complexidade Big O e dicas pro!',
    errorMsg: 'Não consegui processar isso. Tente reformular a pergunta.',
    emptyCode: 'Seu editor está vazio. Escreva algum código primeiro!',
    youLabel: 'Você', aiLabel: 'IA',
    apiKeyLabel: 'API Key (Gemini)',
    apiKeyTitle: '🔑 Configurar Gemini API Key',
    apiKeyDesc: 'Obtenha sua chave gratuita no Google AI Studio:',
    apiKeyLink: '→ Acessar aistudio.google.com',
    apiKeyPlaceholder: 'AIzaSy...',
    apiKeyWarn: '⚠️ Sua chave é salva apenas no seu navegador (localStorage) — nunca enviada a servidores externos.',
    apiKeyConfirm: 'Salvar', apiKeyCancel: 'Cancelar', apiKeyRemove: 'Remover chave',
    activeLabel: '● Gemini AI ativo', inactiveLabel: '○ Modo local',
    tabs: { ask: '💬 Perguntar', tips: '💡 Dicas Rápidas' },
    quickTips: [
      { icon:'📦', label:'var vs let vs const',            q:'qual a diferença entre let const var' },
      { icon:'📋', label:'Arrays: map / filter / reduce',  q:'como usar map filter reduce em arrays' },
      { icon:'🔁', label:'Loops e Iteração',               q:'diferença entre for forEach for of for in' },
      { icon:'❓', label:'Condicionais e Switch',           q:'if else switch ternario quando usar' },
      { icon:'⚙️', label:'Funções & Arrow Functions',      q:'diferenca funcao normal arrow function' },
      { icon:'🔄', label:'Recursividade na prática',       q:'o que e recursao quando usar exemplos' },
      { icon:'📚', label:'Pilhas e Filas (Stack/Queue)',   q:'pilha fila stack queue lifo fifo exemplos' },
      { icon:'🗺️', label:'Hash Map / Dicionário',         q:'hashmap mapa dicionario big o quando usar' },
      { icon:'🔒', label:'Closures & Escopo Léxico',       q:'o que e closure escopo lexico javascript' },
      { icon:'⚡', label:'Async, Await e Promises',        q:'como funciona async await promise then catch' },
    ]
  },
  en: {
    title: '🤖 Dev Assistant',
    placeholder: 'E.g. how do closures work? what is Big O? difference between == and ===?',
    send: 'Ask', sending: 'Thinking...',
    analyzeCode: '🔍 Analyze my code', analyzing: '🔍 Analyzing...',
    close: '✕', minimize: '—', clear: 'Clear chat',
    idleMsg: 'You\'ve been idle for a while. Can I give you a hint?',
    welcomeMsg: 'Hi! 👋 I\'m the **Dev Assistant** powered by Gemini AI.\n\nAsk me anything about programming — detailed answers with code examples.\n\n🔑 Set up your **free API key** from Google AI Studio in ⚙️ to activate Gemini!',
    welcomeMsgKeyed: 'Hi! 👋 **Gemini AI active** ✅\n\nAsk me anything about programming — I\'ll answer with code examples, Big O complexity analysis, and pro tips!',
    errorMsg: 'Could not process that. Try rephrasing your question.',
    emptyCode: 'Your editor is empty. Write some code first!',
    youLabel: 'You', aiLabel: 'AI',
    apiKeyLabel: 'API Key (Gemini)',
    apiKeyTitle: '🔑 Configure Gemini API Key',
    apiKeyDesc: 'Get your free key from Google AI Studio:',
    apiKeyLink: '→ Visit aistudio.google.com',
    apiKeyPlaceholder: 'AIzaSy...',
    apiKeyWarn: '⚠️ Your key is saved only in your browser (localStorage) — never sent to external servers.',
    apiKeyConfirm: 'Save', apiKeyCancel: 'Cancel', apiKeyRemove: 'Remove key',
    activeLabel: '● Gemini AI active', inactiveLabel: '○ Local mode',
    tabs: { ask: '💬 Ask', tips: '💡 Quick Tips' },
    quickTips: [
      { icon:'📦', label:'var vs let vs const',              q:'difference between let const var' },
      { icon:'📋', label:'Arrays: map / filter / reduce',    q:'how to use map filter reduce on arrays' },
      { icon:'🔁', label:'Loops & Iteration',                q:'difference between for forEach for of for in' },
      { icon:'❓', label:'Conditionals & Switch',             q:'if else switch ternary when to use' },
      { icon:'⚙️', label:'Functions & Arrow Functions',      q:'difference regular function vs arrow function' },
      { icon:'🔄', label:'Recursion in practice',            q:'what is recursion when to use examples' },
      { icon:'📚', label:'Stacks & Queues',                  q:'stack queue lifo fifo data structures examples' },
      { icon:'🗺️', label:'Hash Map / Dictionary',           q:'hashmap dictionary big o when to use' },
      { icon:'🔒', label:'Closures & Lexical Scope',         q:'what is closure lexical scope javascript' },
      { icon:'⚡', label:'Async, Await & Promises',          q:'how async await promise then catch works' },
    ]
  },
  fr: {
    title: '🤖 Assistant Dev',
    placeholder: 'Ex: comment fonctionnent les closures? c\'est quoi le Big O?',
    send: 'Demander', sending: 'Réflexion...',
    analyzeCode: '🔍 Analyser mon code', analyzing: '🔍 Analyse...',
    close: '✕', minimize: '—', clear: 'Effacer le chat',
    idleMsg: 'Vous êtes inactif. Puis-je vous aider ?',
    welcomeMsg: 'Bonjour ! 👋 Je suis l\'**Assistant Dev** avec Gemini AI.\n\nPosez-moi n\'importe quelle question de programmation.\n\n🔑 Configurez votre **clé API gratuite** Google AI Studio dans ⚙️ pour activer Gemini !',
    welcomeMsgKeyed: 'Bonjour ! 👋 **Gemini AI actif** ✅\n\nPosez-moi n\'importe quelle question de programmation — exemples de code, complexité Big O et conseils pro !',
    errorMsg: 'Impossible de traiter cela. Reformulez votre question.',
    emptyCode: 'Votre éditeur est vide. Écrivez d\'abord du code !',
    youLabel: 'Vous', aiLabel: 'IA',
    apiKeyLabel: 'Clé API (Gemini)',
    apiKeyTitle: '🔑 Configurer la clé API Gemini',
    apiKeyDesc: 'Obtenez votre clé gratuite sur Google AI Studio :',
    apiKeyLink: '→ Visiter aistudio.google.com',
    apiKeyPlaceholder: 'AIzaSy...',
    apiKeyWarn: '⚠️ Votre clé est stockée uniquement dans votre navigateur.',
    apiKeyConfirm: 'Enregistrer', apiKeyCancel: 'Annuler', apiKeyRemove: 'Supprimer la clé',
    activeLabel: '● Gemini AI actif', inactiveLabel: '○ Mode local',
    tabs: { ask: '💬 Demander', tips: '💡 Astuces' },
    quickTips: [
      { icon:'📦', label:'var vs let vs const',               q:'différence entre let const var' },
      { icon:'📋', label:'Tableaux: map / filter / reduce',   q:'comment utiliser map filter reduce' },
      { icon:'🔁', label:'Boucles & Itération',               q:'différence entre for forEach for of' },
      { icon:'❓', label:'Conditionnelles & Switch',           q:'if else switch ternaire quand utiliser' },
      { icon:'⚙️', label:'Fonctions & Arrow Functions',       q:'différence fonction normale arrow function' },
      { icon:'🔄', label:'Récursion en pratique',             q:'qu\'est-ce que la récursion exemples' },
      { icon:'📚', label:'Piles et Files',                    q:'pile file stack queue exemples' },
      { icon:'🗺️', label:'Hash Map / Dictionnaire',          q:'hashmap dictionnaire big o quand utiliser' },
      { icon:'🔒', label:'Closures & Portée Lexicale',        q:'qu\'est-ce qu\'une closure portée lexicale' },
      { icon:'⚡', label:'Async, Await & Promises',           q:'comment async await promise fonctionne' },
    ]
  }
};

// ═══════════════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════════════
const GUIDE = {
  open: false, minimized: false,
  idleTimer: null, idleShown: false,
  chatHistory: [], activeTab: 'ask',
  IDLE_MS: 12000,
};

// ═══════════════════════════════════════════════════════════════
//  API KEY MODAL
// ═══════════════════════════════════════════════════════════════
function guideShowAPIKeyModal(onSuccess) {
  document.getElementById('guideAPIKeyModal')?.remove();
  const tr  = GUIDE_I18N[currentLang] || GUIDE_I18N['pt'];
  const cur = guideGetAPIKey();

  const backdrop = document.createElement('div');
  backdrop.id = 'guideAPIKeyModal';
  backdrop.className = 'guide-modal-backdrop';
  backdrop.onclick = e => { if (e.target===backdrop) backdrop.remove(); };

  backdrop.innerHTML = `
    <div class="guide-modal-box" onclick="event.stopPropagation()">
      <div class="guide-modal-icon">🔑</div>
      <h3 class="guide-modal-title">${tr.apiKeyTitle}</h3>
      <p class="guide-modal-desc">${tr.apiKeyDesc}
        <a href="https://aistudio.google.com/app/apikey" target="_blank" class="guide-modal-link">${tr.apiKeyLink}</a>
      </p>
      <div class="guide-modal-steps">
        <div class="guide-modal-step"><strong>1.</strong> Acesse <strong>aistudio.google.com</strong></div>
        <div class="guide-modal-step"><strong>2.</strong> Clique em <strong>"Get API key"</strong> → "Create API key"</div>
        <div class="guide-modal-step"><strong>3.</strong> Cole abaixo — começa com <code style="color:#79c0ff">AIzaSy...</code></div>
        <div class="guide-modal-step"><strong>4.</strong> É <strong>100% gratuita</strong> — o mesmo tier do Playground!</div>
      </div>
      <div class="guide-modal-warn">${tr.apiKeyWarn}</div>
      <input type="password" id="guideAPIKeyInput" class="guide-modal-input"
        placeholder="${tr.apiKeyPlaceholder}" value="${cur}" autocomplete="off"/>
      <div class="guide-modal-actions">
        ${cur ? `<button class="guide-modal-cancel" style="color:#f85149;border-color:#f8514940"
          onclick="guideRemoveAPIKey();document.getElementById('guideAPIKeyModal').remove();buildGuide();">
          🗑 ${tr.apiKeyRemove}</button>` : ''}
        <button class="guide-modal-cancel" onclick="document.getElementById('guideAPIKeyModal').remove()">${tr.apiKeyCancel}</button>
        <button class="guide-modal-confirm" onclick="_guideSaveAPIKey()">✓ ${tr.apiKeyConfirm}</button>
      </div>
    </div>`;

  document.body.appendChild(backdrop);
  document.getElementById('guideAPIKeyInput')?.focus();
  if (onSuccess) window.__guideAPIKeyCallback = onSuccess;
}

function _guideSaveAPIKey() {
  const key = document.getElementById('guideAPIKeyInput')?.value.trim();
  if (!key) return;
  guideSetAPIKey(key);
  document.getElementById('guideAPIKeyModal')?.remove();
  if (window.__guideAPIKeyCallback) { window.__guideAPIKeyCallback(); window.__guideAPIKeyCallback = null; }
  const wasOpen = GUIDE.open;
  buildGuide();
  if (wasOpen) guideOpen();
  const lang = (typeof currentLang !== 'undefined' ? currentLang : 'pt');
  _guideAddMessage('ai', lang==='en'
    ? '✅ **Gemini AI activated!** Ask me anything — full AI-powered answers now!'
    : lang==='fr' ? '✅ **Gemini AI activé !** Posez-moi n\'importe quelle question !'
    : '✅ **Gemini AI ativado!** Agora tenho respostas completas com IA — pode perguntar qualquer coisa!');
}

// ═══════════════════════════════════════════════════════════════
//  BUILD WIDGET
// ═══════════════════════════════════════════════════════════════
function buildGuide() {
  document.getElementById('pg-guide-widget')?.remove();
  const tr     = GUIDE_I18N[currentLang] || GUIDE_I18N['pt'];
  const hasKey = !!guideGetAPIKey();

  const widget = document.createElement('div');
  widget.id = 'pg-guide-widget';
  widget.className = 'guide-widget' + (GUIDE.open?' open':'') + (GUIDE.minimized?' minimized':'');

  widget.innerHTML = `
    <button class="guide-fab" id="guideFab" onclick="guideToggle()" title="${tr.title}">
      <span class="guide-fab-icon">🤖</span>
      <span class="guide-fab-pulse" id="guideFabPulse"></span>
    </button>
    <div class="guide-panel" id="guidePanel">
      <div class="guide-header">
        <div class="guide-header-left">
          <span class="guide-header-icon">🤖</span>
          <div>
            <div class="guide-header-title">${tr.title}</div>
            <div style="font-size:0.68rem;color:${hasKey?'#2ea043':'#8b949e'};font-family:'JetBrains Mono',monospace;margin-top:1px">
              ${hasKey ? tr.activeLabel : tr.inactiveLabel}
            </div>
          </div>
        </div>
        <div class="guide-header-actions">
          <button class="guide-hbtn" onclick="guideShowAPIKeyModal()" title="${tr.apiKeyLabel}" style="${hasKey?'':'color:#f0883e'}">⚙️</button>
          <button class="guide-hbtn" onclick="guideClearChat()" title="${tr.clear}">🗑</button>
          <button class="guide-hbtn" onclick="guideMinimize()">${tr.minimize}</button>
          <button class="guide-hbtn" onclick="guideClose()">${tr.close}</button>
        </div>
      </div>
      <div class="guide-tabs">
        <button class="guide-tab active" id="guideTabAsk"  onclick="guideSetTab('ask')">${tr.tabs.ask}</button>
        <button class="guide-tab"        id="guideTabTips" onclick="guideSetTab('tips')">${tr.tabs.tips}</button>
      </div>
      <div id="guideTabPanelAsk" class="guide-tab-panel">
        <div class="guide-messages" id="guideMessages"></div>
        <div class="guide-input-area">
          <button class="guide-analyze-btn" id="guideAnalyzeBtn" onclick="guideAnalyzeCode()">${tr.analyzeCode}</button>
          <div class="guide-input-row">
            <textarea id="guideInput" class="guide-input" placeholder="${tr.placeholder}" rows="2"></textarea>
            <button class="guide-send-btn" id="guideSendBtn" onclick="guideSend()">${tr.send}</button>
          </div>
        </div>
      </div>
      <div id="guideTabPanelTips" class="guide-tab-panel" style="display:none">
        <div class="guide-tips-list">
          ${tr.quickTips.map((t,i)=>`
            <button class="guide-tip-btn" onclick="guideSendTip(${i})">
              <span class="guide-tip-icon">${t.icon}</span>
              <span class="guide-tip-label">${t.label}</span>
              <span class="guide-tip-arrow">→</span>
            </button>`).join('')}
        </div>
      </div>
    </div>`;

  document.body.appendChild(widget);
  document.getElementById('guideInput')?.addEventListener('keydown', e => {
    if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); guideSend(); }
  });

  if (GUIDE.chatHistory.length === 0) {
    _guideAddMessage('ai', hasKey ? tr.welcomeMsgKeyed : tr.welcomeMsg);
  } else {
    GUIDE.chatHistory.forEach(m => _guideRenderMessage(m.role, m.content, false));
  }
}

// ─── Open / Close / Minimize ──────────────────────────────────
function guideToggle() { GUIDE.open ? guideClose() : guideOpen(); }
function guideOpen() {
  GUIDE.open=true; GUIDE.minimized=false; GUIDE.idleShown=true;
  const w = document.getElementById('pg-guide-widget');
  if (w) { w.classList.add('open'); w.classList.remove('minimized'); }
  document.getElementById('guideFabPulse')?.classList.remove('active');
  setTimeout(() => document.getElementById('guideInput')?.focus(), 200);
}
function guideClose() {
  GUIDE.open=false;
  document.getElementById('pg-guide-widget')?.classList.remove('open');
}
function guideMinimize() {
  GUIDE.minimized=!GUIDE.minimized;
  document.getElementById('pg-guide-widget')?.classList.toggle('minimized', GUIDE.minimized);
}

// ─── Tabs ─────────────────────────────────────────────────────
function guideSetTab(tab) {
  GUIDE.activeTab=tab;
  ['ask','tips'].forEach(t => {
    const C=t[0].toUpperCase()+t.slice(1);
    document.getElementById(`guideTab${C}`)?.classList.toggle('active', t===tab);
    const p=document.getElementById(`guideTabPanel${C}`);
    if (p) p.style.display = t===tab ? 'flex' : 'none';
  });
}

// ─── Messaging ────────────────────────────────────────────────
function _guideAddMessage(role, content, save=true) {
  if (save) GUIDE.chatHistory.push({ role, content });
  _guideRenderMessage(role, content, true);
}
function _guideRenderMessage(role, content, scroll=true) {
  const c = document.getElementById('guideMessages');
  if (!c) return;
  const tr = GUIDE_I18N[currentLang] || GUIDE_I18N['pt'];
  const div = document.createElement('div');
  div.className = `guide-msg guide-msg-${role}`;
  const fmt = content
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="guide-inline-code">$1</code>')
    .replace(/```[\w]*\n?([\s\S]*?)```/g, '<pre class="guide-code-block"><code>$1</code></pre>')
    .replace(/\n/g, '<br>');
  div.innerHTML = `<div class="guide-msg-label">${role==='ai'?tr.aiLabel+' 🤖':tr.youLabel}</div><div class="guide-msg-bubble">${fmt}</div>`;
  c.appendChild(div);
  if (scroll) c.scrollTop = c.scrollHeight;
}
function _guideShowTyping() {
  const c = document.getElementById('guideMessages');
  if (!c) return null;
  const div = document.createElement('div');
  div.className='guide-msg guide-msg-ai guide-msg-typing'; div.id='guideTypingIndicator';
  div.innerHTML=`<div class="guide-msg-label">IA 🤖</div><div class="guide-msg-bubble"><span class="guide-dots"><span></span><span></span><span></span></span></div>`;
  c.appendChild(div); c.scrollTop=c.scrollHeight; return div;
}

// ─── Editor helpers ───────────────────────────────────────────
function _guideGetCurrentCode() {
  const mode=typeof PG!=='undefined'?PG.mode:'js';
  const map={js:'pgEditor',html:'pgEditorHTML',java:'pgEditorJava',python:'pgEditorPython',challenge:'pgEditorChallenge'};
  return document.getElementById(map[mode]||'pgEditor')?.value.trim()||'';
}
function _guideGetLangLabel() {
  const mode=typeof PG!=='undefined'?PG.mode:'js';
  return {js:'JavaScript',html:'HTML/CSS',java:'Java',python:'Python',challenge:'JavaScript'}[mode]||'JavaScript';
}

// ─── Send / Analyze / Tip ─────────────────────────────────────
async function guideSend() {
  const input=document.getElementById('guideInput');
  const btn=document.getElementById('guideSendBtn');
  const tr=GUIDE_I18N[currentLang]||GUIDE_I18N['pt'];
  if (!input||!btn) return;
  const text=input.value.trim(); if (!text) return;
  input.value=''; btn.disabled=true; btn.textContent=tr.sending;
  _guideAddMessage('user', text);
  const typing=_guideShowTyping();
  try { typing?.remove(); _guideAddMessage('ai', await _guideAnswer(text)); }
  catch(e) { typing?.remove(); _guideAddMessage('ai', tr.errorMsg); }
  btn.disabled=false; btn.textContent=tr.send;
  guideSetTab('ask'); document.getElementById('guideInput')?.focus();
}

async function guideAnalyzeCode() {
  const btn=document.getElementById('guideAnalyzeBtn');
  const tr=GUIDE_I18N[currentLang]||GUIDE_I18N['pt'];
  const code=_guideGetCurrentCode();
  if (!code) { _guideAddMessage('ai', tr.emptyCode); guideSetTab('ask'); return; }
  if (btn) { btn.disabled=true; btn.textContent=tr.analyzing; }
  const ll=_guideGetLangLabel();
  const lang=(typeof currentLang!=='undefined'?currentLang:'pt');
  _guideAddMessage('user', lang==='en'?`🔍 Analyze my ${ll} code`:lang==='fr'?`🔍 Analyser mon code ${ll}`:`🔍 Analise meu código ${ll}`);
  guideSetTab('ask');
  const typing=_guideShowTyping();
  let result;
  if (guideGetAPIKey()) { try { result=await _guideAnalyzeCodeGemini(code,ll); } catch(e) { result=_guideAnalyzeCodeLocal(code); } }
  else { await new Promise(r=>setTimeout(r,500)); result=_guideAnalyzeCodeLocal(code); }
  typing?.remove(); _guideAddMessage('ai', result||tr.errorMsg);
  if (btn) { btn.disabled=false; btn.textContent=tr.analyzeCode; }
}

async function guideSendTip(idx) {
  const tr=GUIDE_I18N[currentLang]||GUIDE_I18N['pt'];
  const tip=tr.quickTips[idx]; if (!tip) return;
  guideSetTab('ask'); _guideAddMessage('user', tip.label);
  const typing=_guideShowTyping();
  const btn=document.getElementById('guideSendBtn'); if (btn) btn.disabled=true;
  try { typing?.remove(); _guideAddMessage('ai', await _guideAnswer(tip.q)); }
  catch(e) { typing?.remove(); _guideAddMessage('ai', tr.errorMsg); }
  if (btn) btn.disabled=false;
}

function guideClearChat() {
  GUIDE.chatHistory=[];
  const c=document.getElementById('guideMessages'); if (c) c.innerHTML='';
  const tr=GUIDE_I18N[currentLang]||GUIDE_I18N['pt'];
  _guideAddMessage('ai', guideGetAPIKey()?tr.welcomeMsgKeyed:tr.welcomeMsg);
}

// ─── Idle detection ───────────────────────────────────────────
function _guideResetIdleTimer() {
  clearTimeout(GUIDE.idleTimer); GUIDE.idleShown=false;
  GUIDE.idleTimer=setTimeout(_guideOnIdle, GUIDE.IDLE_MS);
}
function _guideOnIdle() {
  if (_guideGetCurrentCode().length<10||GUIDE.open||GUIDE.idleShown) return;
  GUIDE.idleShown=true;
  document.getElementById('guideFabPulse')?.classList.add('active');
  _guideShowIdleToast();
}
function _guideShowIdleToast() {
  document.getElementById('guideIdleToast')?.remove();
  const tr=GUIDE_I18N[currentLang]||GUIDE_I18N['pt'];
  const toast=document.createElement('div');
  toast.id='guideIdleToast'; toast.className='guide-idle-toast';
  toast.innerHTML=`<span>💡 ${tr.idleMsg}</span>
    <button onclick="guideOpen();this.parentElement.remove()">Abrir</button>
    <button class="guide-toast-dismiss" onclick="this.parentElement.remove()">✕</button>`;
  document.body.appendChild(toast);
  setTimeout(()=>toast.remove(), 8000);
}
function _guideWireIdleToEditors() {
  ['pgEditor','pgEditorHTML','pgEditorJava','pgEditorPython','pgEditorChallenge'].forEach(id=>{
    const el=document.getElementById(id);
    if (!el||el.__guideWired) return;
    el.__guideWired=true;
    el.addEventListener('input',_guideResetIdleTimer);
    el.addEventListener('focus',_guideResetIdleTimer);
  });
}

// ─── Rebuild on lang change ───────────────────────────────────
function rebuildGuide() {
  const wasOpen=GUIDE.open; buildGuide(); if (wasOpen) guideOpen();
  _guideWireIdleToEditors();
}

// ─── INIT ─────────────────────────────────────────────────────
(function initGuide() {
  const check = setInterval(() => {
    if (document.getElementById('sections') && document.querySelector('.section.visible')) {
      clearInterval(check);
      buildGuide();
      _guideWireIdleToEditors();

      const origPatch = window.__pgPatchSetLang;
      window.__pgPatchSetLang = function() {
        if (origPatch) origPatch();
        const orig = window.setLang;
        if (!orig.__guidePatched) {
          const origSetLang = orig;
          window.setLang = function(lang, btn) {
            origSetLang(lang, btn);
            setTimeout(rebuildGuide, 250);
          };
          window.setLang.__guidePatched = true;
        }
      };

      const origBuild = window.buildPlayground;
      if (origBuild) {
        window.buildPlayground = function() {
          origBuild();
          setTimeout(_guideWireIdleToEditors, 300);
        };
      }
    }
  }, 300);
})();
