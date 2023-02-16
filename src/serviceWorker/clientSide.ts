import { listen } from "svelte/internal";
import { getUserSettings } from "../storage/userSettings";
import { Message } from "./messages";

const swUpdateInterval = 1000 * 60 * 60;

let registration: Promise<ServiceWorkerRegistration>;
export function getSWRegistration(): Promise<ServiceWorkerRegistration> {
  if (registration) {
    return registration;
  }

  if (navigator.serviceWorker == null) {
    return Promise.reject("This browser does not support service workers!");
  }

  registration = navigator.serviceWorker.register('service_worker.js');

  registration.then((reg) => {
    setInterval(() => reg.update, swUpdateInterval);
    const userSettings = getUserSettings();
    if (userSettings != null) {
      sendMessageToServiceWorker({
        subject: 'user-settings',
        settings: userSettings,
      });
    }
  });

  return registration;
}

export async function sendMessageToServiceWorker(message: Message): Promise<void> {
  const sw = await navigator.serviceWorker.getRegistration();
  if (sw?.active == null) {
    console.error('Could not find active service worker to post message to!', message);
  } else {
    sw?.active?.postMessage(message);
  }
}

interface Listener<T extends Message> {
  subject: T['subject'];
  consumer: (message: T) => any;
}

let listeners: Listener<any>[] = [];

export function initMessageListener() {
  navigator.serviceWorker.addEventListener('message', (event) => {
    const message = event.data as Message;
    listeners.forEach((l) => {
      if (l.subject === message.subject) {
        l.consumer(message);
      }
    })
  });
}

export function registerMessageListener<T extends Message>(subject: T['subject'], listener: (message: T) => any): void {
  if (listeners.filter((l) => l.consumer === listener).length <= 0) {
    listeners.push({subject, consumer: listener});
  }
}

export function removeMessageListener<T extends Message>(listener: (message: T) => any): void {
  listeners = listeners.filter((l) => l.consumer !== listener);
}
