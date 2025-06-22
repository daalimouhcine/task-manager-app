package com.project.backend.services.task;

import com.project.backend.dto.requests.TaskRequest;
import com.project.backend.dto.responses.TaskResponse;
import com.project.backend.entity.Task;
import com.project.backend.entity.User;
import com.project.backend.repository.TaskRepository;
import com.project.backend.services.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final UserService userService;

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponse> getAllTasksByUser(String username) {
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return taskRepository.findByUserIdOrderByCreatedDateDesc(user.getId())
                .stream()
                .map(this::mapToTaskResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponse createTask(TaskRequest taskRequest, String username) {
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = new Task();
        task.setTitle(taskRequest.getTitle());
        task.setDescription(taskRequest.getDescription());
        task.setCompleted(taskRequest.getCompleted());
        task.setUser(user);

        Task savedTask = taskRepository.save(task);
        return mapToTaskResponse(savedTask);
    }

    private TaskResponse mapToTaskResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getCompleted(),
                task.getCreatedDate(),
                task.getUser().getUsername()
        );
    }
}
