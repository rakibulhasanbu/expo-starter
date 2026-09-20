import type { ChangePasswordResponseData } from "@/features/auth/types";

export type Gender = "male" | "female" | "other";

export type UpdateProfilePayload = {
  name: string;
  email: string;
  birthDate: string | null;
  gender: Gender | null;
  profileImg: string | null;
};

export type TransactionLimit = {
  id: string;
  label: string;
  currencySymbol: string;
  maxDailyLimit: number;
  remaining: number;
  progressColorClassName: string;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type { ChangePasswordResponseData };

export type ChangePinPayload = {
  pin: string;
  prePin?: string;
  otp?: number;
};

export type AddPinFirstTimePayload = {
  pin: string;
};

export type NotificationPreferences = {
  loginEmailNotification: boolean;
  transactionsEmailNotification: boolean;
  transactionsPushNotification: boolean;
};

export type UpdateNotificationPreferencesPayload = NotificationPreferences;
