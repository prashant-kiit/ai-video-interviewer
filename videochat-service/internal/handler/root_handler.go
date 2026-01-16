package handler

import (
	"net/http"
	"strings"

	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/controller"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/infra"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/service"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/shared"
)

type RootHandler struct {
	root     controller.RootController
	health   controller.HealthController
	users    controller.UserController
	meetings controller.MeetingController
}

func NewRootHandler() *RootHandler {
	redisClient := infra.NewRedisClient()
	userService := service.UserService{
		Redis: redisClient,
	}
	meetingService := service.MeetingService{
		Redis: redisClient,
	}

	return &RootHandler{
		root:   controller.RootController{},
		health: controller.HealthController{},
		users: controller.UserController{
			UserService: userService,
		},
		meetings: controller.MeetingController{
			MeetingService: meetingService,
		},
	}
}

func (h *RootHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch {
	case r.Method == http.MethodGet && r.URL.Path == "/":
		h.root.Index(w, r)

	case r.Method == http.MethodGet && r.URL.Path == "/health":
		h.health.Get(w, r)

	case r.Method == http.MethodPost && r.URL.Path == "/signup":
		h.users.Create(w, r)

	case r.Method == http.MethodPost && r.URL.Path == "/signin":
		h.users.SignIn(w, r)

	case r.Method == http.MethodPost && r.URL.Path == "/createmeeting":
		shared.AuthMiddleware(http.HandlerFunc(h.meetings.Create)).ServeHTTP(w, r)

	case r.Method == http.MethodGet && r.URL.Path == "/ownedmeetings":
		shared.AuthMiddleware(http.HandlerFunc(h.meetings.GetOwnMeetings)).ServeHTTP(w, r)

	case r.Method == http.MethodPost && r.URL.Path == "/recordingupload":
		shared.AuthMiddleware(http.HandlerFunc(h.meetings.UploadMeetingRecords)).ServeHTTP(w, r)

	case r.Method == http.MethodGet && strings.HasPrefix(r.URL.Path, "/recordingsave/"):
		shared.AuthMiddleware(http.HandlerFunc(h.meetings.SaveMeetingRecords)).ServeHTTP(w, r)

	default:
		http.NotFound(w, r)
	}
}
