import request from "../../../shared/http/request";
import { ApiError } from "../../../shared/http/error";

export async function streamLiveVideo(formData: FormData, token: string) {
  try {
    const response = await request<string>({
      method: "POST",
      url: "/streamlive",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response", response);

    return { ok: true, message: response.data };
  } catch (error) {
    const err = error as ApiError;

    return { ok: false, error: err.data ?? "Something went wrong" };
  }
}