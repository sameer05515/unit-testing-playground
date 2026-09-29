package com.example.user;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerWebMvcTest {
 @Autowired MockMvc mockMvc;
 @MockBean UserService service;

 @Test void getUser200() throws Exception {
  when(service.getUser(1L)).thenReturn(new User(1L,"Prem","prem@example.com"));
  mockMvc.perform(get("/api/users/1")).andExpect(status().isOk())
   .andExpect(jsonPath("$.id").value(1))
   .andExpect(jsonPath("$.name").value("Prem"))
   .andExpect(jsonPath("$.email").value("prem@example.com"));
  verify(service).getUser(1L);
 }

 @Test void getUser404() throws Exception {
  when(service.getUser(99L)).thenThrow(new UserNotFoundException(99L));
  mockMvc.perform(get("/api/users/99")).andExpect(status().isNotFound())
   .andExpect(jsonPath("$.status").value(404))
   .andExpect(jsonPath("$.message").value("User not found: 99"));
 }

 @Test void create201() throws Exception {
  when(service.createUser("Prem","prem@example.com"))
   .thenReturn(new User(10L,"Prem","prem@example.com"));
  mockMvc.perform(post("/api/users").contentType(MediaType.APPLICATION_JSON).content("""
   {"name":"Prem","email":"prem@example.com"}
  """)).andExpect(status().isCreated())
   .andExpect(header().string("Location","/api/users/10"))
   .andExpect(jsonPath("$.id").value(10));
  verify(service).createUser("Prem","prem@example.com");
 }

 @Test void validation400() throws Exception {
  mockMvc.perform(post("/api/users").contentType(MediaType.APPLICATION_JSON).content("""
   {"name":"","email":"wrong-email"}
  """)).andExpect(status().isBadRequest())
   .andExpect(jsonPath("$.status").value(400))
   .andExpect(jsonPath("$.message").value(containsString("name")));
  verifyNoInteractions(service);
 }

 @Test void duplicate409() throws Exception {
  when(service.createUser("Prem","prem@example.com"))
   .thenThrow(new DuplicateEmailException("prem@example.com"));
  mockMvc.perform(post("/api/users").contentType(MediaType.APPLICATION_JSON).content("""
   {"name":"Prem","email":"prem@example.com"}
  """)).andExpect(status().isConflict())
   .andExpect(jsonPath("$.status").value(409));
 }

 @Test void search200() throws Exception {
  when(service.searchUsers("prem")).thenReturn(List.of(
   new User(1L,"Prem","prem@example.com"),
   new User(2L,"Prem Kumar","prem.kumar@example.com")));
  mockMvc.perform(get("/api/users/search").param("name","prem"))
   .andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(2))
   .andExpect(jsonPath("$[0].name").value("Prem"));
  verify(service).searchUsers("prem");
 }

 @Test void delete204() throws Exception {
  mockMvc.perform(delete("/api/users/1")).andExpect(status().isNoContent());
  verify(service).deleteUser(1L);
 }

 @Test void invalidJson400() throws Exception {
  mockMvc.perform(post("/api/users").contentType(MediaType.APPLICATION_JSON)
   .content("{ invalid json }")).andExpect(status().isBadRequest());
  verifyNoInteractions(service);
 }
}