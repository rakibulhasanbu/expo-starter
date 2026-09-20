import { router } from "expo-router";
import { useWindowDimensions, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { VerifyBadgeIcon } from "@/components/icons/verify-badge-icon";
import { Text } from "@/components/text";
import { useConfettiColors } from "@/lib/theme-colors";

export default function BankTransferBvnSuccessScreen() {
  const confettiColors = useConfettiColors();
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 items-center justify-center gap-8 bg-background px-5">
      <VerifyBadgeIcon size={80} />

      <View className="w-full gap-8">
        <Text className="text-center font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
          BVN Verified Successfully
        </Text>

        <Button size="xl" onPress={() => router.replace("/deposit/bank-transfer/details")}>
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
