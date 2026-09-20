import Svg, { Path } from "react-native-svg";

type NotificationIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export function NotificationIcon({ size = 20, color, className = "text-foreground" }: NotificationIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <Path
        d="M8.01333 1.94C5.80667 1.94 4.01333 3.73333 4.01333 5.94V7.86667C4.01333 8.27333 3.84 8.89333 3.63333 9.24L2.86667 10.5133C2.39333 11.3 2.72 12.1733 3.58667 12.4667C6.46 13.4267 9.56 13.4267 12.4333 12.4667C13.24 12.2 13.5933 11.2467 13.1533 10.5133L12.3867 9.24C12.1867 8.89333 12.0133 8.27333 12.0133 7.86667V5.94C12.0133 3.74 10.2133 1.94 8.01333 1.94Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <Path
        d="M9.24667 2.13333C9.04 2.07333 8.82667 2.02667 8.60667 2C7.96667 1.92 7.35333 1.96667 6.78 2.13333C6.97333 1.64 7.45333 1.29333 8.01333 1.29333C8.57333 1.29333 9.05333 1.64 9.24667 2.13333Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.0133 12.7067C10.0133 13.8067 9.11333 14.7067 8.01333 14.7067C7.46667 14.7067 6.96 14.48 6.6 14.12C6.24 13.76 6.01333 13.2533 6.01333 12.7067"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
    </Svg>
  );
}
