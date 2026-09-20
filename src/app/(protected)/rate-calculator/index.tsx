import * as React from "react";

import { USD_TO_NGN_RATE } from "@/features/card/data";
import { useCryptoAssetsQuery } from "@/features/deposit/hooks/use-crypto-deposit-queries";
import type { CryptoAssetGroup } from "@/features/deposit/types";
import { CryptoSelectSheet } from "@/features/rate-calculator/components/crypto-select-sheet";
import { RateCalculatorSkeleton } from "@/features/rate-calculator/components/rate-calculator-skeleton";
import { useCountdown } from "@/hooks/use-countdown";
import { getErrorMessage } from "@/utils/get-error-message";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Image, Pressable, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { ArrowDownIcon } from "@/components/icons/arrow-down-icon";
import { ArrowSwapHorizontalIcon } from "@/components/icons/arrow-swap-horizontal-icon";
import { QueryErrorView } from "@/components/query-error-view";
import { Text } from "@/components/text";
import { useThemeColor } from "@/lib/theme-colors";

const RATE_REFRESH_SECONDS = 60;

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

const formatCryptoAmount = (amount: number) => {
  if (amount <= 0) return "0";
  return amount.toFixed(8).replace(/0+$/, "").replace(/\.$/, "");
};

export default function RateCalculatorScreen() {
  const foregroundColor = useThemeColor("foreground");
  const mutedForegroundColor = useThemeColor("mutedForeground");
  const { data: assetGroups, isPending, isError, error, refetch } = useCryptoAssetsQuery();

  const [usdAmountText, setUsdAmountText] = React.useState("");
  const [selectedSymbol, setSelectedSymbol] = React.useState<string | null>(null);

  const cryptoSheetRef = React.useRef<BottomSheetModal>(null);

  const { remaining, restart } = useCountdown(RATE_REFRESH_SECONDS, {
    onExpire: () => {
      refetch();
      restart();
    },
  });

  const selectedGroup: CryptoAssetGroup | undefined =
    assetGroups?.find((group) => group.symbol === selectedSymbol) ?? assetGroups?.[0];

  const usdAmount = usdAmountText ? Number(usdAmountText) : 0;
  const nairaEquivalent = usdAmount * USD_TO_NGN_RATE;
  const rateNgn = selectedGroup?.networks[0]?.rateNgn ?? 0;
  const cryptoAmount = rateNgn > 0 ? nairaEquivalent / rateNgn : 0;
  const marketPriceUsd = rateNgn > 0 ? Math.round(rateNgn / USD_TO_NGN_RATE) : 0;

  const handleChangeUsdAmount = (text: string) => {
    setUsdAmountText(text.replace(/[^0-9]/g, ""));
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="px-5 pt-8">
        <BackButton fallbackHref="/(protected)/(tabs)/settings" />
      </View>

      <View className="flex-1 items-center gap-4 px-5 pt-6">
        <Text variant="h3" className="w-full tracking-[-0.25px]">
          Rate Calculator
        </Text>

        {isPending ? (
          <RateCalculatorSkeleton />
        ) : isError ? (
          <QueryErrorView message={getErrorMessage(error)} onRetry={refetch} />
        ) : selectedGroup ? (
          <>
            <View className="w-full gap-4 rounded-3xl bg-secondary p-2">
              <View className="relative gap-4">
                <View className="w-full flex-row items-center justify-between rounded-2xl bg-background p-4">
                  <View className="gap-4">
                    <Text className="text-xs tracking-[0.15px] text-subtitle">USD Amount</Text>
                    <View className="flex-row items-center">
                      <Text
                        className="font-urbanist-bold text-2xl tracking-[-0.25px]"
                        style={{ color: usdAmount > 0 ? foregroundColor : mutedForegroundColor }}
                      >
                        $
                      </Text>
                      <TextInput
                        value={usdAmountText}
                        onChangeText={handleChangeUsdAmount}
                        placeholder="0"
                        placeholderTextColor={mutedForegroundColor}
                        keyboardType="number-pad"
                        className="font-urbanist-bold text-2xl tracking-[-0.25px]"
                        style={{ color: usdAmount > 0 ? foregroundColor : mutedForegroundColor, minWidth: 24, padding: 0 }}
                      />
                    </View>
                  </View>

                  <View className="flex-row items-center gap-2 rounded-full bg-secondary p-2">
                    <Text className="text-xl leading-6">🇺🇸</Text>
                    <Text className="text-xs tracking-[0.15px] text-foreground">USD</Text>
                  </View>
                </View>

                <View className="w-full flex-row items-center justify-between rounded-2xl bg-background p-4">
                  <View className="gap-4">
                    <Text className="text-xs tracking-[0.15px] text-subtitle">Crypto Amount</Text>
                    <Text
                      className="font-urbanist-bold text-2xl tracking-[-0.25px]"
                      style={{ color: cryptoAmount > 0 ? foregroundColor : mutedForegroundColor }}
                    >
                      {formatCryptoAmount(cryptoAmount)}
                    </Text>
                  </View>

                  <Pressable
                    className="flex-row items-center gap-2 rounded-full bg-secondary p-2"
                    onPress={() => cryptoSheetRef.current?.present()}
                  >
                    <Image source={{ uri: selectedGroup.icon }} style={{ width: 16, height: 16, borderRadius: 8 }} />
                    <Text className="text-xs tracking-[0.15px] text-foreground">{selectedGroup.symbol}</Text>
                    <ArrowDownIcon size={16} />
                  </Pressable>
                </View>

                <View className="pointer-events-none absolute left-0 right-0 top-[58px] items-center">
                  <View className="size-[53px] items-center justify-center rounded-full border-[6px] border-background bg-secondary">
                    <ArrowSwapHorizontalIcon size={16} />
                  </View>
                </View>
              </View>

              <View className="gap-2 px-4">
                <View className="w-full flex-row items-center justify-between">
                  <Text className="text-xs tracking-[0.15px] text-foreground">Rate</Text>
                  <Text className="text-xs tracking-[0.15px] text-foreground">{formatNaira(USD_TO_NGN_RATE)}</Text>
                </View>
                <View className="w-full flex-row items-center justify-between">
                  <Text className="text-xs tracking-[0.15px] text-foreground">Market price</Text>
                  <Text className="text-xs tracking-[0.15px] text-foreground">
                    1 {selectedGroup.symbol} = {marketPriceUsd.toLocaleString()} USD
                  </Text>
                </View>
              </View>

              <View className="w-full flex-row items-center justify-between rounded-2xl bg-background p-4">
                <View className="gap-4">
                  <Text className="text-xs tracking-[0.15px] text-subtitle">Naira Equivalent</Text>
                  <Text
                    className="font-urbanist-bold text-2xl tracking-[-0.25px]"
                    style={{ color: nairaEquivalent > 0 ? foregroundColor : mutedForegroundColor }}
                  >
                    {formatNaira(nairaEquivalent)}
                  </Text>
                </View>

                <View className="flex-row items-center gap-2 rounded-full bg-secondary p-2">
                  <Text className="text-xl leading-6">🇳🇬</Text>
                  <Text className="text-xs tracking-[0.15px] text-foreground">NGN</Text>
                </View>
              </View>
            </View>

            <View className="flex-row items-center gap-1">
              <Text className="text-xs tracking-[0.15px] text-subtitle">Rate refreshes in</Text>
              <Text className="font-urbanist-bold text-xs tracking-[0.15px] text-foreground">{remaining}secs</Text>
            </View>

            <CryptoSelectSheet
              sheetRef={cryptoSheetRef}
              assetGroups={assetGroups ?? []}
              selectedSymbol={selectedGroup.symbol}
              onSelect={(group) => setSelectedSymbol(group.symbol)}
            />
          </>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
