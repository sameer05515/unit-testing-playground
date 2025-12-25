const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

// Configuration
const DRIVE_PATH = 'E:\\';
const OUTPUT_FILE = path.join(__dirname, '..', 'media-files.json');
const ALLOWED_EXTENSIONS = ['.mp3', '.mp4', '.pdf', '.jpg', '.jpeg', '.flv'];

// Extension type mapping
const EXTENSION_TYPES = {
  '.mp3': 'song',
  '.mp4': 'video',
  '.flv': 'video',
  '.pdf': 'pdf',
  '.jpg': 'image',
  '.jpeg': 'image'
};

// Scan status
let scanStatus = {
  status: 'idle', // idle, running, completed, error
  processId: null,
  startTime: null,
  filesFound: 0,
  currentFile: '',
  progress: 0,
  lastLog: null,
  result: null,
  error: null
};

/**
 * Generate a unique slug from file path
 */
function generateSlug(filePath) {
  const hash = crypto.createHash('md5').update(filePath).digest('hex').substring(0, 8);
  const fileName = path.basename(filePath, path.extname(filePath));
  const readableSlug = fileName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
  
  return `${readableSlug}-${hash}`;
}

/**
 * Get extension type category
 */
function getExtensionType(extension) {
  const ext = extension.toLowerCase().startsWith('.') ? extension.toLowerCase() : `.${extension.toLowerCase()}`;
  return EXTENSION_TYPES[ext] || 'unknown';
}

/**
 * Format bytes to human-readable format
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Start scan process
 */
function startScan() {
  if (scanStatus.status === 'running') {
    return { error: 'Scan is already in progress' };
  }

  // Reset status
  scanStatus = {
    status: 'running',
    processId: Date.now().toString(),
    startTime: new Date().toISOString(),
    filesFound: 0,
    currentFile: '',
    progress: 0,
    lastLog: { message: 'Starting scan...', type: 'info' },
    result: null,
    error: null
  };

  // Start scan in background
  const scannerPath = path.join(__dirname, 'scanner.js');
  const scanProcess = spawn('node', [scannerPath], {
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe']
  });

  scanProcess.stdout.on('data', (data) => {
    const output = data.toString();
    scanStatus.lastLog = { message: output.trim(), type: 'info' };
    
    // Try to extract file count from output
    const foundMatch = output.match(/Found \[(\w+)\]: (.+)/);
    if (foundMatch) {
      scanStatus.filesFound++;
      scanStatus.currentFile = foundMatch[2];
    }
  });

  scanProcess.stderr.on('data', (data) => {
    const error = data.toString();
    scanStatus.lastLog = { message: error.trim(), type: 'warning' };
  });

  scanProcess.on('close', (code) => {
    if (code === 0) {
      // Scan completed successfully
      try {
        if (fs.existsSync(OUTPUT_FILE)) {
          const result = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
          scanStatus.status = 'completed';
          scanStatus.result = {
            scanDate: result.scanDate,
            drivePath: result.drivePath,
            totalFiles: result.totalFiles,
            totalSize: result.totalSize,
            totalSizeFormatted: result.totalSizeFormatted,
            scanDuration: result.scanDuration,
            filesByType: result.filesByType,
            filesByExtension: result.filesByExtension
          };
          scanStatus.progress = 100;
          scanStatus.lastLog = { message: 'Scan completed successfully!', type: 'success' };
        } else {
          scanStatus.status = 'error';
          scanStatus.error = 'Scan completed but output file not found';
        }
      } catch (error) {
        scanStatus.status = 'error';
        scanStatus.error = error.message;
      }
    } else {
      scanStatus.status = 'error';
      scanStatus.error = `Scan process exited with code ${code}`;
    }
  });

  scanProcess.on('error', (error) => {
    scanStatus.status = 'error';
    scanStatus.error = error.message;
    scanStatus.lastLog = { message: `Error: ${error.message}`, type: 'error' };
  });

  // Unref to allow parent process to exit
  scanProcess.unref();

  return { 
    success: true, 
    processId: scanStatus.processId,
    message: 'Scan started'
  };
}

/**
 * Get scan status
 */
function getScanStatus() {
  // If scan is running, try to estimate progress
  if (scanStatus.status === 'running') {
    // Simple progress estimation based on time (not accurate but better than nothing)
    const startTime = new Date(scanStatus.startTime);
    const elapsed = (Date.now() - startTime.getTime()) / 1000; // seconds
    // Estimate: assume scan takes 5-10 minutes for typical drive
    // This is a rough estimate, actual progress would require more complex tracking
    scanStatus.progress = Math.min(95, Math.floor((elapsed / 300) * 100)); // 5 minutes = 100%
  }

  return { ...scanStatus };
}

/**
 * Reset scan status
 */
function resetScanStatus() {
  scanStatus = {
    status: 'idle',
    processId: null,
    startTime: null,
    filesFound: 0,
    currentFile: '',
    progress: 0,
    lastLog: null,
    result: null,
    error: null
  };
}

module.exports = {
  startScan,
  getScanStatus,
  resetScanStatus
};

