import { router, type Href } from "expo-router";
import { useController, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { Pressable, View } from "react-native";

import { Checkbox } from "@/components/checkbox";
import { FormError } from "@/components/form-error";
import { Text } from "@/components/text";

type TermsCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
};

function TermsCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name }: TermsCheckboxProps<TFieldValues, TName>) {
  const { field, fieldState } = useController({ control, name });

  return (
    <View className="gap-1.5">
      <View className="flex-row flex-wrap items-center gap-1">
        <Pressable
          className="flex-row items-center gap-2"
          onPress={() => field.onChange(!field.value)}
          hitSlop={8}
        >
          <Checkbox checked={Boolean(field.value)} onCheckedChange={field.onChange} />
          <Text className="text-xs text-muted-foreground">By clicking this, you agree to DOLO&apos;s</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/(public)/terms-and-conditions" as Href)} hitSlop={8}>
          <Text className="font-urbanist-bold text-xs text-foreground underline">Terms and Conditions</Text>
        </Pressable>
      </View>

      <FormError message={fieldState.error?.message} />
    </View>
  );
}

export { TermsCheckbox };
export type { TermsCheckboxProps };
