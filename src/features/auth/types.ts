export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";
export type UserStatus = "PENDING_VERIFICATION" | "ACTIVE" | "SUSPENDED";
export type UserGender = "MALE" | "FEMALE" | "OTHER";

export type AuthUser = {
  id: string;
  email: string;
  username: string;
  name: string | null;
  phone: string | null;
  avatarUrl: string | null;
  dateOfBirth: string | null;
  gender: UserGender | null;
  role: UserRole;
  status: UserStatus;
  emailVerifiedAt: string | null;
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

export type SignInResponseData = AuthTokens;

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

export type CurrentUserResponseData = {
  user: AuthUser;
};
