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
	sub := rdb.Subscribe(ctx, "task-events")

	ch := sub.Channel()

	log.Println("✅ Subscribed to Redis channel: task-events")

	for msg := range ch {

		  log.Println("📨 REDIS RAW MESSAGE:", msg.Payload)

    var event TaskEvent
    err := json.Unmarshal([]byte(msg.Payload), &event)
    if err != nil {
        log.Println("❌ Invalid JSON:", err)
        continue
    }

    log.Println("🎯 EVENT PARSED:", event)
    log.Println("📡 SENDING TO USER:", event.AssignedUserId)

    bytes, _ := json.Marshal(event)
    hub.Send(event.AssignedUserId, bytes)
	}
}
