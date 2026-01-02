package controller

import (
	"fmt"
	"net/http"
	"time"

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

	meetingAt, _ := time.Parse(
		"2006-01-02 15:04",
		req.MeetingDate+" "+req.MeetingTime,
	)

	if meetingAt.Before(time.Now()) {
		shared.SendError(
			w,
			"Meeting date and time should be greater than or equal to the current time",
			http.StatusBadRequest,
		)
		return
	}

	fmt.Println("Meeting Name:", req.MeetingName)
	fmt.Println("Meeting Date:", req.MeetingDate)
	fmt.Println("Meeting Time:", req.MeetingTime)

	resp := model.CreateMeetingResponse{
		MeetingID: "123",
	}

	shared.SendJSON(w, http.StatusCreated, "meeting created", resp)
}
