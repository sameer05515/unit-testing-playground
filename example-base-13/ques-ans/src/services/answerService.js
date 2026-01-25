const Answer = require('../models/Answer');
const questionService = require('./questionService');

// In-memory storage
let answers = [];
let nextAnswerId = 1;

class AnswerService {
  /**
   * Create a new answer for a question
   * @param {number} questionId - ID of the question
   * @param {string} answer - The answer text
   * @returns {Answer} Created answer
   */
  createAnswer(questionId, answer) {
    if (!answer || answer.trim() === '') {
      throw new Error('Answer text is required');
    }

    // Verify question exists
    const question = questionService.getQuestionById(questionId);
    if (!question) {
      throw new Error('Question not found');
    }

    const newAnswer = new Answer(nextAnswerId++, questionId, answer.trim());
    answers.push(newAnswer);
    return newAnswer;
  }

  /**
   * Get all answers for a question
   * @param {number} questionId - Question ID
   * @returns {Answer[]} Array of answers for the question
   */
  getAnswersByQuestionId(questionId) {
    return answers.filter(a => a.questionId === questionId);
  }

  /**
   * Get answer by ID
   * @param {number} id - Answer ID
   * @returns {Answer|null} Answer or null if not found
   */
  getAnswerById(id) {
    return answers.find(a => a.id === id) || null;
  }

  /**
   * Update an answer
   * @param {number} id - Answer ID
   * @param {string} answer - Updated answer text
   * @returns {Answer|null} Updated answer or null if not found
   */
  updateAnswer(id, answer) {
    const answerObj = this.getAnswerById(id);
    if (!answerObj) {
      return null;
    }

    if (!answer || answer.trim() === '') {
      throw new Error('Answer text is required');
    }

    answerObj.update(answer.trim());
    return answerObj;
  }

  /**
   * Delete an answer
   * @param {number} id - Answer ID
   * @returns {boolean} True if deleted, false if not found
   */
  deleteAnswer(id) {
    const index = answers.findIndex(a => a.id === id);
    if (index === -1) {
      return false;
    }
    answers.splice(index, 1);
    return true;
  }

  /**
   * Get all answers (for admin purposes)
   * @returns {Answer[]} Array of all answers
   */
  getAllAnswers() {
    return answers;
  }
}

module.exports = new AnswerService();
