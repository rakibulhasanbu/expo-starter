import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import logoAnimation from "../../../../assets/json/logo-animation.json";

const EXIT_DURATION = 320;
const EXIT_SCALE = 1.06;

type AnimatedSplashProps = {
  visible: boolean;
  onLayout: () => void;
  onAnimationFinish: () => void;
  onExitComplete: () => void;
};

export function AnimatedSplash({ visible, onLayout, onAnimationFinish, onExitComplete }: AnimatedSplashProps) {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (visible) return;

    opacity.value = withTiming(0, { duration: EXIT_DURATION, easing: Easing.out(Easing.cubic) });
    scale.value = withTiming(EXIT_SCALE, { duration: EXIT_DURATION, easing: Easing.out(Easing.cubic) }, (finished) => {
      if (finished) runOnJS(onExitComplete)();
    });
  }, [visible, opacity, scale, onExitComplete]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      className="bg-background items-center justify-center"
      style={[StyleSheet.absoluteFill, animatedStyle]}
      pointerEvents={visible ? "auto" : "none"}
      onLayout={onLayout}
    >
      <LottieView
        source={logoAnimation}
        autoPlay
        loop={false}
        resizeMode="contain"
        style={{ width: "70%", height: "70%" }}
        onAnimationFinish={(isCancelled) => {
          if (!isCancelled) onAnimationFinish();
        }}
      />
    </Animated.View>
  );
}
