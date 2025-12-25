const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Path to media files JSON
const MEDIA_FILES_PATH = path.join(__dirname, '..', 'media-files.json');

// Helper function to load media files data
function loadMediaFiles() {
  try {
    if (!fs.existsSync(MEDIA_FILES_PATH)) {
      return null;
    }
    const data = fs.readFileSync(MEDIA_FILES_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading media files:', error);
    return null;
  }
}

// Helper function to parse size string to bytes
// Examples: "1KB" -> 1024, "1MB" -> 1048576, "1GB" -> 1073741824
function parseSizeToBytes(sizeStr) {
  if (!sizeStr) return null;
  
  const upper = sizeStr.toUpperCase().trim();
  const match = upper.match(/^(\d+(?:\.\d+)?)\s*(KB|MB|GB|TB)$/);
  
  if (!match) return null;
  
  const value = parseFloat(match[1]);
  const unit = match[2];
  
  const multipliers = {
    'KB': 1024,
    'MB': 1024 * 1024,
    'GB': 1024 * 1024 * 1024,
    'TB': 1024 * 1024 * 1024 * 1024
  };
  
  return Math.floor(value * (multipliers[unit] || 1));
}

// Import scan service
const scanService = require('./scanService');

// Root endpoint - serve main view
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

// Scan view endpoint
app.get('/scan', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'scan.html'));
});

// API: Get all media files data
app.get('/api/media-files', (req, res) => {
  const data = loadMediaFiles();
  if (!data) {
    return res.status(404).json({
      error: 'Media files data not found',
      message: 'Please run the scanner first to generate media-files.json'
    });
  }
  res.json(data);
});

// API: Get statistics
app.get('/api/stats', (req, res) => {
  const data = loadMediaFiles();
  if (!data) {
    return res.status(404).json({
      error: 'Media files data not found'
    });
  }
  
  res.json({
    scanDate: data.scanDate,
    drivePath: data.drivePath,
    totalFiles: data.totalFiles,
    totalSize: data.totalSize,
    totalSizeFormatted: data.totalSizeFormatted,
    scanDuration: data.scanDuration,
    filesByType: data.filesByType,
    filesByExtension: data.filesByExtension
  });
});

// API: Get files with pagination and filters
app.get('/api/files', (req, res) => {
  const data = loadMediaFiles();
  if (!data) {
    return res.status(404).json({
      error: 'Media files data not found'
    });
  }

  let files = [...data.files];

  // Filter by extension type
  if (req.query.type) {
    files = files.filter(file => file.extensionType === req.query.type);
  }

  // Filter by extension
  if (req.query.extension) {
    files = files.filter(file => file.extension === req.query.extension);
  }

  // Search by name or path
  if (req.query.search) {
    const searchTerm = req.query.search.toLowerCase();
    files = files.filter(file => 
      file.name.toLowerCase().includes(searchTerm) ||
      file.path.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by size (min and max)
  if (req.query.minSize) {
    const minSizeBytes = parseSizeToBytes(req.query.minSize);
    if (minSizeBytes !== null) {
      files = files.filter(file => file.size >= minSizeBytes);
    }
  }

  if (req.query.maxSize) {
    const maxSizeBytes = parseSizeToBytes(req.query.maxSize);
    if (maxSizeBytes !== null) {
      files = files.filter(file => file.size <= maxSizeBytes);
    }
  }

  // Sort
  const sortBy = req.query.sortBy || 'path';
  const sortOrder = req.query.sortOrder || 'asc';
  files.sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (sortOrder === 'desc') {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
    return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
  });

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedFiles = files.slice(startIndex, endIndex);

  res.json({
    total: files.length,
    page: page,
    limit: limit,
    totalPages: Math.ceil(files.length / limit),
    files: paginatedFiles
  });
});

// API: Get file by slug
app.get('/api/files/:slug', (req, res) => {
  const data = loadMediaFiles();
  if (!data) {
    return res.status(404).json({
      error: 'Media files data not found'
    });
  }

  const file = data.files.find(f => f.slug === req.params.slug);
  if (!file) {
    return res.status(404).json({
      error: 'File not found'
    });
  }

  // Find previous and next files
  const currentIndex = data.files.findIndex(f => f.slug === req.params.slug);
  const prevFile = currentIndex > 0 ? data.files[currentIndex - 1] : null;
  const nextFile = currentIndex < data.files.length - 1 ? data.files[currentIndex + 1] : null;

  res.json({
    file: file,
    navigation: {
      prev: prevFile ? { slug: prevFile.slug, name: prevFile.name } : null,
      next: nextFile ? { slug: nextFile.slug, name: nextFile.name } : null
    }
  });
});

// API: Get files by type
app.get('/api/files/type/:type', (req, res) => {
  const data = loadMediaFiles();
  if (!data) {
    return res.status(404).json({
      error: 'Media files data not found'
    });
  }

  const type = req.params.type;
  const files = data.files.filter(file => file.extensionType === type);

  res.json({
    type: type,
    count: files.length,
    files: files
  });
});

// API: Get files by extension
app.get('/api/files/extension/:extension', (req, res) => {
  const data = loadMediaFiles();
  if (!data) {
    return res.status(404).json({
      error: 'Media files data not found'
    });
  }

  const extension = req.params.extension.startsWith('.') 
    ? req.params.extension 
    : `.${req.params.extension}`;
  
  const files = data.files.filter(file => file.extension === extension);

  res.json({
    extension: extension,
    count: files.length,
    files: files
  });
});

// Universal Viewer - serve file based on type
app.get('/viewer/:slug', (req, res) => {
  const data = loadMediaFiles();
  if (!data) {
    return res.status(404).send('Media files data not found');
  }

  const file = data.files.find(f => f.slug === req.params.slug);
  if (!file) {
    return res.status(404).send('File not found');
  }

  // Find previous and next files for navigation
  const currentIndex = data.files.findIndex(f => f.slug === req.params.slug);
  const prevFile = currentIndex > 0 ? data.files[currentIndex - 1] : null;
  const nextFile = currentIndex < data.files.length - 1 ? data.files[currentIndex + 1] : null;

  res.render('universal-viewer', {
    file: file,
    navigation: {
      prev: prevFile ? { slug: prevFile.slug, name: prevFile.name } : null,
      next: nextFile ? { slug: nextFile.slug, name: nextFile.name } : null
    }
  });
});

// Serve actual file content (for images, videos, audio, PDFs)
app.get('/file/:slug', (req, res) => {
  const data = loadMediaFiles();
  if (!data) {
    return res.status(404).send('Media files data not found');
  }

  const file = data.files.find(f => f.slug === req.params.slug);
  if (!file) {
    return res.status(404).send('File not found');
  }

  // Check if file exists
  if (!fs.existsSync(file.path)) {
    return res.status(404).send('File not found on disk');
  }

  // Set appropriate content type
  const contentTypes = {
    '.mp4': 'video/mp4',
    '.mp3': 'audio/mpeg',
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.flv': 'video/x-flv'
  };

  const contentType = contentTypes[file.extension] || 'application/octet-stream';
  res.setHeader('Content-Type', contentType);
  
  // Handle download parameter
  if (req.query.download === 'true') {
    res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
  } else {
    res.setHeader('Content-Disposition', `inline; filename="${file.name}"`);
  }

  // Stream the file
  const fileStream = fs.createReadStream(file.path);
  fileStream.pipe(res);
});

// Scan API endpoints
app.post('/api/scan/start', (req, res) => {
  try {
    const excludeDirs = req.body.excludeDirs || [];
    const result = scanService.startScan(excludeDirs);
    if (result.error) {
      return res.status(400).json(result);
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to start scan',
      message: error.message
    });
  }
});

app.get('/api/scan/status', (req, res) => {
  try {
    const status = scanService.getScanStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get scan status',
      message: error.message
    });
  }
});

app.post('/api/scan/reset', (req, res) => {
  try {
    scanService.resetScanStatus();
    res.json({ success: true, message: 'Scan status reset' });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to reset scan status',
      message: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hasData: fs.existsSync(MEDIA_FILES_PATH)
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`View media files: http://localhost:${PORT}/`);
  console.log(`API endpoint: http://localhost:${PORT}/api/media-files`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

