package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void shouldSearchUsers() throws Exception {

        when(userService.searchUsers("prem"))
                .thenReturn(
                        java.util.List.of(
                                new User(
                                        1L,
                                        "Prem",
                                        "prem@example.com"
                                )
                        )
                );

        mockMvc.perform(
                get("/api/users/search")
                        .param("name", "prem")
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].name")
                .value("Prem"));

        verify(userService)
                .searchUsers("prem");
    }
}
