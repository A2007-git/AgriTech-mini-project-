/**
 * AgriTech Service Worker
 * Enables offline caching and PWA installation
 */

const CACHE_NAME = 'agritech-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/design-tokens.css',
  './css/styles.css',
  './js/i18n.js',
  './js/weather.js',
  './js/crops.js',
  './js/plant_doctor.js',
  './js/mandi.js',
  './js/marketplace.js',
  './js/schemes.js',
  './js/app.js',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).catch(() => {
        return caches.match('./index.html');
      });
    })
  );
});