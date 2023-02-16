import { UserSettings } from "../storage/userSettings";

export type Message = DebugMessage |
  NextNotificationRequest |
  NextNotificationResponse |
  TestNotificationMessage |
  UserSettingsMessage;

export interface DebugMessage {
  subject: 'debug';
  content: string;
}

export interface NextNotificationRequest {
  subject: 'next-notification-request';
}

export interface NextNotificationResponse {
  subject: 'next-notification-response';
  timestamp: number | null;
}

export interface TestNotificationMessage {
  subject: 'test-notification';
}

export interface UserSettingsMessage {
  subject: 'user-settings';
  settings: UserSettings;
}

