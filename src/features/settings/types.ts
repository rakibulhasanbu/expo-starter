export type Gender = "male" | "female" | "other";

/** UI-only picker value; mapped to the backend's uppercase `Gender` enum at the API boundary. */
export const GENDER_TO_BACKEND: Record<Gender, "MALE" | "FEMALE" | "OTHER"> = {
  male: "MALE",
  female: "FEMALE",
  other: "OTHER",
};

export const GENDER_FROM_BACKEND: Record<"MALE" | "FEMALE" | "OTHER", Gender> = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
};

/** Matches the backend's `updateMeSchema` (`PATCH /users/me`) — a `strictObject` that 400s on unknown keys. */
export type UpdateProfilePayload = {
  name?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
};

export type TransactionLimit = {
  id: string;
  label: string;
  currencySymbol: string;
  maxDailyLimit: number;
  remaining: number;
  progressColorClassName: string;
};

export type ConfirmAccountDeletionPayload = {
  code: string;
};

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
