# Comics Viewer

A Spring Boot application with Thymeleaf, Alpine.js, and Tailwind CSS for viewing comics PDF files.

## Features

- 📚 Display PDF name and count/total-count in header
- 🎛️ Toggle left sidebar button
- 📋 Display comics name list in left sidebar with search
- 📄 Display comics PDF in right section
- 🔍 Search functionality for comics
- ⌨️ Keyboard navigation (Arrow keys, Escape)
- 📱 Responsive design

## Prerequisites

- Java 17 or higher
- Maven 3.6+

## Configuration

The comics directory is configured in `src/main/resources/application.properties`:

```properties
comics.directory=D:\\Prem\\comics
```

You can change this path to point to your comics directory.

## Building and Running

### Using Maven

1. Build the project:
   ```bash
   mvn clean package
   ```

2. Run the application:
   ```bash
   mvn spring-boot:run
   ```

   Or run the JAR:
   ```bash
   java -jar target/comics-viewer-1.0.0.jar
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Project Structure

```
comics-viewer/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/comicsviewer/
│       │       ├── ComicsViewerApplication.java
│       │       ├── controller/
│       │       │   └── ComicsController.java
│       │       ├── model/
│       │       │   └── ComicFile.java
│       │       └── service/
│       │           └── ComicsService.java
│       └── resources/
│           ├── application.properties
│           ├── static/
│           └── templates/
│               └── index.html
├── pom.xml
└── README.md
```

## Usage

1. **Toggle Sidebar**: Click the hamburger menu button in the header to show/hide the sidebar
2. **Select Comic**: Click on any comic in the sidebar to view it
3. **Search**: Use the search box in the sidebar to filter comics by name
4. **Keyboard Navigation**:
   - Arrow Up/Down: Navigate through comics
   - Escape: Close sidebar

## Technologies Used

- **Spring Boot 3.2.0**: Backend framework
- **Thymeleaf**: Server-side templating
- **Alpine.js**: Lightweight JavaScript framework for interactivity
- **Tailwind CSS**: Utility-first CSS framework
- **Lombok**: Reduces boilerplate code

## Notes

- The application scans the configured directory and all subdirectories for PDF files
- PDFs are served inline in the browser
- The sidebar is responsive and will overlay on mobile devices
- File sizes are displayed in human-readable format (KB, MB, GB)

