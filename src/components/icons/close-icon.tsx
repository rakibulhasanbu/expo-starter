import Svg, { Path } from "react-native-svg";
import { useThemeColor } from "@/lib/theme-colors";

type CloseIconProps = {
  size?: number;
  color?: string;
};

export function CloseIcon({ size = 16, color: colorProp }: CloseIconProps) {
  const themeColor = useThemeColor("primary");
  const color = colorProp ?? themeColor;
  return (
    <Svg width={size} height={size} viewBox="0 0 15.6 15.6" fill="none">
      <Path
        d="M0.8 14.8L7.80002 7.80003M7.80002 7.80003L14.8 0.8M7.80002 7.80003L0.8 0.8M7.80002 7.80003L14.8 14.8"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
