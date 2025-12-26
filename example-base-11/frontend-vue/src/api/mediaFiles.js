import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  // Get all media files data
  getMediaFiles() {
    return api.get('/media-files');
  },

  // Get statistics
  getStats() {
    return api.get('/stats');
  },

  // Get files with filters
  getFiles(params) {
    return api.get('/files', { params });
  },

  // Get file by slug
  getFileBySlug(slug) {
    return api.get(`/files/${slug}`);
  },

  // Get files by type
  getFilesByType(type) {
    return api.get(`/files/type/${type}`);
  },

  // Get files by extension
  getFilesByExtension(extension) {
    return api.get(`/files/extension/${extension}`);
  },

  // Delete file
  deleteFile(slug) {
    return api.delete(`/files/${slug}`);
  },

  // Bulk delete files
  bulkDeleteFiles(slugs) {
    return api.post('/files/bulk-delete', { slugs });
  },

  // Get deleted files
  getDeletedFiles() {
    return api.get('/deleted-files');
  },

  // Scan API
  startScan(excludeDirs = []) {
    return api.post('/scan/start', { excludeDirs });
  },

  getScanStatus() {
    return api.get('/scan/status');
  },

  resetScanStatus() {
    return api.post('/scan/reset');
  }
};

