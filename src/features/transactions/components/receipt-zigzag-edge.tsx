import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

import { useThemeColor } from "@/lib/theme-colors";

const TILE_WIDTH = 30;
const TILE_HEIGHT = 24;
const OVERLAP = 7.6667;
const STEP = TILE_WIDTH - OVERLAP;
const POLYGON_WIDTH = 18.3557;
const POLYGON_HEIGHT = 15.1648;

type ReceiptZigzagEdgeProps = {
  width: number;
  color?: string;
};

export function ReceiptZigzagEdge({ width, color: colorProp }: ReceiptZigzagEdgeProps) {
  const backgroundColor = useThemeColor("background");
  const color = colorProp ?? backgroundColor;
  const tileCount = Math.ceil(width / STEP) + 1;

  return (
    <View style={{ width, height: TILE_HEIGHT, overflow: "hidden" }} className="flex-row">
      {Array.from({ length: tileCount }).map((_, index) => (
        <View
          key={index}
          style={{ width: TILE_WIDTH, height: TILE_HEIGHT, marginRight: -OVERLAP }}
          className="items-center justify-center"
        >
          <Svg width={POLYGON_WIDTH} height={POLYGON_HEIGHT} viewBox="0 0 18.3557 15.1648" fill="none">
            <Path
              d="M5.93431 1.65917C7.53085 -0.553062 10.8248 -0.553056 12.4214 1.65918L17.5921 8.82398C19.5013 11.4694 17.611 15.1648 14.3486 15.1648H4.00709C0.744662 15.1648 -1.14563 11.4694 0.763559 8.82398L5.93431 1.65917Z"
              fill={color}
              transform="rotate(180 9.17785 7.5824)"
            />
          </Svg>
        </View>
      ))}
    </View>
  );
}
