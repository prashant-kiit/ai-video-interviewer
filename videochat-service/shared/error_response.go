package shared

import (
	"net/http"
)

func SendError(w http.ResponseWriter, err string, code int) {
	http.Error(w, err, http.StatusInternalServerError)
}
