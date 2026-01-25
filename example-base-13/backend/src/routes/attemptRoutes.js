import express from 'express';
import {
  createAttempt,
  getAttemptById,
  getAttemptsByUser,
  getAttemptsByTest,
  submitAnswer,
  finishAttempt,
  getLeaderboard,
} from '../controllers/attemptController.js';

const router = express.Router();

router.post('/', createAttempt);
router.get('/:id', getAttemptById);
router.get('/user/:userId', getAttemptsByUser);
router.get('/test/:testId', getAttemptsByTest);
router.post('/submit-answer', submitAnswer);
router.post('/finish', finishAttempt);
router.get('/leaderboard/:testId', getLeaderboard);

export default router;
