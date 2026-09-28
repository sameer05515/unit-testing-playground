package com.example.junit;
import com.example.calculator.Calculator;
import org.junit.jupiter.api.Test;
import java.time.Duration;
import static org.junit.jupiter.api.Assertions.*;
class AdvancedAssertionsTest {
 private final Calculator calculator=new Calculator();
 @Test void assertAllExample(){
  assertAll(
   ()->assertEquals(10,calculator.add(4,6)),
   ()->assertEquals(2,calculator.subtract(6,4)),
   ()->assertEquals(24,calculator.multiply(4,6)),
   ()->assertEquals(2,calculator.divide(12,6)));
 }
 @Test void exceptionMessage(){
  var ex=assertThrows(IllegalArgumentException.class,()->calculator.divide(10,0));
  assertEquals("Cannot divide by zero",ex.getMessage());
 }
 @Test void timeout(){assertTimeout(Duration.ofMillis(100),()->assertEquals(30,calculator.add(10,20)));}
}