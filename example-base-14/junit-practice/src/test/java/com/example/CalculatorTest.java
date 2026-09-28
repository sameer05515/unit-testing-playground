package com.example;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {

    @Test
    void shouldAddTwoNumbers() {
        Calculator calculator = new Calculator();

        int result = calculator.add(10, 20);

        assertEquals(30, result);
    }

    @Test
    void shouldSubtractTwoNumbers() {
        Calculator calculator = new Calculator();

        int result = calculator.subtract(20, 10);

        assertEquals(10, result);
    }

    @Test
    void shouldMultiplyTwoNumbers() {
        Calculator calculator = new Calculator();

        int result = calculator.multiply(10, 5);

        assertEquals(50, result);
    }

    @Test
    void shouldDivideTwoNumbers() {
        Calculator calculator = new Calculator();

        int result = calculator.divide(20, 5);

        assertEquals(4, result);
    }

    @Test
    void shouldThrowExceptionWhenDividingByZero() {
        Calculator calculator = new Calculator();

        assertThrows(
                IllegalArgumentException.class,
                () -> calculator.divide(10, 0)
        );
    }
}
