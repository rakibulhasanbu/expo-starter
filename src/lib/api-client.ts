import { env } from "@/config";
import { useAuthStore } from "@/store/auth-store";
import { isAccessTokenError } from "@/utils/is-auth-error";
import { logApiError } from "@/utils/log-api-error";
import { create, type AxiosError, type InternalAxiosRequestConfig } from "axios";

import type { ApiResponse } from "@/types/api-types";
import { queryClient } from "@/lib/query-client";

export const apiClient = create({
  baseURL: `${env.apiBaseUrl}/api/v1`,
});

// Separate instance with no interceptors attached, used only for the refresh
// call itself so a failed/expired refresh can never re-enter apiClient's own
// 401 handling below and loop.
const refreshClient = create({
  baseURL: apiClient.defaults.baseURL,
});

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

type RefreshTokensData = {
  accessToken: string;
  refreshToken: string;
};

// Signing out without clearing the cache leaves the previous user's data sitting
// in TanStack Query, ready to flash on screen at the next sign-in.
const endSession = async () => {
  await useAuthStore.getState().signOut();
  queryClient.clear();
};

// De-dupes concurrent 401s behind a single in-flight refresh call.
let refreshPromise: Promise<string> | null = null;

// The backend rotates the refresh token on every use — the old one is revoked
// server-side, so the new pair must fully replace it in the store.
const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const { data } = await refreshClient.post<ApiResponse<RefreshTokensData>>("/auth/refresh", {
    refreshToken,
  });

  await useAuthStore.getState().setSession({
    accessToken: data.data.accessToken,
    refreshToken: data.data.refreshToken,
  });

  return data.data.accessToken;
};

apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    logApiError(error);

    const originalRequest = error.config as RetryableConfig | undefined;
    const isAuthEndpoint = originalRequest?.url?.includes("/auth/");

    if (!isAccessTokenError(error) || !originalRequest || originalRequest._retry || isAuthEndpoint) {
      return Promise.reject(error);
    }

    const { refreshToken } = useAuthStore.getState();

    if (!refreshToken) {
      await endSession();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise ??= refreshAccessToken(refreshToken).finally(() => {
        refreshPromise = null;
      });
      const newAccessToken = await refreshPromise;

      originalRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);
      return apiClient(originalRequest);
    } catch (refreshError) {
      // The refresh token itself is expired/invalid (the backend answers 403
      // "Invalid Refresh Token"). Nothing left to recover with — end the session.
      logApiError(refreshError);
      await endSession();
      return Promise.reject(refreshError);
    }
  }
);
