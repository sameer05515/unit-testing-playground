# My Testing Practice

This module provides a simple Spring Boot application that exposes student directory data, along with documentation views powered by Swagger UI and ReDoc.

## Project Structure

- `my-testing-practice`: Spring Boot project (`Java 17`) containing REST endpoints, Thymeleaf views, and unit tests.
  - `src/main/java`: Java sources
    - `entity/Student.java`: Student DTO with Lombok
    - `student/service/StudentService.java`: In-memory student data provider
    - `student/controller/*`: REST controller, Thymeleaf controllers, and landing page
  - `src/main/resources/templates`: Thymeleaf templates (`welcome.html`, `students.html`, `redoc.html`)
  - `src/test/java`: JUnit 5 + Spring MVC test for the student controller
- `Problem.md`: Original task description

## Requirements

- Java 17 or newer
- Maven Wrapper (bundled as `mvnw` / `mvnw.cmd`)

## Running the Application

```bash
# From example-base-02/my-testing-practice
./mvnw spring-boot:run
```

Once the application starts, visit:

- `http://localhost:8096/welcome` – Landing page with navigation
- `http://localhost:8096/students` – REST API returning JSON
- `http://localhost:8096/students/view` – Thymeleaf view rendering the students table
- `http://localhost:8096/swagger-ui/index.html` – Swagger UI documentation
- `http://localhost:8096/redoc` – Custom ReDoc view backed by the OpenAPI spec

## Testing

Run unit tests with:

```bash
./mvnw test
```

`StudentControllerTest` verifies that `GET /students` returns the expected payload using `MockMvc`.

