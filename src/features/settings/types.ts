import type { UserGender } from "@/features/auth/types";

export type Gender = "male" | "female" | "other" | "prefer_not_to_say";

/** UI-only picker value; mapped to the backend's uppercase `Gender` enum at the API boundary. */
export const GENDER_TO_BACKEND: Record<Gender, UserGender> = {
  male: "MALE",
  female: "FEMALE",
  other: "OTHER",
  prefer_not_to_say: "PREFER_NOT_TO_SAY",
};

export const GENDER_FROM_BACKEND: Record<UserGender, Gender> = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
  PREFER_NOT_TO_SAY: "prefer_not_to_say",
};

/**
 * Matches the backend's `updateMeSchema` (`PATCH /users/me`) — a `strictObject`
 * that 400s on unknown keys. `dateOfBirth` and `gender` belong to the separate
 * `user_profiles` record, so they must be nested under `profile`, not sent flat.
 */
export type UpdateProfilePayload = {
  name?: string;
  username?: string;
  phone?: string;
  avatarUrl?: string;
  profile?: {
    dateOfBirth?: string;
    gender?: UserGender;
    bio?: string;
  };
};

export type ConfirmAccountDeletionPayload = {
  code: string;
};

export type NotificationPreferences = {
  loginEmailNotification: boolean;
  transactionsEmailNotification: boolean;
  transactionsPushNotification: boolean;
};

/** `PATCH /users/me/notifications` is a partial update — omitted channels keep their value. */
export type UpdateNotificationPreferencesPayload = Partial<NotificationPreferences>;

/**
 * An active refresh-token chain — one per signed-in device. The backend only
 * returns chains that are neither revoked nor expired, so everything listed is live.
 */
export type AuthSession = {
  id: string;
  deviceType: string | null;
  deviceName: string | null;
  userAgent: string | null;
  ipAddress: string | null;
  createdAt: string;
  lastUsedAt: string;
  expiresAt: string;
  /**
   * True for the session this device is signed in with, so the list can say
   * which row signing out would end. False on access tokens minted before the
   * backend started stamping a session id.
   */
  isCurrent: boolean;
};
