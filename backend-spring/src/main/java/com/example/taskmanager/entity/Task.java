package com.example.taskmanager.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String assignedTo;

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getAssignedTo() { return assignedTo; }

    public void setTitle(String title) { this.title = title; }
    public void setAssignedTo(String assignedTo) { this.assignedTo = assignedTo; }
}
