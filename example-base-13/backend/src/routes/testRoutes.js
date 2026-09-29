import express from 'express';
import {
  getAllTests,
  getTestById,
  createTest,
  updateTest,
  deleteTest,
} from '../controllers/testController.js';

const router = express.Router();

/**
 * @swagger
 * /api/tests:
 *   get:
 *     summary: Get all tests
 *     tags: [Tests]
 *     responses:
 *       200:
 *         description: List of all tests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Test'
 */
router.get('/', getAllTests);

/**
 * @swagger
 * /api/tests/{id}:
 *   get:
 *     summary: Get test by ID
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Test ID
 *     responses:
 *       200:
 *         description: Test details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *       404:
 *         description: Test not found
 */
router.get('/:id', getTestById);

/**
 * @swagger
 * /api/tests:
 *   post:
 *     summary: Create a new test
 *     tags: [Tests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - duration
 *               - questionLimit
 *               - createdBy
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mathematics Quiz
 *               description:
 *                 type: string
 *                 example: Basic mathematics questions
 *               duration:
 *                 type: integer
 *                 minimum: 1
 *                 example: 30
 *               questionLimit:
 *                 type: integer
 *                 minimum: 1
 *                 example: 10
 *               questionIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Optional specific question IDs
 *                 example: []
 *               createdBy:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *     responses:
 *       201:
 *         description: Test created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *       400:
 *         description: Invalid input
 */
router.post('/', createTest);

/**
 * @swagger
 * /api/tests/{id}:
 *   put:
 *     summary: Update a test
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Test ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: integer
 *               questionLimit:
 *                 type: integer
 *               questionIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Test updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *       404:
 *         description: Test not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', updateTest);

/**
 * @swagger
 * /api/tests/{id}:
 *   delete:
 *     summary: Delete a test
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Test ID
 *     responses:
 *       200:
 *         description: Test deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Test deleted successfully
 *       404:
 *         description: Test not found
 */
router.delete('/:id', deleteTest);

export default router;
