package com.example.junit;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.assertTrue;
class RepeatedTestExample {
 @RepeatedTest(5)
 void shouldRunFiveTimes(RepetitionInfo info){
  assertTrue(info.getCurrentRepetition()<=info.getTotalRepetitions());
 }
}