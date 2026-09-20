import Svg, { Path } from "react-native-svg";

type CalculatorIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export function CalculatorIcon({ size = 16, color, className = "text-foreground" }: CalculatorIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <Path
        d="M6.66667 14.6667H9.33333C12.6667 14.6667 14 13.3333 14 10V6C14 2.66667 12.6667 1.33333 9.33333 1.33333H6.66667C3.33333 1.33333 2 2.66667 2 6V10C2 13.3333 3.33333 14.6667 6.66667 14.6667Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 5.05333V5.72C11 6.26667 10.5533 6.72 10 6.72H6C5.45333 6.72 5 6.27333 5 5.72V5.05333C5 4.50667 5.44667 4.05333 6 4.05333H10C10.5533 4.05333 11 4.5 11 5.05333Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M5.42408 9.33333H5.43178" stroke={color ?? "currentColor"} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M7.99682 9.33333H8.00452" stroke={color ?? "currentColor"} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10.5696 9.33333H10.5773" stroke={color ?? "currentColor"} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5.42408 11.6667H5.43178" stroke={color ?? "currentColor"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M7.99682 11.6667H8.00452" stroke={color ?? "currentColor"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10.5696 11.6667H10.5773" stroke={color ?? "currentColor"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
