import type { ApiResponse } from "@/types/api-types";
import { apiClient } from "@/lib/api-client";

import type {
  AuthTokens,
  ChangePasswordPayload,
  CurrentUserResponseData,
  ForgotPasswordPayload,
  GoogleLoginPayload,
  ReactivateAccountPayload,
  ResendVerificationPayload,
  ResetPasswordPayload,
  ResetPasswordResponseData,
  SetPasswordPayload,
  SignInPayload,
  SignInResponseData,
  SignUpPayload,
  SignUpResponseData,
  TwoFactorDisablePayload,
  TwoFactorEnableResponseData,
  TwoFactorLoginVerifyPayload,
  TwoFactorSetupResponseData,
  VerifyEmailPayload,
  VerifyEmailResponseData,
} from "../types";

export const signUp = async (payload: SignUpPayload): Promise<ApiResponse<SignUpResponseData>> => {
  const { data } = await apiClient.post<ApiResponse<SignUpResponseData>>("/auth/signup", payload);

  return data;
};

export const signIn = async (payload: SignInPayload): Promise<ApiResponse<SignInResponseData>> => {
  const { data } = await apiClient.post<ApiResponse<SignInResponseData>>("/auth/signin", payload);

  return data;
};

export const logout = async (refreshToken: string): Promise<void> => {
  await apiClient.post("/auth/logout", { refreshToken });
};

export const verifyEmail = async (
  payload: VerifyEmailPayload
): Promise<ApiResponse<VerifyEmailResponseData>> => {
  const { data } = await apiClient.post<ApiResponse<VerifyEmailResponseData>>("/auth/verify-email", payload);

  return data;
};

export const resendVerification = async (payload: ResendVerificationPayload): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.post<ApiResponse<null>>("/auth/resend-verification", payload);

  return data;
};

export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.post<ApiResponse<null>>("/auth/forgot-password", payload);

  return data;
};

export const resetPassword = async (
  payload: ResetPasswordPayload
): Promise<ApiResponse<ResetPasswordResponseData>> => {
  const { data } = await apiClient.post<ApiResponse<ResetPasswordResponseData>>("/auth/reset-password", payload);

  return data;
};

export const changePassword = async (payload: ChangePasswordPayload): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.post<ApiResponse<null>>("/auth/change-password", payload);

  return data;
};

// Adds password login to an account that has none (Google- or passkey-only).
// Unlike change-password this keeps existing sessions alive — it adds a login
// method rather than rotating a credential that may be compromised.
// The backend verifies this id token against its own GOOGLE_CLIENT_ID, then
// either links the Google identity to an existing account or creates one.
export const loginWithGoogle = async (payload: GoogleLoginPayload): Promise<ApiResponse<AuthTokens>> => {
  const { data } = await apiClient.post<ApiResponse<AuthTokens>>("/auth/google", payload);

  return data;
};

export const setPassword = async (payload: SetPasswordPayload): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.post<ApiResponse<null>>("/auth/set-password", payload);

  return data;
};

// Undoes a self-deletion while the account is still in its grace period. The
// code is not requested from here — the backend emails it automatically when
// sign-in, sign-up or Google login hits a deleted account and answers 409
// ACCOUNT_PENDING_DELETION, which is what routes the user to that screen.
export const reactivateAccount = async (payload: ReactivateAccountPayload): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.post<ApiResponse<null>>("/auth/reactivate-account", payload);

  return data;
};

export const fetchCurrentUser = async (): Promise<ApiResponse<CurrentUserResponseData["user"]>> => {
  const { data } = await apiClient.get<ApiResponse<CurrentUserResponseData["user"]>>("/users/me");

  return data;
};

export const login2faVerify = async (
  payload: TwoFactorLoginVerifyPayload
): Promise<ApiResponse<AuthTokens>> => {
  const { data } = await apiClient.post<ApiResponse<AuthTokens>>("/auth/2fa/login-verify", payload);

  return data;
};

export const setup2fa = async (): Promise<ApiResponse<TwoFactorSetupResponseData>> => {
  const { data } = await apiClient.post<ApiResponse<TwoFactorSetupResponseData>>("/auth/2fa/setup");

  return data;
};

export const enable2fa = async (code: string): Promise<ApiResponse<TwoFactorEnableResponseData>> => {
  const { data } = await apiClient.post<ApiResponse<TwoFactorEnableResponseData>>("/auth/2fa/enable", {
    code,
  });

  return data;
};

export const disable2fa = async (payload: TwoFactorDisablePayload): Promise<void> => {
  await apiClient.post("/auth/2fa/disable", payload);
};
