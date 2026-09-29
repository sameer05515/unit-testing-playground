package com.example.junit;
import org.junit.jupiter.api.*;
import java.time.Duration;
import java.util.concurrent.TimeUnit;
import static org.junit.jupiter.api.Assertions.*;
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class TimeoutAndOrderTest {
 @Test @Order(1) @Timeout(value=1,unit=TimeUnit.SECONDS)
 void first(){assertEquals(2,1+1);}
 @Test @Order(2)
 void preemptiveTimeout(){
  assertTimeoutPreemptively(Duration.ofMillis(500),()->assertEquals(100,50+50));
 }
}