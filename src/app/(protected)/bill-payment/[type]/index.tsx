import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { BackButton } from "@/components/back-button";
import { ComingSoonScreen } from "@/components/coming-soon";

import { billCategories } from "@/features/bill-payment/data";

export default function BillCategoryScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const category = billCategories.find((item) => item.id === type);

  return (
    <View className="flex-1 bg-background">
      <View className="px-5 pt-16">
        <BackButton fallbackHref="/(protected)/bill-payment" />
      </View>

      <View className="flex-1">
        <ComingSoonScreen
          title={category?.label ?? "Bill Payment"}
          subtitle={`${category?.label ?? "This"} payments are coming soon.`}
        />
      </View>
    </View>
  );
}
