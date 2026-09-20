import * as React from "react";

import { Pressable, type PressableProps } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

type PressableScaleProps = Omit<PressableProps, "children"> & {
  scaleTo?: number;
  children?: React.ReactNode;
};

function PressableScale({ scaleTo = 0.96, className, children, onPressIn, onPressOut, ...props }: PressableScaleProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={(event) => {
        // eslint-disable-next-line react-hooks/immutability -- Reanimated shared values are mutated via `.value` by design; this isn't render state.
        scale.value = withSpring(scaleTo, { damping: 15, stiffness: 300 });
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        // eslint-disable-next-line react-hooks/immutability -- Reanimated shared values are mutated via `.value` by design; this isn't render state.
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
        onPressOut?.(event);
      }}
      {...props}
    >
      <Animated.View className={className} style={animatedStyle}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

export { PressableScale };
export type { PressableScaleProps };
