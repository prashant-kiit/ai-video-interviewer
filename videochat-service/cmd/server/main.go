package main

import (
	"log"
	"net/http"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/internal/handler"
	"github.com/prashant-kiit/ai-video-interviewer/videochat-service/shared"
)

func main() {
	h := shared.CORSMiddleware(handler.NewRootHandler())

	log.Println("Server is running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", h))
}
