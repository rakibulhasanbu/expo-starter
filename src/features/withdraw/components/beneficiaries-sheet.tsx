import * as React from "react";

import { getErrorMessage } from "@/utils/get-error-message";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Pressable, View } from "react-native";

import { AppBottomSheetModal } from "@/components/app-bottom-sheet-modal";
import { TrashIcon } from "@/components/icons/trash-icon";
import { Popover, type PopoverAnchor } from "@/components/popover";
import { QueryErrorView } from "@/components/query-error-view";
import { SearchInput, type SearchInputHandle } from "@/components/search-input";
import { Text } from "@/components/text";

import { useDeleteBeneficiaryMutation } from "../hooks/use-withdraw-mutations";
import { useBeneficiariesQuery } from "../hooks/use-withdraw-queries";
import type { Beneficiary } from "../types";
import { BeneficiaryRow, BeneficiaryRowSkeleton } from "./beneficiary-row";

type BeneficiariesSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  onSelect: (beneficiary: Beneficiary) => void;
};

// Fixed height rather than dynamic sizing, so BottomSheetFlatList owns a real
// scroll container instead of the sheet growing to fit every row.
const SNAP_POINTS = ["55%"];

export function BeneficiariesSheet({ sheetRef, onSelect }: BeneficiariesSheetProps) {
  // Written only by SearchInput's debounced callback — never per keystroke.
  const [query, setQuery] = React.useState("");
  const searchRef = React.useRef<SearchInputHandle>(null);
  const [menuAnchor, setMenuAnchor] = React.useState<PopoverAnchor | null>(null);
  const [menuBeneficiary, setMenuBeneficiary] = React.useState<Beneficiary | null>(null);

  const { data: beneficiaries, isPending, isError, error, refetch } = useBeneficiariesQuery();
  const deleteMutation = useDeleteBeneficiaryMutation();

  const closeMenu = () => {
    setMenuAnchor(null);
    setMenuBeneficiary(null);
  };

  const handleRemove = () => {
    if (!menuBeneficiary) return;

    const { id } = menuBeneficiary;
    closeMenu();
    deleteMutation.mutate(id);
  };

  const term = query.trim().toLowerCase();
  const filtered = React.useMemo(() => {
    if (!term) return beneficiaries ?? [];
    return (beneficiaries ?? []).filter((beneficiary) =>
      [beneficiary.accountName, beneficiary.bankName, beneficiary.accountNumber].some((field) =>
        field.toLowerCase().includes(term)
      )
    );
  }, [beneficiaries, term]);

  const renderList = () => {
    if (isPending) {
      return (
        <View className="px-6">
          <BeneficiariesSkeleton />
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
        data={filtered}
        keyExtractor={(item: Beneficiary) => item.id}
        contentContainerClassName="gap-3 px-6 pb-10"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View className="h-[116px] items-center justify-center rounded-2xl border border-secondary px-4">
            <Text className="text-xs tracking-[0.15px] text-subtitle">
              {term ? "No matching beneficiaries" : "No beneficiaries"}
            </Text>
          </View>
        }
        renderItem={({ item }: { item: Beneficiary }) => (
          <BeneficiaryRow
            beneficiary={item}
            isDeleting={deleteMutation.isPending && deleteMutation.variables === item.id}
            onSelect={(beneficiary) => {
              onSelect(beneficiary);
              sheetRef.current?.dismiss();
            }}
            onPressMenu={(beneficiary, anchor) => {
              setMenuBeneficiary(beneficiary);
              setMenuAnchor(anchor);
            }}
          />
        )}
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
      onDismiss={() => {
        searchRef.current?.clear();
        closeMenu();
      }}
    >
      <View className="gap-4 px-6 pb-2 pt-2">
        <SearchInput ref={searchRef} onQueryChange={setQuery} placeholder="Search" />

        <Text className="font-urbanist-bold text-base text-foreground">Beneficiaries</Text>
      </View>

      {renderList()}

      <Popover
        visible={!!menuAnchor}
        anchor={menuAnchor}
        onClose={closeMenu}
        contentClassName="min-w-[158px] gap-0"
      >
        <Pressable className="flex-row items-center gap-2" onPress={handleRemove} hitSlop={4}>
          <TrashIcon size={16} className="text-destructive" />
          <Text className="flex-1 text-sm text-destructive">Remove</Text>
        </Pressable>
      </Popover>
    </AppBottomSheetModal>
  );
}

export function BeneficiariesSkeleton() {
  return (
    <View className="gap-3">
      <BeneficiaryRowSkeleton />
      <BeneficiaryRowSkeleton />
    </View>
  );
}
