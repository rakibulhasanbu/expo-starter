import { Pressable, View } from "react-native";

import { ArrowDownIcon } from "@/components/icons/arrow-down-icon";
import { Text } from "@/components/text";
import { cn } from "@/utils/cn";

type SelectFieldProps = {
  label: string;
  placeholder: string;
  value?: string;
  leading?: React.ReactNode;
  onPress: () => void;
};

export function SelectField({ label, placeholder, value, leading, onPress }: SelectFieldProps) {
  return (
    <View className="w-full gap-1.5">
      <Text variant="label">{label}</Text>

      <Pressable
        onPress={onPress}
        className="w-full flex-row items-center gap-2 rounded-full bg-secondary px-4 py-3"
      >
        {leading}
        <Text className={cn("flex-1 font-urbanist-medium text-base", value ? "text-foreground" : "text-muted-foreground")}>
          {value ?? placeholder}
        </Text>
        <ArrowDownIcon size={20} />
      </Pressable>
    </View>
  );
}
