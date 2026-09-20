import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Pressable, ScrollView, View } from "react-native";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";

import { MoreIcon } from "@/components/icons/more-icon";
import { QueryErrorView } from "@/components/query-error-view";
import { Text } from "@/components/text";
import { getErrorMessage } from "@/utils/get-error-message";

import { ReceiptCard } from "@/features/transactions/components/receipt-card";
import { TransactionDetailSkeleton } from "@/features/transactions/components/transaction-detail-skeleton";
import { useTransactionQuery } from "@/features/transactions/hooks/use-transactions-queries";

const SOCIAL_ICONS = [
  { key: "whatsapp", name: "logo-whatsapp" as const },
  { key: "instagram", name: "logo-instagram" as const },
  { key: "facebook", name: "logo-facebook" as const },
  { key: "linkedin", name: "logo-linkedin" as const },
  { key: "x", name: "logo-x" as const },
];

export default function ShareReceiptScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: transaction, isPending, isError, error, refetch } = useTransactionQuery(id);
  const receiptRef = useRef<View>(null);
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (!receiptRef.current || isSharing) return;

    try {
      setIsSharing(true);
      const uri = await captureRef(receiptRef, { format: "png", quality: 1 });

      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert("Sharing unavailable", "Sharing isn't supported on this device.");
        return;
      }

      await Sharing.shareAsync(uri, { mimeType: "image/png" });
    } catch {
      Alert.alert("Something went wrong", "Could not share the receipt. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  if (isPending) {
    return (
      <View className="flex-1 bg-background">
        <TransactionDetailSkeleton />
      </View>
    );
  }

  if (isError || !transaction) {
    return (
      <View className="flex-1 bg-background">
        <QueryErrorView message={getErrorMessage(error)} onRetry={refetch} />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingTop: 95, paddingHorizontal: 20 }}>
      <View className="gap-7">
        <ReceiptCard ref={receiptRef} transaction={transaction} />

        <View className="gap-2.5">
          <Text className="font-urbanist-bold text-sm">Share via</Text>

          <View className="flex-row items-center justify-between">
            {SOCIAL_ICONS.map((icon) => (
              <Pressable
                key={icon.key}
                onPress={handleShare}
                disabled={isSharing}
                className="size-[50px] items-center justify-center rounded-full border border-border bg-background"
              >
                <Ionicons name={icon.name} size={24} className="text-foreground" />
              </Pressable>
            ))}

            <Pressable
              onPress={handleShare}
              disabled={isSharing}
              className="size-[50px] items-center justify-center rounded-full border border-border bg-background"
            >
              <MoreIcon size={24} />
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
