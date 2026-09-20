import * as React from "react";

import { getErrorMessage } from "@/utils/get-error-message";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Image, Pressable, View } from "react-native";

import { AppBottomSheetModal } from "@/components/app-bottom-sheet-modal";
import { QueryErrorView } from "@/components/query-error-view";
import { SearchInput, type SearchInputHandle } from "@/components/search-input";
import { Skeleton } from "@/components/skeleton";
import { Text } from "@/components/text";

import { useBanksQuery } from "../hooks/use-withdraw-queries";
import type { Bank } from "../types";

type SelectBankSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  selectedId?: string;
  onSelect: (bank: Bank) => void;
};

// The directory runs to hundreds of banks, so the sheet takes a fixed height and
// lets BottomSheetFlatList scroll inside it rather than sizing to its content.
const SNAP_POINTS = ["80%"];

type BankListItemProps = {
  bank: Bank;
  isSelected: boolean;
  onPress: (bank: Bank) => void;
};

/**
 * Memoized so typing in the search box re-renders only the rows whose props
 * actually changed — re-rendering the whole list per keystroke is what made the
 * input drop and duplicate characters.
 */
const BankListItem = React.memo(function BankListItem({ bank, isSelected, onPress }: BankListItemProps) {
  return (
    <Pressable className="flex-row items-center justify-between p-4" onPress={() => onPress(bank)}>
      <View className="flex-1 flex-row items-center gap-2">
        <Image
          source={{ uri: bank.avatar }}
          style={{ width: 28, height: 28, borderRadius: 6 }}
          resizeMode="contain"
        />
        <Text className="flex-1 text-base text-foreground" numberOfLines={1}>
          {bank.name}
        </Text>
      </View>

      <Ionicons
        name={isSelected ? "radio-button-on" : "radio-button-off"}
        size={24}
        className={isSelected ? "text-foreground" : "text-muted-foreground"}
      />
    </Pressable>
  );
});

export function SelectBankSheet({ sheetRef, selectedId, onSelect }: SelectBankSheetProps) {
  // Written only by SearchInput's debounced callback — never per keystroke.
  const [query, setQuery] = React.useState("");
  const searchRef = React.useRef<SearchInputHandle>(null);

  const { data: banks, isPending, isError, error, refetch } = useBanksQuery();

  const filteredBanks = React.useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return banks ?? [];
    return (banks ?? []).filter((bank) => bank.name.toLowerCase().includes(term));
  }, [banks, query]);

  const handleSelect = React.useCallback(
    (bank: Bank) => {
      onSelect(bank);
      sheetRef.current?.dismiss();
    },
    [onSelect, sheetRef]
  );

  const renderItem = React.useCallback(
    ({ item }: { item: Bank }) => (
      <BankListItem bank={item} isSelected={item.id === selectedId} onPress={handleSelect} />
    ),
    [selectedId, handleSelect]
  );

  const renderList = () => {
    if (isPending) {
      return (
        <View className="px-6">
          <SelectBankSkeleton />
        </View>
      );
    }

    if (isError) {
      return (
        <View className="px-6">
          <QueryErrorView compact message={getErrorMessage(error)} onRetry={refetch} />
        </View>
      );
    }

    return (
      <BottomSheetFlatList
        data={filteredBanks}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
        initialNumToRender={12}
        maxToRenderPerBatch={12}
        windowSize={7}
        contentContainerClassName="px-6 pb-10"
        ListEmptyComponent={
          <View className="h-[116px] items-center justify-center">
            <Text className="text-xs tracking-[0.15px] text-subtitle">No banks found</Text>
          </View>
        }
      />
    );
  };

  return (
    <AppBottomSheetModal
      ref={sheetRef}
      snapPoints={SNAP_POINTS}
      enableDynamicSizing={false}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      onDismiss={() => searchRef.current?.clear()}
    >
      <View className="gap-6 px-6 pb-4 pt-2">
        <Text variant="h4" className="text-center tracking-[-0.25px]">
          Select Bank
        </Text>

        <SearchInput ref={searchRef} onQueryChange={setQuery} placeholder="Search bank" />
      </View>

      {renderList()}
    </AppBottomSheetModal>
  );
}

const keyExtractor = (item: Bank) => item.id;

export function SelectBankSkeleton() {
  return (
    <View>
      {Array.from({ length: 6 }).map((_, index) => (
        <View key={index} className="flex-row items-center justify-between p-4">
          <View className="flex-1 flex-row items-center gap-2">
            <Skeleton className="size-7 rounded-md" />
            <Skeleton className="h-4 w-40 rounded-full" />
          </View>
          <Skeleton className="size-6 rounded-full" />
        </View>
      ))}
    </View>
  );
}
