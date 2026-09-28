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
        System.out.println("Before each test");
        calculator = new Calculator();
    }

    @AfterEach
    void tearDown() {
        System.out.println("After each test");
        calculator = null;
    }

    @Test
    void shouldAddTwoNumbers() {
        int result = calculator.add(10, 20);
        assertEquals(30, result);
    }

    @Test
    void shouldSubtractTwoNumbers() {
        int result = calculator.subtract(20, 10);
        assertEquals(10, result);
    }

    @Test
    void shouldMultiplyTwoNumbers() {
        int result = calculator.multiply(10, 5);
        assertEquals(50, result);
    }

    @Test
    void shouldDivideTwoNumbers() {
        int result = calculator.divide(20, 5);
        assertEquals(4, result);
    }

    @Test
    void shouldThrowExceptionWhenDividingByZero() {
        assertThrows(
                IllegalArgumentException.class,
                () -> calculator.divide(10, 0)
        );
    }
}
