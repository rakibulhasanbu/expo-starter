import * as React from "react";

import { router } from "expo-router";
import { TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { FormScreen } from "@/components/form-screen";
import { LoadingOverlay } from "@/components/loading-overlay";
import { Text } from "@/components/text";
import { useThemeColor } from "@/lib/theme-colors";

const BVN_LENGTH = 11;

export default function BankTransferBvnScreen() {
  const mutedForegroundColor = useThemeColor("mutedForeground");
  const [bvn, setBvn] = React.useState("");
  const [isVerifying, setIsVerifying] = React.useState(false);

  const handleChangeBvn = (text: string) => {
    setBvn(text.replace(/[^0-9]/g, "").slice(0, BVN_LENGTH));
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.replace("/deposit/bank-transfer/success");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="flex-row items-center gap-4 px-5 pt-10">
        <BackButton fallbackHref="/(protected)/(tabs)/home" />
      </View>

      <FormScreen
        contentContainerClassName="gap-8 px-5 pb-8 pt-10"
        footer={
          <Button size="xl" disabled={bvn.length !== BVN_LENGTH || isVerifying} onPress={handleVerify}>
            <Text>Verify</Text>
          </Button>
        }
      >
        <Text className="font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
          Kindly Provide Your BVN
        </Text>

        <View className="gap-2">
          <Text className="text-base text-foreground">BVN</Text>
          <TextInput
            value={bvn}
            onChangeText={handleChangeBvn}
            placeholder="01234567890000"
            placeholderTextColor={mutedForegroundColor}
            keyboardType="number-pad"
            maxLength={BVN_LENGTH}
            className="w-full rounded-full bg-secondary px-3 py-4 text-sm text-foreground"
          />
        </View>
      </FormScreen>

      {isVerifying ? <LoadingOverlay /> : null}
    </SafeAreaView>
  );
}
