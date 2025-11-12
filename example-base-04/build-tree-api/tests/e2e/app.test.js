const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../../server');
const ErrorCodes = require('../../src/text-indentation/error-codes');

test('GET / serves welcome page', async () => {
  const response = await request(app).get('/');

  assert.equal(response.statusCode, 200);
  assert.match(response.text, /Build Tree API/);
});

test('POST /api/build-tree returns success payload', async () => {
  const response = await request(app)
    .post('/api/build-tree')
    .send({
      textInput: ['Root', '    Branch'].join('\n')
    })
    .set('Content-Type', 'application/json');

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.isValid, true);
  assert.equal(response.body.errorCode, ErrorCodes.SUCCESS.code);
  assert.equal(Array.isArray(response.body.data), true);
});

test('POST /api/build-tree handles invalid payload', async () => {
  const response = await request(app)
    .post('/api/build-tree')
    .send({ textInput: null })
    .set('Content-Type', 'application/json');

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.isValid, false);
  assert.equal(response.body.errorCode, ErrorCodes.INVALID_INPUT.code);
});

test('GET /docs/openapi.json exposes specification', async () => {
  const response = await request(app).get('/docs/openapi.json');

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.openapi, '3.0.3');
  assert.equal(response.body.info.title, 'Build Tree API');
});

