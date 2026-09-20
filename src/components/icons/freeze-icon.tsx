import Svg, { Path } from "react-native-svg";

type FreezeIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export function FreezeIcon({ size = 20, color, className = "text-foreground" }: FreezeIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className}>
      <Path d="M10 7.08333V2.5" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10 17.5003V12.917" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8.33325 2.5H11.6666" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8.33325 17.5H11.6666" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M7.47497 8.54167L3.5083 6.25" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M16.4916 13.7497L12.5249 11.458" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M2.67505 7.69192L4.34172 4.80859" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M15.6584 15.1919L17.3251 12.3086" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M12.9166 9.99967C12.9166 10.533 12.7749 11.0247 12.5249 11.458C12.0166 12.333 11.0749 12.9163 9.99992 12.9163C8.92492 12.9163 7.98325 12.333 7.47492 11.458C7.22492 11.0247 7.08325 10.533 7.08325 9.99967C7.08325 9.46634 7.22492 8.97467 7.47492 8.54134C7.98325 7.66634 8.92492 7.08301 9.99992 7.08301C11.0749 7.08301 12.0166 7.66634 12.5249 8.54134C12.7749 8.97467 12.9166 9.46634 12.9166 9.99967Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M16.4916 6.25L12.5249 8.54167" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M7.47497 11.458L3.5083 13.7497" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M17.3251 7.69192L15.6584 4.80859" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M4.34172 15.1919L2.67505 12.3086" stroke={color ?? "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
