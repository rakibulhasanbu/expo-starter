import "@/global.css";
import "@/lib/svg-icon-interop";

import { SplashGate } from "@/features/splash/components/splash-gate";
// import { useSyncIntercomUser } from "@/features/support/hooks/use-sync-intercom-user";
import { AuthStatus, useAuthStore } from "@/store/auth-store";
import { Urbanist_500Medium, Urbanist_700Bold, useFonts } from "@expo-google-fonts/urbanist";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { queryClient } from "@/lib/query-client";
import { Toast } from "@/components/toast";

if (__DEV__ && Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
  console.warn(
    "[dolo] Running inside Expo Go — react-native-reanimated 4 and this app's custom native modules " +
      "require a development build. Gestures, animations, and bottom sheets will silently fail here. " +
      "Run `npx expo run:android` / `npx expo run:ios` (or an EAS development build) instead."
  );
}

export default function RootLayout() {
  const status = useAuthStore((state) => state.status);
  const [fontsLoaded] = useFonts({ Urbanist_500Medium, Urbanist_700Bold });

  // useSyncIntercomUser();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <BottomSheetModalProvider>
          <QueryClientProvider client={queryClient}>
            <SplashGate ready={fontsLoaded}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(public)" />

                <Stack.Protected guard={status === AuthStatus.Authenticated}>
                  <Stack.Screen name="(protected)" />
                </Stack.Protected>

                <Stack.Protected guard={status !== AuthStatus.Authenticated}>
                  <Stack.Screen name="(auth)" />
                </Stack.Protected>
              </Stack>

              <Toast />
            </SplashGate>
          </QueryClientProvider>
        </BottomSheetModalProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
