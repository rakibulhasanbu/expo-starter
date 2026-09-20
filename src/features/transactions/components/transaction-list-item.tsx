import { Pressable, View } from "react-native";

import { Text } from "@/components/text";

import { getInitials } from "../data";
import type { Transaction } from "../types";
import { formatSignedNaira, formatTransactionDate } from "../utils/format-currency";

type TransactionListItemProps = {
  transaction: Transaction;
  onPress: () => void;
};

export function TransactionListItem({ transaction, onPress }: TransactionListItemProps) {
  return (
    <Pressable className="flex-row items-center justify-between py-1" onPress={onPress}>
      <View className="flex-row items-center gap-3">
        <View className="size-10 items-center justify-center rounded-full bg-secondary">
          <Text className="font-urbanist-bold text-sm">{getInitials(transaction.counterpartyName)}</Text>
        </View>
        <View className="gap-0.5">
          <Text className="text-sm">{transaction.counterpartyName}</Text>
          <Text className="text-[10px] text-subtitle">{formatTransactionDate(transaction.date)}</Text>
        </View>
      </View>

      <Text className="font-urbanist-bold text-sm">{formatSignedNaira(transaction.amount, transaction.type)}</Text>
    </Pressable>
  );
}
