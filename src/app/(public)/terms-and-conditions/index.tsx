import { View } from "react-native";

import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { safeBack } from "@/utils/safe-back";

export default function TermsAndConditions() {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background px-6">
      <Text variant="h2" className="text-center">
        Terms and Conditions
      </Text>

      <Text className="text-center text-muted-foreground">Full terms are coming soon.</Text>

      <Button variant="outline" onPress={() => safeBack("/(auth)/sign-in")} className="mt-2">
        <Text>Go back</Text>
      </Button>
    </View>
  );
}
