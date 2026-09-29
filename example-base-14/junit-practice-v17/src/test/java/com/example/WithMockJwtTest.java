package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.beans.factory.annotation.Autowired;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest
@Import(com.example.config.SecurityConfig.class)
class WithMockJwtTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    JwtDecoder jwtDecoder;

    @Test
    void defaultMockJwt_shouldBeAuthenticated() throws Exception {
        mockMvc.perform(get("/api/users/1").with(jwt()))
            .andExpect(status().isOk());
    }

    @Test
    void mockJwtWithAdminAuthority_shouldAccessAdmin() throws Exception {
        mockMvc.perform(get("/api/admin/dashboard")
                .with(jwt().authorities(
                    new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_ADMIN"))))
            .andExpect(status().isOk());
    }

    @Test
    void mockJwtWithUserAuthority_shouldBeForbiddenForAdmin() throws Exception {
        mockMvc.perform(get("/api/admin/dashboard")
                .with(jwt().authorities(
                    new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_USER"))))
            .andExpect(status().isForbidden());
    }
}
