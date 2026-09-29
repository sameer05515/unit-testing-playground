# JUnit Practice V23

## Token Relay vs Client Credentials

V23 focuses on one of the most important OAuth2 microservice design decisions.

There are two different downstream authentication patterns.

---

# Pattern A - Token Relay

```text
User
 |
 | User JWT
 v
Gateway
 |
 | same User JWT
 v
Order Service
 |
 | same User JWT
 v
Inventory Service
```

Order Service forwards:

```http
Authorization: Bearer <user-jwt>
```

Inventory Service validates the user's identity and authorization.

This is useful when Inventory needs to make an authorization decision based on the end user.

Example:

```text
Prem -> Order Service -> Inventory
```

Inventory can still know that the original caller is Prem.

---

# Pattern B - Client Credentials

```text
User
 |
 | User JWT
 v
Gateway
 |
 v
Order Service
 |
 | client_id + client_secret
 v
Keycloak
 |
 | Order Service JWT
 v
Order Service
 |
 | Service JWT
 v
Inventory Service
```

Inventory sees the calling service rather than relying on the original user's token.

Example:

```text
Order Service
      |
      | service identity
      v
Inventory Service
```

---

# Why use Client Credentials?

Suppose:

```text
Order Service
```

needs to call:

```text
Inventory Service
```

as a trusted backend operation.

The Inventory Service may not need to know:

```text
which user clicked the button
```

It only needs to know:

```text
Is this request coming from Order Service?
```

That is a natural use case for Client Credentials.

---

# Scopes

V23 uses two scopes.

User token:

```text
inventory:read
```

mapped to:

```text
SCOPE_inventory:read
```

Service token:

```text
inventory:service
```

mapped to:

```text
SCOPE_inventory:service
```

Inventory authorization:

```java
.requestMatchers("/inventory/relay/**")
    .hasAuthority("SCOPE_inventory:read")

.requestMatchers("/inventory/service/**")
    .hasAuthority("SCOPE_inventory:service")
```

---

# Audience validation

A production JWT should normally contain an intended audience:

```json
{
  "aud": ["inventory-service"]
}
```

Inventory Service can then validate:

```text
issuer
signature
expiration
audience
scope
```

This prevents a token intended for another API from automatically being accepted by Inventory.

The V23 project focuses primarily on the relay/service-token distinction and scope boundaries; audience validation is called out in the README for the next hardening step.

---

# 401 vs 403

```text
No JWT
  |
  +--> 401

Invalid JWT
  |
  +--> 401

Valid JWT
but missing required scope
  |
  +--> 403
```

---

# Testing strategy

## Unit/MVC security tests

Inventory:

```text
InventorySecurityTest
```

Tests:

- valid user scope
- missing user scope
- valid service scope
- wrong service scope
- no JWT

## WireMock tests

Order Service:

```text
TokenRelayWireMockTest
ClientCredentialsWireMockTest
```

Tests:

- Bearer token propagation
- service token propagation
- missing token
- missing service scope contract

---

# Important production point

Do not blindly relay every incoming JWT.

Choose based on the authorization requirement.

### Use token relay when:

```text
Downstream needs end-user identity
```

### Use client credentials when:

```text
Downstream only needs calling-service identity
```

### Sometimes both are needed

For example:

```text
User JWT
   |
Gateway
   |
Order Service
   |
   +-- user identity for business authorization
   |
   +-- service JWT for Inventory
```

The Order Service can make the distinction explicit.

---

# Version progression

V20:

```text
Keycloak
+
Password Grant
+
Client Credentials
+
Microservices
```

V21:

```text
Gateway
+
User Service
+
Order Service
+
Keycloak
```

V22:

```text
Gateway
+
Order Service
+
Inventory Service
+
Token propagation
+
WireMock
```

V23:

```text
Token Relay
+
Client Credentials
+
Service-specific scopes
+
Security boundary tests
```

Suggested V24:

```text
Real Keycloak
+
real Client Credentials token
+
real Token Relay
+
audience validation
+
issuer validation
+
scope validation
+
Gateway
+
Order Service
+
Inventory Service
+
real end-to-end tests
```
