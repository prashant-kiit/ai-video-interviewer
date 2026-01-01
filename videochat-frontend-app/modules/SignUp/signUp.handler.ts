"use server";

import request from "../../shared/http/request";

type SignUpResponse = {
  message: string;
};


export async function signUpHandler(formData: FormData) {
  const name = formData.get("name");
  const username = formData.get("username");
  const password = formData.get("password");
  
  const response = await request<SignUpResponse>({
    method: "POST",
    url: "/signup",
    data: { name, username, password },
  });

  console.log(response.message);
}
