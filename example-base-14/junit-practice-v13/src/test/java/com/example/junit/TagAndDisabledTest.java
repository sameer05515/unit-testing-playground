package com.example.junit;
import com.example.calculator.Calculator;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
class TagAndDisabledTest {
 private final Calculator calculator=new Calculator();
 @Test @Tag("unit") @Tag("fast")
 void fastTest(){assertEquals(10,calculator.add(5,5));}
 @Test @Tag("regression")
 void regressionTest(){assertEquals(5,calculator.divide(25,5));}
 @Test @Disabled("Demonstration of @Disabled")
 void disabledTest(){fail("must not execute");}
}