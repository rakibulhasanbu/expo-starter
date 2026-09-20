import { FeeInfoCard } from "@/features/card/components/fee-info-card";
import { CARD_FEE_INFO } from "@/features/card/data";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { Text } from "@/components/text";

export default function VirtualCardInfoScreen() {
  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="flex-row items-center px-5 pt-10">
        <BackButton fallbackHref="/(protected)/(tabs)/card" />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, gap: 16 }}>
        <Text className="font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
          Card Information & Fee
        </Text>

        <View className="gap-3">
          {CARD_FEE_INFO.map((item) => (
            <FeeInfoCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>

      <View className="px-5 pb-2 pt-2">
        <Button size="xl" onPress={() => router.push("/virtual-card/create")}>
          <Text>I understand, continue</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
