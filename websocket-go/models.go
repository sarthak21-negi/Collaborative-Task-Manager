package main

type TaskEvent struct {
	EventType      string `json:"eventType"`
	TaskId         int64  `json:"taskId"`
	Title          string `json:"title"`
	Status         string `json:"status"`
	ProjectId      int64  `json:"projectId"`
	AssignedUserId int64  `json:"assignedUserId"`
}
