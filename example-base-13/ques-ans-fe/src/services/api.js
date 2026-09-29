import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Questions API
export const questionAPI = {
  // Get all questions
  getAll: () => api.get('/questions'),
  
  // Get question by ID with answers
  getById: (id) => api.get(`/questions/${id}`),
  
  // Create question
  create: (question, tags) => {
    const payload = Array.isArray(tags) 
      ? { question, tags } 
      : { question, tag: tags };
    return api.post('/questions', payload);
  },
  
  // Update question
  update: (id, question, tags) => {
    const payload = {};
    if (question) payload.question = question;
    if (tags !== undefined) {
      payload[Array.isArray(tags) ? 'tags' : 'tag'] = tags;
    }
    return api.put(`/questions/${id}`, payload);
  },
  
  // Delete question
  delete: (id) => api.delete(`/questions/${id}`),
  
  // Search by tag
  searchByTag: (tag) => api.get(`/questions/search/tag/${tag}`),
};

// Answers API
export const answerAPI = {
  // Get all answers (optionally filtered by questionId)
  getAll: (questionId) => {
    const url = questionId ? `/answers?questionId=${questionId}` : '/answers';
    return api.get(url);
  },
  
  // Get answer by ID
  getById: (id) => api.get(`/answers/${id}`),
  
  // Create answer
  create: (questionId, answer) => api.post('/answers', { questionId, answer }),
  
  // Update answer
  update: (id, answer) => api.put(`/answers/${id}`, { answer }),
  
  // Delete answer
  delete: (id) => api.delete(`/answers/${id}`),
};

// Tags API
export const tagAPI = {
  // Get tag analytics
  getAnalytics: () => api.get('/tags/analytics'),
};

export default api;
