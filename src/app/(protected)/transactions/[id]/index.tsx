import { useRef, useState } from "react";

import { ReceiptCard } from "@/features/transactions/components/receipt-card";
import { ReceiptContent } from "@/features/transactions/components/receipt-content";
import { TransactionDetailSkeleton } from "@/features/transactions/components/transaction-detail-skeleton";
import { useTransactionQuery } from "@/features/transactions/hooks/use-transactions-queries";
import * as MediaLibrary from "expo-media-library";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, Pressable, ScrollView, useWindowDimensions, View } from "react-native";
import { captureRef } from "react-native-view-shot";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { CustomerSupportIcon } from "@/components/icons/customer-support-icon";
import { QueryErrorView } from "@/components/query-error-view";
import { Text } from "@/components/text";
import { presentSupport } from "@/features/support/lib/intercom";
import { getErrorMessage } from "@/utils/get-error-message";

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: transaction, isPending, isError, error, refetch } = useTransactionQuery(id);
  const { width } = useWindowDimensions();
  const captureTargetRef = useRef<View>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleDownloadPng = async () => {
    if (!captureTargetRef.current) return;

    try {
      setIsSaving(true);
      const uri = await captureRef(captureTargetRef, { format: "png", quality: 1 });

      const { status } = await MediaLibrary.requestPermissionsAsync(true);
      if (status !== "granted") {
        Alert.alert("Permission needed", "Allow photo library access to save the receipt.");
        return;
      }

      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert("Saved", "Receipt saved to your gallery.");
    } catch {
      Alert.alert("Something went wrong", "Could not save the receipt. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <View className="flex-1 bg-secondary">
        <TransactionDetailSkeleton />
      </View>
    );
  }

  if (isError || !transaction) {
    return (
      <View className="flex-1 bg-secondary">
        <QueryErrorView message={getErrorMessage(error)} onRetry={refetch} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-secondary">
      <View className="flex-row items-center justify-between px-5 pt-16">
        <BackButton
          className="size-11 items-center justify-center rounded-full bg-background"
          fallbackHref="/(protected)/(tabs)/transactions"
        />

        <Pressable
          className="size-11 items-center justify-center rounded-full bg-background"
          onPress={() => presentSupport()}
          hitSlop={8}
        >
          <CustomerSupportIcon size={18} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 }}>
        <ReceiptContent transaction={transaction} />
      </ScrollView>

      <View className="gap-2 px-5 pb-8 pt-2">
        <Button size="xl" onPress={() => router.push(`/transactions/${transaction.id}/share`)}>
          <Text>Share Receipt</Text>
        </Button>
        <Button size="xl" variant="outline" onPress={handleDownloadPng} loading={isSaving}>
          <Text>Download PNG</Text>
        </Button>
      </View>

      {/* Off-screen capture target for "Download PNG" - never visible to the user */}
      <View pointerEvents="none" style={{ position: "absolute", top: -9999, left: 0, width: width - 40 }}>
        <ReceiptCard ref={captureTargetRef} transaction={transaction} />
      </View>
    </View>
  );
}
