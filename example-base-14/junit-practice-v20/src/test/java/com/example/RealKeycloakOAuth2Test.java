package com.example;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import static org.junit.jupiter.api.Assertions.*;

class RealKeycloakOAuth2Test extends KeycloakV20TestBase {

    @Autowired
    TestRestTemplate restTemplate;

    private OAuth2TokenClient tokens;

    @BeforeEach
    void setup() {
        tokens = new OAuth2TokenClient(
            KEYCLOAK.getAuthServerUrl()
        );
    }

    private HttpHeaders bearer(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        return headers;
    }

    @Test
    void passwordGrant_userShouldAccessProtectedApi()
        throws Exception {

        String token =
            tokens.passwordGrant("prem", "prem123");

        ResponseEntity<String> response =
            restTemplate.exchange(
                apiUrl("/api/users/10"),
                HttpMethod.GET,
                new HttpEntity<>(bearer(token)),
                String.class
            );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("user-10", response.getBody());
    }

    @Test
    void passwordGrant_userShouldNotAccessAdmin()
        throws Exception {

        String token =
            tokens.passwordGrant("prem", "prem123");

        ResponseEntity<String> response =
            restTemplate.exchange(
                apiUrl("/api/admin/dashboard"),
                HttpMethod.GET,
                new HttpEntity<>(bearer(token)),
                String.class
            );

        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
    }

    @Test
    void passwordGrant_adminShouldAccessAdmin()
        throws Exception {

        String token =
            tokens.passwordGrant("admin", "admin123");

        ResponseEntity<String> response =
            restTemplate.exchange(
                apiUrl("/api/admin/dashboard"),
                HttpMethod.GET,
                new HttpEntity<>(bearer(token)),
                String.class
            );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(
            "admin-dashboard",
            response.getBody()
        );
    }

    @Test
    void clientCredentials_shouldObtainServiceToken()
        throws Exception {

        String token =
            tokens.clientCredentials(
                "order-service",
                "order-secret"
            );

        assertNotNull(token);
        assertFalse(token.isBlank());
    }

    @Test
    void clientCredentials_tokenCanAuthenticate()
        throws Exception {

        String token =
            tokens.clientCredentials(
                "order-service",
                "order-secret"
            );

        ResponseEntity<String> response =
            restTemplate.exchange(
                apiUrl("/api/users/1"),
                HttpMethod.GET,
                new HttpEntity<>(bearer(token)),
                String.class
            );

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void anonymousRequest_shouldReturn401() {
        ResponseEntity<String> response =
            restTemplate.getForEntity(
                apiUrl("/api/users/1"),
                String.class
            );

        assertEquals(
            HttpStatus.UNAUTHORIZED,
            response.getStatusCode()
        );
    }

    @Test
    void serviceToken_shouldNotAutomaticallyBecomeAdmin()
        throws Exception {

        String token =
            tokens.clientCredentials(
                "order-service",
                "order-secret"
            );

        ResponseEntity<String> response =
            restTemplate.exchange(
                apiUrl("/api/admin/dashboard"),
                HttpMethod.GET,
                new HttpEntity<>(bearer(token)),
                String.class
            );

        assertEquals(
            HttpStatus.FORBIDDEN,
            response.getStatusCode()
        );
    }

    @Test
    void invalidClientCredentials_shouldFailTokenRequest() {

        Exception exception = assertThrows(
            Exception.class,
            () -> tokens.clientCredentials(
                "order-service",
                "wrong-secret"
            )
        );

        assertTrue(
            exception.getMessage().contains(
                "Token endpoint failed"
            )
        );
    }

    @Test
    void realJwt_shouldExposeAuthenticationDetails()
        throws Exception {

        String token =
            tokens.passwordGrant("admin", "admin123");

        ResponseEntity<String> response =
            restTemplate.exchange(
                apiUrl("/api/me"),
                HttpMethod.GET,
                new HttpEntity<>(bearer(token)),
                String.class
            );

        assertEquals(HttpStatus.OK, response.getStatusCode());

        String body = response.getBody();

        assertNotNull(body);
        assertTrue(body.contains("\"username\":\"admin\""));
        assertTrue(body.contains("ROLE_ADMIN"));
        assertTrue(body.contains("ROLE_USER"));
    }
}
