import * as React from "react";

import { ConfirmActionSheet } from "@/features/settings/components/confirm-action-sheet";
import { ProfileSummaryRow } from "@/features/settings/components/profile-summary-row";
import { SettingsListItem } from "@/features/settings/components/settings-list-item";
import { useDeleteAccountMutation } from "@/features/settings/hooks/use-settings-mutations";
import { presentSupport } from "@/features/support/lib/intercom";
import { useAuthStore } from "@/store/auth-store";
import { useThemeStore } from "@/store/theme-store";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CalculatorIcon } from "@/components/icons/calculator-icon";
import { CustomerSupportIcon } from "@/components/icons/customer-support-icon";
import { DocumentTextIcon } from "@/components/icons/document-text-icon";
import { GiftIcon } from "@/components/icons/gift-icon";
import { InfoCircleIcon } from "@/components/icons/info-circle-icon";
import { LockIcon } from "@/components/icons/lock-icon";
import { LogoutIcon } from "@/components/icons/logout-icon";
import { MoonIcon } from "@/components/icons/moon-icon";
import { NotificationIcon } from "@/components/icons/notification-icon";
import { ReceiptIcon } from "@/components/icons/receipt-icon";
import { SunIcon } from "@/components/icons/sun-icon";
import { TrashIcon } from "@/components/icons/trash-icon";
import { Text } from "@/components/text";
import { ToggleSwitch } from "@/components/toggle-switch";

export default function SettingsTab() {
  const deleteAccountMutation = useDeleteAccountMutation();
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const logoutSheetRef = React.useRef<BottomSheetModal>(null);
  const deleteSheetRef = React.useRef<BottomSheetModal>(null);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-secondary">
      <ScrollView contentContainerClassName="gap-4 px-5 pb-40 pt-10" showsVerticalScrollIndicator={false}>
        <Text variant="h3" className="tracking-[-0.25px]">
          Settings
        </Text>

        <ProfileSummaryRow />

        <View className="gap-2">
          <Text className="text-xs tracking-[0.15px] text-subtitle">Account</Text>

          <View className="gap-3">
            <SettingsListItem
              icon={<NotificationIcon size={16} />}
              label="Notifications"
              onPress={() => {
                router.push("/notifications");
              }}
            />
            <SettingsListItem
              icon={<ReceiptIcon size={16} />}
              label="Transaction Limits"
              onPress={() => {
                router.push("/transaction-limits");
              }}
            />
            <SettingsListItem
              icon={<DocumentTextIcon size={16} />}
              label="Account Statements"
              onPress={() => {
                router.push("/account-statements");
              }}
            />
            <SettingsListItem
              icon={<LockIcon size={16} />}
              label="Security Settings"
              onPress={() => {
                router.push("/security-settings");
              }}
            />
          </View>
        </View>

        <View className="gap-2">
          <Text className="text-xs tracking-[0.15px] text-subtitle">Appearance</Text>

          <View className="gap-3">
            <SettingsListItem
              icon={theme === "dark" ? <MoonIcon size={16} /> : <SunIcon size={16} />}
              label="Dark mode"
              trailing={
                <ToggleSwitch
                  value={theme === "dark"}
                  onValueChange={(value) => setTheme(value ? "dark" : "light")}
                />
              }
              onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
          </View>
        </View>

        <View className="gap-2">
          <Text className="text-xs tracking-[0.15px] text-subtitle">Others</Text>

          <View className="gap-3">
            <SettingsListItem
              icon={<GiftIcon size={16} />}
              label="Refer and earn"
              onPress={() => {
                router.push("/refer-and-earn");
              }}
            />
            <SettingsListItem
              icon={<CalculatorIcon size={16} />}
              label="Rate Calculator"
              onPress={() => {
                router.push("/rate-calculator");
              }}
            />
            <SettingsListItem
              icon={<InfoCircleIcon size={16} />}
              label="About Dolo"
              onPress={() => {
                router.push("/about-dolo");
              }}
            />
            <SettingsListItem
              icon={<CustomerSupportIcon size={20} />}
              label="Support"
              onPress={() => {
                presentSupport();
              }}
            />
            <SettingsListItem
              icon={<LogoutIcon size={16} />}
              label="Log Out"
              onPress={() => {
                logoutSheetRef.current?.present();
              }}
            />
            <SettingsListItem
              icon={<TrashIcon size={16} className="text-destructive" />}
              label="Delete account"
              destructive
              onPress={() => {
                deleteSheetRef.current?.present();
              }}
            />
          </View>
        </View>
      </ScrollView>

      <ConfirmActionSheet
        sheetRef={logoutSheetRef}
        icon={<LogoutIcon size={20} />}
        title="Log out"
        description="Are you sure you want to log out of your account ? You can login again later"
        confirmLabel="Yes, Log out"
        onConfirm={() => {
          logoutSheetRef.current?.dismiss();
          useAuthStore.getState().signOut();
        }}
      />

      <ConfirmActionSheet
        sheetRef={deleteSheetRef}
        icon={<TrashIcon size={24} className="text-destructive" />}
        iconContainerClassName="bg-destructive/10"
        title="Delete this account?"
        description="Are you sure you want to delete your account? You wont be able to carry out transaction and this action cannot be undone."
        confirmLabel="Yes, Delete"
        loading={deleteAccountMutation.isPending}
        onConfirm={() => deleteAccountMutation.mutate()}
      />
    </SafeAreaView>
  );
}
