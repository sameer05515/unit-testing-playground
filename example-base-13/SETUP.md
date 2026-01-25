# Setup Guide - MCQ Examination System

## Quick Start

### 1. Start MongoDB

**Local MongoDB:**
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

**MongoDB Atlas (Cloud):**
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster and get connection string
- Use connection string in backend `.env` file

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
echo "PORT=3000" > .env
echo "MONGODB_URI=mongodb://localhost:27017/mcq-system" >> .env
echo "NODE_ENV=development" >> .env

# Seed database with initial data
npm run seed

# Start server
npm run dev
```

Backend will run on `http://localhost:3000`

### 3. Frontend Setup

```bash
cd frontend
npm install

# Optional: Create .env file (defaults to localhost:3000)
echo "VITE_API_URL=http://localhost:3000/api" > .env

# Start dev server
npm run dev
```

Frontend will run on `http://localhost:5173`

## What Was Updated

### Backend (New)
- ✅ Express.js server with MongoDB/Mongoose
- ✅ RESTful API endpoints for all features
- ✅ Database models (User, Question, Test, Attempt)
- ✅ Seed script for initial data
- ✅ CORS enabled for frontend

### Frontend (Updated)
- ✅ All components now use async/await
- ✅ API service replaces localStorage
- ✅ Automatic _id to id normalization
- ✅ Loading states added
- ✅ Error handling improved

## API Endpoints

- `GET /health` - Health check
- `GET /api/users` - Get all users
- `GET /api/questions` - Get all questions
- `GET /api/questions/random?limit=10` - Get random questions
- `GET /api/tests` - Get all tests
- `POST /api/attempts` - Create attempt
- `POST /api/attempts/submit-answer` - Submit answer
- `POST /api/attempts/finish` - Finish attempt
- `GET /api/attempts/leaderboard/:testId` - Get leaderboard

See `backend/README.md` for complete API documentation.

## Default Users (from seed)

- **Admin**: admin@test.com
- **Student**: student@test.com

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in backend/.env
- For Atlas, verify connection string includes credentials

### CORS Errors
- Backend has CORS enabled by default
- Check that frontend VITE_API_URL matches backend URL

### API Not Found
- Ensure backend is running on port 3000
- Check browser console for API errors
- Verify API_BASE_URL in frontend

### Data Not Loading
- Run `npm run seed` in backend to populate initial data
- Check MongoDB connection
- Verify API endpoints are working (test with `/health`)

## Development

### Backend
- Uses ES6 modules
- Mongoose for MongoDB ODM
- Express for REST API
- Nodemon for auto-reload

### Frontend
- React 18 + TypeScript
- Vite for build tooling
- React Router for navigation
- API service layer for backend communication

## Production Build

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## Notes

- All data is stored in MongoDB
- Frontend communicates with backend via REST API
- IDs are automatically normalized (_id → id)
- All 10 user stories are fully implemented
