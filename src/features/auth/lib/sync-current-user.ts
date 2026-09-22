import type { ApiResponse } from "@/types/api-types";
import { queryClient } from "@/lib/query-client";
import { useAuthStore } from "@/store/auth-store";

import { authKeys } from "../hooks/use-auth-queries";
import type { AuthUser } from "../types";

type CurrentUserCache = ApiResponse<AuthUser>;

// Seeds the cache outright so useCurrentUserQuery has data with no extra
// /users/me call, and mirrors the user into the persisted store.
export const seedCurrentUserCache = (user: AuthUser) => {
  useAuthStore.getState().setUser(user);
  queryClient.setQueryData<CurrentUserCache>(authKeys.me(), { data: user });
};

// Patches the existing cache entry in place and mirrors into the persisted
// store (e.g. after update-profile, which only returns the updated user).
export const syncCurrentUser = (user: AuthUser) => {
  useAuthStore.getState().setUser(user);
  queryClient.setQueryData<CurrentUserCache>(authKeys.me(), { data: user });
};
