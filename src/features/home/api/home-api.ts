import type { ApiResponse } from "@/types/api-types";

import { homeSummary } from "../data";
import type { HomeSummary } from "../types";

const SIMULATED_DELAY_MS = 300;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchHomeSummary = async (): Promise<ApiResponse<HomeSummary>> => {
  await delay(SIMULATED_DELAY_MS);

  return {
    statusCode: 200,
    success: true,
    message: "Home summary fetched successfully",
    data: homeSummary,
  };
};
