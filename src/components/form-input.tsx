import * as React from "react";

import { cn } from "@/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { cva, type VariantProps } from "class-variance-authority";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form";
import { Platform, Pressable, TextInput, View } from "react-native";

import { FormError } from "@/components/form-error";
import { Text } from "@/components/text";

const formInputContainerVariants = cva(
  cn(
    "flex-row items-center gap-2 rounded-full border border-transparent bg-secondary px-4 py-3",
    Platform.select({
      web: "aria-invalid:border-destructive dark:aria-invalid:ring-destructive/40 outline-none transition-colors",
    })
  ),
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

const formInputTextVariants = cva(
  cn(
    "flex-1 p-0 font-urbanist-medium text-base text-foreground placeholder:text-muted-foreground",
    Platform.select({ web: "outline-none" })
  )
);

type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
  React.ComponentProps<typeof TextInput>,
  "value" | "onChangeText" | "onBlur" | "ref" | "children" | "secureTextEntry"
> &
  VariantProps<typeof formInputContainerVariants> & {
    control: Control<TFieldValues>;
    name: TName;
    rules?: Omit<
      RegisterOptions<TFieldValues, TName>,
      "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
    label?: string;
    icon?: React.ReactNode;
    type?: "text" | "password";
    containerClassName?: string;
  };

function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  rules,
  label,
  icon,
  type = "text",
  containerClassName,
  className,
  onFocus,
  ...props
}: FormInputProps<TFieldValues, TName>) {
  const { field, fieldState } = useController({ control, name, rules });
  const inputRef = React.useRef<TextInput>(null);
  const labelId = `${name}-label`;
  const [isFocused, setIsFocused] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

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
          formInputContainerVariants({ invalid: fieldState.invalid }),
          isFocused && "border-input-focus-border",
          className
        )}
      >
        {icon}

        <TextInput
          ref={(instance) => {
            field.ref(instance);
            inputRef.current = instance;
          }}
          aria-labelledby={label ? labelId : undefined}
          accessibilityLabel={label}
          value={field.value ?? ""}
          onChangeText={field.onChange}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={() => {
            setIsFocused(false);
            field.onBlur();
          }}
          aria-invalid={fieldState.invalid}
          secureTextEntry={type === "password" && !isPasswordVisible}
          className={formInputTextVariants()}
          {...props}
        />

        {type === "password" ? (
          <Pressable onPress={() => setIsPasswordVisible((visible) => !visible)} hitSlop={8}>
            <Ionicons
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={20}
              className="text-foreground"
            />
          </Pressable>
        ) : null}
      </View>

      <FormError message={fieldState.error?.message} />
    </View>
  );
}

export { FormInput, formInputContainerVariants, formInputTextVariants };
export type { FormInputProps };
