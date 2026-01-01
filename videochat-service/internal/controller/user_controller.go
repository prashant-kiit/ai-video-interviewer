package controller

import (
	"net/http"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/service"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/shared"
	"github.com/redis/go-redis/v9"
)

type UserController struct {
	Redis *redis.Client
}

func (c *UserController) Create(w http.ResponseWriter, r *http.Request) {
	userService := service.UserService{
		Redis: c.Redis,
	}

	req, err := userService.Validate(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	resp, err := userService.CreateUser(w, r, req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	shared.SendJSON(w, http.StatusCreated, "user created", resp)
}
