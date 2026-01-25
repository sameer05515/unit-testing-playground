// This file is replaced by apiService.ts
// Re-exporting from apiService for backward compatibility
export * from './apiService';

const STORAGE_KEYS = {
  USERS: 'mcq_users',
  TESTS: 'mcq_tests',
  QUESTIONS: 'mcq_questions',
  ATTEMPTS: 'mcq_attempts',
  CURRENT_USER: 'mcq_current_user',
};

// Initialize default data
function initializeData() {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const defaultUsers: User[] = [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@test.com',
        role: 'admin',
      },
      {
        id: '2',
        name: 'Student User',
        email: 'student@test.com',
        role: 'student',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.QUESTIONS)) {
    const defaultQuestions: Question[] = [
      {
        id: 'q1',
        text: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correctAnswer: 1,
        topic: 'Math',
        difficulty: 'easy',
        marks: 1,
      },
      {
        id: 'q2',
        text: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 2,
        topic: 'Geography',
        difficulty: 'easy',
        marks: 1,
      },
      {
        id: 'q3',
        text: 'Which is a prime number?',
        options: ['4', '6', '7', '8'],
        correctAnswer: 2,
        topic: 'Math',
        difficulty: 'medium',
        marks: 2,
      },
      {
        id: 'q4',
        text: 'What is React?',
        options: ['A database', 'A JavaScript library', 'A programming language', 'An operating system'],
        correctAnswer: 1,
        topic: 'Programming',
        difficulty: 'easy',
        marks: 1,
      },
      {
        id: 'q5',
        text: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        correctAnswer: 1,
        topic: 'Programming',
        difficulty: 'hard',
        marks: 3,
      },
    ];
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(defaultQuestions));
  }

  if (!localStorage.getItem(STORAGE_KEYS.TESTS)) {
    const defaultTests: Test[] = [
      {
        id: 't1',
        name: 'Sample Math Test',
        description: 'Basic mathematics questions',
        duration: 10,
        questionLimit: 3,
        questionIds: ['q1', 'q3'],
        createdBy: '1',
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(defaultTests));
  }
}

initializeData();

// Helper functions
function getFromStorage<T>(key: string): T[] {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function saveToStorage<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// User Service
export const userService = {
  getCurrentUser(): User | null {
    const userId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!userId) return null;
    const users = getFromStorage<User>(STORAGE_KEYS.USERS);
    return users.find((u) => u.id === userId) || null;
  },

  setCurrentUser(userId: string): void {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, userId);
  },

  getAllUsers(): User[] {
    return getFromStorage<User>(STORAGE_KEYS.USERS);
  },
};

// Question Service
export const questionService = {
  getAll(): Question[] {
    return getFromStorage<Question>(STORAGE_KEYS.QUESTIONS);
  },

  getById(id: string): Question | undefined {
    return this.getAll().find((q) => q.id === id);
  },

  getRandom(limit: number, excludeIds: string[] = []): Question[] {
    const all = this.getAll().filter((q) => !excludeIds.includes(q.id));
    const shuffled = [...all].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  },

  getByTopic(topic: string): Question[] {
    return this.getAll().filter((q) => q.topic === topic);
  },

  getByDifficulty(difficulty: Difficulty): Question[] {
    return this.getAll().filter((q) => q.difficulty === difficulty);
  },

  create(question: Omit<Question, 'id'>): Question {
    const questions = this.getAll();
    const newQuestion: Question = {
      ...question,
      id: `q${Date.now()}`,
    };
    questions.push(newQuestion);
    saveToStorage(STORAGE_KEYS.QUESTIONS, questions);
    return newQuestion;
  },

  update(id: string, updates: Partial<Question>): Question | null {
    const questions = this.getAll();
    const index = questions.findIndex((q) => q.id === id);
    if (index === -1) return null;
    questions[index] = { ...questions[index], ...updates };
    saveToStorage(STORAGE_KEYS.QUESTIONS, questions);
    return questions[index];
  },

  delete(id: string): boolean {
    const questions = this.getAll();
    const filtered = questions.filter((q) => q.id !== id);
    if (filtered.length === questions.length) return false;
    saveToStorage(STORAGE_KEYS.QUESTIONS, filtered);
    return true;
  },
};

// Test Service
export const testService = {
  getAll(): Test[] {
    return getFromStorage<Test>(STORAGE_KEYS.TESTS);
  },

  getById(id: string): Test | undefined {
    return this.getAll().find((t) => t.id === id);
  },

  create(test: Omit<Test, 'id' | 'createdAt'>): Test {
    const tests = this.getAll();
    const newTest: Test = {
      ...test,
      id: `t${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    tests.push(newTest);
    saveToStorage(STORAGE_KEYS.TESTS, tests);
    return newTest;
  },

  update(id: string, updates: Partial<Test>): Test | null {
    const tests = this.getAll();
    const index = tests.findIndex((t) => t.id === id);
    if (index === -1) return null;
    tests[index] = { ...tests[index], ...updates };
    saveToStorage(STORAGE_KEYS.TESTS, tests);
    return tests[index];
  },

  delete(id: string): boolean {
    const tests = this.getAll();
    const filtered = tests.filter((t) => t.id !== id);
    if (filtered.length === tests.length) return false;
    saveToStorage(STORAGE_KEYS.TESTS, filtered);
    return true;
  },
};

// Attempt Service
export const attemptService = {
  getAll(): Attempt[] {
    return getFromStorage<Attempt>(STORAGE_KEYS.ATTEMPTS);
  },

  getById(id: string): Attempt | undefined {
    return this.getAll().find((a) => a.id === id);
  },

  getByUserId(userId: string): Attempt[] {
    return this.getAll()
      .filter((a) => a.userId === userId)
      .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
  },

  getByTestId(testId: string): Attempt[] {
    return this.getAll().filter((a) => a.testId === testId);
  },

  create(testId: string, userId: string, questions: Question[]): Attempt {
    const attempts = this.getAll();
    const newAttempt: Attempt = {
      id: `a${Date.now()}`,
      testId,
      userId,
      status: 'in_progress',
      startedAt: new Date().toISOString(),
      answers: questions.map((q) => ({
        questionId: q.id,
        selectedOption: null,
        isCorrect: false,
        marksObtained: 0,
      })),
      totalScore: 0,
      questions,
    };
    attempts.push(newAttempt);
    saveToStorage(STORAGE_KEYS.ATTEMPTS, attempts);
    return newAttempt;
  },

  submitAnswer(attemptId: string, questionId: string, selectedOption: number): Attempt | null {
    const attempts = this.getAll();
    const attempt = attempts.find((a) => a.id === attemptId);
    if (!attempt || attempt.status === 'completed') return null;

    const question = attempt.questions.find((q) => q.id === questionId);
    if (!question) return null;

    const answerIndex = attempt.answers.findIndex((a) => a.questionId === questionId);
    if (answerIndex === -1) return null;

    const isCorrect = selectedOption === question.correctAnswer;
    const marksObtained = isCorrect ? question.marks : 0;

    attempt.answers[answerIndex] = {
      questionId,
      selectedOption,
      isCorrect,
      marksObtained,
    };

    saveToStorage(STORAGE_KEYS.ATTEMPTS, attempts);
    return attempt;
  },

  finish(attemptId: string): Attempt | null {
    const attempts = this.getAll();
    const attempt = attempts.find((a) => a.id === attemptId);
    if (!attempt || attempt.status === 'completed') return null;

    // Mark unanswered questions as wrong
    attempt.answers.forEach((answer, index) => {
      if (answer.selectedOption === null) {
        answer.isCorrect = false;
        answer.marksObtained = 0;
      }
    });

    // Calculate total score
    attempt.totalScore = attempt.answers.reduce((sum, a) => sum + a.marksObtained, 0);

    attempt.status = 'completed';
    attempt.submittedAt = new Date().toISOString();
    const started = new Date(attempt.startedAt).getTime();
    const submitted = new Date(attempt.submittedAt).getTime();
    attempt.timeTaken = Math.floor((submitted - started) / 1000);

    saveToStorage(STORAGE_KEYS.ATTEMPTS, attempts);
    return attempt;
  },
};

// Leaderboard Service
export const leaderboardService = {
  getByTestId(testId: string): LeaderboardEntry[] {
    const attempts = attemptService.getByTestId(testId);
    const users = userService.getAll();
    const completed = attempts.filter((a) => a.status === 'completed');

    const entries: LeaderboardEntry[] = completed.map((attempt) => {
      const user = users.find((u) => u.id === attempt.userId);
      return {
        userId: attempt.userId,
        userName: user?.name || 'Unknown',
        score: attempt.totalScore,
        timeTaken: attempt.timeTaken || 0,
        rank: 0, // will be set after sorting
      };
    });

    // Sort by score (desc), then by time (asc for faster completion)
    entries.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeTaken - b.timeTaken;
    });

    // Assign ranks (handle ties)
    let currentRank = 1;
    entries.forEach((entry, index) => {
      if (index > 0 && entries[index - 1].score === entry.score) {
        entry.rank = entries[index - 1].rank;
      } else {
        entry.rank = currentRank;
      }
      currentRank++;
    });

    return entries;
  },
};
