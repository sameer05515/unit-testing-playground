const express = require('express');
const router = express.Router();
const questionService = require('../services/questionService');
const answerService = require('../services/answerService');

/**
 * @route   POST /api/questions
 * @desc    Create a new question
 * @access  Public
 */
router.post('/', (req, res) => {
  try {
    const { question, tag, tags } = req.body;
    
    // Support both 'tag' (single) and 'tags' (array) for flexibility
    const questionTags = tags || (tag ? [tag] : []);
    
    const newQuestion = questionService.createQuestion(question, questionTags);
    res.status(201).json({
      success: true,
      data: newQuestion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @route   GET /api/questions
 * @desc    Get all questions
 * @access  Public
 */
router.get('/', (req, res) => {
  const questions = questionService.getAllQuestions();
  res.json({
    success: true,
    data: questions,
    count: questions.length
  });
});

/**
 * @route   GET /api/questions/:id
 * @desc    Get question by ID with all answers
 * @access  Public
 */
router.get('/:id', (req, res) => {
  const questionId = parseInt(req.params.id);
  const question = questionService.getQuestionById(questionId);
  
  if (!question) {
    return res.status(404).json({
      success: false,
      error: 'Question not found'
    });
  }

  const answers = answerService.getAnswersByQuestionId(questionId);
  
  res.json({
    success: true,
    data: {
      ...question,
      answers: answers
    }
  });
});

/**
 * @route   GET /api/questions/search/tag/:tag
 * @desc    Search questions by tag
 * @access  Public
 */
router.get('/search/tag/:tag', (req, res) => {
  const tag = req.params.tag;
  const questions = questionService.searchByTag(tag);
  
  res.json({
    success: true,
    data: questions,
    count: questions.length,
    tag: tag
  });
});

/**
 * @route   PUT /api/questions/:id
 * @desc    Update a question
 * @access  Public
 */
router.put('/:id', (req, res) => {
  try {
    const questionId = parseInt(req.params.id);
    const { question, tag, tags } = req.body;
    
    // Support both 'tag' (single) and 'tags' (array)
    const questionTags = tags !== undefined ? tags : (tag !== undefined ? [tag] : undefined);
    
    const updatedQuestion = questionService.updateQuestion(questionId, question, questionTags);
    
    if (!updatedQuestion) {
      return res.status(404).json({
        success: false,
        error: 'Question not found'
      });
    }

    res.json({
      success: true,
      data: updatedQuestion
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/questions/:id
 * @desc    Delete a question
 * @access  Public
 */
router.delete('/:id', (req, res) => {
  const questionId = parseInt(req.params.id);
  const deleted = questionService.deleteQuestion(questionId);
  
  if (!deleted) {
    return res.status(404).json({
      success: false,
      error: 'Question not found'
    });
  }

  res.json({
    success: true,
    message: 'Question deleted successfully'
  });
});

module.exports = router;
