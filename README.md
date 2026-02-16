# Collaborative Task Manager

A full-stack realtime collaborative task management system built using Spring Boot, Redis, Go WebSockets, and React.

---

## Features

- JWT Authentication  
- Project-based task management  
- Task lifecycle: TODO → IN_PROGRESS → DONE  
- Realtime updates using Redis Pub/Sub  
- WebSocket-based live notifications  
- Multi-user synchronization  
- Drag-and-drop Kanban board  
- Stateless backend architecture  
- Distributed realtime system design  

---

## Architecture

```text
React Frontend
     |
     | REST API (JWT)
     v
Spring Boot Backend
     |
     | Redis Pub/Sub
     v
Redis
     |
     | Event Stream
     v
Go WebSocket Server
     |
     | WebSocket
     v
Connected Clients

```
---

# Tech Stack

-- **Backend**
   - Java
   - Spring Boot
   - Spring Security (JWT)
   - Redis
   - PostgreSQL
   - Maven

-- **Realtime Layer**
   - Go
   - Gorilla WebSocket
   - Redis Pub/Sub
   - Frontend
   - React
   - Axios
-- **WebSocket**
   - Context API
   - Drag & Drop
