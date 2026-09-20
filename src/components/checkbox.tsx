import { cn } from "@/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, type PressableProps } from "react-native";

type CheckboxProps = Omit<PressableProps, "onPress"> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

function Checkbox({ checked, onCheckedChange, disabled, className, ...props }: CheckboxProps) {
  return (
    <Pressable
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onPress={() => onCheckedChange(!checked)}
      hitSlop={8}
      className={cn(
        "size-4 items-center justify-center rounded border border-input",
        checked && "border-primary bg-primary",
        className
      )}
      {...props}
    >
      {checked ? <Ionicons name="checkmark" size={12} className="text-primary-foreground" /> : null}
    </Pressable>
  );
}

export { Checkbox };
export type { CheckboxProps };
