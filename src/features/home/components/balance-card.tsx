import { useBalancePreferenceStore } from "@/store/balance-preference-store";
import { Pressable, View } from "react-native";

import { AddIcon } from "@/components/icons/add-icon";
import { EyeSlashIcon } from "@/components/icons/eye-slash-icon";
import { SendIcon } from "@/components/icons/send-icon";
import { Text } from "@/components/text";
import { useThemeColor } from "@/lib/theme-colors";

import type { WalletBalance } from "../types";
import { formatBalanceParts } from "../utils/format-balance";

const MASKED_BALANCE = "*********";

type BalanceCardProps = {
  balances: WalletBalance[];
  onPressCurrency: () => void;
  onPressDeposit?: () => void;
  onPressWithdraw?: () => void;
};

export function BalanceCard({
  balances,
  onPressCurrency,
  onPressDeposit,
  onPressWithdraw,
}: BalanceCardProps) {
  const primaryForegroundColor = useThemeColor("primaryForeground");
  const currency = useBalancePreferenceStore((state) => state.currency);
  const hidden = useBalancePreferenceStore((state) => state.hidden);
  const toggleHidden = useBalancePreferenceStore((state) => state.toggleHidden);

  const selected = balances.find((balance) => balance.code === currency) ?? balances[0];
  const { symbol, whole, decimals } = formatBalanceParts(selected.amount, selected.code);

  return (
    <View className="w-full items-center gap-4">
      <View className="w-full items-center gap-4">
        <Pressable
          // onPress={onPressCurrency}
          className="flex-row items-center gap-3 self-center rounded-full bg-background px-2.5 py-2"
        >
          <View className="flex-row items-center gap-1.5">
            <Text className="text-base leading-4">{selected.flagEmoji}</Text>
            <Text className="text-sm leading-4 tracking-[0.15px] text-foreground">{selected.label}</Text>
          </View>
          {/* <ArrowDownIcon size={16} /> */}
        </Pressable>

        <View className="w-full flex-row items-center justify-center gap-4">
          {hidden ? (
            <Text className="font-urbanist-bold text-[40px] leading-[38px] text-foreground">
              {MASKED_BALANCE}
            </Text>
          ) : (
            <Text className="font-urbanist-bold text-[32px] leading-[38px] tracking-[-0.5px] text-foreground">
              {symbol}
              {whole}.
              <Text className="font-urbanist-medium text-2xl tracking-[-0.25px] text-foreground">
                {decimals}
              </Text>
            </Text>
          )}

          <Pressable onPress={() => toggleHidden()} hitSlop={8}>
            <EyeSlashIcon size={16} />
          </Pressable>
        </View>
      </View>

      {onPressDeposit || onPressWithdraw ? (
        <View className="w-full flex-row items-center gap-2">
          {onPressDeposit ? (
            <Pressable
              onPress={onPressDeposit}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-full bg-primary px-2 py-3"
            >
              <AddIcon size={16} color={primaryForegroundColor} />
              <Text className="text-sm text-primary-foreground">Deposit</Text>
            </Pressable>
          ) : null}
          {onPressWithdraw ? (
            <Pressable
              onPress={onPressWithdraw}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-full bg-background px-2 py-3"
            >
              <SendIcon size={16} />
              <Text className="text-sm text-foreground">Withdraw</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
