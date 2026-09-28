package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@Transactional
class UserTransactionRollbackTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void testOne_shouldCreateUser() {

        userRepository.save(
                new User(
                        "Prem",
                        "prem@example.com"
                )
        );

        assertEquals(1, userRepository.count());

        /*
         * The transaction is rolled back after this test.
         */
    }

    @Test
    void testTwo_shouldStartWithEmptyDatabase() {

        /*
         * Because testOne transaction was rolled back,
         * this test starts with zero users.
         */
        assertEquals(0, userRepository.count());
    }
}
