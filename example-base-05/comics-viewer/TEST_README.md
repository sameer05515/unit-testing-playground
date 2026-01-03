# Test Cases Documentation

This document describes the test cases for the Comics Viewer application.

## Test Structure

```
src/test/java/com/comicsviewer/
├── service/
│   └── ComicsServiceTest.java      # Unit tests for ComicsService
├── controller/
│   └── ComicsControllerTest.java  # Controller tests with MockMvc
├── model/
│   └── ComicFileTest.java         # Model tests
└── integration/
    └── ComicsIntegrationTest.java  # Integration tests
```

## Test Coverage

### ComicsServiceTest (Unit Tests)

Tests for the service layer with mocked file system:

- ✅ `testGetAllComics_EmptyDirectory` - Handles empty directories
- ✅ `testGetAllComics_WithPdfFiles` - Finds PDF files correctly
- ✅ `testGetAllComics_IgnoresNonPdfFiles` - Filters out non-PDF files
- ✅ `testGetAllComics_SortByName` - Sorts by name (A-Z)
- ✅ `testGetAllComics_SortByDateDesc` - Sorts by date (newest first)
- ✅ `testGetAllComics_SortByDateAsc` - Sorts by date (oldest first)
- ✅ `testGetAllComics_MultipleDirectories` - Handles multiple directories
- ✅ `testGetAllComics_Subdirectories` - Recursively scans subdirectories
- ✅ `testGetComicBySlug_Found` - Finds comic by slug
- ✅ `testGetComicBySlug_NotFound` - Returns null for non-existent slug
- ✅ `testGetComicFile_WithSourceDirectory` - Uses source directory for lookup
- ✅ `testGetComicFile_WithoutSourceDirectory` - Searches all directories
- ✅ `testGetComicFile_NotFound` - Returns null for non-existent file
- ✅ `testGetAllComics_InvalidDirectory` - Handles invalid directory paths
- ✅ `testGetAllComics_DuplicateFilenames` - Generates unique slugs for duplicates
- ✅ `testGetAllComics_DefaultSort` - Default sorting behavior

### ComicsControllerTest (Controller Tests)

Tests for the REST API endpoints using MockMvc:

- ✅ `testGetComicsJson_Default` - GET /api/comics returns JSON
- ✅ `testGetComicsJson_WithSortBy` - GET /api/comics with sort parameter
- ✅ `testGetComicsJson_EmptyList` - Handles empty comic list
- ✅ `testGetComicBySlug_Found` - GET /comic-slug/{slug} returns PDF
- ✅ `testGetComicBySlug_NotFound` - Returns 404 for non-existent slug
- ✅ `testGetComicBySlug_FileNotFound` - Returns 404 when file missing
- ✅ `testGetComic_ByPath` - GET /comic/{path} returns PDF
- ✅ `testGetComic_ByPath_NotFound` - Returns 404 for non-existent path
- ✅ `testGetComic_ByPath_Encoded` - Handles URL-encoded paths
- ✅ `testIndex_DefaultSort` - Root page with default sort
- ✅ `testIndex_WithSortBy` - Root page with custom sort
- ✅ `testViewComic_WithSlug` - View page with slug parameter
- ✅ `testViewComic_WithSlugAndSort` - View page with slug and sort

### ComicFileTest (Model Tests)

Tests for the ComicFile model:

- ✅ `testComicFile_AllArgsConstructor` - Constructor with all parameters
- ✅ `testComicFile_NoArgsConstructor` - Default constructor
- ✅ `testComicFile_SettersAndGetters` - Setter and getter methods
- ✅ `testComicFile_EqualsAndHashCode` - Equality and hash code
- ✅ `testComicFile_ToString` - String representation

### ComicsIntegrationTest (Integration Tests)

End-to-end tests with real file system:

- ✅ `testFullWorkflow` - Complete workflow from scan to file retrieval
- ✅ `testMultipleDirectoriesIntegration` - Multiple directories end-to-end
- ✅ `testSortingIntegration` - Sorting functionality integration test

## Running Tests

### Run All Tests
```bash
mvn test
```

### Run Specific Test Class
```bash
mvn test -Dtest=ComicsServiceTest
```

### Run Specific Test Method
```bash
mvn test -Dtest=ComicsServiceTest#testGetAllComics_WithPdfFiles
```

### Run with Coverage
```bash
mvn test jacoco:report
```

## Test Configuration

Tests use temporary directories created by JUnit's `@TempDir` annotation, ensuring:
- No interference with actual comics directories
- Clean state for each test
- Automatic cleanup after tests

## Test Dependencies

- **JUnit 5** - Testing framework
- **Mockito** - Mocking framework (via spring-boot-starter-test)
- **Spring Boot Test** - Spring testing utilities
- **MockMvc** - Web layer testing

## Notes

- All file system operations use temporary directories
- Tests are isolated and don't require actual comics files
- Integration tests verify the full workflow
- Controller tests use MockMvc for HTTP endpoint testing
