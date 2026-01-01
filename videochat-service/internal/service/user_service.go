package service

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/model"
	"github.com/redis/go-redis/v9"
)

type UserService struct {
	Redis *redis.Client
}

func (u *UserService) Validate(w http.ResponseWriter, r *http.Request) (model.SignUpRequest, error) {
	var req model.SignUpRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		return req, errors.New("invalid request body")
	}

	validate := validator.New()
	if err := validate.Struct(req); err != nil {
		return req, err
	}

	return req, nil
}

func (u *UserService) CreateUser(w http.ResponseWriter, r *http.Request, req model.SignUpRequest) (model.SignUpResponse, error) {
	id, err := u.Redis.Incr(r.Context(), "user:id:seq").Result()
	if err != nil {
		return model.SignUpResponse{}, errors.New("failed to generate user id")
	}

	user := model.User{
		ID:       strconv.FormatInt(id, 10),
		Name:     req.Name,
		Username: req.Username,
		Password: req.Password,
	}

	key := "user:" + user.ID
	data, _ := json.Marshal(user)

	if err := u.Redis.Set(r.Context(), key, data, 0).Err(); err != nil {
		return model.SignUpResponse{}, errors.New("failed to save user")
	}

	resp := model.SignUpResponse{
		ID: user.ID,
	}

	return resp, nil
}

// func (u *User) HashPassword() error {
// 	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
// 	if err != nil {
// 		return err
// 	}
// 	u.Password = string(hashedPassword)
// 	return nil
// }

