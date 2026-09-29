package com.example.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import com.example.admin.AdminController;
import com.example.publicapi.PublicController;
import com.example.user.UserController;
import com.example.user.UserService;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest({AdminController.class,PublicController.class,UserController.class})
@Import(SecurityConfig.class)
class WithMockUserVariantsTest {

    @Autowired MockMvc mockMvc;

    @MockBean UserService service;

    @Test
    void requestCanUseUserRequestPostProcessor() throws Exception {
        mockMvc.perform(
                get("/api/users/1")
                    .with(user("prem").roles("USER")))
            .andExpect(status().isOk());
    }

    @Test
    void requestCanUseAdminRole() throws Exception {
        mockMvc.perform(
                get("/api/admin/dashboard")
                    .with(user("admin").roles("ADMIN")))
            .andExpect(status().isOk());
    }

    @Test
    void requestWithWrongRoleGets403() throws Exception {
        mockMvc.perform(
                get("/api/admin/dashboard")
                    .with(user("prem").roles("USER")))
            .andExpect(status().isForbidden());
    }
}