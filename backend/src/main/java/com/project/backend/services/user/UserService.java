package com.project.backend.services.user;

import com.project.backend.dto.responses.AuthResponse;
import com.project.backend.dto.requests.LoginRequest;
import com.project.backend.dto.requests.RegisterRequest;
import com.project.backend.entity.User;

import java.util.Optional;

public interface UserService {
    AuthResponse authenticateUser(LoginRequest loginRequest);
    AuthResponse registerUser(RegisterRequest registerRequest);
    Optional<User> findByUsername(String username);

}

