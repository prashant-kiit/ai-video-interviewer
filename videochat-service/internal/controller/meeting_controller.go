package controller

import (
	"fmt"
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

	fmt.Println("Meeting Name:", req.MeetingName)
	fmt.Println("Meeting Date:", req.MeetingDate)
	fmt.Println("Meeting Time:", req.MeetingTime)
	
	resp := model.CreateMeetingResponse{
		MeetingID: "123",
	}

	shared.SendJSON(w, http.StatusCreated, "meeting created", resp)
}
