# JUnit Practice V14

V14 is focused on advanced Mockito and production-style service testing.

## Topics

- `@Mock`
- `@InjectMocks`
- `ArgumentCaptor`
- `times()`
- `never()`
- `verifyNoMoreInteractions()`
- `verifyNoInteractions()`
- `InOrder`
- `thenAnswer()`
- `doAnswer()`
- `doThrow()`
- `Spy`
- `doReturn()` with spies
- exception mocking
- strict stubbing
- `reset()`
- service-layer interaction testing

## Run

```bash
mvn clean test
```

No Docker/Testcontainers is required for the V14 Mockito tests.

## Important patterns

### ArgumentCaptor

```java
ArgumentCaptor<User> captor =
        ArgumentCaptor.forClass(User.class);

verify(repository).save(captor.capture());

User user = captor.getValue();
```

### InOrder

```java
InOrder inOrder =
        inOrder(repository, auditService, emailService);

inOrder.verify(repository).save(any(User.class));
inOrder.verify(auditService).record(anyString(), anyLong());
inOrder.verify(emailService).sendWelcomeEmail(any(User.class));
```

### Answer

```java
when(repository.save(any(User.class)))
    .thenAnswer(invocation -> {
        User user = invocation.getArgument(0);
        user.setId(100L);
        return user;
    });
```

### Void method

```java
doAnswer(invocation -> {
    User user = invocation.getArgument(0);
    return null;
}).when(emailService).sendWelcomeEmail(any(User.class));
```

## Learning path

V1-V4  -> JUnit fundamentals  
V5-V6  -> Mockito basics and interactions  
V7-V8  -> Spring Boot testing  
V9     -> JPA + H2  
V10    -> Testcontainers  
V11    -> SQL + transactions  
V12    -> REST integration testing  
V13    -> Advanced JUnit 5  
V14    -> Advanced Mockito
