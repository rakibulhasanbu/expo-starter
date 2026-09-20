import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { VerifyBadgeIcon } from "@/components/icons/verify-badge-icon";
import { Text } from "@/components/text";

export default function ForgotPasswordSuccess() {
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView
        edges={["top", "bottom"]}
        className="flex-1 items-center justify-center gap-8 bg-background px-5"
      >
        <VerifyBadgeIcon size={80} />

        <View className="w-full gap-8">
          <View className="gap-2">
            <Text className="text-center font-urbanist-bold text-[24px] tracking-[-0.25px] text-foreground">
              Successful
            </Text>
            <Text className="text-subtitle text-center text-base">
              Your password has been set successfully
            </Text>
          </View>

          <Button onPress={() => router.replace("/(auth)/sign-in")} size="xl">
            <Text>Log in</Text>
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
}
