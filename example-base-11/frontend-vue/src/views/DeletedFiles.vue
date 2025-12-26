<template>
  <div class="container-fluid mt-3">
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0"><i class="bi bi-trash"></i> Deleted Files</h5>
        <span class="badge bg-secondary">{{ deletedFiles.length }} deleted files</span>
      </div>
      <div class="card-body">
        <div v-if="loading" class="text-center">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
        <div v-else-if="deletedFiles.length === 0" class="text-center text-muted">
          No deleted files found
        </div>
        <div v-else class="table-responsive" style="max-height: 70vh; overflow-y: auto;">
          <table class="table table-hover table-striped">
            <thead class="table-dark sticky-top">
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Extension</th>
                <th>Size</th>
                <th>Deleted At</th>
                <th>Original Path</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="file in deletedFiles" :key="file.slug">
                <td>
                  <i :class="`bi bi-${getTypeIcon(file.extensionType)} file-icon`"></i>
                  <strong>{{ file.name }}</strong>
                </td>
                <td>
                  <span :class="`badge badge-type-${file.extensionType}`">
                    {{ file.extensionType }}
                  </span>
                </td>
                <td><code>{{ file.extension }}</code></td>
                <td>{{ file.sizeFormatted }}</td>
                <td>{{ formatDate(file.deletedAt) }}</td>
                <td>
                  <span class="file-path" :title="file.path">
                    {{ file.path }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mediaFilesAPI from '../api/mediaFiles.js';

export default {
  name: 'DeletedFiles',
  data() {
    return {
      deletedFiles: [],
      loading: false
    };
  },
  mounted() {
    this.loadDeletedFiles();
  },
  methods: {
    async loadDeletedFiles() {
      this.loading = true;
      try {
        const response = await mediaFilesAPI.getDeletedFiles();
        this.deletedFiles = response.data.deletedFiles || [];
        // Sort by deleted date, newest first
        this.deletedFiles.sort((a, b) => 
          new Date(b.deletedAt) - new Date(a.deletedAt)
        );
      } catch (error) {
        console.error('Error loading deleted files:', error);
        this.deletedFiles = [];
      } finally {
        this.loading = false;
      }
    },
    getTypeIcon(type) {
      const icons = {
        'image': 'image',
        'video': 'play-circle',
        'song': 'music-note-beamed',
        'pdf': 'file-earmark-pdf'
      };
      return icons[type] || 'file';
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    }
  }
};
</script>

<style scoped>
.file-icon {
  font-size: 1.2rem;
  margin-right: 0.5rem;
}

.file-path {
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  color: #6c757d;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.badge-type-image {
  background-color: #ffc107;
  color: #000;
}

.badge-type-video {
  background-color: #dc3545;
}

.badge-type-song {
  background-color: #0d6efd;
}

.badge-type-pdf {
  background-color: #198754;
}

.table thead th {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>

