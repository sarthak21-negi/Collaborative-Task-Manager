package main

import "sync"

type Hub struct {
	clients map[int64]map[*Client]bool
	mu      sync.Mutex
}

func NewHub() *Hub {
	return &Hub{
		clients: make(map[int64]map[*Client]bool),
	}
}

func (h *Hub) Register(userId int64, c *Client) {
	h.mu.Lock()
	defer h.mu.Unlock()

	if h.clients[userId] == nil {
		h.clients[userId] = make(map[*Client]bool)
	}
	h.clients[userId][c] = true
}

func (h *Hub) Unregister(userId int64, c *Client) {
	h.mu.Lock()
	defer h.mu.Unlock()

	delete(h.clients[userId], c)
	if len(h.clients[userId]) == 0 {
		delete(h.clients, userId)
	}
}

func (h *Hub) Send(userId int64, message []byte) {
	h.mu.Lock()
	defer h.mu.Unlock()

	for client := range h.clients[userId] {
		client.send <- message
	}
}
