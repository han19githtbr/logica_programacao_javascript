// ═══════════════════════════════════════════════════════════════
//  AI GUIDE v3 — Assistente com Busca Local Refinada
//  Busca semântica nos dados locais (data.json) com suporte
//  a perguntas naturais em PT/EN/FR sobre lógica de programação
// ═══════════════════════════════════════════════════════════════

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

// ─── Synonym / keyword map ─────────────────────────────────────
const GUIDE_SYNONYMS = {
  'variaveis':    ['variavel','variable','variables','var','let','declarar','declaracao','nomear'],
  'constantes':   ['constante','constant','constants','const','imutavel','readonly','imutable'],
  'arrays':       ['array','lista','listas','list','vetor','vetores','colecao','collection','indice','indices','elementos'],
  'structs':      ['struct','objeto','objetos','object','objects','propriedades','chave','valor','key','value','json'],
  'listas':       ['lista encadeada','linked list','node','no','ponteiro proximo','encadeada','ligada','linkedlist'],
  'arvores':      ['arvore','tree','bst','binary search tree','binaria','raiz','root','folha','leaf','altura','profundidade','balanceada'],
  'mapa':         ['mapa','map','maps','hashmap','dicionario','dictionary','hash','tabela hash','chave valor','key value'],
  'pilhas':       ['pilha','stack','lifo','empilhar','desempilhar','push','pop','undo','desfazer','call stack'],
  'filas':        ['fila','queue','fifo','enfileirar','desinfileirar','enqueue','dequeue','breadth','bfs'],
  'ponteiros':    ['ponteiro','pointer','referencia','reference','endereco','address','null','nullptr','deref'],
  'recursividade':['recursao','recursivo','recursive','recursion','base case','caso base','fibonacci','fatorial','factorial','backtracking','dfs'],
  'funcoes':      ['funcao','function','metodo','method','parametro','argumento','retorno','return','arrow','lambda','closure','escopo','scope','callback'],
  'memoria':      ['memoria','memory','heap','stack memory','alocacao','allocation','garbage','gc','leak','vazamento','ram','cache'],
  'condicionais': ['condicional','if','else','switch','ternario','ternary','case','comparacao','logico','booleano','boolean','verdadeiro','falso','true','false','operador'],
  'repeticao':    ['loop','repeticao','for','while','do while','foreach','iteracao','iterate','break','continue','incremento','laço','laco'],
};

// ─── Normalize string ──────────────────────────────────────────
function _norm(s) {
  return (s || '').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim();
}

// ─── Tokenize query into meaningful words ─────────────────────
function _tokenize(q) {
  const stopWords = new Set([
    'o','a','os','as','um','uma','de','do','da','dos','das',
    'em','no','na','nos','nas','por','para','com','que','se',
    'e','ou','mas','the','is','are','of','to','in','on','at',
    'what','how','why','when','where','which','can','do','does',
    'le','la','les','un','une','des','du','au','et','est','que',
    'me','my','i','you','your','eu','meu','minha','voce','seu','sua',
    'isso','isto','esse','esta','este','essa','aqui','ali',
    'qual','quais','como','onde','porque','quando','quem',
    'ser','estar','ter','fazer','ir','ver','dar','saber'
  ]);
  return _norm(q).split(/\s+/).filter(w => w.length > 1 && !stopWords.has(w));
}

// ─── Advanced local search engine ─────────────────────────────
function _guideSearch(query) {
  const kb = _guideGetKB();
  if (!kb.length) return null;

  const qNorm  = _norm(query);
  const tokens = _tokenize(query);
  const lang   = (typeof currentLang !== 'undefined' ? currentLang : 'pt');

  const titleKey = lang === 'en' ? 'title_en' : lang === 'fr' ? 'title_fr' : 'title';
  const descKey  = lang === 'en' ? 'desc_en'  : lang === 'fr' ? 'desc_fr'  : 'desc';
  const prosKey  = lang === 'en' ? 'pros_en'  : lang === 'fr' ? 'pros_fr'  : 'pros';
  const consKey  = lang === 'en' ? 'cons_en'  : lang === 'fr' ? 'cons_fr'  : 'cons';
  const whenKey  = lang === 'en' ? 'when_en'  : lang === 'fr' ? 'when_fr'  : 'when';

  const isQuestion = /\?|como|what|how|why|quando|where|qual|diferenca|difference|explain|explica|o que|qu est|define|definicao/.test(qNorm);

  const scored = kb.map(item => {
    const titleNorm = _norm(item[titleKey] || item.title || '');
    const descNorm  = _norm(item[descKey]  || item.desc  || '');
    const prosNorm  = (item[prosKey]  || item.pros  || []).map(_norm).join(' ');
    const consNorm  = (item[consKey]  || item.cons  || []).map(_norm).join(' ');
    const whenNorm  = _norm(item[whenKey]  || item.when  || '');
    const id        = _norm(item.id || '');
    let score = 0;

    // ── Exact & near-exact matches ─────────────────────────────
    if (qNorm === id || qNorm === titleNorm)                                   score += 200;
    else if (id.includes(qNorm) && qNorm.length > 2)                          score += 90;
    else if (titleNorm === qNorm)                                               score += 150;
    else if (titleNorm.includes(qNorm) && qNorm.length > 2)                    score += 70;
    else if (qNorm.includes(titleNorm) && titleNorm.length > 3)                score += 55;

    // ── Description / pros / cons / when match ─────────────────
    if (descNorm.includes(qNorm) && qNorm.length > 3)  score += 25;
    if (whenNorm.includes(qNorm) && qNorm.length > 3)  score += 15;
    if (prosNorm.includes(qNorm) && qNorm.length > 3)  score += 10;
    if (consNorm.includes(qNorm) && qNorm.length > 3)  score += 10;

    // ── Synonym matching (primary group for this item) ─────────
    const synonymGroup = GUIDE_SYNONYMS[id];
    if (synonymGroup) {
      synonymGroup.forEach(syn => {
        if (qNorm === syn)                                   score += 120;
        else if (qNorm.includes(syn) && syn.length > 2)     score += 80;
        else if (syn.includes(qNorm) && qNorm.length > 2)   score += 60;
        // token-level synonym
        tokens.forEach(tok => {
          if (tok === syn)                                   score += 70;
          else if (syn.includes(tok) && tok.length > 2)     score += 45;
          else if (tok.includes(syn) && syn.length > 2)     score += 35;
        });
      });
    }

    // ── Token-by-token matching ────────────────────────────────
    tokens.forEach(tok => {
      if (tok.length < 2) return;
      if (id === tok)                                        score += 100;
      else if (id.includes(tok) && tok.length > 2)          score += 60;
      else if (tok.includes(id) && id.length > 2)           score += 40;
      if (titleNorm.includes(tok) && tok.length > 2)        score += 35;
      if (descNorm.includes(tok)  && tok.length > 2)        score += 12;
      if (whenNorm.includes(tok)  && tok.length > 2)        score += 8;
    });

    // ── Question type: reward rich items ──────────────────────
    if (isQuestion) {
      const hasGoodDesc = (item[descKey] || item.desc || '').length > 60;
      const hasExamples = !!(item.examples && Object.keys(item.examples).length > 0);
      if (hasGoodDesc) score += 10;
      if (hasExamples) score += 8;
    }

    // ── Slight priority for 'logica' topic (core CS) ──────────
    if (item._topicId === 'logica') score += 5;

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, 3).filter(r => r.score >= 10);
  if (!top.length) return null;

  return {
    item: top[0].item,
    related: top.slice(1).map(r => r.item),
    titleKey, descKey, prosKey, consKey, whenKey,
    score: top[0].score
  };
}

// ─── Format local knowledge item into rich answer ─────────────
function _guideFormatAnswer(result, originalQuery) {
  if (!result) return null;
  const { item, related, titleKey, descKey, prosKey, consKey, whenKey } = result;
  const lang = (typeof currentLang !== 'undefined' ? currentLang : 'pt');

  const title = item[titleKey] || item.title || item.id;
  const desc  = item[descKey]  || item.desc  || '';
  const pros  = item[prosKey]  || item.pros  || [];
  const cons  = item[consKey]  || item.cons  || [];
  const when  = item[whenKey]  || item.when  || '';
  const icon  = item.icon || '📖';

  const L = {
    when:    lang==='en' ? '🕐 When to use' : lang==='fr' ? '🕐 Quand utiliser' : '🕐 Quando usar',
    pros:    lang==='en' ? '✅ Advantages'  : lang==='fr' ? '✅ Avantages'       : '✅ Vantagens',
    cons:    lang==='en' ? '❌ Drawbacks'   : lang==='fr' ? '❌ Inconvénients'   : '❌ Desvantagens',
    ex:      lang==='en' ? '💻 Example'     : lang==='fr' ? '💻 Exemple'         : '💻 Exemplo',
    related: lang==='en' ? '🔗 See also'    : lang==='fr' ? '🔗 Voir aussi'       : '🔗 Veja também',
    output:  lang==='en' ? '📤 Output'      : lang==='fr' ? '📤 Sortie'           : '📤 Saída',
  };

  let answer = `${icon} **${title}**\n\n${desc}`;

  if (when) answer += `\n\n${L.when}: ${when}`;

  if (pros.length) {
    answer += `\n\n${L.pros}:\n` + pros.slice(0, 3).map(p => `• ${p}`).join('\n');
  }
  if (cons.length) {
    answer += `\n\n${L.cons}:\n` + cons.slice(0, 3).map(c => `• ${c}`).join('\n');
  }

  // Pick most relevant example language (prefer JS then Python)
  const exs = item.examples || {};
  const exOrder = ['javascript', 'python', 'java', 'c', 'php'];
  const exLang  = exOrder.find(l => exs[l]);
  if (exLang && exs[exLang]) {
    const exLabel = {javascript:'JS', python:'Python', java:'Java', c:'C', php:'PHP'}[exLang] || exLang;
    answer += `\n\n${L.ex} (${exLabel}):\n\`\`\`\n${exs[exLang]}\n\`\`\``;
  }

  // Show expected output if available
  if (item.output) {
    answer += `\n\n${L.output}:\n\`\`\`\n${item.output}\n\`\`\``;
  }

  // Related topics
  if (related && related.length > 0) {
    const relTitles = related.map(r => `${r.icon||'📌'} ${r[titleKey]||r.title}`).join(', ');
    answer += `\n\n${L.related}: ${relTitles}`;
  }

  return answer;
}

// ─── "Not found" fallback with smart suggestions ──────────────
function _guideNotFoundMsg(query) {
  const lang = (typeof currentLang !== 'undefined' ? currentLang : 'pt');
  const kb   = _guideGetKB();
  const titleKey = lang==='en'?'title_en':lang==='fr'?'title_fr':'title';

  // Prefer logica subtopics as suggestions
  const logicaItems = kb.filter(i => i._topicId === 'logica');
  const sugg = logicaItems.sort(() => Math.random() - .5).slice(0, 3)
    .map(s => `• ${s.icon||'📌'} ${s[titleKey]||s.title}`).join('\n');

  const tips = {
    pt: ['"como funciona recursão?"', '"o que é uma pilha?"', '"diferença array vs lista"'],
    en: ['"how does recursion work?"', '"what is a stack?"', '"array vs linked list"'],
    fr: ['"comment fonctionne la récursion?"', '"qu\'est-ce qu\'une pile?"', '"array vs liste liée"'],
  };

  if (lang==='en') return `🔍 Couldn't find **"${query}"** in the manual.\n\nSuggested topics:\n${sugg}\n\n💡 Try: ${tips.en.join(', ')}`;
  if (lang==='fr') return `🔍 **"${query}"** introuvable dans le manuel.\n\nSujets suggérés :\n${sugg}\n\n💡 Essayez : ${tips.fr.join(', ')}`;
  return `🔍 Não encontrei **"${query}"** no manual.\n\nTópicos sugeridos:\n${sugg}\n\n💡 Tente: ${tips.pt.join(', ')}`;
}

// ─── Main answer engine (100% local, sem API) ─────────────────
async function _guideAnswer(userMessage) {
  const localResult = _guideSearch(userMessage);
  if (localResult && localResult.score >= 10) {
    return _guideFormatAnswer(localResult, userMessage);
  }
  return _guideNotFoundMsg(userMessage);
}

// ─── Local code analyzer ──────────────────────────────────────
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
  };

  let msg = `🔍 ${L.s}\n\n`;
  if (good.length)   msg += `${L.g}:\n` + good.map(p=>`• ${p}`).join('\n') + '\n\n';
  if (issues.length) msg += `${L.i}:\n` + issues.map(i=>`• ${i}`).join('\n') + '\n\n';
  if (tips.length)   msg += `${L.t}: ${tips[0]}`;
  return msg;
}

// ═══════════════════════════════════════════════════════════════
//  I18N
// ═══════════════════════════════════════════════════════════════
const GUIDE_I18N = {
  pt: {
    title: '🤖 Assistente Dev',
    placeholder: 'Ex: o que é recursão? como funciona array? diferença pilha vs fila?',
    send: 'Perguntar', sending: 'Buscando...',
    analyzeCode: '🔍 Analisar meu código', analyzing: '🔍 Analisando...',
    close: '✕', minimize: '—', clear: 'Limpar chat',
    idleMsg: 'Ficou um tempo sem digitar. Posso dar uma dica?',
    welcomeMsg: 'Olá! 👋 Sou o **Assistente Dev** com busca local inteligente.\n\nPergunta sobre qualquer tópico de lógica — variáveis, arrays, recursão, pilhas, filas, árvores e muito mais!\n\n💡 Funciona **100% offline**, sem API key.',
    errorMsg: 'Não consegui processar isso. Tente reformular a pergunta.',
    emptyCode: 'Seu editor está vazio. Escreva algum código primeiro!',
    youLabel: 'Você', aiLabel: 'IA',
    activeLabel: '● Busca local ativa',
    tabs: { ask: '💬 Perguntar', tips: '💡 Dicas Rápidas' },
    quickTips: [
      { icon:'📦', label:'var vs let vs const',            q:'qual a diferença entre let const var' },
      { icon:'📋', label:'Arrays na prática',              q:'como funcionam arrays' },
      { icon:'🔁', label:'Loops e Repetição',              q:'estruturas de repeticao for while' },
      { icon:'❓', label:'Condicionais e Switch',           q:'estruturas de condicao if else switch' },
      { icon:'⚙️', label:'Funções na prática',             q:'como funcionam funcoes' },
      { icon:'🔄', label:'Recursividade na prática',       q:'o que e recursividade quando usar' },
      { icon:'📚', label:'Pilhas e Filas (Stack/Queue)',   q:'pilha fila stack queue lifo fifo' },
      { icon:'🗺️', label:'Hash Map / Dicionário',         q:'mapa hashmap dicionario' },
      { icon:'🌳', label:'Árvores BST',                    q:'arvores bst binaria' },
      { icon:'💾', label:'Alocação de Memória',            q:'alocacao consumo de memoria heap' },
    ]
  },
  en: {
    title: '🤖 Dev Assistant',
    placeholder: 'E.g. what is recursion? how does an array work? stack vs queue?',
    send: 'Ask', sending: 'Searching...',
    analyzeCode: '🔍 Analyze my code', analyzing: '🔍 Analyzing...',
    close: '✕', minimize: '—', clear: 'Clear chat',
    idleMsg: 'You\'ve been idle for a while. Can I give you a hint?',
    welcomeMsg: 'Hi! 👋 I\'m the **Dev Assistant** with smart local search.\n\nAsk me anything about programming logic — variables, arrays, recursion, stacks, queues, trees and more!\n\n💡 Works **100% offline**, no API key needed.',
    errorMsg: 'Could not process that. Try rephrasing your question.',
    emptyCode: 'Your editor is empty. Write some code first!',
    youLabel: 'You', aiLabel: 'AI',
    activeLabel: '● Local search active',
    tabs: { ask: '💬 Ask', tips: '💡 Quick Tips' },
    quickTips: [
      { icon:'📦', label:'var vs let vs const',              q:'difference between let const var' },
      { icon:'📋', label:'Arrays in practice',               q:'how do arrays work' },
      { icon:'🔁', label:'Loops & Iteration',                q:'loops for while repetition' },
      { icon:'❓', label:'Conditionals & Switch',             q:'conditional structures if else switch' },
      { icon:'⚙️', label:'Functions in practice',            q:'how do functions work' },
      { icon:'🔄', label:'Recursion in practice',            q:'what is recursion when to use' },
      { icon:'📚', label:'Stacks & Queues',                  q:'stack queue lifo fifo' },
      { icon:'🗺️', label:'Hash Map / Dictionary',           q:'hashmap dictionary' },
      { icon:'🌳', label:'BST Trees',                        q:'binary search tree bst' },
      { icon:'💾', label:'Memory Allocation',                q:'memory allocation heap stack' },
    ]
  },
  fr: {
    title: '🤖 Assistant Dev',
    placeholder: 'Ex: c\'est quoi la récursion? comment fonctionne un tableau?',
    send: 'Demander', sending: 'Recherche...',
    analyzeCode: '🔍 Analyser mon code', analyzing: '🔍 Analyse...',
    close: '✕', minimize: '—', clear: 'Effacer le chat',
    idleMsg: 'Vous êtes inactif. Puis-je vous aider ?',
    welcomeMsg: 'Bonjour ! 👋 Je suis l\'**Assistant Dev** avec recherche locale intelligente.\n\nPosez-moi n\'importe quelle question de logique — variables, tableaux, récursion, piles, files, arbres et plus !\n\n💡 Fonctionne **100% hors ligne**, sans clé API.',
    errorMsg: 'Impossible de traiter cela. Reformulez votre question.',
    emptyCode: 'Votre éditeur est vide. Écrivez d\'abord du code !',
    youLabel: 'Vous', aiLabel: 'IA',
    activeLabel: '● Recherche locale active',
    tabs: { ask: '💬 Demander', tips: '💡 Astuces' },
    quickTips: [
      { icon:'📦', label:'var vs let vs const',               q:'différence entre let const var' },
      { icon:'📋', label:'Tableaux en pratique',              q:'comment fonctionnent les tableaux' },
      { icon:'🔁', label:'Boucles & Itération',               q:'structures de répétition for while' },
      { icon:'❓', label:'Conditionnelles & Switch',           q:'structures conditionnelles if else switch' },
      { icon:'⚙️', label:'Fonctions en pratique',             q:'comment fonctionnent les fonctions' },
      { icon:'🔄', label:'Récursion en pratique',             q:'qu\'est-ce que la récursion exemples' },
      { icon:'📚', label:'Piles et Files',                    q:'pile file stack queue lifo fifo' },
      { icon:'🗺️', label:'Hash Map / Dictionnaire',          q:'hashmap dictionnaire' },
      { icon:'🌳', label:'Arbres BST',                        q:'arbre binaire de recherche bst' },
      { icon:'💾', label:'Allocation Mémoire',                q:'allocation mémoire heap stack' },
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
//  BUILD WIDGET
// ═══════════════════════════════════════════════════════════════
function buildGuide() {
  document.getElementById('pg-guide-widget')?.remove();
  const tr = GUIDE_I18N[currentLang] || GUIDE_I18N['pt'];

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
            <div style="font-size:0.68rem;color:#2ea043;font-family:'JetBrains Mono',monospace;margin-top:1px">
              ${tr.activeLabel}
            </div>
          </div>
        </div>
        <div class="guide-header-actions">
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
    _guideAddMessage('ai', tr.welcomeMsg);
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
  await new Promise(r => setTimeout(r, 300));
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
  await new Promise(r => setTimeout(r, 400));
  const result = _guideAnalyzeCodeLocal(code);
  typing?.remove(); _guideAddMessage('ai', result||tr.errorMsg);
  if (btn) { btn.disabled=false; btn.textContent=tr.analyzeCode; }
}

async function guideSendTip(idx) {
  const tr=GUIDE_I18N[currentLang]||GUIDE_I18N['pt'];
  const tip=tr.quickTips[idx]; if (!tip) return;
  guideSetTab('ask'); _guideAddMessage('user', tip.label);
  const typing=_guideShowTyping();
  const btn=document.getElementById('guideSendBtn'); if (btn) btn.disabled=true;
  await new Promise(r => setTimeout(r, 300));
  try { typing?.remove(); _guideAddMessage('ai', await _guideAnswer(tip.q)); }
  catch(e) { typing?.remove(); _guideAddMessage('ai', tr.errorMsg); }
  if (btn) btn.disabled=false;
}

function guideClearChat() {
  GUIDE.chatHistory=[];
  const c=document.getElementById('guideMessages'); if (c) c.innerHTML='';
  const tr=GUIDE_I18N[currentLang]||GUIDE_I18N['pt'];
  _guideAddMessage('ai', tr.welcomeMsg);
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
