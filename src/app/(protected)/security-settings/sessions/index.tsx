import * as React from "react";

import {
  useRevokeAllSessionsMutation,
  useRevokeSessionMutation,
  useSessionsQuery,
} from "@/features/settings/hooks/use-sessions";
import type { AuthSession } from "@/features/settings/types";
import { useToastStore } from "@/store/toast-store";
import { getErrorMessage } from "@/utils/get-error-message";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlatList, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { ConfirmActionSheet } from "@/features/settings/components/confirm-action-sheet";
import { LogoutIcon } from "@/components/icons/logout-icon";
import { TrashIcon } from "@/components/icons/trash-icon";
import { QueryErrorView } from "@/components/query-error-view";
import { Skeleton } from "@/components/skeleton";
import { Text } from "@/components/text";

const formatLastUsed = (isoDate: string): string => {
  const minutes = Math.floor((Date.now() - new Date(isoDate).getTime()) / 60_000);

  if (minutes < 1) return "Active now";
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 60 * 24) return `${Math.floor(minutes / 60)}h ago`;
  return `${Math.floor(minutes / (60 * 24))}d ago`;
};

const describeDevice = (session: AuthSession): string =>
  session.deviceName ?? session.deviceType ?? "Unknown device";

export default function SessionsScreen() {
  const { data: sessions, isPending, isError, error, refetch } = useSessionsQuery();
  const revokeSession = useRevokeSessionMutation();
  const revokeAll = useRevokeAllSessionsMutation();

  const revokeAllSheetRef = React.useRef<BottomSheetModal>(null);

  const onRevoke = (session: AuthSession) => {
    revokeSession.mutate(session.id, {
      onSuccess: () => useToastStore.getState().show("success", "Device signed out"),
      onError: (revokeError) =>
        useToastStore.getState().show("error", getErrorMessage(revokeError)),
    });
  };

  const onRevokeAll = () => {
    revokeAll.mutate(undefined, {
      onError: (revokeError) =>
        useToastStore.getState().show("error", getErrorMessage(revokeError)),
    });
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="px-5 pt-10">
        <BackButton
          className="size-[45px] items-center justify-center rounded-full bg-secondary"
          fallbackHref="/(protected)/security-settings"
        />
      </View>

      <View className="gap-2 px-5 pt-10">
        <Text className="font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
          Active Devices
        </Text>
        <Text className="text-base text-subtitle">
          Every device currently signed in to your account. Signing one out revokes its access
          immediately.
        </Text>
      </View>

      {isPending ? (
        <View className="gap-4 px-5 pt-8">
          <Skeleton className="h-20 w-full rounded-3xl" />
          <Skeleton className="h-20 w-full rounded-3xl" />
        </View>
      ) : null}

      {isError ? <QueryErrorView message={getErrorMessage(error)} onRetry={refetch} /> : null}

      {!isPending && !isError ? (
        <FlatList
          data={sessions}
          keyExtractor={(session) => session.id}
          contentContainerClassName="gap-4 px-5 pb-8 pt-8"
          ListEmptyComponent={
            <Text className="text-center text-base text-subtitle">No active devices.</Text>
          }
          renderItem={({ item }) => (
            <View className="flex-row items-center gap-3 rounded-3xl bg-secondary p-4">
              <View className="flex-1 gap-1">
                <View className="flex-row items-center gap-2">
                  <Text className="font-urbanist-bold text-base text-foreground">
                    {describeDevice(item)}
                  </Text>
                  {item.isCurrent ? (
                    <View className="rounded-full bg-background px-2 py-0.5">
                      <Text className="text-xs text-subtitle">This device</Text>
                    </View>
                  ) : null}
                </View>
                <Text className="text-sm text-subtitle">
                  {formatLastUsed(item.lastUsedAt)}
                  {item.ipAddress ? ` · ${item.ipAddress}` : ""}
                </Text>
              </View>

              <Pressable
                className="size-10 items-center justify-center rounded-full bg-background active:opacity-70"
                disabled={revokeSession.isPending}
                onPress={() => onRevoke(item)}
                accessibilityLabel={
                  item.isCurrent ? "Sign out this device" : `Sign out ${describeDevice(item)}`
                }
              >
                <TrashIcon size={18} />
              </Pressable>
            </View>
          )}
          ListFooterComponent={
            sessions && sessions.length > 0 ? (
              <Pressable
                className="mt-4 items-center py-3 active:opacity-70"
                onPress={() => revokeAllSheetRef.current?.present()}
              >
                <Text className="font-urbanist-bold text-base text-destructive">
                  Sign out all devices
                </Text>
              </Pressable>
            ) : null
          }
        />
      ) : null}

      <ConfirmActionSheet
        sheetRef={revokeAllSheetRef}
        icon={<LogoutIcon size={24} />}
        title="Sign out everywhere?"
        description="This signs out every device, including this one. You'll need to sign in again."
        confirmLabel="Sign out all"
        loading={revokeAll.isPending}
        onConfirm={onRevokeAll}
      />
    </SafeAreaView>
  );
}
