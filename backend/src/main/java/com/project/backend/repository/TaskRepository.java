package com.project.backend.repository;

import com.project.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserIdOrderByCreatedDateDesc(Long userId);
    Optional<Task> findByIdAndUserId(Long id, Long userId);
}