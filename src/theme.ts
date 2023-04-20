import { UserSettings, userSettingsWatcher } from "./storage/userSettings";

export function initTheme() {
  userSettingsWatcher.subscribe((userSettings) => {
    if (prefersDarkMode(userSettings)) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  });
}

export function prefersDarkMode(userSettings: UserSettings | null): boolean {
  return userSettings?.preferDarkMode != null ?
    userSettings.preferDarkMode :
    (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);
}
