import * as React from "react";

import { DepositSheet } from "@/features/deposit/components/deposit-sheet";
import { BalanceCard } from "@/features/home/components/balance-card";
import { CurrencySelectSheet } from "@/features/home/components/currency-select-sheet";
import { HomeSkeleton } from "@/features/home/components/home-skeleton";
import { HomeTopbar } from "@/features/home/components/home-topbar";
import { KycCard } from "@/features/home/components/kyc-card";
import { PromoCarousel } from "@/features/home/components/promo-carousel";
import { UtilityBillsCard } from "@/features/home/components/utility-bills-card";
import { useHomeSummaryQuery } from "@/features/home/hooks/use-home-queries";
import type { CurrencyCode } from "@/features/home/types";
import { RecentTransactionsCard } from "@/features/transactions/components/recent-transactions-card";
import { useBalancePreferenceStore } from "@/store/balance-preference-store";
import { getErrorMessage } from "@/utils/get-error-message";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { QueryErrorView } from "@/components/query-error-view";

export default function HomeTab() {
  const { data: summary, isPending, isError, error, refetch } = useHomeSummaryQuery();
  const currency = useBalancePreferenceStore((state) => state.currency);
  const setCurrency = useBalancePreferenceStore((state) => state.setCurrency);

  const currencySheetRef = React.useRef<BottomSheetModal>(null);
  const depositSheetRef = React.useRef<BottomSheetModal>(null);

  if (isPending) {
    return (
      <SafeAreaView edges={["top"]} className="flex-1 bg-secondary">
        <HomeSkeleton />
      </SafeAreaView>
    );
  }

  if (isError || !summary) {
    return (
      <SafeAreaView edges={["top"]} className="flex-1 bg-secondary">
        <QueryErrorView message={getErrorMessage(error)} onRetry={refetch} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-secondary">
      <ScrollView contentContainerClassName="gap-6 px-5 pb-40 pt-6" showsVerticalScrollIndicator={false}>
        <HomeTopbar />

        <BalanceCard
          balances={summary.balances}
          onPressCurrency={() => currencySheetRef.current?.present()}
          onPressDeposit={() => depositSheetRef.current?.present()}
          onPressWithdraw={() => {
            const ngnBalance = summary.balances.find((balance) => balance.code === "NGN")?.amount ?? 0;
            router.push({ pathname: "/withdraw/bank-transfer", params: { balance: String(ngnBalance) } });
          }}
        />

        <View className="w-full gap-4">
          <KycCard percentage={summary.kycPercentage} />
          <UtilityBillsCard icon={summary.utilityBillsIcon} />
          <PromoCarousel slides={summary.carouselSlides} />
        </View>

        <RecentTransactionsCard />
      </ScrollView>

      <CurrencySelectSheet
        sheetRef={currencySheetRef}
        balances={summary.balances}
        selectedCode={currency}
        onSelect={(code: CurrencyCode) => setCurrency(code)}
      />

      <DepositSheet
        sheetRef={depositSheetRef}
        onSelectBankTransfer={() => {
          depositSheetRef.current?.dismiss();
          router.push("/deposit/bank-transfer");
        }}
        onSelectCryptoDeposit={() => {
          depositSheetRef.current?.dismiss();
          router.push("/deposit/crypto");
        }}
      />
    </SafeAreaView>
  );
}
