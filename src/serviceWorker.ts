// This line changes the hash of the file so the service-worker will re-install.
console.log('Service worker for build:', '%BUILD_CHECKSUM%');

declare const clients: any;

const cacheName = 'web-cache';

self.addEventListener('install', (event: any) => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    const response = await fetch('/file_manifest.json');
    const jsonBody = await response.json();
    const files = jsonBody['Files'] as string[];
    cache.addAll(files.filter((f) => f.indexOf('service_worker.js') < 0));
    cache.add('/');
  })());
});

self.addEventListener('activate', (event: any) => {
  event.waitUntil(clients.claim());
  (self as any).skipWaiting();
});

self.addEventListener('fetch', (event: any) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) {
      return cachedResponse;
    } else {
      return fetch(event.request)
    };
  })());
});
