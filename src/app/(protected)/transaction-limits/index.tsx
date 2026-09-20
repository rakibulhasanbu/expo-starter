import { TransactionLimitCard } from "@/features/settings/components/transaction-limit-card";
import { TRANSACTION_LIMITS } from "@/features/settings/data";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { Text } from "@/components/text";

export default function TransactionLimitsScreen() {
  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="px-5 pt-10">
        <BackButton
          className="size-[45px] items-center justify-center rounded-full bg-secondary"
          fallbackHref="/(protected)/(tabs)/settings"
        />
      </View>

      <ScrollView contentContainerClassName="gap-6 px-5 pb-8 pt-10" showsVerticalScrollIndicator={false}>
        <Text className="font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
          Transaction Limits
        </Text>

        <View className="w-full gap-6">
          {TRANSACTION_LIMITS.map((limit) => (
            <TransactionLimitCard key={limit.id} limit={limit} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
