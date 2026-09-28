package com.example;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class UserRepositoryTest {

    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository = new UserRepository();
    }

    @Test
    void shouldSaveAndFindUser() {

        User user = new User(
                null,
                "Prem",
                "prem@example.com"
        );

        User saved = userRepository.save(user);

        assertNotNull(saved.getId());

        Optional<User> result =
                userRepository.findById(saved.getId());

        assertTrue(result.isPresent());
        assertEquals("Prem", result.get().getName());
    }

    @Test
    void shouldDeleteUser() {

        User saved = userRepository.save(
                new User(null, "Prem", "prem@example.com")
        );

        userRepository.deleteById(saved.getId());

        assertTrue(
                userRepository.findById(saved.getId()).isEmpty()
        );
    }
}
