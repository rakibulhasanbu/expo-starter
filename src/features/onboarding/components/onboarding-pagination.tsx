import { View } from "react-native";
import Animated, { Extrapolation, interpolate, useAnimatedStyle, type SharedValue } from "react-native-reanimated";

const DOT_SIZE = 8;
const ACTIVE_DOT_WIDTH = 36;
const GAP = 8;

type PaginationDotProps = {
  index: number;
  progress: SharedValue<number>;
  count: number;
};

function PaginationDot({ index, progress, count }: PaginationDotProps) {
  const animatedStyle = useAnimatedStyle(() => {
    // `progress.value` drifts unbounded across autoplay loops (never wraps to
    // [0, count)), so distance to this dot must be computed circularly —
    // otherwise every dot falls outside its interpolation range after the
    // first loop and all render inactive simultaneously.
    const rawDistance = progress.value - index;
    const wrapped = ((rawDistance % count) + count) % count;
    const circularDistance = wrapped > count / 2 ? wrapped - count : wrapped;

    const width = interpolate(
      circularDistance,
      [-1, 0, 1],
      [DOT_SIZE, ACTIVE_DOT_WIDTH, DOT_SIZE],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(circularDistance, [-1, 0, 1], [0.3, 1, 0.3], Extrapolation.CLAMP);

    return { width, opacity };
  });

  return <Animated.View className="bg-primary" style={[{ height: DOT_SIZE, borderRadius: DOT_SIZE / 2 }, animatedStyle]} />;
}

type OnboardingPaginationProps = {
  progress: SharedValue<number>;
  count: number;
};

export function OnboardingPagination({ progress, count }: OnboardingPaginationProps) {
  return (
    <View className="flex-row items-center" style={{ gap: GAP }}>
      {Array.from({ length: count }).map((_, index) => (
        <PaginationDot key={index} index={index} progress={progress} count={count} />
      ))}
    </View>
  );
}
