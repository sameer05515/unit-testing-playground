export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // index of correct option (0-based)
  topic?: string;
  difficulty?: Difficulty;
  marks: number;
}

export interface Test {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  questionLimit: number;
  questionIds: string[];
  createdBy: string;
  createdAt: string;
}

export interface Answer {
  questionId: string;
  selectedOption: number | null;
  isCorrect: boolean;
  marksObtained: number;
}

export type AttemptStatus = 'in_progress' | 'completed';

export interface Attempt {
  id: string;
  testId: string;
  userId: string;
  status: AttemptStatus;
  startedAt: string;
  submittedAt?: string;
  timeTaken?: number; // in seconds
  answers: Answer[];
  totalScore: number;
  questions: Question[]; // snapshot of questions used
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  score: number;
  timeTaken: number;
  rank: number;
}
