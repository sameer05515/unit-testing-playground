package com.example;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @Test
    void shouldGetUser() throws Exception {

        User user = new User(1L, "Prem", "prem@example.com");

        when(userService.getUser(1L))
                .thenReturn(user);

        mockMvc.perform(get("/api/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Prem"))
                .andExpect(jsonPath("$.email")
                        .value("prem@example.com"));

        verify(userService).getUser(1L);
    }

    @Test
    void shouldCreateUser() throws Exception {

        User response = new User(
                1L,
                "Prem",
                "prem@example.com"
        );

        when(userService.createUser(any(User.class)))
                .thenReturn(response);

        User request = new User(
                null,
                "Prem",
                "prem@example.com"
        );

        mockMvc.perform(
                post("/api/users")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
        )
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").value(1))
        .andExpect(jsonPath("$.name").value("Prem"));

        verify(userService).createUser(any(User.class));
    }
}
