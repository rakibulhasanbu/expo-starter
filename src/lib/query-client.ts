import { isAuthError } from "@/utils/is-auth-error";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      // Retrying an auth failure is wasted work: api-client's interceptor already
      // refreshes the token and replays the request once, so a rejection that
      // reaches here means the refresh itself failed and won't fare better.
      retry: (failureCount, error) => {
        if (isAuthError(error)) return false;
        return failureCount < 2;
      },
    },
  },
});
