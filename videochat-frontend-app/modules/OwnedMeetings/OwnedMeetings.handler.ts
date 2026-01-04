"use server";

import request from "../../shared/http/request";
import { ApiError } from "../../shared/http/error";

export type OwnedMeetingResponse = {
  meetingId: string;
  meetingPasscode: string;
};

export async function getOwnedMeetings(
  token: string
): Promise<{ ok: true; meetings: OwnedMeetingResponse[] } | { ok: false; error: string }> {
  try {
    const response = await request<OwnedMeetingResponse[]>({
      method: "GET",
      url: "/ownedmeetings",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log("Meetings retrieved successfully", response);

    return { ok: true, meetings: response.data };
  } catch (error) {
    const err = error as ApiError;

    return { ok: false, error: err.data ?? "Something went wrong" };
  }
}
