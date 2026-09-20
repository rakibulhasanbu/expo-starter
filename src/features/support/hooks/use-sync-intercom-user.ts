import { useEffect } from "react";

import { AuthStatus, useAuthStore } from "@/store/auth-store";
import { useCurrentUserQuery } from "@/features/auth/hooks/use-auth-queries";

import { identifyIntercomUser, resetIntercomUser } from "../lib/intercom";

export const useSyncIntercomUser = () => {
  const status = useAuthStore((state) => state.status);
  const { data: user } = useCurrentUserQuery();

  useEffect(() => {
    if (status === AuthStatus.Authenticated && user) {
      identifyIntercomUser(user);
    } else if (status === AuthStatus.Unauthenticated) {
      resetIntercomUser();
    }
  }, [status, user]);
};
