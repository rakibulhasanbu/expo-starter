import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, View } from "react-native";

import { QueryErrorView } from "@/components/query-error-view";
import { Text } from "@/components/text";
import { getErrorMessage } from "@/utils/get-error-message";

import { TransactionListItem } from "@/features/transactions/components/transaction-list-item";
import {
  TransactionSegmentedControl,
  type TransactionFilter,
} from "@/features/transactions/components/transaction-segmented-control";
import { TransactionsListSkeleton } from "@/features/transactions/components/transactions-list-skeleton";
import { useTransactionsQuery } from "@/features/transactions/hooks/use-transactions-queries";
import type { Transaction } from "@/features/transactions/types";

export default function TransactionsTab() {
  const [filter, setFilter] = useState<TransactionFilter>("all");
  const type = filter === "all" ? undefined : filter;
  const { data: transactions, isPending, isError, error, refetch } = useTransactionsQuery(type);

  const listData = useMemo(() => transactions ?? [], [transactions]);

  return (
    <View className="flex-1 bg-secondary pt-16">
      <Text variant="h3" className="px-5">
        Transactions
      </Text>

      <View className="px-5 pt-4">
        <TransactionSegmentedControl value={filter} onChange={setFilter} />
      </View>

      <View className="flex-1 px-5 pt-4">
        {isPending ? (
          <TransactionsListSkeleton />
        ) : isError ? (
          <View className="flex-1 rounded-3xl bg-background">
            <QueryErrorView message={getErrorMessage(error)} onRetry={refetch} />
          </View>
        ) : (
          <FlatList<Transaction>
            data={listData}
            keyExtractor={(item) => item.id}
            className="flex-1 rounded-3xl bg-background"
            contentContainerStyle={{ padding: 16, paddingBottom: 120, flexGrow: 1 }}
            ItemSeparatorComponent={() => <View className="my-3 h-px w-full bg-border" />}
            renderItem={({ item }) => (
              <TransactionListItem transaction={item} onPress={() => router.push(`/transactions/${item.id}`)} />
            )}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center">
                <Text className="text-xs tracking-wide text-foreground">No recent transactions</Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
}
