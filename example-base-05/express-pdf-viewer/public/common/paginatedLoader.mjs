/**
 * Paginated data loader utility for frontend
 * Provides lazy loading and pagination helpers
 */

export class PaginatedLoader {
  constructor(baseUrl, options = {}) {
    this.baseUrl = baseUrl;
    this.page = options.initialPage || 0;
    this.pageSize = options.pageSize || 20;
    this.cache = new Map();
    this.loading = false;
  }

  /**
   * Load a specific page
   */
  async loadPage(page, pageSize = this.pageSize) {
    if (this.loading) {
      throw new Error('Already loading');
    }

    const cacheKey = `${page}_${pageSize}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    this.loading = true;
    try {
      const url = `${this.baseUrl}?page=${page}&pageSize=${pageSize}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.cache.set(cacheKey, data);
      this.page = page;
      
      return data;
    } finally {
      this.loading = false;
    }
  }

  /**
   * Load next page
   */
  async loadNext() {
    return this.loadPage(this.page + 1);
  }

  /**
   * Load previous page
   */
  async loadPrev() {
    if (this.page > 0) {
      return this.loadPage(this.page - 1);
    }
    return null;
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Get current page
   */
  getCurrentPage() {
    return this.page;
  }
}

/**
 * Lazy load messages with Intersection Observer
 */
export class LazyMessageLoader {
  constructor(container, loadFn, options = {}) {
    this.container = container;
    this.loadFn = loadFn;
    this.loadedMessages = new Set();
    this.observer = null;
    this.batchSize = options.batchSize || 20;
    this.threshold = options.threshold || 0.1;
  }

  /**
   * Initialize intersection observer
   */
  init() {
    const options = {
      root: this.container,
      rootMargin: '100px',
      threshold: this.threshold,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const messageId = entry.target.dataset.messageId;
          if (!this.loadedMessages.has(messageId)) {
            this.loadMessage(messageId);
          }
        }
      });
    }, options);
  }

  /**
   * Observe a message element
   */
  observe(element) {
    if (this.observer) {
      this.observer.observe(element);
    }
  }

  /**
   * Load message content
   */
  async loadMessage(messageId) {
    if (this.loadedMessages.has(messageId)) {
      return;
    }

    this.loadedMessages.add(messageId);
    await this.loadFn(messageId);
  }

  /**
   * Dispose observer
   */
  dispose() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

