import { changePassword as changePasswordRequest } from "@/features/auth/api/auth-api";
import type { AuthUser } from "@/features/auth/types";

import type { ApiResponse } from "@/types/api-types";
import { apiClient } from "@/lib/api-client";

import type {
  AddPinFirstTimePayload,
  ChangePasswordResponseData,
  ChangePinPayload,
  UpdateProfilePayload,
} from "../types";

export const updateProfile = async (payload: UpdateProfilePayload): Promise<ApiResponse<AuthUser>> => {
  const { data } = await apiClient.patch<ApiResponse<AuthUser>>("/profile", payload);

  return data;
};

export const deleteAccount = async (): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.delete<ApiResponse<null>>("/profile");

  return data;
};

export const changePassword = (payload: {
  email: string;
  currentPassword: string;
  newPassword: string;
}): Promise<ApiResponse<ChangePasswordResponseData>> =>
  changePasswordRequest({
    email: payload.email,
    prePassword: payload.currentPassword,
    password: payload.newPassword,
  });

export const addPinFirstTime = async (
  payload: AddPinFirstTimePayload
): Promise<ApiResponse<{ pin: string }>> => {
  const { data } = await apiClient.post<ApiResponse<{ pin: string }>>("/auth/add-pin-first-time", payload);

  return data;
};

export const changePin = async (payload: ChangePinPayload): Promise<ApiResponse<{ success: boolean }>> => {
  const { data } = await apiClient.post<ApiResponse<{ success: boolean }>>("/auth/change-pin", payload);

  return data;
};

export const sendPinForgotToken = async (): Promise<ApiResponse<{ otp: string }>> => {
  const { data } = await apiClient.post<ApiResponse<{ otp: string }>>("/auth/send-pin-forgot-token");

  return data;
};
