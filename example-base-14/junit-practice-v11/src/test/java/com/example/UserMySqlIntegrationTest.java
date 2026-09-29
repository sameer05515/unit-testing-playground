package com.example;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserMySqlIntegrationTest
        extends UserMySqlTestBase {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @BeforeEach
    void cleanDatabase() {
        userRepository.deleteAll();
    }

    @Test
    void shouldPersistUserInRealMySql() {

        User created =
                userService.createUser(
                        "Prem",
                        "prem@example.com"
                );

        assertNotNull(created.getId());

        User found =
                userService.getUser(
                        created.getId()
                );

        assertEquals(
                "Prem",
                found.getName()
        );

        assertEquals(
                "prem@example.com",
                found.getEmail()
        );
    }
}
