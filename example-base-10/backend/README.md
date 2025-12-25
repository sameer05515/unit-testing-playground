# Backend API Server

Express.js API server for fetching JSON data from GitHub.

## Prerequisites

- Node.js 18.0 or higher (for native `fetch` support)
- npm or yarn

## Features

- ✅ Fetch JSON data from GitHub raw URL
- ✅ CORS enabled for cross-origin requests
- ✅ Error handling
- ✅ Health check endpoint
- ✅ Two API endpoints: wrapped and raw JSON responses
- ✅ Swagger UI documentation
- ✅ ReDoc documentation
- ✅ OpenAPI 3.0 specification

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

### Development
```bash
npm start
# or
node src/server.js
```

The server will start on `http://localhost:3000` (or the port specified in `PORT` environment variable).

## API Documentation

The application includes Swagger UI and ReDoc documentation:

- **Swagger UI**: http://localhost:3000/swagger-ui
- **ReDoc**: http://localhost:3000/redoc
- **OpenAPI JSON**: http://localhost:3000/api-docs.json
- **Quick Links**:
  - `/swagger-ui` - Interactive Swagger UI documentation
  - `/redoc` - ReDoc documentation
  - `/api-docs.json` - OpenAPI 3.0 specification in JSON format

## API Endpoints

### GET `/api/snapshots`
Fetches JSON data from GitHub and returns it with a wrapper object.

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "source": "https://raw.githubusercontent.com/..."
}
```

### GET `/api/snapshots/raw`
Fetches JSON data from GitHub and returns the raw JSON without wrapper.

**Response:**
```json
{ ... }
```

### GET `/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### GET `/`
Root endpoint with API documentation.

**Response:**
```json
{
  "message": "Backend API Server",
  "endpoints": { ... }
}
```

## Usage Examples

### Using fetch (JavaScript)
```javascript
// With wrapper
const response = await fetch('http://localhost:3000/api/snapshots');
const result = await response.json();
console.log(result.data);

// Raw JSON
const response = await fetch('http://localhost:3000/api/snapshots/raw');
const data = await response.json();
console.log(data);
```

### Using curl
```bash
# With wrapper
curl http://localhost:3000/api/snapshots

# Raw JSON
curl http://localhost:3000/api/snapshots/raw

# Health check
curl http://localhost:3000/health
```

## Configuration

You can change the port by setting the `PORT` environment variable:

```bash
PORT=4000 npm start
```

## Error Handling

The API handles errors gracefully:
- Network errors
- Invalid responses
- Server errors

All errors return appropriate HTTP status codes and error messages.

## Dependencies

- **express**: Web framework for Node.js
- **cors**: Enable CORS for cross-origin requests
- **swagger-ui-express**: Swagger UI for Express
- **swagger-jsdoc**: Generate Swagger/OpenAPI specification from JSDoc comments
- **redoc-express**: ReDoc documentation (via CDN)

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── swagger.js     # Swagger configuration
│   ├── server.js          # Main Express server
│   ├── script.js          # Original script (reference)
│   └── example-client.js  # Example client to test API
├── package.json
├── README.md
└── .gitignore
```

## Notes

- The GitHub URL is hardcoded in `src/server.js`. You can modify it or make it configurable via environment variables.
- CORS is enabled by default to allow requests from any origin.
- Requires Node.js 18+ for native `fetch` support. For older versions, you can install `node-fetch` and import it.
- API documentation is automatically generated from JSDoc comments in the code.
- Swagger UI and ReDoc are available at `/swagger-ui` and `/redoc` respectively.

## Testing

1. Start the server:
   ```bash
   npm start
   ```

2. In another terminal, test with the example client:
   ```bash
   node src/example-client.js
   ```

3. Or test with curl:
   ```bash
   curl http://localhost:3000/api/snapshots
   ```
