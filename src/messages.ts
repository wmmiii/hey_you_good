import { UserSettings } from "./storage/userSettings";

export type Message = DebugMessage |
  UserSettingsMessage;

export interface DebugMessage {
  subject: 'debug';
  content: string;
}

export interface UserSettingsMessage {
  subject: 'user-settings';
  settings: UserSettings;
}
