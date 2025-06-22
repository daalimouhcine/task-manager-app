package com.project.backend.services.user;

import com.project.backend.entity.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findByUsername(String username);
}

