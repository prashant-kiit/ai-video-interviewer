package handlers

import (
	"fmt"
	"net/http"
)

func Hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello from /hello endpoint")
}
