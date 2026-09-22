import type { ImageSourcePropType } from "react-native";

import type { BalanceCurrency } from "@/lib/balance-preference-storage";

export type CurrencyCode = BalanceCurrency;

export type WalletBalance = {
  code: CurrencyCode;
  label: string;
  currencyName: string;
  flagEmoji: string;
  amount: number;
};

export type HomeCarouselSlide = {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
  buttonLabel: string;
  href: string;
};

export type HomeSummary = {
  balances: WalletBalance[];
  kycPercentage: number;
  carouselSlides: HomeCarouselSlide[];
};
