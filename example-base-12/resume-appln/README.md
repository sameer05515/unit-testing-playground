# Resume Application

A modern web application for managing users, companies, projects, and resumes.

## Features

- **Companies Management**: View list of companies and their associated projects
- **Users Management**: View list of users and their resumes
- **Resume Details**: Comprehensive resume view with:
  - Personal information
  - Work experiences with tenures
  - Projects with tech stacks and roles & responsibilities
  - Educational details

## Technology Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Vite** for build tooling
- Modern CSS for styling

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── types/           # TypeScript type definitions
├── services/        # Data services and mock data
├── pages/           # Page components
│   ├── CompaniesPage.tsx
│   ├── CompanyProjectsPage.tsx
│   ├── UsersPage.tsx
│   ├── UserResumesPage.tsx
│   └── ResumeDetailPage.tsx
├── App.tsx          # Main app component with routing
└── main.tsx         # Entry point
```

## Pages

1. **Home** (`/`) - Welcome page
2. **Companies** (`/companies`) - List of all companies
3. **Company Projects** (`/companies/:companyId/projects`) - Projects for a selected company
4. **Users** (`/users`) - List of all users
5. **User Resumes** (`/users/:userId/resumes`) - Resumes for a selected user
6. **Resume Detail** (`/resumes/:resumeId`) - Detailed view of a resume

## Data Model

- **User**: Contains basic user information
- **Company**: Company details
- **Project**: Projects belonging to companies
- **Resume**: Contains personal info, experiences, and education
- **Experience**: Work experience with company, position, tenure, and projects
- **Project Experience**: Project details with tech stacks and responsibilities
- **Education**: Educational qualifications

