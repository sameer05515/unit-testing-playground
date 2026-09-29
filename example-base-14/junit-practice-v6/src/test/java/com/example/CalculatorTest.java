package com.example;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {

    @Test
    void shouldAddTwoNumbers() {
        Calculator calculator = new Calculator();

        assertEquals(30, calculator.add(10, 20));
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
