import type { ApiResponse } from "@/types/api-types";
import { apiClient } from "@/lib/api-client";

import type { AuthSession } from "../types";

export const fetchSessions = async (): Promise<ApiResponse<AuthSession[]>> => {
  const { data } = await apiClient.get<ApiResponse<AuthSession[]>>("/auth/sessions");

  return data;
};

export const revokeSession = async (sessionId: string): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.delete<ApiResponse<null>>(`/auth/sessions/${sessionId}`);

  return data;
};

// Revokes every refresh token for the account, including the one this device is
// holding — the caller has to sign out locally afterwards.
export const revokeAllSessions = async (): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.delete<ApiResponse<null>>("/auth/sessions");

  return data;
};
