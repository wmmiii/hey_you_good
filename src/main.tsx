import React from 'react'
import { App } from './App';
import { createRoot } from 'react-dom/client';
import { getSWRegistration } from './serviceWorker/clientSide';
import { getUserSettings, setUserSettings, UserSettings } from './storage/userSettings';
import { initStorage } from './storage/localDb';

initStorage();

// Initialize the service worker.
getSWRegistration()
  .then(() => {
    const defaultSettings: UserSettings = {
      dismissedInfo: [],
    };

    setUserSettings(Object.assign({}, defaultSettings, getUserSettings()));
  });

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
