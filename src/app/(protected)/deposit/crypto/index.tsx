import * as React from "react";

import { CryptoAssetListSkeleton } from "@/features/deposit/components/crypto-asset-list-skeleton";
import { useCryptoAssetsQuery } from "@/features/deposit/hooks/use-crypto-deposit-queries";
import type { CryptoAssetGroup } from "@/features/deposit/types";
import { getErrorMessage } from "@/utils/get-error-message";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { SearchNormalIcon } from "@/components/icons/search-normal-icon";
import { QueryErrorView } from "@/components/query-error-view";
import { Text } from "@/components/text";
import { useThemeColor } from "@/lib/theme-colors";

export default function AvailableCryptocurrencyScreen() {
  const mutedForegroundColor = useThemeColor("mutedForeground");
  const [search, setSearch] = React.useState("");
  const [expandedSymbol, setExpandedSymbol] = React.useState<string | null>(null);
  const { data: assetGroups, isPending, isError, error, refetch } = useCryptoAssetsQuery();

  const filteredGroups = (assetGroups ?? []).filter((group) => {
    const query = search.trim().toLowerCase();
    if (!query) return true;
    return group.name.toLowerCase().includes(query) || group.symbol.toLowerCase().includes(query);
  });

  const goToAsset = (assetId: string) => {
    router.push({ pathname: "/deposit/crypto/[id]", params: { id: assetId } });
  };

  const onPressGroup = (group: CryptoAssetGroup) => {
    if (group.networks.length === 1) {
      goToAsset(group.networks[0].id);
      return;
    }
    setExpandedSymbol((current) => (current === group.symbol ? null : group.symbol));
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-5 pt-8">
        <BackButton
          className="size-[45px] items-center justify-center rounded-full bg-secondary"
          fallbackHref="/(protected)/(tabs)/home"
        />
        <Text className="flex-1 text-center font-urbanist-bold text-base text-foreground">
          Available Cryptocurrency
        </Text>
        <View className="size-11" />
      </View>

      <View className="flex-1 gap-6 px-5 pt-6">
        <View className="flex-row items-center gap-2 rounded-full bg-secondary px-4 py-2">
          <SearchNormalIcon size={20} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search assets"
            placeholderTextColor={mutedForegroundColor}
            className="flex-1 text-sm text-foreground"
          />
        </View>

        {isPending ? (
          <CryptoAssetListSkeleton />
        ) : isError ? (
          <QueryErrorView message={getErrorMessage(error)} onRetry={refetch} />
        ) : (
          <ScrollView
            contentContainerClassName="gap-6 pb-6"
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            {filteredGroups.map((group) => (
              <View key={group.symbol} className="gap-4">
                <Pressable className="flex-row items-center gap-3" onPress={() => onPressGroup(group)}>
                  <Image source={{ uri: group.icon }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                  <View className="flex-1">
                    <Text className="text-base text-foreground">{group.name}</Text>
                    <Text className="text-xs tracking-[0.15px] text-subtitle">
                      {group.networks.length > 1 ? `${group.networks.length} networks` : group.symbol}
                    </Text>
                  </View>
                </Pressable>

                {expandedSymbol === group.symbol
                  ? group.networks.map((network) => (
                      <Pressable
                        key={network.id}
                        className="ml-12 flex-row items-center justify-between"
                        onPress={() => goToAsset(network.id)}
                      >
                        <Text className="text-sm text-foreground">{network.network}</Text>
                        <Text className="text-xs text-subtitle">{network.symbol}</Text>
                      </Pressable>
                    ))
                  : null}
              </View>
            ))}

            {filteredGroups.length === 0 ? (
              <Text className="text-center text-sm text-subtitle">No matching assets</Text>
            ) : null}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
