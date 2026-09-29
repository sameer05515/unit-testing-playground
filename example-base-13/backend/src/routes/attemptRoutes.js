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

/**
 * @swagger
 * /api/attempts:
 *   post:
 *     summary: Create a new test attempt
 *     tags: [Attempts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - testId
 *               - userId
 *             properties:
 *               testId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               userId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439012
 *     responses:
 *       201:
 *         description: Attempt created successfully with random questions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attempt'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Test not found
 */
router.post('/', createAttempt);

/**
 * @swagger
 * /api/attempts/{id}:
 *   get:
 *     summary: Get attempt by ID
 *     tags: [Attempts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Attempt ID
 *     responses:
 *       200:
 *         description: Attempt details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attempt'
 *       404:
 *         description: Attempt not found
 */
router.get('/:id', getAttemptById);

/**
 * @swagger
 * /api/attempts/user/{userId}:
 *   get:
 *     summary: Get all attempts by user
 *     tags: [Attempts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of user attempts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attempt'
 */
router.get('/user/:userId', getAttemptsByUser);

/**
 * @swagger
 * /api/attempts/test/{testId}:
 *   get:
 *     summary: Get all attempts for a test
 *     tags: [Attempts]
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         schema:
 *           type: string
 *         description: Test ID
 *     responses:
 *       200:
 *         description: List of test attempts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attempt'
 */
router.get('/test/:testId', getAttemptsByTest);

/**
 * @swagger
 * /api/attempts/submit-answer:
 *   post:
 *     summary: Submit an answer for a question in an attempt
 *     tags: [Attempts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - attemptId
 *               - questionId
 *               - selectedOption
 *             properties:
 *               attemptId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               questionId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439012
 *               selectedOption:
 *                 type: integer
 *                 minimum: 0
 *                 description: Selected option index (0-based)
 *                 example: 1
 *     responses:
 *       200:
 *         description: Answer submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attempt'
 *       400:
 *         description: Invalid input or attempt already completed
 *       404:
 *         description: Attempt or question not found
 */
router.post('/submit-answer', submitAnswer);

/**
 * @swagger
 * /api/attempts/finish:
 *   post:
 *     summary: Finish and submit an attempt
 *     tags: [Attempts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - attemptId
 *             properties:
 *               attemptId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Attempt finished and scored
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attempt'
 *       400:
 *         description: Invalid input or attempt already completed
 *       404:
 *         description: Attempt not found
 */
router.post('/finish', finishAttempt);

/**
 * @swagger
 * /api/attempts/leaderboard/{testId}:
 *   get:
 *     summary: Get leaderboard for a test
 *     tags: [Attempts]
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         schema:
 *           type: string
 *         description: Test ID
 *     responses:
 *       200:
 *         description: Leaderboard entries sorted by score
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LeaderboardEntry'
 */
router.get('/leaderboard/:testId', getLeaderboard);

export default router;
