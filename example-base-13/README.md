# MCQ Examination System

A complete online MCQ (Multiple Choice Question) examination system with React frontend and Node.js/Express + MongoDB backend.

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Database**: MongoDB

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/mcq-system
NODE_ENV=development
```

For MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mcq-system
```

4. Start MongoDB (if running locally):
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

5. Seed the database:
```bash
npm run seed
```

6. Start the backend server:
```bash
npm run dev
```

Backend API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional, defaults to localhost:3000):
```bash
VITE_API_URL=http://localhost:3000/api
```

4. Start the frontend:
```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

## 📋 Features

### Student Features
- ✅ Start MCQ Test - Create attempt, load random questions, start timer
- ✅ Random MCQs - Get shuffled questions each attempt (configurable limit)
- ✅ Submit Answer - One option per question, auto-save on selection
- ✅ Finish Test & Score - Server-side calculation, instant results
- ✅ View Result Summary - Score breakdown, correct/incorrect count, time taken, question review
- ✅ Attempt History - View all previous attempts with scores and dates
- ✅ Timer Auto Submit - Automatic submission when time runs out
- ✅ Leaderboard - View top scorers per test with ranking

### Admin Features
- ✅ Create Test - Create test metadata, add questions, set duration and limits
- ✅ Question Bank - Full CRUD operations for MCQs, tag by topic, filter by difficulty

## 📡 API Endpoints

### Health Check
- `GET /health` - Check API status

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user

### Questions
- `GET /api/questions` - Get all questions (query: `?topic=Math&difficulty=easy`)
- `GET /api/questions/random` - Get random questions (query: `?limit=10&excludeIds=id1,id2`)
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
- `POST /api/attempts` - Create new attempt (body: `{ testId, userId }`)
- `GET /api/attempts/:id` - Get attempt by ID
- `GET /api/attempts/user/:userId` - Get all attempts by user
- `GET /api/attempts/test/:testId` - Get all attempts for a test
- `POST /api/attempts/submit-answer` - Submit answer (body: `{ attemptId, questionId, selectedOption }`)
- `POST /api/attempts/finish` - Finish attempt (body: `{ attemptId }`)
- `GET /api/attempts/leaderboard/:testId` - Get leaderboard for a test

## 📁 Project Structure

```
example-base-13/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/      # Request handlers
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── scripts/         # Seed script
│   │   └── server.js        # Express app
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Main app
│   ├── package.json
│   └── README.md
└── README.md
```

## 🔐 Default Users (from seed)

- **Admin**: admin@test.com (Role: admin)
- **Student**: student@test.com (Role: student)

## 🗄️ Database Models

### User
- name, email, role (student/admin)

### Question
- text, options[], correctAnswer (index), topic, difficulty, marks

### Test
- name, description, duration (minutes), questionLimit, questionIds[], createdBy

### Attempt
- testId, userId, status, startedAt, submittedAt, timeTaken, answers[], totalScore, questions[]

## 🛠️ Development

### Backend
- Uses ES6 modules
- Mongoose for MongoDB ODM
- Express for REST API
- CORS enabled for frontend

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- React Router for navigation
- API service layer for backend communication

## 📝 Notes

- All 10 user stories are fully implemented
- Backend handles all business logic
- Frontend is a pure presentation layer
- MongoDB stores all persistent data
- API follows RESTful conventions
