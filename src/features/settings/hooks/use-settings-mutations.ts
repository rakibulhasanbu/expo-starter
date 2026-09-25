import { authKeys } from "@/features/auth/hooks/use-auth-queries";
import { syncCurrentUser } from "@/features/auth/lib/sync-current-user";
import type { ChangePasswordPayload, SetPasswordPayload } from "@/features/auth/types";
import { useAuthStore } from "@/store/auth-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryClient } from "@/lib/query-client";

import {
  changePassword,
  confirmAccountDeletion,
  requestAccountDeletion,
  setPassword,
  updateProfile,
} from "../api/settings-api";
import type { ConfirmAccountDeletionPayload } from "../types";

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

// Unlike change-password, the backend keeps existing sessions alive here — this
// adds a login method rather than rotating a credential. So no sign-out; just
// refresh /users/me so `hasPassword` flips and the screen switches modes.
export const useSetPasswordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SetPasswordPayload) => setPassword(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};
