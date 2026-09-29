package com.example;

import org.junit.jupiter.api.BeforeAll;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.KeycloakContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public abstract class KeycloakV20TestBase {

    @Container
    static final KeycloakContainer KEYCLOAK =
        new KeycloakContainer("quay.io/keycloak/keycloak:26.3.4")
            .withRealmImportFile("keycloak/test-realm.json");

    @LocalServerPort
    protected int port;

    @DynamicPropertySource
    static void securityProperties(DynamicPropertyRegistry registry) {
        registry.add(
            "spring.security.oauth2.resourceserver.jwt.issuer-uri",
            () -> KEYCLOAK.getAuthServerUrl()
                + "/realms/microservices-demo"
        );
    }

    protected String apiUrl(String path) {
        return "http://localhost:" + port + path;
    }

    @BeforeAll
    static void checkKeycloak() {
        if (!KEYCLOAK.isRunning()) {
            throw new IllegalStateException("Keycloak is not running");
        }
    }
}
