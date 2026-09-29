package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest
@Import(com.example.config.SecurityConfig.class)
class SecurityJwtMockMvcTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    JwtDecoder jwtDecoder;

    @Test
    void publicEndpoint_shouldAllowAnonymous() throws Exception {
        mockMvc.perform(get("/api/public/hello"))
            .andExpect(status().isOk())
            .andExpect(content().string("public-hello"));

        verifyNoInteractions(jwtDecoder);
    }

    @Test
    void protectedEndpoint_withoutToken_shouldReturn401() throws Exception {
        mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isUnauthorized());
    }

    @Test
    void validJwt_shouldAccessProtectedEndpoint() throws Exception {
        mockMvc.perform(get("/api/users/1")
                .with(jwt()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Prem"));
    }

    @Test
    void userRole_shouldNotAccessAdminEndpoint() throws Exception {
        mockMvc.perform(get("/api/admin/dashboard")
                .with(jwt().authorities(
                    new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_USER"))))
            .andExpect(status().isForbidden());
    }

    @Test
    void adminRole_shouldAccessAdminEndpoint() throws Exception {
        mockMvc.perform(get("/api/admin/dashboard")
                .with(jwt().authorities(
                    new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_ADMIN"))))
            .andExpect(status().isOk())
            .andExpect(content().string("admin-dashboard"));
    }

    @Test
    void jwtWithCustomClaims_shouldExposeUsernameAndAuthorities() throws Exception {
        Jwt jwtToken = Jwt.withTokenValue("token")
            .header("alg", "RS256")
            .subject("prem")
            .claim("preferred_username", "premendra")
            .claim("roles", java.util.List.of("USER", "ADMIN"))
            .issuedAt(Instant.now())
            .expiresAt(Instant.now().plusSeconds(300))
            .build();

        mockMvc.perform(get("/api/me")
                .with(jwt().jwt(j -> j
                    .subject(jwtToken.getSubject())
                    .claim("preferred_username", "premendra")
                    .claim("roles", java.util.List.of("USER", "ADMIN")))
                    .authorities(
                        new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_USER"),
                        new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_ADMIN")
                    )))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.username").value("prem"))
            .andExpect(jsonPath("$.authorities").isArray());
    }

    @Test
    void invalidBearerToken_shouldReturn401() throws Exception {
        when(jwtDecoder.decode("invalid-token"))
            .thenThrow(new JwtException("Invalid JWT"));

        mockMvc.perform(get("/api/users/1")
                .header("Authorization", "Bearer invalid-token"))
            .andExpect(status().isUnauthorized());

        verify(jwtDecoder).decode("invalid-token");
    }

    @Test
    void expiredBearerToken_shouldReturn401() throws Exception {
        when(jwtDecoder.decode("expired-token"))
            .thenThrow(new JwtException("JWT expired"));

        mockMvc.perform(get("/api/users/1")
                .header("Authorization", "Bearer expired-token"))
            .andExpect(status().isUnauthorized());

        verify(jwtDecoder).decode("expired-token");
    }

    @Test
    void realBearerTokenDecodedByMock_shouldAccessProtectedEndpoint() throws Exception {
        Jwt token = Jwt.withTokenValue("valid-token")
            .header("alg", "RS256")
            .subject("prem")
            .issuedAt(Instant.now())
            .expiresAt(Instant.now().plusSeconds(300))
            .claim("roles", java.util.List.of("USER"))
            .build();

        when(jwtDecoder.decode("valid-token")).thenReturn(token);

        mockMvc.perform(get("/api/users/1")
                .header("Authorization", "Bearer valid-token"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.email").value("prem@example.com"));

        verify(jwtDecoder).decode("valid-token");
    }

    @Test
    void realBearerTokenWithAdminRole_shouldAccessAdmin() throws Exception {
        Jwt token = Jwt.withTokenValue("admin-token")
            .header("alg", "RS256")
            .subject("admin")
            .issuedAt(Instant.now())
            .expiresAt(Instant.now().plusSeconds(300))
            .claim("roles", java.util.List.of("ADMIN"))
            .build();

        when(jwtDecoder.decode("admin-token")).thenReturn(token);

        mockMvc.perform(get("/api/admin/dashboard")
                .header("Authorization", "Bearer admin-token"))
            .andExpect(status().isOk())
            .andExpect(content().string("admin-dashboard"));
    }

    @Test
    void realBearerTokenWithUserRole_shouldReturn403ForAdmin() throws Exception {
        Jwt token = Jwt.withTokenValue("user-token")
            .header("alg", "RS256")
            .subject("prem")
            .issuedAt(Instant.now())
            .expiresAt(Instant.now().plusSeconds(300))
            .claim("roles", java.util.List.of("USER"))
            .build();

        when(jwtDecoder.decode("user-token")).thenReturn(token);

        mockMvc.perform(get("/api/admin/dashboard")
                .header("Authorization", "Bearer user-token"))
            .andExpect(status().isForbidden());
    }

    @Test
    void jwtRequestPostProcessor_canSupplyCustomSubject() throws Exception {
        mockMvc.perform(get("/api/me")
                .with(jwt().jwt(jwt -> jwt.subject("alice"))))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.username").value("alice"));
    }
}
