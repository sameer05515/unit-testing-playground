package com.example;

import org.springframework.security.oauth2.jwt.Jwt;

import java.time.Instant;
import java.util.List;
import java.util.Map;

final class KeycloakJwtTestSupport {

    private KeycloakJwtTestSupport() {}

    static Jwt userToken() {
        return base("user-token", "prem")
            .claim("preferred_username", "premendra")
            .claim("email", "prem@example.com")
            .claim("realm_access", Map.of(
                "roles", List.of("USER")
            ))
            .build();
    }

    static Jwt adminToken() {
        return base("admin-token", "admin")
            .claim("preferred_username", "admin")
            .claim("email", "admin@example.com")
            .claim("realm_access", Map.of(
                "roles", List.of("USER", "ADMIN")
            ))
            .build();
    }

    static Jwt reportReaderToken() {
        return base("report-token", "report-user")
            .claim("realm_access", Map.of(
                "roles", List.of("USER")
            ))
            .claim("scope", List.of("openid", "profile", "reports:read"))
            .build();
    }

    static Jwt noRoleToken() {
        return base("norole-token", "guest").build();
    }

    private static Jwt.Builder base(String token, String subject) {
        Instant now = Instant.now();

        return Jwt.withTokenValue(token)
            .header("alg", "RS256")
            .issuer("http://localhost:8080/realms/demo")
            .subject(subject)
            .audience(List.of("todo-api"))
            .issuedAt(now.minusSeconds(10))
            .expiresAt(now.plusSeconds(300));
    }
}
