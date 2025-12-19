const CACHE_NAME = 'hiragana-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/app.js',
    '/auth.js',
    '/stroke-order.js',
    '/themes.js',
    '/favicon.png',
    '/manifest.json',
    '/og-image.png',
    '/firebase-config.js'
];

const CDN_CACHE_NAME = 'hiragana-cdn-v1';

// Install event - precache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== CDN_CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    event.waitUntil(clients.claim());
});

// Fetch event
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Handle CDN requests (Tailwind, Fonts)
    if (url.origin === 'https://cdn.tailwindcss.com' ||
        url.hostname.includes('fonts.googleapis.com') ||
        url.hostname.includes('fonts.gstatic.com')) {
        event.respondWith(
            caches.open(CDN_CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((response) => {
                    const fetchPromise = fetch(event.request).then((networkResponse) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                    return response || fetchPromise;
                });
            })
        );
        return;
    }

    // Handle Firestore/Auth requests - Network only, no cache
    if (url.hostname.includes('firestore.googleapis.com') ||
        url.hostname.includes('googleapis.com') ||
        url.hostname.includes('firebase')) {
        return;
    }

    // App assets - Stale-while-revalidate
    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((response) => {
                const fetchPromise = fetch(event.request)
                    .then((networkResponse) => {
                        // Don't cache non-success responses (except 0 for opaque responses like fonts sometimes)
                        if (!networkResponse || (networkResponse.status !== 200 && networkResponse.status !== 0)) {
                            return networkResponse;
                        }
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    })
                    .catch(() => {
                        // Offline fallback could go here
                        // For now, if both cache and network fail, we just return nothing or the cached response
                        return response;
                    });

                return response || fetchPromise;
            });
        })
    );
});
