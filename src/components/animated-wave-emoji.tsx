import { useEffect } from "react";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type AnimatedWaveEmojiProps = {
  emoji?: string;
  className?: string;
};

export function AnimatedWaveEmoji({ emoji = "👋", className }: AnimatedWaveEmojiProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(20, { duration: 150 }),
        withTiming(-10, { duration: 150 }),
        withTiming(20, { duration: 150 }),
        withTiming(0, { duration: 150 }),
        withTiming(0, { duration: 1600 })
      ),
      -1,
      true
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.Text className={className} style={animatedStyle}>
      {emoji}
    </Animated.Text>
  );
}
