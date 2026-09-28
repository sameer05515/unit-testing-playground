# JUnit Practice V9

Spring Boot + JUnit 5 + Spring Data JPA + H2.

## Run

```bash
mvn test
```

## New topics

- @DataJpaTest
- H2 in-memory database
- Spring Data JPA repository testing
- Entity mapping
- @Transactional
- flush()
- DataIntegrityViolationException
- @SpringBootTest with JPA

## @DataJpaTest

```java
@DataJpaTest
class UserRepositoryTest {
}
```

This loads the JPA-related test slice instead of the entire application.

The test uses an H2 in-memory database.

## Repository test

```java
@Autowired
private UserRepository userRepository;

@Test
void shouldFindUserByEmail() {

    userRepository.save(
        new User("Prem", "prem@example.com")
    );

    Optional<User> result =
        userRepository.findByEmail("prem@example.com");

    assertTrue(result.isPresent());
}
```

## Why flush()?

Hibernate may delay SQL execution.

```java
userRepository.save(user);
```

does not necessarily execute INSERT immediately.

Use:

```java
userRepository.flush();
```

to force pending SQL to execute.

That is useful when testing database constraints:

```java
assertThrows(
    DataIntegrityViolationException.class,
    () -> userRepository.flush()
);
```

## @Transactional

The service integration test uses:

```java
@SpringBootTest
@Transactional
class UserServiceJpaTest {
}
```

Each test runs inside a transaction and is rolled back after the test.

## Testing layers

```text
V7
@WebMvcTest
     ↓
Controller

V8
@SpringBootTest
     ↓
Controller
     ↓
Service
     ↓
Repository

V9
@DataJpaTest
     ↓
Repository
     ↓
H2 Database
```

## Next V10

Recommended:

- Testcontainers
- MySQL/PostgreSQL integration testing
- @DynamicPropertySource
- Real database container
- Repository integration tests against MySQL
