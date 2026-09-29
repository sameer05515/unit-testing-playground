package com.example;

import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.KeycloakContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
public abstract class KeycloakV22TestBase {

    @Container
    static final KeycloakContainer KEYCLOAK =
        new KeycloakContainer("quay.io/keycloak/keycloak:26.3.4")
            .withRealmImportFile("keycloak/v22-realm.json");

    @LocalServerPort
    protected int port;

    @DynamicPropertySource
    static void keycloak(DynamicPropertyRegistry registry) {
        registry.add(
            "spring.security.oauth2.resourceserver.jwt.issuer-uri",
            () -> KEYCLOAK.getAuthServerUrl()
                + "/realms/v22-demo"
        );
    }
}
