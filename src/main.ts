import "./browserHistory";
import App from "./App.svelte";
import { initStorage } from './storage/localDb';
import { getUserSettings, setUserSettings } from "./storage/userSettings";
import { sendMessageToServiceWorker } from "./serviceWorker/messagePassing";

const swUpdateInterval = 1000 * 60 * 60;

initStorage();

if (getUserSettings() == null) {
  setUserSettings({
    checkInTimes: [
      { h: 10, m: 0 },
      { h: 14, m: 0 },
      { h: 19, m: 0 },
      { h: 23, m: 0 },
    ]
  })
}

if (navigator.serviceWorker != null) {
  navigator.serviceWorker
    .register('service_worker.js')
    .then((reg) => {
      setInterval(() => reg.update, swUpdateInterval);
      const userSettings = getUserSettings();
      if (userSettings != null) {
        sendMessageToServiceWorker({
          subject: 'user-settings',
          settings: userSettings,
        });
      }
    });
}

new App({
  target: document.body,
});
