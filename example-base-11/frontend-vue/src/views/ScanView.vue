<template>
  <div class="container-fluid mt-3" style="max-width: 900px;">
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0"><i class="bi bi-hdd"></i> Scan Configuration</h5>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-6">
            <label class="form-label">Drive Path</label>
            <input type="text" class="form-control" value="E:\" readonly>
            <small class="text-muted">Currently configured to scan E: drive</small>
          </div>
          <div class="col-md-6">
            <label class="form-label">File Extensions</label>
            <div class="form-control" style="min-height: 38px; padding-top: 0.5rem;">
              <span class="badge bg-secondary me-1">.mp3</span>
              <span class="badge bg-secondary me-1">.mp4</span>
              <span class="badge bg-secondary me-1">.pdf</span>
              <span class="badge bg-secondary me-1">.jpg</span>
              <span class="badge bg-secondary me-1">.jpeg</span>
              <span class="badge bg-secondary me-1">.flv</span>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-12">
            <label class="form-label">Exclude Directories</label>
            <textarea 
              class="form-control" 
              v-model="excludeDirs" 
              rows="3" 
              placeholder="Enter directory names or paths to exclude (one per line or comma-separated)"
            ></textarea>
            <small class="text-muted">
              Enter directory names (e.g., "node_modules") or full paths (e.g., "E:\Windows"). 
              One per line or comma-separated.
            </small>
          </div>
        </div>
        <div class="d-grid">
          <button 
            class="btn btn-primary btn-lg" 
            :disabled="scanStatus === 'running'"
            @click="startScan"
          >
            <i class="bi bi-play-fill" v-if="scanStatus !== 'running'"></i>
            <i class="bi bi-hourglass-split" v-else></i>
            {{ scanStatus === 'running' ? 'Scanning...' : 'Start Scan' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Scan Status Card -->
    <div class="card mt-3" v-if="scanStatus !== 'idle'">
      <div class="card-header">
        <h5 class="mb-0"><i class="bi bi-activity"></i> Scan Status</h5>
      </div>
      <div class="card-body">
        <div v-if="scanStatus === 'running'" class="text-center">
          <div class="spinner-border text-primary" role="status"></div>
          <p class="mt-2">Scanning in progress... {{ scanProgress.filesFound }} files found so far</p>
          <div class="progress mt-3" v-if="scanProgress.progress > 0">
            <div 
              class="progress-bar progress-bar-striped progress-bar-animated" 
              :style="`width: ${scanProgress.progress}%`"
            >
              {{ scanProgress.progress }}%
            </div>
          </div>
        </div>
        <div v-else-if="scanStatus === 'completed'" class="alert alert-success">
          <i class="bi bi-check-circle"></i> Scan completed successfully!
        </div>
        <div v-else-if="scanStatus === 'error'" class="alert alert-danger">
          <i class="bi bi-exclamation-triangle"></i> Scan failed: {{ scanError }}
        </div>

        <!-- Statistics -->
        <div v-if="scanResult" class="mt-3">
          <div class="row">
            <div class="col-md-3" v-for="(value, key) in scanResult" :key="key">
              <div class="stats-card p-3">
                <div class="text-muted">{{ formatKey(key) }}</div>
                <div class="stats-value">{{ formatValue(value) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Log Output -->
        <div class="mt-3">
          <h6>Scan Log</h6>
          <div class="log-container">
            <div 
              v-for="(log, index) in logs" 
              :key="index"
              :class="`log-entry ${log.type || 'info'}`"
            >
              [{{ formatTime(log.timestamp) }}] {{ log.message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mediaFilesAPI from '../api/mediaFiles.js';

export default {
  name: 'ScanView',
  data() {
    return {
      excludeDirs: '',
      scanStatus: 'idle', // idle, running, completed, error
      scanProgress: {
        filesFound: 0,
        progress: 0
      },
      scanResult: null,
      scanError: null,
      logs: [],
      statusInterval: null
    };
  },
  mounted() {
    this.checkScanStatus();
  },
  beforeUnmount() {
    if (this.statusInterval) {
      clearInterval(this.statusInterval);
    }
  },
  methods: {
    async startScan() {
      if (this.scanStatus === 'running') {
        return;
      }

      // Parse exclude directories
      let excludeDirsArray = [];
      if (this.excludeDirs.trim()) {
        excludeDirsArray = this.excludeDirs
          .split(/[\n,]+/)
          .map(d => d.trim())
          .filter(d => d.length > 0);
      }

      try {
        await mediaFilesAPI.startScan(excludeDirsArray);
        this.scanStatus = 'running';
        this.logs = [{ message: 'Starting scan...', type: 'info', timestamp: new Date() }];
        if (excludeDirsArray.length > 0) {
          this.addLog(`Excluding directories: ${excludeDirsArray.join(', ')}`, 'info');
        }
        this.checkScanStatus();
        this.statusInterval = setInterval(() => this.checkScanStatus(), 2000);
      } catch (error) {
        this.addLog(`Error starting scan: ${error.message}`, 'error');
        console.error('Error starting scan:', error);
      }
    },
    async checkScanStatus() {
      try {
        const response = await mediaFilesAPI.getScanStatus();
        const status = response.data;

        if (status.status === 'running') {
          this.scanStatus = 'running';
          this.scanProgress = {
            filesFound: status.filesFound || 0,
            progress: status.progress || 0
          };
          if (status.lastLog) {
            this.addLog(status.lastLog.message, status.lastLog.type || 'info');
          }
        } else if (status.status === 'completed') {
          this.scanStatus = 'completed';
          this.scanResult = status.result;
          this.addLog('Scan completed successfully!', 'success');
          if (this.statusInterval) {
            clearInterval(this.statusInterval);
            this.statusInterval = null;
          }
        } else if (status.status === 'error') {
          this.scanStatus = 'error';
          this.scanError = status.error;
          this.addLog(`Scan error: ${status.error}`, 'error');
          if (this.statusInterval) {
            clearInterval(this.statusInterval);
            this.statusInterval = null;
          }
        }
      } catch (error) {
        console.error('Error checking scan status:', error);
      }
    },
    addLog(message, type = 'info') {
      this.logs.push({
        message,
        type,
        timestamp: new Date()
      });
      // Keep only last 100 logs
      if (this.logs.length > 100) {
        this.logs.shift();
      }
    },
    formatKey(key) {
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    },
    formatValue(value) {
      if (typeof value === 'object') {
        return JSON.stringify(value);
      }
      return value;
    },
    formatTime(date) {
      return new Date(date).toLocaleTimeString();
    }
  }
};
</script>

<style scoped>
.stats-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.stats-value {
  font-size: 2rem;
  font-weight: bold;
  margin: 0.5rem 0;
}

.log-container {
  max-height: 400px;
  overflow-y: auto;
  background-color: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  padding: 1rem;
  border-radius: 0.25rem;
}

.log-entry {
  margin: 0.25rem 0;
  padding: 0.25rem 0;
}

.log-entry.info {
  color: #4ec9b0;
}

.log-entry.warning {
  color: #dcdcaa;
}

.log-entry.error {
  color: #f48771;
}

.log-entry.success {
  color: #4ec9b0;
}
</style>

