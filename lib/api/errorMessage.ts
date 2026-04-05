import axios from "axios";

export const getApiErrorMessage = (error: unknown) => {
  if (!axios.isAxiosError(error)) {
    if (error instanceof Error && error.message) {
      return error.message;
    }
    return "Unexpected error";
  }

  const data = error.response?.data;
  if (typeof data === "string" && data.trim()) {
    return data;
  }

  if (data && typeof data === "object") {
    const message = (data as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  if (error.code === "ECONNABORTED") {
    return "Request timed out. Please retry.";
  }

  if (error.response?.status === 401) {
    return "Your session has expired. Please log in again.";
  }

  if (error.response?.status === 503) {
    return "Service is temporarily unavailable. Please retry in a moment.";
  }

  return error.message || "Unexpected API error";
};
