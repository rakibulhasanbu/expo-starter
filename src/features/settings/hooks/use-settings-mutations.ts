import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authKeys } from "@/features/auth/hooks/use-auth-queries";
import { syncCurrentUser } from "@/features/auth/lib/sync-current-user";
import type { ChangePasswordPayload } from "@/features/auth/types";
import { queryClient } from "@/lib/query-client";
import { useAuthStore } from "@/store/auth-store";
import { useNotificationSettingsStore } from "@/store/notification-settings-store";

import type {
  AddPinFirstTimePayload,
  ChangePinPayload,
  ConfirmAccountDeletionPayload,
  UpdateNotificationPreferencesPayload,
} from "../types";
import {
  addPinFirstTime,
  changePassword,
  changePin,
  confirmAccountDeletion,
  requestAccountDeletion,
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

// Step 1 of account deletion: emails a 6-digit confirmation code.
export const useRequestAccountDeletionMutation = () => {
  return useMutation({
    mutationFn: requestAccountDeletion,
  });
};

// Step 2: consuming the code soft-deletes the account and revokes every
// session server-side, so there's nothing left to keep alive locally either.
export const useConfirmAccountDeletionMutation = () => {
  return useMutation({
    mutationFn: (payload: ConfirmAccountDeletionPayload) => confirmAccountDeletion(payload),
    onSuccess: async () => {
      await useAuthStore.getState().signOut();
      queryClient.clear();
    },
  });
};

// The backend revokes every refresh token for the user on a successful
// change-password (auth.service.ts), including the one this session is
// holding — so there's no session left to keep alive here. Sign out and
// send the user back to sign in with their new password.
export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),
    onSuccess: async () => {
      await useAuthStore.getState().signOut();
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
