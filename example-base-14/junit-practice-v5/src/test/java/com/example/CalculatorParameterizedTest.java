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

    @ParameterizedTest
    @ValueSource(ints = {1, 2, 3, 4, 5})
    void shouldCheckPositiveNumbers(int number) {
        assertTrue(number > 0);
    }

    @ParameterizedTest
    @ValueSource(strings = {"Java", "Spring Boot", "JUnit", "Mockito"})
    void shouldCheckNonEmptyStrings(String value) {
        assertFalse(value.isBlank());
    }

    @ParameterizedTest
    @CsvSource({
            "10, 20, 30",
            "5, 5, 10",
            "100, 200, 300",
            "-10, 20, 10"
    })
    void shouldAddNumbers(int a, int b, int expected) {
        assertEquals(expected, calculator.add(a, b));
    }

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
}
