import AsyncStorage from "@react-native-async-storage/async-storage";

export type BalanceCurrency = "NGN" | "USD";

const BALANCE_CURRENCY_KEY = "balance_currency_preference";
const BALANCE_HIDDEN_KEY = "balance_hidden_preference";

const isBalanceCurrency = (value: string | null): value is BalanceCurrency => value === "NGN" || value === "USD";

export const getBalanceCurrency = async (): Promise<BalanceCurrency | null> => {
  const value = await AsyncStorage.getItem(BALANCE_CURRENCY_KEY);
  return isBalanceCurrency(value) ? value : null;
};

export const setBalanceCurrency = (value: BalanceCurrency) => AsyncStorage.setItem(BALANCE_CURRENCY_KEY, value);

export const getBalanceHidden = async (): Promise<boolean | null> => {
  const value = await AsyncStorage.getItem(BALANCE_HIDDEN_KEY);
  return value === null ? null : value === "true";
};

export const setBalanceHidden = (value: boolean) => AsyncStorage.setItem(BALANCE_HIDDEN_KEY, String(value));
