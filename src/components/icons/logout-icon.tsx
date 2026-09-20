import Svg, { Path } from "react-native-svg";

type LogoutIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export function LogoutIcon({ size = 20, color, className = "text-foreground" }: LogoutIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <Path
        d="M5.93333 5.04C6.14 2.64 7.37333 1.66 10.0733 1.66H10.16C13.14 1.66 14.3333 2.85333 14.3333 5.83333V10.18C14.3333 13.16 13.14 14.3533 10.16 14.3533H10.0733C7.39333 14.3533 6.16 13.3867 5.94 11.0267"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M10 8H2.41333" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M3.9 5.76667L1.66667 8L3.9 10.2333"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
