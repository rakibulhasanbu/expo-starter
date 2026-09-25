import {
  changePassword as changePasswordRequest,
  setPassword as setPasswordRequest,
} from "@/features/auth/api/auth-api";
import type { AuthUser, ChangePasswordPayload, SetPasswordPayload } from "@/features/auth/types";

import type { ApiResponse } from "@/types/api-types";
import { apiClient } from "@/lib/api-client";

import type {
  ConfirmAccountDeletionPayload,
  NotificationPreferences,
  UpdateNotificationPreferencesPayload,
  UpdateProfilePayload,
} from "../types";

export const updateProfile = async (payload: UpdateProfilePayload): Promise<ApiResponse<AuthUser>> => {
  const { data } = await apiClient.patch<ApiResponse<AuthUser>>("/users/me", payload);

  return data;
};

// Users who never saved preferences get the backend defaults (everything on).
export const fetchNotificationPreferences = async (): Promise<ApiResponse<NotificationPreferences>> => {
  const { data } = await apiClient.get<ApiResponse<NotificationPreferences>>("/users/me/notifications");

  return data;
};

export const updateNotificationPreferences = async (
  payload: UpdateNotificationPreferencesPayload
): Promise<ApiResponse<NotificationPreferences>> => {
  const { data } = await apiClient.patch<ApiResponse<NotificationPreferences>>(
    "/users/me/notifications",
    payload
  );

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

export const setPassword = (payload: SetPasswordPayload): Promise<ApiResponse<null>> =>
  setPasswordRequest(payload);
