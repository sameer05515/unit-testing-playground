# JUnit Practice V7

Spring Boot + JUnit 5 + Mockito + MockMvc.

## Run

```bash
mvn test
```

## Architecture

```text
HTTP Request
     |
     v
UserController
     |
     v
UserService
     |
     v
UserRepository
```

## Tests

### UserServiceTest

Unit test:

```java
@Mock
private UserRepository userRepository;

@InjectMocks
private UserService userService;
```

The real repository is not used.

### UserControllerTest

Web layer test:

```java
@WebMvcTest(UserController.class)
```

```java
@MockBean
private UserService userService;
```

Requests are executed using:

```java
mockMvc.perform(
    get("/api/users/1")
)
.andExpect(status().isOk());
```

### UserRepositoryTest

Tests the repository implementation directly.

## MockMvc examples

GET:

```java
mockMvc.perform(get("/api/users/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value("Prem"));
```

POST:

```java
mockMvc.perform(
    post("/api/users")
        .contentType(MediaType.APPLICATION_JSON)
        .content(json)
)
.andExpect(status().isCreated());
```

DELETE:

```java
mockMvc.perform(delete("/api/users/1"))
        .andExpect(status().isNoContent());
```

## Important distinction

`@WebMvcTest`

Loads mainly the MVC/web layer.

`@SpringBootTest`

Loads the complete Spring application context.

V8 will cover `@SpringBootTest` and integration testing.
