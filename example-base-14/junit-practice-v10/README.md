# JUnit Practice V10

Spring Boot + JUnit 5 + Testcontainers + MySQL.

## Requirements

- Java 17+
- Maven 3.9+
- Docker Desktop running

Testcontainers starts a real MySQL Docker container automatically.

## Run

```bash
mvn test
```

No manual MySQL setup is required.

## Architecture

```text
JUnit Test
    |
    v
Testcontainers
    |
    v
MySQL 8.4 Docker Container
    |
    v
Spring Data JPA
```

## Important classes

```text
src/test/java/com/example/

UserRepositoryMySqlTest.java
UserServiceIntegrationTest.java
UserControllerTest.java
```

## Testcontainers

```java
@Testcontainers
@DataJpaTest
class UserRepositoryMySqlTest {

    @Container
    static final MySQLContainer<?> MYSQL =
            new MySQLContainer<>("mysql:8.4");
}
```

Testcontainers will:

1. Pull MySQL image if required
2. Start a temporary container
3. Expose a random database port
4. Run tests
5. Stop the container

## Dynamic database configuration

```java
@DynamicPropertySource
static void configureDatabase(
        DynamicPropertyRegistry registry) {

    registry.add(
        "spring.datasource.url",
        MYSQL::getJdbcUrl
    );

    registry.add(
        "spring.datasource.username",
        MYSQL::getUsername
    );

    registry.add(
        "spring.datasource.password",
        MYSQL::getPassword
    );
}
```

This is useful because Testcontainers dynamically assigns
the database connection details.

## H2 vs Testcontainers

H2:

```text
Test
 ↓
H2
```

Testcontainers:

```text
Test
 ↓
Real MySQL
 ↓
Docker Container
```

Testcontainers gives better confidence when the production
database is MySQL.

## @DataJpaTest

```java
@DataJpaTest
```

Tests the JPA/repository layer.

## @SpringBootTest

```java
@SpringBootTest
```

Loads the full Spring application context.

## Interview question

Q: Why use Testcontainers instead of H2?

Answer:

H2 is a different database engine from MySQL. SQL behavior,
constraints, indexes, data types and other database-specific
features can differ.

Testcontainers allows tests to run against the same database
technology used in production.

## Next V11

Recommended:

- Testcontainers lifecycle
- @DynamicPropertySource
- MySQL schema initialization
- Test database isolation
- @Sql
- @Transactional tests
- Integration test best practices
- Testcontainers reusable containers
