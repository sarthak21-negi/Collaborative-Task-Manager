package com.taskmanager.dto;

import com.taskmanager.model.TaskStatus;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskRequest {
    private String title;
    private String description;
    private TaskStatus status;
    private Long projectId;
    private Long assignedUserId;
}
