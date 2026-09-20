import { BlurView } from "expo-blur";
import { ActivityIndicator, View } from "react-native";

import { Text } from "@/components/text";
import { useThemeColor } from "@/lib/theme-colors";

export function LoadingOverlay() {
  const secondaryColor = useThemeColor("secondary");

  return (
    <View className="absolute inset-0 items-center justify-center">
      <BlurView intensity={20} tint="dark" className="absolute inset-0 bg-primary/50" />

      <View className="items-center gap-2">
        <ActivityIndicator size="large" color={secondaryColor} />
        <Text className="font-urbanist-medium text-sm text-secondary">Loading...</Text>
      </View>
    </View>
  );
}
