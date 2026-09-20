import type * as React from "react";

import { cn } from "@/utils/cn";
import { Pressable, View } from "react-native";

import { ArrowRightIcon } from "@/components/icons/arrow-right-icon";
import { Text } from "@/components/text";

type SettingsListItemProps = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  destructive?: boolean;
  trailing?: React.ReactNode;
};

function SettingsListItem({ icon, label, onPress, destructive = false, trailing }: SettingsListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full flex-row items-center gap-2 rounded-full bg-card p-3 active:bg-card/70"
    >
      <View className="size-[35px] items-center justify-center rounded-full bg-secondary">{icon}</View>

      <Text className={cn("flex-1 text-sm text-foreground", destructive && "text-destructive")}>{label}</Text>

      {trailing ?? <ArrowRightIcon size={16} />}
    </Pressable>
  );
}

export { SettingsListItem };
export type { SettingsListItemProps };
