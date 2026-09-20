import Svg, { Path } from "react-native-svg";

type MoreIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export function MoreIcon({ size = 24, color, className = "text-foreground" }: MoreIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <Path
        d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
      />
      <Path
        d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
      />
      <Path
        d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
      />
    </Svg>
  );
}
