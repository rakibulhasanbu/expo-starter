import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/lib/query-client";

import type { TwoFactorDisablePayload } from "../types";
import {
  disable2fa,
  enable2fa,
  fetchCurrentUser,
  forgotPassword,
  login2faVerify,
  logout,
  resendVerification,
  resetPassword,
  setup2fa,
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
      // signIn can return either a token pair or a twoFactorRequired
      // challenge — only establish a session in the former case, the
      // sign-in screen branches on this and handles the 2FA case itself.
      if ("twoFactorRequired" in response.data) return;
      await establishSession(response.data);
    },
  });
};

// Completes the sign-in started by useSignInMutation when the account has
// 2FA enabled — carries the short-lived twoFactorToken plus either a TOTP
// code or a recovery code, then establishes the session same as sign-in.
export const use2faLoginVerifyMutation = () => {
  return useMutation({
    mutationFn: login2faVerify,
    onSuccess: async (response) => {
      await establishSession(response.data);
    },
  });
};

// Step 1 of enabling 2FA: fetches a fresh TOTP secret (QR + otpauth URL) to
// scan into an authenticator app.
export const use2faSetupMutation = () => {
  return useMutation({
    mutationFn: setup2fa,
  });
};

// Step 2: confirms the user actually set the secret up correctly by
// submitting a live code; returns one-time recovery codes on success.
export const use2faEnableMutation = () => {
  return useMutation({
    mutationFn: enable2fa,
  });
};

export const use2faDisableMutation = () => {
  return useMutation({
    mutationFn: (payload: TwoFactorDisablePayload) => disable2fa(payload),
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
