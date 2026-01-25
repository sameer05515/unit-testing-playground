const Question = require('../models/Question');

// In-memory storage
let questions = [];
let nextQuestionId = 1;

class QuestionService {
  /**
   * Create a new question
   * @param {string} question - The question text
   * @param {string|string[]} tags - Tags for the question
   * @returns {Question} Created question
   */
  createQuestion(question, tags) {
    if (!question || question.trim() === '') {
      throw new Error('Question text is required');
    }

    const newQuestion = new Question(nextQuestionId++, question.trim(), tags);
    questions.push(newQuestion);
    return newQuestion;
  }

  /**
   * Get all questions
   * @returns {Question[]} Array of all questions
   */
  getAllQuestions() {
    return questions;
  }

  /**
   * Get question by ID
   * @param {number} id - Question ID
   * @returns {Question|null} Question or null if not found
   */
  getQuestionById(id) {
    return questions.find(q => q.id === id) || null;
  }

  /**
   * Search questions by tag
   * @param {string} tag - Tag to search for
   * @returns {Question[]} Array of questions with the tag
   */
  searchByTag(tag) {
    if (!tag) return [];
    return questions.filter(q => 
      q.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  /**
   * Update a question
   * @param {number} id - Question ID
   * @param {string} question - Updated question text
   * @param {string|string[]} tags - Updated tags
   * @returns {Question|null} Updated question or null if not found
   */
  updateQuestion(id, question, tags) {
    const questionObj = this.getQuestionById(id);
    if (!questionObj) {
      return null;
    }

    questionObj.update(question, tags);
    return questionObj;
  }

  /**
   * Delete a question
   * @param {number} id - Question ID
   * @returns {boolean} True if deleted, false if not found
   */
  deleteQuestion(id) {
    const index = questions.findIndex(q => q.id === id);
    if (index === -1) {
      return false;
    }
    questions.splice(index, 1);
    return true;
  }

  /**
   * Get all unique tags with usage count
   * @returns {Object} Object with tag as key and count as value
   */
  getTagAnalytics() {
    const tagCounts = {};
    questions.forEach(question => {
      question.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    return tagCounts;
  }
}

module.exports = new QuestionService();
