import { create } from "zustand";

type NotificationSettingsState = {
  loginEmailNotification: boolean;
  transactionsEmailNotification: boolean;
  transactionsPushNotification: boolean;
  setPreferences: (prefs: Partial<Omit<NotificationSettingsState, "setPreferences">>) => void;
};

export const useNotificationSettingsStore = create<NotificationSettingsState>((set) => ({
  loginEmailNotification: true,
  transactionsEmailNotification: true,
  transactionsPushNotification: true,
  setPreferences: (prefs) => set(prefs),
}));
