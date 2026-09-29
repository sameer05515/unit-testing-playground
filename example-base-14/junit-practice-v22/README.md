# JUnit Practice V22

## Downstream Microservice Security

V22 extends the architecture:

```text
                         Keycloak
                            |
                         JWT
                            |
                            v
                    +---------------+
                    | API Gateway    |
                    +-------+-------+
                            |
                            v
                    +---------------+
                    | Order Service  |
                    +-------+-------+
                            |
                    Bearer token
                    propagation
                            |
                            v
                    +---------------+
                    | Inventory     |
                    | Service       |
                    +---------------+
```

## New concepts

### 1. Downstream token propagation

Order Service receives:

```http
Authorization: Bearer <user-jwt>
```

and forwards it to Inventory Service.

This demonstrates the simplest token propagation pattern.

In a production system, whether to propagate the incoming user token or obtain a separate service token depends on the trust boundary and authorization model.

---

### 2. Inventory scope

Inventory Service requires:

```text
SCOPE_inventory:read
```

This demonstrates service-specific scope protection.

---

### 3. WireMock

WireMock is used to simulate Inventory Service responses.

Tests include:

```text
200 success
401 unauthorized
500 server error
Bearer token verification
```

This lets Order Service be tested without actually starting Inventory Service.

---

### 4. Failure scenarios

The test suite demonstrates:

```text
Inventory 200
      |
      +--> success

Inventory 401
      |
      +--> downstream authentication failure

Inventory 500
      |
      +--> downstream server failure
```

---

### 5. Why validate JWT in every service?

Even if Gateway validates the token:

```text
Client
  |
  v
Gateway -- validates JWT
  |
  v
Order Service -- validates JWT
  |
  v
Inventory Service -- validates JWT
```

Each resource service should enforce its own authorization boundary.

Gateway validation is not a substitute for service-level authorization.

---

## Run

From project root:

```bash
mvn clean test
```

Docker Desktop must be running for the Keycloak Testcontainer.

---

## V21 -> V22

V21:

```text
Gateway
User Service
Order Service
Keycloak
```

V22:

```text
Gateway
   |
Order Service
   |
Inventory Service
   |
Keycloak
```

Added:

- downstream token propagation
- service-specific scope
- WireMock
- downstream 401
- downstream 500
- downstream Bearer verification
- Testcontainers Keycloak

---

## Important production distinction

There are two common patterns.

### Pattern A: Token propagation

```text
Client JWT
   |
Gateway
   |
Order Service
   |
same JWT
   |
Inventory Service
```

### Pattern B: Service token

```text
Client JWT
   |
Gateway
   |
Order Service
   |
Client Credentials
   |
Keycloak
   |
service JWT
   |
Inventory Service
```

Pattern B is often preferable when Inventory should authorize the Order Service itself rather than the original end user.

---

## Suggested V23

Build both patterns properly:

```text
                Keycloak
                   |
        +----------+----------+
        |                     |
     User JWT             Service JWT
        |                     |
        v                     v
    Gateway              Order Service
                              |
                 +------------+------------+
                 |                         |
            Token Relay             Client Credentials
                 |                         |
                 v                         v
          Inventory Service        Inventory Service
```

Then test:

- audience validation
- issuer validation
- user token propagation
- client-credentials token
- service identity
- scope mapping
- 401
- 403
- 502
- WireMock
- Testcontainers
- contract tests
