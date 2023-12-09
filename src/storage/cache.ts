const cacheName = 'web-cache-%BUILD_CHECKSUM%';

function shouldCache(fileName: string): boolean {
  return fileName.indexOf('service_worker.js') < 0
    && fileName.indexOf('manifest.json') < 0;
}

export async function clearOldCaches(): Promise<void> {
  const oldCaches = await caches.keys();

  const cache = await caches.open(cacheName);
  const response = await fetch('/real_manifest.json');
  const jsonBody = await response.json();
  const files = jsonBody['Files'] as string[];
  await cache.addAll(files.filter(shouldCache));
  await cache.add('/');

  for (let c of oldCaches.filter((c) => c !== cacheName)) {
    console.log('deleting cache', c);
    await caches.delete(c);
  }
}

export async function clearAllCaches(): Promise<void> {
  for (let c of await caches.keys()) {
    console.log('deleting cache', c);
    await caches.delete(c);
  }
}

export async function getCachedResponse(request: Request):
    Promise<Response | undefined> {
  const cache = await caches.open(cacheName);
  return await cache.match(request);
}