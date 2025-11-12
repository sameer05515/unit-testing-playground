# nodejs-backend

Small Express 4 sample that exposes in-memory employee and student resources. The project now ships with interactive API documentation powered by Swagger UI and Redoc (via Redocly).

## Prerequisites

- Node.js 18 or newer

## Getting Started

```powershell
npm install
npm run start
```

The development server listens on `http://localhost:3000`.

## Available Endpoints

- `GET /` – Rendered welcome page with navigation cards.
- `GET /dashboard` – Server-rendered dashboard that consumes the JSON APIs.
- `GET /api/employees` – Retrieve all employees.
- `GET /api/employees/{id}` – Retrieve a single employee.
- `POST /api/employees` – Create a new employee (expects `name` and `position`).
- `PUT /api/employees/{id}` – Replace an employee.
- `DELETE /api/employees/{id}` – Remove an employee.
- `GET /students` – Retrieve all students.
- `GET /students/{id}` – Retrieve a single student.
- `POST /students` – Create a new student (expects `name` and `age`).
- `PUT /students/{id}` – Update a student.
- `DELETE /students/{id}` – Remove a student.

## API Documentation

- Swagger UI: [`http://localhost:3000/docs/swagger`](http://localhost:3000/docs/swagger)
- ReDoc (Redocly): [`http://localhost:3000/docs/redoc`](http://localhost:3000/docs/redoc)
- Raw OpenAPI JSON: [`http://localhost:3000/docs/openapi.json`](http://localhost:3000/docs/openapi.json)

Both documentation portals are generated from the single `src/docs/openapi.js` definition.

## Views

- Templates live in `src/views/`.
- The project uses EJS as the view engine (`npm install` already brings it in).
- Visit `http://localhost:3000/` or `http://localhost:3000/dashboard` for rendered pages that link to or consume the API.

