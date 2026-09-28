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

        User user =
                new User(
                        1L,
                        "Prem",
                        "prem@example.com"
                );

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        User result =
                userService.getUser(1L);

        assertEquals("Prem", result.getName());

        verify(userRepository)
                .findById(1L);
    }

    @Test
    void shouldRejectDuplicateUser() {

        when(userRepository.existsByEmail(
                "prem@example.com"
        )).thenReturn(true);

        assertThrows(
                IllegalArgumentException.class,
                () -> userService.createUser(
                        "Prem",
                        "prem@example.com"
                )
        );

        verify(userRepository)
                .existsByEmail("prem@example.com");

        verify(userRepository, never())
                .save(any(User.class));
    }
}
