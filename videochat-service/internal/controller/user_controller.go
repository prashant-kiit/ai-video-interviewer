package controller

import (
	"encoding/json"
	"net/http"
	"github.com/redis/go-redis/v9"
	"strconv"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/shared"
)

type SignUpRequest struct {
	Name     string `json:"name"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type SignUpResponse struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Username string `json:"username"`
}

type User struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type UserController struct {
	Redis *redis.Client
}

func (c UserController) Create(w http.ResponseWriter, r *http.Request) {
	var req SignUpRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	id, err := c.Redis.Incr(r.Context(), "user:id:seq").Result()
	if err != nil {
		http.Error(w, "failed to generate user id", http.StatusInternalServerError)
		return
	}

	user := User{
		ID:       strconv.FormatInt(id, 10),
		Name:     req.Name,
		Username: req.Username,
		Password: req.Password,
	}

	key := "user:" + user.ID
	data, _ := json.Marshal(user)

	if err := c.Redis.Set(r.Context(), key, data, 0).Err(); err != nil {
		http.Error(w, "failed to save user", http.StatusInternalServerError)
		return
	}

	resp := SignUpResponse{
		ID:       user.ID,
		Name:     user.Name,
		Username: user.Username,
	}

	shared.WriteJSON(w, http.StatusCreated, "user created", resp)
}


