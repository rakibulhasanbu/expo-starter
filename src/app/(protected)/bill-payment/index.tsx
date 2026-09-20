import { BillCategoryGridItem } from "@/features/bill-payment/components/bill-category-grid-item";
import { BillCategoryGridSkeleton } from "@/features/bill-payment/components/bill-category-grid-skeleton";
import { useBillCategoriesQuery } from "@/features/bill-payment/hooks/use-bill-payment-queries";
import { getErrorMessage } from "@/utils/get-error-message";
import { router, type Href } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { QueryErrorView } from "@/components/query-error-view";
import { Text } from "@/components/text";

export default function BillPaymentScreen() {
  const { data: categories, isPending, isError, error, refetch } = useBillCategoriesQuery();

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <View className="px-5 pt-10">
        <BackButton fallbackHref="/(protected)/(tabs)/home" />
      </View>

      <ScrollView contentContainerClassName="gap-6 px-5 pb-8 pt-6" showsVerticalScrollIndicator={false}>
        <Text variant="h4" className="tracking-[-0.25px]">
          Bill Payment
        </Text>

        {isPending ? (
          <BillCategoryGridSkeleton />
        ) : isError ? (
          <QueryErrorView message={getErrorMessage(error)} onRetry={refetch} />
        ) : (
          <View className="w-full flex-row flex-wrap gap-2">
            {(categories ?? []).map((category) => (
              <BillCategoryGridItem
                key={category.id}
                category={category}
                onPress={() => router.push(`/bill-payment/${category.id}` as Href)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
