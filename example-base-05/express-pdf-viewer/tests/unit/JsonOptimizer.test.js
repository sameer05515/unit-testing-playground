const JsonOptimizer = require('../../src/common/JsonOptimizer');
const fs = require('fs');
const path = require('path');

describe('JsonOptimizer', () => {
  const testFilePath = path.join(__dirname, '../../test-data/test.json');
  
  beforeAll(() => {
    // Create test data file
    const testData = [{ id: 1, name: 'test' }];
    fs.writeFileSync(testFilePath, JSON.stringify(testData));
  });

  afterAll(() => {
    // Clean up test file
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  test('should read JSON file', async () => {
    const data = await JsonOptimizer.readJsonFile(testFilePath);
    expect(Array.isArray(data)).toBe(true);
    expect(data[0].id).toBe(1);
  });

  test('should validate JSON structure', () => {
    const arrayData = [1, 2, 3];
    const objectData = { a: 1 };
    
    expect(JsonOptimizer.validateJsonStructure(arrayData, 'array')).toBe(true);
    expect(JsonOptimizer.validateJsonStructure(objectData, 'object')).toBe(true);
    expect(JsonOptimizer.validateJsonStructure(arrayData, 'object')).toBe(false);
    expect(JsonOptimizer.validateJsonStructure(objectData, 'array')).toBe(false);
  });

  test('should check if file should be chunked', () => {
    const result = JsonOptimizer.shouldChunk(testFilePath, 1000); // 1KB threshold
    expect(typeof result).toBe('boolean');
  });

  test('should get file size', () => {
    const size = JsonOptimizer.getFileSize(testFilePath);
    expect(size).toMatch(/^\d+\.?\d*\s(B|KB|MB)$/);
  });

  test('should throw error for non-existent file', async () => {
    await expect(
      JsonOptimizer.readJsonFile('non-existent.json')
    ).rejects.toThrow();
  });
});

