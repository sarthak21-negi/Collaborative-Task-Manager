package com.taskmanager.controller;

import com.taskmanager.dto.*;
import com.taskmanager.model.TaskStatus;
import com.taskmanager.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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

    @GetMapping
    public List<TaskResponse> all() {
        return service.getAll();
    } 

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("Task deleted");
    }

}

