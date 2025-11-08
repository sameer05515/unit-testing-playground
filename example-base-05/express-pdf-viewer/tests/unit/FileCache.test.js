const FileCache = require('../../src/common/FileCache');

describe('FileCache', () => {
  beforeEach(() => {
    // Clear cache before each test
    FileCache.clear();
  });

  test('should cache and retrieve values', async () => {
    const key = 'test-key';
    const value = { data: 'test' };
    
    FileCache.set(key, value);
    const retrieved = FileCache.get(key);
    
    expect(retrieved).toEqual(value);
  });

  test('should return undefined for non-existent key', () => {
    const retrieved = FileCache.get('non-existent');
    expect(retrieved).toBeUndefined();
  });

  test('should get or set using async function', async () => {
    const key = 'async-key';
    let callCount = 0;
    
    const fetchFn = async () => {
      callCount++;
      return { data: 'fetched' };
    };

    // First call should fetch
    const first = await FileCache.getOrSet(key, fetchFn);
    expect(first).toEqual({ data: 'fetched' });
    expect(callCount).toBe(1);

    // Second call should use cache
    const second = await FileCache.getOrSet(key, fetchFn);
    expect(second).toEqual({ data: 'fetched' });
    expect(callCount).toBe(1); // Should not call fetchFn again
  });

  test('should delete keys', () => {
    const key = 'delete-key';
    FileCache.set(key, 'value');
    expect(FileCache.get(key)).toBe('value');
    
    FileCache.del(key);
    expect(FileCache.get(key)).toBeUndefined();
  });

  test('should provide statistics', async () => {
    FileCache.clear();
    
    await FileCache.getOrSet('key1', async () => 'value1');
    await FileCache.getOrSet('key1', async () => 'value1'); // Cache hit
    
    const stats = FileCache.getStats();
    expect(stats.size).toBeGreaterThan(0);
    expect(stats.hits).toBeGreaterThan(0);
    expect(stats.misses).toBeGreaterThan(0);
    expect(stats.sets).toBeGreaterThan(0);
  });
});

