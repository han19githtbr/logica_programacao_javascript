// ===== I18N =====
const I18N = {
  pt: {
    badge: 'Guia Técnico · Entrevista Front-end',
    heroTitle: 'Manual de <span>Programação</span><br>para Entrevistas',
    heroDesc: 'Lógica, JavaScript, HTML, CSS, API REST, Git e Frameworks — com exemplos em múltiplas linguagens, prós, contras e quando usar.',
    lblTopics: 'Tópicos', lblLangs: 'Linguagens', lblExamples: 'Exemplos',
    searchPlaceholder: 'Buscar tópico, conceito ou linguagem...',
    breadcrumbHome: 'Home', breadcrumbSelect: 'Selecione uma seção',
    topicCount: (n) => `${n} tópicos`,
    tabVision: 'ℹ Visão Geral', tabCode: '💻 Código',
    pros: '✅ Vantagens', cons: '❌ Desvantagens', when: '🎯 Quando Usar',
    noExample: 'Nenhum exemplo disponível.',
    copiar: 'Copiar', copiado: '✓ Copiado!', saida: 'Saída',
    stackTitle: '🚀 Stacks de Alto Desempenho',
    stacks: [
      { name: '🇧🇷 Stack Mercado BR (Fintechs & Startups)', color: '#2ea043', techs: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Zustand/React Query', 'Jest + RTL', 'Vercel', 'GitHub Actions'], why: 'Dominante em Nubank, iFood, Hotmart. Next.js entrega SEO + performance com SSR/SSG. TypeScript reduz bugs em produção. Tailwind agiliza UI consistente.' },
      { name: '🌍 Stack Internacional (Big Techs)', color: '#2563eb', techs: ['React / Vue 3', 'TypeScript', 'GraphQL + Apollo', 'Storybook', 'Cypress / Playwright', 'Docker', 'AWS / GCP'], why: 'Times distribuídos exigem GraphQL para flexibilidade de dados, Storybook para design system compartilhado e testes E2E robustos.' },
      { name: '⚡ Stack Performance Máxima', color: '#dc2626', techs: ['Next.js App Router', 'React Server Components', 'Vite', 'Tailwind CSS', 'SWR / React Query', 'Vercel Edge', 'Service Workers'], why: 'RSC reduz JS enviado ao cliente. Edge functions aproximam a lógica do usuário. SWR gerencia cache com stale-while-revalidate.' }
    ]
  },
  en: {
    badge: 'Tech Guide · Front-end Interview',
    heroTitle: '<span>Programming</span> Manual<br>for Interviews',
    heroDesc: 'Logic, JavaScript, HTML, CSS, REST API, Git and Frameworks — with examples in multiple languages, pros, cons and when to use each.',
    lblTopics: 'Topics', lblLangs: 'Languages', lblExamples: 'Examples',
    searchPlaceholder: 'Search topic, concept or language...',
    breadcrumbHome: 'Home', breadcrumbSelect: 'Select a section',
    topicCount: (n) => `${n} topics`,
    tabVision: 'ℹ Overview', tabCode: '💻 Code',
    pros: '✅ Advantages', cons: '❌ Disadvantages', when: '🎯 When to Use',
    noExample: 'No examples available.',
    copiar: 'Copy', copiado: '✓ Copied!', saida: 'Output',
    stackTitle: '🚀 High-Performance Stacks',
    stacks: [
      { name: '🇧🇷 BR Market Stack (Fintechs & Startups)', color: '#2ea043', techs: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Zustand/React Query', 'Jest + RTL', 'Vercel', 'GitHub Actions'], why: 'Dominant at Nubank, iFood, Hotmart. Next.js delivers SEO + performance with SSR/SSG. TypeScript reduces production bugs. Tailwind accelerates consistent UI.' },
      { name: '🌍 International Stack (Big Tech)', color: '#2563eb', techs: ['React / Vue 3', 'TypeScript', 'GraphQL + Apollo', 'Storybook', 'Cypress / Playwright', 'Docker', 'AWS / GCP'], why: 'Distributed teams need GraphQL for data flexibility, Storybook for shared design systems and robust E2E testing. Docker ensures environment parity.' },
      { name: '⚡ Maximum Performance Stack', color: '#dc2626', techs: ['Next.js App Router', 'React Server Components', 'Vite', 'Tailwind CSS', 'SWR / React Query', 'Vercel Edge', 'Service Workers'], why: 'RSC reduces JS sent to the client. Edge functions bring logic closer to the user. SWR handles smart caching with stale-while-revalidate.' }
    ]
  },
  fr: {
    badge: 'Guide Technique · Entretien Front-end',
    heroTitle: 'Manuel de <span>Programmation</span><br>pour Entretiens',
    heroDesc: 'Logique, JavaScript, HTML, CSS, API REST, Git et Frameworks — avec des exemples en plusieurs langages, avantages, inconvénients et quand utiliser.',
    lblTopics: 'Sujets', lblLangs: 'Langages', lblExamples: 'Exemples',
    searchPlaceholder: 'Rechercher un sujet, concept ou langage...',
    breadcrumbHome: 'Accueil', breadcrumbSelect: 'Sélectionner une section',
    topicCount: (n) => `${n} sujets`,
    tabVision: 'ℹ Vue d\'ensemble', tabCode: '💻 Code',
    pros: '✅ Avantages', cons: '❌ Inconvénients', when: '🎯 Quand Utiliser',
    noExample: 'Aucun exemple disponible.',
    copiar: 'Copier', copiado: '✓ Copié !', saida: 'Résultat',
    stackTitle: '🚀 Stacks Haute Performance',
    stacks: [
      { name: '🇧🇷 Stack Marché BR (Fintechs & Startups)', color: '#2ea043', techs: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Zustand/React Query', 'Jest + RTL', 'Vercel', 'GitHub Actions'], why: 'Dominante chez Nubank, iFood, Hotmart. Next.js offre SEO + performance avec SSR/SSG. TypeScript réduit les bugs en production. Tailwind accélère une UI cohérente.' },
      { name: '🌍 Stack International (Big Tech)', color: '#2563eb', techs: ['React / Vue 3', 'TypeScript', 'GraphQL + Apollo', 'Storybook', 'Cypress / Playwright', 'Docker', 'AWS / GCP'], why: 'Les équipes distribuées ont besoin de GraphQL pour la flexibilité des données, de Storybook pour un design system partagé et de tests E2E robustes.' },
      { name: '⚡ Stack Performance Maximale', color: '#dc2626', techs: ['Next.js App Router', 'React Server Components', 'Vite', 'Tailwind CSS', 'SWR / React Query', 'Vercel Edge', 'Service Workers'], why: 'RSC réduit le JS envoyé au client. Les edge functions rapprochent la logique de l\'utilisateur. SWR gère le cache avec stale-while-revalidate.' }
    ]
  }
};

// ===== LOAD DATA & BUILD UI =====
let DATA = null;
let currentSection = null;
let currentLangs = {};
let currentLang = 'pt';

function t(key) { return I18N[currentLang][key]; }
function tSub(sub, key) { return sub[key + '_' + currentLang] || sub[key] || ''; }

async function loadData() {
  const res = await fetch('database/data.json');
  DATA = await res.json();
  window.DATA = DATA; // expose for ai-guide.js local search
  buildUI();
}

function buildUI() {
  buildHeader();
  buildSidebar();
  buildSections();
  buildComplexityTable();
  buildStackSection();
  updateStats();
  showSection(DATA.topics[0].id);
}

function buildHeader() {
  const tabs = document.getElementById('headerTabs');
  tabs.innerHTML = '';
  DATA.topics.forEach(topic => {
    const btn = document.createElement('button');
    btn.className = 'htab';
    btn.style.setProperty('--tab-color', topic.color);
    btn.innerHTML = `<span class="dot"></span>${topic.icon} ${tSub(topic, 'label')}`;
    btn.onclick = () => showSection(topic.id);
    btn.dataset.id = topic.id;
    tabs.appendChild(btn);
  });
}

function buildSidebar() {
  const sb = document.getElementById('sidebar');
  sb.innerHTML = '';
  DATA.topics.forEach(topic => {
    const sec = document.createElement('div');
    sec.className = 'sidebar-section';
    sec.innerHTML = `<div class="sidebar-label">${topic.icon} ${tSub(topic, 'label')}</div>`;
    topic.subtopics.forEach(sub => {
      const item = document.createElement('div');
      item.className = 'sidebar-item';
      item.style.setProperty('--item-color', topic.color);
      item.dataset.section = topic.id;
      item.dataset.sub = sub.id;
      item.innerHTML = `
        <span class="icon">${sub.icon}</span>
        <span class="label">${tSub(sub, 'title')}</span>
      `;
      item.onclick = () => {
        showSection(topic.id);
        setTimeout(() => scrollToCard(sub.id), 100);
      };
      sec.appendChild(item);
    });
    sb.appendChild(sec);
  });
}

function buildSections() {
  const container = document.getElementById('sections');
  container.innerHTML = '';
  DATA.topics.forEach(topic => {
    const section = document.createElement('div');
    section.className = 'section';
    section.id = `section-${topic.id}`;
    section.innerHTML = `
      <div class="section-header">
        <div class="section-icon">${topic.icon}</div>
        <div>
          <div class="section-title">${tSub(topic, 'label')}</div>
          <div class="section-sub">${t('topicCount')(topic.subtopics.length)}</div>
        </div>
      </div>
      <div class="topic-grid" id="grid-${topic.id}"></div>
    `;
    const grid = section.querySelector(`#grid-${topic.id}`);
    topic.subtopics.forEach((sub, idx) => {
      const card = buildCard(sub, topic, idx);
      grid.appendChild(card);
    });
    container.appendChild(section);
  });
}

function buildCard(sub, topic, idx) {
  const card = document.createElement('div');
  card.className = 'topic-card';
  card.id = `card-${sub.id}`;
  card.style.setProperty('--card-color', topic.color);
  card.style.animationDelay = `${idx * 0.05}s`;

  const langs = Object.keys(sub.examples || {});
  const defaultLang = langs[0] || 'javascript';
  currentLangs[sub.id] = defaultLang;

  const prosArr = tSub(sub, 'pros') || [];
  const consArr = tSub(sub, 'cons') || [];

  card.innerHTML = `
    <div class="card-head" onclick="toggleCard('${sub.id}')">
      <span class="card-icon">${sub.icon}</span>
      <span class="card-title">${tSub(sub, 'title')}</span>
      <span class="card-chevron">▼</span>
    </div>
    <div class="card-desc">${tSub(sub, 'desc')}</div>
    <div class="card-detail">
      <div class="detail-tabs">
        <button class="dtab active" onclick="showDetailTab('${sub.id}', 'info', this)">${t('tabVision')}</button>
        ${langs.length > 0 ? `<button class="dtab" onclick="showDetailTab('${sub.id}', 'code', this)">${t('tabCode')}</button>` : ''}
      </div>
      <div id="detail-info-${sub.id}" class="detail-pane">
        <div class="pros-cons">
          <div class="pros-box">
            <div class="pc-title">${t('pros')}</div>
            <ul class="pc-list">${prosArr.map(p=>`<li>${p}</li>`).join('')}</ul>
          </div>
          <div class="cons-box">
            <div class="pc-title">${t('cons')}</div>
            <ul class="pc-list">${consArr.map(c=>`<li>${c}</li>`).join('')}</ul>
          </div>
        </div>
        <div class="when-box">
          <div class="when-label">${t('when')}</div>
          <div class="when-text">${tSub(sub, 'when') || ''}</div>
        </div>
      </div>
      <div id="detail-code-${sub.id}" class="detail-pane" style="display:none">
        ${langs.length > 0 ? `
          <div class="lang-selector">
            ${langs.map(l => `<button class="lang-btn ${l===defaultLang?'active':''}" onclick="selectLang('${sub.id}', '${l}', this)">${langLabel(l)}</button>`).join('')}
          </div>
          <div id="code-block-${sub.id}">
            ${buildCodeBlock(sub.examples[defaultLang], defaultLang, sub.id, sub.output?.[defaultLang])}
          </div>
        ` : `<p style="color:var(--text3);font-size:.78rem">${t('noExample')}</p>`}
      </div>
    </div>
  `;
  return card;
}

function buildStackSection() {
  // Remove old stack section if exists
  const old = document.getElementById('stack-section-container');
  if (old) old.remove();

  const stacks = t('stacks');
  const container = document.createElement('div');
  container.id = 'stack-section-container';
  container.innerHTML = `
    <div class="stack-section">
      <div class="stack-section-title">${t('stackTitle')}</div>
      <div class="stacks-grid">
        ${stacks.map(s => `
          <div class="stack-card" style="--stack-color: ${s.color}">
            <div class="stack-card-title">${s.name}</div>
            <div class="stack-tags">
              ${s.techs.map(tech => `<span class="stack-tag">${tech}</span>`).join('')}
            </div>
            <div class="stack-why">${s.why}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  document.getElementById('sections').appendChild(container);
}

function langLabel(lang) {
  const map = { javascript: 'JS', python: 'Python', java: 'Java', php: 'PHP', c: 'C', typescript: 'TS' };
  return map[lang] || lang;
}

function buildCodeBlock(code, lang, id, output) {
  const highlighted = syntaxHighlight(code, lang);
  const outputHtml = output ? `
    <div class="output-wrap">
      <div class="output-header">
        <span class="output-icon">&#9658;</span>
        <span class="output-label">${t('saida')}</span>
      </div>
      <pre class="output-pre">${escapeHtml(output)}</pre>
    </div>
  ` : '';
  return `
    <div class="code-wrap">
      <div class="code-header">
        <div class="code-dots"><span></span><span></span><span></span></div>
        <span class="code-lang-tag">${langLabel(lang)}</span>
        <button class="copy-btn" onclick="copyCode('${id}')">${t('copiar')}</button>
      </div>
      <pre>${highlighted}</pre>
    </div>
    ${outputHtml}
  `;
}

function syntaxHighlight(code, lang) {
  // Use a Map with unique keys that contain NO digits and NO chars
  // affected by keyword/number/PascalCase regexes.
  // Key format: \x00<letters>\x00 — \x00 is never in source code or HTML spans.
  const phMap = new Map();
  let phCounter = 0;

  function save(html) {
    // Convert counter to a letters-only key (a, b, ..., z, aa, ab, ...)
    let n = phCounter++;
    let key = '';
    do {
      key = String.fromCharCode(97 + (n % 26)) + key;
      n = Math.floor(n / 26);
      if (n > 0) n -= 1; else break;
    } while (true);
    const marker = '\x00' + key + '\x00';
    phMap.set(marker, html);
    return marker;
  }

  let r = code;

  // 1. Salvar comentários
  r = r.replace(/(\/\/[^\n]*)/g, m =>
    save('<span class="cmt">' + escapeHtml(m) + '</span>')
  );
  r = r.replace(/(^|\s)(#[^\n]*)/gm, (_, pre, comment) =>
    pre + save('<span class="cmt">' + escapeHtml(comment) + '</span>')
  );

  // 2. Salvar strings
  r = r.replace(/(`[^`]*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g, m =>
    save('<span class="str">' + escapeHtml(m) + '</span>')
  );

  // 3. Escapar o restante do código
  r = r.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  // 4. Keywords
  r = r.replace(/\b(const|let|var|function|class|return|if|else|for|while|new|this|import|export|from|async|await|try|catch|typeof|instanceof|void|null|undefined|true|false|public|private|static|final|int|float|double|char|struct|def|self|None|True|False|echo|fn|use|impl|mut|elif|in|and|or|not|pass|raise|with|as|lambda|yield|break|continue|switch|case|default|do|typedef|unsigned|include|define|printf|malloc|free|sizeof|enum)\b/g,
    '<span class="kw">$1</span>');

  // 5. Números
  r = r.replace(/(?<![a-zA-Z_])\b(\d+\.?\d*)\b/g, '<span class="num">$1</span>');

  // 6. Classes PascalCase
  r = r.replace(/\b([A-Z][a-zA-Z0-9]+)\b/g, '<span class="cls">$1</span>');

  // 7. Restaurar placeholders — replace each marker with its saved HTML
  phMap.forEach((html, marker) => {
    // Escape the marker for use in regex (only \x00 and letters — letters don't need escaping)
    r = r.split(marker).join(html);
  });

  return r;
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function buildComplexityTable() {
  const logicSection = document.getElementById('section-logica');
  if (!logicSection) return;
  if (logicSection.querySelector('.complexity-section')) return;

  const lang = currentLang;
  const headers = {
    pt: ['Estrutura','Acesso','Busca','Inserção','Remoção','Memória','Melhor Uso'],
    en: ['Structure','Access','Search','Insert','Remove','Memory','Best Use'],
    fr: ['Structure','Accès','Recherche','Insertion','Suppression','Mémoire','Meilleure Utilisation']
  };
  const rows = {
    pt: [
      ['Array','O(1)','O(n)','O(n)','O(n)','Contígua','Acesso por índice, iteração'],
      ['Lista Encadeada','O(n)','O(n)','O(1)*','O(1)*','Dinâmica','Inserções/remoções frequentes'],
      ['BST Balanceada','O(log n)','O(log n)','O(log n)','O(log n)','Média','Busca em dados ordenados'],
      ['Hash Map','O(1)','O(1)','O(1)','O(1)','Extra (hash)','Lookup por chave, cache'],
      ['Pilha / Fila','O(n)','O(n)','O(1)','O(1)','Mínima','LIFO (pilha), FIFO (fila)'],
    ],
    en: [
      ['Array','O(1)','O(n)','O(n)','O(n)','Contiguous','Index access, iteration'],
      ['Linked List','O(n)','O(n)','O(1)*','O(1)*','Dynamic','Frequent insertions/removals'],
      ['Balanced BST','O(log n)','O(log n)','O(log n)','O(log n)','Average','Search on sorted data'],
      ['Hash Map','O(1)','O(1)','O(1)','O(1)','Extra (hash)','Key lookup, cache'],
      ['Stack / Queue','O(n)','O(n)','O(1)','O(1)','Minimal','LIFO (stack), FIFO (queue)'],
    ],
    fr: [
      ['Tableau','O(1)','O(n)','O(n)','O(n)','Contiguë','Accès par index, itération'],
      ['Liste Chaînée','O(n)','O(n)','O(1)*','O(1)*','Dynamique','Insertions/suppressions fréquentes'],
      ['BST Équilibré','O(log n)','O(log n)','O(log n)','O(log n)','Moyenne','Recherche sur données triées'],
      ['Hash Map','O(1)','O(1)','O(1)','O(1)','Extra (hash)','Recherche par clé, cache'],
      ['Pile / File','O(n)','O(n)','O(1)','O(1)','Minimale','LIFO (pile), FIFO (file)'],
    ]
  };

  const titles = { pt: '📊 Complexidade das Estruturas de Dados', en: '📊 Data Structure Complexity', fr: '📊 Complexité des Structures de Données' };

  const h = headers[lang];
  const r = rows[lang];
  const title = titles[lang];

  const cls = (val) => {
    if (val === 'O(1)' || val === 'O(1)*') return 'o1';
    if (val.includes('log')) return 'ologn';
    if (val === 'O(n)') return 'on';
    return '';
  };

  const tableHTML = `
    <div class="complexity-section">
      <div class="complexity-title">${title}</div>
      <table>
        <thead><tr>${h.map(c=>`<th>${c}</th>`).join('')}</tr></thead>
        <tbody>
          ${r.map(row => `<tr>
            <td><strong>${row[0]}</strong></td>
            ${row.slice(1,5).map(v=>`<td><span class="badge-o ${cls(v)}">${v}</span></td>`).join('')}
            <td>${row[5]}</td>
            <td>${row[6]}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
  logicSection.insertAdjacentHTML('beforeend', tableHTML);
}

function updateStats() {
  let totalTopics = 0;
  let totalExamples = 0;
  DATA.topics.forEach(t => {
    totalTopics += t.subtopics.length;
    t.subtopics.forEach(s => {
      totalExamples += Object.keys(s.examples || {}).length;
    });
  });
  document.getElementById('statTopics').textContent = totalTopics;
  document.getElementById('statExamples').textContent = totalExamples;
  document.getElementById('lblTopics').textContent = I18N[currentLang].lblTopics;
  document.getElementById('lblLangs').textContent = I18N[currentLang].lblLangs;
  document.getElementById('lblExamples').textContent = I18N[currentLang].lblExamples;
}

// ===== LANGUAGE SWITCH =====
function setLang(lang, btn) {
  currentLang = lang;
  document.querySelectorAll('.lang-switch-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Update hero
  document.getElementById('heroBadge').textContent = I18N[lang].badge;
  document.getElementById('heroTitle').innerHTML = I18N[lang].heroTitle;
  document.getElementById('heroDesc').textContent = I18N[lang].heroDesc;
  document.getElementById('searchInput').placeholder = I18N[lang].searchPlaceholder;
  document.getElementById('breadcrumbHome').textContent = I18N[lang].breadcrumbHome;

  // Rebuild everything
  buildHeader();
  buildSidebar();
  buildSections();

  // Remove & rebuild complexity table
  document.querySelectorAll('.complexity-section').forEach(e => e.remove());
  buildComplexityTable();

  buildStackSection();
  updateStats();
  showSection(currentSection || DATA.topics[0].id);
}

// ===== INTERACTIONS =====
function showSection(id) {
  currentSection = id;
  document.querySelectorAll('.section').forEach(s => s.classList.remove('visible'));
  const target = document.getElementById(`section-${id}`);
  if (target) target.classList.add('visible');

  document.querySelectorAll('.htab').forEach(t => {
    t.classList.toggle('active', t.dataset.id === id);
  });

  document.querySelectorAll('.sidebar-item').forEach(i => {
    i.classList.toggle('active', i.dataset.section === id);
  });

  const topic = DATA.topics.find(t => t.id === id);
  document.getElementById('breadcrumbTopic').textContent = topic ? `${topic.icon} ${tSub(topic, 'label')}` : '';

  target?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function toggleCard(id) {
  const card = document.getElementById(`card-${id}`);
  card.classList.toggle('expanded');
}

function showDetailTab(cardId, tab, btn) {
  const card = document.getElementById(`card-${cardId}`);
  card.querySelectorAll('.dtab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  card.querySelectorAll('.detail-pane').forEach(p => p.style.display = 'none');
  const pane = document.getElementById(`detail-${tab}-${cardId}`);
  if (pane) pane.style.display = 'block';
}

function selectLang(cardId, lang, btn) {
  currentLangs[cardId] = lang;
  const card = document.getElementById(`card-${cardId}`);
  card.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const topic = DATA.topics.find(t => t.subtopics.some(s => s.id === cardId));
  const sub = topic?.subtopics.find(s => s.id === cardId);
  if (!sub || !sub.examples[lang]) return;

  document.getElementById(`code-block-${cardId}`).innerHTML =
    buildCodeBlock(sub.examples[lang], lang, cardId, sub.output?.[lang]);
}

function copyCode(cardId) {
  const lang = currentLangs[cardId];
  const topic = DATA.topics.find(t => t.subtopics.some(s => s.id === cardId));
  const sub = topic?.subtopics.find(s => s.id === cardId);
  if (!sub || !sub.examples[lang]) return;
  navigator.clipboard.writeText(sub.examples[lang]).then(() => {
    const btn = document.querySelector(`#card-${cardId} .copy-btn`);
    if (btn) { btn.textContent = t('copiado'); btn.classList.add('copied'); }
    setTimeout(() => {
      if (btn) { btn.textContent = t('copiar'); btn.classList.remove('copied'); }
    }, 2000);
  });
}

function scrollToCard(id) {
  const card = document.getElementById(`card-${id}`);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    card.classList.add('expanded');
  }
}

function closePanel() {
  document.getElementById('panel').classList.remove('visible');
}

// ===== SEARCH =====
document.getElementById('searchInput').addEventListener('input', function() {
  const q = this.value.trim().toLowerCase();
  if (!q) {
    document.querySelectorAll('.topic-card').forEach(c => {
      c.style.display = 'flex';
      c.style.flexDirection = 'column';
    });
    document.querySelectorAll('.no-results').forEach(e => e.remove());
    return;
  }
  let totalVisible = 0;
  DATA.topics.forEach(topic => {
    let sectionVisible = 0;
    topic.subtopics.forEach(sub => {
      const card = document.getElementById(`card-${sub.id}`);
      const text = `${sub.title} ${sub.title_en || ''} ${sub.title_fr || ''} ${sub.desc} ${sub.desc_en || ''} ${sub.when || ''} ${(sub.pros||[]).join(' ')} ${Object.values(sub.examples||{}).join(' ')}`.toLowerCase();
      const match = text.includes(q);
      if (card) {
        card.style.display = match ? 'flex' : 'none';
        card.style.flexDirection = match ? 'column' : '';
        if (match) { sectionVisible++; totalVisible++; }
      }
    });
  });
  if (totalVisible > 0) {
    for (const topic of DATA.topics) {
      const hasMatch = topic.subtopics.some(sub => {
        const text = `${sub.title} ${sub.desc} ${sub.when || ''}`.toLowerCase();
        return text.includes(q);
      });
      if (hasMatch) { showSection(topic.id); break; }
    }
  }
});

// ===== PROGRESS BAR =====
window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const pct = doc.scrollTop / (doc.scrollHeight - doc.clientHeight) * 100;
  document.getElementById('progressBar').style.width = pct + '%';
});

// ===== KEYBOARD =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePanel();
  if (e.key === '/' && e.target !== document.getElementById('searchInput')) {
    e.preventDefault();
    document.getElementById('searchInput').focus();
  }
});

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobileOverlay');
  const hamburger = document.getElementById('hamburger');
  const isOpen = sidebar.classList.toggle('open');
  overlay.classList.toggle('open', isOpen);
  hamburger.classList.toggle('open', isOpen);
}

function closeMobileMenu() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('mobileOverlay').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

document.addEventListener('click', (e) => {
  if (e.target.closest('.sidebar-item') && window.innerWidth <= 768) {
    closeMobileMenu();
  }
});

// ===== INIT =====
loadData().catch(() => {
  document.getElementById('sections').innerHTML = `
    <div class="no-results">
      <div class="nr-icon">⚠️</div>
      <p>Abra este arquivo em um servidor HTTP para carregar o data.json.<br>
      <small style="color:var(--text3);font-size:0.7rem;margin-top:8px;display:block">
      Dica: use <code style="font-family:var(--font-mono);background:var(--bg3);padding:2px 6px;border-radius:4px">npx serve .</code> ou <code style="font-family:var(--font-mono);background:var(--bg3);padding:2px 6px;border-radius:4px">python -m http.server</code></small>
      </p>
    </div>
  `;
});