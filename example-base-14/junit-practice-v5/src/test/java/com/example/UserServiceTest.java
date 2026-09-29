package com.example;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void shouldFindUserByEmail() {

        User user = new User(
                1L,
                "Prem",
                "prem@example.com"
        );

        when(userRepository.findByEmail("prem@example.com"))
                .thenReturn(Optional.of(user));

        User result = userService.findByEmail("prem@example.com");

        assertNotNull(result);
        assertEquals("Prem", result.getName());
        assertEquals("prem@example.com", result.getEmail());

        verify(userRepository)
                .findByEmail("prem@example.com");
    }

    @Test
    void shouldThrowExceptionWhenUserDoesNotExist() {

        when(userRepository.findByEmail("unknown@example.com"))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> userService.findByEmail("unknown@example.com")
        );

        assertEquals(
                "User not found: unknown@example.com",
                exception.getMessage()
        );

        verify(userRepository)
                .findByEmail("unknown@example.com");
    }

    @Test
    void shouldCreateUser() {

        User savedUser = new User(
                1L,
                "Prem",
                "prem@example.com"
        );

        when(userRepository.findByEmail("prem@example.com"))
                .thenReturn(Optional.empty());

        when(userRepository.save(any(User.class)))
                .thenReturn(savedUser);

        User result = userService.createUser(
                "Prem",
                "prem@example.com"
        );

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Prem", result.getName());
        assertEquals("prem@example.com", result.getEmail());

        verify(userRepository)
                .findByEmail("prem@example.com");

        verify(userRepository)
                .save(any(User.class));
    }

    @Test
    void shouldNotCreateDuplicateUser() {

        User existingUser = new User(
                1L,
                "Prem",
                "prem@example.com"
        );

        when(userRepository.findByEmail("prem@example.com"))
                .thenReturn(Optional.of(existingUser));

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> userService.createUser(
                        "Another User",
                        "prem@example.com"
                )
        );

        assertEquals(
                "User already exists: prem@example.com",
                exception.getMessage()
        );

        verify(userRepository)
                .findByEmail("prem@example.com");

        verify(userRepository, never())
                .save(any(User.class));
    }
}
