import { AuthStatus, useAuthStore } from "@/store/auth-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchNotificationPreferences, updateNotificationPreferences } from "../api/settings-api";
import type { UpdateNotificationPreferencesPayload } from "../types";

export const notificationPreferencesKeys = {
  all: ["notification-preferences"] as const,
};

export const useNotificationPreferencesQuery = () => {
  const status = useAuthStore((state) => state.status);

  return useQuery({
    queryKey: notificationPreferencesKeys.all,
    queryFn: fetchNotificationPreferences,
    select: (data) => data.data,
    enabled: status === AuthStatus.Authenticated,
  });
};

// The PATCH answers with the full saved preferences, so the cache is replaced
// outright instead of refetched.
export const useUpdateNotificationPreferencesMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateNotificationPreferencesPayload) => updateNotificationPreferences(payload),
    onSuccess: (response) => {
      client.setQueryData(notificationPreferencesKeys.all, response);
    },
  });
};
