import Svg, { Path } from "react-native-svg";

type GiftIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export function GiftIcon({ size = 20, color, className = "text-foreground" }: GiftIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <Path
        d="M13.3133 6.66667H2.64667V12C2.64667 14 3.31333 14.6667 5.31333 14.6667H10.6467C12.6467 14.6667 13.3133 14 13.3133 12V6.66667Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.3333 4.66667V5.33333C14.3333 6.06667 13.98 6.66667 13 6.66667H3C1.98 6.66667 1.66667 6.06667 1.66667 5.33333V4.66667C1.66667 3.93333 1.98 3.33333 3 3.33333H13C13.98 3.33333 14.3333 3.93333 14.3333 4.66667Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.76 3.33333H4.08C3.85333 3.08667 3.86 2.70667 4.1 2.46667L5.04667 1.52C5.29333 1.27333 5.7 1.27333 5.94667 1.52L7.76 3.33333Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.9133 3.33333H8.23333L10.0467 1.52C10.2933 1.27333 10.7 1.27333 10.9467 1.52L11.8933 2.46667C12.1333 2.70667 12.14 3.08667 11.9133 3.33333Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.96 6.66667V10.0933C5.96 10.6267 6.54667 10.94 6.99333 10.6533L7.62 10.24C7.84667 10.0933 8.13333 10.0933 8.35333 10.24L8.94667 10.64C9.38667 10.9333 9.98 10.62 9.98 10.0867V6.66667H5.96Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
