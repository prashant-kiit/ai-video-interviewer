package controller

import "net/http"

type RootController struct{}

func (c RootController) Index(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Welcome to the Video Chat Service"))
}
