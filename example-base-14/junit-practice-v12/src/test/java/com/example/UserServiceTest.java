package com.example;
import com.example.user.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
 @Mock UserRepository repository;
 @InjectMocks UserService service;
 @Test void shouldFindUser(){
  when(repository.findById(1L)).thenReturn(Optional.of(new User(1L,"Prem","prem@example.com")));
  assertEquals("Prem",service.getUser(1L).getName());
 }
 @Test void shouldThrowWhenUserNotFound(){
  when(repository.findById(99L)).thenReturn(Optional.empty());
  assertThrows(UserNotFoundException.class,()->service.getUser(99L));
 }
 @Test void shouldRejectDuplicateEmail(){
  when(repository.existsByEmail("prem@example.com")).thenReturn(true);
  assertThrows(DuplicateEmailException.class,()->service.createUser("Prem","prem@example.com"));
  verify(repository,never()).save(any());
 }
}