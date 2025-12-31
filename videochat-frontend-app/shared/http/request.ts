import api from "./api";
import { normalizeError } from "./error";
import { AxiosRequestConfig } from "axios";

async function request<T>(
  config: AxiosRequestConfig
): Promise<T> {
  try {
    const res = await api.request<T>(config);
    return res.data;
  } catch (error: unknown) {
    throw normalizeError(error);
  }
}

export default request;
