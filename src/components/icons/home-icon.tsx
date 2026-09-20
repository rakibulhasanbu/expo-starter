import Svg, { Path } from "react-native-svg";
import { useThemeColor } from "@/lib/theme-colors";

type HomeIconProps = {
  size?: number;
  color?: string;
  filled?: boolean;
};

export function HomeIcon({ size = 20, color: colorProp, filled = false }: HomeIconProps) {
  const themeColor = useThemeColor("primary");
  const color = colorProp ?? themeColor;
  if (filled) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M20.83 8.01L14.28 2.77C13 1.75 11 1.74 9.73 2.76L3.18 8.01C2.24 8.76 1.67 10.26 1.87 11.44L3.13 18.98C3.42 20.67 4.99 22 6.7 22H17.3C18.99 22 20.59 20.64 20.88 18.97L22.14 11.43C22.32 10.26 21.75 8.76 20.83 8.01ZM12.75 18C12.75 18.41 12.41 18.75 12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18Z"
          fill={color}
        />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 18V15" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M10.07 2.82L3.14 8.37C2.36 8.99 1.86 10.3 2.03 11.28L3.36 19.24C3.6 20.66 4.96 21.81 6.4 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.99 20.86 8.37L13.93 2.83C12.86 1.97 11.13 1.97 10.07 2.82Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
