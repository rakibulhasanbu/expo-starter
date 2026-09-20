import { View } from "react-native";

import { Text } from "@/components/text";

import type { WalletBalance } from "@/features/home/types";
import { formatBalanceCompact } from "@/features/home/utils/format-balance";

type StatementCurrencyBannerProps = {
  balance: WalletBalance;
};

export function StatementCurrencyBanner({ balance }: StatementCurrencyBannerProps) {
  return (
    <View className="flex-row items-center justify-between rounded-2xl bg-primary p-4">
      <View className="flex-row items-center gap-2">
        <Text className="text-2xl leading-8">{balance.flagEmoji}</Text>
        <View className="gap-0.5">
          <Text className="font-urbanist-bold text-sm text-primary-foreground">{balance.currencyName}</Text>
          <Text className="text-xs tracking-[0.15px] text-primary-foreground/70">{balance.code}</Text>
        </View>
      </View>

      <Text className="font-urbanist-bold text-base text-primary-foreground">
        {formatBalanceCompact(balance.amount, balance.code)}
      </Text>
    </View>
  );
}
