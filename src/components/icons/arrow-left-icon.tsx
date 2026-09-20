import Svg, { Path } from "react-native-svg";
import { useThemeColor } from "@/lib/theme-colors";

type ArrowLeftIconProps = {
  size?: number;
  color?: string;
};

export function ArrowLeftIcon({ size = 20, color: colorProp }: ArrowLeftIconProps) {
  const themeColor = useThemeColor("primary");
  const color = colorProp ?? themeColor;
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M7.975 4.94167L2.91667 10L7.975 15.0583"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.0833 10H3.05833"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
