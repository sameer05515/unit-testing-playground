# JUnit Practice V11

Spring Boot + JUnit 5 + Testcontainers + MySQL + @Sql + Transactions.

## Requirements

- Java 17+
- Maven 3.9+
- Docker Desktop running

## Run

```bash
mvn test
```

## New topics

- @Sql
- @SqlConfig
- BEFORE_TEST_METHOD
- AFTER_TEST_METHOD
- @Transactional
- Automatic transaction rollback
- Test data setup/cleanup
- Reusable Testcontainers base class

## 1. @Sql

Load test data before a test:

```java
@Test
@Sql("/sql/insert-prem.sql")
void shouldInsertDataBeforeTest() {
    assertEquals(1, userRepository.count());
}
```

The SQL file:

```sql
INSERT INTO users (name, email)
VALUES ('Prem', 'prem@example.com');
```

## 2. SQL cleanup

```java
@Sql(
    scripts = "/sql/cleanup-users.sql",
    executionPhase =
        Sql.ExecutionPhase.AFTER_TEST_METHOD
)
```

Cleanup SQL:

```sql
DELETE FROM users;
```

## 3. Transaction rollback

```java
@DataJpaTest
@Transactional
class UserTransactionRollbackTest {
}
```

Each test gets its own transaction.

At the end of the test:

```text
Test starts
   ↓
Transaction begins
   ↓
INSERT
   ↓
Assertions
   ↓
Transaction ROLLBACK
```

So data created by one test does not leak into another.

## 4. Reusable Testcontainers setup

Instead of repeating:

```java
@Container
static final MySQLContainer<?> MYSQL = ...
```

we created:

```text
UserMySqlTestBase
```

and extend it:

```java
@SpringBootTest
class UserMySqlIntegrationTest
        extends UserMySqlTestBase {
}
```

## Test strategy

```text
Unit Test
   ↓
Mockito
   ↓
No database

@WebMvcTest
   ↓
MockMvc
   ↓
Mock Service

@DataJpaTest
   ↓
JPA
   ↓
MySQL Testcontainer

@SpringBootTest
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
MySQL Testcontainer
```

## Next V12

Recommended:

- REST API integration tests
- TestRestTemplate
- Full Controller → Service → Repository → MySQL flow
- Error handling with @ControllerAdvice
- Testing HTTP 400 / 404 / 409 / 500
- JSON assertions
- Testcontainers + full application testing
