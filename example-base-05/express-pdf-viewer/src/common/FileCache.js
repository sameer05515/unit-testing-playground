const NodeCache = require('node-cache');

/**
 * File caching service for frequently accessed files
 * Reduces file I/O operations and improves performance
 */
class FileCache {
  constructor(options = {}) {
    const defaultOptions = {
      stdTTL: 3600, // 1 hour default TTL
      checkperiod: 600, // Check for expired keys every 10 minutes
      useClones: false, // Don't clone cached values (performance)
    };

    this.cache = new NodeCache({ ...defaultOptions, ...options });
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
    };
  }

  /**
   * Get cached file content or fetch and cache it
   * @param {string} key - Cache key (usually file path)
   * @param {Function} fetchFn - Function to fetch data if not cached
   * @returns {Promise<any>} Cached or freshly fetched data
   */
  async getOrSet(key, fetchFn) {
    const cached = this.cache.get(key);
    if (cached !== undefined) {
      this.stats.hits++;
      return cached;
    }

    this.stats.misses++;
    const data = await fetchFn();
    this.cache.set(key, data);
    this.stats.sets++;
    return data;
  }

  /**
   * Get value from cache
   * @param {string} key - Cache key
   * @returns {any|undefined} Cached value or undefined
   */
  get(key) {
    const value = this.cache.get(key);
    if (value !== undefined) {
      this.stats.hits++;
    } else {
      this.stats.misses++;
    }
    return value;
  }

  /**
   * Set value in cache
   * @param {string} key - Cache key
   * @param {any} value - Value to cache
   * @param {number} ttl - Time to live in seconds (optional)
   */
  set(key, value, ttl) {
    this.cache.set(key, value, ttl);
    this.stats.sets++;
  }

  /**
   * Delete key from cache
   * @param {string} key - Cache key
   */
  del(key) {
    this.cache.del(key);
  }

  /**
   * Clear all cache
   */
  clear() {
    this.cache.flushAll();
    this.stats = { hits: 0, misses: 0, sets: 0 };
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache statistics
   */
  getStats() {
    const keys = this.cache.keys();
    return {
      ...this.stats,
      size: keys.length,
      hitRate: this.stats.hits + this.stats.misses > 0
        ? (this.stats.hits / (this.stats.hits + this.stats.misses) * 100).toFixed(2) + '%'
        : '0%',
    };
  }
}

// Create singleton instance
const fileCache = new FileCache({
  stdTTL: 3600, // 1 hour
  checkperiod: 600, // 10 minutes
});

module.exports = fileCache;

