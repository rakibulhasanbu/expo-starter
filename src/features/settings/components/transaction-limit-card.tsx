import { View } from "react-native";

import { Text } from "@/components/text";
import { cn } from "@/utils/cn";

import type { TransactionLimit } from "@/features/settings/types";

const formatAmount = (symbol: string, amount: number) => `${symbol}${amount.toLocaleString("en-US")}`;

type TransactionLimitCardProps = {
  limit: TransactionLimit;
};

export function TransactionLimitCard({ limit }: TransactionLimitCardProps) {
  const usedPercent = Math.min(
    100,
    Math.max(0, ((limit.maxDailyLimit - limit.remaining) / limit.maxDailyLimit) * 100)
  );

  return (
    <View className="w-full gap-2">
      <Text className="text-sm text-foreground">{limit.label}</Text>

      <View className="w-full gap-4 rounded-2xl bg-secondary p-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-foreground">Maximum daily limit</Text>
          <Text className="font-urbanist-bold text-sm text-foreground">
            {formatAmount(limit.currencySymbol, limit.maxDailyLimit)}
          </Text>
        </View>

        <View className="w-full gap-1">
          <View className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <View
              className={cn("h-2 rounded-full", limit.progressColorClassName)}
              style={{ width: `${usedPercent}%` }}
            />
          </View>
          <Text className="text-xs text-subtitle">
            {formatAmount(limit.currencySymbol, limit.remaining)} remaining
          </Text>
        </View>
      </View>
    </View>
  );
}
