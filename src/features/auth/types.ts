export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

/**
 * Role ids are lowercase slugs, not a closed union: roles are rows in the
 * backend's `roles` table and new ones can be created at runtime. These three
 * are the seeded system roles (`SYSTEM_ROLE_IDS` on the backend).
 */
export const ROLE_IDS = {
  USER: "user",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
} as const;

export type RoleId = (typeof ROLE_IDS)[keyof typeof ROLE_IDS];

export const hasRole = (roleIds: string[] | undefined, roleId: string) => !!roleIds?.includes(roleId);

export type UserStatus = "PENDING_VERIFICATION" | "ACTIVE" | "SUSPENDED";
export type UserGender = "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";

/**
 * Optional personal details. The backend stores these in a separate
 * `user_profiles` table and nests them under `profile` — both in responses and
 * in the `PATCH /users/me` request body.
 */
export type UserProfile = {
  /** Calendar date (YYYY-MM-DD) — stored as a DATE, never a timestamp. */
  dateOfBirth: string | null;
  gender: UserGender | null;
  bio: string | null;
};

export type AuthUser = {
  id: string;
  email: string;
  username: string;
  name: string | null;
  phone: string | null;
  avatarUrl: string | null;
  roleIds: string[];
  profile: UserProfile | null;
  status: UserStatus;
  emailVerifiedAt: string | null;
  twoFactorEnabled: boolean;
  /** False for Google- or passkey-only accounts: offer set-password, not change-password. */
  hasPassword: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SignUpPayload = {
  name?: string;
  email: string;
  phone?: string;
  password: string;
};

export type SignUpResponseData = {
  user: AuthUser;
};

export type SignInPayload = {
  email: string;
  password: string;
  deviceType?: string;
  deviceName?: string;
};

export type TwoFactorRequiredResponseData = {
  twoFactorRequired: true;
  twoFactorToken: string;
};

export type SignInResponseData = AuthTokens | TwoFactorRequiredResponseData;

export type TwoFactorLoginVerifyPayload = {
  twoFactorToken: string;
  code?: string;
  recoveryCode?: string;
  deviceType?: string;
  deviceName?: string;
};

export type TwoFactorSetupResponseData = {
  otpauthUrl: string;
  qrCodeDataUrl: string;
};

export type TwoFactorEnableResponseData = {
  recoveryCodes: string[];
};

export type TwoFactorDisablePayload = {
  password: string;
  code: string;
};

export type RefreshTokenPayload = {
  refreshToken: string;
  deviceType?: string;
  deviceName?: string;
};

export type RefreshTokenResponseData = AuthTokens;

export type VerifyEmailPayload = {
  email: string;
  code: string;
};

export type VerifyEmailResponseData = AuthTokens;

export type ResendVerificationPayload = {
  email: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  email: string;
  code: string;
  password: string;
};

export type ResetPasswordResponseData = AuthTokens;

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

/** For accounts that have no password yet — change-password rejects those. */
export type SetPasswordPayload = {
  newPassword: string;
};

export type GoogleLoginPayload = {
  idToken: string;
};

export type ReactivateAccountPayload = {
  email: string;
  code: string;
};

export type CurrentUserResponseData = {
  user: AuthUser;
};

// Passthrough JSON shapes — validated deeply by @simplewebauthn/server on the
// backend and by react-native-passkeys on the client, so no need to model
// their internals here.
export type PasskeyRegistrationOptions = Record<string, unknown>;
export type PasskeyRegistrationCredential = Record<string, unknown>;
export type PasskeyAuthenticationOptions = Record<string, unknown>;
export type PasskeyAuthenticationCredential = Record<string, unknown>;

export type WebauthnCredentialSummary = {
  id: string;
  credentialId: string;
  deviceName: string | null;
  transports: string[];
  createdAt: string;
  lastUsedAt: string | null;
};
