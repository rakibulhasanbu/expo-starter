import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/store/auth-store";

import { seedCurrentUserCache } from "../lib/sync-current-user";
import {
  changePassword,
  resendSignupEmail,
  sendForgotPasswordEmail,
  signIn,
  signUp,
  verifyForgotToken,
  verifySignupToken,
} from "../api/auth-api";

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: async (response) => {
      const { accessToken, refreshToken, user, isPinExist } = response.data;
      await useAuthStore.getState().setSession({ accessToken, refreshToken });
      seedCurrentUserCache({ ...response, data: { accessToken, user, isPinExist } });
    },
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: signUp,
  });
};

export const useSendForgotPasswordEmailMutation = () => {
  return useMutation({
    mutationFn: sendForgotPasswordEmail,
  });
};

export const useVerifyForgotTokenMutation = () => {
  return useMutation({
    mutationFn: verifyForgotToken,
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

export const useVerifySignupTokenMutation = () => {
  return useMutation({
    mutationFn: verifySignupToken,
  });
};

export const useResendSignupEmailMutation = () => {
  return useMutation({
    mutationFn: resendSignupEmail,
  });
};
