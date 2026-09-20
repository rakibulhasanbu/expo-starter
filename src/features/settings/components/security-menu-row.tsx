import type * as React from "react";

import { Pressable, View } from "react-native";

import { Text } from "@/components/text";

type SecurityMenuRowProps = {
  icon?: React.ReactNode;
  label: string;
  right: React.ReactNode;
  onPress?: () => void;
};

export function SecurityMenuRow({ icon, label, right, onPress }: SecurityMenuRowProps) {
  const content = (
    <>
      {icon}
      <Text className="flex-1 text-sm text-foreground">{label}</Text>
      {right}
    </>
  );

  if (!onPress) {
    return (
      <View className="w-full flex-row items-center gap-2 rounded-full bg-secondary p-4">{content}</View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      className="w-full flex-row items-center gap-2 rounded-full bg-secondary p-4 active:bg-secondary/70"
    >
      {content}
    </Pressable>
  );
}
