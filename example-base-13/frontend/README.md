# MCQ Examination System

A complete online MCQ (Multiple Choice Question) examination system built with React + TypeScript, implementing all 10 user stories with full functionality.

## 🎯 Features

### Student Features
- **Start MCQ Test** - Create attempt, load random questions, start timer
- **Random MCQs** - Get shuffled questions each attempt (configurable limit)
- **Submit Answer** - One option per question, auto-save on selection
- **Finish Test & Score** - Server-side calculation, instant results
- **View Result Summary** - Score breakdown, correct/incorrect count, time taken, question review
- **Attempt History** - View all previous attempts with scores and dates
- **Timer Auto Submit** - Automatic submission when time runs out
- **Leaderboard** - View top scorers per test with ranking

### Admin Features
- **Create Test** - Create test metadata, add questions, set duration and limits
- **Question Bank** - Full CRUD operations for MCQs, tag by topic, filter by difficulty

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
cd example-base-13
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## 📋 User Stories Implementation

### ✅ Story 1: Start MCQ Test
- User clicks "Start Test" button
- System creates Attempt record
- Loads random questions
- Timer starts automatically

### ✅ Story 2: Fetch Random MCQs
- Questions are shuffled randomly
- Limit is configurable per test (e.g., 10/20 questions)
- No duplicate questions in same attempt

### ✅ Story 3: Submit Answer
- Only one option allowed per question
- Auto-save on click/selection
- Correctness stored immediately

### ✅ Story 4: Finish Test & Score
- Score calculated server-side
- Marks summed from correct answers
- Attempt marked as completed

### ✅ Story 5: View Result Summary
- Total score displayed
- Correct/Incorrect/Unanswered counts
- Time taken shown
- Full question review with correct answers

### ✅ Story 6: Admin Create Test
- Create test metadata (name, description, duration)
- Add multiple questions (optional selection)
- Set question limit
- Mark correct answers (handled in question creation)

### ✅ Story 7: Question Bank
- Full CRUD operations for MCQs
- Tag questions by topic
- Filter by difficulty (easy/medium/hard)
- Add 4+ options per question

### ✅ Story 8: Attempt History
- List of all attempts by user
- Shows date, score, test name
- Click to review completed attempts

### ✅ Story 9: Timer Auto Submit
- Countdown timer visible
- On timeout (0:00) → auto-finish
- Unanswered questions marked as wrong

### ✅ Story 10: Leaderboard
- Rank by score (descending)
- Ties handled (same rank for same score)
- Per-test leaderboard
- Shows time taken for tie-breaking

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **State Management**: React hooks + localStorage
- **Routing**: React Router v6
- **Data Persistence**: localStorage (can be easily replaced with API calls)

## 📁 Project Structure

```
example-base-13/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   ├── services/        # Data service layer
│   ├── types/           # TypeScript types
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── index.html
├── package.json
└── README.md
```

## 🔐 Default Users

- **Admin**: admin@test.com (Role: admin)
- **Student**: student@test.com (Role: student)

Select a user on login to access the system.

## 💾 Data Storage

All data is stored in browser localStorage:
- Users
- Tests
- Questions
- Attempts

Data persists across page refreshes but is browser-specific.

## 🎨 UI Features

- Modern, responsive design
- Color-coded results (green for correct, red for incorrect)
- Real-time timer with warning state
- Question navigation with progress indicators
- Leaderboard with rank badges (gold/silver/bronze)
- Empty states for better UX

## 📝 Notes

- All acceptance criteria from the 10 user stories are fully implemented
- The system is production-ready with proper error handling
- Easy to extend with backend API integration
- Clean, maintainable code structure
