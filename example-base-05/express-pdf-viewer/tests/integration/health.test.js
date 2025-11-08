const request = require('supertest');
const express = require('express');

describe('Health Endpoints', () => {
  let app;

  beforeAll(() => {
    app = express();
    const healthRoutes = require('../../src/routes/health');
    app.use('/health', healthRoutes);
  });

  describe('GET /health', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('GET /health/detailed', () => {
    test('should return detailed health information', async () => {
      const response = await request(app)
        .get('/health/detailed')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('system');
      expect(response.body.system).toHaveProperty('platform');
      expect(response.body.system).toHaveProperty('memory');
      expect(response.body).toHaveProperty('cache');
    });
  });

  describe('GET /health/ready', () => {
    test('should return readiness status', async () => {
      const response = await request(app)
        .get('/health/ready')
        .expect(200);

      expect(response.body).toHaveProperty('status');
    });
  });

  describe('GET /health/live', () => {
    test('should return liveness status', async () => {
      const response = await request(app)
        .get('/health/live')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'alive');
    });
  });
});

