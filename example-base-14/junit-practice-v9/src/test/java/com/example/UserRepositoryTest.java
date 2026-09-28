package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldSaveUser() {

        User user = new User(
                "Prem",
                "prem@example.com"
        );

        User saved = userRepository.save(user);

        assertNotNull(saved.getId());
        assertEquals("Prem", saved.getName());
        assertEquals("prem@example.com", saved.getEmail());
    }

    @Test
    void shouldFindUserById() {

        User saved = userRepository.save(
                new User(
                        "Prem",
                        "prem@example.com"
                )
        );

        Optional<User> result =
                userRepository.findById(saved.getId());

        assertTrue(result.isPresent());
        assertEquals("Prem", result.get().getName());
    }

    @Test
    void shouldFindUserByEmail() {

        userRepository.save(
                new User(
                        "Prem",
                        "prem@example.com"
                )
        );

        Optional<User> result =
                userRepository.findByEmail(
                        "prem@example.com"
                );

        assertTrue(result.isPresent());
        assertEquals("Prem", result.get().getName());
    }

    @Test
    void shouldCheckEmailExists() {

        userRepository.save(
                new User(
                        "Prem",
                        "prem@example.com"
                )
        );

        assertTrue(
                userRepository.existsByEmail(
                        "prem@example.com"
                )
        );

        assertFalse(
                userRepository.existsByEmail(
                        "unknown@example.com"
                )
        );
    }

    @Test
    void shouldReturnAllUsers() {

        userRepository.save(
                new User("Prem", "prem@example.com")
        );

        userRepository.save(
                new User("Rahul", "rahul@example.com")
        );

        List<User> users = userRepository.findAll();

        assertEquals(2, users.size());
    }

    @Test
    void shouldDeleteUser() {

        User saved = userRepository.save(
                new User(
                        "Prem",
                        "prem@example.com"
                )
        );

        Long id = saved.getId();

        userRepository.deleteById(id);

        assertTrue(
                userRepository.findById(id).isEmpty()
        );
    }

    @Test
    void shouldRejectDuplicateEmail() {

        userRepository.save(
                new User(
                        "Prem",
                        "prem@example.com"
                )
        );

        userRepository.flush();

        userRepository.save(
                new User(
                        "Another",
                        "prem@example.com"
                )
        );

        assertThrows(
                DataIntegrityViolationException.class,
                () -> userRepository.flush()
        );
    }
}
