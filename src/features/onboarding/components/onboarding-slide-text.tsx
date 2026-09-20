import { StyleSheet } from "react-native";
import Animated, { Extrapolation, interpolate, useAnimatedStyle, type SharedValue } from "react-native-reanimated";

import { Text } from "@/components/text";
import type { OnboardingSlide } from "@/features/onboarding/types";

type OnboardingSlideTextProps = {
  slide: OnboardingSlide;
  index: number;
  count: number;
  progress: SharedValue<number>;
};

export function OnboardingSlideText({ slide, index, count, progress }: OnboardingSlideTextProps) {
  const animatedStyle = useAnimatedStyle(() => {
    // Same circular-distance trick as the pagination dots: progress drifts
    // unbounded across autoplay loops, so wrap it before measuring how close
    // this slide is to being the active one.
    const rawDistance = progress.value - index;
    const wrapped = ((rawDistance % count) + count) % count;
    const circularDistance = wrapped > count / 2 ? wrapped - count : wrapped;

    const opacity = interpolate(circularDistance, [-0.5, 0, 0.5], [0, 1, 0], Extrapolation.CLAMP);
    const translateY = interpolate(circularDistance, [-0.5, 0, 0.5], [12, 0, -12], Extrapolation.CLAMP);

    return { opacity, transform: [{ translateY }] };
  });

  return (
    <Animated.View
      className="items-center justify-center gap-2"
      style={[StyleSheet.absoluteFill, animatedStyle]}
    >
      <Text
        numberOfLines={2}
        className="text-center text-[32px] font-urbanist-bold leading-[36px] tracking-[-0.5px] text-foreground"
      >
        {slide.title}
      </Text>
      <Text numberOfLines={2} className="text-center text-base leading-5 text-muted-foreground">
        {slide.description}
      </Text>
    </Animated.View>
  );
}
