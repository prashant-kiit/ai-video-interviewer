package controller

import (
	"net/http"

	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/model"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/service"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/shared"
)

type UserController struct {
	UserService service.UserService
}

func (c *UserController) Create(w http.ResponseWriter, r *http.Request) {
	req, err := shared.Validate[model.SignUpRequest](r)
	if err != nil {
		shared.SendError(w, err.Error(), http.StatusBadRequest)
		return
	}

	resp, err := c.UserService.CreateUser(r, req)
	if err != nil {
		shared.SendError(w, err.Error(), http.StatusInternalServerError)
		return
	}

	shared.SendJSON(w, http.StatusCreated, "user created", resp)
}

func (c *UserController) SignIn(w http.ResponseWriter, r *http.Request) {
	req, err := shared.Validate[model.SignInRequest](r)
	if err != nil {
		shared.SendError(w, err.Error(), http.StatusBadRequest)
		return
	}

	resp, err := c.UserService.UserSignIn(r, req)
	if err != nil {
		shared.SendError(w, err.Error(), http.StatusInternalServerError)
		return
	}

	shared.SendJSON(w, http.StatusCreated, "user signed in", resp)
}
