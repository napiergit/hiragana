// Simple service worker for PWA
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// No caching - just needed for PWA installation
self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});
