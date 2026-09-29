# JUnit Practice V8

Spring Boot + JUnit 5 + Mockito + MockMvc + Integration Testing.

## Run

```bash
mvn test
```

## V8 new topic

### @SpringBootTest

```java
@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
```

This starts the complete Spring application context.

The test flow is:

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

Unlike `@WebMvcTest`, the real `UserService` and real
`UserRepository` beans are used.

## TestRestTemplate

```java
@Autowired
private TestRestTemplate restTemplate;
```

Example:

```java
ResponseEntity<User> response =
        restTemplate.getForEntity(
                url("/api/users/1"),
                User.class
        );
```

POST:

```java
ResponseEntity<User> response =
        restTemplate.postForEntity(
                url("/api/users"),
                request,
                User.class
        );
```

DELETE:

```java
restTemplate.delete(
        url("/api/users/1")
);
```

## @WebMvcTest vs @SpringBootTest

### @WebMvcTest

```java
@WebMvcTest(UserController.class)

@MockBean
private UserService userService;
```

Used for controller/web-layer testing.

```text
Controller
    |
    X
 Mock Service
```

### @SpringBootTest

```java
@SpringBootTest(
    webEnvironment = RANDOM_PORT
)
```

Used for integration testing.

```text
Controller
    |
    v
Service
    |
    v
Repository
```

## Important interview question

Q: What is the difference between unit testing and integration testing?

Unit test:

```text
One class
+
Mock dependencies
```

Integration test:

```text
Multiple real components
+
Spring Context
+
Real interactions between components
```

## Next V9

Recommended next topics:

- @DataJpaTest
- H2 database
- Repository testing
- @Sql
- Test transactions
- @Transactional
- Testcontainers
