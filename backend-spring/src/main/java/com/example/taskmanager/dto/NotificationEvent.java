package com.example.taskmanager.dto;

public class NotificationEvent {

    private String userId;
    private String type;
    private String message;

    public NotificationEvent(String userId, String type, String message) {
        this.userId = userId;
        this.type = type;
        this.message = message;
    }

    public String getUserId() { return userId; }
    public String getType() { return type; }
    public String getMessage() { return message; }
}
