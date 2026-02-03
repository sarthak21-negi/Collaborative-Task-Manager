package redis

import (
	"context"
	"log"

	"github.com/redis/go-redis/v9"
	"websocket-service/internal/websocket"
)

func Subscribe(hub *websocket.Hub) {
	ctx := context.Background()

	rdb := redis.NewClient(&redis.Options{
		Addr: "localhost:6379", // Docker will override later
	})

	sub := rdb.Subscribe(ctx, "notifications")

	ch := sub.Channel()

	log.Println("Subscribed to Redis channel: notifications")

	for msg := range ch {
		log.Println("Received from Redis:", msg.Payload)
		hub.Broadcast <- []byte(msg.Payload)
	}
}
