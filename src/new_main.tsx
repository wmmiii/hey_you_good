import React from 'react'
import './browserHistory';
import { App } from './App';
import { createRoot } from 'react-dom/client';
import { getSWRegistration } from './serviceWorker/clientSide';
import { getUserSettings, setUserSettings, UserSettings } from './storage/userSettings';
import { initStorage } from './storage/localDb';
import { initTheme } from './theme';

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

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
