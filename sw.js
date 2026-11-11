// Ski Park offline cache. The game page and config are fetched fresh when online; everything else is cached.
const CACHE = 'skipark-v2', CORE = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())));
self.addEventListener('activate', (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (e) => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url); if (/firebaseio\.com$|googleapis\.com$/.test(u.hostname)) return;      // never cache the database or sign-in
  const fresh = u.origin === location.origin && (/(index\.html|config\.js)$/.test(u.pathname) || u.pathname.endsWith('/'));
  const store = (res) => { if (res && res.ok) { const c = res.clone(); caches.open(CACHE).then((x) => x.put(r, c)); } return res; };
  e.respondWith(fresh ? fetch(r).then(store).catch(() => caches.match(r)) : caches.match(r).then((h) => h || fetch(r).then(store)));
});
