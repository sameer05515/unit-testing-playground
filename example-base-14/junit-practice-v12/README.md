# JUnit Practice V12

Spring Boot + JUnit 5 + Mockito + JPA + MySQL Testcontainers.

## V12 topics
- `@SpringBootTest(webEnvironment = RANDOM_PORT)`
- `TestRestTemplate`
- real HTTP integration tests
- Controller -> Service -> Repository -> MySQL
- Testcontainers MySQL
- Bean Validation and `@Valid`
- `@RestControllerAdvice`
- 400 / 404 / 409 / 201 / 204
- MockMvc slice test
- Mockito unit test

## Run
Docker Desktop must be running.

```bash
mvn clean test
```

Only REST integration tests:

```bash
mvn -Dtest=UserRestApiIntegrationTest test
```

## API
POST `/api/users` -> 201  
GET `/api/users/{id}` -> 200 / 404  
GET `/api/users/search?name=prem` -> 200  
DELETE `/api/users/{id}` -> 204 / 404  

Invalid POST -> 400  
Duplicate email -> 409
