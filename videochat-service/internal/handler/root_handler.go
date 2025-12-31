package handler

import (
	"net/http"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/controller"
)

type RootHandler struct {
	root   controller.RootController
	health controller.HealthController
	users  controller.UserController
}

func NewRootHandler() RootHandler {
	return RootHandler{
		root:   controller.RootController{},
		health: controller.HealthController{},
		users:  controller.UserController{},
	}
}

func (h RootHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch {
	case r.Method == http.MethodGet && r.URL.Path == "/":
		h.root.Index(w, r)

	case r.Method == http.MethodGet && r.URL.Path == "/health":
		h.health.Get(w, r)

	case r.Method == http.MethodPost && r.URL.Path == "/users":
		h.users.Create(w, r)

	default:
		http.NotFound(w, r)
	}
}
