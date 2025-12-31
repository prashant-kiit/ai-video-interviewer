package controller

import "net/http"

type UserController struct{}

func (c UserController) Create(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("create user"))
}
