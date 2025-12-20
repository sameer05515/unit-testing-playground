# Comics Viewer

A Spring Boot application with Thymeleaf, Alpine.js, and Tailwind CSS for viewing comics PDF files.

## Features

- 📚 Display PDF name and count/total-count in header
- 🎛️ Toggle left sidebar button
- 📋 Display comics name list in left sidebar with search
- 📄 Display comics PDF in right section
- 🔍 Search functionality for comics
- 📅 Sort by name or date (newest/oldest first)
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
4. **Sort Comics**: Use the sort dropdown in the sidebar to sort by:
   - Name (A-Z): Alphabetical order
   - Date (Newest First): Most recently modified files first
   - Date (Oldest First): Oldest files first
5. **Keyboard Navigation**:
   - Arrow Up/Down: Navigate through comics
   - Escape: Close sidebar

## API Documentation

The application includes Swagger UI and Redocly documentation:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **Redocly**: http://localhost:8080/redoc.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs
- **Quick Links**:
  - `/docs` - Redirects to Swagger UI
  - `/redoc` - Redirects to Redocly
  - `/api-docs` - Redirects to OpenAPI JSON

### API Endpoints

- `GET /api/comics?sortBy={sortBy}` - Get all comics list
  - Query parameter `sortBy`: `name` (default), `dateDesc` (newest first), `dateAsc` (oldest first)
- `GET /comic-slug/{slug}` - Get comic PDF by slug
- `GET /comic/{path}` - Get comic PDF by path (legacy)

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

