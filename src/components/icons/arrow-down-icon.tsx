import Svg, { Path } from "react-native-svg";
import { useThemeColor } from "@/lib/theme-colors";

type ArrowDownIconProps = {
  size?: number;
  color?: string;
};

export function ArrowDownIcon({ size = 20, color: colorProp }: ArrowDownIconProps) {
  const themeColor = useThemeColor("primary");
  const color = colorProp ?? themeColor;
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M16.6 7.45833L11.1667 12.8917C10.525 13.5333 9.475 13.5333 8.83333 12.8917L3.4 7.45833"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
