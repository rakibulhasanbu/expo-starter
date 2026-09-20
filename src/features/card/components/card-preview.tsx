import { useId } from "react";
import { View } from "react-native";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

import { Text } from "@/components/text";
import { cn } from "@/utils/cn";

import { CARD_THEME_COLORS, DEFAULT_MASKED_NUMBER } from "../data";
import type { CardTheme } from "../types";

type CardPreviewProps = {
  theme: CardTheme;
  holderName?: string;
  maskedNumber?: string;
  showVirtualLabel?: boolean;
  balanceLabel?: string;
  dimmed?: boolean;
  className?: string;
};

// Native aspect ratio of the Figma card artwork (723.391 x 376) — every path
// below is authored against that exact viewBox so it can be reused at any width.
const VIEW_BOX_WIDTH = 723.391;
const VIEW_BOX_HEIGHT = 376;
const CARD_ASPECT_RATIO = VIEW_BOX_WIDTH / VIEW_BOX_HEIGHT;

const LOGO_PATHS = [
  "M589.918 48.5456C589.918 38.7523 597.234 32.6299 608.634 32.6299C620.034 32.6299 627.35 38.7523 627.35 48.5456C627.35 58.3388 620.034 64.4613 608.634 64.4613C597.234 64.4745 589.918 58.3388 589.918 48.5456ZM618.139 48.5456C618.139 43.205 614.407 39.9318 608.634 39.9318C602.861 39.9318 599.129 43.2183 599.129 48.5456C599.129 53.8862 602.861 57.1594 608.634 57.1594C614.393 57.1594 618.139 53.8862 618.139 48.5456Z",
  "M632.344 59.7034V36.9099C632.344 34.1932 633.945 32.8018 636.957 32.8018C639.968 32.8018 641.569 34.2065 641.569 36.9099V56.4699H653.527C656.539 56.4699 658.14 57.7819 658.14 60.1937C658.14 62.5526 656.539 63.8645 653.527 63.8645H636.942C633.945 63.8513 632.344 62.4068 632.344 59.7034Z",
  "M660.124 48.5456C660.124 38.7523 667.439 32.6299 678.839 32.6299C690.239 32.6299 697.555 38.7523 697.555 48.5456C697.555 58.3388 690.239 64.4613 678.839 64.4613C667.439 64.4745 660.124 58.3388 660.124 48.5456ZM688.344 48.5456C688.344 43.205 684.612 39.9318 678.839 39.9318C673.066 39.9318 669.334 43.2183 669.334 48.5456C669.334 53.8862 673.066 57.1594 678.839 57.1594C684.612 57.1594 688.344 53.8862 688.344 48.5456Z",
  "M586.804 48.837C586.833 50.8381 586.422 52.7994 585.541 54.7077C583.146 59.8627 578.886 63.03 572.819 64.2094C571.79 64.4082 563.843 64.4745 562.785 64.4612C561.346 64.448 559.921 64.4612 558.481 64.4612C557.232 64.4612 556.366 63.6926 556.351 62.5662C556.336 60.7506 556.336 58.9351 556.351 57.1196C556.351 55.9931 557.232 55.2245 558.481 55.2113C560.112 55.2113 568.647 55.2378 570.277 55.198C571.746 55.1715 573.054 54.6944 574.17 53.8463C574.2 53.8198 574.244 53.7933 574.273 53.7668C575.963 52.4549 576.8 50.7851 576.756 48.837C576.8 46.8757 575.963 45.2192 574.273 43.894C574.244 43.8675 574.2 43.841 574.17 43.8145C573.054 42.9664 571.746 42.4893 570.277 42.4628C568.647 42.4231 567.016 42.4496 565.385 42.4496C564.137 42.4496 563.255 41.6677 563.255 40.5545C563.241 38.739 563.241 36.9235 563.255 35.1079C563.255 33.9815 564.137 33.2129 565.385 33.2129C566.825 33.2129 568.25 33.2129 569.69 33.2129C570.747 33.2129 571.79 33.2659 572.834 33.4647C578.886 34.6441 583.161 37.8246 585.555 42.9664C586.437 44.8614 586.848 46.836 586.804 48.837Z",
  "M561.418 53.4352C564.234 53.4352 566.516 51.3764 566.516 48.8367C566.516 46.2971 564.234 44.2383 561.418 44.2383C558.603 44.2383 556.321 46.2971 556.321 48.8367C556.321 51.3764 558.603 53.4352 561.418 53.4352Z",
];

const MOON_RING_PATH =
  "M518.182 352.656C530.258 357.76 543.239 360.379 556.35 360.358C569.461 360.337 582.434 357.675 594.493 352.531C606.553 347.387 617.454 339.867 626.544 330.42C635.635 320.972 642.729 309.79 647.404 297.541C652.079 285.292 654.239 272.226 653.755 259.124C653.272 246.022 650.154 233.152 644.588 221.281C639.022 209.41 631.122 198.782 621.359 190.03C611.597 181.279 600.172 174.583 587.765 170.343C651.658 146.285 724.029 175.878 752.291 239.03C781.665 304.665 752.276 381.666 686.652 411.034C623.5 439.296 549.815 413.144 518.182 352.656Z";

const ELLIPSE_ARC_PATH =
  "M517.35 334.22C536.787 339.782 557.603 337.851 575.685 328.808C593.767 319.764 607.799 304.267 615.007 285.379C622.216 266.49 622.076 245.585 614.617 226.794C607.157 208.004 592.92 192.695 574.719 183.894L561.461 211.311C572.797 216.793 581.664 226.328 586.311 238.031C590.957 249.735 591.044 262.756 586.554 274.52C582.064 286.284 573.325 295.937 562.063 301.569C550.801 307.202 537.835 308.405 525.729 304.94L517.35 334.22Z";

const MASTERCARD_OVERLAP_PATH = "M630.381 280.627H656.934V328.31H630.381V280.627Z";
const MASTERCARD_LEFT_CIRCLE_PATH =
  "M632.144 304.479C632.144 294.786 636.703 286.184 643.696 280.628C638.542 276.586 632.067 274.134 624.979 274.134C608.216 274.153 594.652 287.717 594.652 304.479C594.652 321.242 608.216 334.806 624.979 334.806C632.048 334.806 638.542 332.354 643.696 328.312C636.703 322.852 632.144 314.173 632.144 304.479Z";
const MASTERCARD_RIGHT_CIRCLE_PATH =
  "M692.739 304.478C692.739 321.241 679.176 334.805 662.413 334.805C655.344 334.805 648.849 332.352 643.696 328.31C650.765 322.735 655.248 314.153 655.248 304.459C655.248 294.765 650.688 286.163 643.696 280.608C648.83 276.565 655.324 274.113 662.394 274.113C679.176 274.152 692.739 287.792 692.739 304.478Z";

const THEME_LOGO_COLOR: Record<CardTheme, string> = {
  dark: "#FFFFFF",
  red: "#FFFFFF",
  white: "#231F20",
};

const THEME_DECORATION_COLOR: Record<CardTheme, { color: string; opacity: number }> = {
  dark: { color: "#FFFFFF", opacity: 0.08 },
  red: { color: "#FFFFFF", opacity: 0.08 },
  white: { color: "#231F20", opacity: 0.06 },
};

const THEME_TEXT_COLOR: Record<CardTheme, string> = {
  dark: "#FFFFFF",
  red: "#FFFFFF",
  white: "#282C34",
};

const THEME_VIRTUAL_LABEL_COLOR: Record<CardTheme, string> = {
  dark: "#DEE0E3",
  red: "#DEE0E3",
  white: "#98A2B3",
};

export function CardPreview({
  theme,
  holderName,
  maskedNumber = DEFAULT_MASKED_NUMBER,
  showVirtualLabel = true,
  balanceLabel,
  dimmed = false,
  className,
}: CardPreviewProps) {
  const backgroundColor = CARD_THEME_COLORS[theme];
  const logoColor = THEME_LOGO_COLOR[theme];
  const decoration = THEME_DECORATION_COLOR[theme];
  const textColor = THEME_TEXT_COLOR[theme];
  const virtualLabelColor = THEME_VIRTUAL_LABEL_COLOR[theme];

  // Scoped per instance so multiple CardPreview siblings never collide on clip-path ids.
  const instanceId = useId();
  const roundedClipId = `card-rounded-bg-${instanceId}`;
  const moonClipId = `card-moon-clip-${instanceId}`;

  return (
    <View
      className={cn("w-full overflow-hidden rounded-2xl", className)}
      style={{ aspectRatio: CARD_ASPECT_RATIO, opacity: dimmed ? 0.32 : 1 }}
    >
      <Svg width="100%" height="100%" viewBox={`0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`} fill="none">
        <Defs>
          <ClipPath id={roundedClipId}>
            <Rect width={VIEW_BOX_WIDTH} height={VIEW_BOX_HEIGHT} rx={32.6957} />
          </ClipPath>
          <ClipPath id={moonClipId}>
            <Rect width={312.418} height={312.418} transform="translate(554.705 498.61) rotate(-114.11)" />
          </ClipPath>
        </Defs>

        <G clipPath={`url(#${roundedClipId})`}>
          <Rect width={VIEW_BOX_WIDTH} height={VIEW_BOX_HEIGHT} fill={backgroundColor} />

          <G clipPath={`url(#${moonClipId})`}>
            <Path d={MOON_RING_PATH} fill={decoration.color} fillOpacity={decoration.opacity} />
            <Path d={MASTERCARD_OVERLAP_PATH} fill="#FF5A00" />
            <Path d={MASTERCARD_LEFT_CIRCLE_PATH} fill="#EB001B" />
            <Path d={MASTERCARD_RIGHT_CIRCLE_PATH} fill="#F79E1B" />
          </G>

          <Path d={ELLIPSE_ARC_PATH} fill={decoration.color} fillOpacity={decoration.opacity} />

          {LOGO_PATHS.map((d, index) => (
            <Path key={index} d={d} fill={logoColor} />
          ))}
        </G>
      </Svg>

      {showVirtualLabel ? (
        <Text
          className="absolute font-urbanist-medium text-xs tracking-[0.15px]"
          style={{ top: "8.68%", left: "4.53%", color: virtualLabelColor }}
        >
          VIRTUAL
        </Text>
      ) : null}

      {balanceLabel ? (
        <Text
          className="absolute font-urbanist-bold text-2xl tracking-[-0.25px]"
          style={{ top: "37.8%", left: "4.53%", color: textColor }}
        >
          {balanceLabel}
        </Text>
      ) : null}

      {holderName ? (
        <View className="absolute" style={{ top: "68.48%", left: "4.53%", width: "60%" }}>
          <Text className="font-urbanist-medium text-sm leading-[18px]" style={{ color: textColor }}>
            {holderName}
          </Text>
          <Text className="mt-1 font-urbanist-medium text-base" style={{ color: textColor }}>
            {maskedNumber}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
