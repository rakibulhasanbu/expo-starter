import Svg, { Path } from "react-native-svg";

type ArrowSwapHorizontalIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export function ArrowSwapHorizontalIcon({ size = 14, color, className = "text-foreground" }: ArrowSwapHorizontalIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
      <Path d="M11.9584 8.74414L9.03589 11.6725" stroke={color ?? "currentColor"} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M2.04175 8.74414H11.9584" stroke={color ?? "currentColor"} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M2.04175 5.25548L4.96425 2.32715" stroke={color ?? "currentColor"} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M11.9584 5.25586H2.04175" stroke={color ?? "currentColor"} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
