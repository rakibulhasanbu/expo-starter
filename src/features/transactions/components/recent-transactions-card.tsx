import { Fragment } from "react";

import { TransactionListItem } from "@/features/transactions/components/transaction-list-item";
import { useTransactionsQuery } from "@/features/transactions/hooks/use-transactions-queries";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

import { ArrowRightIcon } from "@/components/icons/arrow-right-icon";
import { QueryErrorView } from "@/components/query-error-view";
import { Skeleton } from "@/components/skeleton";
import { Text } from "@/components/text";
import { getErrorMessage } from "@/utils/get-error-message";

const RECENT_TRANSACTIONS_LIMIT = 4;

function RecentTransactionsCardSkeleton() {
  return (
    <View className="w-full gap-3 rounded-2xl bg-background p-4">
      {Array.from({ length: RECENT_TRANSACTIONS_LIMIT }).map((_, index) => (
        <Fragment key={index}>
          {index > 0 ? <View className="h-px w-full bg-border" /> : null}
          <View className="w-full flex-row items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <View className="flex-1 gap-1.5">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-2.5 w-20" />
            </View>
            <Skeleton className="h-3 w-16" />
          </View>
        </Fragment>
      ))}
    </View>
  );
}

export function RecentTransactionsCard() {
  const { data: transactions, isPending, isError, error, refetch } = useTransactionsQuery();
  const recent = (transactions ?? []).slice(0, RECENT_TRANSACTIONS_LIMIT);

  return (
    <View className="w-full gap-2">
      <View className="w-full flex-row items-center justify-between">
        <Text className="font-urbanist-bold text-sm text-foreground">Recent Transactions</Text>

        <Pressable className="flex-row items-center gap-2" onPress={() => router.push("/transactions")}>
          <Text className="text-xs tracking-[0.15px] text-primary">View all</Text>
          <ArrowRightIcon size={14} />
        </Pressable>
      </View>

      {isPending ? (
        <RecentTransactionsCardSkeleton />
      ) : isError ? (
        <QueryErrorView compact message={getErrorMessage(error)} onRetry={refetch} />
      ) : recent.length > 0 ? (
        <View className="w-full gap-3 rounded-2xl bg-background p-4">
          {recent.map((transaction, index) => (
            <Fragment key={transaction.id}>
              {index > 0 ? <View className="h-px w-full bg-border" /> : null}
              <TransactionListItem
                transaction={transaction}
                onPress={() => router.push(`/transactions/${transaction.id}`)}
              />
            </Fragment>
          ))}
        </View>
      ) : (
        <View className="w-full items-center justify-center rounded-2xl bg-background p-6">
          <Text className="text-xs text-subtitle">No recent transactions</Text>
        </View>
      )}
    </View>
  );
}
