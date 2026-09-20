import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/types/api-types";

import { fetchBillCategories } from "../api/bill-payment-api";

export const billPaymentKeys = {
  all: [QueryKeys.BILL_PAYMENT] as const,
  categories: () => [...billPaymentKeys.all, "categories"] as const,
};

export const useBillCategoriesQuery = () => {
  return useQuery({
    queryKey: billPaymentKeys.categories(),
    queryFn: fetchBillCategories,
    select: (data) => data.data,
  });
};
