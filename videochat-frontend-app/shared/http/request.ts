import api from "./api";
import { normalizeError } from "./error";
import { AxiosRequestConfig } from "axios";

type Response<T> = {
  status: number;
  message: string;
  data: T;
};

async function request<T>(
  config: AxiosRequestConfig
): Promise<Response<T>> {
  try {
    const res = await api.request<Response<T>>(config);
    return res.data;
  } catch (error: unknown) {
    throw normalizeError(error);
  }
}

export default request;
