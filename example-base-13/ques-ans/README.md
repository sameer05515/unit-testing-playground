# Q&A System API

A RESTful API for managing questions and answers with tagging and analytics capabilities.

## Features

- ✅ Create Question Entity (with question text and tags)
- ✅ Submit Answer for questions
- ✅ Tag Questions (single or multiple tags)
- ✅ View Q&A (question with all answers)
- ✅ Search by Tag
- ✅ Edit Question
- ✅ Edit Answer
- ✅ Delete Question
- ✅ Delete Answer
- ✅ Tag Analytics (tag usage statistics)

## Installation

```bash
cd ques-ans
npm install
```

## Running the Server

```bash
npm start
# or
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### Questions

#### Create Question
```http
POST /api/questions
Content-Type: application/json

{
  "question": "What is Node.js?",
  "tag": "nodejs"
}
# or with multiple tags
{
  "question": "What is Node.js?",
  "tags": ["nodejs", "javascript", "backend"]
}
```

#### Get All Questions
```http
GET /api/questions
```

#### Get Question by ID (with answers)
```http
GET /api/questions/:id
```

#### Search Questions by Tag
```http
GET /api/questions/search/tag/:tag
```

#### Update Question
```http
PUT /api/questions/:id
Content-Type: application/json

{
  "question": "Updated question text",
  "tags": ["updated", "tags"]
}
```

#### Delete Question
```http
DELETE /api/questions/:id
```

### Answers

#### Submit Answer
```http
POST /api/answers
Content-Type: application/json

{
  "questionId": 1,
  "answer": "Node.js is a JavaScript runtime..."
}
```

#### Get All Answers (or filter by questionId)
```http
GET /api/answers
GET /api/answers?questionId=1
```

#### Get Answer by ID
```http
GET /api/answers/:id
```

#### Update Answer
```http
PUT /api/answers/:id
Content-Type: application/json

{
  "answer": "Updated answer text"
}
```

#### Delete Answer
```http
DELETE /api/answers/:id
```

### Tags

#### Get Tag Analytics
```http
GET /api/tags/analytics
```

Returns:
```json
{
  "success": true,
  "data": {
    "summary": {
      "nodejs": 5,
      "javascript": 3
    },
    "sorted": [
      { "tag": "nodejs", "count": 5 },
      { "tag": "javascript", "count": 3 }
    ],
    "totalTags": 2,
    "totalQuestions": 8
  }
}
```

## Example Usage

### 1. Create a Question
```bash
curl -X POST http://localhost:3000/api/questions \
  -H "Content-Type: application/json" \
  -d '{"question": "What is Express.js?", "tags": ["express", "nodejs", "backend"]}'
```

### 2. Submit an Answer
```bash
curl -X POST http://localhost:3000/api/answers \
  -H "Content-Type: application/json" \
  -d '{"questionId": 1, "answer": "Express.js is a web framework for Node.js"}'
```

### 3. View Question with Answers
```bash
curl http://localhost:3000/api/questions/1
```

### 4. Search by Tag
```bash
curl http://localhost:3000/api/questions/search/tag/nodejs
```

### 5. Get Tag Analytics
```bash
curl http://localhost:3000/api/tags/analytics
```

## Data Models

### Question
```javascript
{
  id: number,
  question: string,
  tags: string[],
  createdAt: string (ISO date),
  updatedAt: string (ISO date)
}
```

### Answer
```javascript
{
  id: number,
  questionId: number,
  answer: string,
  createdAt: string (ISO date),
  updatedAt: string (ISO date)
}
```

## Response Format

All responses follow this format:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## Notes

- Data is stored in-memory (resets on server restart)
- Tag search is case-insensitive
- Questions can have multiple tags
- Answers are linked to questions via `questionId`
- All timestamps are in ISO 8601 format
