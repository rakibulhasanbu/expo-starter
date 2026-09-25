import type { ApiResponse } from "@/types/api-types";

import { homeSummary } from "../data";
import type { HomeSummary } from "../types";

// Intentionally mock-only: home balances/KYC/promo are template UI with no
// backend by design (TICKET-01). Replace with a real query if a project needs it.
const SIMULATED_DELAY_MS = 300;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchHomeSummary = async (): Promise<ApiResponse<HomeSummary>> => {
  await delay(SIMULATED_DELAY_MS);

  return {
    data: homeSummary,
  };
};
