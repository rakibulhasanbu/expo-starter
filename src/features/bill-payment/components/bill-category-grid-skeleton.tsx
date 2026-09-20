import { useWindowDimensions, View } from "react-native";

import { Skeleton } from "@/components/skeleton";

const SKELETON_ITEM_COUNT = 6;
const GRID_GAP = 8;
const HORIZONTAL_PADDING = 20;

function BillCategoryGridSkeleton() {
  const { width } = useWindowDimensions();
  const itemWidth = (width - HORIZONTAL_PADDING * 2 - GRID_GAP) / 2;

  return (
    <View className="w-full flex-row flex-wrap gap-2">
      {Array.from({ length: SKELETON_ITEM_COUNT }).map((_, index) => (
        <View key={index} style={{ width: itemWidth }} className="justify-center gap-4 rounded-2xl bg-secondary p-4">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </View>
      ))}
    </View>
  );
}

export { BillCategoryGridSkeleton };
