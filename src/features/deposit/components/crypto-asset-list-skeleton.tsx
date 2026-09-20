import { View } from "react-native";

import { Skeleton } from "@/components/skeleton";

const SKELETON_ROW_COUNT = 6;

function CryptoAssetListSkeleton() {
  return (
    <View className="gap-8">
      {Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
        <View key={index} className="flex-row items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <View className="gap-1.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-2.5 w-12" />
          </View>
        </View>
      ))}
    </View>
  );
}

export { CryptoAssetListSkeleton };
