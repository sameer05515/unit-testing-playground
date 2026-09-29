package com.example.gateway;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.beans.factory.annotation.Autowired;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest
@Import(SecurityConfig.class)
class GatewaySecurityTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    JwtDecoder jwtDecoder;

    @Test
    void publicEndpoint_shouldAllowAnonymous() throws Exception {
        mockMvc.perform(get("/gateway/public"))
            .andExpect(status().isOk())
            .andExpect(content().string("gateway-public"));
    }

    @Test
    void protectedEndpoint_withoutJwt_shouldReturn401() throws Exception {
        mockMvc.perform(get("/gateway/users/1"))
            .andExpect(status().isUnauthorized());
    }

    @Test
    void userJwt_shouldAccessUserRoute() throws Exception {
        mockMvc.perform(get("/gateway/users/1")
                .with(jwt().authorities(
                    new org.springframework.security.core.authority.SimpleGrantedAuthority(
                        "ROLE_USER"))))
            .andExpect(status().isOk());
    }

    @Test
    void userJwt_shouldBeForbiddenOnAdminRoute() throws Exception {
        mockMvc.perform(get("/gateway/admin/dashboard")
                .with(jwt().authorities(
                    new org.springframework.security.core.authority.SimpleGrantedAuthority(
                        "ROLE_USER"))))
            .andExpect(status().isForbidden());
    }

    @Test
    void adminJwt_shouldAccessAdminRoute() throws Exception {
        mockMvc.perform(get("/gateway/admin/dashboard")
                .with(jwt().authorities(
                    new org.springframework.security.core.authority.SimpleGrantedAuthority(
                        "ROLE_ADMIN"))))
            .andExpect(status().isOk());
    }

    @Test
    void orderScope_shouldAccessOrderRoute() throws Exception {
        mockMvc.perform(get("/gateway/orders")
                .with(jwt().authorities(
                    new org.springframework.security.core.authority.SimpleGrantedAuthority(
                        "SCOPE_orders:read"))))
            .andExpect(status().isOk());
    }

    @Test
    void missingOrderScope_shouldReturn403() throws Exception {
        mockMvc.perform(get("/gateway/orders")
                .with(jwt().authorities(
                    new org.springframework.security.core.authority.SimpleGrantedAuthority(
                        "ROLE_USER"))))
            .andExpect(status().isForbidden());
    }
}
