import { Pressable, View } from "react-native";

import { cn } from "@/utils/cn";

import { CARD_THEME_COLORS, CARD_THEMES } from "../data";
import type { CardTheme } from "../types";

type ThemeSwatchPickerProps = {
  value: CardTheme;
  onChange: (theme: CardTheme) => void;
};

export function ThemeSwatchPicker({ value, onChange }: ThemeSwatchPickerProps) {
  return (
    <View className="w-full flex-row items-center gap-[3px]">
      {CARD_THEMES.map((theme) => {
        const isSelected = theme === value;

        return (
          <Pressable
            key={theme}
            onPress={() => onChange(theme)}
            hitSlop={4}
            className={cn(
              "flex-1 rounded-lg border-[0.5px] border-transparent p-0.5",
              isSelected && "border-primary"
            )}
          >
            <View
              className="h-9 w-full rounded-lg"
              style={{ backgroundColor: CARD_THEME_COLORS[theme] }}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
