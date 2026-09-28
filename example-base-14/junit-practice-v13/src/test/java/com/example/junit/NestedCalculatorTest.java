package com.example.junit;
import com.example.calculator.Calculator;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
@DisplayName("Calculator Tests")
class NestedCalculatorTest {
 private Calculator calculator;
 @BeforeEach void setUp(){calculator=new Calculator();}
 @Nested @DisplayName("Arithmetic")
 class Arithmetic {
  @Test void add(){assertEquals(10,calculator.add(4,6));}
  @Test void subtract(){assertEquals(2,calculator.subtract(6,4));}
  @Test void multiply(){assertEquals(24,calculator.multiply(4,6));}
 }
 @Nested @DisplayName("Division")
 class Division {
  @Test void divide(){assertEquals(5,calculator.divide(10,2));}
  @Test void zeroThrows(){assertThrows(IllegalArgumentException.class,()->calculator.divide(10,0));}
 }
}