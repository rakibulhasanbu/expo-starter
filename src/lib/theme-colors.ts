import { useColorScheme } from "nativewind";

// RN color props (SVG fill/stroke, placeholderTextColor, Switch, etc.) need
// resolved values, not className — kept in sync with the token HSL values in
// src/global.css. Update both places together if a token's HSL changes.
const THEME_COLORS = {
  light: {
    background: "hsl(0 0% 100%)",
    card: "hsl(0 0% 100%)",
    foreground: "hsl(220 13% 18%)",
    primary: "hsl(345 6% 13%)",
    primaryForeground: "hsl(0 0% 100%)",
    muted: "hsl(216 8% 88%)",
    mutedForeground: "hsl(218 15% 65%)",
    secondary: "hsl(210 8% 95%)",
    destructive: "hsl(0 84.2% 60.2%)",
    success: "hsl(142 71% 45%)",
    info: "hsl(207 90% 54%)",
  },
  dark: {
    background: "hsl(30 5% 7%)",
    card: "hsl(30 5% 7%)",
    foreground: "hsl(30 8% 96%)",
    primary: "hsl(30 20% 95%)",
    primaryForeground: "hsl(345 8% 12%)",
    muted: "hsl(30 5% 22%)",
    mutedForeground: "hsl(30 6% 65%)",
    secondary: "hsl(30 5% 12%)",
    destructive: "hsl(0 72% 62%)",
    success: "hsl(142 60% 50%)",
    info: "hsl(199 84% 65%)",
  },
} as const;

type ThemeColorKey = keyof typeof THEME_COLORS.light;

export function useThemeColor(key: ThemeColorKey) {
  const { colorScheme } = useColorScheme();
  const scheme = colorScheme === "dark" ? "dark" : "light";
  return THEME_COLORS[scheme][key];
}

// Success-screen confetti palette — react-native-confetti-cannon takes a
// resolved color array. The Mastercard brand reds/oranges are intentionally
// static (product art, not theme colors).
export function useConfettiColors() {
  const background = useThemeColor("background");
  const muted = useThemeColor("muted");
  return [background, muted, "#EB001B", "#F79E1B"];
}
