import { UserSettings } from "../storage/userSettings";

export type Message = DebugMessage |
  TestNotificationMessage |
  UserSettingsMessage;

export interface DebugMessage {
  subject: 'debug';
  content: string;
}

export interface TestNotificationMessage {
  subject: 'test-notification';
}

export interface UserSettingsMessage {
  subject: 'user-settings';
  settings: UserSettings;
}

