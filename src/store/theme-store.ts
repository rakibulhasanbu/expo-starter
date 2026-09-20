import { colorScheme } from "nativewind";
import { Appearance, type ColorSchemeName } from "react-native";
import { create } from "zustand";

import { getThemePreference, setThemePreference, type ThemePreference } from "@/lib/theme-storage";
import { syncNativeBackground } from "@/lib/system-ui";

type ThemeState = {
  theme: ThemePreference;
  isUserSet: boolean;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  setTheme: (theme: ThemePreference) => Promise<void>;
};

let systemSubscription: ReturnType<typeof Appearance.addChangeListener> | null = null;

const stopFollowingSystem = () => {
  systemSubscription?.remove();
  systemSubscription = null;
};

const resolveSystemScheme = (scheme: ColorSchemeName | null | undefined): "light" | "dark" =>
  scheme === "dark" ? "dark" : "light";

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: resolveSystemScheme(Appearance.getColorScheme()),
  isUserSet: false,
  hydrated: false,

  hydrate: async () => {
    if (get().hydrated) return;

    try {
      const stored = await getThemePreference();

      if (stored) {
        colorScheme.set(stored);
        syncNativeBackground(stored);
        set({ theme: stored, isUserSet: true });
        return;
      }

      const resolved = resolveSystemScheme(Appearance.getColorScheme());
      colorScheme.set(resolved);
      syncNativeBackground(resolved);
      set({ theme: resolved, isUserSet: false });

      stopFollowingSystem();
      systemSubscription = Appearance.addChangeListener(({ colorScheme: next }) => {
        if (get().isUserSet) return;
        const nextTheme = resolveSystemScheme(next);
        colorScheme.set(nextTheme);
        syncNativeBackground(nextTheme);
        set({ theme: nextTheme });
      });
    } finally {
      set({ hydrated: true });
    }
  },

  setTheme: async (theme) => {
    stopFollowingSystem();
    set({ theme, isUserSet: true });

    // Defer the app-wide restyle a frame so state-driven UI (e.g. the settings
    // toggle) can commit and animate before the heavier repaint kicks in.
    requestAnimationFrame(() => {
      colorScheme.set(theme);
      syncNativeBackground(theme);
    });

    await setThemePreference(theme);
  },
}));
