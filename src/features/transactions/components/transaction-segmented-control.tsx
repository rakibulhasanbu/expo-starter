import { Pressable, View } from "react-native";

import { Text } from "@/components/text";
import { cn } from "@/utils/cn";

import type { TransactionType } from "../types";

export type TransactionFilter = "all" | TransactionType;

const OPTIONS: { label: string; value: TransactionFilter }[] = [
  { label: "All", value: "all" },
  { label: "Deposit", value: "deposit" },
  { label: "Withdrawal", value: "withdrawal" },
  { label: "Crypto", value: "crypto_deposit" },
];

type TransactionSegmentedControlProps = {
  value: TransactionFilter;
  onChange: (value: TransactionFilter) => void;
};

export function TransactionSegmentedControl({ value, onChange }: TransactionSegmentedControlProps) {
  return (
    <View className="flex-row items-center gap-2 rounded-full bg-background p-[7px]">
      {OPTIONS.map((option) => {
        const isActive = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            className={cn("flex-1 items-center justify-center rounded-full px-2.5 py-2", isActive && "bg-primary")}
          >
            <Text
              className={cn("font-urbanist-medium text-sm", isActive ? "text-primary-foreground" : "text-foreground")}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
