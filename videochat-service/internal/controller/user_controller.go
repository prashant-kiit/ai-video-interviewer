package controller

import (
	"net/http"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/service"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/shared"
)

type UserController struct {
	UserService service.UserService
}

func (c *UserController) Create(w http.ResponseWriter, r *http.Request) {
	req, err := c.UserService.Validate(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	resp, err := c.UserService.CreateUser(w, r, req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	shared.SendJSON(w, http.StatusCreated, "user created", resp)
}
