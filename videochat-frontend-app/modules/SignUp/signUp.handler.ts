"use server";

export async function signUpHandler(formData: FormData) {
  const name = formData.get("name");
  const username = formData.get("username");
  const password = formData.get("password");

  console.log({ name, username, password });
}
