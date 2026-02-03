package main

import (
	"log"
	"net/http"

	"websocket-service/internal/redis"
	"websocket-service/internal/websocket"
)

func main() {
	hub := websocket.NewHub()

	go hub.Run()
	go redis.Subscribe(hub)

	http.HandleFunc("/ws", websocket.HandleWS(hub))

	log.Println("Go WebSocket server running on :8081")
	log.Fatal(http.ListenAndServe(":8081", nil))
}
