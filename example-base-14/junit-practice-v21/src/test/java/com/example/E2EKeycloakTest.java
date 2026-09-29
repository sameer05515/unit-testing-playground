package com.example;

import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.KeycloakContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.net.URI;
import java.net.http.*;
import java.nio.charset.StandardCharsets;

import static org.junit.jupiter.api.Assertions.*;

@Testcontainers
@SpringBootTest(
    classes = com.example.gateway.GatewayApplication.class,
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
class E2EKeycloakTest {

    @Container
    static final KeycloakContainer KEYCLOAK =
        new KeycloakContainer("quay.io/keycloak/keycloak:26.3.4")
            .withRealmImportFile("keycloak/v21-realm.json");

    @LocalServerPort
    int port;

    @DynamicPropertySource
    static void properties(DynamicPropertyRegistry registry) {
        registry.add(
            "spring.security.oauth2.resourceserver.jwt.issuer-uri",
            () -> KEYCLOAK.getAuthServerUrl() + "/realms/v21-demo"
        );
    }

    private String token(String user, String password)
        throws Exception {

        String form =
            "grant_type=password"
            + "&client_id=v21-ui"
            + "&username=" + enc(user)
            + "&password=" + enc(password);

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(
                KEYCLOAK.getAuthServerUrl()
                + "/realms/v21-demo"
                + "/protocol/openid-connect/token"))
            .header(
                "Content-Type",
                "application/x-www-form-urlencoded")
            .POST(HttpRequest.BodyPublishers.ofString(form))
            .build();

        HttpResponse<String> response =
            HttpClient.newHttpClient().send(
                request,
                HttpResponse.BodyHandlers.ofString());

        assertEquals(200, response.statusCode());

        String body = response.body();
        int start = body.indexOf("\"access_token\":\"")
            + "\"access_token\":\"".length();
        int end = body.indexOf("\"", start);

        return body.substring(start, end);
    }

    private String enc(String value) {
        return java.net.URLEncoder.encode(
            value, StandardCharsets.UTF_8);
    }

    @Test
    void realKeycloak_userToken_shouldAuthenticateGateway()
        throws Exception {

        String jwt = token("prem", "prem123");

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(jwt);

        TestRestTemplate client = new TestRestTemplate();

        ResponseEntity<String> response =
            client.exchange(
                "http://localhost:" + port + "/gateway/users/1",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                String.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void realKeycloak_userToken_shouldNotAccessAdmin()
        throws Exception {

        String jwt = token("prem", "prem123");

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(jwt);

        ResponseEntity<String> response =
            new TestRestTemplate().exchange(
                "http://localhost:" + port + "/gateway/admin/dashboard",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                String.class);

        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
    }

    @Test
    void realKeycloak_adminToken_shouldAccessAdmin()
        throws Exception {

        String jwt = token("admin", "admin123");

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(jwt);

        ResponseEntity<String> response =
            new TestRestTemplate().exchange(
                "http://localhost:" + port + "/gateway/admin/dashboard",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                String.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("gateway-admin", response.getBody());
    }

    @Test
    void anonymous_shouldReturn401() {

        ResponseEntity<String> response =
            new TestRestTemplate().getForEntity(
                "http://localhost:" + port + "/gateway/users/1",
                String.class);

        assertEquals(
            HttpStatus.UNAUTHORIZED,
            response.getStatusCode());
    }
}
