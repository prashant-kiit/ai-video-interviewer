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

func (c *MeetingController) UploadMeetingRecords(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	r.Body = http.MaxBytesReader(w, r.Body, 100<<20) // 100MB
	if err := r.ParseMultipartForm(100 << 20); err != nil {
		shared.SendError(w, "invalid multipart form", http.StatusBadRequest)
		return
	}

	username, ok := ctx.Value("username").(string)
	if !ok {
		shared.SendError(w, "username not found in context", http.StatusBadRequest)
		return
	}

	meetingId := r.FormValue("meetingId")
	if meetingId == "" {
		shared.SendError(w, "meetingId missing", http.StatusBadRequest)
		return
	}

	timestamp := r.FormValue("timestamp")
	if timestamp == "" {
		shared.SendError(w, "timestamp missing", http.StatusBadRequest)
		return
	}

	file, _, err := r.FormFile("chunk")
	if err != nil {
		shared.SendError(w, "chunk missing", http.StatusBadRequest)
		return
	}
	defer file.Close()

	filename := fmt.Sprintf("recordingchunk-%s-%s-%s", username, meetingId, timestamp)

	shared.SendJSON(w, http.StatusOK, "chunk uploaded", fmt.Sprintf("chunk uploaded, with filename %s", filename))
}
