import type {
  User,
  Test,
  Question,
  Attempt,
  LeaderboardEntry,
  Difficulty,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// User Service
export const userService = {
  async getCurrentUser(): Promise<User | null> {
    const userId = localStorage.getItem('mcq_current_user');
    if (!userId) return null;
    try {
      return await apiCall<User>(`/users/${userId}`);
    } catch {
      return null;
    }
  },

  setCurrentUser(userId: string): void {
    localStorage.setItem('mcq_current_user', userId);
  },

  async getAllUsers(): Promise<User[]> {
    return apiCall<User[]>('/users');
  },
};

// Question Service
export const questionService = {
  async getAll(topic?: string, difficulty?: Difficulty): Promise<Question[]> {
    const params = new URLSearchParams();
    if (topic) params.append('topic', topic);
    if (difficulty) params.append('difficulty', difficulty);
    const query = params.toString();
    return apiCall<Question[]>(`/questions${query ? `?${query}` : ''}`);
  },

  async getById(id: string): Promise<Question | undefined> {
    try {
      return await apiCall<Question>(`/questions/${id}`);
    } catch {
      return undefined;
    }
  },

  async getRandom(limit: number, excludeIds: string[] = []): Promise<Question[]> {
    const params = new URLSearchParams();
    params.append('limit', limit.toString());
    if (excludeIds.length > 0) {
      params.append('excludeIds', excludeIds.join(','));
    }
    return apiCall<Question[]>(`/questions/random?${params.toString()}`);
  },

  async getByTopic(topic: string): Promise<Question[]> {
    return this.getAll(topic);
  },

  async getByDifficulty(difficulty: Difficulty): Promise<Question[]> {
    return this.getAll(undefined, difficulty);
  },

  async create(question: Omit<Question, 'id'>): Promise<Question> {
    return apiCall<Question>('/questions', {
      method: 'POST',
      body: JSON.stringify(question),
    });
  },

  async update(id: string, updates: Partial<Question>): Promise<Question | null> {
    try {
      return await apiCall<Question>(`/questions/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    } catch {
      return null;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      await apiCall(`/questions/${id}`, {
        method: 'DELETE',
      });
      return true;
    } catch {
      return false;
    }
  },
};

// Test Service
export const testService = {
  async getAll(): Promise<Test[]> {
    return apiCall<Test[]>('/tests');
  },

  async getById(id: string): Promise<Test | undefined> {
    try {
      return await apiCall<Test>(`/tests/${id}`);
    } catch {
      return undefined;
    }
  },

  async create(test: Omit<Test, 'id' | 'createdAt'>): Promise<Test> {
    return apiCall<Test>('/tests', {
      method: 'POST',
      body: JSON.stringify(test),
    });
  },

  async update(id: string, updates: Partial<Test>): Promise<Test | null> {
    try {
      return await apiCall<Test>(`/tests/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    } catch {
      return null;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      await apiCall(`/tests/${id}`, {
        method: 'DELETE',
      });
      return true;
    } catch {
      return false;
    }
  },
};

// Attempt Service
export const attemptService = {
  async getAll(): Promise<Attempt[]> {
    // Not typically needed, but kept for compatibility
    return [];
  },

  async getById(id: string): Promise<Attempt | undefined> {
    try {
      return await apiCall<Attempt>(`/attempts/${id}`);
    } catch {
      return undefined;
    }
  },

  async getByUserId(userId: string): Promise<Attempt[]> {
    return apiCall<Attempt[]>(`/attempts/user/${userId}`);
  },

  async getByTestId(testId: string): Promise<Attempt[]> {
    return apiCall<Attempt[]>(`/attempts/test/${testId}`);
  },

  async create(testId: string, userId: string, questions?: Question[]): Promise<Attempt> {
    return apiCall<Attempt>('/attempts', {
      method: 'POST',
      body: JSON.stringify({ testId, userId }),
    });
  },

  async submitAnswer(
    attemptId: string,
    questionId: string,
    selectedOption: number
  ): Promise<Attempt | null> {
    try {
      return await apiCall<Attempt>('/attempts/submit-answer', {
        method: 'POST',
        body: JSON.stringify({ attemptId, questionId, selectedOption }),
      });
    } catch {
      return null;
    }
  },

  async finish(attemptId: string): Promise<Attempt | null> {
    try {
      return await apiCall<Attempt>('/attempts/finish', {
        method: 'POST',
        body: JSON.stringify({ attemptId }),
      });
    } catch {
      return null;
    }
  },
};

// Leaderboard Service
export const leaderboardService = {
  async getByTestId(testId: string): Promise<LeaderboardEntry[]> {
    return apiCall<LeaderboardEntry[]>(`/attempts/leaderboard/${testId}`);
  },
};
