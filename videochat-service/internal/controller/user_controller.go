package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"github.com/redis/go-redis/v9"
	"strconv"
)

type UserController struct {
	Redis *redis.Client
}

type SignUpRequest struct {
	Name     string `json:"name"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type User struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type SignUpResponse struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Username string `json:"username"`
}

func (c UserController) Create(w http.ResponseWriter, r *http.Request) {
	var req SignUpRequest

	// Parse frontend payload
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
	
	fmt.Println(string(data))

	if err := c.Redis.Set(r.Context(), key, data, 0).Err(); err != nil {
		http.Error(w, "failed to save user", http.StatusInternalServerError)
		return
	}

	resp := SignUpResponse{
		ID:       user.ID,
		Name:     user.Name,
		Username: user.Username,
	}

	writeJSON(w, http.StatusCreated, "user created", resp)
}


type UserResponse struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}


type APIResponse struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Data    any         `json:"data"`
}

func writeJSON(w http.ResponseWriter, status int, message string, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	_ = json.NewEncoder(w).Encode(APIResponse{
		Status:  status,
		Message: message,
		Data:    data,
	})
}

