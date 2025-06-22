package com.project.backend.services.task;

import com.project.backend.dto.requests.TaskRequest;
import com.project.backend.dto.responses.TaskResponse;

import java.util.List;

public interface TaskService {
    List<TaskResponse> getAllTasksByUser(String username);
    TaskResponse createTask(TaskRequest taskRequest, String username);
    TaskResponse getTaskById(Long id, String username);
    TaskResponse updateTask(Long id, TaskRequest taskRequest, String username);
    void deleteTask(Long id, String username);
}

