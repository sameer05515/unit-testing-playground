# JUnit Practice – V1 to V23

A progressive hands-on learning project covering **JUnit 5, Mockito, Spring Boot testing, Spring Security, JWT, Keycloak, Testcontainers, WireMock, OAuth2, Token Relay, Client Credentials, and Microservice Integration Testing**.

## Learning Roadmap

| Version | Main Topic | Key Concepts |
|---|---|---|
| V1 | JUnit 5 Basics | `@Test`, `assertEquals`, `assertThrows` |
| V2 | Test Lifecycle | `@BeforeAll`, `@AfterAll`, `@BeforeEach`, `@AfterEach` |
| V3 | Assertions | `assertAll`, null checks, boolean checks, exceptions |
| V4 | Parameterized Tests | `@ValueSource`, `@CsvSource`, `@MethodSource` |
| V5 | Mockito Basics | `mock`, `when`, `verify`, `@Mock`, `@InjectMocks` |
| V6 | Advanced Mockito | `ArgumentCaptor`, `times`, `never`, `doReturn`, `doThrow` |
| V7 | Spring Boot Testing | `@SpringBootTest`, `@WebMvcTest`, MockMvc, repository testing |
| V8 | Integration Testing | Random port, `TestRestTemplate`, real application flow |
| V9 | JPA + H2 | `@DataJpaTest`, JPA repository testing, transactions |
| V10 | Testcontainers MySQL | Real MySQL database in Docker |
| V11 | SQL Test Data | `@Sql`, `@SqlConfig`, database setup/cleanup |
| V12 | REST Integration Testing | REST API, validation, HTTP error handling |
| V13 | Advanced JUnit 5 | Nested tests, dynamic tests, repeated tests, tags, assumptions |
| V14 | Advanced Mockito | Spy, InOrder, Answer, strict stubbing, captors |
| V15 | Spring MVC Testing | MockMvc, JSON assertions, validation, controller advice |
| V16 | Spring Security Testing | Roles, authentication, authorization, `@WithMockUser` |
| V17 | JWT Resource Server Testing | JWT authentication, `JwtDecoder`, bearer tokens |
| V18 | Keycloak JWT Testing | Keycloak claims, roles, scopes, JWT mapping |
| V19 | Real Keycloak Integration | Keycloak Testcontainer, real JWT validation |
| V20 | OAuth2 Grant Types | Password grant, Client Credentials |
| V21 | Multi-Module Microservices | Gateway, User Service, Order Service |
| V22 | Downstream Service Security | Token propagation, WireMock, service-to-service calls |
| V23 | Token Relay vs Client Credentials | User token relay, service tokens, scopes |

---

# V1 – JUnit 5 Basics

**Project:** `junit-practice`

Introduction to JUnit 5 and basic unit tests.

### Concepts
- `@Test`
- `assertEquals()`
- `assertThrows()`
- Arrange → Act → Assert
- Maven test execution

```java
@Test
void shouldAddTwoNumbers() {
    Calculator calculator = new Calculator();
    int result = calculator.add(10, 20);
    assertEquals(30, result);
}
```

Run:
```bash
mvn test
```

# V2 – JUnit Test Lifecycle

**Project:** `junit-practice-v2`

### Concepts
- `@BeforeAll`
- `@AfterAll`
- `@BeforeEach`
- `@AfterEach`
- Test setup and cleanup
- Shared vs per-test initialization

# V3 – Assertions

**Project:** `junit-practice-v3`

### Concepts
- `assertEquals`
- `assertNotEquals`
- `assertTrue`
- `assertFalse`
- `assertNull`
- `assertNotNull`
- `assertThrows`
- `assertAll`

# V4 – Parameterized Tests

**Project:** `junit-practice-v4`

Run the same test with multiple inputs.

### Concepts
- `@ParameterizedTest`
- `@ValueSource`
- `@CsvSource`
- `@MethodSource`

# V5 – Mockito Basics

**Project:** `junit-practice-v5`

Service/repository testing using Mockito.

```text
UserService
     |
     v
UserRepository
```

### Concepts
- `mock()`
- `when()` / `thenReturn()`
- `verify()`
- `never()`
- `@Mock`
- `@InjectMocks`
- `MockitoExtension`

# V6 – Advanced Mockito

**Project:** `junit-practice-v6`

### Concepts
- `ArgumentCaptor`
- `times()`
- `never()`
- `any()`
- `doReturn()`
- `doThrow()`
- `verifyNoMoreInteractions()`
- Void method testing

# V7 – Spring Boot Testing

**Project:** `junit-practice-v7`

### Concepts
- `@SpringBootTest`
- `@WebMvcTest`
- MockMvc
- Mockito in Spring tests
- Controller testing
- Service testing
- Repository testing

```text
Controller
    ↓
Service
    ↓
Repository
```

# V8 – Spring Boot Integration Testing

**Project:** `junit-practice-v8`

### Concepts
- `@SpringBootTest`
- `webEnvironment = RANDOM_PORT`
- `TestRestTemplate`
- Real controller/service/repository flow
- HTTP integration testing

# V9 – JPA + H2 Testing

**Project:** `junit-practice-v9`

### Concepts
- `@DataJpaTest`
- H2
- JPA repository
- Entity testing
- Transaction rollback
- Repository queries

# V10 – Testcontainers + MySQL

**Project:** `junit-practice-v10`

Replaces an in-memory database with a real MySQL database running in Docker.

```text
JUnit Test
    ↓
Testcontainers
    ↓
Docker
    ↓
MySQL
```

**Requirement:** Docker Desktop must be running.

# V11 – SQL Test Data

**Project:** `junit-practice-v11`

### Concepts
- `@Sql`
- `@SqlConfig`
- Test data setup
- Database cleanup
- Transaction rollback
- Reusable Testcontainers configuration

# V12 – REST Integration Testing

**Project:** `junit-practice-v12`

### Concepts
- `TestRestTemplate`
- HTTP status codes
- Request/response validation
- Bean validation
- `@RestControllerAdvice`
- 400 Bad Request
- 404 Not Found
- 409 Conflict
- 201 Created
- 204 No Content

# V13 – Advanced JUnit 5

**Project:** `junit-practice-v13`

### Concepts
- `@Nested`
- `@DisplayName`
- `@RepeatedTest`
- `RepetitionInfo`
- `@TestFactory`
- Dynamic tests
- `@Tag` / `@Disabled`
- `@EnabledOnOs` / `@EnabledOnJre`
- Assumptions
- `@Timeout`
- `assertTimeout`
- `assertTimeoutPreemptively`
- Method ordering
- `@NullSource` / `@EmptySource` / `@EnumSource`

# V14 – Advanced Mockito

**Project:** `junit-practice-v14`

### Concepts
- `InOrder`
- `thenAnswer`
- `doAnswer`
- Spy
- Strict stubbing
- `reset()`
- `ArgumentCaptor`
- Interaction verification

# V15 – Spring MVC Testing

**Project:** `junit-practice-v15`

Focused controller testing with MockMvc.

### Concepts
- `@WebMvcTest`
- MockMvc
- `@MockBean`
- JSON assertions
- `jsonPath`
- Validation
- `@RestControllerAdvice`
- `ArgumentCaptor`

# V16 – Spring Security Testing

**Project:** `junit-practice-v16`

Testing Spring Security without a real JWT provider.

### Concepts
- Authentication
- Authorization
- `ROLE_USER`
- `ROLE_ADMIN`
- `@WithMockUser`
- `user()`
- Anonymous access
- HTTP 401
- HTTP 403
- `@PreAuthorize`

**Important:** `401 = Authentication problem`, while `403 = Authorization problem`.

# V17 – JWT Resource Server Testing

**Project:** `junit-practice-v17`

### Concepts
- JWT
- Bearer token
- `JwtDecoder`
- OAuth2 Resource Server
- `spring-security-test`
- `.with(jwt())`
- Mocked JWT decoder
- Expired/invalid token testing
- Role-based authorization
- Custom JWT claims

# V18 – Keycloak JWT Testing

**Project:** `junit-practice-v18`

Testing Keycloak-style JWT claims.

Example claims:
```json
{
  "realm_access": { "roles": ["USER", "ADMIN"] },
  "scope": "inventory:read"
}
```

### Concepts
- `realm_access.roles`
- `scope`
- `preferred_username`
- `email`
- `issuer`
- `subject`
- `audience`
- Role mapping
- Scope mapping

Mapping:
```text
USER             → ROLE_USER
ADMIN            → ROLE_ADMIN
inventory:read   → SCOPE_inventory:read
```

# V19 – Real Keycloak Integration

**Project:** `junit-practice-v19`

A real Keycloak server runs inside a Testcontainer.

### Technologies
- Keycloak
- Testcontainers
- Docker
- Spring Security OAuth2 Resource Server
- Real JWT
- JWK validation
- Issuer validation

Keycloak image:
```text
quay.io/keycloak/keycloak:26.3.4
```

Realm: `junit-demo`

Users:
```text
prem / prem123
admin / admin123
report / report123
```

Roles: `USER`, `ADMIN`

# V20 – OAuth2 Grant Types

**Project:** `junit-practice-v20`

Testing OAuth2 token acquisition using different grant types.

## Password Grant
```text
username + password
        ↓
     Keycloak
        ↓
   Access Token
```

## Client Credentials
```text
client_id + client_secret
          ↓
       Keycloak
          ↓
   Service Access Token
```

Clients: `todo-api`, `order-service`

### Concepts
- Password grant
- Client Credentials grant
- Public client
- Confidential client
- Service account
- Client secret
- Service-to-service authentication

# V21 – Multi-Module Microservices

**Project:** `junit-practice-v21`

Modules:
```text
gateway
user-service
order-service
```

Architecture:
```text
Keycloak
   ↓
JWT Token
   ↓
Gateway
  /  \
 ↓    ↓
User  Order
Service Service
```

### Concepts
- Multi-module Maven
- Gateway security
- Service security
- Keycloak Testcontainers
- JWT authentication
- Role-based access
- Scope concepts
- MockMvc security tests
- Real Keycloak E2E tests

# V22 – Downstream Service Security

**Project:** `junit-practice-v22`

Architecture:
```text
Client
  | Bearer Token
  v
Order Service
  | Bearer Token
  v
Inventory Service
```

### Concepts
- Downstream service calls
- Token propagation
- Bearer token forwarding
- Service-to-service security
- WireMock
- 401 handling
- 500 handling
- Authorization headers

# V23 – Token Relay vs Client Credentials

**Project:** `junit-practice-v23`

## Token Relay

The original user's access token is forwarded.

```text
User
 | User JWT
 v
Order Service
 | Same User JWT
 v
Inventory Service
```

## Client Credentials

The service obtains its own access token.

```text
Order Service
      | client_id + client_secret
      v
   Keycloak
      | Service JWT
      v
Order Service
      | Service JWT
      v
Inventory Service
```

## Comparison

| Feature | Token Relay | Client Credentials |
|---|---|---|
| Token owner | User | Service |
| Identity | User | Service |
| Same token forwarded | Yes | No |
| User context | Preserved | Not inherently |
| Typical use | User-driven request | Background/service operation |
| Authorization | User scopes/roles | Service scopes/roles |

# Important Security Concepts

## Authentication
Authentication answers: **Who are you?**

## Authorization
Authorization answers: **What are you allowed to do?**

## Roles
Examples: `ROLE_USER`, `ROLE_ADMIN`.

## Scopes
Examples: `inventory:read`, `inventory:write`, `inventory:service`.

Spring Security commonly maps scopes to authorities such as:
```text
SCOPE_inventory:read
```

# 401 vs 403

### 401 Unauthorized
Authentication failed or is missing.

Examples:
- No token
- Invalid token
- Expired token
- Invalid signature

### 403 Forbidden
Authentication succeeded but authorization failed.

Example:
```text
Valid JWT + missing required scope = 403
```

# Technologies Covered

### Java / Maven
- Java 17
- Maven

### JUnit
- JUnit 5
- Assertions
- Parameterized tests
- Lifecycle
- Dynamic tests
- Repeated tests
- Tags
- Assumptions
- Timeouts

### Mockito
- Mock
- Spy
- Stub
- Verify
- ArgumentCaptor
- InOrder
- Answer
- Strict stubbing

### Spring Boot
- `@SpringBootTest`
- `@WebMvcTest`
- `@DataJpaTest`
- MockMvc
- TestRestTemplate
- Spring Data JPA
- Validation
- REST APIs

### Databases
- H2
- MySQL

### Containers
- Docker
- Testcontainers
- Keycloak Testcontainers
- MySQL Testcontainers

### Spring Security
- Authentication
- Authorization
- Roles
- Authorities
- JWT
- OAuth2 Resource Server
- Bearer Tokens
- Method Security

### Keycloak
- Realms
- Clients
- Users
- Roles
- Scopes
- Service Accounts
- JWT
- OAuth2

### Microservices Testing
- Gateway
- Downstream calls
- Token propagation
- Token Relay
- Client Credentials
- WireMock
- Service-to-service authentication

# Running the Projects

Most projects are Maven projects.

```bash
mvn clean test
```

Specific test class:
```bash
mvn -Dtest=UserServiceTest test
```

Specific test method:
```bash
mvn -Dtest=UserServiceTest#shouldCreateUser test
```

# Docker / Testcontainers

Versions using Testcontainers require Docker Desktop:

```text
V10, V11, V19, V20, V21, V22, V23
```

Verify Docker:
```bash
docker version
docker info
docker run --rm hello-world
```

# Overall Learning Journey

```text
JUnit
  ↓
Mockito
  ↓
Spring Boot Testing
  ↓
JPA
  ↓
Integration Testing
  ↓
Testcontainers
  ↓
REST API Testing
  ↓
Spring Security
  ↓
JWT
  ↓
Keycloak
  ↓
OAuth2
  ↓
Microservices
  ↓
Token Propagation
  ↓
Token Relay / Client Credentials
  ↓
Distributed Security Testing
```

# Suggested Next Step – V24

The natural next step after V23 is real end-to-end security validation:

- Real Keycloak + Testcontainers
- Real user JWT
- Real Client Credentials token
- Token Relay end-to-end testing
- Audience (`aud`) validation
- Issuer validation
- Signature validation
- Expiration validation
- Scope validation
- Order Service → Inventory Service
- Real service-to-service authentication
- Negative security tests
- 401 vs 403 verification

# Repository Structure

```text
junit-practice/
├── junit-practice
├── junit-practice-v2
├── junit-practice-v3
├── junit-practice-v4
├── junit-practice-v5
├── junit-practice-v6
├── junit-practice-v7
├── junit-practice-v8
├── junit-practice-v9
├── junit-practice-v10
├── junit-practice-v11
├── junit-practice-v12
├── junit-practice-v13
├── junit-practice-v14
├── junit-practice-v15
├── junit-practice-v16
├── junit-practice-v17
├── junit-practice-v18
├── junit-practice-v19
├── junit-practice-v20
├── junit-practice-v21
├── junit-practice-v22
└── junit-practice-v23
```

## Final Goal

The goal is not just to learn JUnit syntax. It is to understand how testing evolves in a real Java/Spring ecosystem:

```text
JUnit → Mockito → Spring Boot → Database → REST API
→ Security → JWT → Keycloak → OAuth2 → Microservices
→ Distributed Authentication → Production-style Integration Testing
```

**JUnit Practice V1 → V23**
