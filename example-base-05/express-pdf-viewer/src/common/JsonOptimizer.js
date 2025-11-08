const fs = require('fs');
const path = require('path');

/**
 * Utility class for optimizing large JSON file operations
 * Provides streaming and chunked processing capabilities
 */
class JsonOptimizer {
  /**
   * Read JSON file with size check and optimization hints
   * @param {string} filePath - Path to JSON file
   * @param {Object} options - Options for reading
   * @returns {Promise<Object>} Parsed JSON data
   */
  static async readJsonFile(filePath, options = {}) {
    const { maxSize = 50 * 1024 * 1024 } = options; // 50MB default
    
    try {
      const stats = fs.statSync(filePath);
      
      // If file is too large, warn about potential memory issues
      if (stats.size > maxSize) {
        console.warn(`⚠️  Large JSON file detected: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);
        console.warn(`   Consider using streaming or pagination for file: ${path.basename(filePath)}`);
      }

      const content = await fs.promises.readFile(filePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to read JSON file: ${error.message}`);
    }
  }

  /**
   * Check if JSON file should be processed in chunks
   * @param {string} filePath - Path to JSON file
   * @param {number} threshold - Size threshold in bytes (default: 10MB)
   * @returns {boolean} True if file exceeds threshold
   */
  static shouldChunk(filePath, threshold = 10 * 1024 * 1024) {
    try {
      const stats = fs.statSync(filePath);
      return stats.size > threshold;
    } catch {
      return false;
    }
  }

  /**
   * Get file size in human-readable format
   * @param {string} filePath - Path to file
   * @returns {string} Human-readable file size
   */
  static getFileSize(filePath) {
    try {
      const stats = fs.statSync(filePath);
      const bytes = stats.size;
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    } catch {
      return 'Unknown';
    }
  }

  /**
   * Validate JSON structure before processing
   * @param {any} data - JSON data to validate
   * @param {string} expectedType - Expected type ('array' or 'object')
   * @returns {boolean} True if valid
   */
  static validateJsonStructure(data, expectedType = 'array') {
    if (expectedType === 'array') {
      return Array.isArray(data);
    }
    return typeof data === 'object' && !Array.isArray(data);
  }
}

module.exports = JsonOptimizer;

