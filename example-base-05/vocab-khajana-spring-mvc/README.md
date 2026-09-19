# Khajana Spring Boot MVC

Spring Boot + Thymeleaf MVC implementation of the supplied `khajana.xml` vocabulary app.

## Dataset
- Source: `src/main/resources/static/data/khajana.xml`
- Entries detected: 1034
- Fields: word, part of speech, meanings, examples

## Features
- Search word / meaning / example
- Part-of-speech filter
- Server-side pagination
- Word detail view
- Word of the Day
- Random word
- Favorites/bookmarks via localStorage
- Recently viewed words via localStorage
- MCQ quiz via Spring Boot `/api/quiz`
- Quiz score and accuracy persisted locally
- Browser pronunciation via SpeechSynthesis
- Dark/light mode persisted locally
- Keyboard navigation
- Responsive Tailwind UI
- JSON endpoints for word, random, word-of-day and quiz
- XML parser configured to reject external entities / XXE

## Requirements
- Java 17+
- Maven 3.9+

## Run
```bash
mvn spring-boot:run
```
Open `http://localhost:8080`.

Build:
```bash
mvn clean package
java -jar target/khajana-spring-mvc-1.0.0.jar
```

## API
- `GET /api/word/{id}`
- `GET /api/word-of-day`
- `GET /api/random`
- `GET /api/quiz?count=10`

## Structure
```text
khajana-spring-mvc
├── pom.xml
├── README.md
└── src/main
    ├── java/com/prem/khajana
    │   ├── KhajanaApplication.java
    │   ├── controller/KhajanaController.java
    │   ├── model/VocabularyWord.java
    │   └── service/KhajanaService.java
    └── resources
        ├── application.properties
        ├── templates/index.html
        └── static
            ├── css/app.css
            ├── js/app.js
            └── data/khajana.xml
```

The XML data is used as supplied; meanings/examples are not replaced with invented content.
