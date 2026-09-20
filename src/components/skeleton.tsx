import { type ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

import { cn } from "@/utils/cn";

type SkeletonProps = {
  className?: string;
  style?: ViewStyle;
};

function Skeleton({ className, style }: SkeletonProps) {
  const opacity = useSharedValue(1);
  opacity.value = withRepeat(withTiming(0.4, { duration: 700 }), -1, true);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return <Animated.View className={cn("rounded-md bg-muted", className)} style={[animatedStyle, style]} />;
}

export { Skeleton };
export type { SkeletonProps };
