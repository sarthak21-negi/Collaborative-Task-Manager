package com.example.taskmanager.service;

import com.example.taskmanager.dto.NotificationEvent;
import com.example.taskmanager.entity.Task;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    private final TaskRepository repository;
    private final RedisTemplate<String, Object> redisTemplate;

    public TaskService(TaskRepository repository, RedisTemplate<String, Object> redisTemplate) {
        this.repository = repository;
        this.redisTemplate = redisTemplate;
    }

    public Task create(Task task) {
        Task saved = repository.save(task);

        NotificationEvent event = new NotificationEvent(
                task.getAssignedTo(),
                "TASK_ASSIGNED",
                "New task: " + task.getTitle()
        );

        redisTemplate.convertAndSend("notifications", event);
        return saved;
    }
}
