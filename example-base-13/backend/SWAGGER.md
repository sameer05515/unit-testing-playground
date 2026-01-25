# API Documentation

The MCQ Examination System API is fully documented using OpenAPI 3.0 (Swagger) specification.

## Access Documentation

### Swagger UI
Interactive API documentation with "Try it out" functionality:
```
http://localhost:3000/api-docs
```

### ReDoc (Redocly)
Beautiful, responsive API documentation:
```
http://localhost:3000/docs
```

### OpenAPI JSON
Raw OpenAPI specification:
```
http://localhost:3000/api-docs/swagger.json
```

## Features

- ✅ Complete API documentation for all endpoints
- ✅ Request/response schemas
- ✅ Query parameters documentation
- ✅ Request body examples
- ✅ Error response documentation
- ✅ Interactive testing with Swagger UI
- ✅ Beautiful documentation with ReDoc

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user

### Questions
- `GET /api/questions` - Get all questions (with filters)
- `GET /api/questions/random` - Get random questions
- `GET /api/questions/:id` - Get question by ID
- `POST /api/questions` - Create new question
- `PUT /api/questions/:id` - Update question
- `DELETE /api/questions/:id` - Delete question

### Tests
- `GET /api/tests` - Get all tests
- `GET /api/tests/:id` - Get test by ID
- `POST /api/tests` - Create new test
- `PUT /api/tests/:id` - Update test
- `DELETE /api/tests/:id` - Delete test

### Attempts
- `POST /api/attempts` - Create new attempt
- `GET /api/attempts/:id` - Get attempt by ID
- `GET /api/attempts/user/:userId` - Get attempts by user
- `GET /api/attempts/test/:testId` - Get attempts for test
- `POST /api/attempts/submit-answer` - Submit answer
- `POST /api/attempts/finish` - Finish attempt
- `GET /api/attempts/leaderboard/:testId` - Get leaderboard

## Using Swagger UI

1. Navigate to `http://localhost:3000/api-docs`
2. Expand any endpoint to see details
3. Click "Try it out" to test the endpoint
4. Fill in parameters/request body
5. Click "Execute" to send the request
6. View the response

## Using ReDoc

1. Navigate to `http://localhost:3000/docs`
2. Browse all endpoints in a clean, organized view
3. See request/response schemas
4. Copy code examples

## Schema Definitions

All data models are documented:
- **User** - User information
- **Question** - MCQ question structure
- **Test** - Test configuration
- **Attempt** - Test attempt data
- **Answer** - Individual answer data
- **LeaderboardEntry** - Leaderboard ranking

## Development

Documentation is automatically generated from JSDoc comments in route files. To update:

1. Edit route files in `src/routes/`
2. Update JSDoc comments
3. Restart server to see changes

## Exporting Documentation

To export the OpenAPI spec:

```bash
curl http://localhost:3000/api-docs/swagger.json > openapi.json
```

This can be imported into:
- Postman
- Insomnia
- API testing tools
- Documentation generators
