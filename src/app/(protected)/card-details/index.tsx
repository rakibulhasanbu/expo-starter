import { Alert, ScrollView, Share, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { Text } from "@/components/text";

import { CopyableDetailRow } from "@/features/card/components/copyable-detail-row";

import { useCardStore } from "@/store/card-store";
import { safeBack } from "@/utils/safe-back";

const CARD_FALLBACK_HREF = "/(protected)/(tabs)/card" as const;

export default function CardDetailsScreen() {
  const card = useCardStore((state) => state.card);

  const handleShare = async () => {
    if (!card) return;

    try {
      await Share.share({
        message: [
          `Card Name: ${card.holderName}`,
          `Card Number: ${card.cardNumber}`,
          `CVV: ${card.cvv}`,
          `Billing Address: ${card.billingAddress}`,
          `Expiry Date: ${card.expiryDate}`,
          `Zip Code: ${card.zipCode}`,
        ].join("\n"),
      });
    } catch {
      Alert.alert("Something went wrong", "Could not share card details. Please try again.");
    }
  };

  if (!card) {
    return (
      <View className="flex-1 items-center justify-center gap-2 bg-secondary px-6">
        <Text className="text-center text-muted-foreground">No card found.</Text>
        <Button variant="outline" onPress={() => safeBack(CARD_FALLBACK_HREF)}>
          <Text>Go back</Text>
        </Button>
      </View>
    );
  }

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="flex-row items-center px-5 pt-2">
        <BackButton fallbackHref={CARD_FALLBACK_HREF} />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 24, gap: 24 }}>
        <Text className="font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">Card Details</Text>

        <View className="gap-2 rounded-[20px] bg-secondary p-2">
          <View className="gap-4 rounded-2xl bg-background px-4 py-4">
            <CopyableDetailRow label="Card Name" value={card.holderName} />
            <View className="h-px w-full bg-border" />
            <CopyableDetailRow label="Card Number" value={card.cardNumber} />
            <View className="h-px w-full bg-border" />
            <CopyableDetailRow label="CVV" value={card.cvv} />
            <View className="h-px w-full bg-border" />
            <CopyableDetailRow label="Billing Address" value={card.billingAddress} />
            <View className="h-px w-full bg-border" />
            <CopyableDetailRow label="Expiry Date" value={card.expiryDate} />
            <View className="h-px w-full bg-border" />
            <CopyableDetailRow label="Zip Code" value={card.zipCode} />
          </View>
        </View>
      </ScrollView>

      <View className="px-5 pb-2 pt-2">
        <Button size="xl" onPress={handleShare}>
          <Text>Share details</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
