import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { Text } from "@/components/text";

type KycProgressRingProps = {
  percentage: number;
  size?: number;
};

export function KycProgressRing({ percentage, size = 45 }: KycProgressRingProps) {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percentage));
  const dashOffset = circumference - (clamped / 100) * circumference;
  const center = size / 2;

  return (
    <View style={{ width: size, height: size }} className="items-center justify-center">
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Circle cx={center} cy={center} r={radius} className="text-muted" strokeWidth={strokeWidth} fill="none" />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          className="text-foreground"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          fill="none"
          rotation={-90}
          origin={`${center}, ${center}`}
        />
      </Svg>
      <Text className="text-xs tracking-[0.15px] text-foreground">{clamped}%</Text>
    </View>
  );
}
