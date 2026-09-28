# JUnit Practice V13

Advanced JUnit 5 practice.

## New topics
- `@Nested`
- `@DisplayName`
- `@RepeatedTest`
- `RepetitionInfo`
- `@TestFactory`
- `DynamicTest`
- `@Tag`
- `@Disabled`
- `@EnabledOnOs`
- `@EnabledOnJre`
- Assumptions
- `@Timeout`
- `assertTimeout`
- `assertTimeoutPreemptively`
- `@TestMethodOrder`
- `@Order`
- `@NullSource`
- `@EmptySource`
- `@EnumSource`

## Run

```bash
mvn clean test
```

Run only the new V13 tests:

```bash
mvn -Dtest="*ExampleTest,*Tests" test
```

V13 deliberately keeps the V12 Testcontainers dependencies for continuity, but the new JUnit examples themselves do not require Docker.

## Learning path

V1-V4: JUnit fundamentals  
V5-V6: Mockito  
V7-V8: Spring Boot testing  
V9: JPA + H2  
V10: Testcontainers  
V11: SQL + transactions  
V12: REST integration testing  
V13: Advanced JUnit 5
