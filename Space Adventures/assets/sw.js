
const cacheName = 'game-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/assets/stylesheet.css',
  '/assets/JavaScript.js',
  '/assets/Images/BackGround.png',
  '/assets/Images/PlayerShip.png',
  '/assets/Images/UFO.png',
  '/assets/Images/UFObullet.png',
  '/assets/Images/meteor.png',
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((existingCacheName) => {
          if (existingCacheName !== cacheName) {
            return caches.delete(existingCacheName);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});