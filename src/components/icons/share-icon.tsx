import Svg, { Path } from "react-native-svg";
import { useThemeColor } from "@/lib/theme-colors";

type ShareIconProps = {
  size?: number;
  color?: string;
};

export function ShareIcon({ size = 16, color: colorProp }: ShareIconProps) {
  const themeColor = useThemeColor("primaryForeground");
  const color = colorProp ?? themeColor;
  return (
    <Svg width={size} height={size} viewBox="0 0 13 14" fill="none">
      <Path
        d="M3.31147 7.7286C3.43158 7.51287 3.5 7.26443 3.5 7C3.5 6.73557 3.43158 6.48713 3.31147 6.2714C3.0553 5.81128 2.564 5.5 2 5.5C1.17157 5.5 0.5 6.17157 0.5 7C0.5 7.82843 1.17157 8.5 2 8.5C2.564 8.5 3.0553 8.18872 3.31147 7.7286ZM3.31147 6.2714L9.68853 2.7286M3.31147 7.7286L9.68853 11.2714M9.68853 11.2714C9.56842 11.4871 9.5 11.7356 9.5 12C9.5 12.8284 10.1716 13.5 11 13.5C11.8284 13.5 12.5 12.8284 12.5 12C12.5 11.1716 11.8284 10.5 11 10.5C10.436 10.5 9.9447 10.8113 9.68853 11.2714ZM9.68853 2.7286C9.9447 3.18872 10.436 3.5 11 3.5C11.8284 3.5 12.5 2.82843 12.5 2C12.5 1.17157 11.8284 0.5 11 0.5C10.1716 0.5 9.5 1.17157 9.5 2C9.5 2.26443 9.56842 2.51287 9.68853 2.7286Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
