"use client";
import { useState } from "react";
import { signUpHandler } from "./signUp.handler";
import Button from "../../shared/components/ServerButton";
import Form from "../../shared/components/Form";
import FormInput from "../../shared/components/FormInput";
import Error from "../../shared/components/Error";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState<string | "">("");
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    try {
      const result = await signUpHandler(formData);
      console.log("Result:", result);
      if (result.ok) {
        console.log("User created successfully");
        router.push("/signin");
      } else {
        console.error("Error in user sign up:", result.error);
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <Form action={onSubmit} button={<Button type="submit" name="Sign Up" />}>
        <FormInput label="Name" name="name" isRequired />
        <FormInput label="Username" name="username" type="email" isRequired />
        <FormInput label="Password" name="password" type="password" isRequired />
      </Form>
      <Error message={errorMessage}/>
    </div>
  );
}
