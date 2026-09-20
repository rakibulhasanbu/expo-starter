import type { ApiListResponse } from "@/types/api-types";

import { billCategories } from "../data";
import type { BillCategory } from "../types";

const SIMULATED_DELAY_MS = 300;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchBillCategories = async (): Promise<ApiListResponse<BillCategory>> => {
  await delay(SIMULATED_DELAY_MS);

  return {
    statusCode: 200,
    success: true,
    message: "Bill categories fetched successfully",
    data: billCategories,
    meta: { page: 1, limit: billCategories.length, total: billCategories.length },
  };
};
