package com.example.junit;
import com.example.calculator.Calculator;
import org.junit.jupiter.api.*;
import java.util.stream.Stream;
import static org.junit.jupiter.api.Assertions.assertEquals;
class DynamicTestsExample {
 private final Calculator calculator=new Calculator();
 @TestFactory
 Stream<DynamicTest> additionTests(){
  return Stream.of(
   DynamicTest.dynamicTest("2 + 3",()->assertEquals(5,calculator.add(2,3))),
   DynamicTest.dynamicTest("10 + 20",()->assertEquals(30,calculator.add(10,20))),
   DynamicTest.dynamicTest("-5 + 10",()->assertEquals(5,calculator.add(-5,10))),
   DynamicTest.dynamicTest("0 + 0",()->assertEquals(0,calculator.add(0,0)))
  );
 }
 @TestFactory
 Stream<DynamicTest> divisionTests(){
  return Stream.of(
   DynamicTest.dynamicTest("20 / 5",()->assertEquals(4,calculator.divide(20,5))),
   DynamicTest.dynamicTest("100 / 10",()->assertEquals(10,calculator.divide(100,10)))
  );
 }
}