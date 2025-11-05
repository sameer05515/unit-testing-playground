/**
 * Performance monitoring middleware
 * Tracks request timing and provides performance metrics
 */

const { updateMetrics, trackError } = require('../routes/metrics');

const performanceMiddleware = (req, res, next) => {
  const startTime = process.hrtime.bigint();
  const startMemory = process.memoryUsage().heapUsed;

  // Store start time in request object
  req._startTime = startTime;
  req._startMemory = startMemory;

  // Override res.end to capture response time
  const originalEnd = res.end;
  res.end = function (chunk, encoding) {
    const endTime = process.hrtime.bigint();
    const endMemory = process.memoryUsage().heapUsed;
    
    const duration = Number(endTime - startTime) / 1_000_000; // Convert to milliseconds
    const memoryDelta = (endMemory - startMemory) / 1024 / 1024; // MB

    // Update metrics
    updateMetrics(req, res, duration);
    
    // Track errors
    if (res.statusCode >= 400) {
      trackError();
    }

    // Log slow requests (>1000ms)
    if (duration > 1000) {
      console.warn(`⚠️  Slow request: ${req.method} ${req.path} took ${duration.toFixed(2)}ms`);
    }

    // Add performance headers
    res.setHeader('X-Response-Time', `${duration.toFixed(2)}ms`);
    res.setHeader('X-Memory-Delta', `${memoryDelta.toFixed(2)}MB`);

    // Call original end
    originalEnd.call(this, chunk, encoding);
  };

  next();
};

module.exports = performanceMiddleware;

