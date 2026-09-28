package com.example.user;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceMockitoTest {

    @Mock
    UserRepository repository;

    @Mock
    EmailService emailService;

    @Mock
    AuditService auditService;

    @InjectMocks
    UserService service;

    @Test
    void shouldCaptureSavedUser() {
        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);

        when(repository.existsByEmail("prem@example.com")).thenReturn(false);
        when(repository.save(any(User.class)))
                .thenReturn(new User(1L, "Prem", "prem@example.com"));

        User result = service.createUser("Prem", "prem@example.com");

        verify(repository).save(captor.capture());

        User captured = captor.getValue();

        assertEquals("Prem", captured.getName());
        assertEquals("prem@example.com", captured.getEmail());
        assertEquals(1L, result.getId());
    }

    @Test
    void shouldVerifyExactInvocationCount() {
        when(repository.findById(1L))
                .thenReturn(Optional.of(
                        new User(1L, "Prem", "prem@example.com")));

        service.getUser(1L);

        verify(repository, times(1)).findById(1L);
        verifyNoMoreInteractions(repository);
    }

    @Test
    void shouldNeverSaveDuplicateUser() {
        when(repository.existsByEmail("prem@example.com"))
                .thenReturn(true);

        assertThrows(
                DuplicateEmailException.class,
                () -> service.createUser("Prem", "prem@example.com")
        );

        verify(repository, never()).save(any());
        verifyNoInteractions(emailService, auditService);
    }

    @Test
    void shouldVerifyCreateInteraction() {
        User saved = new User(10L, "Prem", "prem@example.com");

        when(repository.existsByEmail(anyString())).thenReturn(false);
        when(repository.save(any(User.class))).thenReturn(saved);

        service.createUser("Prem", "prem@example.com");

        verify(auditService).record("USER_CREATED", 10L);
        verify(emailService).sendWelcomeEmail(saved);
    }

    @Test
    void shouldDeleteUser() {
        User user = new User(5L, "Rahul", "rahul@example.com");

        when(repository.findById(5L))
                .thenReturn(Optional.of(user));

        service.deleteUser(5L);

        verify(repository).deleteById(5L);
        verify(auditService).record("USER_DELETED", 5L);
        verify(emailService).sendDeletionEmail(user);
    }

    @Test
    void shouldThrowWhenDeletingUnknownUser() {
        when(repository.findById(99L))
                .thenReturn(Optional.empty());

        assertThrows(
                UserNotFoundException.class,
                () -> service.deleteUser(99L)
        );

        verify(repository, never()).deleteById(anyLong());
        verifyNoInteractions(emailService, auditService);
    }

    @Test
    void shouldReturnAllUsers() {
        List<User> users = List.of(
                new User(1L, "Prem", "prem@example.com"),
                new User(2L, "Rahul", "rahul@example.com")
        );

        when(repository.findAll()).thenReturn(users);

        List<User> result = service.getAllUsers();

        assertEquals(2, result.size());
        assertEquals("Prem", result.get(0).getName());
        verify(repository).findAll();
    }
}