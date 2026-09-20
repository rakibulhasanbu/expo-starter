import * as React from "react";

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { AppBottomSheetModal } from "@/components/app-bottom-sheet-modal";
import { Pressable, View } from "react-native";

import { Text } from "@/components/text";
import { cn } from "@/utils/cn";

import type { CurrencyCode, WalletBalance } from "../types";
import { formatBalanceCompact } from "../utils/format-balance";

type CurrencySelectSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  balances: WalletBalance[];
  selectedCode: CurrencyCode;
  onSelect: (code: CurrencyCode) => void;
};

export function CurrencySelectSheet({ sheetRef, balances, selectedCode, onSelect }: CurrencySelectSheetProps) {
  return (
    <AppBottomSheetModal ref={sheetRef}>
      <BottomSheetView className="gap-6 px-6 pb-8 pt-2">
        <Text variant="h4" className="text-center tracking-[-0.25px]">
          Choose Display Currency
        </Text>

        <View className="gap-3">
          {balances.map((balance) => {
            const isSelected = balance.code === selectedCode;

            return (
              <Pressable
                key={balance.code}
                onPress={() => {
                  onSelect(balance.code);
                  sheetRef.current?.dismiss();
                }}
                className={cn(
                  "flex-row items-center justify-between rounded-2xl border border-transparent bg-secondary p-4",
                  isSelected && "border-primary"
                )}
              >
                <View className="flex-row items-center gap-2">
                  <Text className="text-3xl leading-9">{balance.flagEmoji}</Text>
                  <View className="gap-1">
                    <Text className="font-urbanist-bold text-sm text-foreground">{balance.label}</Text>
                    <Text className="text-xs tracking-[0.15px] text-foreground">{balance.currencyName}</Text>
                  </View>
                </View>

                <Text className="font-urbanist-bold text-xs tracking-[0.15px] text-foreground">
                  {formatBalanceCompact(balance.amount, balance.code)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </BottomSheetView>
    </AppBottomSheetModal>
  );
}
