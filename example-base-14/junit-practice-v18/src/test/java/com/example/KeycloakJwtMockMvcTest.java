package com.example;

import com.example.config.SecurityConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest
@Import(SecurityConfig.class)
class KeycloakJwtMockMvcTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    JwtDecoder jwtDecoder;

    @Test
    void publicEndpoint_shouldBeAccessibleWithoutToken() throws Exception {
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
    void keycloakUserToken_shouldAccessUserApi() throws Exception {
        when(jwtDecoder.decode("user-token"))
            .thenReturn(KeycloakJwtTestSupport.userToken());

        mockMvc.perform(get("/api/users/1")
                .header("Authorization", "Bearer user-token"))
            .andExpect(status().isOk())
            .andExpect(content().string("user-1"));
    }

    @Test
    void keycloakUserToken_shouldNotAccessAdminApi() throws Exception {
        when(jwtDecoder.decode("user-token"))
            .thenReturn(KeycloakJwtTestSupport.userToken());

        mockMvc.perform(get("/api/admin/dashboard")
                .header("Authorization", "Bearer user-token"))
            .andExpect(status().isForbidden());
    }

    @Test
    void keycloakAdminToken_shouldAccessAdminApi() throws Exception {
        when(jwtDecoder.decode("admin-token"))
            .thenReturn(KeycloakJwtTestSupport.adminToken());

        mockMvc.perform(get("/api/admin/dashboard")
                .header("Authorization", "Bearer admin-token"))
            .andExpect(status().isOk())
            .andExpect(content().string("admin-dashboard"));
    }

    @Test
    void keycloakAdminToken_shouldPassPreAuthorize() throws Exception {
        when(jwtDecoder.decode("admin-token"))
            .thenReturn(KeycloakJwtTestSupport.adminToken());

        mockMvc.perform(delete("/api/admin/users/25")
                .header("Authorization", "Bearer admin-token"))
            .andExpect(status().isOk())
            .andExpect(content().string("admin-deleted-25"));
    }

    @Test
    void realmRoleMapping_shouldExposeRolesAsSpringAuthorities() throws Exception {
        when(jwtDecoder.decode("admin-token"))
            .thenReturn(KeycloakJwtTestSupport.adminToken());

        mockMvc.perform(get("/api/me")
                .header("Authorization", "Bearer admin-token"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.username").value("admin"))
            .andExpect(jsonPath("$.authorities[0]").value("ROLE_ADMIN"))
            .andExpect(jsonPath("$.authorities[1]").value("ROLE_USER"));
    }

    @Test
    void reportScope_shouldAllowReportApi() throws Exception {
        when(jwtDecoder.decode("report-token"))
            .thenReturn(KeycloakJwtTestSupport.reportReaderToken());

        mockMvc.perform(get("/api/reports")
                .header("Authorization", "Bearer report-token"))
            .andExpect(status().isOk())
            .andExpect(content().string("reports-data"));
    }

    @Test
    void userWithoutReportScope_shouldGet403() throws Exception {
        when(jwtDecoder.decode("user-token"))
            .thenReturn(KeycloakJwtTestSupport.userToken());

        mockMvc.perform(get("/api/reports")
                .header("Authorization", "Bearer user-token"))
            .andExpect(status().isForbidden());
    }

    @Test
    void invalidToken_shouldReturn401() throws Exception {
        when(jwtDecoder.decode("invalid-token"))
            .thenThrow(new JwtException("Invalid token"));

        mockMvc.perform(get("/api/users/1")
                .header("Authorization", "Bearer invalid-token"))
            .andExpect(status().isUnauthorized());

        verify(jwtDecoder).decode("invalid-token");
    }

    @Test
    void expiredToken_shouldReturn401() throws Exception {
        when(jwtDecoder.decode("expired-token"))
            .thenThrow(new JwtException("JWT expired"));

        mockMvc.perform(get("/api/users/1")
                .header("Authorization", "Bearer expired-token"))
            .andExpect(status().isUnauthorized());
    }

    @Test
    void malformedAuthorizationHeader_shouldReturn401() throws Exception {
        mockMvc.perform(get("/api/users/1")
                .header("Authorization", "NotBearer abc"))
            .andExpect(status().isUnauthorized());

        verifyNoInteractions(jwtDecoder);
    }
}
