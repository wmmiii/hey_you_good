const USER_SETTINGS_KEY = 'user-settings';

interface TextPrompt {
  type: 'text',
  prompt: string,
}

type Prompt = TextPrompt;

export interface UserSettings {
  dismissedInfo?: string[];
  preferDarkMode?: boolean;
}

export function getUserSettings(): UserSettings | null {
  const settingsString = localStorage.getItem(USER_SETTINGS_KEY);
  if (settingsString == null) {
    return null;
  }
  return JSON.parse(settingsString);
}

export async function setUserSettings(settings: UserSettings): Promise<void> {
  localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(settings));
}
