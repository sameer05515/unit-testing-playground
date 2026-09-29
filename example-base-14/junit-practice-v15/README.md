# JUnit Practice V15

Spring Boot MVC testing with JUnit 5 + Mockito.

## Topics

- `@WebMvcTest`
- `MockMvc`
- `@MockBean`
- Mockito service mocking
- `ArgumentCaptor`
- `verify()`
- `verifyNoInteractions()`
- `jsonPath`
- JSON assertions
- HTTP status/header assertions
- POST / GET / DELETE testing
- Bean Validation
- invalid JSON
- `@RestControllerAdvice`
- 400 / 404 / 409 / 201 / 204

## Run

```bash
mvn clean test
```

No Docker/Testcontainers is required.

## Flow

```text
MockMvc
   |
   v
Controller
   |
   v
Mock Service
```

The real database is not involved.

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
V15    -> Spring MVC + MockMvc + Mockito
