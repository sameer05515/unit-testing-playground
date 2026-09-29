package com.example;

import com.example.config.SecurityConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Map;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest
@Import(SecurityConfig.class)
class JwtClaimTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    JwtDecoder jwtDecoder;

    @Test
    void jwtSubject_shouldBecomeAuthenticationName() throws Exception {
        mockMvc.perform(get("/api/me")
                .with(jwt().jwt(jwt ->
                    jwt.subject("prem")
                )))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.username").value("prem"));
    }

    @Test
    void jwtRealmAccessClaim_canBeRepresentedInTestToken() throws Exception {
        mockMvc.perform(get("/api/me")
                .with(jwt().jwt(jwt ->
                    jwt.subject("admin")
                       .claim("realm_access", Map.of(
                           "roles", List.of("ADMIN")
                       ))
                ).authorities(
                    new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_ADMIN")
                )))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.username").value("admin"));
    }
}
