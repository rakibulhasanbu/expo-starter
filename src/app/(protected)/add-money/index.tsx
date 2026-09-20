import * as React from "react";

import { EnterPinSheet } from "@/features/card/components/enter-pin-sheet";
import { ADD_MONEY_QUICK_AMOUNTS } from "@/features/card/data";
import { convertNairaToUsd } from "@/features/card/utils/convert-currency";
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

export default function AddMoneyScreen() {
  const foregroundColor = useThemeColor("foreground");
  const mutedForegroundColor = useThemeColor("mutedForeground");
  const addMoney = useCardStore((state) => state.addMoney);
  const queryClient = useQueryClient();

  const [amount, setAmount] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const pinSheetRef = React.useRef<BottomSheetModal>(null);

  const { feeNaira, usdReceived } = convertNairaToUsd(amount);

  const handleChangeAmount = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "");
    setAmount(digits ? Number(digits) : 0);
  };

  const handlePinSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { usdAdded, transaction } = await addMoney(amount);
      await queryClient.invalidateQueries({ queryKey: transactionsKeys.all });
      pinSheetRef.current?.dismiss();
      router.replace({
        pathname: "/add-money/success",
        params: { usdAdded: String(usdAdded), transactionId: transaction.id },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="flex-row items-center gap-4 px-5 pt-10">
        <BackButton fallbackHref="/(protected)/(tabs)/home" />
        <Text className="font-urbanist-bold text-base text-foreground">Add Money</Text>
      </View>

      <FormScreen
        contentContainerClassName="gap-6 px-5 pb-8 pt-10"
        footer={
          <Button size="xl" disabled={amount <= 0} onPress={() => pinSheetRef.current?.present()}>
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
              ₦
            </Text>
            <TextInput
              value={amount > 0 ? amount.toLocaleString("en-NG") : "0"}
              onChangeText={handleChangeAmount}
              keyboardType="number-pad"
              autoFocus
              className="font-urbanist-bold text-[48px] tracking-[-1px]"
              style={{ color: amount > 0 ? foregroundColor : mutedForegroundColor, minWidth: 40, padding: 0 }}
            />
          </View>

          <View className="flex-row items-center gap-2 self-center rounded-full bg-secondary px-3.5 py-1">
            <ArrowSwapHorizontalIcon size={14} />
            <Text className="font-urbanist-bold text-base text-foreground">
              {formatUsdBalance(usdReceived)}
            </Text>
            <Text className="text-sm text-subtitle">added to card</Text>
          </View>
        </View>

        <View className="gap-4">
          <View className="flex-row items-center gap-2">
            {ADD_MONEY_QUICK_AMOUNTS.map((quickAmount) => (
              <Pressable
                key={quickAmount}
                className="flex-1 items-center justify-center rounded-full border border-border p-2"
                onPress={() => setAmount(quickAmount)}
              >
                <Text className="text-center text-sm text-foreground">{formatNaira(quickAmount)}</Text>
              </Pressable>
            ))}
          </View>

          <View className="gap-4 rounded-2xl bg-background p-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-subtitle">Exchange rate</Text>
              <Text className="text-sm text-foreground">1 NGN = 0.0007 USD</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-subtitle">Conversion fee</Text>
              <Text className="text-sm text-foreground">{formatNaira(feeNaira)}</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-subtitle">Amount you will receive</Text>
              <Text className="text-sm text-foreground">{formatUsdBalance(usdReceived)}</Text>
            </View>
          </View>
        </View>
      </FormScreen>

      <EnterPinSheet
        sheetRef={pinSheetRef}
        amountLabel={formatNaira(amount)}
        loading={isSubmitting}
        onSubmit={handlePinSubmit}
      />
    </SafeAreaView>
  );
}
