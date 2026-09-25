import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/types/api-types";
import { AuthStatus, useAuthStore } from "@/store/auth-store";

import { fetchCurrentUser } from "../api/auth-api";

export const authKeys = {
  all: [QueryKeys.AUTH] as const,
  me: () => [...authKeys.all, "me"] as const,
};

export const useCurrentUserQuery = () => {
  const status = useAuthStore((state) => state.status);

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: fetchCurrentUser,
    select: (data) => data.data,
    enabled: status === AuthStatus.Authenticated,
  });
};
