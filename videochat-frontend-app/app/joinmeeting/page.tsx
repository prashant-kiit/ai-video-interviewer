"use client";

import Banner from "@/shared/components/Banner";
import Form from "@/shared/components/Form";
import FormInput from "@/shared/components/FormInput";
import ServerButton from "@/shared/components/ServerButton";
import { useState } from "react";

export default function JoinMeetingPage() {
  const [banner, setBanner] = useState({ message: "", color: "" });
  const onSubmit = async (data: FormData) => {
    try {
    } catch (error) {
    }
  };

  return (
    <div>
      <Form
        action={onSubmit}
        button={<ServerButton type="submit" name="Join Meeting" />}
      >
        <FormInput label="Meeting Id" name="meeting-id" type="text" isRequired />
        <FormInput label="Meeting Passcode" name="meeting-passcode" type="text" isRequired />
      </Form>
      <Banner message={banner.message} color={banner.color} />
    </div>
  );
}
