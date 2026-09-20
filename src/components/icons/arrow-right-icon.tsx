import Svg, { Path } from "react-native-svg";

type ArrowRightIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export function ArrowRightIcon({ size = 16, color, className = "text-foreground" }: ArrowRightIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <Path
        d="M5.94 13.28L10.2867 8.93333C10.8 8.42 10.8 7.58 10.2867 7.06667L5.94 2.72"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
