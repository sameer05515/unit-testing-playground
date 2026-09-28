package com.example.junit;
import com.example.calculator.Calculator;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.*;
import static org.junit.jupiter.api.Assertions.*;
class ParameterizedAdvancedTest {
 private final Calculator calculator=new Calculator();
 @ParameterizedTest @ValueSource(ints={2,4,6,8,10,100})
 void evenNumbers(int n){assertTrue(calculator.isEven(n));}
 @ParameterizedTest @CsvSource({"2,3,5","10,20,30","-5,10,5","100,200,300"})
 void csvAddition(int a,int b,int expected){assertEquals(expected,calculator.add(a,b));}
 @ParameterizedTest @NullSource @EmptySource
 void nullAndEmpty(String value){assertTrue(value==null||value.isEmpty());}
 @ParameterizedTest @EnumSource(java.time.DayOfWeek.class)
 void allDays(java.time.DayOfWeek day){assertNotNull(day);}
}