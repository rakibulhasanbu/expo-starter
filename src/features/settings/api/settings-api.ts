import { changePassword as changePasswordRequest } from "@/features/auth/api/auth-api";
import type { AuthUser, ChangePasswordPayload } from "@/features/auth/types";

import type { ApiResponse } from "@/types/api-types";
import { apiClient } from "@/lib/api-client";

import type {
  AddPinFirstTimePayload,
  ChangePinPayload,
  ConfirmAccountDeletionPayload,
  UpdateProfilePayload,
} from "../types";

export const updateProfile = async (payload: UpdateProfilePayload): Promise<ApiResponse<AuthUser>> => {
  const { data } = await apiClient.patch<ApiResponse<AuthUser>>("/users/me", payload);

  return data;
};

// Deleting is a two-step OTP flow (matches forgot-password): request a code
// emailed to the user, then confirm with that code to actually soft-delete.
export const requestAccountDeletion = async (): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.post<ApiResponse<null>>("/auth/request-account-deletion");

  return data;
};

export const confirmAccountDeletion = async (
  payload: ConfirmAccountDeletionPayload
): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.post<ApiResponse<null>>("/auth/delete-account", payload);

  return data;
};

export const changePassword = (payload: ChangePasswordPayload): Promise<ApiResponse<null>> =>
  changePasswordRequest(payload);

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
