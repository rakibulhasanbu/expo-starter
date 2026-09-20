import Svg, { Path } from "react-native-svg";

type ReceiptIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export function ReceiptIcon({ size = 20, color, className = "text-foreground" }: ReceiptIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <Path
        d="M4.48667 13.1333C5.03333 12.5467 5.86667 12.5933 6.34667 13.2333L7.02 14.1333C7.56 14.8467 8.43333 14.8467 8.97333 14.1333L9.64667 13.2333C10.1267 12.5933 10.96 12.5467 11.5067 13.1333C12.6933 14.4 13.66 13.98 13.66 12.2067V4.69333C13.6667 2.00667 13.04 1.33333 10.52 1.33333H5.48C2.96 1.33333 2.33333 2.00667 2.33333 4.69333V12.2C2.33333 13.98 3.30667 14.3933 4.48667 13.1333Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M5.33333 4.66667H10.6667" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6 7.33333H10" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
