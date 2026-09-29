# JUnit Practice V20

## OAuth2 + Keycloak + Microservice Security

V20 builds on V19 and introduces two important OAuth2 flows:

1. Resource Owner Password flow for a test user
2. Client Credentials flow for service-to-service authentication

The project uses a real Keycloak Testcontainer and real signed JWTs.

---

## Architecture

```text
                         +-------------------+
                         |     Keycloak      |
                         | microservices-demo|
                         +---------+---------+
                                   |
                    +--------------+--------------+
                    |                             |
             Password Grant              Client Credentials
                    |                             |
                 USER JWT                    SERVICE JWT
                    |                             |
                    +--------------+--------------+
                                   |
                                   v
                         +-------------------+
                         | Spring Boot API   |
                         | Resource Server   |
                         +-------------------+
                                   |
                  +----------------+----------------+
                  |                |                |
               USER API         ADMIN API       SERVICE API
```

---

## Keycloak

Realm:

```text
microservices-demo
```

User client:

```text
todo-api
```

Service client:

```text
order-service
```

Service secret:

```text
order-secret
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
```

---

# 1. Password Grant

The test obtains a real Keycloak access token:

```java
String token =
    tokens.passwordGrant("prem", "prem123");
```

Then:

```http
Authorization: Bearer <real-jwt>
```

The Spring Boot application validates the JWT using Keycloak's issuer/JWK configuration.

---

# 2. Client Credentials

The service authenticates without a human user:

```java
String token =
    tokens.clientCredentials(
        "order-service",
        "order-secret"
    );
```

This represents:

```text
Order Service
      |
      | client_id + client_secret
      v
    Keycloak
      |
      | access token
      v
Todo API
```

This is the normal OAuth2 pattern for service-to-service communication.

---

# 3. Roles vs scopes

## Realm roles

Keycloak:

```json
"realm_access": {
  "roles": [
    "USER",
    "ADMIN"
  ]
}
```

Mapped to Spring:

```text
ROLE_USER
ROLE_ADMIN
```

Then:

```java
.hasRole("ADMIN")
```

works.

---

## Scopes

OAuth2 scope:

```text
orders:read
```

becomes:

```text
SCOPE_orders:read
```

and can be checked with:

```java
.hasAuthority("SCOPE_orders:read")
```

---

# 4. 401 vs 403

## 401 Unauthorized

Authentication is missing or invalid.

Examples:

```text
No Authorization header
Invalid JWT
Invalid token
```

## 403 Forbidden

JWT is valid, but the authenticated identity does not have the required authority.

Example:

```text
USER -> /api/admin/dashboard
```

Expected:

```text
403
```

---

# 5. Important microservice concept

You do NOT need to duplicate token generation in every microservice.

Normally:

```text
                Keycloak
                   |
            issues access token
                   |
          +--------+--------+
          |        |        |
       Service A Service B Service C
          |        |        |
          +--------+--------+
             validate JWT
```

Each resource service generally validates the access token because each service must protect its own resources.

The validation code/configuration can be standardized and reused through a shared security library or common Spring Boot starter.

---

# Run

Docker Desktop must be running.

```bash
mvn clean test
```

Testcontainers starts:

```text
quay.io/keycloak/keycloak:26.3.4
```

No manually started Keycloak is required.

---

# Test coverage

V20 tests:

- real Keycloak password grant
- real user access token
- USER authorization
- ADMIN authorization
- real client credentials flow
- service-to-service token
- anonymous -> 401
- USER -> admin API -> 403
- service token -> authenticated API
- service token -> admin API -> 403
- invalid client secret
- real JWT authentication details
- Keycloak realm roles
- Spring Security role mapping
- issuer/JWK validation

---

# Version progression

V15
Spring MVC testing

V16
Spring Security + @WithMockUser

V17
JWT Resource Server testing

V18
Keycloak JWT claims + mocked decoder

V19
Real Keycloak + Testcontainers + real JWT

V20
OAuth2 Password Grant + Client Credentials + service-to-service security

Suggested V21:

Multiple independent Spring Boot microservices with:
- API Gateway
- Keycloak
- user JWT
- service JWT
- audience validation
- scopes
- role mapping
- downstream service calls
- WireMock
- Testcontainers
- end-to-end security tests
