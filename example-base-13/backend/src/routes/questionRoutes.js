import express from 'express';
import {
  getAllQuestions,
  getQuestionById,
  getRandomQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../controllers/questionController.js';

const router = express.Router();

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Get all questions
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *         description: Filter by topic
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [easy, medium, hard]
 *         description: Filter by difficulty
 *     responses:
 *       200:
 *         description: List of questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 */
router.get('/', getAllQuestions);

/**
 * @swagger
 * /api/questions/random:
 *   get:
 *     summary: Get random questions
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of random questions to return
 *       - in: query
 *         name: excludeIds
 *         schema:
 *           type: string
 *         description: Comma-separated list of question IDs to exclude
 *     responses:
 *       200:
 *         description: Random questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 */
router.get('/random', getRandomQuestions);

/**
 * @swagger
 * /api/questions/{id}:
 *   get:
 *     summary: Get question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID
 *     responses:
 *       200:
 *         description: Question details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: Question not found
 */
router.get('/:id', getQuestionById);

/**
 * @swagger
 * /api/questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - options
 *               - correctAnswer
 *               - marks
 *             properties:
 *               text:
 *                 type: string
 *                 example: What is 2 + 2?
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 minItems: 2
 *                 example: ['3', '4', '5', '6']
 *               correctAnswer:
 *                 type: integer
 *                 minimum: 0
 *                 example: 1
 *               topic:
 *                 type: string
 *                 example: Math
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *                 example: easy
 *               marks:
 *                 type: integer
 *                 minimum: 1
 *                 example: 1
 *     responses:
 *       201:
 *         description: Question created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       400:
 *         description: Invalid input
 */
router.post('/', createQuestion);

/**
 * @swagger
 * /api/questions/{id}:
 *   put:
 *     summary: Update a question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               correctAnswer:
 *                 type: integer
 *               topic:
 *                 type: string
 *               difficulty:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *               marks:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Question updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: Question not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', updateQuestion);

/**
 * @swagger
 * /api/questions/{id}:
 *   delete:
 *     summary: Delete a question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Question deleted successfully
 *       404:
 *         description: Question not found
 */
router.delete('/:id', deleteQuestion);

export default router;
