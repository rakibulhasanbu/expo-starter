import { View } from "react-native";

import { Skeleton } from "@/components/skeleton";

function ProfileFormSkeleton() {
  return (
    <View className="gap-8 px-5 pb-8 pt-10">
      <View className="flex-row items-center gap-4">
        <Skeleton className="size-[60px] rounded-full" />
        <Skeleton className="h-9 w-20 rounded-full" />
      </View>

      <View className="gap-4">
        <View className="gap-1.5">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-12 rounded-full" />
        </View>

        <View className="gap-1.5">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-12 rounded-full" />
        </View>

        <View className="gap-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-[52px] rounded-full" />
        </View>

        <View className="gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-[52px] rounded-full" />
        </View>
      </View>
    </View>
  );
}

export { ProfileFormSkeleton };
