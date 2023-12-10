import { clearOldCaches, getCachedResponse } from '../storage/cache';

declare const self: any;

const skipCache = [
  '/file_manifest.json',
  '/service_worker.js',
];

self.addEventListener('install', (event: any) => {
  event.waitUntil(clearOldCaches());

  (self as any).skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('Service worker activated for build:', '%BUILD_CHECKSUM%');
});

self.addEventListener('fetch', (event: any) => {
  const path = new URL(event.request.url).pathname;
  if (event.request.method !== 'GET' || skipCache.indexOf(path) > -1) {
    return;
  }

  event.respondWith((async () => {
    const cachedResponse = await getCachedResponse(event.request);

    if (cachedResponse) {
      return cachedResponse;
    } else {
      return fetch(event.request);
    };
  })());
});
