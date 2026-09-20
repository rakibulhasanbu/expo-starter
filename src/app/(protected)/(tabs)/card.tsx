import * as React from "react";

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { FreezeIcon } from "@/components/icons/freeze-icon";
import { TrashIcon } from "@/components/icons/trash-icon";
import { Popover, type PopoverAnchor } from "@/components/popover";
import { Text } from "@/components/text";

import { CardActionButtons } from "@/features/card/components/card-action-buttons";
import { CardMoreMenu } from "@/features/card/components/card-more-menu";
import { CardPreview } from "@/features/card/components/card-preview";
import type { VirtualCard } from "@/features/card/types";
import { formatUsdBalance } from "@/features/card/utils/format-usd-balance";
import { ConfirmActionSheet } from "@/features/settings/components/confirm-action-sheet";
import { RecentTransactionsCard } from "@/features/transactions/components/recent-transactions-card";

import { useCardStore } from "@/store/card-store";

function EmptyCardState() {
  return (
    <View className="flex-1 items-center justify-center gap-[22px] bg-secondary px-5">
      <View className="w-full items-center justify-center py-6">
        <View className="w-[78%]" style={{ transform: [{ rotate: "11.7deg" }] }}>
          <CardPreview theme="dark" showVirtualLabel={false} />
        </View>
      </View>

      <View className="w-full items-center gap-6">
        <View className="items-center gap-4">
          <Text className="text-center font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
            Pay without limit with Dolo card
          </Text>
          <Text className="text-center text-xs leading-[14px] tracking-[0.15px] text-subtitle">
            Create your virtual card in seconds to enjoy fast, secure payments on your favorite websites and
            apps.
          </Text>
        </View>

        <Button size="xl" onPress={() => router.push("/virtual-card")}>
          <Text>Get virtual card</Text>
        </Button>
      </View>
    </View>
  );
}

function CardOverview({ card }: { card: VirtualCard }) {
  const toggleFreeze = useCardStore((state) => state.toggleFreeze);
  const deleteCard = useCardStore((state) => state.deleteCard);
  const freezeSheetRef = React.useRef<BottomSheetModal>(null);
  const unfreezeSheetRef = React.useRef<BottomSheetModal>(null);
  const deleteCardSheetRef = React.useRef<BottomSheetModal>(null);
  const [isTogglingFreeze, setIsTogglingFreeze] = React.useState(false);
  const [isDeletingCard, setIsDeletingCard] = React.useState(false);
  const [moreAnchor, setMoreAnchor] = React.useState<PopoverAnchor | null>(null);

  const isFrozen = card.status === "frozen";

  const handleConfirmToggleFreeze = async () => {
    setIsTogglingFreeze(true);
    try {
      await toggleFreeze();
      (isFrozen ? unfreezeSheetRef : freezeSheetRef).current?.dismiss();
    } finally {
      setIsTogglingFreeze(false);
    }
  };

  const handleConfirmDelete = async () => {
    setIsDeletingCard(true);
    try {
      await deleteCard();
      deleteCardSheetRef.current?.dismiss();
    } finally {
      setIsDeletingCard(false);
    }
  };

  return (
    <>
      <ScrollView contentContainerClassName="gap-8 px-5 pb-40 pt-4" showsVerticalScrollIndicator={false}>
        <Text className="font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">Card</Text>

        <View className="w-full gap-4">
          <CardPreview
            theme={card.theme}
            holderName={card.holderName}
            maskedNumber={card.maskedNumber}
            balanceLabel={formatUsdBalance(card.balanceUsd)}
            dimmed={isFrozen}
          />

          <CardActionButtons
            status={card.status}
            onAddMoney={() => router.push("/add-money")}
            onDetails={() => router.push("/card-details")}
            onToggleFreeze={() => (isFrozen ? unfreezeSheetRef : freezeSheetRef).current?.present()}
            onMore={setMoreAnchor}
          />
        </View>

        <RecentTransactionsCard />
      </ScrollView>

      <Popover visible={!!moreAnchor} anchor={moreAnchor} onClose={() => setMoreAnchor(null)}>
        <CardMoreMenu
          onWithdraw={() => {
            setMoreAnchor(null);
            router.push("/withdraw");
          }}
          onGetStatement={() => {
            setMoreAnchor(null);
            router.push("/get-statement");
          }}
          onDeleteCard={() => {
            setMoreAnchor(null);
            deleteCardSheetRef.current?.present();
          }}
        />
      </Popover>

      <ConfirmActionSheet
        sheetRef={freezeSheetRef}
        icon={<FreezeIcon size={24} />}
        title="Are you sure you want to freeze your card?"
        description="You will not be able to make any payment if this is done"
        confirmLabel="Yes, Freeze"
        loading={isTogglingFreeze}
        onConfirm={handleConfirmToggleFreeze}
      />

      <ConfirmActionSheet
        sheetRef={unfreezeSheetRef}
        icon={<FreezeIcon size={24} />}
        title="Unfreeze virtual card?"
        description="You will be able to carry out all transactions again"
        confirmLabel="Yes, Unfreeze"
        loading={isTogglingFreeze}
        onConfirm={handleConfirmToggleFreeze}
      />

      <ConfirmActionSheet
        sheetRef={deleteCardSheetRef}
        icon={<TrashIcon size={24} className="text-destructive" />}
        iconContainerClassName="bg-destructive/10"
        title="Delete this card?"
        description="Are you sure you want to delete your card? You wont be able to carry out transaction and this action cannot be undone. you can create a new one later."
        confirmLabel="Yes, Delete"
        loading={isDeletingCard}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default function CardTab() {
  const card = useCardStore((state) => state.card);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-secondary">
      {card ? <CardOverview card={card} /> : <EmptyCardState />}
    </SafeAreaView>
  );
}
