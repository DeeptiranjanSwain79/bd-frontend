// src/serviceWorker.js

/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'bd-cache-v1';
const urlsToCache = ['/', '/index.html'];

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch content using service worker
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return the cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});

// Activate the service worker and remove old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        // eslint-disable-next-line array-callback-return
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
/* eslint-enable no-restricted-globals */
