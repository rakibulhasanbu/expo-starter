import * as React from "react";

import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";
import { TextInput, View } from "react-native";

import { FormError } from "@/components/form-error";

const otpBoxVariants = cva(
  "size-[50px] items-center justify-center rounded-lg border border-transparent bg-secondary",
  {
    variants: {
      invalid: {
        true: "border-destructive",
        false: "",
      },
    },
    defaultVariants: {
      invalid: false,
    },
  }
);

type OtpInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = VariantProps<typeof otpBoxVariants> & {
  control: Control<TFieldValues>;
  name: TName;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  length?: number;
  containerClassName?: string;
};

function OtpInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, rules, length = 6, containerClassName }: OtpInputProps<TFieldValues, TName>) {
  const { field, fieldState } = useController({ control, name, rules });
  const inputRefs = React.useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);

  const digits = React.useMemo(() => {
    const value: string = field.value ?? "";
    return Array.from({ length }, (_, index) => value[index] ?? "");
  }, [field.value, length]);

  const commitDigits = (nextDigits: string[]) => {
    field.onChange(nextDigits.join("").slice(0, length));
  };

  const handleChangeText = (text: string, index: number) => {
    const characters = text.replace(/[^0-9]/g, "").split("");

    if (characters.length === 0) {
      const next = [...digits];
      next[index] = "";
      commitDigits(next);
      return;
    }

    const next = [...digits];
    let cursor = index;
    for (const character of characters) {
      if (cursor >= length) break;
      next[cursor] = character;
      cursor += 1;
    }
    commitDigits(next);

    const focusIndex = Math.min(cursor, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key !== "Backspace" || digits[index] || index <= 0) return;

    const next = [...digits];
    next[index - 1] = "";
    commitDigits(next);
    inputRefs.current[index - 1]?.focus();
  };

  return (
    <View className={cn("gap-1.5", containerClassName)}>
      <View className="flex-row items-center gap-2">
        {digits.map((digit, index) => (
          <View
            key={index}
            className={cn(
              otpBoxVariants({ invalid: fieldState.invalid }),
              focusedIndex === index && "border-input-focus-border"
            )}
          >
            <TextInput
              ref={(instance) => {
                inputRefs.current[index] = instance;
                if (index === 0) field.ref(instance);
              }}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => {
                setFocusedIndex((current) => (current === index ? null : current));
                field.onBlur();
              }}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              maxLength={index === 0 ? length : 1}
              aria-invalid={fieldState.invalid}
              className="w-full p-0 text-center font-urbanist-bold text-base text-foreground"
            />
          </View>
        ))}
      </View>

      <FormError message={fieldState.error?.message} />
    </View>
  );
}

export { OtpInput, otpBoxVariants };
export type { OtpInputProps };
