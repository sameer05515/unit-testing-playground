package com.example;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.junit.jupiter.api.Assertions.*;

@Testcontainers
@SpringBootTest
class UserServiceIntegrationTest {

    @Container
    static final MySQLContainer<?> MYSQL =
            new MySQLContainer<>("mysql:8.4")
                    .withDatabaseName("junitdb")
                    .withUsername("test")
                    .withPassword("test");

    @DynamicPropertySource
    static void configureDatabase(
            DynamicPropertyRegistry registry) {

        registry.add(
                "spring.datasource.url",
                MYSQL::getJdbcUrl
        );

        registry.add(
                "spring.datasource.username",
                MYSQL::getUsername
        );

        registry.add(
                "spring.datasource.password",
                MYSQL::getPassword
        );

        registry.add(
                "spring.datasource.driver-class-name",
                MYSQL::getDriverClassName
        );

        registry.add(
                "spring.jpa.hibernate.ddl-auto",
                () -> "create-drop"
        );
    }

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void cleanDatabase() {
        userRepository.deleteAll();
    }

    @Test
    void shouldCreateAndFetchUser() {

        User created =
                userService.createUser(
                        "Prem",
                        "prem@example.com"
                );

        assertNotNull(created.getId());

        User result =
                userService.getUser(
                        created.getId()
                );

        assertEquals(
                "Prem",
                result.getName()
        );

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

        User created =
                userService.createUser(
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
