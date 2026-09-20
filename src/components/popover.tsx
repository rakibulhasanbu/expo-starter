import { Modal, Pressable, useWindowDimensions, View, type LayoutRectangle } from "react-native";

import { cn } from "@/utils/cn";

type PopoverAnchor = Pick<LayoutRectangle, "x" | "y" | "width" | "height">;

type PopoverProps = {
  visible: boolean;
  onClose: () => void;
  anchor: PopoverAnchor | null;
  align?: "start" | "end";
  gap?: number;
  contentClassName?: string;
  children: React.ReactNode;
};

const CARET_SIZE = 12;

function Popover({ visible, onClose, anchor, align = "end", gap = 15, contentClassName, children }: PopoverProps) {
  const { width: windowWidth } = useWindowDimensions();

  if (!anchor) return null;

  const top = anchor.y + anchor.height + gap;
  const caretOffsetFromEdge = anchor.width / 2 - CARET_SIZE / 2;
  const horizontalStyle =
    align === "end" ? { right: windowWidth - (anchor.x + anchor.width) } : { left: anchor.x };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-primary/10" onPress={onClose}>
        <View className="absolute" style={{ top, ...horizontalStyle }}>
          <Pressable onPress={(event) => event.stopPropagation()}>
            <View
              className="absolute self-end bg-background"
              style={{
                top: -CARET_SIZE / 2 - 3,
                right: caretOffsetFromEdge,
                width: CARET_SIZE,
                height: CARET_SIZE,
                transform: [{ rotate: "45deg" }],
              }}
            />
            <View className={cn("min-w-[205px] gap-6 rounded-2xl bg-background p-3.5", contentClassName)}>
              {children}
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

export { Popover };
export type { PopoverAnchor };
