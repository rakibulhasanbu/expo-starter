import type { ApiResponse } from "@/types/api-types";
import { queryClient } from "@/lib/query-client";
import { useAuthStore } from "@/store/auth-store";

import { authKeys } from "../hooks/use-auth-queries";
import type { AuthUser, CurrentUserResponseData } from "../types";

type CurrentUserCache = ApiResponse<CurrentUserResponseData>;

// Full response available (login, change-password): seed the cache outright
// so useCurrentUserQuery/useIsPinExistQuery have data with no extra
// /profile call, and mirror the user into the persisted store.
export const seedCurrentUserCache = (response: CurrentUserCache) => {
  useAuthStore.getState().setUser(response.data.user);
  queryClient.setQueryData<CurrentUserCache>(authKeys.me(), response);
};

// Only AuthUser available (update-profile): patch the existing cache entry
// in place and mirror into the persisted store.
export const syncCurrentUser = (user: AuthUser) => {
  useAuthStore.getState().setUser(user);
  queryClient.setQueryData<CurrentUserCache>(authKeys.me(), (current) =>
    current ? { ...current, data: { ...current.data, user } } : current
  );
};
