# JUnit Practice V21

## Multi-service security testing

V21 moves from a single Spring Boot API to a small microservice-style project.

Modules:

```text
junit-practice-v21
|
+-- gateway
|
+-- user-service
|
+-- order-service
```

The gateway, user service and order service are separate Spring Boot applications.

---

## Security architecture

```text
                    +----------------+
                    |    Keycloak    |
                    |    v21-demo    |
                    +-------+--------+
                            |
                         JWT
                            |
                            v
                    +---------------+
                    |  API Gateway  |
                    +-------+-------+
                            |
               +------------+------------+
               |                         |
               v                         v
       +---------------+         +---------------+
       | User Service  |         | Order Service |
       +---------------+         +---------------+
```

---

## V21 concepts

### 1. Multiple resource servers

Each service can independently validate a JWT.

```text
Gateway       -> validates JWT
User Service  -> validates JWT
Order Service -> validates JWT
```

This is important in a real microservice architecture.

---

### 2. Role authorization

Keycloak realm roles:

```text
USER
ADMIN
```

Mapped to:

```text
ROLE_USER
ROLE_ADMIN
```

Gateway:

```java
.hasRole("ADMIN")
```

---

### 3. Scope authorization

Order Service requires:

```text
SCOPE_orders:read
```

This demonstrates the difference between:

```text
Role
-----
ROLE_ADMIN

Scope
-----
SCOPE_orders:read
```

---

### 4. 401 vs 403

```text
No JWT
   |
   +--> 401

Invalid JWT
   |
   +--> 401

Valid USER JWT
   |
   +--> ADMIN endpoint
          |
          +--> 403

Valid ADMIN JWT
   |
   +--> ADMIN endpoint
          |
          +--> 200
```

---

### 5. MockMvc testing

`GatewaySecurityTest` demonstrates fast security tests:

```java
mockMvc.perform(
    get("/gateway/admin/dashboard")
        .with(jwt().authorities(
            new SimpleGrantedAuthority("ROLE_ADMIN")
        ))
)
.andExpect(status().isOk());
```

No real Keycloak is needed for these unit-style MVC tests.

---

### 6. Real Keycloak end-to-end test

`E2EKeycloakTest` starts:

```text
Keycloak Testcontainer
```

Then:

```text
1. Authenticate real user
2. Obtain real JWT
3. Send Bearer token
4. Gateway validates JWT
5. Verify 200 / 401 / 403
```

---

## Run

Docker Desktop must be running.

From project root:

```bash
mvn clean test
```

Or build individual services:

```bash
mvn -pl gateway clean package
mvn -pl user-service clean package
mvn -pl order-service clean package
```

---

## Important production architecture

In a real system:

```text
                   Keycloak
                      |
                 Access Token
                      |
                      v
               +-------------+
               | API Gateway |
               +------+------+
                      |
          +-----------+-----------+
          |                       |
          v                       v
   User Service            Order Service
          |                       |
       validate                 validate
          |                       |
       JWT locally            JWT locally
```

The gateway should not be the only place where JWT validation happens.

Each resource service should protect itself because a service may be reachable through another internal path.

---

## V20 -> V21

V20:

```text
Single API
+
Keycloak
+
Password Grant
+
Client Credentials
```

V21:

```text
Multiple services
+
Gateway
+
Keycloak
+
JWT
+
Roles
+
Scopes
+
MockMvc
+
Real Keycloak
+
Testcontainers
+
End-to-end security tests
```

Suggested V22:

```text
API Gateway
     |
     +--> User Service
     |
     +--> Order Service
                |
                +--> Inventory Service
```

with:

- service-to-service Client Credentials
- downstream JWT propagation
- token relay
- audience validation
- WireMock
- Testcontainers
- failure handling
- 401/403/502 tests
- circuit-breaker security scenarios
