package com.example.user;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ExceptionMockingTest {

    @Test
    void shouldMockExceptionFromRepository() {
        UserRepository repository = mock(UserRepository.class);

        when(repository.findById(1L))
                .thenThrow(new RuntimeException("Database unavailable"));

        UserService service = new UserService(
                repository,
                mock(EmailService.class),
                mock(AuditService.class)
        );

        RuntimeException ex = assertThrows(
                RuntimeException.class,
                () -> service.getUser(1L)
        );

        assertEquals("Database unavailable", ex.getMessage());
    }

    @Test
    void shouldThrowCheckedLikeBehaviorUsingDoThrowForVoid() {
        EmailService emailService = mock(EmailService.class);

        doThrow(new RuntimeException("Email server down"))
                .when(emailService)
                .sendWelcomeEmail(any(User.class));

        assertThrows(
                RuntimeException.class,
                () -> emailService.sendWelcomeEmail(
                        new User(1L, "Prem", "prem@example.com"))
        );
    }
}