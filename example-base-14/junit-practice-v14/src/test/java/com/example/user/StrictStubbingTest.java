package com.example.user;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StrictStubbingTest {

    @Mock
    UserRepository repository;

    @Test
    void shouldUseOnlyRequiredStubbing() {
        when(repository.findById(1L))
                .thenReturn(Optional.of(
                        new User(1L, "Prem", "prem@example.com")));

        UserService service = new UserService(
                repository,
                mock(EmailService.class),
                mock(AuditService.class)
        );

        assertEquals("Prem", service.getUser(1L).getName());
    }
}