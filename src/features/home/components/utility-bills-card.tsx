import { Image } from "expo-image";
import { router, type Href } from "expo-router";
import { Pressable, View, type ImageSourcePropType } from "react-native";

import { ArrowRightIcon } from "@/components/icons/arrow-right-icon";
import { Text } from "@/components/text";

type UtilityBillsCardProps = {
  icon: ImageSourcePropType;
};

export function UtilityBillsCard({ icon }: UtilityBillsCardProps) {
  return (
    <Pressable
      onPress={() => router.push("/bill-payment" as Href)}
      className="w-full flex-row items-center gap-3 rounded-2xl bg-background p-2"
    >
      <View className="size-[50px] items-center justify-center overflow-hidden rounded-lg bg-secondary">
        <Image source={icon} style={{ width: 30, height: 29 }} contentFit="contain" />
      </View>

      <View className="flex-1 gap-2">
        <Text className="font-urbanist-bold text-sm text-foreground">Utility Bills</Text>
        <Text className="text-xs tracking-[0.15px] text-subtitle">Pay for your electricity, data and more</Text>
      </View>

      <ArrowRightIcon size={16} />
    </Pressable>
  );
}
