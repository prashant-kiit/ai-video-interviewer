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

	resp, err := c.MeetingService.CreateMeeting(req, r)
	if err != nil {
		shared.SendError(w, err.Error(), http.StatusInternalServerError)
		return
	}

	shared.SendJSON(w, http.StatusCreated, "meeting created", resp)
}

func (c *MeetingController) GetOwnMeetings(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	username, ok := ctx.Value("username").(string)
	if !ok {
		shared.SendError(w, "username not found in context", http.StatusBadRequest)
		return
	}

	meetings, err := c.MeetingService.GetOwnedMeetingsByUsername(username, ctx)
	if err != nil {
		shared.SendError(w, err.Error(), http.StatusInternalServerError)
		return
	}

	shared.SendJSON(w, http.StatusOK, "owned meetings retrieved", meetings)
}
