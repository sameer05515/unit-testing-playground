package com.example.user;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
class UserControllerArgumentCaptorTest {
 @Autowired MockMvc mockMvc;
 @MockBean UserService service;

 @Test void captureServiceArguments() throws Exception {
  when(service.createUser("Rahul","rahul@example.com"))
   .thenReturn(new User(20L,"Rahul","rahul@example.com"));
  mockMvc.perform(post("/api/users").contentType(APPLICATION_JSON).content("""
   {"name":"Rahul","email":"rahul@example.com"}
  """)).andExpect(status().isCreated());

  ArgumentCaptor<String> name=ArgumentCaptor.forClass(String.class);
  ArgumentCaptor<String> email=ArgumentCaptor.forClass(String.class);
  verify(service).createUser(name.capture(),email.capture());

  assertEquals("Rahul",name.getValue());
  assertEquals("rahul@example.com",email.getValue());
 }
}