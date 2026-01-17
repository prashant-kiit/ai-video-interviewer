"use server";

import request from "../../../shared/http/request";
import { ApiError } from "../../../shared/http/error";

export async function uploadRecording(formData: FormData, token: string) {
  try {
    const response = await request<string>({
      method: "POST",
      url: "/recordingupload",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response", response);

    return { ok: true, message: response.data };
  } catch (error) {
    const err = error as ApiError;

    return { ok: false, error: err.data ?? "Something went wrong" };
  }
}

export async function saveRecording(meetingId: string, token: string) {
  try {
    console.log("SaveMeetingRecords");
    const response = await request<string>({
      method: "GET",
      url: `/recordingsave/${meetingId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response", response);

    return { ok: true, message: response.data };
  } catch (error) {
    const err = error as ApiError;

    return { ok: false, error: err.data ?? "Something went wrong" };
  }
}

