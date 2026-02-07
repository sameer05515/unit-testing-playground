# Q&A System - Frontend

A React frontend application for the Q&A System API. This application provides a user-friendly interface for managing questions and answers with tagging and analytics features.

## Features

- ✅ View all questions with tags
- ✅ Create new questions with tags
- ✅ Edit questions
- ✅ Delete questions
- ✅ View question details with all answers
- ✅ Submit answers to questions
- ✅ Edit answers
- ✅ Delete answers
- ✅ Search questions by tag
- ✅ View tag analytics

## Prerequisites

- Node.js ≥ 14 and npm ≥ 6
- The Q&A backend API should be running on `http://localhost:3000` (or configure `REACT_APP_API_URL`)

## Installation

```bash
cd ques-ans-fe
npm install
```

## Running the Application

```bash
npm start
```

The application will open in your browser at `http://localhost:3000` (or the next available port).

## Configuration

By default, the frontend expects the backend API to be running on `http://localhost:3000`. To change this, create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:3000/api
```

## Project Structure

```
ques-ans-fe/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── QuestionList.js       # List of all questions
│   │   ├── QuestionForm.js       # Create/Edit question form
│   │   ├── QuestionDetail.js      # Question detail with answers
│   │   ├── AnswerForm.js          # Submit/Edit answer form
│   │   ├── TagAnalytics.js        # Tag usage analytics
│   │   └── *.css                  # Component styles
│   ├── services/
│   │   └── api.js                 # API service layer
│   ├── App.js                     # Main app component with routing
│   ├── App.css                    # Global app styles
│   ├── index.js                   # Entry point
│   └── index.css                  # Global styles
├── package.json
└── README.md
```

## Available Routes

- `/` - Question list with search
- `/questions/new` - Create a new question
- `/questions/:id` - View question details with answers
- `/questions/:id/edit` - Edit a question
- `/analytics` - View tag analytics

## API Integration

The frontend uses the following API endpoints:

- `GET /api/questions` - Get all questions
- `GET /api/questions/:id` - Get question with answers
- `POST /api/questions` - Create question
- `PUT /api/questions/:id` - Update question
- `DELETE /api/questions/:id` - Delete question
- `GET /api/questions/search/tag/:tag` - Search by tag
- `GET /api/answers?questionId=:id` - Get answers for question
- `POST /api/answers` - Create answer
- `PUT /api/answers/:id` - Update answer
- `DELETE /api/answers/:id` - Delete answer
- `GET /api/tags/analytics` - Get tag analytics

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Notes

- The application uses React Router for navigation
- All API calls are handled through the `api.js` service layer
- The UI is responsive and works on mobile devices
- Error handling is implemented for all API calls
