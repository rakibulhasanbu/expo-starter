import { safeBack } from "@/utils/safe-back";
import { type Href } from "expo-router";
import { Pressable, type PressableProps } from "react-native";

import { ArrowLeftIcon } from "@/components/icons/arrow-left-icon";

type BackButtonProps = Omit<PressableProps, "children"> & {
  fallbackHref: Href;
};

function BackButton({ onPress, fallbackHref, className, ...props }: BackButtonProps) {
  return (
    <Pressable
      className={className ?? "size-[45px] items-center justify-center rounded-full bg-secondary"}
      onPress={onPress ?? (() => safeBack(fallbackHref))}
      hitSlop={8}
      {...props}
    >
      <ArrowLeftIcon size={20} />
    </Pressable>
  );
}

export { BackButton };
