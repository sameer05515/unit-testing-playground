# JUnit Practice V5

Java 17 + Maven + JUnit 5 + Mockito.

## Run

```bash
mvn test
```

## New in V5

Mockito:

- mock()
- when()
- thenReturn()
- verify()
- never()
- any()
- @Mock
- @InjectMocks
- @ExtendWith(MockitoExtension.class)

## Test architecture

```text
UserService
     |
     v
UserRepository
```

In the unit test, `UserRepository` is replaced by a Mockito mock.

```java
@Mock
private UserRepository userRepository;

@InjectMocks
private UserService userService;
```

Example:

```java
when(userRepository.findByEmail("prem@example.com"))
        .thenReturn(Optional.of(user));

User result = userService.findByEmail("prem@example.com");

verify(userRepository)
        .findByEmail("prem@example.com");
```

The real repository/database is NOT used.

## Test cases

1. Find existing user
2. User not found
3. Create user
4. Prevent duplicate user
