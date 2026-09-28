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
    void shouldGetUser() {

        User user = new User(
                1L,
                "Prem",
                "prem@example.com"
        );

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        User result = userService.getUser(1L);

        assertEquals(1L, result.getId());
        assertEquals("Prem", result.getName());
        assertEquals("prem@example.com", result.getEmail());

        verify(userRepository).findById(1L);
    }

    @Test
    void shouldThrowExceptionWhenUserDoesNotExist() {

        when(userRepository.findById(99L))
                .thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> userService.getUser(99L)
        );

        assertEquals(
                "User not found: 99",
                exception.getMessage()
        );
    }

    @Test
    void shouldCreateUser() {

        User user = new User(
                1L,
                "Prem",
                "prem@example.com"
        );

        when(userRepository.save(any(User.class)))
                .thenReturn(user);

        User result = userService.createUser(
                new User(null, "Prem", "prem@example.com")
        );

        assertEquals("Prem", result.getName());

        verify(userRepository).save(any(User.class));
    }
}
