"use server";

import request from "../../shared/http/request";
import { ApiError } from "../../shared/http/error";

type CreateMeetingResponse = {
  meetingId: string;
  meetingPasscode: string;
};

export async function createMeetingHandler(
  formData: FormData,
  token: string
): Promise<{ ok: true; meetingId: string; meetingPasscode: string } | { ok: false; error: string }> {
  const meetingName = formData.get("meeting-name");
  const meetingDate = formData.get("meeting-date");
  const meetingTime = formData.get("meeting-time");
  
  try {
    const response = await request<CreateMeetingResponse>({
      method: "POST",
      url: "/createmeeting",
      data: { meetingName, meetingDate, meetingTime },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log("Meeting created successfully", response);

    return { ok: true, meetingId: response.data.meetingId, meetingPasscode: response.data.meetingPasscode };
  } catch (error) {
    const err = error as ApiError;

    return { ok: false, error: err.data ?? "Something went wrong" };
  }
}
