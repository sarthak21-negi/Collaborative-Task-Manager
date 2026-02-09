package com.taskmanager.service;

import com.taskmanager.dto.*;
import com.taskmanager.model.Project;
import com.taskmanager.model.User;
import com.taskmanager.repository.ProjectRepository;
import com.taskmanager.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepo;
    private final UserRepository userRepo;

    public ProjectService(ProjectRepository projectRepo, UserRepository userRepo) {
        this.projectRepo = projectRepo;
        this.userRepo = userRepo;
    }

    public ProjectResponse create(ProjectRequest req) {
        String username =
            SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepo.findByUsername(username).orElseThrow();

        Project p = new Project();
        p.setName(req.getName());
        p.setDescription(req.getDescription());
        p.setOwner(user);

        Project saved = projectRepo.save(p);
        return new ProjectResponse(saved.getId(), saved.getName(), saved.getDescription());
    }

    public List<Project> all() {
        return projectRepo.findAll();
    }
}
