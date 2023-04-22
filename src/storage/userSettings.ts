import { writable } from "svelte/store";

const userSettingsKey = 'user-settings';

export const userSettingsWatcher = writable(getUserSettings());

interface TextPrompt {
  type: 'text',
  prompt: string,
}

type Prompt = TextPrompt;

export interface UserSettings {
  dailyPrompts: Prompt[];
  dismissedInfo: string[];
  preferDarkMode?: boolean;
  recordData: boolean;
}

export function getUserSettings(): UserSettings | null {
  const settingsString = localStorage.getItem(userSettingsKey);
  if (settingsString == null) {
    return null;
  }
  return JSON.parse(settingsString);
}

export async function setUserSettings(settings: UserSettings): Promise<void> {
  localStorage.setItem(userSettingsKey, JSON.stringify(settings));
  userSettingsWatcher.set(settings);
}
