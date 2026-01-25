# MCQ Examination System - Backend API

Node.js/Express backend with MongoDB for the MCQ Examination System.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)

### Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file:
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/mcq-system
NODE_ENV=development
```

For MongoDB Atlas, use:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mcq-system
```

3. Start MongoDB (if running locally):
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

4. Seed the database (optional):
```bash
npm run seed
```

5. Start the server:
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:3000`

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

## 📦 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js       # MongoDB connection
│   ├── controllers/          # Request handlers
│   │   ├── userController.js
│   │   ├── questionController.js
│   │   ├── testController.js
│   │   └── attemptController.js
│   ├── models/               # Mongoose models
│   │   ├── User.js
│   │   ├── Question.js
│   │   ├── Test.js
│   │   └── Attempt.js
│   ├── routes/               # API routes
│   │   ├── userRoutes.js
│   │   ├── questionRoutes.js
│   │   ├── testRoutes.js
│   │   └── attemptRoutes.js
│   ├── scripts/
│   │   └── seed.js           # Database seeding script
│   └── server.js             # Express app entry point
├── .env                      # Environment variables
├── package.json
└── README.md
```

## 🔧 Environment Variables

- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)

## 📝 Example API Requests

### Create Question
```bash
curl -X POST http://localhost:3000/api/questions \
  -H "Content-Type: application/json" \
  -d '{
    "text": "What is 2+2?",
    "options": ["3", "4", "5", "6"],
    "correctAnswer": 1,
    "topic": "Math",
    "difficulty": "easy",
    "marks": 1
  }'
```

### Create Test
```bash
curl -X POST http://localhost:3000/api/tests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Math Test",
    "description": "Basic math questions",
    "duration": 10,
    "questionLimit": 5,
    "questionIds": [],
    "createdBy": "USER_ID"
  }'
```

### Create Attempt
```bash
curl -X POST http://localhost:3000/api/attempts \
  -H "Content-Type: application/json" \
  -d '{
    "testId": "TEST_ID",
    "userId": "USER_ID"
  }'
```

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

- Uses ES6 modules (`type: "module"`)
- Mongoose for MongoDB ODM
- Express for REST API
- CORS enabled for frontend integration
