# JUnit Practice V6

Java 17 + Maven + JUnit 5 + Mockito.

## Run

```bash
mvn test
```

## New Mockito topics

### ArgumentCaptor

Capture the object passed to a mock:

```java
ArgumentCaptor<User> captor =
        ArgumentCaptor.forClass(User.class);

verify(userRepository).save(captor.capture());

User captured = captor.getValue();
```

### times()

```java
verify(userRepository, times(1))
        .findByEmail("prem@example.com");
```

### never()

```java
verify(userRepository, never())
        .save(any(User.class));
```

### doReturn()

```java
doReturn(Optional.of(user))
        .when(userRepository)
        .findByEmail("prem@example.com");
```

### doThrow()

Useful for void methods:

```java
doThrow(new RuntimeException("Database error"))
        .when(userRepository)
        .deleteById(100L);
```

### verifyNoMoreInteractions()

```java
verify(userRepository)
        .findByEmail("prem@example.com");

verifyNoMoreInteractions(userRepository);
```

### ArgumentCaptor flow

```text
UserService
    |
    | save(user)
    v
Mockito Mock
    |
    | capture()
    v
ArgumentCaptor<User>
    |
    v
Assert properties of User
```
