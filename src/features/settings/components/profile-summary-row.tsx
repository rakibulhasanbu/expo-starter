import { useCurrentUserQuery } from "@/features/auth/hooks/use-auth-queries";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

import { ArrowRightIcon } from "@/components/icons/arrow-right-icon";
import { QueryErrorView } from "@/components/query-error-view";
import { Skeleton } from "@/components/skeleton";
import { Text } from "@/components/text";
import { getErrorMessage } from "@/utils/get-error-message";

import { getAvatarSource } from "../lib/avatars";

function ProfileSummaryRowSkeleton() {
  return (
    <View className="w-full flex-row items-center gap-2 rounded-full bg-card p-3">
      <Skeleton className="size-[45px] rounded-full" />

      <View className="flex-1 gap-1.5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-2.5 w-32" />
      </View>
    </View>
  );
}

function ProfileSummaryRow() {
  const { data: user, isPending, isError, error, refetch } = useCurrentUserQuery();

  if (isPending) return <ProfileSummaryRowSkeleton />;

  if (isError) {
    return <QueryErrorView compact message={getErrorMessage(error)} onRetry={refetch} />;
  }

  const name = user.name ?? "";
  const email = user.email ?? "";
  const avatarId = user.avatarUrl ?? null;

  return (
    <Pressable
      onPress={() => router.push("/profile")}
      className="w-full flex-row items-center gap-2 rounded-full bg-card p-3 active:bg-card/70"
    >
      <Image source={getAvatarSource(avatarId)} style={{ width: 45, height: 45, borderRadius: 200 }} />

      <View className="flex-1 gap-0.5">
        <Text className="text-sm text-foreground">{name}</Text>
        <Text className="text-[10px] tracking-[0.25px] text-subtitle">{email}</Text>
      </View>

      <ArrowRightIcon size={16} />
    </Pressable>
  );
}

export { ProfileSummaryRow, ProfileSummaryRowSkeleton };
