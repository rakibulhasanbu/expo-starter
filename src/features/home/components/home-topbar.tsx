import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

import { CustomerSupportIcon } from "@/components/icons/customer-support-icon";
import { Skeleton } from "@/components/skeleton";

import { useCurrentUserQuery } from "@/features/auth/hooks/use-auth-queries";
import { getAvatarSource } from "@/features/settings/lib/avatars";
import { presentSupport } from "@/features/support/lib/intercom";

export function HomeTopbar() {
  const { data: user, isPending } = useCurrentUserQuery();

  return (
    <View className="w-full flex-row items-center justify-between">
      <Pressable onPress={() => router.push("/profile")} hitSlop={8}>
        {isPending ? (
          <Skeleton className="size-[45px] rounded-full" />
        ) : (
          <Image
            source={getAvatarSource(user?.profileImg)}
            style={{ width: 45, height: 45, borderRadius: 200 }}
          />
        )}
      </Pressable>

      <Pressable
        className="size-[45px] items-center justify-center rounded-full bg-background"
        onPress={() => presentSupport()}
        hitSlop={8}
      >
        <CustomerSupportIcon size={20} />
      </Pressable>
    </View>
  );
}
