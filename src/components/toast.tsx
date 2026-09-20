import { useToastStore } from "@/store/toast-store";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CloseIcon } from "@/components/icons/close-icon";
import { TickCircleIcon } from "@/components/icons/tick-circle-icon";
import { Text } from "@/components/text";
import { useThemeColor } from "@/lib/theme-colors";

function Toast() {
  const { visible, type, message, hide } = useToastStore();
  const insets = useSafeAreaInsets();
  const successColor = useThemeColor("success");
  const destructiveColor = useThemeColor("destructive");

  if (!visible) return null;

  const isSuccess = type === "success";

  return (
    <View
      pointerEvents="box-none"
      className="absolute inset-x-0 top-0 z-50 items-center px-5"
      style={{ paddingTop: insets.top + 8 }}
    >
      <Animated.View
        entering={FadeInDown.duration(200)}
        exiting={FadeOutUp.duration(150)}
        className={
          isSuccess
            ? "max-w-[280px] flex-row items-center gap-2 rounded-full bg-success/10 px-3 py-2"
            : "max-w-[280px] flex-row items-center gap-2 rounded-full bg-destructive/10 px-3 py-2"
        }
      >
        {isSuccess ? (
          <TickCircleIcon size={24} color={successColor} />
        ) : (
          <Ionicons name="close-circle" size={24} color={destructiveColor} />
        )}

        <Text
          numberOfLines={2}
          className={isSuccess ? "flex-1 text-sm text-success" : "flex-1 text-sm text-destructive"}
        >
          {message}
        </Text>

        <Pressable onPress={hide} hitSlop={8}>
          <CloseIcon size={14} color={isSuccess ? successColor : destructiveColor} />
        </Pressable>
      </Animated.View>
    </View>
  );
}

export { Toast };
