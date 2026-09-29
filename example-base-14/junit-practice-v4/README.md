# JUnit Practice V4

Java 17 + Maven + JUnit 5.

## Run

```bash
mvn test
```

## Topics

### Lifecycle
- @BeforeAll
- @AfterAll
- @BeforeEach
- @AfterEach

### Assertions
- assertEquals()
- assertNotEquals()
- assertTrue()
- assertFalse()
- assertNull()
- assertNotNull()
- assertThrows()
- assertAll()

### Parameterized Tests
- @ParameterizedTest
- @ValueSource
- @CsvSource
- @MethodSource

## Important idea

Normal test:

```java
@Test
void shouldAdd() {
    assertEquals(30, calculator.add(10, 20));
}
```

Parameterized test:

```java
@ParameterizedTest
@CsvSource({
    "10, 20, 30",
    "5, 5, 10",
    "100, 200, 300"
})
void shouldAdd(int a, int b, int expected) {
    assertEquals(expected, calculator.add(a, b));
}
```

One test method runs multiple times with different input data.
