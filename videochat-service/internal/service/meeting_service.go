package service

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"time"

	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/model"
	"github.com/redis/go-redis/v9"
)

type MeetingService struct {
	Redis *redis.Client
}

func (s *MeetingService) IsMeetingDateTimeValid(w http.ResponseWriter, meetingDate string, meetingTime string) error {
	meetingAt, _ := time.Parse(
		"2006-01-02 15:04",
		meetingDate+" "+meetingTime,
	)

	if meetingAt.Before(time.Now()) {
		return errors.New("Meeting date and time should be greater than or equal to the current time")
	}
	return nil
}

func (s *MeetingService) CreateMeeting(req model.CreateMeetingRequest, r *http.Request) error {
	ctx := r.Context()

	meetingID, err := s.Redis.Incr(ctx, "meeting:id:seq").Result()
	if err != nil {
		return err
	}

	username, ok := ctx.Value("username").(string)
	if !ok {
		return errors.New("username not found in context")
	}

	meeting := model.Meeting{
		ID:      strconv.FormatInt(meetingID, 10),
		OwnerID: username,
		Name:    req.MeetingName,
		Date:    req.MeetingDate,
		Time:    req.MeetingTime,
	}

	data, err := json.Marshal(meeting)
	if err != nil {
		return err
	}

	key := "meeting:" + meeting.ID
	if err := s.Redis.Set(ctx, key, data, 0).Err(); err != nil {
		return err
	}

	return nil
	// s.Redis.Set()
}
