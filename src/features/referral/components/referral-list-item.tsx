import { Image } from "expo-image";
import { View } from "react-native";

import { Text } from "@/components/text";

import { getAvatarSource } from "@/features/settings/lib/avatars";

import { cn } from "@/utils/cn";

import type { Referral } from "../types";

type ReferralListItemProps = {
  referral: Referral;
};

export function ReferralListItem({ referral }: ReferralListItemProps) {
  const isEarned = referral.status === "earned";

  return (
    <View className="w-full flex-row items-center justify-between">
      <View className="flex-row items-center gap-2">
        <Image
          source={getAvatarSource(referral.avatarId)}
          style={{ width: 32, height: 32, borderRadius: 200 }}
        />
        <Text className="text-sm text-foreground">{referral.name}</Text>
      </View>

      <View className={cn("rounded-full px-2.5 py-1", isEarned ? "bg-success/10" : "bg-muted")}>
        <Text className={cn("text-[10px] tracking-[0.25px]", isEarned ? "text-success" : "text-muted-foreground")}>
          {isEarned ? "Earned" : "Pending"}
        </Text>
      </View>
    </View>
  );
}
