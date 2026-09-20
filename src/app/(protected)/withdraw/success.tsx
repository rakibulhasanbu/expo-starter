import { router, useLocalSearchParams } from "expo-router";
import { useWindowDimensions, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { VerifyBadgeIcon } from "@/components/icons/verify-badge-icon";
import { Text } from "@/components/text";
import { useConfettiColors } from "@/lib/theme-colors";

import { formatUsdBalance } from "@/features/card/utils/format-usd-balance";

export default function WithdrawSuccessScreen() {
  const confettiColors = useConfettiColors();
  const { usdWithdrawn, transactionId } = useLocalSearchParams<{ usdWithdrawn: string; transactionId: string }>();
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 items-center justify-center gap-8 bg-background px-5">
      <VerifyBadgeIcon size={80} />

      <View className="w-full gap-8">
        <View className="gap-2">
          <Text className="text-center font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
            Withdrawal Successful
          </Text>
          <Text className="text-center text-base text-subtitle">
            {formatUsdBalance(Number(usdWithdrawn))} has been deducted from your virtual card to get equivalent in
            your Naira wallet.
          </Text>
        </View>

        <View className="gap-2">
          <Button size="xl" onPress={() => router.dismissTo("/card")}>
            <Text>Done</Text>
          </Button>
          <Button size="xl" variant="secondary" onPress={() => router.push(`/transactions/${transactionId}`)}>
            <Text>View receipt</Text>
          </Button>
        </View>
      </View>

      <View pointerEvents="none" className="absolute inset-0">
        <ConfettiCannon
          count={140}
          origin={{ x: width / 2, y: -20 }}
          colors={confettiColors}
          fadeOut
          autoStart
          fallSpeed={2800}
        />
      </View>
    </SafeAreaView>
  );
}
