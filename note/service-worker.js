// Service Worker для PWA
const CACHE_NAME = 'diary-v1';
const FILES_TO_CACHE = [
  './',
  './diary.html',
  './manifest.json',
  './icons/house.png',
  './icons/literature.png',
  './icons/goal.png',
  './icons/calendar.png',
  './icons/graph.png',
  './icons/game-control.png',
  './icons/web-settings.png',
  './icons/perfect-day.png'
];

// Установка — кэшируем файлы
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Активация — чистим старый кэш
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME)
            .map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// Перехват запросов — отдаём из кэша
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});