package com.example;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

class CalculatorParameterizedTest {

    private Calculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }

    // ---------------------------------------------------------
    // 1. @ValueSource
    // ---------------------------------------------------------

    @ParameterizedTest
    @ValueSource(ints = {1, 2, 3, 4, 5})
    void shouldCheckPositiveNumbers(int number) {

        assertTrue(number > 0);
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "Java",
            "Spring Boot",
            "JUnit",
            "Mockito"
    })
    void shouldCheckNonEmptyStrings(String value) {

        assertFalse(value.isBlank());
    }

    // ---------------------------------------------------------
    // 2. @CsvSource
    // ---------------------------------------------------------

    @ParameterizedTest
    @CsvSource({
            "10, 20, 30",
            "5,  5,  10",
            "100, 200, 300",
            "-10, 20, 10"
    })
    void shouldAddNumbers(int a, int b, int expected) {

        assertEquals(expected, calculator.add(a, b));
    }

    @ParameterizedTest
    @CsvSource({
            "20, 10, 10",
            "100, 50, 50",
            "5,  3,  2"
    })
    void shouldSubtractNumbers(int a, int b, int expected) {

        assertEquals(expected, calculator.subtract(a, b));
    }

    @ParameterizedTest
    @CsvSource({
            "10, 5, 50",
            "4,  5, 20",
            "7,  3, 21"
    })
    void shouldMultiplyNumbers(int a, int b, int expected) {

        assertEquals(expected, calculator.multiply(a, b));
    }

    // ---------------------------------------------------------
    // 3. @MethodSource
    // ---------------------------------------------------------

    @ParameterizedTest
    @MethodSource("additionTestData")
    void shouldAddUsingMethodSource(int a, int b, int expected) {

        assertEquals(expected, calculator.add(a, b));
    }

    static Stream<org.junit.jupiter.params.provider.Arguments> additionTestData() {

        return Stream.of(
                org.junit.jupiter.params.provider.Arguments.of(1, 2, 3),
                org.junit.jupiter.params.provider.Arguments.of(10, 20, 30),
                org.junit.jupiter.params.provider.Arguments.of(100, 200, 300),
                org.junit.jupiter.params.provider.Arguments.of(-10, 5, -5)
        );
    }

    @ParameterizedTest
    @MethodSource("divisionTestData")
    void shouldDivideUsingMethodSource(int a, int b, int expected) {

        assertEquals(expected, calculator.divide(a, b));
    }

    static Stream<org.junit.jupiter.params.provider.Arguments> divisionTestData() {

        return Stream.of(
                org.junit.jupiter.params.provider.Arguments.of(10, 2, 5),
                org.junit.jupiter.params.provider.Arguments.of(20, 4, 5),
                org.junit.jupiter.params.provider.Arguments.of(100, 10, 10)
        );
    }
}
