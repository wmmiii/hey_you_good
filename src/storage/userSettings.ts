import { writable } from "svelte/store";
import { sendMessageToServiceWorker } from "../serviceWorker/clientSide";

const userSettingsKey = 'user-settings';

export const userSettingsWatcher = writable(getUserSettings());

/**
 * The time for a check-in notification in the local timezone.
 */
interface CheckInTime {
  /** Hour in 24hr format. */
  h: number;
  /** Minute. */
  m: number;
}

interface TextPrompt {
  type: 'text',
  prompt: string,
}

type Prompt = TextPrompt;

export interface UserSettings {
  checkInTimes: CheckInTime[];
  dailyPrompts: Prompt[];
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
  sendMessageToServiceWorker({
    subject: 'user-settings',
    settings: settings,
  });
}
