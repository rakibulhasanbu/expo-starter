import type { HomeSummary } from "./types";

export const homeSummary: HomeSummary = {
  balances: [
    {
      code: "NGN",
      label: "NGN balance",
      currencyName: "Naira",
      flagEmoji: "🇳🇬",
      amount: 240000,
    },
    {
      code: "USD",
      label: "USD balance",
      currencyName: "United states dollar",
      flagEmoji: "🇺🇸",
      amount: 10,
    },
  ],
  kycPercentage: 0,
  utilityBillsIcon: require("../../../assets/images/home/utility-bills-icon.png"),
  carouselSlides: [
    {
      id: "virtual-card",
      title: "Get your virtual card",
      description: "Secure your virtual card for online shopping and international payment.",
      image: require("../../../assets/images/home/virtual-card.png"),
      buttonLabel: "Get now",
      href: "/card",
    },
    {
      id: "never-miss-a-bill",
      title: "Never miss a bill",
      description: "Pay electricity, TV and data bills in seconds, right from your wallet.",
      image: require("../../../assets/images/home/virtual-card.png"),
      buttonLabel: "Pay bills",
      href: "/bill-payment",
    },
    {
      id: "airtime-data-sorted",
      title: "Airtime & data, sorted",
      description: "Top up airtime or grab a data bundle in less than a minute.",
      image: require("../../../assets/images/home/virtual-card.png"),
      buttonLabel: "Get started",
      href: "/bill-payment",
    },
  ],
};
