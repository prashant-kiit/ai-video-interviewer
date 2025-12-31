import axios from "axios";

export type ApiError<T = unknown> = {
  message: string;
  status?: number;
  data?: T;
};

export function normalizeError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    return {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: "Unknown error occurred" };
}