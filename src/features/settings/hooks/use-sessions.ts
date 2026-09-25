import { AuthStatus, useAuthStore } from "@/store/auth-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryClient } from "@/lib/query-client";

import { fetchSessions, revokeAllSessions, revokeSession } from "../api/sessions-api";

export const sessionsKeys = {
  all: ["sessions"] as const,
};

export const useSessionsQuery = () => {
  const status = useAuthStore((state) => state.status);

  return useQuery({
    queryKey: sessionsKeys.all,
    queryFn: fetchSessions,
    select: (data) => data.data,
    enabled: status === AuthStatus.Authenticated,
  });
};

export const useRevokeSessionMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => revokeSession(sessionId),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: sessionsKeys.all });
    },
  });
};

// This revokes *every* chain, this device's included, so there is no session
// left to keep alive locally either.
export const useRevokeAllSessionsMutation = () => {
  return useMutation({
    mutationFn: revokeAllSessions,
    onSuccess: async () => {
      await useAuthStore.getState().signOut();
      queryClient.clear();
    },
  });
};
