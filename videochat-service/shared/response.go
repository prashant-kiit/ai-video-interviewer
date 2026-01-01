package shared

import (
	"encoding/json"
	"net/http"
)

type APIResponse struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Data    any         `json:"data"`
}

func WriteJSON(w http.ResponseWriter, status int, message string, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	_ = json.NewEncoder(w).Encode(APIResponse{
		Status:  status,
		Message: message,
		Data:    data,
	})
}