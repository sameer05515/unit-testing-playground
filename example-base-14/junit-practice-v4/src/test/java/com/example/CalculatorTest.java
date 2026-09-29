package com.example;

import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {

    private Calculator calculator;

    @BeforeAll
    static void beforeAll() {
        System.out.println("===== Before All Tests =====");
    }

    @AfterAll
    static void afterAll() {
        System.out.println("===== After All Tests =====");
    }

    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }

    @AfterEach
    void tearDown() {
        calculator = null;
    }

    @Test
    void shouldAddTwoNumbers() {
        assertEquals(30, calculator.add(10, 20));
    }

    @Test
    void shouldThrowExceptionWhenDividingByZero() {
        assertThrows(
                IllegalArgumentException.class,
                () -> calculator.divide(10, 0)
        );
    }

    @Test
    void shouldValidateMultipleConditions() {
        int result = calculator.add(10, 20);

        assertAll(
                () -> assertEquals(30, result),
                () -> assertNotEquals(40, result),
                () -> assertTrue(result > 0),
                () -> assertFalse(result < 0)
        );
    }
}
