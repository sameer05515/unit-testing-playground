package com.example;
import com.example.user.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
@WebMvcTest(UserController.class)
class UserControllerTest {
 @Autowired MockMvc mockMvc;
 @MockBean UserService service;
 @Test void shouldReturn201ForValidCreateRequest() throws Exception {
  when(service.createUser("Prem","prem@example.com")).thenReturn(new User(1L,"Prem","prem@example.com"));
  mockMvc.perform(post("/api/users").contentType(MediaType.APPLICATION_JSON).content("""
   {"name":"Prem","email":"prem@example.com"}
  """)).andExpect(status().isCreated()).andExpect(jsonPath("$.id").value(1));
 }
 @Test void shouldReturn400ForInvalidCreateRequest() throws Exception {
  mockMvc.perform(post("/api/users").contentType(MediaType.APPLICATION_JSON).content("""
   {"name":"","email":"wrong"}
  """)).andExpect(status().isBadRequest()).andExpect(jsonPath("$.status").value(400));
 }
}