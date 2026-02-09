package main

import (
	"context"
	"encoding/json"
	"log"

	"github.com/go-redis/redis/v8"
)

func startRedisSubscriber(hub *Hub) {

	rdb := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})

	ctx := context.Background()
	sub := rdb.Subscribe(ctx, "tasks")

	ch := sub.Channel()

	log.Println("✅ Subscribed to Redis channel: tasks")

	for msg := range ch {

		var event TaskEvent
		err := json.Unmarshal([]byte(msg.Payload), &event)
		if err != nil {
			log.Println("Invalid JSON:", err)
			continue
		}

		bytes, _ := json.Marshal(event)

		hub.Send(event.AssignedUserId, bytes)
	}
}
