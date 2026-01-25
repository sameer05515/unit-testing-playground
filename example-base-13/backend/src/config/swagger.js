import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MCQ Examination System API',
      version: '1.0.0',
      description: 'RESTful API for Online MCQ Examination System with MongoDB backend',
      contact: {
        name: 'API Support',
        email: 'support@mcqsystem.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://api.mcqsystem.com',
        description: 'Production server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'role'],
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
              example: '507f1f77bcf86cd799439011',
            },
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.doe@example.com',
            },
            role: {
              type: 'string',
              enum: ['student', 'admin'],
              description: 'User role',
              example: 'student',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation date',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update date',
            },
          },
        },
        Question: {
          type: 'object',
          required: ['text', 'options', 'correctAnswer', 'marks'],
          properties: {
            _id: {
              type: 'string',
              description: 'Question ID',
              example: '507f1f77bcf86cd799439011',
            },
            text: {
              type: 'string',
              description: 'Question text',
              example: 'What is 2 + 2?',
            },
            options: {
              type: 'array',
              items: {
                type: 'string',
              },
              minItems: 2,
              description: 'Answer options',
              example: ['3', '4', '5', '6'],
            },
            correctAnswer: {
              type: 'integer',
              minimum: 0,
              description: 'Index of correct answer (0-based)',
              example: 1,
            },
            topic: {
              type: 'string',
              description: 'Question topic/category',
              example: 'Math',
            },
            difficulty: {
              type: 'string',
              enum: ['easy', 'medium', 'hard'],
              description: 'Question difficulty level',
              example: 'easy',
            },
            marks: {
              type: 'integer',
              minimum: 1,
              description: 'Marks awarded for correct answer',
              example: 1,
            },
          },
        },
        Test: {
          type: 'object',
          required: ['name', 'description', 'duration', 'questionLimit', 'createdBy'],
          properties: {
            _id: {
              type: 'string',
              description: 'Test ID',
              example: '507f1f77bcf86cd799439011',
            },
            name: {
              type: 'string',
              description: 'Test name',
              example: 'Mathematics Quiz',
            },
            description: {
              type: 'string',
              description: 'Test description',
              example: 'Basic mathematics questions',
            },
            duration: {
              type: 'integer',
              minimum: 1,
              description: 'Test duration in minutes',
              example: 30,
            },
            questionLimit: {
              type: 'integer',
              minimum: 1,
              description: 'Number of questions to show per attempt',
              example: 10,
            },
            questionIds: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Optional: Specific question IDs to use (if empty, random questions are selected)',
              example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'],
            },
            createdBy: {
              type: 'string',
              description: 'ID of user who created the test',
              example: '507f1f77bcf86cd799439011',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Test creation date',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update date',
            },
          },
        },
        Answer: {
          type: 'object',
          properties: {
            questionId: {
              type: 'string',
              description: 'Question ID',
              example: '507f1f77bcf86cd799439011',
            },
            selectedOption: {
              type: 'integer',
              nullable: true,
              description: 'Selected option index (null if unanswered)',
              example: 1,
            },
            isCorrect: {
              type: 'boolean',
              description: 'Whether the answer is correct',
              example: true,
            },
            marksObtained: {
              type: 'number',
              description: 'Marks obtained for this answer',
              example: 1,
            },
          },
        },
        Attempt: {
          type: 'object',
          required: ['testId', 'userId'],
          properties: {
            _id: {
              type: 'string',
              description: 'Attempt ID',
              example: '507f1f77bcf86cd799439011',
            },
            testId: {
              type: 'string',
              description: 'Test ID',
              example: '507f1f77bcf86cd799439011',
            },
            userId: {
              type: 'string',
              description: 'User ID',
              example: '507f1f77bcf86cd799439011',
            },
            status: {
              type: 'string',
              enum: ['in_progress', 'completed'],
              description: 'Attempt status',
              example: 'in_progress',
            },
            startedAt: {
              type: 'string',
              format: 'date-time',
              description: 'When the attempt was started',
            },
            submittedAt: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'When the attempt was submitted',
            },
            timeTaken: {
              type: 'integer',
              nullable: true,
              description: 'Time taken in seconds',
              example: 600,
            },
            answers: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Answer',
              },
              description: 'Array of answers',
            },
            totalScore: {
              type: 'number',
              description: 'Total score obtained',
              example: 8,
            },
            questions: {
              type: 'array',
              items: {
                type: 'object',
                description: 'Snapshot of questions used in this attempt',
              },
              description: 'Questions used in this attempt',
            },
          },
        },
        LeaderboardEntry: {
          type: 'object',
          properties: {
            userId: {
              type: 'string',
              description: 'User ID',
              example: '507f1f77bcf86cd799439011',
            },
            userName: {
              type: 'string',
              description: 'User name',
              example: 'John Doe',
            },
            score: {
              type: 'number',
              description: 'Total score',
              example: 10,
            },
            timeTaken: {
              type: 'integer',
              description: 'Time taken in seconds',
              example: 300,
            },
            rank: {
              type: 'integer',
              description: 'Rank position',
              example: 1,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
              example: 'Resource not found',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Users',
        description: 'User management endpoints',
      },
      {
        name: 'Questions',
        description: 'Question bank management endpoints',
      },
      {
        name: 'Tests',
        description: 'Test management endpoints',
      },
      {
        name: 'Attempts',
        description: 'Test attempt endpoints',
      },
      {
        name: 'Health',
        description: 'Health check endpoint',
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js', './src/server.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'MCQ System API Documentation',
};

export { swaggerSpec, swaggerUi, swaggerUiOptions };
