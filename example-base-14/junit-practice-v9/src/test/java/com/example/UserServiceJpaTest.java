package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class UserServiceJpaTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldCreateAndFetchUser() {

        User created = userService.createUser(
                "Prem",
                "prem@example.com"
        );

        assertNotNull(created.getId());

        User result =
                userService.getUser(created.getId());

        assertEquals("Prem", result.getName());
        assertEquals(
                "prem@example.com",
                result.getEmail()
        );
    }

    @Test
    void shouldRejectDuplicateEmail() {

        userService.createUser(
                "Prem",
                "prem@example.com"
        );

        assertThrows(
                IllegalArgumentException.class,
                () -> userService.createUser(
                        "Another",
                        "prem@example.com"
                )
        );

        assertEquals(
                1,
                userRepository.count()
        );
    }

    @Test
    void shouldDeleteUser() {

        User created = userService.createUser(
                "Prem",
                "prem@example.com"
        );

        Long id = created.getId();

        userService.deleteUser(id);

        assertTrue(
                userRepository.findById(id).isEmpty()
        );
    }
}
