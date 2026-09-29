package com.example.user;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AnswerAndDoAnswerTest {

    @Mock UserRepository repository;

    @Test
    void shouldUseAnswerToGenerateUser() {
        when(repository.save(any(User.class)))
                .thenAnswer(invocation -> {
                    User input = invocation.getArgument(0);
                    input.setId(100L);
                    return input;
                });

        User result = repository.save(
                new User("Prem", "prem@example.com"));

        assertEquals(100L, result.getId());
        assertEquals("Prem", result.getName());
    }

    @Test
    void shouldUseDoAnswerForVoidMethod() {
        EmailService emailService = mock(EmailService.class);

        doAnswer(invocation -> {
            User user = invocation.getArgument(0);
            System.out.println("Sending email to: " + user.getEmail());
            return null;
        }).when(emailService).sendWelcomeEmail(any(User.class));

        assertDoesNotThrow(() ->
                emailService.sendWelcomeEmail(
                        new User(1L, "Prem", "prem@example.com")));

        verify(emailService).sendWelcomeEmail(any(User.class));
    }
}