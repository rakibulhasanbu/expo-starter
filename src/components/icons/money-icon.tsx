import Svg, { Path } from "react-native-svg";
import { useThemeColor } from "@/lib/theme-colors";

type MoneyIconProps = {
  size?: number;
  color?: string;
};

export function MoneyIcon({ size = 16, color: colorProp }: MoneyIconProps) {
  const themeColor = useThemeColor("foreground");
  const color = colorProp ?? themeColor;
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M11.3335 13.6663H4.66683C2.66683 13.6663 1.3335 12.6663 1.3335 10.333V5.66634C1.3335 3.33301 2.66683 2.33301 4.66683 2.33301H11.3335C13.3335 2.33301 14.6668 3.33301 14.6668 5.66634V10.333C14.6668 12.6663 13.3335 13.6663 11.3335 13.6663Z"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.3335 6.00033H2.00016C4.00016 6.00033 4.66683 5.33366 4.66683 3.33366V2.66699"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.6668 6.00033H14.0002C12.0002 6.00033 11.3335 5.33366 11.3335 3.33366V2.66699"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.3335 10H2.00016C4.00016 10 4.66683 10.6667 4.66683 12.6667V13.3333"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.6668 10H14.0002C12.0002 10 11.3335 10.6667 11.3335 12.6667V13.3333"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
