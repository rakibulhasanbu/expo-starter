import { router, useLocalSearchParams } from "expo-router";
import { useWindowDimensions, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { VerifyBadgeIcon } from "@/components/icons/verify-badge-icon";
import { Text } from "@/components/text";
import { useConfettiColors } from "@/lib/theme-colors";

import { CopyableDetailRow } from "@/features/card/components/copyable-detail-row";

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

export default function ElectricitySuccessScreen() {
  const confettiColors = useConfettiColors();
  const { amount, token } = useLocalSearchParams<{ amount: string; token: string; transactionId: string }>();
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 items-center justify-center gap-8 bg-background px-5">
      <VerifyBadgeIcon size={80} />

      <View className="w-full gap-8">
        <View className="gap-2">
          <Text className="text-center font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
            Successful
          </Text>
          <Text className="text-center text-base text-subtitle">
            Your electricity purchase of {formatNaira(Number(amount))} is successful
          </Text>
        </View>

        {token ? (
          <View className="rounded-[11px] bg-secondary px-4 py-6">
            <CopyableDetailRow label="Token" value={token} />
          </View>
        ) : null}

        <Button size="xl" onPress={() => router.dismissTo("/bill-payment")}>
          <Text>Done</Text>
        </Button>
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
