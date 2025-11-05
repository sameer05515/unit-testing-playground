const prepareErrorMessage = require("../common/prepareErrorMessage");

/**
 * Centralized error handling middleware
 * Must be added after all routes
 */
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error("Error occurred:", {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Determine status code
  const statusCode = err.statusCode || err.status || 500;

  // Prepare error response
  const errorResponse = {
    error: true,
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : prepareErrorMessage(err, 'An unexpected error occurred'),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  // Send error response
  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;

