import * as SystemUI from "expo-system-ui";

import type { ThemePreference } from "@/lib/theme-storage";

// expo-system-ui needs a resolved hex, not a CSS var — keep in sync with
// `--background` in src/global.css.
const THEME_BACKGROUND_HEX: Record<ThemePreference, string> = {
  light: "#ffffff",
  dark: "#131211",
};

export const syncNativeBackground = (theme: ThemePreference) =>
  SystemUI.setBackgroundColorAsync(THEME_BACKGROUND_HEX[theme]).catch(() => {});
