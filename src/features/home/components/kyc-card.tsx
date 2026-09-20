import { View } from "react-native";

import { Text } from "@/components/text";

import { KycProgressRing } from "./kyc-progress-ring";

type KycCardProps = {
  percentage: number;
};

export function KycCard({ percentage }: KycCardProps) {
  return (
    <View className="w-full flex-row items-center gap-3 rounded-2xl bg-background px-4 py-3">
      <View className="flex-1 gap-2">
        <Text className="font-urbanist-bold text-base text-foreground">Complete your KYC</Text>
        <Text className="text-xs tracking-[0.15px] text-subtitle">
          Kindly verify your identity to explore more dolo features.
        </Text>
      </View>

      <KycProgressRing percentage={percentage} />
    </View>
  );
}
