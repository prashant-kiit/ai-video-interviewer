package service

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/model"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/shared"
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

func (u *UserService) CreateUser(r *http.Request, req model.SignUpRequest) (model.SignUpResponse, error) {
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

func (u *UserService) UserSignIn(r *http.Request, req model.SignInRequest) (model.SignInResponse, error) {
	ctx := r.Context()

	key := req.Username

	exists, err := u.Redis.Exists(ctx, key).Result()
	if err != nil {
		return model.SignInResponse{}, errors.New("failed to check user existence")
	}

	if exists != 1 {
		return model.SignInResponse{}, errors.New("user doesn't exist")
	}

	val, err := u.Redis.Get(ctx, key).Result()
	if err != nil {
		return model.SignInResponse{}, errors.New("failed to get user")
	}

	var user model.User
	if err := json.Unmarshal([]byte(val), &user); err != nil {
		return model.SignInResponse{}, errors.New("failed to unmarshal user")
	}

	if err := bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(req.Password),
	); err != nil {
		return model.SignInResponse{}, errors.New("incorrect password")
	}
	
	token, err := shared.GenerateJWT(user.Username)
	if err != nil {
		return model.SignInResponse{}, err
	}

	resp := model.SignInResponse{
		Token:    token,
	}
	return resp, nil
}
