import Svg, { Path } from "react-native-svg";
import { useThemeColor } from "@/lib/theme-colors";

type CardIconProps = {
  size?: number;
  color?: string;
  filled?: boolean;
};

export function CardIcon({ size = 20, color: colorProp, filled = false }: CardIconProps) {
  const themeColor = useThemeColor("primary");
  const color = colorProp ?? themeColor;
  if (filled) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M22 7.55C22 8.21 21.46 8.75 20.8 8.75H3.2C2.54 8.75 2 8.21 2 7.55V7.54C2 5.25 3.85 3.4 6.14 3.4H17.85C20.14 3.4 22 5.26 22 7.55Z"
          fill={color}
        />
        <Path
          d="M2 11.45V16.46C2 18.75 3.85 20.6 6.14 20.6H17.85C20.14 20.6 22 18.74 22 16.45V11.45C22 10.79 21.46 10.25 20.8 10.25H3.2C2.54 10.25 2 10.79 2 11.45ZM8 17.25H6C5.59 17.25 5.25 16.91 5.25 16.5C5.25 16.09 5.59 15.75 6 15.75H8C8.41 15.75 8.75 16.09 8.75 16.5C8.75 16.91 8.41 17.25 8 17.25ZM14.5 17.25H10.5C10.09 17.25 9.75 16.91 9.75 16.5C9.75 16.09 10.09 15.75 10.5 15.75H14.5C14.91 15.75 15.25 16.09 15.25 16.5C15.25 16.91 14.91 17.25 14.5 17.25Z"
          fill={color}
        />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 8.50496H22"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 16.505H8"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5 16.505H14.5"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.44 3.50496H17.55C21.11 3.50496 22 4.38496 22 7.89496V16.105C22 19.615 21.11 20.495 17.56 20.495H6.44C2.89 20.505 2 19.625 2 16.115V7.89496C2 4.38496 2.89 3.50496 6.44 3.50496Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
