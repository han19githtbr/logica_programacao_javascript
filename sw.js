// =============================================
// SERVICE WORKER — Dev Manual PWA
// =============================================

const CACHE_NAME = 'dev-manual-v1';

// Arquivos que serão cacheados no install (shell da aplicação)
const APP_SHELL = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/index.js',
  '/data.json',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap'
];

// ── INSTALL: pré-cacheia o app shell ──────────────────────────────────────────
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching app shell');
      // Usa addAll com fallback individual para não quebrar em erros de rede
      return Promise.allSettled(
        APP_SHELL.map(url => cache.add(url).catch(err => console.warn('[SW] Failed to cache:', url, err)))
      );
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: limpa caches antigos ───────────────────────────────────────────
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => {
          console.log('[SW] Deleting old cache:', key);
          return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: estratégia Cache-First com fallback para rede ─────────────────────
self.addEventListener('fetch', event => {
  // Ignora requests que não são GET ou são de extensões do browser
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension')) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Retorna do cache e atualiza em background (stale-while-revalidate)
        const fetchPromise = fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
          }
          return networkResponse;
        }).catch(() => {});
        return cachedResponse;
      }

      // Não está no cache: busca da rede e armazena
      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
          return networkResponse;
        }
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        return networkResponse;
      }).catch(() => {
        // Offline fallback: retorna o index.html para navegação
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});