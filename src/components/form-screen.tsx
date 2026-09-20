import * as React from "react";

import { cn } from "@/utils/cn";
import { View, type LayoutChangeEvent } from "react-native";
import { KeyboardAwareScrollView, KeyboardStickyView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type KeyboardAwareScrollViewProps = React.ComponentProps<typeof KeyboardAwareScrollView>;

type FormScreenProps = KeyboardAwareScrollViewProps & {
  contentContainerClassName?: string;
  /** Bottom-pinned primary action. Rides above the keyboard, and its measured height drives `bottomOffset`. */
  footer?: React.ReactNode;
  footerClassName?: string;
};

/** Breathing room kept between the focused input and whatever sits below it. */
const BOTTOM_GAP = 24;

/**
 * The scroll container every form screen should use, plus its bottom-pinned action.
 *
 * The scroll view is a `KeyboardAwareScrollView`, which — unlike
 * `KeyboardAvoidingView` — scrolls the *focused* input into view above the
 * keyboard, driven on the UI thread so the movement is frame-synced with the
 * keyboard on both platforms.
 *
 * The footer owns the same component on purpose. It floats above the keyboard,
 * so it obstructs the very space the scroll view is trying to scroll the input
 * into. As siblings the two could not see each other and the button landed on
 * top of the input; here the footer's real height is measured and added to
 * `bottomOffset`, which stays correct for any footer — one button, a button
 * with an error slot above it, or a bespoke `Pressable`.
 *
 * `flex-grow` on the content container is deliberate: screens that were
 * previously a non-scrolling `flex-1 View` keep their exact layout while the
 * keyboard is closed, and only become scrollable once it opens.
 *
 * `keyboardDismissMode="on-drag"` is the dismissal path for numeric keyboards
 * (`number-pad` / `decimal-pad` have no return key on iOS). A `KeyboardToolbar`
 * would be the other option, but it renders at the top of the keyboard, exactly
 * where the footer goes — they would overlap.
 */
function FormScreen({
  contentContainerClassName,
  footer,
  footerClassName,
  bottomOffset,
  ...rest
}: FormScreenProps) {
  const insets = useSafeAreaInsets();
  const [footerHeight, setFooterHeight] = React.useState(0);

  const handleFooterLayout = React.useCallback((event: LayoutChangeEvent) => {
    setFooterHeight(event.nativeEvent.layout.height);
  }, []);

  return (
    <>
      <KeyboardAwareScrollView
        bottomOffset={bottomOffset ?? footerHeight + BOTTOM_GAP}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerClassName={cn("flex-grow", contentContainerClassName)}
        {...rest}
      />

      {footer ? (
        // The parent `SafeAreaView edges={[…, "bottom"]}` has already pushed this
        // row up by the bottom inset, so `offset.opened` cancels that out —
        // otherwise the button floats a gesture-bar's height above the keyboard.
        <KeyboardStickyView offset={{ closed: 0, opened: insets.bottom }}>
          <View onLayout={handleFooterLayout} className={cn("px-5 pb-2 pt-2", footerClassName)}>
            {footer}
          </View>
        </KeyboardStickyView>
      ) : null}
    </>
  );
}

export { FormScreen };
export type { FormScreenProps };
