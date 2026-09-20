import * as React from "react";

import { cn } from "@/utils/cn";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { TextInput, View } from "react-native";

import { SearchNormalIcon } from "@/components/icons/search-normal-icon";
import { useThemeColor } from "@/lib/theme-colors";

type SearchInputProps = {
  /** Called with the trimmed-as-typed text, debounced by `debounceMs`. */
  onQueryChange: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  /** Inside a BottomSheetModal the input must be the sheet-aware variant. */
  inSheet?: boolean;
  containerClassName?: string;
};

type SearchInputHandle = {
  clear: () => void;
};

/**
 * The sheet-aware input forwards react-native-gesture-handler's TextInput type
 * while the plain one forwards React Native's. We only ever call `clear()`, so
 * the ref is narrowed to that rather than reconciling the two.
 */
type ClearableInput = { clear?: () => void };

const DEBOUNCE_MS = 200;

/**
 * A deliberately **uncontrolled** search field.
 *
 * Passing `value` back into a native TextInput is what causes Android to echo
 * text ("first" typed out as "firfirsfirfirst"): React commits a stale value
 * while the user is still typing and ReactEditText re-applies it. Here React
 * writes the text exactly once, at mount, and never again — the native field
 * owns its own content, so the echo is structurally impossible.
 *
 * The query that drives filtering is a separate, debounced signal. Use the
 * imperative `clear()` handle to reset the field (e.g. on sheet dismiss).
 */
const SearchInput = React.forwardRef<SearchInputHandle, SearchInputProps>(function SearchInput(
  { onQueryChange, placeholder = "Search", debounceMs = DEBOUNCE_MS, inSheet = true, containerClassName },
  ref
) {
  const inputRef = React.useRef<ClearableInput | null>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const mutedForegroundColor = useThemeColor("mutedForeground");

  const setInputRef = React.useCallback((instance: unknown) => {
    inputRef.current = (instance as ClearableInput | null) ?? null;
  }, []);

  // Held in a ref so the debounce closure never depends on it — an unmemoized
  // parent callback can't churn the timer or force this to re-render. Synced in
  // an effect rather than during render, so a discarded concurrent render can't
  // leave a stale callback behind.
  const onQueryChangeRef = React.useRef(onQueryChange);
  React.useEffect(() => {
    onQueryChangeRef.current = onQueryChange;
  }, [onQueryChange]);

  const cancelPending = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // A fast dismiss must not fire a pending emit into an unmounted parent.
  React.useEffect(() => cancelPending, [cancelPending]);

  const handleChangeText = React.useCallback(
    (text: string) => {
      cancelPending();
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        onQueryChangeRef.current(text);
      }, debounceMs);
    },
    [cancelPending, debounceMs]
  );

  React.useImperativeHandle(
    ref,
    () => ({
      clear: () => {
        cancelPending();
        inputRef.current?.clear?.();
        onQueryChangeRef.current("");
      },
    }),
    [cancelPending]
  );

  const inputProps = {
    // `defaultValue` and never `value` — see the note above.
    defaultValue: "",
    onChangeText: handleChangeText,
    placeholder,
    placeholderTextColor: mutedForegroundColor,
    autoCapitalize: "none" as const,
    autoCorrect: false,
    autoComplete: "off" as const,
    spellCheck: false,
    className: "flex-1 font-urbanist-medium text-sm text-foreground",
  };

  return (
    <View className={cn("flex-row items-center gap-2 rounded-full bg-secondary px-4 py-2.5", containerClassName)}>
      <SearchNormalIcon size={20} />
      {inSheet ? (
        <BottomSheetTextInput ref={setInputRef} {...inputProps} />
      ) : (
        <TextInput ref={setInputRef} {...inputProps} />
      )}
    </View>
  );
});

export { SearchInput };
export type { SearchInputHandle, SearchInputProps };
