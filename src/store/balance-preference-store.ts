import { create } from "zustand";

import {
  getBalanceCurrency,
  getBalanceHidden,
  setBalanceCurrency,
  setBalanceHidden,
  type BalanceCurrency,
} from "@/lib/balance-preference-storage";

type BalancePreferenceState = {
  currency: BalanceCurrency;
  hidden: boolean;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  setCurrency: (currency: BalanceCurrency) => Promise<void>;
  toggleHidden: () => Promise<void>;
};

export const useBalancePreferenceStore = create<BalancePreferenceState>((set, get) => ({
  currency: "NGN",
  hidden: false,
  hydrated: false,

  hydrate: async () => {
    if (get().hydrated) return;

    try {
      const [currency, hidden] = await Promise.all([getBalanceCurrency(), getBalanceHidden()]);
      set({
        currency: currency ?? "NGN",
        hidden: hidden ?? false,
      });
    } finally {
      set({ hydrated: true });
    }
  },

  setCurrency: async (currency) => {
    set({ currency });
    await setBalanceCurrency(currency);
  },

  toggleHidden: async () => {
    const next = !get().hidden;
    set({ hidden: next });
    await setBalanceHidden(next);
  },
}));
