import type { OnboardingSlide } from "@/features/onboarding/types";

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: "crypto-payments",
    image: require("../../../assets/images/onboarding/crypto-payments.png"),
    title: "Convert Crypto to Naira Instantly",
    description: "Convert your crypto to Naira at competitive rates and receive funds in seconds.",
  },
  {
    id: "virtual-card",
    image: require("../../../assets/images/onboarding/virtual-card.png"),
    title: "Virtual Card for Global Payments",
    description: "Create a virtual USD card for online shopping, subscriptions, and global payments.",
  },
  {
    id: "global-payments",
    image: require("../../../assets/images/onboarding/global-payments.png"),
    title: "Pay Bills Anytime, Anywhere",
    description: "Airtime, data, electricity, and more settled from one balance in seconds.",
  },
];
