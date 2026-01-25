const express = require('express');
const router = express.Router();
const questionService = require('../services/questionService');

/**
 * @route   GET /api/tags/analytics
 * @desc    Get tag usage analytics
 * @access  Public
 */
router.get('/analytics', (req, res) => {
  const analytics = questionService.getTagAnalytics();
  
  // Convert to array format for better readability
  const analyticsArray = Object.entries(analytics)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count); // Sort by count descending

  res.json({
    success: true,
    data: {
      summary: analytics,
      sorted: analyticsArray,
      totalTags: Object.keys(analytics).length,
      totalQuestions: questionService.getAllQuestions().length
    }
  });
});

module.exports = router;
