import { View } from "react-native";

import { Text } from "@/components/text";

export function ReferralEmptyState() {
  return (
    <View className="h-[145px] w-full items-center justify-center rounded-2xl border border-secondary">
      <Text className="text-sm text-foreground">No referral yet</Text>
    </View>
  );
}
