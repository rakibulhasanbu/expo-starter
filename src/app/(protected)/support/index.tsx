import { SettingsListItem } from "@/features/settings/components/settings-list-item";
import { openTelegramSupport, openWhatsappSupport } from "@/features/support/lib/support-links";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { TelegramIcon } from "@/components/icons/telegram-icon";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { Text } from "@/components/text";

export default function SupportScreen() {
  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <ScrollView contentContainerClassName="gap-6 px-5 pb-32 pt-10" showsVerticalScrollIndicator={false}>
        <BackButton fallbackHref="/(protected)/(tabs)/settings" />

        <View className="gap-2">
          <Text variant="h3" className="tracking-[-0.25px]">
            Support
          </Text>
          <Text className="text-sm text-subtitle">
            Reach out to us on WhatsApp or Telegram and we&apos;ll help you out.
          </Text>
        </View>

        <View className="gap-3">
          <SettingsListItem icon={<WhatsappIcon size={20} />} label="WhatsApp" onPress={openWhatsappSupport} />
          <SettingsListItem icon={<TelegramIcon size={20} />} label="Telegram" onPress={openTelegramSupport} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
