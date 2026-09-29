# JUnit Practice V16

Spring Boot + Spring Security + MockMvc testing.

## Topics

- `@WebMvcTest`
- `MockMvc`
- `@MockBean`
- Spring Security test support
- `@WithMockUser`
- `user()` request post processor
- `anonymous()`
- roles
- authenticated vs anonymous
- `401 Unauthorized`
- `403 Forbidden`
- public endpoints
- admin endpoints
- `@PreAuthorize`
- CSRF request processor
- stateless security configuration

## Security rules

```text
/api/public/**       -> public
/api/users/**        -> authenticated
/api/admin/**        -> ROLE_ADMIN
other endpoints      -> authenticated
```

## Important distinction

### 401

User is NOT authenticated.

```text
GET /api/users/1
Anonymous
      |
      v
    401
```

### 403

User is authenticated but does NOT have required role.

```text
ROLE_USER
   |
   v
GET /api/admin/dashboard
   |
   v
  403
```

### @WithMockUser

```java
@WithMockUser(
    username = "prem",
    roles = "USER"
)
```

For admin:

```java
@WithMockUser(
    username = "admin",
    roles = "ADMIN"
)
```

### Request-level user

```java
mockMvc.perform(
    get("/api/admin/dashboard")
        .with(user("admin").roles("ADMIN"))
);
```

## Run

```bash
mvn clean test
```

No Docker/Testcontainers is required.

## Learning path

V1-V4  -> JUnit fundamentals
V5-V6  -> Mockito
V7-V8  -> Spring Boot testing
V9     -> JPA + H2
V10    -> Testcontainers
V11    -> SQL + transactions
V12    -> REST integration testing
V13    -> Advanced JUnit 5
V14    -> Advanced Mockito
V15    -> Spring MVC + MockMvc
V16    -> Spring Security testing
