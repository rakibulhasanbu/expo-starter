import { View } from "react-native";

import { Text } from "@/components/text";

type ComingSoonScreenProps = {
  title: string;
  subtitle?: string;
};

export function ComingSoonScreen({ title, subtitle = "This section is coming soon." }: ComingSoonScreenProps) {
  return (
    <View className="flex-1 items-center justify-center gap-2 bg-background px-6">
      <Text variant="h3" className="text-center">
        {title}
      </Text>
      <Text className="text-center text-muted-foreground">{subtitle}</Text>
    </View>
  );
}
