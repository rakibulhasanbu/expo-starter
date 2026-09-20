import { View } from "react-native";

import { CardIcon } from "@/components/icons/card-icon";
import { MoneyIcon } from "@/components/icons/money-icon";
import { WarningIcon } from "@/components/icons/warning-icon";
import { Text } from "@/components/text";

import type { CardFeeInfoItem } from "../types";

const ICONS: Record<CardFeeInfoItem["icon"], React.ComponentType<{ size?: number; color?: string }>> = {
  card: CardIcon,
  money: MoneyIcon,
  warning: WarningIcon,
};

type FeeInfoCardProps = {
  item: CardFeeInfoItem;
};

export function FeeInfoCard({ item }: FeeInfoCardProps) {
  const Icon = ICONS[item.icon];

  return (
    <View className="w-full gap-4 rounded-2xl bg-secondary px-3.5 py-3">
      <View className="size-10 items-center justify-center rounded-full bg-background">
        <Icon size={16} />
      </View>

      <View className="gap-2">
        <Text className="font-urbanist-bold text-base text-foreground">{item.title}</Text>
        <Text className="text-xs leading-[14px] tracking-[0.15px] text-subtitle">{item.description}</Text>
      </View>
    </View>
  );
}
