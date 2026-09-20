import * as React from "react";

import { EnterPinSheet } from "@/features/card/components/enter-pin-sheet";
import { WITHDRAW_CONVERSION_FEE_USD, WITHDRAW_QUICK_AMOUNTS_USD } from "@/features/card/data";
import { convertUsdToNaira } from "@/features/card/utils/convert-currency";
import { formatUsdBalance } from "@/features/card/utils/format-usd-balance";
import { transactionsKeys } from "@/features/transactions/hooks/use-transactions-queries";
import { useCardStore } from "@/store/card-store";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Pressable, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { FormScreen } from "@/components/form-screen";
import { ArrowSwapHorizontalIcon } from "@/components/icons/arrow-swap-horizontal-icon";
import { Text } from "@/components/text";
import { useThemeColor } from "@/lib/theme-colors";

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

export default function WithdrawScreen() {
  const foregroundColor = useThemeColor("foreground");
  const mutedForegroundColor = useThemeColor("mutedForeground");
  const card = useCardStore((state) => state.card);
  const withdraw = useCardStore((state) => state.withdraw);
  const queryClient = useQueryClient();

  const [amount, setAmount] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const pinSheetRef = React.useRef<BottomSheetModal>(null);

  const balanceUsd = card?.balanceUsd ?? 0;
  const { feeUsd, nairaReceived } = convertUsdToNaira(amount);
  const isOverBalance = amount + feeUsd > balanceUsd;

  const handleChangeAmount = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "");
    setAmount(digits ? Number(digits) : 0);
  };

  const handleWithdrawAll = () => {
    setAmount(Math.max(balanceUsd - WITHDRAW_CONVERSION_FEE_USD, 0));
  };

  const handlePinSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { nairaReceived: received, transaction } = await withdraw(amount);
      await queryClient.invalidateQueries({ queryKey: transactionsKeys.all });
      pinSheetRef.current?.dismiss();
      router.replace({
        pathname: "/withdraw/success",
        params: {
          nairaReceived: String(received),
          usdWithdrawn: String(amount),
          transactionId: transaction.id,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="flex-row items-center gap-4 px-5 pt-10">
        <BackButton fallbackHref="/(protected)/(tabs)/home" />
        <Text className="font-urbanist-bold text-base text-foreground">Withdraw</Text>
      </View>

      <FormScreen
        contentContainerClassName="gap-6 px-5 pb-8 pt-10"
        footer={
          <Button
            size="xl"
            disabled={amount <= 0 || isOverBalance}
            onPress={() => pinSheetRef.current?.present()}
          >
            <Text>Continue</Text>
          </Button>
        }
      >
        <View className="items-center gap-2">
          <View className="flex-row items-center justify-center">
            <Text
              className="font-urbanist-bold text-[48px] tracking-[-1px]"
              style={{ color: amount > 0 ? foregroundColor : mutedForegroundColor }}
            >
              $
            </Text>
            <TextInput
              value={amount > 0 ? amount.toLocaleString("en-US") : "0"}
              onChangeText={handleChangeAmount}
              keyboardType="number-pad"
              autoFocus
              className="font-urbanist-bold text-[48px] tracking-[-1px]"
              style={{ color: amount > 0 ? foregroundColor : mutedForegroundColor, minWidth: 40, padding: 0 }}
            />
          </View>

          <View className="flex-row items-center gap-2 self-center rounded-full bg-secondary px-3.5 py-1">
            <ArrowSwapHorizontalIcon size={14} />
            <Text className="font-urbanist-bold text-base text-foreground">{formatNaira(nairaReceived)}</Text>
            <Text className="text-sm text-subtitle">to your wallet</Text>
          </View>
        </View>

        <View className="gap-4">
          <View className="flex-row items-center gap-2">
            {WITHDRAW_QUICK_AMOUNTS_USD.map((quickAmount) => (
              <Pressable
                key={quickAmount}
                className="flex-1 items-center justify-center rounded-full border border-border p-2"
                onPress={() => setAmount(quickAmount)}
              >
                <Text className="text-center text-sm text-foreground">{formatUsdBalance(quickAmount)}</Text>
              </Pressable>
            ))}
            <Pressable
              className="items-center justify-center rounded-full border border-border p-2"
              onPress={handleWithdrawAll}
            >
              <Text className="text-center text-sm text-foreground">Withdraw all</Text>
            </Pressable>
          </View>

          <View className="gap-4 rounded-2xl bg-background p-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-subtitle">Exchange rate</Text>
              <Text className="text-sm text-foreground">$1 = ₦1,380</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-subtitle">Conversion fee</Text>
              <Text className="text-sm text-foreground">{formatUsdBalance(feeUsd)}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-subtitle">Amount you will receive</Text>
              <Text className="text-sm text-foreground">{formatNaira(nairaReceived)}</Text>
            </View>
          </View>
        </View>
      </FormScreen>

      <EnterPinSheet
        sheetRef={pinSheetRef}
        amountLabel={formatUsdBalance(amount)}
        loading={isSubmitting}
        onSubmit={handlePinSubmit}
      />
    </SafeAreaView>
  );
}
