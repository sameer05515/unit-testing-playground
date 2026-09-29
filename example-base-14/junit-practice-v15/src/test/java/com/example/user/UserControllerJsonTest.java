package com.example.user;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerJsonTest {
 @Autowired MockMvc mockMvc;
 @MockBean UserService service;

 @Test void validateJsonResponse() throws Exception {
  when(service.getUser(1L)).thenReturn(new User(1L,"Prem","prem@example.com"));
  mockMvc.perform(get("/api/users/1")).andExpect(status().isOk())
   .andExpect(jsonPath("$").isMap())
   .andExpect(jsonPath("$.id").isNumber())
   .andExpect(jsonPath("$.name").isString())
   .andExpect(jsonPath("$.email").isString())
   .andExpect(jsonPath("$.name").value("Prem"));
 }
}