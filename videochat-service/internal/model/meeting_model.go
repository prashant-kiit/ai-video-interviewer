package model

type CreateMeetingRequest struct {
	MeetingName string `json:"meetingName" validate:"required,min=2,max=100"`
	MeetingDate string `json:"meetingDate" validate:"required,datetime=2006-01-02"`
	MeetingTime string `json:"meetingTime" validate:"required,datetime=15:04"`
}

type CreateMeetingResponse struct {
	MeetingID string `json:"meetingId"`
}
