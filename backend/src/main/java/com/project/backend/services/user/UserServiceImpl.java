package com.project.backend.services.user;

import com.project.backend.dto.responses.AuthResponse;
import com.project.backend.dto.requests.LoginRequest;
import com.project.backend.dto.requests.RegisterRequest;
import com.project.backend.entity.User;
import com.project.backend.repository.UserRepository;
import com.project.backend.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    // Remove AuthenticationManager dependency - do manual authentication instead

    @Override
    public AuthResponse authenticateUser(LoginRequest loginRequest) {
        // Manual authentication - no AuthenticationManager needed
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        // Check password manually
        if (!encoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        // Generate JWT token
        String jwt = jwtUtils.generateJwtToken(user.getUsername());

        return new AuthResponse(jwt, user.getId(), user.getUsername(), user.getEmail());
    }

    @Override
    public AuthResponse registerUser(RegisterRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));

        userRepository.save(user);

        String jwt = jwtUtils.generateJwtToken(user.getUsername());

        return new AuthResponse(jwt, user.getId(), user.getUsername(), user.getEmail());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

}
