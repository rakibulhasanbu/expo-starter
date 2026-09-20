import * as React from "react";

import { TextInput, View, type TextInputProps } from "react-native";

import { Text } from "@/components/text";
import { useThemeColor } from "@/lib/theme-colors";
import { cn } from "@/utils/cn";

type LabeledInputProps = TextInputProps & {
  label: string;
  icon?: React.ReactNode;
};

export function LabeledInput({ label, icon, className, ...props }: LabeledInputProps) {
  const mutedForegroundColor = useThemeColor("mutedForeground");

  return (
    <View className="w-full gap-1.5">
      <Text variant="label">{label}</Text>

      <View className="w-full flex-row items-center gap-2 rounded-full bg-secondary px-4 py-3">
        {icon}
        <TextInput
          placeholderTextColor={mutedForegroundColor}
          className={cn("flex-1 p-0 font-urbanist-medium text-base text-foreground", className)}
          {...props}
        />
      </View>
    </View>
  );
}
