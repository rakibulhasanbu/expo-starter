import { CopyableDetailRow } from "@/features/card/components/copyable-detail-row";
import { BANK_TRANSFER_DETAILS } from "@/features/deposit/data";
import { Share, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { ShareIcon } from "@/components/icons/share-icon";
import { Text } from "@/components/text";

export default function BankTransferDetailsScreen() {
  const handleShare = () => {
    Share.share({
      message: `Bank Name: ${BANK_TRANSFER_DETAILS.bankName}\nAccount Number: ${BANK_TRANSFER_DETAILS.accountNumber}\nAccount Name: ${BANK_TRANSFER_DETAILS.accountName}`,
    });
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="flex-row items-center gap-4 px-5 pt-10">
        <BackButton fallbackHref="/(protected)/(tabs)/home" />
      </View>

      <View className="flex-1 gap-6 px-5 pt-10">
        <View className="gap-2">
          <Text className="font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
            Bank Transfer
          </Text>
          <Text className="text-base text-subtitle">
            Receive funds directly into your NGN wallet using the account below
          </Text>
        </View>

        <View className="gap-3 rounded-[20px] bg-secondary p-2">
          <View className="gap-5 rounded-2xl bg-background py-8">
            <View className="px-4">
              <CopyableDetailRow label="Bank Name" value={BANK_TRANSFER_DETAILS.bankName} />
            </View>
            <View className="h-px w-full bg-border" />
            <View className="px-4">
              <CopyableDetailRow label="Account Number" value={BANK_TRANSFER_DETAILS.accountNumber} />
            </View>
            <View className="h-px w-full bg-border" />
            <View className="px-4">
              <CopyableDetailRow label="Account Name" value={BANK_TRANSFER_DETAILS.accountName} />
            </View>
          </View>
        </View>

        <Button size="xl" onPress={handleShare}>
          <ShareIcon size={16} />
          <Text>Share details</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
