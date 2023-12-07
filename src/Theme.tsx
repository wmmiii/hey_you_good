import React, { useContext, useEffect } from "react";
import { UserSettings } from "./storage/userSettings";
import { UserSettingsContext } from "./contexts/UserSettingsContext";

export function Theme(): JSX.Element {
  const { userSettings } = useContext(UserSettingsContext);

  useEffect(() => {
    if (prefersDarkMode(userSettings)) {
      document.body.classList.add('dark');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#000000');
    } else {
      document.body.classList.remove('dark');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#FFC961');
    }
  }, [userSettings]);

  return (
    <></>
  );
}

function prefersDarkMode(userSettings: UserSettings | null): boolean {
  return userSettings?.preferDarkMode != null ?
    userSettings.preferDarkMode :
    (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);
}
