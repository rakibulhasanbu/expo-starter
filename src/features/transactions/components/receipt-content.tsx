import { useState } from "react";
import { View, type LayoutChangeEvent } from "react-native";

import { Text } from "@/components/text";
import { cn } from "@/utils/cn";

import { getInitials } from "../data";
import type { Transaction } from "../types";
import { formatSignedNaira } from "../utils/format-currency";
import { ReceiptZigzagEdge } from "./receipt-zigzag-edge";

type ReceiptRow = {
  label: string;
  value: string;
};

const TRANSACTION_TYPE_LABELS: Record<Transaction["type"], string> = {
  deposit: "Deposit",
  withdrawal: "Withdrawal",
  crypto_deposit: "Crypto Deposit",
};

function getReceiptRows(transaction: Transaction): ReceiptRow[] {
  if (transaction.type === "deposit") {
    return [
      { label: "Received from", value: transaction.counterpartyName },
      { label: "Sender's bank", value: transaction.senderBank },
      { label: "Amount", value: formatSignedNaira(transaction.amount, transaction.type) },
      { label: "Transaction ID", value: transaction.transactionId },
    ];
  }

  if (transaction.type === "crypto_deposit") {
    const rows: ReceiptRow[] = [
      { label: "Asset", value: transaction.asset },
      { label: "Crypto amount", value: `${transaction.cryptoAmount} ${transaction.asset}` },
      { label: "Status", value: transaction.status },
      { label: "Credited amount", value: formatSignedNaira(transaction.amount, transaction.type) },
      { label: "Transaction ID", value: transaction.transactionId },
    ];

    if (transaction.txHash) {
      rows.splice(4, 0, { label: "Tx hash", value: transaction.txHash });
    }

    return rows;
  }

  return [
    { label: "Withdrawn from", value: transaction.walletSource },
    { label: "Recipient bank", value: transaction.recipientBank },
    { label: "Recipient name", value: transaction.recipientName },
    { label: "Recipient account number", value: transaction.recipientAccountNumber },
    { label: "Narration", value: transaction.narration },
    { label: "Amount sent", value: formatSignedNaira(transaction.amount, transaction.type) },
    { label: "Transaction ID", value: transaction.transactionId },
  ];
}

type ReceiptContentProps = {
  transaction: Transaction;
  size?: "default" | "compact";
};

export function ReceiptContent({ transaction, size = "default" }: ReceiptContentProps) {
  const [cardWidth, setCardWidth] = useState(0);
  const isCompact = size === "compact";
  const rows = getReceiptRows(transaction);

  const onCardLayout = (event: LayoutChangeEvent) => {
    setCardWidth(event.nativeEvent.layout.width);
  };

  return (
    <View className="w-full items-center">
      <View className={cn("items-center gap-4", isCompact ? "py-4" : "py-6")}>
        <View
          className={cn(
            "items-center justify-center rounded-full bg-secondary",
            isCompact ? "size-[45px]" : "size-[67px]"
          )}
        >
          <Text className={cn("font-urbanist-bold", isCompact ? "text-base" : "text-2xl")}>
            {getInitials(transaction.counterpartyName)}
          </Text>
        </View>
        <View className="items-center gap-2">
          <Text className={cn("font-urbanist-bold text-center tracking-tight", isCompact ? "text-lg" : "text-2xl")}>
            {formatSignedNaira(transaction.amount, transaction.type)}
          </Text>
          <Text className="text-center text-sm">{TRANSACTION_TYPE_LABELS[transaction.type]}</Text>
        </View>
      </View>

      <View onLayout={onCardLayout} className="w-full items-center">
        <View className="w-full gap-4 rounded-t-3xl bg-background px-4 py-6">
          {rows.map((row) => (
            <View key={row.label} className="flex-row items-center justify-between gap-3">
              <Text className={cn("shrink-0 text-subtitle", isCompact ? "text-xs" : "text-sm")}>{row.label}</Text>
              <Text className={cn("shrink text-right", isCompact ? "text-xs" : "text-sm")} numberOfLines={1}>
                {row.value}
              </Text>
            </View>
          ))}
        </View>
        {cardWidth > 0 ? <ReceiptZigzagEdge width={cardWidth} /> : null}
      </View>
    </View>
  );
}
