package main

import (
	"fmt"
	"net/http"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/src/handlers"
)

func main() {
	http.HandleFunc("/health", handlers.Health)
	
	fmt.Println("Server running at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
