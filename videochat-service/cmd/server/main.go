package main

import (
	"log"
	"net/http"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/handler"
)

func main() {
	h := handler.NewRootHandler()

	log.Println("Server running on localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", h))
}
