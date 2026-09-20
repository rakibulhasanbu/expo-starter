import { View } from "react-native";

import { Skeleton } from "@/components/skeleton";

function RateCalculatorSkeleton() {
  return (
    <View className="w-full gap-4 rounded-3xl bg-secondary p-2">
      <View className="w-full flex-row items-center justify-between rounded-2xl bg-background p-4">
        <View className="gap-4">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-6 w-16" />
        </View>
        <Skeleton className="h-8 w-20 rounded-full" />
      </View>

      <View className="w-full flex-row items-center justify-between rounded-2xl bg-background p-4">
        <View className="gap-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-6 w-16" />
        </View>
        <Skeleton className="h-8 w-24 rounded-full" />
      </View>

      <View className="gap-2 px-4">
        <View className="w-full flex-row items-center justify-between">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-14" />
        </View>
        <View className="w-full flex-row items-center justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-28" />
        </View>
      </View>

      <View className="w-full flex-row items-center justify-between rounded-2xl bg-background p-4">
        <View className="gap-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-6 w-16" />
        </View>
        <Skeleton className="h-8 w-20 rounded-full" />
      </View>
    </View>
  );
}

export { RateCalculatorSkeleton };
