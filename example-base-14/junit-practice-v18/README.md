# JUnit Practice V18

## Theme

V18 = Keycloak-style JWT / OAuth2 Resource Server testing.

V17 tested generic JWTs.

V18 adds the JWT structure commonly produced by Keycloak:

```json
{
  "iss": "http://localhost:8080/realms/demo",
  "sub": "123456",
  "aud": ["todo-api"],
  "preferred_username": "premendra",
  "email": "prem@example.com",
  "realm_access": {
    "roles": ["USER", "ADMIN"]
  },
  "scope": ["openid", "profile", "reports:read"]
}
```

## What is tested

### Authentication

- no token -> 401
- valid bearer token -> 200
- invalid token -> 401
- expired token -> 401
- malformed Authorization header -> 401

### Keycloak roles

Keycloak:

```json
"realm_access": {
  "roles": ["USER", "ADMIN"]
}
```

Application mapping:

```text
USER  -> ROLE_USER
ADMIN -> ROLE_ADMIN
```

Then Spring Security can use:

```java
.hasRole("ADMIN")
```

or:

```java
@PreAuthorize("hasRole('ADMIN')")
```

### OAuth2 scopes

JWT:

```json
"scope": ["reports:read"]
```

Application authority:

```text
SCOPE_reports:read
```

Endpoint:

```java
.requestMatchers("/api/reports/**")
.hasAuthority("SCOPE_reports:read")
```

## Two important testing approaches

### A. `with(jwt())`

Fast controller/security testing:

```java
mockMvc.perform(
    get("/api/admin/dashboard")
        .with(jwt().authorities(
            new SimpleGrantedAuthority("ROLE_ADMIN")
        ))
)
.andExpect(status().isOk());
```

This does not execute JWT decoding.

### B. Real Bearer header + mocked JwtDecoder

More complete resource-server testing:

```java
when(jwtDecoder.decode("admin-token"))
    .thenReturn(adminJwt);

mockMvc.perform(
    get("/api/admin/dashboard")
        .header("Authorization", "Bearer admin-token")
)
.andExpect(status().isOk());
```

This exercises the Bearer Token authentication filter and `JwtDecoder`.

## Production Keycloak configuration

Normally you would configure something like:

```properties
spring.security.oauth2.resourceserver.jwt.issuer-uri=http://localhost:8080/realms/demo
```

Then Spring Security can discover Keycloak's OIDC metadata and JWK endpoint.

For this learning project, the decoder is intentionally a demo bean and tests replace it with Mockito.

## Run

```bash
mvn clean test
```

No Docker and no running Keycloak server are required for the tests.

## Learning progression

V15
Spring MVC / MockMvc

V16
Spring Security + @WithMockUser

V17
JWT Resource Server + JWT testing

V18
Keycloak-style JWT claims + roles + scopes + Bearer authentication

Suggested V19:
Full Spring Boot integration tests against a real Keycloak container using Testcontainers:
- start Keycloak
- create realm
- create client
- create users
- assign realm roles
- obtain real access token
- call API with TestRestTemplate
- verify 200/401/403
- verify actual JWT signature/issuer/audience
