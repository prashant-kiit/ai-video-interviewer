"use server";

import request from "../../shared/http/request";
import { ApiError } from "../../shared/http/error";

type SignInResponse = {
  username: string;
};

export async function signInHandler(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const response = await request<SignInResponse>({
      method: "POST",
      url: "/signin",
      data: { username, password },
    });

    return { ok: true, ...response };
  } catch (error) {
    const err = error as ApiError;

    return { ok: false, error: err.data };
  }
}
