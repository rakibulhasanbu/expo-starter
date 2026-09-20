import Svg, { Path } from "react-native-svg";
import { useThemeColor } from "@/lib/theme-colors";

type AddIconProps = {
  size?: number;
  color?: string;
};

export function AddIcon({ size = 20, color: colorProp }: AddIconProps) {
  const themeColor = useThemeColor("primary");
  const color = colorProp ?? themeColor;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 12H18" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12 18V6" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
