import { useCallback, useEffect, useState, type ReactNode } from "react";

import { AuthStatus, useAuthStore } from "@/store/auth-store";
import { useBalancePreferenceStore } from "@/store/balance-preference-store";
import { useThemeStore } from "@/store/theme-store";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

import { AnimatedSplash } from "./animated-splash";

SplashScreen.preventAutoHideAsync().catch(() => {});

type SplashGateProps = {
  children: ReactNode;
  ready?: boolean;
};

export function SplashGate({ children, ready = true }: SplashGateProps) {
  const authStatus = useAuthStore((state) => state.status);
  const themeHydrated = useThemeStore((state) => state.hydrated);
  const balancePreferenceHydrated = useBalancePreferenceStore((state) => state.hydrated);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [overlayMounted, setOverlayMounted] = useState(true);

  const handleOverlayLayout = useCallback(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  useEffect(() => {
    useAuthStore.getState().hydrate();
    useThemeStore.getState().hydrate();
    useBalancePreferenceStore.getState().hydrate();
  }, []);

  const handleAnimationFinish = useCallback(() => setAnimationFinished(true), []);
  const handleExitComplete = useCallback(() => setOverlayMounted(false), []);

  const hydrationReady = authStatus !== AuthStatus.Idle && themeHydrated && balancePreferenceHydrated;
  const shouldExit = ready && hydrationReady && animationFinished;

  return (
    <View style={{ flex: 1 }}>
      {children}
      {overlayMounted && (
        <AnimatedSplash
          visible={!shouldExit}
          onLayout={handleOverlayLayout}
          onAnimationFinish={handleAnimationFinish}
          onExitComplete={handleExitComplete}
        />
      )}
    </View>
  );
}
