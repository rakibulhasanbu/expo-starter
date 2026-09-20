import { Fragment } from "react";
import { View } from "react-native";

import { Skeleton } from "@/components/skeleton";

const SKELETON_ROW_COUNT = 6;

function TransactionsListSkeleton() {
  return (
    <View className="flex-1 rounded-3xl bg-background p-4">
      {Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
        <Fragment key={index}>
          {index > 0 ? <View className="my-3 h-px w-full bg-border" /> : null}
          <View className="w-full flex-row items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <View className="flex-1 gap-1.5">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-2.5 w-24" />
            </View>
            <Skeleton className="h-3 w-16" />
          </View>
        </Fragment>
      ))}
    </View>
  );
}

export { TransactionsListSkeleton };
