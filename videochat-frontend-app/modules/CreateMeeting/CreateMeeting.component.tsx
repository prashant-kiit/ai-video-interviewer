"use client";

import { useState } from "react";
import { createMeetingHandler } from "./createMeeting.handler";
import Button from "../../shared/components/ServerButton";
import Form from "../../shared/components/Form";
import FormInput from "../../shared/components/FormInput";
import Banner from "../../shared/components/Banner";
import { useToken } from "../../shared/store/token";

export default function CreateMeetingForm() {
  const { getToken } = useToken();
  const [banner, setBanner] = useState<{ message: string, color?: string }>({ message: "", color: "" });

  async function onSubmit(formData: FormData) {
    try {
      const result = await createMeetingHandler(formData, getToken());
      console.log("Result:", result);
      if (result.ok) {
        console.log("Meeting created successfully");
        setBanner({ message: `Meeting created successfully. Meeting ID: ${result.meetingId}`, color: "green" });
      } else {
        console.error("Error in create meeting:", result.error);
        setBanner({ message: result.error });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <Form
        action={onSubmit}
        button={<Button type="submit" name="Create Meeting" />}
      >
        <FormInput label="Name" name="meeting-name" type="text" isRequired />
        <FormInput label="Date" name="meeting-date" type="date" isRequired />
        <FormInput label="Time" name="meeting-time" type="time" isRequired />
      </Form>
      <Banner message={banner.message} color={banner.color} />
    </div>
  );
}
