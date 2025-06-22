package com.project.backend.controller;

import com.project.backend.dto.responses.ErrorResponse;
import com.project.backend.dto.requests.TaskRequest;
import com.project.backend.dto.responses.TaskResponse;
import com.project.backend.services.task.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<?> getAllTasks(Authentication authentication) {
        try {
            List<TaskResponse> tasks = taskService.getAllTasksByUser(authentication.getName());
            return ResponseEntity.ok(tasks);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("User not found", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error", "Failed to retrieve tasks"));
        }
    }


    @PostMapping
    public ResponseEntity<?> createTask(@Valid @RequestBody TaskRequest taskRequest,
                                        Authentication authentication) {
        try {
            TaskResponse createdTask = taskService.createTask(taskRequest, authentication.getName());
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Task creation failed", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error", "Failed to create task"));
        }
    }



}