import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { CloseCircleIcon } from "@/components/icons/close-circle-icon";
import { Text } from "@/components/text";

export default function WithdrawBankTransferFailedScreen() {
  const { message } = useLocalSearchParams<{ message?: string }>();

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 items-center justify-center gap-8 bg-background px-5">
      <CloseCircleIcon size={80} />

      <View className="w-full gap-8">
        <View className="gap-2">
          <Text className="text-center font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
            Transaction failed
          </Text>
          <Text className="text-center text-base text-subtitle">
            {message || "Your transaction is not successful, kindly try again."}
          </Text>
        </View>

        <Button size="xl" onPress={() => router.replace("/withdraw/bank-transfer")}>
          <Text>Go back</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
