# JUnit Practice V17

## Focus

V17 moves from `@WithMockUser` testing to actual Spring Security JWT Resource Server testing.

### New topics

- `spring-boot-starter-oauth2-resource-server`
- `spring-security-test`
- `jwt()` MockMvc request post-processor
- JWT subject
- JWT custom claims
- `ROLE_USER`
- `ROLE_ADMIN`
- custom JWT `roles` claim
- `JwtDecoder`
- mocked JWT decoding
- valid bearer token
- invalid bearer token
- expired bearer token
- HTTP 401
- HTTP 403
- `@PreAuthorize`
- stateless JWT security
- `JwtAuthenticationConverter`

## Important distinction

There are two JWT testing styles in this project.

### 1. Spring Security Test JWT

```java
mockMvc.perform(
    get("/api/users/1")
        .with(jwt())
)
.andExpect(status().isOk());
```

This creates a JWT-authenticated SecurityContext directly for the test.

It does NOT require generating a real signed JWT.

### 2. Bearer token + mocked JwtDecoder

```java
when(jwtDecoder.decode("valid-token")).thenReturn(jwt);

mockMvc.perform(
    get("/api/users/1")
        .header("Authorization", "Bearer valid-token")
)
.andExpect(status().isOk());
```

This exercises the Bearer Token filter and the `JwtDecoder` interaction without requiring a real authorization server.

## Run

```bash
mvn clean test
```

No Docker is required for V17.

## Real production setup

In production, `JwtDecoder` should normally validate the token signature and claims using an issuer/JWK endpoint, for example Keycloak.

The demo `JwtDecoder` deliberately rejects tokens. Tests replace it with a Mockito mock.

## Test progression

V15:
Spring MVC / MockMvc

V16:
Spring Security + `@WithMockUser`

V17:
JWT Resource Server + JWT MockMvc testing

Suggested next:

V18 - Keycloak/OAuth2 integration testing with mocked issuer/JWK,
role mapping, scopes, audience/issuer validation and full authentication flow.
