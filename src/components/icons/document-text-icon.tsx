import Svg, { Path } from "react-native-svg";

type DocumentTextIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export function DocumentTextIcon({ size = 20, color, className = "text-foreground" }: DocumentTextIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <Path
        d="M14 4.66667V11.3333C14 13.3333 13 14.6667 10.6667 14.6667H5.33333C3 14.6667 2 13.3333 2 11.3333V4.66667C2 2.66667 3 1.33333 5.33333 1.33333H10.6667C13 1.33333 14 2.66667 14 4.66667Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.66667 3V4.33333C9.66667 5.06667 10.2667 5.66667 11 5.66667H12.3333"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M5.33333 8.66667H8" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5.33333 11.3333H10.6667" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
