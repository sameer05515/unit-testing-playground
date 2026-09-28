package com.example.junit;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assumptions.*;
class ConditionalAndAssumptionTest {
 @Test @EnabledOnOs(OS.WINDOWS)
 void windowsOnly(){assertTrue(System.getProperty("os.name").toLowerCase().contains("win"));}
 @Test @EnabledOnJre(JRE.JAVA_17)
 void java17Only(){assertEquals(17,Runtime.version().feature());}
 @Test
 void assumptionExample(){
  String env=System.getProperty("test.environment","local");
  assumeTrue(env.equals("local"));
  assertEquals("local",env);
 }
}