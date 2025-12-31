package controller

import (
	"encoding/json"
	"net/http"
	"github.com/redis/go-redis/v9"
)

type UserController struct {
	Redis *redis.Client
}

type User struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func (c UserController) Create(w http.ResponseWriter, r *http.Request) {
	var user User

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	key := "user:" + user.ID

	data, _ := json.Marshal(user)

	err := c.Redis.Set(r.Context(), key, data, 0).Err()
	if err != nil {
		http.Error(w, "failed to save user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("user created"))
}

