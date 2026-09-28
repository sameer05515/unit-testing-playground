package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlConfig;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@Sql(
        scripts = "/sql/insert-users.sql",
        config = @SqlConfig(
                transactionMode = SqlConfig.TransactionMode.ISOLATED
        )
)
class UserRepositorySqlTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldLoadUsersUsingSqlScript() {

        List<User> users =
                userRepository.findAll();

        assertEquals(3, users.size());
    }

    @Test
    void shouldFindPremUsingSqlData() {

        User user =
                userRepository.findByEmail(
                        "prem@example.com"
                ).orElseThrow();

        assertEquals("Prem", user.getName());
    }

    @Test
    void shouldFindUsersByName() {

        List<User> users =
                userRepository.findByNameContainingIgnoreCase(
                        "a"
                );

        assertEquals(2, users.size());
    }
}
