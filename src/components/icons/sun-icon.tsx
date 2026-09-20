import Svg, { Path } from "react-native-svg";

type SunIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export function SunIcon({ size = 16, color, className = "text-foreground" }: SunIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <Path
        d="M8 11.3333C9.84095 11.3333 11.3333 9.84095 11.3333 8C11.3333 6.15905 9.84095 4.66667 8 4.66667C6.15905 4.66667 4.66667 6.15905 4.66667 8C4.66667 9.84095 6.15905 11.3333 8 11.3333Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 1.33333V2.66667M8 13.3333V14.6667M2.66667 8H1.33333M14.6667 8H13.3333M3.05719 3.05719L4.00052 4.00052M11.9995 11.9995L12.9428 12.9428M12.9428 3.05719L11.9995 4.00052M4.00052 11.9995L3.05719 12.9428"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
