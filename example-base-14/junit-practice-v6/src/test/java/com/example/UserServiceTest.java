package com.example;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
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
    void shouldCreateUserAndCaptureArgument() {

        when(userRepository.findByEmail("prem@example.com"))
                .thenReturn(Optional.empty());

        User savedUser = new User(
                1L,
                "Prem",
                "prem@example.com"
        );

        when(userRepository.save(any(User.class)))
                .thenReturn(savedUser);

        User result = userService.createUser(
                "Prem",
                "prem@example.com"
        );

        assertEquals("Prem", result.getName());

        ArgumentCaptor<User> userCaptor =
                ArgumentCaptor.forClass(User.class);

        verify(userRepository).save(userCaptor.capture());

        User capturedUser = userCaptor.getValue();

        assertNull(capturedUser.getId());
        assertEquals("Prem", capturedUser.getName());
        assertEquals("prem@example.com", capturedUser.getEmail());
    }

    @Test
    void shouldCallFindByEmailExactlyOnce() {

        User user = new User(
                1L,
                "Prem",
                "prem@example.com"
        );

        when(userRepository.findByEmail("prem@example.com"))
                .thenReturn(Optional.of(user));

        userService.findByEmail("prem@example.com");

        verify(userRepository, times(1))
                .findByEmail("prem@example.com");
    }

    @Test
    void shouldDeleteUser() {

        userService.deleteUser(100L);

        verify(userRepository, times(1))
                .deleteById(100L);
    }

    @Test
    void shouldUseDoReturnForMockBehaviour() {

        User user = new User(
                1L,
                "Prem",
                "prem@example.com"
        );

        doReturn(Optional.of(user))
                .when(userRepository)
                .findByEmail("prem@example.com");

        User result = userService.findByEmail("prem@example.com");

        assertEquals("Prem", result.getName());

        verify(userRepository)
                .findByEmail("prem@example.com");
    }

    @Test
    void shouldUseDoThrowForVoidMethod() {

        doThrow(new RuntimeException("Database error"))
                .when(userRepository)
                .deleteById(100L);

        RuntimeException exception = assertThrows(
                RuntimeException.class,
                () -> userService.deleteUser(100L)
        );

        assertEquals("Database error", exception.getMessage());

        verify(userRepository)
                .deleteById(100L);
    }

    @Test
    void shouldNotSaveDuplicateUser() {

        User existingUser = new User(
                1L,
                "Prem",
                "prem@example.com"
        );

        when(userRepository.findByEmail("prem@example.com"))
                .thenReturn(Optional.of(existingUser));

        assertThrows(
                IllegalArgumentException.class,
                () -> userService.createUser(
                        "Another",
                        "prem@example.com"
                )
        );

        verify(userRepository)
                .findByEmail("prem@example.com");

        verify(userRepository, never())
                .save(any(User.class));

        verifyNoMoreInteractions(userRepository);
    }
}
