import { View } from "react-native";

import { QueryErrorView } from "@/components/query-error-view";
import { getErrorMessage } from "@/utils/get-error-message";

import { StatementCurrencyBanner } from "@/features/card/components/statement-currency-banner";
import { StatementRequestForm } from "@/features/card/components/statement-request-form";
import { useHomeSummaryQuery } from "@/features/home/hooks/use-home-queries";

export default function AccountStatementsScreen() {
  const { data: summary, isPending, isError, error, refetch } = useHomeSummaryQuery();
  const ngnBalance = summary?.balances.find((balance) => balance.code === "NGN");

  return (
    <StatementRequestForm
      title="Account Statement"
      fallbackHref="/(protected)/(tabs)/settings"
      banner={
        ngnBalance ? (
          <StatementCurrencyBanner balance={ngnBalance} />
        ) : isPending ? (
          <View className="h-[64px] animate-pulse rounded-2xl bg-secondary" />
        ) : isError ? (
          <QueryErrorView compact message={getErrorMessage(error)} onRetry={refetch} />
        ) : null
      }
    />
  );
}
