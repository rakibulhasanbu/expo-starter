import {
  ADD_MONEY_CONVERSION_FEE_NAIRA,
  NGN_TO_USD_RATE,
  USD_TO_NGN_RATE,
  WITHDRAW_CONVERSION_FEE_USD,
} from "../data";

export type CurrencyConversion = {
  feeNaira: number;
  usdReceived: number;
};

export type ReverseCurrencyConversion = {
  feeUsd: number;
  nairaReceived: number;
};

export function convertNairaToUsd(nairaAmount: number): CurrencyConversion {
  const feeNaira = nairaAmount > 0 ? ADD_MONEY_CONVERSION_FEE_NAIRA : 0;
  const netNaira = Math.max(nairaAmount - feeNaira, 0);
  const usdReceived = Math.round(netNaira * NGN_TO_USD_RATE * 100) / 100;

  return { feeNaira, usdReceived };
}

export function convertUsdToNaira(usdAmount: number): ReverseCurrencyConversion {
  const feeUsd = usdAmount > 0 ? WITHDRAW_CONVERSION_FEE_USD : 0;
  const nairaReceived = Math.round(usdAmount * USD_TO_NGN_RATE);

  return { feeUsd, nairaReceived };
}
