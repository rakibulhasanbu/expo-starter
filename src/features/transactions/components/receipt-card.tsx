import { forwardRef } from "react";
import { View } from "react-native";

import { Text } from "@/components/text";

import type { Transaction } from "../types";
import { DoloWordmark } from "./dolo-wordmark";
import { ReceiptContent } from "./receipt-content";

type ReceiptCardProps = {
  transaction: Transaction;
};

export const ReceiptCard = forwardRef<View, ReceiptCardProps>(({ transaction }, ref) => {
  return (
    <View ref={ref} collapsable={false} className="w-full gap-4 overflow-hidden rounded-3xl bg-secondary pb-6">
      <View className="relative h-20 w-full overflow-hidden bg-primary">
        <DoloWordmark />
      </View>

      <View className="w-full items-center px-4">
        <ReceiptContent transaction={transaction} size="compact" />
      </View>

      <Text className="px-8 text-center text-[10px] leading-[14px] tracking-wide text-subtitle">
        Have any issues with transaction, contact support at{" "}
        <Text className="font-urbanist-bold text-[10px] text-subtitle">hello@dolosupport.com</Text>
      </Text>
    </View>
  );
});

ReceiptCard.displayName = "ReceiptCard";
