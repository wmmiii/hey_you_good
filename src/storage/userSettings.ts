import { UserSettingsMessage } from "../messages";

const userSettingsKey = 'user-settings';

/**
 * The time for a check-in notification in the local timezone.
 */
interface CheckInTime {
  /** Hour in 24hr format. */
  h: number;
  /** Minute. */
  m: number;
}

export interface UserSettings {
  checkInTimes: CheckInTime[];
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
  notifyServiceWorker(settings)
}

export async function notifyServiceWorker(settings: UserSettings): Promise<void> {
  const sw = await navigator.serviceWorker.getRegistration();
  sw?.active?.postMessage({
    subject: 'user-settings',
    settings: settings,
  } as UserSettingsMessage);
}
