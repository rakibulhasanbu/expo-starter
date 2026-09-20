import * as React from "react";

import { cn } from "@/utils/cn";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useController, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { Platform, Pressable, TextInput, View } from "react-native";

import { COUNTRY_CODES, getFlagEmoji, type CountryCode } from "@/lib/country-codes";
import { useThemeColor } from "@/lib/theme-colors";
import { AppBottomSheetModal } from "@/components/app-bottom-sheet-modal";
import { FormError } from "@/components/form-error";
import { ArrowDownIcon } from "@/components/icons/arrow-down-icon";
import { SearchInput, type SearchInputHandle } from "@/components/search-input";
import { Text } from "@/components/text";

type PhoneInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TCountryName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
  React.ComponentProps<typeof TextInput>,
  "value" | "onChangeText" | "onBlur" | "ref" | "children" | "secureTextEntry"
> & {
  control: Control<TFieldValues>;
  name: TName;
  countryName: TCountryName;
  label?: string;
  containerClassName?: string;
};

const SNAP_POINTS = ["70%"];

function PhoneInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TCountryName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  countryName,
  label,
  containerClassName,
  className,
  onFocus,
  ...props
}: PhoneInputProps<TFieldValues, TName, TCountryName>) {
  const { field, fieldState } = useController({ control, name });
  const { field: countryField } = useController({ control, name: countryName });
  const inputRef = React.useRef<TextInput>(null);
  const sheetRef = React.useRef<BottomSheetModal>(null);
  const labelId = `${name}-label`;
  const [isFocused, setIsFocused] = React.useState(false);
  // Written only by SearchInput's debounced callback — never per keystroke.
  const [search, setSearch] = React.useState("");
  const searchRef = React.useRef<SearchInputHandle>(null);
  const handleColor = useThemeColor("muted");

  const selectedCountry: CountryCode =
    COUNTRY_CODES.find((country) => country.dialCode === countryField.value) ?? COUNTRY_CODES[0];

  const filteredCountries = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return COUNTRY_CODES;
    return COUNTRY_CODES.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.dialCode.includes(query) ||
        country.iso2.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <View className={cn("gap-1.5", containerClassName)}>
      {label ? (
        <Pressable onPress={Platform.OS === "web" ? undefined : () => inputRef.current?.focus()}>
          <Text nativeID={labelId} variant="label">
            {label}
          </Text>
        </Pressable>
      ) : null}

      <View
        className={cn(
          "flex-row items-center gap-2 rounded-full border border-transparent bg-secondary px-4 py-3",
          fieldState.invalid && "border-destructive",
          isFocused && "border-input-focus-border",
          className
        )}
      >
        <Pressable
          className="flex-row items-center gap-1"
          onPress={() => sheetRef.current?.present()}
          hitSlop={8}
        >
          <Text className="text-base">{getFlagEmoji(selectedCountry.iso2)}</Text>
          <Text className="font-urbanist-medium text-base text-foreground">{selectedCountry.dialCode}</Text>
          <ArrowDownIcon size={20} />
        </Pressable>

        <View className="h-4 w-px bg-border" />

        <TextInput
          ref={(instance) => {
            field.ref(instance);
            inputRef.current = instance;
          }}
          aria-labelledby={label ? labelId : undefined}
          accessibilityLabel={label}
          value={field.value ?? ""}
          onChangeText={(text) => field.onChange(text.replace(/[^\d]/g, ""))}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={() => {
            setIsFocused(false);
            field.onBlur();
          }}
          aria-invalid={fieldState.invalid}
          keyboardType="phone-pad"
          placeholder="000 0000 0000"
          className={cn(
            "flex-1 p-0 font-urbanist-medium text-base text-foreground placeholder:text-muted-foreground",
            Platform.select({ web: "outline-none" })
          )}
          {...props}
        />
      </View>

      <FormError message={fieldState.error?.message} />

      <AppBottomSheetModal
        ref={sheetRef}
        snapPoints={SNAP_POINTS}
        enableDynamicSizing={false}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        onDismiss={() => searchRef.current?.clear()}
        handleIndicatorStyle={{ backgroundColor: handleColor, width: 40 }}
        backgroundStyle={{ borderRadius: 24 }}
      >
        <View className="flex-row items-center justify-between px-5 pb-2 pt-1">
          <Text variant="h4">Select country</Text>
          <Pressable onPress={() => sheetRef.current?.dismiss()} hitSlop={8}>
            <Text className="text-base text-primary">Close</Text>
          </Pressable>
        </View>

        <View className="px-5 pb-2">
          <SearchInput
            ref={searchRef}
            onQueryChange={setSearch}
            placeholder="Search country or code"
            containerClassName="py-3"
          />
        </View>

        <BottomSheetFlatList
          data={filteredCountries}
          keyExtractor={(item: CountryCode) => item.iso2}
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="px-5 pb-8"
          renderItem={({ item }: { item: CountryCode }) => (
            <Pressable
              className="flex-row items-center gap-3 py-3"
              onPress={() => {
                countryField.onChange(item.dialCode);
                sheetRef.current?.dismiss();
              }}
            >
              <Text className="text-base">{getFlagEmoji(item.iso2)}</Text>
              <Text className="flex-1 font-urbanist-medium text-base text-foreground">{item.name}</Text>
              <Text className="font-urbanist-medium text-base text-muted-foreground">{item.dialCode}</Text>
            </Pressable>
          )}
        />
      </AppBottomSheetModal>
    </View>
  );
}

export { PhoneInput };
export type { PhoneInputProps };
