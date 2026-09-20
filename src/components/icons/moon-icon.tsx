import Svg, { Path } from "react-native-svg";

type MoonIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export function MoonIcon({ size = 16, color, className = "text-foreground" }: MoonIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <Path
        d="M14.6667 9.14C14.5648 10.0475 14.2129 10.9083 13.6503 11.6267C13.0876 12.3451 12.3363 12.8926 11.4808 13.2078C10.6253 13.523 9.69921 13.5936 8.80587 13.412C7.91253 13.2303 7.08728 12.8034 6.42221 12.1783C5.75714 11.5533 5.27825 10.7551 5.03927 9.87466C4.80029 8.99427 4.81079 8.06515 5.06962 7.19031C5.32845 6.31548 5.82535 5.52867 6.50438 4.91885C7.18341 4.30903 8.01844 3.90009 8.91334 3.73999C8.32217 4.53819 8.01596 5.51074 8.04299 6.50278C8.07001 7.49481 8.4287 8.44926 9.06256 9.21451C9.69641 9.97976 10.5695 10.5127 11.5407 10.7285C12.5119 10.9443 13.5275 10.8309 14.4267 10.4067C14.5062 9.9915 14.5814 9.5695 14.6667 9.14Z"
        stroke={color ?? "currentColor"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
