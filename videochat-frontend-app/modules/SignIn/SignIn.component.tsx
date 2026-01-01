"use client";
import { useState } from "react";
import { signInHandler } from "./signIn.handler";
import Button from "../../shared/components/ServerButton";
import Form from "../../shared/components/Form";
import FormInput from "../../shared/components/FormInput";
import Error from "../../shared/components/Error";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [errorMessage, setErrorMessage] = useState<string | "">("");
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    try {
      const result = await signInHandler(formData);
      console.log("Result:", result);
      if (result.ok) {
        console.log("User logged in successfully");
        router.push("/dashboard");
      } else {
        console.error("Error:", result.error);
        setErrorMessage(result.error as string);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <Form action={onSubmit} button={<Button type="submit" name="Sign In" />}>
        <FormInput label="Username" name="username" type="email" isRequired />
        <FormInput label="Password" name="password" type="password" isRequired />
      </Form>
      <Error message={errorMessage}/>
    </div>
  );
}
