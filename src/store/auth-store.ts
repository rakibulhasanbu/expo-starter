import { create } from "zustand";

import type { AuthUser } from "@/features/auth/types";
import {
  deleteAccessToken,
  deleteRefreshToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/lib/secure-storage";
import { getCachedUser, removeCachedUser, setCachedUser } from "@/lib/user-storage";

export const AuthStatus = {
  Idle: "idle",
  Authenticated: "authenticated",
  Unauthenticated: "unauthenticated",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional value+type companion pattern
export type AuthStatus = (typeof AuthStatus)[keyof typeof AuthStatus];

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

type AuthState = {
  status: AuthStatus;
  accessToken: string | null;
  refreshToken: string | null;
  // Short-lived, in-memory-only token for an unverified sign-up session — lets
  // verify-signup-token/resend calls authenticate without flipping `status` to
  // Authenticated (that stays reserved for a fully verified, signed-in session).
  pendingAccessToken: string | null;
  // Persisted mirror of the current user, so screens have data to render
  // immediately on cold start instead of waiting on a /profile refetch.
  user: AuthUser | null;
  hydrate: () => Promise<void>;
  setSession: (tokens: AuthTokens) => Promise<void>;
  setUser: (user: AuthUser) => Promise<void>;
  setPendingAccessToken: (accessToken: string) => void;
  clearPendingAccessToken: () => void;
  signOut: () => Promise<void>;
};

const parseCachedUser = (raw: string | null): AuthUser | null => {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  status: AuthStatus.Idle,
  accessToken: null,
  refreshToken: null,
  pendingAccessToken: null,
  user: null,

  hydrate: async () => {
    const [accessToken, refreshToken, cachedUser] = await Promise.all([
      getAccessToken(),
      getRefreshToken(),
      getCachedUser(),
    ]);
    const user = parseCachedUser(cachedUser);

    if (accessToken && refreshToken) {
      set({ accessToken, refreshToken, user, status: AuthStatus.Authenticated });
    } else {
      set({ accessToken: null, refreshToken: null, user: null, status: AuthStatus.Unauthenticated });
    }
  },

  setSession: async ({ accessToken, refreshToken }) => {
    await Promise.all([setAccessToken(accessToken), setRefreshToken(refreshToken)]);
    set({ accessToken, refreshToken, status: AuthStatus.Authenticated });
  },

  setUser: async (user) => {
    await setCachedUser(JSON.stringify(user));
    set({ user });
  },

  setPendingAccessToken: (accessToken) => set({ pendingAccessToken: accessToken }),

  clearPendingAccessToken: () => set({ pendingAccessToken: null }),

  signOut: async () => {
    await Promise.all([deleteAccessToken(), deleteRefreshToken(), removeCachedUser()]);
    set({ accessToken: null, refreshToken: null, user: null, status: AuthStatus.Unauthenticated });
  },
}));
