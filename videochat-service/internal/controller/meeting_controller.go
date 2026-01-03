package controller

import (
	"net/http"

	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/model"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/service"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/shared"
)

type MeetingController struct {
	MeetingService service.MeetingService
}

func (c *MeetingController) Create(w http.ResponseWriter, r *http.Request) {
	req, err := shared.Validate[model.CreateMeetingRequest](r)
	if err != nil {
		shared.SendError(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = c.MeetingService.IsMeetingDateTimeValid(w, req.MeetingDate, req.MeetingTime)
	if err != nil {
		shared.SendError(w, err.Error(), http.StatusBadRequest)
		return
	}

	c.MeetingService.CreateMeeting(req, r)

	resp := model.CreateMeetingResponse{
		MeetingID: "123",
	}

	shared.SendJSON(w, http.StatusCreated, "meeting created", resp)
}
