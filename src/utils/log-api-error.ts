import { isAxiosError } from "axios";

function logApiError(error: unknown): void {
  if (!__DEV__) return;

  if (isAxiosError(error)) {
    console.log("[API Error]", {
      method: error.config?.method,
      url: error.config?.url,
      status: error.response?.status,
      requestData: error.config?.data,
      responseData: error.response?.data,
    });
    return;
  }

  console.log("[API Error]", error);
}

export { logApiError };
