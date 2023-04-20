import "./browserHistory";
import App from "./App.svelte";
import { initStorage } from './storage/localDb';
import { getUserSettings, setUserSettings, UserSettings } from "./storage/userSettings";
import { getSWRegistration } from "./serviceWorker/clientSide";

initStorage();

// Initialize the service worker.
getSWRegistration()
  .then(() => {
    const defaultSettings: UserSettings = {
      dailyPrompts: [
        { type: 'text', prompt: 'What is one thing you wish you did better today?' },
        { type: 'text', prompt: 'What is one thing you are proud of today?' },
        { type: 'text', prompt: 'What are you looking forward to tomorrow?' },
      ],
      dismissedInfo: [],
    };

    setUserSettings(Object.assign({}, defaultSettings, getUserSettings()));
  });

new App({
  target: document.body,
});
