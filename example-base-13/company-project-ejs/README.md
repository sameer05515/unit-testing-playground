# Company Project EJS

A simple CRUD application built with:

- Node.js
- Express
- EJS
- JSON file persistence
- MVC-style folder structure
- Method Override for PUT/DELETE from HTML forms

## Features

### Company
- Create
- Read/list
- View details
- Update
- Delete
- Deleting a company also deletes its projects and project details

### Project
- Create
- Read/list
- View details
- Update
- Delete
- Each project belongs to a company
- Deleting a project also deletes its project details

### Project Details
- Create
- Read/list
- Update
- Delete
- Each detail record belongs to a project

## Data model

```text
Company
  |
  +-- Project
        |
        +-- Project Detail
```

The data is stored in:

```text
data/data.json
```

## Project structure

```text
company-project-ejs/
├── app.js
├── package.json
├── data/
│   └── data.json
├── models/
│   ├── companyModel.js
│   ├── projectModel.js
│   └── projectDetailModel.js
├── routes/
│   ├── companyRoutes.js
│   ├── projectRoutes.js
│   └── projectDetailRoutes.js
├── utils/
│   └── jsonDb.js
├── public/
│   └── css/
│       └── style.css
└── views/
    ├── partials/
    ├── companies/
    ├── projects/
    └── project-details/
```

## Run

```bash
npm install
npm start
```

Open:

```text
http://localhost:3000
```

For development:

```bash
npm run dev
```

## Main URLs

```text
GET/POST       /companies
GET            /companies/new
GET            /companies/:id
GET            /companies/:id/edit
PUT            /companies/:id
DELETE         /companies/:id

GET/POST       /projects
GET            /projects/new
GET            /projects/:id
GET            /projects/:id/edit
PUT            /projects/:id
DELETE         /projects/:id

GET/POST       /project-details
GET            /project-details/new
GET            /project-details/:id/edit
PUT            /project-details/:id
DELETE         /project-details/:id
```

## Important

This project intentionally uses a JSON file instead of MySQL/MongoDB.

For production, replace `utils/jsonDb.js` with a real repository/database implementation.
