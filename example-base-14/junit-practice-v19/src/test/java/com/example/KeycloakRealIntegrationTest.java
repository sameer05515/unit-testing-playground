package com.example;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import static org.junit.jupiter.api.Assertions.*;

class KeycloakRealIntegrationTest extends KeycloakContainerTestBase {

    @Autowired
    TestRestTemplate restTemplate;

    private KeycloakTokenClient tokenClient;

    @BeforeEach
    void setupTokenClient() {
        tokenClient =
            new KeycloakTokenClient(KEYCLOAK.getAuthServerUrl());
    }

    private HttpHeaders bearerHeaders(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        return headers;
    }

    @Test
    void publicEndpoint_shouldWorkWithoutToken() {
        ResponseEntity<String> response =
            restTemplate.getForEntity(
                apiUrl("/api/public/hello"),
                String.class
            );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("public-hello", response.getBody());
    }

    @Test
    void userToken_shouldAccessUserApi() throws Exception {
        String token =
            tokenClient.passwordToken("prem", "prem123");

        ResponseEntity<String> response =
            restTemplate.exchange(
                apiUrl("/api/users/1"),
                HttpMethod.GET,
                new HttpEntity<>(bearerHeaders(token)),
                String.class
            );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("user-1", response.getBody());
    }

    @Test
    void anonymousUser_shouldGet401() {
        ResponseEntity<String> response =
            restTemplate.getForEntity(
                apiUrl("/api/users/1"),
                String.class
            );

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    @Test
    void normalUser_shouldGet403OnAdminApi() throws Exception {
        String token =
            tokenClient.passwordToken("prem", "prem123");

        ResponseEntity<String> response =
            restTemplate.exchange(
                apiUrl("/api/admin/dashboard"),
                HttpMethod.GET,
                new HttpEntity<>(bearerHeaders(token)),
                String.class
            );

        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
    }

    @Test
    void adminUser_shouldAccessAdminApi() throws Exception {
        String token =
            tokenClient.passwordToken("admin", "admin123");

        ResponseEntity<String> response =
            restTemplate.exchange(
                apiUrl("/api/admin/dashboard"),
                HttpMethod.GET,
                new HttpEntity<>(bearerHeaders(token)),
                String.class
            );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("admin-dashboard", response.getBody());
    }

    @Test
    void adminUser_shouldPassPreAuthorize() throws Exception {
        String token =
            tokenClient.passwordToken("admin", "admin123");

        ResponseEntity<String> response =
            restTemplate.exchange(
                apiUrl("/api/admin/users/25"),
                HttpMethod.DELETE,
                new HttpEntity<>(bearerHeaders(token)),
                String.class
            );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("admin-deleted-25", response.getBody());
    }

    @Test
    void meEndpoint_shouldExposeKeycloakUsernameAndRoles() throws Exception {
        String token =
            tokenClient.passwordToken("admin", "admin123");

        ResponseEntity<String> response =
            restTemplate.exchange(
                apiUrl("/api/me"),
                HttpMethod.GET,
                new HttpEntity<>(bearerHeaders(token)),
                String.class
            );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        assertTrue(response.getBody().contains("\"username\":\"admin\""));
        assertTrue(response.getBody().contains("ROLE_ADMIN"));
        assertTrue(response.getBody().contains("ROLE_USER"));
    }

    @Test
    void invalidToken_shouldGet401() {
        ResponseEntity<String> response =
            restTemplate.exchange(
                apiUrl("/api/users/1"),
                HttpMethod.GET,
                new HttpEntity<>(bearerHeaders("not-a-real-jwt")),
                String.class
            );

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }
}
