package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UserRepositorySqlCleanupTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    @Sql("/sql/insert-prem.sql")
    void shouldInsertDataBeforeTest() {

        assertEquals(1, userRepository.count());

        User user =
                userRepository.findByEmail(
                        "prem@example.com"
                ).orElseThrow();

        assertEquals("Prem", user.getName());
    }

    @Test
    @Sql(
            scripts = "/sql/insert-prem.sql",
            executionPhase =
                    Sql.ExecutionPhase.BEFORE_TEST_METHOD
    )
    @Sql(
            scripts = "/sql/cleanup-users.sql",
            executionPhase =
                    Sql.ExecutionPhase.AFTER_TEST_METHOD
    )
    void shouldCleanupDataAfterTest() {

        assertEquals(1, userRepository.count());
    }
}
