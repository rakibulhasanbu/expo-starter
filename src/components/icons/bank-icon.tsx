import Svg, { Path } from "react-native-svg";
import { useThemeColor } from "@/lib/theme-colors";

type BankIconProps = {
  size?: number;
  color?: string;
};

export function BankIcon({ size = 20, color: colorProp }: BankIconProps) {
  const themeColor = useThemeColor("foreground");
  const color = colorProp ?? themeColor;
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10.3083 1.79169L17.8083 4.79167C18.1 4.90834 18.3333 5.25833 18.3333 5.56666V8.33334C18.3333 8.79167 17.9583 9.16667 17.5 9.16667H2.5C2.04167 9.16667 1.66667 8.79167 1.66667 8.33334V5.56666C1.66667 5.25833 1.9 4.90834 2.19167 4.79167L9.69167 1.79169C9.85834 1.72502 10.1417 1.72502 10.3083 1.79169Z"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.3333 18.3333H1.66667V15.8333C1.66667 15.375 2.04167 15 2.5 15H17.5C17.9583 15 18.3333 15.375 18.3333 15.8333V18.3333Z"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M3.33333 15V9.16667" stroke={color} strokeWidth={1.5} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6.66667 15V9.16667" stroke={color} strokeWidth={1.5} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10 15V9.16667" stroke={color} strokeWidth={1.5} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M13.3333 15V9.16667" stroke={color} strokeWidth={1.5} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M16.6667 15V9.16667" stroke={color} strokeWidth={1.5} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M0.833333 18.3333H19.1667" stroke={color} strokeWidth={1.5} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M10 7.08333C10.6904 7.08333 11.25 6.52369 11.25 5.83333C11.25 5.14298 10.6904 4.58333 10 4.58333C9.30964 4.58333 8.75 5.14298 8.75 5.83333C8.75 6.52369 9.30964 7.08333 10 7.08333Z"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
