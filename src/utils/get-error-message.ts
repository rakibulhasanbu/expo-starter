import { isAxiosError } from "axios";

const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (!error.response) return "Network error. Check your connection and try again.";
    return error.response.data?.message ?? DEFAULT_ERROR_MESSAGE;
  }
  return DEFAULT_ERROR_MESSAGE;
}

export { getErrorMessage };
