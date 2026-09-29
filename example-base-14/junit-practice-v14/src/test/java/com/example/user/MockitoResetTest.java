package com.example.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class MockitoResetTest {

    UserRepository repository;

    @BeforeEach
    void setUp() {
        repository = mock(UserRepository.class);
    }

    @Test
    void shouldStubMock() {
        when(repository.existsByEmail("prem@example.com"))
                .thenReturn(true);

        assertEquals(
                true,
                repository.existsByEmail("prem@example.com")
        );
    }

    @Test
    void shouldResetMockWhenExplicitlyNeeded() {
        when(repository.existsByEmail("prem@example.com"))
                .thenReturn(true);

        reset(repository);

        assertEquals(
                false,
                repository.existsByEmail("prem@example.com")
        );

        verify(repository).existsByEmail("prem@example.com");
    }
}