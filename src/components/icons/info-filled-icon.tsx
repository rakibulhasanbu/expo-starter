import Svg, { Path } from "react-native-svg";
import { useThemeColor } from "@/lib/theme-colors";

type InfoFilledIconProps = {
  size?: number;
  color?: string;
};

export function InfoFilledIcon({ size = 20, color: colorProp }: InfoFilledIconProps) {
  const themeColor = useThemeColor("info");
  const color = colorProp ?? themeColor;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM11.25 8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V13C12.75 13.41 12.41 13.75 12 13.75C11.59 13.75 11.25 13.41 11.25 13V8ZM12.92 16.38C12.87 16.5 12.8 16.59 12.71 16.68C12.53 16.86 12.28 16.97 12 16.97C11.87 16.97 11.74 16.94 11.62 16.89C11.5 16.84 11.39 16.77 11.29 16.68C11.2 16.59 11.13 16.5 11.07 16.38C11.02 16.26 11 16.13 11 16C11 15.87 11.02 15.74 11.07 15.62C11.13 15.5 11.2 15.4 11.29 15.31C11.39 15.22 11.5 15.15 11.62 15.11C11.86 15.01 12.14 15.01 12.38 15.11C12.5 15.15 12.6 15.22 12.71 15.31C12.8 15.4 12.87 15.5 12.92 15.62C12.97 15.74 13 15.87 13 16C13 16.13 12.97 16.26 12.92 16.38Z"
        fill={color}
      />
    </Svg>
  );
}
