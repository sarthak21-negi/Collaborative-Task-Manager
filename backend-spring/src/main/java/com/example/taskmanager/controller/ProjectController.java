package com.taskmanager.controller;

import com.taskmanager.dto.*;
import com.taskmanager.model.Project;
import com.taskmanager.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    @PostMapping
    public ProjectResponse create(@RequestBody ProjectRequest req) {
        return service.create(req);
    }

    @GetMapping
    public List<Project> all() {
        return service.all();
    }
}