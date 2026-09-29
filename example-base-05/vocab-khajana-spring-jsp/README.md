# Khajana Spring Boot JSP

Spring Boot MVC + JSP implementation using the supplied `khajana.xml`.

- XML entries detected: 1034
- Java 17
- Spring Boot 3.5.x
- JSP + JSTL + embedded Tomcat
- Search by word/meaning/example
- Part-of-speech filter
- Pagination
- Word detail
- Word of the Day
- Random word
- Favorites/bookmarks
- Recently viewed
- MCQ quiz
- Quiz accuracy tracking
- Pronunciation
- Dark mode
- Keyboard navigation
- JSON endpoints

## Run

```bash
mvn clean spring-boot:run
```

Open `http://localhost:8080`.

## Build

```bash
mvn clean package
java -jar target/khajana-spring-jsp-1.0.0.jar
```

## API

`GET /api/word/{id}`  
`GET /api/word-of-day`  
`GET /api/random`  
`GET /api/quiz?count=10`

The XML remains the source of truth for vocabulary content.
