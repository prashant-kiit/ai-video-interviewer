"use client";

import Input from "../../shared/components/Input";
import { signUpHandler } from "./signUp.handler";
import Button from "../../shared/components/ServerButton";

export default function SignUpForm() {
  async function onSubmit(formData: FormData) {
    try {
      const response = await signUpHandler(formData);
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <form action={onSubmit}>
      <div>
        <Input label="Name" name="name" isRequired />
        <Input label="Username" name="username" isRequired />
        <Input label="Password" name="password" type="password" isRequired />
      </div>
      <div>
        <Button type="submit" name="Sign Up"/>
      </div>
    </form>
  );
}
