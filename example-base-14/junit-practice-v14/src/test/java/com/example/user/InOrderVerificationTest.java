package com.example.user;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InOrderVerificationTest {

    @Mock UserRepository repository;
    @Mock EmailService emailService;
    @Mock AuditService auditService;

    @Test
    void shouldVerifyOrderOfInteractions() {
        User saved = new User(1L, "Prem", "prem@example.com");

        when(repository.existsByEmail(any())).thenReturn(false);
        when(repository.save(any(User.class))).thenReturn(saved);

        UserService service =
                new UserService(repository, emailService, auditService);

        service.createUser("Prem", "prem@example.com");

        InOrder inOrder =
                inOrder(repository, auditService, emailService);

        inOrder.verify(repository).existsByEmail("prem@example.com");
        inOrder.verify(repository).save(any(User.class));
        inOrder.verify(auditService).record("USER_CREATED", 1L);
        inOrder.verify(emailService).sendWelcomeEmail(saved);

        inOrder.verifyNoMoreInteractions();
    }
}