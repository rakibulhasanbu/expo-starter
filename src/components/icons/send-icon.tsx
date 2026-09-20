import Svg, { Path } from "react-native-svg";
import { useThemeColor } from "@/lib/theme-colors";

type SendIconProps = {
  size?: number;
  color?: string;
};

export function SendIcon({ size = 20, color: colorProp }: SendIconProps) {
  const themeColor = useThemeColor("primary");
  const color = colorProp ?? themeColor;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7.4 6.32L15.89 3.49C19.7 2.22 21.77 4.3 20.51 8.11L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.92 14.08L7.4 13.24C1.69 11.34 1.69 8.23 7.4 6.32Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M10.11 13.65L13.69 10.06" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
