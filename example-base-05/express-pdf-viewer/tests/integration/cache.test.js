const fileCache = require('../../src/common/FileCache');
const cacheManager = require('../../src/common/CacheManager');

describe('Cache Integration', () => {
  beforeEach(() => {
    fileCache.clear();
    cacheManager.clearAll();
  });

  describe('FileCache', () => {
    test('should cache and retrieve values', async () => {
      const key = 'test-key';
      const value = { data: 'test' };
      
      fileCache.set(key, value);
      const retrieved = fileCache.get(key);
      
      expect(retrieved).toEqual(value);
    });

    test('should return undefined for non-existent key', () => {
      const retrieved = fileCache.get('non-existent');
      expect(retrieved).toBeUndefined();
    });

    test('should provide statistics', async () => {
      await fileCache.getOrSet('key1', async () => 'value1');
      await fileCache.getOrSet('key1', async () => 'value1'); // Cache hit
      
      const stats = fileCache.getStats();
      expect(stats.hits).toBeGreaterThan(0);
      expect(stats.misses).toBeGreaterThan(0);
      expect(stats.hitRate).toBeDefined();
    });
  });

  describe('CacheManager', () => {
    test('should cache metadata', async () => {
      let callCount = 0;
      const fetchFn = async () => {
        callCount++;
        return { data: 'metadata' };
      };

      const first = await cacheManager.getMetadata('key', fetchFn);
      expect(first).toEqual({ data: 'metadata' });
      expect(callCount).toBe(1);

      const second = await cacheManager.getMetadata('key', fetchFn);
      expect(second).toEqual({ data: 'metadata' });
      expect(callCount).toBe(1); // Should use cache
    });

    test('should cache responses', async () => {
      let callCount = 0;
      const fetchFn = async () => {
        callCount++;
        return { data: 'response' };
      };

      await cacheManager.getResponse('key', fetchFn);
      await cacheManager.getResponse('key', fetchFn);
      
      expect(callCount).toBe(1); // Should use cache
    });

    test('should provide comprehensive statistics', () => {
      const stats = cacheManager.getStats();
      expect(stats).toHaveProperty('file');
      expect(stats).toHaveProperty('metadata');
      expect(stats).toHaveProperty('response');
    });

    test('should invalidate cache by pattern', async () => {
      await cacheManager.getMetadata('snapshot-v1', async () => 'data1');
      await cacheManager.getMetadata('snapshot-v2', async () => 'data2');
      
      expect(cacheManager.getStats().metadata.size).toBe(2);
      
      cacheManager.invalidate('v1');
      
      // Should have invalidated v1
      const stats = cacheManager.getStats();
      expect(stats.metadata.size).toBeLessThan(2);
    });
  });
});

