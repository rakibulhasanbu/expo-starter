import { View } from "react-native";

import { Skeleton } from "@/components/skeleton";

const SKELETON_ITEM_COUNT = 6;

function BrandListSkeleton() {
  return (
    <View className="w-full flex-row flex-wrap p-2">
      {Array.from({ length: SKELETON_ITEM_COUNT }).map((_, index) => (
        <View key={index} className="w-1/2 p-2">
          <View className="items-center rounded-lg border border-border bg-background p-3">
            <Skeleton className="size-24 rounded-full" />
            <Skeleton className="mt-2 h-4 w-20" />
          </View>
        </View>
      ))}
    </View>
  );
}

export { BrandListSkeleton };
