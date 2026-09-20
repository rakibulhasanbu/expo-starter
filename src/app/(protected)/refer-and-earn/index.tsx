import { ReferralCodeCard } from "@/features/referral/components/referral-code-card";
import { ReferralEmptyState } from "@/features/referral/components/referral-empty-state";
import { ReferralListItem } from "@/features/referral/components/referral-list-item";
import { REFERRAL_SUMMARY, REFERRALS } from "@/features/referral/data";
import { Image } from "expo-image";
import { Alert, ScrollView, Share, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { Text } from "@/components/text";

export default function ReferAndEarnScreen() {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me on Dolo! Use my referral code ${REFERRAL_SUMMARY.code} when you sign up and get ₦${REFERRAL_SUMMARY.bonusAmount.toLocaleString(
          "en-NG"
        )} when you deposit crypto worth $${REFERRAL_SUMMARY.minimumDepositUsd} in your naira wallet.`,
      });
    } catch {
      Alert.alert("Something went wrong", "Could not share your referral link. Please try again.");
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <ScrollView contentContainerClassName="gap-10 px-5 pb-32 pt-10" showsVerticalScrollIndicator={false}>
        <BackButton fallbackHref="/(protected)/(tabs)/settings" />

        <View className="gap-6">
          <Image
            source={require("../../../../assets/images/refer-and-earn/gift-hero.png")}
            style={{ width: 149, height: 112 }}
            contentFit="cover"
          />

          <View className="gap-6">
            <View className="gap-2">
              <Text variant="h3" className="tracking-[-0.25px]">
                Refer and earn
              </Text>
              <Text className="text-sm text-foreground">
                Share your referral code to others and get{" "}
                <Text className="font-urbanist-bold text-sm text-foreground">
                  ₦{REFERRAL_SUMMARY.bonusAmount.toLocaleString("en-NG")}{" "}
                </Text>
                when they sign up and they deposit crypto worth ${REFERRAL_SUMMARY.minimumDepositUsd} in their
                naira wallet
              </Text>
            </View>

            <View className="gap-2">
              <ReferralCodeCard code={REFERRAL_SUMMARY.code} />

              <View className="w-full flex-row items-center justify-between rounded-2xl border border-dashed border-muted bg-background px-2 py-3">
                <Text className="text-sm text-foreground">Total earned</Text>
                <Text className="font-urbanist-bold text-sm text-foreground">
                  ₦{REFERRAL_SUMMARY.totalEarned.toLocaleString("en-NG")}
                </Text>
              </View>
            </View>
          </View>

          <View className="gap-2">
            <Text className="text-xs tracking-[0.15px] text-subtitle">Your referrals</Text>

            {REFERRALS.length === 0 ? (
              <ReferralEmptyState />
            ) : (
              <View className="w-full gap-4 rounded-2xl border border-secondary px-3 py-4">
                {REFERRALS.map((referral, index) => (
                  <View key={referral.id} className="gap-4">
                    {index > 0 ? <View className="h-px w-full bg-secondary" /> : null}
                    <ReferralListItem referral={referral} />
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View className="absolute inset-x-5 bottom-6">
        <Button size="xl" onPress={handleShare}>
          <Text>Share referral link</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
