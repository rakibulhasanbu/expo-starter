import Svg, { Path } from "react-native-svg";

type InfoCircleIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export function InfoCircleIcon({ size = 20, color, className = "text-foreground" }: InfoCircleIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <Path
        d="M8 14.6667C11.6667 14.6667 14.6667 11.6667 14.6667 8C14.6667 4.33333 11.6667 1.33333 8 1.33333C4.33333 1.33333 1.33333 4.33333 1.33333 8C1.33333 11.6667 4.33333 14.6667 8 14.6667Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M8 5.33333V8.66667" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M7.99634 10.6667H8.00233" stroke={color ?? "currentColor"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
