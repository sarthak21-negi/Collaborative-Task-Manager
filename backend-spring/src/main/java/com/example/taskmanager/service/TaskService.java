package com.taskmanager.service;

import com.taskmanager.config.RedisChannels;
import com.taskmanager.config.RedisPublisher;
import com.taskmanager.dto.*;
import com.taskmanager.model.*;
import com.taskmanager.repository.*;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    private final TaskRepository taskRepo;
    private final ProjectRepository projectRepo;
    private final UserRepository userRepo;
    private final RedisPublisher redisPublisher;

    public TaskService(TaskRepository taskRepo,
                       ProjectRepository projectRepo,
                       UserRepository userRepo,
                       RedisPublisher redisPublisher) {
        this.taskRepo = taskRepo;
        this.projectRepo = projectRepo;
        this.userRepo = userRepo;
        this.redisPublisher = redisPublisher;
    }

    public TaskResponse create(TaskRequest req) {

        Task task = new Task();
        task.setTitle(req.getTitle());
        task.setDescription(req.getDescription());
        task.setStatus(req.getStatus());

        Project project = projectRepo.findById(req.getProjectId()).orElseThrow();
        User user = userRepo.findById(req.getAssignedUserId()).orElseThrow();

        task.setProject(project);
        task.setAssignedTo(user);

        Task saved = taskRepo.save(task);

        TaskEvent event = new TaskEvent(
                "CREATED",
                saved.getId(),
                saved.getTitle(),
                saved.getStatus(),
                project.getId(),
                user.getId()
        );

        redisPublisher.publish(RedisChannels.TASK_EVENTS, event);

        return new TaskResponse(
                saved.getId(),
                saved.getTitle(),
                saved.getDescription(),
                saved.getStatus()
        );
    }

    public TaskResponse updateStatus(Long taskId, TaskStatus status) {

        Task task = taskRepo.findById(taskId).orElseThrow();
        task.setStatus(status);

        Task saved = taskRepo.save(task);

        TaskEvent event = new TaskEvent(
                "MOVED",
                saved.getId(),
                saved.getTitle(),
                saved.getStatus(),
                saved.getProject().getId(),
                saved.getAssignedTo().getId()
        );

        redisPublisher.publish(RedisChannels.TASK_EVENTS, event);

        return new TaskResponse(
                saved.getId(),
                saved.getTitle(),
                saved.getDescription(),
                saved.getStatus()
        );
    }
}

