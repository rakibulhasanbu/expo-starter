import Svg, { Path } from "react-native-svg";
import { useThemeColor } from "@/lib/theme-colors";

type CopyIconProps = {
  size?: number;
  color?: string;
};

export function CopyIcon({ size = 16, color: colorProp }: CopyIconProps) {
  const themeColor = useThemeColor("primary");
  const color = colorProp ?? themeColor;
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M10.6667 8.59967V11.3997C10.6667 13.733 9.73334 14.6663 7.40001 14.6663H4.60001C2.26668 14.6663 1.33334 13.733 1.33334 11.3997V8.59967C1.33334 6.26634 2.26668 5.33301 4.60001 5.33301H7.40001C9.73334 5.33301 10.6667 6.26634 10.6667 8.59967Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.6667 4.59967V7.39967C14.6667 9.73301 13.7333 10.6663 11.4 10.6663H10.6667V8.59967C10.6667 6.26634 9.73334 5.33301 7.40001 5.33301H5.33334V4.59967C5.33334 2.26634 6.26668 1.33301 8.60001 1.33301H11.4C13.7333 1.33301 14.6667 2.26634 14.6667 4.59967Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
