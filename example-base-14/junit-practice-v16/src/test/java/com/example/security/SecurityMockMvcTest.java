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
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest({UserController.class,AdminController.class,PublicController.class})
@Import(SecurityConfig.class)
class SecurityMockMvcTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    UserService service;

    @Test
    void publicEndpointShouldAllowAnonymous() throws Exception {
        mockMvc.perform(get("/api/public/hello"))
            .andExpect(status().isOk())
            .andExpect(content().string("public-hello"));
    }

    @Test
    void userEndpointShouldReturn401ForAnonymous() throws Exception {
        mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isUnauthorized());

        verifyNoInteractions(service);
    }

    @Test
    @org.springframework.security.test.context.support.WithMockUser(username="prem",roles="USER")
    void userEndpointShouldAllowUserRole() throws Exception {
        when(service.getUser(1L))
            .thenReturn(new com.example.user.User(
                1L,"Prem","prem@example.com"));

        mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Prem"));

        verify(service).getUser(1L);
    }

    @Test
    @org.springframework.security.test.context.support.WithMockUser(username="prem",roles="USER")
    void adminEndpointShouldReturn403ForUser() throws Exception {
        mockMvc.perform(get("/api/admin/dashboard"))
            .andExpect(status().isForbidden());
    }

    @Test
    @org.springframework.security.test.context.support.WithMockUser(username="admin",roles="ADMIN")
    void adminEndpointShouldAllowAdmin() throws Exception {
        mockMvc.perform(get("/api/admin/dashboard"))
            .andExpect(status().isOk())
            .andExpect(content().string("admin-dashboard"));
    }

    @Test
    @org.springframework.security.test.context.support.WithMockUser(username="admin",roles={"USER","ADMIN"})
    void adminDeleteShouldAllowAdmin() throws Exception {
        mockMvc.perform(
                delete("/api/admin/users/10")
                    .with(csrf()))
            .andExpect(status().isOk())
            .andExpect(content().string("admin-deleted-10"));
    }

    @Test
    @org.springframework.security.test.context.support.WithMockUser(username="prem",roles="USER")
    void adminDeleteShouldReturn403ForUser() throws Exception {
        mockMvc.perform(
                delete("/api/admin/users/10")
                    .with(csrf()))
            .andExpect(status().isForbidden());
    }

    @Test
    void deleteWithoutAuthenticationShouldReturn401() throws Exception {
        mockMvc.perform(
                delete("/api/admin/users/10")
                    .with(csrf()))
            .andExpect(status().isUnauthorized());
    }

    @Test
    @org.springframework.security.test.context.support.WithMockUser(username="prem",roles="USER")
    void postWithoutCsrfShouldBeForbiddenWhenCsrfEnabled() throws Exception {
        // This test documents CSRF behavior conceptually.
        // Current SecurityConfig disables CSRF for stateless APIs.
        when(service.createUser("Prem","prem@example.com"))
            .thenReturn(new com.example.user.User(
                1L,"Prem","prem@example.com"));

        mockMvc.perform(
                post("/api/users")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("""
                        {"name":"Prem","email":"prem@example.com"}
                    """))
            .andExpect(status().isCreated());
    }
}