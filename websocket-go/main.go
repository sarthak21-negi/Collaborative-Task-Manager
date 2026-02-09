package main

import (
	"log"
	"net/http"
)

func main() {

	hub := NewHub()

	go startRedisSubscriber(hub)

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, w, r)
	})

	log.Println("🚀 Go Notification Service running on :8081")
	log.Fatal(http.ListenAndServe(":8081", nil))
}
