package controller

import (
	"encoding/json"
	"net/http"
	"github.com/redis/go-redis/v9"
	"strconv"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/shared"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/model"
	"github.com/go-playground/validator/v10"
)

type UserController struct {
	Redis *redis.Client
}

func (c UserController) Create(w http.ResponseWriter, r *http.Request) {
	var req model.SignUpRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}
	
	validate := validator.New()
	if err := validate.Struct(req); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
	}

	id, err := c.Redis.Incr(r.Context(), "user:id:seq").Result()
	if err != nil {
		http.Error(w, "failed to generate user id", http.StatusInternalServerError)
		return
	}

	user := model.User{
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

	resp := model.SignUpResponse{
		ID:       user.ID,
	}

	shared.WriteJSON(w, http.StatusCreated, "user created", resp)
}


