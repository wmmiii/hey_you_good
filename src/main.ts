import "./browserHistory";
import App from "./App.svelte";
import { initStorage } from './storage/localDb';
import { getUserSettings, setUserSettings } from "./storage/userSettings";
import { getSWRegistration } from "./serviceWorker/clientSide";

initStorage();

// Initialize the service worker.
getSWRegistration()
  .then(() => {
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
  });

new App({
  target: document.body,
});
