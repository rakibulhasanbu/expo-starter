import { router } from "expo-router";
import { useMemo } from "react";
import { useWindowDimensions, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { VerifyBadgeIcon } from "@/components/icons/verify-badge-icon";
import { Text } from "@/components/text";

import type { CardTheme } from "@/features/card/types";
import { useCardStore } from "@/store/card-store";

const CONFETTI_COLORS: Record<CardTheme, string[]> = {
  dark: ["#FFFFFF", "#DEE0E3", "#EB001B", "#F79E1B"],
  red: ["#FFFFFF", "#F1F2F3", "#EB001B", "#F79E1B"],
  white: ["#231F20", "#98A2B3", "#EB001B", "#F79E1B"],
};

export default function CreateCardSuccessScreen() {
  const { width } = useWindowDimensions();
  const cardTheme = useCardStore((state) => state.card?.theme ?? "dark");
  const confettiColors = useMemo(() => CONFETTI_COLORS[cardTheme], [cardTheme]);

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 items-center justify-center gap-8 bg-background px-5">
      <VerifyBadgeIcon size={80} />

      <View className="w-full gap-8">
        <View className="gap-2">
          <Text className="text-center font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
            Successful
          </Text>
          <Text className="text-center text-base text-subtitle">Your virtual card creation is successful</Text>
        </View>

        <Button size="xl" onPress={() => router.dismissTo("/card")}>
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
