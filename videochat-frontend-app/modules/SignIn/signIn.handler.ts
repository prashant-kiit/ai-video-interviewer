"use server";

import request from "../../shared/http/request";
import { ApiError } from "../../shared/http/error";

type SignInResponse = {
  token: string;
};

export async function signInHandler(formData: FormData) : Promise<{ ok: true; token: string; } | { ok: false; error: string; }> {
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const response = await request<SignInResponse>({
      method: "POST",
      url: "/signin",
      data: { username, password },
    });
    
    console.log("response", response)

    return { ok: true, token: response.data.token };
  } catch (error) {
    const err = error as ApiError;

    return { ok: false, error: err.data as string };
  }
}
