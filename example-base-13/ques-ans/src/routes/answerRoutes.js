const express = require('express');
const router = express.Router();
const answerService = require('../services/answerService');

/**
 * @route   POST /api/answers
 * @desc    Submit an answer for a question
 * @access  Public
 */
router.post('/', (req, res) => {
  try {
    const { questionId, answer } = req.body;
    
    if (!questionId) {
      return res.status(400).json({
        success: false,
        error: 'Question ID is required'
      });
    }

    const newAnswer = answerService.createAnswer(parseInt(questionId), answer);
    res.status(201).json({
      success: true,
      data: newAnswer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @route   GET /api/answers
 * @desc    Get all answers (optional: filter by questionId query param)
 * @access  Public
 */
router.get('/', (req, res) => {
  const { questionId } = req.query;
  
  if (questionId) {
    const answers = answerService.getAnswersByQuestionId(parseInt(questionId));
    return res.json({
      success: true,
      data: answers,
      count: answers.length
    });
  }

  const answers = answerService.getAllAnswers();
  res.json({
    success: true,
    data: answers,
    count: answers.length
  });
});

/**
 * @route   GET /api/answers/:id
 * @desc    Get answer by ID
 * @access  Public
 */
router.get('/:id', (req, res) => {
  const answerId = parseInt(req.params.id);
  const answer = answerService.getAnswerById(answerId);
  
  if (!answer) {
    return res.status(404).json({
      success: false,
      error: 'Answer not found'
    });
  }

  res.json({
    success: true,
    data: answer
  });
});

/**
 * @route   PUT /api/answers/:id
 * @desc    Update an answer
 * @access  Public
 */
router.put('/:id', (req, res) => {
  try {
    const answerId = parseInt(req.params.id);
    const { answer } = req.body;
    
    const updatedAnswer = answerService.updateAnswer(answerId, answer);
    
    if (!updatedAnswer) {
      return res.status(404).json({
        success: false,
        error: 'Answer not found'
      });
    }

    res.json({
      success: true,
      data: updatedAnswer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/answers/:id
 * @desc    Delete an answer
 * @access  Public
 */
router.delete('/:id', (req, res) => {
  const answerId = parseInt(req.params.id);
  const deleted = answerService.deleteAnswer(answerId);
  
  if (!deleted) {
    return res.status(404).json({
      success: false,
      error: 'Answer not found'
    });
  }

  res.json({
    success: true,
    message: 'Answer deleted successfully'
  });
});

module.exports = router;
