import { UserSettings } from '../storage/userSettings';
import { clearOldCaches, getCachedResponse } from '../storage/cache';
import { Message } from './messages';

declare const self: any;

const vibrationPattern = [50, 250, 50, 150, 50, 250, 50];

let userSettings: UserSettings | undefined;

self.addEventListener('install', (event: any) => {
  event.waitUntil(clearOldCaches());

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
    const cachedResponse = await getCachedResponse(event.request);

    if (cachedResponse) {
      return cachedResponse;
    } else {
      return fetch(event.request)
    };
  })());
});

self.addEventListener('message', (event) => {
  const message = event.data as Message;
  if (message.subject === 'test-notification') {
    setTimeout(() => {
      triggerNotification('Yay! Notifications work!');
    });
  } else if (message.subject === 'user-settings') {
    userSettings = message.settings;
    setupNextNotification();
  }
});

let notificationTimeout: number = 0;

function setupNextNotification(): void {
  clearTimeout(notificationTimeout);

  const checkInTimes = userSettings?.checkInTimes;
  if (checkInTimes == null || checkInTimes.length == 0) {
    return;
  }

  const now = new Date();
  const next = checkInTimes
    .map((t) => {
      const checkInTime = new Date(now);
      checkInTime.setHours(t.h, t.m, 0);
      if (checkInTime < now) {
        checkInTime.setDate(checkInTime.getDate() + 1);
      }
      return checkInTime;
    })
    .sort((a, b) => a.getTime() - b.getTime())
  [0];

  notificationTimeout = setTimeout(() => {
    triggerNotification('Check-in reminder!');
    setupNextNotification();
  }, next.getTime() - now.getTime());
}

function triggerNotification(message: string) {
  if (Notification.permission === 'granted') {
    self.registration.showNotification(message, {
      lang: 'EN',
      badge: '/icons/icon-maskable-monochrome.png',
      icon: '/icons/icon.png',
      vibrate: vibrationPattern,
    });
  }
}
