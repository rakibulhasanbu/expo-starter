import { useColorScheme } from "nativewind";
import { Switch } from "react-native";

type ToggleSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

// RN Switch color props need resolved values, not className — kept in sync with
// the `--primary` / `--muted` / `--background` tokens in src/global.css.
const TRACK_COLORS = {
  light: { false: "hsl(216 8% 88%)", true: "hsl(345 6% 13%)" },
  dark: { false: "hsl(30 5% 22%)", true: "hsl(30 20% 95%)" },
};

const THUMB_COLORS = {
  light: "hsl(0 0% 100%)",
  dark: "hsl(30 5% 7%)",
};

export function ToggleSwitch({ value, onValueChange }: ToggleSwitchProps) {
  const { colorScheme } = useColorScheme();
  const scheme = colorScheme === "dark" ? "dark" : "light";

  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={TRACK_COLORS[scheme]}
      thumbColor={THUMB_COLORS[scheme]}
      ios_backgroundColor={TRACK_COLORS[scheme].false}
    />
  );
}
