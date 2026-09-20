import Svg, { Path } from "react-native-svg";
import { useThemeColor } from "@/lib/theme-colors";

type CloseCircleIconProps = {
  size?: number;
  color?: string;
};

export function CloseCircleIcon({ size = 80, color: colorProp }: CloseCircleIconProps) {
  const themeColor = useThemeColor("destructive");
  const color = colorProp ?? themeColor;
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <Path
        d="M40 6.66667C21.6333 6.66667 6.66667 21.6333 6.66667 40C6.66667 58.3667 21.6333 73.3333 40 73.3333C58.3667 73.3333 73.3333 58.3667 73.3333 40C73.3333 21.6333 58.3667 6.66667 40 6.66667ZM51.2 47.6667C52.1667 48.6333 52.1667 50.2333 51.2 51.2C50.7 51.7 50.0667 51.9333 49.4333 51.9333C48.8 51.9333 48.1667 51.7 47.6667 51.2L40 43.5333L32.3333 51.2C31.8333 51.7 31.2 51.9333 30.5667 51.9333C29.9333 51.9333 29.3 51.7 28.8 51.2C27.8333 50.2333 27.8333 48.6333 28.8 47.6667L36.4667 40L28.8 32.3333C27.8333 31.3667 27.8333 29.7667 28.8 28.8C29.7667 27.8333 31.3667 27.8333 32.3333 28.8L40 36.4667L47.6667 28.8C48.6333 27.8333 50.2333 27.8333 51.2 28.8C52.1667 29.7667 52.1667 31.3667 51.2 32.3333L43.5333 40L51.2 47.6667Z"
        fill={color}
      />
    </Svg>
  );
}
