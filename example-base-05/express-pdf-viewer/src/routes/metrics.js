const express = require('express');
const os = require('os');
const process = require('process');
const fileCache = require('../common/FileCache');
const cacheManager = require('../common/CacheManager');
const { NODE_ENV } = require('../common/constants');

const router = express.Router();

// Metrics storage (in-memory, reset on restart)
let requestMetrics = {
  totalRequests: 0,
  requestsByMethod: {},
  requestsByPath: {},
  errorCount: 0,
  slowRequests: [],
  responseTimeSum: 0,
  responseTimeCount: 0,
  startTime: Date.now(),
};

/**
 * Update request metrics
 */
function updateMetrics(req, res, duration) {
  requestMetrics.totalRequests++;
  
  // Track by method
  const method = req.method;
  requestMetrics.requestsByMethod[method] = (requestMetrics.requestsByMethod[method] || 0) + 1;
  
  // Track by path (normalize)
  const path = req.path.split('?')[0]; // Remove query params
  requestMetrics.requestsByPath[path] = (requestMetrics.requestsByPath[path] || 0) + 1;
  
  // Track response times
  requestMetrics.responseTimeSum += duration;
  requestMetrics.responseTimeCount++;
  
  // Track slow requests (>1000ms)
  if (duration > 1000) {
    requestMetrics.slowRequests.push({
      method,
      path,
      duration,
      timestamp: new Date().toISOString(),
    });
    // Keep only last 100 slow requests
    if (requestMetrics.slowRequests.length > 100) {
      requestMetrics.slowRequests.shift();
    }
  }
}

/**
 * Track error
 */
function trackError() {
  requestMetrics.errorCount++;
}

// Export for use in middleware
module.exports.updateMetrics = updateMetrics;
module.exports.trackError = trackError;

/**
 * @swagger
 * /metrics:
 *   get:
 *     summary: Get application metrics (Prometheus format)
 *     tags: [Health]
 *     description: Returns metrics in Prometheus format for monitoring
 *     responses:
 *       200:
 *         description: Metrics in Prometheus format
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.get('/', (req, res) => {
  const memUsage = process.memoryUsage();
  const uptime = process.uptime();
  const cacheStats = cacheManager.getStats();
  
  const avgResponseTime = requestMetrics.responseTimeCount > 0
    ? requestMetrics.responseTimeSum / requestMetrics.responseTimeCount
    : 0;

  // Prometheus format metrics
  const metrics = [
    '# HELP http_requests_total Total number of HTTP requests',
    '# TYPE http_requests_total counter',
    `http_requests_total ${requestMetrics.totalRequests}`,
    
    '# HELP http_requests_errors_total Total number of HTTP errors',
    '# TYPE http_requests_errors_total counter',
    `http_requests_errors_total ${requestMetrics.errorCount}`,
    
    '# HELP http_request_duration_seconds Average HTTP request duration',
    '# TYPE http_request_duration_seconds gauge',
    `http_request_duration_seconds ${(avgResponseTime / 1000).toFixed(4)}`,
    
    '# HELP process_uptime_seconds Process uptime in seconds',
    '# TYPE process_uptime_seconds gauge',
    `process_uptime_seconds ${uptime}`,
    
    '# HELP process_memory_heap_used_bytes Heap memory used in bytes',
    '# TYPE process_memory_heap_used_bytes gauge',
    `process_memory_heap_used_bytes ${memUsage.heapUsed}`,
    
    '# HELP process_memory_heap_total_bytes Total heap memory in bytes',
    '# TYPE process_memory_heap_total_bytes gauge',
    `process_memory_heap_total_bytes ${memUsage.heapTotal}`,
    
    '# HELP process_memory_rss_bytes Resident set size in bytes',
    '# TYPE process_memory_rss_bytes gauge',
    `process_memory_rss_bytes ${memUsage.rss}`,
    
    '# HELP cache_hits_total Total cache hits',
    '# TYPE cache_hits_total counter',
    `cache_hits_total ${cacheStats.file.hits + (cacheStats.metadata.hits || 0) + (cacheStats.response.hits || 0)}`,
    
    '# HELP cache_misses_total Total cache misses',
    '# TYPE cache_misses_total counter',
    `cache_misses_total ${cacheStats.file.misses + (cacheStats.metadata.misses || 0) + (cacheStats.response.misses || 0)}`,
  ];

  res.setHeader('Content-Type', 'text/plain; version=0.0.4');
  res.send(metrics.join('\n') + '\n');
});

/**
 * @swagger
 * /metrics/json:
 *   get:
 *     summary: Get application metrics (JSON format)
 *     tags: [Health]
 *     description: Returns metrics in JSON format for easy consumption
 *     responses:
 *       200:
 *         description: Metrics in JSON format
 */
router.get('/json', (req, res) => {
  const memUsage = process.memoryUsage();
  const uptime = process.uptime();
  const cacheStats = cacheManager.getStats();
  
  const avgResponseTime = requestMetrics.responseTimeCount > 0
    ? requestMetrics.responseTimeSum / requestMetrics.responseTimeCount
    : 0;

  res.json({
    requests: {
      total: requestMetrics.totalRequests,
      errors: requestMetrics.errorCount,
      byMethod: requestMetrics.requestsByMethod,
      byPath: requestMetrics.requestsByPath,
      averageResponseTime: avgResponseTime,
      slowRequests: requestMetrics.slowRequests.slice(-10), // Last 10 slow requests
    },
    system: {
      uptime,
      memory: {
        heapUsed: memUsage.heapUsed,
        heapTotal: memUsage.heapTotal,
        rss: memUsage.rss,
        external: memUsage.external,
      },
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
    },
    cache: cacheStats,
    startTime: new Date(requestMetrics.startTime).toISOString(),
  });
});

/**
 * Reset metrics (for testing)
 */
router.post('/reset', (req, res) => {
  if (NODE_ENV !== 'development') {
    return res.status(403).json({ error: 'Only available in development' });
  }
  
  requestMetrics = {
    totalRequests: 0,
    requestsByMethod: {},
    requestsByPath: {},
    errorCount: 0,
    slowRequests: [],
    responseTimeSum: 0,
    responseTimeCount: 0,
    startTime: Date.now(),
  };
  
  res.json({ message: 'Metrics reset' });
});

module.exports = router;

