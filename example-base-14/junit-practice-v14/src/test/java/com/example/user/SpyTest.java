package com.example.user;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SpyTest {

    @Test
    void shouldSpyOnRealList() {
        List<String> realList = new ArrayList<>();
        List<String> spyList = spy(realList);

        spyList.add("Prem");
        spyList.add("Rahul");

        verify(spyList).add("Prem");
        verify(spyList).add("Rahul");

        assertEquals(2, spyList.size());
        assertTrue(spyList.contains("Prem"));
    }

    @Test
    void shouldStubSpyMethod() {
        List<String> realList = new ArrayList<>();
        realList.add("Prem");

        List<String> spyList = spy(realList);

        doReturn(100).when(spyList).size();

        assertEquals(100, spyList.size());
        assertTrue(spyList.contains("Prem"));
    }
}