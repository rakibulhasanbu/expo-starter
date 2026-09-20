import Svg, { Path } from "react-native-svg";
import { useThemeColor } from "@/lib/theme-colors";

type FingerScanIconProps = {
  size?: number;
  color?: string;
};

export function FingerScanIcon({ size = 20, color: colorProp }: FingerScanIconProps) {
  const themeColor = useThemeColor("primary");
  const color = colorProp ?? themeColor;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 14.88C11.09 14.88 10.35 14.14 10.35 13.23V10.76C10.35 9.85001 11.09 9.10999 12 9.10999C12.91 9.10999 13.65 9.85001 13.65 10.76V13.23C13.65 14.14 12.91 14.88 12 14.88Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M16.98 13.47C16.78 16.05 14.62 18.07 12 18.07C9.24 18.07 7 15.83 7 13.07V10.93C7 8.16999 9.24 5.92999 12 5.92999C14.59 5.92999 16.72 7.89998 16.97 10.42"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M15 2H17C20 2 22 4 22 7V9"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 9V7C2 4 4 2 7 2H9"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 22H17C20 22 22 20 22 17V15"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 15V17C2 20 4 22 7 22H9"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
