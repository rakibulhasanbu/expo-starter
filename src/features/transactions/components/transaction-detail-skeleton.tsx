import { View } from "react-native";

import { Skeleton } from "@/components/skeleton";

function TransactionDetailSkeleton() {
  return (
    <View className="w-full items-center py-6">
      <View className="items-center gap-4 py-6">
        <Skeleton className="size-[67px] rounded-full" />
        <View className="items-center gap-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-20" />
        </View>
      </View>

      <View className="w-full gap-4 rounded-t-3xl bg-background px-4 py-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <View key={index} className="flex-row items-center justify-between gap-3">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3.5 w-32" />
          </View>
        ))}
      </View>
    </View>
  );
}

export { TransactionDetailSkeleton };
