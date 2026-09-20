import { View } from "react-native";

import { Skeleton } from "@/components/skeleton";

function CryptoDepositAddressSkeleton() {
  return (
    <View className="gap-4 px-5 pt-6">
      <View className="gap-4 rounded-2xl bg-secondary p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <View className="gap-1.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-2.5 w-12" />
            </View>
          </View>
          <Skeleton className="size-10 rounded-full" />
          <View className="gap-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-2.5 w-10" />
          </View>
        </View>
        <Skeleton className="h-3 w-full" />
      </View>

      <Skeleton className="h-24 w-full rounded-lg" />

      <View className="items-center gap-6 rounded-2xl bg-secondary px-12 py-8">
        <Skeleton className="size-56 rounded-2xl" />
        <Skeleton className="h-3 w-48" />
      </View>
    </View>
  );
}

export { CryptoDepositAddressSkeleton };
