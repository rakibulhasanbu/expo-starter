import * as React from "react";

import { SecurityMenuRow } from "@/features/settings/components/security-menu-row";
import {
  useNotificationPreferencesQuery,
  useUpdateNotificationPreferencesMutation,
} from "@/features/settings/hooks/use-notification-preferences";
import type { NotificationPreferences } from "@/features/settings/types";
import { useToastStore } from "@/store/toast-store";
import { getErrorMessage } from "@/utils/get-error-message";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { QueryErrorView } from "@/components/query-error-view";
import { Skeleton } from "@/components/skeleton";
import { Text } from "@/components/text";
import { ToggleSwitch } from "@/components/toggle-switch";

export default function NotificationsScreen() {
  const { data: preferences, isPending, isError, error, refetch } = useNotificationPreferencesQuery();

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="px-5 pt-10">
        <BackButton
          className="size-[45px] items-center justify-center rounded-full bg-secondary"
          fallbackHref="/(protected)/(tabs)/settings"
        />
      </View>

      {isPending ? (
        <View className="gap-4 px-5 pt-10">
          <Skeleton className="h-8 w-40 rounded-lg" />
          <Skeleton className="h-14 w-full rounded-3xl" />
          <Skeleton className="h-14 w-full rounded-3xl" />
          <Skeleton className="h-14 w-full rounded-3xl" />
        </View>
      ) : null}

      {isError ? <QueryErrorView message={getErrorMessage(error)} onRetry={refetch} /> : null}

      {preferences ? <NotificationPreferencesForm saved={preferences} /> : null}
    </SafeAreaView>
  );
}

// Mounted only once the saved preferences have loaded, so the draft starts from
// the server's values rather than from placeholder defaults.
function NotificationPreferencesForm({ saved }: { saved: NotificationPreferences }) {
  const [draft, setDraft] = React.useState<NotificationPreferences>(saved);

  const updatePreferencesMutation = useUpdateNotificationPreferencesMutation();

  const isDirty =
    draft.loginEmailNotification !== saved.loginEmailNotification ||
    draft.transactionsEmailNotification !== saved.transactionsEmailNotification ||
    draft.transactionsPushNotification !== saved.transactionsPushNotification;

  const setDraftField = (field: keyof NotificationPreferences) => (value: boolean) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const handleSave = () => {
    updatePreferencesMutation.mutate(draft, {
      onSuccess: () => {
        useToastStore.getState().show("success", "Changes saved successfully");
      },
      onError: (updateError) => useToastStore.getState().show("error", getErrorMessage(updateError)),
    });
  };

  return (
    <>
      <ScrollView contentContainerClassName="gap-5 px-5 pt-10 pb-6" showsVerticalScrollIndicator={false}>
        <Text className="font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">Notifications</Text>

        <View className="gap-6">
          <View className="gap-2">
            <Text className="text-sm text-foreground">Log In</Text>
            <SecurityMenuRow
              label="Email notification"
              right={
                <ToggleSwitch
                  value={draft.loginEmailNotification}
                  onValueChange={setDraftField("loginEmailNotification")}
                />
              }
            />
          </View>

          <View className="gap-2">
            <Text className="text-sm text-foreground">Transactions</Text>
            <View className="gap-4">
              <SecurityMenuRow
                label="Email notification"
                right={
                  <ToggleSwitch
                    value={draft.transactionsEmailNotification}
                    onValueChange={setDraftField("transactionsEmailNotification")}
                  />
                }
              />
              <SecurityMenuRow
                label="Push notification"
                right={
                  <ToggleSwitch
                    value={draft.transactionsPushNotification}
                    onValueChange={setDraftField("transactionsPushNotification")}
                  />
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="px-5 pb-2 pt-2">
        <Button
          size="xl"
          disabled={!isDirty || updatePreferencesMutation.isPending}
          loading={updatePreferencesMutation.isPending}
          onPress={handleSave}
        >
          <Text>Save changes</Text>
        </Button>
      </View>
    </>
  );
}
