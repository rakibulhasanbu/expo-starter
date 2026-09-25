import * as React from "react";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Pressable, View } from "react-native";

import { env, isGoogleSignInConfigured } from "@/config";
import { useGoogleLoginMutation } from "@/features/auth/hooks/use-auth-mutations";
import { useToastStore } from "@/store/toast-store";
import { getErrorMessage } from "@/utils/get-error-message";
import { getAccountDeletionGraceEndsAt, isAccountPendingDeletion } from "@/utils/get-error-code";

import { Text } from "@/components/text";

// Dismisses the auth popup automatically once the redirect lands.
WebBrowser.maybeCompleteAuthSession();

type GoogleSignInButtonProps = {
  onSuccess: () => void;
  /**
   * Deleted accounts answer 409 and need routing to the reactivation screen.
   * `graceEndsAt` is the ISO deadline from that response, absent if the backend
   * did not send one.
   */
  onAccountPendingDeletion?: (graceEndsAt?: string) => void;
};

/**
 * Renders nothing unless a Google web client id is configured. `responseType:
 * id_token` is what matters — the backend verifies an id token, not an access
 * token, and its audience must be the web client id it was configured with.
 */
export function GoogleSignInButton({ onSuccess, onAccountPendingDeletion }: GoogleSignInButtonProps) {
  const googleLoginMutation = useGoogleLoginMutation();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: env.googleWebClientId,
    iosClientId: env.googleIosClientId,
    androidClientId: env.googleAndroidClientId,
  });

  React.useEffect(() => {
    if (response?.type !== "success") return;

    const idToken = response.params.id_token;
    if (!idToken) return;

    googleLoginMutation.mutate(
      { idToken },
      {
        onSuccess,
        onError: (error) => {
          if (isAccountPendingDeletion(error)) {
            onAccountPendingDeletion?.(getAccountDeletionGraceEndsAt(error));
            return;
          }
          useToastStore.getState().show("error", getErrorMessage(error));
        },
      }
    );
    // The mutation and callbacks are stable enough here; re-running on a new
    // response object is exactly what we want and nothing else.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  if (!isGoogleSignInConfigured) return null;

  return (
    <Pressable
      className="w-full flex-row items-center justify-center gap-2 rounded-full border border-muted py-4 active:opacity-70 disabled:opacity-50"
      disabled={!request || googleLoginMutation.isPending}
      onPress={() => promptAsync()}
    >
      <View className="size-5 items-center justify-center rounded-full bg-foreground">
        <Text className="font-urbanist-bold text-xs text-background">G</Text>
      </View>
      <Text className="font-urbanist-bold text-base text-foreground">
        {googleLoginMutation.isPending ? "Signing in..." : "Continue with Google"}
      </Text>
    </Pressable>
  );
}
