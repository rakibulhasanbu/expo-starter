import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/lib/query-client";

import {
  fetchCurrentUser,
  forgotPassword,
  logout,
  resendVerification,
  resetPassword,
  signIn,
  signUp,
  verifyEmail,
} from "../api/auth-api";
import { seedCurrentUserCache } from "../lib/sync-current-user";

// Shared by every flow that ends in an auto-login (sign-in, verify-email,
// reset-password): stores the token pair, then fetches /users/me to seed the
// cache since none of these endpoints return the user object inline.
export const establishSession = async (tokens: { accessToken: string; refreshToken: string }) => {
  await useAuthStore.getState().setSession(tokens);
  const { data: user } = await fetchCurrentUser();
  seedCurrentUserCache(user);
};

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: async (response) => {
      await establishSession(response.data);
    },
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: signUp,
  });
};

// Verifying proves control of the mailbox, so the backend signs the user in —
// this mutation carries that straight through into an authenticated session.
export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: async (response) => {
      await establishSession(response.data);
    },
  });
};

export const useResendVerificationMutation = () => {
  return useMutation({
    mutationFn: resendVerification,
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

// Consuming the reset code also proves account ownership, so — like
// verify-email — the backend signs the user in on success.
export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: async (response) => {
      await establishSession(response.data);
    },
  });
};

export const useSignOutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const { refreshToken } = useAuthStore.getState();
      if (refreshToken) {
        // Best-effort: the local session must clear even if this fails
        // (backend unreachable, token already expired, etc).
        await logout(refreshToken).catch(() => undefined);
      }
    },
    onSettled: async () => {
      await useAuthStore.getState().signOut();
      queryClient.clear();
    },
  });
};
