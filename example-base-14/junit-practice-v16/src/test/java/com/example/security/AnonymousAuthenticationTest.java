package com.example.security;

import com.example.admin.AdminController;
import com.example.publicapi.PublicController;
import com.example.user.UserController;
import com.example.user.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.anonymous;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest({AdminController.class,PublicController.class,UserController.class})
@Import(SecurityConfig.class)
class AnonymousAuthenticationTest {

    @Autowired MockMvc mockMvc;
    @MockBean UserService service;

    @Test
    void anonymousUserCannotAccessProtectedEndpoint() throws Exception {
        mockMvc.perform(
                get("/api/users/1").with(anonymous()))
            .andExpect(status().isUnauthorized());
    }
}