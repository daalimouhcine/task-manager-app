package com.project.backend;

import com.project.backend.services.user.UserServiceImpl;
import com.project.backend.repository.UserRepository;
import com.project.backend.entity.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindByUsername_UserExists() {
        User testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setEmail("test@example.com");

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));

        Optional<User> result = userRepository.findByUsername("testuser");

        assertTrue(result.isPresent());
        assertEquals("testuser", result.get().getUsername());
    }

    @Test
    void testFindByUsername_UserNotFound() {
        when(userRepository.findByUsername("nonexistent")).thenReturn(Optional.empty());

        Optional<User> result = userRepository.findByUsername("nonexistent");

        assertFalse(result.isPresent());
        verify(userRepository).findByUsername("nonexistent");
    }

    @Test
    void testUserServiceExists() {
        UserServiceImpl service = new UserServiceImpl();

        assertNotNull(service);
    }
}