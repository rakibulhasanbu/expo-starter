import * as React from "react";

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  type BottomSheetBackdropProps,
  type BottomSheetModalProps,
} from "@gorhom/bottom-sheet";

import { useThemeColor } from "@/lib/theme-colors";

const DEFAULT_BORDER_RADIUS = 40;

type AppBottomSheetModalProps = BottomSheetModalProps & {
  ref?: React.Ref<BottomSheetModal>;
};

/**
 * Every sheet in the app wants the same backdrop, drag handle, and rounded
 * card surface — this bakes those in (themed per color scheme, so sheets
 * don't render a white card in dark mode) and still takes any BottomSheetModal
 * prop to override per-sheet behavior (snapPoints, keyboard handling, etc.).
 */
export function AppBottomSheetModal({
  backgroundStyle,
  handleIndicatorStyle,
  backdropComponent,
  enableDynamicSizing = true,
  enablePanDownToClose = true,
  ...props
}: AppBottomSheetModalProps) {
  const cardColor = useThemeColor("card");
  const handleColor = useThemeColor("muted");

  const renderBackdrop = React.useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" />
    ),
    []
  );

  return (
    <BottomSheetModal
      enableDynamicSizing={enableDynamicSizing}
      enablePanDownToClose={enablePanDownToClose}
      backdropComponent={backdropComponent ?? renderBackdrop}
      handleIndicatorStyle={handleIndicatorStyle ?? { backgroundColor: handleColor, width: 72 }}
      backgroundStyle={{ backgroundColor: cardColor, borderRadius: DEFAULT_BORDER_RADIUS, ...backgroundStyle }}
      {...props}
    />
  );
}
