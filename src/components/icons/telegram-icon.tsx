import Svg, { Path } from "react-native-svg";

type TelegramIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export function TelegramIcon({ size = 20, color, className = "text-foreground" }: TelegramIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <Path
        d="M22 4.5L2.5 12.19C1.44 12.62 1.44 13.22 2.3 13.48L7.19 15.01L18.53 7.87C19.07 7.54 19.56 7.71 19.16 8.07L9.97 16.38H9.97L9.97 16.38L9.64 21.42C10.12 21.42 10.33 21.2 10.6 20.94L12.96 18.65L17.9 22.29C18.81 22.79 19.46 22.53 19.69 21.45L22.94 6.02C23.28 4.7 22.44 4.11 22 4.5Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
