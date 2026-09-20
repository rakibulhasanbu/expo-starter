import { View } from "react-native";

import { Skeleton } from "@/components/skeleton";

function HomeSkeleton() {
  return (
    <View className="flex-1 gap-6 bg-secondary px-5 pb-40 pt-2">
      <View className="w-full flex-row items-center justify-between">
        <Skeleton className="size-[45px] rounded-full" />
        <Skeleton className="size-[45px] rounded-full" />
      </View>

      <Skeleton className="h-40 w-full rounded-3xl" />

      <View className="w-full gap-4">
        <Skeleton className="h-16 w-full rounded-2xl" />
        <Skeleton className="h-16 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </View>

      <View className="w-full gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-40 w-full rounded-2xl" />
      </View>
    </View>
  );
}

export { HomeSkeleton };
