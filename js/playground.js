// ═══════════════════════════════════════════════════════════════
//  DEV PLAYGROUND — IDE integrado ao Dev Manual
//  JS (exec real) | HTML preview | Java/Python via Claude API
//  v2: Auto-closing brackets + Syntax Highlighting
// ═══════════════════════════════════════════════════════════════

const PLAYGROUND_I18N = {
  pt: {
    title: '🧪 Playground',
    subtitle: 'Escreva, execute e veja o resultado em tempo real',
    run: '▶ Executar',
    clear: '🗑 Limpar',
    reset: '↩ Reset',
    copy: '📋 Copiar',
    copied: '✓ Copiado!',
    previewTitle: 'Preview',
    consoleTitle: '🖥 Console',
    editorTitle: '✏️ Editor',
    tabJS: 'JavaScript',
    tabHTML: 'HTML/CSS',
    tabJava: 'Java',
    tabPython: 'Python',
    tabChallenge: '🎯 Desafios',
    placeholderJS: '// Digite seu código JavaScript aqui...\n// Use console.log() para ver a saída\n\nconsole.log("Olá, Dev Manual! 🚀");',
    placeholderHTML: '<!-- Digite seu HTML aqui -->\n<h1 style="color:#58a6ff;font-family:sans-serif">Olá, Dev Manual! 🚀</h1>\n<p style="color:#8b949e">Veja o preview ao vivo →</p>',
    placeholderJava: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Olá, Dev Manual! 🚀");\n        \n        // Exemplo: FizzBuzz\n        for (int i = 1; i <= 15; i++) {\n            if (i % 15 == 0) System.out.println("FizzBuzz");\n            else if (i % 3 == 0) System.out.println("Fizz");\n            else if (i % 5 == 0) System.out.println("Buzz");\n            else System.out.println(i);\n        }\n    }\n}',
    placeholderPython: '# Digite seu código Python aqui\nprint("Olá, Dev Manual! 🚀")\n\n# Exemplo: FizzBuzz\nfor i in range(1, 16):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
    empty: 'Nenhuma saída ainda. Execute um código!',
    clearConfirm: 'Saída limpa.',
    linesLabel: 'linhas',
    charsLabel: 'chars',
    challengeSelect: 'Escolha um desafio para praticar:',
    solve: '💡 Ver Solução',
    hideSolve: '🙈 Esconder',
    challengeHint: '💡 Dica',
    shortcutTip: 'Ctrl+Enter para executar · Ctrl+L para limpar',
    simulating: '⚙ Simulando execução via IA...',
    simNote: '📌 Java e Python são simulados pelo Claude AI (sem necessidade de servidor)',
  },
  en: {
    title: '🧪 Playground',
    subtitle: 'Write, run and see the result in real time',
    run: '▶ Run',
    clear: '🗑 Clear',
    reset: '↩ Reset',
    copy: '📋 Copy',
    copied: '✓ Copied!',
    previewTitle: 'Preview',
    consoleTitle: '🖥 Console',
    editorTitle: '✏️ Editor',
    tabJS: 'JavaScript',
    tabHTML: 'HTML/CSS',
    tabJava: 'Java',
    tabPython: 'Python',
    tabChallenge: '🎯 Challenges',
    placeholderJS: '// Type your JavaScript code here...\n// Use console.log() to see the output\n\nconsole.log("Hello, Dev Manual! 🚀");',
    placeholderHTML: '<!-- Type your HTML here -->\n<h1 style="color:#58a6ff;font-family:sans-serif">Hello, Dev Manual! 🚀</h1>\n<p style="color:#8b949e">See the live preview →</p>',
    placeholderJava: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Dev Manual! 🚀");\n        \n        // FizzBuzz example\n        for (int i = 1; i <= 15; i++) {\n            if (i % 15 == 0) System.out.println("FizzBuzz");\n            else if (i % 3 == 0) System.out.println("Fizz");\n            else if (i % 5 == 0) System.out.println("Buzz");\n            else System.out.println(i);\n        }\n    }\n}',
    placeholderPython: '# Type your Python code here\nprint("Hello, Dev Manual! 🚀")\n\n# FizzBuzz example\nfor i in range(1, 16):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
    empty: 'No output yet. Run some code!',
    clearConfirm: 'Output cleared.',
    linesLabel: 'lines',
    charsLabel: 'chars',
    challengeSelect: 'Choose a challenge to practice:',
    solve: '💡 See Solution',
    hideSolve: '🙈 Hide',
    challengeHint: '💡 Hint',
    shortcutTip: 'Ctrl+Enter to run · Ctrl+L to clear',
    simulating: '⚙ Simulating execution via AI...',
    simNote: '📌 Java and Python are simulated by Claude AI (no server needed)',
  },
  fr: {
    title: '🧪 Playground',
    subtitle: 'Écrivez, exécutez et voyez le résultat en temps réel',
    run: '▶ Exécuter',
    clear: '🗑 Effacer',
    reset: '↩ Reset',
    copy: '📋 Copier',
    copied: '✓ Copié !',
    previewTitle: 'Aperçu',
    consoleTitle: '🖥 Console',
    editorTitle: '✏️ Éditeur',
    tabJS: 'JavaScript',
    tabHTML: 'HTML/CSS',
    tabJava: 'Java',
    tabPython: 'Python',
    tabChallenge: '🎯 Défis',
    placeholderJS: '// Tapez votre code JavaScript ici...\nconsole.log("Bonjour, Dev Manual ! 🚀");',
    placeholderHTML: '<!-- Tapez votre HTML ici -->\n<h1 style="color:#58a6ff;font-family:sans-serif">Bonjour !</h1>',
    placeholderJava: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Bonjour, Dev Manual ! 🚀");\n    }\n}',
    placeholderPython: '# Tapez votre code Python ici\nprint("Bonjour, Dev Manual ! 🚀")',
    empty: 'Pas encore de sortie. Exécutez du code !',
    clearConfirm: 'Sortie effacée.',
    linesLabel: 'lignes',
    charsLabel: 'chars',
    challengeSelect: 'Choisissez un défi à pratiquer :',
    solve: '💡 Voir la Solution',
    hideSolve: '🙈 Cacher',
    challengeHint: '💡 Indice',
    shortcutTip: 'Ctrl+Entrée pour exécuter · Ctrl+L pour effacer',
    simulating: '⚙ Simulation via IA en cours...',
    simNote: '📌 Java et Python sont simulés par Claude AI (sans serveur)',
  }
};

// ═══════════════════════════════════════════════════════════════
//  CHALLENGES
// ═══════════════════════════════════════════════════════════════
const CHALLENGES = {
  pt: [
    { id:'fizzbuzz', icon:'🔢', title:'FizzBuzz Clássico', desc:'Imprima números de 1 a 20. Para múltiplos de 3: "Fizz", de 5: "Buzz", de ambos: "FizzBuzz".', hint:'Use o operador módulo (%) para verificar divisibilidade.', starter:'// FizzBuzz - imprima de 1 a 20\nfor (let i = 1; i <= 20; i++) {\n  // seu código aqui\n}', solution:'for (let i = 1; i <= 20; i++) {\n  if (i % 15 === 0) console.log("FizzBuzz");\n  else if (i % 3 === 0) console.log("Fizz");\n  else if (i % 5 === 0) console.log("Buzz");\n  else console.log(i);\n}' },
    { id:'palindrome', icon:'🔄', title:'Verificar Palíndromo', desc:'Escreva uma função que retorna true se uma string for um palíndromo (ex: "arara", "racecar").', hint:'Inverta a string e compare com o original. Use split, reverse, join.', starter:'function isPalindrome(str) {\n  // seu código aqui\n}\nconsole.log(isPalindrome("arara"));   // true\nconsole.log(isPalindrome("javascript")); // false', solution:'function isPalindrome(str) {\n  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");\n  return clean === clean.split("").reverse().join("");\n}\nconsole.log(isPalindrome("arara"));   // true\nconsole.log(isPalindrome("javascript")); // false' },
    { id:'fibonacci', icon:'🌀', title:'Sequência de Fibonacci', desc:'Gere os primeiros 10 números da sequência de Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34', hint:'Cada número é a soma dos dois anteriores. Comece com [0, 1].', starter:'function fibonacci(n) {\n  // retorne array com os primeiros n números\n}\nconsole.log(fibonacci(10));', solution:'function fibonacci(n) {\n  const seq = [0, 1];\n  for (let i = 2; i < n; i++) seq.push(seq[i-1] + seq[i-2]);\n  return seq.slice(0, n);\n}\nconsole.log(fibonacci(10));' },
    { id:'anagram', icon:'🔤', title:'Verificar Anagrama', desc:'Crie uma função que verifica se duas strings são anagramas (ex: "listen" e "silent").', hint:'Ordene os caracteres de ambas as strings e compare.', starter:'function isAnagram(a, b) {\n  // seu código aqui\n}\nconsole.log(isAnagram("listen", "silent")); // true\nconsole.log(isAnagram("hello", "world"));   // false', solution:'function isAnagram(a, b) {\n  const sort = s => s.toLowerCase().split("").sort().join("");\n  return sort(a) === sort(b);\n}\nconsole.log(isAnagram("listen", "silent")); // true\nconsole.log(isAnagram("hello", "world"));   // false' },
    { id:'flatten', icon:'📐', title:'Aplainar Array Aninhado', desc:'Converta [[1,2],[3,[4,5]],6] em [1,2,3,4,5,6] sem usar Array.flat().', hint:'Use recursão: para cada item, se for array, aplaine; senão, adicione ao resultado.', starter:'function flatten(arr) {\n  // sem usar .flat()\n}\nconsole.log(flatten([[1,2],[3,[4,5]],6]));', solution:'function flatten(arr) {\n  return arr.reduce((acc, val) =>\n    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val)\n  , []);\n}\nconsole.log(flatten([[1,2],[3,[4,5]],6]));' },
    { id:'debounce', icon:'⏱', title:'Implementar Debounce', desc:'Implemente uma função debounce que atrasa a execução até que pare de ser chamada por X ms.', hint:'Use setTimeout e clearTimeout. Cancele o timer anterior a cada chamada.', starter:'function debounce(fn, delay) {\n  // seu código aqui\n}', solution:'function debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\nconst log = debounce((msg) => console.log("Executou:", msg), 100);\nlog("a"); log("b"); log("c");' },
    { id:'groupby', icon:'🗂', title:'Group By', desc:'Agrupe um array de objetos por uma propriedade. Ex: [{name:"Ana",dept:"Dev"}] por "dept".', hint:'Use reduce. Para cada item, crie/atualize a chave no acumulador.', starter:'function groupBy(arr, key) {\n  // seu código aqui\n}\nconst people = [{name:"Ana",dept:"Dev"},{name:"Bia",dept:"UX"},{name:"Carlos",dept:"Dev"}];\nconsole.log(groupBy(people, "dept"));', solution:'function groupBy(arr, key) {\n  return arr.reduce((acc, item) => {\n    (acc[item[key]] = acc[item[key]] || []).push(item);\n    return acc;\n  }, {});\n}\nconst people = [{name:"Ana",dept:"Dev"},{name:"Bia",dept:"UX"},{name:"Carlos",dept:"Dev"}];\nconsole.log(JSON.stringify(groupBy(people, "dept"), null, 2));' },
  ],
  en: [
    { id:'fizzbuzz', icon:'🔢', title:'Classic FizzBuzz', desc:'Print numbers 1 to 20. For multiples of 3: "Fizz", of 5: "Buzz", of both: "FizzBuzz".', hint:'Use the modulo operator (%) to check divisibility.', starter:'for (let i = 1; i <= 20; i++) {\n  // your code here\n}', solution:'for (let i = 1; i <= 20; i++) {\n  if (i % 15 === 0) console.log("FizzBuzz");\n  else if (i % 3 === 0) console.log("Fizz");\n  else if (i % 5 === 0) console.log("Buzz");\n  else console.log(i);\n}' },
    { id:'palindrome', icon:'🔄', title:'Check Palindrome', desc:'Write a function that returns true if a string is a palindrome (e.g., "racecar").', hint:'Reverse the string and compare with the original.', starter:'function isPalindrome(str) {\n  // your code here\n}\nconsole.log(isPalindrome("racecar")); // true', solution:'function isPalindrome(str) {\n  const c = str.toLowerCase().replace(/[^a-z0-9]/g, "");\n  return c === c.split("").reverse().join("");\n}\nconsole.log(isPalindrome("racecar")); // true' },
    { id:'fibonacci', icon:'🌀', title:'Fibonacci Sequence', desc:'Generate the first 10 Fibonacci numbers.', hint:'Each number is the sum of the two previous ones.', starter:'function fibonacci(n) {\n  // return array with first n numbers\n}\nconsole.log(fibonacci(10));', solution:'function fibonacci(n) {\n  const s = [0,1];\n  for (let i = 2; i < n; i++) s.push(s[i-1]+s[i-2]);\n  return s.slice(0,n);\n}\nconsole.log(fibonacci(10));' },
    { id:'anagram', icon:'🔤', title:'Check Anagram', desc:'Create a function that checks if two strings are anagrams.', hint:'Sort the characters of both strings and compare.', starter:'function isAnagram(a, b) {\n  // your code here\n}\nconsole.log(isAnagram("listen", "silent")); // true', solution:'function isAnagram(a, b) {\n  const sort = s => s.toLowerCase().split("").sort().join("");\n  return sort(a) === sort(b);\n}\nconsole.log(isAnagram("listen", "silent")); // true' },
    { id:'flatten', icon:'📐', title:'Flatten Nested Array', desc:'Convert [[1,2],[3,[4,5]],6] to [1,2,3,4,5,6] without using Array.flat().', hint:'Use recursion.', starter:'function flatten(arr) {}\nconsole.log(flatten([[1,2],[3,[4,5]],6]));', solution:'function flatten(arr) {\n  return arr.reduce((a,v) => Array.isArray(v) ? a.concat(flatten(v)) : a.concat(v), []);\n}\nconsole.log(flatten([[1,2],[3,[4,5]],6]));' },
    { id:'debounce', icon:'⏱', title:'Implement Debounce', desc:'Implement a debounce function that delays execution until it stops being called for X ms.', hint:'Use setTimeout and clearTimeout.', starter:'function debounce(fn, delay) {\n  // your code here\n}', solution:'function debounce(fn, delay) {\n  let t;\n  return function(...a) { clearTimeout(t); t = setTimeout(() => fn.apply(this,a), delay); };\n}\nconst log = debounce(msg => console.log("Ran:", msg), 100);\nlog("a"); log("b"); log("c");' },
    { id:'groupby', icon:'🗂', title:'Group By', desc:'Group an array of objects by a property.', hint:'Use reduce.', starter:'function groupBy(arr, key) {}\nconst people = [{name:"Ana",dept:"Dev"},{name:"Bia",dept:"UX"},{name:"Carlos",dept:"Dev"}];\nconsole.log(groupBy(people, "dept"));', solution:'function groupBy(arr, key) {\n  return arr.reduce((a,i) => { (a[i[key]]=a[i[key]]||[]).push(i); return a; }, {});\n}\nconst p = [{name:"Ana",dept:"Dev"},{name:"Bia",dept:"UX"},{name:"Carlos",dept:"Dev"}];\nconsole.log(JSON.stringify(groupBy(p,"dept"),null,2));' },
  ],
  fr: [
    { id:'fizzbuzz', icon:'🔢', title:'FizzBuzz Classique', desc:'Affichez 1 à 20. Multiples de 3: "Fizz", de 5: "Buzz".', hint:'Utilisez l\'opérateur modulo.', starter:'for (let i = 1; i <= 20; i++) {\n  // votre code ici\n}', solution:'for (let i = 1; i <= 20; i++) {\n  if (i%15===0) console.log("FizzBuzz");\n  else if (i%3===0) console.log("Fizz");\n  else if (i%5===0) console.log("Buzz");\n  else console.log(i);\n}' },
    { id:'palindrome', icon:'🔄', title:'Vérifier Palindrome', desc:'Retournez true si une chaîne est un palindrome.', hint:'Inversez la chaîne et comparez.', starter:'function isPalindrome(str) {\n  // votre code ici\n}\nconsole.log(isPalindrome("kayak"));', solution:'function isPalindrome(str) {\n  const c = str.toLowerCase().replace(/[^a-z0-9]/g,"");\n  return c===c.split("").reverse().join("");\n}\nconsole.log(isPalindrome("kayak")); // true' },
    { id:'fibonacci', icon:'🌀', title:'Séquence Fibonacci', desc:'Générez les 10 premiers nombres de Fibonacci.', hint:'Chaque nombre est la somme des deux précédents.', starter:'function fibonacci(n) {}\nconsole.log(fibonacci(10));', solution:'function fibonacci(n) {\n  const s=[0,1];\n  for(let i=2;i<n;i++) s.push(s[i-1]+s[i-2]);\n  return s.slice(0,n);\n}\nconsole.log(fibonacci(10));' },
  ]
};

const HTML_CHALLENGES = {
  pt: [
    { id:'card', icon:'🃏', title:'Card de Perfil', desc:'Card com avatar, nome, cargo e botão seguir.', hint:'Use flexbox e border-radius.', starter:'<!-- Card de perfil -->\n<div style="font-family:sans-serif;padding:20px">\n  <!-- seu card aqui -->\n</div>', solution:'<div style="font-family:sans-serif;display:flex;justify-content:center;padding:40px;background:#0d1117;min-height:100vh"><div style="background:#161b22;border:1px solid #30363d;border-radius:16px;padding:32px;text-align:center;width:280px"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=dev" style="width:80px;height:80px;border-radius:50%;border:3px solid #58a6ff;margin-bottom:16px"><h2 style="color:#e6edf3;margin:0 0 4px">Ana Desenvolvedora</h2><p style="color:#8b949e;margin:0 0 20px;font-size:14px">Front-end Engineer</p><button style="background:#58a6ff;color:#0d1117;border:none;border-radius:8px;padding:10px 28px;font-weight:700;cursor:pointer">Seguir</button></div></div>' },
    { id:'nav', icon:'🧭', title:'Navbar Responsiva', desc:'Navbar com logo, links e botão CTA usando flexbox.', hint:'Use display:flex, justify-content:space-between.', starter:'<nav style="font-family:sans-serif">\n  <!-- navbar aqui -->\n</nav>', solution:'<nav style="font-family:sans-serif;background:#0d1117;border-bottom:1px solid #30363d;padding:0 24px"><div style="max-width:1000px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:60px"><span style="color:#58a6ff;font-weight:800">⌨ DevCo</span><div style="display:flex;gap:24px"><a href="#" style="color:#8b949e;text-decoration:none;font-size:14px">Home</a><a href="#" style="color:#8b949e;text-decoration:none;font-size:14px">Docs</a></div><button style="background:#58a6ff;color:#0d1117;border:none;border-radius:8px;padding:8px 18px;font-weight:700;cursor:pointer">Get Started</button></div></nav>' },
    { id:'grid', icon:'🔲', title:'Grid de Features', desc:'Grid de 3 cards com CSS Grid.', hint:'Use display:grid; grid-template-columns:repeat(3,1fr).', starter:'<section style="font-family:sans-serif;padding:32px;background:#0d1117">\n  <!-- 3 cards -->\n</section>', solution:'<section style="font-family:sans-serif;padding:40px;background:#0d1117;min-height:100vh"><h2 style="color:#e6edf3;text-align:center;margin-bottom:32px">Features</h2><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:900px;margin:0 auto"><div style="background:#161b22;border:1px solid #30363d;border-radius:12px;padding:24px"><div style="font-size:2rem;margin-bottom:12px">⚡</div><h3 style="color:#e6edf3;margin:0 0 8px;font-size:1rem">Ultra Rápido</h3><p style="color:#8b949e;font-size:13px;margin:0">Carregamento instantâneo.</p></div><div style="background:#161b22;border:1px solid #30363d;border-radius:12px;padding:24px"><div style="font-size:2rem;margin-bottom:12px">🔒</div><h3 style="color:#e6edf3;margin:0 0 8px;font-size:1rem">Seguro</h3><p style="color:#8b949e;font-size:13px;margin:0">Criptografia de ponta.</p></div><div style="background:#161b22;border:1px solid #30363d;border-radius:12px;padding:24px"><div style="font-size:2rem;margin-bottom:12px">📱</div><h3 style="color:#e6edf3;margin:0 0 8px;font-size:1rem">Responsivo</h3><p style="color:#8b949e;font-size:13px;margin:0">Qualquer dispositivo.</p></div></div></section>' },
  ],
  en: [
    { id:'card', icon:'🃏', title:'Profile Card', desc:'Card with avatar, name, role and follow button.', hint:'Use flexbox and border-radius.', starter:'<!-- Profile card -->\n<div style="font-family:sans-serif;padding:20px">\n  <!-- your card here -->\n</div>', solution:'<div style="font-family:sans-serif;display:flex;justify-content:center;padding:40px;background:#0d1117;min-height:100vh"><div style="background:#161b22;border:1px solid #30363d;border-radius:16px;padding:32px;text-align:center;width:280px"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=dev" style="width:80px;height:80px;border-radius:50%;border:3px solid #58a6ff;margin-bottom:16px"><h2 style="color:#e6edf3;margin:0 0 4px">Ana Developer</h2><p style="color:#8b949e;margin:0 0 20px;font-size:14px">Front-end Engineer</p><button style="background:#58a6ff;color:#0d1117;border:none;border-radius:8px;padding:10px 28px;font-weight:700;cursor:pointer">Follow</button></div></div>' },
    { id:'nav', icon:'🧭', title:'Responsive Navbar', desc:'Navbar with logo, links and CTA button.', hint:'Use display:flex, justify-content:space-between.', starter:'<nav style="font-family:sans-serif">\n  <!-- navbar here -->\n</nav>', solution:'<nav style="font-family:sans-serif;background:#0d1117;border-bottom:1px solid #30363d;padding:0 24px"><div style="max-width:1000px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:60px"><span style="color:#58a6ff;font-weight:800">⌨ DevCo</span><div style="display:flex;gap:24px"><a href="#" style="color:#8b949e;text-decoration:none;font-size:14px">Home</a><a href="#" style="color:#8b949e;text-decoration:none;font-size:14px">Docs</a></div><button style="background:#58a6ff;color:#0d1117;border:none;border-radius:8px;padding:8px 18px;font-weight:700;cursor:pointer">Get Started</button></div></nav>' },
  ],
  fr: [
    { id:'card', icon:'🃏', title:'Carte de Profil', desc:'Carte avec avatar, nom et bouton.', hint:'Utilisez flexbox et border-radius.', starter:'<!-- Carte -->\n<div style="font-family:sans-serif;padding:20px"></div>', solution:'<div style="font-family:sans-serif;display:flex;justify-content:center;padding:40px;background:#0d1117;min-height:100vh"><div style="background:#161b22;border:1px solid #30363d;border-radius:16px;padding:32px;text-align:center;width:280px"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=dev" style="width:80px;height:80px;border-radius:50%;border:3px solid #58a6ff;margin-bottom:16px"><h2 style="color:#e6edf3;margin:0 0 4px">Ana Développeuse</h2><p style="color:#8b949e;margin:0 0 20px;font-size:14px">Ingénieure Front-end</p><button style="background:#58a6ff;color:#0d1117;border:none;border-radius:8px;padding:10px 28px;font-weight:700;cursor:pointer">Suivre</button></div></div>' },
  ]
};

// ═══════════════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════════════
const PG_PANELS = {
  js:        'pgModeJS',
  html:      'pgModeHTML',
  java:      'pgModeJava',
  python:    'pgModePython',
  challenge: 'pgModeChallenge',
};
const PG_TABS = {
  js:        'pgTabJS',
  html:      'pgTabHTML',
  java:      'pgTabJava',
  python:    'pgTabPython',
  challenge: 'pgTabChallenge',
};
const PG = { mode: 'js', showSolution: false, currentChallenge: null };

// ═══════════════════════════════════════════════════════════════
//  SYNTAX HIGHLIGHTER
//  Renders a <pre> overlay behind the <textarea>
// ═══════════════════════════════════════════════════════════════

const SH_THEMES = {
  js: {
    keywords: /\b(var|let|const|function|return|if|else|for|while|do|break|continue|switch|case|default|new|delete|typeof|instanceof|in|of|class|extends|super|import|export|from|async|await|try|catch|finally|throw|void|this|null|undefined|true|false)\b/g,
    strings:  /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g,
    comments: /(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)/g,
    numbers:  /\b(\d+\.?\d*)\b/g,
    funcs:    /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g,
    props:    /\.([a-zA-Z_$][\w$]*)/g,
  },
  java: {
    keywords: /\b(public|private|protected|static|final|void|int|double|float|long|short|byte|char|boolean|class|interface|extends|implements|new|return|if|else|for|while|do|break|continue|switch|case|default|try|catch|finally|throw|throws|import|package|this|super|null|true|false|abstract|synchronized|volatile|transient|native|enum|instanceof)\b/g,
    strings:  /(["'])(?:(?!\1)[^\\]|\\.)*\1/g,
    comments: /(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)/g,
    numbers:  /\b(\d+\.?\d*[fFdDlL]?)\b/g,
    funcs:    /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g,
    props:    /\.([a-zA-Z_$][\w$]*)/g,
  },
  python: {
    keywords: /\b(def|class|return|if|elif|else|for|while|break|continue|pass|import|from|as|try|except|finally|raise|with|lambda|yield|in|not|and|or|is|None|True|False|print|range|len|type|int|str|float|list|dict|tuple|set|self|super|global|nonlocal|del|assert)\b/g,
    strings:  /("""[\s\S]*?"""|'''[\s\S]*?'''|["'])(?:(?!\3)[^\\]|\\.)*\3?/g,
    comments: /(#[^\n]*)/g,
    numbers:  /\b(\d+\.?\d*)\b/g,
    funcs:    /\b([a-zA-Z_][\w]*)\s*(?=\()/g,
    props:    /\.([a-zA-Z_][\w]*)/g,
  },
  html: {
    tags:     /(&lt;\/?[\w\-]+)/g,
    attrs:    /\s([\w\-:@.]+)(?==)/g,
    strings:  /=["']([^"']*)["']/g,
    comments: /(&lt;!--[\s\S]*?--&gt;)/g,
    doctype:  /(&lt;!DOCTYPE[^&]*&gt;)/gi,
    close:    /(\/?&gt;)/g,
  },
};

function _shEscape(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function _shHighlight(code, lang) {
  if (lang === 'html') return _shHighlightHTML(code);

  const theme = SH_THEMES[lang] || SH_THEMES.js;
  let escaped = _shEscape(code);

  // We use placeholder trick to avoid re-highlighting inside strings/comments
  const placeholders = [];
  const ph = (content, cls) => {
    const idx = placeholders.length;
    placeholders.push(`<span class="sh-${cls}">${content}</span>`);
    return `\x00${idx}\x00`;
  };

  // 1. Comments first (highest priority)
  escaped = escaped.replace(theme.comments, m => ph(m, 'comment'));

  // 2. Strings
  escaped = escaped.replace(theme.strings, m => ph(m, 'string'));

  // 3. Numbers
  escaped = escaped.replace(theme.numbers, (_, n) => ph(n, 'number'));

  // 4. Keywords
  escaped = escaped.replace(theme.keywords, m => ph(m, 'keyword'));

  // 5. Function names
  escaped = escaped.replace(theme.funcs, (m, name) => {
    const KEYWORDS = ['if','for','while','switch','catch','function','class','return','typeof','instanceof','new','delete','void','import','export','from','async','await','super','this','null','undefined','true','false'];
    if (KEYWORDS.includes(name)) return m;
    return ph(name, 'func') + m.slice(name.length);
  });

  // 6. Properties
  escaped = escaped.replace(theme.props, (m, prop) => '.' + ph(prop, 'prop'));

  // Restore placeholders
  escaped = escaped.replace(/\x00(\d+)\x00/g, (_, i) => placeholders[+i]);

  return escaped;
}

function _shHighlightHTML(code) {
  let escaped = _shEscape(code);
  const placeholders = [];
  const ph = (content, cls) => {
    const idx = placeholders.length;
    placeholders.push(`<span class="sh-${cls}">${content}</span>`);
    return `\x00${idx}\x00`;
  };
  escaped = escaped.replace(/(&lt;!--[\s\S]*?--&gt;)/g, m => ph(m, 'comment'));
  escaped = escaped.replace(/(&lt;!DOCTYPE[^&gt;]*&gt;)/gi, m => ph(m, 'doctype'));
  escaped = escaped.replace(/(&lt;\/?)([\w\-]+)/g, (m, open, name) => ph(open, 'tag-bracket') + ph(name, 'tag'));
  escaped = escaped.replace(/(\/?&gt;)/g, m => ph(m, 'tag-bracket'));
  escaped = escaped.replace(/\s([\w\-:@.]+)(=)/g, (m, attr, eq) => ' ' + ph(attr, 'attr') + eq);
  escaped = escaped.replace(/=(["'])(.*?)\1/g, (m, q, val) => '=' + ph(q + val + q, 'string'));
  escaped = escaped.replace(/\x00(\d+)\x00/g, (_, i) => placeholders[+i]);
  return escaped;
}

// ─── Highlight overlay manager ────────────────────────────────
const _shOverlays = new Map(); // editorId → { overlay, pre }

function _shInit(editorId, lang) {
  const editor = document.getElementById(editorId);
  if (!editor) return;

  // Wrap editor in a relative container if not already
  let wrap = editor.parentElement;
  if (!wrap.classList.contains('pg-editor-wrap')) return;

  // Create overlay <pre>
  const pre = document.createElement('pre');
  pre.className = 'pg-sh-overlay';
  pre.setAttribute('aria-hidden', 'true');
  const code = document.createElement('code');
  pre.appendChild(code);

  // Insert before the editor
  wrap.insertBefore(pre, editor);

  _shOverlays.set(editorId, { pre, code, lang });
  _shSync(editorId);

  // Make textarea transparent (text invisible, caret visible)
  editor.classList.add('pg-editor-sh');
}

function _shSync(editorId) {
  const entry = _shOverlays.get(editorId);
  const editor = document.getElementById(editorId);
  if (!entry || !editor) return;
  entry.code.innerHTML = _shHighlight(editor.value, entry.lang) + '\n';
  entry.pre.scrollTop  = editor.scrollTop;
  entry.pre.scrollLeft = editor.scrollLeft;
}

// ═══════════════════════════════════════════════════════════════
//  AUTO-CLOSE BRACKETS
// ═══════════════════════════════════════════════════════════════
const AC_PAIRS = { '{':'}', '[':']', '(':')' };
const AC_QUOTES = ['"', "'", '`'];
const AC_CLOSING = new Set(['}', ']', ')']);

function _acHandleKeydown(e, editorId) {
  const editor = document.getElementById(editorId);
  if (!editor) return;

  const key  = e.key;
  const s    = editor.selectionStart;
  const en   = editor.selectionEnd;
  const val  = editor.value;
  const next = val[s]; // character right after cursor

  // ── Skip-over closing bracket ──────────────────────────────
  if (AC_CLOSING.has(key) && next === key) {
    e.preventDefault();
    editor.selectionStart = editor.selectionEnd = s + 1;
    _shSync(editorId);
    return;
  }

  // ── Auto-close opening bracket ─────────────────────────────
  if (AC_PAIRS[key]) {
    e.preventDefault();
    const selected = val.substring(s, en);
    const close = AC_PAIRS[key];
    const insert = key + selected + close;
    editor.value = val.substring(0, s) + insert + val.substring(en);
    editor.selectionStart = editor.selectionEnd = s + 1;
    _shSync(editorId);
    _pgUpdateStats(editorId);
    return;
  }

  // ── Auto-close quotes ──────────────────────────────────────
  if (AC_QUOTES.includes(key)) {
    // If next char is same quote, skip over it
    if (next === key) {
      e.preventDefault();
      editor.selectionStart = editor.selectionEnd = s + 1;
      _shSync(editorId);
      return;
    }
    // Otherwise wrap / insert pair
    e.preventDefault();
    const selected = val.substring(s, en);
    const insert = key + selected + key;
    editor.value = val.substring(0, s) + insert + val.substring(en);
    editor.selectionStart = editor.selectionEnd = s + 1;
    _shSync(editorId);
    _pgUpdateStats(editorId);
    return;
  }

  // ── Auto-indent after { + Enter ───────────────────────────
  if (key === 'Enter') {
    const lineStart = val.lastIndexOf('\n', s - 1) + 1;
    const currentLine = val.substring(lineStart, s);
    const indentMatch = currentLine.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1] : '';
    const prevChar = val[s - 1];

    if (prevChar === '{' && next === '}') {
      e.preventDefault();
      const ins = '\n' + indent + '  \n' + indent;
      editor.value = val.substring(0, s) + ins + val.substring(en);
      editor.selectionStart = editor.selectionEnd = s + indent.length + 3;
      _shSync(editorId);
      _pgUpdateStats(editorId);
      return;
    }

    // Normal Enter: preserve indentation
    e.preventDefault();
    const extraIndent = prevChar === '{' ? '  ' : '';
    const ins = '\n' + indent + extraIndent;
    editor.value = val.substring(0, s) + ins + val.substring(en);
    editor.selectionStart = editor.selectionEnd = s + ins.length;
    _shSync(editorId);
    _pgUpdateStats(editorId);
    return;
  }

  // ── Backspace: remove matching pair ───────────────────────
  if (key === 'Backspace' && s === en && s > 0) {
    const prev = val[s - 1];
    const closing = AC_PAIRS[prev];
    if (closing && val[s] === closing) {
      e.preventDefault();
      editor.value = val.substring(0, s - 1) + val.substring(s + 1);
      editor.selectionStart = editor.selectionEnd = s - 1;
      _shSync(editorId);
      _pgUpdateStats(editorId);
      return;
    }
  }
}

// ─── Stats helper ─────────────────────────────────────────────
function _pgUpdateStats(editorId) {
  const editor = document.getElementById(editorId);
  if (!editor) return;
  const lang = currentLang;
  const tr = PLAYGROUND_I18N[lang];
  const lines = editor.value.split('\n');

  const statMap = {
    pgEditor:          { lines: 'pgStatLines',     chars: 'pgStatChars' },
    pgEditorHTML:      { lines: 'pgStatLinesHTML', chars: null },
  };
  const ids = statMap[editorId];
  if (ids) {
    if (ids.lines) { const el = document.getElementById(ids.lines); if (el) el.textContent = `${lines.length} ${tr.linesLabel}`; }
    if (ids.chars) { const el = document.getElementById(ids.chars); if (el) el.textContent = `${editor.value.length} ${tr.charsLabel}`; }
  }
}

// ═══════════════════════════════════════════════════════════════
//  BUILD UI
// ═══════════════════════════════════════════════════════════════
function buildPlayground() {
  const existing = document.getElementById('playground-section');
  if (existing) existing.remove();

  const lang = currentLang;
  const tr   = PLAYGROUND_I18N[lang];
  const chal = CHALLENGES[lang]      || CHALLENGES['pt'];
  const htmlC= HTML_CHALLENGES[lang] || HTML_CHALLENGES['pt'];

  const section = document.createElement('div');
  section.id = 'playground-section';
  section.className = 'section playground-section';
  section.innerHTML = `
    <div class="section-header">
      <div class="section-icon">🧪</div>
      <div>
        <div class="section-title">${tr.title}</div>
        <div class="section-sub">${tr.subtitle}</div>
      </div>
    </div>
    <div class="pg-container">

      <!-- MODE TABS -->
      <div class="pg-mode-tabs">
        <button class="pg-mode-btn active" id="pgTabJS"        onclick="pgSetMode('js')">${tr.tabJS}</button>
        <button class="pg-mode-btn"        id="pgTabHTML"      onclick="pgSetMode('html')">${tr.tabHTML}</button>
        <button class="pg-mode-btn pg-mode-btn-java"   id="pgTabJava"      onclick="pgSetMode('java')">☕ ${tr.tabJava}</button>
        <button class="pg-mode-btn pg-mode-btn-python" id="pgTabPython"    onclick="pgSetMode('python')">🐍 ${tr.tabPython}</button>
        <button class="pg-mode-btn"        id="pgTabChallenge" onclick="pgSetMode('challenge')">${tr.tabChallenge}</button>
        <span class="pg-shortcut-tip">${tr.shortcutTip}</span>
      </div>

      <!-- JS PANEL -->
      <div id="pgModeJS" class="pg-mode-panel">
        <div class="pg-split">
          <div class="pg-editor-col">
            <div class="pg-panel-header">
              <span>${tr.editorTitle} — JavaScript</span>
              <div class="pg-header-right">
                <span class="pg-stat" id="pgStatLines">1 ${tr.linesLabel}</span>
                <span class="pg-stat" id="pgStatChars">0 ${tr.charsLabel}</span>
              </div>
            </div>
            <div class="pg-editor-wrap">
              <div class="pg-line-nums" id="pgLineNums">1</div>
              <textarea id="pgEditor" class="pg-editor" spellcheck="false" autocomplete="off">${tr.placeholderJS}</textarea>
            </div>
            <div class="pg-actions">
              <button class="pg-btn pg-btn-run"   onclick="pgRun()">${tr.run}</button>
              <button class="pg-btn pg-btn-clear" onclick="pgClearOutput()">${tr.clear}</button>
              <button class="pg-btn pg-btn-reset" onclick="pgReset()">${tr.reset}</button>
              <button class="pg-btn pg-btn-copy"  id="pgCopyBtn" onclick="pgCopyCode()">${tr.copy}</button>
            </div>
          </div>
          <div class="pg-output-col">
            <div class="pg-panel-header">
              <span>${tr.consoleTitle}</span>
              <span class="pg-exec-time" id="pgExecTime"></span>
            </div>
            <div class="pg-output" id="pgOutput">
              <div class="pg-output-empty">${tr.empty}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- HTML PANEL -->
      <div id="pgModeHTML" class="pg-mode-panel" style="display:none">
        <div class="pg-split">
          <div class="pg-editor-col">
            <div class="pg-panel-header">
              <span>${tr.editorTitle} — HTML/CSS</span>
              <span class="pg-stat" id="pgStatLinesHTML">1 ${tr.linesLabel}</span>
            </div>
            <div class="pg-editor-wrap">
              <div class="pg-line-nums" id="pgLineNumsHTML">1</div>
              <textarea id="pgEditorHTML" class="pg-editor" spellcheck="false">${tr.placeholderHTML}</textarea>
            </div>
            <div class="pg-html-challenge-bar" id="pgHTMLChallengeBar">
              ${htmlC.map((c,i)=>`<button class="pg-challenge-chip${i===0?' active':''}" onclick="pgLoadHTMLChallenge(${i})" data-htmlc="${i}">${c.icon} ${c.title}</button>`).join('')}
            </div>
            <div class="pg-actions">
              <button class="pg-btn pg-btn-run" onclick="pgRunHTML()" style="background:#2ea043">▶ ${tr.previewTitle}</button>
              <button class="pg-btn pg-btn-reset" onclick="pgResetHTML()">${tr.reset}</button>
            </div>
          </div>
          <div class="pg-output-col">
            <div class="pg-panel-header"><span>🖼 ${tr.previewTitle}</span></div>
            <iframe id="pgPreview" class="pg-preview" sandbox="allow-scripts allow-same-origin"></iframe>
          </div>
        </div>
      </div>

      <!-- JAVA PANEL -->
      <div id="pgModeJava" class="pg-mode-panel" style="display:none">
        <div class="pg-ai-note">${tr.simNote}</div>
        <div class="pg-split">
          <div class="pg-editor-col">
            <div class="pg-panel-header"><span>${tr.editorTitle} — ☕ Java</span></div>
            <div class="pg-editor-wrap">
              <div class="pg-line-nums" id="pgLineNumsJava">1</div>
              <textarea id="pgEditorJava" class="pg-editor" spellcheck="false">${tr.placeholderJava}</textarea>
            </div>
            <div class="pg-actions">
              <button class="pg-btn pg-btn-run pg-btn-java" onclick="pgRunJava()">${tr.run}</button>
              <button class="pg-btn pg-btn-reset"           onclick="pgResetJava()">${tr.reset}</button>
            </div>
          </div>
          <div class="pg-output-col">
            <div class="pg-panel-header">
              <span>${tr.consoleTitle} — ☕ Java</span>
              <span class="pg-exec-time" id="pgExecTimeJava"></span>
            </div>
            <div class="pg-output" id="pgOutputJava">
              <div class="pg-output-empty">${tr.empty}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- PYTHON PANEL -->
      <div id="pgModePython" class="pg-mode-panel" style="display:none">
        <div class="pg-ai-note">${tr.simNote}</div>
        <div class="pg-split">
          <div class="pg-editor-col">
            <div class="pg-panel-header"><span>${tr.editorTitle} — 🐍 Python</span></div>
            <div class="pg-editor-wrap">
              <div class="pg-line-nums" id="pgLineNumsPython">1</div>
              <textarea id="pgEditorPython" class="pg-editor" spellcheck="false">${tr.placeholderPython}</textarea>
            </div>
            <div class="pg-actions">
              <button class="pg-btn pg-btn-run pg-btn-python" onclick="pgRunPython()">${tr.run}</button>
              <button class="pg-btn pg-btn-reset"             onclick="pgResetPython()">${tr.reset}</button>
            </div>
          </div>
          <div class="pg-output-col">
            <div class="pg-panel-header">
              <span>${tr.consoleTitle} — 🐍 Python</span>
              <span class="pg-exec-time" id="pgExecTimePython"></span>
            </div>
            <div class="pg-output" id="pgOutputPython">
              <div class="pg-output-empty">${tr.empty}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- CHALLENGE PANEL -->
      <div id="pgModeChallenge" class="pg-mode-panel" style="display:none">
        <div class="pg-challenge-list" id="pgChallengeList">
          ${chal.map((c,i)=>`
            <button class="pg-challenge-card" onclick="pgLoadChallenge(${i})">
              <span class="pg-challenge-icon">${c.icon}</span>
              <div class="pg-challenge-info">
                <div class="pg-challenge-name">${c.title}</div>
                <div class="pg-challenge-desc">${c.desc.substring(0,65)}...</div>
              </div>
              <span class="pg-challenge-arrow">→</span>
            </button>`).join('')}
        </div>
        <div id="pgChallengeEditor" style="display:none">
          <div class="pg-challenge-header" id="pgChallengeHeader"></div>
          <div class="pg-split">
            <div class="pg-editor-col">
              <div class="pg-panel-header">
                <span>${tr.editorTitle}</span>
                <button class="pg-back-btn" onclick="pgBackToChallenges()">← Voltar</button>
              </div>
              <div class="pg-editor-wrap">
                <div class="pg-line-nums" id="pgLineNumsChallenge">1</div>
                <textarea id="pgEditorChallenge" class="pg-editor" spellcheck="false"></textarea>
              </div>
              <div class="pg-actions">
                <button class="pg-btn pg-btn-run"      onclick="pgRunChallenge()">${tr.run}</button>
                <button class="pg-btn pg-btn-solution" id="pgSolutionBtn" onclick="pgToggleSolution()">${tr.solve}</button>
                <button class="pg-btn pg-btn-reset"    onclick="pgResetChallenge()">${tr.reset}</button>
              </div>
            </div>
            <div class="pg-output-col">
              <div class="pg-panel-header"><span>${tr.consoleTitle}</span></div>
              <div class="pg-output" id="pgOutputChallenge">
                <div class="pg-output-empty">${tr.empty}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>`;

  document.getElementById('sections').appendChild(section);

  _pgWireEditor('pgEditor',          'pgLineNums',           'pgStatLines',      'pgStatChars',     'js');
  _pgWireEditor('pgEditorHTML',      'pgLineNumsHTML',       'pgStatLinesHTML',  null,              'html');
  _pgWireEditor('pgEditorJava',      'pgLineNumsJava',       null,               null,              'java');
  _pgWireEditor('pgEditorPython',    'pgLineNumsPython',     null,               null,              'python');
  _pgWireEditor('pgEditorChallenge', 'pgLineNumsChallenge',  null,               null,              'js');

  pgRunHTML(); // render initial HTML preview
}

// ═══════════════════════════════════════════════════════════════
//  EDITOR WIRING — now with syntax highlighting + auto-close
// ═══════════════════════════════════════════════════════════════
function _pgWireEditor(editorId, lineNumsId, statLinesId, statCharsId, shLang) {
  const editor   = document.getElementById(editorId);
  const lineNums = document.getElementById(lineNumsId);
  if (!editor) return;

  // Init syntax highlighting overlay
  if (shLang) _shInit(editorId, shLang);

  const update = () => {
    const lines = editor.value.split('\n');
    if (lineNums) lineNums.innerHTML = lines.map((_,i) => i+1).join('<br>');
    const tr = PLAYGROUND_I18N[currentLang];
    if (statLinesId) { const el = document.getElementById(statLinesId); if(el) el.textContent = `${lines.length} ${tr.linesLabel}`; }
    if (statCharsId) { const el = document.getElementById(statCharsId); if(el) el.textContent = `${editor.value.length} ${tr.charsLabel}`; }
    _shSync(editorId);
  };

  editor.addEventListener('input',  update);
  editor.addEventListener('scroll', () => {
    if (lineNums) lineNums.scrollTop = editor.scrollTop;
    _shSync(editorId);
  });

  editor.addEventListener('keydown', e => {
    // Tab key
    if (e.key === 'Tab') {
      e.preventDefault();
      const s = editor.selectionStart, en = editor.selectionEnd;
      editor.value = editor.value.substring(0,s) + '  ' + editor.value.substring(en);
      editor.selectionStart = editor.selectionEnd = s + 2;
      update();
      return;
    }
    // Ctrl+Enter to run
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      if      (editorId === 'pgEditor')           pgRun();
      else if (editorId === 'pgEditorHTML')        pgRunHTML();
      else if (editorId === 'pgEditorJava')        pgRunJava();
      else if (editorId === 'pgEditorPython')      pgRunPython();
      else if (editorId === 'pgEditorChallenge')   pgRunChallenge();
      return;
    }
    // Ctrl+L to clear
    if (e.ctrlKey && e.key === 'l') { e.preventDefault(); pgClearOutput(); return; }

    // Auto-close brackets & quotes (skip for HTML to avoid interfering with tags)
    if (shLang !== 'html') {
      _acHandleKeydown(e, editorId);
    }
  });

  update();
}

// ═══════════════════════════════════════════════════════════════
//  MODE SWITCHING
// ═══════════════════════════════════════════════════════════════
function pgSetMode(mode) {
  PG.mode = mode;
  Object.entries(PG_PANELS).forEach(([m, panelId]) => {
    const el = document.getElementById(panelId);
    if (el) el.style.display = (m === mode) ? 'block' : 'none';
  });
  Object.entries(PG_TABS).forEach(([m, tabId]) => {
    const el = document.getElementById(tabId);
    if (el) el.classList.toggle('active', m === mode);
  });
  if (mode === 'html') pgRunHTML();
}

// ═══════════════════════════════════════════════════════════════
//  JS EXECUTION
// ═══════════════════════════════════════════════════════════════
function pgRun()           { _pgExecuteJS(document.getElementById('pgEditor')?.value, 'pgOutput', 'pgExecTime'); }
function pgRunChallenge()  { _pgExecuteJS(document.getElementById('pgEditorChallenge')?.value, 'pgOutputChallenge', null); }

function _pgExecuteJS(code, outputId, timeId) {
  const output = document.getElementById(outputId);
  if (!output || !code) return;
  const logs = [], errors = [];
  const start = performance.now();

  const fakeConsole = {
    log:   (...a) => logs.push({ t:'log',   v: a.map(_pgFmt).join(' ') }),
    warn:  (...a) => logs.push({ t:'warn',  v: a.map(_pgFmt).join(' ') }),
    error: (...a) => logs.push({ t:'error', v: a.map(_pgFmt).join(' ') }),
    info:  (...a) => logs.push({ t:'info',  v: a.map(_pgFmt).join(' ') }),
    table: (d)   => logs.push({ t:'table', v: _pgFmtTable(d) }),
  };
  try { (new Function('console', code))(fakeConsole); }
  catch(e) { errors.push(e.message); }

  const ms = (performance.now() - start).toFixed(2);
  if (timeId) { const el = document.getElementById(timeId); if(el) el.textContent = ms + 'ms'; }

  if (!logs.length && !errors.length) {
    output.innerHTML = `<div class="pg-output-empty">✓ Executado sem saída.</div>`; return;
  }
  output.innerHTML = [
    ...logs.map(l => `<div class="pg-line pg-line-${l.t}">${
      l.t === 'table' ? l.v :
      `<span class="pg-line-prefix">${l.t==='warn'?'⚠':l.t==='error'?'✖':l.t==='info'?'ℹ':'›'}</span><span>${l.v}</span>`
    }</div>`),
    ...errors.map(e => `<div class="pg-line pg-line-error"><span class="pg-line-prefix">✖</span><span class="pg-error-msg">${e}</span></div>`)
  ].join('');
}

function _pgFmt(val) {
  if (val === null)       return `<span class="pg-null">null</span>`;
  if (val === undefined)  return `<span class="pg-undefined">undefined</span>`;
  if (typeof val === 'boolean') return `<span class="pg-bool">${val}</span>`;
  if (typeof val === 'number')  return `<span class="pg-num">${val}</span>`;
  if (typeof val === 'string')  return `<span class="pg-str">"${val}"</span>`;
  if (Array.isArray(val)) return `<span class="pg-arr">[${val.map(_pgFmt).join(', ')}]</span>`;
  if (typeof val === 'object') { try { return `<span class="pg-obj">${JSON.stringify(val,null,2)}</span>`; } catch{} }
  return String(val);
}
function _pgFmtTable(data) {
  if (!Array.isArray(data)||!data.length) return _pgFmt(data);
  const keys = Object.keys(data[0]);
  return `<table class="pg-table"><thead><tr>${keys.map(k=>`<th>${k}</th>`).join('')}</tr></thead>
    <tbody>${data.map(r=>`<tr>${keys.map(k=>`<td>${r[k]??''}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

// ═══════════════════════════════════════════════════════════════
//  HTML PREVIEW
// ═══════════════════════════════════════════════════════════════
function pgRunHTML() {
  const code   = document.getElementById('pgEditorHTML')?.value || '';
  const iframe = document.getElementById('pgPreview');
  if (!iframe) return;
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open(); doc.write(code); doc.close();
}
function pgResetHTML() {
  const tr = PLAYGROUND_I18N[currentLang];
  const ed = document.getElementById('pgEditorHTML');
  if (ed) { ed.value = tr.placeholderHTML; pgRunHTML(); _pgWireEditor('pgEditorHTML','pgLineNumsHTML','pgStatLinesHTML',null,'html'); }
}
function pgLoadHTMLChallenge(idx) {
  const cs = HTML_CHALLENGES[currentLang] || HTML_CHALLENGES['pt'];
  if (!cs[idx]) return;
  document.querySelectorAll('[data-htmlc]').forEach((b,i) => b.classList.toggle('active', i===idx));
  document.getElementById('pgEditorHTML').value = cs[idx].starter;
  pgRunHTML();
  _shSync('pgEditorHTML');
}

// ═══════════════════════════════════════════════════════════════
//  JAVA & PYTHON — Claude API
// ═══════════════════════════════════════════════════════════════
async function _pgRunSimulated(editorId, outputId, timeId, langName) {
  const code   = document.getElementById(editorId)?.value?.trim();
  const output = document.getElementById(outputId);
  const tr     = PLAYGROUND_I18N[currentLang];
  if (!output || !code) return;

  output.innerHTML = `<div class="pg-output-loading"><span class="pg-spinner"></span> ${tr.simulating}</div>`;
  const start = performance.now();

  const systemPrompt =
    `You are a ${langName} code execution engine. ` +
    `Given ${langName} source code, return ONLY what would be printed to stdout, ` +
    `exactly as it would appear in a terminal, with no extra text, markdown, or code blocks. ` +
    `If there is a compilation or runtime error, return exactly: ERROR: <brief description>`;

  const apiKey = (typeof guideGetAPIKey === 'function') ? guideGetAPIKey() : (window.GEMINI_API_KEY || '');
  if (!apiKey) {
    output.innerHTML = `<div class="pg-line pg-line-error"><span class="pg-line-prefix">✖</span><span class="pg-error-msg">Configure sua API Key no Assistente Dev 🤖 (canto inferior direito)</span></div>`;
    if (typeof guideShowAPIKeyModal === 'function') guideShowAPIKeyModal(() => _pgRunSimulated(editorId, outputId, timeId, langName));
    return;
  }

  try {
    const geminiPrompt = systemPrompt + '\n\nCódigo:\n' + code;
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: geminiPrompt }] }],
          generationConfig: { maxOutputTokens: 512, temperature: 0 }
        })
      }
    );
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);

    const ms = (performance.now() - start).toFixed(0);
    if (timeId) { const el = document.getElementById(timeId); if(el) el.textContent = ms + 'ms'; }

    const text = (data.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
    if (!text) { output.innerHTML = `<div class="pg-output-empty">✓ Executado sem saída.</div>`; return; }

    if (text.startsWith('ERROR:')) {
      output.innerHTML = `<div class="pg-line pg-line-error"><span class="pg-line-prefix">✖</span><span class="pg-error-msg">${text.replace('ERROR:','').trim()}</span></div>`;
    } else {
      output.innerHTML = text.split('\n').map(line =>
        `<div class="pg-line pg-line-log"><span class="pg-line-prefix">›</span><span>${line===''?'&nbsp;':line}</span></div>`
      ).join('');
    }
  } catch(err) {
    output.innerHTML = `<div class="pg-line pg-line-error"><span class="pg-line-prefix">✖</span><span class="pg-error-msg">Falha: ${err.message}</span></div>`;
  }
}

function pgRunJava()   { _pgRunSimulated('pgEditorJava',   'pgOutputJava',   'pgExecTimeJava',   'Java');   }
function pgRunPython() { _pgRunSimulated('pgEditorPython', 'pgOutputPython', 'pgExecTimePython', 'Python'); }

function pgResetJava() {
  const tr = PLAYGROUND_I18N[currentLang];
  const ed = document.getElementById('pgEditorJava');
  if(ed) { ed.value = tr.placeholderJava; _pgWireEditor('pgEditorJava','pgLineNumsJava',null,null,'java'); }
  const out = document.getElementById('pgOutputJava');
  if(out) out.innerHTML = `<div class="pg-output-empty">${tr.empty}</div>`;
  const te = document.getElementById('pgExecTimeJava'); if(te) te.textContent = '';
}
function pgResetPython() {
  const tr = PLAYGROUND_I18N[currentLang];
  const ed = document.getElementById('pgEditorPython');
  if(ed) { ed.value = tr.placeholderPython; _pgWireEditor('pgEditorPython','pgLineNumsPython',null,null,'python'); }
  const out = document.getElementById('pgOutputPython');
  if(out) out.innerHTML = `<div class="pg-output-empty">${tr.empty}</div>`;
  const te = document.getElementById('pgExecTimePython'); if(te) te.textContent = '';
}

// ═══════════════════════════════════════════════════════════════
//  CHALLENGES
// ═══════════════════════════════════════════════════════════════
function pgLoadChallenge(idx) {
  const cs = CHALLENGES[currentLang] || CHALLENGES['pt'];
  const c  = cs[idx]; if (!c) return;
  PG.currentChallenge = idx; PG.showSolution = false;
  const tr = PLAYGROUND_I18N[currentLang];
  document.getElementById('pgChallengeList').style.display   = 'none';
  document.getElementById('pgChallengeEditor').style.display = 'block';
  document.getElementById('pgChallengeHeader').innerHTML = `
    <div class="pg-challenge-detail-header">
      <span class="pg-c-icon">${c.icon}</span>
      <div>
        <div class="pg-c-title">${c.title}</div>
        <div class="pg-c-desc">${c.desc}</div>
        <div class="pg-c-hint"><strong>${tr.challengeHint}:</strong> ${c.hint}</div>
      </div>
    </div>`;
  document.getElementById('pgEditorChallenge').value = c.starter;
  document.getElementById('pgSolutionBtn').textContent = tr.solve;
  document.getElementById('pgOutputChallenge').innerHTML = `<div class="pg-output-empty">${tr.empty}</div>`;
  _pgWireEditor('pgEditorChallenge','pgLineNumsChallenge',null,null,'js');
}
function pgBackToChallenges() {
  document.getElementById('pgChallengeList').style.display   = 'flex';
  document.getElementById('pgChallengeEditor').style.display = 'none';
  PG.currentChallenge = null;
}
function pgToggleSolution() {
  const cs = CHALLENGES[currentLang] || CHALLENGES['pt'];
  if (PG.currentChallenge === null) return;
  const c  = cs[PG.currentChallenge];
  const tr = PLAYGROUND_I18N[currentLang];
  PG.showSolution = !PG.showSolution;
  const ed  = document.getElementById('pgEditorChallenge');
  const btn = document.getElementById('pgSolutionBtn');
  if (PG.showSolution) {
    ed.value = c.solution; btn.textContent = tr.hideSolve;
    _shSync('pgEditorChallenge');
    _pgWireEditor('pgEditorChallenge','pgLineNumsChallenge',null,null,'js');
    pgRunChallenge();
  } else {
    ed.value = c.starter; btn.textContent = tr.solve;
    _shSync('pgEditorChallenge');
    _pgWireEditor('pgEditorChallenge','pgLineNumsChallenge',null,null,'js');
    document.getElementById('pgOutputChallenge').innerHTML = `<div class="pg-output-empty">${tr.empty}</div>`;
  }
}
function pgResetChallenge() {
  const cs = CHALLENGES[currentLang] || CHALLENGES['pt'];
  if (PG.currentChallenge === null) return;
  const c  = cs[PG.currentChallenge];
  const tr = PLAYGROUND_I18N[currentLang];
  PG.showSolution = false;
  document.getElementById('pgEditorChallenge').value = c.starter;
  document.getElementById('pgSolutionBtn').textContent = tr.solve;
  document.getElementById('pgOutputChallenge').innerHTML = `<div class="pg-output-empty">${tr.empty}</div>`;
  _shSync('pgEditorChallenge');
  _pgWireEditor('pgEditorChallenge','pgLineNumsChallenge',null,null,'js');
}

// ═══════════════════════════════════════════════════════════════
//  UTILITIES
// ═══════════════════════════════════════════════════════════════
function pgClearOutput() {
  const tr  = PLAYGROUND_I18N[currentLang];
  const out = document.getElementById('pgOutput');
  if(out) out.innerHTML = `<div class="pg-output-empty">${tr.clearConfirm}</div>`;
  const te  = document.getElementById('pgExecTime');
  if(te) te.textContent = '';
}
function pgReset() {
  const tr = PLAYGROUND_I18N[currentLang];
  const ed = document.getElementById('pgEditor');
  if(ed) { ed.value = tr.placeholderJS; _shSync('pgEditor'); _pgWireEditor('pgEditor','pgLineNums','pgStatLines','pgStatChars','js'); }
  pgClearOutput();
}
function pgCopyCode() {
  const ed  = document.getElementById('pgEditor');
  const btn = document.getElementById('pgCopyBtn');
  const tr  = PLAYGROUND_I18N[currentLang];
  if(!ed||!btn) return;
  navigator.clipboard.writeText(ed.value).then(() => {
    btn.textContent = tr.copied; btn.classList.add('copied');
    setTimeout(() => { btn.textContent = tr.copy; btn.classList.remove('copied'); }, 2000);
  });
}

// ═══════════════════════════════════════════════════════════════
//  SIDEBAR + HEADER TAB
// ═══════════════════════════════════════════════════════════════
function addPlaygroundToSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar || document.getElementById('pg-sidebar-entry')) return;
  const entry = document.createElement('div');
  entry.id = 'pg-sidebar-entry';
  entry.className = 'sidebar-section';
  entry.innerHTML = `
    <div class="sidebar-label">🧪 Playground</div>
    <div class="sidebar-item" onclick="pgNavigate('js')"        style="--item-color:#f0883e"><span class="icon">💻</span><span class="label">JavaScript</span></div>
    <div class="sidebar-item" onclick="pgNavigate('html')"      style="--item-color:#2ea043"><span class="icon">🖼</span><span class="label">HTML/CSS</span></div>
    <div class="sidebar-item" onclick="pgNavigate('java')"      style="--item-color:#e0823d"><span class="icon">☕</span><span class="label">Java</span></div>
    <div class="sidebar-item" onclick="pgNavigate('python')"    style="--item-color:#3572A5"><span class="icon">🐍</span><span class="label">Python</span></div>
    <div class="sidebar-item" onclick="pgNavigate('challenge')" style="--item-color:#58a6ff"><span class="icon">🎯</span><span class="label">Desafios</span></div>`;
  sidebar.appendChild(entry);
}

function addPlaygroundHeaderTab() {
  const tabs = document.getElementById('headerTabs');
  if (!tabs || document.getElementById('pg-header-tab')) return;
  const btn = document.createElement('button');
  btn.id = 'pg-header-tab'; btn.className = 'htab';
  btn.style.setProperty('--tab-color', '#f0883e');
  btn.innerHTML = `<span class="dot"></span>🧪 Playground`;
  btn.onclick = () => pgNavigate('js');
  tabs.appendChild(btn);
}

function pgNavigate(mode) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('visible'));
  document.querySelectorAll('.htab').forEach(t => t.classList.remove('active'));
  const pg = document.getElementById('playground-section');
  if (pg) { pg.classList.add('visible'); pg.scrollIntoView({ behavior:'smooth', block:'start' }); }
  pgSetMode(mode || 'js');
}

// ═══════════════════════════════════════════════════════════════
//  LANG PATCH + INIT
// ═══════════════════════════════════════════════════════════════
(function() {
  window.__pgPatchSetLang = function() {
    const orig = window.setLang;
    window.setLang = function(lang, btn) {
      orig(lang, btn);
      setTimeout(() => {
        ['pg-sidebar-entry','pg-header-tab'].forEach(id => { const el = document.getElementById(id); if(el) el.remove(); });
        buildPlayground();
        addPlaygroundToSidebar();
        addPlaygroundHeaderTab();
      }, 150);
    };
  };
})();

(function waitForApp() {
  const check = setInterval(() => {
    if (document.getElementById('sections') && document.querySelector('.section.visible')) {
      clearInterval(check);
      buildPlayground();
      addPlaygroundToSidebar();
      addPlaygroundHeaderTab();
      window.__pgPatchSetLang && window.__pgPatchSetLang();
    }
  }, 200);
})();
