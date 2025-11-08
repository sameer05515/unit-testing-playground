const express = require("express");
const { query, param } = require("express-validator");
const path = require("path");

const FileRelatedOperations = require("../../common/FileRelatedOperations.services.v2");
const fileCache = require("../../common/FileCache");
const JsonOptimizer = require("../../common/JsonOptimizer");
const asyncHandler = require("../../middleware/asyncHandler");
const { validate } = require("../../middleware/validation");
const prepareErrorMessage = require("../../common/prepareErrorMessage");

/**
 * @swagger
 * tags:
 *   name: ChatData
 *   description: Chat data and conversation endpoints with pagination
 */

const router = express.Router();

// Snapshot file mappings - use relative paths from public directory
const getSnapshotPath = (version) => {
  const snapshotMap = {
    v1: "/data/vandana-chatgpt-08-feb-2025-conversations.json",
    v2: "/data/prem-conversations-08-Feb-2025.json",
    v3: "/data/prem-conversations-10-Mar-2025.json",
    v4: "/data/prem-conversations-30-Apr-2025.json",
    v5: "/data/prem-conversations-30-May-2025.json",
  };
  return snapshotMap[version] ? path.join(__dirname, "../../../public", snapshotMap[version]) : null;
};

const SNAPSHOT_FILES = {
  v1: getSnapshotPath('v1'),
  v2: getSnapshotPath('v2'),
  v3: getSnapshotPath('v3'),
  v4: getSnapshotPath('v4'),
  v5: getSnapshotPath('v5'),
};

/**
 * @swagger
 * /api/chat-data/snapshots:
 *   get:
 *     summary: Get list of available snapshots
 *     tags: [ChatData]
 *     responses:
 *       200:
 *         description: List of available snapshots
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 snapshots:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       version:
 *                         type: string
 *                         example: "v1"
 *                       file:
 *                         type: string
 *                         example: "prem-conversations-08-Feb-2025.json"
 *                       exists:
 *                         type: boolean
 *                         example: true
 */
router.get("/snapshots", asyncHandler(async (req, res) => {
  const snapshots = Object.keys(SNAPSHOT_FILES).map(version => ({
    version,
    file: path.basename(SNAPSHOT_FILES[version]),
    exists: FileRelatedOperations.fileExists(SNAPSHOT_FILES[version]),
  }));

  res.json({ snapshots });
}));

/**
 * @swagger
 * /api/chat-data/snapshots/{snapshot}/conversations:
 *   get:
 *     summary: Get paginated list of conversations for a snapshot
 *     tags: [ChatData]
 *     parameters:
 *       - in: path
 *         name: snapshot
 *         required: true
 *         schema:
 *           type: string
 *           enum: [v1, v2, v3, v4, v5]
 *         description: Snapshot version
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Page number (0-indexed)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Paginated conversations list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 conversations:
 *                   type: array
 *                   items:
 *                     type: object
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
/**
 * Get conversations list with pagination
 */
const validateSnapshotList = [
  param('snapshot').isIn(Object.keys(SNAPSHOT_FILES)).withMessage('Invalid snapshot version'),
  query('page').optional().isInt({ min: 0 }).withMessage('Page must be a non-negative integer'),
  query('pageSize').optional().isInt({ min: 1, max: 100 }).withMessage('Page size must be between 1 and 100'),
  validate
];

router.get("/snapshots/:snapshot/conversations", validateSnapshotList, asyncHandler(async (req, res) => {
  const { snapshot } = req.params;
  const page = parseInt(req.query.page) || 0;
  const pageSize = parseInt(req.query.pageSize) || 50;

  const filePath = SNAPSHOT_FILES[snapshot];
  if (!FileRelatedOperations.fileExists(filePath)) {
    throw new Error(`Snapshot file not found: ${snapshot}`);
  }

  // Use cache to get conversations
  const conversations = await fileCache.getOrSet(
    `conversations:${snapshot}`,
    async () => {
      const data = await JsonOptimizer.readJsonFile(filePath);
      if (!JsonOptimizer.validateJsonStructure(data, 'array')) {
        throw new Error('Invalid conversation data structure');
      }
      return data.map((conv, index) => ({
        id: conv.id || conv.conversation_id,
        index,
        title: conv.title,
        create_time: conv.create_time,
        update_time: conv.update_time,
        message_count: conv.mapping ? Object.keys(conv.mapping).length : 0,
      }));
    }
  );

  // Paginate
  const start = page * pageSize;
  const end = start + pageSize;
  const paginated = conversations.slice(start, end);

  res.json({
    conversations: paginated,
    pagination: {
      page,
      pageSize,
      total: conversations.length,
      totalPages: Math.ceil(conversations.length / pageSize),
      hasNext: end < conversations.length,
      hasPrev: page > 0,
    },
  });
}));

/**
 * Get messages for a specific conversation with pagination
 */
const validateMessages = [
  param('snapshot').isIn(Object.keys(SNAPSHOT_FILES)).withMessage('Invalid snapshot version'),
  param('conversationId').notEmpty().withMessage('Conversation ID is required'),
  query('page').optional().isInt({ min: 0 }).withMessage('Page must be a non-negative integer'),
  query('pageSize').optional().isInt({ min: 1, max: 100 }).withMessage('Page size must be between 1 and 100'),
  validate
];

router.get("/snapshots/:snapshot/conversations/:conversationId/messages", validateMessages, asyncHandler(async (req, res) => {
  const { snapshot, conversationId } = req.params;
  const page = parseInt(req.query.page) || 0;
  const pageSize = parseInt(req.query.pageSize) || 20;

  const filePath = SNAPSHOT_FILES[snapshot];
  if (!FileRelatedOperations.fileExists(filePath)) {
    throw new Error(`Snapshot file not found: ${snapshot}`);
  }

  // Get conversation data
  const conversations = await fileCache.getOrSet(
    `conversations:${snapshot}`,
    async () => {
      return await JsonOptimizer.readJsonFile(filePath);
    }
  );

  // Find conversation
  const conversation = conversations.find(
    conv => (conv.id || conv.conversation_id) === conversationId
  );

  if (!conversation) {
    throw new Error(`Conversation not found: ${conversationId}`);
  }

  // Extract messages
  const messages = extractMessages(conversation);
  
  // Paginate messages
  const start = page * pageSize;
  const end = start + pageSize;
  const paginated = messages.slice(start, end);

  res.json({
    conversation: {
      id: conversation.id || conversation.conversation_id,
      title: conversation.title,
      create_time: conversation.create_time,
      update_time: conversation.update_time,
    },
    messages: paginated,
    pagination: {
      page,
      pageSize,
      total: messages.length,
      totalPages: Math.ceil(messages.length / pageSize),
      hasNext: end < messages.length,
      hasPrev: page > 0,
    },
  });
}));

/**
 * Extract messages from conversation object
 */
function extractMessages(conversation) {
  const messages = [];
  
  if (!conversation.mapping) {
    return messages;
  }

  // Get root node
  const rootNodeId = conversation.current_node || Object.keys(conversation.mapping)[0];
  const visited = new Set();

  function traverse(nodeId) {
    if (!nodeId || visited.has(nodeId) || !conversation.mapping[nodeId]) {
      return;
    }

    visited.add(nodeId);
    const node = conversation.mapping[nodeId];

    if (node.message) {
      messages.push({
        id: nodeId,
        author: node.message.author?.role || 'unknown',
        content: node.message.content?.parts?.[0] || node.message.content || '',
        create_time: node.message.create_time,
      });
    }

    // Traverse children
    if (node.children) {
      node.children.forEach(childId => traverse(childId));
    }
  }

  traverse(rootNodeId);
  return messages;
}

/**
 * @swagger
 * /api/chat-data/cache/stats:
 *   get:
 *     summary: Get cache statistics
 *     tags: [ChatData]
 *     description: Returns cache hit/miss statistics for monitoring
 *     responses:
 *       200:
 *         description: Cache statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hits:
 *                   type: integer
 *                   example: 150
 *                 misses:
 *                   type: integer
 *                   example: 50
 *                 sets:
 *                   type: integer
 *                   example: 50
 *                 size:
 *                   type: integer
 *                   example: 25
 *                 hitRate:
 *                   type: string
 *                   example: "75.00%"
 */
router.get("/cache/stats", (req, res) => {
  res.json(fileCache.getStats());
});

module.exports = router;

