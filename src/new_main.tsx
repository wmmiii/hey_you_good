import "./browserHistory";
import {App} from "./App";
import { initStorage } from './storage/localDb';
import { getUserSettings, setUserSettings, UserSettings } from "./storage/userSettings";
import { getSWRegistration } from "./serviceWorker/clientSide";
import { initTheme } from "./theme";
import * as ReactDOM from 'react-dom';

initStorage();
initTheme();

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
      recordData: true,
    };

    setUserSettings(Object.assign({}, defaultSettings, getUserSettings()));
  });

console.log('FOO');

ReactDOM.render(App(), document.getElementById("app"));
