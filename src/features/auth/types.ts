export type SignInPayload = {
  email: string;
  password: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: "user" | "admin" | "superAdmin";
  shouldSendEmail: boolean;
  failedLoginAttempt: number | null;
  profileImg: string | null;
  isVerified: boolean;
  isBlocked: boolean | null;
  birthDate: string | null;
  deviceToken: string | null;
  isKycVerified: boolean | null;
  bushaBusinessId: string | null;
  bushaCustomerId: string | null;
  koraCardReferenceId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SignInResponseData = AuthTokens & {
  user: AuthUser;
  isPinExist: boolean;
};

export type VerifyForgotTokenPayload = {
  email: string;
  token: number;
};

export type VerifyForgotTokenResponseData = {
  token: number;
  isValidate: boolean;
};

export type ChangePasswordPayload = {
  email: string;
  password: string;
  otp?: number;
  prePassword?: string;
};

export type ChangePasswordResponseData = AuthTokens & {
  user: AuthUser;
  isPinExist: boolean;
};

export type SignUpPayload = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type SignUpResponseData = AuthTokens & {
  user: AuthUser;
  isPinExist: boolean;
};

export type VerifySignupTokenPayload = {
  token: number;
};

export type VerifySignupTokenResponseData = {
  accessToken: string;
  user: AuthUser;
  isPinExist: boolean;
};

export type CurrentUserResponseData = {
  accessToken: string;
  user: AuthUser;
  isPinExist: boolean;
};
