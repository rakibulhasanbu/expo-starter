import * as React from "react";

import { CryptoDepositAddressSkeleton } from "@/features/deposit/components/crypto-deposit-address-skeleton";
import { useGenerateDepositAddressMutation } from "@/features/deposit/hooks/use-crypto-deposit-mutations";
import {
  useCryptoAssetsQuery,
  useCryptoDepositAddressQuery,
} from "@/features/deposit/hooks/use-crypto-deposit-queries";
import { useToastStore } from "@/store/toast-store";
import { getErrorMessage } from "@/utils/get-error-message";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams } from "expo-router";
import { Image, Pressable, ScrollView, Share, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { ArrowSwapHorizontalIcon } from "@/components/icons/arrow-swap-horizontal-icon";
import { CopyIcon } from "@/components/icons/copy-icon";
import { InfoFilledIcon } from "@/components/icons/info-filled-icon";
import { ShareIcon } from "@/components/icons/share-icon";
import { QueryErrorView } from "@/components/query-error-view";
import { Text } from "@/components/text";
import { useThemeColor } from "@/lib/theme-colors";

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

export default function CryptoDetailsScreen() {
  const primaryForegroundColor = useThemeColor("primaryForeground");
  const { id: assetId } = useLocalSearchParams<{ id: string }>();

  const assetsQuery = useCryptoAssetsQuery();
  const asset = assetsQuery.data?.flatMap((group) => group.networks).find((item) => item.id === assetId);

  const addressQuery = useCryptoDepositAddressQuery(assetId);
  const generateAddress = useGenerateDepositAddressMutation();

  React.useEffect(() => {
    if (addressQuery.isError && !generateAddress.isPending && !generateAddress.isSuccess) {
      generateAddress.mutate(assetId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressQuery.isError, assetId]);

  const address = generateAddress.data?.data.address ?? addressQuery.data?.address;

  const isLoading =
    assetsQuery.isPending || addressQuery.isPending || (addressQuery.isError && generateAddress.isPending);
  const isError = assetsQuery.isError || (addressQuery.isError && generateAddress.isError);

  const handleCopy = async () => {
    if (!address) return;
    await Clipboard.setStringAsync(address);
    useToastStore.getState().show("success", "Address copied to clipboard");
  };

  const handleShare = () => {
    if (!address) return;
    Share.share({ message: address });
  };

  const handleRetry = () => {
    assetsQuery.refetch();
    if (addressQuery.isError) {
      generateAddress.mutate(assetId);
    } else {
      addressQuery.refetch();
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-5 pt-10">
        <BackButton fallbackHref="/(protected)/(tabs)/home" />
        <Text className="flex-1 text-center font-urbanist-bold text-base text-foreground">
          {asset?.name ?? "Crypto"} Details
        </Text>
        <View className="size-11" />
      </View>

      {isLoading ? (
        <CryptoDepositAddressSkeleton />
      ) : isError || !asset || !address ? (
        <QueryErrorView
          message={getErrorMessage(assetsQuery.error ?? addressQuery.error)}
          onRetry={handleRetry}
        />
      ) : (
        <ScrollView contentContainerClassName="gap-4 px-5 pt-6 pb-8" showsVerticalScrollIndicator={false}>
          <View className="gap-4 rounded-2xl bg-secondary p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <Image source={{ uri: asset.icon }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                <View>
                  <Text className="text-base text-foreground">{asset.name}</Text>
                  <Text className="text-xs tracking-[0.15px] text-subtitle">{asset.symbol}</Text>
                </View>
              </View>

              <View className="size-10 items-center justify-center rounded-full border-4 border-background bg-primary">
                <ArrowSwapHorizontalIcon size={16} color={primaryForegroundColor} />
              </View>

              <View className="flex-row items-center gap-3">
                <Text className="text-base leading-9">🇳🇬</Text>
                <View>
                  <Text className="text-base text-foreground">Naira</Text>
                  <Text className="text-xs tracking-[0.15px] text-subtitle">NGN</Text>
                </View>
              </View>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-primary">1 {asset.symbol}</Text>
              <Text className="text-sm text-primary">{formatNaira(asset.rateNgn)}</Text>
            </View>
          </View>

          <View className="border-info bg-info-background gap-3 rounded-lg border p-3">
            <View className="flex-row items-start gap-2">
              <InfoFilledIcon size={24} />
              <Text className="flex-1 text-sm text-primary">
                You can only receive {asset.symbol} ({asset.network}) to this address to get equivalent in
                Naira wallet, other assets may get lost
              </Text>
            </View>
          </View>

          <View className="items-center gap-6 rounded-2xl bg-secondary px-12 py-8">
            <View className="size-56 items-center justify-center overflow-hidden rounded-2xl bg-background">
              <QRCode value={address} size={201} />
            </View>
            <Text className="text-center text-sm text-primary">{address}</Text>
          </View>

          <View className="flex-row items-center gap-2">
            <Pressable
              className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-secondary bg-background py-4"
              onPress={handleCopy}
            >
              <CopyIcon size={16} />
              <Text className="text-sm text-foreground">Copy address</Text>
            </Pressable>
            <Pressable
              className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-secondary bg-primary py-4"
              onPress={handleShare}
            >
              <ShareIcon size={16} />
              <Text className="text-sm text-primary-foreground">Share address</Text>
            </Pressable>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
