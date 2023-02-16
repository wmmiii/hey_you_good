import "./browserHistory";
import App from "./App.svelte";
import { initStorage } from './storage/localDb';
import { getUserSettings, setUserSettings } from "./storage/userSettings";
import { getSWRegistration, initMessageListener } from "./serviceWorker/clientSide";

initStorage();

// Initialize the service worker.
getSWRegistration()
  .then(() => {
    initMessageListener();
    if (getUserSettings() == null) {
      setUserSettings({
        checkInTimes: [
          { h: 10, m: 0 },
          { h: 14, m: 0 },
          { h: 19, m: 0 },
          { h: 23, m: 0 },
        ],
        dailyPrompts: [
          {type: 'text', prompt: 'What is one thing you wish you did better today?'},
          {type: 'text', prompt: 'What is one thing you are proud of today?'},
          {type: 'text', prompt: 'What are you looking forward to tomorrow?'},
        ],
      })
    }
  });

new App({
  target: document.body,
});
