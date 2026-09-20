import type { CardFeeInfoItem, CardTheme, VirtualCard } from "./types";

// No backend endpoint exists yet for virtual cards — the Card tab reads this
// sentinel to decide whether to render the empty state or the card itself.
// Swap for a real query once a create/get-card API is available.
export const INITIAL_CARD: VirtualCard | null = null;

export const DEFAULT_MASKED_NUMBER = "**** **** **** ****";

export const DEFAULT_CARD_NUMBER = "1234 1234 1234 1234";
export const DEFAULT_CVV = "123";
export const DEFAULT_EXPIRY_DATE = "11/29";
export const DEFAULT_BILLING_ADDRESS = "123 Z Sisi street, MidTown Delaware US";
export const DEFAULT_ZIP_CODE = "1122sskschuf99";

// Illustrative NGN -> USD conversion used by the Add Money flow. No real FX
// provider exists yet, so this mirrors the rate/fee shown in the Figma mock.
export const NGN_TO_USD_RATE = 0.0007;
export const ADD_MONEY_CONVERSION_FEE_NAIRA = 3000;
export const ADD_MONEY_QUICK_AMOUNTS = [5000, 10000, 20000, 50000];

// Illustrative USD -> NGN conversion used by the Withdraw flow, mirroring the
// rate/fee shown in the Figma mock. No real FX provider exists yet.
export const USD_TO_NGN_RATE = 1380;
export const WITHDRAW_CONVERSION_FEE_USD = 1;
export const WITHDRAW_QUICK_AMOUNTS_USD = [20, 50, 100];

export const CARD_THEMES: CardTheme[] = ["dark", "red", "white"];

export const CARD_THEME_COLORS: Record<CardTheme, string> = {
  dark: "#231F20",
  red: "#B8160A",
  white: "#F1F2F3",
};

export const CARD_FEE_INFO: CardFeeInfoItem[] = [
  {
    id: "creation-fee",
    icon: "card",
    title: "Card Creation Fee",
    description:
      "You will be charged a one time creation fee of $2 and a funding fee of at least $1 which equivalent will be removed from your naira wallet.",
  },
  {
    id: "funding-usage",
    icon: "money",
    title: "Card Funding & Usage",
    description: "Your virtual card must be funded before it can be used for online payments.",
  },
  {
    id: "termination",
    icon: "warning",
    title: "Card Termination",
    description: "Repeated failed transactions may lead to card termination for security reasons.",
  },
];
