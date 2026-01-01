"use server";

import request from "../../shared/http/request";
import { ApiError } from "../../shared/http/error";

type SignUpResponse = {
  userId: string;
};

export async function signUpHandler(formData: FormData) {
  const name = formData.get("name");
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const response = await request<SignUpResponse>({
      method: "POST",
      url: "/signup",
      data: { name, username, password },
    });

    return {ok: true, ...response};
  } catch (error) {
    const err = error as ApiError;
    
    return {ok: false, error: err.data};  
  }
}
