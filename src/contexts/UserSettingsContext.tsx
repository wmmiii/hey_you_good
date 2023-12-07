import React from 'react';
import { createContext } from 'react';
import { UserSettings, getUserSettings, setUserSettings as saveUserSettings, setUserSettings } from '../storage/userSettings';
import { PropsWithChildren } from 'react';
import { useState } from 'react';

export const UserSettingsContext = createContext({
  userSettings: null as UserSettings | null,
  setUserSettings: (_: UserSettings) => { },
});

export function UserSettingsProvider({ children }: PropsWithChildren): JSX.Element {
  const [userSettings, setUserSettings] = useState(getUserSettings());
  return (
    <UserSettingsContext.Provider value={{
      userSettings: userSettings,
      setUserSettings: async (newSettings: UserSettings) => {
        await saveUserSettings(newSettings);
        setUserSettings({...newSettings});
      },
    }}>
      {children}
    </UserSettingsContext.Provider>
  )
}
