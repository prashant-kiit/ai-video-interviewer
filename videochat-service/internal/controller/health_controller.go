package controller

import "net/http"

type HealthController struct{}

func (c *HealthController) Get(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Server is up and running"))
}
