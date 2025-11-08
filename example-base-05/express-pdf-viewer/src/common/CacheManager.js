const fileCache = require('./FileCache');
const NodeCache = require('node-cache');

/**
 * Advanced cache manager with multiple cache strategies
 */
class CacheManager {
  constructor() {
    // Separate caches for different data types
    this.metadataCache = new NodeCache({
      stdTTL: 7200, // 2 hours for metadata
      checkperiod: 600,
      useClones: false,
    });

    this.responseCache = new NodeCache({
      stdTTL: 3600, // 1 hour for API responses
      checkperiod: 300,
      useClones: false,
    });

    this.stats = {
      metadata: { hits: 0, misses: 0 },
      response: { hits: 0, misses: 0 },
    };
  }

  /**
   * Cache metadata with longer TTL
   */
  async getMetadata(key, fetchFn) {
    const cached = this.metadataCache.get(key);
    if (cached !== undefined) {
      this.stats.metadata.hits++;
      return cached;
    }

    this.stats.metadata.misses++;
    const data = await fetchFn();
    this.metadataCache.set(key, data);
    return data;
  }

  /**
   * Cache API responses
   */
  async getResponse(key, fetchFn) {
    const cached = this.responseCache.get(key);
    if (cached !== undefined) {
      this.stats.response.hits++;
      return cached;
    }

    this.stats.response.misses++;
    const data = await fetchFn();
    this.responseCache.set(key, data);
    return data;
  }

  /**
   * Invalidate cache by pattern
   */
  invalidate(pattern) {
    const metadataKeys = this.metadataCache.keys();
    const responseKeys = this.responseCache.keys();

    const invalidateCache = (cache, keys) => {
      keys.forEach(key => {
        if (key.includes(pattern)) {
          cache.del(key);
        }
      });
    };

    invalidateCache(this.metadataCache, metadataKeys);
    invalidateCache(this.responseCache, responseKeys);
  }

  /**
   * Clear all caches
   */
  clearAll() {
    this.metadataCache.flushAll();
    this.responseCache.flushAll();
    fileCache.clear();
    this.stats = {
      metadata: { hits: 0, misses: 0 },
      response: { hits: 0, misses: 0 },
    };
  }

  /**
   * Get comprehensive cache statistics
   */
  getStats() {
    const fileStats = fileCache.getStats();
    
    return {
      file: fileStats,
      metadata: {
        ...this.stats.metadata,
        size: this.metadataCache.keys().length,
        hitRate: this.calculateHitRate(this.stats.metadata),
      },
      response: {
        ...this.stats.response,
        size: this.responseCache.keys().length,
        hitRate: this.calculateHitRate(this.stats.response),
      },
    };
  }

  calculateHitRate(stats) {
    const total = stats.hits + stats.misses;
    return total > 0 ? ((stats.hits / total) * 100).toFixed(2) + '%' : '0%';
  }
}

// Singleton instance
const cacheManager = new CacheManager();

module.exports = cacheManager;

