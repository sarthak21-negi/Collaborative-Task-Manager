# Collaborative Task Manager

A full-stack realtime collaborative task management system built with distributed architecture using Spring Boot, Redis, Go WebSockets, and React.

Supports realtime task updates, notifications, authentication, drag-and-drop boards, and multi-user collaboration.

---

## ✨ Features

🔐 Authentication & Authorization

  - JWT-based authentication

  - Role-based access control

  - Secure API endpoints

📋 Task Management

  - Create / update / move tasks

  - Project-based task organization

  - Status tracking (TODO, IN_PROGRESS, DONE)

🔄 Realtime System

  - Redis Pub/Sub event pipeline

  - WebSocket broadcast service (Go)

  - Live task updates 

  - Realtime notifications

  - Multi-user sync

🧲 Interactive UI

  - Drag & Drop Kanban board

  - Live updates without refresh

  - Notification panel

  - Dashboard view

  - Project boards  

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

📦 Services

Service                       Description
backend-spring	          REST API, Auth, DB, Redis publisher
websocket-go	          WebSocket server, Redis subscriber
redis	               Event broker
frontend-react	          UI + Realtime client

---

## Tech Stack

- **Backend**
   - Java
   - Spring Boot
   - Spring Security (JWT)
   - Redis
   - PostgreSQL
   - Maven

- **Realtime Layer**
   - Go
   - Gorilla WebSocket
   - Redis Pub/Sub

- **Frontend**
   - React
   - Axios
   - WebSocket
   - Context API
   - Drag & Drop

---

## Project Structure

```text
Collaborative-Task-Manager/
│
├── backend-spring/     # Spring Boot REST API + Redis Publisher
├── websocket-go/       # Go WebSocket Server + Redis Subscriber
├── frontend-react/     # React Frontend
└── README.md
   - Context API
   - Drag & Drop
```

---

## Prerequisites

  - Java 17+
  - Go 1.20+
  - Node.js 18+
  - Redis
  - PostgreSQL
  - Maven

---

## Installation

**Clone Repository**
```bash
git clone https://github.com/sarthak21-negi/Collaborative-Task-Manager.git
cd Collaborative-Task-Manager
```

---

## Running the System

**Start Redis**
```bash
redis-server
```

**Backend (Spring Boot)**
```bash
cd backend-spring
mvn clean install
mvn spring-boot:run
```
```text
Backend URL: http://localhost:8080
```

**WebSocket Server (Go)**
```bash
cd websocket-go
go run .
```
```text
WebSocket URL: ws://localhost:8081/ws
```

**Frontend (React)**
```bash
cd frontend-react
npm install
npm run dev
```
```text
Frontend URL: http://localhost:3000
```

---

## API Endpoints
   - **Authentication**
     ```text
     POST /api/auth/login
     POST /api/auth/register
     ```
     
   - **Projects**
     ```text
     POST /api/projects
     GET  /api/projects
     ```
   - **Tasks**
     ```text
     POST   /api/tasks
     GET    /api/tasks
     PUT    /api/tasks/{id}/status
     ```

---

## Redis Channel
   ```text
   task-events
   ```

---

## API Example
   ```bash
   curl -X POST http://localhost:8080/api/tasks \
       -H "Authorization: Bearer $TOKEN" \
       -H "Content-Type: application/json" \
       -d '{
           "title": "Realtime Task",
           "description": "Full pipeline test",
           "status": "TODO",
           "projectId": 3,
           "assignedUserId": 4
  }'
  ```

---
