# Gold Rate Backend API

Spring Boot REST API for managing and querying gold rate data.

## Project Structure

```
gold-rate-backend/
├── src/
│   ├── main/
│   │   ├── java/com/goldrate/
│   │   │   ├── GoldRateApplication.java
│   │   │   ├── config/
│   │   │   │   └── OpenApiConfig.java
│   │   │   ├── controller/
│   │   │   │   ├── GoldRateController.java (REST API)
│   │   │   │   └── GoldRateViewController.java (Thymeleaf Views)
│   │   │   ├── model/
│   │   │   │   └── GoldRate.java
│   │   │   └── service/
│   │   │       └── GoldRateService.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── gold-rate.json
│   │       ├── static/
│   │       │   ├── css/
│   │       │   │   └── style.css
│   │       │   └── js/
│   │       │       └── app.js
│   │       └── templates/
│   │           ├── layout.html
│   │           ├── fragments.html
│   │           ├── index.html
│   │           ├── search.html
│   │           └── calculator.html
├── pom.xml
└── README.md
```

## Features

- Load gold rate data from JSON file on application startup
- RESTful APIs to query gold rate data
- Support for filtering by year and year ranges
- Calculate price change percentage between years
- **Thymeleaf Web Pages** with interactive UI
- **Swagger UI** for interactive API documentation
- **ReDoc** for beautiful API documentation
- **OpenAPI 3.0** specification support

## API Endpoints

### 1. Get All Gold Rates
**GET** `/api/gold-rates`

Returns all gold rate records.

**Response:**
```json
[
  {
    "year": "1964",
    "price": "63.25"
  },
  {
    "year": "1965",
    "price": "71.75"
  }
]
```

### 2. Get Gold Rate by Year
**GET** `/api/gold-rates/{year}`

Returns gold rate for a specific year.

**Example:** `/api/gold-rates/2020`

**Response:**
```json
{
  "year": "2020",
  "price": "48651.00"
}
```

### 3. Get Gold Rates by Year Range
**GET** `/api/gold-rates/range?startYear={startYear}&endYear={endYear}`

Returns all gold rates within the specified year range.

**Example:** `/api/gold-rates/range?startYear=2020&endYear=2024`

**Response:**
```json
[
  {
    "year": "2020",
    "price": "48651.00"
  },
  {
    "year": "2021",
    "price": "48720.00"
  }
]
```

### 4. Get Latest Gold Rate
**GET** `/api/gold-rates/latest`

Returns the most recent gold rate record.

**Response:**
```json
{
  "year": "2025",
  "price": "111350.00"
}
```

### 5. Get Oldest Gold Rate
**GET** `/api/gold-rates/oldest`

Returns the oldest gold rate record.

**Response:**
```json
{
  "year": "1964",
  "price": "63.25"
}
```

### 6. Calculate Price Change Percentage
**GET** `/api/gold-rates/price-change?startYear={startYear}&endYear={endYear}`

Calculates the percentage change in gold price between two years.

**Example:** `/api/gold-rates/price-change?startYear=2020&endYear=2024`

**Response:**
```json
{
  "startYear": "2020",
  "endYear": "2024",
  "percentageChange": 60.12
}
```

## Running the Application

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher

### Build and Run

```bash
# Navigate to project directory
cd gold-rate-backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## Web Pages

The application includes interactive Thymeleaf web pages that consume the REST APIs:

### Home Page
**URL:** `http://localhost:8080/` or `http://localhost:8080/home`

Features:
- Display all gold rates in a sortable table
- Show latest and oldest prices in stat cards
- Search functionality to filter by year
- Sort ascending/descending by year
- Visual indicators for price changes

### Search Page
**URL:** `http://localhost:8080/search`

Features:
- Search gold rate by specific year
- Search gold rates by year range
- Display results in formatted cards and tables
- Real-time API consumption

### Calculator Page
**URL:** `http://localhost:8080/calculator`

Features:
- Calculate percentage change between two years
- Display absolute and percentage changes
- Visual indicators for positive/negative changes
- Example calculations for quick testing

All pages feature:
- Responsive design (mobile-friendly)
- Modern UI with gradient backgrounds
- Real-time data fetching from REST APIs
- Error handling and loading states

## API Documentation

### Swagger UI

Once the application is running, you can access the interactive Swagger UI at:

**http://localhost:8080/swagger-ui.html**

Swagger UI provides:
- Interactive API documentation
- Try-it-out functionality to test endpoints directly
- Request/response examples
- Schema definitions

### ReDoc

ReDoc provides a beautiful, responsive API documentation interface. Access it at:

**http://localhost:8080/swagger-ui/index.html** (via Swagger UI) or use the OpenAPI JSON directly

### OpenAPI JSON Specification

The OpenAPI 3.0 specification is available at:

**http://localhost:8080/api-docs**

You can use this JSON to:
- Import into API testing tools (Postman, Insomnia, etc.)
- Generate client SDKs
- Integrate with other documentation tools

## Testing the APIs

You can test the APIs using:

1. **Browser:** Navigate to `http://localhost:8080/api/gold-rates`
2. **cURL:**
   ```bash
   curl http://localhost:8080/api/gold-rates
   curl http://localhost:8080/api/gold-rates/2020
   curl http://localhost:8080/api/gold-rates/range?startYear=2020&endYear=2024
   ```
3. **Postman** or any REST client

## Configuration

The application properties can be modified in `src/main/resources/application.properties`:

```properties
server.port=8080
spring.application.name=gold-rate-backend
gold.rate.data.file=classpath:gold-rate.json
```

## Technologies Used

- Spring Boot 3.2.0
- Java 17
- Maven
- Jackson (JSON processing)
- Thymeleaf (Server-side templating)
- SpringDoc OpenAPI 2.3.0 (Swagger & ReDoc support)
- HTML5, CSS3, JavaScript (Frontend)

