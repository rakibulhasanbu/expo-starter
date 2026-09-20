import Svg, { Path } from "react-native-svg";

type LockIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export function LockIcon({ size = 20, color, className = "text-foreground" }: LockIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <Path
        d="M4 6.66667V5.33333C4 3.12667 4.66667 1.33333 8 1.33333C11.3333 1.33333 12 3.12667 12 5.33333V6.66667"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.3333 14.6667H4.66667C2 14.6667 1.33333 14 1.33333 11.3333V10C1.33333 7.33333 2 6.66667 4.66667 6.66667H11.3333C14 6.66667 14.6667 7.33333 14.6667 10V11.3333C14.6667 14 14 14.6667 11.3333 14.6667Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M10.6643 10.6667H10.6703" stroke={color ?? "currentColor"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M7.99699 10.6667H8.00298" stroke={color ?? "currentColor"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5.32967 10.6667H5.33566" stroke={color ?? "currentColor"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
