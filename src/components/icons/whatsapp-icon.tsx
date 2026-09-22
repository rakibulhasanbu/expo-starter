import Svg, { Path } from "react-native-svg";

type WhatsappIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export function WhatsappIcon({ size = 20, color, className = "text-foreground" }: WhatsappIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <Path
        d="M3.5 20.5L4.83 15.67C3.98 14.2 3.53 12.53 3.53 10.82C3.54 5.4 8.04 1 13.62 1C16.33 1 18.87 2.03 20.78 3.91C22.68 5.79 23.73 8.31 23.72 10.98C23.72 16.4 19.21 20.8 13.63 20.8H13.63C11.97 20.8 10.34 20.39 8.89 19.62L3.5 20.5Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.87 6.66C9.68 6.24 9.48 6.23 9.3 6.22C9.15 6.21 8.98 6.21 8.81 6.21C8.64 6.21 8.36 6.28 8.13 6.52C7.9 6.77 7.24 7.38 7.24 8.62C7.24 9.86 8.15 11.06 8.28 11.23C8.41 11.4 10.06 14.07 12.68 15.1C14.85 15.96 15.29 15.79 15.76 15.75C16.23 15.71 17.27 15.13 17.49 14.53C17.71 13.93 17.71 13.42 17.64 13.31C17.58 13.2 17.41 13.14 17.15 13.01C16.89 12.88 15.63 12.26 15.4 12.18C15.16 12.09 14.99 12.05 14.82 12.31C14.65 12.57 14.16 13.14 14.01 13.31C13.87 13.49 13.72 13.51 13.46 13.38C13.2 13.25 12.38 12.98 11.41 12.11C10.65 11.44 10.14 10.6 10 10.34C9.85 10.08 9.98 9.94 10.11 9.81C10.23 9.69 10.37 9.5 10.5 9.35C10.63 9.2 10.68 9.1 10.76 8.93C10.85 8.76 10.81 8.61 10.75 8.48C10.68 8.36 10.19 7.1 9.87 6.66Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
