package com.example;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@Testcontainers
@DataJpaTest
class UserRepositoryMySqlTest {

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
    private UserRepository userRepository;

    @BeforeEach
    void cleanDatabase() {
        userRepository.deleteAll();
    }

    @Test
    void shouldSaveUserInRealMySql() {

        User user = new User(
                "Prem",
                "prem@example.com"
        );

        User saved = userRepository.save(user);

        assertNotNull(saved.getId());
        assertEquals("Prem", saved.getName());
        assertEquals(
                "prem@example.com",
                saved.getEmail()
        );
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
        assertEquals(
                "Prem",
                result.get().getName()
        );
    }

    @Test
    void shouldFindAllUsers() {

        userRepository.save(
                new User(
                        "Prem",
                        "prem@example.com"
                )
        );

        userRepository.save(
                new User(
                        "Rahul",
                        "rahul@example.com"
                )
        );

        List<User> users =
                userRepository.findAll();

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

        userRepository.deleteById(
                saved.getId()
        );

        assertTrue(
                userRepository.findById(
                        saved.getId()
                ).isEmpty()
        );
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
}
