package handler

import (
	"net/http"

	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/controller"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/infra"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/service"
)

type RootHandler struct {
	root   controller.RootController
	health controller.HealthController
	users  controller.UserController
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
		h.meetings.Create(w, r)

	default:
		http.NotFound(w, r)
	}
}
