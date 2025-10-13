self.addEventListener('install', event => {
const CACHE_NAME = 'picscan-cache-v1';
event.waitUntil(
caches.open(CACHE_NAME).then(cache => {
return cache.addAll([
'/',
'/index.html',
'https://picscan.net/picscan.webp',
'https://picscan.net/icon-16.png',
'https://picscan.net/icon-512.png',
'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
// tambahkan asset penting di sini
]);
})
);
self.skipWaiting();
});


self.addEventListener('activate', event => {
event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', event => {
const request = event.request;
// simple cache-first strategy for GET
if(request.method !== 'GET') return;


event.respondWith(
caches.match(request).then(cached => {
if(cached) return cached;
return fetch(request).then(response => {
// optional: cache dynamic assets
return response;
}).catch(() => {
// fallback jika perlu
});
})
);
});
