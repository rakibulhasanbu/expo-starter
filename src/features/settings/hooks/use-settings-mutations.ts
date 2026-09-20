import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { AuthUser } from "@/features/auth/types";
import { authKeys } from "@/features/auth/hooks/use-auth-queries";
import { seedCurrentUserCache, syncCurrentUser } from "@/features/auth/lib/sync-current-user";
import { useAuthStore } from "@/store/auth-store";
import { useNotificationSettingsStore } from "@/store/notification-settings-store";

import type {
  AddPinFirstTimePayload,
  ChangePasswordPayload,
  ChangePinPayload,
  UpdateNotificationPreferencesPayload,
} from "../types";
import {
  addPinFirstTime,
  changePassword,
  changePin,
  deleteAccount,
  sendPinForgotToken,
  updateProfile,
} from "../api/settings-api";

export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (response) => {
      syncCurrentUser(response.data);
    },
  });
};

export const useDeleteAccountMutation = () => {
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: async () => {
      await useAuthStore.getState().signOut();
    },
  });
};

export const useChangePasswordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ChangePasswordPayload) => {
      const user = queryClient.getQueryData<{ data: { user: AuthUser } }>(authKeys.me())?.data.user;
      if (!user?.email) {
        throw new Error("Unable to determine current user's email");
      }

      return changePassword({
        email: user.email,
        currentPassword: payload.currentPassword,
        newPassword: payload.newPassword,
      });
    },
    onSuccess: (response) => {
      const { refreshToken } = useAuthStore.getState();
      if (refreshToken) {
        useAuthStore.getState().setSession({ accessToken: response.data.accessToken, refreshToken });
      }
      seedCurrentUserCache({
        ...response,
        data: {
          accessToken: response.data.accessToken,
          user: response.data.user,
          isPinExist: response.data.isPinExist,
        },
      });
    },
  });
};

export const useChangePinMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ChangePinPayload) => changePin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};

export const useAddPinFirstTimeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddPinFirstTimePayload) => addPinFirstTime(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};

export const useSendPinForgotTokenMutation = () => {
  return useMutation({
    mutationFn: sendPinForgotToken,
  });
};

// No notification-preferences endpoint exists yet — simulated latency until
// a real API call is available.
export const useUpdateNotificationPreferencesMutation = () => {
  return useMutation({
    mutationFn: async (payload: UpdateNotificationPreferencesPayload) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return payload;
    },
    onSuccess: (payload) => {
      useNotificationSettingsStore.getState().setPreferences(payload);
    },
  });
};
