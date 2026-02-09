package com.taskmanager.controller;

import com.taskmanager.dto.*;
import com.taskmanager.model.TaskStatus;
import com.taskmanager.service.TaskService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @PostMapping
    public TaskResponse create(@RequestBody TaskRequest req) {
        return service.create(req);
    }

    @PutMapping("/{id}/status")
    public TaskResponse move(@PathVariable Long id,
                             @RequestParam TaskStatus status) {
        return service.updateStatus(id, status);
    }
}
