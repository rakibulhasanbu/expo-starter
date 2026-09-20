export type CardTheme = "dark" | "red" | "white";

export type CardStatus = "active" | "frozen";

export type VirtualCard = {
  id: string;
  holderName: string;
  maskedNumber: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  billingAddress: string;
  zipCode: string;
  theme: CardTheme;
  isVirtual: boolean;
  createdAt: string;
  status: CardStatus;
  balanceUsd: number;
};

export type CardFeeInfoItem = {
  id: string;
  icon: "card" | "money" | "warning";
  title: string;
  description: string;
};
