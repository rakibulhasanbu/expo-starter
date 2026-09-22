import { Linking } from "react-native";

import { supportConfig } from "@/config";

export const openWhatsappSupport = async () => {
  const digits = supportConfig.whatsappNumber.replace(/[^\d]/g, "");
  await Linking.openURL(`https://wa.me/${digits}`);
};

export const openTelegramSupport = async () => {
  await Linking.openURL(`https://t.me/${supportConfig.telegramUsername}`);
};
