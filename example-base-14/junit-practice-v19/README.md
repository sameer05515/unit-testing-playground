# JUnit Practice V19

## Real Keycloak + Testcontainers

V19 is the first version in this series that performs an end-to-end authentication test against a real Keycloak server.

No mocked `JwtDecoder` is used by the integration tests.

Architecture:

```text
JUnit Test
   |
   | password grant
   v
Keycloak Testcontainer
   |
   | real signed JWT
   v
TestRestTemplate
   |
   | Authorization: Bearer <JWT>
   v
Spring Boot Resource Server
   |
   | issuer/JWK validation
   v
Keycloak public keys
   |
   v
SecurityConfig
   |
   +-- USER
   +-- ADMIN
   +-- SCOPE_*
```

## What is created inside Keycloak

Realm:

```text
junit-demo
```

Client:

```text
junit-api
```

Realm roles:

```text
USER
ADMIN
```

Users:

```text
prem / prem123
admin / admin123
report / report123
```

## Important tests

### Anonymous

```text
GET /api/users/1
-> 401
```

### USER

```text
prem
USER
```

Can access:

```text
/api/users/**
```

Cannot access:

```text
/api/admin/**
```

Expected:

```text
403
```

### ADMIN

```text
admin
USER + ADMIN
```

Can access:

```text
/api/admin/dashboard
/api/admin/users/{id}
```

### JWT validation

The application receives a real Keycloak JWT and validates it through:

```properties
spring.security.oauth2.resourceserver.jwt.issuer-uri
```

Spring Security discovers Keycloak's OIDC metadata and JWK endpoint.

## Run

Docker Desktop must be running.

Then:

```bash
mvn clean test
```

Testcontainers starts:

```text
quay.io/keycloak/keycloak:26.3.4
```

No manually started Keycloak is required.

## Important

V19 uses Testcontainers, so Docker detection must work from Maven/JUnit.

If you see:

```text
Could not find a valid Docker environment
```

then Docker is running but Testcontainers cannot connect to the Docker daemon from the Maven/JUnit process.

## Learning progression

V15
Spring MVC / MockMvc

V16
Spring Security + @WithMockUser

V17
JWT Resource Server testing

V18
Keycloak-style JWT claims + mocked decoder

V19
Real Keycloak + real signed JWT + Testcontainers + TestRestTemplate

Suggested V20:

Real Keycloak + OAuth2 authorization-code flow,
client credentials,
service-to-service authentication,
audience validation,
scope-based authorization,
and multiple microservices.
