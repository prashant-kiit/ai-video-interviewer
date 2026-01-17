package controller

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
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

	data, err := io.ReadAll(file)
	if err != nil {
		shared.SendError(w, err.Error(), http.StatusBadRequest)
		return
	}

	filename := fmt.Sprintf("meetingrecording-%s-%s-current.webm", username, meetingId)

	c.MeetingService.SaveChunk(filename, data, "recordings")

	shared.SendJSON(w, http.StatusOK, "chunk uploaded", fmt.Sprintf("chunk uploaded, with filename %s", filename))
}

func (c *MeetingController) SaveMeetingRecords(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	username, ok := ctx.Value("username").(string)
	if !ok {
		shared.SendError(w, "username not found in context", http.StatusBadRequest)
		return
	}

	urlpath := strings.TrimPrefix(r.URL.Path, "/recordingsave/")
	meetingId := strings.Trim(urlpath, "/")
	if meetingId == "" {
		shared.SendError(w, "meetingId missing", http.StatusBadRequest)
		return
	}

	timestamp := time.Now()

	oldfilename := fmt.Sprintf("meetingrecording-%s-%s-current.webm", username, meetingId)
	newfilename := fmt.Sprintf("meetingrecording-%s-%s-%s.webm", username, meetingId, timestamp.Format("20060102150405"))

	path := filepath.Join("recordings", oldfilename)
	if _, err := os.Stat(path); err == nil {
		fmt.Println("File exists, rename by", newfilename)
		os.Rename(path, filepath.Join("recordings", newfilename))
	} else if os.IsNotExist(err) {
		fmt.Println("File not found")
	}

	shared.SendJSON(w, http.StatusOK, "recording saved", fmt.Sprintf("recording saved, with filename %s", newfilename))
}

func (c *MeetingController) LiveStream(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

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

	data, err := io.ReadAll(file)
	if err != nil {
		shared.SendError(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = os.MkdirAll(fmt.Sprintf("livestreams_%s", meetingId), 0755)
	if err != nil {
		shared.SendError(w, err.Error(), http.StatusBadRequest)
		return
	}

	filename := fmt.Sprintf("livestream-%s-%s-%s.webm", username, meetingId, timestamp)

	c.MeetingService.SaveChunk(filename, data, fmt.Sprintf("livestreams_%s", meetingId))

	shared.SendJSON(w, http.StatusOK, "chunk uploaded", fmt.Sprintf("chunk uploaded, with filename %s", filename))
}
