package service

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/model"
	"github.com/redis/go-redis/v9"
	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	Redis *redis.Client
}

func (u *UserService) hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(bytes), nil
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
	ctx := r.Context()

	hashedPassword, err := u.hashPassword(req.Password)
	if err != nil {
		return model.SignUpResponse{}, errors.New("failed to hash password")
	}

	user := model.User{
		Name:     req.Name,
		Username: req.Username,
		Password: hashedPassword,
	}

	key := user.Username

	exists, err := u.Redis.Exists(ctx, key).Result()
	if err != nil {
		return model.SignUpResponse{}, errors.New("failed to check user existence")
	}

	if exists == 1 {
		return model.SignUpResponse{}, errors.New("user already exists")
	}

	data, _ := json.Marshal(user)
	if err := u.Redis.Set(ctx, key, data, 0).Err(); err != nil {
		return model.SignUpResponse{}, errors.New("failed to save user")
	}

	resp := model.SignUpResponse{
		Username: user.Username,
	}
	return resp, nil
}
