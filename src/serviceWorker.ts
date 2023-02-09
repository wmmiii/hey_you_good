declare const clients: any;

const cacheName = 'web-cache-%BUILD_CHECKSUM%';

const shouldCache = (fileName: string): boolean => {
  return fileName.indexOf('service_worker.js') < 0
    && fileName.indexOf('manifest.json') < 0;
};

self.addEventListener('install', (event: any) => {
  event.waitUntil((async () => {
    const oldCaches = await caches.keys();

    const cache = await caches.open(cacheName);
    const response = await fetch('/file_manifest.json');
    const jsonBody = await response.json();
    const files = jsonBody['Files'] as string[];
    await cache.addAll(files.filter(shouldCache));
    await cache.add('/');
    
    for (let c of oldCaches) {
      console.log('deleting cache', c);
      await caches.delete(c);
    }
  })());

  (self as any).skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('Service worker activated for build:', '%BUILD_CHECKSUM%');
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
