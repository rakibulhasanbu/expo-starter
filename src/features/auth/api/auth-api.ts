import type { ApiResponse } from "@/types/api-types";
import { apiClient } from "@/lib/api-client";

import type {
  ChangePasswordPayload,
  CurrentUserResponseData,
  ForgotPasswordPayload,
  ResendVerificationPayload,
  ResetPasswordPayload,
  ResetPasswordResponseData,
  SignInPayload,
  SignInResponseData,
  SignUpPayload,
  SignUpResponseData,
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

export const fetchCurrentUser = async (): Promise<ApiResponse<CurrentUserResponseData["user"]>> => {
  const { data } = await apiClient.get<ApiResponse<CurrentUserResponseData["user"]>>("/users/me");

  return data;
};
