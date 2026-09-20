import * as React from "react";

import { useIsPinExistQuery } from "@/features/auth/hooks/use-auth-queries";
import { EnterPinSheet } from "@/features/card/components/enter-pin-sheet";
import { BeneficiariesSheet } from "@/features/withdraw/components/beneficiaries-sheet";
import { SelectBankSheet } from "@/features/withdraw/components/select-bank-sheet";
import {
  useCreateWithdrawalMutation,
  useSaveBeneficiaryMutation,
  useVerifyBankAccountMutation,
} from "@/features/withdraw/hooks/use-withdraw-mutations";
import { useBanksQuery, useWithdrawConfigQuery } from "@/features/withdraw/hooks/use-withdraw-queries";
import type { Bank, Beneficiary } from "@/features/withdraw/types";
import { useToastStore } from "@/store/toast-store";
import { getErrorMessage } from "@/utils/get-error-message";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, Pressable, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { FormScreen } from "@/components/form-screen";
import { ArrowDownIcon } from "@/components/icons/arrow-down-icon";
import { ArrowRightIcon } from "@/components/icons/arrow-right-icon";
import { VerifyBadgeIcon } from "@/components/icons/verify-badge-icon";
import { LoadingOverlay } from "@/components/loading-overlay";
import { Text } from "@/components/text";
import { useThemeColor } from "@/lib/theme-colors";

const ACCOUNT_NUMBER_LENGTH = 10;
const NARRATION_MAX_LENGTH = 32;

const formatNaira = (amount: number) =>
  `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function WithdrawBankTransferScreen() {
  const mutedForegroundColor = useThemeColor("mutedForeground");
  const { balance } = useLocalSearchParams<{ balance: string }>();
  const ngnBalance = Number(balance) || 0;

  const [amount, setAmount] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [selectedBank, setSelectedBank] = React.useState<Bank | null>(null);
  const [selectedBeneficiary, setSelectedBeneficiary] = React.useState<Beneficiary | null>(null);
  const [narration, setNarration] = React.useState("");

  const bankSheetRef = React.useRef<BottomSheetModal>(null);
  const pinSheetRef = React.useRef<BottomSheetModal>(null);
  const beneficiariesSheetRef = React.useRef<BottomSheetModal>(null);

  const showToast = useToastStore((state) => state.show);

  const { data: banks } = useBanksQuery();
  const { data: config } = useWithdrawConfigQuery();
  const { data: isPinExist } = useIsPinExistQuery();

  const verifyMutation = useVerifyBankAccountMutation();
  const saveBeneficiaryMutation = useSaveBeneficiaryMutation();
  const createWithdrawalMutation = useCreateWithdrawalMutation();

  const { mutate: verifyAccount, reset: resetVerification } = verifyMutation;

  // A beneficiary already carries a verified name, so only a hand-typed
  // account/bank pair needs the lookup.
  React.useEffect(() => {
    if (selectedBeneficiary) return;

    if (accountNumber.length !== ACCOUNT_NUMBER_LENGTH || !selectedBank) {
      resetVerification();
      return;
    }

    verifyAccount({ bankId: selectedBank.id, accountNumber });
  }, [accountNumber, selectedBank, selectedBeneficiary, verifyAccount, resetVerification]);

  const amountValue = Number(amount) || 0;
  const feePercentage = config?.serviceChargePercentage ?? 0;
  const serviceCharge = (amountValue * feePercentage) / 100;
  const finalAmount = amountValue + serviceCharge;

  const resolvedAccountName =
    selectedBeneficiary?.accountName ?? verifyMutation.data?.data.accountName ?? null;

  const amountError = (() => {
    if (!amount) return null;
    if (amountValue <= 0) return "Enter a valid amount";
    if (config && amountValue < config.minWithdrawalAmount) {
      return `Minimum withdrawal is ${formatNaira(config.minWithdrawalAmount)}`;
    }
    if (finalAmount > ngnBalance) {
      return `Insufficient balance — this withdrawal costs ${formatNaira(finalAmount)} including fees`;
    }
    return null;
  })();

  const isAmountValid = amountValue > 0 && !amountError;
  const isSubmitting = saveBeneficiaryMutation.isPending || createWithdrawalMutation.isPending;
  const isNextEnabled = isAmountValid && Boolean(resolvedAccountName) && !isSubmitting;

  const handleChangeAmount = (text: string) => {
    setAmount(text.replace(/[^0-9.]/g, ""));
  };

  const handleChangeAccountNumber = (text: string) => {
    setSelectedBeneficiary(null);
    setAccountNumber(text.replace(/[^0-9]/g, "").slice(0, ACCOUNT_NUMBER_LENGTH));
  };

  // Both are memoized so the sheets' own memoized rows stay stable while the
  // user types in their search boxes.
  const handleSelectBank = React.useCallback((bank: Bank) => {
    setSelectedBeneficiary(null);
    setSelectedBank(bank);
  }, []);

  const handleSelectBeneficiary = React.useCallback(
    (beneficiary: Beneficiary) => {
      setSelectedBeneficiary(beneficiary);
      setAccountNumber(beneficiary.accountNumber);
      resetVerification();

      // Prefer the directory entry so the bank row keeps its logo; fall back to
      // what the beneficiary itself carries if the list hasn't loaded.
      const bank = banks?.find((item) => item.id === beneficiary.bankId);
      setSelectedBank(
        bank ?? {
          id: beneficiary.bankId,
          name: beneficiary.bankName,
          slug: "",
          country: "",
          currency: "NGN",
          type: "",
          avatar: "",
        }
      );
    },
    [banks, resetVerification]
  );

  const handlePressNext = () => {
    if (isPinExist === false) {
      showToast("error", "Set a transaction PIN before withdrawing");
      router.push("/security-settings/set-pin");
      return;
    }

    pinSheetRef.current?.present();
  };

  const handlePinSubmit = async (pin: string) => {
    pinSheetRef.current?.dismiss();

    const trimmedNarration = narration.trim() || undefined;

    try {
      // Breet pays out to a saved bank only, so an unsaved recipient is saved
      // first. The endpoint is idempotent, so a repeat submit won't duplicate.
      const breetBankId =
        selectedBeneficiary?.id ??
        (
          await saveBeneficiaryMutation.mutateAsync({
            bankId: selectedBank!.id,
            accountNumber,
            narration: trimmedNarration,
          })
        ).data.id;

      await createWithdrawalMutation.mutateAsync({
        payload: { amount: amountValue, breetBankId, narration: trimmedNarration },
        pin,
      });

      router.replace({
        pathname: "/withdraw/bank-transfer/success",
        params: { amount: String(amountValue) },
      });
    } catch (error) {
      router.replace({
        pathname: "/withdraw/bank-transfer/failed",
        params: { message: getErrorMessage(error) },
      });
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="flex-row items-center gap-4 px-5 pt-10">
        <BackButton fallbackHref="/(protected)/(tabs)/home" />
      </View>

      <FormScreen
        contentContainerClassName="gap-6 px-5 pb-8 pt-10"
        footer={
          <Button size="xl" disabled={!isNextEnabled} onPress={handlePressNext}>
            <Text>Next</Text>
          </Button>
        }
      >
        <View className="gap-4">
          <Text className="font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">Send NGN</Text>

          <View className="h-16 flex-row items-center justify-between rounded-2xl bg-primary p-4">
            <View className="flex-row items-center gap-2">
              <Text className="text-[30px] leading-8">🇳🇬</Text>
              <View>
                <Text className="text-sm text-primary-foreground">Naira</Text>
                <Text className="text-[10px] tracking-[0.25px] text-primary-foreground">NGN</Text>
              </View>
            </View>
            <Text className="font-urbanist-bold text-sm text-primary-foreground">
              {formatNaira(ngnBalance)}
            </Text>
          </View>
        </View>

        <View className="gap-6">
          <View className="gap-2">
            <Text className="font-urbanist-bold text-base text-foreground">Amount</Text>
            <TextInput
              value={amount}
              onChangeText={handleChangeAmount}
              placeholder="Enter amount"
              placeholderTextColor={mutedForegroundColor}
              keyboardType="decimal-pad"
              className="w-full rounded-full bg-secondary px-3 py-4 text-sm text-foreground"
            />
            {amountError ? (
              <FormError message={amountError} />
            ) : amountValue > 0 ? (
              <Text className="text-xs tracking-[0.15px] text-subtitle">
                Fee {formatNaira(serviceCharge)} · You&apos;ll be debited {formatNaira(finalAmount)}
              </Text>
            ) : null}
          </View>

          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="font-urbanist-bold text-base text-foreground">Recipient Account Number</Text>
              <Pressable
                className="flex-row items-center gap-2"
                hitSlop={8}
                onPress={() => beneficiariesSheetRef.current?.present()}
              >
                <Text className="font-urbanist-bold text-xs tracking-[0.15px] text-subtitle">
                  Beneficiaries
                </Text>
                <ArrowRightIcon size={14} />
              </Pressable>
            </View>
            <TextInput
              value={accountNumber}
              onChangeText={handleChangeAccountNumber}
              placeholder="Enter account number"
              placeholderTextColor={mutedForegroundColor}
              keyboardType="number-pad"
              maxLength={ACCOUNT_NUMBER_LENGTH}
              className="w-full rounded-full bg-secondary px-3 py-4 text-sm text-foreground"
            />
          </View>

          <View className="gap-3">
            <View className="gap-2">
              <Text className="font-urbanist-bold text-base text-foreground">Select Bank</Text>
              <Pressable
                onPress={() => bankSheetRef.current?.present()}
                className="w-full flex-row items-center gap-2 rounded-full bg-secondary p-3"
              >
                <View className="flex-1 flex-row items-center gap-2">
                  {selectedBank ? (
                    <>
                      {selectedBank.avatar ? (
                        <Image
                          source={{ uri: selectedBank.avatar }}
                          style={{ width: 28, height: 28, borderRadius: 6 }}
                          resizeMode="contain"
                        />
                      ) : null}
                      <Text className="flex-1 text-base text-foreground" numberOfLines={1}>
                        {selectedBank.name}
                      </Text>
                    </>
                  ) : (
                    <Text className="flex-1 text-sm text-subtitle">select bank name</Text>
                  )}
                </View>
                <ArrowDownIcon size={20} />
              </Pressable>
            </View>

            {verifyMutation.isPending ? (
              <View className="flex-row items-center gap-2">
                <ActivityIndicator size="small" />
                <Text className="text-sm text-subtitle">Verifying account…</Text>
              </View>
            ) : verifyMutation.isError ? (
              <FormError message={getErrorMessage(verifyMutation.error)} />
            ) : resolvedAccountName ? (
              <View className="flex-row items-center gap-2">
                <VerifyBadgeIcon size={16} />
                <Text className="font-urbanist-bold text-sm text-subtitle">{resolvedAccountName}</Text>
              </View>
            ) : null}
          </View>

          <View className="gap-2">
            <Text className="font-urbanist-bold text-base text-foreground">
              Narration <Text className="font-urbanist-medium text-base text-foreground">(Optional)</Text>
            </Text>
            <TextInput
              value={narration}
              onChangeText={setNarration}
              placeholder="Enter narration"
              placeholderTextColor={mutedForegroundColor}
              maxLength={NARRATION_MAX_LENGTH}
              className="w-full rounded-full bg-secondary px-3 py-4 text-sm text-foreground"
            />
          </View>
        </View>
      </FormScreen>

      <SelectBankSheet sheetRef={bankSheetRef} selectedId={selectedBank?.id} onSelect={handleSelectBank} />

      <BeneficiariesSheet sheetRef={beneficiariesSheetRef} onSelect={handleSelectBeneficiary} />

      <EnterPinSheet
        sheetRef={pinSheetRef}
        amountLabel={formatNaira(finalAmount)}
        loading={isSubmitting}
        onSubmit={handlePinSubmit}
      />

      {isSubmitting ? <LoadingOverlay /> : null}
    </SafeAreaView>
  );
}
