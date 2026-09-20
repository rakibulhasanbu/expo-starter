import type { ApiResponse } from "@/types/api-types";
import { apiClient } from "@/lib/api-client";

import type {
  ChangePasswordPayload,
  ChangePasswordResponseData,
  CurrentUserResponseData,
  SignInPayload,
  SignInResponseData,
  SignUpPayload,
  SignUpResponseData,
  VerifyForgotTokenPayload,
  VerifyForgotTokenResponseData,
  VerifySignupTokenPayload,
  VerifySignupTokenResponseData,
} from "../types";

export const signIn = async (payload: SignInPayload): Promise<ApiResponse<SignInResponseData>> => {
  const { data } = await apiClient.post<ApiResponse<SignInResponseData>>("/auth/signin", payload);

  return data;
};

export const signUp = async (payload: SignUpPayload): Promise<ApiResponse<SignUpResponseData>> => {
  const { data } = await apiClient.post<ApiResponse<SignUpResponseData>>("/auth/signup", payload);

  return data;
};

export const fetchCurrentUser = async (): Promise<ApiResponse<CurrentUserResponseData>> => {
  const { data } = await apiClient.get<ApiResponse<CurrentUserResponseData>>("/profile");

  return data;
};

export const sendForgotPasswordEmail = async (email: string): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.post<ApiResponse<null>>(`/auth/send-forgot-email/${encodeURIComponent(email)}`);

  return data;
};

export const verifyForgotToken = async (
  payload: VerifyForgotTokenPayload
): Promise<ApiResponse<VerifyForgotTokenResponseData>> => {
  const { data } = await apiClient.post<ApiResponse<VerifyForgotTokenResponseData>>(
    "/auth/verify-forgot-token",
    payload
  );

  return data;
};

export const changePassword = async (
  payload: ChangePasswordPayload
): Promise<ApiResponse<ChangePasswordResponseData>> => {
  const { data } = await apiClient.post<ApiResponse<ChangePasswordResponseData>>("/auth/change-password", payload);

  return data;
};

export const verifySignupToken = async (
  payload: VerifySignupTokenPayload
): Promise<ApiResponse<VerifySignupTokenResponseData>> => {
  const { data } = await apiClient.post<ApiResponse<VerifySignupTokenResponseData>>(
    "/auth/verify-signup-token",
    payload
  );

  return data;
};

export const resendSignupEmail = async (email: string): Promise<ApiResponse<{ otp?: number }>> => {
  const { data } = await apiClient.post<ApiResponse<{ otp?: number }>>(`/auth/resend/${encodeURIComponent(email)}`);

  return data;
};
