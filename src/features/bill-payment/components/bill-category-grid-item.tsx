import { Image } from "expo-image";
import { Pressable, View } from "react-native";

import { Text } from "@/components/text";

import type { BillCategory } from "../types";

type BillCategoryGridItemProps = {
  category: BillCategory;
  onPress: () => void;
};

export function BillCategoryGridItem({ category, onPress }: BillCategoryGridItemProps) {
  return (
    <Pressable onPress={onPress} className="w-[48%] justify-center gap-4 rounded-2xl bg-secondary p-4">
      <View className="size-10 items-center justify-center overflow-hidden rounded-full bg-background">
        <Image source={category.icon} style={{ width: 20, height: 20 }} contentFit="contain" />
      </View>
      <Text className="text-sm text-foreground">{category.label}</Text>
    </Pressable>
  );
}
