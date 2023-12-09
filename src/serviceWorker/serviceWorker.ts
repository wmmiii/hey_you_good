import { clearOldCaches, getCachedResponse } from '../storage/cache';

declare const self: any;

self.addEventListener('install', (event: any) => {
  event.waitUntil(clearOldCaches());

  (self as any).skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('Service worker activated for build:', '%BUILD_CHECKSUM%');
});

self.addEventListener('fetch', (event: any) => {
  if (event.request.method !== 'GET' ||
    new URL(event.request.url).pathname === '/file_manifest.json') {
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
