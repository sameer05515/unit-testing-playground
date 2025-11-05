const { validationResult } = require('express-validator');

/**
 * Middleware to check validation results
 * Must be used after express-validator validators
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: true,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

/**
 * Sanitize file path to prevent directory traversal
 * @param {string} baseDir - Base directory path
 * @param {string} userInput - User-provided path input
 * @returns {string} Sanitized path
 */
const sanitizePath = (baseDir, userInput) => {
  const path = require('path');
  const baseResolved = path.resolve(baseDir);
  const resolved = path.resolve(baseDir, userInput);
  
  // Ensure resolved path is within base directory
  if (!resolved.startsWith(baseResolved)) {
    throw new Error('Invalid path: directory traversal detected');
  }
  
  return resolved;
};

module.exports = { validate, sanitizePath };

